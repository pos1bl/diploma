import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js'
import { Types } from "mongoose"
dayjs.extend(utc)

export const SESSIONS_ROLES = {
  USER: 'user',
  SPECIALIST: 'specialist',
}

export const buildSessionFilter = ({ roleField, id, query }) => {
  const filter = { [roleField]: id };

  if (query.status) {
    filter.status = query.status;
  }

  if (query.clientId) {
    filter.user = query.clientId
  }

  if (query.startDate || query.endDate) {
    filter.scheduledAt = {};
    if (query.startDate) {
      filter.scheduledAt.$gte = dayjs.utc(query.startDate).toDate();
    }
    if (query.endDate) {
      filter.scheduledAt.$lte = dayjs.utc(query.endDate).endOf('day').toDate();
    }
  }

  return { filter };
}

export const buildClientFilter = ({ id, query }) => {
  const filter = { specialist: new Types.ObjectId(id) };

  if (query.name) {
    filter.name = query.name;
  }

  if (query.startDate || query.endDate) {
    filter.scheduledAt = {};
    if (query.startDate) {
      filter.scheduledAt.$gte = dayjs.utc(query.startDate).toDate();
    }
    if (query.endDate) {
      filter.scheduledAt.$lte = dayjs.utc(query.endDate).endOf('day').toDate();
    }
  }

  const options = { sort: { name: 1 } };
  if (query.limit) options.limit = parseInt(query.limit, 10);
  if (query.skip) options.skip = parseInt(query.skip, 10);
  if (query.sortBy) options.sort = { [query.sortBy]: query.order === 'asc' ? 1 : -1 };

  return { filter, options };
}

const buildAgeQuery = (selectedAges) => {
  const now = new Date();

  const threshold30 = new Date(
    now.getFullYear() - 30,
    now.getMonth(),
    now.getDate()
  );
  const threshold40 = new Date(
    now.getFullYear() - 40,
    now.getMonth(),
    now.getDate()
  );
  const SPECIALIST_AGE_OPTIONS  = {
    "30-": { dateOfBirth: { $gt: threshold30 } },
    "30-40": { dateOfBirth: { $lte: threshold30, $gt: threshold40 } },
    "40+": { dateOfBirth: { $lte: threshold40 } },
  };

  const orConditions = selectedAges
    .filter(key => SPECIALIST_AGE_OPTIONS[key])
    .map(key => SPECIALIST_AGE_OPTIONS[key]);

  return { $or: orConditions };
}

const SPECIALIST_ARRAY_OPTIONS = ["methods", "specialNeeds", "gender"];
const DEFAULT_LIMIT_SIZE = 10;

function normalizeQueryArrays(q) {
  const out = {};
  Object.entries(q).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      out[key] = val;
    } else if (typeof val === 'string') {
      out[key] = val.includes(',') ? val.split(',') : [val];
    }
  });
  return out;
}

const buildSpecialistsFilter = (rawQuery) => {
  const query = normalizeQueryArrays(rawQuery);
  let filter = { isFired: false };
  const options = { limit: DEFAULT_LIMIT_SIZE, skip: 0 };

  for (const filterName in query) {
    if (SPECIALIST_ARRAY_OPTIONS.includes(filterName)) {
      filter[filterName] = { $in: query[filterName] }
    }

    if (filterName === "age") {
      const ageQuery = buildAgeQuery(query[filterName]);
      filter = { ...filter, ...ageQuery }
    }

    if (filterName === "areas") {
      filter = { ...filter, $or: [{ mainAreas: {$in: query[filterName]} }, { secondaryAreas: {$in: query[filterName]} }] }
    }
  }

  if (query?.pageIndex) options.skip = +query.pageIndex * DEFAULT_LIMIT_SIZE;

  return { filter, options };
}

export const buildUnavailabilityFilter = ({ id, query }) => {
  const filter = { specialist: new Types.ObjectId(id) };

  if (query.startDate || query.endDate) {
    filter.start = {};
    filter.end = {};
    if (query.startDate) {
      filter.end.$gte = dayjs.utc(query.startDate).startOf('day').toDate();
    }
    if (query.endDate) {
      filter.start.$lte = dayjs.utc(query.endDate).endOf('day').toDate();
    }
  }

  if (query.type) {
    filter.type = query.type;
  }

  return filter;
}

export const buildSpecialistsPipeline = (query) => {
  const { filter, options } = buildSpecialistsFilter(query);

  const pipeline = [
    { $match: filter },
  ];

  if (query?.areas && query.areas.length) {
    pipeline.push(
      {
        $addFields: {
          mainMatchCount: {
            $size: { $setIntersection: ['$mainAreas', query.areas] }
          }
        }
      },
      { $sort: { mainMatchCount: -1 } }
    );
  }

  pipeline.push(
  {
    $facet: {
      data: [
        { $skip: options.skip },
        { $limit: options.limit },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      ],
      totalCount: [
        { $count: 'count' }
      ]
    },
  },
  { $unwind: { path: '$totalCount', preserveNullAndEmptyArrays: true } },
  { $addFields: { totalCount: '$totalCount.count' } },
  { $project: { 'totalCount.count': 0 } }
);

  return pipeline;
}

export const buildFullSpecialistInfoPipeline = (id, userId = "", dateProps) => {
  const { startDate: startDayjs, endDate: endDayjs } = dateProps;

  const userObjId = Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : null;
  const startDate = startDayjs.toDate();
  const endDate   = endDayjs.toDate();

  return [
    { $match: { _id: new Types.ObjectId(id) } },
    { $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
    }},
    { $unwind: '$user' },
    { $lookup: {
        from: 'diplomas',
        localField: '_id',
        foreignField: 'specialist',
        as: 'diploms'
    }},
    { $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: 'specialist',
        as: 'courses'
    }},
    { $lookup: {
        from: 'unavailabilities',
        let: { specId: '$_id' },
        pipeline: [
          { $match: {
              $expr: {
                $and: [
                  { $eq: ['$specialist', '$$specId'] },
                  { $lte: ['$start', endDate] },
                  { $gte: ['$end', startDate] },
                ]
              }
          }}
        ],
        as: 'unavailabilities'
    }},
    { $lookup: {
        from: 'sessions',
        let: { specId: '$_id', userObj: userObjId },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $or: [
                      { $eq: ['$specialist', '$$specId'] },
                      { $and: [
                          { $ne: ['$$userObj', null] },
                          { $eq: ['$user', '$$userObj'] }
                        ]
                      },
                    ]
                  },
                  { $eq: ['$status',     'scheduled'] },
                  { $gte: ['$scheduledAt', startDate] },
                  { $lte: ['$scheduledAt',   endDate]   },
                ]
              }
            }
          }
        ],
        as: 'sessions'
    }},
    { $project: {
        name: '$user.name',
        dateOfBirth: 1,
        gender: 1,
        bio: 1,
        dateOfStart: 1,
        mainAreas: 1,
        secondaryAreas: 1,
        excludedAreas: 1,
        methods: 1,
        avatarUrl: 1,
        availability: 1,
        diploms: 1,
        courses: 1,
        unavailabilities: 1,
        sessions: 1,
    }}
  ];
}

export const buildConflictCheckPipeline = (userId, specId, scheduledAt) => {
  return [
    {
      $match: {
        status: 'scheduled',
        scheduledAt,
        $or: [
          { user: new Types.ObjectId(userId) },
          { specialist: new Types.ObjectId(specId) },
        ],
      },
    },
    { $project: { _id: 1 } },

    {
      $unionWith: {
        coll: 'unavailabilities',
        pipeline: [
          {
            $match: {
              specialist: new Types.ObjectId(specId),
              start:      { $lte: scheduledAt },
              end:        { $gt:  scheduledAt },
            },
          },
          { $project: { _id: 1 } },
        ],
      },
    },

    { $limit: 1 },
  ]
}

export const buildIsSessionsInUnavPipeline = (start, end) => {
  return [
    {
      $addFields: {
        startParsedDate: {
          $dateFromString: {
            dateString: start,
            format: "%d.%m.%Y %H:%M",
            onError: null
          }
        },
        endParsedDate: {
          $dateFromString: {
            dateString: end,
            format: "%d.%m.%Y %H:%M",
            onError: null
          }
        }
      }
    },
    {
      $match: {
        status: "scheduled",
        $expr: {
          $and: [
            { $gte: ["$scheduledAt", "$startParsedDate"] },
            { $lte: ["$scheduledAt", "$endParsedDate"] }
          ]
        }
      }
    }
  ]
}

export const buildConflictUnavCheckPipeline = (start, end) => [
  {
    $addFields: {
      startParsedDate: {
        $dateFromString: { dateString: start, format: "%d.%m.%Y %H:%M" }
      },
      endParsedDate: {
        $dateFromString: { dateString: end,   format: "%d.%m.%Y %H:%M" }
      }
    }
  },
  {
    $match: {
      $expr: {
        $or: [
          { $gte: ["$end",   "$startParsedDate"] },
          { $lte: ["$start", "$endParsedDate"]   }
        ]
      }
    }
  }
];
