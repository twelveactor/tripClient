import dayjs from "dayjs";

// 转换 月/日
export function formatMonthDay(date){
  return dayjs(date).format('MM月DD日')
}

// 日期相加减
export function getDiffDate(start,end){
  return dayjs(end).diff(start,"day")
}

