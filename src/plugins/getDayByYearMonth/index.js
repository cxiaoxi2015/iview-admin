/**
 * @description: 根据年、月获取本月所有天数
 * @author: xx
 * @date: 2018-08-10 14:00:25
 */
export default (config) => {
  let year = config.year === undefined ? new Date().getFullYear() : config.year
  let month = config.month === undefined ? new Date().getMonth() + 1 : config.month
  let unit = config.unit === undefined ? '' : config.unit
  let dayList = []
  switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
    for (let i = 0;i < 31;i++){
      dayList[i] = month + '/' + (i + 1) + unit
    }
    return dayList
    break;
    case 2:
      if (year % 4 ===0 && year % 100 !==0 || year%400 ===0){
        // 闰年
        for (let i = 0;i < 29;i++){
          dayList[i] = month + '/' + (i + 1) + unit
        }
      }else{
        // 平年
        for (let i = 0;i < 28;i++){
          dayList[i] = month + '/' + (i + 1) + unit
        }
      }
      return dayList
      break;
    // 30天
    default:
      for (let i = 0;i < 30;i++){
        dayList[i] = month + '/' + (i + 1) + unit
      }
      return dayList
  }
}
