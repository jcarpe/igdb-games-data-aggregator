import { readFile } from 'fs/promises'
import { XMLParser } from 'fast-xml-parser'
import { title } from 'process'

export const loadGames = async (filePath) => {
  const parser = new XMLParser()

  const xmlData = await readFile(filePath, { encoding: 'utf8' })
  const jsonData = parser.parse(xmlData)
  const gamesArr = []

  jsonData.gameinfo.gamelist.game.forEach((game) => {
    let parsedGame = {}
    if ( game.hardware === 'Game' ) {
      parsedGame.title = game.title
      parsedGame.platform = game.platform.displayname.split('/')[0]
      gamesArr.push(parsedGame)
    }
  })

  return gamesArr
}