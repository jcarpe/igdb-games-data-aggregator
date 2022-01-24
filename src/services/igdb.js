import https from 'https'
import zlib from 'zlib'
import { Buffer } from 'buffer'

export default class IGDB {
  #clientSecret = ''
  #apiVer = 'v4'
  #baseReqConfig = {
    method: 'POST',
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Content-Type': 'text/plain'
    }
  }

  /**
   * PRIVATE
   * Generates a Promise-wrapped https request to be used agnostically
   * @param {*} options The option object for the https request
   * @param {String} queryString String formatted query to write to the request streamffffffffffffff
   * @returns {Promise} The Promise-wrapped https request
   */
  #requestPromiseGenerator = async (options, queryString = '') => {
    return new Promise((resolve, reject) => {
      let buffer = []
      const req = https.request(options, (res) => {
        res.on('data', (data) => buffer.push(data))
        res.on('error', (err) => reject(err))
        res.on('end', () => resolve(Buffer.concat(buffer)))
      })
      req.write(queryString)
      req.end();
    })
  }

  /**
   * IGDB class constructor with automatic authorization
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
  
  /**
   * Authenticate the app asynchronously
   * @param {String} authURL url host used for authentication 
   * @returns Promise instance that will resolve with auth response
   */
  async authenticate(authURL) {
    const options = {
      ...this.#baseReqConfig,
      hostname: authURL,
      path: `/oauth2/token?client_id=${this.#baseReqConfig.clientID}&client_secret=${this.#clientSecret}&grant_type=client_credentials`,
      headers: {
        ...this.#baseReqConfig.headers,
        'Content-Length': 0
      }
    }

    const result = await this.#requestPromiseGenerator(options)
    const parsed = JSON.parse(result)

    this.#baseReqConfig = {
      ...this.#baseReqConfig,
      headers: {
        ...this.#baseReqConfig.headers,
        'Authorization': `Bearer ${parsed['access_token']}`
      }
    }

    return parsed
  }

  /**
   * Request 
   */
  async request(endpoint, queryString) {
    const options = {
      ...this.#baseReqConfig,
      path: `/${this.#apiVer}/${endpoint}`,
      headers: {
        ...this.#baseReqConfig.headers,
        'Content-Length': queryString.length
      }
    }

    const result = await this.#requestPromiseGenerator(options, queryString)
    const unzipped = zlib.unzipSync(result)
    return JSON.parse(unzipped.toString('utf8'))
  }

  /**
   * Allows inspection of the base configs for the HTTPS request
   * @returns {object} baseRequestConfig 
   */
  readReqConfig() {
    return Object.assign({}, this.#baseReqConfig)
  }
}