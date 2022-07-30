export const generateGamesMultiQuery = (gameArr, fieldArr) => {
  let gameStr = ''
  gameArr.forEach((game, index) => {
    let val = (index !== gameArr.length-1) ? `"${game}" | ` : `"${game}"`
    gameStr += `name = ${val}`
  })
  
  let fieldStr = ''
  fieldArr.forEach((field, index) => {
    fieldStr += (index !== fieldArr.length-1) ? `${field},` : `${field}`
  })

  const queryString = `query games "Aggregated Games" {where ${gameStr}; fields ${fieldStr};};`

  console.log(queryString)
  return queryString
}

export const generateSingleGameQuery = (gameTitle, fieldArr) => {
  let fieldStr = ''
  fieldArr.forEach((field, index) => {
    fieldStr += (index !== fieldArr.length-1) ? `${field},` : `${field}`
  })

  return `query games "Single Game" {where name="${gameTitle}"; fields ${fieldStr};};`
}