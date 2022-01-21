import https from 'https'
import { resolve } from 'path'

export default class IGDB {
  #clientSecret = ''
  #req = null
  #baseReqConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' }
  }

  /**
   * IGDB class constructor
   * @param {object} initParams initialization params for the service instance
   * initParams: {
   *   clientSecret
   *   clientID
   *   baseURL
   * }
   */
  constructor(initParams) {
    this.#clientSecret = initParams.clientSecret
    this.#baseReqConfig = {
      ...this.#baseReqConfig,
      headers: {
        ...this.#baseReqConfig.headers,
        'Client-ID': initParams.clientID
      },
      hostname: initParams.baseURL
    }
  }

  authenticate(authURL) {
    const options = {
      ...this.#baseReqConfig,
      hostname: authURL,
      path: `/oauth2/token?client_id=${this.#baseReqConfig.clientID}&client_secret=${this.#baseReqConfig.clientSecret}&grant_type=client_credentials`,
      headers: {
        ...this.#baseReqConfig.headers,
        'Content-Length': 0
      }
    }

    const req = https.request(options, (res) => {
      res.on('data', (data) => {
       console.log(data)
      })
      res.on('error', (err) => {
        console.log(err)
      })
    })
    req.write('')
    req.end();
  }
  
  /**
   * Start 
   */
  // request(endpoint, queryString) {
  //   const options = {
  //     ...this.#baseReqConfig,
  //     headers: {
  //       ...this.#baseReqConfig.headers,
  //       'Content-Length': queryString.length
  //     }
  //   }

  //   return new Promise ((resolve, reject) => {
  //     const req = https.request(options, (res) => {
  //       res.on('data', (data) => resolve(data))
  //       res.on('error', (err) => reject(err))
  //     })
  //     req.write(queryString)
  //     req.end();
  //   }) 
  // }

  /**
   * Allows inspection of the base configs for the HTTPS request
   * @returns {object} baseRequestConfig 
   */
  readReqConfig() {
    return Object.assign({}, this.#baseReqConfig)
  }
}