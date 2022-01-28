import { readFile } from 'fs/promises'
import { XMLParser } from 'fast-xml-parser'
import { title } from 'process'

export const loadGames = async (filePath) => {
  const parser = new XMLParser()

  const xmlData = await readFile(filePath, { encoding: 'utf8' })
  const jsonData = parser.parse(xmlData)
  const titleArr = []

  jsonData.gameinfo.gamelist.game.forEach((game) => {
    if ( game.hardware === 'Game' ) titleArr.push(game.title)
  })

  return titleArr
}