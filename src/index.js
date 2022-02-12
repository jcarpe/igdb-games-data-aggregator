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
      generateGamesMultiQuery(titleArr, ['name','platforms.name'])
    )

    return igdbData[0].result
  }

  gameBatches.forEach(async (gameBatch) => {
    let titleArr = []
    gameBatch.forEach((game) => titleArr.push(game.title))

    const batchData = await batchRequest(titleArr)
    console.log(batchData)
    allGames = allGames.concat(allGames, batchData)
  })

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

  console.log(gameData)

  // let titleArr = []
  // games[0].forEach((game) => titleArr.push(game.title))

  // console.log(titleArr)

  // const igdbData = await igdbService.request(
  //   'multiquery',
  //   generateGamesMultiQuery(titleArr, ['name','platforms.name'])
  // )

  // console.log(JSON.stringify(igdbData))
}

main()