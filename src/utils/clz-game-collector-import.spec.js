import { loadGames } from './clz-game-collector-import'

describe('CLZ Game Collector Import', () => {
  it('loads XML data exported from CLZ app returns array of titles', async () => {
    const games = await loadGames(`./__mocks__/clz-games-data.xml`)
    expect(games).toEqual([
      {
        title: '1Xtreme (Greatest Hits)',
        platform: 'PlayStation'
      },
      {
        title: '8 Eyes',
        platform: 'NES'
      },
      {
        title: 'Adventure',
        platform: 'Atari 2600'
      },
      {
        title: 'Albert Odyssey: Legend of Eldean',
        platform: 'Saturn'
      },
      {
        title: 'Alisia Dragoon',
        platform: 'Genesis'
      },
      {
        title: 'Arcade Classic No. 4: Defender / Joust',
        platform: 'Game Boy'
      },
      {
        title: 'Armored Core 3',
        platform: 'PlayStation 2'
      }
    ])
  })
})