import IGDB from './services/igdb'

const igdbService = new IGDB(
  'e4ys2hra3fq94qxednr11me9ijuzos',
  'rugsgs2huvr5b0p6xw274tu7nuyxyj',
  'api.igdb.com'
);

igdbService.authenticate('id.twitch.tv')
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.error(err)
  })