import { readFile } from 'fs/promises'
import { XMLParser } from 'fast-xml-parser'

export const loadGames = async (filePath) => {
  const parser = new XMLParser()
  const xmlData = await readFile(filePath, { encoding: 'utf8' })
  const jsonData = parser.parse(xmlData)
  const gamesArr = []

  let reqPartition = 0
  jsonData.gameinfo.gamelist.game.forEach((game, index) => {
    if ( index%10 === 0 ) {
      reqPartition = index/10
      gamesArr[reqPartition] = []
    }

    let parsedGame = {}
    if ( game.hardware === 'Game' ) {
      parsedGame.title = game.title
      parsedGame.platform = game.platform.displayname.split('/')[0].trim()
      gamesArr[reqPartition].push(parsedGame)
    }
  })

  return gamesArr
}