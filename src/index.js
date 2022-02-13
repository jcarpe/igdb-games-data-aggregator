import { writeFile } from 'fs/promises'
import { loadGames } from './utils/clz-game-collector-import'
import IGDB from './services/igdb'
import { generateGamesMultiQuery } from './utils/request-generators';

const igdbService = new IGDB({
  clientSecret: process.env.SERVICE_CLIENT_ID,
  clientID: process.env.SERVICE_CLIENT_TOKEN,
  baseURL: process.env.SERVICE_BASE_URL
});

const multiBatchRequester = async (gameBatches) => {
  let allGames = []

  const batchRequest = async (titleArr) => {
    const igdbData = await igdbService.request(
      'multiquery',
      generateGamesMultiQuery(titleArr, [
        'name',
        'storyline',
        'summary',
        'first_release_date',
        'franchise.name',
        'genres.name',
        'involved_companies.company.name',
        'player_perspectives.name',
        'version_title',
        'platforms.name',
        'cover.image_id',
        'screenshots.image_id'
      ])
    )

    return igdbData[0].result
  }

  for (let i = 0; i < gameBatches.length; i++) {

    console.log(`processing game batch ${i}`)

    let titleArr = []
    gameBatches[i].forEach((game) => titleArr.push(game.title))

    if (titleArr.length > 0) {
      const batchData = await batchRequest(titleArr)
      allGames = allGames.concat(batchData)
    }
  }

  return allGames
}

const main = async () => {
  /**
   * TODO:
   * This is operating as a bit of a playground at the moment...
   */
  await igdbService.authenticate(process.env.SERVICE_O_AUTH_URL)
  const games = await loadGames('./__mocks__/clz-games-data-FULL.xml')
  const gameData = await multiBatchRequester(games)

  writeFile('./dist/igdb-data.json', JSON.stringify(gameData))
}

main()