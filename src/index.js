// import { loadENV } from './envLoader'
import IGDB from './services/igdb'

const igdbService = new IGDB({
  clientSecret: process.env.SERVICE_CLIENT_ID,
  clientID: process.env.SERVICE_CLIENT_TOKEN,
  baseURL: process.env.SERVICE_BASE_URL
});

const main = async () => {
  const auth = await igdbService.authenticate(process.env.SERVICE_O_AUTH_URL)

  // const result = await igdbService.request('v4/games', `
  //   fields name;
  //   search "breath of the wild";
  //   limit 500;
  // `)

  console.log(auth)
}

main()