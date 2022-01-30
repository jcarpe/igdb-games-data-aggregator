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

  return `where ${gameStr}; fields ${fieldStr};`
}