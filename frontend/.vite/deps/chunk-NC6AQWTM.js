import {
  __commonJS
} from "./chunk-AUZ3RYOM.js";

// node_modules/@supabase/node-fetch/browser.js
var require_browser = __commonJS({
  "node_modules/@supabase/node-fetch/browser.js"(exports, module) {
    var getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      throw new Error("unable to locate global object");
    };
    var globalObject = getGlobal();
    module.exports = exports = globalObject.fetch;
    if (globalObject.fetch) {
      exports.default = globalObject.fetch.bind(globalObject);
    }
    exports.Headers = globalObject.Headers;
    exports.Request = globalObject.Request;
    exports.Response = globalObject.Response;
  }
});

export {
  require_browser
};
//# sourceMappingURL=chunk-NC6AQWTM.js.map
