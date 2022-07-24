import { readFile } from 'fs/promises'
import { XMLParser } from 'fast-xml-parser'

const mapGameData = clzGameData => {
  return {
    collection_completed: clzGameData.completed === 'Yes' ? true : false,
    collection_completeness: {
      complete_code: clzGameData.completeness,
      has_box: clzGameData.hasbox === 'Yes' ? true : false,
      has_manual: clzGameData.hasmanual === 'Yes' ? true : false
    },
    collection_id: clzGameData.id,
    collection_index: clzGameData.index,
    collection_name: clzGameData.title,
    collection_price_charting_url: clzGameData.pricechartingurl,
    collection_rating: (() => {
      const rating = clzGameData.myrating
      if (rating) return rating.find(rateVal => typeof rateVal === 'number')
      return null
    })(),
    collection_region: clzGameData.region?.displayName,
    igdb_first_release_date: 0,
    igdb_genres: [],
    igdb_id: 0,
    igdb_involved_companies: [],
    igdb_name: "",
    igdb_summary: "",
    images: {
      igdb_cover: {
        id: 0,
        image_id: ""
      },
      igdb_screenshots: []
    },
    platforms: {
      owned_on: [clzGameData.platform?.displayname],
      released_on: []
    }
  }
}

export const loadGames = async (filePath) => {
  const parser = new XMLParser()
  const xmlData = await readFile(filePath, { encoding: 'utf8' })
  const jsonData = parser.parse(xmlData)
  const gamesOnlyData = jsonData.gameinfo.gamelist.game.filter(game => {
    return game.hardware === 'Game'
  })
  const gamesArr = []

  let reqPartition = 0
  gamesOnlyData.forEach((game, index) => {
    if ( index%10 === 0 ) {
      reqPartition = index/10
      gamesArr[reqPartition] = []
    }

    const parsedGame = mapGameData(game)
    gamesArr[reqPartition].push(parsedGame)
  })

  return gamesArr
}