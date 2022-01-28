import { loadGames } from './utils/clz-game-collector-import'
import IGDB from './services/igdb'

const igdbService = new IGDB({
  clientSecret: process.env.SERVICE_CLIENT_ID,
  clientID: process.env.SERVICE_CLIENT_TOKEN,
  baseURL: process.env.SERVICE_BASE_URL
});

const main = async () => {}

main()