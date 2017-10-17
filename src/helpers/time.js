/**
 * AiLife
 */

export const WEEK_DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function dateText (date) {

  if (typeof date == 'string') {

    date = new Date(date.replace(/-/g,"/"))

  }

  let now = new Date()

  let interval = (now - date) / 1000 /60
  if (interval < 1) {
    return '刚刚'
  } else if (interval >= 1 && interval < 60) {
    return Math.round(interval) + '分钟前'
  } else if (interval >= 60 && interval < 1440) {
    return Math.round(interval / 60) + '小时前'
  } else {
    return date.toISOString().substring(0,10)
  }
}

export function weekDayText (date) {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return WEEK_DAYS[date.getDay()]
}
