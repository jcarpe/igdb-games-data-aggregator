import IGDB from './services/igdb'

const igdbService = new IGDB({
  clientSecret: 'e4ys2hra3fq94qxednr11me9ijuzos',
  clientID: 'rugsgs2huvr5b0p6xw274tu7nuyxyj',
  baseURL: 'api.igdb.com'
});

const main = async () => {
  await igdbService.authenticate('id.twitch.tv')

  const result = await igdbService.request('v4/games', `
    fields name;
    search "breath of the wild";
    limit 500;
  `)

  console.log(result)
}

main()