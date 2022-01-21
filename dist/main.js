var $gXNCa$https = require("https");
require("path");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequirefc99"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequirefc99"] = parcelRequire;
}
parcelRequire.register("eD8Dd", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = void 0;

var $aa6b6744c7604a3b$var$_https = $aa6b6744c7604a3b$var$_interopRequireDefault($gXNCa$https);

function $aa6b6744c7604a3b$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class $aa6b6744c7604a3b$var$IGDB {
    #clientSecret = '';
    #req = null;
    #baseReqConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        }
    };
    /**
   * IGDB class constructor
   * @param {object} initParams initialization params for the service instance
   * initParams: {
   *   clientSecret
   *   clientID
   *   baseURL
   * }
   */ constructor(initParams){
        this.#clientSecret = initParams.clientSecret;
        this.#baseReqConfig = {
            ...this.#baseReqConfig,
            headers: {
                ...this.#baseReqConfig.headers,
                'Client-ID': initParams.clientID
            },
            hostname: initParams.baseURL
        };
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
        };
        const req = $aa6b6744c7604a3b$var$_https.default.request(options, (res)=>{
            res.on('data', (data)=>{
                console.log(data);
            });
            res.on('error', (err)=>{
                console.log(err);
            });
        });
        req.write('');
        req.end();
    }
    /**
   * Start 
   */ // request(endpoint, queryString) {
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
   */ readReqConfig() {
        return Object.assign({
        }, this.#baseReqConfig);
    }
}
module.exports.default = $aa6b6744c7604a3b$var$IGDB;

});

"use strict";

var $4fa36e821943b400$var$_igdb = $4fa36e821943b400$var$_interopRequireDefault((parcelRequire("eD8Dd")));
function $4fa36e821943b400$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const $4fa36e821943b400$var$igdbService = new $4fa36e821943b400$var$_igdb.default('e4ys2hra3fq94qxednr11me9ijuzos', 'rugsgs2huvr5b0p6xw274tu7nuyxyj', 'api.igdb.com');
$4fa36e821943b400$var$igdbService.authenticate('id.twitch.tv').then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.error(err);
});


//# sourceMappingURL=main.js.map
