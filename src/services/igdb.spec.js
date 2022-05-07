import { Buffer } from 'buffer'
import zlib from 'zlib'
import HttpRequestMock from 'http-request-mock'
import IGDB from './igdb'

describe('IGDB Service', () => {
  const mocker = HttpRequestMock.setup()
  const igdbService = new IGDB({
    clientID: 'a-sample-client-ID',
    clientSecret: 'a-sample-client-secret',
    baseURL: 'api.games.plz'
  })

  it('initializes service instance with config values', () => {
    expect(igdbService.readReqConfig()).toEqual({
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip,deflate,br',
        'Client-ID': 'a-sample-client-ID',
        'Connection': 'keep-alive',
        'Content-Type': 'text/plain'
      },
      hostname: 'api.games.plz'
    })
  })

  it('generates an authenticated token on initialization', async () => {
    mocker.post(
      'id.cool.url/oauth2/token',
      `{
        "token": "sample token"
      }`
    )

    const result = await igdbService.authenticate('id.cool.url')
    expect(result).toEqual({ token: 'sample token' })
  })

  it('makes request for full Super Mario Bros. games search', async () => {
    mocker.mock({
      url: 'api.games.plz/v4/games',
      method: 'post',
      delay: 0,
      status: 200,
      header: {
        'content-encoding': 'gzip',
        'content-type': 'application/json;charset=utf-8'
      },
      body: zlib.gzipSync(JSON.stringify([{"id": 135268, "name": "The Super Mario Bros. Super Show! 64"}]))
    })

    const result = await igdbService.request('games', `
      fields name;
      search "Super Mario Bros.";
      limit 10;
    `)

    expect(result).toEqual([
      {"id":135268,"name":"The Super Mario Bros. Super Show! 64"}
    ])
  })

  it('returns null and logs an error if the request fails', async () => {
    mocker.mock({
      url: 'api.games.plz/v4/games',
      method: 'post',
      delay: 0,
      status: 200,
      header: {
        'content-encoding': 'gzip',
        'content-type': 'application/json;charset=utf-8'
      },
      body: 'yucky',
    })

    console.log = jest.fn()

    const result = await igdbService.request('games', `
      fields name;
      search "Super Mario Bros.";
      limit 10;
    `)

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(result).toBeNull()
  })
})