import https from 'https'

export default class IGDB {
  #clientID = ''
  #clientSecret = ''

  /**
   * IGDB class constructor
   * @param {object} initParams initialization params for the service instance
   * 
   */
  constructor(initParams) {
    this.#clientID = initParams.clientID
    this.#clientSecret = initParams.clientSecret
  }
  
  /**
   * Start 
   */
  request() {
    return true
  }
}