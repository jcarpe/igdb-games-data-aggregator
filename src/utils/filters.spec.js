import { dedupeTitleByPlatform } from './filters'

describe('Filters', () => {
  describe('dedupeTitleByPlatform()', () => {
    it('filters out games results that matched by title, but do not align to platform', () => {
      const sourceList = [
        { title: '1Xtreme (Greatest Hits)', platform: 'PlayStation' },
        { title: '8 Eyes', platform: 'NES' },
        { title: 'Adventure', platform: 'Atari 2600' },
        { title: 'Albert Odyssey: Legend of Eldean', platform: 'Saturn' },
        { title: 'Alisia Dragoon', platform: 'Genesis' },
        {
          title: 'Arcade Classic No. 4: Defender / Joust',
          platform: 'Game Boy'
        },
        { title: 'Armored Core 3', platform: 'PlayStation 2' }
      ]
      const dupeList = [
        {
          "id": 19414,
          "name": "Armored Core 3",
          "platforms": [
            { "id": 8, "name": "PlayStation 2" },
            { "id": 38, "name": "PlayStation Portable" }
          ]
        },
        {
          "id": 12239,
          "name": "Adventure",
          "platforms": [{ "id": 69, "name": "BBC Microcomputer System" }]
        },
        {
          "id": 1975,
          "name": "8 Eyes",
          "platforms": [
            { "id": 18, "name": "Nintendo Entertainment System (NES)" }
          ]
        },
        {
          "id": 19508,
          "name": "Alisia Dragoon",
          "platforms": [{ "id": 29, "name": "Sega Mega Drive/Genesis" }]
        },
        {
          "id": 15021,
          "name": "Albert Odyssey: Legend of Eldean",
          "platforms": [{ "id": 32, "name": "Sega Saturn" }]
        },
        {
          "id": 117923,
          "name": "Arcade Classic No. 4: Defender / Joust",
          "platforms": [
            { "id": 22, "name": "Game Boy Color" },
            { "id": 33, "name": "Game Boy" }
          ]
        },
        {
          "id": 8253,
          "name": "Adventure",
          "platforms": [{ "id": 59, "name": "Atari 2600" }]
        }
      ]
      
      expect(dedupeTitleByPlatform(sourceList, dupeList)).toEqual([
        {
          "id": 1975,
          "name": "8 Eyes",
          "platforms": [{ "id": 18, "name": "Nintendo Entertainment System (NES)" }]
        },
        {
          "id": 8253,
          "name": "Adventure",
          "platforms": [{ "id": 59, "name": "Atari 2600" }]
        },
        {
          "id": 15021,
          "name": "Albert Odyssey: Legend of Eldean",
          "platforms": [{ "id": 32, "name": "Sega Saturn" }]
        },
        {
          "id": 19508,
          "name": "Alisia Dragoon",
          "platforms": [{ "id": 29, "name": "Sega Mega Drive/Genesis" }]
        },
        {
          "id": 117923,
          "name": "Arcade Classic No. 4: Defender / Joust",
          "platforms": [
            { "id": 22, "name": "Game Boy Color" },
            { "id": 33, "name": "Game Boy" }
          ]
        },
        {
          "id": 19414,
          "name": "Armored Core 3",
          "platforms": [
            { "id": 8, "name": "PlayStation 2" },
            { "id": 38, "name": "PlayStation Portable" }
          ]
        }
      ])
    })
  })
})