import { generateGamesMultiQuery, generateSingleGameQuery } from './request-generators'

describe('Request Generators', () => {
  describe('Games Multi-Query', () => {
    it('generates an IGDB multi-query for a list of games', () => {
      expect(generateGamesMultiQuery(
        ['1Xtreme (Greatest Hits)', '8Eyes', 'Zelda'],
        ['name','storyline','summary','version_title']
      )).toEqual(`query games "Aggregated Games" {where name = "1Xtreme (Greatest Hits)" | name = "8Eyes" | name = "Zelda"; fields name,storyline,summary,version_title;};`)
    })
  })

  describe('Games Single-Query', () => {
    it('ganerates an IGDB query for a single game title', () => {
      expect(generateSingleGameQuery(
        '1Xtreme', 
        ['name','storyline','summary','version_title']
      )).toEqual(`query games "Single Game" {where name="1Xtreme"; fields name,storyline,summary,version_title;};`)
    })
  })
})