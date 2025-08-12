// 过滤区域币种
export const filterArea = (lists = [], languageKey) => {
  return lists.filter((item) => {
    return (item?.languageList || []).length < 1 || item?.languageList.includes(languageKey)
  })
}
