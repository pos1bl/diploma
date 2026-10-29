import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const getAvailability = (specialist, dateProps) => {
  const { availability = [], unavailabilities = [], sessions = []  } = specialist;
  const { startDate, endDate } = dateProps;

  const formattedAvailability = [];
  const lastDate = endDate.add(1, 'day')

  for (let d = startDate; d.isBefore(lastDate); d = d.add(1, 'day')) {
    const dow = d.format('dddd').toLowerCase()  // monday, tuesday…
    // 5.1 шукаємо слот по дню тижня
    const slot = availability.find(s => s.dayOfWeek === dow)
    if (!slot) continue

    // 5.2 перевіряємо, чи є повний day-off
    const fullBlock = unavailabilities.find(u =>
      dayjs(u.start).isSameOrBefore(d.hour(+slot.from.slice(0,2)), 'minute') &&
      dayjs(u.end).isSameOrAfter(d.hour(+slot.to  .slice(0,2)), 'minute')
    )
    if (fullBlock) continue

    // 5.3 генеруємо годинні слоти
    const fromH = parseInt(slot.from.slice(0,2), 10)
    const toH = parseInt(slot.to  .slice(0,2), 10)
    const timeSlots = []

    for (let h = fromH; h < toH; h++) {
      const timeLabel = String(h).padStart(2,'0') + ':00'
      const dt = d.hour(h).minute(0)

      // пропускаємо, якщо unavailability або session покривають саме цю годину
      const busy = unavailabilities.some(u =>
        dt.isSameOrAfter(u.start) && dt.isBefore(u.end)
      ) || sessions.some(s =>
        dayjs(s.scheduledAt).isSame(dt, 'minute')
      )
      if (!busy) timeSlots.push(timeLabel)
    }

    if (timeSlots.length) {
      formattedAvailability.push({
        date: d.toDate(),
        timeSlots,
      })
    }
  }

  return formattedAvailability;
}
