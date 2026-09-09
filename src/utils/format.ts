/**
 * 轉換千分位
 * @param {string | number} value - 金額
 * @returns {string} 格式化的金額字串
 */
function thousandsFormatting (value: string | number): string | null {
  const comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return value != null && value !== '' ? value.toString().replace(comma, ',') : null
}

/**
 * 轉換為民國年日期
 * @param {string | Date} value - 日期（ISO 字串或 Date 物件）
 * @returns {string} 民國年格式，例：民國 114 年 6 月 10 日
 */
function toRocDate (value: string | Date | null | undefined): string {
  if (!value) {
    return ''
  }
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) {
    return ''
  }
  const year = date.getFullYear() - 1911
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `民國 ${year} 年 ${month} 月 ${day} 日`
}

export {
  thousandsFormatting, // 轉換千分位
  toRocDate, // 轉換為民國年日期
}
