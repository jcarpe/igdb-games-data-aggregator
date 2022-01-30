import { generateGamesMultiQuery } from './request-generators'

describe('Request Generators', () => {
  describe('Games Multi-Query', () => {
    it('generates an IGDB multi-query for a list of games', () => {
      expect(generateGamesMultiQuery(
        ['1Xtreme (Greatest Hits)', '8Eyes', 'Zelda'],
        ['name','storyline','summary','version_title']
      )).toEqual(`where name = "1Xtreme (Greatest Hits)" | name = "8Eyes" | name = "Zelda"; fields name,storyline,summary,version_title;`)
    })
  })
})