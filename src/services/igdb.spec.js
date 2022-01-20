import IGDB from './igdb'

describe('IGDB Service', () => {
  const igdbService = new IGDB({
    clientID: 'a-sample-client-ID',
    clientSecret: 'a-sample-client-secret'
  });

  it('initializes service instance with config values', () => {
    expect(igdbService.request()).toEqual(true)
  })
  it('generates an authenticated token on initialization', () => {})
  it('makes successful request known request for full Super Mario Bros. games request', () => {})
})