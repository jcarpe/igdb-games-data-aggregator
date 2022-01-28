import { loadGames } from './clz-game-collector-import'

describe('CLZ Game Collector Import', () => {
  it('loads XML data exported from CLZ app returns array of titles', async () => {
    const games = await loadGames(`./__mocks__/clz-games-data.xml`)
    expect(games).toEqual([
      '1Xtreme (Greatest Hits)',
      '8 Eyes',
      'Adventure',
      'Albert Odyssey: Legend of Eldean',
      'Alisia Dragoon',
      'Arcade Classic No. 4: Defender / Joust',
      'Armored Core 3'
    ])
  })
})