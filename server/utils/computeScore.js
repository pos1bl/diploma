const WEIGHTS = {
  gender:        0.20,
  age:           0.20,
  specialNeeds:  0.15,
  method:        0.10,
  issues:        0.30,
  target:        0.05,
};

const TARGETS_ISSUES = {
  coping_with_anxiety: [
    "Обсессивно-компульсивний розлад",
    "Близька людина перебуває у зоні бойових дій / під окупацією",
    "Панічні атаки",
    "Тривога та страх",
    "Фобії",
    "Гостра реакція на стрес"
  ],
  build_healthy_relationships: [
    "Емоційна заплутаність",
    "Робота з втратою та горюванням",
    "Фізичне та/або сексуальне насилля",
    "Сталкінг",
    "Співзалежність",
    "Стосунки з родиною",
    "Стосунки з партнером",
    "Інтимні стосунки",
    "Проблеми з довірою",
    "Пошук партнера",
    "Супровід батьківства та вагітності",
    "Розлучення",
    "Аб'юзивні відносини",
    "Самотність",
    "Зрада"
  ],
  build_career: [
    "Кар'єрний розвиток",
    "Проблеми з пам'яттю та концентрацією",
    "Комунікація в колективі",
    "Втрата мотивації",
    "Work-life баланс",
    "Етичні дилеми на роботі",
    "Звільнення та пошук роботи",
    "Емоційне вигорання",
    "Прокрастинація",
    "Адаптація в новій компанії",
    "Лідерство та керування командою",
    "Кар'єрна невизначеність"
  ],
  improve_quality_life: [
    "Втрата мотивації",
    "Емоційна заплутаність",
    "Work-life баланс",
    "Проблеми зі сном",
    "Втрата та пошук сенсу життя",
    "Розлади харчової поведінки",
    "Прокрастинація",
    "Саморефлексія",
    "Будування особистих меж",
    "Залежність"
  ],
  other: [
    "Адаптація до нових умов життя",
    "Вікові кризи",
    "Фінансові проблеми",
    "Депресія",
    "Емоційна заплутаність",
    "Селфхарм",
    "Близька людина перебуває у зоні бойових дій / під окупацією",
    "Булінг",
    "Еміграція",
    "Розлади харчової поведінки",
    "Перервана вагітність / втрата дитини",
    "Почуття провини та сорому",
    "Проблеми з комунікацією",
    "Стрес",
    "Психосоматика",
    "Страх публічних виступів",
    "Фізичне та/або сексуальне насилля",
    "Проблеми з самооцінкою",
    "Супровід тяжких захворювань",
    "Спалахи гніву",
    "ПТСР",
    "Стрес",
    "Селфхарм",
    "Депресія",
    "Пригніченість, апатія",
    "Травмуючі події в минулому",
    "Гендерна ідентичність"
  ]
}

const SPECIALIST_AGE_OPTIONS  = {
  "30-": [18, 30],
  "30-40": [30, 40],
  "40+": [40, 100],
};

const normalize = (value, min, max) => max === min ? 0 : (value - min) / (max - min);

const calculateAge = (dob) => {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export const computeScore = (sp, vals) => {
  const genderScore = (vals.gender === 'any' || vals.gender === sp.gender) ? 1 : 0;

  const age = calculateAge(sp.dateOfBirth);
  const ageScore = vals.age.find(a => age >= SPECIALIST_AGE_OPTIONS[a][0] && age <= SPECIALIST_AGE_OPTIONS[a][1]) ? 1 : 0;

  let specialNeedsScore;
  if (vals.is_suicidial) {
    specialNeedsScore = sp.specialNeeds.includes("Чи тебе турбують суїцидальні думки?") ? 1 : 0;
  } else {
    const matchedNeeds = vals.specialNeeds.filter((g) => sp.specialNeeds.includes(g)).length;
    specialNeedsScore = normalize(matchedNeeds, 0, vals.specialNeeds.length);
  }

  const methodScore = sp.methods.includes(vals.method) ? 1 : 0;

  const maxIssueSum = Object.values(vals.issues).reduce((sum) => sum + 3, 0);
  const matchedIssueSum = Object.entries(vals.issues).reduce((sum, [issue, lvl]) => {
    if (sp.mainAreas.includes(issue))      return sum + lvl;
    if (sp.secondaryAreas.includes(issue)) return sum + lvl * 0.5;
    return sum;
  }, 0);
  const issuesScore = normalize(matchedIssueSum, 0, maxIssueSum);

  const targetKey = vals.target;
  const targetList = targetKey.reduce((total, targetKey) => [...total, ...TARGETS_ISSUES[targetKey]]) || [];
  const matchedTarget = targetList.filter((issue) => sp.mainAreas.includes(issue)).length;
  const targetScore = normalize(matchedTarget, 0, targetList.length);

  const excludedSum = Object.entries(vals.issues).reduce((sum, [issue, lvl]) => {
    return lvl > 0 && sp.excludedAreas.includes(issue) ? sum + lvl : sum;
  }, 0);
  const excludedPenalty = normalize(excludedSum, 0, maxIssueSum);

  const rawScore =
    WEIGHTS.gender * genderScore +
    WEIGHTS.age * ageScore +
    WEIGHTS.specialNeeds * specialNeedsScore +
    WEIGHTS.method * methodScore +
    WEIGHTS.issues * issuesScore +
    WEIGHTS.target * targetScore;

  const finalScore = Math.max(0, rawScore * (1 - excludedPenalty));

  return finalScore;
}
