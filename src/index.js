import { loadGames } from './utils/clz-game-collector-import'
import IGDB from './services/igdb'
import { generateGamesMultiQuery } from './utils/request-generators';

const igdbService = new IGDB({
  clientSecret: process.env.SERVICE_CLIENT_ID,
  clientID: process.env.SERVICE_CLIENT_TOKEN,
  baseURL: process.env.SERVICE_BASE_URL
});

const main = async () => {
  /**
   * TODO:
   * This is operating as a bit of a playground at the moment...
   */
  await igdbService.authenticate(process.env.SERVICE_O_AUTH_URL)
  const games = await loadGames('./__mocks__/clz-games-data.xml')

  let titleArr = []
  games.forEach((game) => titleArr.push(game.title))

  console.log(games)

  const igdbData = await igdbService.request(
    'multiquery',
    generateGamesMultiQuery(titleArr, ['name','platforms.name'])
  )

  console.log(JSON.stringify(igdbData))
}

main()