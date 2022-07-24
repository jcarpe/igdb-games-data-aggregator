import { loadGames } from './clz-game-collector-import'
import * as expected from '../../__mocks__/clz-import-expected.json'

describe('CLZ Game Collector Import', () => {
  it('loads XML data exported from CLZ app returns array of titles', async () => {
    const games = await loadGames(`./__mocks__/clz-games-data.xml`)
    expect(games).toEqual(expected.data)
  })

  it('generates a matrix from CLZ app XML data of extensive length', async () => {
    const games = await loadGames(`./__mocks__/clz-games-data-FULL.xml`)
    expect(games.length).toEqual(56)
    expect(games.flat().length).toEqual(559)
  })
})