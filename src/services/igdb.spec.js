import IGDB from './igdb'

describe('IGDB Service', () => {
  const igdbService = new IGDB({
    clientID: 'a-sample-client-ID',
    clientSecret: 'a-sample-client-secret',
    baseURL: 'a-sample-base-url'
  });

  it('initializes service instance with config values', () => {
    expect(igdbService.readReqConfig()).toEqual({
      method: 'POST',
      headers: { 'Content-Type': 'text/plain', 'Client-ID': 'a-sample-client-ID' },
      hostname: 'a-sample-base-url'
    })
  })

  it.skip('generates an authenticated token on initialization', () => {
    console.log(igdbService.authenticate('id.twitch.tv'))
  })
  it('makes successful request known request for full Super Mario Bros. games request', () => {})
})