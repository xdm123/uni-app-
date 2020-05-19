(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!***********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _swan$getSystemInfoSy =




  swan.getSystemInfoSync(),platform = _swan$getSystemInfoSy.platform,pixelRatio = _swan$getSystemInfoSy.pixelRatio,windowWidth = _swan$getSystemInfoSy.windowWidth; // uni=>swan runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// 不支持的 API 列表
var todos = [
  // 'hideKeyboard',
  // 'onGyroscopeChange',
  // 'startGyroscope',
  // 'stopGyroscope',
  // 'openBluetoothAdapter',
  // 'startBluetoothDevicesDiscovery',
  // 'onBluetoothDeviceFound',
  // 'stopBluetoothDevicesDiscovery',
  // 'onBluetoothAdapterStateChange',
  // 'getConnectedBluetoothDevices',
  // 'getBluetoothDevices',
  // 'getBluetoothAdapterState',
  // 'closeBluetoothAdapter',
  // 'writeBLECharacteristicValue',
  // 'readBLECharacteristicValue',
  // 'onBLEConnectionStateChange',
  // 'onBLECharacteristicValueChange',
  // 'notifyBLECharacteristicValueChange',
  // 'getBLEDeviceServices',
  // 'getBLEDeviceCharacteristics',
  // 'createBLEConnection',
  // 'closeBLEConnection',
  // 'onBeaconServiceChange',
  // 'onBeaconUpdate',
  // 'getBeacons',
  // 'startBeaconDiscovery',
  // 'stopBeaconDiscovery',
  // 'hideShareMenu',
  // 'onWindowResize',
  // 'offWindowResize',
  // 'vibrate'
];

// 存在兼容性的 API 列表
var canIUses = [];

function createTodoMethod(contextName, methodName) {
  return function unsupported() {
    console.error("\u767E\u5EA6\u5C0F\u7A0B\u5E8F ".concat(contextName, "\u6682\u4E0D\u652F\u6301").concat(methodName));
  };
}

function _handleEnvInfo(result) {
  result.miniProgram = {
    appId: result.appKey };

  result.plugin = {
    version: result.sdkVersion };

}

// 需要做转换的 API 列表
var protocols = {
  request: {
    args: function args(fromArgs) {
      // TODO
      // data 不支持 ArrayBuffer
      // method 不支持 TRACE, CONNECT
      return {
        method: 'method',
        dataType: function dataType(type) {
          return {
            name: 'dataType',
            value: type === 'json' ? type : 'string' };

        } };

    } },

  connectSocket: {
    args: {
      method: false } },


  previewImage: previewImage,
  getRecorderManager: {
    returnValue: function returnValue(fromRet) {
      fromRet.onFrameRecorded = createTodoMethod('RecorderManager', 'onFrameRecorded');
    } },

  getBackgroundAudioManager: {
    returnValue: function returnValue(fromRet) {
      fromRet.onPrev = createTodoMethod('BackgroundAudioManager', 'onPrev');
      fromRet.onNext = createTodoMethod('BackgroundAudioManager', 'onNext');
    } },

  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false } },


  navigateToMiniProgram: {
    name: 'navigateToSmartProgram',
    args: {
      appId: 'appKey',
      envVersion: false } },


  navigateBackMiniProgram: {
    name: 'navigateBackSmartProgram' },

  showShareMenu: {
    name: 'openShare' },

  getAccountInfoSync: {
    name: 'getEnvInfoSync',
    returnValue: _handleEnvInfo } };



var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u767E\u5EA6\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u767E\u5EA6\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = swan[options.name || methodName].apply(swan, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['baidu'],
  share: ['baidu'],
  payment: ['baidu'],
  push: ['baidu'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


function requestPayment(params) {
  var parseError = false;
  if (typeof params.orderInfo === 'string') {
    try {
      params.orderInfo = JSON.parse(params.orderInfo);
    } catch (e) {
      parseError = true;
    }
  }
  if (parseError) {
    params.fail && params.fail({
      errMsg: 'requestPayment:fail: 参数 orderInfo 数据结构不正确，参考：https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo' });

  } else {
    swan.requestPolymerPayment(params);
  }
}

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  requestPayment: requestPayment });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "swan".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  {
    if (
    defaultValue === false &&
    Array.isArray(type) &&
    type.length === 2 &&
    type.indexOf(String) !== -1 &&
    type.indexOf(Boolean) !== -1)
    {// [String,Boolean]=>Boolean
      if (file) {
        console.warn("props.".concat(
        key, ".type should use Boolean instead of [String,Boolean] at ").concat(file));

      }
      return Boolean;
    }
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  {// mp-baidu，checked=>value
    if (
    isPlainObject(event.detail) &&
    hasOwn(event.detail, 'checked') &&
    !hasOwn(event.detail, 'value'))
    {
      event.detail.value = event.detail.checked;
    }
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-baidu";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

var mocks = ['nodeId', 'componentName'];

function isPage() {
  return !this.ownerId;
}

function initRelation(detail) {
  this.dispatch('__l', detail);
}

function parseApp(vm) {
  // 百度 onShow 竟然会在 onLaunch 之前
  var appOptions = parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

  appOptions.onShow = function onShow(args) {
    if (!this.$vm) {
      this.onLaunch(args);
    }
    this.$vm.__call_hook('onShow', args);
  };
  return appOptions;
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

var newLifecycle = swan.canIUse('lifecycle-2-0');

function parseComponent(vueOptions) {
  var componentOptions = parseBaseComponent(vueOptions, {
    isPage: isPage,
    initRelation: initRelation });


  // 关于百度小程序生命周期的说明(组件作为页面时):
  // lifetimes:attached --> methods:onShow --> methods:onLoad --> methods:onReady
  // 这里在强制将onShow挪到onLoad之后触发,另外一处修改在page-parser.js
  var oldAttached = componentOptions.lifetimes.attached;
  componentOptions.lifetimes.attached = function attached() {
    oldAttached.call(this);
    if (isPage.call(this)) {// 百度 onLoad 在 attached 之前触发
      // 百度 当组件作为页面时 pageinstancce 不是原来组件的 instance
      this.pageinstance.$vm = this.$vm;
      if (hasOwn(this.pageinstance, '_$args')) {
        this.$vm.$mp.query = this.pageinstance._$args;
        this.$vm.__call_hook('onLoad', this.pageinstance._$args);
        this.$vm.__call_hook('onShow');
        delete this.pageinstance._$args;
      }
    } else {
      // 百度小程序组件不触发methods内的onReady
      if (this.$vm) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
      }
    }
  };

  if (newLifecycle) {
    delete componentOptions.lifetimes.ready;
    componentOptions.methods.onReady = function () {
      if (this.$vm) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      }
    };
  }

  componentOptions.messages = {
    '__l': componentOptions.methods['__l'] };

  delete componentOptions.methods['__l'];

  return componentOptions;
}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function detached($vm) {
  $vm.$children.forEach(function (childVm) {
    childVm.$scope.detached();
  });
  $vm.$scope.detached();
}

function onPageUnload($vm) {
  $vm.$destroy();
  $vm.$children.forEach(function (childVm) {
    detached(childVm);
  });
}

function parsePage(vuePageOptions) {
  var pageOptions = parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  // 纠正百度小程序生命周期methods:onShow在methods:onLoad之前触发的问题
  pageOptions.methods.onShow = function onShow() {
    if (this.$vm && this.$vm.$mp.query) {
      this.$vm.__call_hook('onShow');
    }
  };

  pageOptions.methods.onLoad = function onLoad(args) {
    // 百度 onLoad 在 attached 之前触发，先存储 args, 在 attached 里边触发 onLoad
    if (this.$vm) {
      this.$vm.$mp.query = args;
      this.$vm.__call_hook('onLoad', args);
      this.$vm.__call_hook('onShow');
    } else {
      this.pageinstance._$args = args;
    }
  };

  pageOptions.methods.onUnload = function onUnload() {
    this.$vm.__call_hook('onUnload');
    onPageUnload(this.$vm);
  };

  return pageOptions;
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!swan.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-baidu" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(swan, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, swan[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(swan).forEach(function (name) {
    if (hasOwn(swan, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, swan[name]));
    }
  });
}

swan.createApp = createApp;
swan.createPage = createPage;
swan.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!******************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/pages.json ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-baidu"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-261120200409001","_inBundle":false,"_integrity":"sha512-iM1vsCzUEg80lCM7rSAkh+28ahjS9zQgiGsEoHxawCD9s7rTFnSRIaOuc7WHeQt6EclGUUIrMccYHXsLsNAXZg==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-261120200409001.tgz","_shasum":"e9daeef120f133bf3d4ca0505f5b2abed0e874a7","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"ff0877f516c1cc986cf2d7eae2bf5030c58050f9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-261120200409001"};

/***/ }),
/* 7 */
/*!***********************************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/pages.json?{"type":"style"} ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "我爱我家", "component": true }, "pages/message/message": { "navigationBarTitleText": "消息", "component": true }, "pages/user/user": { "navigationBarTitleText": "个人中心", "component": true }, "pages/citylist/citylist": { "navigationBarTitleText": "选择城市", "component": true } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "我爱我家", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),
/* 8 */
/*!**********************************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/pages.json?{"type":"stat"} ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/store/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));

var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);
// import {
// 	SET_CITY,
// 	SET_CITY_LOCATION,
// 	SET_CITY_ID,
// 	SET_CITY_LIST
// } from './mutation-types'


var state = {
  city: '北京', //手动选择城市
  citylocation: '北京', //定位城市
  cityid: '1',
  citylist: '' };


// const mutations = {
// 	[SET_CITY](state,city){
// 		state.city = city
// 	},
// 	[SET_CITY_LOCATION](state,city){
// 		state.citylocation = city
// 	},
// 	[SET_CITY_ID](state,id){
// 		state.cityid = id
// 	},
// 	[SET_CITY_LIST](state,citylist){
// 		state.citylist = citylist
// 	}
// }
var _default =

new _vuex.default.Store({
  state: state,
  mutations: _mutations.default });exports.default = _default;

/***/ }),
/* 16 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 17 */
/*!**************************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/store/mutations.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mutationTypes = __webpack_require__(/*! ./mutation-types */ 18);var _mutations;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var mutations = (_mutations = {}, _defineProperty(_mutations,
_mutationTypes.SET_CITY, function (state, city) {
  state.city = city;
}), _defineProperty(_mutations,
_mutationTypes.SET_CITY_LOCATION, function (state, city) {
  state.citylocation = city;
}), _defineProperty(_mutations,
_mutationTypes.SET_CITY_ID, function (state, id) {
  state.cityid = id;
}), _defineProperty(_mutations,
_mutationTypes.SET_CITY_LIST, function (state, citylist) {
  state.citylist = citylist;
}), _mutations);var _default =


mutations;exports.default = _default;

/***/ }),
/* 18 */
/*!*******************************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/store/mutation-types.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.SET_CITY_LIST = exports.SET_CITY_ID = exports.SET_CITY_LOCATION = exports.SET_CITY = void 0;var SET_CITY = 'SET_CITY'; //保存手动选择的城市
exports.SET_CITY = SET_CITY;var SET_CITY_LOCATION = 'SET_CITY_LOCATION'; //保存定位获取的城市
exports.SET_CITY_LOCATION = SET_CITY_LOCATION;var SET_CITY_ID = 'SET_CITY_ID'; //保存城市id
exports.SET_CITY_ID = SET_CITY_ID;var SET_CITY_LIST = 'SET_CITY_LIST'; //保存所有城市列表
exports.SET_CITY_LIST = SET_CITY_LIST;

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/*!*********************************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/common/js/commonConfig.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var commonConfig = {
  urlhost: 'https://appapi.5i5j.com' };var _default =


commonConfig;exports.default = _default;

/***/ }),
/* 26 */
/*!***************************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/common/wxs/tool.wxs ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var toolFn = {
  setStarArr:function(score){ //首页小区测评评星
    var str = score.toString().split('.');
    var arr = []
    for (var i = 0; i < str[0]; i++) {
      arr.push(3)
    }
    if (str[1] == 1 || str[1] == 2) {
      arr.push(1)
    } else if (str[1] > 2 && str[1] < 8) {
      arr.push(2)
    } else if (str[1] >= 8) {
      arr.push(3)
    }
    if (arr.length != 5) {
      var num = 5 - arr.length;
      for (var i = 0; i < num; i++) {
        arr.push(1)
      }
    }
    return arr
  }
}

module.exports = {
  setStarArr: toolFn.setStarArr
}

/***/ }),
/* 27 */
/*!***************************************************************************!*\
  !*** F:/demo/uni-app-study/uni-app-study/common/js/qqmap-wx-jssdk.min.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(wx) {function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var ERROR_CONF = { KEY_ERR: 311, KEY_ERR_MSG: 'key格式错误', PARAM_ERR: 310, PARAM_ERR_MSG: '请求参数信息有误', SYSTEM_ERR: 600, SYSTEM_ERR_MSG: '系统错误', WX_ERR_CODE: 1000, WX_OK_CODE: 200 };var BASE_URL = 'https://apis.map.qq.com/ws/';var URL_SEARCH = BASE_URL + 'place/v1/search';var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';var URL_CITY_LIST = BASE_URL + 'district/v1/list';var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';var URL_DISTANCE = BASE_URL + 'distance/v1/';var URL_DIRECTION = BASE_URL + 'direction/v1/';var MODE = { driving: 'driving', transit: 'transit' };var EARTH_RADIUS = 6378136.49;var Utils = { safeAdd: function safeAdd(x, y) {var lsw = (x & 0xffff) + (y & 0xffff);var msw = (x >> 16) + (y >> 16) + (lsw >> 16);return msw << 16 | lsw & 0xffff;}, bitRotateLeft: function bitRotateLeft(num, cnt) {return num << cnt | num >>> 32 - cnt;}, md5cmn: function md5cmn(q, a, b, x, s, t) {return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);}, md5ff: function md5ff(a, b, c, d, x, s, t) {return this.md5cmn(b & c | ~b & d, a, b, x, s, t);}, md5gg: function md5gg(a, b, c, d, x, s, t) {return this.md5cmn(b & d | c & ~d, a, b, x, s, t);}, md5hh: function md5hh(a, b, c, d, x, s, t) {return this.md5cmn(b ^ c ^ d, a, b, x, s, t);}, md5ii: function md5ii(a, b, c, d, x, s, t) {return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);}, binlMD5: function binlMD5(x, len) {x[len >> 5] |= 0x80 << len % 32;x[(len + 64 >>> 9 << 4) + 14] = len;var i;var olda;var oldb;var oldc;var oldd;var a = 1732584193;var b = -271733879;var c = -1732584194;var d = 271733878;for (i = 0; i < x.length; i += 16) {olda = a;oldb = b;oldc = c;oldd = d;a = this.md5ff(a, b, c, d, x[i], 7, -680876936);d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);b = this.md5gg(b, c, d, a, x[i], 20, -373897302);a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);d = this.md5hh(d, a, b, c, x[i], 11, -358537222);c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);a = this.md5ii(a, b, c, d, x[i], 6, -198630844);d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);a = this.safeAdd(a, olda);b = this.safeAdd(b, oldb);c = this.safeAdd(c, oldc);d = this.safeAdd(d, oldd);}return [a, b, c, d];}, binl2rstr: function binl2rstr(input) {var i;var output = '';var length32 = input.length * 32;for (i = 0; i < length32; i += 8) {output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);}return output;}, rstr2binl: function rstr2binl(input) {var i;var output = [];output[(input.length >> 2) - 1] = undefined;for (i = 0; i < output.length; i += 1) {output[i] = 0;}var length8 = input.length * 8;for (i = 0; i < length8; i += 8) {output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;}return output;}, rstrMD5: function rstrMD5(s) {return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));}, rstrHMACMD5: function rstrHMACMD5(key, data) {var i;var bkey = this.rstr2binl(key);var ipad = [];var opad = [];var hash;ipad[15] = opad[15] = undefined;if (bkey.length > 16) {bkey = this.binlMD5(bkey, key.length * 8);}for (i = 0; i < 16; i += 1) {ipad[i] = bkey[i] ^ 0x36363636;opad[i] = bkey[i] ^ 0x5c5c5c5c;}hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));}, rstr2hex: function rstr2hex(input) {var hexTab = '0123456789abcdef';var output = '';var x;var i;for (i = 0; i < input.length; i += 1) {x = input.charCodeAt(i);output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);}return output;}, str2rstrUTF8: function str2rstrUTF8(input) {return unescape(encodeURIComponent(input));}, rawMD5: function rawMD5(s) {return this.rstrMD5(this.str2rstrUTF8(s));}, hexMD5: function hexMD5(s) {return this.rstr2hex(this.rawMD5(s));}, rawHMACMD5: function rawHMACMD5(k, d) {return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));}, hexHMACMD5: function hexHMACMD5(k, d) {return this.rstr2hex(this.rawHMACMD5(k, d));}, md5: function md5(string, key, raw) {if (!key) {if (!raw) {return this.hexMD5(string);}return this.rawMD5(string);}if (!raw) {return this.hexHMACMD5(key, string);}return this.rawHMACMD5(key, string);}, getSig: function getSig(requestParam, sk, feature, mode) {var sig = null;var requestArr = [];Object.keys(requestParam).sort().forEach(function (key) {requestArr.push(key + '=' + requestParam[key]);});if (feature == 'search') {sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;}if (feature == 'suggest') {sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;}if (feature == 'reverseGeocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'geocoder') {sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;}if (feature == 'getCityList') {sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;}if (feature == 'getDistrictByCityId') {sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;}if (feature == 'calculateDistance') {sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;}if (feature == 'direction') {sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;}sig = this.md5(sig);return sig;}, location2query: function location2query(data) {if (typeof data == 'string') {return data;}var query = '';for (var i = 0; i < data.length; i++) {var d = data[i];if (!!query) {query += ';';}if (d.location) {query = query + d.location.lat + ',' + d.location.lng;}if (d.latitude && d.longitude) {query = query + d.latitude + ',' + d.longitude;}}return query;}, rad: function rad(d) {return d * Math.PI / 180.0;}, getEndLocation: function getEndLocation(location) {var to = location.split(';');var endLocation = [];for (var i = 0; i < to.length; i++) {endLocation.push({ lat: parseFloat(to[i].split(',')[0]), lng: parseFloat(to[i].split(',')[1]) });}return endLocation;}, getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {var radLatFrom = this.rad(latFrom);var radLatTo = this.rad(latTo);var a = radLatFrom - radLatTo;var b = this.rad(lngFrom) - this.rad(lngTo);var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));distance = distance * EARTH_RADIUS;distance = Math.round(distance * 10000) / 10000;return parseFloat(distance.toFixed(0));}, getWXLocation: function getWXLocation(success, fail, complete) {wx.getLocation({ type: 'gcj02', success: success, fail: fail, complete: complete });}, getLocationParam: function getLocationParam(location) {if (typeof location == 'string') {var locationArr = location.split(',');if (locationArr.length === 2) {location = { latitude: location.split(',')[0], longitude: location.split(',')[1] };} else {location = {};}}return location;}, polyfillParam: function polyfillParam(param) {param.success = param.success || function () {};param.fail = param.fail || function () {};param.complete = param.complete || function () {};}, checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {if (!param[key]) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');param.fail(errconf);param.complete(errconf);return true;}return false;}, checkKeyword: function checkKeyword(param) {return !this.checkParamKeyEmpty(param, 'keyword');}, checkLocation: function checkLocation(param) {var location = this.getLocationParam(param.location);if (!location || !location.latitude || !location.longitude) {var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');param.fail(errconf);param.complete(errconf);return false;}return true;}, buildErrorConfig: function buildErrorConfig(errCode, errMsg) {return { status: errCode, message: errMsg };}, handleData: function handleData(param, data, feature) {if (feature == 'search') {var searchResult = data.data;var searchSimplify = [];for (var i = 0; i < searchResult.length; i++) {searchSimplify.push({ id: searchResult[i].id || null, title: searchResult[i].title || null, latitude: searchResult[i].location && searchResult[i].location.lat || null, longitude: searchResult[i].location && searchResult[i].location.lng || null, address: searchResult[i].address || null, category: searchResult[i].category || null, tel: searchResult[i].tel || null, adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null, city: searchResult[i].ad_info && searchResult[i].ad_info.city || null, district: searchResult[i].ad_info && searchResult[i].ad_info.district || null, province: searchResult[i].ad_info && searchResult[i].ad_info.province || null });}param.success(data, { searchResult: searchResult, searchSimplify: searchSimplify });} else if (feature == 'suggest') {var suggestResult = data.data;var suggestSimplify = [];for (var i = 0; i < suggestResult.length; i++) {suggestSimplify.push({ adcode: suggestResult[i].adcode || null, address: suggestResult[i].address || null, category: suggestResult[i].category || null, city: suggestResult[i].city || null, district: suggestResult[i].district || null, id: suggestResult[i].id || null, latitude: suggestResult[i].location && suggestResult[i].location.lat || null, longitude: suggestResult[i].location && suggestResult[i].location.lng || null, province: suggestResult[i].province || null, title: suggestResult[i].title || null, type: suggestResult[i].type || null });}param.success(data, { suggestResult: suggestResult, suggestSimplify: suggestSimplify });} else if (feature == 'reverseGeocoder') {var reverseGeocoderResult = data.result;var reverseGeocoderSimplify = { address: reverseGeocoderResult.address || null, latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null, longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null, adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null, city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null, district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null, nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null, province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null, street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null, street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null, recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null, rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null };if (reverseGeocoderResult.pois) {var pois = reverseGeocoderResult.pois;var poisSimplify = [];for (var i = 0; i < pois.length; i++) {poisSimplify.push({ id: pois[i].id || null, title: pois[i].title || null, latitude: pois[i].location && pois[i].location.lat || null, longitude: pois[i].location && pois[i].location.lng || null, address: pois[i].address || null, category: pois[i].category || null, adcode: pois[i].ad_info && pois[i].ad_info.adcode || null, city: pois[i].ad_info && pois[i].ad_info.city || null, district: pois[i].ad_info && pois[i].ad_info.district || null, province: pois[i].ad_info && pois[i].ad_info.province || null });}param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify, pois: pois, poisSimplify: poisSimplify });} else {param.success(data, { reverseGeocoderResult: reverseGeocoderResult, reverseGeocoderSimplify: reverseGeocoderSimplify });}} else if (feature == 'geocoder') {var geocoderResult = data.result;var geocoderSimplify = { title: geocoderResult.title || null, latitude: geocoderResult.location && geocoderResult.location.lat || null, longitude: geocoderResult.location && geocoderResult.location.lng || null, adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null, province: geocoderResult.address_components && geocoderResult.address_components.province || null, city: geocoderResult.address_components && geocoderResult.address_components.city || null, district: geocoderResult.address_components && geocoderResult.address_components.district || null, street: geocoderResult.address_components && geocoderResult.address_components.street || null, street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null, level: geocoderResult.level || null };param.success(data, { geocoderResult: geocoderResult, geocoderSimplify: geocoderSimplify });} else if (feature == 'getCityList') {var provinceResult = data.result[0];var cityResult = data.result[1];var districtResult = data.result[2];param.success(data, { provinceResult: provinceResult, cityResult: cityResult, districtResult: districtResult });} else if (feature == 'getDistrictByCityId') {var districtByCity = data.result[0];param.success(data, districtByCity);} else if (feature == 'calculateDistance') {var calculateDistanceResult = data.result.elements;var distance = [];for (var i = 0; i < calculateDistanceResult.length; i++) {distance.push(calculateDistanceResult[i].distance);}param.success(data, { calculateDistanceResult: calculateDistanceResult, distance: distance });} else if (feature == 'direction') {var direction = data.result.routes;param.success(data, direction);} else {param.success(data);}}, buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {var that = this;options.header = { "content-type": "application/json" };options.method = 'GET';options.success = function (res) {var data = res.data;if (data.status === 0) {that.handleData(param, data, feature);} else {param.fail(data);}};options.fail = function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};options.complete = function (res) {var statusCode = +res.statusCode;switch (statusCode) {case ERROR_CONF.WX_ERR_CODE:{param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));break;}case ERROR_CONF.WX_OK_CODE:{var data = res.data;if (data.status === 0) {param.complete(data);} else {param.complete(that.buildErrorConfig(data.status, data.message));}break;}default:{param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));}}};return options;}, locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {var that = this;locationfail = locationfail || function (res) {res.statusCode = ERROR_CONF.WX_ERR_CODE;param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));};locationcomplete = locationcomplete || function (res) {if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));}};if (!param.location) {that.getWXLocation(locationsuccess, locationfail, locationcomplete);} else if (that.checkLocation(param)) {var location = Utils.getLocationParam(param.location);locationsuccess(location);}} };var QQMapWX = /*#__PURE__*/function () {"use strict";function QQMapWX(options) {_classCallCheck(this, QQMapWX);if (!options.key) {throw Error('key值不能为空');}this.key = options.key;}_createClass(QQMapWX, [{ key: "search", value: function search(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, orderby: options.orderby || '_distance', page_size: options.page_size || 10, page_index: options.page_index || 1, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}var distance = options.distance || "1000";var auto_extend = options.auto_extend || 1;var region = null;var rectangle = null;if (options.region) {region = options.region;}if (options.rectangle) {rectangle = options.rectangle;}var locationsuccess = function locationsuccess(result) {if (region && !rectangle) {requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else if (rectangle && !region) {requestParam.boundary = "rectangle(" + rectangle + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}} else {requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');}}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SEARCH, data: requestParam }, 'search'));};Utils.locationProcess(options, locationsuccess);} }, { key: "getSuggestion", value: function getSuggestion(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (!Utils.checkKeyword(options)) {return;}var requestParam = { keyword: options.keyword, region: options.region || '全国', region_fix: options.region_fix || 0, policy: options.policy || 0, page_size: options.page_size || 10, page_index: options.page_index || 1, get_subpois: options.get_subpois || 0, output: 'json', key: that.key };if (options.address_format) {requestParam.address_format = options.address_format;}if (options.filter) {requestParam.filter = options.filter;}if (options.location) {var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));};Utils.locationProcess(options, locationsuccess);} else {if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_SUGGESTION, data: requestParam }, "suggest"));}} }, { key: "reverseGeocoder", value: function reverseGeocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { coord_type: options.coord_type || 5, get_poi: options.get_poi || 0, output: 'json', key: that.key };if (options.poi_options) {requestParam.poi_options = options.poi_options;}var locationsuccess = function locationsuccess(result) {requestParam.location = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'reverseGeocoder'));};Utils.locationProcess(options, locationsuccess);} }, { key: "geocoder", value: function geocoder(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'address')) {return;}var requestParam = { address: options.address, output: 'json', key: that.key };if (options.region) {requestParam.region = options.region;}if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_GET_GEOCODER, data: requestParam }, 'geocoder'));} }, { key: "getCityList", value: function getCityList(options) {var that = this;options = options || {};Utils.polyfillParam(options);var requestParam = { output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_CITY_LIST, data: requestParam }, 'getCityList'));} }, { key: "getDistrictByCityId", value: function getDistrictByCityId(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'id')) {return;}var requestParam = { id: options.id || '', output: 'json', key: that.key };if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_AREA_LIST, data: requestParam }, 'getDistrictByCityId'));} }, { key: "calculateDistance", value: function calculateDistance(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { mode: options.mode || 'walking', to: Utils.location2query(options.to), output: 'json', key: that.key };if (options.from) {options.location = options.from;}if (requestParam.mode == 'straight') {var locationsuccess = function locationsuccess(result) {var locationTo = Utils.getEndLocation(requestParam.to);var data = { message: "query ok", result: { elements: [] }, status: 0 };for (var i = 0; i < locationTo.length; i++) {data.result.elements.push({ distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng), duration: 0, from: { lat: result.latitude, lng: result.longitude }, to: { lat: locationTo[i].lat, lng: locationTo[i].lng } });}var calculateResult = data.result.elements;var distanceResult = [];for (var i = 0; i < calculateResult.length; i++) {distanceResult.push(calculateResult[i].distance);}return options.success(data, { calculateResult: calculateResult, distanceResult: distanceResult });};Utils.locationProcess(options, locationsuccess);} else {var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');}wx.request(Utils.buildWxRequestConfig(options, { url: URL_DISTANCE, data: requestParam }, 'calculateDistance'));};Utils.locationProcess(options, locationsuccess);}} }, { key: "direction", value: function direction(options) {var that = this;options = options || {};Utils.polyfillParam(options);if (Utils.checkParamKeyEmpty(options, 'to')) {return;}var requestParam = { output: 'json', key: that.key };if (typeof options.to == 'string') {requestParam.to = options.to;} else {requestParam.to = options.to.latitude + ',' + options.to.longitude;}var SET_URL_DIRECTION = null;options.mode = options.mode || MODE.driving;SET_URL_DIRECTION = URL_DIRECTION + options.mode;if (options.from) {options.location = options.from;}if (options.mode == MODE.driving) {if (options.from_poi) {requestParam.from_poi = options.from_poi;}if (options.heading) {requestParam.heading = options.heading;}if (options.speed) {requestParam.speed = options.speed;}if (options.accuracy) {requestParam.accuracy = options.accuracy;}if (options.road_type) {requestParam.road_type = options.road_type;}if (options.to_poi) {requestParam.to_poi = options.to_poi;}if (options.from_track) {requestParam.from_track = options.from_track;}if (options.waypoints) {requestParam.waypoints = options.waypoints;}if (options.policy) {requestParam.policy = options.policy;}if (options.plate_number) {requestParam.plate_number = options.plate_number;}}if (options.mode == MODE.transit) {if (options.departure_time) {requestParam.departure_time = options.departure_time;}if (options.policy) {requestParam.policy = options.policy;}}var locationsuccess = function locationsuccess(result) {requestParam.from = result.latitude + ',' + result.longitude;if (options.sig) {requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);}wx.request(Utils.buildWxRequestConfig(options, { url: SET_URL_DIRECTION, data: requestParam }, 'direction'));};Utils.locationProcess(options, locationsuccess);} }]);return QQMapWX;}();;module.exports = QQMapWX;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ })
]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3VuaS1tcC1iYWlkdS9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL21wLXZ1ZS9kaXN0L21wLnJ1bnRpbWUuZXNtLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkY2xvdWRpby91bmktc3RhdC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy9GOi9kZW1vL3VuaS1hcHAtc3R1ZHkvdW5pLWFwcC1zdHVkeS9wYWdlcy5qc29uIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vRjovZGVtby91bmktYXBwLXN0dWR5L3VuaS1hcHAtc3R1ZHkvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZXgvZGlzdC92dWV4LmVzbS5qcyIsIndlYnBhY2s6Ly8vRjovZGVtby91bmktYXBwLXN0dWR5L3VuaS1hcHAtc3R1ZHkvc3RvcmUvbXV0YXRpb25zLmpzIiwid2VicGFjazovLy9GOi9kZW1vL3VuaS1hcHAtc3R1ZHkvdW5pLWFwcC1zdHVkeS9zdG9yZS9tdXRhdGlvbi10eXBlcy5qcyIsIndlYnBhY2s6Ly8vRjovZGVtby91bmktYXBwLXN0dWR5L3VuaS1hcHAtc3R1ZHkvY29tbW9uL2pzL2NvbW1vbkNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vRjovZGVtby91bmktYXBwLXN0dWR5L3VuaS1hcHAtc3R1ZHkvY29tbW9uL3d4cy90b29sLnd4cyIsIndlYnBhY2s6Ly8vRjovZGVtby91bmktYXBwLXN0dWR5L3VuaS1hcHAtc3R1ZHkvY29tbW9uL2pzL3FxbWFwLXd4LWpzc2RrLm1pbi5qcyJdLCJuYW1lcyI6WyJfdG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImhhc093blByb3BlcnR5IiwiaXNGbiIsImZuIiwiaXNTdHIiLCJzdHIiLCJpc1BsYWluT2JqZWN0Iiwib2JqIiwiY2FsbCIsImhhc093biIsImtleSIsIm5vb3AiLCJjYWNoZWQiLCJjYWNoZSIsImNyZWF0ZSIsImNhY2hlZEZuIiwiaGl0IiwiY2FtZWxpemVSRSIsImNhbWVsaXplIiwicmVwbGFjZSIsIl8iLCJjIiwidG9VcHBlckNhc2UiLCJIT09LUyIsImdsb2JhbEludGVyY2VwdG9ycyIsInNjb3BlZEludGVyY2VwdG9ycyIsIm1lcmdlSG9vayIsInBhcmVudFZhbCIsImNoaWxkVmFsIiwicmVzIiwiY29uY2F0IiwiQXJyYXkiLCJpc0FycmF5IiwiZGVkdXBlSG9va3MiLCJob29rcyIsImkiLCJsZW5ndGgiLCJpbmRleE9mIiwicHVzaCIsInJlbW92ZUhvb2siLCJob29rIiwiaW5kZXgiLCJzcGxpY2UiLCJtZXJnZUludGVyY2VwdG9ySG9vayIsImludGVyY2VwdG9yIiwib3B0aW9uIiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVJbnRlcmNlcHRvckhvb2siLCJhZGRJbnRlcmNlcHRvciIsIm1ldGhvZCIsInJlbW92ZUludGVyY2VwdG9yIiwid3JhcHBlckhvb2siLCJkYXRhIiwiaXNQcm9taXNlIiwidGhlbiIsInF1ZXVlIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2FsbGJhY2siLCJ3cmFwcGVyT3B0aW9ucyIsIm9wdGlvbnMiLCJuYW1lIiwib2xkQ2FsbGJhY2siLCJjYWxsYmFja0ludGVyY2VwdG9yIiwid3JhcHBlclJldHVyblZhbHVlIiwicmV0dXJuVmFsdWUiLCJyZXR1cm5WYWx1ZUhvb2tzIiwiZ2V0QXBpSW50ZXJjZXB0b3JIb29rcyIsInNsaWNlIiwic2NvcGVkSW50ZXJjZXB0b3IiLCJpbnZva2VBcGkiLCJhcGkiLCJwYXJhbXMiLCJpbnZva2UiLCJwcm9taXNlSW50ZXJjZXB0b3IiLCJjYXRjaCIsIlNZTkNfQVBJX1JFIiwiQ09OVEVYVF9BUElfUkUiLCJBU1lOQ19BUEkiLCJDQUxMQkFDS19BUElfUkUiLCJpc0NvbnRleHRBcGkiLCJ0ZXN0IiwiaXNTeW5jQXBpIiwiaXNDYWxsYmFja0FwaSIsImhhbmRsZVByb21pc2UiLCJlcnIiLCJzaG91bGRQcm9taXNlIiwiZmluYWxseSIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJyZWFzb24iLCJwcm9taXNpZnkiLCJwcm9taXNlQXBpIiwic3VjY2VzcyIsImZhaWwiLCJjb21wbGV0ZSIsInJlamVjdCIsImFzc2lnbiIsIkVQUyIsIkJBU0VfREVWSUNFX1dJRFRIIiwiaXNJT1MiLCJkZXZpY2VXaWR0aCIsImRldmljZURQUiIsImNoZWNrRGV2aWNlV2lkdGgiLCJzd2FuIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJwbGF0Zm9ybSIsInBpeGVsUmF0aW8iLCJ3aW5kb3dXaWR0aCIsInVweDJweCIsIm51bWJlciIsIm5ld0RldmljZVdpZHRoIiwiTnVtYmVyIiwicmVzdWx0IiwiTWF0aCIsImZsb29yIiwiaW50ZXJjZXB0b3JzIiwiYmFzZUFwaSIsImZyZWV6ZSIsIl9fcHJvdG9fXyIsInByZXZpZXdJbWFnZSIsImFyZ3MiLCJmcm9tQXJncyIsImN1cnJlbnRJbmRleCIsInBhcnNlSW50IiwiY3VycmVudCIsImlzTmFOIiwidXJscyIsImxlbiIsImZpbHRlciIsIml0ZW0iLCJpbmRpY2F0b3IiLCJsb29wIiwidG9kb3MiLCJjYW5JVXNlcyIsImNyZWF0ZVRvZG9NZXRob2QiLCJjb250ZXh0TmFtZSIsIm1ldGhvZE5hbWUiLCJ1bnN1cHBvcnRlZCIsImNvbnNvbGUiLCJlcnJvciIsIl9oYW5kbGVFbnZJbmZvIiwibWluaVByb2dyYW0iLCJhcHBJZCIsImFwcEtleSIsInBsdWdpbiIsInZlcnNpb24iLCJzZGtWZXJzaW9uIiwicHJvdG9jb2xzIiwicmVxdWVzdCIsImRhdGFUeXBlIiwidHlwZSIsImNvbm5lY3RTb2NrZXQiLCJnZXRSZWNvcmRlck1hbmFnZXIiLCJmcm9tUmV0Iiwib25GcmFtZVJlY29yZGVkIiwiZ2V0QmFja2dyb3VuZEF1ZGlvTWFuYWdlciIsIm9uUHJldiIsIm9uTmV4dCIsInNjYW5Db2RlIiwib25seUZyb21DYW1lcmEiLCJzY2FuVHlwZSIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImVudlZlcnNpb24iLCJuYXZpZ2F0ZUJhY2tNaW5pUHJvZ3JhbSIsInNob3dTaGFyZU1lbnUiLCJnZXRBY2NvdW50SW5mb1N5bmMiLCJDQUxMQkFDS1MiLCJwcm9jZXNzQ2FsbGJhY2siLCJwcm9jZXNzUmV0dXJuVmFsdWUiLCJwcm9jZXNzQXJncyIsImFyZ3NPcHRpb24iLCJrZWVwRnJvbUFyZ3MiLCJ0b0FyZ3MiLCJrZXlPcHRpb24iLCJ3YXJuIiwia2VlcFJldHVyblZhbHVlIiwid3JhcHBlciIsInByb3RvY29sIiwiYXJnMSIsImFyZzIiLCJhcHBseSIsInRvZG9BcGlzIiwiVE9ET1MiLCJjcmVhdGVUb2RvQXBpIiwidG9kb0FwaSIsImVyck1zZyIsInByb3ZpZGVycyIsIm9hdXRoIiwic2hhcmUiLCJwYXltZW50IiwiZ2V0UHJvdmlkZXIiLCJzZXJ2aWNlIiwicHJvdmlkZXIiLCJleHRyYUFwaSIsImdldEVtaXR0ZXIiLCJnZXRVbmlFbWl0dGVyIiwiRW1pdHRlciIsIlZ1ZSIsImN0eCIsIiRvbiIsImFyZ3VtZW50cyIsIiRvZmYiLCIkb25jZSIsIiRlbWl0IiwiZXZlbnRBcGkiLCJyZXF1ZXN0UGF5bWVudCIsInBhcnNlRXJyb3IiLCJvcmRlckluZm8iLCJKU09OIiwicGFyc2UiLCJlIiwicmVxdWVzdFBvbHltZXJQYXltZW50IiwiTVBQYWdlIiwiUGFnZSIsIk1QQ29tcG9uZW50IiwiQ29tcG9uZW50IiwiY3VzdG9taXplUkUiLCJjdXN0b21pemUiLCJpbml0VHJpZ2dlckV2ZW50IiwibXBJbnN0YW5jZSIsIm9sZFRyaWdnZXJFdmVudCIsInRyaWdnZXJFdmVudCIsImV2ZW50IiwiaW5pdEhvb2siLCJvbGRIb29rIiwiUEFHRV9FVkVOVF9IT09LUyIsImluaXRNb2NrcyIsInZtIiwibW9ja3MiLCIkbXAiLCJtcFR5cGUiLCJtb2NrIiwiaGFzSG9vayIsInZ1ZU9wdGlvbnMiLCJkZWZhdWx0IiwiZXh0ZW5kT3B0aW9ucyIsInN1cGVyIiwibWl4aW5zIiwiZmluZCIsIm1peGluIiwiaW5pdEhvb2tzIiwibXBPcHRpb25zIiwiJHZtIiwiX19jYWxsX2hvb2siLCJpbml0VnVlQ29tcG9uZW50IiwiVnVlQ29tcG9uZW50IiwiZXh0ZW5kIiwiaW5pdFNsb3RzIiwidnVlU2xvdHMiLCIkc2xvdHMiLCJzbG90TmFtZSIsIiRzY29wZWRTbG90cyIsImluaXRWdWVJZHMiLCJ2dWVJZHMiLCJzcGxpdCIsIl8kdnVlSWQiLCJfJHZ1ZVBpZCIsImluaXREYXRhIiwiY29udGV4dCIsIm1ldGhvZHMiLCJwcm9jZXNzIiwiVlVFX0FQUF9ERUJVRyIsInN0cmluZ2lmeSIsIl9fbGlmZWN5Y2xlX2hvb2tzX18iLCJQUk9QX1RZUEVTIiwiU3RyaW5nIiwiQm9vbGVhbiIsImNyZWF0ZU9ic2VydmVyIiwib2JzZXJ2ZXIiLCJuZXdWYWwiLCJvbGRWYWwiLCJpbml0QmVoYXZpb3JzIiwiaW5pdEJlaGF2aW9yIiwidnVlQmVoYXZpb3JzIiwidnVlRXh0ZW5kcyIsInZ1ZU1peGlucyIsInZ1ZVByb3BzIiwiYmVoYXZpb3JzIiwiYmVoYXZpb3IiLCJEYXRlIiwicHJvcHMiLCJwcm9wZXJ0aWVzIiwiaW5pdFByb3BlcnRpZXMiLCJ2dWVNaXhpbiIsInBhcnNlUHJvcFR5cGUiLCJkZWZhdWx0VmFsdWUiLCJmaWxlIiwiaXNCZWhhdmlvciIsInZ1ZUlkIiwic2V0RGF0YSIsIm9wdHMiLCJ3cmFwcGVyJDEiLCJtcCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiZGV0YWlsIiwiY2hlY2tlZCIsImdldEV4dHJhVmFsdWUiLCJkYXRhUGF0aHNBcnJheSIsImRhdGFQYXRoQXJyYXkiLCJkYXRhUGF0aCIsInByb3BQYXRoIiwidmFsdWVQYXRoIiwidkZvciIsIl9fZ2V0X3ZhbHVlIiwiaXNJbnRlZ2VyIiwidkZvckl0ZW0iLCJ2Rm9yS2V5IiwicHJvY2Vzc0V2ZW50RXh0cmEiLCJleHRyYSIsImV4dHJhT2JqIiwiZ2V0T2JqQnlBcnJheSIsImFyciIsImVsZW1lbnQiLCJwcm9jZXNzRXZlbnRBcmdzIiwiaXNDdXN0b20iLCJpc0N1c3RvbU1QRXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvbVR5cGUiLCJfX2FyZ3NfXyIsInJldCIsImFyZyIsIk9OQ0UiLCJDVVNUT00iLCJpc01hdGNoRXZlbnRUeXBlIiwiZXZlbnRUeXBlIiwib3B0VHlwZSIsImhhbmRsZUV2ZW50IiwiZXZlbnRPcHRzIiwiZXZlbnRPcHQiLCJldmVudHNBcnJheSIsImNoYXJBdCIsImlzT25jZSIsImV2ZW50QXJyYXkiLCJoYW5kbGVyQ3R4IiwiJG9wdGlvbnMiLCJnZW5lcmljIiwiJHBhcmVudCIsImhhbmRsZXIiLCJFcnJvciIsIm9uY2UiLCJwYXJzZUJhc2VBcHAiLCJpbml0UmVmcyIsInN0b3JlIiwiJHN0b3JlIiwibXBIb3N0IiwiYmVmb3JlQ3JlYXRlIiwiJHNjb3BlIiwiYXBwT3B0aW9ucyIsIm9uTGF1bmNoIiwiYXBwIiwiZ2xvYmFsRGF0YSIsIl9pc01vdW50ZWQiLCJmaW5kVm1CeVZ1ZUlkIiwidnVlUGlkIiwiJGNoaWxkcmVuIiwiY2hpbGRWbSIsInBhcmVudFZtIiwiQmVoYXZpb3IiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsIiRyZWZzIiwiY29tcG9uZW50cyIsInNlbGVjdEFsbENvbXBvbmVudHMiLCJjb21wb25lbnQiLCJyZWYiLCJmb3JDb21wb25lbnRzIiwiaGFuZGxlTGluayIsInBhcmVudCIsImlzUGFnZSIsIm93bmVySWQiLCJpbml0UmVsYXRpb24iLCJkaXNwYXRjaCIsInBhcnNlQXBwIiwib25TaG93IiwiY3JlYXRlQXBwIiwiQXBwIiwicGFyc2VCYXNlQ29tcG9uZW50IiwidnVlQ29tcG9uZW50T3B0aW9ucyIsIm11bHRpcGxlU2xvdHMiLCJhZGRHbG9iYWxDbGFzcyIsImNvbXBvbmVudE9wdGlvbnMiLCJfX2ZpbGUiLCJsaWZldGltZXMiLCJhdHRhY2hlZCIsInByb3BzRGF0YSIsIiRtb3VudCIsInJlYWR5IiwiZGV0YWNoZWQiLCIkZGVzdHJveSIsInBhZ2VMaWZldGltZXMiLCJzaG93IiwiaGlkZSIsInJlc2l6ZSIsInNpemUiLCJfX2wiLCJfX2UiLCJ3eHNDYWxsTWV0aG9kcyIsImNhbGxNZXRob2QiLCJuZXdMaWZlY3ljbGUiLCJjYW5JVXNlIiwicGFyc2VDb21wb25lbnQiLCJvbGRBdHRhY2hlZCIsInBhZ2VpbnN0YW5jZSIsInF1ZXJ5IiwiXyRhcmdzIiwib25SZWFkeSIsIm1lc3NhZ2VzIiwiaG9va3MkMSIsInBhcnNlQmFzZVBhZ2UiLCJ2dWVQYWdlT3B0aW9ucyIsInBhZ2VPcHRpb25zIiwib25Mb2FkIiwib25QYWdlVW5sb2FkIiwicGFyc2VQYWdlIiwib25VbmxvYWQiLCJjcmVhdGVQYWdlIiwiY3JlYXRlQ29tcG9uZW50IiwiY2FuSVVzZUFwaSIsImFwaU5hbWUiLCJ1bmkiLCJQcm94eSIsInNldCIsInVuaSQxIiwiU1RBVF9WRVJTSU9OIiwiU1RBVF9VUkwiLCJTVEFUX0g1X1VSTCIsIlBBR0VfUFZFUl9USU1FIiwiQVBQX1BWRVJfVElNRSIsIk9QRVJBVElOR19USU1FIiwiVVVJRF9LRVkiLCJVVUlEX1ZBTFVFIiwiZ2V0VXVpZCIsInV1aWQiLCJnZXRQbGF0Zm9ybU5hbWUiLCJwbHVzIiwicnVudGltZSIsImdldERDbG91ZElkIiwiZ2V0U3RvcmFnZVN5bmMiLCJub3ciLCJyYW5kb20iLCJzZXRTdG9yYWdlU3luYyIsImdldFNnaW4iLCJzdGF0RGF0YSIsInNvcnRBcnIiLCJzb3J0Iiwic2dpbiIsInNnaW5TdHIiLCJzaWduIiwic3Vic3RyIiwiZ2V0U3BsaWNpbmciLCJnZXRUaW1lIiwicGxhdGZvcm1MaXN0IiwiZ2V0UGFja05hbWUiLCJwYWNrTmFtZSIsImdldFZlcnNpb24iLCJnZXRDaGFubmVsIiwicGxhdGZvcm1OYW1lIiwiY2hhbm5lbCIsImdldFNjZW5lIiwic2NlbmUiLCJnZXRMYXVuY2hPcHRpb25zU3luYyIsIkZpcnN0X19WaXNpdF9fVGltZV9fS0VZIiwiTGFzdF9fVmlzaXRfX1RpbWVfX0tFWSIsImdldEZpcnN0VmlzaXRUaW1lIiwidGltZVN0b3JnZSIsInRpbWUiLCJyZW1vdmVTdG9yYWdlU3luYyIsImdldExhc3RWaXNpdFRpbWUiLCJQQUdFX1JFU0lERU5DRV9USU1FIiwiRmlyc3RfUGFnZV9yZXNpZGVuY2VfdGltZSIsIkxhc3RfUGFnZV9yZXNpZGVuY2VfdGltZSIsInNldFBhZ2VSZXNpZGVuY2VUaW1lIiwiZ2V0UGFnZVJlc2lkZW5jZVRpbWUiLCJUT1RBTF9fVklTSVRfX0NPVU5UIiwiZ2V0VG90YWxWaXNpdENvdW50IiwiY291bnQiLCJHZXRFbmNvZGVVUklDb21wb25lbnRPcHRpb25zIiwicHJvcCIsImVuY29kZVVSSUNvbXBvbmVudCIsIlNldF9fRmlyc3RfX1RpbWUiLCJTZXRfX0xhc3RfX1RpbWUiLCJnZXRGaXJzdFRpbWUiLCJnZXRMYXN0VGltZSIsImdldFJlc2lkZW5jZVRpbWUiLCJyZXNpZGVuY2VUaW1lIiwib3ZlcnRpbWUiLCJnZXRSb3V0ZSIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicGFnZSIsIl9zZWxmIiwiaXMiLCJyb3V0ZSIsImdldFBhZ2VSb3V0ZSIsInNlbGYiLCJfcXVlcnkiLCJnZXRQYWdlVHlwZXMiLCJjYWxpYnJhdGlvbiIsImV2ZW50TmFtZSIsIlBhZ2VzSnNvbiIsInJlcXVpcmUiLCJzdGF0Q29uZmlnIiwicmVzdWx0T3B0aW9ucyIsIlV0aWwiLCJfcmV0cnkiLCJfcGxhdGZvcm0iLCJfbmF2aWdhdGlvbkJhclRpdGxlIiwiY29uZmlnIiwicmVwb3J0IiwibHQiLCJfb3BlcmF0aW5nVGltZSIsIl9yZXBvcnRpbmdSZXF1ZXN0RGF0YSIsIl9fcHJldmVudF90cmlnZ2VyaW5nIiwiX19saWNhdGlvbkhpZGUiLCJfX2xpY2F0aW9uU2hvdyIsIl9sYXN0UGFnZVJvdXRlIiwidXQiLCJtcG4iLCJhayIsImFwcGlkIiwidXN2IiwidiIsImNoIiwiY24iLCJwbiIsImN0IiwidCIsInR0IiwicCIsImJyYW5kIiwibWQiLCJtb2RlbCIsInN2Iiwic3lzdGVtIiwibXBzZGsiLCJTREtWZXJzaW9uIiwibXB2IiwibGFuZyIsImxhbmd1YWdlIiwicHIiLCJ3dyIsIndoIiwid2luZG93SGVpZ2h0Iiwic3ciLCJzY3JlZW5XaWR0aCIsInNoIiwic2NyZWVuSGVpZ2h0IiwicGF0aCIsInNjIiwiX3NlbmRSZXBvcnRSZXF1ZXN0IiwiX3NlbmRIaWRlUmVxdWVzdCIsInVybHJlZiIsInVybHJlZl90cyIsInJvdXRlcGF0aCIsInRpdGxlTlZpZXciLCJ0aXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiX3NlbmRQYWdlUmVxdWVzdCIsInVybCIsIl9zZW5kRXZlbnRSZXF1ZXN0IiwiZnZ0cyIsImx2dHMiLCJ0dmMiLCJnZXRQcm9wZXJ0eSIsImdldE5ldHdvcmtJbmZvIiwib3B0IiwiZV9uIiwiZV92IiwiZ2V0TmV0d29ya1R5cGUiLCJuZXQiLCJuZXR3b3JrVHlwZSIsImdldExvY2F0aW9uIiwid2d0aW5mbyIsImdlb2NvZGUiLCJhZGRyZXNzIiwiY291bnRyeSIsInByb3ZpbmNlIiwiY2l0eSIsImxhdCIsImxhdGl0dWRlIiwibG5nIiwibG9uZ2l0dWRlIiwidGl0bGUiLCJ0dG4iLCJ0dHBqIiwidHRjIiwicmVxdWVzdERhdGEiLCJ1bmlTdGF0RGF0YSIsImZpcnN0QXJyIiwiY29udGVudEFyciIsImxhc3RBcnIiLCJyZCIsImVsbSIsIm5ld0RhdGEiLCJvcHRpb25zRGF0YSIsInJlcXVlc3RzIiwiaW1hZ2VSZXF1ZXN0Iiwic2V0VGltZW91dCIsIl9zZW5kUmVxdWVzdCIsImltYWdlIiwiSW1hZ2UiLCJzcmMiLCJTdGF0IiwiaW5zdGFuY2UiLCJhZGRJbnRlcmNlcHRvckluaXQiLCJpbnRlcmNlcHRMb2dpbiIsImludGVyY2VwdFNoYXJlIiwiaW50ZXJjZXB0UmVxdWVzdFBheW1lbnQiLCJfbG9naW4iLCJfc2hhcmUiLCJfcGF5bWVudCIsIl9wYWdlU2hvdyIsIl9hcHBsaWNhdGlvblNob3ciLCJfcGFnZUhpZGUiLCJfYXBwbGljYXRpb25IaWRlIiwiZW0iLCJpbmZvIiwiZW1WYWwiLCJtZXNzYWdlIiwic3RhY2siLCJzdGF0IiwiZ2V0SW5zdGFuY2UiLCJpc0hpZGUiLCJsaWZlY3ljbGUiLCJsb2FkIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJvbGRTaGFyZUFwcE1lc3NhZ2UiLCJvbkhpZGUiLCJvbkVycm9yIiwibWFpbiIsInVzZSIsIlZ1ZXgiLCJzdGF0ZSIsImNpdHlsb2NhdGlvbiIsImNpdHlpZCIsImNpdHlsaXN0IiwiU3RvcmUiLCJtdXRhdGlvbnMiLCJTRVRfQ0lUWSIsIlNFVF9DSVRZX0xPQ0FUSU9OIiwiU0VUX0NJVFlfSUQiLCJpZCIsIlNFVF9DSVRZX0xJU1QiLCJjb21tb25Db25maWciLCJ1cmxob3N0IiwiRVJST1JfQ09ORiIsIktFWV9FUlIiLCJLRVlfRVJSX01TRyIsIlBBUkFNX0VSUiIsIlBBUkFNX0VSUl9NU0ciLCJTWVNURU1fRVJSIiwiU1lTVEVNX0VSUl9NU0ciLCJXWF9FUlJfQ09ERSIsIldYX09LX0NPREUiLCJCQVNFX1VSTCIsIlVSTF9TRUFSQ0giLCJVUkxfU1VHR0VTVElPTiIsIlVSTF9HRVRfR0VPQ09ERVIiLCJVUkxfQ0lUWV9MSVNUIiwiVVJMX0FSRUFfTElTVCIsIlVSTF9ESVNUQU5DRSIsIlVSTF9ESVJFQ1RJT04iLCJNT0RFIiwiZHJpdmluZyIsInRyYW5zaXQiLCJFQVJUSF9SQURJVVMiLCJVdGlscyIsInNhZmVBZGQiLCJ4IiwieSIsImxzdyIsIm1zdyIsImJpdFJvdGF0ZUxlZnQiLCJudW0iLCJjbnQiLCJtZDVjbW4iLCJxIiwiYSIsImIiLCJzIiwibWQ1ZmYiLCJkIiwibWQ1Z2ciLCJtZDVoaCIsIm1kNWlpIiwiYmlubE1ENSIsIm9sZGEiLCJvbGRiIiwib2xkYyIsIm9sZGQiLCJiaW5sMnJzdHIiLCJpbnB1dCIsIm91dHB1dCIsImxlbmd0aDMyIiwiZnJvbUNoYXJDb2RlIiwicnN0cjJiaW5sIiwidW5kZWZpbmVkIiwibGVuZ3RoOCIsImNoYXJDb2RlQXQiLCJyc3RyTUQ1IiwicnN0ckhNQUNNRDUiLCJia2V5IiwiaXBhZCIsIm9wYWQiLCJoYXNoIiwicnN0cjJoZXgiLCJoZXhUYWIiLCJzdHIycnN0clVURjgiLCJ1bmVzY2FwZSIsInJhd01ENSIsImhleE1ENSIsInJhd0hNQUNNRDUiLCJrIiwiaGV4SE1BQ01ENSIsIm1kNSIsInN0cmluZyIsInJhdyIsImdldFNpZyIsInJlcXVlc3RQYXJhbSIsInNrIiwiZmVhdHVyZSIsIm1vZGUiLCJzaWciLCJyZXF1ZXN0QXJyIiwiam9pbiIsImxvY2F0aW9uMnF1ZXJ5IiwibG9jYXRpb24iLCJyYWQiLCJQSSIsImdldEVuZExvY2F0aW9uIiwidG8iLCJlbmRMb2NhdGlvbiIsInBhcnNlRmxvYXQiLCJnZXREaXN0YW5jZSIsImxhdEZyb20iLCJsbmdGcm9tIiwibGF0VG8iLCJsbmdUbyIsInJhZExhdEZyb20iLCJyYWRMYXRUbyIsImRpc3RhbmNlIiwiYXNpbiIsInNxcnQiLCJwb3ciLCJzaW4iLCJjb3MiLCJyb3VuZCIsInRvRml4ZWQiLCJnZXRXWExvY2F0aW9uIiwid3giLCJnZXRMb2NhdGlvblBhcmFtIiwibG9jYXRpb25BcnIiLCJwb2x5ZmlsbFBhcmFtIiwicGFyYW0iLCJjaGVja1BhcmFtS2V5RW1wdHkiLCJlcnJjb25mIiwiYnVpbGRFcnJvckNvbmZpZyIsImNoZWNrS2V5d29yZCIsImNoZWNrTG9jYXRpb24iLCJlcnJDb2RlIiwic3RhdHVzIiwiaGFuZGxlRGF0YSIsInNlYXJjaFJlc3VsdCIsInNlYXJjaFNpbXBsaWZ5IiwiY2F0ZWdvcnkiLCJ0ZWwiLCJhZGNvZGUiLCJhZF9pbmZvIiwiZGlzdHJpY3QiLCJzdWdnZXN0UmVzdWx0Iiwic3VnZ2VzdFNpbXBsaWZ5IiwicmV2ZXJzZUdlb2NvZGVyUmVzdWx0IiwicmV2ZXJzZUdlb2NvZGVyU2ltcGxpZnkiLCJhZGRyZXNzX2NvbXBvbmVudCIsIm5hdGlvbiIsInN0cmVldCIsInN0cmVldF9udW1iZXIiLCJyZWNvbW1lbmQiLCJmb3JtYXR0ZWRfYWRkcmVzc2VzIiwicm91Z2giLCJwb2lzIiwicG9pc1NpbXBsaWZ5IiwiZ2VvY29kZXJSZXN1bHQiLCJnZW9jb2RlclNpbXBsaWZ5IiwiYWRkcmVzc19jb21wb25lbnRzIiwibGV2ZWwiLCJwcm92aW5jZVJlc3VsdCIsImNpdHlSZXN1bHQiLCJkaXN0cmljdFJlc3VsdCIsImRpc3RyaWN0QnlDaXR5IiwiY2FsY3VsYXRlRGlzdGFuY2VSZXN1bHQiLCJlbGVtZW50cyIsImRpcmVjdGlvbiIsInJvdXRlcyIsImJ1aWxkV3hSZXF1ZXN0Q29uZmlnIiwidGhhdCIsImhlYWRlciIsInN0YXR1c0NvZGUiLCJsb2NhdGlvblByb2Nlc3MiLCJsb2NhdGlvbnN1Y2Nlc3MiLCJsb2NhdGlvbmZhaWwiLCJsb2NhdGlvbmNvbXBsZXRlIiwiUVFNYXBXWCIsImtleXdvcmQiLCJvcmRlcmJ5IiwicGFnZV9zaXplIiwicGFnZV9pbmRleCIsImFkZHJlc3NfZm9ybWF0IiwiYXV0b19leHRlbmQiLCJyZWdpb24iLCJyZWN0YW5nbGUiLCJib3VuZGFyeSIsInJlZ2lvbl9maXgiLCJwb2xpY3kiLCJnZXRfc3VicG9pcyIsImNvb3JkX3R5cGUiLCJnZXRfcG9pIiwicG9pX29wdGlvbnMiLCJmcm9tIiwibG9jYXRpb25UbyIsImR1cmF0aW9uIiwiY2FsY3VsYXRlUmVzdWx0IiwiZGlzdGFuY2VSZXN1bHQiLCJTRVRfVVJMX0RJUkVDVElPTiIsImZyb21fcG9pIiwiaGVhZGluZyIsInNwZWVkIiwiYWNjdXJhY3kiLCJyb2FkX3R5cGUiLCJ0b19wb2kiLCJmcm9tX3RyYWNrIiwid2F5cG9pbnRzIiwicGxhdGVfbnVtYmVyIiwiZGVwYXJ0dXJlX3RpbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OytMQUFBLHFFOztBQUVBLElBQU1BLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFuQztBQUNBLElBQU1DLGNBQWMsR0FBR0gsTUFBTSxDQUFDQyxTQUFQLENBQWlCRSxjQUF4Qzs7QUFFQSxTQUFTQyxJQUFULENBQWVDLEVBQWYsRUFBbUI7QUFDakIsU0FBTyxPQUFPQSxFQUFQLEtBQWMsVUFBckI7QUFDRDs7QUFFRCxTQUFTQyxLQUFULENBQWdCQyxHQUFoQixFQUFxQjtBQUNuQixTQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUF0QjtBQUNEOztBQUVELFNBQVNDLGFBQVQsQ0FBd0JDLEdBQXhCLEVBQTZCO0FBQzNCLFNBQU9WLFNBQVMsQ0FBQ1csSUFBVixDQUFlRCxHQUFmLE1BQXdCLGlCQUEvQjtBQUNEOztBQUVELFNBQVNFLE1BQVQsQ0FBaUJGLEdBQWpCLEVBQXNCRyxHQUF0QixFQUEyQjtBQUN6QixTQUFPVCxjQUFjLENBQUNPLElBQWYsQ0FBb0JELEdBQXBCLEVBQXlCRyxHQUF6QixDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsSUFBVCxHQUFpQixDQUFFOztBQUVuQjs7O0FBR0EsU0FBU0MsTUFBVCxDQUFpQlQsRUFBakIsRUFBcUI7QUFDbkIsTUFBTVUsS0FBSyxHQUFHZixNQUFNLENBQUNnQixNQUFQLENBQWMsSUFBZCxDQUFkO0FBQ0EsU0FBTyxTQUFTQyxRQUFULENBQW1CVixHQUFuQixFQUF3QjtBQUM3QixRQUFNVyxHQUFHLEdBQUdILEtBQUssQ0FBQ1IsR0FBRCxDQUFqQjtBQUNBLFdBQU9XLEdBQUcsS0FBS0gsS0FBSyxDQUFDUixHQUFELENBQUwsR0FBYUYsRUFBRSxDQUFDRSxHQUFELENBQXBCLENBQVY7QUFDRCxHQUhEO0FBSUQ7O0FBRUQ7OztBQUdBLElBQU1ZLFVBQVUsR0FBRyxRQUFuQjtBQUNBLElBQU1DLFFBQVEsR0FBR04sTUFBTSxDQUFDLFVBQUNQLEdBQUQsRUFBUztBQUMvQixTQUFPQSxHQUFHLENBQUNjLE9BQUosQ0FBWUYsVUFBWixFQUF3QixVQUFDRyxDQUFELEVBQUlDLENBQUosVUFBVUEsQ0FBQyxHQUFHQSxDQUFDLENBQUNDLFdBQUYsRUFBSCxHQUFxQixFQUFoQyxFQUF4QixDQUFQO0FBQ0QsQ0FGc0IsQ0FBdkI7O0FBSUEsSUFBTUMsS0FBSyxHQUFHO0FBQ1osUUFEWTtBQUVaLFNBRlk7QUFHWixNQUhZO0FBSVosVUFKWTtBQUtaLGFBTFksQ0FBZDs7O0FBUUEsSUFBTUMsa0JBQWtCLEdBQUcsRUFBM0I7QUFDQSxJQUFNQyxrQkFBa0IsR0FBRyxFQUEzQjs7QUFFQSxTQUFTQyxTQUFULENBQW9CQyxTQUFwQixFQUErQkMsUUFBL0IsRUFBeUM7QUFDdkMsTUFBTUMsR0FBRyxHQUFHRCxRQUFRO0FBQ2hCRCxXQUFTO0FBQ1BBLFdBQVMsQ0FBQ0csTUFBVixDQUFpQkYsUUFBakIsQ0FETztBQUVQRyxPQUFLLENBQUNDLE9BQU4sQ0FBY0osUUFBZDtBQUNFQSxVQURGLEdBQ2EsQ0FBQ0EsUUFBRCxDQUpDO0FBS2hCRCxXQUxKO0FBTUEsU0FBT0UsR0FBRztBQUNOSSxhQUFXLENBQUNKLEdBQUQsQ0FETDtBQUVOQSxLQUZKO0FBR0Q7O0FBRUQsU0FBU0ksV0FBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDM0IsTUFBTUwsR0FBRyxHQUFHLEVBQVo7QUFDQSxPQUFLLElBQUlNLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELEtBQUssQ0FBQ0UsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDckMsUUFBSU4sR0FBRyxDQUFDUSxPQUFKLENBQVlILEtBQUssQ0FBQ0MsQ0FBRCxDQUFqQixNQUEwQixDQUFDLENBQS9CLEVBQWtDO0FBQ2hDTixTQUFHLENBQUNTLElBQUosQ0FBU0osS0FBSyxDQUFDQyxDQUFELENBQWQ7QUFDRDtBQUNGO0FBQ0QsU0FBT04sR0FBUDtBQUNEOztBQUVELFNBQVNVLFVBQVQsQ0FBcUJMLEtBQXJCLEVBQTRCTSxJQUE1QixFQUFrQztBQUNoQyxNQUFNQyxLQUFLLEdBQUdQLEtBQUssQ0FBQ0csT0FBTixDQUFjRyxJQUFkLENBQWQ7QUFDQSxNQUFJQyxLQUFLLEtBQUssQ0FBQyxDQUFmLEVBQWtCO0FBQ2hCUCxTQUFLLENBQUNRLE1BQU4sQ0FBYUQsS0FBYixFQUFvQixDQUFwQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU0Usb0JBQVQsQ0FBK0JDLFdBQS9CLEVBQTRDQyxNQUE1QyxFQUFvRDtBQUNsRC9DLFFBQU0sQ0FBQ2dELElBQVAsQ0FBWUQsTUFBWixFQUFvQkUsT0FBcEIsQ0FBNEIsVUFBQVAsSUFBSSxFQUFJO0FBQ2xDLFFBQUlqQixLQUFLLENBQUNjLE9BQU4sQ0FBY0csSUFBZCxNQUF3QixDQUFDLENBQXpCLElBQThCdEMsSUFBSSxDQUFDMkMsTUFBTSxDQUFDTCxJQUFELENBQVAsQ0FBdEMsRUFBc0Q7QUFDcERJLGlCQUFXLENBQUNKLElBQUQsQ0FBWCxHQUFvQmQsU0FBUyxDQUFDa0IsV0FBVyxDQUFDSixJQUFELENBQVosRUFBb0JLLE1BQU0sQ0FBQ0wsSUFBRCxDQUExQixDQUE3QjtBQUNEO0FBQ0YsR0FKRDtBQUtEOztBQUVELFNBQVNRLHFCQUFULENBQWdDSixXQUFoQyxFQUE2Q0MsTUFBN0MsRUFBcUQ7QUFDbkQsTUFBSSxDQUFDRCxXQUFELElBQWdCLENBQUNDLE1BQXJCLEVBQTZCO0FBQzNCO0FBQ0Q7QUFDRC9DLFFBQU0sQ0FBQ2dELElBQVAsQ0FBWUQsTUFBWixFQUFvQkUsT0FBcEIsQ0FBNEIsVUFBQVAsSUFBSSxFQUFJO0FBQ2xDLFFBQUlqQixLQUFLLENBQUNjLE9BQU4sQ0FBY0csSUFBZCxNQUF3QixDQUFDLENBQXpCLElBQThCdEMsSUFBSSxDQUFDMkMsTUFBTSxDQUFDTCxJQUFELENBQVAsQ0FBdEMsRUFBc0Q7QUFDcERELGdCQUFVLENBQUNLLFdBQVcsQ0FBQ0osSUFBRCxDQUFaLEVBQW9CSyxNQUFNLENBQUNMLElBQUQsQ0FBMUIsQ0FBVjtBQUNEO0FBQ0YsR0FKRDtBQUtEOztBQUVELFNBQVNTLGNBQVQsQ0FBeUJDLE1BQXpCLEVBQWlDTCxNQUFqQyxFQUF5QztBQUN2QyxNQUFJLE9BQU9LLE1BQVAsS0FBa0IsUUFBbEIsSUFBOEI1QyxhQUFhLENBQUN1QyxNQUFELENBQS9DLEVBQXlEO0FBQ3ZERix3QkFBb0IsQ0FBQ2xCLGtCQUFrQixDQUFDeUIsTUFBRCxDQUFsQixLQUErQnpCLGtCQUFrQixDQUFDeUIsTUFBRCxDQUFsQixHQUE2QixFQUE1RCxDQUFELEVBQWtFTCxNQUFsRSxDQUFwQjtBQUNELEdBRkQsTUFFTyxJQUFJdkMsYUFBYSxDQUFDNEMsTUFBRCxDQUFqQixFQUEyQjtBQUNoQ1Asd0JBQW9CLENBQUNuQixrQkFBRCxFQUFxQjBCLE1BQXJCLENBQXBCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTQyxpQkFBVCxDQUE0QkQsTUFBNUIsRUFBb0NMLE1BQXBDLEVBQTRDO0FBQzFDLE1BQUksT0FBT0ssTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUM5QixRQUFJNUMsYUFBYSxDQUFDdUMsTUFBRCxDQUFqQixFQUEyQjtBQUN6QkcsMkJBQXFCLENBQUN2QixrQkFBa0IsQ0FBQ3lCLE1BQUQsQ0FBbkIsRUFBNkJMLE1BQTdCLENBQXJCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBT3BCLGtCQUFrQixDQUFDeUIsTUFBRCxDQUF6QjtBQUNEO0FBQ0YsR0FORCxNQU1PLElBQUk1QyxhQUFhLENBQUM0QyxNQUFELENBQWpCLEVBQTJCO0FBQ2hDRix5QkFBcUIsQ0FBQ3hCLGtCQUFELEVBQXFCMEIsTUFBckIsQ0FBckI7QUFDRDtBQUNGOztBQUVELFNBQVNFLFdBQVQsQ0FBc0JaLElBQXRCLEVBQTRCO0FBQzFCLFNBQU8sVUFBVWEsSUFBVixFQUFnQjtBQUNyQixXQUFPYixJQUFJLENBQUNhLElBQUQsQ0FBSixJQUFjQSxJQUFyQjtBQUNELEdBRkQ7QUFHRDs7QUFFRCxTQUFTQyxTQUFULENBQW9CL0MsR0FBcEIsRUFBeUI7QUFDdkIsU0FBTyxDQUFDLENBQUNBLEdBQUYsS0FBVSxPQUFPQSxHQUFQLEtBQWUsUUFBZixJQUEyQixPQUFPQSxHQUFQLEtBQWUsVUFBcEQsS0FBbUUsT0FBT0EsR0FBRyxDQUFDZ0QsSUFBWCxLQUFvQixVQUE5RjtBQUNEOztBQUVELFNBQVNDLEtBQVQsQ0FBZ0J0QixLQUFoQixFQUF1Qm1CLElBQXZCLEVBQTZCO0FBQzNCLE1BQUlJLE9BQU8sR0FBRyxLQUFkO0FBQ0EsT0FBSyxJQUFJdEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztBQUNyQyxRQUFNSyxJQUFJLEdBQUdOLEtBQUssQ0FBQ0MsQ0FBRCxDQUFsQjtBQUNBLFFBQUlzQixPQUFKLEVBQWE7QUFDWEEsYUFBTyxHQUFHQyxPQUFPLENBQUNILElBQVIsQ0FBYUgsV0FBVyxDQUFDWixJQUFELENBQXhCLENBQVY7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFNWCxHQUFHLEdBQUdXLElBQUksQ0FBQ2EsSUFBRCxDQUFoQjtBQUNBLFVBQUlDLFNBQVMsQ0FBQ3pCLEdBQUQsQ0FBYixFQUFvQjtBQUNsQjRCLGVBQU8sR0FBR0MsT0FBTyxDQUFDQyxPQUFSLENBQWdCOUIsR0FBaEIsQ0FBVjtBQUNEO0FBQ0QsVUFBSUEsR0FBRyxLQUFLLEtBQVosRUFBbUI7QUFDakIsZUFBTztBQUNMMEIsY0FESyxrQkFDRyxDQUFFLENBREwsRUFBUDs7QUFHRDtBQUNGO0FBQ0Y7QUFDRCxTQUFPRSxPQUFPLElBQUk7QUFDaEJGLFFBRGdCLGdCQUNWSyxRQURVLEVBQ0E7QUFDZCxhQUFPQSxRQUFRLENBQUNQLElBQUQsQ0FBZjtBQUNELEtBSGUsRUFBbEI7O0FBS0Q7O0FBRUQsU0FBU1EsY0FBVCxDQUF5QmpCLFdBQXpCLEVBQW9ELEtBQWRrQixPQUFjLHVFQUFKLEVBQUk7QUFDbEQsR0FBQyxTQUFELEVBQVksTUFBWixFQUFvQixVQUFwQixFQUFnQ2YsT0FBaEMsQ0FBd0MsVUFBQWdCLElBQUksRUFBSTtBQUM5QyxRQUFJaEMsS0FBSyxDQUFDQyxPQUFOLENBQWNZLFdBQVcsQ0FBQ21CLElBQUQsQ0FBekIsQ0FBSixFQUFzQztBQUNwQyxVQUFNQyxXQUFXLEdBQUdGLE9BQU8sQ0FBQ0MsSUFBRCxDQUEzQjtBQUNBRCxhQUFPLENBQUNDLElBQUQsQ0FBUCxHQUFnQixTQUFTRSxtQkFBVCxDQUE4QnBDLEdBQTlCLEVBQW1DO0FBQ2pEMkIsYUFBSyxDQUFDWixXQUFXLENBQUNtQixJQUFELENBQVosRUFBb0JsQyxHQUFwQixDQUFMLENBQThCMEIsSUFBOUIsQ0FBbUMsVUFBQzFCLEdBQUQsRUFBUztBQUMxQztBQUNBLGlCQUFPM0IsSUFBSSxDQUFDOEQsV0FBRCxDQUFKLElBQXFCQSxXQUFXLENBQUNuQyxHQUFELENBQWhDLElBQXlDQSxHQUFoRDtBQUNELFNBSEQ7QUFJRCxPQUxEO0FBTUQ7QUFDRixHQVZEO0FBV0EsU0FBT2lDLE9BQVA7QUFDRDs7QUFFRCxTQUFTSSxrQkFBVCxDQUE2QmhCLE1BQTdCLEVBQXFDaUIsV0FBckMsRUFBa0Q7QUFDaEQsTUFBTUMsZ0JBQWdCLEdBQUcsRUFBekI7QUFDQSxNQUFJckMsS0FBSyxDQUFDQyxPQUFOLENBQWNSLGtCQUFrQixDQUFDMkMsV0FBakMsQ0FBSixFQUFtRDtBQUNqREMsb0JBQWdCLENBQUM5QixJQUFqQixPQUFBOEIsZ0JBQWdCLHFCQUFTNUMsa0JBQWtCLENBQUMyQyxXQUE1QixFQUFoQjtBQUNEO0FBQ0QsTUFBTXZCLFdBQVcsR0FBR25CLGtCQUFrQixDQUFDeUIsTUFBRCxDQUF0QztBQUNBLE1BQUlOLFdBQVcsSUFBSWIsS0FBSyxDQUFDQyxPQUFOLENBQWNZLFdBQVcsQ0FBQ3VCLFdBQTFCLENBQW5CLEVBQTJEO0FBQ3pEQyxvQkFBZ0IsQ0FBQzlCLElBQWpCLE9BQUE4QixnQkFBZ0IscUJBQVN4QixXQUFXLENBQUN1QixXQUFyQixFQUFoQjtBQUNEO0FBQ0RDLGtCQUFnQixDQUFDckIsT0FBakIsQ0FBeUIsVUFBQVAsSUFBSSxFQUFJO0FBQy9CMkIsZUFBVyxHQUFHM0IsSUFBSSxDQUFDMkIsV0FBRCxDQUFKLElBQXFCQSxXQUFuQztBQUNELEdBRkQ7QUFHQSxTQUFPQSxXQUFQO0FBQ0Q7O0FBRUQsU0FBU0Usc0JBQVQsQ0FBaUNuQixNQUFqQyxFQUF5QztBQUN2QyxNQUFNTixXQUFXLEdBQUc5QyxNQUFNLENBQUNnQixNQUFQLENBQWMsSUFBZCxDQUFwQjtBQUNBaEIsUUFBTSxDQUFDZ0QsSUFBUCxDQUFZdEIsa0JBQVosRUFBZ0N1QixPQUFoQyxDQUF3QyxVQUFBUCxJQUFJLEVBQUk7QUFDOUMsUUFBSUEsSUFBSSxLQUFLLGFBQWIsRUFBNEI7QUFDMUJJLGlCQUFXLENBQUNKLElBQUQsQ0FBWCxHQUFvQmhCLGtCQUFrQixDQUFDZ0IsSUFBRCxDQUFsQixDQUF5QjhCLEtBQXpCLEVBQXBCO0FBQ0Q7QUFDRixHQUpEO0FBS0EsTUFBTUMsaUJBQWlCLEdBQUc5QyxrQkFBa0IsQ0FBQ3lCLE1BQUQsQ0FBNUM7QUFDQSxNQUFJcUIsaUJBQUosRUFBdUI7QUFDckJ6RSxVQUFNLENBQUNnRCxJQUFQLENBQVl5QixpQkFBWixFQUErQnhCLE9BQS9CLENBQXVDLFVBQUFQLElBQUksRUFBSTtBQUM3QyxVQUFJQSxJQUFJLEtBQUssYUFBYixFQUE0QjtBQUMxQkksbUJBQVcsQ0FBQ0osSUFBRCxDQUFYLEdBQW9CLENBQUNJLFdBQVcsQ0FBQ0osSUFBRCxDQUFYLElBQXFCLEVBQXRCLEVBQTBCVixNQUExQixDQUFpQ3lDLGlCQUFpQixDQUFDL0IsSUFBRCxDQUFsRCxDQUFwQjtBQUNEO0FBQ0YsS0FKRDtBQUtEO0FBQ0QsU0FBT0ksV0FBUDtBQUNEOztBQUVELFNBQVM0QixTQUFULENBQW9CdEIsTUFBcEIsRUFBNEJ1QixHQUE1QixFQUFpQ1gsT0FBakMsRUFBcUQsbUNBQVJZLE1BQVEsdUVBQVJBLE1BQVE7QUFDbkQsTUFBTTlCLFdBQVcsR0FBR3lCLHNCQUFzQixDQUFDbkIsTUFBRCxDQUExQztBQUNBLE1BQUlOLFdBQVcsSUFBSTlDLE1BQU0sQ0FBQ2dELElBQVAsQ0FBWUYsV0FBWixFQUF5QlIsTUFBNUMsRUFBb0Q7QUFDbEQsUUFBSUwsS0FBSyxDQUFDQyxPQUFOLENBQWNZLFdBQVcsQ0FBQytCLE1BQTFCLENBQUosRUFBdUM7QUFDckMsVUFBTTlDLEdBQUcsR0FBRzJCLEtBQUssQ0FBQ1osV0FBVyxDQUFDK0IsTUFBYixFQUFxQmIsT0FBckIsQ0FBakI7QUFDQSxhQUFPakMsR0FBRyxDQUFDMEIsSUFBSixDQUFTLFVBQUNPLE9BQUQsRUFBYTtBQUMzQixlQUFPVyxHQUFHLE1BQUgsVUFBSVosY0FBYyxDQUFDakIsV0FBRCxFQUFja0IsT0FBZCxDQUFsQixTQUE2Q1ksTUFBN0MsRUFBUDtBQUNELE9BRk0sQ0FBUDtBQUdELEtBTEQsTUFLTztBQUNMLGFBQU9ELEdBQUcsTUFBSCxVQUFJWixjQUFjLENBQUNqQixXQUFELEVBQWNrQixPQUFkLENBQWxCLFNBQTZDWSxNQUE3QyxFQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU9ELEdBQUcsTUFBSCxVQUFJWCxPQUFKLFNBQWdCWSxNQUFoQixFQUFQO0FBQ0Q7O0FBRUQsSUFBTUUsa0JBQWtCLEdBQUc7QUFDekJULGFBRHlCLHVCQUNadEMsR0FEWSxFQUNQO0FBQ2hCLFFBQUksQ0FBQ3lCLFNBQVMsQ0FBQ3pCLEdBQUQsQ0FBZCxFQUFxQjtBQUNuQixhQUFPQSxHQUFQO0FBQ0Q7QUFDRCxXQUFPQSxHQUFHLENBQUMwQixJQUFKLENBQVMsVUFBQTFCLEdBQUcsRUFBSTtBQUNyQixhQUFPQSxHQUFHLENBQUMsQ0FBRCxDQUFWO0FBQ0QsS0FGTSxFQUVKZ0QsS0FGSSxDQUVFLFVBQUFoRCxHQUFHLEVBQUk7QUFDZCxhQUFPQSxHQUFHLENBQUMsQ0FBRCxDQUFWO0FBQ0QsS0FKTSxDQUFQO0FBS0QsR0FWd0IsRUFBM0I7OztBQWFBLElBQU1pRCxXQUFXO0FBQ2YscVBBREY7O0FBR0EsSUFBTUMsY0FBYyxHQUFHLGtCQUF2Qjs7QUFFQSxJQUFNQyxTQUFTLEdBQUcsQ0FBQyxxQkFBRCxDQUFsQjs7QUFFQSxJQUFNQyxlQUFlLEdBQUcsVUFBeEI7O0FBRUEsU0FBU0MsWUFBVCxDQUF1Qm5CLElBQXZCLEVBQTZCO0FBQzNCLFNBQU9nQixjQUFjLENBQUNJLElBQWYsQ0FBb0JwQixJQUFwQixDQUFQO0FBQ0Q7QUFDRCxTQUFTcUIsU0FBVCxDQUFvQnJCLElBQXBCLEVBQTBCO0FBQ3hCLFNBQU9lLFdBQVcsQ0FBQ0ssSUFBWixDQUFpQnBCLElBQWpCLEtBQTBCaUIsU0FBUyxDQUFDM0MsT0FBVixDQUFrQjBCLElBQWxCLE1BQTRCLENBQUMsQ0FBOUQ7QUFDRDs7QUFFRCxTQUFTc0IsYUFBVCxDQUF3QnRCLElBQXhCLEVBQThCO0FBQzVCLFNBQU9rQixlQUFlLENBQUNFLElBQWhCLENBQXFCcEIsSUFBckIsS0FBOEJBLElBQUksS0FBSyxRQUE5QztBQUNEOztBQUVELFNBQVN1QixhQUFULENBQXdCN0IsT0FBeEIsRUFBaUM7QUFDL0IsU0FBT0EsT0FBTyxDQUFDRixJQUFSLENBQWEsVUFBQUYsSUFBSSxFQUFJO0FBQzFCLFdBQU8sQ0FBQyxJQUFELEVBQU9BLElBQVAsQ0FBUDtBQUNELEdBRk07QUFHSndCLE9BSEksQ0FHRSxVQUFBVSxHQUFHLFVBQUksQ0FBQ0EsR0FBRCxDQUFKLEVBSEwsQ0FBUDtBQUlEOztBQUVELFNBQVNDLGFBQVQsQ0FBd0J6QixJQUF4QixFQUE4QjtBQUM1QjtBQUNFbUIsY0FBWSxDQUFDbkIsSUFBRCxDQUFaO0FBQ0FxQixXQUFTLENBQUNyQixJQUFELENBRFQ7QUFFQXNCLGVBQWEsQ0FBQ3RCLElBQUQsQ0FIZjtBQUlFO0FBQ0EsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxTQUFPLElBQVA7QUFDRDs7QUFFRDtBQUNBLElBQUksQ0FBQ0wsT0FBTyxDQUFDM0QsU0FBUixDQUFrQjBGLE9BQXZCLEVBQWdDO0FBQzlCL0IsU0FBTyxDQUFDM0QsU0FBUixDQUFrQjBGLE9BQWxCLEdBQTRCLFVBQVU3QixRQUFWLEVBQW9CO0FBQzlDLFFBQU1ILE9BQU8sR0FBRyxLQUFLaUMsV0FBckI7QUFDQSxXQUFPLEtBQUtuQyxJQUFMO0FBQ0wsY0FBQW9DLEtBQUssVUFBSWxDLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQkMsUUFBUSxFQUF4QixFQUE0QkwsSUFBNUIsQ0FBaUMsb0JBQU1vQyxLQUFOLEVBQWpDLENBQUosRUFEQTtBQUVMLGNBQUFDLE1BQU0sVUFBSW5DLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQkMsUUFBUSxFQUF4QixFQUE0QkwsSUFBNUIsQ0FBaUMsWUFBTTtBQUMvQyxjQUFNcUMsTUFBTjtBQUNELE9BRlMsQ0FBSixFQUZELENBQVA7O0FBTUQsR0FSRDtBQVNEOztBQUVELFNBQVNDLFNBQVQsQ0FBb0I5QixJQUFwQixFQUEwQlUsR0FBMUIsRUFBK0I7QUFDN0IsTUFBSSxDQUFDZSxhQUFhLENBQUN6QixJQUFELENBQWxCLEVBQTBCO0FBQ3hCLFdBQU9VLEdBQVA7QUFDRDtBQUNELFNBQU8sU0FBU3FCLFVBQVQsR0FBOEMsS0FBekJoQyxPQUF5Qix1RUFBZixFQUFlLG9DQUFSWSxNQUFRLDZFQUFSQSxNQUFRO0FBQ25ELFFBQUl4RSxJQUFJLENBQUM0RCxPQUFPLENBQUNpQyxPQUFULENBQUosSUFBeUI3RixJQUFJLENBQUM0RCxPQUFPLENBQUNrQyxJQUFULENBQTdCLElBQStDOUYsSUFBSSxDQUFDNEQsT0FBTyxDQUFDbUMsUUFBVCxDQUF2RCxFQUEyRTtBQUN6RSxhQUFPL0Isa0JBQWtCLENBQUNILElBQUQsRUFBT1MsU0FBUyxNQUFULFVBQVVULElBQVYsRUFBZ0JVLEdBQWhCLEVBQXFCWCxPQUFyQixTQUFpQ1ksTUFBakMsRUFBUCxDQUF6QjtBQUNEO0FBQ0QsV0FBT1Isa0JBQWtCLENBQUNILElBQUQsRUFBT3VCLGFBQWEsQ0FBQyxJQUFJNUIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVXVDLE1BQVYsRUFBcUI7QUFDN0UxQixlQUFTLE1BQVQsVUFBVVQsSUFBVixFQUFnQlUsR0FBaEIsRUFBcUIzRSxNQUFNLENBQUNxRyxNQUFQLENBQWMsRUFBZCxFQUFrQnJDLE9BQWxCLEVBQTJCO0FBQzlDaUMsZUFBTyxFQUFFcEMsT0FEcUM7QUFFOUNxQyxZQUFJLEVBQUVFLE1BRndDLEVBQTNCLENBQXJCO0FBR094QixZQUhQO0FBSUQsS0FMNkMsQ0FBRCxDQUFwQixDQUF6QjtBQU1ELEdBVkQ7QUFXRDs7QUFFRCxJQUFNMEIsR0FBRyxHQUFHLElBQVo7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxHQUExQjtBQUNBLElBQUlDLEtBQUssR0FBRyxLQUFaO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQWhCOztBQUVBLFNBQVNDLGdCQUFULEdBQTZCOzs7OztBQUt2QkMsTUFBSSxDQUFDQyxpQkFBTCxFQUx1QixDQUV6QkMsUUFGeUIseUJBRXpCQSxRQUZ5QixDQUd6QkMsVUFIeUIseUJBR3pCQSxVQUh5QixDQUl6QkMsV0FKeUIseUJBSXpCQSxXQUp5QixFQUtHOztBQUU5QlAsYUFBVyxHQUFHTyxXQUFkO0FBQ0FOLFdBQVMsR0FBR0ssVUFBWjtBQUNBUCxPQUFLLEdBQUdNLFFBQVEsS0FBSyxLQUFyQjtBQUNEOztBQUVELFNBQVNHLE1BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCQyxjQUF6QixFQUF5QztBQUN2QyxNQUFJVixXQUFXLEtBQUssQ0FBcEIsRUFBdUI7QUFDckJFLG9CQUFnQjtBQUNqQjs7QUFFRE8sUUFBTSxHQUFHRSxNQUFNLENBQUNGLE1BQUQsQ0FBZjtBQUNBLE1BQUlBLE1BQU0sS0FBSyxDQUFmLEVBQWtCO0FBQ2hCLFdBQU8sQ0FBUDtBQUNEO0FBQ0QsTUFBSUcsTUFBTSxHQUFJSCxNQUFNLEdBQUdYLGlCQUFWLElBQWdDWSxjQUFjLElBQUlWLFdBQWxELENBQWI7QUFDQSxNQUFJWSxNQUFNLEdBQUcsQ0FBYixFQUFnQjtBQUNkQSxVQUFNLEdBQUcsQ0FBQ0EsTUFBVjtBQUNEO0FBQ0RBLFFBQU0sR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdGLE1BQU0sR0FBR2YsR0FBcEIsQ0FBVDtBQUNBLE1BQUllLE1BQU0sS0FBSyxDQUFmLEVBQWtCO0FBQ2hCLFFBQUlYLFNBQVMsS0FBSyxDQUFkLElBQW1CLENBQUNGLEtBQXhCLEVBQStCO0FBQzdCLGFBQU8sQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU8sR0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPVSxNQUFNLEdBQUcsQ0FBVCxHQUFhLENBQUNHLE1BQWQsR0FBdUJBLE1BQTlCO0FBQ0Q7O0FBRUQsSUFBTUcsWUFBWSxHQUFHO0FBQ25CMUMsb0JBQWtCLEVBQWxCQSxrQkFEbUIsRUFBckI7Ozs7O0FBTUEsSUFBSTJDLE9BQU8sR0FBRyxhQUFhekgsTUFBTSxDQUFDMEgsTUFBUCxDQUFjO0FBQ3ZDQyxXQUFTLEVBQUUsSUFENEI7QUFFdkNWLFFBQU0sRUFBRUEsTUFGK0I7QUFHdkNPLGNBQVksRUFBRUEsWUFIeUI7QUFJdkNyRSxnQkFBYyxFQUFFQSxjQUp1QjtBQUt2Q0UsbUJBQWlCLEVBQUVBLGlCQUxvQixFQUFkLENBQTNCOzs7QUFRQSxJQUFJdUUsWUFBWSxHQUFHO0FBQ2pCQyxNQURpQixnQkFDWEMsUUFEVyxFQUNEO0FBQ2QsUUFBSUMsWUFBWSxHQUFHQyxRQUFRLENBQUNGLFFBQVEsQ0FBQ0csT0FBVixDQUEzQjtBQUNBLFFBQUlDLEtBQUssQ0FBQ0gsWUFBRCxDQUFULEVBQXlCO0FBQ3ZCO0FBQ0Q7QUFDRCxRQUFNSSxJQUFJLEdBQUdMLFFBQVEsQ0FBQ0ssSUFBdEI7QUFDQSxRQUFJLENBQUNsRyxLQUFLLENBQUNDLE9BQU4sQ0FBY2lHLElBQWQsQ0FBTCxFQUEwQjtBQUN4QjtBQUNEO0FBQ0QsUUFBTUMsR0FBRyxHQUFHRCxJQUFJLENBQUM3RixNQUFqQjtBQUNBLFFBQUksQ0FBQzhGLEdBQUwsRUFBVTtBQUNSO0FBQ0Q7QUFDRCxRQUFJTCxZQUFZLEdBQUcsQ0FBbkIsRUFBc0I7QUFDcEJBLGtCQUFZLEdBQUcsQ0FBZjtBQUNELEtBRkQsTUFFTyxJQUFJQSxZQUFZLElBQUlLLEdBQXBCLEVBQXlCO0FBQzlCTCxrQkFBWSxHQUFHSyxHQUFHLEdBQUcsQ0FBckI7QUFDRDtBQUNELFFBQUlMLFlBQVksR0FBRyxDQUFuQixFQUFzQjtBQUNwQkQsY0FBUSxDQUFDRyxPQUFULEdBQW1CRSxJQUFJLENBQUNKLFlBQUQsQ0FBdkI7QUFDQUQsY0FBUSxDQUFDSyxJQUFULEdBQWdCQSxJQUFJLENBQUNFLE1BQUw7QUFDZCxnQkFBQ0MsSUFBRCxFQUFPM0YsS0FBUCxVQUFpQkEsS0FBSyxHQUFHb0YsWUFBUixHQUF1Qk8sSUFBSSxLQUFLSCxJQUFJLENBQUNKLFlBQUQsQ0FBcEMsR0FBcUQsSUFBdEUsRUFEYyxDQUFoQjs7QUFHRCxLQUxELE1BS087QUFDTEQsY0FBUSxDQUFDRyxPQUFULEdBQW1CRSxJQUFJLENBQUMsQ0FBRCxDQUF2QjtBQUNEO0FBQ0QsV0FBTztBQUNMSSxlQUFTLEVBQUUsS0FETjtBQUVMQyxVQUFJLEVBQUUsS0FGRCxFQUFQOztBQUlELEdBL0JnQixFQUFuQjs7O0FBa0NBO0FBQ0EsSUFBTUMsS0FBSyxHQUFHO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvQlksQ0FBZDs7QUFrQ0E7QUFDQSxJQUFNQyxRQUFRLEdBQUcsRUFBakI7O0FBRUEsU0FBU0MsZ0JBQVQsQ0FBMkJDLFdBQTNCLEVBQXdDQyxVQUF4QyxFQUFvRDtBQUNsRCxTQUFPLFNBQVNDLFdBQVQsR0FBd0I7QUFDN0JDLFdBQU8sQ0FBQ0MsS0FBUiwwQ0FBdUJKLFdBQXZCLHFDQUF5Q0MsVUFBekM7QUFDRCxHQUZEO0FBR0Q7O0FBRUQsU0FBU0ksY0FBVCxDQUF5QjVCLE1BQXpCLEVBQWlDO0FBQy9CQSxRQUFNLENBQUM2QixXQUFQLEdBQXFCO0FBQ25CQyxTQUFLLEVBQUU5QixNQUFNLENBQUMrQixNQURLLEVBQXJCOztBQUdBL0IsUUFBTSxDQUFDZ0MsTUFBUCxHQUFnQjtBQUNkQyxXQUFPLEVBQUVqQyxNQUFNLENBQUNrQyxVQURGLEVBQWhCOztBQUdEOztBQUVEO0FBQ0EsSUFBTUMsU0FBUyxHQUFHO0FBQ2hCQyxTQUFPLEVBQUU7QUFDUDVCLFFBRE8sZ0JBQ0RDLFFBREMsRUFDUztBQUNkO0FBQ0E7QUFDQTtBQUNBLGFBQU87QUFDTDFFLGNBQU0sRUFBRSxRQURIO0FBRUxzRyxnQkFGSyxvQkFFS0MsSUFGTCxFQUVXO0FBQ2QsaUJBQU87QUFDTDFGLGdCQUFJLEVBQUUsVUFERDtBQUVMNEIsaUJBQUssRUFBRThELElBQUksS0FBSyxNQUFULEdBQWtCQSxJQUFsQixHQUF5QixRQUYzQixFQUFQOztBQUlELFNBUEksRUFBUDs7QUFTRCxLQWRNLEVBRE87O0FBaUJoQkMsZUFBYSxFQUFFO0FBQ2IvQixRQUFJLEVBQUU7QUFDSnpFLFlBQU0sRUFBRSxLQURKLEVBRE8sRUFqQkM7OztBQXNCaEJ3RSxjQUFZLEVBQVpBLFlBdEJnQjtBQXVCaEJpQyxvQkFBa0IsRUFBRTtBQUNsQnhGLGVBRGtCLHVCQUNMeUYsT0FESyxFQUNJO0FBQ3BCQSxhQUFPLENBQUNDLGVBQVIsR0FBMEJwQixnQkFBZ0IsQ0FBQyxpQkFBRCxFQUFvQixpQkFBcEIsQ0FBMUM7QUFDRCxLQUhpQixFQXZCSjs7QUE0QmhCcUIsMkJBQXlCLEVBQUU7QUFDekIzRixlQUR5Qix1QkFDWnlGLE9BRFksRUFDSDtBQUNwQkEsYUFBTyxDQUFDRyxNQUFSLEdBQWlCdEIsZ0JBQWdCLENBQUMsd0JBQUQsRUFBMkIsUUFBM0IsQ0FBakM7QUFDQW1CLGFBQU8sQ0FBQ0ksTUFBUixHQUFpQnZCLGdCQUFnQixDQUFDLHdCQUFELEVBQTJCLFFBQTNCLENBQWpDO0FBQ0QsS0FKd0IsRUE1Qlg7O0FBa0NoQndCLFVBQVEsRUFBRTtBQUNSdEMsUUFBSSxFQUFFO0FBQ0p1QyxvQkFBYyxFQUFFLEtBRFo7QUFFSkMsY0FBUSxFQUFFLEtBRk4sRUFERSxFQWxDTTs7O0FBd0NoQkMsdUJBQXFCLEVBQUU7QUFDckJyRyxRQUFJLEVBQUUsd0JBRGU7QUFFckI0RCxRQUFJLEVBQUU7QUFDSnNCLFdBQUssRUFBRSxRQURIO0FBRUpvQixnQkFBVSxFQUFFLEtBRlIsRUFGZSxFQXhDUDs7O0FBK0NoQkMseUJBQXVCLEVBQUU7QUFDdkJ2RyxRQUFJLEVBQUUsMEJBRGlCLEVBL0NUOztBQWtEaEJ3RyxlQUFhLEVBQUU7QUFDYnhHLFFBQUksRUFBRSxXQURPLEVBbERDOztBQXFEaEJ5RyxvQkFBa0IsRUFBRTtBQUNsQnpHLFFBQUksRUFBRSxnQkFEWTtBQUVsQkksZUFBVyxFQUFFNEUsY0FGSyxFQXJESixFQUFsQjs7OztBQTJEQSxJQUFNMEIsU0FBUyxHQUFHLENBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsUUFBcEIsRUFBOEIsVUFBOUIsQ0FBbEI7O0FBRUEsU0FBU0MsZUFBVCxDQUEwQi9CLFVBQTFCLEVBQXNDekYsTUFBdEMsRUFBOENpQixXQUE5QyxFQUEyRDtBQUN6RCxTQUFPLFVBQVV0QyxHQUFWLEVBQWU7QUFDcEIsV0FBT3FCLE1BQU0sQ0FBQ3lILGtCQUFrQixDQUFDaEMsVUFBRCxFQUFhOUcsR0FBYixFQUFrQnNDLFdBQWxCLENBQW5CLENBQWI7QUFDRCxHQUZEO0FBR0Q7O0FBRUQsU0FBU3lHLFdBQVQsQ0FBc0JqQyxVQUF0QixFQUFrQ2YsUUFBbEMsRUFBcUcsS0FBekRpRCxVQUF5RCx1RUFBNUMsRUFBNEMsS0FBeEMxRyxXQUF3Qyx1RUFBMUIsRUFBMEIsS0FBdEIyRyxZQUFzQix1RUFBUCxLQUFPO0FBQ25HLE1BQUl4SyxhQUFhLENBQUNzSCxRQUFELENBQWpCLEVBQTZCLENBQUU7QUFDN0IsUUFBTW1ELE1BQU0sR0FBR0QsWUFBWSxLQUFLLElBQWpCLEdBQXdCbEQsUUFBeEIsR0FBbUMsRUFBbEQsQ0FEMkIsQ0FDMkI7QUFDdEQsUUFBSTFILElBQUksQ0FBQzJLLFVBQUQsQ0FBUixFQUFzQjtBQUNwQkEsZ0JBQVUsR0FBR0EsVUFBVSxDQUFDakQsUUFBRCxFQUFXbUQsTUFBWCxDQUFWLElBQWdDLEVBQTdDO0FBQ0Q7QUFDRCxTQUFLLElBQUlySyxHQUFULElBQWdCa0gsUUFBaEIsRUFBMEI7QUFDeEIsVUFBSW5ILE1BQU0sQ0FBQ29LLFVBQUQsRUFBYW5LLEdBQWIsQ0FBVixFQUE2QjtBQUMzQixZQUFJc0ssU0FBUyxHQUFHSCxVQUFVLENBQUNuSyxHQUFELENBQTFCO0FBQ0EsWUFBSVIsSUFBSSxDQUFDOEssU0FBRCxDQUFSLEVBQXFCO0FBQ25CQSxtQkFBUyxHQUFHQSxTQUFTLENBQUNwRCxRQUFRLENBQUNsSCxHQUFELENBQVQsRUFBZ0JrSCxRQUFoQixFQUEwQm1ELE1BQTFCLENBQXJCO0FBQ0Q7QUFDRCxZQUFJLENBQUNDLFNBQUwsRUFBZ0IsQ0FBRTtBQUNoQm5DLGlCQUFPLENBQUNvQyxJQUFSLDBDQUFzQnRDLFVBQXRCLHFDQUF1Q2pJLEdBQXZDO0FBQ0QsU0FGRCxNQUVPLElBQUlOLEtBQUssQ0FBQzRLLFNBQUQsQ0FBVCxFQUFzQixDQUFFO0FBQzdCRCxnQkFBTSxDQUFDQyxTQUFELENBQU4sR0FBb0JwRCxRQUFRLENBQUNsSCxHQUFELENBQTVCO0FBQ0QsU0FGTSxNQUVBLElBQUlKLGFBQWEsQ0FBQzBLLFNBQUQsQ0FBakIsRUFBOEIsQ0FBRTtBQUNyQ0QsZ0JBQU0sQ0FBQ0MsU0FBUyxDQUFDakgsSUFBVixHQUFpQmlILFNBQVMsQ0FBQ2pILElBQTNCLEdBQWtDckQsR0FBbkMsQ0FBTixHQUFnRHNLLFNBQVMsQ0FBQ3JGLEtBQTFEO0FBQ0Q7QUFDRixPQVpELE1BWU8sSUFBSThFLFNBQVMsQ0FBQ3BJLE9BQVYsQ0FBa0IzQixHQUFsQixNQUEyQixDQUFDLENBQWhDLEVBQW1DO0FBQ3hDcUssY0FBTSxDQUFDckssR0FBRCxDQUFOLEdBQWNnSyxlQUFlLENBQUMvQixVQUFELEVBQWFmLFFBQVEsQ0FBQ2xILEdBQUQsQ0FBckIsRUFBNEJ5RCxXQUE1QixDQUE3QjtBQUNELE9BRk0sTUFFQTtBQUNMLFlBQUksQ0FBQzJHLFlBQUwsRUFBbUI7QUFDakJDLGdCQUFNLENBQUNySyxHQUFELENBQU4sR0FBY2tILFFBQVEsQ0FBQ2xILEdBQUQsQ0FBdEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxXQUFPcUssTUFBUDtBQUNELEdBM0JELE1BMkJPLElBQUk3SyxJQUFJLENBQUMwSCxRQUFELENBQVIsRUFBb0I7QUFDekJBLFlBQVEsR0FBRzhDLGVBQWUsQ0FBQy9CLFVBQUQsRUFBYWYsUUFBYixFQUF1QnpELFdBQXZCLENBQTFCO0FBQ0Q7QUFDRCxTQUFPeUQsUUFBUDtBQUNEOztBQUVELFNBQVMrQyxrQkFBVCxDQUE2QmhDLFVBQTdCLEVBQXlDOUcsR0FBekMsRUFBOENzQyxXQUE5QyxFQUFvRixLQUF6QitHLGVBQXlCLHVFQUFQLEtBQU87QUFDbEYsTUFBSWhMLElBQUksQ0FBQ29KLFNBQVMsQ0FBQ25GLFdBQVgsQ0FBUixFQUFpQyxDQUFFO0FBQ2pDdEMsT0FBRyxHQUFHeUgsU0FBUyxDQUFDbkYsV0FBVixDQUFzQndFLFVBQXRCLEVBQWtDOUcsR0FBbEMsQ0FBTjtBQUNEO0FBQ0QsU0FBTytJLFdBQVcsQ0FBQ2pDLFVBQUQsRUFBYTlHLEdBQWIsRUFBa0JzQyxXQUFsQixFQUErQixFQUEvQixFQUFtQytHLGVBQW5DLENBQWxCO0FBQ0Q7O0FBRUQsU0FBU0MsT0FBVCxDQUFrQnhDLFVBQWxCLEVBQThCekYsTUFBOUIsRUFBc0M7QUFDcEMsTUFBSXpDLE1BQU0sQ0FBQzZJLFNBQUQsRUFBWVgsVUFBWixDQUFWLEVBQW1DO0FBQ2pDLFFBQU15QyxRQUFRLEdBQUc5QixTQUFTLENBQUNYLFVBQUQsQ0FBMUI7QUFDQSxRQUFJLENBQUN5QyxRQUFMLEVBQWUsQ0FBRTtBQUNmLGFBQU8sWUFBWTtBQUNqQnZDLGVBQU8sQ0FBQ0MsS0FBUixrRUFBMkJILFVBQTNCO0FBQ0QsT0FGRDtBQUdEO0FBQ0QsV0FBTyxVQUFVMEMsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0IsQ0FBRTtBQUM3QixVQUFJeEgsT0FBTyxHQUFHc0gsUUFBZDtBQUNBLFVBQUlsTCxJQUFJLENBQUNrTCxRQUFELENBQVIsRUFBb0I7QUFDbEJ0SCxlQUFPLEdBQUdzSCxRQUFRLENBQUNDLElBQUQsQ0FBbEI7QUFDRDs7QUFFREEsVUFBSSxHQUFHVCxXQUFXLENBQUNqQyxVQUFELEVBQWEwQyxJQUFiLEVBQW1CdkgsT0FBTyxDQUFDNkQsSUFBM0IsRUFBaUM3RCxPQUFPLENBQUNLLFdBQXpDLENBQWxCOztBQUVBLFVBQU13RCxJQUFJLEdBQUcsQ0FBQzBELElBQUQsQ0FBYjtBQUNBLFVBQUksT0FBT0MsSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUMvQjNELFlBQUksQ0FBQ3JGLElBQUwsQ0FBVWdKLElBQVY7QUFDRDtBQUNELFVBQU1uSCxXQUFXLEdBQUd1QyxJQUFJLENBQUM1QyxPQUFPLENBQUNDLElBQVIsSUFBZ0I0RSxVQUFqQixDQUFKLENBQWlDNEMsS0FBakMsQ0FBdUM3RSxJQUF2QyxFQUE2Q2lCLElBQTdDLENBQXBCO0FBQ0EsVUFBSXZDLFNBQVMsQ0FBQ3VELFVBQUQsQ0FBYixFQUEyQixDQUFFO0FBQzNCLGVBQU9nQyxrQkFBa0IsQ0FBQ2hDLFVBQUQsRUFBYXhFLFdBQWIsRUFBMEJMLE9BQU8sQ0FBQ0ssV0FBbEMsRUFBK0NlLFlBQVksQ0FBQ3lELFVBQUQsQ0FBM0QsQ0FBekI7QUFDRDtBQUNELGFBQU94RSxXQUFQO0FBQ0QsS0FqQkQ7QUFrQkQ7QUFDRCxTQUFPakIsTUFBUDtBQUNEOztBQUVELElBQU1zSSxRQUFRLEdBQUcxTCxNQUFNLENBQUNnQixNQUFQLENBQWMsSUFBZCxDQUFqQjs7QUFFQSxJQUFNMkssS0FBSyxHQUFHO0FBQ1osc0JBRFk7QUFFWixlQUZZO0FBR1osaUJBSFk7QUFJWixRQUpZO0FBS1osU0FMWTtBQU1aLE9BTlksQ0FBZDs7O0FBU0EsU0FBU0MsYUFBVCxDQUF3QjNILElBQXhCLEVBQThCO0FBQzVCLFNBQU8sU0FBUzRILE9BQVQ7OztBQUdKLE9BRkQzRixJQUVDLFFBRkRBLElBRUMsQ0FEREMsUUFDQyxRQUREQSxRQUNDO0FBQ0QsUUFBTXBFLEdBQUcsR0FBRztBQUNWK0osWUFBTSxZQUFLN0gsSUFBTCw0Q0FBdUJBLElBQXZCLGtCQURJLEVBQVo7O0FBR0E3RCxRQUFJLENBQUM4RixJQUFELENBQUosSUFBY0EsSUFBSSxDQUFDbkUsR0FBRCxDQUFsQjtBQUNBM0IsUUFBSSxDQUFDK0YsUUFBRCxDQUFKLElBQWtCQSxRQUFRLENBQUNwRSxHQUFELENBQTFCO0FBQ0QsR0FURDtBQVVEOztBQUVENEosS0FBSyxDQUFDMUksT0FBTixDQUFjLFVBQVVnQixJQUFWLEVBQWdCO0FBQzVCeUgsVUFBUSxDQUFDekgsSUFBRCxDQUFSLEdBQWlCMkgsYUFBYSxDQUFDM0gsSUFBRCxDQUE5QjtBQUNELENBRkQ7O0FBSUEsSUFBSThILFNBQVMsR0FBRztBQUNkQyxPQUFLLEVBQUUsQ0FBQyxPQUFELENBRE87QUFFZEMsT0FBSyxFQUFFLENBQUMsT0FBRCxDQUZPO0FBR2RDLFNBQU8sRUFBRSxDQUFDLE9BQUQsQ0FISztBQUlkMUosTUFBSSxFQUFFLENBQUMsT0FBRCxDQUpRLEVBQWhCOzs7QUFPQSxTQUFTMkosV0FBVDs7Ozs7QUFLRyxLQUpEQyxPQUlDLFNBSkRBLE9BSUMsQ0FIRG5HLE9BR0MsU0FIREEsT0FHQyxDQUZEQyxJQUVDLFNBRkRBLElBRUMsQ0FEREMsUUFDQyxTQUREQSxRQUNDO0FBQ0QsTUFBSXBFLEdBQUcsR0FBRyxLQUFWO0FBQ0EsTUFBSWdLLFNBQVMsQ0FBQ0ssT0FBRCxDQUFiLEVBQXdCO0FBQ3RCckssT0FBRyxHQUFHO0FBQ0orSixZQUFNLEVBQUUsZ0JBREo7QUFFSk0sYUFBTyxFQUFQQSxPQUZJO0FBR0pDLGNBQVEsRUFBRU4sU0FBUyxDQUFDSyxPQUFELENBSGYsRUFBTjs7QUFLQWhNLFFBQUksQ0FBQzZGLE9BQUQsQ0FBSixJQUFpQkEsT0FBTyxDQUFDbEUsR0FBRCxDQUF4QjtBQUNELEdBUEQsTUFPTztBQUNMQSxPQUFHLEdBQUc7QUFDSitKLFlBQU0sRUFBRSx5QkFBeUJNLE9BQXpCLEdBQW1DLE1BRHZDLEVBQU47O0FBR0FoTSxRQUFJLENBQUM4RixJQUFELENBQUosSUFBY0EsSUFBSSxDQUFDbkUsR0FBRCxDQUFsQjtBQUNEO0FBQ0QzQixNQUFJLENBQUMrRixRQUFELENBQUosSUFBa0JBLFFBQVEsQ0FBQ3BFLEdBQUQsQ0FBMUI7QUFDRDs7QUFFRCxJQUFJdUssUUFBUSxHQUFHLGFBQWF0TSxNQUFNLENBQUMwSCxNQUFQLENBQWM7QUFDeENDLFdBQVMsRUFBRSxJQUQ2QjtBQUV4Q3dFLGFBQVcsRUFBRUEsV0FGMkIsRUFBZCxDQUE1Qjs7O0FBS0EsSUFBTUksVUFBVSxHQUFJLFlBQVk7QUFDOUIsTUFBSSxPQUFPQyxhQUFQLEtBQXlCLFVBQTdCLEVBQXlDO0FBQ3ZDO0FBQ0EsV0FBT0EsYUFBUDtBQUNEO0FBQ0QsTUFBSUMsT0FBSjtBQUNBLFNBQU8sU0FBU0QsYUFBVCxHQUEwQjtBQUMvQixRQUFJLENBQUNDLE9BQUwsRUFBYztBQUNaQSxhQUFPLEdBQUcsSUFBSUMsWUFBSixFQUFWO0FBQ0Q7QUFDRCxXQUFPRCxPQUFQO0FBQ0QsR0FMRDtBQU1ELENBWmtCLEVBQW5COztBQWNBLFNBQVNoQixLQUFULENBQWdCa0IsR0FBaEIsRUFBcUJ2SixNQUFyQixFQUE2QnlFLElBQTdCLEVBQW1DO0FBQ2pDLFNBQU84RSxHQUFHLENBQUN2SixNQUFELENBQUgsQ0FBWXFJLEtBQVosQ0FBa0JrQixHQUFsQixFQUF1QjlFLElBQXZCLENBQVA7QUFDRDs7QUFFRCxTQUFTK0UsR0FBVCxHQUFnQjtBQUNkLFNBQU9uQixLQUFLLENBQUNjLFVBQVUsRUFBWCxFQUFlLEtBQWYsNkJBQTBCTSxTQUExQixFQUFaO0FBQ0Q7QUFDRCxTQUFTQyxJQUFULEdBQWlCO0FBQ2YsU0FBT3JCLEtBQUssQ0FBQ2MsVUFBVSxFQUFYLEVBQWUsTUFBZiw2QkFBMkJNLFNBQTNCLEVBQVo7QUFDRDtBQUNELFNBQVNFLEtBQVQsR0FBa0I7QUFDaEIsU0FBT3RCLEtBQUssQ0FBQ2MsVUFBVSxFQUFYLEVBQWUsT0FBZiw2QkFBNEJNLFNBQTVCLEVBQVo7QUFDRDtBQUNELFNBQVNHLEtBQVQsR0FBa0I7QUFDaEIsU0FBT3ZCLEtBQUssQ0FBQ2MsVUFBVSxFQUFYLEVBQWUsT0FBZiw2QkFBNEJNLFNBQTVCLEVBQVo7QUFDRDs7QUFFRCxJQUFJSSxRQUFRLEdBQUcsYUFBYWpOLE1BQU0sQ0FBQzBILE1BQVAsQ0FBYztBQUN4Q0MsV0FBUyxFQUFFLElBRDZCO0FBRXhDaUYsS0FBRyxFQUFFQSxHQUZtQztBQUd4Q0UsTUFBSSxFQUFFQSxJQUhrQztBQUl4Q0MsT0FBSyxFQUFFQSxLQUppQztBQUt4Q0MsT0FBSyxFQUFFQSxLQUxpQyxFQUFkLENBQTVCOzs7QUFRQSxTQUFTRSxjQUFULENBQXlCdEksTUFBekIsRUFBaUM7QUFDL0IsTUFBSXVJLFVBQVUsR0FBRyxLQUFqQjtBQUNBLE1BQUksT0FBT3ZJLE1BQU0sQ0FBQ3dJLFNBQWQsS0FBNEIsUUFBaEMsRUFBMEM7QUFDeEMsUUFBSTtBQUNGeEksWUFBTSxDQUFDd0ksU0FBUCxHQUFtQkMsSUFBSSxDQUFDQyxLQUFMLENBQVcxSSxNQUFNLENBQUN3SSxTQUFsQixDQUFuQjtBQUNELEtBRkQsQ0FFRSxPQUFPRyxDQUFQLEVBQVU7QUFDVkosZ0JBQVUsR0FBRyxJQUFiO0FBQ0Q7QUFDRjtBQUNELE1BQUlBLFVBQUosRUFBZ0I7QUFDZHZJLFVBQU0sQ0FBQ3NCLElBQVAsSUFBZXRCLE1BQU0sQ0FBQ3NCLElBQVAsQ0FBWTtBQUN6QjRGLFlBQU0sRUFBRSx3R0FEaUIsRUFBWixDQUFmOztBQUdELEdBSkQsTUFJTztBQUNMbEYsUUFBSSxDQUFDNEcscUJBQUwsQ0FBMkI1SSxNQUEzQjtBQUNEO0FBQ0Y7O0FBRUQsSUFBSUQsR0FBRyxHQUFHLGFBQWEzRSxNQUFNLENBQUMwSCxNQUFQLENBQWM7QUFDbkNDLFdBQVMsRUFBRSxJQUR3QjtBQUVuQ3VGLGdCQUFjLEVBQUVBLGNBRm1CLEVBQWQsQ0FBdkI7OztBQUtBLElBQU1PLE1BQU0sR0FBR0MsSUFBZjtBQUNBLElBQU1DLFdBQVcsR0FBR0MsU0FBcEI7O0FBRUEsSUFBTUMsV0FBVyxHQUFHLElBQXBCOztBQUVBLElBQU1DLFNBQVMsR0FBR2hOLE1BQU0sQ0FBQyxVQUFDUCxHQUFELEVBQVM7QUFDaEMsU0FBT2EsUUFBUSxDQUFDYixHQUFHLENBQUNjLE9BQUosQ0FBWXdNLFdBQVosRUFBeUIsR0FBekIsQ0FBRCxDQUFmO0FBQ0QsQ0FGdUIsQ0FBeEI7O0FBSUEsU0FBU0UsZ0JBQVQsQ0FBMkJDLFVBQTNCLEVBQXVDO0FBQ3JDLE1BQU1DLGVBQWUsR0FBR0QsVUFBVSxDQUFDRSxZQUFuQztBQUNBRixZQUFVLENBQUNFLFlBQVgsR0FBMEIsVUFBVUMsS0FBVixFQUEwQixvQ0FBTnRHLElBQU0sNkVBQU5BLElBQU07QUFDbEQsV0FBT29HLGVBQWUsQ0FBQ3hDLEtBQWhCLENBQXNCdUMsVUFBdEIsR0FBbUNGLFNBQVMsQ0FBQ0ssS0FBRCxDQUE1QyxTQUF3RHRHLElBQXhELEVBQVA7QUFDRCxHQUZEO0FBR0Q7O0FBRUQsU0FBU3VHLFFBQVQsQ0FBbUJuSyxJQUFuQixFQUF5QkQsT0FBekIsRUFBa0M7QUFDaEMsTUFBTXFLLE9BQU8sR0FBR3JLLE9BQU8sQ0FBQ0MsSUFBRCxDQUF2QjtBQUNBLE1BQUksQ0FBQ29LLE9BQUwsRUFBYztBQUNackssV0FBTyxDQUFDQyxJQUFELENBQVAsR0FBZ0IsWUFBWTtBQUMxQjhKLHNCQUFnQixDQUFDLElBQUQsQ0FBaEI7QUFDRCxLQUZEO0FBR0QsR0FKRCxNQUlPO0FBQ0wvSixXQUFPLENBQUNDLElBQUQsQ0FBUCxHQUFnQixZQUFtQjtBQUNqQzhKLHNCQUFnQixDQUFDLElBQUQsQ0FBaEIsQ0FEaUMsbUNBQU5sRyxJQUFNLHlEQUFOQSxJQUFNO0FBRWpDLGFBQU93RyxPQUFPLENBQUM1QyxLQUFSLENBQWMsSUFBZCxFQUFvQjVELElBQXBCLENBQVA7QUFDRCxLQUhEO0FBSUQ7QUFDRjs7QUFFRDZGLElBQUksR0FBRyxnQkFBd0IsS0FBZDFKLE9BQWMsdUVBQUosRUFBSTtBQUM3Qm9LLFVBQVEsQ0FBQyxRQUFELEVBQVdwSyxPQUFYLENBQVI7QUFDQSxTQUFPeUosTUFBTSxDQUFDekosT0FBRCxDQUFiO0FBQ0QsQ0FIRDs7QUFLQTRKLFNBQVMsR0FBRyxxQkFBd0IsS0FBZDVKLE9BQWMsdUVBQUosRUFBSTtBQUNsQ29LLFVBQVEsQ0FBQyxTQUFELEVBQVlwSyxPQUFaLENBQVI7QUFDQSxTQUFPMkosV0FBVyxDQUFDM0osT0FBRCxDQUFsQjtBQUNELENBSEQ7O0FBS0EsSUFBTXNLLGdCQUFnQixHQUFHO0FBQ3ZCLG1CQUR1QjtBQUV2QixlQUZ1QjtBQUd2QixtQkFIdUI7QUFJdkIsY0FKdUI7QUFLdkIsVUFMdUI7QUFNdkIsY0FOdUIsQ0FBekI7OztBQVNBLFNBQVNDLFNBQVQsQ0FBb0JDLEVBQXBCLEVBQXdCQyxLQUF4QixFQUErQjtBQUM3QixNQUFNVCxVQUFVLEdBQUdRLEVBQUUsQ0FBQ0UsR0FBSCxDQUFPRixFQUFFLENBQUNHLE1BQVYsQ0FBbkI7QUFDQUYsT0FBSyxDQUFDeEwsT0FBTixDQUFjLFVBQUEyTCxJQUFJLEVBQUk7QUFDcEIsUUFBSWpPLE1BQU0sQ0FBQ3FOLFVBQUQsRUFBYVksSUFBYixDQUFWLEVBQThCO0FBQzVCSixRQUFFLENBQUNJLElBQUQsQ0FBRixHQUFXWixVQUFVLENBQUNZLElBQUQsQ0FBckI7QUFDRDtBQUNGLEdBSkQ7QUFLRDs7QUFFRCxTQUFTQyxPQUFULENBQWtCbk0sSUFBbEIsRUFBd0JvTSxVQUF4QixFQUFvQztBQUNsQyxNQUFJLENBQUNBLFVBQUwsRUFBaUI7QUFDZixXQUFPLElBQVA7QUFDRDs7QUFFRCxNQUFJcEMsYUFBSTFJLE9BQUosSUFBZS9CLEtBQUssQ0FBQ0MsT0FBTixDQUFjd0ssYUFBSTFJLE9BQUosQ0FBWXRCLElBQVosQ0FBZCxDQUFuQixFQUFxRDtBQUNuRCxXQUFPLElBQVA7QUFDRDs7QUFFRG9NLFlBQVUsR0FBR0EsVUFBVSxDQUFDQyxPQUFYLElBQXNCRCxVQUFuQzs7QUFFQSxNQUFJMU8sSUFBSSxDQUFDME8sVUFBRCxDQUFSLEVBQXNCO0FBQ3BCLFFBQUkxTyxJQUFJLENBQUMwTyxVQUFVLENBQUNFLGFBQVgsQ0FBeUJ0TSxJQUF6QixDQUFELENBQVIsRUFBMEM7QUFDeEMsYUFBTyxJQUFQO0FBQ0Q7QUFDRCxRQUFJb00sVUFBVSxDQUFDRyxLQUFYO0FBQ0ZILGNBQVUsQ0FBQ0csS0FBWCxDQUFpQmpMLE9BRGY7QUFFRi9CLFNBQUssQ0FBQ0MsT0FBTixDQUFjNE0sVUFBVSxDQUFDRyxLQUFYLENBQWlCakwsT0FBakIsQ0FBeUJ0QixJQUF6QixDQUFkLENBRkYsRUFFaUQ7QUFDL0MsYUFBTyxJQUFQO0FBQ0Q7QUFDRCxXQUFPLEtBQVA7QUFDRDs7QUFFRCxNQUFJdEMsSUFBSSxDQUFDME8sVUFBVSxDQUFDcE0sSUFBRCxDQUFYLENBQVIsRUFBNEI7QUFDMUIsV0FBTyxJQUFQO0FBQ0Q7QUFDRCxNQUFNd00sTUFBTSxHQUFHSixVQUFVLENBQUNJLE1BQTFCO0FBQ0EsTUFBSWpOLEtBQUssQ0FBQ0MsT0FBTixDQUFjZ04sTUFBZCxDQUFKLEVBQTJCO0FBQ3pCLFdBQU8sQ0FBQyxDQUFDQSxNQUFNLENBQUNDLElBQVAsQ0FBWSxVQUFBQyxLQUFLLFVBQUlQLE9BQU8sQ0FBQ25NLElBQUQsRUFBTzBNLEtBQVAsQ0FBWCxFQUFqQixDQUFUO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTQyxTQUFULENBQW9CQyxTQUFwQixFQUErQmxOLEtBQS9CLEVBQXNDME0sVUFBdEMsRUFBa0Q7QUFDaEQxTSxPQUFLLENBQUNhLE9BQU4sQ0FBYyxVQUFBUCxJQUFJLEVBQUk7QUFDcEIsUUFBSW1NLE9BQU8sQ0FBQ25NLElBQUQsRUFBT29NLFVBQVAsQ0FBWCxFQUErQjtBQUM3QlEsZUFBUyxDQUFDNU0sSUFBRCxDQUFULEdBQWtCLFVBQVVtRixJQUFWLEVBQWdCO0FBQ2hDLGVBQU8sS0FBSzBILEdBQUwsSUFBWSxLQUFLQSxHQUFMLENBQVNDLFdBQVQsQ0FBcUI5TSxJQUFyQixFQUEyQm1GLElBQTNCLENBQW5CO0FBQ0QsT0FGRDtBQUdEO0FBQ0YsR0FORDtBQU9EOztBQUVELFNBQVM0SCxnQkFBVCxDQUEyQi9DLEdBQTNCLEVBQWdDb0MsVUFBaEMsRUFBNEM7QUFDMUNBLFlBQVUsR0FBR0EsVUFBVSxDQUFDQyxPQUFYLElBQXNCRCxVQUFuQztBQUNBLE1BQUlZLFlBQUo7QUFDQSxNQUFJdFAsSUFBSSxDQUFDME8sVUFBRCxDQUFSLEVBQXNCO0FBQ3BCWSxnQkFBWSxHQUFHWixVQUFmO0FBQ0FBLGNBQVUsR0FBR1ksWUFBWSxDQUFDVixhQUExQjtBQUNELEdBSEQsTUFHTztBQUNMVSxnQkFBWSxHQUFHaEQsR0FBRyxDQUFDaUQsTUFBSixDQUFXYixVQUFYLENBQWY7QUFDRDtBQUNELFNBQU8sQ0FBQ1ksWUFBRCxFQUFlWixVQUFmLENBQVA7QUFDRDs7QUFFRCxTQUFTYyxTQUFULENBQW9CcEIsRUFBcEIsRUFBd0JxQixRQUF4QixFQUFrQztBQUNoQyxNQUFJNU4sS0FBSyxDQUFDQyxPQUFOLENBQWMyTixRQUFkLEtBQTJCQSxRQUFRLENBQUN2TixNQUF4QyxFQUFnRDtBQUM5QyxRQUFNd04sTUFBTSxHQUFHOVAsTUFBTSxDQUFDZ0IsTUFBUCxDQUFjLElBQWQsQ0FBZjtBQUNBNk8sWUFBUSxDQUFDNU0sT0FBVCxDQUFpQixVQUFBOE0sUUFBUSxFQUFJO0FBQzNCRCxZQUFNLENBQUNDLFFBQUQsQ0FBTixHQUFtQixJQUFuQjtBQUNELEtBRkQ7QUFHQXZCLE1BQUUsQ0FBQ3dCLFlBQUgsR0FBa0J4QixFQUFFLENBQUNzQixNQUFILEdBQVlBLE1BQTlCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTRyxVQUFULENBQXFCQyxNQUFyQixFQUE2QmxDLFVBQTdCLEVBQXlDO0FBQ3ZDa0MsUUFBTSxHQUFHLENBQUNBLE1BQU0sSUFBSSxFQUFYLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsQ0FBVDtBQUNBLE1BQU0vSCxHQUFHLEdBQUc4SCxNQUFNLENBQUM1TixNQUFuQjs7QUFFQSxNQUFJOEYsR0FBRyxLQUFLLENBQVosRUFBZTtBQUNiNEYsY0FBVSxDQUFDb0MsT0FBWCxHQUFxQkYsTUFBTSxDQUFDLENBQUQsQ0FBM0I7QUFDRCxHQUZELE1BRU8sSUFBSTlILEdBQUcsS0FBSyxDQUFaLEVBQWU7QUFDcEI0RixjQUFVLENBQUNvQyxPQUFYLEdBQXFCRixNQUFNLENBQUMsQ0FBRCxDQUEzQjtBQUNBbEMsY0FBVSxDQUFDcUMsUUFBWCxHQUFzQkgsTUFBTSxDQUFDLENBQUQsQ0FBNUI7QUFDRDtBQUNGOztBQUVELFNBQVNJLFFBQVQsQ0FBbUJ4QixVQUFuQixFQUErQnlCLE9BQS9CLEVBQXdDO0FBQ3RDLE1BQUloTixJQUFJLEdBQUd1TCxVQUFVLENBQUN2TCxJQUFYLElBQW1CLEVBQTlCO0FBQ0EsTUFBTWlOLE9BQU8sR0FBRzFCLFVBQVUsQ0FBQzBCLE9BQVgsSUFBc0IsRUFBdEM7O0FBRUEsTUFBSSxPQUFPak4sSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QixRQUFJO0FBQ0ZBLFVBQUksR0FBR0EsSUFBSSxDQUFDN0MsSUFBTCxDQUFVNlAsT0FBVixDQUFQLENBREUsQ0FDeUI7QUFDNUIsS0FGRCxDQUVFLE9BQU9oRCxDQUFQLEVBQVU7QUFDVixVQUFJa0QsK0VBQUEsQ0FBWUMsYUFBaEIsRUFBK0I7QUFDN0IzSCxlQUFPLENBQUNvQyxJQUFSLENBQWEsd0VBQWIsRUFBdUY1SCxJQUF2RjtBQUNEO0FBQ0Y7QUFDRixHQVJELE1BUU87QUFDTCxRQUFJO0FBQ0Y7QUFDQUEsVUFBSSxHQUFHOEosSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ3NELFNBQUwsQ0FBZXBOLElBQWYsQ0FBWCxDQUFQO0FBQ0QsS0FIRCxDQUdFLE9BQU9nSyxDQUFQLEVBQVUsQ0FBRTtBQUNmOztBQUVELE1BQUksQ0FBQy9NLGFBQWEsQ0FBQytDLElBQUQsQ0FBbEIsRUFBMEI7QUFDeEJBLFFBQUksR0FBRyxFQUFQO0FBQ0Q7O0FBRUR2RCxRQUFNLENBQUNnRCxJQUFQLENBQVl3TixPQUFaLEVBQXFCdk4sT0FBckIsQ0FBNkIsVUFBQTRGLFVBQVUsRUFBSTtBQUN6QyxRQUFJMEgsT0FBTyxDQUFDSyxtQkFBUixDQUE0QnJPLE9BQTVCLENBQW9Dc0csVUFBcEMsTUFBb0QsQ0FBQyxDQUFyRCxJQUEwRCxDQUFDbEksTUFBTSxDQUFDNEMsSUFBRCxFQUFPc0YsVUFBUCxDQUFyRSxFQUF5RjtBQUN2RnRGLFVBQUksQ0FBQ3NGLFVBQUQsQ0FBSixHQUFtQjJILE9BQU8sQ0FBQzNILFVBQUQsQ0FBMUI7QUFDRDtBQUNGLEdBSkQ7O0FBTUEsU0FBT3RGLElBQVA7QUFDRDs7QUFFRCxJQUFNc04sVUFBVSxHQUFHLENBQUNDLE1BQUQsRUFBUzFKLE1BQVQsRUFBaUIySixPQUFqQixFQUEwQi9RLE1BQTFCLEVBQWtDaUMsS0FBbEMsRUFBeUMsSUFBekMsQ0FBbkI7O0FBRUEsU0FBUytPLGNBQVQsQ0FBeUIvTSxJQUF6QixFQUErQjtBQUM3QixTQUFPLFNBQVNnTixRQUFULENBQW1CQyxNQUFuQixFQUEyQkMsTUFBM0IsRUFBbUM7QUFDeEMsUUFBSSxLQUFLNUIsR0FBVCxFQUFjO0FBQ1osV0FBS0EsR0FBTCxDQUFTdEwsSUFBVCxJQUFpQmlOLE1BQWpCLENBRFksQ0FDYTtBQUMxQjtBQUNGLEdBSkQ7QUFLRDs7QUFFRCxTQUFTRSxhQUFULENBQXdCdEMsVUFBeEIsRUFBb0N1QyxZQUFwQyxFQUFrRDtBQUNoRCxNQUFNQyxZQUFZLEdBQUd4QyxVQUFVLENBQUMsV0FBRCxDQUEvQjtBQUNBLE1BQU15QyxVQUFVLEdBQUd6QyxVQUFVLENBQUMsU0FBRCxDQUE3QjtBQUNBLE1BQU0wQyxTQUFTLEdBQUcxQyxVQUFVLENBQUMsUUFBRCxDQUE1Qjs7QUFFQSxNQUFJMkMsUUFBUSxHQUFHM0MsVUFBVSxDQUFDLE9BQUQsQ0FBekI7O0FBRUEsTUFBSSxDQUFDMkMsUUFBTCxFQUFlO0FBQ2IzQyxjQUFVLENBQUMsT0FBRCxDQUFWLEdBQXNCMkMsUUFBUSxHQUFHLEVBQWpDO0FBQ0Q7O0FBRUQsTUFBTUMsU0FBUyxHQUFHLEVBQWxCO0FBQ0EsTUFBSXpQLEtBQUssQ0FBQ0MsT0FBTixDQUFjb1AsWUFBZCxDQUFKLEVBQWlDO0FBQy9CQSxnQkFBWSxDQUFDck8sT0FBYixDQUFxQixVQUFBME8sUUFBUSxFQUFJO0FBQy9CRCxlQUFTLENBQUNsUCxJQUFWLENBQWVtUCxRQUFRLENBQUN0USxPQUFULENBQWlCLFFBQWpCLEVBQThCLE1BQTlCLGVBQWY7QUFDQSxVQUFJc1EsUUFBUSxLQUFLLGtCQUFqQixFQUFxQztBQUNuQyxZQUFJMVAsS0FBSyxDQUFDQyxPQUFOLENBQWN1UCxRQUFkLENBQUosRUFBNkI7QUFDM0JBLGtCQUFRLENBQUNqUCxJQUFULENBQWMsTUFBZDtBQUNBaVAsa0JBQVEsQ0FBQ2pQLElBQVQsQ0FBYyxPQUFkO0FBQ0QsU0FIRCxNQUdPO0FBQ0xpUCxrQkFBUSxDQUFDLE1BQUQsQ0FBUixHQUFtQjtBQUNqQjlILGdCQUFJLEVBQUVtSCxNQURXO0FBRWpCL0IsbUJBQU8sRUFBRSxFQUZRLEVBQW5COztBQUlBMEMsa0JBQVEsQ0FBQyxPQUFELENBQVIsR0FBb0I7QUFDbEI5SCxnQkFBSSxFQUFFLENBQUNtSCxNQUFELEVBQVMxSixNQUFULEVBQWlCMkosT0FBakIsRUFBMEI5TyxLQUExQixFQUFpQ2pDLE1BQWpDLEVBQXlDNFIsSUFBekMsQ0FEWTtBQUVsQjdDLG1CQUFPLEVBQUUsRUFGUyxFQUFwQjs7QUFJRDtBQUNGO0FBQ0YsS0FqQkQ7QUFrQkQ7QUFDRCxNQUFJdk8sYUFBYSxDQUFDK1EsVUFBRCxDQUFiLElBQTZCQSxVQUFVLENBQUNNLEtBQTVDLEVBQW1EO0FBQ2pESCxhQUFTLENBQUNsUCxJQUFWO0FBQ0U2TyxnQkFBWSxDQUFDO0FBQ1hTLGdCQUFVLEVBQUVDLGNBQWMsQ0FBQ1IsVUFBVSxDQUFDTSxLQUFaLEVBQW1CLElBQW5CLENBRGYsRUFBRCxDQURkOzs7QUFLRDtBQUNELE1BQUk1UCxLQUFLLENBQUNDLE9BQU4sQ0FBY3NQLFNBQWQsQ0FBSixFQUE4QjtBQUM1QkEsYUFBUyxDQUFDdk8sT0FBVixDQUFrQixVQUFBK08sUUFBUSxFQUFJO0FBQzVCLFVBQUl4UixhQUFhLENBQUN3UixRQUFELENBQWIsSUFBMkJBLFFBQVEsQ0FBQ0gsS0FBeEMsRUFBK0M7QUFDN0NILGlCQUFTLENBQUNsUCxJQUFWO0FBQ0U2TyxvQkFBWSxDQUFDO0FBQ1hTLG9CQUFVLEVBQUVDLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDSCxLQUFWLEVBQWlCLElBQWpCLENBRGYsRUFBRCxDQURkOzs7QUFLRDtBQUNGLEtBUkQ7QUFTRDtBQUNELFNBQU9ILFNBQVA7QUFDRDs7QUFFRCxTQUFTTyxhQUFULENBQXdCclIsR0FBeEIsRUFBNkIrSSxJQUE3QixFQUFtQ3VJLFlBQW5DLEVBQWlEQyxJQUFqRCxFQUF1RDtBQUNyRDtBQUNBLE1BQUlsUSxLQUFLLENBQUNDLE9BQU4sQ0FBY3lILElBQWQsS0FBdUJBLElBQUksQ0FBQ3JILE1BQUwsS0FBZ0IsQ0FBM0MsRUFBOEM7QUFDNUMsV0FBT3FILElBQUksQ0FBQyxDQUFELENBQVg7QUFDRDtBQUNEO0FBQ0U7QUFDRXVJLGdCQUFZLEtBQUssS0FBakI7QUFDQWpRLFNBQUssQ0FBQ0MsT0FBTixDQUFjeUgsSUFBZCxDQURBO0FBRUFBLFFBQUksQ0FBQ3JILE1BQUwsS0FBZ0IsQ0FGaEI7QUFHQXFILFFBQUksQ0FBQ3BILE9BQUwsQ0FBYXVPLE1BQWIsTUFBeUIsQ0FBQyxDQUgxQjtBQUlBbkgsUUFBSSxDQUFDcEgsT0FBTCxDQUFhd08sT0FBYixNQUEwQixDQUFDLENBTDdCO0FBTUUsS0FBRTtBQUNGLFVBQUlvQixJQUFKLEVBQVU7QUFDUnBKLGVBQU8sQ0FBQ29DLElBQVI7QUFDV3ZLLFdBRFgscUVBQ3lFdVIsSUFEekU7O0FBR0Q7QUFDRCxhQUFPcEIsT0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPcEgsSUFBUDtBQUNEOztBQUVELFNBQVNvSSxjQUFULENBQXlCRixLQUF6QixFQUErRCxLQUEvQk8sVUFBK0IsdUVBQWxCLEtBQWtCLEtBQVhELElBQVcsdUVBQUosRUFBSTtBQUM3RCxNQUFNTCxVQUFVLEdBQUcsRUFBbkI7QUFDQSxNQUFJLENBQUNNLFVBQUwsRUFBaUI7QUFDZk4sY0FBVSxDQUFDTyxLQUFYLEdBQW1CO0FBQ2pCMUksVUFBSSxFQUFFbUgsTUFEVztBQUVqQmpMLFdBQUssRUFBRSxFQUZVLEVBQW5COztBQUlBaU0sY0FBVSxDQUFDakMsUUFBWCxHQUFzQixFQUFFO0FBQ3RCbEcsVUFBSSxFQUFFLElBRGM7QUFFcEI5RCxXQUFLLEVBQUUsRUFGYTtBQUdwQm9MLGNBQVEsRUFBRSxrQkFBVUMsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEI7QUFDbEMsWUFBTXJCLE1BQU0sR0FBRzlQLE1BQU0sQ0FBQ2dCLE1BQVAsQ0FBYyxJQUFkLENBQWY7QUFDQWtRLGNBQU0sQ0FBQ2pPLE9BQVAsQ0FBZSxVQUFBOE0sUUFBUSxFQUFJO0FBQ3pCRCxnQkFBTSxDQUFDQyxRQUFELENBQU4sR0FBbUIsSUFBbkI7QUFDRCxTQUZEO0FBR0EsYUFBS3VDLE9BQUwsQ0FBYTtBQUNYeEMsZ0JBQU0sRUFBTkEsTUFEVyxFQUFiOztBQUdELE9BWG1CLEVBQXRCOztBQWFEO0FBQ0QsTUFBSTdOLEtBQUssQ0FBQ0MsT0FBTixDQUFjMlAsS0FBZCxDQUFKLEVBQTBCLENBQUU7QUFDMUJBLFNBQUssQ0FBQzVPLE9BQU4sQ0FBYyxVQUFBckMsR0FBRyxFQUFJO0FBQ25Ca1IsZ0JBQVUsQ0FBQ2xSLEdBQUQsQ0FBVixHQUFrQjtBQUNoQitJLFlBQUksRUFBRSxJQURVO0FBRWhCc0gsZ0JBQVEsRUFBRUQsY0FBYyxDQUFDcFEsR0FBRCxDQUZSLEVBQWxCOztBQUlELEtBTEQ7QUFNRCxHQVBELE1BT08sSUFBSUosYUFBYSxDQUFDcVIsS0FBRCxDQUFqQixFQUEwQixDQUFFO0FBQ2pDN1IsVUFBTSxDQUFDZ0QsSUFBUCxDQUFZNk8sS0FBWixFQUFtQjVPLE9BQW5CLENBQTJCLFVBQUFyQyxHQUFHLEVBQUk7QUFDaEMsVUFBTTJSLElBQUksR0FBR1YsS0FBSyxDQUFDalIsR0FBRCxDQUFsQjtBQUNBLFVBQUlKLGFBQWEsQ0FBQytSLElBQUQsQ0FBakIsRUFBeUIsQ0FBRTtBQUN6QixZQUFJMU0sS0FBSyxHQUFHME0sSUFBSSxDQUFDLFNBQUQsQ0FBaEI7QUFDQSxZQUFJblMsSUFBSSxDQUFDeUYsS0FBRCxDQUFSLEVBQWlCO0FBQ2ZBLGVBQUssR0FBR0EsS0FBSyxFQUFiO0FBQ0Q7O0FBRUQwTSxZQUFJLENBQUM1SSxJQUFMLEdBQVlzSSxhQUFhLENBQUNyUixHQUFELEVBQU0yUixJQUFJLENBQUM1SSxJQUFYLEVBQWlCOUQsS0FBakIsRUFBd0JzTSxJQUF4QixDQUF6Qjs7QUFFQUwsa0JBQVUsQ0FBQ2xSLEdBQUQsQ0FBVixHQUFrQjtBQUNoQitJLGNBQUksRUFBRWtILFVBQVUsQ0FBQ3RPLE9BQVgsQ0FBbUJnUSxJQUFJLENBQUM1SSxJQUF4QixNQUFrQyxDQUFDLENBQW5DLEdBQXVDNEksSUFBSSxDQUFDNUksSUFBNUMsR0FBbUQsSUFEekM7QUFFaEI5RCxlQUFLLEVBQUxBLEtBRmdCO0FBR2hCb0wsa0JBQVEsRUFBRUQsY0FBYyxDQUFDcFEsR0FBRCxDQUhSLEVBQWxCOztBQUtELE9BYkQsTUFhTyxDQUFFO0FBQ1AsWUFBTStJLElBQUksR0FBR3NJLGFBQWEsQ0FBQ3JSLEdBQUQsRUFBTTJSLElBQU4sRUFBWSxJQUFaLEVBQWtCSixJQUFsQixDQUExQjtBQUNBTCxrQkFBVSxDQUFDbFIsR0FBRCxDQUFWLEdBQWtCO0FBQ2hCK0ksY0FBSSxFQUFFa0gsVUFBVSxDQUFDdE8sT0FBWCxDQUFtQm9ILElBQW5CLE1BQTZCLENBQUMsQ0FBOUIsR0FBa0NBLElBQWxDLEdBQXlDLElBRC9CO0FBRWhCc0gsa0JBQVEsRUFBRUQsY0FBYyxDQUFDcFEsR0FBRCxDQUZSLEVBQWxCOztBQUlEO0FBQ0YsS0F0QkQ7QUF1QkQ7QUFDRCxTQUFPa1IsVUFBUDtBQUNEOztBQUVELFNBQVNVLFNBQVQsQ0FBb0JyRSxLQUFwQixFQUEyQjtBQUN6QjtBQUNBLE1BQUk7QUFDRkEsU0FBSyxDQUFDc0UsRUFBTixHQUFXcEYsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ3NELFNBQUwsQ0FBZXhDLEtBQWYsQ0FBWCxDQUFYO0FBQ0QsR0FGRCxDQUVFLE9BQU9aLENBQVAsRUFBVSxDQUFFOztBQUVkWSxPQUFLLENBQUN1RSxlQUFOLEdBQXdCN1IsSUFBeEI7QUFDQXNOLE9BQUssQ0FBQ3dFLGNBQU4sR0FBdUI5UixJQUF2Qjs7QUFFQXNOLE9BQUssQ0FBQ3lFLE1BQU4sR0FBZXpFLEtBQUssQ0FBQ3lFLE1BQU4sSUFBZ0IsRUFBL0I7O0FBRUEsTUFBSSxDQUFDalMsTUFBTSxDQUFDd04sS0FBRCxFQUFRLFFBQVIsQ0FBWCxFQUE4QjtBQUM1QkEsU0FBSyxDQUFDMEUsTUFBTixHQUFlLEVBQWY7QUFDRDs7QUFFRCxHQUFFO0FBQ0E7QUFDRXJTLGlCQUFhLENBQUMyTixLQUFLLENBQUMwRSxNQUFQLENBQWI7QUFDQWxTLFVBQU0sQ0FBQ3dOLEtBQUssQ0FBQzBFLE1BQVAsRUFBZSxTQUFmLENBRE47QUFFQSxLQUFDbFMsTUFBTSxDQUFDd04sS0FBSyxDQUFDMEUsTUFBUCxFQUFlLE9BQWYsQ0FIVDtBQUlFO0FBQ0ExRSxXQUFLLENBQUMwRSxNQUFOLENBQWFoTixLQUFiLEdBQXFCc0ksS0FBSyxDQUFDMEUsTUFBTixDQUFhQyxPQUFsQztBQUNEO0FBQ0Y7O0FBRUQsTUFBSXRTLGFBQWEsQ0FBQzJOLEtBQUssQ0FBQzBFLE1BQVAsQ0FBakIsRUFBaUM7QUFDL0IxRSxTQUFLLENBQUN5RSxNQUFOLEdBQWU1UyxNQUFNLENBQUNxRyxNQUFQLENBQWMsRUFBZCxFQUFrQjhILEtBQUssQ0FBQ3lFLE1BQXhCLEVBQWdDekUsS0FBSyxDQUFDMEUsTUFBdEMsQ0FBZjtBQUNEOztBQUVELFNBQU8xRSxLQUFQO0FBQ0Q7O0FBRUQsU0FBUzRFLGFBQVQsQ0FBd0J2RSxFQUF4QixFQUE0QndFLGNBQTVCLEVBQTRDO0FBQzFDLE1BQUl6QyxPQUFPLEdBQUcvQixFQUFkO0FBQ0F3RSxnQkFBYyxDQUFDL1AsT0FBZixDQUF1QixVQUFBZ1EsYUFBYSxFQUFJO0FBQ3RDLFFBQU1DLFFBQVEsR0FBR0QsYUFBYSxDQUFDLENBQUQsQ0FBOUI7QUFDQSxRQUFNcE4sS0FBSyxHQUFHb04sYUFBYSxDQUFDLENBQUQsQ0FBM0I7QUFDQSxRQUFJQyxRQUFRLElBQUksT0FBT3JOLEtBQVAsS0FBaUIsV0FBakMsRUFBOEMsQ0FBRTtBQUM5QyxVQUFNc04sUUFBUSxHQUFHRixhQUFhLENBQUMsQ0FBRCxDQUE5QjtBQUNBLFVBQU1HLFNBQVMsR0FBR0gsYUFBYSxDQUFDLENBQUQsQ0FBL0I7O0FBRUEsVUFBTUksSUFBSSxHQUFHSCxRQUFRLEdBQUcxRSxFQUFFLENBQUM4RSxXQUFILENBQWVKLFFBQWYsRUFBeUIzQyxPQUF6QixDQUFILEdBQXVDQSxPQUE1RDs7QUFFQSxVQUFJbkosTUFBTSxDQUFDbU0sU0FBUCxDQUFpQkYsSUFBakIsQ0FBSixFQUE0QjtBQUMxQjlDLGVBQU8sR0FBRzFLLEtBQVY7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDc04sUUFBTCxFQUFlO0FBQ3BCNUMsZUFBTyxHQUFHOEMsSUFBSSxDQUFDeE4sS0FBRCxDQUFkO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsWUFBSTVELEtBQUssQ0FBQ0MsT0FBTixDQUFjbVIsSUFBZCxDQUFKLEVBQXlCO0FBQ3ZCOUMsaUJBQU8sR0FBRzhDLElBQUksQ0FBQ2xFLElBQUwsQ0FBVSxVQUFBcUUsUUFBUSxFQUFJO0FBQzlCLG1CQUFPaEYsRUFBRSxDQUFDOEUsV0FBSCxDQUFlSCxRQUFmLEVBQXlCSyxRQUF6QixNQUF1QzNOLEtBQTlDO0FBQ0QsV0FGUyxDQUFWO0FBR0QsU0FKRCxNQUlPLElBQUlyRixhQUFhLENBQUM2UyxJQUFELENBQWpCLEVBQXlCO0FBQzlCOUMsaUJBQU8sR0FBR3ZRLE1BQU0sQ0FBQ2dELElBQVAsQ0FBWXFRLElBQVosRUFBa0JsRSxJQUFsQixDQUF1QixVQUFBc0UsT0FBTyxFQUFJO0FBQzFDLG1CQUFPakYsRUFBRSxDQUFDOEUsV0FBSCxDQUFlSCxRQUFmLEVBQXlCRSxJQUFJLENBQUNJLE9BQUQsQ0FBN0IsTUFBNEM1TixLQUFuRDtBQUNELFdBRlMsQ0FBVjtBQUdELFNBSk0sTUFJQTtBQUNMa0QsaUJBQU8sQ0FBQ0MsS0FBUixDQUFjLGlCQUFkLEVBQWlDcUssSUFBakM7QUFDRDtBQUNGOztBQUVELFVBQUlELFNBQUosRUFBZTtBQUNiN0MsZUFBTyxHQUFHL0IsRUFBRSxDQUFDOEUsV0FBSCxDQUFlRixTQUFmLEVBQTBCN0MsT0FBMUIsQ0FBVjtBQUNEO0FBQ0Y7QUFDRixHQS9CRDtBQWdDQSxTQUFPQSxPQUFQO0FBQ0Q7O0FBRUQsU0FBU21ELGlCQUFULENBQTRCbEYsRUFBNUIsRUFBZ0NtRixLQUFoQyxFQUF1Q3hGLEtBQXZDLEVBQThDO0FBQzVDLE1BQU15RixRQUFRLEdBQUcsRUFBakI7O0FBRUEsTUFBSTNSLEtBQUssQ0FBQ0MsT0FBTixDQUFjeVIsS0FBZCxLQUF3QkEsS0FBSyxDQUFDclIsTUFBbEMsRUFBMEM7QUFDeEM7Ozs7Ozs7Ozs7O0FBV0FxUixTQUFLLENBQUMxUSxPQUFOLENBQWMsVUFBQ2lRLFFBQUQsRUFBV3ZRLEtBQVgsRUFBcUI7QUFDakMsVUFBSSxPQUFPdVEsUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUNoQyxZQUFJLENBQUNBLFFBQUwsRUFBZSxDQUFFO0FBQ2ZVLGtCQUFRLENBQUMsTUFBTWpSLEtBQVAsQ0FBUixHQUF3QjZMLEVBQXhCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBSTBFLFFBQVEsS0FBSyxRQUFqQixFQUEyQixDQUFFO0FBQzNCVSxvQkFBUSxDQUFDLE1BQU1qUixLQUFQLENBQVIsR0FBd0J3TCxLQUF4QjtBQUNELFdBRkQsTUFFTyxJQUFJK0UsUUFBUSxDQUFDM1EsT0FBVCxDQUFpQixTQUFqQixNQUFnQyxDQUFwQyxFQUF1QyxDQUFFO0FBQzlDcVIsb0JBQVEsQ0FBQyxNQUFNalIsS0FBUCxDQUFSLEdBQXdCNkwsRUFBRSxDQUFDOEUsV0FBSCxDQUFlSixRQUFRLENBQUM3UixPQUFULENBQWlCLFNBQWpCLEVBQTRCLEVBQTVCLENBQWYsRUFBZ0Q4TSxLQUFoRCxDQUF4QjtBQUNELFdBRk0sTUFFQTtBQUNMeUYsb0JBQVEsQ0FBQyxNQUFNalIsS0FBUCxDQUFSLEdBQXdCNkwsRUFBRSxDQUFDOEUsV0FBSCxDQUFlSixRQUFmLENBQXhCO0FBQ0Q7QUFDRjtBQUNGLE9BWkQsTUFZTztBQUNMVSxnQkFBUSxDQUFDLE1BQU1qUixLQUFQLENBQVIsR0FBd0JvUSxhQUFhLENBQUN2RSxFQUFELEVBQUswRSxRQUFMLENBQXJDO0FBQ0Q7QUFDRixLQWhCRDtBQWlCRDs7QUFFRCxTQUFPVSxRQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsYUFBVCxDQUF3QkMsR0FBeEIsRUFBNkI7QUFDM0IsTUFBTXJULEdBQUcsR0FBRyxFQUFaO0FBQ0EsT0FBSyxJQUFJNEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3lSLEdBQUcsQ0FBQ3hSLE1BQXhCLEVBQWdDRCxDQUFDLEVBQWpDLEVBQXFDO0FBQ25DLFFBQU0wUixPQUFPLEdBQUdELEdBQUcsQ0FBQ3pSLENBQUQsQ0FBbkI7QUFDQTVCLE9BQUcsQ0FBQ3NULE9BQU8sQ0FBQyxDQUFELENBQVIsQ0FBSCxHQUFrQkEsT0FBTyxDQUFDLENBQUQsQ0FBekI7QUFDRDtBQUNELFNBQU90VCxHQUFQO0FBQ0Q7O0FBRUQsU0FBU3VULGdCQUFULENBQTJCeEYsRUFBM0IsRUFBK0JMLEtBQS9CLEVBQW1GLEtBQTdDdEcsSUFBNkMsdUVBQXRDLEVBQXNDLEtBQWxDOEwsS0FBa0MsdUVBQTFCLEVBQTBCLEtBQXRCTSxRQUFzQix1REFBWnBMLFVBQVk7QUFDakYsTUFBSXFMLGVBQWUsR0FBRyxLQUF0QixDQURpRixDQUNwRDtBQUM3QixNQUFJRCxRQUFKLEVBQWMsQ0FBRTtBQUNkQyxtQkFBZSxHQUFHL0YsS0FBSyxDQUFDZ0csYUFBTjtBQUNoQmhHLFNBQUssQ0FBQ2dHLGFBQU4sQ0FBb0JDLE9BREo7QUFFaEJqRyxTQUFLLENBQUNnRyxhQUFOLENBQW9CQyxPQUFwQixDQUE0QkMsT0FBNUIsS0FBd0MsSUFGMUM7QUFHQSxRQUFJLENBQUN4TSxJQUFJLENBQUN2RixNQUFWLEVBQWtCLENBQUU7QUFDbEIsVUFBSTRSLGVBQUosRUFBcUI7QUFDbkIsZUFBTyxDQUFDL0YsS0FBRCxDQUFQO0FBQ0Q7QUFDRCxhQUFPQSxLQUFLLENBQUMwRSxNQUFOLENBQWF5QixRQUFiLElBQXlCbkcsS0FBSyxDQUFDMEUsTUFBdEM7QUFDRDtBQUNGOztBQUVELE1BQU1lLFFBQVEsR0FBR0YsaUJBQWlCLENBQUNsRixFQUFELEVBQUttRixLQUFMLEVBQVl4RixLQUFaLENBQWxDOztBQUVBLE1BQU1vRyxHQUFHLEdBQUcsRUFBWjtBQUNBMU0sTUFBSSxDQUFDNUUsT0FBTCxDQUFhLFVBQUF1UixHQUFHLEVBQUk7QUFDbEIsUUFBSUEsR0FBRyxLQUFLLFFBQVosRUFBc0I7QUFDcEIsVUFBSTNMLFVBQVUsS0FBSyxhQUFmLElBQWdDLENBQUNvTCxRQUFyQyxFQUErQyxDQUFFO0FBQy9DTSxXQUFHLENBQUMvUixJQUFKLENBQVMyTCxLQUFLLENBQUN5RSxNQUFOLENBQWEvTSxLQUF0QjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlvTyxRQUFRLElBQUksQ0FBQ0MsZUFBakIsRUFBa0M7QUFDaENLLGFBQUcsQ0FBQy9SLElBQUosQ0FBUzJMLEtBQUssQ0FBQzBFLE1BQU4sQ0FBYXlCLFFBQWIsQ0FBc0IsQ0FBdEIsQ0FBVDtBQUNELFNBRkQsTUFFTyxDQUFFO0FBQ1BDLGFBQUcsQ0FBQy9SLElBQUosQ0FBUzJMLEtBQVQ7QUFDRDtBQUNGO0FBQ0YsS0FWRCxNQVVPO0FBQ0wsVUFBSWxNLEtBQUssQ0FBQ0MsT0FBTixDQUFjc1MsR0FBZCxLQUFzQkEsR0FBRyxDQUFDLENBQUQsQ0FBSCxLQUFXLEdBQXJDLEVBQTBDO0FBQ3hDRCxXQUFHLENBQUMvUixJQUFKLENBQVNxUixhQUFhLENBQUNXLEdBQUQsQ0FBdEI7QUFDRCxPQUZELE1BRU8sSUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBZixJQUEyQjdULE1BQU0sQ0FBQ2lULFFBQUQsRUFBV1ksR0FBWCxDQUFyQyxFQUFzRDtBQUMzREQsV0FBRyxDQUFDL1IsSUFBSixDQUFTb1IsUUFBUSxDQUFDWSxHQUFELENBQWpCO0FBQ0QsT0FGTSxNQUVBO0FBQ0xELFdBQUcsQ0FBQy9SLElBQUosQ0FBU2dTLEdBQVQ7QUFDRDtBQUNGO0FBQ0YsR0FwQkQ7O0FBc0JBLFNBQU9ELEdBQVA7QUFDRDs7QUFFRCxJQUFNRSxJQUFJLEdBQUcsR0FBYjtBQUNBLElBQU1DLE1BQU0sR0FBRyxHQUFmOztBQUVBLFNBQVNDLGdCQUFULENBQTJCQyxTQUEzQixFQUFzQ0MsT0FBdEMsRUFBK0M7QUFDN0MsU0FBUUQsU0FBUyxLQUFLQyxPQUFmOztBQUVIQSxTQUFPLEtBQUssY0FBWjs7QUFFRUQsV0FBUyxLQUFLLE9BQWQ7QUFDQUEsV0FBUyxLQUFLLEtBSGhCLENBRko7OztBQVFEOztBQUVELFNBQVNFLFdBQVQsQ0FBc0IzRyxLQUF0QixFQUE2QjtBQUMzQkEsT0FBSyxHQUFHcUUsU0FBUyxDQUFDckUsS0FBRCxDQUFqQjs7QUFFQTtBQUNBLE1BQU1pRyxPQUFPLEdBQUcsQ0FBQ2pHLEtBQUssQ0FBQ2dHLGFBQU4sSUFBdUJoRyxLQUFLLENBQUN5RSxNQUE5QixFQUFzQ3dCLE9BQXREO0FBQ0EsTUFBSSxDQUFDQSxPQUFMLEVBQWM7QUFDWixXQUFPckwsT0FBTyxDQUFDb0MsSUFBUiw4Q0FBUDtBQUNEO0FBQ0QsTUFBTTRKLFNBQVMsR0FBR1gsT0FBTyxDQUFDVyxTQUFSLElBQXFCWCxPQUFPLENBQUMsWUFBRCxDQUE5QyxDQVIyQixDQVFtQztBQUM5RCxNQUFJLENBQUNXLFNBQUwsRUFBZ0I7QUFDZCxXQUFPaE0sT0FBTyxDQUFDb0MsSUFBUiw4Q0FBUDtBQUNEOztBQUVEO0FBQ0EsTUFBTXlKLFNBQVMsR0FBR3pHLEtBQUssQ0FBQ3hFLElBQXhCOztBQUVBLE1BQU00SyxHQUFHLEdBQUcsRUFBWjs7QUFFQVEsV0FBUyxDQUFDOVIsT0FBVixDQUFrQixVQUFBK1IsUUFBUSxFQUFJO0FBQzVCLFFBQUlyTCxJQUFJLEdBQUdxTCxRQUFRLENBQUMsQ0FBRCxDQUFuQjtBQUNBLFFBQU1DLFdBQVcsR0FBR0QsUUFBUSxDQUFDLENBQUQsQ0FBNUI7O0FBRUEsUUFBTWYsUUFBUSxHQUFHdEssSUFBSSxDQUFDdUwsTUFBTCxDQUFZLENBQVosTUFBbUJSLE1BQXBDO0FBQ0EvSyxRQUFJLEdBQUdzSyxRQUFRLEdBQUd0SyxJQUFJLENBQUNuRixLQUFMLENBQVcsQ0FBWCxDQUFILEdBQW1CbUYsSUFBbEM7QUFDQSxRQUFNd0wsTUFBTSxHQUFHeEwsSUFBSSxDQUFDdUwsTUFBTCxDQUFZLENBQVosTUFBbUJULElBQWxDO0FBQ0E5SyxRQUFJLEdBQUd3TCxNQUFNLEdBQUd4TCxJQUFJLENBQUNuRixLQUFMLENBQVcsQ0FBWCxDQUFILEdBQW1CbUYsSUFBaEM7O0FBRUEsUUFBSXNMLFdBQVcsSUFBSU4sZ0JBQWdCLENBQUNDLFNBQUQsRUFBWWpMLElBQVosQ0FBbkMsRUFBc0Q7QUFDcERzTCxpQkFBVyxDQUFDaFMsT0FBWixDQUFvQixVQUFBbVMsVUFBVSxFQUFJO0FBQ2hDLFlBQU12TSxVQUFVLEdBQUd1TSxVQUFVLENBQUMsQ0FBRCxDQUE3QjtBQUNBLFlBQUl2TSxVQUFKLEVBQWdCO0FBQ2QsY0FBSXdNLFVBQVUsR0FBRyxLQUFJLENBQUM5RixHQUF0QjtBQUNBO0FBQ0U4RixvQkFBVSxDQUFDQyxRQUFYLENBQW9CQyxPQUFwQjtBQUNBRixvQkFBVSxDQUFDRyxPQURYO0FBRUFILG9CQUFVLENBQUNHLE9BQVgsQ0FBbUJBLE9BSHJCO0FBSUUsV0FBRTtBQUNGSCxzQkFBVSxHQUFHQSxVQUFVLENBQUNHLE9BQVgsQ0FBbUJBLE9BQWhDO0FBQ0Q7QUFDRCxjQUFJM00sVUFBVSxLQUFLLE9BQW5CLEVBQTRCO0FBQzFCd00sc0JBQVUsQ0FBQ3JJLEtBQVgsQ0FBaUJ2QixLQUFqQixDQUF1QjRKLFVBQXZCO0FBQ0VyQiw0QkFBZ0I7QUFDZCxpQkFBSSxDQUFDekUsR0FEUztBQUVkcEIsaUJBRmM7QUFHZGlILHNCQUFVLENBQUMsQ0FBRCxDQUhJO0FBSWRBLHNCQUFVLENBQUMsQ0FBRCxDQUpJO0FBS2RuQixvQkFMYztBQU1kcEwsc0JBTmMsQ0FEbEI7O0FBU0E7QUFDRDtBQUNELGNBQU00TSxPQUFPLEdBQUdKLFVBQVUsQ0FBQ3hNLFVBQUQsQ0FBMUI7QUFDQSxjQUFJLENBQUN6SSxJQUFJLENBQUNxVixPQUFELENBQVQsRUFBb0I7QUFDbEIsa0JBQU0sSUFBSUMsS0FBSixnQkFBa0I3TSxVQUFsQix3QkFBTjtBQUNEO0FBQ0QsY0FBSXNNLE1BQUosRUFBWTtBQUNWLGdCQUFJTSxPQUFPLENBQUNFLElBQVosRUFBa0I7QUFDaEI7QUFDRDtBQUNERixtQkFBTyxDQUFDRSxJQUFSLEdBQWUsSUFBZjtBQUNEO0FBQ0RwQixhQUFHLENBQUMvUixJQUFKLENBQVNpVCxPQUFPLENBQUNoSyxLQUFSLENBQWM0SixVQUFkLEVBQTBCckIsZ0JBQWdCO0FBQ2pELGVBQUksQ0FBQ3pFLEdBRDRDO0FBRWpEcEIsZUFGaUQ7QUFHakRpSCxvQkFBVSxDQUFDLENBQUQsQ0FIdUM7QUFJakRBLG9CQUFVLENBQUMsQ0FBRCxDQUp1QztBQUtqRG5CLGtCQUxpRDtBQU1qRHBMLG9CQU5pRCxDQUExQyxDQUFUOztBQVFEO0FBQ0YsT0ExQ0Q7QUEyQ0Q7QUFDRixHQXRERDs7QUF3REE7QUFDRStMLFdBQVMsS0FBSyxPQUFkO0FBQ0FMLEtBQUcsQ0FBQ2pTLE1BQUosS0FBZSxDQURmO0FBRUEsU0FBT2lTLEdBQUcsQ0FBQyxDQUFELENBQVYsS0FBa0IsV0FIcEI7QUFJRTtBQUNBLFdBQU9BLEdBQUcsQ0FBQyxDQUFELENBQVY7QUFDRDtBQUNGOztBQUVELElBQU1uUyxLQUFLLEdBQUc7QUFDWixRQURZO0FBRVosUUFGWTtBQUdaLFNBSFk7QUFJWixnQkFKWSxDQUFkOzs7QUFPQSxTQUFTd1QsWUFBVCxDQUF1QnBILEVBQXZCOzs7QUFHRyxLQUZEQyxLQUVDLFNBRkRBLEtBRUMsQ0FERG9ILFFBQ0MsU0FEREEsUUFDQztBQUNELE1BQUlySCxFQUFFLENBQUM4RyxRQUFILENBQVlRLEtBQWhCLEVBQXVCO0FBQ3JCcEosaUJBQUl6TSxTQUFKLENBQWM4VixNQUFkLEdBQXVCdkgsRUFBRSxDQUFDOEcsUUFBSCxDQUFZUSxLQUFuQztBQUNEOztBQUVEcEosZUFBSXpNLFNBQUosQ0FBYytWLE1BQWQsR0FBdUIsVUFBdkI7O0FBRUF0SixlQUFJMEMsS0FBSixDQUFVO0FBQ1I2RyxnQkFEUSwwQkFDUTtBQUNkLFVBQUksQ0FBQyxLQUFLWCxRQUFMLENBQWMzRyxNQUFuQixFQUEyQjtBQUN6QjtBQUNEOztBQUVELFdBQUtBLE1BQUwsR0FBYyxLQUFLMkcsUUFBTCxDQUFjM0csTUFBNUI7O0FBRUEsV0FBS0QsR0FBTDtBQUNFbkwsWUFBSSxFQUFFLEVBRFI7QUFFRyxXQUFLb0wsTUFGUixFQUVpQixLQUFLMkcsUUFBTCxDQUFjdEgsVUFGL0I7OztBQUtBLFdBQUtrSSxNQUFMLEdBQWMsS0FBS1osUUFBTCxDQUFjdEgsVUFBNUI7O0FBRUEsYUFBTyxLQUFLc0gsUUFBTCxDQUFjM0csTUFBckI7QUFDQSxhQUFPLEtBQUsyRyxRQUFMLENBQWN0SCxVQUFyQjs7QUFFQSxVQUFJLEtBQUtXLE1BQUwsS0FBZ0IsS0FBcEIsRUFBMkI7QUFDekJrSCxnQkFBUSxDQUFDLElBQUQsQ0FBUjtBQUNBdEgsaUJBQVMsQ0FBQyxJQUFELEVBQU9FLEtBQVAsQ0FBVDtBQUNEO0FBQ0YsS0F0Qk8sRUFBVjs7O0FBeUJBLE1BQU0wSCxVQUFVLEdBQUc7QUFDakJDLFlBRGlCLG9CQUNQdk8sSUFETyxFQUNEO0FBQ2QsVUFBSSxLQUFLMEgsR0FBVCxFQUFjLENBQUU7QUFDZDtBQUNEOztBQUVELFdBQUtBLEdBQUwsR0FBV2YsRUFBWDs7QUFFQSxXQUFLZSxHQUFMLENBQVNiLEdBQVQsR0FBZTtBQUNiMkgsV0FBRyxFQUFFLElBRFEsRUFBZjs7O0FBSUEsV0FBSzlHLEdBQUwsQ0FBUzJHLE1BQVQsR0FBa0IsSUFBbEI7QUFDQTtBQUNBLFdBQUszRyxHQUFMLENBQVMrRyxVQUFULEdBQXNCLEtBQUtBLFVBQTNCOztBQUVBLFdBQUsvRyxHQUFMLENBQVNnSCxVQUFULEdBQXNCLElBQXRCO0FBQ0EsV0FBS2hILEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixTQUFyQixFQUFnQzNILElBQWhDOztBQUVBLFdBQUswSCxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsVUFBckIsRUFBaUMzSCxJQUFqQztBQUNELEtBcEJnQixFQUFuQjs7O0FBdUJBO0FBQ0FzTyxZQUFVLENBQUNHLFVBQVgsR0FBd0I5SCxFQUFFLENBQUM4RyxRQUFILENBQVlnQixVQUFaLElBQTBCLEVBQWxEO0FBQ0E7QUFDQSxNQUFNOUYsT0FBTyxHQUFHaEMsRUFBRSxDQUFDOEcsUUFBSCxDQUFZOUUsT0FBNUI7QUFDQSxNQUFJQSxPQUFKLEVBQWE7QUFDWHhRLFVBQU0sQ0FBQ2dELElBQVAsQ0FBWXdOLE9BQVosRUFBcUJ2TixPQUFyQixDQUE2QixVQUFBZ0IsSUFBSSxFQUFJO0FBQ25Da1MsZ0JBQVUsQ0FBQ2xTLElBQUQsQ0FBVixHQUFtQnVNLE9BQU8sQ0FBQ3ZNLElBQUQsQ0FBMUI7QUFDRCxLQUZEO0FBR0Q7O0FBRURvTCxXQUFTLENBQUM4RyxVQUFELEVBQWEvVCxLQUFiLENBQVQ7O0FBRUEsU0FBTytULFVBQVA7QUFDRDs7QUFFRCxTQUFTSyxhQUFULENBQXdCaEksRUFBeEIsRUFBNEJpSSxNQUE1QixFQUFvQztBQUNsQyxNQUFNQyxTQUFTLEdBQUdsSSxFQUFFLENBQUNrSSxTQUFyQjtBQUNBO0FBQ0EsT0FBSyxJQUFJclUsQ0FBQyxHQUFHcVUsU0FBUyxDQUFDcFUsTUFBVixHQUFtQixDQUFoQyxFQUFtQ0QsQ0FBQyxJQUFJLENBQXhDLEVBQTJDQSxDQUFDLEVBQTVDLEVBQWdEO0FBQzlDLFFBQU1zVSxPQUFPLEdBQUdELFNBQVMsQ0FBQ3JVLENBQUQsQ0FBekI7QUFDQSxRQUFJc1UsT0FBTyxDQUFDVCxNQUFSLENBQWU5RixPQUFmLEtBQTJCcUcsTUFBL0IsRUFBdUM7QUFDckMsYUFBT0UsT0FBUDtBQUNEO0FBQ0Y7QUFDRDtBQUNBLE1BQUlDLFFBQUo7QUFDQSxPQUFLLElBQUl2VSxFQUFDLEdBQUdxVSxTQUFTLENBQUNwVSxNQUFWLEdBQW1CLENBQWhDLEVBQW1DRCxFQUFDLElBQUksQ0FBeEMsRUFBMkNBLEVBQUMsRUFBNUMsRUFBZ0Q7QUFDOUN1VSxZQUFRLEdBQUdKLGFBQWEsQ0FBQ0UsU0FBUyxDQUFDclUsRUFBRCxDQUFWLEVBQWVvVSxNQUFmLENBQXhCO0FBQ0EsUUFBSUcsUUFBSixFQUFjO0FBQ1osYUFBT0EsUUFBUDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFTdkYsWUFBVCxDQUF1QnJOLE9BQXZCLEVBQWdDO0FBQzlCLFNBQU82UyxRQUFRLENBQUM3UyxPQUFELENBQWY7QUFDRDs7QUFFRCxTQUFTNlIsUUFBVCxDQUFtQnJILEVBQW5CLEVBQXVCO0FBQ3JCLE1BQU1SLFVBQVUsR0FBR1EsRUFBRSxDQUFDMEgsTUFBdEI7QUFDQWxXLFFBQU0sQ0FBQzhXLGNBQVAsQ0FBc0J0SSxFQUF0QixFQUEwQixPQUExQixFQUFtQztBQUNqQ3VJLE9BRGlDLGlCQUMxQjtBQUNMLFVBQU1DLEtBQUssR0FBRyxFQUFkO0FBQ0EsVUFBTUMsVUFBVSxHQUFHakosVUFBVSxDQUFDa0osbUJBQVgsQ0FBK0IsVUFBL0IsQ0FBbkI7QUFDQUQsZ0JBQVUsQ0FBQ2hVLE9BQVgsQ0FBbUIsVUFBQWtVLFNBQVMsRUFBSTtBQUM5QixZQUFNQyxHQUFHLEdBQUdELFNBQVMsQ0FBQy9DLE9BQVYsQ0FBa0JnRCxHQUE5QjtBQUNBSixhQUFLLENBQUNJLEdBQUQsQ0FBTCxHQUFhRCxTQUFTLENBQUM1SCxHQUFWLElBQWlCNEgsU0FBOUI7QUFDRCxPQUhEO0FBSUEsVUFBTUUsYUFBYSxHQUFHckosVUFBVSxDQUFDa0osbUJBQVgsQ0FBK0IsaUJBQS9CLENBQXRCO0FBQ0FHLG1CQUFhLENBQUNwVSxPQUFkLENBQXNCLFVBQUFrVSxTQUFTLEVBQUk7QUFDakMsWUFBTUMsR0FBRyxHQUFHRCxTQUFTLENBQUMvQyxPQUFWLENBQWtCZ0QsR0FBOUI7QUFDQSxZQUFJLENBQUNKLEtBQUssQ0FBQ0ksR0FBRCxDQUFWLEVBQWlCO0FBQ2ZKLGVBQUssQ0FBQ0ksR0FBRCxDQUFMLEdBQWEsRUFBYjtBQUNEO0FBQ0RKLGFBQUssQ0FBQ0ksR0FBRCxDQUFMLENBQVc1VSxJQUFYLENBQWdCMlUsU0FBUyxDQUFDNUgsR0FBVixJQUFpQjRILFNBQWpDO0FBQ0QsT0FORDtBQU9BLGFBQU9ILEtBQVA7QUFDRCxLQWpCZ0MsRUFBbkM7O0FBbUJEOztBQUVELFNBQVNNLFVBQVQsQ0FBcUJuSixLQUFyQixFQUE0Qjs7OztBQUl0QkEsT0FBSyxDQUFDMEUsTUFBTixJQUFnQjFFLEtBQUssQ0FBQ3RJLEtBSkEsQ0FFeEI0USxNQUZ3QixTQUV4QkEsTUFGd0IsQ0FHeEIzSCxVQUh3QixTQUd4QkEsVUFId0IsRUFJTzs7QUFFakMsTUFBSThILFFBQUo7O0FBRUEsTUFBSUgsTUFBSixFQUFZO0FBQ1ZHLFlBQVEsR0FBR0osYUFBYSxDQUFDLEtBQUtqSCxHQUFOLEVBQVdrSCxNQUFYLENBQXhCO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDRyxRQUFMLEVBQWU7QUFDYkEsWUFBUSxHQUFHLEtBQUtySCxHQUFoQjtBQUNEOztBQUVEVCxZQUFVLENBQUN5SSxNQUFYLEdBQW9CWCxRQUFwQjtBQUNEOztBQUVELElBQU1uSSxLQUFLLEdBQUcsQ0FBQyxRQUFELEVBQVcsZUFBWCxDQUFkOztBQUVBLFNBQVMrSSxNQUFULEdBQW1CO0FBQ2pCLFNBQU8sQ0FBQyxLQUFLQyxPQUFiO0FBQ0Q7O0FBRUQsU0FBU0MsWUFBVCxDQUF1QjdFLE1BQXZCLEVBQStCO0FBQzdCLE9BQUs4RSxRQUFMLENBQWMsS0FBZCxFQUFxQjlFLE1BQXJCO0FBQ0Q7O0FBRUQsU0FBUytFLFFBQVQsQ0FBbUJwSixFQUFuQixFQUF1QjtBQUNyQjtBQUNBLE1BQU0ySCxVQUFVLEdBQUdQLFlBQVksQ0FBQ3BILEVBQUQsRUFBSztBQUNsQ0MsU0FBSyxFQUFMQSxLQURrQztBQUVsQ29ILFlBQVEsRUFBUkEsUUFGa0MsRUFBTCxDQUEvQjs7QUFJQU0sWUFBVSxDQUFDMEIsTUFBWCxHQUFvQixTQUFTQSxNQUFULENBQWlCaFEsSUFBakIsRUFBdUI7QUFDekMsUUFBSSxDQUFDLEtBQUswSCxHQUFWLEVBQWU7QUFDYixXQUFLNkcsUUFBTCxDQUFjdk8sSUFBZDtBQUNEO0FBQ0QsU0FBSzBILEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixRQUFyQixFQUErQjNILElBQS9CO0FBQ0QsR0FMRDtBQU1BLFNBQU9zTyxVQUFQO0FBQ0Q7O0FBRUQsU0FBUzJCLFNBQVQsQ0FBb0J0SixFQUFwQixFQUF3QjtBQUN0QnVKLEtBQUcsQ0FBQ0gsUUFBUSxDQUFDcEosRUFBRCxDQUFULENBQUg7QUFDQSxTQUFPQSxFQUFQO0FBQ0Q7O0FBRUQsU0FBU3dKLGtCQUFULENBQTZCQyxtQkFBN0I7OztBQUdRLGlGQUFKLEVBQUksQ0FGTlQsTUFFTSxTQUZOQSxNQUVNLENBRE5FLFlBQ00sU0FETkEsWUFDTTtBQUMyQmpJLGtCQUFnQixDQUFDL0MsWUFBRCxFQUFNdUwsbUJBQU4sQ0FEM0MsMkRBQ0R2SSxZQURDLHlCQUNhWixVQURiOztBQUdOLE1BQU05SyxPQUFPO0FBQ1hrVSxpQkFBYSxFQUFFLElBREo7QUFFWEMsa0JBQWMsRUFBRSxJQUZMO0FBR1BySixZQUFVLENBQUM5SyxPQUFYLElBQXNCLEVBSGYsQ0FBYjs7O0FBTUEsTUFBTW9VLGdCQUFnQixHQUFHO0FBQ3ZCcFUsV0FBTyxFQUFQQSxPQUR1QjtBQUV2QlQsUUFBSSxFQUFFK00sUUFBUSxDQUFDeEIsVUFBRCxFQUFhcEMsYUFBSXpNLFNBQWpCLENBRlM7QUFHdkJ5UixhQUFTLEVBQUVOLGFBQWEsQ0FBQ3RDLFVBQUQsRUFBYXVDLFlBQWIsQ0FIRDtBQUl2QlMsY0FBVSxFQUFFQyxjQUFjLENBQUNqRCxVQUFVLENBQUMrQyxLQUFaLEVBQW1CLEtBQW5CLEVBQTBCL0MsVUFBVSxDQUFDdUosTUFBckMsQ0FKSDtBQUt2QkMsYUFBUyxFQUFFO0FBQ1RDLGNBRFMsc0JBQ0c7QUFDVixZQUFNekcsVUFBVSxHQUFHLEtBQUtBLFVBQXhCOztBQUVBLFlBQU05TixPQUFPLEdBQUc7QUFDZDJLLGdCQUFNLEVBQUU2SSxNQUFNLENBQUM5VyxJQUFQLENBQVksSUFBWixJQUFvQixNQUFwQixHQUE2QixXQUR2QjtBQUVkc04sb0JBQVUsRUFBRSxJQUZFO0FBR2R3SyxtQkFBUyxFQUFFMUcsVUFIRyxFQUFoQjs7O0FBTUE3QixrQkFBVSxDQUFDNkIsVUFBVSxDQUFDTyxLQUFaLEVBQW1CLElBQW5CLENBQVY7O0FBRUE7QUFDQXFGLG9CQUFZLENBQUNoWCxJQUFiLENBQWtCLElBQWxCLEVBQXdCO0FBQ3RCK1YsZ0JBQU0sRUFBRSxLQUFLcEcsUUFEUztBQUV0QnZCLG9CQUFVLEVBQUU5SyxPQUZVLEVBQXhCOzs7QUFLQTtBQUNBLGFBQUt1TCxHQUFMLEdBQVcsSUFBSUcsWUFBSixDQUFpQjFMLE9BQWpCLENBQVg7O0FBRUE7QUFDQTRMLGlCQUFTLENBQUMsS0FBS0wsR0FBTixFQUFXdUMsVUFBVSxDQUFDakMsUUFBdEIsQ0FBVDs7QUFFQTtBQUNBLGFBQUtOLEdBQUwsQ0FBU2tKLE1BQVQ7QUFDRCxPQTFCUTtBQTJCVEMsV0EzQlMsbUJBMkJBO0FBQ1A7QUFDQTtBQUNBLFlBQUksS0FBS25KLEdBQVQsRUFBYztBQUNaLGVBQUtBLEdBQUwsQ0FBU2dILFVBQVQsR0FBc0IsSUFBdEI7QUFDQSxlQUFLaEgsR0FBTCxDQUFTQyxXQUFULENBQXFCLFNBQXJCO0FBQ0EsZUFBS0QsR0FBTCxDQUFTQyxXQUFULENBQXFCLFNBQXJCO0FBQ0Q7QUFDRixPQW5DUTtBQW9DVG1KLGNBcENTLHNCQW9DRztBQUNWLGFBQUtwSixHQUFMLElBQVksS0FBS0EsR0FBTCxDQUFTcUosUUFBVCxFQUFaO0FBQ0QsT0F0Q1EsRUFMWTs7QUE2Q3ZCQyxpQkFBYSxFQUFFO0FBQ2JDLFVBRGEsZ0JBQ1BqUixJQURPLEVBQ0Q7QUFDVixhQUFLMEgsR0FBTCxJQUFZLEtBQUtBLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixZQUFyQixFQUFtQzNILElBQW5DLENBQVo7QUFDRCxPQUhZO0FBSWJrUixVQUphLGtCQUlMO0FBQ04sYUFBS3hKLEdBQUwsSUFBWSxLQUFLQSxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsWUFBckIsQ0FBWjtBQUNELE9BTlk7QUFPYndKLFlBUGEsa0JBT0xDLElBUEssRUFPQztBQUNaLGFBQUsxSixHQUFMLElBQVksS0FBS0EsR0FBTCxDQUFTQyxXQUFULENBQXFCLGNBQXJCLEVBQXFDeUosSUFBckMsQ0FBWjtBQUNELE9BVFksRUE3Q1E7O0FBd0R2QnpJLFdBQU8sRUFBRTtBQUNQMEksU0FBRyxFQUFFNUIsVUFERTtBQUVQNkIsU0FBRyxFQUFFckUsV0FGRSxFQXhEYyxFQUF6Qjs7OztBQThEQSxNQUFJN1MsS0FBSyxDQUFDQyxPQUFOLENBQWM0TSxVQUFVLENBQUNzSyxjQUF6QixDQUFKLEVBQThDO0FBQzVDdEssY0FBVSxDQUFDc0ssY0FBWCxDQUEwQm5XLE9BQTFCLENBQWtDLFVBQUFvVyxVQUFVLEVBQUk7QUFDOUNqQixzQkFBZ0IsQ0FBQzVILE9BQWpCLENBQXlCNkksVUFBekIsSUFBdUMsVUFBVXhSLElBQVYsRUFBZ0I7QUFDckQsZUFBTyxLQUFLMEgsR0FBTCxDQUFTOEosVUFBVCxFQUFxQnhSLElBQXJCLENBQVA7QUFDRCxPQUZEO0FBR0QsS0FKRDtBQUtEOztBQUVELE1BQUkyUCxNQUFKLEVBQVk7QUFDVixXQUFPWSxnQkFBUDtBQUNEO0FBQ0QsU0FBTyxDQUFDQSxnQkFBRCxFQUFtQjFJLFlBQW5CLENBQVA7QUFDRDs7QUFFRCxJQUFNNEosWUFBWSxHQUFHMVMsSUFBSSxDQUFDMlMsT0FBTCxDQUFhLGVBQWIsQ0FBckI7O0FBRUEsU0FBU0MsY0FBVCxDQUF5QjFLLFVBQXpCLEVBQXFDO0FBQ25DLE1BQU1zSixnQkFBZ0IsR0FBR0osa0JBQWtCLENBQUNsSixVQUFELEVBQWE7QUFDdEQwSSxVQUFNLEVBQU5BLE1BRHNEO0FBRXRERSxnQkFBWSxFQUFaQSxZQUZzRCxFQUFiLENBQTNDOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQSxNQUFNK0IsV0FBVyxHQUFHckIsZ0JBQWdCLENBQUNFLFNBQWpCLENBQTJCQyxRQUEvQztBQUNBSCxrQkFBZ0IsQ0FBQ0UsU0FBakIsQ0FBMkJDLFFBQTNCLEdBQXNDLFNBQVNBLFFBQVQsR0FBcUI7QUFDekRrQixlQUFXLENBQUMvWSxJQUFaLENBQWlCLElBQWpCO0FBQ0EsUUFBSThXLE1BQU0sQ0FBQzlXLElBQVAsQ0FBWSxJQUFaLENBQUosRUFBdUIsQ0FBRTtBQUN2QjtBQUNBLFdBQUtnWixZQUFMLENBQWtCbkssR0FBbEIsR0FBd0IsS0FBS0EsR0FBN0I7QUFDQSxVQUFJNU8sTUFBTSxDQUFDLEtBQUsrWSxZQUFOLEVBQW9CLFFBQXBCLENBQVYsRUFBeUM7QUFDdkMsYUFBS25LLEdBQUwsQ0FBU2IsR0FBVCxDQUFhaUwsS0FBYixHQUFxQixLQUFLRCxZQUFMLENBQWtCRSxNQUF2QztBQUNBLGFBQUtySyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsUUFBckIsRUFBK0IsS0FBS2tLLFlBQUwsQ0FBa0JFLE1BQWpEO0FBQ0EsYUFBS3JLLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixRQUFyQjtBQUNBLGVBQU8sS0FBS2tLLFlBQUwsQ0FBa0JFLE1BQXpCO0FBQ0Q7QUFDRixLQVRELE1BU087QUFDTDtBQUNBLFVBQUksS0FBS3JLLEdBQVQsRUFBYztBQUNaLGFBQUtBLEdBQUwsQ0FBU2dILFVBQVQsR0FBc0IsSUFBdEI7QUFDQSxhQUFLaEgsR0FBTCxDQUFTQyxXQUFULENBQXFCLFNBQXJCO0FBQ0Q7QUFDRjtBQUNGLEdBbEJEOztBQW9CQSxNQUFJOEosWUFBSixFQUFrQjtBQUNoQixXQUFPbEIsZ0JBQWdCLENBQUNFLFNBQWpCLENBQTJCSSxLQUFsQztBQUNBTixvQkFBZ0IsQ0FBQzVILE9BQWpCLENBQXlCcUosT0FBekIsR0FBbUMsWUFBWTtBQUM3QyxVQUFJLEtBQUt0SyxHQUFULEVBQWM7QUFDWixhQUFLQSxHQUFMLENBQVNnSCxVQUFULEdBQXNCLElBQXRCO0FBQ0EsYUFBS2hILEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixTQUFyQjtBQUNBLGFBQUtELEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixTQUFyQjtBQUNEO0FBQ0YsS0FORDtBQU9EOztBQUVENEksa0JBQWdCLENBQUMwQixRQUFqQixHQUE0QjtBQUMxQixXQUFPMUIsZ0JBQWdCLENBQUM1SCxPQUFqQixDQUF5QixLQUF6QixDQURtQixFQUE1Qjs7QUFHQSxTQUFPNEgsZ0JBQWdCLENBQUM1SCxPQUFqQixDQUF5QixLQUF6QixDQUFQOztBQUVBLFNBQU80SCxnQkFBUDtBQUNEOztBQUVELElBQU0yQixPQUFPLEdBQUc7QUFDZCxRQURjO0FBRWQsUUFGYztBQUdkLFVBSGMsQ0FBaEI7OztBQU1BQSxPQUFPLENBQUN2WCxJQUFSLE9BQUF1WCxPQUFPLEVBQVN6TCxnQkFBVCxDQUFQOztBQUVBLFNBQVMwTCxhQUFULENBQXdCQyxjQUF4Qjs7O0FBR0csS0FGRHpDLE1BRUMsU0FGREEsTUFFQyxDQURERSxZQUNDLFNBRERBLFlBQ0M7QUFDRCxNQUFNd0MsV0FBVyxHQUFHVixjQUFjLENBQUNTLGNBQUQsQ0FBbEM7O0FBRUE1SyxXQUFTLENBQUM2SyxXQUFXLENBQUMxSixPQUFiLEVBQXNCdUosT0FBdEIsRUFBK0JFLGNBQS9CLENBQVQ7O0FBRUFDLGFBQVcsQ0FBQzFKLE9BQVosQ0FBb0IySixNQUFwQixHQUE2QixVQUFVdFMsSUFBVixFQUFnQjtBQUMzQyxTQUFLMEgsR0FBTCxDQUFTYixHQUFULENBQWFpTCxLQUFiLEdBQXFCOVIsSUFBckIsQ0FEMkMsQ0FDaEI7QUFDM0IsU0FBSzBILEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixRQUFyQixFQUErQjNILElBQS9CO0FBQ0QsR0FIRDs7QUFLQSxTQUFPcVMsV0FBUDtBQUNEOztBQUVELFNBQVN2QixRQUFULENBQW1CcEosR0FBbkIsRUFBd0I7QUFDdEJBLEtBQUcsQ0FBQ21ILFNBQUosQ0FBY3pULE9BQWQsQ0FBc0IsVUFBQTBULE9BQU8sRUFBSTtBQUMvQkEsV0FBTyxDQUFDVCxNQUFSLENBQWV5QyxRQUFmO0FBQ0QsR0FGRDtBQUdBcEosS0FBRyxDQUFDMkcsTUFBSixDQUFXeUMsUUFBWDtBQUNEOztBQUVELFNBQVN5QixZQUFULENBQXVCN0ssR0FBdkIsRUFBNEI7QUFDMUJBLEtBQUcsQ0FBQ3FKLFFBQUo7QUFDQXJKLEtBQUcsQ0FBQ21ILFNBQUosQ0FBY3pULE9BQWQsQ0FBc0IsVUFBQTBULE9BQU8sRUFBSTtBQUMvQmdDLFlBQVEsQ0FBQ2hDLE9BQUQsQ0FBUjtBQUNELEdBRkQ7QUFHRDs7QUFFRCxTQUFTMEQsU0FBVCxDQUFvQkosY0FBcEIsRUFBb0M7QUFDbEMsTUFBTUMsV0FBVyxHQUFHRixhQUFhLENBQUNDLGNBQUQsRUFBaUI7QUFDaER6QyxVQUFNLEVBQU5BLE1BRGdEO0FBRWhERSxnQkFBWSxFQUFaQSxZQUZnRCxFQUFqQixDQUFqQzs7O0FBS0E7QUFDQXdDLGFBQVcsQ0FBQzFKLE9BQVosQ0FBb0JxSCxNQUFwQixHQUE2QixTQUFTQSxNQUFULEdBQW1CO0FBQzlDLFFBQUksS0FBS3RJLEdBQUwsSUFBWSxLQUFLQSxHQUFMLENBQVNiLEdBQVQsQ0FBYWlMLEtBQTdCLEVBQW9DO0FBQ2xDLFdBQUtwSyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsUUFBckI7QUFDRDtBQUNGLEdBSkQ7O0FBTUEwSyxhQUFXLENBQUMxSixPQUFaLENBQW9CMkosTUFBcEIsR0FBNkIsU0FBU0EsTUFBVCxDQUFpQnRTLElBQWpCLEVBQXVCO0FBQ2xEO0FBQ0EsUUFBSSxLQUFLMEgsR0FBVCxFQUFjO0FBQ1osV0FBS0EsR0FBTCxDQUFTYixHQUFULENBQWFpTCxLQUFiLEdBQXFCOVIsSUFBckI7QUFDQSxXQUFLMEgsR0FBTCxDQUFTQyxXQUFULENBQXFCLFFBQXJCLEVBQStCM0gsSUFBL0I7QUFDQSxXQUFLMEgsR0FBTCxDQUFTQyxXQUFULENBQXFCLFFBQXJCO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsV0FBS2tLLFlBQUwsQ0FBa0JFLE1BQWxCLEdBQTJCL1IsSUFBM0I7QUFDRDtBQUNGLEdBVEQ7O0FBV0FxUyxhQUFXLENBQUMxSixPQUFaLENBQW9COEosUUFBcEIsR0FBK0IsU0FBU0EsUUFBVCxHQUFxQjtBQUNsRCxTQUFLL0ssR0FBTCxDQUFTQyxXQUFULENBQXFCLFVBQXJCO0FBQ0E0SyxnQkFBWSxDQUFDLEtBQUs3SyxHQUFOLENBQVo7QUFDRCxHQUhEOztBQUtBLFNBQU8ySyxXQUFQO0FBQ0Q7O0FBRUQsU0FBU0ssVUFBVCxDQUFxQk4sY0FBckIsRUFBcUM7QUFDbkM7QUFDRSxXQUFPck0sU0FBUyxDQUFDeU0sU0FBUyxDQUFDSixjQUFELENBQVYsQ0FBaEI7QUFDRDtBQUNGOztBQUVELFNBQVNPLGVBQVQsQ0FBMEIxTCxVQUExQixFQUFzQztBQUNwQztBQUNFLFdBQU9sQixTQUFTLENBQUM0TCxjQUFjLENBQUMxSyxVQUFELENBQWYsQ0FBaEI7QUFDRDtBQUNGOztBQUVEckcsS0FBSyxDQUFDeEYsT0FBTixDQUFjLFVBQUE0SSxPQUFPLEVBQUk7QUFDdkJyQyxXQUFTLENBQUNxQyxPQUFELENBQVQsR0FBcUIsS0FBckI7QUFDRCxDQUZEOztBQUlBbkQsUUFBUSxDQUFDekYsT0FBVCxDQUFpQixVQUFBd1gsVUFBVSxFQUFJO0FBQzdCLE1BQU1DLE9BQU8sR0FBR2xSLFNBQVMsQ0FBQ2lSLFVBQUQsQ0FBVCxJQUF5QmpSLFNBQVMsQ0FBQ2lSLFVBQUQsQ0FBVCxDQUFzQnhXLElBQS9DLEdBQXNEdUYsU0FBUyxDQUFDaVIsVUFBRCxDQUFULENBQXNCeFcsSUFBNUU7QUFDWndXLFlBREo7QUFFQSxNQUFJLENBQUM3VCxJQUFJLENBQUMyUyxPQUFMLENBQWFtQixPQUFiLENBQUwsRUFBNEI7QUFDMUJsUixhQUFTLENBQUNpUixVQUFELENBQVQsR0FBd0IsS0FBeEI7QUFDRDtBQUNGLENBTkQ7O0FBUUEsSUFBSUUsR0FBRyxHQUFHLEVBQVY7O0FBRUEsSUFBSSxPQUFPQyxLQUFQLEtBQWlCLFdBQWpCLElBQWdDLGVBQWUsVUFBbkQsRUFBK0Q7QUFDN0RELEtBQUcsR0FBRyxJQUFJQyxLQUFKLENBQVUsRUFBVixFQUFjO0FBQ2xCN0QsT0FEa0IsZUFDYm5FLE1BRGEsRUFDTDNPLElBREssRUFDQztBQUNqQixVQUFJMk8sTUFBTSxDQUFDM08sSUFBRCxDQUFWLEVBQWtCO0FBQ2hCLGVBQU8yTyxNQUFNLENBQUMzTyxJQUFELENBQWI7QUFDRDtBQUNELFVBQUl3RCxPQUFPLENBQUN4RCxJQUFELENBQVgsRUFBbUI7QUFDakIsZUFBT3dELE9BQU8sQ0FBQ3hELElBQUQsQ0FBZDtBQUNEO0FBQ0QsVUFBSVUsR0FBRyxDQUFDVixJQUFELENBQVAsRUFBZTtBQUNiLGVBQU84QixTQUFTLENBQUM5QixJQUFELEVBQU9VLEdBQUcsQ0FBQ1YsSUFBRCxDQUFWLENBQWhCO0FBQ0Q7QUFDRDtBQUNFLFlBQUlxSSxRQUFRLENBQUNySSxJQUFELENBQVosRUFBb0I7QUFDbEIsaUJBQU84QixTQUFTLENBQUM5QixJQUFELEVBQU9xSSxRQUFRLENBQUNySSxJQUFELENBQWYsQ0FBaEI7QUFDRDtBQUNELFlBQUl5SCxRQUFRLENBQUN6SCxJQUFELENBQVosRUFBb0I7QUFDbEIsaUJBQU84QixTQUFTLENBQUM5QixJQUFELEVBQU95SCxRQUFRLENBQUN6SCxJQUFELENBQWYsQ0FBaEI7QUFDRDtBQUNGO0FBQ0QsVUFBSWdKLFFBQVEsQ0FBQ2hKLElBQUQsQ0FBWixFQUFvQjtBQUNsQixlQUFPZ0osUUFBUSxDQUFDaEosSUFBRCxDQUFmO0FBQ0Q7QUFDRCxVQUFJLENBQUN0RCxNQUFNLENBQUNpRyxJQUFELEVBQU8zQyxJQUFQLENBQVAsSUFBdUIsQ0FBQ3RELE1BQU0sQ0FBQzZJLFNBQUQsRUFBWXZGLElBQVosQ0FBbEMsRUFBcUQ7QUFDbkQ7QUFDRDtBQUNELGFBQU84QixTQUFTLENBQUM5QixJQUFELEVBQU9vSCxPQUFPLENBQUNwSCxJQUFELEVBQU8yQyxJQUFJLENBQUMzQyxJQUFELENBQVgsQ0FBZCxDQUFoQjtBQUNELEtBMUJpQjtBQTJCbEI0VyxPQTNCa0IsZUEyQmJqSSxNQTNCYSxFQTJCTDNPLElBM0JLLEVBMkJDNEIsS0EzQkQsRUEyQlE7QUFDeEIrTSxZQUFNLENBQUMzTyxJQUFELENBQU4sR0FBZTRCLEtBQWY7QUFDQSxhQUFPLElBQVA7QUFDRCxLQTlCaUIsRUFBZCxDQUFOOztBQWdDRCxDQWpDRCxNQWlDTztBQUNMN0YsUUFBTSxDQUFDZ0QsSUFBUCxDQUFZeUUsT0FBWixFQUFxQnhFLE9BQXJCLENBQTZCLFVBQUFnQixJQUFJLEVBQUk7QUFDbkMwVyxPQUFHLENBQUMxVyxJQUFELENBQUgsR0FBWXdELE9BQU8sQ0FBQ3hELElBQUQsQ0FBbkI7QUFDRCxHQUZEOztBQUlBO0FBQ0VqRSxVQUFNLENBQUNnRCxJQUFQLENBQVkwSSxRQUFaLEVBQXNCekksT0FBdEIsQ0FBOEIsVUFBQWdCLElBQUksRUFBSTtBQUNwQzBXLFNBQUcsQ0FBQzFXLElBQUQsQ0FBSCxHQUFZOEIsU0FBUyxDQUFDOUIsSUFBRCxFQUFPeUgsUUFBUSxDQUFDekgsSUFBRCxDQUFmLENBQXJCO0FBQ0QsS0FGRDtBQUdBakUsVUFBTSxDQUFDZ0QsSUFBUCxDQUFZc0osUUFBWixFQUFzQnJKLE9BQXRCLENBQThCLFVBQUFnQixJQUFJLEVBQUk7QUFDcEMwVyxTQUFHLENBQUMxVyxJQUFELENBQUgsR0FBWThCLFNBQVMsQ0FBQzlCLElBQUQsRUFBT3lILFFBQVEsQ0FBQ3pILElBQUQsQ0FBZixDQUFyQjtBQUNELEtBRkQ7QUFHRDs7QUFFRGpFLFFBQU0sQ0FBQ2dELElBQVAsQ0FBWWlLLFFBQVosRUFBc0JoSyxPQUF0QixDQUE4QixVQUFBZ0IsSUFBSSxFQUFJO0FBQ3BDMFcsT0FBRyxDQUFDMVcsSUFBRCxDQUFILEdBQVlnSixRQUFRLENBQUNoSixJQUFELENBQXBCO0FBQ0QsR0FGRDs7QUFJQWpFLFFBQU0sQ0FBQ2dELElBQVAsQ0FBWTJCLEdBQVosRUFBaUIxQixPQUFqQixDQUF5QixVQUFBZ0IsSUFBSSxFQUFJO0FBQy9CMFcsT0FBRyxDQUFDMVcsSUFBRCxDQUFILEdBQVk4QixTQUFTLENBQUM5QixJQUFELEVBQU9VLEdBQUcsQ0FBQ1YsSUFBRCxDQUFWLENBQXJCO0FBQ0QsR0FGRDs7QUFJQWpFLFFBQU0sQ0FBQ2dELElBQVAsQ0FBWTRELElBQVosRUFBa0IzRCxPQUFsQixDQUEwQixVQUFBZ0IsSUFBSSxFQUFJO0FBQ2hDLFFBQUl0RCxNQUFNLENBQUNpRyxJQUFELEVBQU8zQyxJQUFQLENBQU4sSUFBc0J0RCxNQUFNLENBQUM2SSxTQUFELEVBQVl2RixJQUFaLENBQWhDLEVBQW1EO0FBQ2pEMFcsU0FBRyxDQUFDMVcsSUFBRCxDQUFILEdBQVk4QixTQUFTLENBQUM5QixJQUFELEVBQU9vSCxPQUFPLENBQUNwSCxJQUFELEVBQU8yQyxJQUFJLENBQUMzQyxJQUFELENBQVgsQ0FBZCxDQUFyQjtBQUNEO0FBQ0YsR0FKRDtBQUtEOztBQUVEMkMsSUFBSSxDQUFDa1IsU0FBTCxHQUFpQkEsU0FBakI7QUFDQWxSLElBQUksQ0FBQzJULFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EzVCxJQUFJLENBQUM0VCxlQUFMLEdBQXVCQSxlQUF2Qjs7QUFFQSxJQUFJTSxLQUFLLEdBQUdILEdBQVosQzs7QUFFZUcsSzs7Ozs7Ozs7Ozs7QUNwdERmO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwrQkFBK0I7QUFDckQsc0JBQXNCLGlCQUFpQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxpQ0FBaUMsRUFBRTtBQUNyRixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixjQUFjOztBQUUzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsVUFBVTs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsYUFBb0I7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBb0I7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLE9BQU87QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLEtBQXFDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEtBQXFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksS0FBcUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBcUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksS0FBcUM7QUFDekM7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVCQUF1QjtBQUN6RCxpQ0FBaUMsc0JBQXNCO0FBQ3ZEO0FBQ0Esa0JBQWtCO0FBQ2xCLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixhQUFvQjtBQUN0QztBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixPQUFPLFVBQVUsSUFBcUM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxHQUFHLFVBQVUsSUFBcUM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDLCtCQUErQjtBQUMvQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QixXQUFXO0FBQ1g7QUFDQSxHQUFHLFVBQVUsSUFBcUM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQXFDO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsT0FBTztBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFFUTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFNBQVM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDLHFDQUFxQyxFQUFFO0FBQ3BGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MseUNBQXlDLEVBQUU7QUFDL0U7O0FBRUE7O0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLElBQXFDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxL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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsT0FBTztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixLQUFxQztBQUN6RDtBQUNBLE1BQU0sU0FBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw4QkFBOEI7QUFDOUIsTUFBTSxJQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsS0FBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBLEtBQUssTUFBTSxFQUVOO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0Esa0RBQWtEO0FBQ2xELDBEOztBQUVBO0FBQ0EsUUFBUSxLQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZUFBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxLQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxLQUFxQztBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsWUFBWSxLQUFxQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LENBQUUsQ0FBQyxJQUFJZCxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQVVsckIsTUFBVixFQUFrQixDQUFFaW1CLFlBQVksQ0FBQ29HLElBQWIsR0FBb0Jyc0IsTUFBTSxDQUFDc2QsUUFBUCxHQUFrQixHQUFsQixHQUF3QnRkLE1BQU0sQ0FBQ3dkLFNBQW5ELENBQThELElBQUk3Z0IsT0FBTyxDQUFDMHBCLEdBQVosRUFBaUIsQ0FBRUosWUFBWSxDQUFDSSxHQUFiLEdBQW1CeEQsS0FBSyxDQUFDbUQsTUFBTixDQUFhQyxZQUFiLEVBQTJCdHBCLE9BQU8sQ0FBQzBwQixHQUFuQyxFQUF3QyxXQUF4QyxFQUFxRDFwQixPQUFPLENBQUN5cEIsSUFBN0QsQ0FBbkIsQ0FBdUYsQ0FBQzRCLEVBQUUsQ0FBQzVsQixPQUFILENBQVd5Z0IsS0FBSyxDQUFDZ0ksb0JBQU4sQ0FBMkJsdUIsT0FBM0IsRUFBb0MsRUFBRXNmLEdBQUcsRUFBRXlRLGlCQUFQLEVBQTBCeHdCLElBQUksRUFBRStwQixZQUFoQyxFQUFwQyxFQUFvRixXQUFwRixDQUFYLEVBQThHLENBQWpVLENBQW1VcEQsS0FBSyxDQUFDb0ksZUFBTixDQUFzQnR1QixPQUF0QixFQUErQnV1QixlQUEvQixFQUFpRCxDLHdCQUFFLENBQUVtQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJqQyxPQUFqQixDIiwiZmlsZSI6ImNvbW1vbi92ZW5kb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XHJcblxyXG5jb25zdCBfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcblxyXG5mdW5jdGlvbiBpc0ZuIChmbikge1xyXG4gIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbidcclxufVxyXG5cclxuZnVuY3Rpb24gaXNTdHIgKHN0cikge1xyXG4gIHJldHVybiB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0IChvYmopIHtcclxuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcclxufVxyXG5cclxuZnVuY3Rpb24gaGFzT3duIChvYmosIGtleSkge1xyXG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KVxyXG59XHJcblxyXG5mdW5jdGlvbiBub29wICgpIHt9XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgY2FjaGVkIHZlcnNpb24gb2YgYSBwdXJlIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gY2FjaGVkIChmbikge1xyXG4gIGNvbnN0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICByZXR1cm4gZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xyXG4gICAgY29uc3QgaGl0ID0gY2FjaGVbc3RyXTtcclxuICAgIHJldHVybiBoaXQgfHwgKGNhY2hlW3N0cl0gPSBmbihzdHIpKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENhbWVsaXplIGEgaHlwaGVuLWRlbGltaXRlZCBzdHJpbmcuXHJcbiAqL1xyXG5jb25zdCBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xyXG5jb25zdCBjYW1lbGl6ZSA9IGNhY2hlZCgoc3RyKSA9PiB7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIChfLCBjKSA9PiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJycpXHJcbn0pO1xyXG5cclxuY29uc3QgSE9PS1MgPSBbXHJcbiAgJ2ludm9rZScsXHJcbiAgJ3N1Y2Nlc3MnLFxyXG4gICdmYWlsJyxcclxuICAnY29tcGxldGUnLFxyXG4gICdyZXR1cm5WYWx1ZSdcclxuXTtcclxuXHJcbmNvbnN0IGdsb2JhbEludGVyY2VwdG9ycyA9IHt9O1xyXG5jb25zdCBzY29wZWRJbnRlcmNlcHRvcnMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIG1lcmdlSG9vayAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xyXG4gIGNvbnN0IHJlcyA9IGNoaWxkVmFsXHJcbiAgICA/IHBhcmVudFZhbFxyXG4gICAgICA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpXHJcbiAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZFZhbClcclxuICAgICAgICA/IGNoaWxkVmFsIDogW2NoaWxkVmFsXVxyXG4gICAgOiBwYXJlbnRWYWw7XHJcbiAgcmV0dXJuIHJlc1xyXG4gICAgPyBkZWR1cGVIb29rcyhyZXMpXHJcbiAgICA6IHJlc1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWR1cGVIb29rcyAoaG9va3MpIHtcclxuICBjb25zdCByZXMgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAocmVzLmluZGV4T2YoaG9va3NbaV0pID09PSAtMSkge1xyXG4gICAgICByZXMucHVzaChob29rc1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXNcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlSG9vayAoaG9va3MsIGhvb2spIHtcclxuICBjb25zdCBpbmRleCA9IGhvb2tzLmluZGV4T2YoaG9vayk7XHJcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgaG9va3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1lcmdlSW50ZXJjZXB0b3JIb29rIChpbnRlcmNlcHRvciwgb3B0aW9uKSB7XHJcbiAgT2JqZWN0LmtleXMob3B0aW9uKS5mb3JFYWNoKGhvb2sgPT4ge1xyXG4gICAgaWYgKEhPT0tTLmluZGV4T2YoaG9vaykgIT09IC0xICYmIGlzRm4ob3B0aW9uW2hvb2tdKSkge1xyXG4gICAgICBpbnRlcmNlcHRvcltob29rXSA9IG1lcmdlSG9vayhpbnRlcmNlcHRvcltob29rXSwgb3B0aW9uW2hvb2tdKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlSW50ZXJjZXB0b3JIb29rIChpbnRlcmNlcHRvciwgb3B0aW9uKSB7XHJcbiAgaWYgKCFpbnRlcmNlcHRvciB8fCAhb3B0aW9uKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgT2JqZWN0LmtleXMob3B0aW9uKS5mb3JFYWNoKGhvb2sgPT4ge1xyXG4gICAgaWYgKEhPT0tTLmluZGV4T2YoaG9vaykgIT09IC0xICYmIGlzRm4ob3B0aW9uW2hvb2tdKSkge1xyXG4gICAgICByZW1vdmVIb29rKGludGVyY2VwdG9yW2hvb2tdLCBvcHRpb25baG9va10pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRJbnRlcmNlcHRvciAobWV0aG9kLCBvcHRpb24pIHtcclxuICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycgJiYgaXNQbGFpbk9iamVjdChvcHRpb24pKSB7XHJcbiAgICBtZXJnZUludGVyY2VwdG9ySG9vayhzY29wZWRJbnRlcmNlcHRvcnNbbWV0aG9kXSB8fCAoc2NvcGVkSW50ZXJjZXB0b3JzW21ldGhvZF0gPSB7fSksIG9wdGlvbik7XHJcbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KG1ldGhvZCkpIHtcclxuICAgIG1lcmdlSW50ZXJjZXB0b3JIb29rKGdsb2JhbEludGVyY2VwdG9ycywgbWV0aG9kKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUludGVyY2VwdG9yIChtZXRob2QsIG9wdGlvbikge1xyXG4gIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykge1xyXG4gICAgaWYgKGlzUGxhaW5PYmplY3Qob3B0aW9uKSkge1xyXG4gICAgICByZW1vdmVJbnRlcmNlcHRvckhvb2soc2NvcGVkSW50ZXJjZXB0b3JzW21ldGhvZF0sIG9wdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWxldGUgc2NvcGVkSW50ZXJjZXB0b3JzW21ldGhvZF07XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KG1ldGhvZCkpIHtcclxuICAgIHJlbW92ZUludGVyY2VwdG9ySG9vayhnbG9iYWxJbnRlcmNlcHRvcnMsIG1ldGhvZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB3cmFwcGVySG9vayAoaG9vaykge1xyXG4gIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgcmV0dXJuIGhvb2soZGF0YSkgfHwgZGF0YVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNQcm9taXNlIChvYmopIHtcclxuICByZXR1cm4gISFvYmogJiYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBxdWV1ZSAoaG9va3MsIGRhdGEpIHtcclxuICBsZXQgcHJvbWlzZSA9IGZhbHNlO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGhvb2sgPSBob29rc1tpXTtcclxuICAgIGlmIChwcm9taXNlKSB7XHJcbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnRoZW4od3JhcHBlckhvb2soaG9vaykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcmVzID0gaG9vayhkYXRhKTtcclxuICAgICAgaWYgKGlzUHJvbWlzZShyZXMpKSB7XHJcbiAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShyZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRoZW4gKCkge31cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHByb21pc2UgfHwge1xyXG4gICAgdGhlbiAoY2FsbGJhY2spIHtcclxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB3cmFwcGVyT3B0aW9ucyAoaW50ZXJjZXB0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG4gIFsnc3VjY2VzcycsICdmYWlsJywgJ2NvbXBsZXRlJ10uZm9yRWFjaChuYW1lID0+IHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGludGVyY2VwdG9yW25hbWVdKSkge1xyXG4gICAgICBjb25zdCBvbGRDYWxsYmFjayA9IG9wdGlvbnNbbmFtZV07XHJcbiAgICAgIG9wdGlvbnNbbmFtZV0gPSBmdW5jdGlvbiBjYWxsYmFja0ludGVyY2VwdG9yIChyZXMpIHtcclxuICAgICAgICBxdWV1ZShpbnRlcmNlcHRvcltuYW1lXSwgcmVzKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xyXG4gICAgICAgICAgcmV0dXJuIGlzRm4ob2xkQ2FsbGJhY2spICYmIG9sZENhbGxiYWNrKHJlcykgfHwgcmVzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG9wdGlvbnNcclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcHBlclJldHVyblZhbHVlIChtZXRob2QsIHJldHVyblZhbHVlKSB7XHJcbiAgY29uc3QgcmV0dXJuVmFsdWVIb29rcyA9IFtdO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGdsb2JhbEludGVyY2VwdG9ycy5yZXR1cm5WYWx1ZSkpIHtcclxuICAgIHJldHVyblZhbHVlSG9va3MucHVzaCguLi5nbG9iYWxJbnRlcmNlcHRvcnMucmV0dXJuVmFsdWUpO1xyXG4gIH1cclxuICBjb25zdCBpbnRlcmNlcHRvciA9IHNjb3BlZEludGVyY2VwdG9yc1ttZXRob2RdO1xyXG4gIGlmIChpbnRlcmNlcHRvciAmJiBBcnJheS5pc0FycmF5KGludGVyY2VwdG9yLnJldHVyblZhbHVlKSkge1xyXG4gICAgcmV0dXJuVmFsdWVIb29rcy5wdXNoKC4uLmludGVyY2VwdG9yLnJldHVyblZhbHVlKTtcclxuICB9XHJcbiAgcmV0dXJuVmFsdWVIb29rcy5mb3JFYWNoKGhvb2sgPT4ge1xyXG4gICAgcmV0dXJuVmFsdWUgPSBob29rKHJldHVyblZhbHVlKSB8fCByZXR1cm5WYWx1ZTtcclxuICB9KTtcclxuICByZXR1cm4gcmV0dXJuVmFsdWVcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXBpSW50ZXJjZXB0b3JIb29rcyAobWV0aG9kKSB7XHJcbiAgY29uc3QgaW50ZXJjZXB0b3IgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gIE9iamVjdC5rZXlzKGdsb2JhbEludGVyY2VwdG9ycykuZm9yRWFjaChob29rID0+IHtcclxuICAgIGlmIChob29rICE9PSAncmV0dXJuVmFsdWUnKSB7XHJcbiAgICAgIGludGVyY2VwdG9yW2hvb2tdID0gZ2xvYmFsSW50ZXJjZXB0b3JzW2hvb2tdLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgY29uc3Qgc2NvcGVkSW50ZXJjZXB0b3IgPSBzY29wZWRJbnRlcmNlcHRvcnNbbWV0aG9kXTtcclxuICBpZiAoc2NvcGVkSW50ZXJjZXB0b3IpIHtcclxuICAgIE9iamVjdC5rZXlzKHNjb3BlZEludGVyY2VwdG9yKS5mb3JFYWNoKGhvb2sgPT4ge1xyXG4gICAgICBpZiAoaG9vayAhPT0gJ3JldHVyblZhbHVlJykge1xyXG4gICAgICAgIGludGVyY2VwdG9yW2hvb2tdID0gKGludGVyY2VwdG9yW2hvb2tdIHx8IFtdKS5jb25jYXQoc2NvcGVkSW50ZXJjZXB0b3JbaG9va10pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGludGVyY2VwdG9yXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludm9rZUFwaSAobWV0aG9kLCBhcGksIG9wdGlvbnMsIC4uLnBhcmFtcykge1xyXG4gIGNvbnN0IGludGVyY2VwdG9yID0gZ2V0QXBpSW50ZXJjZXB0b3JIb29rcyhtZXRob2QpO1xyXG4gIGlmIChpbnRlcmNlcHRvciAmJiBPYmplY3Qua2V5cyhpbnRlcmNlcHRvcikubGVuZ3RoKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbnRlcmNlcHRvci5pbnZva2UpKSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IHF1ZXVlKGludGVyY2VwdG9yLmludm9rZSwgb3B0aW9ucyk7XHJcbiAgICAgIHJldHVybiByZXMudGhlbigob3B0aW9ucykgPT4ge1xyXG4gICAgICAgIHJldHVybiBhcGkod3JhcHBlck9wdGlvbnMoaW50ZXJjZXB0b3IsIG9wdGlvbnMpLCAuLi5wYXJhbXMpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXBpKHdyYXBwZXJPcHRpb25zKGludGVyY2VwdG9yLCBvcHRpb25zKSwgLi4ucGFyYW1zKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gYXBpKG9wdGlvbnMsIC4uLnBhcmFtcylcclxufVxyXG5cclxuY29uc3QgcHJvbWlzZUludGVyY2VwdG9yID0ge1xyXG4gIHJldHVyblZhbHVlIChyZXMpIHtcclxuICAgIGlmICghaXNQcm9taXNlKHJlcykpIHtcclxuICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcy50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJldHVybiByZXNbMV1cclxuICAgIH0pLmNhdGNoKHJlcyA9PiB7XHJcbiAgICAgIHJldHVybiByZXNbMF1cclxuICAgIH0pXHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgU1lOQ19BUElfUkUgPVxyXG4gIC9eXFwkfHNlbmROYXRpdmVFdmVudHxyZXN0b3JlR2xvYmFsfGdldEN1cnJlbnRTdWJOVnVlfGdldE1lbnVCdXR0b25Cb3VuZGluZ0NsaWVudFJlY3R8XnJlcG9ydHxpbnRlcmNlcHRvcnN8SW50ZXJjZXB0b3IkfGdldFN1Yk5WdWVCeUlkfHJlcXVpcmVOYXRpdmVQbHVnaW58dXB4MnB4fGhpZGVLZXlib2FyZHxjYW5JVXNlfF5jcmVhdGV8U3luYyR8TWFuYWdlciR8YmFzZTY0VG9BcnJheUJ1ZmZlcnxhcnJheUJ1ZmZlclRvQmFzZTY0LztcclxuXHJcbmNvbnN0IENPTlRFWFRfQVBJX1JFID0gL15jcmVhdGV8TWFuYWdlciQvO1xyXG5cclxuY29uc3QgQVNZTkNfQVBJID0gWydjcmVhdGVCTEVDb25uZWN0aW9uJ107XHJcblxyXG5jb25zdCBDQUxMQkFDS19BUElfUkUgPSAvXm9ufF5vZmYvO1xyXG5cclxuZnVuY3Rpb24gaXNDb250ZXh0QXBpIChuYW1lKSB7XHJcbiAgcmV0dXJuIENPTlRFWFRfQVBJX1JFLnRlc3QobmFtZSlcclxufVxyXG5mdW5jdGlvbiBpc1N5bmNBcGkgKG5hbWUpIHtcclxuICByZXR1cm4gU1lOQ19BUElfUkUudGVzdChuYW1lKSAmJiBBU1lOQ19BUEkuaW5kZXhPZihuYW1lKSA9PT0gLTFcclxufVxyXG5cclxuZnVuY3Rpb24gaXNDYWxsYmFja0FwaSAobmFtZSkge1xyXG4gIHJldHVybiBDQUxMQkFDS19BUElfUkUudGVzdChuYW1lKSAmJiBuYW1lICE9PSAnb25QdXNoJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVQcm9taXNlIChwcm9taXNlKSB7XHJcbiAgcmV0dXJuIHByb21pc2UudGhlbihkYXRhID0+IHtcclxuICAgIHJldHVybiBbbnVsbCwgZGF0YV1cclxuICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiBbZXJyXSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvdWxkUHJvbWlzZSAobmFtZSkge1xyXG4gIGlmIChcclxuICAgIGlzQ29udGV4dEFwaShuYW1lKSB8fFxyXG4gICAgaXNTeW5jQXBpKG5hbWUpIHx8XHJcbiAgICBpc0NhbGxiYWNrQXBpKG5hbWUpXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgcmV0dXJuIHRydWVcclxufVxyXG5cclxuLyogZXNsaW50LWRpc2FibGUgbm8tZXh0ZW5kLW5hdGl2ZSAqL1xyXG5pZiAoIVByb21pc2UucHJvdG90eXBlLmZpbmFsbHkpIHtcclxuICBQcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuICAgIHJldHVybiB0aGlzLnRoZW4oXHJcbiAgICAgIHZhbHVlID0+IHByb21pc2UucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKCgpID0+IHZhbHVlKSxcclxuICAgICAgcmVhc29uID0+IHByb21pc2UucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aHJvdyByZWFzb25cclxuICAgICAgfSlcclxuICAgIClcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9taXNpZnkgKG5hbWUsIGFwaSkge1xyXG4gIGlmICghc2hvdWxkUHJvbWlzZShuYW1lKSkge1xyXG4gICAgcmV0dXJuIGFwaVxyXG4gIH1cclxuICByZXR1cm4gZnVuY3Rpb24gcHJvbWlzZUFwaSAob3B0aW9ucyA9IHt9LCAuLi5wYXJhbXMpIHtcclxuICAgIGlmIChpc0ZuKG9wdGlvbnMuc3VjY2VzcykgfHwgaXNGbihvcHRpb25zLmZhaWwpIHx8IGlzRm4ob3B0aW9ucy5jb21wbGV0ZSkpIHtcclxuICAgICAgcmV0dXJuIHdyYXBwZXJSZXR1cm5WYWx1ZShuYW1lLCBpbnZva2VBcGkobmFtZSwgYXBpLCBvcHRpb25zLCAuLi5wYXJhbXMpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdyYXBwZXJSZXR1cm5WYWx1ZShuYW1lLCBoYW5kbGVQcm9taXNlKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaW52b2tlQXBpKG5hbWUsIGFwaSwgT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xyXG4gICAgICAgIHN1Y2Nlc3M6IHJlc29sdmUsXHJcbiAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgIH0pLCAuLi5wYXJhbXMpO1xyXG4gICAgfSkpKVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgRVBTID0gMWUtNDtcclxuY29uc3QgQkFTRV9ERVZJQ0VfV0lEVEggPSA3NTA7XHJcbmxldCBpc0lPUyA9IGZhbHNlO1xyXG5sZXQgZGV2aWNlV2lkdGggPSAwO1xyXG5sZXQgZGV2aWNlRFBSID0gMDtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrRGV2aWNlV2lkdGggKCkge1xyXG4gIGNvbnN0IHtcclxuICAgIHBsYXRmb3JtLFxyXG4gICAgcGl4ZWxSYXRpbyxcclxuICAgIHdpbmRvd1dpZHRoXHJcbiAgfSA9IHN3YW4uZ2V0U3lzdGVtSW5mb1N5bmMoKTsgLy8gdW5pPT5zd2FuIHJ1bnRpbWUg57yW6K+R55uu5qCH5pivIHVuaSDlr7nosaHvvIzlhoXpg6jkuI3lhYHorrjnm7TmjqXkvb/nlKggdW5pXHJcblxyXG4gIGRldmljZVdpZHRoID0gd2luZG93V2lkdGg7XHJcbiAgZGV2aWNlRFBSID0gcGl4ZWxSYXRpbztcclxuICBpc0lPUyA9IHBsYXRmb3JtID09PSAnaW9zJztcclxufVxyXG5cclxuZnVuY3Rpb24gdXB4MnB4IChudW1iZXIsIG5ld0RldmljZVdpZHRoKSB7XHJcbiAgaWYgKGRldmljZVdpZHRoID09PSAwKSB7XHJcbiAgICBjaGVja0RldmljZVdpZHRoKCk7XHJcbiAgfVxyXG5cclxuICBudW1iZXIgPSBOdW1iZXIobnVtYmVyKTtcclxuICBpZiAobnVtYmVyID09PSAwKSB7XHJcbiAgICByZXR1cm4gMFxyXG4gIH1cclxuICBsZXQgcmVzdWx0ID0gKG51bWJlciAvIEJBU0VfREVWSUNFX1dJRFRIKSAqIChuZXdEZXZpY2VXaWR0aCB8fCBkZXZpY2VXaWR0aCk7XHJcbiAgaWYgKHJlc3VsdCA8IDApIHtcclxuICAgIHJlc3VsdCA9IC1yZXN1bHQ7XHJcbiAgfVxyXG4gIHJlc3VsdCA9IE1hdGguZmxvb3IocmVzdWx0ICsgRVBTKTtcclxuICBpZiAocmVzdWx0ID09PSAwKSB7XHJcbiAgICBpZiAoZGV2aWNlRFBSID09PSAxIHx8ICFpc0lPUykge1xyXG4gICAgICByZXR1cm4gMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDAuNVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVtYmVyIDwgMCA/IC1yZXN1bHQgOiByZXN1bHRcclxufVxyXG5cclxuY29uc3QgaW50ZXJjZXB0b3JzID0ge1xyXG4gIHByb21pc2VJbnRlcmNlcHRvclxyXG59O1xyXG5cclxuXHJcblxyXG52YXIgYmFzZUFwaSA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcclxuICBfX3Byb3RvX186IG51bGwsXHJcbiAgdXB4MnB4OiB1cHgycHgsXHJcbiAgaW50ZXJjZXB0b3JzOiBpbnRlcmNlcHRvcnMsXHJcbiAgYWRkSW50ZXJjZXB0b3I6IGFkZEludGVyY2VwdG9yLFxyXG4gIHJlbW92ZUludGVyY2VwdG9yOiByZW1vdmVJbnRlcmNlcHRvclxyXG59KTtcclxuXHJcbnZhciBwcmV2aWV3SW1hZ2UgPSB7XHJcbiAgYXJncyAoZnJvbUFyZ3MpIHtcclxuICAgIGxldCBjdXJyZW50SW5kZXggPSBwYXJzZUludChmcm9tQXJncy5jdXJyZW50KTtcclxuICAgIGlmIChpc05hTihjdXJyZW50SW5kZXgpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgdXJscyA9IGZyb21BcmdzLnVybHM7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodXJscykpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBsZW4gPSB1cmxzLmxlbmd0aDtcclxuICAgIGlmICghbGVuKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRJbmRleCA8IDApIHtcclxuICAgICAgY3VycmVudEluZGV4ID0gMDtcclxuICAgIH0gZWxzZSBpZiAoY3VycmVudEluZGV4ID49IGxlbikge1xyXG4gICAgICBjdXJyZW50SW5kZXggPSBsZW4gLSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRJbmRleCA+IDApIHtcclxuICAgICAgZnJvbUFyZ3MuY3VycmVudCA9IHVybHNbY3VycmVudEluZGV4XTtcclxuICAgICAgZnJvbUFyZ3MudXJscyA9IHVybHMuZmlsdGVyKFxyXG4gICAgICAgIChpdGVtLCBpbmRleCkgPT4gaW5kZXggPCBjdXJyZW50SW5kZXggPyBpdGVtICE9PSB1cmxzW2N1cnJlbnRJbmRleF0gOiB0cnVlXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmcm9tQXJncy5jdXJyZW50ID0gdXJsc1swXTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGluZGljYXRvcjogZmFsc2UsXHJcbiAgICAgIGxvb3A6IGZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8g5LiN5pSv5oyB55qEIEFQSSDliJfooahcclxuY29uc3QgdG9kb3MgPSBbXHJcbiAgLy8gJ2hpZGVLZXlib2FyZCcsXHJcbiAgLy8gJ29uR3lyb3Njb3BlQ2hhbmdlJyxcclxuICAvLyAnc3RhcnRHeXJvc2NvcGUnLFxyXG4gIC8vICdzdG9wR3lyb3Njb3BlJyxcclxuICAvLyAnb3BlbkJsdWV0b290aEFkYXB0ZXInLFxyXG4gIC8vICdzdGFydEJsdWV0b290aERldmljZXNEaXNjb3ZlcnknLFxyXG4gIC8vICdvbkJsdWV0b290aERldmljZUZvdW5kJyxcclxuICAvLyAnc3RvcEJsdWV0b290aERldmljZXNEaXNjb3ZlcnknLFxyXG4gIC8vICdvbkJsdWV0b290aEFkYXB0ZXJTdGF0ZUNoYW5nZScsXHJcbiAgLy8gJ2dldENvbm5lY3RlZEJsdWV0b290aERldmljZXMnLFxyXG4gIC8vICdnZXRCbHVldG9vdGhEZXZpY2VzJyxcclxuICAvLyAnZ2V0Qmx1ZXRvb3RoQWRhcHRlclN0YXRlJyxcclxuICAvLyAnY2xvc2VCbHVldG9vdGhBZGFwdGVyJyxcclxuICAvLyAnd3JpdGVCTEVDaGFyYWN0ZXJpc3RpY1ZhbHVlJyxcclxuICAvLyAncmVhZEJMRUNoYXJhY3RlcmlzdGljVmFsdWUnLFxyXG4gIC8vICdvbkJMRUNvbm5lY3Rpb25TdGF0ZUNoYW5nZScsXHJcbiAgLy8gJ29uQkxFQ2hhcmFjdGVyaXN0aWNWYWx1ZUNoYW5nZScsXHJcbiAgLy8gJ25vdGlmeUJMRUNoYXJhY3RlcmlzdGljVmFsdWVDaGFuZ2UnLFxyXG4gIC8vICdnZXRCTEVEZXZpY2VTZXJ2aWNlcycsXHJcbiAgLy8gJ2dldEJMRURldmljZUNoYXJhY3RlcmlzdGljcycsXHJcbiAgLy8gJ2NyZWF0ZUJMRUNvbm5lY3Rpb24nLFxyXG4gIC8vICdjbG9zZUJMRUNvbm5lY3Rpb24nLFxyXG4gIC8vICdvbkJlYWNvblNlcnZpY2VDaGFuZ2UnLFxyXG4gIC8vICdvbkJlYWNvblVwZGF0ZScsXHJcbiAgLy8gJ2dldEJlYWNvbnMnLFxyXG4gIC8vICdzdGFydEJlYWNvbkRpc2NvdmVyeScsXHJcbiAgLy8gJ3N0b3BCZWFjb25EaXNjb3ZlcnknLFxyXG4gIC8vICdoaWRlU2hhcmVNZW51JyxcclxuICAvLyAnb25XaW5kb3dSZXNpemUnLFxyXG4gIC8vICdvZmZXaW5kb3dSZXNpemUnLFxyXG4gIC8vICd2aWJyYXRlJ1xyXG5dO1xyXG5cclxuLy8g5a2Y5Zyo5YW85a655oCn55qEIEFQSSDliJfooahcclxuY29uc3QgY2FuSVVzZXMgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvZG9NZXRob2QgKGNvbnRleHROYW1lLCBtZXRob2ROYW1lKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHVuc3VwcG9ydGVkICgpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYOeZvuW6puWwj+eoi+W6jyAke2NvbnRleHROYW1lfeaaguS4jeaUr+aMgSR7bWV0aG9kTmFtZX1gKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9oYW5kbGVFbnZJbmZvIChyZXN1bHQpIHtcclxuICByZXN1bHQubWluaVByb2dyYW0gPSB7XHJcbiAgICBhcHBJZDogcmVzdWx0LmFwcEtleVxyXG4gIH07XHJcbiAgcmVzdWx0LnBsdWdpbiA9IHtcclxuICAgIHZlcnNpb246IHJlc3VsdC5zZGtWZXJzaW9uXHJcbiAgfTtcclxufVxyXG5cclxuLy8g6ZyA6KaB5YGa6L2s5o2i55qEIEFQSSDliJfooahcclxuY29uc3QgcHJvdG9jb2xzID0ge1xyXG4gIHJlcXVlc3Q6IHtcclxuICAgIGFyZ3MgKGZyb21BcmdzKSB7XHJcbiAgICAgIC8vIFRPRE9cclxuICAgICAgLy8gZGF0YSDkuI3mlK/mjIEgQXJyYXlCdWZmZXJcclxuICAgICAgLy8gbWV0aG9kIOS4jeaUr+aMgSBUUkFDRSwgQ09OTkVDVFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG1ldGhvZDogJ21ldGhvZCcsXHJcbiAgICAgICAgZGF0YVR5cGUgKHR5cGUpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkYXRhVHlwZScsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0eXBlID09PSAnanNvbicgPyB0eXBlIDogJ3N0cmluZydcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNvbm5lY3RTb2NrZXQ6IHtcclxuICAgIGFyZ3M6IHtcclxuICAgICAgbWV0aG9kOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcHJldmlld0ltYWdlLFxyXG4gIGdldFJlY29yZGVyTWFuYWdlcjoge1xyXG4gICAgcmV0dXJuVmFsdWUgKGZyb21SZXQpIHtcclxuICAgICAgZnJvbVJldC5vbkZyYW1lUmVjb3JkZWQgPSBjcmVhdGVUb2RvTWV0aG9kKCdSZWNvcmRlck1hbmFnZXInLCAnb25GcmFtZVJlY29yZGVkJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRCYWNrZ3JvdW5kQXVkaW9NYW5hZ2VyOiB7XHJcbiAgICByZXR1cm5WYWx1ZSAoZnJvbVJldCkge1xyXG4gICAgICBmcm9tUmV0Lm9uUHJldiA9IGNyZWF0ZVRvZG9NZXRob2QoJ0JhY2tncm91bmRBdWRpb01hbmFnZXInLCAnb25QcmV2Jyk7XHJcbiAgICAgIGZyb21SZXQub25OZXh0ID0gY3JlYXRlVG9kb01ldGhvZCgnQmFja2dyb3VuZEF1ZGlvTWFuYWdlcicsICdvbk5leHQnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNjYW5Db2RlOiB7XHJcbiAgICBhcmdzOiB7XHJcbiAgICAgIG9ubHlGcm9tQ2FtZXJhOiBmYWxzZSxcclxuICAgICAgc2NhblR5cGU6IGZhbHNlXHJcbiAgICB9XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvTWluaVByb2dyYW06IHtcclxuICAgIG5hbWU6ICduYXZpZ2F0ZVRvU21hcnRQcm9ncmFtJyxcclxuICAgIGFyZ3M6IHtcclxuICAgICAgYXBwSWQ6ICdhcHBLZXknLFxyXG4gICAgICBlbnZWZXJzaW9uOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVCYWNrTWluaVByb2dyYW06IHtcclxuICAgIG5hbWU6ICduYXZpZ2F0ZUJhY2tTbWFydFByb2dyYW0nXHJcbiAgfSxcclxuICBzaG93U2hhcmVNZW51OiB7XHJcbiAgICBuYW1lOiAnb3BlblNoYXJlJ1xyXG4gIH0sXHJcbiAgZ2V0QWNjb3VudEluZm9TeW5jOiB7XHJcbiAgICBuYW1lOiAnZ2V0RW52SW5mb1N5bmMnLFxyXG4gICAgcmV0dXJuVmFsdWU6IF9oYW5kbGVFbnZJbmZvXHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgQ0FMTEJBQ0tTID0gWydzdWNjZXNzJywgJ2ZhaWwnLCAnY2FuY2VsJywgJ2NvbXBsZXRlJ107XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzQ2FsbGJhY2sgKG1ldGhvZE5hbWUsIG1ldGhvZCwgcmV0dXJuVmFsdWUpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgcmV0dXJuIG1ldGhvZChwcm9jZXNzUmV0dXJuVmFsdWUobWV0aG9kTmFtZSwgcmVzLCByZXR1cm5WYWx1ZSkpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzQXJncyAobWV0aG9kTmFtZSwgZnJvbUFyZ3MsIGFyZ3NPcHRpb24gPSB7fSwgcmV0dXJuVmFsdWUgPSB7fSwga2VlcEZyb21BcmdzID0gZmFsc2UpIHtcclxuICBpZiAoaXNQbGFpbk9iamVjdChmcm9tQXJncykpIHsgLy8g5LiA6IisIGFwaSDnmoTlj4LmlbDop6PmnpBcclxuICAgIGNvbnN0IHRvQXJncyA9IGtlZXBGcm9tQXJncyA9PT0gdHJ1ZSA/IGZyb21BcmdzIDoge307IC8vIHJldHVyblZhbHVlIOS4uiBmYWxzZSDml7bvvIzor7TmmI7mmK/moLzlvI/ljJbov5Tlm57lgLzvvIznm7TmjqXlnKjov5Tlm57lgLzlr7nosaHkuIrkv67mlLnotYvlgLxcclxuICAgIGlmIChpc0ZuKGFyZ3NPcHRpb24pKSB7XHJcbiAgICAgIGFyZ3NPcHRpb24gPSBhcmdzT3B0aW9uKGZyb21BcmdzLCB0b0FyZ3MpIHx8IHt9O1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQga2V5IGluIGZyb21BcmdzKSB7XHJcbiAgICAgIGlmIChoYXNPd24oYXJnc09wdGlvbiwga2V5KSkge1xyXG4gICAgICAgIGxldCBrZXlPcHRpb24gPSBhcmdzT3B0aW9uW2tleV07XHJcbiAgICAgICAgaWYgKGlzRm4oa2V5T3B0aW9uKSkge1xyXG4gICAgICAgICAga2V5T3B0aW9uID0ga2V5T3B0aW9uKGZyb21BcmdzW2tleV0sIGZyb21BcmdzLCB0b0FyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWtleU9wdGlvbikgeyAvLyDkuI3mlK/mjIHnmoTlj4LmlbBcclxuICAgICAgICAgIGNvbnNvbGUud2Fybihg55m+5bqm5bCP56iL5bqPICR7bWV0aG9kTmFtZX3mmoLkuI3mlK/mjIEke2tleX1gKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyKGtleU9wdGlvbikpIHsgLy8g6YeN5YaZ5Y+C5pWwIGtleVxyXG4gICAgICAgICAgdG9BcmdzW2tleU9wdGlvbl0gPSBmcm9tQXJnc1trZXldO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChrZXlPcHRpb24pKSB7IC8vIHtuYW1lOm5ld05hbWUsdmFsdWU6dmFsdWV95Y+v6YeN5paw5oyH5a6a5Y+C5pWwIGtleTp2YWx1ZVxyXG4gICAgICAgICAgdG9BcmdzW2tleU9wdGlvbi5uYW1lID8ga2V5T3B0aW9uLm5hbWUgOiBrZXldID0ga2V5T3B0aW9uLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChDQUxMQkFDS1MuaW5kZXhPZihrZXkpICE9PSAtMSkge1xyXG4gICAgICAgIHRvQXJnc1trZXldID0gcHJvY2Vzc0NhbGxiYWNrKG1ldGhvZE5hbWUsIGZyb21BcmdzW2tleV0sIHJldHVyblZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWtlZXBGcm9tQXJncykge1xyXG4gICAgICAgICAgdG9BcmdzW2tleV0gPSBmcm9tQXJnc1trZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvQXJnc1xyXG4gIH0gZWxzZSBpZiAoaXNGbihmcm9tQXJncykpIHtcclxuICAgIGZyb21BcmdzID0gcHJvY2Vzc0NhbGxiYWNrKG1ldGhvZE5hbWUsIGZyb21BcmdzLCByZXR1cm5WYWx1ZSk7XHJcbiAgfVxyXG4gIHJldHVybiBmcm9tQXJnc1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzUmV0dXJuVmFsdWUgKG1ldGhvZE5hbWUsIHJlcywgcmV0dXJuVmFsdWUsIGtlZXBSZXR1cm5WYWx1ZSA9IGZhbHNlKSB7XHJcbiAgaWYgKGlzRm4ocHJvdG9jb2xzLnJldHVyblZhbHVlKSkgeyAvLyDlpITnkIbpgJrnlKggcmV0dXJuVmFsdWVcclxuICAgIHJlcyA9IHByb3RvY29scy5yZXR1cm5WYWx1ZShtZXRob2ROYW1lLCByZXMpO1xyXG4gIH1cclxuICByZXR1cm4gcHJvY2Vzc0FyZ3MobWV0aG9kTmFtZSwgcmVzLCByZXR1cm5WYWx1ZSwge30sIGtlZXBSZXR1cm5WYWx1ZSlcclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcHBlciAobWV0aG9kTmFtZSwgbWV0aG9kKSB7XHJcbiAgaWYgKGhhc093bihwcm90b2NvbHMsIG1ldGhvZE5hbWUpKSB7XHJcbiAgICBjb25zdCBwcm90b2NvbCA9IHByb3RvY29sc1ttZXRob2ROYW1lXTtcclxuICAgIGlmICghcHJvdG9jb2wpIHsgLy8g5pqC5LiN5pSv5oyB55qEIGFwaVxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYOeZvuW6puWwj+eoi+W6jyDmmoLkuI3mlK/mjIEke21ldGhvZE5hbWV9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnMSwgYXJnMikgeyAvLyDnm67liY0gYXBpIOacgOWkmuS4pOS4quWPguaVsFxyXG4gICAgICBsZXQgb3B0aW9ucyA9IHByb3RvY29sO1xyXG4gICAgICBpZiAoaXNGbihwcm90b2NvbCkpIHtcclxuICAgICAgICBvcHRpb25zID0gcHJvdG9jb2woYXJnMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFyZzEgPSBwcm9jZXNzQXJncyhtZXRob2ROYW1lLCBhcmcxLCBvcHRpb25zLmFyZ3MsIG9wdGlvbnMucmV0dXJuVmFsdWUpO1xyXG5cclxuICAgICAgY29uc3QgYXJncyA9IFthcmcxXTtcclxuICAgICAgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGFyZ3MucHVzaChhcmcyKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCByZXR1cm5WYWx1ZSA9IHN3YW5bb3B0aW9ucy5uYW1lIHx8IG1ldGhvZE5hbWVdLmFwcGx5KHN3YW4sIGFyZ3MpO1xyXG4gICAgICBpZiAoaXNTeW5jQXBpKG1ldGhvZE5hbWUpKSB7IC8vIOWQjOatpSBhcGlcclxuICAgICAgICByZXR1cm4gcHJvY2Vzc1JldHVyblZhbHVlKG1ldGhvZE5hbWUsIHJldHVyblZhbHVlLCBvcHRpb25zLnJldHVyblZhbHVlLCBpc0NvbnRleHRBcGkobWV0aG9kTmFtZSkpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJldHVyblZhbHVlXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBtZXRob2RcclxufVxyXG5cclxuY29uc3QgdG9kb0FwaXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuY29uc3QgVE9ET1MgPSBbXHJcbiAgJ29uVGFiQmFyTWlkQnV0dG9uVGFwJyxcclxuICAnc3Vic2NyaWJlUHVzaCcsXHJcbiAgJ3Vuc3Vic2NyaWJlUHVzaCcsXHJcbiAgJ29uUHVzaCcsXHJcbiAgJ29mZlB1c2gnLFxyXG4gICdzaGFyZSdcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvZG9BcGkgKG5hbWUpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gdG9kb0FwaSAoe1xyXG4gICAgZmFpbCxcclxuICAgIGNvbXBsZXRlXHJcbiAgfSkge1xyXG4gICAgY29uc3QgcmVzID0ge1xyXG4gICAgICBlcnJNc2c6IGAke25hbWV9OmZhaWw65pqC5LiN5pSv5oyBICR7bmFtZX0g5pa55rOVYFxyXG4gICAgfTtcclxuICAgIGlzRm4oZmFpbCkgJiYgZmFpbChyZXMpO1xyXG4gICAgaXNGbihjb21wbGV0ZSkgJiYgY29tcGxldGUocmVzKTtcclxuICB9XHJcbn1cclxuXHJcblRPRE9TLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcclxuICB0b2RvQXBpc1tuYW1lXSA9IGNyZWF0ZVRvZG9BcGkobmFtZSk7XHJcbn0pO1xyXG5cclxudmFyIHByb3ZpZGVycyA9IHtcclxuICBvYXV0aDogWydiYWlkdSddLFxyXG4gIHNoYXJlOiBbJ2JhaWR1J10sXHJcbiAgcGF5bWVudDogWydiYWlkdSddLFxyXG4gIHB1c2g6IFsnYmFpZHUnXVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0UHJvdmlkZXIgKHtcclxuICBzZXJ2aWNlLFxyXG4gIHN1Y2Nlc3MsXHJcbiAgZmFpbCxcclxuICBjb21wbGV0ZVxyXG59KSB7XHJcbiAgbGV0IHJlcyA9IGZhbHNlO1xyXG4gIGlmIChwcm92aWRlcnNbc2VydmljZV0pIHtcclxuICAgIHJlcyA9IHtcclxuICAgICAgZXJyTXNnOiAnZ2V0UHJvdmlkZXI6b2snLFxyXG4gICAgICBzZXJ2aWNlLFxyXG4gICAgICBwcm92aWRlcjogcHJvdmlkZXJzW3NlcnZpY2VdXHJcbiAgICB9O1xyXG4gICAgaXNGbihzdWNjZXNzKSAmJiBzdWNjZXNzKHJlcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlcyA9IHtcclxuICAgICAgZXJyTXNnOiAnZ2V0UHJvdmlkZXI6ZmFpbDrmnI3liqFbJyArIHNlcnZpY2UgKyAnXeS4jeWtmOWcqCdcclxuICAgIH07XHJcbiAgICBpc0ZuKGZhaWwpICYmIGZhaWwocmVzKTtcclxuICB9XHJcbiAgaXNGbihjb21wbGV0ZSkgJiYgY29tcGxldGUocmVzKTtcclxufVxyXG5cclxudmFyIGV4dHJhQXBpID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xyXG4gIF9fcHJvdG9fXzogbnVsbCxcclxuICBnZXRQcm92aWRlcjogZ2V0UHJvdmlkZXJcclxufSk7XHJcblxyXG5jb25zdCBnZXRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICBpZiAodHlwZW9mIGdldFVuaUVtaXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbiAgICByZXR1cm4gZ2V0VW5pRW1pdHRlclxyXG4gIH1cclxuICBsZXQgRW1pdHRlcjtcclxuICByZXR1cm4gZnVuY3Rpb24gZ2V0VW5pRW1pdHRlciAoKSB7XHJcbiAgICBpZiAoIUVtaXR0ZXIpIHtcclxuICAgICAgRW1pdHRlciA9IG5ldyBWdWUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBFbWl0dGVyXHJcbiAgfVxyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHkgKGN0eCwgbWV0aG9kLCBhcmdzKSB7XHJcbiAgcmV0dXJuIGN0eFttZXRob2RdLmFwcGx5KGN0eCwgYXJncylcclxufVxyXG5cclxuZnVuY3Rpb24gJG9uICgpIHtcclxuICByZXR1cm4gYXBwbHkoZ2V0RW1pdHRlcigpLCAnJG9uJywgWy4uLmFyZ3VtZW50c10pXHJcbn1cclxuZnVuY3Rpb24gJG9mZiAoKSB7XHJcbiAgcmV0dXJuIGFwcGx5KGdldEVtaXR0ZXIoKSwgJyRvZmYnLCBbLi4uYXJndW1lbnRzXSlcclxufVxyXG5mdW5jdGlvbiAkb25jZSAoKSB7XHJcbiAgcmV0dXJuIGFwcGx5KGdldEVtaXR0ZXIoKSwgJyRvbmNlJywgWy4uLmFyZ3VtZW50c10pXHJcbn1cclxuZnVuY3Rpb24gJGVtaXQgKCkge1xyXG4gIHJldHVybiBhcHBseShnZXRFbWl0dGVyKCksICckZW1pdCcsIFsuLi5hcmd1bWVudHNdKVxyXG59XHJcblxyXG52YXIgZXZlbnRBcGkgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XHJcbiAgX19wcm90b19fOiBudWxsLFxyXG4gICRvbjogJG9uLFxyXG4gICRvZmY6ICRvZmYsXHJcbiAgJG9uY2U6ICRvbmNlLFxyXG4gICRlbWl0OiAkZW1pdFxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHJlcXVlc3RQYXltZW50IChwYXJhbXMpIHtcclxuICBsZXQgcGFyc2VFcnJvciA9IGZhbHNlO1xyXG4gIGlmICh0eXBlb2YgcGFyYW1zLm9yZGVySW5mbyA9PT0gJ3N0cmluZycpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHBhcmFtcy5vcmRlckluZm8gPSBKU09OLnBhcnNlKHBhcmFtcy5vcmRlckluZm8pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBwYXJzZUVycm9yID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHBhcnNlRXJyb3IpIHtcclxuICAgIHBhcmFtcy5mYWlsICYmIHBhcmFtcy5mYWlsKHtcclxuICAgICAgZXJyTXNnOiAncmVxdWVzdFBheW1lbnQ6ZmFpbDog5Y+C5pWwIG9yZGVySW5mbyDmlbDmja7nu5PmnoTkuI3mraPnoa7vvIzlj4LogIPvvJpodHRwczovL3VuaWFwcC5kY2xvdWQuaW8vYXBpL3BsdWdpbnMvcGF5bWVudD9pZD1vcmRlcmluZm8nXHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgc3dhbi5yZXF1ZXN0UG9seW1lclBheW1lbnQocGFyYW1zKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBhcGkgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XHJcbiAgX19wcm90b19fOiBudWxsLFxyXG4gIHJlcXVlc3RQYXltZW50OiByZXF1ZXN0UGF5bWVudFxyXG59KTtcclxuXHJcbmNvbnN0IE1QUGFnZSA9IFBhZ2U7XHJcbmNvbnN0IE1QQ29tcG9uZW50ID0gQ29tcG9uZW50O1xyXG5cclxuY29uc3QgY3VzdG9taXplUkUgPSAvOi9nO1xyXG5cclxuY29uc3QgY3VzdG9taXplID0gY2FjaGVkKChzdHIpID0+IHtcclxuICByZXR1cm4gY2FtZWxpemUoc3RyLnJlcGxhY2UoY3VzdG9taXplUkUsICctJykpXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaW5pdFRyaWdnZXJFdmVudCAobXBJbnN0YW5jZSkge1xyXG4gIGNvbnN0IG9sZFRyaWdnZXJFdmVudCA9IG1wSW5zdGFuY2UudHJpZ2dlckV2ZW50O1xyXG4gIG1wSW5zdGFuY2UudHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50LCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gb2xkVHJpZ2dlckV2ZW50LmFwcGx5KG1wSW5zdGFuY2UsIFtjdXN0b21pemUoZXZlbnQpLCAuLi5hcmdzXSlcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0SG9vayAobmFtZSwgb3B0aW9ucykge1xyXG4gIGNvbnN0IG9sZEhvb2sgPSBvcHRpb25zW25hbWVdO1xyXG4gIGlmICghb2xkSG9vaykge1xyXG4gICAgb3B0aW9uc1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaW5pdFRyaWdnZXJFdmVudCh0aGlzKTtcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIG9wdGlvbnNbbmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICBpbml0VHJpZ2dlckV2ZW50KHRoaXMpO1xyXG4gICAgICByZXR1cm4gb2xkSG9vay5hcHBseSh0aGlzLCBhcmdzKVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcblBhZ2UgPSBmdW5jdGlvbiAob3B0aW9ucyA9IHt9KSB7XHJcbiAgaW5pdEhvb2soJ29uTG9hZCcsIG9wdGlvbnMpO1xyXG4gIHJldHVybiBNUFBhZ2Uob3B0aW9ucylcclxufTtcclxuXHJcbkNvbXBvbmVudCA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcclxuICBpbml0SG9vaygnY3JlYXRlZCcsIG9wdGlvbnMpO1xyXG4gIHJldHVybiBNUENvbXBvbmVudChvcHRpb25zKVxyXG59O1xyXG5cclxuY29uc3QgUEFHRV9FVkVOVF9IT09LUyA9IFtcclxuICAnb25QdWxsRG93blJlZnJlc2gnLFxyXG4gICdvblJlYWNoQm90dG9tJyxcclxuICAnb25TaGFyZUFwcE1lc3NhZ2UnLFxyXG4gICdvblBhZ2VTY3JvbGwnLFxyXG4gICdvblJlc2l6ZScsXHJcbiAgJ29uVGFiSXRlbVRhcCdcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGluaXRNb2NrcyAodm0sIG1vY2tzKSB7XHJcbiAgY29uc3QgbXBJbnN0YW5jZSA9IHZtLiRtcFt2bS5tcFR5cGVdO1xyXG4gIG1vY2tzLmZvckVhY2gobW9jayA9PiB7XHJcbiAgICBpZiAoaGFzT3duKG1wSW5zdGFuY2UsIG1vY2spKSB7XHJcbiAgICAgIHZtW21vY2tdID0gbXBJbnN0YW5jZVttb2NrXTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFzSG9vayAoaG9vaywgdnVlT3B0aW9ucykge1xyXG4gIGlmICghdnVlT3B0aW9ucykge1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGlmIChWdWUub3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KFZ1ZS5vcHRpb25zW2hvb2tdKSkge1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIHZ1ZU9wdGlvbnMgPSB2dWVPcHRpb25zLmRlZmF1bHQgfHwgdnVlT3B0aW9ucztcclxuXHJcbiAgaWYgKGlzRm4odnVlT3B0aW9ucykpIHtcclxuICAgIGlmIChpc0ZuKHZ1ZU9wdGlvbnMuZXh0ZW5kT3B0aW9uc1tob29rXSkpIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIGlmICh2dWVPcHRpb25zLnN1cGVyICYmXHJcbiAgICAgIHZ1ZU9wdGlvbnMuc3VwZXIub3B0aW9ucyAmJlxyXG4gICAgICBBcnJheS5pc0FycmF5KHZ1ZU9wdGlvbnMuc3VwZXIub3B0aW9uc1tob29rXSkpIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgaWYgKGlzRm4odnVlT3B0aW9uc1tob29rXSkpIHtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIGNvbnN0IG1peGlucyA9IHZ1ZU9wdGlvbnMubWl4aW5zO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KG1peGlucykpIHtcclxuICAgIHJldHVybiAhIW1peGlucy5maW5kKG1peGluID0+IGhhc0hvb2soaG9vaywgbWl4aW4pKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEhvb2tzIChtcE9wdGlvbnMsIGhvb2tzLCB2dWVPcHRpb25zKSB7XHJcbiAgaG9va3MuZm9yRWFjaChob29rID0+IHtcclxuICAgIGlmIChoYXNIb29rKGhvb2ssIHZ1ZU9wdGlvbnMpKSB7XHJcbiAgICAgIG1wT3B0aW9uc1tob29rXSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHZtICYmIHRoaXMuJHZtLl9fY2FsbF9ob29rKGhvb2ssIGFyZ3MpXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRWdWVDb21wb25lbnQgKFZ1ZSwgdnVlT3B0aW9ucykge1xyXG4gIHZ1ZU9wdGlvbnMgPSB2dWVPcHRpb25zLmRlZmF1bHQgfHwgdnVlT3B0aW9ucztcclxuICBsZXQgVnVlQ29tcG9uZW50O1xyXG4gIGlmIChpc0ZuKHZ1ZU9wdGlvbnMpKSB7XHJcbiAgICBWdWVDb21wb25lbnQgPSB2dWVPcHRpb25zO1xyXG4gICAgdnVlT3B0aW9ucyA9IFZ1ZUNvbXBvbmVudC5leHRlbmRPcHRpb25zO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBWdWVDb21wb25lbnQgPSBWdWUuZXh0ZW5kKHZ1ZU9wdGlvbnMpO1xyXG4gIH1cclxuICByZXR1cm4gW1Z1ZUNvbXBvbmVudCwgdnVlT3B0aW9uc11cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNsb3RzICh2bSwgdnVlU2xvdHMpIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2dWVTbG90cykgJiYgdnVlU2xvdHMubGVuZ3RoKSB7XHJcbiAgICBjb25zdCAkc2xvdHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgdnVlU2xvdHMuZm9yRWFjaChzbG90TmFtZSA9PiB7XHJcbiAgICAgICRzbG90c1tzbG90TmFtZV0gPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB2bS4kc2NvcGVkU2xvdHMgPSB2bS4kc2xvdHMgPSAkc2xvdHM7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0VnVlSWRzICh2dWVJZHMsIG1wSW5zdGFuY2UpIHtcclxuICB2dWVJZHMgPSAodnVlSWRzIHx8ICcnKS5zcGxpdCgnLCcpO1xyXG4gIGNvbnN0IGxlbiA9IHZ1ZUlkcy5sZW5ndGg7XHJcblxyXG4gIGlmIChsZW4gPT09IDEpIHtcclxuICAgIG1wSW5zdGFuY2UuXyR2dWVJZCA9IHZ1ZUlkc1swXTtcclxuICB9IGVsc2UgaWYgKGxlbiA9PT0gMikge1xyXG4gICAgbXBJbnN0YW5jZS5fJHZ1ZUlkID0gdnVlSWRzWzBdO1xyXG4gICAgbXBJbnN0YW5jZS5fJHZ1ZVBpZCA9IHZ1ZUlkc1sxXTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXREYXRhICh2dWVPcHRpb25zLCBjb250ZXh0KSB7XHJcbiAgbGV0IGRhdGEgPSB2dWVPcHRpb25zLmRhdGEgfHwge307XHJcbiAgY29uc3QgbWV0aG9kcyA9IHZ1ZU9wdGlvbnMubWV0aG9kcyB8fCB7fTtcclxuXHJcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYXRhID0gZGF0YS5jYWxsKGNvbnRleHQpOyAvLyDmlK/mjIEgVnVlLnByb3RvdHlwZSDkuIrmjILnmoTmlbDmja5cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKHByb2Nlc3MuZW52LlZVRV9BUFBfREVCVUcpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ+agueaNriBWdWUg55qEIGRhdGEg5Ye95pWw5Yid5aeL5YyW5bCP56iL5bqPIGRhdGEg5aSx6LSl77yM6K+35bC96YeP56Gu5L+dIGRhdGEg5Ye95pWw5Lit5LiN6K6/6ZeuIHZtIOWvueixoe+8jOWQpuWImeWPr+iDveW9seWTjemmluasoeaVsOaNrua4suafk+mAn+W6puOAgicsIGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIOWvuSBkYXRhIOagvOW8j+WMllxyXG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gIH1cclxuXHJcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XHJcbiAgICBkYXRhID0ge307XHJcbiAgfVxyXG5cclxuICBPYmplY3Qua2V5cyhtZXRob2RzKS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xyXG4gICAgaWYgKGNvbnRleHQuX19saWZlY3ljbGVfaG9va3NfXy5pbmRleE9mKG1ldGhvZE5hbWUpID09PSAtMSAmJiAhaGFzT3duKGRhdGEsIG1ldGhvZE5hbWUpKSB7XHJcbiAgICAgIGRhdGFbbWV0aG9kTmFtZV0gPSBtZXRob2RzW21ldGhvZE5hbWVdO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZGF0YVxyXG59XHJcblxyXG5jb25zdCBQUk9QX1RZUEVTID0gW1N0cmluZywgTnVtYmVyLCBCb29sZWFuLCBPYmplY3QsIEFycmF5LCBudWxsXTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmVyIChuYW1lKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIG9ic2VydmVyIChuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgaWYgKHRoaXMuJHZtKSB7XHJcbiAgICAgIHRoaXMuJHZtW25hbWVdID0gbmV3VmFsOyAvLyDkuLrkuobop6blj5Hlhbbku5bpnZ4gcmVuZGVyIHdhdGNoZXJcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRCZWhhdmlvcnMgKHZ1ZU9wdGlvbnMsIGluaXRCZWhhdmlvcikge1xyXG4gIGNvbnN0IHZ1ZUJlaGF2aW9ycyA9IHZ1ZU9wdGlvbnNbJ2JlaGF2aW9ycyddO1xyXG4gIGNvbnN0IHZ1ZUV4dGVuZHMgPSB2dWVPcHRpb25zWydleHRlbmRzJ107XHJcbiAgY29uc3QgdnVlTWl4aW5zID0gdnVlT3B0aW9uc1snbWl4aW5zJ107XHJcblxyXG4gIGxldCB2dWVQcm9wcyA9IHZ1ZU9wdGlvbnNbJ3Byb3BzJ107XHJcblxyXG4gIGlmICghdnVlUHJvcHMpIHtcclxuICAgIHZ1ZU9wdGlvbnNbJ3Byb3BzJ10gPSB2dWVQcm9wcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYmVoYXZpb3JzID0gW107XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodnVlQmVoYXZpb3JzKSkge1xyXG4gICAgdnVlQmVoYXZpb3JzLmZvckVhY2goYmVoYXZpb3IgPT4ge1xyXG4gICAgICBiZWhhdmlvcnMucHVzaChiZWhhdmlvci5yZXBsYWNlKCd1bmk6Ly8nLCBgJHtcInN3YW5cIn06Ly9gKSk7XHJcbiAgICAgIGlmIChiZWhhdmlvciA9PT0gJ3VuaTovL2Zvcm0tZmllbGQnKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodnVlUHJvcHMpKSB7XHJcbiAgICAgICAgICB2dWVQcm9wcy5wdXNoKCduYW1lJyk7XHJcbiAgICAgICAgICB2dWVQcm9wcy5wdXNoKCd2YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2dWVQcm9wc1snbmFtZSddID0ge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdnVlUHJvcHNbJ3ZhbHVlJ10gPSB7XHJcbiAgICAgICAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlciwgQm9vbGVhbiwgQXJyYXksIE9iamVjdCwgRGF0ZV0sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGlmIChpc1BsYWluT2JqZWN0KHZ1ZUV4dGVuZHMpICYmIHZ1ZUV4dGVuZHMucHJvcHMpIHtcclxuICAgIGJlaGF2aW9ycy5wdXNoKFxyXG4gICAgICBpbml0QmVoYXZpb3Ioe1xyXG4gICAgICAgIHByb3BlcnRpZXM6IGluaXRQcm9wZXJ0aWVzKHZ1ZUV4dGVuZHMucHJvcHMsIHRydWUpXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICBpZiAoQXJyYXkuaXNBcnJheSh2dWVNaXhpbnMpKSB7XHJcbiAgICB2dWVNaXhpbnMuZm9yRWFjaCh2dWVNaXhpbiA9PiB7XHJcbiAgICAgIGlmIChpc1BsYWluT2JqZWN0KHZ1ZU1peGluKSAmJiB2dWVNaXhpbi5wcm9wcykge1xyXG4gICAgICAgIGJlaGF2aW9ycy5wdXNoKFxyXG4gICAgICAgICAgaW5pdEJlaGF2aW9yKHtcclxuICAgICAgICAgICAgcHJvcGVydGllczogaW5pdFByb3BlcnRpZXModnVlTWl4aW4ucHJvcHMsIHRydWUpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gYmVoYXZpb3JzXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlUHJvcFR5cGUgKGtleSwgdHlwZSwgZGVmYXVsdFZhbHVlLCBmaWxlKSB7XHJcbiAgLy8gW1N0cmluZ109PlN0cmluZ1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGUpICYmIHR5cGUubGVuZ3RoID09PSAxKSB7XHJcbiAgICByZXR1cm4gdHlwZVswXVxyXG4gIH1cclxuICB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGRlZmF1bHRWYWx1ZSA9PT0gZmFsc2UgJiZcclxuICAgICAgQXJyYXkuaXNBcnJheSh0eXBlKSAmJlxyXG4gICAgICB0eXBlLmxlbmd0aCA9PT0gMiAmJlxyXG4gICAgICB0eXBlLmluZGV4T2YoU3RyaW5nKSAhPT0gLTEgJiZcclxuICAgICAgdHlwZS5pbmRleE9mKEJvb2xlYW4pICE9PSAtMVxyXG4gICAgKSB7IC8vIFtTdHJpbmcsQm9vbGVhbl09PkJvb2xlYW5cclxuICAgICAgaWYgKGZpbGUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICBgcHJvcHMuJHtrZXl9LnR5cGUgc2hvdWxkIHVzZSBCb29sZWFuIGluc3RlYWQgb2YgW1N0cmluZyxCb29sZWFuXSBhdCAke2ZpbGV9YFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIEJvb2xlYW5cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHR5cGVcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFByb3BlcnRpZXMgKHByb3BzLCBpc0JlaGF2aW9yID0gZmFsc2UsIGZpbGUgPSAnJykge1xyXG4gIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcclxuICBpZiAoIWlzQmVoYXZpb3IpIHtcclxuICAgIHByb3BlcnRpZXMudnVlSWQgPSB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsdWU6ICcnXHJcbiAgICB9O1xyXG4gICAgcHJvcGVydGllcy52dWVTbG90cyA9IHsgLy8g5bCP56iL5bqP5LiN6IO955u05o6l5a6a5LmJICRzbG90cyDnmoQgcHJvcHPvvIzmiYDku6XpgJrov4cgdnVlU2xvdHMg6L2s5o2i5YiwICRzbG90c1xyXG4gICAgICB0eXBlOiBudWxsLFxyXG4gICAgICB2YWx1ZTogW10sXHJcbiAgICAgIG9ic2VydmVyOiBmdW5jdGlvbiAobmV3VmFsLCBvbGRWYWwpIHtcclxuICAgICAgICBjb25zdCAkc2xvdHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICAgIG5ld1ZhbC5mb3JFYWNoKHNsb3ROYW1lID0+IHtcclxuICAgICAgICAgICRzbG90c1tzbG90TmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAkc2xvdHNcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMpKSB7IC8vIFsndGl0bGUnXVxyXG4gICAgcHJvcHMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBwcm9wZXJ0aWVzW2tleV0gPSB7XHJcbiAgICAgICAgdHlwZTogbnVsbCxcclxuICAgICAgICBvYnNlcnZlcjogY3JlYXRlT2JzZXJ2ZXIoa2V5KVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHByb3BzKSkgeyAvLyB7dGl0bGU6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6Jyd9LGNvbnRlbnQ6U3RyaW5nfVxyXG4gICAgT2JqZWN0LmtleXMocHJvcHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgY29uc3Qgb3B0cyA9IHByb3BzW2tleV07XHJcbiAgICAgIGlmIChpc1BsYWluT2JqZWN0KG9wdHMpKSB7IC8vIHRpdGxlOnt0eXBlOlN0cmluZyxkZWZhdWx0OicnfVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IG9wdHNbJ2RlZmF1bHQnXTtcclxuICAgICAgICBpZiAoaXNGbih2YWx1ZSkpIHtcclxuICAgICAgICAgIHZhbHVlID0gdmFsdWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdHMudHlwZSA9IHBhcnNlUHJvcFR5cGUoa2V5LCBvcHRzLnR5cGUsIHZhbHVlLCBmaWxlKTtcclxuXHJcbiAgICAgICAgcHJvcGVydGllc1trZXldID0ge1xyXG4gICAgICAgICAgdHlwZTogUFJPUF9UWVBFUy5pbmRleE9mKG9wdHMudHlwZSkgIT09IC0xID8gb3B0cy50eXBlIDogbnVsbCxcclxuICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgb2JzZXJ2ZXI6IGNyZWF0ZU9ic2VydmVyKGtleSlcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2UgeyAvLyBjb250ZW50OlN0cmluZ1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBwYXJzZVByb3BUeXBlKGtleSwgb3B0cywgbnVsbCwgZmlsZSk7XHJcbiAgICAgICAgcHJvcGVydGllc1trZXldID0ge1xyXG4gICAgICAgICAgdHlwZTogUFJPUF9UWVBFUy5pbmRleE9mKHR5cGUpICE9PSAtMSA/IHR5cGUgOiBudWxsLFxyXG4gICAgICAgICAgb2JzZXJ2ZXI6IGNyZWF0ZU9ic2VydmVyKGtleSlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIHByb3BlcnRpZXNcclxufVxyXG5cclxuZnVuY3Rpb24gd3JhcHBlciQxIChldmVudCkge1xyXG4gIC8vIFRPRE8g5Y+I5b6X5YW85a65IG1wdnVlIOeahCBtcCDlr7nosaFcclxuICB0cnkge1xyXG4gICAgZXZlbnQubXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGV2ZW50KSk7XHJcbiAgfSBjYXRjaCAoZSkge31cclxuXHJcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uID0gbm9vcDtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCA9IG5vb3A7XHJcblxyXG4gIGV2ZW50LnRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCB7fTtcclxuXHJcbiAgaWYgKCFoYXNPd24oZXZlbnQsICdkZXRhaWwnKSkge1xyXG4gICAgZXZlbnQuZGV0YWlsID0ge307XHJcbiAgfVxyXG5cclxuICB7IC8vIG1wLWJhaWR177yMY2hlY2tlZD0+dmFsdWVcclxuICAgIGlmIChcclxuICAgICAgaXNQbGFpbk9iamVjdChldmVudC5kZXRhaWwpICYmXHJcbiAgICAgIGhhc093bihldmVudC5kZXRhaWwsICdjaGVja2VkJykgJiZcclxuICAgICAgIWhhc093bihldmVudC5kZXRhaWwsICd2YWx1ZScpXHJcbiAgICApIHtcclxuICAgICAgZXZlbnQuZGV0YWlsLnZhbHVlID0gZXZlbnQuZGV0YWlsLmNoZWNrZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoaXNQbGFpbk9iamVjdChldmVudC5kZXRhaWwpKSB7XHJcbiAgICBldmVudC50YXJnZXQgPSBPYmplY3QuYXNzaWduKHt9LCBldmVudC50YXJnZXQsIGV2ZW50LmRldGFpbCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXZlbnRcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RXh0cmFWYWx1ZSAodm0sIGRhdGFQYXRoc0FycmF5KSB7XHJcbiAgbGV0IGNvbnRleHQgPSB2bTtcclxuICBkYXRhUGF0aHNBcnJheS5mb3JFYWNoKGRhdGFQYXRoQXJyYXkgPT4ge1xyXG4gICAgY29uc3QgZGF0YVBhdGggPSBkYXRhUGF0aEFycmF5WzBdO1xyXG4gICAgY29uc3QgdmFsdWUgPSBkYXRhUGF0aEFycmF5WzJdO1xyXG4gICAgaWYgKGRhdGFQYXRoIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gWycnLCcnLGluZGV4LCdkaXNhYmxlJ11cclxuICAgICAgY29uc3QgcHJvcFBhdGggPSBkYXRhUGF0aEFycmF5WzFdO1xyXG4gICAgICBjb25zdCB2YWx1ZVBhdGggPSBkYXRhUGF0aEFycmF5WzNdO1xyXG5cclxuICAgICAgY29uc3QgdkZvciA9IGRhdGFQYXRoID8gdm0uX19nZXRfdmFsdWUoZGF0YVBhdGgsIGNvbnRleHQpIDogY29udGV4dDtcclxuXHJcbiAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHZGb3IpKSB7XHJcbiAgICAgICAgY29udGV4dCA9IHZhbHVlO1xyXG4gICAgICB9IGVsc2UgaWYgKCFwcm9wUGF0aCkge1xyXG4gICAgICAgIGNvbnRleHQgPSB2Rm9yW3ZhbHVlXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2Rm9yKSkge1xyXG4gICAgICAgICAgY29udGV4dCA9IHZGb3IuZmluZCh2Rm9ySXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2bS5fX2dldF92YWx1ZShwcm9wUGF0aCwgdkZvckl0ZW0pID09PSB2YWx1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZGb3IpKSB7XHJcbiAgICAgICAgICBjb250ZXh0ID0gT2JqZWN0LmtleXModkZvcikuZmluZCh2Rm9yS2V5ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZtLl9fZ2V0X3ZhbHVlKHByb3BQYXRoLCB2Rm9yW3ZGb3JLZXldKSA9PT0gdmFsdWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCd2LWZvciDmmoLkuI3mlK/mjIHlvqrnjq/mlbDmja7vvJonLCB2Rm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh2YWx1ZVBhdGgpIHtcclxuICAgICAgICBjb250ZXh0ID0gdm0uX19nZXRfdmFsdWUodmFsdWVQYXRoLCBjb250ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBjb250ZXh0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NFdmVudEV4dHJhICh2bSwgZXh0cmEsIGV2ZW50KSB7XHJcbiAgY29uc3QgZXh0cmFPYmogPSB7fTtcclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXh0cmEpICYmIGV4dHJhLmxlbmd0aCkge1xyXG4gICAgLyoqXHJcbiAgICAgKltcclxuICAgICAqICAgIFsnZGF0YS5pdGVtcycsICdkYXRhLmlkJywgaXRlbS5kYXRhLmlkXSxcclxuICAgICAqICAgIFsnbWV0YXMnLCAnaWQnLCBtZXRhLmlkXVxyXG4gICAgICpdLFxyXG4gICAgICpbXHJcbiAgICAgKiAgICBbJ2RhdGEuaXRlbXMnLCAnZGF0YS5pZCcsIGl0ZW0uZGF0YS5pZF0sXHJcbiAgICAgKiAgICBbJ21ldGFzJywgJ2lkJywgbWV0YS5pZF1cclxuICAgICAqXSxcclxuICAgICAqJ3Rlc3QnXHJcbiAgICAgKi9cclxuICAgIGV4dHJhLmZvckVhY2goKGRhdGFQYXRoLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIGRhdGFQYXRoID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmICghZGF0YVBhdGgpIHsgLy8gbW9kZWwscHJvcC5zeW5jXHJcbiAgICAgICAgICBleHRyYU9ialsnJCcgKyBpbmRleF0gPSB2bTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKGRhdGFQYXRoID09PSAnJGV2ZW50JykgeyAvLyAkZXZlbnRcclxuICAgICAgICAgICAgZXh0cmFPYmpbJyQnICsgaW5kZXhdID0gZXZlbnQ7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFQYXRoLmluZGV4T2YoJyRldmVudC4nKSA9PT0gMCkgeyAvLyAkZXZlbnQudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgICAgIGV4dHJhT2JqWyckJyArIGluZGV4XSA9IHZtLl9fZ2V0X3ZhbHVlKGRhdGFQYXRoLnJlcGxhY2UoJyRldmVudC4nLCAnJyksIGV2ZW50KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV4dHJhT2JqWyckJyArIGluZGV4XSA9IHZtLl9fZ2V0X3ZhbHVlKGRhdGFQYXRoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXh0cmFPYmpbJyQnICsgaW5kZXhdID0gZ2V0RXh0cmFWYWx1ZSh2bSwgZGF0YVBhdGgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBleHRyYU9ialxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRPYmpCeUFycmF5IChhcnIpIHtcclxuICBjb25zdCBvYmogPSB7fTtcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGFycltpXTtcclxuICAgIG9ialtlbGVtZW50WzBdXSA9IGVsZW1lbnRbMV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmpcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc0V2ZW50QXJncyAodm0sIGV2ZW50LCBhcmdzID0gW10sIGV4dHJhID0gW10sIGlzQ3VzdG9tLCBtZXRob2ROYW1lKSB7XHJcbiAgbGV0IGlzQ3VzdG9tTVBFdmVudCA9IGZhbHNlOyAvLyB3eGNvbXBvbmVudCDnu4Tku7bvvIzkvKDpgJLljp/lp4sgZXZlbnQg5a+56LGhXHJcbiAgaWYgKGlzQ3VzdG9tKSB7IC8vIOiHquWumuS5ieS6i+S7tlxyXG4gICAgaXNDdXN0b21NUEV2ZW50ID0gZXZlbnQuY3VycmVudFRhcmdldCAmJlxyXG4gICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQgJiZcclxuICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbVR5cGUgPT09ICd3eCc7XHJcbiAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7IC8vIOaXoOWPguaVsO+8jOebtOaOpeS8oOWFpSBldmVudCDmiJYgZGV0YWlsIOaVsOe7hFxyXG4gICAgICBpZiAoaXNDdXN0b21NUEV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIFtldmVudF1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZXZlbnQuZGV0YWlsLl9fYXJnc19fIHx8IGV2ZW50LmRldGFpbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZXh0cmFPYmogPSBwcm9jZXNzRXZlbnRFeHRyYSh2bSwgZXh0cmEsIGV2ZW50KTtcclxuXHJcbiAgY29uc3QgcmV0ID0gW107XHJcbiAgYXJncy5mb3JFYWNoKGFyZyA9PiB7XHJcbiAgICBpZiAoYXJnID09PSAnJGV2ZW50Jykge1xyXG4gICAgICBpZiAobWV0aG9kTmFtZSA9PT0gJ19fc2V0X21vZGVsJyAmJiAhaXNDdXN0b20pIHsgLy8gaW5wdXQgdi1tb2RlbCB2YWx1ZVxyXG4gICAgICAgIHJldC5wdXNoKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGlzQ3VzdG9tICYmICFpc0N1c3RvbU1QRXZlbnQpIHtcclxuICAgICAgICAgIHJldC5wdXNoKGV2ZW50LmRldGFpbC5fX2FyZ3NfX1swXSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gd3hjb21wb25lbnQg57uE5Lu25oiW5YaF572u57uE5Lu2XHJcbiAgICAgICAgICByZXQucHVzaChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZ1swXSA9PT0gJ28nKSB7XHJcbiAgICAgICAgcmV0LnB1c2goZ2V0T2JqQnlBcnJheShhcmcpKTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyAmJiBoYXNPd24oZXh0cmFPYmosIGFyZykpIHtcclxuICAgICAgICByZXQucHVzaChleHRyYU9ialthcmddKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXQucHVzaChhcmcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiByZXRcclxufVxyXG5cclxuY29uc3QgT05DRSA9ICd+JztcclxuY29uc3QgQ1VTVE9NID0gJ14nO1xyXG5cclxuZnVuY3Rpb24gaXNNYXRjaEV2ZW50VHlwZSAoZXZlbnRUeXBlLCBvcHRUeXBlKSB7XHJcbiAgcmV0dXJuIChldmVudFR5cGUgPT09IG9wdFR5cGUpIHx8XHJcbiAgICAoXHJcbiAgICAgIG9wdFR5cGUgPT09ICdyZWdpb25jaGFuZ2UnICYmXHJcbiAgICAgIChcclxuICAgICAgICBldmVudFR5cGUgPT09ICdiZWdpbicgfHxcclxuICAgICAgICBldmVudFR5cGUgPT09ICdlbmQnXHJcbiAgICAgIClcclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRXZlbnQgKGV2ZW50KSB7XHJcbiAgZXZlbnQgPSB3cmFwcGVyJDEoZXZlbnQpO1xyXG5cclxuICAvLyBbWyd0YXAnLFtbJ2hhbmRsZScsWzEsMixhXV0sWydoYW5kbGUxJyxbMSwyLGFdXV1dXVxyXG4gIGNvbnN0IGRhdGFzZXQgPSAoZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQpLmRhdGFzZXQ7XHJcbiAgaWYgKCFkYXRhc2V0KSB7XHJcbiAgICByZXR1cm4gY29uc29sZS53YXJuKGDkuovku7bkv6Hmga/kuI3lrZjlnKhgKVxyXG4gIH1cclxuICBjb25zdCBldmVudE9wdHMgPSBkYXRhc2V0LmV2ZW50T3B0cyB8fCBkYXRhc2V0WydldmVudC1vcHRzJ107IC8vIOaUr+S7mOWunSB3ZWItdmlldyDnu4Tku7YgZGF0YXNldCDpnZ7pqbzls7BcclxuICBpZiAoIWV2ZW50T3B0cykge1xyXG4gICAgcmV0dXJuIGNvbnNvbGUud2Fybihg5LqL5Lu25L+h5oGv5LiN5a2Y5ZyoYClcclxuICB9XHJcblxyXG4gIC8vIFtbJ2hhbmRsZScsWzEsMixhXV0sWydoYW5kbGUxJyxbMSwyLGFdXV1cclxuICBjb25zdCBldmVudFR5cGUgPSBldmVudC50eXBlO1xyXG5cclxuICBjb25zdCByZXQgPSBbXTtcclxuXHJcbiAgZXZlbnRPcHRzLmZvckVhY2goZXZlbnRPcHQgPT4ge1xyXG4gICAgbGV0IHR5cGUgPSBldmVudE9wdFswXTtcclxuICAgIGNvbnN0IGV2ZW50c0FycmF5ID0gZXZlbnRPcHRbMV07XHJcblxyXG4gICAgY29uc3QgaXNDdXN0b20gPSB0eXBlLmNoYXJBdCgwKSA9PT0gQ1VTVE9NO1xyXG4gICAgdHlwZSA9IGlzQ3VzdG9tID8gdHlwZS5zbGljZSgxKSA6IHR5cGU7XHJcbiAgICBjb25zdCBpc09uY2UgPSB0eXBlLmNoYXJBdCgwKSA9PT0gT05DRTtcclxuICAgIHR5cGUgPSBpc09uY2UgPyB0eXBlLnNsaWNlKDEpIDogdHlwZTtcclxuXHJcbiAgICBpZiAoZXZlbnRzQXJyYXkgJiYgaXNNYXRjaEV2ZW50VHlwZShldmVudFR5cGUsIHR5cGUpKSB7XHJcbiAgICAgIGV2ZW50c0FycmF5LmZvckVhY2goZXZlbnRBcnJheSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IGV2ZW50QXJyYXlbMF07XHJcbiAgICAgICAgaWYgKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgIGxldCBoYW5kbGVyQ3R4ID0gdGhpcy4kdm07XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGhhbmRsZXJDdHguJG9wdGlvbnMuZ2VuZXJpYyAmJlxyXG4gICAgICAgICAgICBoYW5kbGVyQ3R4LiRwYXJlbnQgJiZcclxuICAgICAgICAgICAgaGFuZGxlckN0eC4kcGFyZW50LiRwYXJlbnRcclxuICAgICAgICAgICkgeyAvLyBtcC13ZWl4aW4sbXAtdG91dGlhbyDmir3osaHoioLngrnmqKHmi58gc2NvcGVkIHNsb3RzXHJcbiAgICAgICAgICAgIGhhbmRsZXJDdHggPSBoYW5kbGVyQ3R4LiRwYXJlbnQuJHBhcmVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChtZXRob2ROYW1lID09PSAnJGVtaXQnKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJDdHguJGVtaXQuYXBwbHkoaGFuZGxlckN0eCxcclxuICAgICAgICAgICAgICBwcm9jZXNzRXZlbnRBcmdzKFxyXG4gICAgICAgICAgICAgICAgdGhpcy4kdm0sXHJcbiAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgIGV2ZW50QXJyYXlbMV0sXHJcbiAgICAgICAgICAgICAgICBldmVudEFycmF5WzJdLFxyXG4gICAgICAgICAgICAgICAgaXNDdXN0b20sXHJcbiAgICAgICAgICAgICAgICBtZXRob2ROYW1lXHJcbiAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJDdHhbbWV0aG9kTmFtZV07XHJcbiAgICAgICAgICBpZiAoIWlzRm4oaGFuZGxlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAgX3ZtLiR7bWV0aG9kTmFtZX0gaXMgbm90IGEgZnVuY3Rpb25gKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGlzT25jZSkge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlci5vbmNlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaGFuZGxlci5vbmNlID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldC5wdXNoKGhhbmRsZXIuYXBwbHkoaGFuZGxlckN0eCwgcHJvY2Vzc0V2ZW50QXJncyhcclxuICAgICAgICAgICAgdGhpcy4kdm0sXHJcbiAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICBldmVudEFycmF5WzFdLFxyXG4gICAgICAgICAgICBldmVudEFycmF5WzJdLFxyXG4gICAgICAgICAgICBpc0N1c3RvbSxcclxuICAgICAgICAgICAgbWV0aG9kTmFtZVxyXG4gICAgICAgICAgKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGlmIChcclxuICAgIGV2ZW50VHlwZSA9PT0gJ2lucHV0JyAmJlxyXG4gICAgcmV0Lmxlbmd0aCA9PT0gMSAmJlxyXG4gICAgdHlwZW9mIHJldFswXSAhPT0gJ3VuZGVmaW5lZCdcclxuICApIHtcclxuICAgIHJldHVybiByZXRbMF1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGhvb2tzID0gW1xyXG4gICdvblNob3cnLFxyXG4gICdvbkhpZGUnLFxyXG4gICdvbkVycm9yJyxcclxuICAnb25QYWdlTm90Rm91bmQnXHJcbl07XHJcblxyXG5mdW5jdGlvbiBwYXJzZUJhc2VBcHAgKHZtLCB7XHJcbiAgbW9ja3MsXHJcbiAgaW5pdFJlZnNcclxufSkge1xyXG4gIGlmICh2bS4kb3B0aW9ucy5zdG9yZSkge1xyXG4gICAgVnVlLnByb3RvdHlwZS4kc3RvcmUgPSB2bS4kb3B0aW9ucy5zdG9yZTtcclxuICB9XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUubXBIb3N0ID0gXCJtcC1iYWlkdVwiO1xyXG5cclxuICBWdWUubWl4aW4oe1xyXG4gICAgYmVmb3JlQ3JlYXRlICgpIHtcclxuICAgICAgaWYgKCF0aGlzLiRvcHRpb25zLm1wVHlwZSkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm1wVHlwZSA9IHRoaXMuJG9wdGlvbnMubXBUeXBlO1xyXG5cclxuICAgICAgdGhpcy4kbXAgPSB7XHJcbiAgICAgICAgZGF0YToge30sXHJcbiAgICAgICAgW3RoaXMubXBUeXBlXTogdGhpcy4kb3B0aW9ucy5tcEluc3RhbmNlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLiRzY29wZSA9IHRoaXMuJG9wdGlvbnMubXBJbnN0YW5jZTtcclxuXHJcbiAgICAgIGRlbGV0ZSB0aGlzLiRvcHRpb25zLm1wVHlwZTtcclxuICAgICAgZGVsZXRlIHRoaXMuJG9wdGlvbnMubXBJbnN0YW5jZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLm1wVHlwZSAhPT0gJ2FwcCcpIHtcclxuICAgICAgICBpbml0UmVmcyh0aGlzKTtcclxuICAgICAgICBpbml0TW9ja3ModGhpcywgbW9ja3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGFwcE9wdGlvbnMgPSB7XHJcbiAgICBvbkxhdW5jaCAoYXJncykge1xyXG4gICAgICBpZiAodGhpcy4kdm0pIHsgLy8g5bey57uP5Yid5aeL5YyW6L+H5LqG77yM5Li76KaB5piv5Li65LqG55m+5bqm77yM55m+5bqmIG9uU2hvdyDlnKggb25MYXVuY2gg5LmL5YmNXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuJHZtID0gdm07XHJcblxyXG4gICAgICB0aGlzLiR2bS4kbXAgPSB7XHJcbiAgICAgICAgYXBwOiB0aGlzXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLiR2bS4kc2NvcGUgPSB0aGlzO1xyXG4gICAgICAvLyB2bSDkuIrkuZ/mjILovb0gZ2xvYmFsRGF0YVxyXG4gICAgICB0aGlzLiR2bS5nbG9iYWxEYXRhID0gdGhpcy5nbG9iYWxEYXRhO1xyXG5cclxuICAgICAgdGhpcy4kdm0uX2lzTW91bnRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdtb3VudGVkJywgYXJncyk7XHJcblxyXG4gICAgICB0aGlzLiR2bS5fX2NhbGxfaG9vaygnb25MYXVuY2gnLCBhcmdzKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyDlhbzlrrnml6fniYjmnKwgZ2xvYmFsRGF0YVxyXG4gIGFwcE9wdGlvbnMuZ2xvYmFsRGF0YSA9IHZtLiRvcHRpb25zLmdsb2JhbERhdGEgfHwge307XHJcbiAgLy8g5bCGIG1ldGhvZHMg5Lit55qE5pa55rOV5oyC5ZyoIGdldEFwcCgpIOS4rVxyXG4gIGNvbnN0IG1ldGhvZHMgPSB2bS4kb3B0aW9ucy5tZXRob2RzO1xyXG4gIGlmIChtZXRob2RzKSB7XHJcbiAgICBPYmplY3Qua2V5cyhtZXRob2RzKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBhcHBPcHRpb25zW25hbWVdID0gbWV0aG9kc1tuYW1lXTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEhvb2tzKGFwcE9wdGlvbnMsIGhvb2tzKTtcclxuXHJcbiAgcmV0dXJuIGFwcE9wdGlvbnNcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFZtQnlWdWVJZCAodm0sIHZ1ZVBpZCkge1xyXG4gIGNvbnN0ICRjaGlsZHJlbiA9IHZtLiRjaGlsZHJlbjtcclxuICAvLyDkvJjlhYjmn6Xmib7nm7TlsZ4o5Y+N5ZCR5p+l5om+Omh0dHBzOi8vZ2l0aHViLmNvbS9kY2xvdWRpby91bmktYXBwL2lzc3Vlcy8xMjAwKVxyXG4gIGZvciAobGV0IGkgPSAkY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGNvbnN0IGNoaWxkVm0gPSAkY2hpbGRyZW5baV07XHJcbiAgICBpZiAoY2hpbGRWbS4kc2NvcGUuXyR2dWVJZCA9PT0gdnVlUGlkKSB7XHJcbiAgICAgIHJldHVybiBjaGlsZFZtXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIOWPjeWQkemAkuW9kuafpeaJvlxyXG4gIGxldCBwYXJlbnRWbTtcclxuICBmb3IgKGxldCBpID0gJGNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBwYXJlbnRWbSA9IGZpbmRWbUJ5VnVlSWQoJGNoaWxkcmVuW2ldLCB2dWVQaWQpO1xyXG4gICAgaWYgKHBhcmVudFZtKSB7XHJcbiAgICAgIHJldHVybiBwYXJlbnRWbVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEJlaGF2aW9yIChvcHRpb25zKSB7XHJcbiAgcmV0dXJuIEJlaGF2aW9yKG9wdGlvbnMpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRSZWZzICh2bSkge1xyXG4gIGNvbnN0IG1wSW5zdGFuY2UgPSB2bS4kc2NvcGU7XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZtLCAnJHJlZnMnLCB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICBjb25zdCAkcmVmcyA9IHt9O1xyXG4gICAgICBjb25zdCBjb21wb25lbnRzID0gbXBJbnN0YW5jZS5zZWxlY3RBbGxDb21wb25lbnRzKCcudnVlLXJlZicpO1xyXG4gICAgICBjb21wb25lbnRzLmZvckVhY2goY29tcG9uZW50ID0+IHtcclxuICAgICAgICBjb25zdCByZWYgPSBjb21wb25lbnQuZGF0YXNldC5yZWY7XHJcbiAgICAgICAgJHJlZnNbcmVmXSA9IGNvbXBvbmVudC4kdm0gfHwgY29tcG9uZW50O1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgZm9yQ29tcG9uZW50cyA9IG1wSW5zdGFuY2Uuc2VsZWN0QWxsQ29tcG9uZW50cygnLnZ1ZS1yZWYtaW4tZm9yJyk7XHJcbiAgICAgIGZvckNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZiA9IGNvbXBvbmVudC5kYXRhc2V0LnJlZjtcclxuICAgICAgICBpZiAoISRyZWZzW3JlZl0pIHtcclxuICAgICAgICAgICRyZWZzW3JlZl0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHJlZnNbcmVmXS5wdXNoKGNvbXBvbmVudC4kdm0gfHwgY29tcG9uZW50KTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiAkcmVmc1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVMaW5rIChldmVudCkge1xyXG4gIGNvbnN0IHtcclxuICAgIHZ1ZVBpZCxcclxuICAgIHZ1ZU9wdGlvbnNcclxuICB9ID0gZXZlbnQuZGV0YWlsIHx8IGV2ZW50LnZhbHVlOyAvLyBkZXRhaWwg5piv5b6u5L+hLHZhbHVlIOaYr+eZvuW6pihkaXBhdGNoKVxyXG5cclxuICBsZXQgcGFyZW50Vm07XHJcblxyXG4gIGlmICh2dWVQaWQpIHtcclxuICAgIHBhcmVudFZtID0gZmluZFZtQnlWdWVJZCh0aGlzLiR2bSwgdnVlUGlkKTtcclxuICB9XHJcblxyXG4gIGlmICghcGFyZW50Vm0pIHtcclxuICAgIHBhcmVudFZtID0gdGhpcy4kdm07XHJcbiAgfVxyXG5cclxuICB2dWVPcHRpb25zLnBhcmVudCA9IHBhcmVudFZtO1xyXG59XHJcblxyXG5jb25zdCBtb2NrcyA9IFsnbm9kZUlkJywgJ2NvbXBvbmVudE5hbWUnXTtcclxuXHJcbmZ1bmN0aW9uIGlzUGFnZSAoKSB7XHJcbiAgcmV0dXJuICF0aGlzLm93bmVySWRcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFJlbGF0aW9uIChkZXRhaWwpIHtcclxuICB0aGlzLmRpc3BhdGNoKCdfX2wnLCBkZXRhaWwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUFwcCAodm0pIHtcclxuICAvLyDnmb7luqYgb25TaG93IOern+eEtuS8muWcqCBvbkxhdW5jaCDkuYvliY1cclxuICBjb25zdCBhcHBPcHRpb25zID0gcGFyc2VCYXNlQXBwKHZtLCB7XHJcbiAgICBtb2NrcyxcclxuICAgIGluaXRSZWZzXHJcbiAgfSk7XHJcbiAgYXBwT3B0aW9ucy5vblNob3cgPSBmdW5jdGlvbiBvblNob3cgKGFyZ3MpIHtcclxuICAgIGlmICghdGhpcy4kdm0pIHtcclxuICAgICAgdGhpcy5vbkxhdW5jaChhcmdzKTtcclxuICAgIH1cclxuICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblNob3cnLCBhcmdzKTtcclxuICB9O1xyXG4gIHJldHVybiBhcHBPcHRpb25zXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUFwcCAodm0pIHtcclxuICBBcHAocGFyc2VBcHAodm0pKTtcclxuICByZXR1cm4gdm1cclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VCYXNlQ29tcG9uZW50ICh2dWVDb21wb25lbnRPcHRpb25zLCB7XHJcbiAgaXNQYWdlLFxyXG4gIGluaXRSZWxhdGlvblxyXG59ID0ge30pIHtcclxuICBsZXQgW1Z1ZUNvbXBvbmVudCwgdnVlT3B0aW9uc10gPSBpbml0VnVlQ29tcG9uZW50KFZ1ZSwgdnVlQ29tcG9uZW50T3B0aW9ucyk7XHJcblxyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBtdWx0aXBsZVNsb3RzOiB0cnVlLFxyXG4gICAgYWRkR2xvYmFsQ2xhc3M6IHRydWUsXHJcbiAgICAuLi4odnVlT3B0aW9ucy5vcHRpb25zIHx8IHt9KVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNvbXBvbmVudE9wdGlvbnMgPSB7XHJcbiAgICBvcHRpb25zLFxyXG4gICAgZGF0YTogaW5pdERhdGEodnVlT3B0aW9ucywgVnVlLnByb3RvdHlwZSksXHJcbiAgICBiZWhhdmlvcnM6IGluaXRCZWhhdmlvcnModnVlT3B0aW9ucywgaW5pdEJlaGF2aW9yKSxcclxuICAgIHByb3BlcnRpZXM6IGluaXRQcm9wZXJ0aWVzKHZ1ZU9wdGlvbnMucHJvcHMsIGZhbHNlLCB2dWVPcHRpb25zLl9fZmlsZSksXHJcbiAgICBsaWZldGltZXM6IHtcclxuICAgICAgYXR0YWNoZWQgKCkge1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXM7XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBtcFR5cGU6IGlzUGFnZS5jYWxsKHRoaXMpID8gJ3BhZ2UnIDogJ2NvbXBvbmVudCcsXHJcbiAgICAgICAgICBtcEluc3RhbmNlOiB0aGlzLFxyXG4gICAgICAgICAgcHJvcHNEYXRhOiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaW5pdFZ1ZUlkcyhwcm9wZXJ0aWVzLnZ1ZUlkLCB0aGlzKTtcclxuXHJcbiAgICAgICAgLy8g5aSE55CG54i25a2Q5YWz57O7XHJcbiAgICAgICAgaW5pdFJlbGF0aW9uLmNhbGwodGhpcywge1xyXG4gICAgICAgICAgdnVlUGlkOiB0aGlzLl8kdnVlUGlkLFxyXG4gICAgICAgICAgdnVlT3B0aW9uczogb3B0aW9uc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJYgdnVlIOWunuS+i1xyXG4gICAgICAgIHRoaXMuJHZtID0gbmV3IFZ1ZUNvbXBvbmVudChvcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8g5aSE55CGJHNsb3RzLCRzY29wZWRTbG90c++8iOaaguS4jeaUr+aMgeWKqOaAgeWPmOWMliRzbG90c++8iVxyXG4gICAgICAgIGluaXRTbG90cyh0aGlzLiR2bSwgcHJvcGVydGllcy52dWVTbG90cyk7XHJcblxyXG4gICAgICAgIC8vIOinpuWPkemmluasoSBzZXREYXRhXHJcbiAgICAgICAgdGhpcy4kdm0uJG1vdW50KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlYWR5ICgpIHtcclxuICAgICAgICAvLyDlvZPnu4Tku7YgcHJvcHMg6buY6K6k5YC85Li6IHRydWXvvIzliJ3lp4vljJbml7bkvKDlhaUgZmFsc2Ug5Lya5a+86Ie0IGNyZWF0ZWQscmVhZHkg6Kem5Y+RLCDkvYYgYXR0YWNoZWQg5LiN6Kem5Y+RXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLndlaXhpbi5xcS5jb20vY29tbXVuaXR5L2RldmVsb3AvZG9jLzAwMDY2YWUyODQ0Y2MwZjhlYjg4M2UyYTU1NzgwMFxyXG4gICAgICAgIGlmICh0aGlzLiR2bSkge1xyXG4gICAgICAgICAgdGhpcy4kdm0uX2lzTW91bnRlZCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLiR2bS5fX2NhbGxfaG9vaygnbW91bnRlZCcpO1xyXG4gICAgICAgICAgdGhpcy4kdm0uX19jYWxsX2hvb2soJ29uUmVhZHknKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGRldGFjaGVkICgpIHtcclxuICAgICAgICB0aGlzLiR2bSAmJiB0aGlzLiR2bS4kZGVzdHJveSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFnZUxpZmV0aW1lczoge1xyXG4gICAgICBzaG93IChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy4kdm0gJiYgdGhpcy4kdm0uX19jYWxsX2hvb2soJ29uUGFnZVNob3cnLCBhcmdzKTtcclxuICAgICAgfSxcclxuICAgICAgaGlkZSAoKSB7XHJcbiAgICAgICAgdGhpcy4kdm0gJiYgdGhpcy4kdm0uX19jYWxsX2hvb2soJ29uUGFnZUhpZGUnKTtcclxuICAgICAgfSxcclxuICAgICAgcmVzaXplIChzaXplKSB7XHJcbiAgICAgICAgdGhpcy4kdm0gJiYgdGhpcy4kdm0uX19jYWxsX2hvb2soJ29uUGFnZVJlc2l6ZScsIHNpemUpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBfX2w6IGhhbmRsZUxpbmssXHJcbiAgICAgIF9fZTogaGFuZGxlRXZlbnRcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBpZiAoQXJyYXkuaXNBcnJheSh2dWVPcHRpb25zLnd4c0NhbGxNZXRob2RzKSkge1xyXG4gICAgdnVlT3B0aW9ucy53eHNDYWxsTWV0aG9kcy5mb3JFYWNoKGNhbGxNZXRob2QgPT4ge1xyXG4gICAgICBjb21wb25lbnRPcHRpb25zLm1ldGhvZHNbY2FsbE1ldGhvZF0gPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiR2bVtjYWxsTWV0aG9kXShhcmdzKVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAoaXNQYWdlKSB7XHJcbiAgICByZXR1cm4gY29tcG9uZW50T3B0aW9uc1xyXG4gIH1cclxuICByZXR1cm4gW2NvbXBvbmVudE9wdGlvbnMsIFZ1ZUNvbXBvbmVudF1cclxufVxyXG5cclxuY29uc3QgbmV3TGlmZWN5Y2xlID0gc3dhbi5jYW5JVXNlKCdsaWZlY3ljbGUtMi0wJyk7XHJcblxyXG5mdW5jdGlvbiBwYXJzZUNvbXBvbmVudCAodnVlT3B0aW9ucykge1xyXG4gIGNvbnN0IGNvbXBvbmVudE9wdGlvbnMgPSBwYXJzZUJhc2VDb21wb25lbnQodnVlT3B0aW9ucywge1xyXG4gICAgaXNQYWdlLFxyXG4gICAgaW5pdFJlbGF0aW9uXHJcbiAgfSk7XHJcblxyXG4gIC8vIOWFs+S6jueZvuW6puWwj+eoi+W6j+eUn+WRveWRqOacn+eahOivtOaYjijnu4Tku7bkvZzkuLrpobXpnaLml7YpOlxyXG4gIC8vIGxpZmV0aW1lczphdHRhY2hlZCAtLT4gbWV0aG9kczpvblNob3cgLS0+IG1ldGhvZHM6b25Mb2FkIC0tPiBtZXRob2RzOm9uUmVhZHlcclxuICAvLyDov5nph4zlnKjlvLrliLblsIZvblNob3fmjKrliLBvbkxvYWTkuYvlkI7op6blj5Es5Y+m5aSW5LiA5aSE5L+u5pS55ZyocGFnZS1wYXJzZXIuanNcclxuICBjb25zdCBvbGRBdHRhY2hlZCA9IGNvbXBvbmVudE9wdGlvbnMubGlmZXRpbWVzLmF0dGFjaGVkO1xyXG4gIGNvbXBvbmVudE9wdGlvbnMubGlmZXRpbWVzLmF0dGFjaGVkID0gZnVuY3Rpb24gYXR0YWNoZWQgKCkge1xyXG4gICAgb2xkQXR0YWNoZWQuY2FsbCh0aGlzKTtcclxuICAgIGlmIChpc1BhZ2UuY2FsbCh0aGlzKSkgeyAvLyDnmb7luqYgb25Mb2FkIOWcqCBhdHRhY2hlZCDkuYvliY3op6blj5FcclxuICAgICAgLy8g55m+5bqmIOW9k+e7hOS7tuS9nOS4uumhtemdouaXtiBwYWdlaW5zdGFuY2NlIOS4jeaYr+WOn+adpee7hOS7tueahCBpbnN0YW5jZVxyXG4gICAgICB0aGlzLnBhZ2VpbnN0YW5jZS4kdm0gPSB0aGlzLiR2bTtcclxuICAgICAgaWYgKGhhc093bih0aGlzLnBhZ2VpbnN0YW5jZSwgJ18kYXJncycpKSB7XHJcbiAgICAgICAgdGhpcy4kdm0uJG1wLnF1ZXJ5ID0gdGhpcy5wYWdlaW5zdGFuY2UuXyRhcmdzO1xyXG4gICAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvbkxvYWQnLCB0aGlzLnBhZ2VpbnN0YW5jZS5fJGFyZ3MpO1xyXG4gICAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblNob3cnKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5wYWdlaW5zdGFuY2UuXyRhcmdzO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDnmb7luqblsI/nqIvluo/nu4Tku7bkuI3op6blj5FtZXRob2Rz5YaF55qEb25SZWFkeVxyXG4gICAgICBpZiAodGhpcy4kdm0pIHtcclxuICAgICAgICB0aGlzLiR2bS5faXNNb3VudGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLiR2bS5fX2NhbGxfaG9vaygnbW91bnRlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgaWYgKG5ld0xpZmVjeWNsZSkge1xyXG4gICAgZGVsZXRlIGNvbXBvbmVudE9wdGlvbnMubGlmZXRpbWVzLnJlYWR5O1xyXG4gICAgY29tcG9uZW50T3B0aW9ucy5tZXRob2RzLm9uUmVhZHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGlzLiR2bSkge1xyXG4gICAgICAgIHRoaXMuJHZtLl9pc01vdW50ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdtb3VudGVkJyk7XHJcbiAgICAgICAgdGhpcy4kdm0uX19jYWxsX2hvb2soJ29uUmVhZHknKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudE9wdGlvbnMubWVzc2FnZXMgPSB7XHJcbiAgICAnX19sJzogY29tcG9uZW50T3B0aW9ucy5tZXRob2RzWydfX2wnXVxyXG4gIH07XHJcbiAgZGVsZXRlIGNvbXBvbmVudE9wdGlvbnMubWV0aG9kc1snX19sJ107XHJcblxyXG4gIHJldHVybiBjb21wb25lbnRPcHRpb25zXHJcbn1cclxuXHJcbmNvbnN0IGhvb2tzJDEgPSBbXHJcbiAgJ29uU2hvdycsXHJcbiAgJ29uSGlkZScsXHJcbiAgJ29uVW5sb2FkJ1xyXG5dO1xyXG5cclxuaG9va3MkMS5wdXNoKC4uLlBBR0VfRVZFTlRfSE9PS1MpO1xyXG5cclxuZnVuY3Rpb24gcGFyc2VCYXNlUGFnZSAodnVlUGFnZU9wdGlvbnMsIHtcclxuICBpc1BhZ2UsXHJcbiAgaW5pdFJlbGF0aW9uXHJcbn0pIHtcclxuICBjb25zdCBwYWdlT3B0aW9ucyA9IHBhcnNlQ29tcG9uZW50KHZ1ZVBhZ2VPcHRpb25zKTtcclxuXHJcbiAgaW5pdEhvb2tzKHBhZ2VPcHRpb25zLm1ldGhvZHMsIGhvb2tzJDEsIHZ1ZVBhZ2VPcHRpb25zKTtcclxuXHJcbiAgcGFnZU9wdGlvbnMubWV0aG9kcy5vbkxvYWQgPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgdGhpcy4kdm0uJG1wLnF1ZXJ5ID0gYXJnczsgLy8g5YW85a65IG1wdnVlXHJcbiAgICB0aGlzLiR2bS5fX2NhbGxfaG9vaygnb25Mb2FkJywgYXJncyk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHBhZ2VPcHRpb25zXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRldGFjaGVkICgkdm0pIHtcclxuICAkdm0uJGNoaWxkcmVuLmZvckVhY2goY2hpbGRWbSA9PiB7XHJcbiAgICBjaGlsZFZtLiRzY29wZS5kZXRhY2hlZCgpO1xyXG4gIH0pO1xyXG4gICR2bS4kc2NvcGUuZGV0YWNoZWQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25QYWdlVW5sb2FkICgkdm0pIHtcclxuICAkdm0uJGRlc3Ryb3koKTtcclxuICAkdm0uJGNoaWxkcmVuLmZvckVhY2goY2hpbGRWbSA9PiB7XHJcbiAgICBkZXRhY2hlZChjaGlsZFZtKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VQYWdlICh2dWVQYWdlT3B0aW9ucykge1xyXG4gIGNvbnN0IHBhZ2VPcHRpb25zID0gcGFyc2VCYXNlUGFnZSh2dWVQYWdlT3B0aW9ucywge1xyXG4gICAgaXNQYWdlLFxyXG4gICAgaW5pdFJlbGF0aW9uXHJcbiAgfSk7XHJcblxyXG4gIC8vIOe6oOato+eZvuW6puWwj+eoi+W6j+eUn+WRveWRqOacn21ldGhvZHM6b25TaG935ZyobWV0aG9kczpvbkxvYWTkuYvliY3op6blj5HnmoTpl67pophcclxuICBwYWdlT3B0aW9ucy5tZXRob2RzLm9uU2hvdyA9IGZ1bmN0aW9uIG9uU2hvdyAoKSB7XHJcbiAgICBpZiAodGhpcy4kdm0gJiYgdGhpcy4kdm0uJG1wLnF1ZXJ5KSB7XHJcbiAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblNob3cnKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwYWdlT3B0aW9ucy5tZXRob2RzLm9uTG9hZCA9IGZ1bmN0aW9uIG9uTG9hZCAoYXJncykge1xyXG4gICAgLy8g55m+5bqmIG9uTG9hZCDlnKggYXR0YWNoZWQg5LmL5YmN6Kem5Y+R77yM5YWI5a2Y5YKoIGFyZ3MsIOWcqCBhdHRhY2hlZCDph4zovrnop6blj5Egb25Mb2FkXHJcbiAgICBpZiAodGhpcy4kdm0pIHtcclxuICAgICAgdGhpcy4kdm0uJG1wLnF1ZXJ5ID0gYXJncztcclxuICAgICAgdGhpcy4kdm0uX19jYWxsX2hvb2soJ29uTG9hZCcsIGFyZ3MpO1xyXG4gICAgICB0aGlzLiR2bS5fX2NhbGxfaG9vaygnb25TaG93Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhZ2VpbnN0YW5jZS5fJGFyZ3MgPSBhcmdzO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHBhZ2VPcHRpb25zLm1ldGhvZHMub25VbmxvYWQgPSBmdW5jdGlvbiBvblVubG9hZCAoKSB7XHJcbiAgICB0aGlzLiR2bS5fX2NhbGxfaG9vaygnb25VbmxvYWQnKTtcclxuICAgIG9uUGFnZVVubG9hZCh0aGlzLiR2bSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHBhZ2VPcHRpb25zXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhZ2UgKHZ1ZVBhZ2VPcHRpb25zKSB7XHJcbiAge1xyXG4gICAgcmV0dXJuIENvbXBvbmVudChwYXJzZVBhZ2UodnVlUGFnZU9wdGlvbnMpKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50ICh2dWVPcHRpb25zKSB7XHJcbiAge1xyXG4gICAgcmV0dXJuIENvbXBvbmVudChwYXJzZUNvbXBvbmVudCh2dWVPcHRpb25zKSlcclxuICB9XHJcbn1cclxuXHJcbnRvZG9zLmZvckVhY2godG9kb0FwaSA9PiB7XHJcbiAgcHJvdG9jb2xzW3RvZG9BcGldID0gZmFsc2U7XHJcbn0pO1xyXG5cclxuY2FuSVVzZXMuZm9yRWFjaChjYW5JVXNlQXBpID0+IHtcclxuICBjb25zdCBhcGlOYW1lID0gcHJvdG9jb2xzW2NhbklVc2VBcGldICYmIHByb3RvY29sc1tjYW5JVXNlQXBpXS5uYW1lID8gcHJvdG9jb2xzW2NhbklVc2VBcGldLm5hbWVcclxuICAgIDogY2FuSVVzZUFwaTtcclxuICBpZiAoIXN3YW4uY2FuSVVzZShhcGlOYW1lKSkge1xyXG4gICAgcHJvdG9jb2xzW2NhbklVc2VBcGldID0gZmFsc2U7XHJcbiAgfVxyXG59KTtcclxuXHJcbmxldCB1bmkgPSB7fTtcclxuXHJcbmlmICh0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnICYmIFwibXAtYmFpZHVcIiAhPT0gJ2FwcC1wbHVzJykge1xyXG4gIHVuaSA9IG5ldyBQcm94eSh7fSwge1xyXG4gICAgZ2V0ICh0YXJnZXQsIG5hbWUpIHtcclxuICAgICAgaWYgKHRhcmdldFtuYW1lXSkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXRbbmFtZV1cclxuICAgICAgfVxyXG4gICAgICBpZiAoYmFzZUFwaVtuYW1lXSkge1xyXG4gICAgICAgIHJldHVybiBiYXNlQXBpW25hbWVdXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGFwaVtuYW1lXSkge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNpZnkobmFtZSwgYXBpW25hbWVdKVxyXG4gICAgICB9XHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoZXh0cmFBcGlbbmFtZV0pIHtcclxuICAgICAgICAgIHJldHVybiBwcm9taXNpZnkobmFtZSwgZXh0cmFBcGlbbmFtZV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b2RvQXBpc1tuYW1lXSkge1xyXG4gICAgICAgICAgcmV0dXJuIHByb21pc2lmeShuYW1lLCB0b2RvQXBpc1tuYW1lXSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGV2ZW50QXBpW25hbWVdKSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50QXBpW25hbWVdXHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFoYXNPd24oc3dhbiwgbmFtZSkgJiYgIWhhc093bihwcm90b2NvbHMsIG5hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHByb21pc2lmeShuYW1lLCB3cmFwcGVyKG5hbWUsIHN3YW5bbmFtZV0pKVxyXG4gICAgfSxcclxuICAgIHNldCAodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICB9KTtcclxufSBlbHNlIHtcclxuICBPYmplY3Qua2V5cyhiYXNlQXBpKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgdW5pW25hbWVdID0gYmFzZUFwaVtuYW1lXTtcclxuICB9KTtcclxuXHJcbiAge1xyXG4gICAgT2JqZWN0LmtleXModG9kb0FwaXMpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIHVuaVtuYW1lXSA9IHByb21pc2lmeShuYW1lLCB0b2RvQXBpc1tuYW1lXSk7XHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5rZXlzKGV4dHJhQXBpKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICB1bmlbbmFtZV0gPSBwcm9taXNpZnkobmFtZSwgdG9kb0FwaXNbbmFtZV0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBPYmplY3Qua2V5cyhldmVudEFwaSkuZm9yRWFjaChuYW1lID0+IHtcclxuICAgIHVuaVtuYW1lXSA9IGV2ZW50QXBpW25hbWVdO1xyXG4gIH0pO1xyXG5cclxuICBPYmplY3Qua2V5cyhhcGkpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICB1bmlbbmFtZV0gPSBwcm9taXNpZnkobmFtZSwgYXBpW25hbWVdKTtcclxuICB9KTtcclxuXHJcbiAgT2JqZWN0LmtleXMoc3dhbikuZm9yRWFjaChuYW1lID0+IHtcclxuICAgIGlmIChoYXNPd24oc3dhbiwgbmFtZSkgfHwgaGFzT3duKHByb3RvY29scywgbmFtZSkpIHtcclxuICAgICAgdW5pW25hbWVdID0gcHJvbWlzaWZ5KG5hbWUsIHdyYXBwZXIobmFtZSwgc3dhbltuYW1lXSkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5zd2FuLmNyZWF0ZUFwcCA9IGNyZWF0ZUFwcDtcclxuc3dhbi5jcmVhdGVQYWdlID0gY3JlYXRlUGFnZTtcclxuc3dhbi5jcmVhdGVDb21wb25lbnQgPSBjcmVhdGVDb21wb25lbnQ7XHJcblxyXG52YXIgdW5pJDEgPSB1bmk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1bmkkMTtcclxuZXhwb3J0IHsgY3JlYXRlQXBwLCBjcmVhdGVDb21wb25lbnQsIGNyZWF0ZVBhZ2UgfTtcclxuIiwiLyohXG4gKiBWdWUuanMgdjIuNi4xMVxuICogKGMpIDIwMTQtMjAyMCBFdmFuIFlvdVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG4vKiAgKi9cblxudmFyIGVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG5cbi8vIFRoZXNlIGhlbHBlcnMgcHJvZHVjZSBiZXR0ZXIgVk0gY29kZSBpbiBKUyBlbmdpbmVzIGR1ZSB0byB0aGVpclxuLy8gZXhwbGljaXRuZXNzIGFuZCBmdW5jdGlvbiBpbmxpbmluZy5cbmZ1bmN0aW9uIGlzVW5kZWYgKHYpIHtcbiAgcmV0dXJuIHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsXG59XG5cbmZ1bmN0aW9uIGlzRGVmICh2KSB7XG4gIHJldHVybiB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbFxufVxuXG5mdW5jdGlvbiBpc1RydWUgKHYpIHtcbiAgcmV0dXJuIHYgPT09IHRydWVcbn1cblxuZnVuY3Rpb24gaXNGYWxzZSAodikge1xuICByZXR1cm4gdiA9PT0gZmFsc2Vcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBpcyBwcmltaXRpdmUuXG4gKi9cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlICh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHxcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8XG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgdHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJyB8fFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG4gIClcbn1cblxuLyoqXG4gKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcbiAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcbiAqIGlzIGEgSlNPTi1jb21wbGlhbnQgdHlwZS5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG59XG5cbi8qKlxuICogR2V0IHRoZSByYXcgdHlwZSBzdHJpbmcgb2YgYSB2YWx1ZSwgZS5nLiwgW29iamVjdCBPYmplY3RdLlxuICovXG52YXIgX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gdG9SYXdUeXBlICh2YWx1ZSkge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKVxufVxuXG4vKipcbiAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcbiAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNSZWdFeHAgKHYpIHtcbiAgcmV0dXJuIF90b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBSZWdFeHBdJ1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbCBpcyBhIHZhbGlkIGFycmF5IGluZGV4LlxuICovXG5mdW5jdGlvbiBpc1ZhbGlkQXJyYXlJbmRleCAodmFsKSB7XG4gIHZhciBuID0gcGFyc2VGbG9hdChTdHJpbmcodmFsKSk7XG4gIHJldHVybiBuID49IDAgJiYgTWF0aC5mbG9vcihuKSA9PT0gbiAmJiBpc0Zpbml0ZSh2YWwpXG59XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZSAodmFsKSB7XG4gIHJldHVybiAoXG4gICAgaXNEZWYodmFsKSAmJlxuICAgIHR5cGVvZiB2YWwudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiB2YWwuY2F0Y2ggPT09ICdmdW5jdGlvbidcbiAgKVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSB2YWx1ZSB0byBhIHN0cmluZyB0aGF0IGlzIGFjdHVhbGx5IHJlbmRlcmVkLlxuICovXG5mdW5jdGlvbiB0b1N0cmluZyAodmFsKSB7XG4gIHJldHVybiB2YWwgPT0gbnVsbFxuICAgID8gJydcbiAgICA6IEFycmF5LmlzQXJyYXkodmFsKSB8fCAoaXNQbGFpbk9iamVjdCh2YWwpICYmIHZhbC50b1N0cmluZyA9PT0gX3RvU3RyaW5nKVxuICAgICAgPyBKU09OLnN0cmluZ2lmeSh2YWwsIG51bGwsIDIpXG4gICAgICA6IFN0cmluZyh2YWwpXG59XG5cbi8qKlxuICogQ29udmVydCBhbiBpbnB1dCB2YWx1ZSB0byBhIG51bWJlciBmb3IgcGVyc2lzdGVuY2UuXG4gKiBJZiB0aGUgY29udmVyc2lvbiBmYWlscywgcmV0dXJuIG9yaWdpbmFsIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIgKHZhbCkge1xuICB2YXIgbiA9IHBhcnNlRmxvYXQodmFsKTtcbiAgcmV0dXJuIGlzTmFOKG4pID8gdmFsIDogblxufVxuXG4vKipcbiAqIE1ha2UgYSBtYXAgYW5kIHJldHVybiBhIGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhIGtleVxuICogaXMgaW4gdGhhdCBtYXAuXG4gKi9cbmZ1bmN0aW9uIG1ha2VNYXAgKFxuICBzdHIsXG4gIGV4cGVjdHNMb3dlckNhc2Vcbikge1xuICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGxpc3QgPSBzdHIuc3BsaXQoJywnKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbWFwW2xpc3RbaV1dID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZXhwZWN0c0xvd2VyQ2FzZVxuICAgID8gZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gbWFwW3ZhbC50b0xvd2VyQ2FzZSgpXTsgfVxuICAgIDogZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gbWFwW3ZhbF07IH1cbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHRhZyBpcyBhIGJ1aWx0LWluIHRhZy5cbiAqL1xudmFyIGlzQnVpbHRJblRhZyA9IG1ha2VNYXAoJ3Nsb3QsY29tcG9uZW50JywgdHJ1ZSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gYXR0cmlidXRlIGlzIGEgcmVzZXJ2ZWQgYXR0cmlidXRlLlxuICovXG52YXIgaXNSZXNlcnZlZEF0dHJpYnV0ZSA9IG1ha2VNYXAoJ2tleSxyZWYsc2xvdCxzbG90LXNjb3BlLGlzJyk7XG5cbi8qKlxuICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBhbiBhcnJheS5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlIChhcnIsIGl0ZW0pIHtcbiAgaWYgKGFyci5sZW5ndGgpIHtcbiAgICB2YXIgaW5kZXggPSBhcnIuaW5kZXhPZihpdGVtKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIGhhc093biAob2JqLCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgY2FjaGVkIHZlcnNpb24gb2YgYSBwdXJlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjYWNoZWQgKGZuKSB7XG4gIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHJldHVybiAoZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xuICAgIHZhciBoaXQgPSBjYWNoZVtzdHJdO1xuICAgIHJldHVybiBoaXQgfHwgKGNhY2hlW3N0cl0gPSBmbihzdHIpKVxuICB9KVxufVxuXG4vKipcbiAqIENhbWVsaXplIGEgaHlwaGVuLWRlbGltaXRlZCBzdHJpbmcuXG4gKi9cbnZhciBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xudmFyIGNhbWVsaXplID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIGZ1bmN0aW9uIChfLCBjKSB7IHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJyc7IH0pXG59KTtcblxuLyoqXG4gKiBDYXBpdGFsaXplIGEgc3RyaW5nLlxuICovXG52YXIgY2FwaXRhbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn0pO1xuXG4vKipcbiAqIEh5cGhlbmF0ZSBhIGNhbWVsQ2FzZSBzdHJpbmcuXG4gKi9cbnZhciBoeXBoZW5hdGVSRSA9IC9cXEIoW0EtWl0pL2c7XG52YXIgaHlwaGVuYXRlID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGh5cGhlbmF0ZVJFLCAnLSQxJykudG9Mb3dlckNhc2UoKVxufSk7XG5cbi8qKlxuICogU2ltcGxlIGJpbmQgcG9seWZpbGwgZm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBzdXBwb3J0IGl0LFxuICogZS5nLiwgUGhhbnRvbUpTIDEueC4gVGVjaG5pY2FsbHksIHdlIGRvbid0IG5lZWQgdGhpcyBhbnltb3JlXG4gKiBzaW5jZSBuYXRpdmUgYmluZCBpcyBub3cgcGVyZm9ybWFudCBlbm91Z2ggaW4gbW9zdCBicm93c2Vycy5cbiAqIEJ1dCByZW1vdmluZyBpdCB3b3VsZCBtZWFuIGJyZWFraW5nIGNvZGUgdGhhdCB3YXMgYWJsZSB0byBydW4gaW5cbiAqIFBoYW50b21KUyAxLngsIHNvIHRoaXMgbXVzdCBiZSBrZXB0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxuICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBwb2x5ZmlsbEJpbmQgKGZuLCBjdHgpIHtcbiAgZnVuY3Rpb24gYm91bmRGbiAoYSkge1xuICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICByZXR1cm4gbFxuICAgICAgPyBsID4gMVxuICAgICAgICA/IGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKVxuICAgICAgICA6IGZuLmNhbGwoY3R4LCBhKVxuICAgICAgOiBmbi5jYWxsKGN0eClcbiAgfVxuXG4gIGJvdW5kRm4uX2xlbmd0aCA9IGZuLmxlbmd0aDtcbiAgcmV0dXJuIGJvdW5kRm5cbn1cblxuZnVuY3Rpb24gbmF0aXZlQmluZCAoZm4sIGN0eCkge1xuICByZXR1cm4gZm4uYmluZChjdHgpXG59XG5cbnZhciBiaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiAgPyBuYXRpdmVCaW5kXG4gIDogcG9seWZpbGxCaW5kO1xuXG4vKipcbiAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICovXG5mdW5jdGlvbiB0b0FycmF5IChsaXN0LCBzdGFydCkge1xuICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gIHZhciBpID0gbGlzdC5sZW5ndGggLSBzdGFydDtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSkge1xuICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBleHRlbmQgKHRvLCBfZnJvbSkge1xuICBmb3IgKHZhciBrZXkgaW4gX2Zyb20pIHtcbiAgICB0b1trZXldID0gX2Zyb21ba2V5XTtcbiAgfVxuICByZXR1cm4gdG9cbn1cblxuLyoqXG4gKiBNZXJnZSBhbiBBcnJheSBvZiBPYmplY3RzIGludG8gYSBzaW5nbGUgT2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCAoYXJyKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldKSB7XG4gICAgICBleHRlbmQocmVzLCBhcnJbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogUGVyZm9ybSBubyBvcGVyYXRpb24uXG4gKiBTdHViYmluZyBhcmdzIHRvIG1ha2UgRmxvdyBoYXBweSB3aXRob3V0IGxlYXZpbmcgdXNlbGVzcyB0cmFuc3BpbGVkIGNvZGVcbiAqIHdpdGggLi4ucmVzdCAoaHR0cHM6Ly9mbG93Lm9yZy9ibG9nLzIwMTcvMDUvMDcvU3RyaWN0LUZ1bmN0aW9uLUNhbGwtQXJpdHkvKS5cbiAqL1xuZnVuY3Rpb24gbm9vcCAoYSwgYiwgYykge31cblxuLyoqXG4gKiBBbHdheXMgcmV0dXJuIGZhbHNlLlxuICovXG52YXIgbm8gPSBmdW5jdGlvbiAoYSwgYiwgYykgeyByZXR1cm4gZmFsc2U7IH07XG5cbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBSZXR1cm4gdGhlIHNhbWUgdmFsdWUuXG4gKi9cbnZhciBpZGVudGl0eSA9IGZ1bmN0aW9uIChfKSB7IHJldHVybiBfOyB9O1xuXG4vKipcbiAqIENoZWNrIGlmIHR3byB2YWx1ZXMgYXJlIGxvb3NlbHkgZXF1YWwgLSB0aGF0IGlzLFxuICogaWYgdGhleSBhcmUgcGxhaW4gb2JqZWN0cywgZG8gdGhleSBoYXZlIHRoZSBzYW1lIHNoYXBlP1xuICovXG5mdW5jdGlvbiBsb29zZUVxdWFsIChhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7IHJldHVybiB0cnVlIH1cbiAgdmFyIGlzT2JqZWN0QSA9IGlzT2JqZWN0KGEpO1xuICB2YXIgaXNPYmplY3RCID0gaXNPYmplY3QoYik7XG4gIGlmIChpc09iamVjdEEgJiYgaXNPYmplY3RCKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBpc0FycmF5QSA9IEFycmF5LmlzQXJyYXkoYSk7XG4gICAgICB2YXIgaXNBcnJheUIgPSBBcnJheS5pc0FycmF5KGIpO1xuICAgICAgaWYgKGlzQXJyYXlBICYmIGlzQXJyYXlCKSB7XG4gICAgICAgIHJldHVybiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoZSwgaSkge1xuICAgICAgICAgIHJldHVybiBsb29zZUVxdWFsKGUsIGJbaV0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKClcbiAgICAgIH0gZWxzZSBpZiAoIWlzQXJyYXlBICYmICFpc0FycmF5Qikge1xuICAgICAgICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhhKTtcbiAgICAgICAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMoYik7XG4gICAgICAgIHJldHVybiBrZXlzQS5sZW5ndGggPT09IGtleXNCLmxlbmd0aCAmJiBrZXlzQS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGxvb3NlRXF1YWwoYVtrZXldLCBiW2tleV0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9IGVsc2UgaWYgKCFpc09iamVjdEEgJiYgIWlzT2JqZWN0Qikge1xuICAgIHJldHVybiBTdHJpbmcoYSkgPT09IFN0cmluZyhiKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBmaXJzdCBpbmRleCBhdCB3aGljaCBhIGxvb3NlbHkgZXF1YWwgdmFsdWUgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgYXJyYXkgKGlmIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGUgYXJyYXkgbXVzdFxuICogY29udGFpbiBhbiBvYmplY3Qgb2YgdGhlIHNhbWUgc2hhcGUpLCBvciAtMSBpZiBpdCBpcyBub3QgcHJlc2VudC5cbiAqL1xuZnVuY3Rpb24gbG9vc2VJbmRleE9mIChhcnIsIHZhbCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChsb29zZUVxdWFsKGFycltpXSwgdmFsKSkgeyByZXR1cm4gaSB9XG4gIH1cbiAgcmV0dXJuIC0xXG59XG5cbi8qKlxuICogRW5zdXJlIGEgZnVuY3Rpb24gaXMgY2FsbGVkIG9ubHkgb25jZS5cbiAqL1xuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIEFTU0VUX1RZUEVTID0gW1xuICAnY29tcG9uZW50JyxcbiAgJ2RpcmVjdGl2ZScsXG4gICdmaWx0ZXInXG5dO1xuXG52YXIgTElGRUNZQ0xFX0hPT0tTID0gW1xuICAnYmVmb3JlQ3JlYXRlJyxcbiAgJ2NyZWF0ZWQnLFxuICAnYmVmb3JlTW91bnQnLFxuICAnbW91bnRlZCcsXG4gICdiZWZvcmVVcGRhdGUnLFxuICAndXBkYXRlZCcsXG4gICdiZWZvcmVEZXN0cm95JyxcbiAgJ2Rlc3Ryb3llZCcsXG4gICdhY3RpdmF0ZWQnLFxuICAnZGVhY3RpdmF0ZWQnLFxuICAnZXJyb3JDYXB0dXJlZCcsXG4gICdzZXJ2ZXJQcmVmZXRjaCdcbl07XG5cbi8qICAqL1xuXG5cblxudmFyIGNvbmZpZyA9ICh7XG4gIC8qKlxuICAgKiBPcHRpb24gbWVyZ2Ugc3RyYXRlZ2llcyAodXNlZCBpbiBjb3JlL3V0aWwvb3B0aW9ucylcbiAgICovXG4gIC8vICRmbG93LWRpc2FibGUtbGluZVxuICBvcHRpb25NZXJnZVN0cmF0ZWdpZXM6IE9iamVjdC5jcmVhdGUobnVsbCksXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc3VwcHJlc3Mgd2FybmluZ3MuXG4gICAqL1xuICBzaWxlbnQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBTaG93IHByb2R1Y3Rpb24gbW9kZSB0aXAgbWVzc2FnZSBvbiBib290P1xuICAgKi9cbiAgcHJvZHVjdGlvblRpcDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyxcblxuICAvKipcbiAgICogV2hldGhlciB0byBlbmFibGUgZGV2dG9vbHNcbiAgICovXG4gIGRldnRvb2xzOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHJlY29yZCBwZXJmXG4gICAqL1xuICBwZXJmb3JtYW5jZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEVycm9yIGhhbmRsZXIgZm9yIHdhdGNoZXIgZXJyb3JzXG4gICAqL1xuICBlcnJvckhhbmRsZXI6IG51bGwsXG5cbiAgLyoqXG4gICAqIFdhcm4gaGFuZGxlciBmb3Igd2F0Y2hlciB3YXJuc1xuICAgKi9cbiAgd2FybkhhbmRsZXI6IG51bGwsXG5cbiAgLyoqXG4gICAqIElnbm9yZSBjZXJ0YWluIGN1c3RvbSBlbGVtZW50c1xuICAgKi9cbiAgaWdub3JlZEVsZW1lbnRzOiBbXSxcblxuICAvKipcbiAgICogQ3VzdG9tIHVzZXIga2V5IGFsaWFzZXMgZm9yIHYtb25cbiAgICovXG4gIC8vICRmbG93LWRpc2FibGUtbGluZVxuICBrZXlDb2RlczogT2JqZWN0LmNyZWF0ZShudWxsKSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB0YWcgaXMgcmVzZXJ2ZWQgc28gdGhhdCBpdCBjYW5ub3QgYmUgcmVnaXN0ZXJlZCBhcyBhXG4gICAqIGNvbXBvbmVudC4gVGhpcyBpcyBwbGF0Zm9ybS1kZXBlbmRlbnQgYW5kIG1heSBiZSBvdmVyd3JpdHRlbi5cbiAgICovXG4gIGlzUmVzZXJ2ZWRUYWc6IG5vLFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBhdHRyaWJ1dGUgaXMgcmVzZXJ2ZWQgc28gdGhhdCBpdCBjYW5ub3QgYmUgdXNlZCBhcyBhIGNvbXBvbmVudFxuICAgKiBwcm9wLiBUaGlzIGlzIHBsYXRmb3JtLWRlcGVuZGVudCBhbmQgbWF5IGJlIG92ZXJ3cml0dGVuLlxuICAgKi9cbiAgaXNSZXNlcnZlZEF0dHI6IG5vLFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHRhZyBpcyBhbiB1bmtub3duIGVsZW1lbnQuXG4gICAqIFBsYXRmb3JtLWRlcGVuZGVudC5cbiAgICovXG4gIGlzVW5rbm93bkVsZW1lbnQ6IG5vLFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5hbWVzcGFjZSBvZiBhbiBlbGVtZW50XG4gICAqL1xuICBnZXRUYWdOYW1lc3BhY2U6IG5vb3AsXG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSByZWFsIHRhZyBuYW1lIGZvciB0aGUgc3BlY2lmaWMgcGxhdGZvcm0uXG4gICAqL1xuICBwYXJzZVBsYXRmb3JtVGFnTmFtZTogaWRlbnRpdHksXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGF0dHJpYnV0ZSBtdXN0IGJlIGJvdW5kIHVzaW5nIHByb3BlcnR5LCBlLmcuIHZhbHVlXG4gICAqIFBsYXRmb3JtLWRlcGVuZGVudC5cbiAgICovXG4gIG11c3RVc2VQcm9wOiBubyxcblxuICAvKipcbiAgICogUGVyZm9ybSB1cGRhdGVzIGFzeW5jaHJvbm91c2x5LiBJbnRlbmRlZCB0byBiZSB1c2VkIGJ5IFZ1ZSBUZXN0IFV0aWxzXG4gICAqIFRoaXMgd2lsbCBzaWduaWZpY2FudGx5IHJlZHVjZSBwZXJmb3JtYW5jZSBpZiBzZXQgdG8gZmFsc2UuXG4gICAqL1xuICBhc3luYzogdHJ1ZSxcblxuICAvKipcbiAgICogRXhwb3NlZCBmb3IgbGVnYWN5IHJlYXNvbnNcbiAgICovXG4gIF9saWZlY3ljbGVIb29rczogTElGRUNZQ0xFX0hPT0tTXG59KTtcblxuLyogICovXG5cbi8qKlxuICogdW5pY29kZSBsZXR0ZXJzIHVzZWQgZm9yIHBhcnNpbmcgaHRtbCB0YWdzLCBjb21wb25lbnQgbmFtZXMgYW5kIHByb3BlcnR5IHBhdGhzLlxuICogdXNpbmcgaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1My9zZW1hbnRpY3Mtc2NyaXB0aW5nLmh0bWwjcG90ZW50aWFsY3VzdG9tZWxlbWVudG5hbWVcbiAqIHNraXBwaW5nIFxcdTEwMDAwLVxcdUVGRkZGIGR1ZSB0byBpdCBmcmVlemluZyB1cCBQaGFudG9tSlNcbiAqL1xudmFyIHVuaWNvZGVSZWdFeHAgPSAvYS16QS1aXFx1MDBCN1xcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMEMtXFx1MjAwRFxcdTIwM0YtXFx1MjA0MFxcdTIwNzAtXFx1MjE4RlxcdTJDMDAtXFx1MkZFRlxcdTMwMDEtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZGRC87XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWQgKHN0cikge1xuICB2YXIgYyA9IChzdHIgKyAnJykuY2hhckNvZGVBdCgwKTtcbiAgcmV0dXJuIGMgPT09IDB4MjQgfHwgYyA9PT0gMHg1RlxufVxuXG4vKipcbiAqIERlZmluZSBhIHByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBkZWYgKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgdmFsdWU6IHZhbCxcbiAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIFBhcnNlIHNpbXBsZSBwYXRoLlxuICovXG52YXIgYmFpbFJFID0gbmV3IFJlZ0V4cCgoXCJbXlwiICsgKHVuaWNvZGVSZWdFeHAuc291cmNlKSArIFwiLiRfXFxcXGRdXCIpKTtcbmZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xuICBpZiAoYmFpbFJFLnRlc3QocGF0aCkpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgc2VnbWVudHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFvYmopIHsgcmV0dXJuIH1cbiAgICAgIG9iaiA9IG9ialtzZWdtZW50c1tpXV07XG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfVxufVxuXG4vKiAgKi9cblxuLy8gY2FuIHdlIHVzZSBfX3Byb3RvX18/XG52YXIgaGFzUHJvdG8gPSAnX19wcm90b19fJyBpbiB7fTtcblxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xudmFyIGluQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xudmFyIGluV2VleCA9IHR5cGVvZiBXWEVudmlyb25tZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhIVdYRW52aXJvbm1lbnQucGxhdGZvcm07XG52YXIgd2VleFBsYXRmb3JtID0gaW5XZWV4ICYmIFdYRW52aXJvbm1lbnQucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtcbnZhciBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xudmFyIGlzSUUgPSBVQSAmJiAvbXNpZXx0cmlkZW50Ly50ZXN0KFVBKTtcbnZhciBpc0lFOSA9IFVBICYmIFVBLmluZGV4T2YoJ21zaWUgOS4wJykgPiAwO1xudmFyIGlzRWRnZSA9IFVBICYmIFVBLmluZGV4T2YoJ2VkZ2UvJykgPiAwO1xudmFyIGlzQW5kcm9pZCA9IChVQSAmJiBVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAwKSB8fCAod2VleFBsYXRmb3JtID09PSAnYW5kcm9pZCcpO1xudmFyIGlzSU9TID0gKFVBICYmIC9pcGhvbmV8aXBhZHxpcG9kfGlvcy8udGVzdChVQSkpIHx8ICh3ZWV4UGxhdGZvcm0gPT09ICdpb3MnKTtcbnZhciBpc0Nocm9tZSA9IFVBICYmIC9jaHJvbWVcXC9cXGQrLy50ZXN0KFVBKSAmJiAhaXNFZGdlO1xudmFyIGlzUGhhbnRvbUpTID0gVUEgJiYgL3BoYW50b21qcy8udGVzdChVQSk7XG52YXIgaXNGRiA9IFVBICYmIFVBLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLyk7XG5cbi8vIEZpcmVmb3ggaGFzIGEgXCJ3YXRjaFwiIGZ1bmN0aW9uIG9uIE9iamVjdC5wcm90b3R5cGUuLi5cbnZhciBuYXRpdmVXYXRjaCA9ICh7fSkud2F0Y2g7XG5pZiAoaW5Ccm93c2VyKSB7XG4gIHRyeSB7XG4gICAgdmFyIG9wdHMgPSB7fTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob3B0cywgJ3Bhc3NpdmUnLCAoe1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQgKCkge1xuICAgICAgfVxuICAgIH0pKTsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0LXBhc3NpdmUnLCBudWxsLCBvcHRzKTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuLy8gdGhpcyBuZWVkcyB0byBiZSBsYXp5LWV2YWxlZCBiZWNhdXNlIHZ1ZSBtYXkgYmUgcmVxdWlyZWQgYmVmb3JlXG4vLyB2dWUtc2VydmVyLXJlbmRlcmVyIGNhbiBzZXQgVlVFX0VOVlxudmFyIF9pc1NlcnZlcjtcbnZhciBpc1NlcnZlclJlbmRlcmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKF9pc1NlcnZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFpbkJyb3dzZXIgJiYgIWluV2VleCAmJiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZGV0ZWN0IHByZXNlbmNlIG9mIHZ1ZS1zZXJ2ZXItcmVuZGVyZXIgYW5kIGF2b2lkXG4gICAgICAvLyBXZWJwYWNrIHNoaW1taW5nIHRoZSBwcm9jZXNzXG4gICAgICBfaXNTZXJ2ZXIgPSBnbG9iYWxbJ3Byb2Nlc3MnXSAmJiBnbG9iYWxbJ3Byb2Nlc3MnXS5lbnYuVlVFX0VOViA9PT0gJ3NlcnZlcic7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9pc1NlcnZlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gX2lzU2VydmVyXG59O1xuXG4vLyBkZXRlY3QgZGV2dG9vbHNcbnZhciBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfXztcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGlzTmF0aXZlIChDdG9yKSB7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoQ3Rvci50b1N0cmluZygpKVxufVxuXG52YXIgaGFzU3ltYm9sID1cbiAgdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU3ltYm9sKSAmJlxuICB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUmVmbGVjdC5vd25LZXlzKTtcblxudmFyIF9TZXQ7XG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi8gLy8gJGZsb3ctZGlzYWJsZS1saW5lXG5pZiAodHlwZW9mIFNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU2V0KSkge1xuICAvLyB1c2UgbmF0aXZlIFNldCB3aGVuIGF2YWlsYWJsZS5cbiAgX1NldCA9IFNldDtcbn0gZWxzZSB7XG4gIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cbiAgX1NldCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNldCAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFtrZXldID09PSB0cnVlXG4gICAgfTtcbiAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAoa2V5KSB7XG4gICAgICB0aGlzLnNldFtrZXldID0gdHJ1ZTtcbiAgICB9O1xuICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfTtcblxuICAgIHJldHVybiBTZXQ7XG4gIH0oKSk7XG59XG5cbi8qICAqL1xuXG52YXIgd2FybiA9IG5vb3A7XG52YXIgdGlwID0gbm9vcDtcbnZhciBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlID0gKG5vb3ApOyAvLyB3b3JrIGFyb3VuZCBmbG93IGNoZWNrXG52YXIgZm9ybWF0Q29tcG9uZW50TmFtZSA9IChub29wKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGhhc0NvbnNvbGUgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCc7XG4gIHZhciBjbGFzc2lmeVJFID0gLyg/Ol58Wy1fXSkoXFx3KS9nO1xuICB2YXIgY2xhc3NpZnkgPSBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHJcbiAgICAucmVwbGFjZShjbGFzc2lmeVJFLCBmdW5jdGlvbiAoYykgeyByZXR1cm4gYy50b1VwcGVyQ2FzZSgpOyB9KVxuICAgIC5yZXBsYWNlKC9bLV9dL2csICcnKTsgfTtcblxuICB3YXJuID0gZnVuY3Rpb24gKG1zZywgdm0pIHtcbiAgICB2YXIgdHJhY2UgPSB2bSA/IGdlbmVyYXRlQ29tcG9uZW50VHJhY2Uodm0pIDogJyc7XG5cbiAgICBpZiAoY29uZmlnLndhcm5IYW5kbGVyKSB7XG4gICAgICBjb25maWcud2FybkhhbmRsZXIuY2FsbChudWxsLCBtc2csIHZtLCB0cmFjZSk7XG4gICAgfSBlbHNlIGlmIChoYXNDb25zb2xlICYmICghY29uZmlnLnNpbGVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW1Z1ZSB3YXJuXTogXCIgKyBtc2cgKyB0cmFjZSkpO1xuICAgIH1cbiAgfTtcblxuICB0aXAgPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgIGlmIChoYXNDb25zb2xlICYmICghY29uZmlnLnNpbGVudCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIltWdWUgdGlwXTogXCIgKyBtc2cgKyAoXG4gICAgICAgIHZtID8gZ2VuZXJhdGVDb21wb25lbnRUcmFjZSh2bSkgOiAnJ1xuICAgICAgKSk7XG4gICAgfVxuICB9O1xuXG4gIGZvcm1hdENvbXBvbmVudE5hbWUgPSBmdW5jdGlvbiAodm0sIGluY2x1ZGVGaWxlKSB7XG4gICAge1xuICAgICAgaWYodm0uJHNjb3BlICYmIHZtLiRzY29wZS5pcyl7XG4gICAgICAgIHJldHVybiB2bS4kc2NvcGUuaXNcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZtLiRyb290ID09PSB2bSkge1xuICAgICAgcmV0dXJuICc8Um9vdD4nXG4gICAgfVxuICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHZtID09PSAnZnVuY3Rpb24nICYmIHZtLmNpZCAhPSBudWxsXG4gICAgICA/IHZtLm9wdGlvbnNcbiAgICAgIDogdm0uX2lzVnVlXG4gICAgICAgID8gdm0uJG9wdGlvbnMgfHwgdm0uY29uc3RydWN0b3Iub3B0aW9uc1xuICAgICAgICA6IHZtO1xuICAgIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lIHx8IG9wdGlvbnMuX2NvbXBvbmVudFRhZztcbiAgICB2YXIgZmlsZSA9IG9wdGlvbnMuX19maWxlO1xuICAgIGlmICghbmFtZSAmJiBmaWxlKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBmaWxlLm1hdGNoKC8oW14vXFxcXF0rKVxcLnZ1ZSQvKTtcbiAgICAgIG5hbWUgPSBtYXRjaCAmJiBtYXRjaFsxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgKG5hbWUgPyAoXCI8XCIgKyAoY2xhc3NpZnkobmFtZSkpICsgXCI+XCIpIDogXCI8QW5vbnltb3VzPlwiKSArXG4gICAgICAoZmlsZSAmJiBpbmNsdWRlRmlsZSAhPT0gZmFsc2UgPyAoXCIgYXQgXCIgKyBmaWxlKSA6ICcnKVxuICAgIClcbiAgfTtcblxuICB2YXIgcmVwZWF0ID0gZnVuY3Rpb24gKHN0ciwgbikge1xuICAgIHZhciByZXMgPSAnJztcbiAgICB3aGlsZSAobikge1xuICAgICAgaWYgKG4gJSAyID09PSAxKSB7IHJlcyArPSBzdHI7IH1cbiAgICAgIGlmIChuID4gMSkgeyBzdHIgKz0gc3RyOyB9XG4gICAgICBuID4+PSAxO1xuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH07XG5cbiAgZ2VuZXJhdGVDb21wb25lbnRUcmFjZSA9IGZ1bmN0aW9uICh2bSkge1xuICAgIGlmICh2bS5faXNWdWUgJiYgdm0uJHBhcmVudCkge1xuICAgICAgdmFyIHRyZWUgPSBbXTtcbiAgICAgIHZhciBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPSAwO1xuICAgICAgd2hpbGUgKHZtKSB7XG4gICAgICAgIGlmICh0cmVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgbGFzdCA9IHRyZWVbdHJlZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAobGFzdC5jb25zdHJ1Y3RvciA9PT0gdm0uY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSsrO1xuICAgICAgICAgICAgdm0gPSB2bS4kcGFyZW50O1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSA+IDApIHtcbiAgICAgICAgICAgIHRyZWVbdHJlZS5sZW5ndGggLSAxXSA9IFtsYXN0LCBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2VdO1xuICAgICAgICAgICAgY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJlZS5wdXNoKHZtKTtcbiAgICAgICAgdm0gPSB2bS4kcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuICdcXG5cXG5mb3VuZCBpblxcblxcbicgKyB0cmVlXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHZtLCBpKSB7IHJldHVybiAoXCJcIiArIChpID09PSAwID8gJy0tLT4gJyA6IHJlcGVhdCgnICcsIDUgKyBpICogMikpICsgKEFycmF5LmlzQXJyYXkodm0pXG4gICAgICAgICAgICA/ICgoZm9ybWF0Q29tcG9uZW50TmFtZSh2bVswXSkpICsgXCIuLi4gKFwiICsgKHZtWzFdKSArIFwiIHJlY3Vyc2l2ZSBjYWxscylcIilcbiAgICAgICAgICAgIDogZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpKTsgfSlcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXCJcXG5cXG4oZm91bmQgaW4gXCIgKyAoZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpICsgXCIpXCIpXG4gICAgfVxuICB9O1xufVxuXG4vKiAgKi9cblxudmFyIHVpZCA9IDA7XG5cbi8qKlxuICogQSBkZXAgaXMgYW4gb2JzZXJ2YWJsZSB0aGF0IGNhbiBoYXZlIG11bHRpcGxlXG4gKiBkaXJlY3RpdmVzIHN1YnNjcmliaW5nIHRvIGl0LlxuICovXG52YXIgRGVwID0gZnVuY3Rpb24gRGVwICgpIHtcbiAgLy8gZml4ZWQgYnkgeHh4eHh4IChudnVlIHZ1ZXgpXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4gIGlmKHR5cGVvZiBTaGFyZWRPYmplY3QgIT09ICd1bmRlZmluZWQnKXtcbiAgICB0aGlzLmlkID0gU2hhcmVkT2JqZWN0LnVpZCsrO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaWQgPSB1aWQrKztcbiAgfVxuICB0aGlzLnN1YnMgPSBbXTtcbn07XG5cbkRlcC5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gYWRkU3ViIChzdWIpIHtcbiAgdGhpcy5zdWJzLnB1c2goc3ViKTtcbn07XG5cbkRlcC5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gcmVtb3ZlU3ViIChzdWIpIHtcbiAgcmVtb3ZlKHRoaXMuc3Vicywgc3ViKTtcbn07XG5cbkRlcC5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcbiAgaWYgKERlcC5TaGFyZWRPYmplY3QudGFyZ2V0KSB7XG4gICAgRGVwLlNoYXJlZE9iamVjdC50YXJnZXQuYWRkRGVwKHRoaXMpO1xuICB9XG59O1xuXG5EZXAucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeSAoKSB7XG4gIC8vIHN0YWJpbGl6ZSB0aGUgc3Vic2NyaWJlciBsaXN0IGZpcnN0XG4gIHZhciBzdWJzID0gdGhpcy5zdWJzLnNsaWNlKCk7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFjb25maWcuYXN5bmMpIHtcbiAgICAvLyBzdWJzIGFyZW4ndCBzb3J0ZWQgaW4gc2NoZWR1bGVyIGlmIG5vdCBydW5uaW5nIGFzeW5jXG4gICAgLy8gd2UgbmVlZCB0byBzb3J0IHRoZW0gbm93IHRvIG1ha2Ugc3VyZSB0aGV5IGZpcmUgaW4gY29ycmVjdFxuICAgIC8vIG9yZGVyXG4gICAgc3Vicy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmlkIC0gYi5pZDsgfSk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHN1YnNbaV0udXBkYXRlKCk7XG4gIH1cbn07XG5cbi8vIFRoZSBjdXJyZW50IHRhcmdldCB3YXRjaGVyIGJlaW5nIGV2YWx1YXRlZC5cbi8vIFRoaXMgaXMgZ2xvYmFsbHkgdW5pcXVlIGJlY2F1c2Ugb25seSBvbmUgd2F0Y2hlclxuLy8gY2FuIGJlIGV2YWx1YXRlZCBhdCBhIHRpbWUuXG4vLyBmaXhlZCBieSB4eHh4eHggKG52dWUgc2hhcmVkIHZ1ZXgpXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuRGVwLlNoYXJlZE9iamVjdCA9IHR5cGVvZiBTaGFyZWRPYmplY3QgIT09ICd1bmRlZmluZWQnID8gU2hhcmVkT2JqZWN0IDoge307XG5EZXAuU2hhcmVkT2JqZWN0LnRhcmdldCA9IG51bGw7XG5EZXAuU2hhcmVkT2JqZWN0LnRhcmdldFN0YWNrID0gW107XG5cbmZ1bmN0aW9uIHB1c2hUYXJnZXQgKHRhcmdldCkge1xuICBEZXAuU2hhcmVkT2JqZWN0LnRhcmdldFN0YWNrLnB1c2godGFyZ2V0KTtcbiAgRGVwLlNoYXJlZE9iamVjdC50YXJnZXQgPSB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHBvcFRhcmdldCAoKSB7XG4gIERlcC5TaGFyZWRPYmplY3QudGFyZ2V0U3RhY2sucG9wKCk7XG4gIERlcC5TaGFyZWRPYmplY3QudGFyZ2V0ID0gRGVwLlNoYXJlZE9iamVjdC50YXJnZXRTdGFja1tEZXAuU2hhcmVkT2JqZWN0LnRhcmdldFN0YWNrLmxlbmd0aCAtIDFdO1xufVxuXG4vKiAgKi9cblxudmFyIFZOb2RlID0gZnVuY3Rpb24gVk5vZGUgKFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICB0ZXh0LFxuICBlbG0sXG4gIGNvbnRleHQsXG4gIGNvbXBvbmVudE9wdGlvbnMsXG4gIGFzeW5jRmFjdG9yeVxuKSB7XG4gIHRoaXMudGFnID0gdGFnO1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIHRoaXMudGV4dCA9IHRleHQ7XG4gIHRoaXMuZWxtID0gZWxtO1xuICB0aGlzLm5zID0gdW5kZWZpbmVkO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLmZuQ29udGV4dCA9IHVuZGVmaW5lZDtcbiAgdGhpcy5mbk9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIHRoaXMuZm5TY29wZUlkID0gdW5kZWZpbmVkO1xuICB0aGlzLmtleSA9IGRhdGEgJiYgZGF0YS5rZXk7XG4gIHRoaXMuY29tcG9uZW50T3B0aW9ucyA9IGNvbXBvbmVudE9wdGlvbnM7XG4gIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIHRoaXMucGFyZW50ID0gdW5kZWZpbmVkO1xuICB0aGlzLnJhdyA9IGZhbHNlO1xuICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XG4gIHRoaXMuaXNSb290SW5zZXJ0ID0gdHJ1ZTtcbiAgdGhpcy5pc0NvbW1lbnQgPSBmYWxzZTtcbiAgdGhpcy5pc0Nsb25lZCA9IGZhbHNlO1xuICB0aGlzLmlzT25jZSA9IGZhbHNlO1xuICB0aGlzLmFzeW5jRmFjdG9yeSA9IGFzeW5jRmFjdG9yeTtcbiAgdGhpcy5hc3luY01ldGEgPSB1bmRlZmluZWQ7XG4gIHRoaXMuaXNBc3luY1BsYWNlaG9sZGVyID0gZmFsc2U7XG59O1xuXG52YXIgcHJvdG90eXBlQWNjZXNzb3JzID0geyBjaGlsZDogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4vLyBERVBSRUNBVEVEOiBhbGlhcyBmb3IgY29tcG9uZW50SW5zdGFuY2UgZm9yIGJhY2t3YXJkcyBjb21wYXQuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xucHJvdG90eXBlQWNjZXNzb3JzLmNoaWxkLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY29tcG9uZW50SW5zdGFuY2Vcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBWTm9kZS5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyApO1xuXG52YXIgY3JlYXRlRW1wdHlWTm9kZSA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gIGlmICggdGV4dCA9PT0gdm9pZCAwICkgdGV4dCA9ICcnO1xuXG4gIHZhciBub2RlID0gbmV3IFZOb2RlKCk7XG4gIG5vZGUudGV4dCA9IHRleHQ7XG4gIG5vZGUuaXNDb21tZW50ID0gdHJ1ZTtcbiAgcmV0dXJuIG5vZGVcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHRWTm9kZSAodmFsKSB7XG4gIHJldHVybiBuZXcgVk5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgU3RyaW5nKHZhbCkpXG59XG5cbi8vIG9wdGltaXplZCBzaGFsbG93IGNsb25lXG4vLyB1c2VkIGZvciBzdGF0aWMgbm9kZXMgYW5kIHNsb3Qgbm9kZXMgYmVjYXVzZSB0aGV5IG1heSBiZSByZXVzZWQgYWNyb3NzXG4vLyBtdWx0aXBsZSByZW5kZXJzLCBjbG9uaW5nIHRoZW0gYXZvaWRzIGVycm9ycyB3aGVuIERPTSBtYW5pcHVsYXRpb25zIHJlbHlcbi8vIG9uIHRoZWlyIGVsbSByZWZlcmVuY2UuXG5mdW5jdGlvbiBjbG9uZVZOb2RlICh2bm9kZSkge1xuICB2YXIgY2xvbmVkID0gbmV3IFZOb2RlKFxuICAgIHZub2RlLnRhZyxcbiAgICB2bm9kZS5kYXRhLFxuICAgIC8vICM3OTc1XG4gICAgLy8gY2xvbmUgY2hpbGRyZW4gYXJyYXkgdG8gYXZvaWQgbXV0YXRpbmcgb3JpZ2luYWwgaW4gY2FzZSBvZiBjbG9uaW5nXG4gICAgLy8gYSBjaGlsZC5cbiAgICB2bm9kZS5jaGlsZHJlbiAmJiB2bm9kZS5jaGlsZHJlbi5zbGljZSgpLFxuICAgIHZub2RlLnRleHQsXG4gICAgdm5vZGUuZWxtLFxuICAgIHZub2RlLmNvbnRleHQsXG4gICAgdm5vZGUuY29tcG9uZW50T3B0aW9ucyxcbiAgICB2bm9kZS5hc3luY0ZhY3RvcnlcbiAgKTtcbiAgY2xvbmVkLm5zID0gdm5vZGUubnM7XG4gIGNsb25lZC5pc1N0YXRpYyA9IHZub2RlLmlzU3RhdGljO1xuICBjbG9uZWQua2V5ID0gdm5vZGUua2V5O1xuICBjbG9uZWQuaXNDb21tZW50ID0gdm5vZGUuaXNDb21tZW50O1xuICBjbG9uZWQuZm5Db250ZXh0ID0gdm5vZGUuZm5Db250ZXh0O1xuICBjbG9uZWQuZm5PcHRpb25zID0gdm5vZGUuZm5PcHRpb25zO1xuICBjbG9uZWQuZm5TY29wZUlkID0gdm5vZGUuZm5TY29wZUlkO1xuICBjbG9uZWQuYXN5bmNNZXRhID0gdm5vZGUuYXN5bmNNZXRhO1xuICBjbG9uZWQuaXNDbG9uZWQgPSB0cnVlO1xuICByZXR1cm4gY2xvbmVkXG59XG5cbi8qXG4gKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGhcbiAqIGR5bmFtaWNhbGx5IGFjY2Vzc2luZyBtZXRob2RzIG9uIEFycmF5IHByb3RvdHlwZVxuICovXG5cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xudmFyIGFycmF5TWV0aG9kcyA9IE9iamVjdC5jcmVhdGUoYXJyYXlQcm90byk7XG5cbnZhciBtZXRob2RzVG9QYXRjaCA9IFtcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc3BsaWNlJyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZSdcbl07XG5cbi8qKlxuICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG4gKi9cbm1ldGhvZHNUb1BhdGNoLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAvLyBjYWNoZSBvcmlnaW5hbCBtZXRob2RcbiAgdmFyIG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdO1xuICBkZWYoYXJyYXlNZXRob2RzLCBtZXRob2QsIGZ1bmN0aW9uIG11dGF0b3IgKCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIHZhciByZXN1bHQgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfXztcbiAgICB2YXIgaW5zZXJ0ZWQ7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2UgJ3B1c2gnOlxuICAgICAgY2FzZSAndW5zaGlmdCc6XG4gICAgICAgIGluc2VydGVkID0gYXJncztcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3NwbGljZSc6XG4gICAgICAgIGluc2VydGVkID0gYXJncy5zbGljZSgyKTtcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKGluc2VydGVkKSB7IG9iLm9ic2VydmVBcnJheShpbnNlcnRlZCk7IH1cbiAgICAvLyBub3RpZnkgY2hhbmdlXG4gICAgb2IuZGVwLm5vdGlmeSgpO1xuICAgIHJldHVybiByZXN1bHRcbiAgfSk7XG59KTtcblxuLyogICovXG5cbnZhciBhcnJheUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcnJheU1ldGhvZHMpO1xuXG4vKipcbiAqIEluIHNvbWUgY2FzZXMgd2UgbWF5IHdhbnQgdG8gZGlzYWJsZSBvYnNlcnZhdGlvbiBpbnNpZGUgYSBjb21wb25lbnQnc1xuICogdXBkYXRlIGNvbXB1dGF0aW9uLlxuICovXG52YXIgc2hvdWxkT2JzZXJ2ZSA9IHRydWU7XG5cbmZ1bmN0aW9uIHRvZ2dsZU9ic2VydmluZyAodmFsdWUpIHtcbiAgc2hvdWxkT2JzZXJ2ZSA9IHZhbHVlO1xufVxuXG4vKipcbiAqIE9ic2VydmVyIGNsYXNzIHRoYXQgaXMgYXR0YWNoZWQgdG8gZWFjaCBvYnNlcnZlZFxuICogb2JqZWN0LiBPbmNlIGF0dGFjaGVkLCB0aGUgb2JzZXJ2ZXIgY29udmVydHMgdGhlIHRhcmdldFxuICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcbiAqIGNvbGxlY3QgZGVwZW5kZW5jaWVzIGFuZCBkaXNwYXRjaCB1cGRhdGVzLlxuICovXG52YXIgT2JzZXJ2ZXIgPSBmdW5jdGlvbiBPYnNlcnZlciAodmFsdWUpIHtcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB0aGlzLmRlcCA9IG5ldyBEZXAoKTtcbiAgdGhpcy52bUNvdW50ID0gMDtcbiAgZGVmKHZhbHVlLCAnX19vYl9fJywgdGhpcyk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGlmIChoYXNQcm90bykge1xuICAgICAgey8vIGZpeGVkIGJ5IHh4eHh4eCDlvq7kv6HlsI/nqIvluo/kvb/nlKggcGx1Z2lucyDkuYvlkI7vvIzmlbDnu4Tmlrnms5Xooqvnm7TmjqXmjILovb3liLDkuobmlbDnu4Tlr7nosaHkuIrvvIzpnIDopoHmiafooYwgY29weUF1Z21lbnQg6YC76L6RXG4gICAgICAgIGlmKHZhbHVlLnB1c2ggIT09IHZhbHVlLl9fcHJvdG9fXy5wdXNoKXtcbiAgICAgICAgICBjb3B5QXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvQXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3B5QXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgIH1cbiAgICB0aGlzLm9ic2VydmVBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53YWxrKHZhbHVlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXYWxrIHRocm91Z2ggYWxsIHByb3BlcnRpZXMgYW5kIGNvbnZlcnQgdGhlbSBpbnRvXG4gKiBnZXR0ZXIvc2V0dGVycy4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAqIHZhbHVlIHR5cGUgaXMgT2JqZWN0LlxuICovXG5PYnNlcnZlci5wcm90b3R5cGUud2FsayA9IGZ1bmN0aW9uIHdhbGsgKG9iaikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGRlZmluZVJlYWN0aXZlJCQxKG9iaiwga2V5c1tpXSk7XG4gIH1cbn07XG5cbi8qKlxuICogT2JzZXJ2ZSBhIGxpc3Qgb2YgQXJyYXkgaXRlbXMuXG4gKi9cbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiBvYnNlcnZlQXJyYXkgKGl0ZW1zKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgb2JzZXJ2ZShpdGVtc1tpXSk7XG4gIH1cbn07XG5cbi8vIGhlbHBlcnNcblxuLyoqXG4gKiBBdWdtZW50IGEgdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBpbnRlcmNlcHRpbmdcbiAqIHRoZSBwcm90b3R5cGUgY2hhaW4gdXNpbmcgX19wcm90b19fXG4gKi9cbmZ1bmN0aW9uIHByb3RvQXVnbWVudCAodGFyZ2V0LCBzcmMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbiAgdGFyZ2V0Ll9fcHJvdG9fXyA9IHNyYztcbiAgLyogZXNsaW50LWVuYWJsZSBuby1wcm90byAqL1xufVxuXG4vKipcbiAqIEF1Z21lbnQgYSB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGRlZmluaW5nXG4gKiBoaWRkZW4gcHJvcGVydGllcy5cbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGNvcHlBdWdtZW50ICh0YXJnZXQsIHNyYywga2V5cykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcbiAqIHJldHVybnMgdGhlIG5ldyBvYnNlcnZlciBpZiBzdWNjZXNzZnVsbHkgb2JzZXJ2ZWQsXG4gKiBvciB0aGUgZXhpc3Rpbmcgb2JzZXJ2ZXIgaWYgdGhlIHZhbHVlIGFscmVhZHkgaGFzIG9uZS5cbiAqL1xuZnVuY3Rpb24gb2JzZXJ2ZSAodmFsdWUsIGFzUm9vdERhdGEpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBvYjtcbiAgaWYgKGhhc093bih2YWx1ZSwgJ19fb2JfXycpICYmIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyKSB7XG4gICAgb2IgPSB2YWx1ZS5fX29iX187XG4gIH0gZWxzZSBpZiAoXG4gICAgc2hvdWxkT2JzZXJ2ZSAmJlxuICAgICFpc1NlcnZlclJlbmRlcmluZygpICYmXG4gICAgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IGlzUGxhaW5PYmplY3QodmFsdWUpKSAmJlxuICAgIE9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpICYmXG4gICAgIXZhbHVlLl9pc1Z1ZVxuICApIHtcbiAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSk7XG4gIH1cbiAgaWYgKGFzUm9vdERhdGEgJiYgb2IpIHtcbiAgICBvYi52bUNvdW50Kys7XG4gIH1cbiAgcmV0dXJuIG9iXG59XG5cbi8qKlxuICogRGVmaW5lIGEgcmVhY3RpdmUgcHJvcGVydHkgb24gYW4gT2JqZWN0LlxuICovXG5mdW5jdGlvbiBkZWZpbmVSZWFjdGl2ZSQkMSAoXG4gIG9iaixcbiAga2V5LFxuICB2YWwsXG4gIGN1c3RvbVNldHRlcixcbiAgc2hhbGxvd1xuKSB7XG4gIHZhciBkZXAgPSBuZXcgRGVwKCk7XG5cbiAgdmFyIHByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gIGlmIChwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBjYXRlciBmb3IgcHJlLWRlZmluZWQgZ2V0dGVyL3NldHRlcnNcbiAgdmFyIGdldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LmdldDtcbiAgdmFyIHNldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LnNldDtcbiAgaWYgKCghZ2V0dGVyIHx8IHNldHRlcikgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHZhbCA9IG9ialtrZXldO1xuICB9XG5cbiAgdmFyIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKHZhbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIgKCkge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgIGlmIChEZXAuU2hhcmVkT2JqZWN0LnRhcmdldCkgeyAvLyBmaXhlZCBieSB4eHh4eHhcbiAgICAgICAgZGVwLmRlcGVuZCgpO1xuICAgICAgICBpZiAoY2hpbGRPYikge1xuICAgICAgICAgIGNoaWxkT2IuZGVwLmRlcGVuZCgpO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgZGVwZW5kQXJyYXkodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlU2V0dGVyIChuZXdWYWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWw7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cbiAgICAgIGlmIChuZXdWYWwgPT09IHZhbHVlIHx8IChuZXdWYWwgIT09IG5ld1ZhbCAmJiB2YWx1ZSAhPT0gdmFsdWUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGN1c3RvbVNldHRlcikge1xuICAgICAgICBjdXN0b21TZXR0ZXIoKTtcbiAgICAgIH1cbiAgICAgIC8vICM3OTgxOiBmb3IgYWNjZXNzb3IgcHJvcGVydGllcyB3aXRob3V0IHNldHRlclxuICAgICAgaWYgKGdldHRlciAmJiAhc2V0dGVyKSB7IHJldHVybiB9XG4gICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgIHNldHRlci5jYWxsKG9iaiwgbmV3VmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IG5ld1ZhbDtcbiAgICAgIH1cbiAgICAgIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKG5ld1ZhbCk7XG4gICAgICBkZXAubm90aWZ5KCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgYSBwcm9wZXJ0eSBvbiBhbiBvYmplY3QuIEFkZHMgdGhlIG5ldyBwcm9wZXJ0eSBhbmRcbiAqIHRyaWdnZXJzIGNoYW5nZSBub3RpZmljYXRpb24gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3RcbiAqIGFscmVhZHkgZXhpc3QuXG4gKi9cbmZ1bmN0aW9uIHNldCAodGFyZ2V0LCBrZXksIHZhbCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIChpc1VuZGVmKHRhcmdldCkgfHwgaXNQcmltaXRpdmUodGFyZ2V0KSlcbiAgKSB7XG4gICAgd2FybigoXCJDYW5ub3Qgc2V0IHJlYWN0aXZlIHByb3BlcnR5IG9uIHVuZGVmaW5lZCwgbnVsbCwgb3IgcHJpbWl0aXZlIHZhbHVlOiBcIiArICgodGFyZ2V0KSkpKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICB0YXJnZXQubGVuZ3RoID0gTWF0aC5tYXgodGFyZ2V0Lmxlbmd0aCwga2V5KTtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSwgdmFsKTtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgaWYgKGtleSBpbiB0YXJnZXQgJiYgIShrZXkgaW4gT2JqZWN0LnByb3RvdHlwZSkpIHtcbiAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICBpZiAodGFyZ2V0Ll9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnQXZvaWQgYWRkaW5nIHJlYWN0aXZlIHByb3BlcnRpZXMgdG8gYSBWdWUgaW5zdGFuY2Ugb3IgaXRzIHJvb3QgJGRhdGEgJyArXG4gICAgICAnYXQgcnVudGltZSAtIGRlY2xhcmUgaXQgdXBmcm9udCBpbiB0aGUgZGF0YSBvcHRpb24uJ1xuICAgICk7XG4gICAgcmV0dXJuIHZhbFxuICB9XG4gIGlmICghb2IpIHtcbiAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgZGVmaW5lUmVhY3RpdmUkJDEob2IudmFsdWUsIGtleSwgdmFsKTtcbiAgb2IuZGVwLm5vdGlmeSgpO1xuICByZXR1cm4gdmFsXG59XG5cbi8qKlxuICogRGVsZXRlIGEgcHJvcGVydHkgYW5kIHRyaWdnZXIgY2hhbmdlIGlmIG5lY2Vzc2FyeS5cbiAqL1xuZnVuY3Rpb24gZGVsICh0YXJnZXQsIGtleSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIChpc1VuZGVmKHRhcmdldCkgfHwgaXNQcmltaXRpdmUodGFyZ2V0KSlcbiAgKSB7XG4gICAgd2FybigoXCJDYW5ub3QgZGVsZXRlIHJlYWN0aXZlIHByb3BlcnR5IG9uIHVuZGVmaW5lZCwgbnVsbCwgb3IgcHJpbWl0aXZlIHZhbHVlOiBcIiArICgodGFyZ2V0KSkpKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICBpZiAodGFyZ2V0Ll9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnQXZvaWQgZGVsZXRpbmcgcHJvcGVydGllcyBvbiBhIFZ1ZSBpbnN0YW5jZSBvciBpdHMgcm9vdCAkZGF0YSAnICtcbiAgICAgICctIGp1c3Qgc2V0IGl0IHRvIG51bGwuJ1xuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKCFoYXNPd24odGFyZ2V0LCBrZXkpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZGVsZXRlIHRhcmdldFtrZXldO1xuICBpZiAoIW9iKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgb2IuZGVwLm5vdGlmeSgpO1xufVxuXG4vKipcbiAqIENvbGxlY3QgZGVwZW5kZW5jaWVzIG9uIGFycmF5IGVsZW1lbnRzIHdoZW4gdGhlIGFycmF5IGlzIHRvdWNoZWQsIHNpbmNlXG4gKiB3ZSBjYW5ub3QgaW50ZXJjZXB0IGFycmF5IGVsZW1lbnQgYWNjZXNzIGxpa2UgcHJvcGVydHkgZ2V0dGVycy5cbiAqL1xuZnVuY3Rpb24gZGVwZW5kQXJyYXkgKHZhbHVlKSB7XG4gIGZvciAodmFyIGUgPSAodm9pZCAwKSwgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBlID0gdmFsdWVbaV07XG4gICAgZSAmJiBlLl9fb2JfXyAmJiBlLl9fb2JfXy5kZXAuZGVwZW5kKCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHtcbiAgICAgIGRlcGVuZEFycmF5KGUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBPcHRpb24gb3ZlcndyaXRpbmcgc3RyYXRlZ2llcyBhcmUgZnVuY3Rpb25zIHRoYXQgaGFuZGxlXG4gKiBob3cgdG8gbWVyZ2UgYSBwYXJlbnQgb3B0aW9uIHZhbHVlIGFuZCBhIGNoaWxkIG9wdGlvblxuICogdmFsdWUgaW50byB0aGUgZmluYWwgdmFsdWUuXG4gKi9cbnZhciBzdHJhdHMgPSBjb25maWcub3B0aW9uTWVyZ2VTdHJhdGVnaWVzO1xuXG4vKipcbiAqIE9wdGlvbnMgd2l0aCByZXN0cmljdGlvbnNcbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgc3RyYXRzLmVsID0gc3RyYXRzLnByb3BzRGF0YSA9IGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkLCB2bSwga2V5KSB7XG4gICAgaWYgKCF2bSkge1xuICAgICAgd2FybihcbiAgICAgICAgXCJvcHRpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiIGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIGluc3RhbmNlIFwiICtcbiAgICAgICAgJ2NyZWF0aW9uIHdpdGggdGhlIGBuZXdgIGtleXdvcmQuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRTdHJhdChwYXJlbnQsIGNoaWxkKVxuICB9O1xufVxuXG4vKipcbiAqIEhlbHBlciB0aGF0IHJlY3Vyc2l2ZWx5IG1lcmdlcyB0d28gZGF0YSBvYmplY3RzIHRvZ2V0aGVyLlxuICovXG5mdW5jdGlvbiBtZXJnZURhdGEgKHRvLCBmcm9tKSB7XG4gIGlmICghZnJvbSkgeyByZXR1cm4gdG8gfVxuICB2YXIga2V5LCB0b1ZhbCwgZnJvbVZhbDtcblxuICB2YXIga2V5cyA9IGhhc1N5bWJvbFxuICAgID8gUmVmbGVjdC5vd25LZXlzKGZyb20pXG4gICAgOiBPYmplY3Qua2V5cyhmcm9tKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIC8vIGluIGNhc2UgdGhlIG9iamVjdCBpcyBhbHJlYWR5IG9ic2VydmVkLi4uXG4gICAgaWYgKGtleSA9PT0gJ19fb2JfXycpIHsgY29udGludWUgfVxuICAgIHRvVmFsID0gdG9ba2V5XTtcbiAgICBmcm9tVmFsID0gZnJvbVtrZXldO1xuICAgIGlmICghaGFzT3duKHRvLCBrZXkpKSB7XG4gICAgICBzZXQodG8sIGtleSwgZnJvbVZhbCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRvVmFsICE9PSBmcm9tVmFsICYmXG4gICAgICBpc1BsYWluT2JqZWN0KHRvVmFsKSAmJlxuICAgICAgaXNQbGFpbk9iamVjdChmcm9tVmFsKVxuICAgICkge1xuICAgICAgbWVyZ2VEYXRhKHRvVmFsLCBmcm9tVmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvXG59XG5cbi8qKlxuICogRGF0YVxuICovXG5mdW5jdGlvbiBtZXJnZURhdGFPckZuIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm1cbikge1xuICBpZiAoIXZtKSB7XG4gICAgLy8gaW4gYSBWdWUuZXh0ZW5kIG1lcmdlLCBib3RoIHNob3VsZCBiZSBmdW5jdGlvbnNcbiAgICBpZiAoIWNoaWxkVmFsKSB7XG4gICAgICByZXR1cm4gcGFyZW50VmFsXG4gICAgfVxuICAgIGlmICghcGFyZW50VmFsKSB7XG4gICAgICByZXR1cm4gY2hpbGRWYWxcbiAgICB9XG4gICAgLy8gd2hlbiBwYXJlbnRWYWwgJiBjaGlsZFZhbCBhcmUgYm90aCBwcmVzZW50LFxuICAgIC8vIHdlIG5lZWQgdG8gcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAgIC8vIG1lcmdlZCByZXN1bHQgb2YgYm90aCBmdW5jdGlvbnMuLi4gbm8gbmVlZCB0b1xuICAgIC8vIGNoZWNrIGlmIHBhcmVudFZhbCBpcyBhIGZ1bmN0aW9uIGhlcmUgYmVjYXVzZVxuICAgIC8vIGl0IGhhcyB0byBiZSBhIGZ1bmN0aW9uIHRvIHBhc3MgcHJldmlvdXMgbWVyZ2VzLlxuICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWREYXRhRm4gKCkge1xuICAgICAgcmV0dXJuIG1lcmdlRGF0YShcbiAgICAgICAgdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nID8gY2hpbGRWYWwuY2FsbCh0aGlzLCB0aGlzKSA6IGNoaWxkVmFsLFxuICAgICAgICB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nID8gcGFyZW50VmFsLmNhbGwodGhpcywgdGhpcykgOiBwYXJlbnRWYWxcbiAgICAgIClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZEluc3RhbmNlRGF0YUZuICgpIHtcbiAgICAgIC8vIGluc3RhbmNlIG1lcmdlXG4gICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gY2hpbGRWYWwuY2FsbCh2bSwgdm0pXG4gICAgICAgIDogY2hpbGRWYWw7XG4gICAgICB2YXIgZGVmYXVsdERhdGEgPSB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gcGFyZW50VmFsLmNhbGwodm0sIHZtKVxuICAgICAgICA6IHBhcmVudFZhbDtcbiAgICAgIGlmIChpbnN0YW5jZURhdGEpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlRGF0YShpbnN0YW5jZURhdGEsIGRlZmF1bHREYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHREYXRhXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnN0cmF0cy5kYXRhID0gZnVuY3Rpb24gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bVxuKSB7XG4gIGlmICghdm0pIHtcbiAgICBpZiAoY2hpbGRWYWwgJiYgdHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgICdUaGUgXCJkYXRhXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgK1xuICAgICAgICAndGhhdCByZXR1cm5zIGEgcGVyLWluc3RhbmNlIHZhbHVlIGluIGNvbXBvbmVudCAnICtcbiAgICAgICAgJ2RlZmluaXRpb25zLicsXG4gICAgICAgIHZtXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gcGFyZW50VmFsXG4gICAgfVxuICAgIHJldHVybiBtZXJnZURhdGFPckZuKHBhcmVudFZhbCwgY2hpbGRWYWwpXG4gIH1cblxuICByZXR1cm4gbWVyZ2VEYXRhT3JGbihwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSlcbn07XG5cbi8qKlxuICogSG9va3MgYW5kIHByb3BzIGFyZSBtZXJnZWQgYXMgYXJyYXlzLlxuICovXG5mdW5jdGlvbiBtZXJnZUhvb2sgKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsXG4pIHtcbiAgdmFyIHJlcyA9IGNoaWxkVmFsXG4gICAgPyBwYXJlbnRWYWxcbiAgICAgID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbClcbiAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZFZhbClcbiAgICAgICAgPyBjaGlsZFZhbFxuICAgICAgICA6IFtjaGlsZFZhbF1cbiAgICA6IHBhcmVudFZhbDtcbiAgcmV0dXJuIHJlc1xuICAgID8gZGVkdXBlSG9va3MocmVzKVxuICAgIDogcmVzXG59XG5cbmZ1bmN0aW9uIGRlZHVwZUhvb2tzIChob29rcykge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocmVzLmluZGV4T2YoaG9va3NbaV0pID09PSAtMSkge1xuICAgICAgcmVzLnB1c2goaG9va3NbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkxJRkVDWUNMRV9IT09LUy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gIHN0cmF0c1tob29rXSA9IG1lcmdlSG9vaztcbn0pO1xuXG4vKipcbiAqIEFzc2V0c1xuICpcbiAqIFdoZW4gYSB2bSBpcyBwcmVzZW50IChpbnN0YW5jZSBjcmVhdGlvbiksIHdlIG5lZWQgdG8gZG9cbiAqIGEgdGhyZWUtd2F5IG1lcmdlIGJldHdlZW4gY29uc3RydWN0b3Igb3B0aW9ucywgaW5zdGFuY2VcbiAqIG9wdGlvbnMgYW5kIHBhcmVudCBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBtZXJnZUFzc2V0cyAoXG4gIHBhcmVudFZhbCxcbiAgY2hpbGRWYWwsXG4gIHZtLFxuICBrZXlcbikge1xuICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRWYWwgfHwgbnVsbCk7XG4gIGlmIChjaGlsZFZhbCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgYXNzZXJ0T2JqZWN0VHlwZShrZXksIGNoaWxkVmFsLCB2bSk7XG4gICAgcmV0dXJuIGV4dGVuZChyZXMsIGNoaWxkVmFsKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXNcbiAgfVxufVxuXG5BU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gIHN0cmF0c1t0eXBlICsgJ3MnXSA9IG1lcmdlQXNzZXRzO1xufSk7XG5cbi8qKlxuICogV2F0Y2hlcnMuXG4gKlxuICogV2F0Y2hlcnMgaGFzaGVzIHNob3VsZCBub3Qgb3ZlcndyaXRlIG9uZVxuICogYW5vdGhlciwgc28gd2UgbWVyZ2UgdGhlbSBhcyBhcnJheXMuXG4gKi9cbnN0cmF0cy53YXRjaCA9IGZ1bmN0aW9uIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm0sXG4gIGtleVxuKSB7XG4gIC8vIHdvcmsgYXJvdW5kIEZpcmVmb3gncyBPYmplY3QucHJvdG90eXBlLndhdGNoLi4uXG4gIGlmIChwYXJlbnRWYWwgPT09IG5hdGl2ZVdhdGNoKSB7IHBhcmVudFZhbCA9IHVuZGVmaW5lZDsgfVxuICBpZiAoY2hpbGRWYWwgPT09IG5hdGl2ZVdhdGNoKSB7IGNoaWxkVmFsID0gdW5kZWZpbmVkOyB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIWNoaWxkVmFsKSB7IHJldHVybiBPYmplY3QuY3JlYXRlKHBhcmVudFZhbCB8fCBudWxsKSB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0T2JqZWN0VHlwZShrZXksIGNoaWxkVmFsLCB2bSk7XG4gIH1cbiAgaWYgKCFwYXJlbnRWYWwpIHsgcmV0dXJuIGNoaWxkVmFsIH1cbiAgdmFyIHJldCA9IHt9O1xuICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICBmb3IgKHZhciBrZXkkMSBpbiBjaGlsZFZhbCkge1xuICAgIHZhciBwYXJlbnQgPSByZXRba2V5JDFdO1xuICAgIHZhciBjaGlsZCA9IGNoaWxkVmFsW2tleSQxXTtcbiAgICBpZiAocGFyZW50ICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIHBhcmVudCA9IFtwYXJlbnRdO1xuICAgIH1cbiAgICByZXRba2V5JDFdID0gcGFyZW50XG4gICAgICA/IHBhcmVudC5jb25jYXQoY2hpbGQpXG4gICAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGQpID8gY2hpbGQgOiBbY2hpbGRdO1xuICB9XG4gIHJldHVybiByZXRcbn07XG5cbi8qKlxuICogT3RoZXIgb2JqZWN0IGhhc2hlcy5cbiAqL1xuc3RyYXRzLnByb3BzID1cbnN0cmF0cy5tZXRob2RzID1cbnN0cmF0cy5pbmplY3QgPVxuc3RyYXRzLmNvbXB1dGVkID0gZnVuY3Rpb24gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bSxcbiAga2V5XG4pIHtcbiAgaWYgKGNoaWxkVmFsICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRPYmplY3RUeXBlKGtleSwgY2hpbGRWYWwsIHZtKTtcbiAgfVxuICBpZiAoIXBhcmVudFZhbCkgeyByZXR1cm4gY2hpbGRWYWwgfVxuICB2YXIgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZXh0ZW5kKHJldCwgcGFyZW50VmFsKTtcbiAgaWYgKGNoaWxkVmFsKSB7IGV4dGVuZChyZXQsIGNoaWxkVmFsKTsgfVxuICByZXR1cm4gcmV0XG59O1xuc3RyYXRzLnByb3ZpZGUgPSBtZXJnZURhdGFPckZuO1xuXG4vKipcbiAqIERlZmF1bHQgc3RyYXRlZ3kuXG4gKi9cbnZhciBkZWZhdWx0U3RyYXQgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICByZXR1cm4gY2hpbGRWYWwgPT09IHVuZGVmaW5lZFxuICAgID8gcGFyZW50VmFsXG4gICAgOiBjaGlsZFZhbFxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZSBjb21wb25lbnQgbmFtZXNcbiAqL1xuZnVuY3Rpb24gY2hlY2tDb21wb25lbnRzIChvcHRpb25zKSB7XG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zLmNvbXBvbmVudHMpIHtcbiAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUoa2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbXBvbmVudE5hbWUgKG5hbWUpIHtcbiAgaWYgKCFuZXcgUmVnRXhwKChcIl5bYS16QS1aXVtcXFxcLVxcXFwuMC05X1wiICsgKHVuaWNvZGVSZWdFeHAuc291cmNlKSArIFwiXSokXCIpKS50ZXN0KG5hbWUpKSB7XG4gICAgd2FybihcbiAgICAgICdJbnZhbGlkIGNvbXBvbmVudCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiLiBDb21wb25lbnQgbmFtZXMgJyArXG4gICAgICAnc2hvdWxkIGNvbmZvcm0gdG8gdmFsaWQgY3VzdG9tIGVsZW1lbnQgbmFtZSBpbiBodG1sNSBzcGVjaWZpY2F0aW9uLidcbiAgICApO1xuICB9XG4gIGlmIChpc0J1aWx0SW5UYWcobmFtZSkgfHwgY29uZmlnLmlzUmVzZXJ2ZWRUYWcobmFtZSkpIHtcbiAgICB3YXJuKFxuICAgICAgJ0RvIG5vdCB1c2UgYnVpbHQtaW4gb3IgcmVzZXJ2ZWQgSFRNTCBlbGVtZW50cyBhcyBjb21wb25lbnQgJyArXG4gICAgICAnaWQ6ICcgKyBuYW1lXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIEVuc3VyZSBhbGwgcHJvcHMgb3B0aW9uIHN5bnRheCBhcmUgbm9ybWFsaXplZCBpbnRvIHRoZVxuICogT2JqZWN0LWJhc2VkIGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHMgKG9wdGlvbnMsIHZtKSB7XG4gIHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XG4gIGlmICghcHJvcHMpIHsgcmV0dXJuIH1cbiAgdmFyIHJlcyA9IHt9O1xuICB2YXIgaSwgdmFsLCBuYW1lO1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcykpIHtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHZhbCA9IHByb3BzW2ldO1xuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5hbWUgPSBjYW1lbGl6ZSh2YWwpO1xuICAgICAgICByZXNbbmFtZV0gPSB7IHR5cGU6IG51bGwgfTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB3YXJuKCdwcm9wcyBtdXN0IGJlIHN0cmluZ3Mgd2hlbiB1c2luZyBhcnJheSBzeW50YXguJyk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QocHJvcHMpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgICB2YWwgPSBwcm9wc1trZXldO1xuICAgICAgbmFtZSA9IGNhbWVsaXplKGtleSk7XG4gICAgICByZXNbbmFtZV0gPSBpc1BsYWluT2JqZWN0KHZhbClcbiAgICAgICAgPyB2YWxcbiAgICAgICAgOiB7IHR5cGU6IHZhbCB9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgd2FybihcbiAgICAgIFwiSW52YWxpZCB2YWx1ZSBmb3Igb3B0aW9uIFxcXCJwcm9wc1xcXCI6IGV4cGVjdGVkIGFuIEFycmF5IG9yIGFuIE9iamVjdCwgXCIgK1xuICAgICAgXCJidXQgZ290IFwiICsgKHRvUmF3VHlwZShwcm9wcykpICsgXCIuXCIsXG4gICAgICB2bVxuICAgICk7XG4gIH1cbiAgb3B0aW9ucy5wcm9wcyA9IHJlcztcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgYWxsIGluamVjdGlvbnMgaW50byBPYmplY3QtYmFzZWQgZm9ybWF0XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZUluamVjdCAob3B0aW9ucywgdm0pIHtcbiAgdmFyIGluamVjdCA9IG9wdGlvbnMuaW5qZWN0O1xuICBpZiAoIWluamVjdCkgeyByZXR1cm4gfVxuICB2YXIgbm9ybWFsaXplZCA9IG9wdGlvbnMuaW5qZWN0ID0ge307XG4gIGlmIChBcnJheS5pc0FycmF5KGluamVjdCkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgbm9ybWFsaXplZFtpbmplY3RbaV1dID0geyBmcm9tOiBpbmplY3RbaV0gfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChpbmplY3QpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGluamVjdCkge1xuICAgICAgdmFyIHZhbCA9IGluamVjdFtrZXldO1xuICAgICAgbm9ybWFsaXplZFtrZXldID0gaXNQbGFpbk9iamVjdCh2YWwpXG4gICAgICAgID8gZXh0ZW5kKHsgZnJvbToga2V5IH0sIHZhbClcbiAgICAgICAgOiB7IGZyb206IHZhbCB9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgd2FybihcbiAgICAgIFwiSW52YWxpZCB2YWx1ZSBmb3Igb3B0aW9uIFxcXCJpbmplY3RcXFwiOiBleHBlY3RlZCBhbiBBcnJheSBvciBhbiBPYmplY3QsIFwiICtcbiAgICAgIFwiYnV0IGdvdCBcIiArICh0b1Jhd1R5cGUoaW5qZWN0KSkgKyBcIi5cIixcbiAgICAgIHZtXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSByYXcgZnVuY3Rpb24gZGlyZWN0aXZlcyBpbnRvIG9iamVjdCBmb3JtYXQuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZURpcmVjdGl2ZXMgKG9wdGlvbnMpIHtcbiAgdmFyIGRpcnMgPSBvcHRpb25zLmRpcmVjdGl2ZXM7XG4gIGlmIChkaXJzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRpcnMpIHtcbiAgICAgIHZhciBkZWYkJDEgPSBkaXJzW2tleV07XG4gICAgICBpZiAodHlwZW9mIGRlZiQkMSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBkaXJzW2tleV0gPSB7IGJpbmQ6IGRlZiQkMSwgdXBkYXRlOiBkZWYkJDEgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0T2JqZWN0VHlwZSAobmFtZSwgdmFsdWUsIHZtKSB7XG4gIGlmICghaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICB3YXJuKFxuICAgICAgXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcIlwiICsgbmFtZSArIFwiXFxcIjogZXhwZWN0ZWQgYW4gT2JqZWN0LCBcIiArXG4gICAgICBcImJ1dCBnb3QgXCIgKyAodG9SYXdUeXBlKHZhbHVlKSkgKyBcIi5cIixcbiAgICAgIHZtXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvcHRpb24gb2JqZWN0cyBpbnRvIGEgbmV3IG9uZS5cbiAqIENvcmUgdXRpbGl0eSB1c2VkIGluIGJvdGggaW5zdGFudGlhdGlvbiBhbmQgaW5oZXJpdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyAoXG4gIHBhcmVudCxcbiAgY2hpbGQsXG4gIHZtXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjaGVja0NvbXBvbmVudHMoY2hpbGQpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoaWxkID0gY2hpbGQub3B0aW9ucztcbiAgfVxuXG4gIG5vcm1hbGl6ZVByb3BzKGNoaWxkLCB2bSk7XG4gIG5vcm1hbGl6ZUluamVjdChjaGlsZCwgdm0pO1xuICBub3JtYWxpemVEaXJlY3RpdmVzKGNoaWxkKTtcblxuICAvLyBBcHBseSBleHRlbmRzIGFuZCBtaXhpbnMgb24gdGhlIGNoaWxkIG9wdGlvbnMsXG4gIC8vIGJ1dCBvbmx5IGlmIGl0IGlzIGEgcmF3IG9wdGlvbnMgb2JqZWN0IHRoYXQgaXNuJ3RcbiAgLy8gdGhlIHJlc3VsdCBvZiBhbm90aGVyIG1lcmdlT3B0aW9ucyBjYWxsLlxuICAvLyBPbmx5IG1lcmdlZCBvcHRpb25zIGhhcyB0aGUgX2Jhc2UgcHJvcGVydHkuXG4gIGlmICghY2hpbGQuX2Jhc2UpIHtcbiAgICBpZiAoY2hpbGQuZXh0ZW5kcykge1xuICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQuZXh0ZW5kcywgdm0pO1xuICAgIH1cbiAgICBpZiAoY2hpbGQubWl4aW5zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkLm1peGlucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQubWl4aW5zW2ldLCB2bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gcGFyZW50KSB7XG4gICAgbWVyZ2VGaWVsZChrZXkpO1xuICB9XG4gIGZvciAoa2V5IGluIGNoaWxkKSB7XG4gICAgaWYgKCFoYXNPd24ocGFyZW50LCBrZXkpKSB7XG4gICAgICBtZXJnZUZpZWxkKGtleSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1lcmdlRmllbGQgKGtleSkge1xuICAgIHZhciBzdHJhdCA9IHN0cmF0c1trZXldIHx8IGRlZmF1bHRTdHJhdDtcbiAgICBvcHRpb25zW2tleV0gPSBzdHJhdChwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwgdm0sIGtleSk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnNcbn1cblxuLyoqXG4gKiBSZXNvbHZlIGFuIGFzc2V0LlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGJlY2F1c2UgY2hpbGQgaW5zdGFuY2VzIG5lZWQgYWNjZXNzXG4gKiB0byBhc3NldHMgZGVmaW5lZCBpbiBpdHMgYW5jZXN0b3IgY2hhaW4uXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVBc3NldCAoXG4gIG9wdGlvbnMsXG4gIHR5cGUsXG4gIGlkLFxuICB3YXJuTWlzc2luZ1xuKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBhc3NldHMgPSBvcHRpb25zW3R5cGVdO1xuICAvLyBjaGVjayBsb2NhbCByZWdpc3RyYXRpb24gdmFyaWF0aW9ucyBmaXJzdFxuICBpZiAoaGFzT3duKGFzc2V0cywgaWQpKSB7IHJldHVybiBhc3NldHNbaWRdIH1cbiAgdmFyIGNhbWVsaXplZElkID0gY2FtZWxpemUoaWQpO1xuICBpZiAoaGFzT3duKGFzc2V0cywgY2FtZWxpemVkSWQpKSB7IHJldHVybiBhc3NldHNbY2FtZWxpemVkSWRdIH1cbiAgdmFyIFBhc2NhbENhc2VJZCA9IGNhcGl0YWxpemUoY2FtZWxpemVkSWQpO1xuICBpZiAoaGFzT3duKGFzc2V0cywgUGFzY2FsQ2FzZUlkKSkgeyByZXR1cm4gYXNzZXRzW1Bhc2NhbENhc2VJZF0gfVxuICAvLyBmYWxsYmFjayB0byBwcm90b3R5cGUgY2hhaW5cbiAgdmFyIHJlcyA9IGFzc2V0c1tpZF0gfHwgYXNzZXRzW2NhbWVsaXplZElkXSB8fCBhc3NldHNbUGFzY2FsQ2FzZUlkXTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2Fybk1pc3NpbmcgJiYgIXJlcykge1xuICAgIHdhcm4oXG4gICAgICAnRmFpbGVkIHRvIHJlc29sdmUgJyArIHR5cGUuc2xpY2UoMCwgLTEpICsgJzogJyArIGlkLFxuICAgICAgb3B0aW9uc1xuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcCAoXG4gIGtleSxcbiAgcHJvcE9wdGlvbnMsXG4gIHByb3BzRGF0YSxcbiAgdm1cbikge1xuICB2YXIgcHJvcCA9IHByb3BPcHRpb25zW2tleV07XG4gIHZhciBhYnNlbnQgPSAhaGFzT3duKHByb3BzRGF0YSwga2V5KTtcbiAgdmFyIHZhbHVlID0gcHJvcHNEYXRhW2tleV07XG4gIC8vIGJvb2xlYW4gY2FzdGluZ1xuICB2YXIgYm9vbGVhbkluZGV4ID0gZ2V0VHlwZUluZGV4KEJvb2xlYW4sIHByb3AudHlwZSk7XG4gIGlmIChib29sZWFuSW5kZXggPiAtMSkge1xuICAgIGlmIChhYnNlbnQgJiYgIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgICB2YWx1ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBoeXBoZW5hdGUoa2V5KSkge1xuICAgICAgLy8gb25seSBjYXN0IGVtcHR5IHN0cmluZyAvIHNhbWUgbmFtZSB0byBib29sZWFuIGlmXG4gICAgICAvLyBib29sZWFuIGhhcyBoaWdoZXIgcHJpb3JpdHlcbiAgICAgIHZhciBzdHJpbmdJbmRleCA9IGdldFR5cGVJbmRleChTdHJpbmcsIHByb3AudHlwZSk7XG4gICAgICBpZiAoc3RyaW5nSW5kZXggPCAwIHx8IGJvb2xlYW5JbmRleCA8IHN0cmluZ0luZGV4KSB7XG4gICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gY2hlY2sgZGVmYXVsdCB2YWx1ZVxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhbHVlID0gZ2V0UHJvcERlZmF1bHRWYWx1ZSh2bSwgcHJvcCwga2V5KTtcbiAgICAvLyBzaW5jZSB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBhIGZyZXNoIGNvcHksXG4gICAgLy8gbWFrZSBzdXJlIHRvIG9ic2VydmUgaXQuXG4gICAgdmFyIHByZXZTaG91bGRPYnNlcnZlID0gc2hvdWxkT2JzZXJ2ZTtcbiAgICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG4gICAgb2JzZXJ2ZSh2YWx1ZSk7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKHByZXZTaG91bGRPYnNlcnZlKTtcbiAgfVxuICBpZiAoXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIC8vIHNraXAgdmFsaWRhdGlvbiBmb3Igd2VleCByZWN5Y2xlLWxpc3QgY2hpbGQgY29tcG9uZW50IHByb3BzXG4gICAgIShmYWxzZSlcbiAgKSB7XG4gICAgYXNzZXJ0UHJvcChwcm9wLCBrZXksIHZhbHVlLCB2bSwgYWJzZW50KTtcbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYSBwcm9wLlxuICovXG5mdW5jdGlvbiBnZXRQcm9wRGVmYXVsdFZhbHVlICh2bSwgcHJvcCwga2V5KSB7XG4gIC8vIG5vIGRlZmF1bHQsIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKCFoYXNPd24ocHJvcCwgJ2RlZmF1bHQnKSkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuICB2YXIgZGVmID0gcHJvcC5kZWZhdWx0O1xuICAvLyB3YXJuIGFnYWluc3Qgbm9uLWZhY3RvcnkgZGVmYXVsdHMgZm9yIE9iamVjdCAmIEFycmF5XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGlzT2JqZWN0KGRlZikpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ludmFsaWQgZGVmYXVsdCB2YWx1ZSBmb3IgcHJvcCBcIicgKyBrZXkgKyAnXCI6ICcgK1xuICAgICAgJ1Byb3BzIHdpdGggdHlwZSBPYmplY3QvQXJyYXkgbXVzdCB1c2UgYSBmYWN0b3J5IGZ1bmN0aW9uICcgK1xuICAgICAgJ3RvIHJldHVybiB0aGUgZGVmYXVsdCB2YWx1ZS4nLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIC8vIHRoZSByYXcgcHJvcCB2YWx1ZSB3YXMgYWxzbyB1bmRlZmluZWQgZnJvbSBwcmV2aW91cyByZW5kZXIsXG4gIC8vIHJldHVybiBwcmV2aW91cyBkZWZhdWx0IHZhbHVlIHRvIGF2b2lkIHVubmVjZXNzYXJ5IHdhdGNoZXIgdHJpZ2dlclxuICBpZiAodm0gJiYgdm0uJG9wdGlvbnMucHJvcHNEYXRhICYmXG4gICAgdm0uJG9wdGlvbnMucHJvcHNEYXRhW2tleV0gPT09IHVuZGVmaW5lZCAmJlxuICAgIHZtLl9wcm9wc1trZXldICE9PSB1bmRlZmluZWRcbiAgKSB7XG4gICAgcmV0dXJuIHZtLl9wcm9wc1trZXldXG4gIH1cbiAgLy8gY2FsbCBmYWN0b3J5IGZ1bmN0aW9uIGZvciBub24tRnVuY3Rpb24gdHlwZXNcbiAgLy8gYSB2YWx1ZSBpcyBGdW5jdGlvbiBpZiBpdHMgcHJvdG90eXBlIGlzIGZ1bmN0aW9uIGV2ZW4gYWNyb3NzIGRpZmZlcmVudCBleGVjdXRpb24gY29udGV4dFxuICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJyAmJiBnZXRUeXBlKHByb3AudHlwZSkgIT09ICdGdW5jdGlvbidcbiAgICA/IGRlZi5jYWxsKHZtKVxuICAgIDogZGVmXG59XG5cbi8qKlxuICogQXNzZXJ0IHdoZXRoZXIgYSBwcm9wIGlzIHZhbGlkLlxuICovXG5mdW5jdGlvbiBhc3NlcnRQcm9wIChcbiAgcHJvcCxcbiAgbmFtZSxcbiAgdmFsdWUsXG4gIHZtLFxuICBhYnNlbnRcbikge1xuICBpZiAocHJvcC5yZXF1aXJlZCAmJiBhYnNlbnQpIHtcbiAgICB3YXJuKFxuICAgICAgJ01pc3NpbmcgcmVxdWlyZWQgcHJvcDogXCInICsgbmFtZSArICdcIicsXG4gICAgICB2bVxuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgJiYgIXByb3AucmVxdWlyZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdHlwZSA9IHByb3AudHlwZTtcbiAgdmFyIHZhbGlkID0gIXR5cGUgfHwgdHlwZSA9PT0gdHJ1ZTtcbiAgdmFyIGV4cGVjdGVkVHlwZXMgPSBbXTtcbiAgaWYgKHR5cGUpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodHlwZSkpIHtcbiAgICAgIHR5cGUgPSBbdHlwZV07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZS5sZW5ndGggJiYgIXZhbGlkOyBpKyspIHtcbiAgICAgIHZhciBhc3NlcnRlZFR5cGUgPSBhc3NlcnRUeXBlKHZhbHVlLCB0eXBlW2ldKTtcbiAgICAgIGV4cGVjdGVkVHlwZXMucHVzaChhc3NlcnRlZFR5cGUuZXhwZWN0ZWRUeXBlIHx8ICcnKTtcbiAgICAgIHZhbGlkID0gYXNzZXJ0ZWRUeXBlLnZhbGlkO1xuICAgIH1cbiAgfVxuXG4gIGlmICghdmFsaWQpIHtcbiAgICB3YXJuKFxuICAgICAgZ2V0SW52YWxpZFR5cGVNZXNzYWdlKG5hbWUsIHZhbHVlLCBleHBlY3RlZFR5cGVzKSxcbiAgICAgIHZtXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdmFsaWRhdG9yID0gcHJvcC52YWxpZGF0b3I7XG4gIGlmICh2YWxpZGF0b3IpIHtcbiAgICBpZiAoIXZhbGlkYXRvcih2YWx1ZSkpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdJbnZhbGlkIHByb3A6IGN1c3RvbSB2YWxpZGF0b3IgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFwiJyArIG5hbWUgKyAnXCIuJyxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbnZhciBzaW1wbGVDaGVja1JFID0gL14oU3RyaW5nfE51bWJlcnxCb29sZWFufEZ1bmN0aW9ufFN5bWJvbCkkLztcblxuZnVuY3Rpb24gYXNzZXJ0VHlwZSAodmFsdWUsIHR5cGUpIHtcbiAgdmFyIHZhbGlkO1xuICB2YXIgZXhwZWN0ZWRUeXBlID0gZ2V0VHlwZSh0eXBlKTtcbiAgaWYgKHNpbXBsZUNoZWNrUkUudGVzdChleHBlY3RlZFR5cGUpKSB7XG4gICAgdmFyIHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgdmFsaWQgPSB0ID09PSBleHBlY3RlZFR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAvLyBmb3IgcHJpbWl0aXZlIHdyYXBwZXIgb2JqZWN0c1xuICAgIGlmICghdmFsaWQgJiYgdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09ICdPYmplY3QnKSB7XG4gICAgdmFsaWQgPSBpc1BsYWluT2JqZWN0KHZhbHVlKTtcbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09ICdBcnJheScpIHtcbiAgICB2YWxpZCA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICB9XG4gIHJldHVybiB7XG4gICAgdmFsaWQ6IHZhbGlkLFxuICAgIGV4cGVjdGVkVHlwZTogZXhwZWN0ZWRUeXBlXG4gIH1cbn1cblxuLyoqXG4gKiBVc2UgZnVuY3Rpb24gc3RyaW5nIG5hbWUgdG8gY2hlY2sgYnVpbHQtaW4gdHlwZXMsXG4gKiBiZWNhdXNlIGEgc2ltcGxlIGVxdWFsaXR5IGNoZWNrIHdpbGwgZmFpbCB3aGVuIHJ1bm5pbmdcbiAqIGFjcm9zcyBkaWZmZXJlbnQgdm1zIC8gaWZyYW1lcy5cbiAqL1xuZnVuY3Rpb24gZ2V0VHlwZSAoZm4pIHtcbiAgdmFyIG1hdGNoID0gZm4gJiYgZm4udG9TdHJpbmcoKS5tYXRjaCgvXlxccypmdW5jdGlvbiAoXFx3KykvKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiAnJ1xufVxuXG5mdW5jdGlvbiBpc1NhbWVUeXBlIChhLCBiKSB7XG4gIHJldHVybiBnZXRUeXBlKGEpID09PSBnZXRUeXBlKGIpXG59XG5cbmZ1bmN0aW9uIGdldFR5cGVJbmRleCAodHlwZSwgZXhwZWN0ZWRUeXBlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRUeXBlcykpIHtcbiAgICByZXR1cm4gaXNTYW1lVHlwZShleHBlY3RlZFR5cGVzLCB0eXBlKSA/IDAgOiAtMVxuICB9XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBleHBlY3RlZFR5cGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGlzU2FtZVR5cGUoZXhwZWN0ZWRUeXBlc1tpXSwgdHlwZSkpIHtcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICB9XG4gIHJldHVybiAtMVxufVxuXG5mdW5jdGlvbiBnZXRJbnZhbGlkVHlwZU1lc3NhZ2UgKG5hbWUsIHZhbHVlLCBleHBlY3RlZFR5cGVzKSB7XG4gIHZhciBtZXNzYWdlID0gXCJJbnZhbGlkIHByb3A6IHR5cGUgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIuXCIgK1xuICAgIFwiIEV4cGVjdGVkIFwiICsgKGV4cGVjdGVkVHlwZXMubWFwKGNhcGl0YWxpemUpLmpvaW4oJywgJykpO1xuICB2YXIgZXhwZWN0ZWRUeXBlID0gZXhwZWN0ZWRUeXBlc1swXTtcbiAgdmFyIHJlY2VpdmVkVHlwZSA9IHRvUmF3VHlwZSh2YWx1ZSk7XG4gIHZhciBleHBlY3RlZFZhbHVlID0gc3R5bGVWYWx1ZSh2YWx1ZSwgZXhwZWN0ZWRUeXBlKTtcbiAgdmFyIHJlY2VpdmVkVmFsdWUgPSBzdHlsZVZhbHVlKHZhbHVlLCByZWNlaXZlZFR5cGUpO1xuICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIHNwZWNpZnkgZXhwZWN0ZWQgdmFsdWVcbiAgaWYgKGV4cGVjdGVkVHlwZXMubGVuZ3RoID09PSAxICYmXG4gICAgICBpc0V4cGxpY2FibGUoZXhwZWN0ZWRUeXBlKSAmJlxuICAgICAgIWlzQm9vbGVhbihleHBlY3RlZFR5cGUsIHJlY2VpdmVkVHlwZSkpIHtcbiAgICBtZXNzYWdlICs9IFwiIHdpdGggdmFsdWUgXCIgKyBleHBlY3RlZFZhbHVlO1xuICB9XG4gIG1lc3NhZ2UgKz0gXCIsIGdvdCBcIiArIHJlY2VpdmVkVHlwZSArIFwiIFwiO1xuICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIHNwZWNpZnkgcmVjZWl2ZWQgdmFsdWVcbiAgaWYgKGlzRXhwbGljYWJsZShyZWNlaXZlZFR5cGUpKSB7XG4gICAgbWVzc2FnZSArPSBcIndpdGggdmFsdWUgXCIgKyByZWNlaXZlZFZhbHVlICsgXCIuXCI7XG4gIH1cbiAgcmV0dXJuIG1lc3NhZ2Vcbn1cblxuZnVuY3Rpb24gc3R5bGVWYWx1ZSAodmFsdWUsIHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09ICdTdHJpbmcnKSB7XG4gICAgcmV0dXJuIChcIlxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ051bWJlcicpIHtcbiAgICByZXR1cm4gKFwiXCIgKyAoTnVtYmVyKHZhbHVlKSkpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChcIlwiICsgdmFsdWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFeHBsaWNhYmxlICh2YWx1ZSkge1xuICB2YXIgZXhwbGljaXRUeXBlcyA9IFsnc3RyaW5nJywgJ251bWJlcicsICdib29sZWFuJ107XG4gIHJldHVybiBleHBsaWNpdFR5cGVzLnNvbWUoZnVuY3Rpb24gKGVsZW0pIHsgcmV0dXJuIHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IGVsZW07IH0pXG59XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbiAoKSB7XG4gIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgcmV0dXJuIGFyZ3Muc29tZShmdW5jdGlvbiAoZWxlbSkgeyByZXR1cm4gZWxlbS50b0xvd2VyQ2FzZSgpID09PSAnYm9vbGVhbic7IH0pXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBoYW5kbGVFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICAvLyBEZWFjdGl2YXRlIGRlcHMgdHJhY2tpbmcgd2hpbGUgcHJvY2Vzc2luZyBlcnJvciBoYW5kbGVyIHRvIGF2b2lkIHBvc3NpYmxlIGluZmluaXRlIHJlbmRlcmluZy5cbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVleC9pc3N1ZXMvMTUwNVxuICBwdXNoVGFyZ2V0KCk7XG4gIHRyeSB7XG4gICAgaWYgKHZtKSB7XG4gICAgICB2YXIgY3VyID0gdm07XG4gICAgICB3aGlsZSAoKGN1ciA9IGN1ci4kcGFyZW50KSkge1xuICAgICAgICB2YXIgaG9va3MgPSBjdXIuJG9wdGlvbnMuZXJyb3JDYXB0dXJlZDtcbiAgICAgICAgaWYgKGhvb2tzKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdmFyIGNhcHR1cmUgPSBob29rc1tpXS5jYWxsKGN1ciwgZXJyLCB2bSwgaW5mbykgPT09IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAoY2FwdHVyZSkgeyByZXR1cm4gfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBnbG9iYWxIYW5kbGVFcnJvcihlLCBjdXIsICdlcnJvckNhcHR1cmVkIGhvb2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsSGFuZGxlRXJyb3IoZXJyLCB2bSwgaW5mbyk7XG4gIH0gZmluYWxseSB7XG4gICAgcG9wVGFyZ2V0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW52b2tlV2l0aEVycm9ySGFuZGxpbmcgKFxuICBoYW5kbGVyLFxuICBjb250ZXh0LFxuICBhcmdzLFxuICB2bSxcbiAgaW5mb1xuKSB7XG4gIHZhciByZXM7XG4gIHRyeSB7XG4gICAgcmVzID0gYXJncyA/IGhhbmRsZXIuYXBwbHkoY29udGV4dCwgYXJncykgOiBoYW5kbGVyLmNhbGwoY29udGV4dCk7XG4gICAgaWYgKHJlcyAmJiAhcmVzLl9pc1Z1ZSAmJiBpc1Byb21pc2UocmVzKSAmJiAhcmVzLl9oYW5kbGVkKSB7XG4gICAgICByZXMuY2F0Y2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGUsIHZtLCBpbmZvICsgXCIgKFByb21pc2UvYXN5bmMpXCIpOyB9KTtcbiAgICAgIC8vIGlzc3VlICM5NTExXG4gICAgICAvLyBhdm9pZCBjYXRjaCB0cmlnZ2VyaW5nIG11bHRpcGxlIHRpbWVzIHdoZW4gbmVzdGVkIGNhbGxzXG4gICAgICByZXMuX2hhbmRsZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGhhbmRsZUVycm9yKGUsIHZtLCBpbmZvKTtcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGdsb2JhbEhhbmRsZUVycm9yIChlcnIsIHZtLCBpbmZvKSB7XG4gIGlmIChjb25maWcuZXJyb3JIYW5kbGVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBjb25maWcuZXJyb3JIYW5kbGVyLmNhbGwobnVsbCwgZXJyLCB2bSwgaW5mbylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBpZiB0aGUgdXNlciBpbnRlbnRpb25hbGx5IHRocm93cyB0aGUgb3JpZ2luYWwgZXJyb3IgaW4gdGhlIGhhbmRsZXIsXG4gICAgICAvLyBkbyBub3QgbG9nIGl0IHR3aWNlXG4gICAgICBpZiAoZSAhPT0gZXJyKSB7XG4gICAgICAgIGxvZ0Vycm9yKGUsIG51bGwsICdjb25maWcuZXJyb3JIYW5kbGVyJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxvZ0Vycm9yKGVyciwgdm0sIGluZm8pO1xufVxuXG5mdW5jdGlvbiBsb2dFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHdhcm4oKFwiRXJyb3IgaW4gXCIgKyBpbmZvICsgXCI6IFxcXCJcIiArIChlcnIudG9TdHJpbmcoKSkgKyBcIlxcXCJcIiksIHZtKTtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoKGluQnJvd3NlciB8fCBpbldlZXgpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBlcnJcbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIGNhbGxiYWNrcyA9IFtdO1xudmFyIHBlbmRpbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZmx1c2hDYWxsYmFja3MgKCkge1xuICBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBjb3BpZXMgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gIGNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvcGllc1tpXSgpO1xuICB9XG59XG5cbi8vIEhlcmUgd2UgaGF2ZSBhc3luYyBkZWZlcnJpbmcgd3JhcHBlcnMgdXNpbmcgbWljcm90YXNrcy5cbi8vIEluIDIuNSB3ZSB1c2VkIChtYWNybykgdGFza3MgKGluIGNvbWJpbmF0aW9uIHdpdGggbWljcm90YXNrcykuXG4vLyBIb3dldmVyLCBpdCBoYXMgc3VidGxlIHByb2JsZW1zIHdoZW4gc3RhdGUgaXMgY2hhbmdlZCByaWdodCBiZWZvcmUgcmVwYWludFxuLy8gKGUuZy4gIzY4MTMsIG91dC1pbiB0cmFuc2l0aW9ucykuXG4vLyBBbHNvLCB1c2luZyAobWFjcm8pIHRhc2tzIGluIGV2ZW50IGhhbmRsZXIgd291bGQgY2F1c2Ugc29tZSB3ZWlyZCBiZWhhdmlvcnNcbi8vIHRoYXQgY2Fubm90IGJlIGNpcmN1bXZlbnRlZCAoZS5nLiAjNzEwOSwgIzcxNTMsICM3NTQ2LCAjNzgzNCwgIzgxMDkpLlxuLy8gU28gd2Ugbm93IHVzZSBtaWNyb3Rhc2tzIGV2ZXJ5d2hlcmUsIGFnYWluLlxuLy8gQSBtYWpvciBkcmF3YmFjayBvZiB0aGlzIHRyYWRlb2ZmIGlzIHRoYXQgdGhlcmUgYXJlIHNvbWUgc2NlbmFyaW9zXG4vLyB3aGVyZSBtaWNyb3Rhc2tzIGhhdmUgdG9vIGhpZ2ggYSBwcmlvcml0eSBhbmQgZmlyZSBpbiBiZXR3ZWVuIHN1cHBvc2VkbHlcbi8vIHNlcXVlbnRpYWwgZXZlbnRzIChlLmcuICM0NTIxLCAjNjY5MCwgd2hpY2ggaGF2ZSB3b3JrYXJvdW5kcylcbi8vIG9yIGV2ZW4gYmV0d2VlbiBidWJibGluZyBvZiB0aGUgc2FtZSBldmVudCAoIzY1NjYpLlxudmFyIHRpbWVyRnVuYztcblxuLy8gVGhlIG5leHRUaWNrIGJlaGF2aW9yIGxldmVyYWdlcyB0aGUgbWljcm90YXNrIHF1ZXVlLCB3aGljaCBjYW4gYmUgYWNjZXNzZWRcbi8vIHZpYSBlaXRoZXIgbmF0aXZlIFByb21pc2UudGhlbiBvciBNdXRhdGlvbk9ic2VydmVyLlxuLy8gTXV0YXRpb25PYnNlcnZlciBoYXMgd2lkZXIgc3VwcG9ydCwgaG93ZXZlciBpdCBpcyBzZXJpb3VzbHkgYnVnZ2VkIGluXG4vLyBVSVdlYlZpZXcgaW4gaU9TID49IDkuMy4zIHdoZW4gdHJpZ2dlcmVkIGluIHRvdWNoIGV2ZW50IGhhbmRsZXJzLiBJdFxuLy8gY29tcGxldGVseSBzdG9wcyB3b3JraW5nIGFmdGVyIHRyaWdnZXJpbmcgYSBmZXcgdGltZXMuLi4gc28sIGlmIG5hdGl2ZVxuLy8gUHJvbWlzZSBpcyBhdmFpbGFibGUsIHdlIHdpbGwgdXNlIGl0OlxuLyogaXN0YW5idWwgaWdub3JlIG5leHQsICRmbG93LWRpc2FibGUtbGluZSAqL1xuaWYgKHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShQcm9taXNlKSkge1xuICB2YXIgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcC50aGVuKGZsdXNoQ2FsbGJhY2tzKTtcbiAgICAvLyBJbiBwcm9ibGVtYXRpYyBVSVdlYlZpZXdzLCBQcm9taXNlLnRoZW4gZG9lc24ndCBjb21wbGV0ZWx5IGJyZWFrLCBidXRcbiAgICAvLyBpdCBjYW4gZ2V0IHN0dWNrIGluIGEgd2VpcmQgc3RhdGUgd2hlcmUgY2FsbGJhY2tzIGFyZSBwdXNoZWQgaW50byB0aGVcbiAgICAvLyBtaWNyb3Rhc2sgcXVldWUgYnV0IHRoZSBxdWV1ZSBpc24ndCBiZWluZyBmbHVzaGVkLCB1bnRpbCB0aGUgYnJvd3NlclxuICAgIC8vIG5lZWRzIHRvIGRvIHNvbWUgb3RoZXIgd29yaywgZS5nLiBoYW5kbGUgYSB0aW1lci4gVGhlcmVmb3JlIHdlIGNhblxuICAgIC8vIFwiZm9yY2VcIiB0aGUgbWljcm90YXNrIHF1ZXVlIHRvIGJlIGZsdXNoZWQgYnkgYWRkaW5nIGFuIGVtcHR5IHRpbWVyLlxuICAgIGlmIChpc0lPUykgeyBzZXRUaW1lb3V0KG5vb3ApOyB9XG4gIH07XG59IGVsc2UgaWYgKCFpc0lFICYmIHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJyAmJiAoXG4gIGlzTmF0aXZlKE11dGF0aW9uT2JzZXJ2ZXIpIHx8XG4gIC8vIFBoYW50b21KUyBhbmQgaU9TIDcueFxuICBNdXRhdGlvbk9ic2VydmVyLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE11dGF0aW9uT2JzZXJ2ZXJDb25zdHJ1Y3Rvcl0nXG4pKSB7XG4gIC8vIFVzZSBNdXRhdGlvbk9ic2VydmVyIHdoZXJlIG5hdGl2ZSBQcm9taXNlIGlzIG5vdCBhdmFpbGFibGUsXG4gIC8vIGUuZy4gUGhhbnRvbUpTLCBpT1M3LCBBbmRyb2lkIDQuNFxuICAvLyAoIzY0NjYgTXV0YXRpb25PYnNlcnZlciBpcyB1bnJlbGlhYmxlIGluIElFMTEpXG4gIHZhciBjb3VudGVyID0gMTtcbiAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZmx1c2hDYWxsYmFja3MpO1xuICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoY291bnRlcikpO1xuICBvYnNlcnZlci5vYnNlcnZlKHRleHROb2RlLCB7XG4gICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICB9KTtcbiAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgIGNvdW50ZXIgPSAoY291bnRlciArIDEpICUgMjtcbiAgICB0ZXh0Tm9kZS5kYXRhID0gU3RyaW5nKGNvdW50ZXIpO1xuICB9O1xufSBlbHNlIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShzZXRJbW1lZGlhdGUpKSB7XG4gIC8vIEZhbGxiYWNrIHRvIHNldEltbWVkaWF0ZS5cbiAgLy8gVGVjaG5pY2FsbHkgaXQgbGV2ZXJhZ2VzIHRoZSAobWFjcm8pIHRhc2sgcXVldWUsXG4gIC8vIGJ1dCBpdCBpcyBzdGlsbCBhIGJldHRlciBjaG9pY2UgdGhhbiBzZXRUaW1lb3V0LlxuICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0SW1tZWRpYXRlKGZsdXNoQ2FsbGJhY2tzKTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIEZhbGxiYWNrIHRvIHNldFRpbWVvdXQuXG4gIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KGZsdXNoQ2FsbGJhY2tzLCAwKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbmV4dFRpY2sgKGNiLCBjdHgpIHtcbiAgdmFyIF9yZXNvbHZlO1xuICBjYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNiKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjYi5jYWxsKGN0eCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGUsIGN0eCwgJ25leHRUaWNrJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChfcmVzb2x2ZSkge1xuICAgICAgX3Jlc29sdmUoY3R4KTtcbiAgICB9XG4gIH0pO1xuICBpZiAoIXBlbmRpbmcpIHtcbiAgICBwZW5kaW5nID0gdHJ1ZTtcbiAgICB0aW1lckZ1bmMoKTtcbiAgfVxuICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgaWYgKCFjYiAmJiB0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB9KVxuICB9XG59XG5cbi8qICAqL1xuXG4vKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGggUHJveHkgKi9cblxudmFyIGluaXRQcm94eTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGFsbG93ZWRHbG9iYWxzID0gbWFrZU1hcChcbiAgICAnSW5maW5pdHksdW5kZWZpbmVkLE5hTixpc0Zpbml0ZSxpc05hTiwnICtcbiAgICAncGFyc2VGbG9hdCxwYXJzZUludCxkZWNvZGVVUkksZGVjb2RlVVJJQ29tcG9uZW50LGVuY29kZVVSSSxlbmNvZGVVUklDb21wb25lbnQsJyArXG4gICAgJ01hdGgsTnVtYmVyLERhdGUsQXJyYXksT2JqZWN0LEJvb2xlYW4sU3RyaW5nLFJlZ0V4cCxNYXAsU2V0LEpTT04sSW50bCwnICtcbiAgICAncmVxdWlyZScgLy8gZm9yIFdlYnBhY2svQnJvd3NlcmlmeVxuICApO1xuXG4gIHZhciB3YXJuTm9uUHJlc2VudCA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSkge1xuICAgIHdhcm4oXG4gICAgICBcIlByb3BlcnR5IG9yIG1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgbm90IGRlZmluZWQgb24gdGhlIGluc3RhbmNlIGJ1dCBcIiArXG4gICAgICAncmVmZXJlbmNlZCBkdXJpbmcgcmVuZGVyLiBNYWtlIHN1cmUgdGhhdCB0aGlzIHByb3BlcnR5IGlzIHJlYWN0aXZlLCAnICtcbiAgICAgICdlaXRoZXIgaW4gdGhlIGRhdGEgb3B0aW9uLCBvciBmb3IgY2xhc3MtYmFzZWQgY29tcG9uZW50cywgYnkgJyArXG4gICAgICAnaW5pdGlhbGl6aW5nIHRoZSBwcm9wZXJ0eS4gJyArXG4gICAgICAnU2VlOiBodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9yZWFjdGl2aXR5Lmh0bWwjRGVjbGFyaW5nLVJlYWN0aXZlLVByb3BlcnRpZXMuJyxcbiAgICAgIHRhcmdldFxuICAgICk7XG4gIH07XG5cbiAgdmFyIHdhcm5SZXNlcnZlZFByZWZpeCA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSkge1xuICAgIHdhcm4oXG4gICAgICBcIlByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBtdXN0IGJlIGFjY2Vzc2VkIHdpdGggXFxcIiRkYXRhLlwiICsga2V5ICsgXCJcXFwiIGJlY2F1c2UgXCIgK1xuICAgICAgJ3Byb3BlcnRpZXMgc3RhcnRpbmcgd2l0aCBcIiRcIiBvciBcIl9cIiBhcmUgbm90IHByb3hpZWQgaW4gdGhlIFZ1ZSBpbnN0YW5jZSB0byAnICtcbiAgICAgICdwcmV2ZW50IGNvbmZsaWN0cyB3aXRoIFZ1ZSBpbnRlcm5hbHMuICcgK1xuICAgICAgJ1NlZTogaHR0cHM6Ly92dWVqcy5vcmcvdjIvYXBpLyNkYXRhJyxcbiAgICAgIHRhcmdldFxuICAgICk7XG4gIH07XG5cbiAgdmFyIGhhc1Byb3h5ID1cbiAgICB0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKFByb3h5KTtcblxuICBpZiAoaGFzUHJveHkpIHtcbiAgICB2YXIgaXNCdWlsdEluTW9kaWZpZXIgPSBtYWtlTWFwKCdzdG9wLHByZXZlbnQsc2VsZixjdHJsLHNoaWZ0LGFsdCxtZXRhLGV4YWN0Jyk7XG4gICAgY29uZmlnLmtleUNvZGVzID0gbmV3IFByb3h5KGNvbmZpZy5rZXlDb2Rlcywge1xuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQgKHRhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoaXNCdWlsdEluTW9kaWZpZXIoa2V5KSkge1xuICAgICAgICAgIHdhcm4oKFwiQXZvaWQgb3ZlcndyaXRpbmcgYnVpbHQtaW4gbW9kaWZpZXIgaW4gY29uZmlnLmtleUNvZGVzOiAuXCIgKyBrZXkpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhciBoYXNIYW5kbGVyID0ge1xuICAgIGhhczogZnVuY3Rpb24gaGFzICh0YXJnZXQsIGtleSkge1xuICAgICAgdmFyIGhhcyA9IGtleSBpbiB0YXJnZXQ7XG4gICAgICB2YXIgaXNBbGxvd2VkID0gYWxsb3dlZEdsb2JhbHMoa2V5KSB8fFxuICAgICAgICAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5LmNoYXJBdCgwKSA9PT0gJ18nICYmICEoa2V5IGluIHRhcmdldC4kZGF0YSkpO1xuICAgICAgaWYgKCFoYXMgJiYgIWlzQWxsb3dlZCkge1xuICAgICAgICBpZiAoa2V5IGluIHRhcmdldC4kZGF0YSkgeyB3YXJuUmVzZXJ2ZWRQcmVmaXgodGFyZ2V0LCBrZXkpOyB9XG4gICAgICAgIGVsc2UgeyB3YXJuTm9uUHJlc2VudCh0YXJnZXQsIGtleSk7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXMgfHwgIWlzQWxsb3dlZFxuICAgIH1cbiAgfTtcblxuICB2YXIgZ2V0SGFuZGxlciA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCAodGFyZ2V0LCBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiAhKGtleSBpbiB0YXJnZXQpKSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGFyZ2V0LiRkYXRhKSB7IHdhcm5SZXNlcnZlZFByZWZpeCh0YXJnZXQsIGtleSk7IH1cbiAgICAgICAgZWxzZSB7IHdhcm5Ob25QcmVzZW50KHRhcmdldCwga2V5KTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRhcmdldFtrZXldXG4gICAgfVxuICB9O1xuXG4gIGluaXRQcm94eSA9IGZ1bmN0aW9uIGluaXRQcm94eSAodm0pIHtcbiAgICBpZiAoaGFzUHJveHkpIHtcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBwcm94eSBoYW5kbGVyIHRvIHVzZVxuICAgICAgdmFyIG9wdGlvbnMgPSB2bS4kb3B0aW9ucztcbiAgICAgIHZhciBoYW5kbGVycyA9IG9wdGlvbnMucmVuZGVyICYmIG9wdGlvbnMucmVuZGVyLl93aXRoU3RyaXBwZWRcbiAgICAgICAgPyBnZXRIYW5kbGVyXG4gICAgICAgIDogaGFzSGFuZGxlcjtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IG5ldyBQcm94eSh2bSwgaGFuZGxlcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2bS5fcmVuZGVyUHJveHkgPSB2bTtcbiAgICB9XG4gIH07XG59XG5cbi8qICAqL1xuXG52YXIgc2Vlbk9iamVjdHMgPSBuZXcgX1NldCgpO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlIGFuIG9iamVjdCB0byBldm9rZSBhbGwgY29udmVydGVkXG4gKiBnZXR0ZXJzLCBzbyB0aGF0IGV2ZXJ5IG5lc3RlZCBwcm9wZXJ0eSBpbnNpZGUgdGhlIG9iamVjdFxuICogaXMgY29sbGVjdGVkIGFzIGEgXCJkZWVwXCIgZGVwZW5kZW5jeS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2UgKHZhbCkge1xuICBfdHJhdmVyc2UodmFsLCBzZWVuT2JqZWN0cyk7XG4gIHNlZW5PYmplY3RzLmNsZWFyKCk7XG59XG5cbmZ1bmN0aW9uIF90cmF2ZXJzZSAodmFsLCBzZWVuKSB7XG4gIHZhciBpLCBrZXlzO1xuICB2YXIgaXNBID0gQXJyYXkuaXNBcnJheSh2YWwpO1xuICBpZiAoKCFpc0EgJiYgIWlzT2JqZWN0KHZhbCkpIHx8IE9iamVjdC5pc0Zyb3plbih2YWwpIHx8IHZhbCBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZhbC5fX29iX18pIHtcbiAgICB2YXIgZGVwSWQgPSB2YWwuX19vYl9fLmRlcC5pZDtcbiAgICBpZiAoc2Vlbi5oYXMoZGVwSWQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc2Vlbi5hZGQoZGVwSWQpO1xuICB9XG4gIGlmIChpc0EpIHtcbiAgICBpID0gdmFsLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7IF90cmF2ZXJzZSh2YWxbaV0sIHNlZW4pOyB9XG4gIH0gZWxzZSB7XG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgaSA9IGtleXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHsgX3RyYXZlcnNlKHZhbFtrZXlzW2ldXSwgc2Vlbik7IH1cbiAgfVxufVxuXG52YXIgbWFyaztcbnZhciBtZWFzdXJlO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcGVyZiA9IGluQnJvd3NlciAmJiB3aW5kb3cucGVyZm9ybWFuY2U7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoXG4gICAgcGVyZiAmJlxuICAgIHBlcmYubWFyayAmJlxuICAgIHBlcmYubWVhc3VyZSAmJlxuICAgIHBlcmYuY2xlYXJNYXJrcyAmJlxuICAgIHBlcmYuY2xlYXJNZWFzdXJlc1xuICApIHtcbiAgICBtYXJrID0gZnVuY3Rpb24gKHRhZykgeyByZXR1cm4gcGVyZi5tYXJrKHRhZyk7IH07XG4gICAgbWVhc3VyZSA9IGZ1bmN0aW9uIChuYW1lLCBzdGFydFRhZywgZW5kVGFnKSB7XG4gICAgICBwZXJmLm1lYXN1cmUobmFtZSwgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgICBwZXJmLmNsZWFyTWFya3Moc3RhcnRUYWcpO1xuICAgICAgcGVyZi5jbGVhck1hcmtzKGVuZFRhZyk7XG4gICAgICAvLyBwZXJmLmNsZWFyTWVhc3VyZXMobmFtZSlcbiAgICB9O1xuICB9XG59XG5cbi8qICAqL1xuXG52YXIgbm9ybWFsaXplRXZlbnQgPSBjYWNoZWQoZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIHBhc3NpdmUgPSBuYW1lLmNoYXJBdCgwKSA9PT0gJyYnO1xuICBuYW1lID0gcGFzc2l2ZSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICB2YXIgb25jZSQkMSA9IG5hbWUuY2hhckF0KDApID09PSAnfic7IC8vIFByZWZpeGVkIGxhc3QsIGNoZWNrZWQgZmlyc3RcbiAgbmFtZSA9IG9uY2UkJDEgPyBuYW1lLnNsaWNlKDEpIDogbmFtZTtcbiAgdmFyIGNhcHR1cmUgPSBuYW1lLmNoYXJBdCgwKSA9PT0gJyEnO1xuICBuYW1lID0gY2FwdHVyZSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgb25jZTogb25jZSQkMSxcbiAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgIHBhc3NpdmU6IHBhc3NpdmVcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZuSW52b2tlciAoZm5zLCB2bSkge1xuICBmdW5jdGlvbiBpbnZva2VyICgpIHtcbiAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cbiAgICB2YXIgZm5zID0gaW52b2tlci5mbnM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZm5zKSkge1xuICAgICAgdmFyIGNsb25lZCA9IGZucy5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoY2xvbmVkW2ldLCBudWxsLCBhcmd1bWVudHMkMSwgdm0sIFwidi1vbiBoYW5kbGVyXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZXR1cm4gaGFuZGxlciByZXR1cm4gdmFsdWUgZm9yIHNpbmdsZSBoYW5kbGVyc1xuICAgICAgcmV0dXJuIGludm9rZVdpdGhFcnJvckhhbmRsaW5nKGZucywgbnVsbCwgYXJndW1lbnRzLCB2bSwgXCJ2LW9uIGhhbmRsZXJcIilcbiAgICB9XG4gIH1cbiAgaW52b2tlci5mbnMgPSBmbnM7XG4gIHJldHVybiBpbnZva2VyXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3RlbmVycyAoXG4gIG9uLFxuICBvbGRPbixcbiAgYWRkLFxuICByZW1vdmUkJDEsXG4gIGNyZWF0ZU9uY2VIYW5kbGVyLFxuICB2bVxuKSB7XG4gIHZhciBuYW1lLCBkZWYkJDEsIGN1ciwgb2xkLCBldmVudDtcbiAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgZGVmJCQxID0gY3VyID0gb25bbmFtZV07XG4gICAgb2xkID0gb2xkT25bbmFtZV07XG4gICAgZXZlbnQgPSBub3JtYWxpemVFdmVudChuYW1lKTtcbiAgICBpZiAoaXNVbmRlZihjdXIpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIFwiSW52YWxpZCBoYW5kbGVyIGZvciBldmVudCBcXFwiXCIgKyAoZXZlbnQubmFtZSkgKyBcIlxcXCI6IGdvdCBcIiArIFN0cmluZyhjdXIpLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzVW5kZWYob2xkKSkge1xuICAgICAgaWYgKGlzVW5kZWYoY3VyLmZucykpIHtcbiAgICAgICAgY3VyID0gb25bbmFtZV0gPSBjcmVhdGVGbkludm9rZXIoY3VyLCB2bSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNUcnVlKGV2ZW50Lm9uY2UpKSB7XG4gICAgICAgIGN1ciA9IG9uW25hbWVdID0gY3JlYXRlT25jZUhhbmRsZXIoZXZlbnQubmFtZSwgY3VyLCBldmVudC5jYXB0dXJlKTtcbiAgICAgIH1cbiAgICAgIGFkZChldmVudC5uYW1lLCBjdXIsIGV2ZW50LmNhcHR1cmUsIGV2ZW50LnBhc3NpdmUsIGV2ZW50LnBhcmFtcyk7XG4gICAgfSBlbHNlIGlmIChjdXIgIT09IG9sZCkge1xuICAgICAgb2xkLmZucyA9IGN1cjtcbiAgICAgIG9uW25hbWVdID0gb2xkO1xuICAgIH1cbiAgfVxuICBmb3IgKG5hbWUgaW4gb2xkT24pIHtcbiAgICBpZiAoaXNVbmRlZihvbltuYW1lXSkpIHtcbiAgICAgIGV2ZW50ID0gbm9ybWFsaXplRXZlbnQobmFtZSk7XG4gICAgICByZW1vdmUkJDEoZXZlbnQubmFtZSwgb2xkT25bbmFtZV0sIGV2ZW50LmNhcHR1cmUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyogICovXG5cbi8vIGZpeGVkIGJ5IHh4eHh4eCAobXAgcHJvcGVydGllcylcclxuZnVuY3Rpb24gZXh0cmFjdFByb3BlcnRpZXNGcm9tVk5vZGVEYXRhKGRhdGEsIEN0b3IsIHJlcywgY29udGV4dCkge1xyXG4gIHZhciBwcm9wT3B0aW9ucyA9IEN0b3Iub3B0aW9ucy5tcE9wdGlvbnMgJiYgQ3Rvci5vcHRpb25zLm1wT3B0aW9ucy5wcm9wZXJ0aWVzO1xyXG4gIGlmIChpc1VuZGVmKHByb3BPcHRpb25zKSkge1xyXG4gICAgcmV0dXJuIHJlc1xyXG4gIH1cbiAgdmFyIGV4dGVybmFsQ2xhc3NlcyA9IEN0b3Iub3B0aW9ucy5tcE9wdGlvbnMuZXh0ZXJuYWxDbGFzc2VzIHx8IFtdO1xyXG4gIHZhciBhdHRycyA9IGRhdGEuYXR0cnM7XG4gIHZhciBwcm9wcyA9IGRhdGEucHJvcHM7XHJcbiAgaWYgKGlzRGVmKGF0dHJzKSB8fCBpc0RlZihwcm9wcykpIHtcclxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wT3B0aW9ucykge1xyXG4gICAgICB2YXIgYWx0S2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICB2YXIgcmVzdWx0ID0gY2hlY2tQcm9wKHJlcywgcHJvcHMsIGtleSwgYWx0S2V5LCB0cnVlKSB8fFxuICAgICAgICAgIGNoZWNrUHJvcChyZXMsIGF0dHJzLCBrZXksIGFsdEtleSwgZmFsc2UpO1xuICAgICAgLy8gZXh0ZXJuYWxDbGFzc1xuICAgICAgaWYgKFxuICAgICAgICByZXN1bHQgJiZcbiAgICAgICAgcmVzW2tleV0gJiZcbiAgICAgICAgZXh0ZXJuYWxDbGFzc2VzLmluZGV4T2YoYWx0S2V5KSAhPT0gLTEgJiZcbiAgICAgICAgY29udGV4dFtjYW1lbGl6ZShyZXNba2V5XSldXG4gICAgICApIHtcbiAgICAgICAgLy8g6LWL5YC8IGV4dGVybmFsQ2xhc3Mg55yf5q2j55qE5YC8KOaooeadv+mHjCBleHRlcm5hbENsYXNzIOeahOWAvOWPr+iDveaYr+Wtl+espuS4silcbiAgICAgICAgcmVzW2tleV0gPSBjb250ZXh0W2NhbWVsaXplKHJlc1trZXldKV07XG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXNcclxufVxuXG5mdW5jdGlvbiBleHRyYWN0UHJvcHNGcm9tVk5vZGVEYXRhIChcbiAgZGF0YSxcbiAgQ3RvcixcbiAgdGFnLFxuICBjb250ZXh0Ly8gZml4ZWQgYnkgeHh4eHh4XG4pIHtcbiAgLy8gd2UgYXJlIG9ubHkgZXh0cmFjdGluZyByYXcgdmFsdWVzIGhlcmUuXG4gIC8vIHZhbGlkYXRpb24gYW5kIGRlZmF1bHQgdmFsdWVzIGFyZSBoYW5kbGVkIGluIHRoZSBjaGlsZFxuICAvLyBjb21wb25lbnQgaXRzZWxmLlxuICB2YXIgcHJvcE9wdGlvbnMgPSBDdG9yLm9wdGlvbnMucHJvcHM7XG4gIGlmIChpc1VuZGVmKHByb3BPcHRpb25zKSkge1xuICAgIC8vIGZpeGVkIGJ5IHh4eHh4eFxuICAgIHJldHVybiBleHRyYWN0UHJvcGVydGllc0Zyb21WTm9kZURhdGEoZGF0YSwgQ3Rvciwge30sIGNvbnRleHQpXG4gIH1cbiAgdmFyIHJlcyA9IHt9O1xuICB2YXIgYXR0cnMgPSBkYXRhLmF0dHJzO1xuICB2YXIgcHJvcHMgPSBkYXRhLnByb3BzO1xuICBpZiAoaXNEZWYoYXR0cnMpIHx8IGlzRGVmKHByb3BzKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBwcm9wT3B0aW9ucykge1xuICAgICAgdmFyIGFsdEtleSA9IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdmFyIGtleUluTG93ZXJDYXNlID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBrZXkgIT09IGtleUluTG93ZXJDYXNlICYmXG4gICAgICAgICAgYXR0cnMgJiYgaGFzT3duKGF0dHJzLCBrZXlJbkxvd2VyQ2FzZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGlwKFxuICAgICAgICAgICAgXCJQcm9wIFxcXCJcIiArIGtleUluTG93ZXJDYXNlICsgXCJcXFwiIGlzIHBhc3NlZCB0byBjb21wb25lbnQgXCIgK1xuICAgICAgICAgICAgKGZvcm1hdENvbXBvbmVudE5hbWUodGFnIHx8IEN0b3IpKSArIFwiLCBidXQgdGhlIGRlY2xhcmVkIHByb3AgbmFtZSBpc1wiICtcbiAgICAgICAgICAgIFwiIFxcXCJcIiArIGtleSArIFwiXFxcIi4gXCIgK1xuICAgICAgICAgICAgXCJOb3RlIHRoYXQgSFRNTCBhdHRyaWJ1dGVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlIGFuZCBjYW1lbENhc2VkIFwiICtcbiAgICAgICAgICAgIFwicHJvcHMgbmVlZCB0byB1c2UgdGhlaXIga2ViYWItY2FzZSBlcXVpdmFsZW50cyB3aGVuIHVzaW5nIGluLURPTSBcIiArXG4gICAgICAgICAgICBcInRlbXBsYXRlcy4gWW91IHNob3VsZCBwcm9iYWJseSB1c2UgXFxcIlwiICsgYWx0S2V5ICsgXCJcXFwiIGluc3RlYWQgb2YgXFxcIlwiICsga2V5ICsgXCJcXFwiLlwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2hlY2tQcm9wKHJlcywgcHJvcHMsIGtleSwgYWx0S2V5LCB0cnVlKSB8fFxuICAgICAgY2hlY2tQcm9wKHJlcywgYXR0cnMsIGtleSwgYWx0S2V5LCBmYWxzZSk7XG4gICAgfVxuICB9XG4gIC8vIGZpeGVkIGJ5IHh4eHh4eFxuICByZXR1cm4gZXh0cmFjdFByb3BlcnRpZXNGcm9tVk5vZGVEYXRhKGRhdGEsIEN0b3IsIHJlcywgY29udGV4dClcbn1cblxuZnVuY3Rpb24gY2hlY2tQcm9wIChcbiAgcmVzLFxuICBoYXNoLFxuICBrZXksXG4gIGFsdEtleSxcbiAgcHJlc2VydmVcbikge1xuICBpZiAoaXNEZWYoaGFzaCkpIHtcbiAgICBpZiAoaGFzT3duKGhhc2gsIGtleSkpIHtcbiAgICAgIHJlc1trZXldID0gaGFzaFtrZXldO1xuICAgICAgaWYgKCFwcmVzZXJ2ZSkge1xuICAgICAgICBkZWxldGUgaGFzaFtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2UgaWYgKGhhc093bihoYXNoLCBhbHRLZXkpKSB7XG4gICAgICByZXNba2V5XSA9IGhhc2hbYWx0S2V5XTtcbiAgICAgIGlmICghcHJlc2VydmUpIHtcbiAgICAgICAgZGVsZXRlIGhhc2hbYWx0S2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKiAgKi9cblxuLy8gVGhlIHRlbXBsYXRlIGNvbXBpbGVyIGF0dGVtcHRzIHRvIG1pbmltaXplIHRoZSBuZWVkIGZvciBub3JtYWxpemF0aW9uIGJ5XG4vLyBzdGF0aWNhbGx5IGFuYWx5emluZyB0aGUgdGVtcGxhdGUgYXQgY29tcGlsZSB0aW1lLlxuLy9cbi8vIEZvciBwbGFpbiBIVE1MIG1hcmt1cCwgbm9ybWFsaXphdGlvbiBjYW4gYmUgY29tcGxldGVseSBza2lwcGVkIGJlY2F1c2UgdGhlXG4vLyBnZW5lcmF0ZWQgcmVuZGVyIGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gcmV0dXJuIEFycmF5PFZOb2RlPi4gVGhlcmUgYXJlXG4vLyB0d28gY2FzZXMgd2hlcmUgZXh0cmEgbm9ybWFsaXphdGlvbiBpcyBuZWVkZWQ6XG5cbi8vIDEuIFdoZW4gdGhlIGNoaWxkcmVuIGNvbnRhaW5zIGNvbXBvbmVudHMgLSBiZWNhdXNlIGEgZnVuY3Rpb25hbCBjb21wb25lbnRcbi8vIG1heSByZXR1cm4gYW4gQXJyYXkgaW5zdGVhZCBvZiBhIHNpbmdsZSByb290LiBJbiB0aGlzIGNhc2UsIGp1c3QgYSBzaW1wbGVcbi8vIG5vcm1hbGl6YXRpb24gaXMgbmVlZGVkIC0gaWYgYW55IGNoaWxkIGlzIGFuIEFycmF5LCB3ZSBmbGF0dGVuIHRoZSB3aG9sZVxuLy8gdGhpbmcgd2l0aCBBcnJheS5wcm90b3R5cGUuY29uY2F0LiBJdCBpcyBndWFyYW50ZWVkIHRvIGJlIG9ubHkgMS1sZXZlbCBkZWVwXG4vLyBiZWNhdXNlIGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhbHJlYWR5IG5vcm1hbGl6ZSB0aGVpciBvd24gY2hpbGRyZW4uXG5mdW5jdGlvbiBzaW1wbGVOb3JtYWxpemVDaGlsZHJlbiAoY2hpbGRyZW4pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuW2ldKSkge1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGNoaWxkcmVuKVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2hpbGRyZW5cbn1cblxuLy8gMi4gV2hlbiB0aGUgY2hpbGRyZW4gY29udGFpbnMgY29uc3RydWN0cyB0aGF0IGFsd2F5cyBnZW5lcmF0ZWQgbmVzdGVkIEFycmF5cyxcbi8vIGUuZy4gPHRlbXBsYXRlPiwgPHNsb3Q+LCB2LWZvciwgb3Igd2hlbiB0aGUgY2hpbGRyZW4gaXMgcHJvdmlkZWQgYnkgdXNlclxuLy8gd2l0aCBoYW5kLXdyaXR0ZW4gcmVuZGVyIGZ1bmN0aW9ucyAvIEpTWC4gSW4gc3VjaCBjYXNlcyBhIGZ1bGwgbm9ybWFsaXphdGlvblxuLy8gaXMgbmVlZGVkIHRvIGNhdGVyIHRvIGFsbCBwb3NzaWJsZSB0eXBlcyBvZiBjaGlsZHJlbiB2YWx1ZXMuXG5mdW5jdGlvbiBub3JtYWxpemVDaGlsZHJlbiAoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIGlzUHJpbWl0aXZlKGNoaWxkcmVuKVxuICAgID8gW2NyZWF0ZVRleHRWTm9kZShjaGlsZHJlbildXG4gICAgOiBBcnJheS5pc0FycmF5KGNoaWxkcmVuKVxuICAgICAgPyBub3JtYWxpemVBcnJheUNoaWxkcmVuKGNoaWxkcmVuKVxuICAgICAgOiB1bmRlZmluZWRcbn1cblxuZnVuY3Rpb24gaXNUZXh0Tm9kZSAobm9kZSkge1xuICByZXR1cm4gaXNEZWYobm9kZSkgJiYgaXNEZWYobm9kZS50ZXh0KSAmJiBpc0ZhbHNlKG5vZGUuaXNDb21tZW50KVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheUNoaWxkcmVuIChjaGlsZHJlbiwgbmVzdGVkSW5kZXgpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICB2YXIgaSwgYywgbGFzdEluZGV4LCBsYXN0O1xuICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gY2hpbGRyZW5baV07XG4gICAgaWYgKGlzVW5kZWYoYykgfHwgdHlwZW9mIGMgPT09ICdib29sZWFuJykgeyBjb250aW51ZSB9XG4gICAgbGFzdEluZGV4ID0gcmVzLmxlbmd0aCAtIDE7XG4gICAgbGFzdCA9IHJlc1tsYXN0SW5kZXhdO1xuICAgIC8vICBuZXN0ZWRcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjKSkge1xuICAgICAgaWYgKGMubGVuZ3RoID4gMCkge1xuICAgICAgICBjID0gbm9ybWFsaXplQXJyYXlDaGlsZHJlbihjLCAoKG5lc3RlZEluZGV4IHx8ICcnKSArIFwiX1wiICsgaSkpO1xuICAgICAgICAvLyBtZXJnZSBhZGphY2VudCB0ZXh0IG5vZGVzXG4gICAgICAgIGlmIChpc1RleHROb2RlKGNbMF0pICYmIGlzVGV4dE5vZGUobGFzdCkpIHtcbiAgICAgICAgICByZXNbbGFzdEluZGV4XSA9IGNyZWF0ZVRleHRWTm9kZShsYXN0LnRleHQgKyAoY1swXSkudGV4dCk7XG4gICAgICAgICAgYy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoLmFwcGx5KHJlcywgYyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1ByaW1pdGl2ZShjKSkge1xuICAgICAgaWYgKGlzVGV4dE5vZGUobGFzdCkpIHtcbiAgICAgICAgLy8gbWVyZ2UgYWRqYWNlbnQgdGV4dCBub2Rlc1xuICAgICAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSBmb3IgU1NSIGh5ZHJhdGlvbiBiZWNhdXNlIHRleHQgbm9kZXMgYXJlXG4gICAgICAgIC8vIGVzc2VudGlhbGx5IG1lcmdlZCB3aGVuIHJlbmRlcmVkIHRvIEhUTUwgc3RyaW5nc1xuICAgICAgICByZXNbbGFzdEluZGV4XSA9IGNyZWF0ZVRleHRWTm9kZShsYXN0LnRleHQgKyBjKTtcbiAgICAgIH0gZWxzZSBpZiAoYyAhPT0gJycpIHtcbiAgICAgICAgLy8gY29udmVydCBwcmltaXRpdmUgdG8gdm5vZGVcbiAgICAgICAgcmVzLnB1c2goY3JlYXRlVGV4dFZOb2RlKGMpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzVGV4dE5vZGUoYykgJiYgaXNUZXh0Tm9kZShsYXN0KSkge1xuICAgICAgICAvLyBtZXJnZSBhZGphY2VudCB0ZXh0IG5vZGVzXG4gICAgICAgIHJlc1tsYXN0SW5kZXhdID0gY3JlYXRlVGV4dFZOb2RlKGxhc3QudGV4dCArIGMudGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWZhdWx0IGtleSBmb3IgbmVzdGVkIGFycmF5IGNoaWxkcmVuIChsaWtlbHkgZ2VuZXJhdGVkIGJ5IHYtZm9yKVxuICAgICAgICBpZiAoaXNUcnVlKGNoaWxkcmVuLl9pc1ZMaXN0KSAmJlxuICAgICAgICAgIGlzRGVmKGMudGFnKSAmJlxuICAgICAgICAgIGlzVW5kZWYoYy5rZXkpICYmXG4gICAgICAgICAgaXNEZWYobmVzdGVkSW5kZXgpKSB7XG4gICAgICAgICAgYy5rZXkgPSBcIl9fdmxpc3RcIiArIG5lc3RlZEluZGV4ICsgXCJfXCIgKyBpICsgXCJfX1wiO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoKGMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0UHJvdmlkZSAodm0pIHtcbiAgdmFyIHByb3ZpZGUgPSB2bS4kb3B0aW9ucy5wcm92aWRlO1xuICBpZiAocHJvdmlkZSkge1xuICAgIHZtLl9wcm92aWRlZCA9IHR5cGVvZiBwcm92aWRlID09PSAnZnVuY3Rpb24nXG4gICAgICA/IHByb3ZpZGUuY2FsbCh2bSlcbiAgICAgIDogcHJvdmlkZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0SW5qZWN0aW9ucyAodm0pIHtcbiAgdmFyIHJlc3VsdCA9IHJlc29sdmVJbmplY3Qodm0uJG9wdGlvbnMuaW5qZWN0LCB2bSk7XG4gIGlmIChyZXN1bHQpIHtcbiAgICB0b2dnbGVPYnNlcnZpbmcoZmFsc2UpO1xuICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUkJDEodm0sIGtleSwgcmVzdWx0W2tleV0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgXCJBdm9pZCBtdXRhdGluZyBhbiBpbmplY3RlZCB2YWx1ZSBkaXJlY3RseSBzaW5jZSB0aGUgY2hhbmdlcyB3aWxsIGJlIFwiICtcbiAgICAgICAgICAgIFwib3ZlcndyaXR0ZW4gd2hlbmV2ZXIgdGhlIHByb3ZpZGVkIGNvbXBvbmVudCByZS1yZW5kZXJzLiBcIiArXG4gICAgICAgICAgICBcImluamVjdGlvbiBiZWluZyBtdXRhdGVkOiBcXFwiXCIgKyBrZXkgKyBcIlxcXCJcIixcbiAgICAgICAgICAgIHZtXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVSZWFjdGl2ZSQkMSh2bSwga2V5LCByZXN1bHRba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKHRydWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVJbmplY3QgKGluamVjdCwgdm0pIHtcbiAgaWYgKGluamVjdCkge1xuICAgIC8vIGluamVjdCBpcyA6YW55IGJlY2F1c2UgZmxvdyBpcyBub3Qgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSBvdXQgY2FjaGVkXG4gICAgdmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIGtleXMgPSBoYXNTeW1ib2xcbiAgICAgID8gUmVmbGVjdC5vd25LZXlzKGluamVjdClcbiAgICAgIDogT2JqZWN0LmtleXMoaW5qZWN0KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAvLyAjNjU3NCBpbiBjYXNlIHRoZSBpbmplY3Qgb2JqZWN0IGlzIG9ic2VydmVkLi4uXG4gICAgICBpZiAoa2V5ID09PSAnX19vYl9fJykgeyBjb250aW51ZSB9XG4gICAgICB2YXIgcHJvdmlkZUtleSA9IGluamVjdFtrZXldLmZyb207XG4gICAgICB2YXIgc291cmNlID0gdm07XG4gICAgICB3aGlsZSAoc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UuX3Byb3ZpZGVkICYmIGhhc093bihzb3VyY2UuX3Byb3ZpZGVkLCBwcm92aWRlS2V5KSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gc291cmNlLl9wcm92aWRlZFtwcm92aWRlS2V5XTtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZS4kcGFyZW50O1xuICAgICAgfVxuICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgaWYgKCdkZWZhdWx0JyBpbiBpbmplY3Rba2V5XSkge1xuICAgICAgICAgIHZhciBwcm92aWRlRGVmYXVsdCA9IGluamVjdFtrZXldLmRlZmF1bHQ7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB0eXBlb2YgcHJvdmlkZURlZmF1bHQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gcHJvdmlkZURlZmF1bHQuY2FsbCh2bSlcbiAgICAgICAgICAgIDogcHJvdmlkZURlZmF1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHdhcm4oKFwiSW5qZWN0aW9uIFxcXCJcIiArIGtleSArIFwiXFxcIiBub3QgZm91bmRcIiksIHZtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuLyogICovXG5cblxuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZXNvbHZpbmcgcmF3IGNoaWxkcmVuIFZOb2RlcyBpbnRvIGEgc2xvdCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVTbG90cyAoXG4gIGNoaWxkcmVuLFxuICBjb250ZXh0XG4pIHtcbiAgaWYgKCFjaGlsZHJlbiB8fCAhY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHt9XG4gIH1cbiAgdmFyIHNsb3RzID0ge307XG4gIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgdmFyIGRhdGEgPSBjaGlsZC5kYXRhO1xuICAgIC8vIHJlbW92ZSBzbG90IGF0dHJpYnV0ZSBpZiB0aGUgbm9kZSBpcyByZXNvbHZlZCBhcyBhIFZ1ZSBzbG90IG5vZGVcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmF0dHJzICYmIGRhdGEuYXR0cnMuc2xvdCkge1xuICAgICAgZGVsZXRlIGRhdGEuYXR0cnMuc2xvdDtcbiAgICB9XG4gICAgLy8gbmFtZWQgc2xvdHMgc2hvdWxkIG9ubHkgYmUgcmVzcGVjdGVkIGlmIHRoZSB2bm9kZSB3YXMgcmVuZGVyZWQgaW4gdGhlXG4gICAgLy8gc2FtZSBjb250ZXh0LlxuICAgIGlmICgoY2hpbGQuY29udGV4dCA9PT0gY29udGV4dCB8fCBjaGlsZC5mbkNvbnRleHQgPT09IGNvbnRleHQpICYmXG4gICAgICBkYXRhICYmIGRhdGEuc2xvdCAhPSBudWxsXG4gICAgKSB7XG4gICAgICB2YXIgbmFtZSA9IGRhdGEuc2xvdDtcbiAgICAgIHZhciBzbG90ID0gKHNsb3RzW25hbWVdIHx8IChzbG90c1tuYW1lXSA9IFtdKSk7XG4gICAgICBpZiAoY2hpbGQudGFnID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgIHNsb3QucHVzaC5hcHBseShzbG90LCBjaGlsZC5jaGlsZHJlbiB8fCBbXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbG90LnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmaXhlZCBieSB4eHh4eHgg5Li05pe2IGhhY2sg5o6JIHVuaS1hcHAg5Lit55qE5byC5q2lIG5hbWUgc2xvdCBwYWdlXG4gICAgICBpZihjaGlsZC5hc3luY01ldGEgJiYgY2hpbGQuYXN5bmNNZXRhLmRhdGEgJiYgY2hpbGQuYXN5bmNNZXRhLmRhdGEuc2xvdCA9PT0gJ3BhZ2UnKXtcbiAgICAgICAgKHNsb3RzWydwYWdlJ10gfHwgKHNsb3RzWydwYWdlJ10gPSBbXSkpLnB1c2goY2hpbGQpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIChzbG90cy5kZWZhdWx0IHx8IChzbG90cy5kZWZhdWx0ID0gW10pKS5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gaWdub3JlIHNsb3RzIHRoYXQgY29udGFpbnMgb25seSB3aGl0ZXNwYWNlXG4gIGZvciAodmFyIG5hbWUkMSBpbiBzbG90cykge1xuICAgIGlmIChzbG90c1tuYW1lJDFdLmV2ZXJ5KGlzV2hpdGVzcGFjZSkpIHtcbiAgICAgIGRlbGV0ZSBzbG90c1tuYW1lJDFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2xvdHNcbn1cblxuZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChub2RlKSB7XG4gIHJldHVybiAobm9kZS5pc0NvbW1lbnQgJiYgIW5vZGUuYXN5bmNGYWN0b3J5KSB8fCBub2RlLnRleHQgPT09ICcgJ1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplU2NvcGVkU2xvdHMgKFxuICBzbG90cyxcbiAgbm9ybWFsU2xvdHMsXG4gIHByZXZTbG90c1xuKSB7XG4gIHZhciByZXM7XG4gIHZhciBoYXNOb3JtYWxTbG90cyA9IE9iamVjdC5rZXlzKG5vcm1hbFNsb3RzKS5sZW5ndGggPiAwO1xuICB2YXIgaXNTdGFibGUgPSBzbG90cyA/ICEhc2xvdHMuJHN0YWJsZSA6ICFoYXNOb3JtYWxTbG90cztcbiAgdmFyIGtleSA9IHNsb3RzICYmIHNsb3RzLiRrZXk7XG4gIGlmICghc2xvdHMpIHtcbiAgICByZXMgPSB7fTtcbiAgfSBlbHNlIGlmIChzbG90cy5fbm9ybWFsaXplZCkge1xuICAgIC8vIGZhc3QgcGF0aCAxOiBjaGlsZCBjb21wb25lbnQgcmUtcmVuZGVyIG9ubHksIHBhcmVudCBkaWQgbm90IGNoYW5nZVxuICAgIHJldHVybiBzbG90cy5fbm9ybWFsaXplZFxuICB9IGVsc2UgaWYgKFxuICAgIGlzU3RhYmxlICYmXG4gICAgcHJldlNsb3RzICYmXG4gICAgcHJldlNsb3RzICE9PSBlbXB0eU9iamVjdCAmJlxuICAgIGtleSA9PT0gcHJldlNsb3RzLiRrZXkgJiZcbiAgICAhaGFzTm9ybWFsU2xvdHMgJiZcbiAgICAhcHJldlNsb3RzLiRoYXNOb3JtYWxcbiAgKSB7XG4gICAgLy8gZmFzdCBwYXRoIDI6IHN0YWJsZSBzY29wZWQgc2xvdHMgdy8gbm8gbm9ybWFsIHNsb3RzIHRvIHByb3h5LFxuICAgIC8vIG9ubHkgbmVlZCB0byBub3JtYWxpemUgb25jZVxuICAgIHJldHVybiBwcmV2U2xvdHNcbiAgfSBlbHNlIHtcbiAgICByZXMgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkkMSBpbiBzbG90cykge1xuICAgICAgaWYgKHNsb3RzW2tleSQxXSAmJiBrZXkkMVswXSAhPT0gJyQnKSB7XG4gICAgICAgIHJlc1trZXkkMV0gPSBub3JtYWxpemVTY29wZWRTbG90KG5vcm1hbFNsb3RzLCBrZXkkMSwgc2xvdHNba2V5JDFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gZXhwb3NlIG5vcm1hbCBzbG90cyBvbiBzY29wZWRTbG90c1xuICBmb3IgKHZhciBrZXkkMiBpbiBub3JtYWxTbG90cykge1xuICAgIGlmICghKGtleSQyIGluIHJlcykpIHtcbiAgICAgIHJlc1trZXkkMl0gPSBwcm94eU5vcm1hbFNsb3Qobm9ybWFsU2xvdHMsIGtleSQyKTtcbiAgICB9XG4gIH1cbiAgLy8gYXZvcmlheiBzZWVtcyB0byBtb2NrIGEgbm9uLWV4dGVuc2libGUgJHNjb3BlZFNsb3RzIG9iamVjdFxuICAvLyBhbmQgd2hlbiB0aGF0IGlzIHBhc3NlZCBkb3duIHRoaXMgd291bGQgY2F1c2UgYW4gZXJyb3JcbiAgaWYgKHNsb3RzICYmIE9iamVjdC5pc0V4dGVuc2libGUoc2xvdHMpKSB7XG4gICAgKHNsb3RzKS5fbm9ybWFsaXplZCA9IHJlcztcbiAgfVxuICBkZWYocmVzLCAnJHN0YWJsZScsIGlzU3RhYmxlKTtcbiAgZGVmKHJlcywgJyRrZXknLCBrZXkpO1xuICBkZWYocmVzLCAnJGhhc05vcm1hbCcsIGhhc05vcm1hbFNsb3RzKTtcbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVTY29wZWRTbG90KG5vcm1hbFNsb3RzLCBrZXksIGZuKSB7XG4gIHZhciBub3JtYWxpemVkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXMgPSBhcmd1bWVudHMubGVuZ3RoID8gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKSA6IGZuKHt9KTtcbiAgICByZXMgPSByZXMgJiYgdHlwZW9mIHJlcyA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkocmVzKVxuICAgICAgPyBbcmVzXSAvLyBzaW5nbGUgdm5vZGVcbiAgICAgIDogbm9ybWFsaXplQ2hpbGRyZW4ocmVzKTtcbiAgICByZXR1cm4gcmVzICYmIChcbiAgICAgIHJlcy5sZW5ndGggPT09IDAgfHxcbiAgICAgIChyZXMubGVuZ3RoID09PSAxICYmIHJlc1swXS5pc0NvbW1lbnQpIC8vICM5NjU4XG4gICAgKSA/IHVuZGVmaW5lZFxuICAgICAgOiByZXNcbiAgfTtcbiAgLy8gdGhpcyBpcyBhIHNsb3QgdXNpbmcgdGhlIG5ldyB2LXNsb3Qgc3ludGF4IHdpdGhvdXQgc2NvcGUuIGFsdGhvdWdoIGl0IGlzXG4gIC8vIGNvbXBpbGVkIGFzIGEgc2NvcGVkIHNsb3QsIHJlbmRlciBmbiB1c2VycyB3b3VsZCBleHBlY3QgaXQgdG8gYmUgcHJlc2VudFxuICAvLyBvbiB0aGlzLiRzbG90cyBiZWNhdXNlIHRoZSB1c2FnZSBpcyBzZW1hbnRpY2FsbHkgYSBub3JtYWwgc2xvdC5cbiAgaWYgKGZuLnByb3h5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5vcm1hbFNsb3RzLCBrZXksIHtcbiAgICAgIGdldDogbm9ybWFsaXplZCxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZFxufVxuXG5mdW5jdGlvbiBwcm94eU5vcm1hbFNsb3Qoc2xvdHMsIGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gc2xvdHNba2V5XTsgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVuZGVyaW5nIHYtZm9yIGxpc3RzLlxuICovXG5mdW5jdGlvbiByZW5kZXJMaXN0IChcbiAgdmFsLFxuICByZW5kZXJcbikge1xuICB2YXIgcmV0LCBpLCBsLCBrZXlzLCBrZXk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkgfHwgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXQgPSBuZXcgQXJyYXkodmFsLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHJldFtpXSA9IHJlbmRlcih2YWxbaV0sIGksIGksIGkpOyAvLyBmaXhlZCBieSB4eHh4eHhcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICByZXQgPSBuZXcgQXJyYXkodmFsKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdmFsOyBpKyspIHtcbiAgICAgIHJldFtpXSA9IHJlbmRlcihpICsgMSwgaSwgaSwgaSk7IC8vIGZpeGVkIGJ5IHh4eHh4eFxuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgaWYgKGhhc1N5bWJvbCAmJiB2YWxbU3ltYm9sLml0ZXJhdG9yXSkge1xuICAgICAgcmV0ID0gW107XG4gICAgICB2YXIgaXRlcmF0b3IgPSB2YWxbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIHdoaWxlICghcmVzdWx0LmRvbmUpIHtcbiAgICAgICAgcmV0LnB1c2gocmVuZGVyKHJlc3VsdC52YWx1ZSwgcmV0Lmxlbmd0aCwgaSsrLCBpKSk7IC8vIGZpeGVkIGJ5IHh4eHh4eFxuICAgICAgICByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgICAgcmV0ID0gbmV3IEFycmF5KGtleXMubGVuZ3RoKTtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICByZXRbaV0gPSByZW5kZXIodmFsW2tleV0sIGtleSwgaSwgaSk7IC8vIGZpeGVkIGJ5IHh4eHh4eFxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoIWlzRGVmKHJldCkpIHtcbiAgICByZXQgPSBbXTtcbiAgfVxuICAocmV0KS5faXNWTGlzdCA9IHRydWU7XG4gIHJldHVybiByZXRcbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlbmRlcmluZyA8c2xvdD5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyU2xvdCAoXG4gIG5hbWUsXG4gIGZhbGxiYWNrLFxuICBwcm9wcyxcbiAgYmluZE9iamVjdFxuKSB7XG4gIHZhciBzY29wZWRTbG90Rm4gPSB0aGlzLiRzY29wZWRTbG90c1tuYW1lXTtcbiAgdmFyIG5vZGVzO1xuICBpZiAoc2NvcGVkU2xvdEZuKSB7IC8vIHNjb3BlZCBzbG90XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBpZiAoYmluZE9iamVjdCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIWlzT2JqZWN0KGJpbmRPYmplY3QpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ3Nsb3Qgdi1iaW5kIHdpdGhvdXQgYXJndW1lbnQgZXhwZWN0cyBhbiBPYmplY3QnLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHByb3BzID0gZXh0ZW5kKGV4dGVuZCh7fSwgYmluZE9iamVjdCksIHByb3BzKTtcbiAgICB9XG4gICAgLy8gZml4ZWQgYnkgeHh4eHh4IGFwcC1wbHVzIHNjb3BlZFNsb3RcbiAgICBub2RlcyA9IHNjb3BlZFNsb3RGbihwcm9wcywgdGhpcywgcHJvcHMuX2kpIHx8IGZhbGxiYWNrO1xuICB9IGVsc2Uge1xuICAgIG5vZGVzID0gdGhpcy4kc2xvdHNbbmFtZV0gfHwgZmFsbGJhY2s7XG4gIH1cblxuICB2YXIgdGFyZ2V0ID0gcHJvcHMgJiYgcHJvcHMuc2xvdDtcbiAgaWYgKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScsIHsgc2xvdDogdGFyZ2V0IH0sIG5vZGVzKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBub2Rlc1xuICB9XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZXNvbHZpbmcgZmlsdGVyc1xuICovXG5mdW5jdGlvbiByZXNvbHZlRmlsdGVyIChpZCkge1xuICByZXR1cm4gcmVzb2x2ZUFzc2V0KHRoaXMuJG9wdGlvbnMsICdmaWx0ZXJzJywgaWQsIHRydWUpIHx8IGlkZW50aXR5XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpc0tleU5vdE1hdGNoIChleHBlY3QsIGFjdHVhbCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShleHBlY3QpKSB7XG4gICAgcmV0dXJuIGV4cGVjdC5pbmRleE9mKGFjdHVhbCkgPT09IC0xXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGV4cGVjdCAhPT0gYWN0dWFsXG4gIH1cbn1cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgY2hlY2tpbmcga2V5Q29kZXMgZnJvbSBjb25maWcuXG4gKiBleHBvc2VkIGFzIFZ1ZS5wcm90b3R5cGUuX2tcbiAqIHBhc3NpbmcgaW4gZXZlbnRLZXlOYW1lIGFzIGxhc3QgYXJndW1lbnQgc2VwYXJhdGVseSBmb3IgYmFja3dhcmRzIGNvbXBhdFxuICovXG5mdW5jdGlvbiBjaGVja0tleUNvZGVzIChcbiAgZXZlbnRLZXlDb2RlLFxuICBrZXksXG4gIGJ1aWx0SW5LZXlDb2RlLFxuICBldmVudEtleU5hbWUsXG4gIGJ1aWx0SW5LZXlOYW1lXG4pIHtcbiAgdmFyIG1hcHBlZEtleUNvZGUgPSBjb25maWcua2V5Q29kZXNba2V5XSB8fCBidWlsdEluS2V5Q29kZTtcbiAgaWYgKGJ1aWx0SW5LZXlOYW1lICYmIGV2ZW50S2V5TmFtZSAmJiAhY29uZmlnLmtleUNvZGVzW2tleV0pIHtcbiAgICByZXR1cm4gaXNLZXlOb3RNYXRjaChidWlsdEluS2V5TmFtZSwgZXZlbnRLZXlOYW1lKVxuICB9IGVsc2UgaWYgKG1hcHBlZEtleUNvZGUpIHtcbiAgICByZXR1cm4gaXNLZXlOb3RNYXRjaChtYXBwZWRLZXlDb2RlLCBldmVudEtleUNvZGUpXG4gIH0gZWxzZSBpZiAoZXZlbnRLZXlOYW1lKSB7XG4gICAgcmV0dXJuIGh5cGhlbmF0ZShldmVudEtleU5hbWUpICE9PSBrZXlcbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgbWVyZ2luZyB2LWJpbmQ9XCJvYmplY3RcIiBpbnRvIGEgVk5vZGUncyBkYXRhLlxuICovXG5mdW5jdGlvbiBiaW5kT2JqZWN0UHJvcHMgKFxuICBkYXRhLFxuICB0YWcsXG4gIHZhbHVlLFxuICBhc1Byb3AsXG4gIGlzU3luY1xuKSB7XG4gIGlmICh2YWx1ZSkge1xuICAgIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgICd2LWJpbmQgd2l0aG91dCBhcmd1bWVudCBleHBlY3RzIGFuIE9iamVjdCBvciBBcnJheSB2YWx1ZScsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHRvT2JqZWN0KHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHZhciBoYXNoO1xuICAgICAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoIGtleSApIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGtleSA9PT0gJ2NsYXNzJyB8fFxuICAgICAgICAgIGtleSA9PT0gJ3N0eWxlJyB8fFxuICAgICAgICAgIGlzUmVzZXJ2ZWRBdHRyaWJ1dGUoa2V5KVxuICAgICAgICApIHtcbiAgICAgICAgICBoYXNoID0gZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdHlwZSA9IGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy50eXBlO1xuICAgICAgICAgIGhhc2ggPSBhc1Byb3AgfHwgY29uZmlnLm11c3RVc2VQcm9wKHRhZywgdHlwZSwga2V5KVxuICAgICAgICAgICAgPyBkYXRhLmRvbVByb3BzIHx8IChkYXRhLmRvbVByb3BzID0ge30pXG4gICAgICAgICAgICA6IGRhdGEuYXR0cnMgfHwgKGRhdGEuYXR0cnMgPSB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbWVsaXplZEtleSA9IGNhbWVsaXplKGtleSk7XG4gICAgICAgIHZhciBoeXBoZW5hdGVkS2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICAgIGlmICghKGNhbWVsaXplZEtleSBpbiBoYXNoKSAmJiAhKGh5cGhlbmF0ZWRLZXkgaW4gaGFzaCkpIHtcbiAgICAgICAgICBoYXNoW2tleV0gPSB2YWx1ZVtrZXldO1xuXG4gICAgICAgICAgaWYgKGlzU3luYykge1xuICAgICAgICAgICAgdmFyIG9uID0gZGF0YS5vbiB8fCAoZGF0YS5vbiA9IHt9KTtcbiAgICAgICAgICAgIG9uWyhcInVwZGF0ZTpcIiArIGtleSldID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAgICAgICB2YWx1ZVtrZXldID0gJGV2ZW50O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkgbG9vcCgga2V5ICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgc3RhdGljIHRyZWVzLlxuICovXG5mdW5jdGlvbiByZW5kZXJTdGF0aWMgKFxuICBpbmRleCxcbiAgaXNJbkZvclxuKSB7XG4gIHZhciBjYWNoZWQgPSB0aGlzLl9zdGF0aWNUcmVlcyB8fCAodGhpcy5fc3RhdGljVHJlZXMgPSBbXSk7XG4gIHZhciB0cmVlID0gY2FjaGVkW2luZGV4XTtcbiAgLy8gaWYgaGFzIGFscmVhZHktcmVuZGVyZWQgc3RhdGljIHRyZWUgYW5kIG5vdCBpbnNpZGUgdi1mb3IsXG4gIC8vIHdlIGNhbiByZXVzZSB0aGUgc2FtZSB0cmVlLlxuICBpZiAodHJlZSAmJiAhaXNJbkZvcikge1xuICAgIHJldHVybiB0cmVlXG4gIH1cbiAgLy8gb3RoZXJ3aXNlLCByZW5kZXIgYSBmcmVzaCB0cmVlLlxuICB0cmVlID0gY2FjaGVkW2luZGV4XSA9IHRoaXMuJG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zW2luZGV4XS5jYWxsKFxuICAgIHRoaXMuX3JlbmRlclByb3h5LFxuICAgIG51bGwsXG4gICAgdGhpcyAvLyBmb3IgcmVuZGVyIGZucyBnZW5lcmF0ZWQgZm9yIGZ1bmN0aW9uYWwgY29tcG9uZW50IHRlbXBsYXRlc1xuICApO1xuICBtYXJrU3RhdGljKHRyZWUsIChcIl9fc3RhdGljX19cIiArIGluZGV4KSwgZmFsc2UpO1xuICByZXR1cm4gdHJlZVxufVxuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciB2LW9uY2UuXG4gKiBFZmZlY3RpdmVseSBpdCBtZWFucyBtYXJraW5nIHRoZSBub2RlIGFzIHN0YXRpYyB3aXRoIGEgdW5pcXVlIGtleS5cbiAqL1xuZnVuY3Rpb24gbWFya09uY2UgKFxuICB0cmVlLFxuICBpbmRleCxcbiAga2V5XG4pIHtcbiAgbWFya1N0YXRpYyh0cmVlLCAoXCJfX29uY2VfX1wiICsgaW5kZXggKyAoa2V5ID8gKFwiX1wiICsga2V5KSA6IFwiXCIpKSwgdHJ1ZSk7XG4gIHJldHVybiB0cmVlXG59XG5cbmZ1bmN0aW9uIG1hcmtTdGF0aWMgKFxuICB0cmVlLFxuICBrZXksXG4gIGlzT25jZVxuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRyZWUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHJlZVtpXSAmJiB0eXBlb2YgdHJlZVtpXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWFya1N0YXRpY05vZGUodHJlZVtpXSwgKGtleSArIFwiX1wiICsgaSksIGlzT25jZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG1hcmtTdGF0aWNOb2RlKHRyZWUsIGtleSwgaXNPbmNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXJrU3RhdGljTm9kZSAobm9kZSwga2V5LCBpc09uY2UpIHtcbiAgbm9kZS5pc1N0YXRpYyA9IHRydWU7XG4gIG5vZGUua2V5ID0ga2V5O1xuICBub2RlLmlzT25jZSA9IGlzT25jZTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGJpbmRPYmplY3RMaXN0ZW5lcnMgKGRhdGEsIHZhbHVlKSB7XG4gIGlmICh2YWx1ZSkge1xuICAgIGlmICghaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ3Ytb24gd2l0aG91dCBhcmd1bWVudCBleHBlY3RzIGFuIE9iamVjdCB2YWx1ZScsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvbiA9IGRhdGEub24gPSBkYXRhLm9uID8gZXh0ZW5kKHt9LCBkYXRhLm9uKSA6IHt9O1xuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgIHZhciBleGlzdGluZyA9IG9uW2tleV07XG4gICAgICAgIHZhciBvdXJzID0gdmFsdWVba2V5XTtcbiAgICAgICAgb25ba2V5XSA9IGV4aXN0aW5nID8gW10uY29uY2F0KGV4aXN0aW5nLCBvdXJzKSA6IG91cnM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiByZXNvbHZlU2NvcGVkU2xvdHMgKFxuICBmbnMsIC8vIHNlZSBmbG93L3Zub2RlXG4gIHJlcyxcbiAgLy8gdGhlIGZvbGxvd2luZyBhcmUgYWRkZWQgaW4gMi42XG4gIGhhc0R5bmFtaWNLZXlzLFxuICBjb250ZW50SGFzaEtleVxuKSB7XG4gIHJlcyA9IHJlcyB8fCB7ICRzdGFibGU6ICFoYXNEeW5hbWljS2V5cyB9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzbG90ID0gZm5zW2ldO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHNsb3QpKSB7XG4gICAgICByZXNvbHZlU2NvcGVkU2xvdHMoc2xvdCwgcmVzLCBoYXNEeW5hbWljS2V5cyk7XG4gICAgfSBlbHNlIGlmIChzbG90KSB7XG4gICAgICAvLyBtYXJrZXIgZm9yIHJldmVyc2UgcHJveHlpbmcgdi1zbG90IHdpdGhvdXQgc2NvcGUgb24gdGhpcy4kc2xvdHNcbiAgICAgIGlmIChzbG90LnByb3h5KSB7XG4gICAgICAgIHNsb3QuZm4ucHJveHkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmVzW3Nsb3Qua2V5XSA9IHNsb3QuZm47XG4gICAgfVxuICB9XG4gIGlmIChjb250ZW50SGFzaEtleSkge1xuICAgIChyZXMpLiRrZXkgPSBjb250ZW50SGFzaEtleTtcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBiaW5kRHluYW1pY0tleXMgKGJhc2VPYmosIHZhbHVlcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBrZXkgPSB2YWx1ZXNbaV07XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGtleSkge1xuICAgICAgYmFzZU9ialt2YWx1ZXNbaV1dID0gdmFsdWVzW2kgKyAxXTtcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYga2V5ICE9PSAnJyAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgIC8vIG51bGwgaXMgYSBzcGVjaWFsIHZhbHVlIGZvciBleHBsaWNpdGx5IHJlbW92aW5nIGEgYmluZGluZ1xuICAgICAgd2FybihcbiAgICAgICAgKFwiSW52YWxpZCB2YWx1ZSBmb3IgZHluYW1pYyBkaXJlY3RpdmUgYXJndW1lbnQgKGV4cGVjdGVkIHN0cmluZyBvciBudWxsKTogXCIgKyBrZXkpLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYmFzZU9ialxufVxuXG4vLyBoZWxwZXIgdG8gZHluYW1pY2FsbHkgYXBwZW5kIG1vZGlmaWVyIHJ1bnRpbWUgbWFya2VycyB0byBldmVudCBuYW1lcy5cbi8vIGVuc3VyZSBvbmx5IGFwcGVuZCB3aGVuIHZhbHVlIGlzIGFscmVhZHkgc3RyaW5nLCBvdGhlcndpc2UgaXQgd2lsbCBiZSBjYXN0XG4vLyB0byBzdHJpbmcgYW5kIGNhdXNlIHRoZSB0eXBlIGNoZWNrIHRvIG1pc3MuXG5mdW5jdGlvbiBwcmVwZW5kTW9kaWZpZXIgKHZhbHVlLCBzeW1ib2wpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBzeW1ib2wgKyB2YWx1ZSA6IHZhbHVlXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbnN0YWxsUmVuZGVySGVscGVycyAodGFyZ2V0KSB7XG4gIHRhcmdldC5fbyA9IG1hcmtPbmNlO1xuICB0YXJnZXQuX24gPSB0b051bWJlcjtcbiAgdGFyZ2V0Ll9zID0gdG9TdHJpbmc7XG4gIHRhcmdldC5fbCA9IHJlbmRlckxpc3Q7XG4gIHRhcmdldC5fdCA9IHJlbmRlclNsb3Q7XG4gIHRhcmdldC5fcSA9IGxvb3NlRXF1YWw7XG4gIHRhcmdldC5faSA9IGxvb3NlSW5kZXhPZjtcbiAgdGFyZ2V0Ll9tID0gcmVuZGVyU3RhdGljO1xuICB0YXJnZXQuX2YgPSByZXNvbHZlRmlsdGVyO1xuICB0YXJnZXQuX2sgPSBjaGVja0tleUNvZGVzO1xuICB0YXJnZXQuX2IgPSBiaW5kT2JqZWN0UHJvcHM7XG4gIHRhcmdldC5fdiA9IGNyZWF0ZVRleHRWTm9kZTtcbiAgdGFyZ2V0Ll9lID0gY3JlYXRlRW1wdHlWTm9kZTtcbiAgdGFyZ2V0Ll91ID0gcmVzb2x2ZVNjb3BlZFNsb3RzO1xuICB0YXJnZXQuX2cgPSBiaW5kT2JqZWN0TGlzdGVuZXJzO1xuICB0YXJnZXQuX2QgPSBiaW5kRHluYW1pY0tleXM7XG4gIHRhcmdldC5fcCA9IHByZXBlbmRNb2RpZmllcjtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0IChcbiAgZGF0YSxcbiAgcHJvcHMsXG4gIGNoaWxkcmVuLFxuICBwYXJlbnQsXG4gIEN0b3Jcbikge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucztcbiAgLy8gZW5zdXJlIHRoZSBjcmVhdGVFbGVtZW50IGZ1bmN0aW9uIGluIGZ1bmN0aW9uYWwgY29tcG9uZW50c1xuICAvLyBnZXRzIGEgdW5pcXVlIGNvbnRleHQgLSB0aGlzIGlzIG5lY2Vzc2FyeSBmb3IgY29ycmVjdCBuYW1lZCBzbG90IGNoZWNrXG4gIHZhciBjb250ZXh0Vm07XG4gIGlmIChoYXNPd24ocGFyZW50LCAnX3VpZCcpKSB7XG4gICAgY29udGV4dFZtID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQpO1xuICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgIGNvbnRleHRWbS5fb3JpZ2luYWwgPSBwYXJlbnQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhlIGNvbnRleHQgdm0gcGFzc2VkIGluIGlzIGEgZnVuY3Rpb25hbCBjb250ZXh0IGFzIHdlbGwuXG4gICAgLy8gaW4gdGhpcyBjYXNlIHdlIHdhbnQgdG8gbWFrZSBzdXJlIHdlIGFyZSBhYmxlIHRvIGdldCBhIGhvbGQgdG8gdGhlXG4gICAgLy8gcmVhbCBjb250ZXh0IGluc3RhbmNlLlxuICAgIGNvbnRleHRWbSA9IHBhcmVudDtcbiAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICBwYXJlbnQgPSBwYXJlbnQuX29yaWdpbmFsO1xuICB9XG4gIHZhciBpc0NvbXBpbGVkID0gaXNUcnVlKG9wdGlvbnMuX2NvbXBpbGVkKTtcbiAgdmFyIG5lZWROb3JtYWxpemF0aW9uID0gIWlzQ29tcGlsZWQ7XG5cbiAgdGhpcy5kYXRhID0gZGF0YTtcbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLmxpc3RlbmVycyA9IGRhdGEub24gfHwgZW1wdHlPYmplY3Q7XG4gIHRoaXMuaW5qZWN0aW9ucyA9IHJlc29sdmVJbmplY3Qob3B0aW9ucy5pbmplY3QsIHBhcmVudCk7XG4gIHRoaXMuc2xvdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzJDEuJHNsb3RzKSB7XG4gICAgICBub3JtYWxpemVTY29wZWRTbG90cyhcbiAgICAgICAgZGF0YS5zY29wZWRTbG90cyxcbiAgICAgICAgdGhpcyQxLiRzbG90cyA9IHJlc29sdmVTbG90cyhjaGlsZHJlbiwgcGFyZW50KVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMkMS4kc2xvdHNcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Njb3BlZFNsb3RzJywgKHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0ICgpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemVTY29wZWRTbG90cyhkYXRhLnNjb3BlZFNsb3RzLCB0aGlzLnNsb3RzKCkpXG4gICAgfVxuICB9KSk7XG5cbiAgLy8gc3VwcG9ydCBmb3IgY29tcGlsZWQgZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuICBpZiAoaXNDb21waWxlZCkge1xuICAgIC8vIGV4cG9zaW5nICRvcHRpb25zIGZvciByZW5kZXJTdGF0aWMoKVxuICAgIHRoaXMuJG9wdGlvbnMgPSBvcHRpb25zO1xuICAgIC8vIHByZS1yZXNvbHZlIHNsb3RzIGZvciByZW5kZXJTbG90KClcbiAgICB0aGlzLiRzbG90cyA9IHRoaXMuc2xvdHMoKTtcbiAgICB0aGlzLiRzY29wZWRTbG90cyA9IG5vcm1hbGl6ZVNjb3BlZFNsb3RzKGRhdGEuc2NvcGVkU2xvdHMsIHRoaXMuJHNsb3RzKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLl9zY29wZUlkKSB7XG4gICAgdGhpcy5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7XG4gICAgICB2YXIgdm5vZGUgPSBjcmVhdGVFbGVtZW50KGNvbnRleHRWbSwgYSwgYiwgYywgZCwgbmVlZE5vcm1hbGl6YXRpb24pO1xuICAgICAgaWYgKHZub2RlICYmICFBcnJheS5pc0FycmF5KHZub2RlKSkge1xuICAgICAgICB2bm9kZS5mblNjb3BlSWQgPSBvcHRpb25zLl9zY29wZUlkO1xuICAgICAgICB2bm9kZS5mbkNvbnRleHQgPSBwYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm5vZGVcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2MgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudChjb250ZXh0Vm0sIGEsIGIsIGMsIGQsIG5lZWROb3JtYWxpemF0aW9uKTsgfTtcbiAgfVxufVxuXG5pbnN0YWxsUmVuZGVySGVscGVycyhGdW5jdGlvbmFsUmVuZGVyQ29udGV4dC5wcm90b3R5cGUpO1xuXG5mdW5jdGlvbiBjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50IChcbiAgQ3RvcixcbiAgcHJvcHNEYXRhLFxuICBkYXRhLFxuICBjb250ZXh0Vm0sXG4gIGNoaWxkcmVuXG4pIHtcbiAgdmFyIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnM7XG4gIHZhciBwcm9wcyA9IHt9O1xuICB2YXIgcHJvcE9wdGlvbnMgPSBvcHRpb25zLnByb3BzO1xuICBpZiAoaXNEZWYocHJvcE9wdGlvbnMpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XG4gICAgICBwcm9wc1trZXldID0gdmFsaWRhdGVQcm9wKGtleSwgcHJvcE9wdGlvbnMsIHByb3BzRGF0YSB8fCBlbXB0eU9iamVjdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChpc0RlZihkYXRhLmF0dHJzKSkgeyBtZXJnZVByb3BzKHByb3BzLCBkYXRhLmF0dHJzKTsgfVxuICAgIGlmIChpc0RlZihkYXRhLnByb3BzKSkgeyBtZXJnZVByb3BzKHByb3BzLCBkYXRhLnByb3BzKTsgfVxuICB9XG5cbiAgdmFyIHJlbmRlckNvbnRleHQgPSBuZXcgRnVuY3Rpb25hbFJlbmRlckNvbnRleHQoXG4gICAgZGF0YSxcbiAgICBwcm9wcyxcbiAgICBjaGlsZHJlbixcbiAgICBjb250ZXh0Vm0sXG4gICAgQ3RvclxuICApO1xuXG4gIHZhciB2bm9kZSA9IG9wdGlvbnMucmVuZGVyLmNhbGwobnVsbCwgcmVuZGVyQ29udGV4dC5fYywgcmVuZGVyQ29udGV4dCk7XG5cbiAgaWYgKHZub2RlIGluc3RhbmNlb2YgVk5vZGUpIHtcbiAgICByZXR1cm4gY2xvbmVBbmRNYXJrRnVuY3Rpb25hbFJlc3VsdCh2bm9kZSwgZGF0YSwgcmVuZGVyQ29udGV4dC5wYXJlbnQsIG9wdGlvbnMsIHJlbmRlckNvbnRleHQpXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICB2YXIgdm5vZGVzID0gbm9ybWFsaXplQ2hpbGRyZW4odm5vZGUpIHx8IFtdO1xuICAgIHZhciByZXMgPSBuZXcgQXJyYXkodm5vZGVzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc1tpXSA9IGNsb25lQW5kTWFya0Z1bmN0aW9uYWxSZXN1bHQodm5vZGVzW2ldLCBkYXRhLCByZW5kZXJDb250ZXh0LnBhcmVudCwgb3B0aW9ucywgcmVuZGVyQ29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9uZUFuZE1hcmtGdW5jdGlvbmFsUmVzdWx0ICh2bm9kZSwgZGF0YSwgY29udGV4dFZtLCBvcHRpb25zLCByZW5kZXJDb250ZXh0KSB7XG4gIC8vICM3ODE3IGNsb25lIG5vZGUgYmVmb3JlIHNldHRpbmcgZm5Db250ZXh0LCBvdGhlcndpc2UgaWYgdGhlIG5vZGUgaXMgcmV1c2VkXG4gIC8vIChlLmcuIGl0IHdhcyBmcm9tIGEgY2FjaGVkIG5vcm1hbCBzbG90KSB0aGUgZm5Db250ZXh0IGNhdXNlcyBuYW1lZCBzbG90c1xuICAvLyB0aGF0IHNob3VsZCBub3QgYmUgbWF0Y2hlZCB0byBtYXRjaC5cbiAgdmFyIGNsb25lID0gY2xvbmVWTm9kZSh2bm9kZSk7XG4gIGNsb25lLmZuQ29udGV4dCA9IGNvbnRleHRWbTtcbiAgY2xvbmUuZm5PcHRpb25zID0gb3B0aW9ucztcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAoY2xvbmUuZGV2dG9vbHNNZXRhID0gY2xvbmUuZGV2dG9vbHNNZXRhIHx8IHt9KS5yZW5kZXJDb250ZXh0ID0gcmVuZGVyQ29udGV4dDtcbiAgfVxuICBpZiAoZGF0YS5zbG90KSB7XG4gICAgKGNsb25lLmRhdGEgfHwgKGNsb25lLmRhdGEgPSB7fSkpLnNsb3QgPSBkYXRhLnNsb3Q7XG4gIH1cbiAgcmV0dXJuIGNsb25lXG59XG5cbmZ1bmN0aW9uIG1lcmdlUHJvcHMgKHRvLCBmcm9tKSB7XG4gIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgdG9bY2FtZWxpemUoa2V5KV0gPSBmcm9tW2tleV07XG4gIH1cbn1cblxuLyogICovXG5cbi8qICAqL1xuXG4vKiAgKi9cblxuLyogICovXG5cbi8vIGlubGluZSBob29rcyB0byBiZSBpbnZva2VkIG9uIGNvbXBvbmVudCBWTm9kZXMgZHVyaW5nIHBhdGNoXG52YXIgY29tcG9uZW50Vk5vZGVIb29rcyA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCAodm5vZGUsIGh5ZHJhdGluZykge1xuICAgIGlmIChcbiAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlICYmXG4gICAgICAhdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX2lzRGVzdHJveWVkICYmXG4gICAgICB2bm9kZS5kYXRhLmtlZXBBbGl2ZVxuICAgICkge1xuICAgICAgLy8ga2VwdC1hbGl2ZSBjb21wb25lbnRzLCB0cmVhdCBhcyBhIHBhdGNoXG4gICAgICB2YXIgbW91bnRlZE5vZGUgPSB2bm9kZTsgLy8gd29yayBhcm91bmQgZmxvd1xuICAgICAgY29tcG9uZW50Vk5vZGVIb29rcy5wcmVwYXRjaChtb3VudGVkTm9kZSwgbW91bnRlZE5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY2hpbGQgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlRm9yVm5vZGUoXG4gICAgICAgIHZub2RlLFxuICAgICAgICBhY3RpdmVJbnN0YW5jZVxuICAgICAgKTtcbiAgICAgIGNoaWxkLiRtb3VudChoeWRyYXRpbmcgPyB2bm9kZS5lbG0gOiB1bmRlZmluZWQsIGh5ZHJhdGluZyk7XG4gICAgfVxuICB9LFxuXG4gIHByZXBhdGNoOiBmdW5jdGlvbiBwcmVwYXRjaCAob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xuICAgIHZhciBjaGlsZCA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gb2xkVm5vZGUuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgdXBkYXRlQ2hpbGRDb21wb25lbnQoXG4gICAgICBjaGlsZCxcbiAgICAgIG9wdGlvbnMucHJvcHNEYXRhLCAvLyB1cGRhdGVkIHByb3BzXG4gICAgICBvcHRpb25zLmxpc3RlbmVycywgLy8gdXBkYXRlZCBsaXN0ZW5lcnNcbiAgICAgIHZub2RlLCAvLyBuZXcgcGFyZW50IHZub2RlXG4gICAgICBvcHRpb25zLmNoaWxkcmVuIC8vIG5ldyBjaGlsZHJlblxuICAgICk7XG4gIH0sXG5cbiAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQgKHZub2RlKSB7XG4gICAgdmFyIGNvbnRleHQgPSB2bm9kZS5jb250ZXh0O1xuICAgIHZhciBjb21wb25lbnRJbnN0YW5jZSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlO1xuICAgIGlmICghY29tcG9uZW50SW5zdGFuY2UuX2lzTW91bnRlZCkge1xuICAgICAgY2FsbEhvb2soY29tcG9uZW50SW5zdGFuY2UsICdvblNlcnZpY2VDcmVhdGVkJyk7XG4gICAgICBjYWxsSG9vayhjb21wb25lbnRJbnN0YW5jZSwgJ29uU2VydmljZUF0dGFjaGVkJyk7XG4gICAgICBjb21wb25lbnRJbnN0YW5jZS5faXNNb3VudGVkID0gdHJ1ZTtcbiAgICAgIGNhbGxIb29rKGNvbXBvbmVudEluc3RhbmNlLCAnbW91bnRlZCcpO1xuICAgIH1cbiAgICBpZiAodm5vZGUuZGF0YS5rZWVwQWxpdmUpIHtcbiAgICAgIGlmIChjb250ZXh0Ll9pc01vdW50ZWQpIHtcbiAgICAgICAgLy8gdnVlLXJvdXRlciMxMjEyXG4gICAgICAgIC8vIER1cmluZyB1cGRhdGVzLCBhIGtlcHQtYWxpdmUgY29tcG9uZW50J3MgY2hpbGQgY29tcG9uZW50cyBtYXlcbiAgICAgICAgLy8gY2hhbmdlLCBzbyBkaXJlY3RseSB3YWxraW5nIHRoZSB0cmVlIGhlcmUgbWF5IGNhbGwgYWN0aXZhdGVkIGhvb2tzXG4gICAgICAgIC8vIG9uIGluY29ycmVjdCBjaGlsZHJlbi4gSW5zdGVhZCB3ZSBwdXNoIHRoZW0gaW50byBhIHF1ZXVlIHdoaWNoIHdpbGxcbiAgICAgICAgLy8gYmUgcHJvY2Vzc2VkIGFmdGVyIHRoZSB3aG9sZSBwYXRjaCBwcm9jZXNzIGVuZGVkLlxuICAgICAgICBxdWV1ZUFjdGl2YXRlZENvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlLCB0cnVlIC8qIGRpcmVjdCAqLyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3kgKHZub2RlKSB7XG4gICAgdmFyIGNvbXBvbmVudEluc3RhbmNlID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgaWYgKCFjb21wb25lbnRJbnN0YW5jZS5faXNEZXN0cm95ZWQpIHtcbiAgICAgIGlmICghdm5vZGUuZGF0YS5rZWVwQWxpdmUpIHtcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2UuJGRlc3Ryb3koKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZSwgdHJ1ZSAvKiBkaXJlY3QgKi8pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxudmFyIGhvb2tzVG9NZXJnZSA9IE9iamVjdC5rZXlzKGNvbXBvbmVudFZOb2RlSG9va3MpO1xuXG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnQgKFxuICBDdG9yLFxuICBkYXRhLFxuICBjb250ZXh0LFxuICBjaGlsZHJlbixcbiAgdGFnXG4pIHtcbiAgaWYgKGlzVW5kZWYoQ3RvcikpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBiYXNlQ3RvciA9IGNvbnRleHQuJG9wdGlvbnMuX2Jhc2U7XG5cbiAgLy8gcGxhaW4gb3B0aW9ucyBvYmplY3Q6IHR1cm4gaXQgaW50byBhIGNvbnN0cnVjdG9yXG4gIGlmIChpc09iamVjdChDdG9yKSkge1xuICAgIEN0b3IgPSBiYXNlQ3Rvci5leHRlbmQoQ3Rvcik7XG4gIH1cblxuICAvLyBpZiBhdCB0aGlzIHN0YWdlIGl0J3Mgbm90IGEgY29uc3RydWN0b3Igb3IgYW4gYXN5bmMgY29tcG9uZW50IGZhY3RvcnksXG4gIC8vIHJlamVjdC5cbiAgaWYgKHR5cGVvZiBDdG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHdhcm4oKFwiSW52YWxpZCBDb21wb25lbnQgZGVmaW5pdGlvbjogXCIgKyAoU3RyaW5nKEN0b3IpKSksIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIGFzeW5jIGNvbXBvbmVudFxuICB2YXIgYXN5bmNGYWN0b3J5O1xuICBpZiAoaXNVbmRlZihDdG9yLmNpZCkpIHtcbiAgICBhc3luY0ZhY3RvcnkgPSBDdG9yO1xuICAgIEN0b3IgPSByZXNvbHZlQXN5bmNDb21wb25lbnQoYXN5bmNGYWN0b3J5LCBiYXNlQ3Rvcik7XG4gICAgaWYgKEN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gcmV0dXJuIGEgcGxhY2Vob2xkZXIgbm9kZSBmb3IgYXN5bmMgY29tcG9uZW50LCB3aGljaCBpcyByZW5kZXJlZFxuICAgICAgLy8gYXMgYSBjb21tZW50IG5vZGUgYnV0IHByZXNlcnZlcyBhbGwgdGhlIHJhdyBpbmZvcm1hdGlvbiBmb3IgdGhlIG5vZGUuXG4gICAgICAvLyB0aGUgaW5mb3JtYXRpb24gd2lsbCBiZSB1c2VkIGZvciBhc3luYyBzZXJ2ZXItcmVuZGVyaW5nIGFuZCBoeWRyYXRpb24uXG4gICAgICByZXR1cm4gY3JlYXRlQXN5bmNQbGFjZWhvbGRlcihcbiAgICAgICAgYXN5bmNGYWN0b3J5LFxuICAgICAgICBkYXRhLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgdGFnXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZGF0YSA9IGRhdGEgfHwge307XG5cbiAgLy8gcmVzb2x2ZSBjb25zdHJ1Y3RvciBvcHRpb25zIGluIGNhc2UgZ2xvYmFsIG1peGlucyBhcmUgYXBwbGllZCBhZnRlclxuICAvLyBjb21wb25lbnQgY29uc3RydWN0b3IgY3JlYXRpb25cbiAgcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyhDdG9yKTtcblxuICAvLyB0cmFuc2Zvcm0gY29tcG9uZW50IHYtbW9kZWwgZGF0YSBpbnRvIHByb3BzICYgZXZlbnRzXG4gIGlmIChpc0RlZihkYXRhLm1vZGVsKSkge1xuICAgIHRyYW5zZm9ybU1vZGVsKEN0b3Iub3B0aW9ucywgZGF0YSk7XG4gIH1cblxuICAvLyBleHRyYWN0IHByb3BzXG4gIHZhciBwcm9wc0RhdGEgPSBleHRyYWN0UHJvcHNGcm9tVk5vZGVEYXRhKGRhdGEsIEN0b3IsIHRhZywgY29udGV4dCk7IC8vIGZpeGVkIGJ5IHh4eHh4eFxuXG4gIC8vIGZ1bmN0aW9uYWwgY29tcG9uZW50XG4gIGlmIChpc1RydWUoQ3Rvci5vcHRpb25zLmZ1bmN0aW9uYWwpKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQoQ3RvciwgcHJvcHNEYXRhLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbilcbiAgfVxuXG4gIC8vIGV4dHJhY3QgbGlzdGVuZXJzLCBzaW5jZSB0aGVzZSBuZWVkcyB0byBiZSB0cmVhdGVkIGFzXG4gIC8vIGNoaWxkIGNvbXBvbmVudCBsaXN0ZW5lcnMgaW5zdGVhZCBvZiBET00gbGlzdGVuZXJzXG4gIHZhciBsaXN0ZW5lcnMgPSBkYXRhLm9uO1xuICAvLyByZXBsYWNlIHdpdGggbGlzdGVuZXJzIHdpdGggLm5hdGl2ZSBtb2RpZmllclxuICAvLyBzbyBpdCBnZXRzIHByb2Nlc3NlZCBkdXJpbmcgcGFyZW50IGNvbXBvbmVudCBwYXRjaC5cbiAgZGF0YS5vbiA9IGRhdGEubmF0aXZlT247XG5cbiAgaWYgKGlzVHJ1ZShDdG9yLm9wdGlvbnMuYWJzdHJhY3QpKSB7XG4gICAgLy8gYWJzdHJhY3QgY29tcG9uZW50cyBkbyBub3Qga2VlcCBhbnl0aGluZ1xuICAgIC8vIG90aGVyIHRoYW4gcHJvcHMgJiBsaXN0ZW5lcnMgJiBzbG90XG5cbiAgICAvLyB3b3JrIGFyb3VuZCBmbG93XG4gICAgdmFyIHNsb3QgPSBkYXRhLnNsb3Q7XG4gICAgZGF0YSA9IHt9O1xuICAgIGlmIChzbG90KSB7XG4gICAgICBkYXRhLnNsb3QgPSBzbG90O1xuICAgIH1cbiAgfVxuXG4gIC8vIGluc3RhbGwgY29tcG9uZW50IG1hbmFnZW1lbnQgaG9va3Mgb250byB0aGUgcGxhY2Vob2xkZXIgbm9kZVxuICBpbnN0YWxsQ29tcG9uZW50SG9va3MoZGF0YSk7XG5cbiAgLy8gcmV0dXJuIGEgcGxhY2Vob2xkZXIgdm5vZGVcbiAgdmFyIG5hbWUgPSBDdG9yLm9wdGlvbnMubmFtZSB8fCB0YWc7XG4gIHZhciB2bm9kZSA9IG5ldyBWTm9kZShcbiAgICAoXCJ2dWUtY29tcG9uZW50LVwiICsgKEN0b3IuY2lkKSArIChuYW1lID8gKFwiLVwiICsgbmFtZSkgOiAnJykpLFxuICAgIGRhdGEsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHQsXG4gICAgeyBDdG9yOiBDdG9yLCBwcm9wc0RhdGE6IHByb3BzRGF0YSwgbGlzdGVuZXJzOiBsaXN0ZW5lcnMsIHRhZzogdGFnLCBjaGlsZHJlbjogY2hpbGRyZW4gfSxcbiAgICBhc3luY0ZhY3RvcnlcbiAgKTtcblxuICByZXR1cm4gdm5vZGVcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VGb3JWbm9kZSAoXG4gIHZub2RlLCAvLyB3ZSBrbm93IGl0J3MgTW91bnRlZENvbXBvbmVudFZOb2RlIGJ1dCBmbG93IGRvZXNuJ3RcbiAgcGFyZW50IC8vIGFjdGl2ZUluc3RhbmNlIGluIGxpZmVjeWNsZSBzdGF0ZVxuKSB7XG4gIHZhciBvcHRpb25zID0ge1xuICAgIF9pc0NvbXBvbmVudDogdHJ1ZSxcbiAgICBfcGFyZW50Vm5vZGU6IHZub2RlLFxuICAgIHBhcmVudDogcGFyZW50XG4gIH07XG4gIC8vIGNoZWNrIGlubGluZS10ZW1wbGF0ZSByZW5kZXIgZnVuY3Rpb25zXG4gIHZhciBpbmxpbmVUZW1wbGF0ZSA9IHZub2RlLmRhdGEuaW5saW5lVGVtcGxhdGU7XG4gIGlmIChpc0RlZihpbmxpbmVUZW1wbGF0ZSkpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IGlubGluZVRlbXBsYXRlLnJlbmRlcjtcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGlubGluZVRlbXBsYXRlLnN0YXRpY1JlbmRlckZucztcbiAgfVxuICByZXR1cm4gbmV3IHZub2RlLmNvbXBvbmVudE9wdGlvbnMuQ3RvcihvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBpbnN0YWxsQ29tcG9uZW50SG9va3MgKGRhdGEpIHtcbiAgdmFyIGhvb2tzID0gZGF0YS5ob29rIHx8IChkYXRhLmhvb2sgPSB7fSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3NUb01lcmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGhvb2tzVG9NZXJnZVtpXTtcbiAgICB2YXIgZXhpc3RpbmcgPSBob29rc1trZXldO1xuICAgIHZhciB0b01lcmdlID0gY29tcG9uZW50Vk5vZGVIb29rc1trZXldO1xuICAgIGlmIChleGlzdGluZyAhPT0gdG9NZXJnZSAmJiAhKGV4aXN0aW5nICYmIGV4aXN0aW5nLl9tZXJnZWQpKSB7XG4gICAgICBob29rc1trZXldID0gZXhpc3RpbmcgPyBtZXJnZUhvb2skMSh0b01lcmdlLCBleGlzdGluZykgOiB0b01lcmdlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUhvb2skMSAoZjEsIGYyKSB7XG4gIHZhciBtZXJnZWQgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIC8vIGZsb3cgY29tcGxhaW5zIGFib3V0IGV4dHJhIGFyZ3Mgd2hpY2ggaXMgd2h5IHdlIHVzZSBhbnlcbiAgICBmMShhLCBiKTtcbiAgICBmMihhLCBiKTtcbiAgfTtcbiAgbWVyZ2VkLl9tZXJnZWQgPSB0cnVlO1xuICByZXR1cm4gbWVyZ2VkXG59XG5cbi8vIHRyYW5zZm9ybSBjb21wb25lbnQgdi1tb2RlbCBpbmZvICh2YWx1ZSBhbmQgY2FsbGJhY2spIGludG9cbi8vIHByb3AgYW5kIGV2ZW50IGhhbmRsZXIgcmVzcGVjdGl2ZWx5LlxuZnVuY3Rpb24gdHJhbnNmb3JtTW9kZWwgKG9wdGlvbnMsIGRhdGEpIHtcbiAgdmFyIHByb3AgPSAob3B0aW9ucy5tb2RlbCAmJiBvcHRpb25zLm1vZGVsLnByb3ApIHx8ICd2YWx1ZSc7XG4gIHZhciBldmVudCA9IChvcHRpb25zLm1vZGVsICYmIG9wdGlvbnMubW9kZWwuZXZlbnQpIHx8ICdpbnB1dCdcbiAgOyhkYXRhLmF0dHJzIHx8IChkYXRhLmF0dHJzID0ge30pKVtwcm9wXSA9IGRhdGEubW9kZWwudmFsdWU7XG4gIHZhciBvbiA9IGRhdGEub24gfHwgKGRhdGEub24gPSB7fSk7XG4gIHZhciBleGlzdGluZyA9IG9uW2V2ZW50XTtcbiAgdmFyIGNhbGxiYWNrID0gZGF0YS5tb2RlbC5jYWxsYmFjaztcbiAgaWYgKGlzRGVmKGV4aXN0aW5nKSkge1xuICAgIGlmIChcbiAgICAgIEFycmF5LmlzQXJyYXkoZXhpc3RpbmcpXG4gICAgICAgID8gZXhpc3RpbmcuaW5kZXhPZihjYWxsYmFjaykgPT09IC0xXG4gICAgICAgIDogZXhpc3RpbmcgIT09IGNhbGxiYWNrXG4gICAgKSB7XG4gICAgICBvbltldmVudF0gPSBbY2FsbGJhY2tdLmNvbmNhdChleGlzdGluZyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG9uW2V2ZW50XSA9IGNhbGxiYWNrO1xuICB9XG59XG5cbi8qICAqL1xuXG52YXIgU0lNUExFX05PUk1BTElaRSA9IDE7XG52YXIgQUxXQVlTX05PUk1BTElaRSA9IDI7XG5cbi8vIHdyYXBwZXIgZnVuY3Rpb24gZm9yIHByb3ZpZGluZyBhIG1vcmUgZmxleGlibGUgaW50ZXJmYWNlXG4vLyB3aXRob3V0IGdldHRpbmcgeWVsbGVkIGF0IGJ5IGZsb3dcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQgKFxuICBjb250ZXh0LFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICBub3JtYWxpemF0aW9uVHlwZSxcbiAgYWx3YXlzTm9ybWFsaXplXG4pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgfHwgaXNQcmltaXRpdmUoZGF0YSkpIHtcbiAgICBub3JtYWxpemF0aW9uVHlwZSA9IGNoaWxkcmVuO1xuICAgIGNoaWxkcmVuID0gZGF0YTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChpc1RydWUoYWx3YXlzTm9ybWFsaXplKSkge1xuICAgIG5vcm1hbGl6YXRpb25UeXBlID0gQUxXQVlTX05PUk1BTElaRTtcbiAgfVxuICByZXR1cm4gX2NyZWF0ZUVsZW1lbnQoY29udGV4dCwgdGFnLCBkYXRhLCBjaGlsZHJlbiwgbm9ybWFsaXphdGlvblR5cGUpXG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50IChcbiAgY29udGV4dCxcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgbm9ybWFsaXphdGlvblR5cGVcbikge1xuICBpZiAoaXNEZWYoZGF0YSkgJiYgaXNEZWYoKGRhdGEpLl9fb2JfXykpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICBcIkF2b2lkIHVzaW5nIG9ic2VydmVkIGRhdGEgb2JqZWN0IGFzIHZub2RlIGRhdGE6IFwiICsgKEpTT04uc3RyaW5naWZ5KGRhdGEpKSArIFwiXFxuXCIgK1xuICAgICAgJ0Fsd2F5cyBjcmVhdGUgZnJlc2ggdm5vZGUgZGF0YSBvYmplY3RzIGluIGVhY2ggcmVuZGVyIScsXG4gICAgICBjb250ZXh0XG4gICAgKTtcbiAgICByZXR1cm4gY3JlYXRlRW1wdHlWTm9kZSgpXG4gIH1cbiAgLy8gb2JqZWN0IHN5bnRheCBpbiB2LWJpbmRcbiAgaWYgKGlzRGVmKGRhdGEpICYmIGlzRGVmKGRhdGEuaXMpKSB7XG4gICAgdGFnID0gZGF0YS5pcztcbiAgfVxuICBpZiAoIXRhZykge1xuICAgIC8vIGluIGNhc2Ugb2YgY29tcG9uZW50IDppcyBzZXQgdG8gZmFsc3kgdmFsdWVcbiAgICByZXR1cm4gY3JlYXRlRW1wdHlWTm9kZSgpXG4gIH1cbiAgLy8gd2FybiBhZ2FpbnN0IG5vbi1wcmltaXRpdmUga2V5XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgaXNEZWYoZGF0YSkgJiYgaXNEZWYoZGF0YS5rZXkpICYmICFpc1ByaW1pdGl2ZShkYXRhLmtleSlcbiAgKSB7XG4gICAge1xuICAgICAgd2FybihcbiAgICAgICAgJ0F2b2lkIHVzaW5nIG5vbi1wcmltaXRpdmUgdmFsdWUgYXMga2V5LCAnICtcbiAgICAgICAgJ3VzZSBzdHJpbmcvbnVtYmVyIHZhbHVlIGluc3RlYWQuJyxcbiAgICAgICAgY29udGV4dFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLy8gc3VwcG9ydCBzaW5nbGUgZnVuY3Rpb24gY2hpbGRyZW4gYXMgZGVmYXVsdCBzY29wZWQgc2xvdFxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiZcbiAgICB0eXBlb2YgY2hpbGRyZW5bMF0gPT09ICdmdW5jdGlvbidcbiAgKSB7XG4gICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgZGF0YS5zY29wZWRTbG90cyA9IHsgZGVmYXVsdDogY2hpbGRyZW5bMF0gfTtcbiAgICBjaGlsZHJlbi5sZW5ndGggPSAwO1xuICB9XG4gIGlmIChub3JtYWxpemF0aW9uVHlwZSA9PT0gQUxXQVlTX05PUk1BTElaRSkge1xuICAgIGNoaWxkcmVuID0gbm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICB9IGVsc2UgaWYgKG5vcm1hbGl6YXRpb25UeXBlID09PSBTSU1QTEVfTk9STUFMSVpFKSB7XG4gICAgY2hpbGRyZW4gPSBzaW1wbGVOb3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbik7XG4gIH1cbiAgdmFyIHZub2RlLCBucztcbiAgaWYgKHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIEN0b3I7XG4gICAgbnMgPSAoY29udGV4dC4kdm5vZGUgJiYgY29udGV4dC4kdm5vZGUubnMpIHx8IGNvbmZpZy5nZXRUYWdOYW1lc3BhY2UodGFnKTtcbiAgICBpZiAoY29uZmlnLmlzUmVzZXJ2ZWRUYWcodGFnKSkge1xuICAgICAgLy8gcGxhdGZvcm0gYnVpbHQtaW4gZWxlbWVudHNcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGlzRGVmKGRhdGEpICYmIGlzRGVmKGRhdGEubmF0aXZlT24pKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwiVGhlIC5uYXRpdmUgbW9kaWZpZXIgZm9yIHYtb24gaXMgb25seSB2YWxpZCBvbiBjb21wb25lbnRzIGJ1dCBpdCB3YXMgdXNlZCBvbiA8XCIgKyB0YWcgKyBcIj4uXCIpLFxuICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHZub2RlID0gbmV3IFZOb2RlKFxuICAgICAgICBjb25maWcucGFyc2VQbGF0Zm9ybVRhZ05hbWUodGFnKSwgZGF0YSwgY2hpbGRyZW4sXG4gICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb250ZXh0XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoKCFkYXRhIHx8ICFkYXRhLnByZSkgJiYgaXNEZWYoQ3RvciA9IHJlc29sdmVBc3NldChjb250ZXh0LiRvcHRpb25zLCAnY29tcG9uZW50cycsIHRhZykpKSB7XG4gICAgICAvLyBjb21wb25lbnRcbiAgICAgIHZub2RlID0gY3JlYXRlQ29tcG9uZW50KEN0b3IsIGRhdGEsIGNvbnRleHQsIGNoaWxkcmVuLCB0YWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB1bmtub3duIG9yIHVubGlzdGVkIG5hbWVzcGFjZWQgZWxlbWVudHNcbiAgICAgIC8vIGNoZWNrIGF0IHJ1bnRpbWUgYmVjYXVzZSBpdCBtYXkgZ2V0IGFzc2lnbmVkIGEgbmFtZXNwYWNlIHdoZW4gaXRzXG4gICAgICAvLyBwYXJlbnQgbm9ybWFsaXplcyBjaGlsZHJlblxuICAgICAgdm5vZGUgPSBuZXcgVk5vZGUoXG4gICAgICAgIHRhZywgZGF0YSwgY2hpbGRyZW4sXG4gICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb250ZXh0XG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBkaXJlY3QgY29tcG9uZW50IG9wdGlvbnMgLyBjb25zdHJ1Y3RvclxuICAgIHZub2RlID0gY3JlYXRlQ29tcG9uZW50KHRhZywgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KHZub2RlKSkge1xuICAgIHJldHVybiB2bm9kZVxuICB9IGVsc2UgaWYgKGlzRGVmKHZub2RlKSkge1xuICAgIGlmIChpc0RlZihucykpIHsgYXBwbHlOUyh2bm9kZSwgbnMpOyB9XG4gICAgaWYgKGlzRGVmKGRhdGEpKSB7IHJlZ2lzdGVyRGVlcEJpbmRpbmdzKGRhdGEpOyB9XG4gICAgcmV0dXJuIHZub2RlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5TlMgKHZub2RlLCBucywgZm9yY2UpIHtcbiAgdm5vZGUubnMgPSBucztcbiAgaWYgKHZub2RlLnRhZyA9PT0gJ2ZvcmVpZ25PYmplY3QnKSB7XG4gICAgLy8gdXNlIGRlZmF1bHQgbmFtZXNwYWNlIGluc2lkZSBmb3JlaWduT2JqZWN0XG4gICAgbnMgPSB1bmRlZmluZWQ7XG4gICAgZm9yY2UgPSB0cnVlO1xuICB9XG4gIGlmIChpc0RlZih2bm9kZS5jaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gdm5vZGUuY2hpbGRyZW5baV07XG4gICAgICBpZiAoaXNEZWYoY2hpbGQudGFnKSAmJiAoXG4gICAgICAgIGlzVW5kZWYoY2hpbGQubnMpIHx8IChpc1RydWUoZm9yY2UpICYmIGNoaWxkLnRhZyAhPT0gJ3N2ZycpKSkge1xuICAgICAgICBhcHBseU5TKGNoaWxkLCBucywgZm9yY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyByZWYgIzUzMThcbi8vIG5lY2Vzc2FyeSB0byBlbnN1cmUgcGFyZW50IHJlLXJlbmRlciB3aGVuIGRlZXAgYmluZGluZ3MgbGlrZSA6c3R5bGUgYW5kXG4vLyA6Y2xhc3MgYXJlIHVzZWQgb24gc2xvdCBub2Rlc1xuZnVuY3Rpb24gcmVnaXN0ZXJEZWVwQmluZGluZ3MgKGRhdGEpIHtcbiAgaWYgKGlzT2JqZWN0KGRhdGEuc3R5bGUpKSB7XG4gICAgdHJhdmVyc2UoZGF0YS5zdHlsZSk7XG4gIH1cbiAgaWYgKGlzT2JqZWN0KGRhdGEuY2xhc3MpKSB7XG4gICAgdHJhdmVyc2UoZGF0YS5jbGFzcyk7XG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRSZW5kZXIgKHZtKSB7XG4gIHZtLl92bm9kZSA9IG51bGw7IC8vIHRoZSByb290IG9mIHRoZSBjaGlsZCB0cmVlXG4gIHZtLl9zdGF0aWNUcmVlcyA9IG51bGw7IC8vIHYtb25jZSBjYWNoZWQgdHJlZXNcbiAgdmFyIG9wdGlvbnMgPSB2bS4kb3B0aW9ucztcbiAgdmFyIHBhcmVudFZub2RlID0gdm0uJHZub2RlID0gb3B0aW9ucy5fcGFyZW50Vm5vZGU7IC8vIHRoZSBwbGFjZWhvbGRlciBub2RlIGluIHBhcmVudCB0cmVlXG4gIHZhciByZW5kZXJDb250ZXh0ID0gcGFyZW50Vm5vZGUgJiYgcGFyZW50Vm5vZGUuY29udGV4dDtcbiAgdm0uJHNsb3RzID0gcmVzb2x2ZVNsb3RzKG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuLCByZW5kZXJDb250ZXh0KTtcbiAgdm0uJHNjb3BlZFNsb3RzID0gZW1wdHlPYmplY3Q7XG4gIC8vIGJpbmQgdGhlIGNyZWF0ZUVsZW1lbnQgZm4gdG8gdGhpcyBpbnN0YW5jZVxuICAvLyBzbyB0aGF0IHdlIGdldCBwcm9wZXIgcmVuZGVyIGNvbnRleHQgaW5zaWRlIGl0LlxuICAvLyBhcmdzIG9yZGVyOiB0YWcsIGRhdGEsIGNoaWxkcmVuLCBub3JtYWxpemF0aW9uVHlwZSwgYWx3YXlzTm9ybWFsaXplXG4gIC8vIGludGVybmFsIHZlcnNpb24gaXMgdXNlZCBieSByZW5kZXIgZnVuY3Rpb25zIGNvbXBpbGVkIGZyb20gdGVtcGxhdGVzXG4gIHZtLl9jID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodm0sIGEsIGIsIGMsIGQsIGZhbHNlKTsgfTtcbiAgLy8gbm9ybWFsaXphdGlvbiBpcyBhbHdheXMgYXBwbGllZCBmb3IgdGhlIHB1YmxpYyB2ZXJzaW9uLCB1c2VkIGluXG4gIC8vIHVzZXItd3JpdHRlbiByZW5kZXIgZnVuY3Rpb25zLlxuICB2bS4kY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KHZtLCBhLCBiLCBjLCBkLCB0cnVlKTsgfTtcblxuICAvLyAkYXR0cnMgJiAkbGlzdGVuZXJzIGFyZSBleHBvc2VkIGZvciBlYXNpZXIgSE9DIGNyZWF0aW9uLlxuICAvLyB0aGV5IG5lZWQgdG8gYmUgcmVhY3RpdmUgc28gdGhhdCBIT0NzIHVzaW5nIHRoZW0gYXJlIGFsd2F5cyB1cGRhdGVkXG4gIHZhciBwYXJlbnREYXRhID0gcGFyZW50Vm5vZGUgJiYgcGFyZW50Vm5vZGUuZGF0YTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGRlZmluZVJlYWN0aXZlJCQxKHZtLCAnJGF0dHJzJywgcGFyZW50RGF0YSAmJiBwYXJlbnREYXRhLmF0dHJzIHx8IGVtcHR5T2JqZWN0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAhaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50ICYmIHdhcm4oXCIkYXR0cnMgaXMgcmVhZG9ubHkuXCIsIHZtKTtcbiAgICB9LCB0cnVlKTtcbiAgICBkZWZpbmVSZWFjdGl2ZSQkMSh2bSwgJyRsaXN0ZW5lcnMnLCBvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3QsIGZ1bmN0aW9uICgpIHtcbiAgICAgICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgJiYgd2FybihcIiRsaXN0ZW5lcnMgaXMgcmVhZG9ubHkuXCIsIHZtKTtcbiAgICB9LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBkZWZpbmVSZWFjdGl2ZSQkMSh2bSwgJyRhdHRycycsIHBhcmVudERhdGEgJiYgcGFyZW50RGF0YS5hdHRycyB8fCBlbXB0eU9iamVjdCwgbnVsbCwgdHJ1ZSk7XG4gICAgZGVmaW5lUmVhY3RpdmUkJDEodm0sICckbGlzdGVuZXJzJywgb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzIHx8IGVtcHR5T2JqZWN0LCBudWxsLCB0cnVlKTtcbiAgfVxufVxuXG52YXIgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlID0gbnVsbDtcblxuZnVuY3Rpb24gcmVuZGVyTWl4aW4gKFZ1ZSkge1xuICAvLyBpbnN0YWxsIHJ1bnRpbWUgY29udmVuaWVuY2UgaGVscGVyc1xuICBpbnN0YWxsUmVuZGVySGVscGVycyhWdWUucHJvdG90eXBlKTtcblxuICBWdWUucHJvdG90eXBlLiRuZXh0VGljayA9IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiBuZXh0VGljayhmbiwgdGhpcylcbiAgfTtcblxuICBWdWUucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICB2YXIgcmVmID0gdm0uJG9wdGlvbnM7XG4gICAgdmFyIHJlbmRlciA9IHJlZi5yZW5kZXI7XG4gICAgdmFyIF9wYXJlbnRWbm9kZSA9IHJlZi5fcGFyZW50Vm5vZGU7XG5cbiAgICBpZiAoX3BhcmVudFZub2RlKSB7XG4gICAgICB2bS4kc2NvcGVkU2xvdHMgPSBub3JtYWxpemVTY29wZWRTbG90cyhcbiAgICAgICAgX3BhcmVudFZub2RlLmRhdGEuc2NvcGVkU2xvdHMsXG4gICAgICAgIHZtLiRzbG90cyxcbiAgICAgICAgdm0uJHNjb3BlZFNsb3RzXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHNldCBwYXJlbnQgdm5vZGUuIHRoaXMgYWxsb3dzIHJlbmRlciBmdW5jdGlvbnMgdG8gaGF2ZSBhY2Nlc3NcbiAgICAvLyB0byB0aGUgZGF0YSBvbiB0aGUgcGxhY2Vob2xkZXIgbm9kZS5cbiAgICB2bS4kdm5vZGUgPSBfcGFyZW50Vm5vZGU7XG4gICAgLy8gcmVuZGVyIHNlbGZcbiAgICB2YXIgdm5vZGU7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFRoZXJlJ3Mgbm8gbmVlZCB0byBtYWludGFpbiBhIHN0YWNrIGJlY2F1c2UgYWxsIHJlbmRlciBmbnMgYXJlIGNhbGxlZFxuICAgICAgLy8gc2VwYXJhdGVseSBmcm9tIG9uZSBhbm90aGVyLiBOZXN0ZWQgY29tcG9uZW50J3MgcmVuZGVyIGZucyBhcmUgY2FsbGVkXG4gICAgICAvLyB3aGVuIHBhcmVudCBjb21wb25lbnQgaXMgcGF0Y2hlZC5cbiAgICAgIGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSA9IHZtO1xuICAgICAgdm5vZGUgPSByZW5kZXIuY2FsbCh2bS5fcmVuZGVyUHJveHksIHZtLiRjcmVhdGVFbGVtZW50KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJyZW5kZXJcIik7XG4gICAgICAvLyByZXR1cm4gZXJyb3IgcmVuZGVyIHJlc3VsdCxcbiAgICAgIC8vIG9yIHByZXZpb3VzIHZub2RlIHRvIHByZXZlbnQgcmVuZGVyIGVycm9yIGNhdXNpbmcgYmxhbmsgY29tcG9uZW50XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdm0uJG9wdGlvbnMucmVuZGVyRXJyb3IpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2bm9kZSA9IHZtLiRvcHRpb25zLnJlbmRlckVycm9yLmNhbGwodm0uX3JlbmRlclByb3h5LCB2bS4kY3JlYXRlRWxlbWVudCwgZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJyZW5kZXJFcnJvclwiKTtcbiAgICAgICAgICB2bm9kZSA9IHZtLl92bm9kZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSA9IG51bGw7XG4gICAgfVxuICAgIC8vIGlmIHRoZSByZXR1cm5lZCBhcnJheSBjb250YWlucyBvbmx5IGEgc2luZ2xlIG5vZGUsIGFsbG93IGl0XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodm5vZGUpICYmIHZub2RlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdm5vZGUgPSB2bm9kZVswXTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGVtcHR5IHZub2RlIGluIGNhc2UgdGhlIHJlbmRlciBmdW5jdGlvbiBlcnJvcmVkIG91dFxuICAgIGlmICghKHZub2RlIGluc3RhbmNlb2YgVk5vZGUpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBBcnJheS5pc0FycmF5KHZub2RlKSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdNdWx0aXBsZSByb290IG5vZGVzIHJldHVybmVkIGZyb20gcmVuZGVyIGZ1bmN0aW9uLiBSZW5kZXIgZnVuY3Rpb24gJyArXG4gICAgICAgICAgJ3Nob3VsZCByZXR1cm4gYSBzaW5nbGUgcm9vdCBub2RlLicsXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHZub2RlID0gY3JlYXRlRW1wdHlWTm9kZSgpO1xuICAgIH1cbiAgICAvLyBzZXQgcGFyZW50XG4gICAgdm5vZGUucGFyZW50ID0gX3BhcmVudFZub2RlO1xuICAgIHJldHVybiB2bm9kZVxuICB9O1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gZW5zdXJlQ3RvciAoY29tcCwgYmFzZSkge1xuICBpZiAoXG4gICAgY29tcC5fX2VzTW9kdWxlIHx8XG4gICAgKGhhc1N5bWJvbCAmJiBjb21wW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdNb2R1bGUnKVxuICApIHtcbiAgICBjb21wID0gY29tcC5kZWZhdWx0O1xuICB9XG4gIHJldHVybiBpc09iamVjdChjb21wKVxuICAgID8gYmFzZS5leHRlbmQoY29tcClcbiAgICA6IGNvbXBcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXN5bmNQbGFjZWhvbGRlciAoXG4gIGZhY3RvcnksXG4gIGRhdGEsXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuLFxuICB0YWdcbikge1xuICB2YXIgbm9kZSA9IGNyZWF0ZUVtcHR5Vk5vZGUoKTtcbiAgbm9kZS5hc3luY0ZhY3RvcnkgPSBmYWN0b3J5O1xuICBub2RlLmFzeW5jTWV0YSA9IHsgZGF0YTogZGF0YSwgY29udGV4dDogY29udGV4dCwgY2hpbGRyZW46IGNoaWxkcmVuLCB0YWc6IHRhZyB9O1xuICByZXR1cm4gbm9kZVxufVxuXG5mdW5jdGlvbiByZXNvbHZlQXN5bmNDb21wb25lbnQgKFxuICBmYWN0b3J5LFxuICBiYXNlQ3RvclxuKSB7XG4gIGlmIChpc1RydWUoZmFjdG9yeS5lcnJvcikgJiYgaXNEZWYoZmFjdG9yeS5lcnJvckNvbXApKSB7XG4gICAgcmV0dXJuIGZhY3RvcnkuZXJyb3JDb21wXG4gIH1cblxuICBpZiAoaXNEZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICByZXR1cm4gZmFjdG9yeS5yZXNvbHZlZFxuICB9XG5cbiAgdmFyIG93bmVyID0gY3VycmVudFJlbmRlcmluZ0luc3RhbmNlO1xuICBpZiAob3duZXIgJiYgaXNEZWYoZmFjdG9yeS5vd25lcnMpICYmIGZhY3Rvcnkub3duZXJzLmluZGV4T2Yob3duZXIpID09PSAtMSkge1xuICAgIC8vIGFscmVhZHkgcGVuZGluZ1xuICAgIGZhY3Rvcnkub3duZXJzLnB1c2gob3duZXIpO1xuICB9XG5cbiAgaWYgKGlzVHJ1ZShmYWN0b3J5LmxvYWRpbmcpICYmIGlzRGVmKGZhY3RvcnkubG9hZGluZ0NvbXApKSB7XG4gICAgcmV0dXJuIGZhY3RvcnkubG9hZGluZ0NvbXBcbiAgfVxuXG4gIGlmIChvd25lciAmJiAhaXNEZWYoZmFjdG9yeS5vd25lcnMpKSB7XG4gICAgdmFyIG93bmVycyA9IGZhY3Rvcnkub3duZXJzID0gW293bmVyXTtcbiAgICB2YXIgc3luYyA9IHRydWU7XG4gICAgdmFyIHRpbWVyTG9hZGluZyA9IG51bGw7XG4gICAgdmFyIHRpbWVyVGltZW91dCA9IG51bGxcblxuICAgIDsob3duZXIpLiRvbignaG9vazpkZXN0cm95ZWQnLCBmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmUob3duZXJzLCBvd25lcik7IH0pO1xuXG4gICAgdmFyIGZvcmNlUmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlckNvbXBsZXRlZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvd25lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIChvd25lcnNbaV0pLiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVuZGVyQ29tcGxldGVkKSB7XG4gICAgICAgIG93bmVycy5sZW5ndGggPSAwO1xuICAgICAgICBpZiAodGltZXJMb2FkaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyTG9hZGluZyk7XG4gICAgICAgICAgdGltZXJMb2FkaW5nID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZXJUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyVGltZW91dCk7XG4gICAgICAgICAgdGltZXJUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVzb2x2ZSA9IG9uY2UoZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8gY2FjaGUgcmVzb2x2ZWRcbiAgICAgIGZhY3RvcnkucmVzb2x2ZWQgPSBlbnN1cmVDdG9yKHJlcywgYmFzZUN0b3IpO1xuICAgICAgLy8gaW52b2tlIGNhbGxiYWNrcyBvbmx5IGlmIHRoaXMgaXMgbm90IGEgc3luY2hyb25vdXMgcmVzb2x2ZVxuICAgICAgLy8gKGFzeW5jIHJlc29sdmVzIGFyZSBzaGltbWVkIGFzIHN5bmNocm9ub3VzIGR1cmluZyBTU1IpXG4gICAgICBpZiAoIXN5bmMpIHtcbiAgICAgICAgZm9yY2VSZW5kZXIodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25lcnMubGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciByZWplY3QgPSBvbmNlKGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJGYWlsZWQgdG8gcmVzb2x2ZSBhc3luYyBjb21wb25lbnQ6IFwiICsgKFN0cmluZyhmYWN0b3J5KSkgK1xuICAgICAgICAocmVhc29uID8gKFwiXFxuUmVhc29uOiBcIiArIHJlYXNvbikgOiAnJylcbiAgICAgICk7XG4gICAgICBpZiAoaXNEZWYoZmFjdG9yeS5lcnJvckNvbXApKSB7XG4gICAgICAgIGZhY3RvcnkuZXJyb3IgPSB0cnVlO1xuICAgICAgICBmb3JjZVJlbmRlcih0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciByZXMgPSBmYWN0b3J5KHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICBpZiAoaXNPYmplY3QocmVzKSkge1xuICAgICAgaWYgKGlzUHJvbWlzZShyZXMpKSB7XG4gICAgICAgIC8vICgpID0+IFByb21pc2VcbiAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICAgICAgICByZXMudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzUHJvbWlzZShyZXMuY29tcG9uZW50KSkge1xuICAgICAgICByZXMuY29tcG9uZW50LnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgICBpZiAoaXNEZWYocmVzLmVycm9yKSkge1xuICAgICAgICAgIGZhY3RvcnkuZXJyb3JDb21wID0gZW5zdXJlQ3RvcihyZXMuZXJyb3IsIGJhc2VDdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlZihyZXMubG9hZGluZykpIHtcbiAgICAgICAgICBmYWN0b3J5LmxvYWRpbmdDb21wID0gZW5zdXJlQ3RvcihyZXMubG9hZGluZywgYmFzZUN0b3IpO1xuICAgICAgICAgIGlmIChyZXMuZGVsYXkgPT09IDApIHtcbiAgICAgICAgICAgIGZhY3RvcnkubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpbWVyTG9hZGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aW1lckxvYWRpbmcgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAoaXNVbmRlZihmYWN0b3J5LnJlc29sdmVkKSAmJiBpc1VuZGVmKGZhY3RvcnkuZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JjZVJlbmRlcihmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlcy5kZWxheSB8fCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlZihyZXMudGltZW91dCkpIHtcbiAgICAgICAgICB0aW1lclRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRpbWVyVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZihmYWN0b3J5LnJlc29sdmVkKSkge1xuICAgICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuICAgICAgICAgICAgICAgICAgPyAoXCJ0aW1lb3V0IChcIiArIChyZXMudGltZW91dCkgKyBcIm1zKVwiKVxuICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgcmVzLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3luYyA9IGZhbHNlO1xuICAgIC8vIHJldHVybiBpbiBjYXNlIHJlc29sdmVkIHN5bmNocm9ub3VzbHlcbiAgICByZXR1cm4gZmFjdG9yeS5sb2FkaW5nXG4gICAgICA/IGZhY3RvcnkubG9hZGluZ0NvbXBcbiAgICAgIDogZmFjdG9yeS5yZXNvbHZlZFxuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpc0FzeW5jUGxhY2Vob2xkZXIgKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuaXNDb21tZW50ICYmIG5vZGUuYXN5bmNGYWN0b3J5XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBnZXRGaXJzdENvbXBvbmVudENoaWxkIChjaGlsZHJlbikge1xuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IGNoaWxkcmVuW2ldO1xuICAgICAgaWYgKGlzRGVmKGMpICYmIChpc0RlZihjLmNvbXBvbmVudE9wdGlvbnMpIHx8IGlzQXN5bmNQbGFjZWhvbGRlcihjKSkpIHtcbiAgICAgICAgcmV0dXJuIGNcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0RXZlbnRzICh2bSkge1xuICB2bS5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdm0uX2hhc0hvb2tFdmVudCA9IGZhbHNlO1xuICAvLyBpbml0IHBhcmVudCBhdHRhY2hlZCBldmVudHNcbiAgdmFyIGxpc3RlbmVycyA9IHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM7XG4gIGlmIChsaXN0ZW5lcnMpIHtcbiAgICB1cGRhdGVDb21wb25lbnRMaXN0ZW5lcnModm0sIGxpc3RlbmVycyk7XG4gIH1cbn1cblxudmFyIHRhcmdldDtcblxuZnVuY3Rpb24gYWRkIChldmVudCwgZm4pIHtcbiAgdGFyZ2V0LiRvbihldmVudCwgZm4pO1xufVxuXG5mdW5jdGlvbiByZW1vdmUkMSAoZXZlbnQsIGZuKSB7XG4gIHRhcmdldC4kb2ZmKGV2ZW50LCBmbik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9uY2VIYW5kbGVyIChldmVudCwgZm4pIHtcbiAgdmFyIF90YXJnZXQgPSB0YXJnZXQ7XG4gIHJldHVybiBmdW5jdGlvbiBvbmNlSGFuZGxlciAoKSB7XG4gICAgdmFyIHJlcyA9IGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHJlcyAhPT0gbnVsbCkge1xuICAgICAgX3RhcmdldC4kb2ZmKGV2ZW50LCBvbmNlSGFuZGxlcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyAoXG4gIHZtLFxuICBsaXN0ZW5lcnMsXG4gIG9sZExpc3RlbmVyc1xuKSB7XG4gIHRhcmdldCA9IHZtO1xuICB1cGRhdGVMaXN0ZW5lcnMobGlzdGVuZXJzLCBvbGRMaXN0ZW5lcnMgfHwge30sIGFkZCwgcmVtb3ZlJDEsIGNyZWF0ZU9uY2VIYW5kbGVyLCB2bSk7XG4gIHRhcmdldCA9IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZXZlbnRzTWl4aW4gKFZ1ZSkge1xuICB2YXIgaG9va1JFID0gL15ob29rOi87XG4gIFZ1ZS5wcm90b3R5cGUuJG9uID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGV2ZW50Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2bS4kb24oZXZlbnRbaV0sIGZuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgKHZtLl9ldmVudHNbZXZlbnRdIHx8ICh2bS5fZXZlbnRzW2V2ZW50XSA9IFtdKSkucHVzaChmbik7XG4gICAgICAvLyBvcHRpbWl6ZSBob29rOmV2ZW50IGNvc3QgYnkgdXNpbmcgYSBib29sZWFuIGZsYWcgbWFya2VkIGF0IHJlZ2lzdHJhdGlvblxuICAgICAgLy8gaW5zdGVhZCBvZiBhIGhhc2ggbG9va3VwXG4gICAgICBpZiAoaG9va1JFLnRlc3QoZXZlbnQpKSB7XG4gICAgICAgIHZtLl9oYXNIb29rRXZlbnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRvbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgZnVuY3Rpb24gb24gKCkge1xuICAgICAgdm0uJG9mZihldmVudCwgb24pO1xuICAgICAgZm4uYXBwbHkodm0sIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIG9uLmZuID0gZm47XG4gICAgdm0uJG9uKGV2ZW50LCBvbik7XG4gICAgcmV0dXJuIHZtXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kb2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgLy8gYWxsXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2bS5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIHJldHVybiB2bVxuICAgIH1cbiAgICAvLyBhcnJheSBvZiBldmVudHNcbiAgICBpZiAoQXJyYXkuaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAodmFyIGkkMSA9IDAsIGwgPSBldmVudC5sZW5ndGg7IGkkMSA8IGw7IGkkMSsrKSB7XG4gICAgICAgIHZtLiRvZmYoZXZlbnRbaSQxXSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIC8vIHNwZWNpZmljIGV2ZW50XG4gICAgdmFyIGNicyA9IHZtLl9ldmVudHNbZXZlbnRdO1xuICAgIGlmICghY2JzKSB7XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgaWYgKCFmbikge1xuICAgICAgdm0uX2V2ZW50c1tldmVudF0gPSBudWxsO1xuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIC8vIHNwZWNpZmljIGhhbmRsZXJcbiAgICB2YXIgY2I7XG4gICAgdmFyIGkgPSBjYnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNiID0gY2JzW2ldO1xuICAgICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcbiAgICAgICAgY2JzLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZtXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBsb3dlckNhc2VFdmVudCA9IGV2ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAobG93ZXJDYXNlRXZlbnQgIT09IGV2ZW50ICYmIHZtLl9ldmVudHNbbG93ZXJDYXNlRXZlbnRdKSB7XG4gICAgICAgIHRpcChcbiAgICAgICAgICBcIkV2ZW50IFxcXCJcIiArIGxvd2VyQ2FzZUV2ZW50ICsgXCJcXFwiIGlzIGVtaXR0ZWQgaW4gY29tcG9uZW50IFwiICtcbiAgICAgICAgICAoZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpICsgXCIgYnV0IHRoZSBoYW5kbGVyIGlzIHJlZ2lzdGVyZWQgZm9yIFxcXCJcIiArIGV2ZW50ICsgXCJcXFwiLiBcIiArXG4gICAgICAgICAgXCJOb3RlIHRoYXQgSFRNTCBhdHRyaWJ1dGVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlIGFuZCB5b3UgY2Fubm90IHVzZSBcIiArXG4gICAgICAgICAgXCJ2LW9uIHRvIGxpc3RlbiB0byBjYW1lbENhc2UgZXZlbnRzIHdoZW4gdXNpbmcgaW4tRE9NIHRlbXBsYXRlcy4gXCIgK1xuICAgICAgICAgIFwiWW91IHNob3VsZCBwcm9iYWJseSB1c2UgXFxcIlwiICsgKGh5cGhlbmF0ZShldmVudCkpICsgXCJcXFwiIGluc3RlYWQgb2YgXFxcIlwiICsgZXZlbnQgKyBcIlxcXCIuXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGNicyA9IHZtLl9ldmVudHNbZXZlbnRdO1xuICAgIGlmIChjYnMpIHtcbiAgICAgIGNicyA9IGNicy5sZW5ndGggPiAxID8gdG9BcnJheShjYnMpIDogY2JzO1xuICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgICB2YXIgaW5mbyA9IFwiZXZlbnQgaGFuZGxlciBmb3IgXFxcIlwiICsgZXZlbnQgKyBcIlxcXCJcIjtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpbnZva2VXaXRoRXJyb3JIYW5kbGluZyhjYnNbaV0sIHZtLCBhcmdzLCB2bSwgaW5mbyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2bVxuICB9O1xufVxuXG4vKiAgKi9cblxudmFyIGFjdGl2ZUluc3RhbmNlID0gbnVsbDtcbnZhciBpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgPSBmYWxzZTtcblxuZnVuY3Rpb24gc2V0QWN0aXZlSW5zdGFuY2Uodm0pIHtcbiAgdmFyIHByZXZBY3RpdmVJbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlO1xuICBhY3RpdmVJbnN0YW5jZSA9IHZtO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGFjdGl2ZUluc3RhbmNlID0gcHJldkFjdGl2ZUluc3RhbmNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRMaWZlY3ljbGUgKHZtKSB7XG4gIHZhciBvcHRpb25zID0gdm0uJG9wdGlvbnM7XG5cbiAgLy8gbG9jYXRlIGZpcnN0IG5vbi1hYnN0cmFjdCBwYXJlbnRcbiAgdmFyIHBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICBpZiAocGFyZW50ICYmICFvcHRpb25zLmFic3RyYWN0KSB7XG4gICAgd2hpbGUgKHBhcmVudC4kb3B0aW9ucy5hYnN0cmFjdCAmJiBwYXJlbnQuJHBhcmVudCkge1xuICAgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnQ7XG4gICAgfVxuICAgIHBhcmVudC4kY2hpbGRyZW4ucHVzaCh2bSk7XG4gIH1cblxuICB2bS4kcGFyZW50ID0gcGFyZW50O1xuICB2bS4kcm9vdCA9IHBhcmVudCA/IHBhcmVudC4kcm9vdCA6IHZtO1xuXG4gIHZtLiRjaGlsZHJlbiA9IFtdO1xuICB2bS4kcmVmcyA9IHt9O1xuXG4gIHZtLl93YXRjaGVyID0gbnVsbDtcbiAgdm0uX2luYWN0aXZlID0gbnVsbDtcbiAgdm0uX2RpcmVjdEluYWN0aXZlID0gZmFsc2U7XG4gIHZtLl9pc01vdW50ZWQgPSBmYWxzZTtcbiAgdm0uX2lzRGVzdHJveWVkID0gZmFsc2U7XG4gIHZtLl9pc0JlaW5nRGVzdHJveWVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGxpZmVjeWNsZU1peGluIChWdWUpIHtcbiAgVnVlLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24gKHZub2RlLCBoeWRyYXRpbmcpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIHZhciBwcmV2RWwgPSB2bS4kZWw7XG4gICAgdmFyIHByZXZWbm9kZSA9IHZtLl92bm9kZTtcbiAgICB2YXIgcmVzdG9yZUFjdGl2ZUluc3RhbmNlID0gc2V0QWN0aXZlSW5zdGFuY2Uodm0pO1xuICAgIHZtLl92bm9kZSA9IHZub2RlO1xuICAgIC8vIFZ1ZS5wcm90b3R5cGUuX19wYXRjaF9fIGlzIGluamVjdGVkIGluIGVudHJ5IHBvaW50c1xuICAgIC8vIGJhc2VkIG9uIHRoZSByZW5kZXJpbmcgYmFja2VuZCB1c2VkLlxuICAgIGlmICghcHJldlZub2RlKSB7XG4gICAgICAvLyBpbml0aWFsIHJlbmRlclxuICAgICAgdm0uJGVsID0gdm0uX19wYXRjaF9fKHZtLiRlbCwgdm5vZGUsIGh5ZHJhdGluZywgZmFsc2UgLyogcmVtb3ZlT25seSAqLyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHVwZGF0ZXNcbiAgICAgIHZtLiRlbCA9IHZtLl9fcGF0Y2hfXyhwcmV2Vm5vZGUsIHZub2RlKTtcbiAgICB9XG4gICAgcmVzdG9yZUFjdGl2ZUluc3RhbmNlKCk7XG4gICAgLy8gdXBkYXRlIF9fdnVlX18gcmVmZXJlbmNlXG4gICAgaWYgKHByZXZFbCkge1xuICAgICAgcHJldkVsLl9fdnVlX18gPSBudWxsO1xuICAgIH1cbiAgICBpZiAodm0uJGVsKSB7XG4gICAgICB2bS4kZWwuX192dWVfXyA9IHZtO1xuICAgIH1cbiAgICAvLyBpZiBwYXJlbnQgaXMgYW4gSE9DLCB1cGRhdGUgaXRzICRlbCBhcyB3ZWxsXG4gICAgaWYgKHZtLiR2bm9kZSAmJiB2bS4kcGFyZW50ICYmIHZtLiR2bm9kZSA9PT0gdm0uJHBhcmVudC5fdm5vZGUpIHtcbiAgICAgIHZtLiRwYXJlbnQuJGVsID0gdm0uJGVsO1xuICAgIH1cbiAgICAvLyB1cGRhdGVkIGhvb2sgaXMgY2FsbGVkIGJ5IHRoZSBzY2hlZHVsZXIgdG8gZW5zdXJlIHRoYXQgY2hpbGRyZW4gYXJlXG4gICAgLy8gdXBkYXRlZCBpbiBhIHBhcmVudCdzIHVwZGF0ZWQgaG9vay5cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRmb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmICh2bS5fd2F0Y2hlcikge1xuICAgICAgdm0uX3dhdGNoZXIudXBkYXRlKCk7XG4gICAgfVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAodm0uX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZURlc3Ryb3knKTtcbiAgICB2bS5faXNCZWluZ0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSBwYXJlbnRcbiAgICB2YXIgcGFyZW50ID0gdm0uJHBhcmVudDtcbiAgICBpZiAocGFyZW50ICYmICFwYXJlbnQuX2lzQmVpbmdEZXN0cm95ZWQgJiYgIXZtLiRvcHRpb25zLmFic3RyYWN0KSB7XG4gICAgICByZW1vdmUocGFyZW50LiRjaGlsZHJlbiwgdm0pO1xuICAgIH1cbiAgICAvLyB0ZWFyZG93biB3YXRjaGVyc1xuICAgIGlmICh2bS5fd2F0Y2hlcikge1xuICAgICAgdm0uX3dhdGNoZXIudGVhcmRvd24oKTtcbiAgICB9XG4gICAgdmFyIGkgPSB2bS5fd2F0Y2hlcnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHZtLl93YXRjaGVyc1tpXS50ZWFyZG93bigpO1xuICAgIH1cbiAgICAvLyByZW1vdmUgcmVmZXJlbmNlIGZyb20gZGF0YSBvYlxuICAgIC8vIGZyb3plbiBvYmplY3QgbWF5IG5vdCBoYXZlIG9ic2VydmVyLlxuICAgIGlmICh2bS5fZGF0YS5fX29iX18pIHtcbiAgICAgIHZtLl9kYXRhLl9fb2JfXy52bUNvdW50LS07XG4gICAgfVxuICAgIC8vIGNhbGwgdGhlIGxhc3QgaG9vay4uLlxuICAgIHZtLl9pc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgLy8gaW52b2tlIGRlc3Ryb3kgaG9va3Mgb24gY3VycmVudCByZW5kZXJlZCB0cmVlXG4gICAgdm0uX19wYXRjaF9fKHZtLl92bm9kZSwgbnVsbCk7XG4gICAgLy8gZmlyZSBkZXN0cm95ZWQgaG9va1xuICAgIGNhbGxIb29rKHZtLCAnZGVzdHJveWVkJyk7XG4gICAgLy8gdHVybiBvZmYgYWxsIGluc3RhbmNlIGxpc3RlbmVycy5cbiAgICB2bS4kb2ZmKCk7XG4gICAgLy8gcmVtb3ZlIF9fdnVlX18gcmVmZXJlbmNlXG4gICAgaWYgKHZtLiRlbCkge1xuICAgICAgdm0uJGVsLl9fdnVlX18gPSBudWxsO1xuICAgIH1cbiAgICAvLyByZWxlYXNlIGNpcmN1bGFyIHJlZmVyZW5jZSAoIzY3NTkpXG4gICAgaWYgKHZtLiR2bm9kZSkge1xuICAgICAgdm0uJHZub2RlLnBhcmVudCA9IG51bGw7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDaGlsZENvbXBvbmVudCAoXG4gIHZtLFxuICBwcm9wc0RhdGEsXG4gIGxpc3RlbmVycyxcbiAgcGFyZW50Vm5vZGUsXG4gIHJlbmRlckNoaWxkcmVuXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgPSB0cnVlO1xuICB9XG5cbiAgLy8gZGV0ZXJtaW5lIHdoZXRoZXIgY29tcG9uZW50IGhhcyBzbG90IGNoaWxkcmVuXG4gIC8vIHdlIG5lZWQgdG8gZG8gdGhpcyBiZWZvcmUgb3ZlcndyaXRpbmcgJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuLlxuXG4gIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBkeW5hbWljIHNjb3BlZFNsb3RzIChoYW5kLXdyaXR0ZW4gb3IgY29tcGlsZWQgYnV0IHdpdGhcbiAgLy8gZHluYW1pYyBzbG90IG5hbWVzKS4gU3RhdGljIHNjb3BlZCBzbG90cyBjb21waWxlZCBmcm9tIHRlbXBsYXRlIGhhcyB0aGVcbiAgLy8gXCIkc3RhYmxlXCIgbWFya2VyLlxuICB2YXIgbmV3U2NvcGVkU2xvdHMgPSBwYXJlbnRWbm9kZS5kYXRhLnNjb3BlZFNsb3RzO1xuICB2YXIgb2xkU2NvcGVkU2xvdHMgPSB2bS4kc2NvcGVkU2xvdHM7XG4gIHZhciBoYXNEeW5hbWljU2NvcGVkU2xvdCA9ICEhKFxuICAgIChuZXdTY29wZWRTbG90cyAmJiAhbmV3U2NvcGVkU2xvdHMuJHN0YWJsZSkgfHxcbiAgICAob2xkU2NvcGVkU2xvdHMgIT09IGVtcHR5T2JqZWN0ICYmICFvbGRTY29wZWRTbG90cy4kc3RhYmxlKSB8fFxuICAgIChuZXdTY29wZWRTbG90cyAmJiB2bS4kc2NvcGVkU2xvdHMuJGtleSAhPT0gbmV3U2NvcGVkU2xvdHMuJGtleSlcbiAgKTtcblxuICAvLyBBbnkgc3RhdGljIHNsb3QgY2hpbGRyZW4gZnJvbSB0aGUgcGFyZW50IG1heSBoYXZlIGNoYW5nZWQgZHVyaW5nIHBhcmVudCdzXG4gIC8vIHVwZGF0ZS4gRHluYW1pYyBzY29wZWQgc2xvdHMgbWF5IGFsc28gaGF2ZSBjaGFuZ2VkLiBJbiBzdWNoIGNhc2VzLCBhIGZvcmNlZFxuICAvLyB1cGRhdGUgaXMgbmVjZXNzYXJ5IHRvIGVuc3VyZSBjb3JyZWN0bmVzcy5cbiAgdmFyIG5lZWRzRm9yY2VVcGRhdGUgPSAhIShcbiAgICByZW5kZXJDaGlsZHJlbiB8fCAgICAgICAgICAgICAgIC8vIGhhcyBuZXcgc3RhdGljIHNsb3RzXG4gICAgdm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuIHx8ICAvLyBoYXMgb2xkIHN0YXRpYyBzbG90c1xuICAgIGhhc0R5bmFtaWNTY29wZWRTbG90XG4gICk7XG5cbiAgdm0uJG9wdGlvbnMuX3BhcmVudFZub2RlID0gcGFyZW50Vm5vZGU7XG4gIHZtLiR2bm9kZSA9IHBhcmVudFZub2RlOyAvLyB1cGRhdGUgdm0ncyBwbGFjZWhvbGRlciBub2RlIHdpdGhvdXQgcmUtcmVuZGVyXG5cbiAgaWYgKHZtLl92bm9kZSkgeyAvLyB1cGRhdGUgY2hpbGQgdHJlZSdzIHBhcmVudFxuICAgIHZtLl92bm9kZS5wYXJlbnQgPSBwYXJlbnRWbm9kZTtcbiAgfVxuICB2bS4kb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4gPSByZW5kZXJDaGlsZHJlbjtcblxuICAvLyB1cGRhdGUgJGF0dHJzIGFuZCAkbGlzdGVuZXJzIGhhc2hcbiAgLy8gdGhlc2UgYXJlIGFsc28gcmVhY3RpdmUgc28gdGhleSBtYXkgdHJpZ2dlciBjaGlsZCB1cGRhdGUgaWYgdGhlIGNoaWxkXG4gIC8vIHVzZWQgdGhlbSBkdXJpbmcgcmVuZGVyXG4gIHZtLiRhdHRycyA9IHBhcmVudFZub2RlLmRhdGEuYXR0cnMgfHwgZW1wdHlPYmplY3Q7XG4gIHZtLiRsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3Q7XG5cbiAgLy8gdXBkYXRlIHByb3BzXG4gIGlmIChwcm9wc0RhdGEgJiYgdm0uJG9wdGlvbnMucHJvcHMpIHtcbiAgICB0b2dnbGVPYnNlcnZpbmcoZmFsc2UpO1xuICAgIHZhciBwcm9wcyA9IHZtLl9wcm9wcztcbiAgICB2YXIgcHJvcEtleXMgPSB2bS4kb3B0aW9ucy5fcHJvcEtleXMgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IHByb3BLZXlzW2ldO1xuICAgICAgdmFyIHByb3BPcHRpb25zID0gdm0uJG9wdGlvbnMucHJvcHM7IC8vIHd0ZiBmbG93P1xuICAgICAgcHJvcHNba2V5XSA9IHZhbGlkYXRlUHJvcChrZXksIHByb3BPcHRpb25zLCBwcm9wc0RhdGEsIHZtKTtcbiAgICB9XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKHRydWUpO1xuICAgIC8vIGtlZXAgYSBjb3B5IG9mIHJhdyBwcm9wc0RhdGFcbiAgICB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgPSBwcm9wc0RhdGE7XG4gIH1cbiAgXG4gIC8vIGZpeGVkIGJ5IHh4eHh4eCB1cGRhdGUgcHJvcGVydGllcyhtcCBydW50aW1lKVxuICB2bS5fJHVwZGF0ZVByb3BlcnRpZXMgJiYgdm0uXyR1cGRhdGVQcm9wZXJ0aWVzKHZtKTtcbiAgXG4gIC8vIHVwZGF0ZSBsaXN0ZW5lcnNcbiAgbGlzdGVuZXJzID0gbGlzdGVuZXJzIHx8IGVtcHR5T2JqZWN0O1xuICB2YXIgb2xkTGlzdGVuZXJzID0gdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgdXBkYXRlQ29tcG9uZW50TGlzdGVuZXJzKHZtLCBsaXN0ZW5lcnMsIG9sZExpc3RlbmVycyk7XG5cbiAgLy8gcmVzb2x2ZSBzbG90cyArIGZvcmNlIHVwZGF0ZSBpZiBoYXMgY2hpbGRyZW5cbiAgaWYgKG5lZWRzRm9yY2VVcGRhdGUpIHtcbiAgICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHMocmVuZGVyQ2hpbGRyZW4sIHBhcmVudFZub2RlLmNvbnRleHQpO1xuICAgIHZtLiRmb3JjZVVwZGF0ZSgpO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0luSW5hY3RpdmVUcmVlICh2bSkge1xuICB3aGlsZSAodm0gJiYgKHZtID0gdm0uJHBhcmVudCkpIHtcbiAgICBpZiAodm0uX2luYWN0aXZlKSB7IHJldHVybiB0cnVlIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICBpZiAoZGlyZWN0KSB7XG4gICAgdm0uX2RpcmVjdEluYWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKGlzSW5JbmFjdGl2ZVRyZWUodm0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0gZWxzZSBpZiAodm0uX2RpcmVjdEluYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZtLl9pbmFjdGl2ZSB8fCB2bS5faW5hY3RpdmUgPT09IG51bGwpIHtcbiAgICB2bS5faW5hY3RpdmUgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZtLiRjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bS4kY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2FjdGl2YXRlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICBpZiAoZGlyZWN0KSB7XG4gICAgdm0uX2RpcmVjdEluYWN0aXZlID0gdHJ1ZTtcbiAgICBpZiAoaXNJbkluYWN0aXZlVHJlZSh2bSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuICBpZiAoIXZtLl9pbmFjdGl2ZSkge1xuICAgIHZtLl9pbmFjdGl2ZSA9IHRydWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bS4kY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bS4kY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2RlYWN0aXZhdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEhvb2sgKHZtLCBob29rKSB7XG4gIC8vICM3NTczIGRpc2FibGUgZGVwIGNvbGxlY3Rpb24gd2hlbiBpbnZva2luZyBsaWZlY3ljbGUgaG9va3NcbiAgcHVzaFRhcmdldCgpO1xuICB2YXIgaGFuZGxlcnMgPSB2bS4kb3B0aW9uc1tob29rXTtcbiAgdmFyIGluZm8gPSBob29rICsgXCIgaG9va1wiO1xuICBpZiAoaGFuZGxlcnMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoaGFuZGxlcnNbaV0sIHZtLCBudWxsLCB2bSwgaW5mbyk7XG4gICAgfVxuICB9XG4gIGlmICh2bS5faGFzSG9va0V2ZW50KSB7XG4gICAgdm0uJGVtaXQoJ2hvb2s6JyArIGhvb2spO1xuICB9XG4gIHBvcFRhcmdldCgpO1xufVxuXG4vKiAgKi9cblxudmFyIE1BWF9VUERBVEVfQ09VTlQgPSAxMDA7XG5cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGFjdGl2YXRlZENoaWxkcmVuID0gW107XG52YXIgaGFzID0ge307XG52YXIgY2lyY3VsYXIgPSB7fTtcbnZhciB3YWl0aW5nID0gZmFsc2U7XG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbnZhciBpbmRleCA9IDA7XG5cbi8qKlxuICogUmVzZXQgdGhlIHNjaGVkdWxlcidzIHN0YXRlLlxuICovXG5mdW5jdGlvbiByZXNldFNjaGVkdWxlclN0YXRlICgpIHtcbiAgaW5kZXggPSBxdWV1ZS5sZW5ndGggPSBhY3RpdmF0ZWRDaGlsZHJlbi5sZW5ndGggPSAwO1xuICBoYXMgPSB7fTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjaXJjdWxhciA9IHt9O1xuICB9XG4gIHdhaXRpbmcgPSBmbHVzaGluZyA9IGZhbHNlO1xufVxuXG4vLyBBc3luYyBlZGdlIGNhc2UgIzY1NjYgcmVxdWlyZXMgc2F2aW5nIHRoZSB0aW1lc3RhbXAgd2hlbiBldmVudCBsaXN0ZW5lcnMgYXJlXG4vLyBhdHRhY2hlZC4gSG93ZXZlciwgY2FsbGluZyBwZXJmb3JtYW5jZS5ub3coKSBoYXMgYSBwZXJmIG92ZXJoZWFkIGVzcGVjaWFsbHlcbi8vIGlmIHRoZSBwYWdlIGhhcyB0aG91c2FuZHMgb2YgZXZlbnQgbGlzdGVuZXJzLiBJbnN0ZWFkLCB3ZSB0YWtlIGEgdGltZXN0YW1wXG4vLyBldmVyeSB0aW1lIHRoZSBzY2hlZHVsZXIgZmx1c2hlcyBhbmQgdXNlIHRoYXQgZm9yIGFsbCBldmVudCBsaXN0ZW5lcnNcbi8vIGF0dGFjaGVkIGR1cmluZyB0aGF0IGZsdXNoLlxudmFyIGN1cnJlbnRGbHVzaFRpbWVzdGFtcCA9IDA7XG5cbi8vIEFzeW5jIGVkZ2UgY2FzZSBmaXggcmVxdWlyZXMgc3RvcmluZyBhbiBldmVudCBsaXN0ZW5lcidzIGF0dGFjaCB0aW1lc3RhbXAuXG52YXIgZ2V0Tm93ID0gRGF0ZS5ub3c7XG5cbi8vIERldGVybWluZSB3aGF0IGV2ZW50IHRpbWVzdGFtcCB0aGUgYnJvd3NlciBpcyB1c2luZy4gQW5ub3lpbmdseSwgdGhlXG4vLyB0aW1lc3RhbXAgY2FuIGVpdGhlciBiZSBoaS1yZXMgKHJlbGF0aXZlIHRvIHBhZ2UgbG9hZCkgb3IgbG93LXJlc1xuLy8gKHJlbGF0aXZlIHRvIFVOSVggZXBvY2gpLCBzbyBpbiBvcmRlciB0byBjb21wYXJlIHRpbWUgd2UgaGF2ZSB0byB1c2UgdGhlXG4vLyBzYW1lIHRpbWVzdGFtcCB0eXBlIHdoZW4gc2F2aW5nIHRoZSBmbHVzaCB0aW1lc3RhbXAuXG4vLyBBbGwgSUUgdmVyc2lvbnMgdXNlIGxvdy1yZXMgZXZlbnQgdGltZXN0YW1wcywgYW5kIGhhdmUgcHJvYmxlbWF0aWMgY2xvY2tcbi8vIGltcGxlbWVudGF0aW9ucyAoIzk2MzIpXG5pZiAoaW5Ccm93c2VyICYmICFpc0lFKSB7XG4gIHZhciBwZXJmb3JtYW5jZSA9IHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgaWYgKFxuICAgIHBlcmZvcm1hbmNlICYmXG4gICAgdHlwZW9mIHBlcmZvcm1hbmNlLm5vdyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIGdldE5vdygpID4gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50JykudGltZVN0YW1wXG4gICkge1xuICAgIC8vIGlmIHRoZSBldmVudCB0aW1lc3RhbXAsIGFsdGhvdWdoIGV2YWx1YXRlZCBBRlRFUiB0aGUgRGF0ZS5ub3coKSwgaXNcbiAgICAvLyBzbWFsbGVyIHRoYW4gaXQsIGl0IG1lYW5zIHRoZSBldmVudCBpcyB1c2luZyBhIGhpLXJlcyB0aW1lc3RhbXAsXG4gICAgLy8gYW5kIHdlIG5lZWQgdG8gdXNlIHRoZSBoaS1yZXMgdmVyc2lvbiBmb3IgZXZlbnQgbGlzdGVuZXIgdGltZXN0YW1wcyBhc1xuICAgIC8vIHdlbGwuXG4gICAgZ2V0Tm93ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7IH07XG4gIH1cbn1cblxuLyoqXG4gKiBGbHVzaCBib3RoIHF1ZXVlcyBhbmQgcnVuIHRoZSB3YXRjaGVycy5cbiAqL1xuZnVuY3Rpb24gZmx1c2hTY2hlZHVsZXJRdWV1ZSAoKSB7XG4gIGN1cnJlbnRGbHVzaFRpbWVzdGFtcCA9IGdldE5vdygpO1xuICBmbHVzaGluZyA9IHRydWU7XG4gIHZhciB3YXRjaGVyLCBpZDtcblxuICAvLyBTb3J0IHF1ZXVlIGJlZm9yZSBmbHVzaC5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQ6XG4gIC8vIDEuIENvbXBvbmVudHMgYXJlIHVwZGF0ZWQgZnJvbSBwYXJlbnQgdG8gY2hpbGQuIChiZWNhdXNlIHBhcmVudCBpcyBhbHdheXNcbiAgLy8gICAgY3JlYXRlZCBiZWZvcmUgdGhlIGNoaWxkKVxuICAvLyAyLiBBIGNvbXBvbmVudCdzIHVzZXIgd2F0Y2hlcnMgYXJlIHJ1biBiZWZvcmUgaXRzIHJlbmRlciB3YXRjaGVyIChiZWNhdXNlXG4gIC8vICAgIHVzZXIgd2F0Y2hlcnMgYXJlIGNyZWF0ZWQgYmVmb3JlIHRoZSByZW5kZXIgd2F0Y2hlcilcbiAgLy8gMy4gSWYgYSBjb21wb25lbnQgaXMgZGVzdHJveWVkIGR1cmluZyBhIHBhcmVudCBjb21wb25lbnQncyB3YXRjaGVyIHJ1bixcbiAgLy8gICAgaXRzIHdhdGNoZXJzIGNhbiBiZSBza2lwcGVkLlxuICBxdWV1ZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmlkIC0gYi5pZDsgfSk7XG5cbiAgLy8gZG8gbm90IGNhY2hlIGxlbmd0aCBiZWNhdXNlIG1vcmUgd2F0Y2hlcnMgbWlnaHQgYmUgcHVzaGVkXG4gIC8vIGFzIHdlIHJ1biBleGlzdGluZyB3YXRjaGVyc1xuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBxdWV1ZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICB3YXRjaGVyID0gcXVldWVbaW5kZXhdO1xuICAgIGlmICh3YXRjaGVyLmJlZm9yZSkge1xuICAgICAgd2F0Y2hlci5iZWZvcmUoKTtcbiAgICB9XG4gICAgaWQgPSB3YXRjaGVyLmlkO1xuICAgIGhhc1tpZF0gPSBudWxsO1xuICAgIHdhdGNoZXIucnVuKCk7XG4gICAgLy8gaW4gZGV2IGJ1aWxkLCBjaGVjayBhbmQgc3RvcCBjaXJjdWxhciB1cGRhdGVzLlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGhhc1tpZF0gIT0gbnVsbCkge1xuICAgICAgY2lyY3VsYXJbaWRdID0gKGNpcmN1bGFyW2lkXSB8fCAwKSArIDE7XG4gICAgICBpZiAoY2lyY3VsYXJbaWRdID4gTUFYX1VQREFURV9DT1VOVCkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdZb3UgbWF5IGhhdmUgYW4gaW5maW5pdGUgdXBkYXRlIGxvb3AgJyArIChcbiAgICAgICAgICAgIHdhdGNoZXIudXNlclxuICAgICAgICAgICAgICA/IChcImluIHdhdGNoZXIgd2l0aCBleHByZXNzaW9uIFxcXCJcIiArICh3YXRjaGVyLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpXG4gICAgICAgICAgICAgIDogXCJpbiBhIGNvbXBvbmVudCByZW5kZXIgZnVuY3Rpb24uXCJcbiAgICAgICAgICApLFxuICAgICAgICAgIHdhdGNoZXIudm1cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBrZWVwIGNvcGllcyBvZiBwb3N0IHF1ZXVlcyBiZWZvcmUgcmVzZXR0aW5nIHN0YXRlXG4gIHZhciBhY3RpdmF0ZWRRdWV1ZSA9IGFjdGl2YXRlZENoaWxkcmVuLnNsaWNlKCk7XG4gIHZhciB1cGRhdGVkUXVldWUgPSBxdWV1ZS5zbGljZSgpO1xuXG4gIHJlc2V0U2NoZWR1bGVyU3RhdGUoKTtcblxuICAvLyBjYWxsIGNvbXBvbmVudCB1cGRhdGVkIGFuZCBhY3RpdmF0ZWQgaG9va3NcbiAgY2FsbEFjdGl2YXRlZEhvb2tzKGFjdGl2YXRlZFF1ZXVlKTtcbiAgY2FsbFVwZGF0ZWRIb29rcyh1cGRhdGVkUXVldWUpO1xuXG4gIC8vIGRldnRvb2wgaG9va1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGRldnRvb2xzICYmIGNvbmZpZy5kZXZ0b29scykge1xuICAgIGRldnRvb2xzLmVtaXQoJ2ZsdXNoJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbFVwZGF0ZWRIb29rcyAocXVldWUpIHtcbiAgdmFyIGkgPSBxdWV1ZS5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgd2F0Y2hlciA9IHF1ZXVlW2ldO1xuICAgIHZhciB2bSA9IHdhdGNoZXIudm07XG4gICAgaWYgKHZtLl93YXRjaGVyID09PSB3YXRjaGVyICYmIHZtLl9pc01vdW50ZWQgJiYgIXZtLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgY2FsbEhvb2sodm0sICd1cGRhdGVkJyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUXVldWUgYSBrZXB0LWFsaXZlIGNvbXBvbmVudCB0aGF0IHdhcyBhY3RpdmF0ZWQgZHVyaW5nIHBhdGNoLlxuICogVGhlIHF1ZXVlIHdpbGwgYmUgcHJvY2Vzc2VkIGFmdGVyIHRoZSBlbnRpcmUgdHJlZSBoYXMgYmVlbiBwYXRjaGVkLlxuICovXG5mdW5jdGlvbiBxdWV1ZUFjdGl2YXRlZENvbXBvbmVudCAodm0pIHtcbiAgLy8gc2V0dGluZyBfaW5hY3RpdmUgdG8gZmFsc2UgaGVyZSBzbyB0aGF0IGEgcmVuZGVyIGZ1bmN0aW9uIGNhblxuICAvLyByZWx5IG9uIGNoZWNraW5nIHdoZXRoZXIgaXQncyBpbiBhbiBpbmFjdGl2ZSB0cmVlIChlLmcuIHJvdXRlci12aWV3KVxuICB2bS5faW5hY3RpdmUgPSBmYWxzZTtcbiAgYWN0aXZhdGVkQ2hpbGRyZW4ucHVzaCh2bSk7XG59XG5cbmZ1bmN0aW9uIGNhbGxBY3RpdmF0ZWRIb29rcyAocXVldWUpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgIHF1ZXVlW2ldLl9pbmFjdGl2ZSA9IHRydWU7XG4gICAgYWN0aXZhdGVDaGlsZENvbXBvbmVudChxdWV1ZVtpXSwgdHJ1ZSAvKiB0cnVlICovKTtcbiAgfVxufVxuXG4vKipcbiAqIFB1c2ggYSB3YXRjaGVyIGludG8gdGhlIHdhdGNoZXIgcXVldWUuXG4gKiBKb2JzIHdpdGggZHVwbGljYXRlIElEcyB3aWxsIGJlIHNraXBwZWQgdW5sZXNzIGl0J3NcbiAqIHB1c2hlZCB3aGVuIHRoZSBxdWV1ZSBpcyBiZWluZyBmbHVzaGVkLlxuICovXG5mdW5jdGlvbiBxdWV1ZVdhdGNoZXIgKHdhdGNoZXIpIHtcbiAgdmFyIGlkID0gd2F0Y2hlci5pZDtcbiAgaWYgKGhhc1tpZF0gPT0gbnVsbCkge1xuICAgIGhhc1tpZF0gPSB0cnVlO1xuICAgIGlmICghZmx1c2hpbmcpIHtcbiAgICAgIHF1ZXVlLnB1c2god2F0Y2hlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGFscmVhZHkgZmx1c2hpbmcsIHNwbGljZSB0aGUgd2F0Y2hlciBiYXNlZCBvbiBpdHMgaWRcbiAgICAgIC8vIGlmIGFscmVhZHkgcGFzdCBpdHMgaWQsIGl0IHdpbGwgYmUgcnVuIG5leHQgaW1tZWRpYXRlbHkuXG4gICAgICB2YXIgaSA9IHF1ZXVlLmxlbmd0aCAtIDE7XG4gICAgICB3aGlsZSAoaSA+IGluZGV4ICYmIHF1ZXVlW2ldLmlkID4gd2F0Y2hlci5pZCkge1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgICBxdWV1ZS5zcGxpY2UoaSArIDEsIDAsIHdhdGNoZXIpO1xuICAgIH1cbiAgICAvLyBxdWV1ZSB0aGUgZmx1c2hcbiAgICBpZiAoIXdhaXRpbmcpIHtcbiAgICAgIHdhaXRpbmcgPSB0cnVlO1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhY29uZmlnLmFzeW5jKSB7XG4gICAgICAgIGZsdXNoU2NoZWR1bGVyUXVldWUoKTtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBuZXh0VGljayhmbHVzaFNjaGVkdWxlclF1ZXVlKTtcbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cblxuXG52YXIgdWlkJDIgPSAwO1xuXG4vKipcbiAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICogYW5kIGZpcmVzIGNhbGxiYWNrIHdoZW4gdGhlIGV4cHJlc3Npb24gdmFsdWUgY2hhbmdlcy5cbiAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuICovXG52YXIgV2F0Y2hlciA9IGZ1bmN0aW9uIFdhdGNoZXIgKFxuICB2bSxcbiAgZXhwT3JGbixcbiAgY2IsXG4gIG9wdGlvbnMsXG4gIGlzUmVuZGVyV2F0Y2hlclxuKSB7XG4gIHRoaXMudm0gPSB2bTtcbiAgaWYgKGlzUmVuZGVyV2F0Y2hlcikge1xuICAgIHZtLl93YXRjaGVyID0gdGhpcztcbiAgfVxuICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKTtcbiAgLy8gb3B0aW9uc1xuICBpZiAob3B0aW9ucykge1xuICAgIHRoaXMuZGVlcCA9ICEhb3B0aW9ucy5kZWVwO1xuICAgIHRoaXMudXNlciA9ICEhb3B0aW9ucy51c2VyO1xuICAgIHRoaXMubGF6eSA9ICEhb3B0aW9ucy5sYXp5O1xuICAgIHRoaXMuc3luYyA9ICEhb3B0aW9ucy5zeW5jO1xuICAgIHRoaXMuYmVmb3JlID0gb3B0aW9ucy5iZWZvcmU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kZWVwID0gdGhpcy51c2VyID0gdGhpcy5sYXp5ID0gdGhpcy5zeW5jID0gZmFsc2U7XG4gIH1cbiAgdGhpcy5jYiA9IGNiO1xuICB0aGlzLmlkID0gKyt1aWQkMjsgLy8gdWlkIGZvciBiYXRjaGluZ1xuICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIHRoaXMuZGlydHkgPSB0aGlzLmxhenk7IC8vIGZvciBsYXp5IHdhdGNoZXJzXG4gIHRoaXMuZGVwcyA9IFtdO1xuICB0aGlzLm5ld0RlcHMgPSBbXTtcbiAgdGhpcy5kZXBJZHMgPSBuZXcgX1NldCgpO1xuICB0aGlzLm5ld0RlcElkcyA9IG5ldyBfU2V0KCk7XG4gIHRoaXMuZXhwcmVzc2lvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbiAgICA/IGV4cE9yRm4udG9TdHJpbmcoKVxuICAgIDogJyc7XG4gIC8vIHBhcnNlIGV4cHJlc3Npb24gZm9yIGdldHRlclxuICBpZiAodHlwZW9mIGV4cE9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmdldHRlciA9IGV4cE9yRm47XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5nZXR0ZXIgPSBwYXJzZVBhdGgoZXhwT3JGbik7XG4gICAgaWYgKCF0aGlzLmdldHRlcikge1xuICAgICAgdGhpcy5nZXR0ZXIgPSBub29wO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIkZhaWxlZCB3YXRjaGluZyBwYXRoOiBcXFwiXCIgKyBleHBPckZuICsgXCJcXFwiIFwiICtcbiAgICAgICAgJ1dhdGNoZXIgb25seSBhY2NlcHRzIHNpbXBsZSBkb3QtZGVsaW1pdGVkIHBhdGhzLiAnICtcbiAgICAgICAgJ0ZvciBmdWxsIGNvbnRyb2wsIHVzZSBhIGZ1bmN0aW9uIGluc3RlYWQuJyxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHRoaXMudmFsdWUgPSB0aGlzLmxhenlcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogdGhpcy5nZXQoKTtcbn07XG5cbi8qKlxuICogRXZhbHVhdGUgdGhlIGdldHRlciwgYW5kIHJlLWNvbGxlY3QgZGVwZW5kZW5jaWVzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKCkge1xuICBwdXNoVGFyZ2V0KHRoaXMpO1xuICB2YXIgdmFsdWU7XG4gIHZhciB2bSA9IHRoaXMudm07XG4gIHRyeSB7XG4gICAgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHZtLCB2bSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICBoYW5kbGVFcnJvcihlLCB2bSwgKFwiZ2V0dGVyIGZvciB3YXRjaGVyIFxcXCJcIiArICh0aGlzLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZVxuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICAvLyBcInRvdWNoXCIgZXZlcnkgcHJvcGVydHkgc28gdGhleSBhcmUgYWxsIHRyYWNrZWQgYXNcbiAgICAvLyBkZXBlbmRlbmNpZXMgZm9yIGRlZXAgd2F0Y2hpbmdcbiAgICBpZiAodGhpcy5kZWVwKSB7XG4gICAgICB0cmF2ZXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIHBvcFRhcmdldCgpO1xuICAgIHRoaXMuY2xlYW51cERlcHMoKTtcbiAgfVxuICByZXR1cm4gdmFsdWVcbn07XG5cbi8qKlxuICogQWRkIGEgZGVwZW5kZW5jeSB0byB0aGlzIGRpcmVjdGl2ZS5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuYWRkRGVwID0gZnVuY3Rpb24gYWRkRGVwIChkZXApIHtcbiAgdmFyIGlkID0gZGVwLmlkO1xuICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhpZCkpIHtcbiAgICB0aGlzLm5ld0RlcElkcy5hZGQoaWQpO1xuICAgIHRoaXMubmV3RGVwcy5wdXNoKGRlcCk7XG4gICAgaWYgKCF0aGlzLmRlcElkcy5oYXMoaWQpKSB7XG4gICAgICBkZXAuYWRkU3ViKHRoaXMpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5jbGVhbnVwRGVwcyA9IGZ1bmN0aW9uIGNsZWFudXBEZXBzICgpIHtcbiAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdmFyIGRlcCA9IHRoaXMuZGVwc1tpXTtcbiAgICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhkZXAuaWQpKSB7XG4gICAgICBkZXAucmVtb3ZlU3ViKHRoaXMpO1xuICAgIH1cbiAgfVxuICB2YXIgdG1wID0gdGhpcy5kZXBJZHM7XG4gIHRoaXMuZGVwSWRzID0gdGhpcy5uZXdEZXBJZHM7XG4gIHRoaXMubmV3RGVwSWRzID0gdG1wO1xuICB0aGlzLm5ld0RlcElkcy5jbGVhcigpO1xuICB0bXAgPSB0aGlzLmRlcHM7XG4gIHRoaXMuZGVwcyA9IHRoaXMubmV3RGVwcztcbiAgdGhpcy5uZXdEZXBzID0gdG1wO1xuICB0aGlzLm5ld0RlcHMubGVuZ3RoID0gMDtcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlciBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgZGVwZW5kZW5jeSBjaGFuZ2VzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodGhpcy5sYXp5KSB7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gIH0gZWxzZSBpZiAodGhpcy5zeW5jKSB7XG4gICAgdGhpcy5ydW4oKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZVdhdGNoZXIodGhpcyk7XG4gIH1cbn07XG5cbi8qKlxuICogU2NoZWR1bGVyIGpvYiBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgc2NoZWR1bGVyLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiBydW4gKCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpO1xuICAgIGlmIChcbiAgICAgIHZhbHVlICE9PSB0aGlzLnZhbHVlIHx8XG4gICAgICAvLyBEZWVwIHdhdGNoZXJzIGFuZCB3YXRjaGVycyBvbiBPYmplY3QvQXJyYXlzIHNob3VsZCBmaXJlIGV2ZW5cbiAgICAgIC8vIHdoZW4gdGhlIHZhbHVlIGlzIHRoZSBzYW1lLCBiZWNhdXNlIHRoZSB2YWx1ZSBtYXlcbiAgICAgIC8vIGhhdmUgbXV0YXRlZC5cbiAgICAgIGlzT2JqZWN0KHZhbHVlKSB8fFxuICAgICAgdGhpcy5kZWVwXG4gICAgKSB7XG4gICAgICAvLyBzZXQgbmV3IHZhbHVlXG4gICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaGFuZGxlRXJyb3IoZSwgdGhpcy52bSwgKFwiY2FsbGJhY2sgZm9yIHdhdGNoZXIgXFxcIlwiICsgKHRoaXMuZXhwcmVzc2lvbikgKyBcIlxcXCJcIikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNiLmNhbGwodGhpcy52bSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRXZhbHVhdGUgdGhlIHZhbHVlIG9mIHRoZSB3YXRjaGVyLlxuICogVGhpcyBvbmx5IGdldHMgY2FsbGVkIGZvciBsYXp5IHdhdGNoZXJzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uIGV2YWx1YXRlICgpIHtcbiAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gIHRoaXMuZGlydHkgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogRGVwZW5kIG9uIGFsbCBkZXBzIGNvbGxlY3RlZCBieSB0aGlzIHdhdGNoZXIuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uIGRlcGVuZCAoKSB7XG4gIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIHRoaXMuZGVwc1tpXS5kZXBlbmQoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgc2VsZiBmcm9tIGFsbCBkZXBlbmRlbmNpZXMnIHN1YnNjcmliZXIgbGlzdC5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUudGVhcmRvd24gPSBmdW5jdGlvbiB0ZWFyZG93biAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gdm0ncyB3YXRjaGVyIGxpc3RcbiAgICAvLyB0aGlzIGlzIGEgc29tZXdoYXQgZXhwZW5zaXZlIG9wZXJhdGlvbiBzbyB3ZSBza2lwIGl0XG4gICAgLy8gaWYgdGhlIHZtIGlzIGJlaW5nIGRlc3Ryb3llZC5cbiAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgIHJlbW92ZSh0aGlzLnZtLl93YXRjaGVycywgdGhpcyk7XG4gICAgfVxuICAgIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmRlcHNbaV0ucmVtb3ZlU3ViKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59O1xuXG4vKiAgKi9cblxudmFyIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbiA9IHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IG5vb3AsXG4gIHNldDogbm9vcFxufTtcblxuZnVuY3Rpb24gcHJveHkgKHRhcmdldCwgc291cmNlS2V5LCBrZXkpIHtcbiAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IGZ1bmN0aW9uIHByb3h5R2V0dGVyICgpIHtcbiAgICByZXR1cm4gdGhpc1tzb3VyY2VLZXldW2tleV1cbiAgfTtcbiAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IGZ1bmN0aW9uIHByb3h5U2V0dGVyICh2YWwpIHtcbiAgICB0aGlzW3NvdXJjZUtleV1ba2V5XSA9IHZhbDtcbiAgfTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24pO1xufVxuXG5mdW5jdGlvbiBpbml0U3RhdGUgKHZtKSB7XG4gIHZtLl93YXRjaGVycyA9IFtdO1xuICB2YXIgb3B0cyA9IHZtLiRvcHRpb25zO1xuICBpZiAob3B0cy5wcm9wcykgeyBpbml0UHJvcHModm0sIG9wdHMucHJvcHMpOyB9XG4gIGlmIChvcHRzLm1ldGhvZHMpIHsgaW5pdE1ldGhvZHModm0sIG9wdHMubWV0aG9kcyk7IH1cbiAgaWYgKG9wdHMuZGF0YSkge1xuICAgIGluaXREYXRhKHZtKTtcbiAgfSBlbHNlIHtcbiAgICBvYnNlcnZlKHZtLl9kYXRhID0ge30sIHRydWUgLyogYXNSb290RGF0YSAqLyk7XG4gIH1cbiAgaWYgKG9wdHMuY29tcHV0ZWQpIHsgaW5pdENvbXB1dGVkKHZtLCBvcHRzLmNvbXB1dGVkKTsgfVxuICBpZiAob3B0cy53YXRjaCAmJiBvcHRzLndhdGNoICE9PSBuYXRpdmVXYXRjaCkge1xuICAgIGluaXRXYXRjaCh2bSwgb3B0cy53YXRjaCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFByb3BzICh2bSwgcHJvcHNPcHRpb25zKSB7XG4gIHZhciBwcm9wc0RhdGEgPSB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgfHwge307XG4gIHZhciBwcm9wcyA9IHZtLl9wcm9wcyA9IHt9O1xuICAvLyBjYWNoZSBwcm9wIGtleXMgc28gdGhhdCBmdXR1cmUgcHJvcHMgdXBkYXRlcyBjYW4gaXRlcmF0ZSB1c2luZyBBcnJheVxuICAvLyBpbnN0ZWFkIG9mIGR5bmFtaWMgb2JqZWN0IGtleSBlbnVtZXJhdGlvbi5cbiAgdmFyIGtleXMgPSB2bS4kb3B0aW9ucy5fcHJvcEtleXMgPSBbXTtcbiAgdmFyIGlzUm9vdCA9ICF2bS4kcGFyZW50O1xuICAvLyByb290IGluc3RhbmNlIHByb3BzIHNob3VsZCBiZSBjb252ZXJ0ZWRcbiAgaWYgKCFpc1Jvb3QpIHtcbiAgICB0b2dnbGVPYnNlcnZpbmcoZmFsc2UpO1xuICB9XG4gIHZhciBsb29wID0gZnVuY3Rpb24gKCBrZXkgKSB7XG4gICAga2V5cy5wdXNoKGtleSk7XG4gICAgdmFyIHZhbHVlID0gdmFsaWRhdGVQcm9wKGtleSwgcHJvcHNPcHRpb25zLCBwcm9wc0RhdGEsIHZtKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgaHlwaGVuYXRlZEtleSA9IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgaWYgKGlzUmVzZXJ2ZWRBdHRyaWJ1dGUoaHlwaGVuYXRlZEtleSkgfHxcbiAgICAgICAgICBjb25maWcuaXNSZXNlcnZlZEF0dHIoaHlwaGVuYXRlZEtleSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAoXCJcXFwiXCIgKyBoeXBoZW5hdGVkS2V5ICsgXCJcXFwiIGlzIGEgcmVzZXJ2ZWQgYXR0cmlidXRlIGFuZCBjYW5ub3QgYmUgdXNlZCBhcyBjb21wb25lbnQgcHJvcC5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmluZVJlYWN0aXZlJCQxKHByb3BzLCBrZXksIHZhbHVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaXNSb290ICYmICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQpIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZih2bS5tcEhvc3QgPT09ICdtcC1iYWlkdScpey8v55m+5bqmIG9ic2VydmVyIOWcqCBzZXREYXRhIGNhbGxiYWNrIOS5i+WQjuinpuWPke+8jOebtOaOpeW/veeVpeivpSB3YXJuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2ZpeGVkIGJ5IHh4eHh4eCBfX25leHRfdGlja19wZW5kaW5nLHVuaTovL2Zvcm0tZmllbGQg5pe25LiN5ZGK6K2mXG4gICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICBrZXkgPT09ICd2YWx1ZScgJiYgXG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh2bS4kb3B0aW9ucy5iZWhhdmlvcnMpICYmXG4gICAgICAgICAgICAgICAgdm0uJG9wdGlvbnMuYmVoYXZpb3JzLmluZGV4T2YoJ3VuaTovL2Zvcm0tZmllbGQnKSAhPT0gLTFcbiAgICAgICAgICAgICAgKXtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2bS5fZ2V0Rm9ybURhdGEpe1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciAkcGFyZW50ID0gdm0uJHBhcmVudDtcbiAgICAgICAgICAgIHdoaWxlKCRwYXJlbnQpe1xuICAgICAgICAgICAgICBpZigkcGFyZW50Ll9fbmV4dF90aWNrX3BlbmRpbmcpe1xuICAgICAgICAgICAgICAgIHJldHVybiAgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHBhcmVudCA9ICRwYXJlbnQuJHBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICAgIFwiQXZvaWQgbXV0YXRpbmcgYSBwcm9wIGRpcmVjdGx5IHNpbmNlIHRoZSB2YWx1ZSB3aWxsIGJlIFwiICtcbiAgICAgICAgICAgIFwib3ZlcndyaXR0ZW4gd2hlbmV2ZXIgdGhlIHBhcmVudCBjb21wb25lbnQgcmUtcmVuZGVycy4gXCIgK1xuICAgICAgICAgICAgXCJJbnN0ZWFkLCB1c2UgYSBkYXRhIG9yIGNvbXB1dGVkIHByb3BlcnR5IGJhc2VkIG9uIHRoZSBwcm9wJ3MgXCIgK1xuICAgICAgICAgICAgXCJ2YWx1ZS4gUHJvcCBiZWluZyBtdXRhdGVkOiBcXFwiXCIgKyBrZXkgKyBcIlxcXCJcIixcbiAgICAgICAgICAgIHZtXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmluZVJlYWN0aXZlJCQxKHByb3BzLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgLy8gc3RhdGljIHByb3BzIGFyZSBhbHJlYWR5IHByb3hpZWQgb24gdGhlIGNvbXBvbmVudCdzIHByb3RvdHlwZVxuICAgIC8vIGR1cmluZyBWdWUuZXh0ZW5kKCkuIFdlIG9ubHkgbmVlZCB0byBwcm94eSBwcm9wcyBkZWZpbmVkIGF0XG4gICAgLy8gaW5zdGFudGlhdGlvbiBoZXJlLlxuICAgIGlmICghKGtleSBpbiB2bSkpIHtcbiAgICAgIHByb3h5KHZtLCBcIl9wcm9wc1wiLCBrZXkpO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcHNPcHRpb25zKSBsb29wKCBrZXkgKTtcbiAgdG9nZ2xlT2JzZXJ2aW5nKHRydWUpO1xufVxuXG5mdW5jdGlvbiBpbml0RGF0YSAodm0pIHtcbiAgdmFyIGRhdGEgPSB2bS4kb3B0aW9ucy5kYXRhO1xuICBkYXRhID0gdm0uX2RhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gZ2V0RGF0YShkYXRhLCB2bSlcbiAgICA6IGRhdGEgfHwge307XG4gIGlmICghaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgIGRhdGEgPSB7fTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnZGF0YSBmdW5jdGlvbnMgc2hvdWxkIHJldHVybiBhbiBvYmplY3Q6XFxuJyArXG4gICAgICAnaHR0cHM6Ly92dWVqcy5vcmcvdjIvZ3VpZGUvY29tcG9uZW50cy5odG1sI2RhdGEtTXVzdC1CZS1hLUZ1bmN0aW9uJyxcbiAgICAgIHZtXG4gICAgKTtcbiAgfVxuICAvLyBwcm94eSBkYXRhIG9uIGluc3RhbmNlXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gIHZhciBwcm9wcyA9IHZtLiRvcHRpb25zLnByb3BzO1xuICB2YXIgbWV0aG9kcyA9IHZtLiRvcHRpb25zLm1ldGhvZHM7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKG1ldGhvZHMgJiYgaGFzT3duKG1ldGhvZHMsIGtleSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAoXCJNZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZCBhcyBhIGRhdGEgcHJvcGVydHkuXCIpLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9wcyAmJiBoYXNPd24ocHJvcHMsIGtleSkpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJUaGUgZGF0YSBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgYWxyZWFkeSBkZWNsYXJlZCBhcyBhIHByb3AuIFwiICtcbiAgICAgICAgXCJVc2UgcHJvcCBkZWZhdWx0IHZhbHVlIGluc3RlYWQuXCIsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIWlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgcHJveHkodm0sIFwiX2RhdGFcIiwga2V5KTtcbiAgICB9XG4gIH1cbiAgLy8gb2JzZXJ2ZSBkYXRhXG4gIG9ic2VydmUoZGF0YSwgdHJ1ZSAvKiBhc1Jvb3REYXRhICovKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0YSAoZGF0YSwgdm0pIHtcbiAgLy8gIzc1NzMgZGlzYWJsZSBkZXAgY29sbGVjdGlvbiB3aGVuIGludm9raW5nIGRhdGEgZ2V0dGVyc1xuICBwdXNoVGFyZ2V0KCk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRhdGEuY2FsbCh2bSwgdm0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJkYXRhKClcIik7XG4gICAgcmV0dXJuIHt9XG4gIH0gZmluYWxseSB7XG4gICAgcG9wVGFyZ2V0KCk7XG4gIH1cbn1cblxudmFyIGNvbXB1dGVkV2F0Y2hlck9wdGlvbnMgPSB7IGxhenk6IHRydWUgfTtcblxuZnVuY3Rpb24gaW5pdENvbXB1dGVkICh2bSwgY29tcHV0ZWQpIHtcbiAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gIHZhciB3YXRjaGVycyA9IHZtLl9jb21wdXRlZFdhdGNoZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgLy8gY29tcHV0ZWQgcHJvcGVydGllcyBhcmUganVzdCBnZXR0ZXJzIGR1cmluZyBTU1JcbiAgdmFyIGlzU1NSID0gaXNTZXJ2ZXJSZW5kZXJpbmcoKTtcblxuICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcbiAgICB2YXIgdXNlckRlZiA9IGNvbXB1dGVkW2tleV07XG4gICAgdmFyIGdldHRlciA9IHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nID8gdXNlckRlZiA6IHVzZXJEZWYuZ2V0O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGdldHRlciA9PSBudWxsKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAoXCJHZXR0ZXIgaXMgbWlzc2luZyBmb3IgY29tcHV0ZWQgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiLlwiKSxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1NTUikge1xuICAgICAgLy8gY3JlYXRlIGludGVybmFsIHdhdGNoZXIgZm9yIHRoZSBjb21wdXRlZCBwcm9wZXJ0eS5cbiAgICAgIHdhdGNoZXJzW2tleV0gPSBuZXcgV2F0Y2hlcihcbiAgICAgICAgdm0sXG4gICAgICAgIGdldHRlciB8fCBub29wLFxuICAgICAgICBub29wLFxuICAgICAgICBjb21wdXRlZFdhdGNoZXJPcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNvbXBvbmVudC1kZWZpbmVkIGNvbXB1dGVkIHByb3BlcnRpZXMgYXJlIGFscmVhZHkgZGVmaW5lZCBvbiB0aGVcbiAgICAvLyBjb21wb25lbnQgcHJvdG90eXBlLiBXZSBvbmx5IG5lZWQgdG8gZGVmaW5lIGNvbXB1dGVkIHByb3BlcnRpZXMgZGVmaW5lZFxuICAgIC8vIGF0IGluc3RhbnRpYXRpb24gaGVyZS5cbiAgICBpZiAoIShrZXkgaW4gdm0pKSB7XG4gICAgICBkZWZpbmVDb21wdXRlZCh2bSwga2V5LCB1c2VyRGVmKTtcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChrZXkgaW4gdm0uJGRhdGEpIHtcbiAgICAgICAgd2FybigoXCJUaGUgY29tcHV0ZWQgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIGFscmVhZHkgZGVmaW5lZCBpbiBkYXRhLlwiKSwgdm0pO1xuICAgICAgfSBlbHNlIGlmICh2bS4kb3B0aW9ucy5wcm9wcyAmJiBrZXkgaW4gdm0uJG9wdGlvbnMucHJvcHMpIHtcbiAgICAgICAgd2FybigoXCJUaGUgY29tcHV0ZWQgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIGFscmVhZHkgZGVmaW5lZCBhcyBhIHByb3AuXCIpLCB2bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZUNvbXB1dGVkIChcbiAgdGFyZ2V0LFxuICBrZXksXG4gIHVzZXJEZWZcbikge1xuICB2YXIgc2hvdWxkQ2FjaGUgPSAhaXNTZXJ2ZXJSZW5kZXJpbmcoKTtcbiAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IHNob3VsZENhY2hlXG4gICAgICA/IGNyZWF0ZUNvbXB1dGVkR2V0dGVyKGtleSlcbiAgICAgIDogY3JlYXRlR2V0dGVySW52b2tlcih1c2VyRGVmKTtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID0gbm9vcDtcbiAgfSBlbHNlIHtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uZ2V0ID0gdXNlckRlZi5nZXRcbiAgICAgID8gc2hvdWxkQ2FjaGUgJiYgdXNlckRlZi5jYWNoZSAhPT0gZmFsc2VcbiAgICAgICAgPyBjcmVhdGVDb21wdXRlZEdldHRlcihrZXkpXG4gICAgICAgIDogY3JlYXRlR2V0dGVySW52b2tlcih1c2VyRGVmLmdldClcbiAgICAgIDogbm9vcDtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID0gdXNlckRlZi5zZXQgfHwgbm9vcDtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9PT0gbm9vcCkge1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAoXCJDb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgd2FzIGFzc2lnbmVkIHRvIGJ1dCBpdCBoYXMgbm8gc2V0dGVyLlwiKSxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZWRHZXR0ZXIgKGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gY29tcHV0ZWRHZXR0ZXIgKCkge1xuICAgIHZhciB3YXRjaGVyID0gdGhpcy5fY29tcHV0ZWRXYXRjaGVycyAmJiB0aGlzLl9jb21wdXRlZFdhdGNoZXJzW2tleV07XG4gICAgaWYgKHdhdGNoZXIpIHtcbiAgICAgIGlmICh3YXRjaGVyLmRpcnR5KSB7XG4gICAgICAgIHdhdGNoZXIuZXZhbHVhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChEZXAuU2hhcmVkT2JqZWN0LnRhcmdldCkgey8vIGZpeGVkIGJ5IHh4eHh4eFxuICAgICAgICB3YXRjaGVyLmRlcGVuZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdhdGNoZXIudmFsdWVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlR2V0dGVySW52b2tlcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gY29tcHV0ZWRHZXR0ZXIgKCkge1xuICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIHRoaXMpXG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdE1ldGhvZHMgKHZtLCBtZXRob2RzKSB7XG4gIHZhciBwcm9wcyA9IHZtLiRvcHRpb25zLnByb3BzO1xuICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIG1ldGhvZHNba2V5XSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgdHlwZSBcXFwiXCIgKyAodHlwZW9mIG1ldGhvZHNba2V5XSkgKyBcIlxcXCIgaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLiBcIiArXG4gICAgICAgICAgXCJEaWQgeW91IHJlZmVyZW5jZSB0aGUgZnVuY3Rpb24gY29ycmVjdGx5P1wiLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMgJiYgaGFzT3duKHByb3BzLCBrZXkpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYXMgYSBwcm9wLlwiKSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKChrZXkgaW4gdm0pICYmIGlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBjb25mbGljdHMgd2l0aCBhbiBleGlzdGluZyBWdWUgaW5zdGFuY2UgbWV0aG9kLiBcIiArXG4gICAgICAgICAgXCJBdm9pZCBkZWZpbmluZyBjb21wb25lbnQgbWV0aG9kcyB0aGF0IHN0YXJ0IHdpdGggXyBvciAkLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHZtW2tleV0gPSB0eXBlb2YgbWV0aG9kc1trZXldICE9PSAnZnVuY3Rpb24nID8gbm9vcCA6IGJpbmQobWV0aG9kc1trZXldLCB2bSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFdhdGNoICh2bSwgd2F0Y2gpIHtcbiAgZm9yICh2YXIga2V5IGluIHdhdGNoKSB7XG4gICAgdmFyIGhhbmRsZXIgPSB3YXRjaFtrZXldO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGhhbmRsZXIpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3JlYXRlV2F0Y2hlcih2bSwga2V5LCBoYW5kbGVyW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY3JlYXRlV2F0Y2hlcih2bSwga2V5LCBoYW5kbGVyKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlV2F0Y2hlciAoXG4gIHZtLFxuICBleHBPckZuLFxuICBoYW5kbGVyLFxuICBvcHRpb25zXG4pIHtcbiAgaWYgKGlzUGxhaW5PYmplY3QoaGFuZGxlcikpIHtcbiAgICBvcHRpb25zID0gaGFuZGxlcjtcbiAgICBoYW5kbGVyID0gaGFuZGxlci5oYW5kbGVyO1xuICB9XG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3N0cmluZycpIHtcbiAgICBoYW5kbGVyID0gdm1baGFuZGxlcl07XG4gIH1cbiAgcmV0dXJuIHZtLiR3YXRjaChleHBPckZuLCBoYW5kbGVyLCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBzdGF0ZU1peGluIChWdWUpIHtcbiAgLy8gZmxvdyBzb21laG93IGhhcyBwcm9ibGVtcyB3aXRoIGRpcmVjdGx5IGRlY2xhcmVkIGRlZmluaXRpb24gb2JqZWN0XG4gIC8vIHdoZW4gdXNpbmcgT2JqZWN0LmRlZmluZVByb3BlcnR5LCBzbyB3ZSBoYXZlIHRvIHByb2NlZHVyYWxseSBidWlsZCB1cFxuICAvLyB0aGUgb2JqZWN0IGhlcmUuXG4gIHZhciBkYXRhRGVmID0ge307XG4gIGRhdGFEZWYuZ2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fZGF0YSB9O1xuICB2YXIgcHJvcHNEZWYgPSB7fTtcbiAgcHJvcHNEZWYuZ2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fcHJvcHMgfTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBkYXRhRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdBdm9pZCByZXBsYWNpbmcgaW5zdGFuY2Ugcm9vdCAkZGF0YS4gJyArXG4gICAgICAgICdVc2UgbmVzdGVkIGRhdGEgcHJvcGVydGllcyBpbnN0ZWFkLicsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfTtcbiAgICBwcm9wc0RlZi5zZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB3YXJuKFwiJHByb3BzIGlzIHJlYWRvbmx5LlwiLCB0aGlzKTtcbiAgICB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJGRhdGEnLCBkYXRhRGVmKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckcHJvcHMnLCBwcm9wc0RlZik7XG5cbiAgVnVlLnByb3RvdHlwZS4kc2V0ID0gc2V0O1xuICBWdWUucHJvdG90eXBlLiRkZWxldGUgPSBkZWw7XG5cbiAgVnVlLnByb3RvdHlwZS4kd2F0Y2ggPSBmdW5jdGlvbiAoXG4gICAgZXhwT3JGbixcbiAgICBjYixcbiAgICBvcHRpb25zXG4gICkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QoY2IpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlV2F0Y2hlcih2bSwgZXhwT3JGbiwgY2IsIG9wdGlvbnMpXG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMudXNlciA9IHRydWU7XG4gICAgdmFyIHdhdGNoZXIgPSBuZXcgV2F0Y2hlcih2bSwgZXhwT3JGbiwgY2IsIG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLmltbWVkaWF0ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2IuY2FsbCh2bSwgd2F0Y2hlci52YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBoYW5kbGVFcnJvcihlcnJvciwgdm0sIChcImNhbGxiYWNrIGZvciBpbW1lZGlhdGUgd2F0Y2hlciBcXFwiXCIgKyAod2F0Y2hlci5leHByZXNzaW9uKSArIFwiXFxcIlwiKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiB1bndhdGNoRm4gKCkge1xuICAgICAgd2F0Y2hlci50ZWFyZG93bigpO1xuICAgIH1cbiAgfTtcbn1cblxuLyogICovXG5cbnZhciB1aWQkMyA9IDA7XG5cbmZ1bmN0aW9uIGluaXRNaXhpbiAoVnVlKSB7XG4gIFZ1ZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgLy8gYSB1aWRcbiAgICB2bS5fdWlkID0gdWlkJDMrKztcblxuICAgIHZhciBzdGFydFRhZywgZW5kVGFnO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBtYXJrKSB7XG4gICAgICBzdGFydFRhZyA9IFwidnVlLXBlcmYtc3RhcnQ6XCIgKyAodm0uX3VpZCk7XG4gICAgICBlbmRUYWcgPSBcInZ1ZS1wZXJmLWVuZDpcIiArICh2bS5fdWlkKTtcbiAgICAgIG1hcmsoc3RhcnRUYWcpO1xuICAgIH1cblxuICAgIC8vIGEgZmxhZyB0byBhdm9pZCB0aGlzIGJlaW5nIG9ic2VydmVkXG4gICAgdm0uX2lzVnVlID0gdHJ1ZTtcbiAgICAvLyBtZXJnZSBvcHRpb25zXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5faXNDb21wb25lbnQpIHtcbiAgICAgIC8vIG9wdGltaXplIGludGVybmFsIGNvbXBvbmVudCBpbnN0YW50aWF0aW9uXG4gICAgICAvLyBzaW5jZSBkeW5hbWljIG9wdGlvbnMgbWVyZ2luZyBpcyBwcmV0dHkgc2xvdywgYW5kIG5vbmUgb2YgdGhlXG4gICAgICAvLyBpbnRlcm5hbCBjb21wb25lbnQgb3B0aW9ucyBuZWVkcyBzcGVjaWFsIHRyZWF0bWVudC5cbiAgICAgIGluaXRJbnRlcm5hbENvbXBvbmVudCh2bSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLiRvcHRpb25zID0gbWVyZ2VPcHRpb25zKFxuICAgICAgICByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKHZtLmNvbnN0cnVjdG9yKSxcbiAgICAgICAgb3B0aW9ucyB8fCB7fSxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGluaXRQcm94eSh2bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IHZtO1xuICAgIH1cbiAgICAvLyBleHBvc2UgcmVhbCBzZWxmXG4gICAgdm0uX3NlbGYgPSB2bTtcbiAgICBpbml0TGlmZWN5Y2xlKHZtKTtcbiAgICBpbml0RXZlbnRzKHZtKTtcbiAgICBpbml0UmVuZGVyKHZtKTtcbiAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZUNyZWF0ZScpO1xuICAgIHZtLm1wSG9zdCAhPT0gJ21wLXRvdXRpYW8nICYmIGluaXRJbmplY3Rpb25zKHZtKTsgLy8gcmVzb2x2ZSBpbmplY3Rpb25zIGJlZm9yZSBkYXRhL3Byb3BzICBcbiAgICBpbml0U3RhdGUodm0pO1xuICAgIHZtLm1wSG9zdCAhPT0gJ21wLXRvdXRpYW8nICYmIGluaXRQcm92aWRlKHZtKTsgLy8gcmVzb2x2ZSBwcm92aWRlIGFmdGVyIGRhdGEvcHJvcHNcbiAgICB2bS5tcEhvc3QgIT09ICdtcC10b3V0aWFvJyAmJiBjYWxsSG9vayh2bSwgJ2NyZWF0ZWQnKTsgICAgICBcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBtYXJrKSB7XG4gICAgICB2bS5fbmFtZSA9IGZvcm1hdENvbXBvbmVudE5hbWUodm0sIGZhbHNlKTtcbiAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgIG1lYXN1cmUoKFwidnVlIFwiICsgKHZtLl9uYW1lKSArIFwiIGluaXRcIiksIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgIH1cblxuICAgIGlmICh2bS4kb3B0aW9ucy5lbCkge1xuICAgICAgdm0uJG1vdW50KHZtLiRvcHRpb25zLmVsKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGluaXRJbnRlcm5hbENvbXBvbmVudCAodm0sIG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSB2bS4kb3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodm0uY29uc3RydWN0b3Iub3B0aW9ucyk7XG4gIC8vIGRvaW5nIHRoaXMgYmVjYXVzZSBpdCdzIGZhc3RlciB0aGFuIGR5bmFtaWMgZW51bWVyYXRpb24uXG4gIHZhciBwYXJlbnRWbm9kZSA9IG9wdGlvbnMuX3BhcmVudFZub2RlO1xuICBvcHRzLnBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICBvcHRzLl9wYXJlbnRWbm9kZSA9IHBhcmVudFZub2RlO1xuXG4gIHZhciB2bm9kZUNvbXBvbmVudE9wdGlvbnMgPSBwYXJlbnRWbm9kZS5jb21wb25lbnRPcHRpb25zO1xuICBvcHRzLnByb3BzRGF0YSA9IHZub2RlQ29tcG9uZW50T3B0aW9ucy5wcm9wc0RhdGE7XG4gIG9wdHMuX3BhcmVudExpc3RlbmVycyA9IHZub2RlQ29tcG9uZW50T3B0aW9ucy5saXN0ZW5lcnM7XG4gIG9wdHMuX3JlbmRlckNoaWxkcmVuID0gdm5vZGVDb21wb25lbnRPcHRpb25zLmNoaWxkcmVuO1xuICBvcHRzLl9jb21wb25lbnRUYWcgPSB2bm9kZUNvbXBvbmVudE9wdGlvbnMudGFnO1xuXG4gIGlmIChvcHRpb25zLnJlbmRlcikge1xuICAgIG9wdHMucmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XG4gICAgb3B0cy5zdGF0aWNSZW5kZXJGbnMgPSBvcHRpb25zLnN0YXRpY1JlbmRlckZucztcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zIChDdG9yKSB7XG4gIHZhciBvcHRpb25zID0gQ3Rvci5vcHRpb25zO1xuICBpZiAoQ3Rvci5zdXBlcikge1xuICAgIHZhciBzdXBlck9wdGlvbnMgPSByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKEN0b3Iuc3VwZXIpO1xuICAgIHZhciBjYWNoZWRTdXBlck9wdGlvbnMgPSBDdG9yLnN1cGVyT3B0aW9ucztcbiAgICBpZiAoc3VwZXJPcHRpb25zICE9PSBjYWNoZWRTdXBlck9wdGlvbnMpIHtcbiAgICAgIC8vIHN1cGVyIG9wdGlvbiBjaGFuZ2VkLFxuICAgICAgLy8gbmVlZCB0byByZXNvbHZlIG5ldyBvcHRpb25zLlxuICAgICAgQ3Rvci5zdXBlck9wdGlvbnMgPSBzdXBlck9wdGlvbnM7XG4gICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgYW55IGxhdGUtbW9kaWZpZWQvYXR0YWNoZWQgb3B0aW9ucyAoIzQ5NzYpXG4gICAgICB2YXIgbW9kaWZpZWRPcHRpb25zID0gcmVzb2x2ZU1vZGlmaWVkT3B0aW9ucyhDdG9yKTtcbiAgICAgIC8vIHVwZGF0ZSBiYXNlIGV4dGVuZCBvcHRpb25zXG4gICAgICBpZiAobW9kaWZpZWRPcHRpb25zKSB7XG4gICAgICAgIGV4dGVuZChDdG9yLmV4dGVuZE9wdGlvbnMsIG1vZGlmaWVkT3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gQ3Rvci5vcHRpb25zID0gbWVyZ2VPcHRpb25zKHN1cGVyT3B0aW9ucywgQ3Rvci5leHRlbmRPcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgb3B0aW9ucy5jb21wb25lbnRzW29wdGlvbnMubmFtZV0gPSBDdG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb3B0aW9uc1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTW9kaWZpZWRPcHRpb25zIChDdG9yKSB7XG4gIHZhciBtb2RpZmllZDtcbiAgdmFyIGxhdGVzdCA9IEN0b3Iub3B0aW9ucztcbiAgdmFyIHNlYWxlZCA9IEN0b3Iuc2VhbGVkT3B0aW9ucztcbiAgZm9yICh2YXIga2V5IGluIGxhdGVzdCkge1xuICAgIGlmIChsYXRlc3Rba2V5XSAhPT0gc2VhbGVkW2tleV0pIHtcbiAgICAgIGlmICghbW9kaWZpZWQpIHsgbW9kaWZpZWQgPSB7fTsgfVxuICAgICAgbW9kaWZpZWRba2V5XSA9IGxhdGVzdFtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbW9kaWZpZWRcbn1cblxuZnVuY3Rpb24gVnVlIChvcHRpb25zKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgISh0aGlzIGluc3RhbmNlb2YgVnVlKVxuICApIHtcbiAgICB3YXJuKCdWdWUgaXMgYSBjb25zdHJ1Y3RvciBhbmQgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHRoZSBgbmV3YCBrZXl3b3JkJyk7XG4gIH1cbiAgdGhpcy5faW5pdChvcHRpb25zKTtcbn1cblxuaW5pdE1peGluKFZ1ZSk7XG5zdGF0ZU1peGluKFZ1ZSk7XG5ldmVudHNNaXhpbihWdWUpO1xubGlmZWN5Y2xlTWl4aW4oVnVlKTtcbnJlbmRlck1peGluKFZ1ZSk7XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0VXNlIChWdWUpIHtcbiAgVnVlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICB2YXIgaW5zdGFsbGVkUGx1Z2lucyA9ICh0aGlzLl9pbnN0YWxsZWRQbHVnaW5zIHx8ICh0aGlzLl9pbnN0YWxsZWRQbHVnaW5zID0gW10pKTtcbiAgICBpZiAoaW5zdGFsbGVkUGx1Z2lucy5pbmRleE9mKHBsdWdpbikgPiAtMSkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvLyBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbiAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgaWYgKHR5cGVvZiBwbHVnaW4uaW5zdGFsbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcGx1Z2luLmluc3RhbGwuYXBwbHkocGx1Z2luLCBhcmdzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHBsdWdpbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgaW5zdGFsbGVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XG4gICAgcmV0dXJuIHRoaXNcbiAgfTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRNaXhpbiQxIChWdWUpIHtcbiAgVnVlLm1peGluID0gZnVuY3Rpb24gKG1peGluKSB7XG4gICAgdGhpcy5vcHRpb25zID0gbWVyZ2VPcHRpb25zKHRoaXMub3B0aW9ucywgbWl4aW4pO1xuICAgIHJldHVybiB0aGlzXG4gIH07XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0RXh0ZW5kIChWdWUpIHtcbiAgLyoqXG4gICAqIEVhY2ggaW5zdGFuY2UgY29uc3RydWN0b3IsIGluY2x1ZGluZyBWdWUsIGhhcyBhIHVuaXF1ZVxuICAgKiBjaWQuIFRoaXMgZW5hYmxlcyB1cyB0byBjcmVhdGUgd3JhcHBlZCBcImNoaWxkXG4gICAqIGNvbnN0cnVjdG9yc1wiIGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlIGFuZCBjYWNoZSB0aGVtLlxuICAgKi9cbiAgVnVlLmNpZCA9IDA7XG4gIHZhciBjaWQgPSAxO1xuXG4gIC8qKlxuICAgKiBDbGFzcyBpbmhlcml0YW5jZVxuICAgKi9cbiAgVnVlLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRlbmRPcHRpb25zKSB7XG4gICAgZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnMgfHwge307XG4gICAgdmFyIFN1cGVyID0gdGhpcztcbiAgICB2YXIgU3VwZXJJZCA9IFN1cGVyLmNpZDtcbiAgICB2YXIgY2FjaGVkQ3RvcnMgPSBleHRlbmRPcHRpb25zLl9DdG9yIHx8IChleHRlbmRPcHRpb25zLl9DdG9yID0ge30pO1xuICAgIGlmIChjYWNoZWRDdG9yc1tTdXBlcklkXSkge1xuICAgICAgcmV0dXJuIGNhY2hlZEN0b3JzW1N1cGVySWRdXG4gICAgfVxuXG4gICAgdmFyIG5hbWUgPSBleHRlbmRPcHRpb25zLm5hbWUgfHwgU3VwZXIub3B0aW9ucy5uYW1lO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIG5hbWUpIHtcbiAgICAgIHZhbGlkYXRlQ29tcG9uZW50TmFtZShuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgU3ViID0gZnVuY3Rpb24gVnVlQ29tcG9uZW50IChvcHRpb25zKSB7XG4gICAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuICAgIH07XG4gICAgU3ViLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXIucHJvdG90eXBlKTtcbiAgICBTdWIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ViO1xuICAgIFN1Yi5jaWQgPSBjaWQrKztcbiAgICBTdWIub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhcbiAgICAgIFN1cGVyLm9wdGlvbnMsXG4gICAgICBleHRlbmRPcHRpb25zXG4gICAgKTtcbiAgICBTdWJbJ3N1cGVyJ10gPSBTdXBlcjtcblxuICAgIC8vIEZvciBwcm9wcyBhbmQgY29tcHV0ZWQgcHJvcGVydGllcywgd2UgZGVmaW5lIHRoZSBwcm94eSBnZXR0ZXJzIG9uXG4gICAgLy8gdGhlIFZ1ZSBpbnN0YW5jZXMgYXQgZXh0ZW5zaW9uIHRpbWUsIG9uIHRoZSBleHRlbmRlZCBwcm90b3R5cGUuIFRoaXNcbiAgICAvLyBhdm9pZHMgT2JqZWN0LmRlZmluZVByb3BlcnR5IGNhbGxzIGZvciBlYWNoIGluc3RhbmNlIGNyZWF0ZWQuXG4gICAgaWYgKFN1Yi5vcHRpb25zLnByb3BzKSB7XG4gICAgICBpbml0UHJvcHMkMShTdWIpO1xuICAgIH1cbiAgICBpZiAoU3ViLm9wdGlvbnMuY29tcHV0ZWQpIHtcbiAgICAgIGluaXRDb21wdXRlZCQxKFN1Yik7XG4gICAgfVxuXG4gICAgLy8gYWxsb3cgZnVydGhlciBleHRlbnNpb24vbWl4aW4vcGx1Z2luIHVzYWdlXG4gICAgU3ViLmV4dGVuZCA9IFN1cGVyLmV4dGVuZDtcbiAgICBTdWIubWl4aW4gPSBTdXBlci5taXhpbjtcbiAgICBTdWIudXNlID0gU3VwZXIudXNlO1xuXG4gICAgLy8gY3JlYXRlIGFzc2V0IHJlZ2lzdGVycywgc28gZXh0ZW5kZWQgY2xhc3Nlc1xuICAgIC8vIGNhbiBoYXZlIHRoZWlyIHByaXZhdGUgYXNzZXRzIHRvby5cbiAgICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBTdWJbdHlwZV0gPSBTdXBlclt0eXBlXTtcbiAgICB9KTtcbiAgICAvLyBlbmFibGUgcmVjdXJzaXZlIHNlbGYtbG9va3VwXG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIFN1Yi5vcHRpb25zLmNvbXBvbmVudHNbbmFtZV0gPSBTdWI7XG4gICAgfVxuXG4gICAgLy8ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgc3VwZXIgb3B0aW9ucyBhdCBleHRlbnNpb24gdGltZS5cbiAgICAvLyBsYXRlciBhdCBpbnN0YW50aWF0aW9uIHdlIGNhbiBjaGVjayBpZiBTdXBlcidzIG9wdGlvbnMgaGF2ZVxuICAgIC8vIGJlZW4gdXBkYXRlZC5cbiAgICBTdWIuc3VwZXJPcHRpb25zID0gU3VwZXIub3B0aW9ucztcbiAgICBTdWIuZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnM7XG4gICAgU3ViLnNlYWxlZE9wdGlvbnMgPSBleHRlbmQoe30sIFN1Yi5vcHRpb25zKTtcblxuICAgIC8vIGNhY2hlIGNvbnN0cnVjdG9yXG4gICAgY2FjaGVkQ3RvcnNbU3VwZXJJZF0gPSBTdWI7XG4gICAgcmV0dXJuIFN1YlxuICB9O1xufVxuXG5mdW5jdGlvbiBpbml0UHJvcHMkMSAoQ29tcCkge1xuICB2YXIgcHJvcHMgPSBDb21wLm9wdGlvbnMucHJvcHM7XG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIHByb3h5KENvbXAucHJvdG90eXBlLCBcIl9wcm9wc1wiLCBrZXkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRDb21wdXRlZCQxIChDb21wKSB7XG4gIHZhciBjb21wdXRlZCA9IENvbXAub3B0aW9ucy5jb21wdXRlZDtcbiAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgZGVmaW5lQ29tcHV0ZWQoQ29tcC5wcm90b3R5cGUsIGtleSwgY29tcHV0ZWRba2V5XSk7XG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRBc3NldFJlZ2lzdGVycyAoVnVlKSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYXNzZXQgcmVnaXN0cmF0aW9uIG1ldGhvZHMuXG4gICAqL1xuICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgVnVlW3R5cGVdID0gZnVuY3Rpb24gKFxuICAgICAgaWQsXG4gICAgICBkZWZpbml0aW9uXG4gICAgKSB7XG4gICAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlID09PSAnY29tcG9uZW50Jykge1xuICAgICAgICAgIHZhbGlkYXRlQ29tcG9uZW50TmFtZShpZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdjb21wb25lbnQnICYmIGlzUGxhaW5PYmplY3QoZGVmaW5pdGlvbikpIHtcbiAgICAgICAgICBkZWZpbml0aW9uLm5hbWUgPSBkZWZpbml0aW9uLm5hbWUgfHwgaWQ7XG4gICAgICAgICAgZGVmaW5pdGlvbiA9IHRoaXMub3B0aW9ucy5fYmFzZS5leHRlbmQoZGVmaW5pdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdkaXJlY3RpdmUnICYmIHR5cGVvZiBkZWZpbml0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGVmaW5pdGlvbiA9IHsgYmluZDogZGVmaW5pdGlvbiwgdXBkYXRlOiBkZWZpbml0aW9uIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXSA9IGRlZmluaXRpb247XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbi8qICAqL1xuXG5cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZSAob3B0cykge1xuICByZXR1cm4gb3B0cyAmJiAob3B0cy5DdG9yLm9wdGlvbnMubmFtZSB8fCBvcHRzLnRhZylcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAocGF0dGVybiwgbmFtZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShwYXR0ZXJuKSkge1xuICAgIHJldHVybiBwYXR0ZXJuLmluZGV4T2YobmFtZSkgPiAtMVxuICB9IGVsc2UgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KCcsJykuaW5kZXhPZihuYW1lKSA+IC0xXG4gIH0gZWxzZSBpZiAoaXNSZWdFeHAocGF0dGVybikpIHtcbiAgICByZXR1cm4gcGF0dGVybi50ZXN0KG5hbWUpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHBydW5lQ2FjaGUgKGtlZXBBbGl2ZUluc3RhbmNlLCBmaWx0ZXIpIHtcbiAgdmFyIGNhY2hlID0ga2VlcEFsaXZlSW5zdGFuY2UuY2FjaGU7XG4gIHZhciBrZXlzID0ga2VlcEFsaXZlSW5zdGFuY2Uua2V5cztcbiAgdmFyIF92bm9kZSA9IGtlZXBBbGl2ZUluc3RhbmNlLl92bm9kZTtcbiAgZm9yICh2YXIga2V5IGluIGNhY2hlKSB7XG4gICAgdmFyIGNhY2hlZE5vZGUgPSBjYWNoZVtrZXldO1xuICAgIGlmIChjYWNoZWROb2RlKSB7XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoY2FjaGVkTm9kZS5jb21wb25lbnRPcHRpb25zKTtcbiAgICAgIGlmIChuYW1lICYmICFmaWx0ZXIobmFtZSkpIHtcbiAgICAgICAgcHJ1bmVDYWNoZUVudHJ5KGNhY2hlLCBrZXksIGtleXMsIF92bm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBydW5lQ2FjaGVFbnRyeSAoXG4gIGNhY2hlLFxuICBrZXksXG4gIGtleXMsXG4gIGN1cnJlbnRcbikge1xuICB2YXIgY2FjaGVkJCQxID0gY2FjaGVba2V5XTtcbiAgaWYgKGNhY2hlZCQkMSAmJiAoIWN1cnJlbnQgfHwgY2FjaGVkJCQxLnRhZyAhPT0gY3VycmVudC50YWcpKSB7XG4gICAgY2FjaGVkJCQxLmNvbXBvbmVudEluc3RhbmNlLiRkZXN0cm95KCk7XG4gIH1cbiAgY2FjaGVba2V5XSA9IG51bGw7XG4gIHJlbW92ZShrZXlzLCBrZXkpO1xufVxuXG52YXIgcGF0dGVyblR5cGVzID0gW1N0cmluZywgUmVnRXhwLCBBcnJheV07XG5cbnZhciBLZWVwQWxpdmUgPSB7XG4gIG5hbWU6ICdrZWVwLWFsaXZlJyxcbiAgYWJzdHJhY3Q6IHRydWUsXG5cbiAgcHJvcHM6IHtcbiAgICBpbmNsdWRlOiBwYXR0ZXJuVHlwZXMsXG4gICAgZXhjbHVkZTogcGF0dGVyblR5cGVzLFxuICAgIG1heDogW1N0cmluZywgTnVtYmVyXVxuICB9LFxuXG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQgKCkge1xuICAgIHRoaXMuY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMua2V5cyA9IFtdO1xuICB9LFxuXG4gIGRlc3Ryb3llZDogZnVuY3Rpb24gZGVzdHJveWVkICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jYWNoZSkge1xuICAgICAgcHJ1bmVDYWNoZUVudHJ5KHRoaXMuY2FjaGUsIGtleSwgdGhpcy5rZXlzKTtcbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB0aGlzLiR3YXRjaCgnaW5jbHVkZScsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHBydW5lQ2FjaGUodGhpcyQxLCBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gbWF0Y2hlcyh2YWwsIG5hbWUpOyB9KTtcbiAgICB9KTtcbiAgICB0aGlzLiR3YXRjaCgnZXhjbHVkZScsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHBydW5lQ2FjaGUodGhpcyQxLCBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gIW1hdGNoZXModmFsLCBuYW1lKTsgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIgKCkge1xuICAgIHZhciBzbG90ID0gdGhpcy4kc2xvdHMuZGVmYXVsdDtcbiAgICB2YXIgdm5vZGUgPSBnZXRGaXJzdENvbXBvbmVudENoaWxkKHNsb3QpO1xuICAgIHZhciBjb21wb25lbnRPcHRpb25zID0gdm5vZGUgJiYgdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICBpZiAoY29tcG9uZW50T3B0aW9ucykge1xuICAgICAgLy8gY2hlY2sgcGF0dGVyblxuICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKGNvbXBvbmVudE9wdGlvbnMpO1xuICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICB2YXIgaW5jbHVkZSA9IHJlZi5pbmNsdWRlO1xuICAgICAgdmFyIGV4Y2x1ZGUgPSByZWYuZXhjbHVkZTtcbiAgICAgIGlmIChcbiAgICAgICAgLy8gbm90IGluY2x1ZGVkXG4gICAgICAgIChpbmNsdWRlICYmICghbmFtZSB8fCAhbWF0Y2hlcyhpbmNsdWRlLCBuYW1lKSkpIHx8XG4gICAgICAgIC8vIGV4Y2x1ZGVkXG4gICAgICAgIChleGNsdWRlICYmIG5hbWUgJiYgbWF0Y2hlcyhleGNsdWRlLCBuYW1lKSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdm5vZGVcbiAgICAgIH1cblxuICAgICAgdmFyIHJlZiQxID0gdGhpcztcbiAgICAgIHZhciBjYWNoZSA9IHJlZiQxLmNhY2hlO1xuICAgICAgdmFyIGtleXMgPSByZWYkMS5rZXlzO1xuICAgICAgdmFyIGtleSA9IHZub2RlLmtleSA9PSBudWxsXG4gICAgICAgIC8vIHNhbWUgY29uc3RydWN0b3IgbWF5IGdldCByZWdpc3RlcmVkIGFzIGRpZmZlcmVudCBsb2NhbCBjb21wb25lbnRzXG4gICAgICAgIC8vIHNvIGNpZCBhbG9uZSBpcyBub3QgZW5vdWdoICgjMzI2OSlcbiAgICAgICAgPyBjb21wb25lbnRPcHRpb25zLkN0b3IuY2lkICsgKGNvbXBvbmVudE9wdGlvbnMudGFnID8gKFwiOjpcIiArIChjb21wb25lbnRPcHRpb25zLnRhZykpIDogJycpXG4gICAgICAgIDogdm5vZGUua2V5O1xuICAgICAgaWYgKGNhY2hlW2tleV0pIHtcbiAgICAgICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgPSBjYWNoZVtrZXldLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICAvLyBtYWtlIGN1cnJlbnQga2V5IGZyZXNoZXN0XG4gICAgICAgIHJlbW92ZShrZXlzLCBrZXkpO1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhY2hlW2tleV0gPSB2bm9kZTtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIC8vIHBydW5lIG9sZGVzdCBlbnRyeVxuICAgICAgICBpZiAodGhpcy5tYXggJiYga2V5cy5sZW5ndGggPiBwYXJzZUludCh0aGlzLm1heCkpIHtcbiAgICAgICAgICBwcnVuZUNhY2hlRW50cnkoY2FjaGUsIGtleXNbMF0sIGtleXMsIHRoaXMuX3Zub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2bm9kZS5kYXRhLmtlZXBBbGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZSB8fCAoc2xvdCAmJiBzbG90WzBdKVxuICB9XG59O1xuXG52YXIgYnVpbHRJbkNvbXBvbmVudHMgPSB7XG4gIEtlZXBBbGl2ZTogS2VlcEFsaXZlXG59O1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEdsb2JhbEFQSSAoVnVlKSB7XG4gIC8vIGNvbmZpZ1xuICB2YXIgY29uZmlnRGVmID0ge307XG4gIGNvbmZpZ0RlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25maWc7IH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uZmlnRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdEbyBub3QgcmVwbGFjZSB0aGUgVnVlLmNvbmZpZyBvYmplY3QsIHNldCBpbmRpdmlkdWFsIGZpZWxkcyBpbnN0ZWFkLidcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLCAnY29uZmlnJywgY29uZmlnRGVmKTtcblxuICAvLyBleHBvc2VkIHV0aWwgbWV0aG9kcy5cbiAgLy8gTk9URTogdGhlc2UgYXJlIG5vdCBjb25zaWRlcmVkIHBhcnQgb2YgdGhlIHB1YmxpYyBBUEkgLSBhdm9pZCByZWx5aW5nIG9uXG4gIC8vIHRoZW0gdW5sZXNzIHlvdSBhcmUgYXdhcmUgb2YgdGhlIHJpc2suXG4gIFZ1ZS51dGlsID0ge1xuICAgIHdhcm46IHdhcm4sXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgbWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXG4gICAgZGVmaW5lUmVhY3RpdmU6IGRlZmluZVJlYWN0aXZlJCQxXG4gIH07XG5cbiAgVnVlLnNldCA9IHNldDtcbiAgVnVlLmRlbGV0ZSA9IGRlbDtcbiAgVnVlLm5leHRUaWNrID0gbmV4dFRpY2s7XG5cbiAgLy8gMi42IGV4cGxpY2l0IG9ic2VydmFibGUgQVBJXG4gIFZ1ZS5vYnNlcnZhYmxlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIG9ic2VydmUob2JqKTtcbiAgICByZXR1cm4gb2JqXG4gIH07XG5cbiAgVnVlLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgVnVlLm9wdGlvbnNbdHlwZSArICdzJ10gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9KTtcblxuICAvLyB0aGlzIGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIFwiYmFzZVwiIGNvbnN0cnVjdG9yIHRvIGV4dGVuZCBhbGwgcGxhaW4tb2JqZWN0XG4gIC8vIGNvbXBvbmVudHMgd2l0aCBpbiBXZWV4J3MgbXVsdGktaW5zdGFuY2Ugc2NlbmFyaW9zLlxuICBWdWUub3B0aW9ucy5fYmFzZSA9IFZ1ZTtcblxuICBleHRlbmQoVnVlLm9wdGlvbnMuY29tcG9uZW50cywgYnVpbHRJbkNvbXBvbmVudHMpO1xuXG4gIGluaXRVc2UoVnVlKTtcbiAgaW5pdE1peGluJDEoVnVlKTtcbiAgaW5pdEV4dGVuZChWdWUpO1xuICBpbml0QXNzZXRSZWdpc3RlcnMoVnVlKTtcbn1cblxuaW5pdEdsb2JhbEFQSShWdWUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRpc1NlcnZlcicsIHtcbiAgZ2V0OiBpc1NlcnZlclJlbmRlcmluZ1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJHNzckNvbnRleHQnLCB7XG4gIGdldDogZnVuY3Rpb24gZ2V0ICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiB0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0XG4gIH1cbn0pO1xuXG4vLyBleHBvc2UgRnVuY3Rpb25hbFJlbmRlckNvbnRleHQgZm9yIHNzciBydW50aW1lIGhlbHBlciBpbnN0YWxsYXRpb25cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUsICdGdW5jdGlvbmFsUmVuZGVyQ29udGV4dCcsIHtcbiAgdmFsdWU6IEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0XG59KTtcblxuVnVlLnZlcnNpb24gPSAnMi42LjExJztcblxuLyoqXG4gKiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vVGVuY2VudC93ZXN0b3JlL21hc3Rlci9wYWNrYWdlcy93ZXN0b3JlL3V0aWxzL2RpZmYuanNcbiAqL1xudmFyIEFSUkFZVFlQRSA9ICdbb2JqZWN0IEFycmF5XSc7XG52YXIgT0JKRUNUVFlQRSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuLy8gY29uc3QgRlVOQ1RJT05UWVBFID0gJ1tvYmplY3QgRnVuY3Rpb25dJ1xuXG5mdW5jdGlvbiBkaWZmKGN1cnJlbnQsIHByZSkge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBzeW5jS2V5cyhjdXJyZW50LCBwcmUpO1xuICAgIF9kaWZmKGN1cnJlbnQsIHByZSwgJycsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBzeW5jS2V5cyhjdXJyZW50LCBwcmUpIHtcbiAgICBpZiAoY3VycmVudCA9PT0gcHJlKSB7IHJldHVybiB9XG4gICAgdmFyIHJvb3RDdXJyZW50VHlwZSA9IHR5cGUoY3VycmVudCk7XG4gICAgdmFyIHJvb3RQcmVUeXBlID0gdHlwZShwcmUpO1xuICAgIGlmIChyb290Q3VycmVudFR5cGUgPT0gT0JKRUNUVFlQRSAmJiByb290UHJlVHlwZSA9PSBPQkpFQ1RUWVBFKSB7XG4gICAgICAgIGlmKE9iamVjdC5rZXlzKGN1cnJlbnQpLmxlbmd0aCA+PSBPYmplY3Qua2V5cyhwcmUpLmxlbmd0aCl7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcHJlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFtrZXldID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzeW5jS2V5cyhjdXJyZW50VmFsdWUsIHByZVtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJvb3RDdXJyZW50VHlwZSA9PSBBUlJBWVRZUEUgJiYgcm9vdFByZVR5cGUgPT0gQVJSQVlUWVBFKSB7XG4gICAgICAgIGlmIChjdXJyZW50Lmxlbmd0aCA+PSBwcmUubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzeW5jS2V5cyhjdXJyZW50W2luZGV4XSwgaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gX2RpZmYoY3VycmVudCwgcHJlLCBwYXRoLCByZXN1bHQpIHtcbiAgICBpZiAoY3VycmVudCA9PT0gcHJlKSB7IHJldHVybiB9XG4gICAgdmFyIHJvb3RDdXJyZW50VHlwZSA9IHR5cGUoY3VycmVudCk7XG4gICAgdmFyIHJvb3RQcmVUeXBlID0gdHlwZShwcmUpO1xuICAgIGlmIChyb290Q3VycmVudFR5cGUgPT0gT0JKRUNUVFlQRSkge1xuICAgICAgICBpZiAocm9vdFByZVR5cGUgIT0gT0JKRUNUVFlQRSB8fCBPYmplY3Qua2V5cyhjdXJyZW50KS5sZW5ndGggPCBPYmplY3Qua2V5cyhwcmUpLmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0UmVzdWx0KHJlc3VsdCwgcGF0aCwgY3VycmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uICgga2V5ICkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSBjdXJyZW50W2tleV07XG4gICAgICAgICAgICAgICAgdmFyIHByZVZhbHVlID0gcHJlW2tleV07XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUeXBlID0gdHlwZShjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIHZhciBwcmVUeXBlID0gdHlwZShwcmVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9IEFSUkFZVFlQRSAmJiBjdXJyZW50VHlwZSAhPSBPQkpFQ1RUWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT0gcHJlW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdChyZXN1bHQsIChwYXRoID09ICcnID8gJycgOiBwYXRoICsgXCIuXCIpICsga2V5LCBjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VHlwZSA9PSBBUlJBWVRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZVR5cGUgIT0gQVJSQVlUWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCAocGF0aCA9PSAnJyA/ICcnIDogcGF0aCArIFwiLlwiKSArIGtleSwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUubGVuZ3RoIDwgcHJlVmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KHJlc3VsdCwgKHBhdGggPT0gJycgPyAnJyA6IHBhdGggKyBcIi5cIikgKyBrZXksIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGlmZihpdGVtLCBwcmVWYWx1ZVtpbmRleF0sIChwYXRoID09ICcnID8gJycgOiBwYXRoICsgXCIuXCIpICsga2V5ICsgJ1snICsgaW5kZXggKyAnXScsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09IE9CSkVDVFRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZVR5cGUgIT0gT0JKRUNUVFlQRSB8fCBPYmplY3Qua2V5cyhjdXJyZW50VmFsdWUpLmxlbmd0aCA8IE9iamVjdC5rZXlzKHByZVZhbHVlKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdChyZXN1bHQsIChwYXRoID09ICcnID8gJycgOiBwYXRoICsgXCIuXCIpICsga2V5LCBjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgc3ViS2V5IGluIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kaWZmKGN1cnJlbnRWYWx1ZVtzdWJLZXldLCBwcmVWYWx1ZVtzdWJLZXldLCAocGF0aCA9PSAnJyA/ICcnIDogcGF0aCArIFwiLlwiKSArIGtleSArICcuJyArIHN1YktleSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjdXJyZW50KSBsb29wKCBrZXkgKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocm9vdEN1cnJlbnRUeXBlID09IEFSUkFZVFlQRSkge1xuICAgICAgICBpZiAocm9vdFByZVR5cGUgIT0gQVJSQVlUWVBFKSB7XG4gICAgICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCBwYXRoLCBjdXJyZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50Lmxlbmd0aCA8IHByZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCBwYXRoLCBjdXJyZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBfZGlmZihpdGVtLCBwcmVbaW5kZXhdLCBwYXRoICsgJ1snICsgaW5kZXggKyAnXScsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCBwYXRoLCBjdXJyZW50KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFJlc3VsdChyZXN1bHQsIGssIHYpIHtcbiAgICAvLyBpZiAodHlwZSh2KSAhPSBGVU5DVElPTlRZUEUpIHtcbiAgICAgICAgcmVzdWx0W2tdID0gdjtcbiAgICAvLyB9XG59XG5cbmZ1bmN0aW9uIHR5cGUob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopXG59XG5cbi8qICAqL1xyXG5cclxuZnVuY3Rpb24gZmx1c2hDYWxsYmFja3MkMSh2bSkge1xyXG4gICAgaWYgKHZtLl9fbmV4dF90aWNrX2NhbGxiYWNrcyAmJiB2bS5fX25leHRfdGlja19jYWxsYmFja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52LlZVRV9BUFBfREVCVUcpIHtcclxuICAgICAgICAgICAgdmFyIG1wSW5zdGFuY2UgPSB2bS4kc2NvcGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJyArICgrbmV3IERhdGUpICsgJ11bJyArIChtcEluc3RhbmNlLmlzIHx8IG1wSW5zdGFuY2Uucm91dGUpICsgJ11bJyArIHZtLl91aWQgK1xyXG4gICAgICAgICAgICAgICAgJ106Zmx1c2hDYWxsYmFja3NbJyArIHZtLl9fbmV4dF90aWNrX2NhbGxiYWNrcy5sZW5ndGggKyAnXScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29waWVzID0gdm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgICAgIHZtLl9fbmV4dF90aWNrX2NhbGxiYWNrcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29waWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvcGllc1tpXSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFzUmVuZGVyV2F0Y2hlcih2bSkge1xyXG4gICAgcmV0dXJuIHF1ZXVlLmZpbmQoZnVuY3Rpb24gKHdhdGNoZXIpIHsgcmV0dXJuIHZtLl93YXRjaGVyID09PSB3YXRjaGVyOyB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBuZXh0VGljayQxKHZtLCBjYikge1xyXG4gICAgLy8xLm5leHRUaWNrIOS5i+WJjSDlt7Igc2V0RGF0YSDkuJQgc2V0RGF0YSDov5jmnKrlm57osIPlrozmiJBcclxuICAgIC8vMi5uZXh0VGljayDkuYvliY3lrZjlnKggcmVuZGVyIHdhdGNoZXJcclxuICAgIGlmICghdm0uX19uZXh0X3RpY2tfcGVuZGluZyAmJiAhaGFzUmVuZGVyV2F0Y2hlcih2bSkpIHtcbiAgICAgICAgaWYocHJvY2Vzcy5lbnYuVlVFX0FQUF9ERUJVRyl7XG4gICAgICAgICAgICB2YXIgbXBJbnN0YW5jZSA9IHZtLiRzY29wZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJyArICgrbmV3IERhdGUpICsgJ11bJyArIChtcEluc3RhbmNlLmlzIHx8IG1wSW5zdGFuY2Uucm91dGUpICsgJ11bJyArIHZtLl91aWQgK1xuICAgICAgICAgICAgICAgICddOm5leHRWdWVUaWNrJyk7XG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dFRpY2soY2IsIHZtKVxyXG4gICAgfWVsc2V7XG4gICAgICAgIGlmKHByb2Nlc3MuZW52LlZVRV9BUFBfREVCVUcpe1xuICAgICAgICAgICAgdmFyIG1wSW5zdGFuY2UkMSA9IHZtLiRzY29wZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJyArICgrbmV3IERhdGUpICsgJ11bJyArIChtcEluc3RhbmNlJDEuaXMgfHwgbXBJbnN0YW5jZSQxLnJvdXRlKSArICddWycgKyB2bS5fdWlkICtcbiAgICAgICAgICAgICAgICAnXTpuZXh0TVBUaWNrJyk7XG4gICAgICAgIH1cbiAgICB9XHJcbiAgICB2YXIgX3Jlc29sdmU7XHJcbiAgICBpZiAoIXZtLl9fbmV4dF90aWNrX2NhbGxiYWNrcykge1xyXG4gICAgICAgIHZtLl9fbmV4dF90aWNrX2NhbGxiYWNrcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgdm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY2IuY2FsbCh2bSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCAnbmV4dFRpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoX3Jlc29sdmUpIHtcclxuICAgICAgICAgICAgX3Jlc29sdmUodm0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXHJcbiAgICBpZiAoIWNiICYmIHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxuXG4vKiAgKi9cclxuXHJcbmZ1bmN0aW9uIGNsb25lV2l0aERhdGEodm0pIHtcclxuICAvLyDnoa7kv53lvZPliY0gdm0g5omA5pyJ5pWw5o2u6KKr5ZCM5q2lXHJcbiAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgdmFyIGRhdGFLZXlzID0gW10uY29uY2F0KFxyXG4gICAgT2JqZWN0LmtleXModm0uX2RhdGEgfHwge30pLFxyXG4gICAgT2JqZWN0LmtleXModm0uX2NvbXB1dGVkV2F0Y2hlcnMgfHwge30pKTtcclxuXHJcbiAgZGF0YUtleXMucmVkdWNlKGZ1bmN0aW9uKHJldCwga2V5KSB7XHJcbiAgICByZXRba2V5XSA9IHZtW2tleV07XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfSwgcmV0KTtcclxuICAvL1RPRE8g6ZyA6KaB5oqK5peg55So5pWw5o2u5aSE55CG5o6J77yM5q+U5aaCIGxpc3Q9PmwwIOWImSBsaXN0IOmcgOimgeenu+mZpO+8jOWQpuWImeWkmuS8oOi+k+S4gOS7veaVsOaNrlxyXG4gIE9iamVjdC5hc3NpZ24ocmV0LCB2bS4kbXAuZGF0YSB8fCB7fSk7XHJcbiAgaWYgKFxyXG4gICAgQXJyYXkuaXNBcnJheSh2bS4kb3B0aW9ucy5iZWhhdmlvcnMpICYmXHJcbiAgICB2bS4kb3B0aW9ucy5iZWhhdmlvcnMuaW5kZXhPZigndW5pOi8vZm9ybS1maWVsZCcpICE9PSAtMVxyXG4gICkgeyAvL2Zvcm0tZmllbGRcclxuICAgIHJldFsnbmFtZSddID0gdm0ubmFtZTtcclxuICAgIHJldFsndmFsdWUnXSA9IHZtLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmV0KSlcclxufVxyXG5cclxudmFyIHBhdGNoID0gZnVuY3Rpb24ob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXHJcbiAgaWYgKHZub2RlID09PSBudWxsKSB7IC8vZGVzdHJveVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIGlmICh0aGlzLm1wVHlwZSA9PT0gJ3BhZ2UnIHx8IHRoaXMubXBUeXBlID09PSAnY29tcG9uZW50Jykge1xyXG4gICAgdmFyIG1wSW5zdGFuY2UgPSB0aGlzLiRzY29wZTtcclxuICAgIHZhciBkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRhdGEgPSBjbG9uZVdpdGhEYXRhKHRoaXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgIH1cclxuICAgIGRhdGEuX193ZWJ2aWV3SWRfXyA9IG1wSW5zdGFuY2UuZGF0YS5fX3dlYnZpZXdJZF9fO1xyXG4gICAgdmFyIG1wRGF0YSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgLy/ku4XlkIzmraUgZGF0YSDkuK3mnInnmoTmlbDmja5cclxuICAgICAgbXBEYXRhW2tleV0gPSBtcEluc3RhbmNlLmRhdGFba2V5XTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGRpZmZEYXRhID0gdGhpcy4kc2hvdWxkRGlmZkRhdGEgPT09IGZhbHNlID8gZGF0YSA6IGRpZmYoZGF0YSwgbXBEYXRhKTtcclxuICAgIGlmIChPYmplY3Qua2V5cyhkaWZmRGF0YSkubGVuZ3RoKSB7XHJcbiAgICAgIGlmIChwcm9jZXNzLmVudi5WVUVfQVBQX0RFQlVHKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1snICsgKCtuZXcgRGF0ZSkgKyAnXVsnICsgKG1wSW5zdGFuY2UuaXMgfHwgbXBJbnN0YW5jZS5yb3V0ZSkgKyAnXVsnICsgdGhpcy5fdWlkICtcclxuICAgICAgICAgICdd5beu6YeP5pu05pawJyxcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRpZmZEYXRhKSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fX25leHRfdGlja19wZW5kaW5nID0gdHJ1ZTtcclxuICAgICAgbXBJbnN0YW5jZS5zZXREYXRhKGRpZmZEYXRhLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcyQxLl9fbmV4dF90aWNrX3BlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICBmbHVzaENhbGxiYWNrcyQxKHRoaXMkMSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmx1c2hDYWxsYmFja3MkMSh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcbn07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBjcmVhdGVFbXB0eVJlbmRlcigpIHtcblxufVxuXG5mdW5jdGlvbiBtb3VudENvbXBvbmVudCQxKFxuICB2bSxcbiAgZWwsXG4gIGh5ZHJhdGluZ1xuKSB7XG4gIGlmICghdm0ubXBUeXBlKSB7Ly9tYWluLmpzIOS4reeahCBuZXcgVnVlXG4gICAgcmV0dXJuIHZtXG4gIH1cbiAgaWYgKHZtLm1wVHlwZSA9PT0gJ2FwcCcpIHtcbiAgICB2bS4kb3B0aW9ucy5yZW5kZXIgPSBjcmVhdGVFbXB0eVJlbmRlcjtcbiAgfVxuICBpZiAoIXZtLiRvcHRpb25zLnJlbmRlcikge1xuICAgIHZtLiRvcHRpb25zLnJlbmRlciA9IGNyZWF0ZUVtcHR5UmVuZGVyO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICgodm0uJG9wdGlvbnMudGVtcGxhdGUgJiYgdm0uJG9wdGlvbnMudGVtcGxhdGUuY2hhckF0KDApICE9PSAnIycpIHx8XG4gICAgICAgIHZtLiRvcHRpb25zLmVsIHx8IGVsKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1lvdSBhcmUgdXNpbmcgdGhlIHJ1bnRpbWUtb25seSBidWlsZCBvZiBWdWUgd2hlcmUgdGhlIHRlbXBsYXRlICcgK1xuICAgICAgICAgICdjb21waWxlciBpcyBub3QgYXZhaWxhYmxlLiBFaXRoZXIgcHJlLWNvbXBpbGUgdGhlIHRlbXBsYXRlcyBpbnRvICcgK1xuICAgICAgICAgICdyZW5kZXIgZnVuY3Rpb25zLCBvciB1c2UgdGhlIGNvbXBpbGVyLWluY2x1ZGVkIGJ1aWxkLicsXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ0ZhaWxlZCB0byBtb3VudCBjb21wb25lbnQ6IHRlbXBsYXRlIG9yIHJlbmRlciBmdW5jdGlvbiBub3QgZGVmaW5lZC4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICB2bS5tcEhvc3QgIT09ICdtcC10b3V0aWFvJyAmJiBjYWxsSG9vayh2bSwgJ2JlZm9yZU1vdW50Jyk7XG5cbiAgdmFyIHVwZGF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2bS5fdXBkYXRlKHZtLl9yZW5kZXIoKSwgaHlkcmF0aW5nKTtcbiAgfTtcblxuICAvLyB3ZSBzZXQgdGhpcyB0byB2bS5fd2F0Y2hlciBpbnNpZGUgdGhlIHdhdGNoZXIncyBjb25zdHJ1Y3RvclxuICAvLyBzaW5jZSB0aGUgd2F0Y2hlcidzIGluaXRpYWwgcGF0Y2ggbWF5IGNhbGwgJGZvcmNlVXBkYXRlIChlLmcuIGluc2lkZSBjaGlsZFxuICAvLyBjb21wb25lbnQncyBtb3VudGVkIGhvb2spLCB3aGljaCByZWxpZXMgb24gdm0uX3dhdGNoZXIgYmVpbmcgYWxyZWFkeSBkZWZpbmVkXG4gIG5ldyBXYXRjaGVyKHZtLCB1cGRhdGVDb21wb25lbnQsIG5vb3AsIHtcbiAgICBiZWZvcmU6IGZ1bmN0aW9uIGJlZm9yZSgpIHtcbiAgICAgIGlmICh2bS5faXNNb3VudGVkICYmICF2bS5faXNEZXN0cm95ZWQpIHtcbiAgICAgICAgY2FsbEhvb2sodm0sICdiZWZvcmVVcGRhdGUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHRydWUgLyogaXNSZW5kZXJXYXRjaGVyICovKTtcbiAgaHlkcmF0aW5nID0gZmFsc2U7XG4gIHJldHVybiB2bVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gcmVuZGVyQ2xhc3MgKFxuICBzdGF0aWNDbGFzcyxcbiAgZHluYW1pY0NsYXNzXG4pIHtcbiAgaWYgKGlzRGVmKHN0YXRpY0NsYXNzKSB8fCBpc0RlZihkeW5hbWljQ2xhc3MpKSB7XG4gICAgcmV0dXJuIGNvbmNhdChzdGF0aWNDbGFzcywgc3RyaW5naWZ5Q2xhc3MoZHluYW1pY0NsYXNzKSlcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gJydcbn1cblxuZnVuY3Rpb24gY29uY2F0IChhLCBiKSB7XG4gIHJldHVybiBhID8gYiA/IChhICsgJyAnICsgYikgOiBhIDogKGIgfHwgJycpXG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeUNsYXNzICh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3RyaW5naWZ5QXJyYXkodmFsdWUpXG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBzdHJpbmdpZnlPYmplY3QodmFsdWUpXG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gJydcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5QXJyYXkgKHZhbHVlKSB7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIHN0cmluZ2lmaWVkO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChpc0RlZihzdHJpbmdpZmllZCA9IHN0cmluZ2lmeUNsYXNzKHZhbHVlW2ldKSkgJiYgc3RyaW5naWZpZWQgIT09ICcnKSB7XG4gICAgICBpZiAocmVzKSB7IHJlcyArPSAnICc7IH1cbiAgICAgIHJlcyArPSBzdHJpbmdpZmllZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlPYmplY3QgKHZhbHVlKSB7XG4gIHZhciByZXMgPSAnJztcbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgIGlmIChyZXMpIHsgcmVzICs9ICcgJzsgfVxuICAgICAgcmVzICs9IGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIHBhcnNlU3R5bGVUZXh0ID0gY2FjaGVkKGZ1bmN0aW9uIChjc3NUZXh0KSB7XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGxpc3REZWxpbWl0ZXIgPSAvOyg/IVteKF0qXFwpKS9nO1xuICB2YXIgcHJvcGVydHlEZWxpbWl0ZXIgPSAvOiguKykvO1xuICBjc3NUZXh0LnNwbGl0KGxpc3REZWxpbWl0ZXIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdmFyIHRtcCA9IGl0ZW0uc3BsaXQocHJvcGVydHlEZWxpbWl0ZXIpO1xuICAgICAgdG1wLmxlbmd0aCA+IDEgJiYgKHJlc1t0bXBbMF0udHJpbSgpXSA9IHRtcFsxXS50cmltKCkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXNcbn0pO1xuXG4vLyBub3JtYWxpemUgcG9zc2libGUgYXJyYXkgLyBzdHJpbmcgdmFsdWVzIGludG8gT2JqZWN0XG5mdW5jdGlvbiBub3JtYWxpemVTdHlsZUJpbmRpbmcgKGJpbmRpbmdTdHlsZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShiaW5kaW5nU3R5bGUpKSB7XG4gICAgcmV0dXJuIHRvT2JqZWN0KGJpbmRpbmdTdHlsZSlcbiAgfVxuICBpZiAodHlwZW9mIGJpbmRpbmdTdHlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGFyc2VTdHlsZVRleHQoYmluZGluZ1N0eWxlKVxuICB9XG4gIHJldHVybiBiaW5kaW5nU3R5bGVcbn1cblxuLyogICovXHJcblxyXG52YXIgTVBfTUVUSE9EUyA9IFsnY3JlYXRlU2VsZWN0b3JRdWVyeScsICdjcmVhdGVJbnRlcnNlY3Rpb25PYnNlcnZlcicsICdzZWxlY3RBbGxDb21wb25lbnRzJywgJ3NlbGVjdENvbXBvbmVudCddO1xyXG5cclxuZnVuY3Rpb24gZ2V0VGFyZ2V0KG9iaiwgcGF0aCkge1xyXG4gIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoJy4nKTtcclxuICB2YXIga2V5ID0gcGFydHNbMF07XHJcbiAgaWYgKGtleS5pbmRleE9mKCdfXyRuJykgPT09IDApIHsgLy9udW1iZXIgaW5kZXhcclxuICAgIGtleSA9IHBhcnNlSW50KGtleS5yZXBsYWNlKCdfXyRuJywgJycpKTtcclxuICB9XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIG9ialtrZXldXHJcbiAgfVxyXG4gIHJldHVybiBnZXRUYXJnZXQob2JqW2tleV0sIHBhcnRzLnNsaWNlKDEpLmpvaW4oJy4nKSlcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJuYWxNaXhpbihWdWUpIHtcclxuXHJcbiAgVnVlLmNvbmZpZy5lcnJvckhhbmRsZXIgPSBmdW5jdGlvbihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuICAgIHZhciBhcHAgPSBnZXRBcHAoKTtcclxuICAgIGlmIChhcHAgJiYgYXBwLm9uRXJyb3IpIHtcclxuICAgICAgYXBwLm9uRXJyb3IoZXJyKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgb2xkRW1pdCA9IFZ1ZS5wcm90b3R5cGUuJGVtaXQ7XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgaWYgKHRoaXMuJHNjb3BlICYmIGV2ZW50KSB7XHJcbiAgICAgIHRoaXMuJHNjb3BlWyd0cmlnZ2VyRXZlbnQnXShldmVudCwge1xyXG4gICAgICAgIF9fYXJnc19fOiB0b0FycmF5KGFyZ3VtZW50cywgMSlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2xkRW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXHJcbiAgfTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS4kbmV4dFRpY2sgPSBmdW5jdGlvbihmbikge1xyXG4gICAgcmV0dXJuIG5leHRUaWNrJDEodGhpcywgZm4pXHJcbiAgfTtcclxuXHJcbiAgTVBfTUVUSE9EUy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgIFZ1ZS5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlW21ldGhvZF0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kc2NvcGVbbWV0aG9kXShhcmdzKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIG1wLWFsaXBheVxyXG4gICAgICBpZiAodHlwZW9mIG15ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGlmIChtZXRob2QgPT09ICdjcmVhdGVTZWxlY3RvclF1ZXJ5Jykge1xyXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbiAgICAgICAgcmV0dXJuIG15LmNyZWF0ZVNlbGVjdG9yUXVlcnkoYXJncylcclxuICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdjcmVhdGVJbnRlcnNlY3Rpb25PYnNlcnZlcicpIHtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4gICAgICAgIHJldHVybiBteS5jcmVhdGVJbnRlcnNlY3Rpb25PYnNlcnZlcihhcmdzKVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFRPRE8gbXAtYWxpcGF5IOaaguS4jeaUr+aMgSBzZWxlY3RBbGxDb21wb25lbnRzLHNlbGVjdENvbXBvbmVudFxyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS5fX2luaXRfcHJvdmlkZSA9IGluaXRQcm92aWRlO1xyXG5cclxuICBWdWUucHJvdG90eXBlLl9faW5pdF9pbmplY3Rpb25zID0gaW5pdEluamVjdGlvbnM7XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX19jYWxsX2hvb2sgPSBmdW5jdGlvbihob29rLCBhcmdzKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgLy8gIzc1NzMgZGlzYWJsZSBkZXAgY29sbGVjdGlvbiB3aGVuIGludm9raW5nIGxpZmVjeWNsZSBob29rc1xyXG4gICAgcHVzaFRhcmdldCgpO1xyXG4gICAgdmFyIGhhbmRsZXJzID0gdm0uJG9wdGlvbnNbaG9va107XHJcbiAgICB2YXIgaW5mbyA9IGhvb2sgKyBcIiBob29rXCI7XHJcbiAgICB2YXIgcmV0O1xyXG4gICAgaWYgKGhhbmRsZXJzKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgcmV0ID0gaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoaGFuZGxlcnNbaV0sIHZtLCBhcmdzID8gW2FyZ3NdIDogbnVsbCwgdm0sIGluZm8pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodm0uX2hhc0hvb2tFdmVudCkge1xyXG4gICAgICB2bS4kZW1pdCgnaG9vazonICsgaG9vaywgYXJncyk7XHJcbiAgICB9XHJcbiAgICBwb3BUYXJnZXQoKTtcclxuICAgIHJldHVybiByZXRcclxuICB9O1xyXG5cclxuICBWdWUucHJvdG90eXBlLl9fc2V0X21vZGVsID0gZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlLCBtb2RpZmllcnMpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG1vZGlmaWVycykpIHtcclxuICAgICAgaWYgKG1vZGlmaWVycy5pbmRleE9mKCd0cmltJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1vZGlmaWVycy5pbmRleE9mKCdudW1iZXInKSAhPT0gLTEpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuX24odmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICB0YXJnZXQgPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcclxuICB9O1xyXG5cclxuICBWdWUucHJvdG90eXBlLl9fc2V0X3N5bmMgPSBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUpIHtcclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgIHRhcmdldCA9IHRoaXM7XHJcbiAgICB9XHJcbiAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xyXG4gIH07XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX19nZXRfb3JpZyA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgIGlmIChpc1BsYWluT2JqZWN0KGl0ZW0pKSB7XHJcbiAgICAgIHJldHVybiBpdGVtWyckb3JpZyddIHx8IGl0ZW1cclxuICAgIH1cclxuICAgIHJldHVybiBpdGVtXHJcbiAgfTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS5fX2dldF92YWx1ZSA9IGZ1bmN0aW9uKGRhdGFQYXRoLCB0YXJnZXQpIHtcclxuICAgIHJldHVybiBnZXRUYXJnZXQodGFyZ2V0IHx8IHRoaXMsIGRhdGFQYXRoKVxyXG4gIH07XHJcblxyXG5cclxuICBWdWUucHJvdG90eXBlLl9fZ2V0X2NsYXNzID0gZnVuY3Rpb24oZHluYW1pY0NsYXNzLCBzdGF0aWNDbGFzcykge1xyXG4gICAgcmV0dXJuIHJlbmRlckNsYXNzKHN0YXRpY0NsYXNzLCBkeW5hbWljQ2xhc3MpXHJcbiAgfTtcclxuXHJcbiAgVnVlLnByb3RvdHlwZS5fX2dldF9zdHlsZSA9IGZ1bmN0aW9uKGR5bmFtaWNTdHlsZSwgc3RhdGljU3R5bGUpIHtcclxuICAgIGlmICghZHluYW1pY1N0eWxlICYmICFzdGF0aWNTdHlsZSkge1xyXG4gICAgICByZXR1cm4gJydcclxuICAgIH1cclxuICAgIHZhciBkeW5hbWljU3R5bGVPYmogPSBub3JtYWxpemVTdHlsZUJpbmRpbmcoZHluYW1pY1N0eWxlKTtcclxuICAgIHZhciBzdHlsZU9iaiA9IHN0YXRpY1N0eWxlID8gZXh0ZW5kKHN0YXRpY1N0eWxlLCBkeW5hbWljU3R5bGVPYmopIDogZHluYW1pY1N0eWxlT2JqO1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlT2JqKS5tYXAoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuICgoaHlwaGVuYXRlKG5hbWUpKSArIFwiOlwiICsgKHN0eWxlT2JqW25hbWVdKSk7IH0pLmpvaW4oJzsnKVxyXG4gIH07XHJcblxyXG4gIFZ1ZS5wcm90b3R5cGUuX19tYXAgPSBmdW5jdGlvbih2YWwsIGl0ZXJhdGVlKSB7XHJcbiAgICAvL1RPRE8g5pqC5LiN6ICD6JmRIHN0cmluZyxudW1iZXJcclxuICAgIHZhciByZXQsIGksIGwsIGtleXMsIGtleTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgcmV0ID0gbmV3IEFycmF5KHZhbC5sZW5ndGgpO1xyXG4gICAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHJldFtpXSA9IGl0ZXJhdGVlKHZhbFtpXSwgaSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJldFxyXG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XHJcbiAgICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xyXG4gICAgICByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICBmb3IgKGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIHJldFtrZXldID0gaXRlcmF0ZWUodmFsW2tleV0sIGtleSwgaSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJldFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdXHJcbiAgfTtcclxuXHJcbn1cblxuLyogICovXHJcblxyXG52YXIgTElGRUNZQ0xFX0hPT0tTJDEgPSBbXHJcbiAgICAvL0FwcFxyXG4gICAgJ29uTGF1bmNoJyxcclxuICAgICdvblNob3cnLFxyXG4gICAgJ29uSGlkZScsXHJcbiAgICAnb25VbmlOVmlld01lc3NhZ2UnLFxuICAgICdvbkVycm9yJyxcclxuICAgIC8vUGFnZVxyXG4gICAgJ29uTG9hZCcsXHJcbiAgICAvLyAnb25TaG93JyxcclxuICAgICdvblJlYWR5JyxcclxuICAgIC8vICdvbkhpZGUnLFxyXG4gICAgJ29uVW5sb2FkJyxcclxuICAgICdvblB1bGxEb3duUmVmcmVzaCcsXHJcbiAgICAnb25SZWFjaEJvdHRvbScsXHJcbiAgICAnb25UYWJJdGVtVGFwJyxcclxuICAgICdvblNoYXJlQXBwTWVzc2FnZScsXG4gICAgJ29uUmVzaXplJyxcclxuICAgICdvblBhZ2VTY3JvbGwnLFxyXG4gICAgJ29uTmF2aWdhdGlvbkJhckJ1dHRvblRhcCcsXHJcbiAgICAnb25CYWNrUHJlc3MnLFxyXG4gICAgJ29uTmF2aWdhdGlvbkJhclNlYXJjaElucHV0Q2hhbmdlZCcsXHJcbiAgICAnb25OYXZpZ2F0aW9uQmFyU2VhcmNoSW5wdXRDb25maXJtZWQnLFxyXG4gICAgJ29uTmF2aWdhdGlvbkJhclNlYXJjaElucHV0Q2xpY2tlZCcsXHJcbiAgICAvL0NvbXBvbmVudFxyXG4gICAgLy8gJ29uUmVhZHknLCAvLyDlhbzlrrnml6fniYjmnKzvvIzlupTor6Xnp7vpmaTor6Xkuovku7ZcclxuICAgICdvblBhZ2VTaG93JyxcclxuICAgICdvblBhZ2VIaWRlJyxcclxuICAgICdvblBhZ2VSZXNpemUnXHJcbl07XHJcbmZ1bmN0aW9uIGxpZmVjeWNsZU1peGluJDEoVnVlKSB7XHJcblxyXG4gICAgLy9maXhlZCB2dWUtY2xhc3MtY29tcG9uZW50XHJcbiAgICB2YXIgb2xkRXh0ZW5kID0gVnVlLmV4dGVuZDtcclxuICAgIFZ1ZS5leHRlbmQgPSBmdW5jdGlvbihleHRlbmRPcHRpb25zKSB7XHJcbiAgICAgICAgZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnMgfHwge307XHJcblxyXG4gICAgICAgIHZhciBtZXRob2RzID0gZXh0ZW5kT3B0aW9ucy5tZXRob2RzO1xyXG4gICAgICAgIGlmIChtZXRob2RzKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG1ldGhvZHMpLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChMSUZFQ1lDTEVfSE9PS1MkMS5pbmRleE9mKG1ldGhvZE5hbWUpIT09LTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHRlbmRPcHRpb25zW21ldGhvZE5hbWVdID0gbWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgbWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2xkRXh0ZW5kLmNhbGwodGhpcywgZXh0ZW5kT3B0aW9ucylcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHN0cmF0ZWdpZXMgPSBWdWUuY29uZmlnLm9wdGlvbk1lcmdlU3RyYXRlZ2llcztcclxuICAgIHZhciBtZXJnZUhvb2sgPSBzdHJhdGVnaWVzLmNyZWF0ZWQ7XHJcbiAgICBMSUZFQ1lDTEVfSE9PS1MkMS5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XHJcbiAgICAgICAgc3RyYXRlZ2llc1tob29rXSA9IG1lcmdlSG9vaztcclxuICAgIH0pO1xyXG5cclxuICAgIFZ1ZS5wcm90b3R5cGUuX19saWZlY3ljbGVfaG9va3NfXyA9IExJRkVDWUNMRV9IT09LUyQxO1xyXG59XG5cbi8qICAqL1xyXG5cbi8vIGluc3RhbGwgcGxhdGZvcm0gcGF0Y2ggZnVuY3Rpb25cclxuVnVlLnByb3RvdHlwZS5fX3BhdGNoX18gPSBwYXRjaDtcclxuXHJcbi8vIHB1YmxpYyBtb3VudCBtZXRob2RcclxuVnVlLnByb3RvdHlwZS4kbW91bnQgPSBmdW5jdGlvbihcclxuICAgIGVsICxcclxuICAgIGh5ZHJhdGluZyBcclxuKSB7XHJcbiAgICByZXR1cm4gbW91bnRDb21wb25lbnQkMSh0aGlzLCBlbCwgaHlkcmF0aW5nKVxyXG59O1xyXG5cclxubGlmZWN5Y2xlTWl4aW4kMShWdWUpO1xyXG5pbnRlcm5hbE1peGluKFZ1ZSk7XG5cbi8qICAqL1xuXG5leHBvcnQgZGVmYXVsdCBWdWU7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcclxuXHJcbmNvbnN0IFNUQVRfVkVSU0lPTiA9IHZlcnNpb247XHJcbmNvbnN0IFNUQVRfVVJMID0gJ2h0dHBzOi8vdG9uZ2ppLmRjbG91ZC5pby91bmkvc3RhdCc7XHJcbmNvbnN0IFNUQVRfSDVfVVJMID0gJ2h0dHBzOi8vdG9uZ2ppLmRjbG91ZC5pby91bmkvc3RhdC5naWYnOyBcclxuY29uc3QgUEFHRV9QVkVSX1RJTUUgPSAxODAwO1xyXG5jb25zdCBBUFBfUFZFUl9USU1FID0gMzAwO1xyXG5jb25zdCBPUEVSQVRJTkdfVElNRSA9IDEwO1xyXG5cclxuY29uc3QgVVVJRF9LRVkgPSAnX19EQ19TVEFUX1VVSUQnO1xyXG5jb25zdCBVVUlEX1ZBTFVFID0gJ19fRENfVVVJRF9WQUxVRSc7XHJcblxyXG5mdW5jdGlvbiBnZXRVdWlkKCkge1xyXG4gIGxldCB1dWlkID0gJyc7XHJcbiAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnbicpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHV1aWQgPSBwbHVzLnJ1bnRpbWUuZ2V0RENsb3VkSWQoKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgdXVpZCA9ICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHV1aWRcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICB1dWlkID0gdW5pLmdldFN0b3JhZ2VTeW5jKFVVSURfS0VZKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICB1dWlkID0gVVVJRF9WQUxVRTtcclxuICB9XHJcblxyXG4gIGlmICghdXVpZCkge1xyXG4gICAgdXVpZCA9IERhdGUubm93KCkgKyAnJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDFlNyk7XHJcbiAgICB0cnkge1xyXG4gICAgICB1bmkuc2V0U3RvcmFnZVN5bmMoVVVJRF9LRVksIHV1aWQpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICB1bmkuc2V0U3RvcmFnZVN5bmMoVVVJRF9LRVksIFVVSURfVkFMVUUpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdXVpZDtcclxufVxyXG5cclxuY29uc3QgZ2V0U2dpbiA9IChzdGF0RGF0YSkgPT4ge1xyXG4gIGxldCBhcnIgPSBPYmplY3Qua2V5cyhzdGF0RGF0YSk7XHJcbiAgbGV0IHNvcnRBcnIgPSBhcnIuc29ydCgpO1xyXG4gIGxldCBzZ2luID0ge307XHJcbiAgbGV0IHNnaW5TdHIgPSAnJztcclxuICBmb3IgKHZhciBpIGluIHNvcnRBcnIpIHtcclxuICAgIHNnaW5bc29ydEFycltpXV0gPSBzdGF0RGF0YVtzb3J0QXJyW2ldXTtcclxuICAgIHNnaW5TdHIgKz0gc29ydEFycltpXSArICc9JyArIHN0YXREYXRhW3NvcnRBcnJbaV1dICsgJyYnO1xyXG4gIH1cclxuICAvLyBjb25zdCBvcHRpb25zID0gc2dpblN0ci5zdWJzdHIoMCwgc2dpblN0ci5sZW5ndGggLSAxKVxyXG4gIC8vIHNnaW5TdHIgPSBzZ2luU3RyLnN1YnN0cigwLCBzZ2luU3RyLmxlbmd0aCAtIDEpICsgJyZrZXk9JyArIFNUQVRfS0VZO1xyXG4gIC8vIGNvbnN0IHNpID0gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpLnVwZGF0ZShzZ2luU3RyKS5kaWdlc3QoJ2hleCcpO1xyXG4gIHJldHVybiB7XHJcbiAgICBzaWduOiAnJyxcclxuICAgIG9wdGlvbnM6IHNnaW5TdHIuc3Vic3RyKDAsIHNnaW5TdHIubGVuZ3RoIC0gMSlcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0U3BsaWNpbmcgPSAoZGF0YSkgPT4ge1xyXG4gIGxldCBzdHIgPSAnJztcclxuICBmb3IgKHZhciBpIGluIGRhdGEpIHtcclxuICAgIHN0ciArPSBpICsgJz0nICsgZGF0YVtpXSArICcmJztcclxuICB9XHJcbiAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgc3RyLmxlbmd0aCAtIDEpXHJcbn07XHJcblxyXG5jb25zdCBnZXRUaW1lID0gKCkgPT4ge1xyXG4gIHJldHVybiBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UGxhdGZvcm1OYW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXRmb3JtTGlzdCA9IHtcclxuICAgICdhcHAtcGx1cyc6ICduJyxcclxuICAgICdoNSc6ICdoNScsXHJcbiAgICAnbXAtd2VpeGluJzogJ3d4JyxcclxuICAgICdtcC1hbGlwYXknOiAnYWxpJyxcclxuICAgICdtcC1iYWlkdSc6ICdiZCcsXHJcbiAgICAnbXAtdG91dGlhbyc6ICd0dCcsXHJcbiAgICAnbXAtcXEnOiAncXEnXHJcbiAgfTtcclxuICByZXR1cm4gcGxhdGZvcm1MaXN0W3Byb2Nlc3MuZW52LlZVRV9BUFBfUExBVEZPUk1dO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UGFja05hbWUgPSAoKSA9PiB7XHJcbiAgbGV0IHBhY2tOYW1lID0gJyc7XHJcbiAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnd3gnIHx8IGdldFBsYXRmb3JtTmFtZSgpID09PSAncXEnKSB7XHJcbiAgICAvLyDlhbzlrrnlvq7kv6HlsI/nqIvluo/kvY7niYjmnKzln7rnoYDlupNcclxuICAgIGlmKHVuaS5jYW5JVXNlKCdnZXRBY2NvdW50SW5mb1N5bmMnKSl7XHJcbiAgICAgIHBhY2tOYW1lID0gdW5pLmdldEFjY291bnRJbmZvU3luYygpLm1pbmlQcm9ncmFtLmFwcElkIHx8ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcGFja05hbWVcclxufTtcclxuXHJcbmNvbnN0IGdldFZlcnNpb24gPSAoKSA9PiB7XHJcbiAgcmV0dXJuIGdldFBsYXRmb3JtTmFtZSgpID09PSAnbicgPyBwbHVzLnJ1bnRpbWUudmVyc2lvbiA6ICcnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q2hhbm5lbCA9ICgpID0+IHtcclxuICBjb25zdCBwbGF0Zm9ybU5hbWUgPSBnZXRQbGF0Zm9ybU5hbWUoKTtcclxuICBsZXQgY2hhbm5lbCA9ICcnO1xyXG4gIGlmIChwbGF0Zm9ybU5hbWUgPT09ICduJykge1xyXG4gICAgY2hhbm5lbCA9IHBsdXMucnVudGltZS5jaGFubmVsO1xyXG4gIH1cclxuICByZXR1cm4gY2hhbm5lbDtcclxufTtcclxuXHJcbmNvbnN0IGdldFNjZW5lID0gKG9wdGlvbnMpID0+IHtcclxuICBjb25zdCBwbGF0Zm9ybU5hbWUgPSBnZXRQbGF0Zm9ybU5hbWUoKTtcclxuICBsZXQgc2NlbmUgPSAnJztcclxuICBpZiAob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG4gIGlmIChwbGF0Zm9ybU5hbWUgPT09ICd3eCcpIHtcclxuICAgIHNjZW5lID0gdW5pLmdldExhdW5jaE9wdGlvbnNTeW5jKCkuc2NlbmU7XHJcbiAgfVxyXG4gIHJldHVybiBzY2VuZTtcclxufTtcclxuY29uc3QgRmlyc3RfX1Zpc2l0X19UaW1lX19LRVkgPSAnRmlyc3RfX1Zpc2l0X19UaW1lJztcclxuY29uc3QgTGFzdF9fVmlzaXRfX1RpbWVfX0tFWSA9ICdMYXN0X19WaXNpdF9fVGltZSc7XHJcblxyXG5jb25zdCBnZXRGaXJzdFZpc2l0VGltZSA9ICgpID0+IHtcclxuICBjb25zdCB0aW1lU3RvcmdlID0gdW5pLmdldFN0b3JhZ2VTeW5jKEZpcnN0X19WaXNpdF9fVGltZV9fS0VZKTtcclxuICBsZXQgdGltZSA9IDA7XHJcbiAgaWYgKHRpbWVTdG9yZ2UpIHtcclxuICAgIHRpbWUgPSB0aW1lU3RvcmdlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aW1lID0gZ2V0VGltZSgpO1xyXG4gICAgdW5pLnNldFN0b3JhZ2VTeW5jKEZpcnN0X19WaXNpdF9fVGltZV9fS0VZLCB0aW1lKTtcclxuICAgIHVuaS5yZW1vdmVTdG9yYWdlU3luYyhMYXN0X19WaXNpdF9fVGltZV9fS0VZKTtcclxuICB9XHJcbiAgcmV0dXJuIHRpbWU7XHJcbn07XHJcblxyXG5jb25zdCBnZXRMYXN0VmlzaXRUaW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IHRpbWVTdG9yZ2UgPSB1bmkuZ2V0U3RvcmFnZVN5bmMoTGFzdF9fVmlzaXRfX1RpbWVfX0tFWSk7XHJcbiAgbGV0IHRpbWUgPSAwO1xyXG4gIGlmICh0aW1lU3RvcmdlKSB7XHJcbiAgICB0aW1lID0gdGltZVN0b3JnZTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZSA9ICcnO1xyXG4gIH1cclxuICB1bmkuc2V0U3RvcmFnZVN5bmMoTGFzdF9fVmlzaXRfX1RpbWVfX0tFWSwgZ2V0VGltZSgpKTtcclxuICByZXR1cm4gdGltZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBQQUdFX1JFU0lERU5DRV9USU1FID0gJ19fcGFnZV9fcmVzaWRlbmNlX190aW1lJztcclxubGV0IEZpcnN0X1BhZ2VfcmVzaWRlbmNlX3RpbWUgPSAwO1xyXG5sZXQgTGFzdF9QYWdlX3Jlc2lkZW5jZV90aW1lID0gMDtcclxuXHJcblxyXG5jb25zdCBzZXRQYWdlUmVzaWRlbmNlVGltZSA9ICgpID0+IHtcclxuICBGaXJzdF9QYWdlX3Jlc2lkZW5jZV90aW1lID0gZ2V0VGltZSgpO1xyXG4gIGlmIChnZXRQbGF0Zm9ybU5hbWUoKSA9PT0gJ24nKSB7XHJcbiAgICB1bmkuc2V0U3RvcmFnZVN5bmMoUEFHRV9SRVNJREVOQ0VfVElNRSwgZ2V0VGltZSgpKTtcclxuICB9XHJcbiAgcmV0dXJuIEZpcnN0X1BhZ2VfcmVzaWRlbmNlX3RpbWVcclxufTtcclxuXHJcbmNvbnN0IGdldFBhZ2VSZXNpZGVuY2VUaW1lID0gKCkgPT4ge1xyXG4gIExhc3RfUGFnZV9yZXNpZGVuY2VfdGltZSA9IGdldFRpbWUoKTtcclxuICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICduJykge1xyXG4gICAgRmlyc3RfUGFnZV9yZXNpZGVuY2VfdGltZSA9IHVuaS5nZXRTdG9yYWdlU3luYyhQQUdFX1JFU0lERU5DRV9USU1FKTtcclxuICB9XHJcbiAgcmV0dXJuIExhc3RfUGFnZV9yZXNpZGVuY2VfdGltZSAtIEZpcnN0X1BhZ2VfcmVzaWRlbmNlX3RpbWVcclxufTtcclxuY29uc3QgVE9UQUxfX1ZJU0lUX19DT1VOVCA9ICdUb3RhbF9fVmlzaXRfX0NvdW50JztcclxuY29uc3QgZ2V0VG90YWxWaXNpdENvdW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHRpbWVTdG9yZ2UgPSB1bmkuZ2V0U3RvcmFnZVN5bmMoVE9UQUxfX1ZJU0lUX19DT1VOVCk7XHJcbiAgbGV0IGNvdW50ID0gMTtcclxuICBpZiAodGltZVN0b3JnZSkge1xyXG4gICAgY291bnQgPSB0aW1lU3RvcmdlO1xyXG4gICAgY291bnQrKztcclxuICB9XHJcbiAgdW5pLnNldFN0b3JhZ2VTeW5jKFRPVEFMX19WSVNJVF9fQ09VTlQsIGNvdW50KTtcclxuICByZXR1cm4gY291bnQ7XHJcbn07XHJcblxyXG5jb25zdCBHZXRFbmNvZGVVUklDb21wb25lbnRPcHRpb25zID0gKHN0YXREYXRhKSA9PiB7XHJcbiAgbGV0IGRhdGEgPSB7fTtcclxuICBmb3IgKGxldCBwcm9wIGluIHN0YXREYXRhKSB7XHJcbiAgICBkYXRhW3Byb3BdID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0YXREYXRhW3Byb3BdKTtcclxuICB9XHJcbiAgcmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5sZXQgU2V0X19GaXJzdF9fVGltZSA9IDA7XHJcbmxldCBTZXRfX0xhc3RfX1RpbWUgPSAwO1xyXG5cclxuY29uc3QgZ2V0Rmlyc3RUaW1lID0gKCkgPT4ge1xyXG4gIGxldCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgU2V0X19GaXJzdF9fVGltZSA9IHRpbWU7XHJcbiAgU2V0X19MYXN0X19UaW1lID0gMDtcclxuICByZXR1cm4gdGltZTtcclxufTtcclxuXHJcblxyXG5jb25zdCBnZXRMYXN0VGltZSA9ICgpID0+IHtcclxuICBsZXQgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gIFNldF9fTGFzdF9fVGltZSA9IHRpbWU7XHJcbiAgcmV0dXJuIHRpbWU7XHJcbn07XHJcblxyXG5cclxuY29uc3QgZ2V0UmVzaWRlbmNlVGltZSA9ICh0eXBlKSA9PiB7XHJcbiAgbGV0IHJlc2lkZW5jZVRpbWUgPSAwO1xyXG4gIGlmIChTZXRfX0ZpcnN0X19UaW1lICE9PSAwKSB7XHJcbiAgICByZXNpZGVuY2VUaW1lID0gU2V0X19MYXN0X19UaW1lIC0gU2V0X19GaXJzdF9fVGltZTtcclxuICB9XHJcblxyXG4gIHJlc2lkZW5jZVRpbWUgPSBwYXJzZUludChyZXNpZGVuY2VUaW1lIC8gMTAwMCk7XHJcbiAgcmVzaWRlbmNlVGltZSA9IHJlc2lkZW5jZVRpbWUgPCAxID8gMSA6IHJlc2lkZW5jZVRpbWU7XHJcbiAgaWYgKHR5cGUgPT09ICdhcHAnKSB7XHJcbiAgICBsZXQgb3ZlcnRpbWUgPSByZXNpZGVuY2VUaW1lID4gQVBQX1BWRVJfVElNRSA/IHRydWUgOiBmYWxzZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc2lkZW5jZVRpbWUsXHJcbiAgICAgIG92ZXJ0aW1lXHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAodHlwZSA9PT0gJ3BhZ2UnKSB7XHJcbiAgICBsZXQgb3ZlcnRpbWUgPSByZXNpZGVuY2VUaW1lID4gUEFHRV9QVkVSX1RJTUUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXNpZGVuY2VUaW1lLFxyXG4gICAgICBvdmVydGltZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByZXNpZGVuY2VUaW1lXHJcbiAgfTtcclxuXHJcbn07XHJcblxyXG5jb25zdCBnZXRSb3V0ZSA9ICgpID0+IHtcclxuICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICB2YXIgcGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gIGxldCBfc2VsZiA9IHBhZ2UuJHZtO1xyXG5cclxuICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICdiZCcpIHtcclxuICAgIHJldHVybiBfc2VsZi4kbXAgJiYgX3NlbGYuJG1wLnBhZ2UuaXM7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAoX3NlbGYuJHNjb3BlICYmIF9zZWxmLiRzY29wZS5yb3V0ZSkgfHwgKF9zZWxmLiRtcCAmJiBfc2VsZi4kbXAucGFnZS5yb3V0ZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2V0UGFnZVJvdXRlID0gKHNlbGYpID0+IHtcclxuICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICB2YXIgcGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gIGxldCBfc2VsZiA9IHBhZ2UuJHZtO1xyXG4gIGxldCBxdWVyeSA9IHNlbGYuX3F1ZXJ5O1xyXG4gIGxldCBzdHIgPSBxdWVyeSAmJiBKU09OLnN0cmluZ2lmeShxdWVyeSkgIT09ICd7fScgPyAnPycgKyBKU09OLnN0cmluZ2lmeShxdWVyeSkgOiAnJztcclxuICAvLyBjbGVhclxyXG4gIHNlbGYuX3F1ZXJ5ID0gJyc7XHJcbiAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnYmQnKSB7XHJcbiAgICByZXR1cm4gX3NlbGYuJG1wICYmIF9zZWxmLiRtcC5wYWdlLmlzICsgc3RyO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gKF9zZWxmLiRzY29wZSAmJiBfc2VsZi4kc2NvcGUucm91dGUgKyBzdHIgKXx8IChfc2VsZi4kbXAgJiYgX3NlbGYuJG1wLnBhZ2Uucm91dGUgKyBzdHIpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGdldFBhZ2VUeXBlcyA9IChzZWxmKSA9PiB7XHJcbiAgaWYgKHNlbGYubXBUeXBlID09PSAncGFnZScgfHwgKHNlbGYuJG1wICYmIHNlbGYuJG1wLm1wVHlwZSA9PT0gJ3BhZ2UnKSB8fCBzZWxmLiRvcHRpb25zLm1wVHlwZSA9PT0gJ3BhZ2UnKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuY29uc3QgY2FsaWJyYXRpb24gPSAoZXZlbnROYW1lLCBvcHRpb25zKSA9PiB7XHJcbiAgLy8gIGxvZ2luIOOAgSBzaGFyZSDjgIFwYXlfc3VjY2VzcyDjgIFwYXlfZmFpbCDjgIFyZWdpc3RlciDjgIF0aXRsZVxyXG4gIGlmKCFldmVudE5hbWUpe1xyXG4gICAgY29uc29sZS5lcnJvcihgdW5pLnJlcG9ydCDnvLrlsJEgW2V2ZW50TmFtZV0g5Y+C5pWwYCk7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gJ3N0cmluZycpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYHVuaS5yZXBvcnQgW2V2ZW50TmFtZV0g5Y+C5pWw57G75Z6L6ZSZ6K+vLOWPquiDveS4uiBTdHJpbmcg57G75Z6LYCk7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBpZiAoZXZlbnROYW1lLmxlbmd0aCA+IDI1NSkge1xyXG4gICAgY29uc29sZS5lcnJvcihgdW5pLnJlcG9ydCBbZXZlbnROYW1lXSDlj4LmlbDplb/luqbkuI3og73lpKfkuo4gMjU1YCk7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnc3RyaW5nJyAmJiB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYHVuaS5yZXBvcnQgW29wdGlvbnNdIOWPguaVsOexu+Wei+mUmeivryzlj6rog73kuLogU3RyaW5nIOaIliBPYmplY3Qg57G75Z6LYCk7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmxlbmd0aCA+IDI1NSkge1xyXG4gICAgY29uc29sZS5lcnJvcihgdW5pLnJlcG9ydCBbb3B0aW9uc10g5Y+C5pWw6ZW/5bqm5LiN6IO95aSn5LqOIDI1NWApO1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGlmIChldmVudE5hbWUgPT09ICd0aXRsZScgJiYgdHlwZW9mIG9wdGlvbnMgIT09ICdzdHJpbmcnKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCd1bmkucmVwb3J0IFtldmVudE5hbWVdIOWPguaVsOS4uiB0aXRsZSDml7bvvIxbb3B0aW9uc10g5Y+C5pWw5Y+q6IO95Li6IFN0cmluZyDnsbvlnosnKTtcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgUGFnZXNKc29uID0gcmVxdWlyZSgndW5pLXBhZ2VzP3tcInR5cGVcIjpcInN0eWxlXCJ9JykuZGVmYXVsdDtcclxuY29uc3Qgc3RhdENvbmZpZyA9IHJlcXVpcmUoJ3VuaS1zdGF0LWNvbmZpZycpLmRlZmF1bHQgfHwgcmVxdWlyZSgndW5pLXN0YXQtY29uZmlnJyk7XHJcblxyXG5jb25zdCByZXN1bHRPcHRpb25zID0gdW5pLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcblxyXG5jbGFzcyBVdGlsIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2VsZiA9ICcnO1xyXG4gICAgdGhpcy5fcmV0cnkgPSAwO1xyXG4gICAgdGhpcy5fcGxhdGZvcm0gPSAnJztcclxuICAgIHRoaXMuX3F1ZXJ5ID0ge307XHJcbiAgICB0aGlzLl9uYXZpZ2F0aW9uQmFyVGl0bGUgPSB7XHJcbiAgICAgIGNvbmZpZzogJycsXHJcbiAgICAgIHBhZ2U6ICcnLFxyXG4gICAgICByZXBvcnQ6ICcnLFxyXG4gICAgICBsdDogJydcclxuICAgIH07XHJcbiAgICB0aGlzLl9vcGVyYXRpbmdUaW1lID0gMDtcclxuICAgIHRoaXMuX3JlcG9ydGluZ1JlcXVlc3REYXRhID0ge1xyXG4gICAgICAnMSc6IFtdLFxyXG4gICAgICAnMTEnOiBbXVxyXG4gICAgfTtcclxuICAgIHRoaXMuX19wcmV2ZW50X3RyaWdnZXJpbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9fbGljYXRpb25IaWRlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9fbGljYXRpb25TaG93ID0gZmFsc2U7XHJcbiAgICB0aGlzLl9sYXN0UGFnZVJvdXRlID0gJyc7XHJcbiAgICB0aGlzLnN0YXREYXRhID0ge1xyXG4gICAgICB1dWlkOiBnZXRVdWlkKCksXHJcbiAgICAgIHV0OiBnZXRQbGF0Zm9ybU5hbWUoKSxcclxuICAgICAgbXBuOiBnZXRQYWNrTmFtZSgpLFxyXG4gICAgICBhazogc3RhdENvbmZpZy5hcHBpZCxcclxuICAgICAgdXN2OiBTVEFUX1ZFUlNJT04sXHJcbiAgICAgIHY6IGdldFZlcnNpb24oKSxcclxuICAgICAgY2g6IGdldENoYW5uZWwoKSxcclxuICAgICAgY246ICcnLFxyXG4gICAgICBwbjogJycsXHJcbiAgICAgIGN0OiAnJyxcclxuICAgICAgdDogZ2V0VGltZSgpLFxyXG4gICAgICB0dDogJycsXHJcbiAgICAgIHA6IHJlc3VsdE9wdGlvbnMucGxhdGZvcm0gPT09ICdhbmRyb2lkJyA/ICdhJyA6ICdpJyxcclxuICAgICAgYnJhbmQ6IHJlc3VsdE9wdGlvbnMuYnJhbmQgfHwgJycsXHJcbiAgICAgIG1kOiByZXN1bHRPcHRpb25zLm1vZGVsLFxyXG4gICAgICBzdjogcmVzdWx0T3B0aW9ucy5zeXN0ZW0ucmVwbGFjZSgvKEFuZHJvaWR8aU9TKVxccy8sICcnKSxcclxuICAgICAgbXBzZGs6IHJlc3VsdE9wdGlvbnMuU0RLVmVyc2lvbiB8fCAnJyxcclxuICAgICAgbXB2OiByZXN1bHRPcHRpb25zLnZlcnNpb24gfHwgJycsXHJcbiAgICAgIGxhbmc6IHJlc3VsdE9wdGlvbnMubGFuZ3VhZ2UsXHJcbiAgICAgIHByOiByZXN1bHRPcHRpb25zLnBpeGVsUmF0aW8sXHJcbiAgICAgIHd3OiByZXN1bHRPcHRpb25zLndpbmRvd1dpZHRoLFxyXG4gICAgICB3aDogcmVzdWx0T3B0aW9ucy53aW5kb3dIZWlnaHQsXHJcbiAgICAgIHN3OiByZXN1bHRPcHRpb25zLnNjcmVlbldpZHRoLFxyXG4gICAgICBzaDogcmVzdWx0T3B0aW9ucy5zY3JlZW5IZWlnaHRcclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcbiAgX2FwcGxpY2F0aW9uU2hvdygpIHtcclxuICAgIGlmICh0aGlzLl9fbGljYXRpb25IaWRlKSB7XHJcbiAgICAgIGdldExhc3RUaW1lKCk7XHJcbiAgICAgIGNvbnN0IHRpbWUgPSBnZXRSZXNpZGVuY2VUaW1lKCdhcHAnKTtcclxuICAgICAgaWYgKHRpbWUub3ZlcnRpbWUpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIHBhdGg6IHRoaXMuX2xhc3RQYWdlUm91dGUsXHJcbiAgICAgICAgICBzY2VuZTogdGhpcy5zdGF0RGF0YS5zY1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fc2VuZFJlcG9ydFJlcXVlc3Qob3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fX2xpY2F0aW9uSGlkZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2FwcGxpY2F0aW9uSGlkZShzZWxmLCB0eXBlKSB7XHJcblxyXG4gICAgdGhpcy5fX2xpY2F0aW9uSGlkZSA9IHRydWU7XHJcbiAgICBnZXRMYXN0VGltZSgpO1xyXG4gICAgY29uc3QgdGltZSA9IGdldFJlc2lkZW5jZVRpbWUoKTtcclxuICAgIGdldEZpcnN0VGltZSgpO1xyXG4gICAgY29uc3Qgcm91dGUgPSBnZXRQYWdlUm91dGUodGhpcyk7XHJcbiAgICB0aGlzLl9zZW5kSGlkZVJlcXVlc3Qoe1xyXG4gICAgICB1cmxyZWY6IHJvdXRlLFxyXG4gICAgICB1cmxyZWZfdHM6IHRpbWUucmVzaWRlbmNlVGltZVxyXG4gICAgfSwgdHlwZSk7XHJcbiAgfVxyXG5cclxuICBfcGFnZVNob3coKSB7XHJcbiAgICBjb25zdCByb3V0ZSA9IGdldFBhZ2VSb3V0ZSh0aGlzKTtcclxuICAgIGNvbnN0IHJvdXRlcGF0aCA9IGdldFJvdXRlKCk7XHJcbiAgICB0aGlzLl9uYXZpZ2F0aW9uQmFyVGl0bGUuY29uZmlnID0gUGFnZXNKc29uICYmXHJcbiAgICAgIFBhZ2VzSnNvbi5wYWdlc1tyb3V0ZXBhdGhdICYmXHJcbiAgICAgIFBhZ2VzSnNvbi5wYWdlc1tyb3V0ZXBhdGhdLnRpdGxlTlZpZXcgJiZcclxuICAgICAgUGFnZXNKc29uLnBhZ2VzW3JvdXRlcGF0aF0udGl0bGVOVmlldy50aXRsZVRleHQgfHxcclxuICAgICAgUGFnZXNKc29uICYmXHJcbiAgICAgIFBhZ2VzSnNvbi5wYWdlc1tyb3V0ZXBhdGhdICYmXHJcbiAgICAgIFBhZ2VzSnNvbi5wYWdlc1tyb3V0ZXBhdGhdLm5hdmlnYXRpb25CYXJUaXRsZVRleHQgfHwgJyc7XHJcblxyXG4gICAgaWYgKHRoaXMuX19saWNhdGlvblNob3cpIHtcclxuICAgICAgZ2V0Rmlyc3RUaW1lKCk7XHJcbiAgICAgIHRoaXMuX19saWNhdGlvblNob3cgPSBmYWxzZTtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ+i/meaYryBvbkxhdWNoIOS5i+WQjuaJp+ihjOeahOesrOS4gOasoSBwYWdlU2hvdyDvvIzkuLrkuIvmrKHorrDlvZXml7bpl7TlgZrlh4blpIcnKTtcclxuICAgICAgdGhpcy5fbGFzdFBhZ2VSb3V0ZSA9IHJvdXRlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGFzdFRpbWUoKTtcclxuICAgIHRoaXMuX2xhc3RQYWdlUm91dGUgPSByb3V0ZTtcclxuICAgIGNvbnN0IHRpbWUgPSBnZXRSZXNpZGVuY2VUaW1lKCdwYWdlJyk7XHJcbiAgICBpZiAodGltZS5vdmVydGltZSkge1xyXG4gICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICBwYXRoOiB0aGlzLl9sYXN0UGFnZVJvdXRlLFxyXG4gICAgICAgIHNjZW5lOiB0aGlzLnN0YXREYXRhLnNjXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuX3NlbmRSZXBvcnRSZXF1ZXN0KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgZ2V0Rmlyc3RUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBfcGFnZUhpZGUoKSB7XHJcbiAgICBpZiAoIXRoaXMuX19saWNhdGlvbkhpZGUpIHtcclxuICAgICAgZ2V0TGFzdFRpbWUoKTtcclxuICAgICAgY29uc3QgdGltZSA9IGdldFJlc2lkZW5jZVRpbWUoJ3BhZ2UnKTtcclxuICAgICAgdGhpcy5fc2VuZFBhZ2VSZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IHRoaXMuX2xhc3RQYWdlUm91dGUsXHJcbiAgICAgICAgdXJscmVmOiB0aGlzLl9sYXN0UGFnZVJvdXRlLFxyXG4gICAgICAgIHVybHJlZl90czogdGltZS5yZXNpZGVuY2VUaW1lXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9uYXZpZ2F0aW9uQmFyVGl0bGUgPSB7XHJcbiAgICAgICAgY29uZmlnOiAnJyxcclxuICAgICAgICBwYWdlOiAnJyxcclxuICAgICAgICByZXBvcnQ6ICcnLFxyXG4gICAgICAgIGx0OiAnJ1xyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfbG9naW4oKSB7XHJcbiAgICB0aGlzLl9zZW5kRXZlbnRSZXF1ZXN0KHtcclxuICAgICAga2V5OiAnbG9naW4nXHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIF9zaGFyZSgpIHtcclxuICAgIHRoaXMuX3NlbmRFdmVudFJlcXVlc3Qoe1xyXG4gICAgICBrZXk6ICdzaGFyZSdcclxuICAgIH0sIDApO1xyXG4gIH1cclxuICBfcGF5bWVudChrZXkpIHtcclxuICAgIHRoaXMuX3NlbmRFdmVudFJlcXVlc3Qoe1xyXG4gICAgICBrZXlcclxuICAgIH0sIDApO1xyXG4gIH1cclxuICBfc2VuZFJlcG9ydFJlcXVlc3Qob3B0aW9ucykge1xyXG5cclxuICAgIHRoaXMuX25hdmlnYXRpb25CYXJUaXRsZS5sdCA9ICcxJztcclxuICAgIGxldCBxdWVyeSA9IG9wdGlvbnMucXVlcnkgJiYgSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5xdWVyeSkgIT09ICd7fScgPyAnPycgKyBKU09OLnN0cmluZ2lmeShvcHRpb25zLnF1ZXJ5KSA6ICcnO1xyXG4gICAgdGhpcy5zdGF0RGF0YS5sdCA9ICcxJztcclxuICAgIHRoaXMuc3RhdERhdGEudXJsID0gKG9wdGlvbnMucGF0aCArIHF1ZXJ5KSB8fCAnJztcclxuICAgIHRoaXMuc3RhdERhdGEudCA9IGdldFRpbWUoKTtcclxuICAgIHRoaXMuc3RhdERhdGEuc2MgPSBnZXRTY2VuZShvcHRpb25zLnNjZW5lKTtcclxuICAgIHRoaXMuc3RhdERhdGEuZnZ0cyA9IGdldEZpcnN0VmlzaXRUaW1lKCk7XHJcbiAgICB0aGlzLnN0YXREYXRhLmx2dHMgPSBnZXRMYXN0VmlzaXRUaW1lKCk7XHJcbiAgICB0aGlzLnN0YXREYXRhLnR2YyA9IGdldFRvdGFsVmlzaXRDb3VudCgpO1xyXG4gICAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnbicpIHtcclxuICAgICAgdGhpcy5nZXRQcm9wZXJ0eSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZXROZXR3b3JrSW5mbygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3NlbmRQYWdlUmVxdWVzdChvcHQpIHtcclxuICAgIGxldCB7XHJcbiAgICAgIHVybCxcclxuICAgICAgdXJscmVmLFxyXG4gICAgICB1cmxyZWZfdHNcclxuICAgIH0gPSBvcHQ7XHJcbiAgICB0aGlzLl9uYXZpZ2F0aW9uQmFyVGl0bGUubHQgPSAnMTEnO1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGFrOiB0aGlzLnN0YXREYXRhLmFrLFxyXG4gICAgICB1dWlkOiB0aGlzLnN0YXREYXRhLnV1aWQsXHJcbiAgICAgIGx0OiAnMTEnLFxyXG4gICAgICB1dDogdGhpcy5zdGF0RGF0YS51dCxcclxuICAgICAgdXJsLFxyXG4gICAgICB0dDogdGhpcy5zdGF0RGF0YS50dCxcclxuICAgICAgdXJscmVmLFxyXG4gICAgICB1cmxyZWZfdHMsXHJcbiAgICAgIGNoOiB0aGlzLnN0YXREYXRhLmNoLFxyXG4gICAgICB1c3Y6IHRoaXMuc3RhdERhdGEudXN2LFxyXG4gICAgICB0OiBnZXRUaW1lKCksXHJcbiAgICAgIHA6IHRoaXMuc3RhdERhdGEucFxyXG4gICAgfTtcclxuICAgIHRoaXMucmVxdWVzdChvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIF9zZW5kSGlkZVJlcXVlc3Qob3B0LCB0eXBlKSB7XHJcbiAgICBsZXQge1xyXG4gICAgICB1cmxyZWYsXHJcbiAgICAgIHVybHJlZl90c1xyXG4gICAgfSA9IG9wdDtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBhazogdGhpcy5zdGF0RGF0YS5hayxcclxuICAgICAgdXVpZDogdGhpcy5zdGF0RGF0YS51dWlkLFxyXG4gICAgICBsdDogJzMnLFxyXG4gICAgICB1dDogdGhpcy5zdGF0RGF0YS51dCxcclxuICAgICAgdXJscmVmLFxyXG4gICAgICB1cmxyZWZfdHMsXHJcbiAgICAgIGNoOiB0aGlzLnN0YXREYXRhLmNoLFxyXG4gICAgICB1c3Y6IHRoaXMuc3RhdERhdGEudXN2LFxyXG4gICAgICB0OiBnZXRUaW1lKCksXHJcbiAgICAgIHA6IHRoaXMuc3RhdERhdGEucFxyXG4gICAgfTtcclxuICAgIHRoaXMucmVxdWVzdChvcHRpb25zLCB0eXBlKTtcclxuICB9XHJcbiAgX3NlbmRFdmVudFJlcXVlc3Qoe1xyXG4gICAga2V5ID0gJycsXHJcbiAgICB2YWx1ZSA9IFwiXCJcclxuICB9ID0ge30pIHtcclxuICAgIGNvbnN0IHJvdXRlID0gdGhpcy5fbGFzdFBhZ2VSb3V0ZTtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICBhazogdGhpcy5zdGF0RGF0YS5hayxcclxuICAgICAgdXVpZDogdGhpcy5zdGF0RGF0YS51dWlkLFxyXG4gICAgICBsdDogJzIxJyxcclxuICAgICAgdXQ6IHRoaXMuc3RhdERhdGEudXQsXHJcbiAgICAgIHVybDogcm91dGUsXHJcbiAgICAgIGNoOiB0aGlzLnN0YXREYXRhLmNoLFxyXG4gICAgICBlX246IGtleSxcclxuICAgICAgZV92OiB0eXBlb2YodmFsdWUpID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IHZhbHVlLnRvU3RyaW5nKCksXHJcbiAgICAgIHVzdjogdGhpcy5zdGF0RGF0YS51c3YsXHJcbiAgICAgIHQ6IGdldFRpbWUoKSxcclxuICAgICAgcDogdGhpcy5zdGF0RGF0YS5wXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZXF1ZXN0KG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmV0d29ya0luZm8oKSB7XHJcbiAgICB1bmkuZ2V0TmV0d29ya1R5cGUoe1xyXG4gICAgICBzdWNjZXNzOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdGF0RGF0YS5uZXQgPSByZXN1bHQubmV0d29ya1R5cGU7XHJcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFByb3BlcnR5KCkge1xyXG4gICAgcGx1cy5ydW50aW1lLmdldFByb3BlcnR5KHBsdXMucnVudGltZS5hcHBpZCwgKHdndGluZm8pID0+IHtcclxuICAgICAgdGhpcy5zdGF0RGF0YS52ID0gd2d0aW5mby52ZXJzaW9uIHx8ICcnO1xyXG4gICAgICB0aGlzLmdldE5ldHdvcmtJbmZvKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExvY2F0aW9uKCkge1xyXG4gICAgaWYgKHN0YXRDb25maWcuZ2V0TG9jYXRpb24pIHtcclxuICAgICAgdW5pLmdldExvY2F0aW9uKHtcclxuICAgICAgICB0eXBlOiAnd2dzODQnLFxyXG4gICAgICAgIGdlb2NvZGU6IHRydWUsXHJcbiAgICAgICAgc3VjY2VzczogKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3VsdC5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdERhdGEuY24gPSByZXN1bHQuYWRkcmVzcy5jb3VudHJ5O1xyXG4gICAgICAgICAgICB0aGlzLnN0YXREYXRhLnBuID0gcmVzdWx0LmFkZHJlc3MucHJvdmluY2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdERhdGEuY3QgPSByZXN1bHQuYWRkcmVzcy5jaXR5O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuc3RhdERhdGEubGF0ID0gcmVzdWx0LmxhdGl0dWRlO1xyXG4gICAgICAgICAgdGhpcy5zdGF0RGF0YS5sbmcgPSByZXN1bHQubG9uZ2l0dWRlO1xyXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0KHRoaXMuc3RhdERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0YXREYXRhLmxhdCA9IDA7XHJcbiAgICAgIHRoaXMuc3RhdERhdGEubG5nID0gMDtcclxuICAgICAgdGhpcy5yZXF1ZXN0KHRoaXMuc3RhdERhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVxdWVzdChkYXRhLCB0eXBlKSB7XHJcbiAgICBsZXQgdGltZSA9IGdldFRpbWUoKTtcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5fbmF2aWdhdGlvbkJhclRpdGxlO1xyXG4gICAgZGF0YS50dG4gPSB0aXRsZS5wYWdlO1xyXG4gICAgZGF0YS50dHBqID0gdGl0bGUuY29uZmlnO1xyXG4gICAgZGF0YS50dGMgPSB0aXRsZS5yZXBvcnQ7XHJcblxyXG4gICAgbGV0IHJlcXVlc3REYXRhID0gdGhpcy5fcmVwb3J0aW5nUmVxdWVzdERhdGE7XHJcbiAgICBpZiAoZ2V0UGxhdGZvcm1OYW1lKCkgPT09ICduJykge1xyXG4gICAgICByZXF1ZXN0RGF0YSA9IHVuaS5nZXRTdG9yYWdlU3luYygnX19VTklfX1NUQVRfX0RBVEEnKSB8fCB7fTtcclxuICAgIH1cclxuICAgIGlmICghcmVxdWVzdERhdGFbZGF0YS5sdF0pIHtcclxuICAgICAgcmVxdWVzdERhdGFbZGF0YS5sdF0gPSBbXTtcclxuICAgIH1cclxuICAgIHJlcXVlc3REYXRhW2RhdGEubHRdLnB1c2goZGF0YSk7XHJcblxyXG4gICAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnbicpIHtcclxuICAgICAgdW5pLnNldFN0b3JhZ2VTeW5jKCdfX1VOSV9fU1RBVF9fREFUQScsIHJlcXVlc3REYXRhKTtcclxuICAgIH1cclxuICAgIGlmIChnZXRQYWdlUmVzaWRlbmNlVGltZSgpIDwgT1BFUkFUSU5HX1RJTUUgJiYgIXR5cGUpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBsZXQgdW5pU3RhdERhdGEgPSB0aGlzLl9yZXBvcnRpbmdSZXF1ZXN0RGF0YTtcclxuICAgIGlmIChnZXRQbGF0Zm9ybU5hbWUoKSA9PT0gJ24nKSB7XHJcbiAgICAgIHVuaVN0YXREYXRhID0gdW5pLmdldFN0b3JhZ2VTeW5jKCdfX1VOSV9fU1RBVF9fREFUQScpO1xyXG4gICAgfVxyXG4gICAgLy8g5pe26Ze06LaF6L+H77yM6YeN5paw6I635Y+W5pe26Ze05oizXHJcbiAgICBzZXRQYWdlUmVzaWRlbmNlVGltZSgpO1xyXG4gICAgbGV0IGZpcnN0QXJyID0gW107XHJcbiAgICBsZXQgY29udGVudEFyciA9IFtdO1xyXG4gICAgbGV0IGxhc3RBcnIgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpIGluIHVuaVN0YXREYXRhKSB7XHJcbiAgICAgIGNvbnN0IHJkID0gdW5pU3RhdERhdGFbaV07XHJcbiAgICAgIHJkLmZvckVhY2goKGVsbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSBnZXRTcGxpY2luZyhlbG0pO1xyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICBmaXJzdEFyci5wdXNoKG5ld0RhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMykge1xyXG4gICAgICAgICAgbGFzdEFyci5wdXNoKG5ld0RhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb250ZW50QXJyLnB1c2gobmV3RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaXJzdEFyci5wdXNoKC4uLmNvbnRlbnRBcnIsIC4uLmxhc3RBcnIpO1xyXG4gICAgbGV0IG9wdGlvbnNEYXRhID0ge1xyXG4gICAgICB1c3Y6IFNUQVRfVkVSU0lPTiwgLy/nu5/orqEgU0RLIOeJiOacrOWPt1xyXG4gICAgICB0OiB0aW1lLCAvL+WPkemAgeivt+axguaXtueahOaXtumXtOaIrlxyXG4gICAgICByZXF1ZXN0czogSlNPTi5zdHJpbmdpZnkoZmlyc3RBcnIpLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9yZXBvcnRpbmdSZXF1ZXN0RGF0YSA9IHt9O1xyXG4gICAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnbicpIHtcclxuICAgICAgdW5pLnJlbW92ZVN0b3JhZ2VTeW5jKCdfX1VOSV9fU1RBVF9fREFUQScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRhLnV0ID09PSAnaDUnKSB7XHJcbiAgICAgIHRoaXMuaW1hZ2VSZXF1ZXN0KG9wdGlvbnNEYXRhKTtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdldFBsYXRmb3JtTmFtZSgpID09PSAnbicgJiYgdGhpcy5zdGF0RGF0YS5wID09PSAnYScpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fc2VuZFJlcXVlc3Qob3B0aW9uc0RhdGEpO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMuX3NlbmRSZXF1ZXN0KG9wdGlvbnNEYXRhKTtcclxuICB9XHJcbiAgX3NlbmRSZXF1ZXN0KG9wdGlvbnNEYXRhKSB7XHJcbiAgICB1bmkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogU1RBVF9VUkwsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAvLyBoZWFkZXI6IHtcclxuICAgICAgLy8gICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIC8vIOm7mOiupOWAvFxyXG4gICAgICAvLyB9LFxyXG4gICAgICBkYXRhOiBvcHRpb25zRGF0YSxcclxuICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgIC8vIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ3N0YXQgcmVxdWVzdCBzdWNjZXNzJyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9LFxyXG4gICAgICBmYWlsOiAoZSkgPT4ge1xyXG4gICAgICAgIGlmICgrK3RoaXMuX3JldHJ5IDwgMykge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbmRSZXF1ZXN0KG9wdGlvbnNEYXRhKTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIGg1IOivt+axglxyXG4gICAqL1xyXG4gIGltYWdlUmVxdWVzdChkYXRhKSB7XHJcbiAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGxldCBvcHRpb25zID0gZ2V0U2dpbihHZXRFbmNvZGVVUklDb21wb25lbnRPcHRpb25zKGRhdGEpKS5vcHRpb25zO1xyXG4gICAgaW1hZ2Uuc3JjID0gU1RBVF9INV9VUkwgKyAnPycgKyBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgc2VuZEV2ZW50KGtleSwgdmFsdWUpIHtcclxuICAgIC8vIOagoemqjCB0eXBlIOWPguaVsFxyXG4gICAgaWYgKGNhbGlicmF0aW9uKGtleSwgdmFsdWUpKSByZXR1cm5cclxuXHJcbiAgICBpZiAoa2V5ID09PSAndGl0bGUnKSB7XHJcbiAgICAgIHRoaXMuX25hdmlnYXRpb25CYXJUaXRsZS5yZXBvcnQgPSB2YWx1ZTtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZW5kRXZlbnRSZXF1ZXN0KHtcclxuICAgICAga2V5LFxyXG4gICAgICB2YWx1ZTogdHlwZW9mKHZhbHVlKSA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiB2YWx1ZVxyXG4gICAgfSwgMSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgU3RhdCBleHRlbmRzIFV0aWwge1xyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFN0YXQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgIC8vIOazqOWGjOaLpuaIquWZqFxyXG4gICAgaWYgKHR5cGVvZiB1bmkuYWRkSW50ZXJjZXB0b3IgPT09ICdmdW5jdGlvbicgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgdGhpcy5hZGRJbnRlcmNlcHRvckluaXQoKTtcclxuICAgICAgdGhpcy5pbnRlcmNlcHRMb2dpbigpO1xyXG4gICAgICB0aGlzLmludGVyY2VwdFNoYXJlKHRydWUpO1xyXG4gICAgICB0aGlzLmludGVyY2VwdFJlcXVlc3RQYXltZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRJbnRlcmNlcHRvckluaXQoKSB7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICB1bmkuYWRkSW50ZXJjZXB0b3IoJ3NldE5hdmlnYXRpb25CYXJUaXRsZScsIHtcclxuICAgICAgaW52b2tlKGFyZ3MpIHtcclxuICAgICAgICBzZWxmLl9uYXZpZ2F0aW9uQmFyVGl0bGUucGFnZSA9IGFyZ3MudGl0bGU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJjZXB0TG9naW4oKSB7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICB1bmkuYWRkSW50ZXJjZXB0b3IoJ2xvZ2luJywge1xyXG4gICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICBzZWxmLl9sb2dpbigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGludGVyY2VwdFNoYXJlKHR5cGUpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGlmICghdHlwZSkge1xyXG4gICAgICBzZWxmLl9zaGFyZSgpO1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHVuaS5hZGRJbnRlcmNlcHRvcignc2hhcmUnLCB7XHJcbiAgICAgIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgc2VsZi5fc2hhcmUoKTtcclxuICAgICAgfSxcclxuICAgICAgZmFpbCgpIHtcclxuICAgICAgICBzZWxmLl9zaGFyZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGludGVyY2VwdFJlcXVlc3RQYXltZW50KCkge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgdW5pLmFkZEludGVyY2VwdG9yKCdyZXF1ZXN0UGF5bWVudCcsIHtcclxuICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICBzZWxmLl9wYXltZW50KCdwYXlfc3VjY2VzcycpO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsKCkge1xyXG4gICAgICAgIHNlbGYuX3BheW1lbnQoJ3BheV9mYWlsJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVwb3J0KG9wdGlvbnMsIHNlbGYpIHtcclxuICAgIHRoaXMuc2VsZiA9IHNlbGY7XHJcbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIC8vICAgY29uc29sZS5sb2coJ3JlcG9ydCBpbml0Jyk7XHJcbiAgICAvLyB9XHJcbiAgICBzZXRQYWdlUmVzaWRlbmNlVGltZSgpO1xyXG4gICAgdGhpcy5fX2xpY2F0aW9uU2hvdyA9IHRydWU7XHJcbiAgICB0aGlzLl9zZW5kUmVwb3J0UmVxdWVzdChvcHRpb25zLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGxvYWQob3B0aW9ucywgc2VsZikge1xyXG4gICAgaWYgKCFzZWxmLiRzY29wZSAmJiAhc2VsZi4kbXApIHtcclxuICAgICAgY29uc3QgcGFnZSA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICBzZWxmLiRzY29wZSA9IHBhZ2VbcGFnZS5sZW5ndGggLSAxXTtcclxuICAgIH1cclxuICAgIHRoaXMuc2VsZiA9IHNlbGY7XHJcbiAgICB0aGlzLl9xdWVyeSA9IG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBzaG93KHNlbGYpIHtcclxuICAgIHRoaXMuc2VsZiA9IHNlbGY7XHJcbiAgICBpZiAoZ2V0UGFnZVR5cGVzKHNlbGYpKSB7XHJcbiAgICAgIHRoaXMuX3BhZ2VTaG93KHNlbGYpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fYXBwbGljYXRpb25TaG93KHNlbGYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVhZHkoc2VsZikge1xyXG4gICAgLy8gdGhpcy5zZWxmID0gc2VsZjtcclxuICAgIC8vIGlmIChnZXRQYWdlVHlwZXMoc2VsZikpIHtcclxuICAgIC8vICAgdGhpcy5fcGFnZVNob3coc2VsZik7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG4gIGhpZGUoc2VsZikge1xyXG4gICAgdGhpcy5zZWxmID0gc2VsZjtcclxuICAgIGlmIChnZXRQYWdlVHlwZXMoc2VsZikpIHtcclxuICAgICAgdGhpcy5fcGFnZUhpZGUoc2VsZik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9hcHBsaWNhdGlvbkhpZGUoc2VsZiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGVycm9yKGVtKSB7XHJcbiAgICBpZiAodGhpcy5fcGxhdGZvcm0gPT09ICdkZXZ0b29scycpIHtcclxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCflvZPliY3ov5DooYznjq/looPkuLrlvIDlj5HogIXlt6XlhbfvvIzkuI3kuIrmiqXmlbDmja7jgIInKTtcclxuICAgICAgfVxyXG4gICAgICAvLyByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZW1WYWwgPSAnJztcclxuICAgIGlmICghZW0ubWVzc2FnZSkge1xyXG4gICAgICBlbVZhbCA9IEpTT04uc3RyaW5naWZ5KGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVtVmFsID0gZW0uc3RhY2s7XHJcbiAgICB9XHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgYWs6IHRoaXMuc3RhdERhdGEuYWssXHJcbiAgICAgIHV1aWQ6IHRoaXMuc3RhdERhdGEudXVpZCxcclxuICAgICAgbHQ6ICczMScsXHJcbiAgICAgIHV0OiB0aGlzLnN0YXREYXRhLnV0LFxyXG4gICAgICBjaDogdGhpcy5zdGF0RGF0YS5jaCxcclxuICAgICAgbXBzZGs6IHRoaXMuc3RhdERhdGEubXBzZGssXHJcbiAgICAgIG1wdjogdGhpcy5zdGF0RGF0YS5tcHYsXHJcbiAgICAgIHY6IHRoaXMuc3RhdERhdGEudixcclxuICAgICAgZW06IGVtVmFsLFxyXG4gICAgICB1c3Y6IHRoaXMuc3RhdERhdGEudXN2LFxyXG4gICAgICB0OiBnZXRUaW1lKCksXHJcbiAgICAgIHA6IHRoaXMuc3RhdERhdGEucFxyXG4gICAgfTtcclxuICAgIHRoaXMucmVxdWVzdChvcHRpb25zKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHN0YXQgPSBTdGF0LmdldEluc3RhbmNlKCk7XHJcbmxldCBpc0hpZGUgPSBmYWxzZTtcclxuY29uc3QgbGlmZWN5Y2xlID0ge1xyXG4gIG9uTGF1bmNoKG9wdGlvbnMpIHtcclxuICAgIHN0YXQucmVwb3J0KG9wdGlvbnMsIHRoaXMpO1xyXG4gIH0sXHJcbiAgb25SZWFkeSgpIHtcclxuICAgIHN0YXQucmVhZHkodGhpcyk7XHJcbiAgfSxcclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgc3RhdC5sb2FkKG9wdGlvbnMsIHRoaXMpO1xyXG4gICAgLy8g6YeN5YaZ5YiG5Lqr77yM6I635Y+W5YiG5Lqr5LiK5oql5LqL5Lu2XHJcbiAgICBpZiAodGhpcy4kc2NvcGUgJiYgdGhpcy4kc2NvcGUub25TaGFyZUFwcE1lc3NhZ2UpIHtcclxuICAgICAgbGV0IG9sZFNoYXJlQXBwTWVzc2FnZSA9IHRoaXMuJHNjb3BlLm9uU2hhcmVBcHBNZXNzYWdlO1xyXG4gICAgICB0aGlzLiRzY29wZS5vblNoYXJlQXBwTWVzc2FnZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICBzdGF0LmludGVyY2VwdFNoYXJlKGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gb2xkU2hhcmVBcHBNZXNzYWdlLmNhbGwodGhpcywgb3B0aW9ucylcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uU2hvdygpIHtcclxuICAgIGlzSGlkZSA9IGZhbHNlO1xyXG4gICAgc3RhdC5zaG93KHRoaXMpO1xyXG4gIH0sXHJcbiAgb25IaWRlKCkge1xyXG4gICAgaXNIaWRlID0gdHJ1ZTtcclxuICAgIHN0YXQuaGlkZSh0aGlzKTtcclxuICB9LFxyXG4gIG9uVW5sb2FkKCkge1xyXG4gICAgaWYgKGlzSGlkZSkge1xyXG4gICAgICBpc0hpZGUgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBzdGF0LmhpZGUodGhpcyk7XHJcbiAgfSxcclxuICBvbkVycm9yKGUpIHtcclxuICAgIHN0YXQuZXJyb3IoZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIHVuaS5yZXBvcnQgPSBmdW5jdGlvbih0eXBlLCBvcHRpb25zKSB7fTtcclxuICB9ZWxzZXtcclxuICAgIGNvbnN0IFZ1ZSA9IHJlcXVpcmUoJ3Z1ZScpO1xyXG4gICAgKFZ1ZS5kZWZhdWx0IHx8IFZ1ZSkubWl4aW4obGlmZWN5Y2xlKTtcclxuICAgIHVuaS5yZXBvcnQgPSBmdW5jdGlvbih0eXBlLCBvcHRpb25zKSB7XHJcbiAgICAgIHN0YXQuc2VuZEV2ZW50KHR5cGUsIG9wdGlvbnMpO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbm1haW4oKTtcclxuIiwiZXhwb3J0IGRlZmF1bHQge1wiYXBwaWRcIjpcIlwifSIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyBJTVBPUlRBTlQ6IERvIE5PVCB1c2UgRVMyMDE1IGZlYXR1cmVzIGluIHRoaXMgZmlsZSAoZXhjZXB0IGZvciBtb2R1bGVzKS5cbi8vIFRoaXMgbW9kdWxlIGlzIGEgcnVudGltZSB1dGlsaXR5IGZvciBjbGVhbmVyIGNvbXBvbmVudCBtb2R1bGUgb3V0cHV0IGFuZCB3aWxsXG4vLyBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgd2VicGFjayB1c2VyIGJ1bmRsZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgc2NyaXB0RXhwb3J0cyxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyLCAvKiBzZXJ2ZXIgb25seSAqL1xuICBzaGFkb3dNb2RlLCAvKiB2dWUtY2xpIG9ubHkgKi9cbiAgY29tcG9uZW50cywgLy8gZml4ZWQgYnkgeHh4eHh4IGF1dG8gY29tcG9uZW50c1xuICByZW5kZXJqcyAvLyBmaXhlZCBieSB4eHh4eHggcmVuZGVyanNcbikge1xuICAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdEV4cG9ydHMgPT09ICdmdW5jdGlvbidcbiAgICA/IHNjcmlwdEV4cG9ydHMub3B0aW9uc1xuICAgIDogc2NyaXB0RXhwb3J0c1xuXG4gIC8vIGZpeGVkIGJ5IHh4eHh4eCBhdXRvIGNvbXBvbmVudHNcbiAgaWYgKGNvbXBvbmVudHMpIHtcbiAgICBpZiAoIW9wdGlvbnMuY29tcG9uZW50cykge1xuICAgICAgb3B0aW9ucy5jb21wb25lbnRzID0ge31cbiAgICB9XG4gICAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgICBmb3IgKHZhciBuYW1lIGluIGNvbXBvbmVudHMpIHtcbiAgICAgIGlmIChoYXNPd24uY2FsbChjb21wb25lbnRzLCBuYW1lKSAmJiAhaGFzT3duLmNhbGwob3B0aW9ucy5jb21wb25lbnRzLCBuYW1lKSkge1xuICAgICAgICBvcHRpb25zLmNvbXBvbmVudHNbbmFtZV0gPSBjb21wb25lbnRzW25hbWVdXG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGZpeGVkIGJ5IHh4eHh4eCByZW5kZXJqc1xuICBpZiAocmVuZGVyanMpIHtcbiAgICAocmVuZGVyanMuYmVmb3JlQ3JlYXRlIHx8IChyZW5kZXJqcy5iZWZvcmVDcmVhdGUgPSBbXSkpLnVuc2hpZnQoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzW3JlbmRlcmpzLl9fbW9kdWxlXSA9IHRoaXNcbiAgICB9KTtcbiAgICAob3B0aW9ucy5taXhpbnMgfHwgKG9wdGlvbnMubWl4aW5zID0gW10pKS5wdXNoKHJlbmRlcmpzKVxuICB9XG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAocmVuZGVyKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSByZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IHN0YXRpY1JlbmRlckZuc1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZVxuICB9XG5cbiAgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuICBpZiAoZnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5mdW5jdGlvbmFsID0gdHJ1ZVxuICB9XG5cbiAgLy8gc2NvcGVkSWRcbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gJ2RhdGEtdi0nICsgc2NvcGVJZFxuICB9XG5cbiAgdmFyIGhvb2tcbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHsgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID1cbiAgICAgICAgY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgICAodGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCkgfHwgLy8gc3RhdGVmdWxcbiAgICAgICAgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCkgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fXG4gICAgICB9XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCBjb250ZXh0KVxuICAgICAgfVxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcnJlbmNlXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcilcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9va1xuICB9IGVsc2UgaWYgKGluamVjdFN0eWxlcykge1xuICAgIGhvb2sgPSBzaGFkb3dNb2RlXG4gICAgICA/IGZ1bmN0aW9uICgpIHsgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgdGhpcy4kcm9vdC4kb3B0aW9ucy5zaGFkb3dSb290KSB9XG4gICAgICA6IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICBpZiAob3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAvLyBmb3IgdGVtcGxhdGUtb25seSBob3QtcmVsb2FkIGJlY2F1c2UgaW4gdGhhdCBjYXNlIHRoZSByZW5kZXIgZm4gZG9lc24ndFxuICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgbm9ybWFsaXplclxuICAgICAgb3B0aW9ucy5faW5qZWN0U3R5bGVzID0gaG9va1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIHZhciBvcmlnaW5hbFJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUmVuZGVyKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZ1xuICAgICAgICA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaylcbiAgICAgICAgOiBbaG9va11cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XHJcbmltcG9ydCBWdWV4IGZyb20gJ3Z1ZXgnO1xyXG5WdWUudXNlKFZ1ZXgpO1xyXG5pbXBvcnQgbXV0YXRpb25zIGZyb20gJy4vbXV0YXRpb25zJ1xyXG4vLyBpbXBvcnQge1xyXG4vLyBcdFNFVF9DSVRZLFxyXG4vLyBcdFNFVF9DSVRZX0xPQ0FUSU9OLFxyXG4vLyBcdFNFVF9DSVRZX0lELFxyXG4vLyBcdFNFVF9DSVRZX0xJU1RcclxuLy8gfSBmcm9tICcuL211dGF0aW9uLXR5cGVzJ1xyXG5cclxuXHJcbmNvbnN0IHN0YXRlID0ge1xyXG5cdGNpdHk6J+WMl+S6rCcsIC8v5omL5Yqo6YCJ5oup5Z+O5biCXHJcblx0Y2l0eWxvY2F0aW9uOifljJfkuqwnLCAvL+WumuS9jeWfjuW4glxyXG5cdGNpdHlpZDonMScsXHJcblx0Y2l0eWxpc3Q6JycsXHJcbn1cclxuXHJcbi8vIGNvbnN0IG11dGF0aW9ucyA9IHtcclxuLy8gXHRbU0VUX0NJVFldKHN0YXRlLGNpdHkpe1xyXG4vLyBcdFx0c3RhdGUuY2l0eSA9IGNpdHlcclxuLy8gXHR9LFxyXG4vLyBcdFtTRVRfQ0lUWV9MT0NBVElPTl0oc3RhdGUsY2l0eSl7XHJcbi8vIFx0XHRzdGF0ZS5jaXR5bG9jYXRpb24gPSBjaXR5XHJcbi8vIFx0fSxcclxuLy8gXHRbU0VUX0NJVFlfSURdKHN0YXRlLGlkKXtcclxuLy8gXHRcdHN0YXRlLmNpdHlpZCA9IGlkXHJcbi8vIFx0fSxcclxuLy8gXHRbU0VUX0NJVFlfTElTVF0oc3RhdGUsY2l0eWxpc3Qpe1xyXG4vLyBcdFx0c3RhdGUuY2l0eWxpc3QgPSBjaXR5bGlzdFxyXG4vLyBcdH1cclxuLy8gfVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWV4LlN0b3JlKHtcclxuXHRzdGF0ZSxcclxuXHRtdXRhdGlvbnNcclxufSkiLCIvKipcbiAqIHZ1ZXggdjMuMC4xXG4gKiAoYykgMjAxNyBFdmFuIFlvdVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbnZhciBhcHBseU1peGluID0gZnVuY3Rpb24gKFZ1ZSkge1xuICB2YXIgdmVyc2lvbiA9IE51bWJlcihWdWUudmVyc2lvbi5zcGxpdCgnLicpWzBdKTtcblxuICBpZiAodmVyc2lvbiA+PSAyKSB7XG4gICAgVnVlLm1peGluKHsgYmVmb3JlQ3JlYXRlOiB2dWV4SW5pdCB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBvdmVycmlkZSBpbml0IGFuZCBpbmplY3QgdnVleCBpbml0IHByb2NlZHVyZVxuICAgIC8vIGZvciAxLnggYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgdmFyIF9pbml0ID0gVnVlLnByb3RvdHlwZS5faW5pdDtcbiAgICBWdWUucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBvcHRpb25zLmluaXQgPSBvcHRpb25zLmluaXRcbiAgICAgICAgPyBbdnVleEluaXRdLmNvbmNhdChvcHRpb25zLmluaXQpXG4gICAgICAgIDogdnVleEluaXQ7XG4gICAgICBfaW5pdC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVnVleCBpbml0IGhvb2ssIGluamVjdGVkIGludG8gZWFjaCBpbnN0YW5jZXMgaW5pdCBob29rcyBsaXN0LlxuICAgKi9cblxuICBmdW5jdGlvbiB2dWV4SW5pdCAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zO1xuICAgIC8vIHN0b3JlIGluamVjdGlvblxuICAgIGlmIChvcHRpb25zLnN0b3JlKSB7XG4gICAgICB0aGlzLiRzdG9yZSA9IHR5cGVvZiBvcHRpb25zLnN0b3JlID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gb3B0aW9ucy5zdG9yZSgpXG4gICAgICAgIDogb3B0aW9ucy5zdG9yZTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyZW50ICYmIG9wdGlvbnMucGFyZW50LiRzdG9yZSkge1xuICAgICAgdGhpcy4kc3RvcmUgPSBvcHRpb25zLnBhcmVudC4kc3RvcmU7XG4gICAgfVxuICB9XG59O1xuXG52YXIgZGV2dG9vbEhvb2sgPVxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfXztcblxuZnVuY3Rpb24gZGV2dG9vbFBsdWdpbiAoc3RvcmUpIHtcbiAgaWYgKCFkZXZ0b29sSG9vaykgeyByZXR1cm4gfVxuXG4gIHN0b3JlLl9kZXZ0b29sSG9vayA9IGRldnRvb2xIb29rO1xuXG4gIGRldnRvb2xIb29rLmVtaXQoJ3Z1ZXg6aW5pdCcsIHN0b3JlKTtcblxuICBkZXZ0b29sSG9vay5vbigndnVleDp0cmF2ZWwtdG8tc3RhdGUnLCBmdW5jdGlvbiAodGFyZ2V0U3RhdGUpIHtcbiAgICBzdG9yZS5yZXBsYWNlU3RhdGUodGFyZ2V0U3RhdGUpO1xuICB9KTtcblxuICBzdG9yZS5zdWJzY3JpYmUoZnVuY3Rpb24gKG11dGF0aW9uLCBzdGF0ZSkge1xuICAgIGRldnRvb2xIb29rLmVtaXQoJ3Z1ZXg6bXV0YXRpb24nLCBtdXRhdGlvbiwgc3RhdGUpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGZpcnN0IGl0ZW0gdGhhdCBwYXNzIHRoZSB0ZXN0XG4gKiBieSBzZWNvbmQgYXJndW1lbnQgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gKiBAcmV0dXJuIHsqfVxuICovXG4vKipcbiAqIERlZXAgY29weSB0aGUgZ2l2ZW4gb2JqZWN0IGNvbnNpZGVyaW5nIGNpcmN1bGFyIHN0cnVjdHVyZS5cbiAqIFRoaXMgZnVuY3Rpb24gY2FjaGVzIGFsbCBuZXN0ZWQgb2JqZWN0cyBhbmQgaXRzIGNvcGllcy5cbiAqIElmIGl0IGRldGVjdHMgY2lyY3VsYXIgc3RydWN0dXJlLCB1c2UgY2FjaGVkIGNvcHkgdG8gYXZvaWQgaW5maW5pdGUgbG9vcC5cbiAqXG4gKiBAcGFyYW0geyp9IG9ialxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBjYWNoZVxuICogQHJldHVybiB7Kn1cbiAqL1xuXG5cbi8qKlxuICogZm9yRWFjaCBmb3Igb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hWYWx1ZSAob2JqLCBmbikge1xuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZm4ob2JqW2tleV0sIGtleSk7IH0pO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNQcm9taXNlICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAmJiB0eXBlb2YgdmFsLnRoZW4gPT09ICdmdW5jdGlvbidcbn1cblxuZnVuY3Rpb24gYXNzZXJ0IChjb25kaXRpb24sIG1zZykge1xuICBpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IoKFwiW3Z1ZXhdIFwiICsgbXNnKSkgfVxufVxuXG52YXIgTW9kdWxlID0gZnVuY3Rpb24gTW9kdWxlIChyYXdNb2R1bGUsIHJ1bnRpbWUpIHtcbiAgdGhpcy5ydW50aW1lID0gcnVudGltZTtcbiAgdGhpcy5fY2hpbGRyZW4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9yYXdNb2R1bGUgPSByYXdNb2R1bGU7XG4gIHZhciByYXdTdGF0ZSA9IHJhd01vZHVsZS5zdGF0ZTtcbiAgdGhpcy5zdGF0ZSA9ICh0eXBlb2YgcmF3U3RhdGUgPT09ICdmdW5jdGlvbicgPyByYXdTdGF0ZSgpIDogcmF3U3RhdGUpIHx8IHt9O1xufTtcblxudmFyIHByb3RvdHlwZUFjY2Vzc29ycyQxID0geyBuYW1lc3BhY2VkOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XG5cbnByb3RvdHlwZUFjY2Vzc29ycyQxLm5hbWVzcGFjZWQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gISF0aGlzLl9yYXdNb2R1bGUubmFtZXNwYWNlZFxufTtcblxuTW9kdWxlLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uIGFkZENoaWxkIChrZXksIG1vZHVsZSkge1xuICB0aGlzLl9jaGlsZHJlbltrZXldID0gbW9kdWxlO1xufTtcblxuTW9kdWxlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIHJlbW92ZUNoaWxkIChrZXkpIHtcbiAgZGVsZXRlIHRoaXMuX2NoaWxkcmVuW2tleV07XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmdldENoaWxkID0gZnVuY3Rpb24gZ2V0Q2hpbGQgKGtleSkge1xuICByZXR1cm4gdGhpcy5fY2hpbGRyZW5ba2V5XVxufTtcblxuTW9kdWxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKHJhd01vZHVsZSkge1xuICB0aGlzLl9yYXdNb2R1bGUubmFtZXNwYWNlZCA9IHJhd01vZHVsZS5uYW1lc3BhY2VkO1xuICBpZiAocmF3TW9kdWxlLmFjdGlvbnMpIHtcbiAgICB0aGlzLl9yYXdNb2R1bGUuYWN0aW9ucyA9IHJhd01vZHVsZS5hY3Rpb25zO1xuICB9XG4gIGlmIChyYXdNb2R1bGUubXV0YXRpb25zKSB7XG4gICAgdGhpcy5fcmF3TW9kdWxlLm11dGF0aW9ucyA9IHJhd01vZHVsZS5tdXRhdGlvbnM7XG4gIH1cbiAgaWYgKHJhd01vZHVsZS5nZXR0ZXJzKSB7XG4gICAgdGhpcy5fcmF3TW9kdWxlLmdldHRlcnMgPSByYXdNb2R1bGUuZ2V0dGVycztcbiAgfVxufTtcblxuTW9kdWxlLnByb3RvdHlwZS5mb3JFYWNoQ2hpbGQgPSBmdW5jdGlvbiBmb3JFYWNoQ2hpbGQgKGZuKSB7XG4gIGZvckVhY2hWYWx1ZSh0aGlzLl9jaGlsZHJlbiwgZm4pO1xufTtcblxuTW9kdWxlLnByb3RvdHlwZS5mb3JFYWNoR2V0dGVyID0gZnVuY3Rpb24gZm9yRWFjaEdldHRlciAoZm4pIHtcbiAgaWYgKHRoaXMuX3Jhd01vZHVsZS5nZXR0ZXJzKSB7XG4gICAgZm9yRWFjaFZhbHVlKHRoaXMuX3Jhd01vZHVsZS5nZXR0ZXJzLCBmbik7XG4gIH1cbn07XG5cbk1vZHVsZS5wcm90b3R5cGUuZm9yRWFjaEFjdGlvbiA9IGZ1bmN0aW9uIGZvckVhY2hBY3Rpb24gKGZuKSB7XG4gIGlmICh0aGlzLl9yYXdNb2R1bGUuYWN0aW9ucykge1xuICAgIGZvckVhY2hWYWx1ZSh0aGlzLl9yYXdNb2R1bGUuYWN0aW9ucywgZm4pO1xuICB9XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmZvckVhY2hNdXRhdGlvbiA9IGZ1bmN0aW9uIGZvckVhY2hNdXRhdGlvbiAoZm4pIHtcbiAgaWYgKHRoaXMuX3Jhd01vZHVsZS5tdXRhdGlvbnMpIHtcbiAgICBmb3JFYWNoVmFsdWUodGhpcy5fcmF3TW9kdWxlLm11dGF0aW9ucywgZm4pO1xuICB9XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyggTW9kdWxlLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzJDEgKTtcblxudmFyIE1vZHVsZUNvbGxlY3Rpb24gPSBmdW5jdGlvbiBNb2R1bGVDb2xsZWN0aW9uIChyYXdSb290TW9kdWxlKSB7XG4gIC8vIHJlZ2lzdGVyIHJvb3QgbW9kdWxlIChWdWV4LlN0b3JlIG9wdGlvbnMpXG4gIHRoaXMucmVnaXN0ZXIoW10sIHJhd1Jvb3RNb2R1bGUsIGZhbHNlKTtcbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAocGF0aCkge1xuICByZXR1cm4gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKG1vZHVsZSwga2V5KSB7XG4gICAgcmV0dXJuIG1vZHVsZS5nZXRDaGlsZChrZXkpXG4gIH0sIHRoaXMucm9vdClcbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldE5hbWVzcGFjZSA9IGZ1bmN0aW9uIGdldE5hbWVzcGFjZSAocGF0aCkge1xuICB2YXIgbW9kdWxlID0gdGhpcy5yb290O1xuICByZXR1cm4gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwga2V5KSB7XG4gICAgbW9kdWxlID0gbW9kdWxlLmdldENoaWxkKGtleSk7XG4gICAgcmV0dXJuIG5hbWVzcGFjZSArIChtb2R1bGUubmFtZXNwYWNlZCA/IGtleSArICcvJyA6ICcnKVxuICB9LCAnJylcbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSQxIChyYXdSb290TW9kdWxlKSB7XG4gIHVwZGF0ZShbXSwgdGhpcy5yb290LCByYXdSb290TW9kdWxlKTtcbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIgKHBhdGgsIHJhd01vZHVsZSwgcnVudGltZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgIGlmICggcnVudGltZSA9PT0gdm9pZCAwICkgcnVudGltZSA9IHRydWU7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRSYXdNb2R1bGUocGF0aCwgcmF3TW9kdWxlKTtcbiAgfVxuXG4gIHZhciBuZXdNb2R1bGUgPSBuZXcgTW9kdWxlKHJhd01vZHVsZSwgcnVudGltZSk7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMucm9vdCA9IG5ld01vZHVsZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5nZXQocGF0aC5zbGljZSgwLCAtMSkpO1xuICAgIHBhcmVudC5hZGRDaGlsZChwYXRoW3BhdGgubGVuZ3RoIC0gMV0sIG5ld01vZHVsZSk7XG4gIH1cblxuICAvLyByZWdpc3RlciBuZXN0ZWQgbW9kdWxlc1xuICBpZiAocmF3TW9kdWxlLm1vZHVsZXMpIHtcbiAgICBmb3JFYWNoVmFsdWUocmF3TW9kdWxlLm1vZHVsZXMsIGZ1bmN0aW9uIChyYXdDaGlsZE1vZHVsZSwga2V5KSB7XG4gICAgICB0aGlzJDEucmVnaXN0ZXIocGF0aC5jb25jYXQoa2V5KSwgcmF3Q2hpbGRNb2R1bGUsIHJ1bnRpbWUpO1xuICAgIH0pO1xuICB9XG59O1xuXG5Nb2R1bGVDb2xsZWN0aW9uLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24gdW5yZWdpc3RlciAocGF0aCkge1xuICB2YXIgcGFyZW50ID0gdGhpcy5nZXQocGF0aC5zbGljZSgwLCAtMSkpO1xuICB2YXIga2V5ID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuICBpZiAoIXBhcmVudC5nZXRDaGlsZChrZXkpLnJ1bnRpbWUpIHsgcmV0dXJuIH1cblxuICBwYXJlbnQucmVtb3ZlQ2hpbGQoa2V5KTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZSAocGF0aCwgdGFyZ2V0TW9kdWxlLCBuZXdNb2R1bGUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRSYXdNb2R1bGUocGF0aCwgbmV3TW9kdWxlKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0YXJnZXQgbW9kdWxlXG4gIHRhcmdldE1vZHVsZS51cGRhdGUobmV3TW9kdWxlKTtcblxuICAvLyB1cGRhdGUgbmVzdGVkIG1vZHVsZXNcbiAgaWYgKG5ld01vZHVsZS5tb2R1bGVzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG5ld01vZHVsZS5tb2R1bGVzKSB7XG4gICAgICBpZiAoIXRhcmdldE1vZHVsZS5nZXRDaGlsZChrZXkpKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgXCJbdnVleF0gdHJ5aW5nIHRvIGFkZCBhIG5ldyBtb2R1bGUgJ1wiICsga2V5ICsgXCInIG9uIGhvdCByZWxvYWRpbmcsIFwiICtcbiAgICAgICAgICAgICdtYW51YWwgcmVsb2FkIGlzIG5lZWRlZCdcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKFxuICAgICAgICBwYXRoLmNvbmNhdChrZXkpLFxuICAgICAgICB0YXJnZXRNb2R1bGUuZ2V0Q2hpbGQoa2V5KSxcbiAgICAgICAgbmV3TW9kdWxlLm1vZHVsZXNba2V5XVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGZ1bmN0aW9uQXNzZXJ0ID0ge1xuICBhc3NlcnQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nOyB9LFxuICBleHBlY3RlZDogJ2Z1bmN0aW9uJ1xufTtcblxudmFyIG9iamVjdEFzc2VydCA9IHtcbiAgYXNzZXJ0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZS5oYW5kbGVyID09PSAnZnVuY3Rpb24nKTsgfSxcbiAgZXhwZWN0ZWQ6ICdmdW5jdGlvbiBvciBvYmplY3Qgd2l0aCBcImhhbmRsZXJcIiBmdW5jdGlvbidcbn07XG5cbnZhciBhc3NlcnRUeXBlcyA9IHtcbiAgZ2V0dGVyczogZnVuY3Rpb25Bc3NlcnQsXG4gIG11dGF0aW9uczogZnVuY3Rpb25Bc3NlcnQsXG4gIGFjdGlvbnM6IG9iamVjdEFzc2VydFxufTtcblxuZnVuY3Rpb24gYXNzZXJ0UmF3TW9kdWxlIChwYXRoLCByYXdNb2R1bGUpIHtcbiAgT2JqZWN0LmtleXMoYXNzZXJ0VHlwZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghcmF3TW9kdWxlW2tleV0pIHsgcmV0dXJuIH1cblxuICAgIHZhciBhc3NlcnRPcHRpb25zID0gYXNzZXJ0VHlwZXNba2V5XTtcblxuICAgIGZvckVhY2hWYWx1ZShyYXdNb2R1bGVba2V5XSwgZnVuY3Rpb24gKHZhbHVlLCB0eXBlKSB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgIGFzc2VydE9wdGlvbnMuYXNzZXJ0KHZhbHVlKSxcbiAgICAgICAgbWFrZUFzc2VydGlvbk1lc3NhZ2UocGF0aCwga2V5LCB0eXBlLCB2YWx1ZSwgYXNzZXJ0T3B0aW9ucy5leHBlY3RlZClcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYWtlQXNzZXJ0aW9uTWVzc2FnZSAocGF0aCwga2V5LCB0eXBlLCB2YWx1ZSwgZXhwZWN0ZWQpIHtcbiAgdmFyIGJ1ZiA9IGtleSArIFwiIHNob3VsZCBiZSBcIiArIGV4cGVjdGVkICsgXCIgYnV0IFxcXCJcIiArIGtleSArIFwiLlwiICsgdHlwZSArIFwiXFxcIlwiO1xuICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgYnVmICs9IFwiIGluIG1vZHVsZSBcXFwiXCIgKyAocGF0aC5qb2luKCcuJykpICsgXCJcXFwiXCI7XG4gIH1cbiAgYnVmICs9IFwiIGlzIFwiICsgKEpTT04uc3RyaW5naWZ5KHZhbHVlKSkgKyBcIi5cIjtcbiAgcmV0dXJuIGJ1ZlxufVxuXG52YXIgVnVlOyAvLyBiaW5kIG9uIGluc3RhbGxcblxudmFyIFN0b3JlID0gZnVuY3Rpb24gU3RvcmUgKG9wdGlvbnMpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gIC8vIEF1dG8gaW5zdGFsbCBpZiBpdCBpcyBub3QgZG9uZSB5ZXQgYW5kIGB3aW5kb3dgIGhhcyBgVnVlYC5cbiAgLy8gVG8gYWxsb3cgdXNlcnMgdG8gYXZvaWQgYXV0by1pbnN0YWxsYXRpb24gaW4gc29tZSBjYXNlcyxcbiAgLy8gdGhpcyBjb2RlIHNob3VsZCBiZSBwbGFjZWQgaGVyZS4gU2VlICM3MzFcbiAgaWYgKCFWdWUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlZ1ZSkge1xuICAgIGluc3RhbGwod2luZG93LlZ1ZSk7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydChWdWUsIFwibXVzdCBjYWxsIFZ1ZS51c2UoVnVleCkgYmVmb3JlIGNyZWF0aW5nIGEgc3RvcmUgaW5zdGFuY2UuXCIpO1xuICAgIGFzc2VydCh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcsIFwidnVleCByZXF1aXJlcyBhIFByb21pc2UgcG9seWZpbGwgaW4gdGhpcyBicm93c2VyLlwiKTtcbiAgICBhc3NlcnQodGhpcyBpbnN0YW5jZW9mIFN0b3JlLCBcIlN0b3JlIG11c3QgYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBvcGVyYXRvci5cIik7XG4gIH1cblxuICB2YXIgcGx1Z2lucyA9IG9wdGlvbnMucGx1Z2luczsgaWYgKCBwbHVnaW5zID09PSB2b2lkIDAgKSBwbHVnaW5zID0gW107XG4gIHZhciBzdHJpY3QgPSBvcHRpb25zLnN0cmljdDsgaWYgKCBzdHJpY3QgPT09IHZvaWQgMCApIHN0cmljdCA9IGZhbHNlO1xuXG4gIHZhciBzdGF0ZSA9IG9wdGlvbnMuc3RhdGU7IGlmICggc3RhdGUgPT09IHZvaWQgMCApIHN0YXRlID0ge307XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzdGF0ZSA9IHN0YXRlKCkgfHwge307XG4gIH1cblxuICAvLyBzdG9yZSBpbnRlcm5hbCBzdGF0ZVxuICB0aGlzLl9jb21taXR0aW5nID0gZmFsc2U7XG4gIHRoaXMuX2FjdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9hY3Rpb25TdWJzY3JpYmVycyA9IFtdO1xuICB0aGlzLl9tdXRhdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl93cmFwcGVkR2V0dGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHRoaXMuX21vZHVsZXMgPSBuZXcgTW9kdWxlQ29sbGVjdGlvbihvcHRpb25zKTtcbiAgdGhpcy5fbW9kdWxlc05hbWVzcGFjZU1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHRoaXMuX3N1YnNjcmliZXJzID0gW107XG4gIHRoaXMuX3dhdGNoZXJWTSA9IG5ldyBWdWUoKTtcblxuICAvLyBiaW5kIGNvbW1pdCBhbmQgZGlzcGF0Y2ggdG8gc2VsZlxuICB2YXIgc3RvcmUgPSB0aGlzO1xuICB2YXIgcmVmID0gdGhpcztcbiAgdmFyIGRpc3BhdGNoID0gcmVmLmRpc3BhdGNoO1xuICB2YXIgY29tbWl0ID0gcmVmLmNvbW1pdDtcbiAgdGhpcy5kaXNwYXRjaCA9IGZ1bmN0aW9uIGJvdW5kRGlzcGF0Y2ggKHR5cGUsIHBheWxvYWQpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2guY2FsbChzdG9yZSwgdHlwZSwgcGF5bG9hZClcbiAgfTtcbiAgdGhpcy5jb21taXQgPSBmdW5jdGlvbiBib3VuZENvbW1pdCAodHlwZSwgcGF5bG9hZCwgb3B0aW9ucykge1xuICAgIHJldHVybiBjb21taXQuY2FsbChzdG9yZSwgdHlwZSwgcGF5bG9hZCwgb3B0aW9ucylcbiAgfTtcblxuICAvLyBzdHJpY3QgbW9kZVxuICB0aGlzLnN0cmljdCA9IHN0cmljdDtcblxuICAvLyBpbml0IHJvb3QgbW9kdWxlLlxuICAvLyB0aGlzIGFsc28gcmVjdXJzaXZlbHkgcmVnaXN0ZXJzIGFsbCBzdWItbW9kdWxlc1xuICAvLyBhbmQgY29sbGVjdHMgYWxsIG1vZHVsZSBnZXR0ZXJzIGluc2lkZSB0aGlzLl93cmFwcGVkR2V0dGVyc1xuICBpbnN0YWxsTW9kdWxlKHRoaXMsIHN0YXRlLCBbXSwgdGhpcy5fbW9kdWxlcy5yb290KTtcblxuICAvLyBpbml0aWFsaXplIHRoZSBzdG9yZSB2bSwgd2hpY2ggaXMgcmVzcG9uc2libGUgZm9yIHRoZSByZWFjdGl2aXR5XG4gIC8vIChhbHNvIHJlZ2lzdGVycyBfd3JhcHBlZEdldHRlcnMgYXMgY29tcHV0ZWQgcHJvcGVydGllcylcbiAgcmVzZXRTdG9yZVZNKHRoaXMsIHN0YXRlKTtcblxuICAvLyBhcHBseSBwbHVnaW5zXG4gIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7IHJldHVybiBwbHVnaW4odGhpcyQxKTsgfSk7XG5cbiAgaWYgKFZ1ZS5jb25maWcuZGV2dG9vbHMpIHtcbiAgICBkZXZ0b29sUGx1Z2luKHRoaXMpO1xuICB9XG59O1xuXG52YXIgcHJvdG90eXBlQWNjZXNzb3JzID0geyBzdGF0ZTogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG5wcm90b3R5cGVBY2Nlc3NvcnMuc3RhdGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fdm0uX2RhdGEuJCRzdGF0ZVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzLnN0YXRlLnNldCA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0KGZhbHNlLCBcIlVzZSBzdG9yZS5yZXBsYWNlU3RhdGUoKSB0byBleHBsaWNpdCByZXBsYWNlIHN0b3JlIHN0YXRlLlwiKTtcbiAgfVxufTtcblxuU3RvcmUucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdCAoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucykge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIC8vIGNoZWNrIG9iamVjdC1zdHlsZSBjb21taXRcbiAgdmFyIHJlZiA9IHVuaWZ5T2JqZWN0U3R5bGUoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucyk7XG4gICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICB2YXIgcGF5bG9hZCA9IHJlZi5wYXlsb2FkO1xuICAgIHZhciBvcHRpb25zID0gcmVmLm9wdGlvbnM7XG5cbiAgdmFyIG11dGF0aW9uID0geyB0eXBlOiB0eXBlLCBwYXlsb2FkOiBwYXlsb2FkIH07XG4gIHZhciBlbnRyeSA9IHRoaXMuX211dGF0aW9uc1t0eXBlXTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSB1bmtub3duIG11dGF0aW9uIHR5cGU6IFwiICsgdHlwZSkpO1xuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLl93aXRoQ29tbWl0KGZ1bmN0aW9uICgpIHtcbiAgICBlbnRyeS5mb3JFYWNoKGZ1bmN0aW9uIGNvbW1pdEl0ZXJhdG9yIChoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyKHBheWxvYWQpO1xuICAgIH0pO1xuICB9KTtcbiAgdGhpcy5fc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7IHJldHVybiBzdWIobXV0YXRpb24sIHRoaXMkMS5zdGF0ZSk7IH0pO1xuXG4gIGlmIChcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgb3B0aW9ucyAmJiBvcHRpb25zLnNpbGVudFxuICApIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBcIlt2dWV4XSBtdXRhdGlvbiB0eXBlOiBcIiArIHR5cGUgKyBcIi4gU2lsZW50IG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkLiBcIiArXG4gICAgICAnVXNlIHRoZSBmaWx0ZXIgZnVuY3Rpb25hbGl0eSBpbiB0aGUgdnVlLWRldnRvb2xzJ1xuICAgICk7XG4gIH1cbn07XG5cblN0b3JlLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoIChfdHlwZSwgX3BheWxvYWQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAvLyBjaGVjayBvYmplY3Qtc3R5bGUgZGlzcGF0Y2hcbiAgdmFyIHJlZiA9IHVuaWZ5T2JqZWN0U3R5bGUoX3R5cGUsIF9wYXlsb2FkKTtcbiAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuICAgIHZhciBwYXlsb2FkID0gcmVmLnBheWxvYWQ7XG5cbiAgdmFyIGFjdGlvbiA9IHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCB9O1xuICB2YXIgZW50cnkgPSB0aGlzLl9hY3Rpb25zW3R5cGVdO1xuICBpZiAoIWVudHJ5KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gYWN0aW9uIHR5cGU6IFwiICsgdHlwZSkpO1xuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMuX2FjdGlvblN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHN1YikgeyByZXR1cm4gc3ViKGFjdGlvbiwgdGhpcyQxLnN0YXRlKTsgfSk7XG5cbiAgcmV0dXJuIGVudHJ5Lmxlbmd0aCA+IDFcbiAgICA/IFByb21pc2UuYWxsKGVudHJ5Lm1hcChmdW5jdGlvbiAoaGFuZGxlcikgeyByZXR1cm4gaGFuZGxlcihwYXlsb2FkKTsgfSkpXG4gICAgOiBlbnRyeVswXShwYXlsb2FkKVxufTtcblxuU3RvcmUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZSAoZm4pIHtcbiAgcmV0dXJuIGdlbmVyaWNTdWJzY3JpYmUoZm4sIHRoaXMuX3N1YnNjcmliZXJzKVxufTtcblxuU3RvcmUucHJvdG90eXBlLnN1YnNjcmliZUFjdGlvbiA9IGZ1bmN0aW9uIHN1YnNjcmliZUFjdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGdlbmVyaWNTdWJzY3JpYmUoZm4sIHRoaXMuX2FjdGlvblN1YnNjcmliZXJzKVxufTtcblxuU3RvcmUucHJvdG90eXBlLndhdGNoID0gZnVuY3Rpb24gd2F0Y2ggKGdldHRlciwgY2IsIG9wdGlvbnMpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydCh0eXBlb2YgZ2V0dGVyID09PSAnZnVuY3Rpb24nLCBcInN0b3JlLndhdGNoIG9ubHkgYWNjZXB0cyBhIGZ1bmN0aW9uLlwiKTtcbiAgfVxuICByZXR1cm4gdGhpcy5fd2F0Y2hlclZNLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBnZXR0ZXIodGhpcyQxLnN0YXRlLCB0aGlzJDEuZ2V0dGVycyk7IH0sIGNiLCBvcHRpb25zKVxufTtcblxuU3RvcmUucHJvdG90eXBlLnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZSAoc3RhdGUpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB0aGlzLl93aXRoQ29tbWl0KGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzJDEuX3ZtLl9kYXRhLiQkc3RhdGUgPSBzdGF0ZTtcbiAgfSk7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUucmVnaXN0ZXJNb2R1bGUgPSBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZSAocGF0aCwgcmF3TW9kdWxlLCBvcHRpb25zKSB7XG4gICAgaWYgKCBvcHRpb25zID09PSB2b2lkIDAgKSBvcHRpb25zID0ge307XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgeyBwYXRoID0gW3BhdGhdOyB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnQoQXJyYXkuaXNBcnJheShwYXRoKSwgXCJtb2R1bGUgcGF0aCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIEFycmF5LlwiKTtcbiAgICBhc3NlcnQocGF0aC5sZW5ndGggPiAwLCAnY2Fubm90IHJlZ2lzdGVyIHRoZSByb290IG1vZHVsZSBieSB1c2luZyByZWdpc3Rlck1vZHVsZS4nKTtcbiAgfVxuXG4gIHRoaXMuX21vZHVsZXMucmVnaXN0ZXIocGF0aCwgcmF3TW9kdWxlKTtcbiAgaW5zdGFsbE1vZHVsZSh0aGlzLCB0aGlzLnN0YXRlLCBwYXRoLCB0aGlzLl9tb2R1bGVzLmdldChwYXRoKSwgb3B0aW9ucy5wcmVzZXJ2ZVN0YXRlKTtcbiAgLy8gcmVzZXQgc3RvcmUgdG8gdXBkYXRlIGdldHRlcnMuLi5cbiAgcmVzZXRTdG9yZVZNKHRoaXMsIHRoaXMuc3RhdGUpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLnVucmVnaXN0ZXJNb2R1bGUgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyTW9kdWxlIChwYXRoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgeyBwYXRoID0gW3BhdGhdOyB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnQoQXJyYXkuaXNBcnJheShwYXRoKSwgXCJtb2R1bGUgcGF0aCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIEFycmF5LlwiKTtcbiAgfVxuXG4gIHRoaXMuX21vZHVsZXMudW5yZWdpc3RlcihwYXRoKTtcbiAgdGhpcy5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudFN0YXRlID0gZ2V0TmVzdGVkU3RhdGUodGhpcyQxLnN0YXRlLCBwYXRoLnNsaWNlKDAsIC0xKSk7XG4gICAgVnVlLmRlbGV0ZShwYXJlbnRTdGF0ZSwgcGF0aFtwYXRoLmxlbmd0aCAtIDFdKTtcbiAgfSk7XG4gIHJlc2V0U3RvcmUodGhpcyk7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuaG90VXBkYXRlID0gZnVuY3Rpb24gaG90VXBkYXRlIChuZXdPcHRpb25zKSB7XG4gIHRoaXMuX21vZHVsZXMudXBkYXRlKG5ld09wdGlvbnMpO1xuICByZXNldFN0b3JlKHRoaXMsIHRydWUpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLl93aXRoQ29tbWl0ID0gZnVuY3Rpb24gX3dpdGhDb21taXQgKGZuKSB7XG4gIHZhciBjb21taXR0aW5nID0gdGhpcy5fY29tbWl0dGluZztcbiAgdGhpcy5fY29tbWl0dGluZyA9IHRydWU7XG4gIGZuKCk7XG4gIHRoaXMuX2NvbW1pdHRpbmcgPSBjb21taXR0aW5nO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFN0b3JlLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbmZ1bmN0aW9uIGdlbmVyaWNTdWJzY3JpYmUgKGZuLCBzdWJzKSB7XG4gIGlmIChzdWJzLmluZGV4T2YoZm4pIDwgMCkge1xuICAgIHN1YnMucHVzaChmbik7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaSA9IHN1YnMuaW5kZXhPZihmbik7XG4gICAgaWYgKGkgPiAtMSkge1xuICAgICAgc3Vicy5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0U3RvcmUgKHN0b3JlLCBob3QpIHtcbiAgc3RvcmUuX2FjdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBzdG9yZS5fbXV0YXRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgc3RvcmUuX3dyYXBwZWRHZXR0ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgc3RvcmUuX21vZHVsZXNOYW1lc3BhY2VNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgc3RhdGUgPSBzdG9yZS5zdGF0ZTtcbiAgLy8gaW5pdCBhbGwgbW9kdWxlc1xuICBpbnN0YWxsTW9kdWxlKHN0b3JlLCBzdGF0ZSwgW10sIHN0b3JlLl9tb2R1bGVzLnJvb3QsIHRydWUpO1xuICAvLyByZXNldCB2bVxuICByZXNldFN0b3JlVk0oc3RvcmUsIHN0YXRlLCBob3QpO1xufVxuXG5mdW5jdGlvbiByZXNldFN0b3JlVk0gKHN0b3JlLCBzdGF0ZSwgaG90KSB7XG4gIHZhciBvbGRWbSA9IHN0b3JlLl92bTtcblxuICAvLyBiaW5kIHN0b3JlIHB1YmxpYyBnZXR0ZXJzXG4gIHN0b3JlLmdldHRlcnMgPSB7fTtcbiAgdmFyIHdyYXBwZWRHZXR0ZXJzID0gc3RvcmUuX3dyYXBwZWRHZXR0ZXJzO1xuICB2YXIgY29tcHV0ZWQgPSB7fTtcbiAgZm9yRWFjaFZhbHVlKHdyYXBwZWRHZXR0ZXJzLCBmdW5jdGlvbiAoZm4sIGtleSkge1xuICAgIC8vIHVzZSBjb21wdXRlZCB0byBsZXZlcmFnZSBpdHMgbGF6eS1jYWNoaW5nIG1lY2hhbmlzbVxuICAgIGNvbXB1dGVkW2tleV0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmbihzdG9yZSk7IH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0b3JlLmdldHRlcnMsIGtleSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5fdm1ba2V5XTsgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUgLy8gZm9yIGxvY2FsIGdldHRlcnNcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gdXNlIGEgVnVlIGluc3RhbmNlIHRvIHN0b3JlIHRoZSBzdGF0ZSB0cmVlXG4gIC8vIHN1cHByZXNzIHdhcm5pbmdzIGp1c3QgaW4gY2FzZSB0aGUgdXNlciBoYXMgYWRkZWRcbiAgLy8gc29tZSBmdW5reSBnbG9iYWwgbWl4aW5zXG4gIHZhciBzaWxlbnQgPSBWdWUuY29uZmlnLnNpbGVudDtcbiAgVnVlLmNvbmZpZy5zaWxlbnQgPSB0cnVlO1xuICBzdG9yZS5fdm0gPSBuZXcgVnVlKHtcbiAgICBkYXRhOiB7XG4gICAgICAkJHN0YXRlOiBzdGF0ZVxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IGNvbXB1dGVkXG4gIH0pO1xuICBWdWUuY29uZmlnLnNpbGVudCA9IHNpbGVudDtcblxuICAvLyBlbmFibGUgc3RyaWN0IG1vZGUgZm9yIG5ldyB2bVxuICBpZiAoc3RvcmUuc3RyaWN0KSB7XG4gICAgZW5hYmxlU3RyaWN0TW9kZShzdG9yZSk7XG4gIH1cblxuICBpZiAob2xkVm0pIHtcbiAgICBpZiAoaG90KSB7XG4gICAgICAvLyBkaXNwYXRjaCBjaGFuZ2VzIGluIGFsbCBzdWJzY3JpYmVkIHdhdGNoZXJzXG4gICAgICAvLyB0byBmb3JjZSBnZXR0ZXIgcmUtZXZhbHVhdGlvbiBmb3IgaG90IHJlbG9hZGluZy5cbiAgICAgIHN0b3JlLl93aXRoQ29tbWl0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb2xkVm0uX2RhdGEuJCRzdGF0ZSA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gICAgVnVlLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9sZFZtLiRkZXN0cm95KCk7IH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbGxNb2R1bGUgKHN0b3JlLCByb290U3RhdGUsIHBhdGgsIG1vZHVsZSwgaG90KSB7XG4gIHZhciBpc1Jvb3QgPSAhcGF0aC5sZW5ndGg7XG4gIHZhciBuYW1lc3BhY2UgPSBzdG9yZS5fbW9kdWxlcy5nZXROYW1lc3BhY2UocGF0aCk7XG5cbiAgLy8gcmVnaXN0ZXIgaW4gbmFtZXNwYWNlIG1hcFxuICBpZiAobW9kdWxlLm5hbWVzcGFjZWQpIHtcbiAgICBzdG9yZS5fbW9kdWxlc05hbWVzcGFjZU1hcFtuYW1lc3BhY2VdID0gbW9kdWxlO1xuICB9XG5cbiAgLy8gc2V0IHN0YXRlXG4gIGlmICghaXNSb290ICYmICFob3QpIHtcbiAgICB2YXIgcGFyZW50U3RhdGUgPSBnZXROZXN0ZWRTdGF0ZShyb290U3RhdGUsIHBhdGguc2xpY2UoMCwgLTEpKTtcbiAgICB2YXIgbW9kdWxlTmFtZSA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICBzdG9yZS5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgICBWdWUuc2V0KHBhcmVudFN0YXRlLCBtb2R1bGVOYW1lLCBtb2R1bGUuc3RhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIGxvY2FsID0gbW9kdWxlLmNvbnRleHQgPSBtYWtlTG9jYWxDb250ZXh0KHN0b3JlLCBuYW1lc3BhY2UsIHBhdGgpO1xuXG4gIG1vZHVsZS5mb3JFYWNoTXV0YXRpb24oZnVuY3Rpb24gKG11dGF0aW9uLCBrZXkpIHtcbiAgICB2YXIgbmFtZXNwYWNlZFR5cGUgPSBuYW1lc3BhY2UgKyBrZXk7XG4gICAgcmVnaXN0ZXJNdXRhdGlvbihzdG9yZSwgbmFtZXNwYWNlZFR5cGUsIG11dGF0aW9uLCBsb2NhbCk7XG4gIH0pO1xuXG4gIG1vZHVsZS5mb3JFYWNoQWN0aW9uKGZ1bmN0aW9uIChhY3Rpb24sIGtleSkge1xuICAgIHZhciB0eXBlID0gYWN0aW9uLnJvb3QgPyBrZXkgOiBuYW1lc3BhY2UgKyBrZXk7XG4gICAgdmFyIGhhbmRsZXIgPSBhY3Rpb24uaGFuZGxlciB8fCBhY3Rpb247XG4gICAgcmVnaXN0ZXJBY3Rpb24oc3RvcmUsIHR5cGUsIGhhbmRsZXIsIGxvY2FsKTtcbiAgfSk7XG5cbiAgbW9kdWxlLmZvckVhY2hHZXR0ZXIoZnVuY3Rpb24gKGdldHRlciwga2V5KSB7XG4gICAgdmFyIG5hbWVzcGFjZWRUeXBlID0gbmFtZXNwYWNlICsga2V5O1xuICAgIHJlZ2lzdGVyR2V0dGVyKHN0b3JlLCBuYW1lc3BhY2VkVHlwZSwgZ2V0dGVyLCBsb2NhbCk7XG4gIH0pO1xuXG4gIG1vZHVsZS5mb3JFYWNoQ2hpbGQoZnVuY3Rpb24gKGNoaWxkLCBrZXkpIHtcbiAgICBpbnN0YWxsTW9kdWxlKHN0b3JlLCByb290U3RhdGUsIHBhdGguY29uY2F0KGtleSksIGNoaWxkLCBob3QpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBtYWtlIGxvY2FsaXplZCBkaXNwYXRjaCwgY29tbWl0LCBnZXR0ZXJzIGFuZCBzdGF0ZVxuICogaWYgdGhlcmUgaXMgbm8gbmFtZXNwYWNlLCBqdXN0IHVzZSByb290IG9uZXNcbiAqL1xuZnVuY3Rpb24gbWFrZUxvY2FsQ29udGV4dCAoc3RvcmUsIG5hbWVzcGFjZSwgcGF0aCkge1xuICB2YXIgbm9OYW1lc3BhY2UgPSBuYW1lc3BhY2UgPT09ICcnO1xuXG4gIHZhciBsb2NhbCA9IHtcbiAgICBkaXNwYXRjaDogbm9OYW1lc3BhY2UgPyBzdG9yZS5kaXNwYXRjaCA6IGZ1bmN0aW9uIChfdHlwZSwgX3BheWxvYWQsIF9vcHRpb25zKSB7XG4gICAgICB2YXIgYXJncyA9IHVuaWZ5T2JqZWN0U3R5bGUoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucyk7XG4gICAgICB2YXIgcGF5bG9hZCA9IGFyZ3MucGF5bG9hZDtcbiAgICAgIHZhciBvcHRpb25zID0gYXJncy5vcHRpb25zO1xuICAgICAgdmFyIHR5cGUgPSBhcmdzLnR5cGU7XG5cbiAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5yb290KSB7XG4gICAgICAgIHR5cGUgPSBuYW1lc3BhY2UgKyB0eXBlO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhc3RvcmUuX2FjdGlvbnNbdHlwZV0pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSB1bmtub3duIGxvY2FsIGFjdGlvbiB0eXBlOiBcIiArIChhcmdzLnR5cGUpICsgXCIsIGdsb2JhbCB0eXBlOiBcIiArIHR5cGUpKTtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2godHlwZSwgcGF5bG9hZClcbiAgICB9LFxuXG4gICAgY29tbWl0OiBub05hbWVzcGFjZSA/IHN0b3JlLmNvbW1pdCA6IGZ1bmN0aW9uIChfdHlwZSwgX3BheWxvYWQsIF9vcHRpb25zKSB7XG4gICAgICB2YXIgYXJncyA9IHVuaWZ5T2JqZWN0U3R5bGUoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucyk7XG4gICAgICB2YXIgcGF5bG9hZCA9IGFyZ3MucGF5bG9hZDtcbiAgICAgIHZhciBvcHRpb25zID0gYXJncy5vcHRpb25zO1xuICAgICAgdmFyIHR5cGUgPSBhcmdzLnR5cGU7XG5cbiAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5yb290KSB7XG4gICAgICAgIHR5cGUgPSBuYW1lc3BhY2UgKyB0eXBlO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhc3RvcmUuX211dGF0aW9uc1t0eXBlXSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gbG9jYWwgbXV0YXRpb24gdHlwZTogXCIgKyAoYXJncy50eXBlKSArIFwiLCBnbG9iYWwgdHlwZTogXCIgKyB0eXBlKSk7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RvcmUuY29tbWl0KHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICAvLyBnZXR0ZXJzIGFuZCBzdGF0ZSBvYmplY3QgbXVzdCBiZSBnb3R0ZW4gbGF6aWx5XG4gIC8vIGJlY2F1c2UgdGhleSB3aWxsIGJlIGNoYW5nZWQgYnkgdm0gdXBkYXRlXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGxvY2FsLCB7XG4gICAgZ2V0dGVyczoge1xuICAgICAgZ2V0OiBub05hbWVzcGFjZVxuICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldHRlcnM7IH1cbiAgICAgICAgOiBmdW5jdGlvbiAoKSB7IHJldHVybiBtYWtlTG9jYWxHZXR0ZXJzKHN0b3JlLCBuYW1lc3BhY2UpOyB9XG4gICAgfSxcbiAgICBzdGF0ZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBnZXROZXN0ZWRTdGF0ZShzdG9yZS5zdGF0ZSwgcGF0aCk7IH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBsb2NhbFxufVxuXG5mdW5jdGlvbiBtYWtlTG9jYWxHZXR0ZXJzIChzdG9yZSwgbmFtZXNwYWNlKSB7XG4gIHZhciBnZXR0ZXJzUHJveHkgPSB7fTtcblxuICB2YXIgc3BsaXRQb3MgPSBuYW1lc3BhY2UubGVuZ3RoO1xuICBPYmplY3Qua2V5cyhzdG9yZS5nZXR0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgLy8gc2tpcCBpZiB0aGUgdGFyZ2V0IGdldHRlciBpcyBub3QgbWF0Y2ggdGhpcyBuYW1lc3BhY2VcbiAgICBpZiAodHlwZS5zbGljZSgwLCBzcGxpdFBvcykgIT09IG5hbWVzcGFjZSkgeyByZXR1cm4gfVxuXG4gICAgLy8gZXh0cmFjdCBsb2NhbCBnZXR0ZXIgdHlwZVxuICAgIHZhciBsb2NhbFR5cGUgPSB0eXBlLnNsaWNlKHNwbGl0UG9zKTtcblxuICAgIC8vIEFkZCBhIHBvcnQgdG8gdGhlIGdldHRlcnMgcHJveHkuXG4gICAgLy8gRGVmaW5lIGFzIGdldHRlciBwcm9wZXJ0eSBiZWNhdXNlXG4gICAgLy8gd2UgZG8gbm90IHdhbnQgdG8gZXZhbHVhdGUgdGhlIGdldHRlcnMgaW4gdGhpcyB0aW1lLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnZXR0ZXJzUHJveHksIGxvY2FsVHlwZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXR0ZXJzW3R5cGVdOyB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZ2V0dGVyc1Byb3h5XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTXV0YXRpb24gKHN0b3JlLCB0eXBlLCBoYW5kbGVyLCBsb2NhbCkge1xuICB2YXIgZW50cnkgPSBzdG9yZS5fbXV0YXRpb25zW3R5cGVdIHx8IChzdG9yZS5fbXV0YXRpb25zW3R5cGVdID0gW10pO1xuICBlbnRyeS5wdXNoKGZ1bmN0aW9uIHdyYXBwZWRNdXRhdGlvbkhhbmRsZXIgKHBheWxvYWQpIHtcbiAgICBoYW5kbGVyLmNhbGwoc3RvcmUsIGxvY2FsLnN0YXRlLCBwYXlsb2FkKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQWN0aW9uIChzdG9yZSwgdHlwZSwgaGFuZGxlciwgbG9jYWwpIHtcbiAgdmFyIGVudHJ5ID0gc3RvcmUuX2FjdGlvbnNbdHlwZV0gfHwgKHN0b3JlLl9hY3Rpb25zW3R5cGVdID0gW10pO1xuICBlbnRyeS5wdXNoKGZ1bmN0aW9uIHdyYXBwZWRBY3Rpb25IYW5kbGVyIChwYXlsb2FkLCBjYikge1xuICAgIHZhciByZXMgPSBoYW5kbGVyLmNhbGwoc3RvcmUsIHtcbiAgICAgIGRpc3BhdGNoOiBsb2NhbC5kaXNwYXRjaCxcbiAgICAgIGNvbW1pdDogbG9jYWwuY29tbWl0LFxuICAgICAgZ2V0dGVyczogbG9jYWwuZ2V0dGVycyxcbiAgICAgIHN0YXRlOiBsb2NhbC5zdGF0ZSxcbiAgICAgIHJvb3RHZXR0ZXJzOiBzdG9yZS5nZXR0ZXJzLFxuICAgICAgcm9vdFN0YXRlOiBzdG9yZS5zdGF0ZVxuICAgIH0sIHBheWxvYWQsIGNiKTtcbiAgICBpZiAoIWlzUHJvbWlzZShyZXMpKSB7XG4gICAgICByZXMgPSBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICB9XG4gICAgaWYgKHN0b3JlLl9kZXZ0b29sSG9vaykge1xuICAgICAgcmV0dXJuIHJlcy5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHN0b3JlLl9kZXZ0b29sSG9vay5lbWl0KCd2dWV4OmVycm9yJywgZXJyKTtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJHZXR0ZXIgKHN0b3JlLCB0eXBlLCByYXdHZXR0ZXIsIGxvY2FsKSB7XG4gIGlmIChzdG9yZS5fd3JhcHBlZEdldHRlcnNbdHlwZV0pIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcigoXCJbdnVleF0gZHVwbGljYXRlIGdldHRlciBrZXk6IFwiICsgdHlwZSkpO1xuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICBzdG9yZS5fd3JhcHBlZEdldHRlcnNbdHlwZV0gPSBmdW5jdGlvbiB3cmFwcGVkR2V0dGVyIChzdG9yZSkge1xuICAgIHJldHVybiByYXdHZXR0ZXIoXG4gICAgICBsb2NhbC5zdGF0ZSwgLy8gbG9jYWwgc3RhdGVcbiAgICAgIGxvY2FsLmdldHRlcnMsIC8vIGxvY2FsIGdldHRlcnNcbiAgICAgIHN0b3JlLnN0YXRlLCAvLyByb290IHN0YXRlXG4gICAgICBzdG9yZS5nZXR0ZXJzIC8vIHJvb3QgZ2V0dGVyc1xuICAgIClcbiAgfTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlU3RyaWN0TW9kZSAoc3RvcmUpIHtcbiAgc3RvcmUuX3ZtLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9kYXRhLiQkc3RhdGUgfSwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBhc3NlcnQoc3RvcmUuX2NvbW1pdHRpbmcsIFwiRG8gbm90IG11dGF0ZSB2dWV4IHN0b3JlIHN0YXRlIG91dHNpZGUgbXV0YXRpb24gaGFuZGxlcnMuXCIpO1xuICAgIH1cbiAgfSwgeyBkZWVwOiB0cnVlLCBzeW5jOiB0cnVlIH0pO1xufVxuXG5mdW5jdGlvbiBnZXROZXN0ZWRTdGF0ZSAoc3RhdGUsIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgubGVuZ3RoXG4gICAgPyBwYXRoLnJlZHVjZShmdW5jdGlvbiAoc3RhdGUsIGtleSkgeyByZXR1cm4gc3RhdGVba2V5XTsgfSwgc3RhdGUpXG4gICAgOiBzdGF0ZVxufVxuXG5mdW5jdGlvbiB1bmlmeU9iamVjdFN0eWxlICh0eXBlLCBwYXlsb2FkLCBvcHRpb25zKSB7XG4gIGlmIChpc09iamVjdCh0eXBlKSAmJiB0eXBlLnR5cGUpIHtcbiAgICBvcHRpb25zID0gcGF5bG9hZDtcbiAgICBwYXlsb2FkID0gdHlwZTtcbiAgICB0eXBlID0gdHlwZS50eXBlO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnQodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnLCAoXCJFeHBlY3RzIHN0cmluZyBhcyB0aGUgdHlwZSwgYnV0IGZvdW5kIFwiICsgKHR5cGVvZiB0eXBlKSArIFwiLlwiKSk7XG4gIH1cblxuICByZXR1cm4geyB0eXBlOiB0eXBlLCBwYXlsb2FkOiBwYXlsb2FkLCBvcHRpb25zOiBvcHRpb25zIH1cbn1cblxuZnVuY3Rpb24gaW5zdGFsbCAoX1Z1ZSkge1xuICBpZiAoVnVlICYmIF9WdWUgPT09IFZ1ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAnW3Z1ZXhdIGFscmVhZHkgaW5zdGFsbGVkLiBWdWUudXNlKFZ1ZXgpIHNob3VsZCBiZSBjYWxsZWQgb25seSBvbmNlLidcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVyblxuICB9XG4gIFZ1ZSA9IF9WdWU7XG4gIGFwcGx5TWl4aW4oVnVlKTtcbn1cblxudmFyIG1hcFN0YXRlID0gbm9ybWFsaXplTmFtZXNwYWNlKGZ1bmN0aW9uIChuYW1lc3BhY2UsIHN0YXRlcykge1xuICB2YXIgcmVzID0ge307XG4gIG5vcm1hbGl6ZU1hcChzdGF0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgIHZhciBrZXkgPSByZWYua2V5O1xuICAgIHZhciB2YWwgPSByZWYudmFsO1xuXG4gICAgcmVzW2tleV0gPSBmdW5jdGlvbiBtYXBwZWRTdGF0ZSAoKSB7XG4gICAgICB2YXIgc3RhdGUgPSB0aGlzLiRzdG9yZS5zdGF0ZTtcbiAgICAgIHZhciBnZXR0ZXJzID0gdGhpcy4kc3RvcmUuZ2V0dGVycztcbiAgICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgICAgdmFyIG1vZHVsZSA9IGdldE1vZHVsZUJ5TmFtZXNwYWNlKHRoaXMuJHN0b3JlLCAnbWFwU3RhdGUnLCBuYW1lc3BhY2UpO1xuICAgICAgICBpZiAoIW1vZHVsZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gbW9kdWxlLmNvbnRleHQuc3RhdGU7XG4gICAgICAgIGdldHRlcnMgPSBtb2R1bGUuY29udGV4dC5nZXR0ZXJzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB2YWwuY2FsbCh0aGlzLCBzdGF0ZSwgZ2V0dGVycylcbiAgICAgICAgOiBzdGF0ZVt2YWxdXG4gICAgfTtcbiAgICAvLyBtYXJrIHZ1ZXggZ2V0dGVyIGZvciBkZXZ0b29sc1xuICAgIHJlc1trZXldLnZ1ZXggPSB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc1xufSk7XG5cbnZhciBtYXBNdXRhdGlvbnMgPSBub3JtYWxpemVOYW1lc3BhY2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwgbXV0YXRpb25zKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgbm9ybWFsaXplTWFwKG11dGF0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgdmFyIGtleSA9IHJlZi5rZXk7XG4gICAgdmFyIHZhbCA9IHJlZi52YWw7XG5cbiAgICByZXNba2V5XSA9IGZ1bmN0aW9uIG1hcHBlZE11dGF0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICB2YXIgY29tbWl0ID0gdGhpcy4kc3RvcmUuY29tbWl0O1xuICAgICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgICB2YXIgbW9kdWxlID0gZ2V0TW9kdWxlQnlOYW1lc3BhY2UodGhpcy4kc3RvcmUsICdtYXBNdXRhdGlvbnMnLCBuYW1lc3BhY2UpO1xuICAgICAgICBpZiAoIW1vZHVsZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbW1pdCA9IG1vZHVsZS5jb250ZXh0LmNvbW1pdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gdmFsLmFwcGx5KHRoaXMsIFtjb21taXRdLmNvbmNhdChhcmdzKSlcbiAgICAgICAgOiBjb21taXQuYXBwbHkodGhpcy4kc3RvcmUsIFt2YWxdLmNvbmNhdChhcmdzKSlcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIHJlc1xufSk7XG5cbnZhciBtYXBHZXR0ZXJzID0gbm9ybWFsaXplTmFtZXNwYWNlKGZ1bmN0aW9uIChuYW1lc3BhY2UsIGdldHRlcnMpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICBub3JtYWxpemVNYXAoZ2V0dGVycykuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgdmFyIGtleSA9IHJlZi5rZXk7XG4gICAgdmFyIHZhbCA9IHJlZi52YWw7XG5cbiAgICB2YWwgPSBuYW1lc3BhY2UgKyB2YWw7XG4gICAgcmVzW2tleV0gPSBmdW5jdGlvbiBtYXBwZWRHZXR0ZXIgKCkge1xuICAgICAgaWYgKG5hbWVzcGFjZSAmJiAhZ2V0TW9kdWxlQnlOYW1lc3BhY2UodGhpcy4kc3RvcmUsICdtYXBHZXR0ZXJzJywgbmFtZXNwYWNlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICEodmFsIGluIHRoaXMuJHN0b3JlLmdldHRlcnMpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gZ2V0dGVyOiBcIiArIHZhbCkpO1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzW3ZhbF1cbiAgICB9O1xuICAgIC8vIG1hcmsgdnVleCBnZXR0ZXIgZm9yIGRldnRvb2xzXG4gICAgcmVzW2tleV0udnVleCA9IHRydWU7XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxudmFyIG1hcEFjdGlvbnMgPSBub3JtYWxpemVOYW1lc3BhY2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwgYWN0aW9ucykge1xuICB2YXIgcmVzID0ge307XG4gIG5vcm1hbGl6ZU1hcChhY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIga2V5ID0gcmVmLmtleTtcbiAgICB2YXIgdmFsID0gcmVmLnZhbDtcblxuICAgIHJlc1trZXldID0gZnVuY3Rpb24gbWFwcGVkQWN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICB2YXIgZGlzcGF0Y2ggPSB0aGlzLiRzdG9yZS5kaXNwYXRjaDtcbiAgICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgICAgdmFyIG1vZHVsZSA9IGdldE1vZHVsZUJ5TmFtZXNwYWNlKHRoaXMuJHN0b3JlLCAnbWFwQWN0aW9ucycsIG5hbWVzcGFjZSk7XG4gICAgICAgIGlmICghbW9kdWxlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2ggPSBtb2R1bGUuY29udGV4dC5kaXNwYXRjaDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gdmFsLmFwcGx5KHRoaXMsIFtkaXNwYXRjaF0uY29uY2F0KGFyZ3MpKVxuICAgICAgICA6IGRpc3BhdGNoLmFwcGx5KHRoaXMuJHN0b3JlLCBbdmFsXS5jb25jYXQoYXJncykpXG4gICAgfTtcbiAgfSk7XG4gIHJldHVybiByZXNcbn0pO1xuXG52YXIgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgPSBmdW5jdGlvbiAobmFtZXNwYWNlKSB7IHJldHVybiAoe1xuICBtYXBTdGF0ZTogbWFwU3RhdGUuYmluZChudWxsLCBuYW1lc3BhY2UpLFxuICBtYXBHZXR0ZXJzOiBtYXBHZXR0ZXJzLmJpbmQobnVsbCwgbmFtZXNwYWNlKSxcbiAgbWFwTXV0YXRpb25zOiBtYXBNdXRhdGlvbnMuYmluZChudWxsLCBuYW1lc3BhY2UpLFxuICBtYXBBY3Rpb25zOiBtYXBBY3Rpb25zLmJpbmQobnVsbCwgbmFtZXNwYWNlKVxufSk7IH07XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU1hcCAobWFwKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KG1hcClcbiAgICA/IG1hcC5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gKHsga2V5OiBrZXksIHZhbDoga2V5IH0pOyB9KVxuICAgIDogT2JqZWN0LmtleXMobWFwKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gKHsga2V5OiBrZXksIHZhbDogbWFwW2tleV0gfSk7IH0pXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWVzcGFjZSAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1hcCkge1xuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlICE9PSAnc3RyaW5nJykge1xuICAgICAgbWFwID0gbmFtZXNwYWNlO1xuICAgICAgbmFtZXNwYWNlID0gJyc7XG4gICAgfSBlbHNlIGlmIChuYW1lc3BhY2UuY2hhckF0KG5hbWVzcGFjZS5sZW5ndGggLSAxKSAhPT0gJy8nKSB7XG4gICAgICBuYW1lc3BhY2UgKz0gJy8nO1xuICAgIH1cbiAgICByZXR1cm4gZm4obmFtZXNwYWNlLCBtYXApXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TW9kdWxlQnlOYW1lc3BhY2UgKHN0b3JlLCBoZWxwZXIsIG5hbWVzcGFjZSkge1xuICB2YXIgbW9kdWxlID0gc3RvcmUuX21vZHVsZXNOYW1lc3BhY2VNYXBbbmFtZXNwYWNlXTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIW1vZHVsZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIG1vZHVsZSBuYW1lc3BhY2Ugbm90IGZvdW5kIGluIFwiICsgaGVscGVyICsgXCIoKTogXCIgKyBuYW1lc3BhY2UpKTtcbiAgfVxuICByZXR1cm4gbW9kdWxlXG59XG5cbnZhciBpbmRleF9lc20gPSB7XG4gIFN0b3JlOiBTdG9yZSxcbiAgaW5zdGFsbDogaW5zdGFsbCxcbiAgdmVyc2lvbjogJzMuMC4xJyxcbiAgbWFwU3RhdGU6IG1hcFN0YXRlLFxuICBtYXBNdXRhdGlvbnM6IG1hcE11dGF0aW9ucyxcbiAgbWFwR2V0dGVyczogbWFwR2V0dGVycyxcbiAgbWFwQWN0aW9uczogbWFwQWN0aW9ucyxcbiAgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnM6IGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzXG59O1xuXG5leHBvcnQgeyBTdG9yZSwgaW5zdGFsbCwgbWFwU3RhdGUsIG1hcE11dGF0aW9ucywgbWFwR2V0dGVycywgbWFwQWN0aW9ucywgY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGluZGV4X2VzbTtcbiIsImltcG9ydCB7XHJcblx0U0VUX0NJVFksXHJcblx0U0VUX0NJVFlfTE9DQVRJT04sXHJcblx0U0VUX0NJVFlfSUQsXHJcblx0U0VUX0NJVFlfTElTVFxyXG59IGZyb20gJy4vbXV0YXRpb24tdHlwZXMnXHJcblxyXG5jb25zdCBtdXRhdGlvbnMgPSB7XHJcblx0W1NFVF9DSVRZXShzdGF0ZSxjaXR5KXtcclxuXHRcdHN0YXRlLmNpdHkgPSBjaXR5XHJcblx0fSxcclxuXHRbU0VUX0NJVFlfTE9DQVRJT05dKHN0YXRlLGNpdHkpe1xyXG5cdFx0c3RhdGUuY2l0eWxvY2F0aW9uID0gY2l0eVxyXG5cdH0sXHJcblx0W1NFVF9DSVRZX0lEXShzdGF0ZSxpZCl7XHJcblx0XHRzdGF0ZS5jaXR5aWQgPSBpZFxyXG5cdH0sXHJcblx0W1NFVF9DSVRZX0xJU1RdKHN0YXRlLGNpdHlsaXN0KXtcclxuXHRcdHN0YXRlLmNpdHlsaXN0ID0gY2l0eWxpc3RcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG11dGF0aW9ucyIsImV4cG9ydCBjb25zdCBTRVRfQ0lUWSA9ICdTRVRfQ0lUWScgLy/kv53lrZjmiYvliqjpgInmi6nnmoTln47luIJcclxuZXhwb3J0IGNvbnN0IFNFVF9DSVRZX0xPQ0FUSU9OID0gJ1NFVF9DSVRZX0xPQ0FUSU9OJyAvL+S/neWtmOWumuS9jeiOt+WPlueahOWfjuW4glxyXG5leHBvcnQgY29uc3QgU0VUX0NJVFlfSUQgPSAnU0VUX0NJVFlfSUQnIC8v5L+d5a2Y5Z+O5biCaWRcclxuZXhwb3J0IGNvbnN0IFNFVF9DSVRZX0xJU1QgPSAnU0VUX0NJVFlfTElTVCcgLy/kv53lrZjmiYDmnInln47luILliJfooagiLCJjb25zdCBjb21tb25Db25maWcgPSB7XHJcblx0dXJsaG9zdDonaHR0cHM6Ly9hcHBhcGkuNWk1ai5jb20nLFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb25Db25maWciLCJcclxudmFyIHRvb2xGbiA9IHtcbiAgc2V0U3RhckFycjpmdW5jdGlvbihzY29yZSl7IC8v6aaW6aG15bCP5Yy65rWL6K+E6K+E5pifXG4gICAgdmFyIHN0ciA9IHNjb3JlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICB2YXIgYXJyID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0clswXTsgaSsrKSB7XG4gICAgICBhcnIucHVzaCgzKVxuICAgIH1cbiAgICBpZiAoc3RyWzFdID09IDEgfHwgc3RyWzFdID09IDIpIHtcbiAgICAgIGFyci5wdXNoKDEpXG4gICAgfSBlbHNlIGlmIChzdHJbMV0gPiAyICYmIHN0clsxXSA8IDgpIHtcbiAgICAgIGFyci5wdXNoKDIpXG4gICAgfSBlbHNlIGlmIChzdHJbMV0gPj0gOCkge1xuICAgICAgYXJyLnB1c2goMylcbiAgICB9XG4gICAgaWYgKGFyci5sZW5ndGggIT0gNSkge1xuICAgICAgdmFyIG51bSA9IDUgLSBhcnIubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBhcnIucHVzaCgxKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldFN0YXJBcnI6IHRvb2xGbi5zZXRTdGFyQXJyXG59IiwidmFyIEVSUk9SX0NPTkYgPSB7IEtFWV9FUlI6IDMxMSwgS0VZX0VSUl9NU0c6ICdrZXnmoLzlvI/plJnor68nLCBQQVJBTV9FUlI6IDMxMCwgUEFSQU1fRVJSX01TRzogJ+ivt+axguWPguaVsOS/oeaBr+acieivrycsIFNZU1RFTV9FUlI6IDYwMCwgU1lTVEVNX0VSUl9NU0c6ICfns7vnu5/plJnor68nLCBXWF9FUlJfQ09ERTogMTAwMCwgV1hfT0tfQ09ERTogMjAwIH07IHZhciBCQVNFX1VSTCA9ICdodHRwczovL2FwaXMubWFwLnFxLmNvbS93cy8nOyB2YXIgVVJMX1NFQVJDSCA9IEJBU0VfVVJMICsgJ3BsYWNlL3YxL3NlYXJjaCc7IHZhciBVUkxfU1VHR0VTVElPTiA9IEJBU0VfVVJMICsgJ3BsYWNlL3YxL3N1Z2dlc3Rpb24nOyB2YXIgVVJMX0dFVF9HRU9DT0RFUiA9IEJBU0VfVVJMICsgJ2dlb2NvZGVyL3YxLyc7IHZhciBVUkxfQ0lUWV9MSVNUID0gQkFTRV9VUkwgKyAnZGlzdHJpY3QvdjEvbGlzdCc7IHZhciBVUkxfQVJFQV9MSVNUID0gQkFTRV9VUkwgKyAnZGlzdHJpY3QvdjEvZ2V0Y2hpbGRyZW4nOyB2YXIgVVJMX0RJU1RBTkNFID0gQkFTRV9VUkwgKyAnZGlzdGFuY2UvdjEvJzsgdmFyIFVSTF9ESVJFQ1RJT04gPSBCQVNFX1VSTCArICdkaXJlY3Rpb24vdjEvJzsgdmFyIE1PREUgPSB7IGRyaXZpbmc6ICdkcml2aW5nJywgdHJhbnNpdDogJ3RyYW5zaXQnIH07IHZhciBFQVJUSF9SQURJVVMgPSA2Mzc4MTM2LjQ5OyB2YXIgVXRpbHMgPSB7IHNhZmVBZGQoeCwgeSkgeyB2YXIgbHN3ID0gKHggJiAweGZmZmYpICsgKHkgJiAweGZmZmYpOyB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7IHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweGZmZmYpIH0sIGJpdFJvdGF0ZUxlZnQobnVtLCBjbnQpIHsgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpIH0sIG1kNWNtbihxLCBhLCBiLCB4LCBzLCB0KSB7IHJldHVybiB0aGlzLnNhZmVBZGQodGhpcy5iaXRSb3RhdGVMZWZ0KHRoaXMuc2FmZUFkZCh0aGlzLnNhZmVBZGQoYSwgcSksIHRoaXMuc2FmZUFkZCh4LCB0KSksIHMpLCBiKSB9LCBtZDVmZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7IHJldHVybiB0aGlzLm1kNWNtbigoYiAmIGMpIHwgKH5iICYgZCksIGEsIGIsIHgsIHMsIHQpIH0sIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHsgcmV0dXJuIHRoaXMubWQ1Y21uKChiICYgZCkgfCAoYyAmIH5kKSwgYSwgYiwgeCwgcywgdCkgfSwgbWQ1aGgoYSwgYiwgYywgZCwgeCwgcywgdCkgeyByZXR1cm4gdGhpcy5tZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KSB9LCBtZDVpaShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7IHJldHVybiB0aGlzLm1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpIH0sIGJpbmxNRDUoeCwgbGVuKSB7IHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKGxlbiAlIDMyKTsgeFsoKGxlbiArIDY0KSA+Pj4gOSA8PCA0KSArIDE0XSA9IGxlbjsgdmFyIGk7IHZhciBvbGRhOyB2YXIgb2xkYjsgdmFyIG9sZGM7IHZhciBvbGRkOyB2YXIgYSA9IDE3MzI1ODQxOTM7IHZhciBiID0gLTI3MTczMzg3OTsgdmFyIGMgPSAtMTczMjU4NDE5NDsgdmFyIGQgPSAyNzE3MzM4Nzg7IGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikgeyBvbGRhID0gYTsgb2xkYiA9IGI7IG9sZGMgPSBjOyBvbGRkID0gZDsgYSA9IHRoaXMubWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7IGQgPSB0aGlzLm1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4Nik7IGMgPSB0aGlzLm1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTsgYiA9IHRoaXMubWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7IGEgPSB0aGlzLm1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KTsgZCA9IHRoaXMubWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTsgYyA9IHRoaXMubWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7IGIgPSB0aGlzLm1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKTsgYSA9IHRoaXMubWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpOyBkID0gdGhpcy5tZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTsgYyA9IHRoaXMubWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTsgYiA9IHRoaXMubWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpOyBhID0gdGhpcy5tZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpOyBkID0gdGhpcy5tZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpOyBjID0gdGhpcy5tZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7IGIgPSB0aGlzLm1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpOyBhID0gdGhpcy5tZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNSwgLTE2NTc5NjUxMCk7IGQgPSB0aGlzLm1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMik7IGMgPSB0aGlzLm1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMyk7IGIgPSB0aGlzLm1kNWdnKGIsIGMsIGQsIGEsIHhbaV0sIDIwLCAtMzczODk3MzAyKTsgYSA9IHRoaXMubWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpOyBkID0gdGhpcy5tZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTsgYyA9IHRoaXMubWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7IGIgPSB0aGlzLm1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OCk7IGEgPSB0aGlzLm1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpOyBkID0gdGhpcy5tZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sIDksIC0xMDE5ODAzNjkwKTsgYyA9IHRoaXMubWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKTsgYiA9IHRoaXMubWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKTsgYSA9IHRoaXMubWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCA1LCAtMTQ0NDY4MTQ2Nyk7IGQgPSB0aGlzLm1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpOyBjID0gdGhpcy5tZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpOyBiID0gdGhpcy5tZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7IGEgPSB0aGlzLm1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KTsgZCA9IHRoaXMubWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7IGMgPSB0aGlzLm1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpOyBiID0gdGhpcy5tZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpOyBhID0gdGhpcy5tZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApOyBkID0gdGhpcy5tZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpOyBjID0gdGhpcy5tZDVoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpOyBiID0gdGhpcy5tZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7IGEgPSB0aGlzLm1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KTsgZCA9IHRoaXMubWQ1aGgoZCwgYSwgYiwgYywgeFtpXSwgMTEsIC0zNTg1MzcyMjIpOyBjID0gdGhpcy5tZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpOyBiID0gdGhpcy5tZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KTsgYSA9IHRoaXMubWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpOyBkID0gdGhpcy5tZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTsgYyA9IHRoaXMubWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKTsgYiA9IHRoaXMubWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKTsgYSA9IHRoaXMubWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7IGQgPSB0aGlzLm1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSk7IGMgPSB0aGlzLm1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTsgYiA9IHRoaXMubWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpOyBhID0gdGhpcy5tZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpOyBkID0gdGhpcy5tZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTsgYyA9IHRoaXMubWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpOyBiID0gdGhpcy5tZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTsgYSA9IHRoaXMubWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpOyBkID0gdGhpcy5tZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpOyBjID0gdGhpcy5tZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTsgYiA9IHRoaXMubWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSk7IGEgPSB0aGlzLm1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTsgZCA9IHRoaXMubWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpOyBjID0gdGhpcy5tZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSk7IGIgPSB0aGlzLm1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7IGEgPSB0aGlzLnNhZmVBZGQoYSwgb2xkYSk7IGIgPSB0aGlzLnNhZmVBZGQoYiwgb2xkYik7IGMgPSB0aGlzLnNhZmVBZGQoYywgb2xkYyk7IGQgPSB0aGlzLnNhZmVBZGQoZCwgb2xkZCkgfSByZXR1cm4gW2EsIGIsIGMsIGRdIH0sIGJpbmwycnN0cihpbnB1dCkgeyB2YXIgaTsgdmFyIG91dHB1dCA9ICcnOyB2YXIgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjsgZm9yIChpID0gMDsgaSA8IGxlbmd0aDMyOyBpICs9IDgpIHsgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4ZmYpIH0gcmV0dXJuIG91dHB1dCB9LCByc3RyMmJpbmwoaW5wdXQpIHsgdmFyIGk7IHZhciBvdXRwdXQgPSBbXTsgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZDsgZm9yIChpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkgKz0gMSkgeyBvdXRwdXRbaV0gPSAwIH0gdmFyIGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4OyBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoODsgaSArPSA4KSB7IG91dHB1dFtpID4+IDVdIHw9IChpbnB1dC5jaGFyQ29kZUF0KGkgLyA4KSAmIDB4ZmYpIDw8IChpICUgMzIpIH0gcmV0dXJuIG91dHB1dCB9LCByc3RyTUQ1KHMpIHsgcmV0dXJuIHRoaXMuYmlubDJyc3RyKHRoaXMuYmlubE1ENSh0aGlzLnJzdHIyYmlubChzKSwgcy5sZW5ndGggKiA4KSkgfSwgcnN0ckhNQUNNRDUoa2V5LCBkYXRhKSB7IHZhciBpOyB2YXIgYmtleSA9IHRoaXMucnN0cjJiaW5sKGtleSk7IHZhciBpcGFkID0gW107IHZhciBvcGFkID0gW107IHZhciBoYXNoOyBpcGFkWzE1XSA9IG9wYWRbMTVdID0gdW5kZWZpbmVkOyBpZiAoYmtleS5sZW5ndGggPiAxNikgeyBia2V5ID0gdGhpcy5iaW5sTUQ1KGJrZXksIGtleS5sZW5ndGggKiA4KSB9IGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7IGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNjsgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVjNWM1YzVjIH0gaGFzaCA9IHRoaXMuYmlubE1ENShpcGFkLmNvbmNhdCh0aGlzLnJzdHIyYmlubChkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogOCk7IHJldHVybiB0aGlzLmJpbmwycnN0cih0aGlzLmJpbmxNRDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpIH0sIHJzdHIyaGV4KGlucHV0KSB7IHZhciBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7IHZhciBvdXRwdXQgPSAnJzsgdmFyIHg7IHZhciBpOyBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHsgeCA9IGlucHV0LmNoYXJDb2RlQXQoaSk7IG91dHB1dCArPSBoZXhUYWIuY2hhckF0KCh4ID4+PiA0KSAmIDB4MGYpICsgaGV4VGFiLmNoYXJBdCh4ICYgMHgwZikgfSByZXR1cm4gb3V0cHV0IH0sIHN0cjJyc3RyVVRGOChpbnB1dCkgeyByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSkgfSwgcmF3TUQ1KHMpIHsgcmV0dXJuIHRoaXMucnN0ck1ENSh0aGlzLnN0cjJyc3RyVVRGOChzKSkgfSwgaGV4TUQ1KHMpIHsgcmV0dXJuIHRoaXMucnN0cjJoZXgodGhpcy5yYXdNRDUocykpIH0sIHJhd0hNQUNNRDUoaywgZCkgeyByZXR1cm4gdGhpcy5yc3RySE1BQ01ENSh0aGlzLnN0cjJyc3RyVVRGOChrKSwgc3RyMnJzdHJVVEY4KGQpKSB9LCBoZXhITUFDTUQ1KGssIGQpIHsgcmV0dXJuIHRoaXMucnN0cjJoZXgodGhpcy5yYXdITUFDTUQ1KGssIGQpKSB9LCBtZDUoc3RyaW5nLCBrZXksIHJhdykgeyBpZiAoIWtleSkgeyBpZiAoIXJhdykgeyByZXR1cm4gdGhpcy5oZXhNRDUoc3RyaW5nKSB9IHJldHVybiB0aGlzLnJhd01ENShzdHJpbmcpIH0gaWYgKCFyYXcpIHsgcmV0dXJuIHRoaXMuaGV4SE1BQ01ENShrZXksIHN0cmluZykgfSByZXR1cm4gdGhpcy5yYXdITUFDTUQ1KGtleSwgc3RyaW5nKSB9LCBnZXRTaWcocmVxdWVzdFBhcmFtLCBzaywgZmVhdHVyZSwgbW9kZSkgeyB2YXIgc2lnID0gbnVsbDsgdmFyIHJlcXVlc3RBcnIgPSBbXTsgT2JqZWN0LmtleXMocmVxdWVzdFBhcmFtKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJlcXVlc3RBcnIucHVzaChrZXkgKyAnPScgKyByZXF1ZXN0UGFyYW1ba2V5XSkgfSk7IGlmIChmZWF0dXJlID09ICdzZWFyY2gnKSB7IHNpZyA9ICcvd3MvcGxhY2UvdjEvc2VhcmNoPycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrIH0gaWYgKGZlYXR1cmUgPT0gJ3N1Z2dlc3QnKSB7IHNpZyA9ICcvd3MvcGxhY2UvdjEvc3VnZ2VzdGlvbj8nICsgcmVxdWVzdEFyci5qb2luKCcmJykgKyBzayB9IGlmIChmZWF0dXJlID09ICdyZXZlcnNlR2VvY29kZXInKSB7IHNpZyA9ICcvd3MvZ2VvY29kZXIvdjEvPycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrIH0gaWYgKGZlYXR1cmUgPT0gJ2dlb2NvZGVyJykgeyBzaWcgPSAnL3dzL2dlb2NvZGVyL3YxLz8nICsgcmVxdWVzdEFyci5qb2luKCcmJykgKyBzayB9IGlmIChmZWF0dXJlID09ICdnZXRDaXR5TGlzdCcpIHsgc2lnID0gJy93cy9kaXN0cmljdC92MS9saXN0PycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrIH0gaWYgKGZlYXR1cmUgPT0gJ2dldERpc3RyaWN0QnlDaXR5SWQnKSB7IHNpZyA9ICcvd3MvZGlzdHJpY3QvdjEvZ2V0Y2hpbGRyZW4/JyArIHJlcXVlc3RBcnIuam9pbignJicpICsgc2sgfSBpZiAoZmVhdHVyZSA9PSAnY2FsY3VsYXRlRGlzdGFuY2UnKSB7IHNpZyA9ICcvd3MvZGlzdGFuY2UvdjEvPycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrIH0gaWYgKGZlYXR1cmUgPT0gJ2RpcmVjdGlvbicpIHsgc2lnID0gJy93cy9kaXJlY3Rpb24vdjEvJyArIG1vZGUgKyAnPycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrIH0gc2lnID0gdGhpcy5tZDUoc2lnKTsgcmV0dXJuIHNpZyB9LCBsb2NhdGlvbjJxdWVyeShkYXRhKSB7IGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykgeyByZXR1cm4gZGF0YSB9IHZhciBxdWVyeSA9ICcnOyBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHsgdmFyIGQgPSBkYXRhW2ldOyBpZiAoISFxdWVyeSkgeyBxdWVyeSArPSAnOycgfSBpZiAoZC5sb2NhdGlvbikgeyBxdWVyeSA9IHF1ZXJ5ICsgZC5sb2NhdGlvbi5sYXQgKyAnLCcgKyBkLmxvY2F0aW9uLmxuZyB9IGlmIChkLmxhdGl0dWRlICYmIGQubG9uZ2l0dWRlKSB7IHF1ZXJ5ID0gcXVlcnkgKyBkLmxhdGl0dWRlICsgJywnICsgZC5sb25naXR1ZGUgfSB9IHJldHVybiBxdWVyeSB9LCByYWQoZCkgeyByZXR1cm4gZCAqIE1hdGguUEkgLyAxODAuMCB9LCBnZXRFbmRMb2NhdGlvbihsb2NhdGlvbikgeyB2YXIgdG8gPSBsb2NhdGlvbi5zcGxpdCgnOycpOyB2YXIgZW5kTG9jYXRpb24gPSBbXTsgZm9yICh2YXIgaSA9IDA7IGkgPCB0by5sZW5ndGg7IGkrKykgeyBlbmRMb2NhdGlvbi5wdXNoKHsgbGF0OiBwYXJzZUZsb2F0KHRvW2ldLnNwbGl0KCcsJylbMF0pLCBsbmc6IHBhcnNlRmxvYXQodG9baV0uc3BsaXQoJywnKVsxXSkgfSkgfSByZXR1cm4gZW5kTG9jYXRpb24gfSwgZ2V0RGlzdGFuY2UobGF0RnJvbSwgbG5nRnJvbSwgbGF0VG8sIGxuZ1RvKSB7IHZhciByYWRMYXRGcm9tID0gdGhpcy5yYWQobGF0RnJvbSk7IHZhciByYWRMYXRUbyA9IHRoaXMucmFkKGxhdFRvKTsgdmFyIGEgPSByYWRMYXRGcm9tIC0gcmFkTGF0VG87IHZhciBiID0gdGhpcy5yYWQobG5nRnJvbSkgLSB0aGlzLnJhZChsbmdUbyk7IHZhciBkaXN0YW5jZSA9IDIgKiBNYXRoLmFzaW4oTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguc2luKGEgLyAyKSwgMikgKyBNYXRoLmNvcyhyYWRMYXRGcm9tKSAqIE1hdGguY29zKHJhZExhdFRvKSAqIE1hdGgucG93KE1hdGguc2luKGIgLyAyKSwgMikpKTsgZGlzdGFuY2UgPSBkaXN0YW5jZSAqIEVBUlRIX1JBRElVUzsgZGlzdGFuY2UgPSBNYXRoLnJvdW5kKGRpc3RhbmNlICogMTAwMDApIC8gMTAwMDA7IHJldHVybiBwYXJzZUZsb2F0KGRpc3RhbmNlLnRvRml4ZWQoMCkpIH0sIGdldFdYTG9jYXRpb24oc3VjY2VzcywgZmFpbCwgY29tcGxldGUpIHsgd3guZ2V0TG9jYXRpb24oeyB0eXBlOiAnZ2NqMDInLCBzdWNjZXNzOiBzdWNjZXNzLCBmYWlsOiBmYWlsLCBjb21wbGV0ZTogY29tcGxldGUgfSkgfSwgZ2V0TG9jYXRpb25QYXJhbShsb2NhdGlvbikgeyBpZiAodHlwZW9mIGxvY2F0aW9uID09ICdzdHJpbmcnKSB7IHZhciBsb2NhdGlvbkFyciA9IGxvY2F0aW9uLnNwbGl0KCcsJyk7IGlmIChsb2NhdGlvbkFyci5sZW5ndGggPT09IDIpIHsgbG9jYXRpb24gPSB7IGxhdGl0dWRlOiBsb2NhdGlvbi5zcGxpdCgnLCcpWzBdLCBsb25naXR1ZGU6IGxvY2F0aW9uLnNwbGl0KCcsJylbMV0gfSB9IGVsc2UgeyBsb2NhdGlvbiA9IHt9IH0gfSByZXR1cm4gbG9jYXRpb24gfSwgcG9seWZpbGxQYXJhbShwYXJhbSkgeyBwYXJhbS5zdWNjZXNzID0gcGFyYW0uc3VjY2VzcyB8fCBmdW5jdGlvbiAoKSB7IH07IHBhcmFtLmZhaWwgPSBwYXJhbS5mYWlsIHx8IGZ1bmN0aW9uICgpIHsgfTsgcGFyYW0uY29tcGxldGUgPSBwYXJhbS5jb21wbGV0ZSB8fCBmdW5jdGlvbiAoKSB7IH0gfSwgY2hlY2tQYXJhbUtleUVtcHR5KHBhcmFtLCBrZXkpIHsgaWYgKCFwYXJhbVtrZXldKSB7IHZhciBlcnJjb25mID0gdGhpcy5idWlsZEVycm9yQ29uZmlnKEVSUk9SX0NPTkYuUEFSQU1fRVJSLCBFUlJPUl9DT05GLlBBUkFNX0VSUl9NU0cgKyBrZXkgKyAn5Y+C5pWw5qC85byP5pyJ6K+vJyk7IHBhcmFtLmZhaWwoZXJyY29uZik7IHBhcmFtLmNvbXBsZXRlKGVycmNvbmYpOyByZXR1cm4gdHJ1ZSB9IHJldHVybiBmYWxzZSB9LCBjaGVja0tleXdvcmQocGFyYW0pIHsgcmV0dXJuICF0aGlzLmNoZWNrUGFyYW1LZXlFbXB0eShwYXJhbSwgJ2tleXdvcmQnKSB9LCBjaGVja0xvY2F0aW9uKHBhcmFtKSB7IHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb25QYXJhbShwYXJhbS5sb2NhdGlvbik7IGlmICghbG9jYXRpb24gfHwgIWxvY2F0aW9uLmxhdGl0dWRlIHx8ICFsb2NhdGlvbi5sb25naXR1ZGUpIHsgdmFyIGVycmNvbmYgPSB0aGlzLmJ1aWxkRXJyb3JDb25maWcoRVJST1JfQ09ORi5QQVJBTV9FUlIsIEVSUk9SX0NPTkYuUEFSQU1fRVJSX01TRyArICcgbG9jYXRpb27lj4LmlbDmoLzlvI/mnInor68nKTsgcGFyYW0uZmFpbChlcnJjb25mKTsgcGFyYW0uY29tcGxldGUoZXJyY29uZik7IHJldHVybiBmYWxzZSB9IHJldHVybiB0cnVlIH0sIGJ1aWxkRXJyb3JDb25maWcoZXJyQ29kZSwgZXJyTXNnKSB7IHJldHVybiB7IHN0YXR1czogZXJyQ29kZSwgbWVzc2FnZTogZXJyTXNnIH0gfSwgaGFuZGxlRGF0YShwYXJhbSwgZGF0YSwgZmVhdHVyZSkgeyBpZiAoZmVhdHVyZSA9PSAnc2VhcmNoJykgeyB2YXIgc2VhcmNoUmVzdWx0ID0gZGF0YS5kYXRhOyB2YXIgc2VhcmNoU2ltcGxpZnkgPSBbXTsgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFyY2hSZXN1bHQubGVuZ3RoOyBpKyspIHsgc2VhcmNoU2ltcGxpZnkucHVzaCh7IGlkOiBzZWFyY2hSZXN1bHRbaV0uaWQgfHwgbnVsbCwgdGl0bGU6IHNlYXJjaFJlc3VsdFtpXS50aXRsZSB8fCBudWxsLCBsYXRpdHVkZTogc2VhcmNoUmVzdWx0W2ldLmxvY2F0aW9uICYmIHNlYXJjaFJlc3VsdFtpXS5sb2NhdGlvbi5sYXQgfHwgbnVsbCwgbG9uZ2l0dWRlOiBzZWFyY2hSZXN1bHRbaV0ubG9jYXRpb24gJiYgc2VhcmNoUmVzdWx0W2ldLmxvY2F0aW9uLmxuZyB8fCBudWxsLCBhZGRyZXNzOiBzZWFyY2hSZXN1bHRbaV0uYWRkcmVzcyB8fCBudWxsLCBjYXRlZ29yeTogc2VhcmNoUmVzdWx0W2ldLmNhdGVnb3J5IHx8IG51bGwsIHRlbDogc2VhcmNoUmVzdWx0W2ldLnRlbCB8fCBudWxsLCBhZGNvZGU6IHNlYXJjaFJlc3VsdFtpXS5hZF9pbmZvICYmIHNlYXJjaFJlc3VsdFtpXS5hZF9pbmZvLmFkY29kZSB8fCBudWxsLCBjaXR5OiBzZWFyY2hSZXN1bHRbaV0uYWRfaW5mbyAmJiBzZWFyY2hSZXN1bHRbaV0uYWRfaW5mby5jaXR5IHx8IG51bGwsIGRpc3RyaWN0OiBzZWFyY2hSZXN1bHRbaV0uYWRfaW5mbyAmJiBzZWFyY2hSZXN1bHRbaV0uYWRfaW5mby5kaXN0cmljdCB8fCBudWxsLCBwcm92aW5jZTogc2VhcmNoUmVzdWx0W2ldLmFkX2luZm8gJiYgc2VhcmNoUmVzdWx0W2ldLmFkX2luZm8ucHJvdmluY2UgfHwgbnVsbCB9KSB9IHBhcmFtLnN1Y2Nlc3MoZGF0YSwgeyBzZWFyY2hSZXN1bHQ6IHNlYXJjaFJlc3VsdCwgc2VhcmNoU2ltcGxpZnk6IHNlYXJjaFNpbXBsaWZ5IH0pIH0gZWxzZSBpZiAoZmVhdHVyZSA9PSAnc3VnZ2VzdCcpIHsgdmFyIHN1Z2dlc3RSZXN1bHQgPSBkYXRhLmRhdGE7IHZhciBzdWdnZXN0U2ltcGxpZnkgPSBbXTsgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWdnZXN0UmVzdWx0Lmxlbmd0aDsgaSsrKSB7IHN1Z2dlc3RTaW1wbGlmeS5wdXNoKHsgYWRjb2RlOiBzdWdnZXN0UmVzdWx0W2ldLmFkY29kZSB8fCBudWxsLCBhZGRyZXNzOiBzdWdnZXN0UmVzdWx0W2ldLmFkZHJlc3MgfHwgbnVsbCwgY2F0ZWdvcnk6IHN1Z2dlc3RSZXN1bHRbaV0uY2F0ZWdvcnkgfHwgbnVsbCwgY2l0eTogc3VnZ2VzdFJlc3VsdFtpXS5jaXR5IHx8IG51bGwsIGRpc3RyaWN0OiBzdWdnZXN0UmVzdWx0W2ldLmRpc3RyaWN0IHx8IG51bGwsIGlkOiBzdWdnZXN0UmVzdWx0W2ldLmlkIHx8IG51bGwsIGxhdGl0dWRlOiBzdWdnZXN0UmVzdWx0W2ldLmxvY2F0aW9uICYmIHN1Z2dlc3RSZXN1bHRbaV0ubG9jYXRpb24ubGF0IHx8IG51bGwsIGxvbmdpdHVkZTogc3VnZ2VzdFJlc3VsdFtpXS5sb2NhdGlvbiAmJiBzdWdnZXN0UmVzdWx0W2ldLmxvY2F0aW9uLmxuZyB8fCBudWxsLCBwcm92aW5jZTogc3VnZ2VzdFJlc3VsdFtpXS5wcm92aW5jZSB8fCBudWxsLCB0aXRsZTogc3VnZ2VzdFJlc3VsdFtpXS50aXRsZSB8fCBudWxsLCB0eXBlOiBzdWdnZXN0UmVzdWx0W2ldLnR5cGUgfHwgbnVsbCB9KSB9IHBhcmFtLnN1Y2Nlc3MoZGF0YSwgeyBzdWdnZXN0UmVzdWx0OiBzdWdnZXN0UmVzdWx0LCBzdWdnZXN0U2ltcGxpZnk6IHN1Z2dlc3RTaW1wbGlmeSB9KSB9IGVsc2UgaWYgKGZlYXR1cmUgPT0gJ3JldmVyc2VHZW9jb2RlcicpIHsgdmFyIHJldmVyc2VHZW9jb2RlclJlc3VsdCA9IGRhdGEucmVzdWx0OyB2YXIgcmV2ZXJzZUdlb2NvZGVyU2ltcGxpZnkgPSB7IGFkZHJlc3M6IHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzIHx8IG51bGwsIGxhdGl0dWRlOiByZXZlcnNlR2VvY29kZXJSZXN1bHQubG9jYXRpb24gJiYgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmxvY2F0aW9uLmxhdCB8fCBudWxsLCBsb25naXR1ZGU6IHJldmVyc2VHZW9jb2RlclJlc3VsdC5sb2NhdGlvbiAmJiByZXZlcnNlR2VvY29kZXJSZXN1bHQubG9jYXRpb24ubG5nIHx8IG51bGwsIGFkY29kZTogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkX2luZm8gJiYgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkX2luZm8uYWRjb2RlIHx8IG51bGwsIGNpdHk6IHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudCAmJiByZXZlcnNlR2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eSB8fCBudWxsLCBkaXN0cmljdDogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50ICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5kaXN0cmljdCB8fCBudWxsLCBuYXRpb246IHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudCAmJiByZXZlcnNlR2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnQubmF0aW9uIHx8IG51bGwsIHByb3ZpbmNlOiByZXZlcnNlR2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnQgJiYgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LnByb3ZpbmNlIHx8IG51bGwsIHN0cmVldDogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50ICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5zdHJlZXQgfHwgbnVsbCwgc3RyZWV0X251bWJlcjogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50ICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5zdHJlZXRfbnVtYmVyIHx8IG51bGwsIHJlY29tbWVuZDogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmZvcm1hdHRlZF9hZGRyZXNzZXMgJiYgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmZvcm1hdHRlZF9hZGRyZXNzZXMucmVjb21tZW5kIHx8IG51bGwsIHJvdWdoOiByZXZlcnNlR2VvY29kZXJSZXN1bHQuZm9ybWF0dGVkX2FkZHJlc3NlcyAmJiByZXZlcnNlR2VvY29kZXJSZXN1bHQuZm9ybWF0dGVkX2FkZHJlc3Nlcy5yb3VnaCB8fCBudWxsIH07IGlmIChyZXZlcnNlR2VvY29kZXJSZXN1bHQucG9pcykgeyB2YXIgcG9pcyA9IHJldmVyc2VHZW9jb2RlclJlc3VsdC5wb2lzOyB2YXIgcG9pc1NpbXBsaWZ5ID0gW107IGZvciAodmFyIGkgPSAwOyBpIDwgcG9pcy5sZW5ndGg7IGkrKykgeyBwb2lzU2ltcGxpZnkucHVzaCh7IGlkOiBwb2lzW2ldLmlkIHx8IG51bGwsIHRpdGxlOiBwb2lzW2ldLnRpdGxlIHx8IG51bGwsIGxhdGl0dWRlOiBwb2lzW2ldLmxvY2F0aW9uICYmIHBvaXNbaV0ubG9jYXRpb24ubGF0IHx8IG51bGwsIGxvbmdpdHVkZTogcG9pc1tpXS5sb2NhdGlvbiAmJiBwb2lzW2ldLmxvY2F0aW9uLmxuZyB8fCBudWxsLCBhZGRyZXNzOiBwb2lzW2ldLmFkZHJlc3MgfHwgbnVsbCwgY2F0ZWdvcnk6IHBvaXNbaV0uY2F0ZWdvcnkgfHwgbnVsbCwgYWRjb2RlOiBwb2lzW2ldLmFkX2luZm8gJiYgcG9pc1tpXS5hZF9pbmZvLmFkY29kZSB8fCBudWxsLCBjaXR5OiBwb2lzW2ldLmFkX2luZm8gJiYgcG9pc1tpXS5hZF9pbmZvLmNpdHkgfHwgbnVsbCwgZGlzdHJpY3Q6IHBvaXNbaV0uYWRfaW5mbyAmJiBwb2lzW2ldLmFkX2luZm8uZGlzdHJpY3QgfHwgbnVsbCwgcHJvdmluY2U6IHBvaXNbaV0uYWRfaW5mbyAmJiBwb2lzW2ldLmFkX2luZm8ucHJvdmluY2UgfHwgbnVsbCB9KSB9IHBhcmFtLnN1Y2Nlc3MoZGF0YSwgeyByZXZlcnNlR2VvY29kZXJSZXN1bHQ6IHJldmVyc2VHZW9jb2RlclJlc3VsdCwgcmV2ZXJzZUdlb2NvZGVyU2ltcGxpZnk6IHJldmVyc2VHZW9jb2RlclNpbXBsaWZ5LCBwb2lzOiBwb2lzLCBwb2lzU2ltcGxpZnk6IHBvaXNTaW1wbGlmeSB9KSB9IGVsc2UgeyBwYXJhbS5zdWNjZXNzKGRhdGEsIHsgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0OiByZXZlcnNlR2VvY29kZXJSZXN1bHQsIHJldmVyc2VHZW9jb2RlclNpbXBsaWZ5OiByZXZlcnNlR2VvY29kZXJTaW1wbGlmeSB9KSB9IH0gZWxzZSBpZiAoZmVhdHVyZSA9PSAnZ2VvY29kZXInKSB7IHZhciBnZW9jb2RlclJlc3VsdCA9IGRhdGEucmVzdWx0OyB2YXIgZ2VvY29kZXJTaW1wbGlmeSA9IHsgdGl0bGU6IGdlb2NvZGVyUmVzdWx0LnRpdGxlIHx8IG51bGwsIGxhdGl0dWRlOiBnZW9jb2RlclJlc3VsdC5sb2NhdGlvbiAmJiBnZW9jb2RlclJlc3VsdC5sb2NhdGlvbi5sYXQgfHwgbnVsbCwgbG9uZ2l0dWRlOiBnZW9jb2RlclJlc3VsdC5sb2NhdGlvbiAmJiBnZW9jb2RlclJlc3VsdC5sb2NhdGlvbi5sbmcgfHwgbnVsbCwgYWRjb2RlOiBnZW9jb2RlclJlc3VsdC5hZF9pbmZvICYmIGdlb2NvZGVyUmVzdWx0LmFkX2luZm8uYWRjb2RlIHx8IG51bGwsIHByb3ZpbmNlOiBnZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudHMgJiYgZ2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnRzLnByb3ZpbmNlIHx8IG51bGwsIGNpdHk6IGdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cyAmJiBnZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudHMuY2l0eSB8fCBudWxsLCBkaXN0cmljdDogZ2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnRzICYmIGdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cy5kaXN0cmljdCB8fCBudWxsLCBzdHJlZXQ6IGdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cyAmJiBnZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudHMuc3RyZWV0IHx8IG51bGwsIHN0cmVldF9udW1iZXI6IGdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cyAmJiBnZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudHMuc3RyZWV0X251bWJlciB8fCBudWxsLCBsZXZlbDogZ2VvY29kZXJSZXN1bHQubGV2ZWwgfHwgbnVsbCB9OyBwYXJhbS5zdWNjZXNzKGRhdGEsIHsgZ2VvY29kZXJSZXN1bHQ6IGdlb2NvZGVyUmVzdWx0LCBnZW9jb2RlclNpbXBsaWZ5OiBnZW9jb2RlclNpbXBsaWZ5IH0pIH0gZWxzZSBpZiAoZmVhdHVyZSA9PSAnZ2V0Q2l0eUxpc3QnKSB7IHZhciBwcm92aW5jZVJlc3VsdCA9IGRhdGEucmVzdWx0WzBdOyB2YXIgY2l0eVJlc3VsdCA9IGRhdGEucmVzdWx0WzFdOyB2YXIgZGlzdHJpY3RSZXN1bHQgPSBkYXRhLnJlc3VsdFsyXTsgcGFyYW0uc3VjY2VzcyhkYXRhLCB7IHByb3ZpbmNlUmVzdWx0OiBwcm92aW5jZVJlc3VsdCwgY2l0eVJlc3VsdDogY2l0eVJlc3VsdCwgZGlzdHJpY3RSZXN1bHQ6IGRpc3RyaWN0UmVzdWx0IH0pIH0gZWxzZSBpZiAoZmVhdHVyZSA9PSAnZ2V0RGlzdHJpY3RCeUNpdHlJZCcpIHsgdmFyIGRpc3RyaWN0QnlDaXR5ID0gZGF0YS5yZXN1bHRbMF07IHBhcmFtLnN1Y2Nlc3MoZGF0YSwgZGlzdHJpY3RCeUNpdHkpIH0gZWxzZSBpZiAoZmVhdHVyZSA9PSAnY2FsY3VsYXRlRGlzdGFuY2UnKSB7IHZhciBjYWxjdWxhdGVEaXN0YW5jZVJlc3VsdCA9IGRhdGEucmVzdWx0LmVsZW1lbnRzOyB2YXIgZGlzdGFuY2UgPSBbXTsgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxjdWxhdGVEaXN0YW5jZVJlc3VsdC5sZW5ndGg7IGkrKykgeyBkaXN0YW5jZS5wdXNoKGNhbGN1bGF0ZURpc3RhbmNlUmVzdWx0W2ldLmRpc3RhbmNlKSB9IHBhcmFtLnN1Y2Nlc3MoZGF0YSwgeyBjYWxjdWxhdGVEaXN0YW5jZVJlc3VsdDogY2FsY3VsYXRlRGlzdGFuY2VSZXN1bHQsIGRpc3RhbmNlOiBkaXN0YW5jZSB9KSB9IGVsc2UgaWYgKGZlYXR1cmUgPT0gJ2RpcmVjdGlvbicpIHsgdmFyIGRpcmVjdGlvbiA9IGRhdGEucmVzdWx0LnJvdXRlczsgcGFyYW0uc3VjY2VzcyhkYXRhLCBkaXJlY3Rpb24pIH0gZWxzZSB7IHBhcmFtLnN1Y2Nlc3MoZGF0YSkgfSB9LCBidWlsZFd4UmVxdWVzdENvbmZpZyhwYXJhbSwgb3B0aW9ucywgZmVhdHVyZSkgeyB2YXIgdGhhdCA9IHRoaXM7IG9wdGlvbnMuaGVhZGVyID0geyBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9OyBvcHRpb25zLm1ldGhvZCA9ICdHRVQnOyBvcHRpb25zLnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzKSB7IHZhciBkYXRhID0gcmVzLmRhdGE7IGlmIChkYXRhLnN0YXR1cyA9PT0gMCkgeyB0aGF0LmhhbmRsZURhdGEocGFyYW0sIGRhdGEsIGZlYXR1cmUpIH0gZWxzZSB7IHBhcmFtLmZhaWwoZGF0YSkgfSB9OyBvcHRpb25zLmZhaWwgPSBmdW5jdGlvbiAocmVzKSB7IHJlcy5zdGF0dXNDb2RlID0gRVJST1JfQ09ORi5XWF9FUlJfQ09ERTsgcGFyYW0uZmFpbCh0aGF0LmJ1aWxkRXJyb3JDb25maWcoRVJST1JfQ09ORi5XWF9FUlJfQ09ERSwgcmVzLmVyck1zZykpIH07IG9wdGlvbnMuY29tcGxldGUgPSBmdW5jdGlvbiAocmVzKSB7IHZhciBzdGF0dXNDb2RlID0gK3Jlcy5zdGF0dXNDb2RlOyBzd2l0Y2ggKHN0YXR1c0NvZGUpIHsgY2FzZSBFUlJPUl9DT05GLldYX0VSUl9DT0RFOiB7IHBhcmFtLmNvbXBsZXRlKHRoYXQuYnVpbGRFcnJvckNvbmZpZyhFUlJPUl9DT05GLldYX0VSUl9DT0RFLCByZXMuZXJyTXNnKSk7IGJyZWFrIH0gY2FzZSBFUlJPUl9DT05GLldYX09LX0NPREU6IHsgdmFyIGRhdGEgPSByZXMuZGF0YTsgaWYgKGRhdGEuc3RhdHVzID09PSAwKSB7IHBhcmFtLmNvbXBsZXRlKGRhdGEpIH0gZWxzZSB7IHBhcmFtLmNvbXBsZXRlKHRoYXQuYnVpbGRFcnJvckNvbmZpZyhkYXRhLnN0YXR1cywgZGF0YS5tZXNzYWdlKSkgfSBicmVhayB9IGRlZmF1bHQ6IHsgcGFyYW0uY29tcGxldGUodGhhdC5idWlsZEVycm9yQ29uZmlnKEVSUk9SX0NPTkYuU1lTVEVNX0VSUiwgRVJST1JfQ09ORi5TWVNURU1fRVJSX01TRykpIH0gfSB9OyByZXR1cm4gb3B0aW9ucyB9LCBsb2NhdGlvblByb2Nlc3MocGFyYW0sIGxvY2F0aW9uc3VjY2VzcywgbG9jYXRpb25mYWlsLCBsb2NhdGlvbmNvbXBsZXRlKSB7IHZhciB0aGF0ID0gdGhpczsgbG9jYXRpb25mYWlsID0gbG9jYXRpb25mYWlsIHx8IGZ1bmN0aW9uIChyZXMpIHsgcmVzLnN0YXR1c0NvZGUgPSBFUlJPUl9DT05GLldYX0VSUl9DT0RFOyBwYXJhbS5mYWlsKHRoYXQuYnVpbGRFcnJvckNvbmZpZyhFUlJPUl9DT05GLldYX0VSUl9DT0RFLCByZXMuZXJyTXNnKSkgfTsgbG9jYXRpb25jb21wbGV0ZSA9IGxvY2F0aW9uY29tcGxldGUgfHwgZnVuY3Rpb24gKHJlcykgeyBpZiAocmVzLnN0YXR1c0NvZGUgPT0gRVJST1JfQ09ORi5XWF9FUlJfQ09ERSkgeyBwYXJhbS5jb21wbGV0ZSh0aGF0LmJ1aWxkRXJyb3JDb25maWcoRVJST1JfQ09ORi5XWF9FUlJfQ09ERSwgcmVzLmVyck1zZykpIH0gfTsgaWYgKCFwYXJhbS5sb2NhdGlvbikgeyB0aGF0LmdldFdYTG9jYXRpb24obG9jYXRpb25zdWNjZXNzLCBsb2NhdGlvbmZhaWwsIGxvY2F0aW9uY29tcGxldGUpIH0gZWxzZSBpZiAodGhhdC5jaGVja0xvY2F0aW9uKHBhcmFtKSkgeyB2YXIgbG9jYXRpb24gPSBVdGlscy5nZXRMb2NhdGlvblBhcmFtKHBhcmFtLmxvY2F0aW9uKTsgbG9jYXRpb25zdWNjZXNzKGxvY2F0aW9uKSB9IH0gfTsgY2xhc3MgUVFNYXBXWCB7IGNvbnN0cnVjdG9yKG9wdGlvbnMpIHsgaWYgKCFvcHRpb25zLmtleSkgeyB0aHJvdyBFcnJvcigna2V55YC85LiN6IO95Li656m6JykgfSB0aGlzLmtleSA9IG9wdGlvbnMua2V5IH07IHNlYXJjaChvcHRpb25zKSB7IHZhciB0aGF0ID0gdGhpczsgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7IGlmICghVXRpbHMuY2hlY2tLZXl3b3JkKG9wdGlvbnMpKSB7IHJldHVybiB9IHZhciByZXF1ZXN0UGFyYW0gPSB7IGtleXdvcmQ6IG9wdGlvbnMua2V5d29yZCwgb3JkZXJieTogb3B0aW9ucy5vcmRlcmJ5IHx8ICdfZGlzdGFuY2UnLCBwYWdlX3NpemU6IG9wdGlvbnMucGFnZV9zaXplIHx8IDEwLCBwYWdlX2luZGV4OiBvcHRpb25zLnBhZ2VfaW5kZXggfHwgMSwgb3V0cHV0OiAnanNvbicsIGtleTogdGhhdC5rZXkgfTsgaWYgKG9wdGlvbnMuYWRkcmVzc19mb3JtYXQpIHsgcmVxdWVzdFBhcmFtLmFkZHJlc3NfZm9ybWF0ID0gb3B0aW9ucy5hZGRyZXNzX2Zvcm1hdCB9IGlmIChvcHRpb25zLmZpbHRlcikgeyByZXF1ZXN0UGFyYW0uZmlsdGVyID0gb3B0aW9ucy5maWx0ZXIgfSB2YXIgZGlzdGFuY2UgPSBvcHRpb25zLmRpc3RhbmNlIHx8IFwiMTAwMFwiOyB2YXIgYXV0b19leHRlbmQgPSBvcHRpb25zLmF1dG9fZXh0ZW5kIHx8IDE7IHZhciByZWdpb24gPSBudWxsOyB2YXIgcmVjdGFuZ2xlID0gbnVsbDsgaWYgKG9wdGlvbnMucmVnaW9uKSB7IHJlZ2lvbiA9IG9wdGlvbnMucmVnaW9uIH0gaWYgKG9wdGlvbnMucmVjdGFuZ2xlKSB7IHJlY3RhbmdsZSA9IG9wdGlvbnMucmVjdGFuZ2xlIH0gdmFyIGxvY2F0aW9uc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXN1bHQpIHsgaWYgKHJlZ2lvbiAmJiAhcmVjdGFuZ2xlKSB7IHJlcXVlc3RQYXJhbS5ib3VuZGFyeSA9IFwicmVnaW9uKFwiICsgcmVnaW9uICsgXCIsXCIgKyBhdXRvX2V4dGVuZCArIFwiLFwiICsgcmVzdWx0LmxhdGl0dWRlICsgXCIsXCIgKyByZXN1bHQubG9uZ2l0dWRlICsgXCIpXCI7IGlmIChvcHRpb25zLnNpZykgeyByZXF1ZXN0UGFyYW0uc2lnID0gVXRpbHMuZ2V0U2lnKHJlcXVlc3RQYXJhbSwgb3B0aW9ucy5zaWcsICdzZWFyY2gnKSB9IH0gZWxzZSBpZiAocmVjdGFuZ2xlICYmICFyZWdpb24pIHsgcmVxdWVzdFBhcmFtLmJvdW5kYXJ5ID0gXCJyZWN0YW5nbGUoXCIgKyByZWN0YW5nbGUgKyBcIilcIjsgaWYgKG9wdGlvbnMuc2lnKSB7IHJlcXVlc3RQYXJhbS5zaWcgPSBVdGlscy5nZXRTaWcocmVxdWVzdFBhcmFtLCBvcHRpb25zLnNpZywgJ3NlYXJjaCcpIH0gfSBlbHNlIHsgcmVxdWVzdFBhcmFtLmJvdW5kYXJ5ID0gXCJuZWFyYnkoXCIgKyByZXN1bHQubGF0aXR1ZGUgKyBcIixcIiArIHJlc3VsdC5sb25naXR1ZGUgKyBcIixcIiArIGRpc3RhbmNlICsgXCIsXCIgKyBhdXRvX2V4dGVuZCArIFwiKVwiOyBpZiAob3B0aW9ucy5zaWcpIHsgcmVxdWVzdFBhcmFtLnNpZyA9IFV0aWxzLmdldFNpZyhyZXF1ZXN0UGFyYW0sIG9wdGlvbnMuc2lnLCAnc2VhcmNoJykgfSB9IHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywgeyB1cmw6IFVSTF9TRUFSQ0gsIGRhdGE6IHJlcXVlc3RQYXJhbSB9LCAnc2VhcmNoJykpIH07IFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpIH07IGdldFN1Z2dlc3Rpb24ob3B0aW9ucykgeyB2YXIgdGhhdCA9IHRoaXM7IG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyBVdGlscy5wb2x5ZmlsbFBhcmFtKG9wdGlvbnMpOyBpZiAoIVV0aWxzLmNoZWNrS2V5d29yZChvcHRpb25zKSkgeyByZXR1cm4gfSB2YXIgcmVxdWVzdFBhcmFtID0geyBrZXl3b3JkOiBvcHRpb25zLmtleXdvcmQsIHJlZ2lvbjogb3B0aW9ucy5yZWdpb24gfHwgJ+WFqOWbvScsIHJlZ2lvbl9maXg6IG9wdGlvbnMucmVnaW9uX2ZpeCB8fCAwLCBwb2xpY3k6IG9wdGlvbnMucG9saWN5IHx8IDAsIHBhZ2Vfc2l6ZTogb3B0aW9ucy5wYWdlX3NpemUgfHwgMTAsIHBhZ2VfaW5kZXg6IG9wdGlvbnMucGFnZV9pbmRleCB8fCAxLCBnZXRfc3VicG9pczogb3B0aW9ucy5nZXRfc3VicG9pcyB8fCAwLCBvdXRwdXQ6ICdqc29uJywga2V5OiB0aGF0LmtleSB9OyBpZiAob3B0aW9ucy5hZGRyZXNzX2Zvcm1hdCkgeyByZXF1ZXN0UGFyYW0uYWRkcmVzc19mb3JtYXQgPSBvcHRpb25zLmFkZHJlc3NfZm9ybWF0IH0gaWYgKG9wdGlvbnMuZmlsdGVyKSB7IHJlcXVlc3RQYXJhbS5maWx0ZXIgPSBvcHRpb25zLmZpbHRlciB9IGlmIChvcHRpb25zLmxvY2F0aW9uKSB7IHZhciBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7IHJlcXVlc3RQYXJhbS5sb2NhdGlvbiA9IHJlc3VsdC5sYXRpdHVkZSArICcsJyArIHJlc3VsdC5sb25naXR1ZGU7IGlmIChvcHRpb25zLnNpZykgeyByZXF1ZXN0UGFyYW0uc2lnID0gVXRpbHMuZ2V0U2lnKHJlcXVlc3RQYXJhbSwgb3B0aW9ucy5zaWcsICdzdWdnZXN0JykgfSB3eC5yZXF1ZXN0KFV0aWxzLmJ1aWxkV3hSZXF1ZXN0Q29uZmlnKG9wdGlvbnMsIHsgdXJsOiBVUkxfU1VHR0VTVElPTiwgZGF0YTogcmVxdWVzdFBhcmFtIH0sIFwic3VnZ2VzdFwiKSkgfTsgVXRpbHMubG9jYXRpb25Qcm9jZXNzKG9wdGlvbnMsIGxvY2F0aW9uc3VjY2VzcykgfSBlbHNlIHsgaWYgKG9wdGlvbnMuc2lnKSB7IHJlcXVlc3RQYXJhbS5zaWcgPSBVdGlscy5nZXRTaWcocmVxdWVzdFBhcmFtLCBvcHRpb25zLnNpZywgJ3N1Z2dlc3QnKSB9IHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywgeyB1cmw6IFVSTF9TVUdHRVNUSU9OLCBkYXRhOiByZXF1ZXN0UGFyYW0gfSwgXCJzdWdnZXN0XCIpKSB9IH07IHJldmVyc2VHZW9jb2RlcihvcHRpb25zKSB7IHZhciB0aGF0ID0gdGhpczsgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7IHZhciByZXF1ZXN0UGFyYW0gPSB7IGNvb3JkX3R5cGU6IG9wdGlvbnMuY29vcmRfdHlwZSB8fCA1LCBnZXRfcG9pOiBvcHRpb25zLmdldF9wb2kgfHwgMCwgb3V0cHV0OiAnanNvbicsIGtleTogdGhhdC5rZXkgfTsgaWYgKG9wdGlvbnMucG9pX29wdGlvbnMpIHsgcmVxdWVzdFBhcmFtLnBvaV9vcHRpb25zID0gb3B0aW9ucy5wb2lfb3B0aW9ucyB9IHZhciBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7IHJlcXVlc3RQYXJhbS5sb2NhdGlvbiA9IHJlc3VsdC5sYXRpdHVkZSArICcsJyArIHJlc3VsdC5sb25naXR1ZGU7IGlmIChvcHRpb25zLnNpZykgeyByZXF1ZXN0UGFyYW0uc2lnID0gVXRpbHMuZ2V0U2lnKHJlcXVlc3RQYXJhbSwgb3B0aW9ucy5zaWcsICdyZXZlcnNlR2VvY29kZXInKSB9IHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywgeyB1cmw6IFVSTF9HRVRfR0VPQ09ERVIsIGRhdGE6IHJlcXVlc3RQYXJhbSB9LCAncmV2ZXJzZUdlb2NvZGVyJykpIH07IFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpIH07IGdlb2NvZGVyKG9wdGlvbnMpIHsgdmFyIHRoYXQgPSB0aGlzOyBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgVXRpbHMucG9seWZpbGxQYXJhbShvcHRpb25zKTsgaWYgKFV0aWxzLmNoZWNrUGFyYW1LZXlFbXB0eShvcHRpb25zLCAnYWRkcmVzcycpKSB7IHJldHVybiB9IHZhciByZXF1ZXN0UGFyYW0gPSB7IGFkZHJlc3M6IG9wdGlvbnMuYWRkcmVzcywgb3V0cHV0OiAnanNvbicsIGtleTogdGhhdC5rZXkgfTsgaWYgKG9wdGlvbnMucmVnaW9uKSB7IHJlcXVlc3RQYXJhbS5yZWdpb24gPSBvcHRpb25zLnJlZ2lvbiB9IGlmIChvcHRpb25zLnNpZykgeyByZXF1ZXN0UGFyYW0uc2lnID0gVXRpbHMuZ2V0U2lnKHJlcXVlc3RQYXJhbSwgb3B0aW9ucy5zaWcsICdnZW9jb2RlcicpIH0gd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7IHVybDogVVJMX0dFVF9HRU9DT0RFUiwgZGF0YTogcmVxdWVzdFBhcmFtIH0sICdnZW9jb2RlcicpKSB9OyBnZXRDaXR5TGlzdChvcHRpb25zKSB7IHZhciB0aGF0ID0gdGhpczsgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7IHZhciByZXF1ZXN0UGFyYW0gPSB7IG91dHB1dDogJ2pzb24nLCBrZXk6IHRoYXQua2V5IH07IGlmIChvcHRpb25zLnNpZykgeyByZXF1ZXN0UGFyYW0uc2lnID0gVXRpbHMuZ2V0U2lnKHJlcXVlc3RQYXJhbSwgb3B0aW9ucy5zaWcsICdnZXRDaXR5TGlzdCcpIH0gd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7IHVybDogVVJMX0NJVFlfTElTVCwgZGF0YTogcmVxdWVzdFBhcmFtIH0sICdnZXRDaXR5TGlzdCcpKSB9OyBnZXREaXN0cmljdEJ5Q2l0eUlkKG9wdGlvbnMpIHsgdmFyIHRoYXQgPSB0aGlzOyBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgVXRpbHMucG9seWZpbGxQYXJhbShvcHRpb25zKTsgaWYgKFV0aWxzLmNoZWNrUGFyYW1LZXlFbXB0eShvcHRpb25zLCAnaWQnKSkgeyByZXR1cm4gfSB2YXIgcmVxdWVzdFBhcmFtID0geyBpZDogb3B0aW9ucy5pZCB8fCAnJywgb3V0cHV0OiAnanNvbicsIGtleTogdGhhdC5rZXkgfTsgaWYgKG9wdGlvbnMuc2lnKSB7IHJlcXVlc3RQYXJhbS5zaWcgPSBVdGlscy5nZXRTaWcocmVxdWVzdFBhcmFtLCBvcHRpb25zLnNpZywgJ2dldERpc3RyaWN0QnlDaXR5SWQnKSB9IHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywgeyB1cmw6IFVSTF9BUkVBX0xJU1QsIGRhdGE6IHJlcXVlc3RQYXJhbSB9LCAnZ2V0RGlzdHJpY3RCeUNpdHlJZCcpKSB9OyBjYWxjdWxhdGVEaXN0YW5jZShvcHRpb25zKSB7IHZhciB0aGF0ID0gdGhpczsgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7IGlmIChVdGlscy5jaGVja1BhcmFtS2V5RW1wdHkob3B0aW9ucywgJ3RvJykpIHsgcmV0dXJuIH0gdmFyIHJlcXVlc3RQYXJhbSA9IHsgbW9kZTogb3B0aW9ucy5tb2RlIHx8ICd3YWxraW5nJywgdG86IFV0aWxzLmxvY2F0aW9uMnF1ZXJ5KG9wdGlvbnMudG8pLCBvdXRwdXQ6ICdqc29uJywga2V5OiB0aGF0LmtleSB9OyBpZiAob3B0aW9ucy5mcm9tKSB7IG9wdGlvbnMubG9jYXRpb24gPSBvcHRpb25zLmZyb20gfSBpZiAocmVxdWVzdFBhcmFtLm1vZGUgPT0gJ3N0cmFpZ2h0JykgeyB2YXIgbG9jYXRpb25zdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCkgeyB2YXIgbG9jYXRpb25UbyA9IFV0aWxzLmdldEVuZExvY2F0aW9uKHJlcXVlc3RQYXJhbS50byk7IHZhciBkYXRhID0geyBtZXNzYWdlOiBcInF1ZXJ5IG9rXCIsIHJlc3VsdDogeyBlbGVtZW50czogW10gfSwgc3RhdHVzOiAwIH07IGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25Uby5sZW5ndGg7IGkrKykgeyBkYXRhLnJlc3VsdC5lbGVtZW50cy5wdXNoKHsgZGlzdGFuY2U6IFV0aWxzLmdldERpc3RhbmNlKHJlc3VsdC5sYXRpdHVkZSwgcmVzdWx0LmxvbmdpdHVkZSwgbG9jYXRpb25Ub1tpXS5sYXQsIGxvY2F0aW9uVG9baV0ubG5nKSwgZHVyYXRpb246IDAsIGZyb206IHsgbGF0OiByZXN1bHQubGF0aXR1ZGUsIGxuZzogcmVzdWx0LmxvbmdpdHVkZSB9LCB0bzogeyBsYXQ6IGxvY2F0aW9uVG9baV0ubGF0LCBsbmc6IGxvY2F0aW9uVG9baV0ubG5nIH0gfSkgfSB2YXIgY2FsY3VsYXRlUmVzdWx0ID0gZGF0YS5yZXN1bHQuZWxlbWVudHM7IHZhciBkaXN0YW5jZVJlc3VsdCA9IFtdOyBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGN1bGF0ZVJlc3VsdC5sZW5ndGg7IGkrKykgeyBkaXN0YW5jZVJlc3VsdC5wdXNoKGNhbGN1bGF0ZVJlc3VsdFtpXS5kaXN0YW5jZSkgfSByZXR1cm4gb3B0aW9ucy5zdWNjZXNzKGRhdGEsIHsgY2FsY3VsYXRlUmVzdWx0OiBjYWxjdWxhdGVSZXN1bHQsIGRpc3RhbmNlUmVzdWx0OiBkaXN0YW5jZVJlc3VsdCB9KSB9OyBVdGlscy5sb2NhdGlvblByb2Nlc3Mob3B0aW9ucywgbG9jYXRpb25zdWNjZXNzKSB9IGVsc2UgeyB2YXIgbG9jYXRpb25zdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCkgeyByZXF1ZXN0UGFyYW0uZnJvbSA9IHJlc3VsdC5sYXRpdHVkZSArICcsJyArIHJlc3VsdC5sb25naXR1ZGU7IGlmIChvcHRpb25zLnNpZykgeyByZXF1ZXN0UGFyYW0uc2lnID0gVXRpbHMuZ2V0U2lnKHJlcXVlc3RQYXJhbSwgb3B0aW9ucy5zaWcsICdjYWxjdWxhdGVEaXN0YW5jZScpIH0gd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7IHVybDogVVJMX0RJU1RBTkNFLCBkYXRhOiByZXF1ZXN0UGFyYW0gfSwgJ2NhbGN1bGF0ZURpc3RhbmNlJykpIH07IFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpIH0gfTsgZGlyZWN0aW9uKG9wdGlvbnMpIHsgdmFyIHRoYXQgPSB0aGlzOyBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgVXRpbHMucG9seWZpbGxQYXJhbShvcHRpb25zKTsgaWYgKFV0aWxzLmNoZWNrUGFyYW1LZXlFbXB0eShvcHRpb25zLCAndG8nKSkgeyByZXR1cm4gfSB2YXIgcmVxdWVzdFBhcmFtID0geyBvdXRwdXQ6ICdqc29uJywga2V5OiB0aGF0LmtleSB9OyBpZiAodHlwZW9mIG9wdGlvbnMudG8gPT0gJ3N0cmluZycpIHsgcmVxdWVzdFBhcmFtLnRvID0gb3B0aW9ucy50byB9IGVsc2UgeyByZXF1ZXN0UGFyYW0udG8gPSBvcHRpb25zLnRvLmxhdGl0dWRlICsgJywnICsgb3B0aW9ucy50by5sb25naXR1ZGUgfSB2YXIgU0VUX1VSTF9ESVJFQ1RJT04gPSBudWxsOyBvcHRpb25zLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgTU9ERS5kcml2aW5nOyBTRVRfVVJMX0RJUkVDVElPTiA9IFVSTF9ESVJFQ1RJT04gKyBvcHRpb25zLm1vZGU7IGlmIChvcHRpb25zLmZyb20pIHsgb3B0aW9ucy5sb2NhdGlvbiA9IG9wdGlvbnMuZnJvbSB9IGlmIChvcHRpb25zLm1vZGUgPT0gTU9ERS5kcml2aW5nKSB7IGlmIChvcHRpb25zLmZyb21fcG9pKSB7IHJlcXVlc3RQYXJhbS5mcm9tX3BvaSA9IG9wdGlvbnMuZnJvbV9wb2kgfSBpZiAob3B0aW9ucy5oZWFkaW5nKSB7IHJlcXVlc3RQYXJhbS5oZWFkaW5nID0gb3B0aW9ucy5oZWFkaW5nIH0gaWYgKG9wdGlvbnMuc3BlZWQpIHsgcmVxdWVzdFBhcmFtLnNwZWVkID0gb3B0aW9ucy5zcGVlZCB9IGlmIChvcHRpb25zLmFjY3VyYWN5KSB7IHJlcXVlc3RQYXJhbS5hY2N1cmFjeSA9IG9wdGlvbnMuYWNjdXJhY3kgfSBpZiAob3B0aW9ucy5yb2FkX3R5cGUpIHsgcmVxdWVzdFBhcmFtLnJvYWRfdHlwZSA9IG9wdGlvbnMucm9hZF90eXBlIH0gaWYgKG9wdGlvbnMudG9fcG9pKSB7IHJlcXVlc3RQYXJhbS50b19wb2kgPSBvcHRpb25zLnRvX3BvaSB9IGlmIChvcHRpb25zLmZyb21fdHJhY2spIHsgcmVxdWVzdFBhcmFtLmZyb21fdHJhY2sgPSBvcHRpb25zLmZyb21fdHJhY2sgfSBpZiAob3B0aW9ucy53YXlwb2ludHMpIHsgcmVxdWVzdFBhcmFtLndheXBvaW50cyA9IG9wdGlvbnMud2F5cG9pbnRzIH0gaWYgKG9wdGlvbnMucG9saWN5KSB7IHJlcXVlc3RQYXJhbS5wb2xpY3kgPSBvcHRpb25zLnBvbGljeSB9IGlmIChvcHRpb25zLnBsYXRlX251bWJlcikgeyByZXF1ZXN0UGFyYW0ucGxhdGVfbnVtYmVyID0gb3B0aW9ucy5wbGF0ZV9udW1iZXIgfSB9IGlmIChvcHRpb25zLm1vZGUgPT0gTU9ERS50cmFuc2l0KSB7IGlmIChvcHRpb25zLmRlcGFydHVyZV90aW1lKSB7IHJlcXVlc3RQYXJhbS5kZXBhcnR1cmVfdGltZSA9IG9wdGlvbnMuZGVwYXJ0dXJlX3RpbWUgfSBpZiAob3B0aW9ucy5wb2xpY3kpIHsgcmVxdWVzdFBhcmFtLnBvbGljeSA9IG9wdGlvbnMucG9saWN5IH0gfSB2YXIgbG9jYXRpb25zdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCkgeyByZXF1ZXN0UGFyYW0uZnJvbSA9IHJlc3VsdC5sYXRpdHVkZSArICcsJyArIHJlc3VsdC5sb25naXR1ZGU7IGlmIChvcHRpb25zLnNpZykgeyByZXF1ZXN0UGFyYW0uc2lnID0gVXRpbHMuZ2V0U2lnKHJlcXVlc3RQYXJhbSwgb3B0aW9ucy5zaWcsICdkaXJlY3Rpb24nLCBvcHRpb25zLm1vZGUpIH0gd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7IHVybDogU0VUX1VSTF9ESVJFQ1RJT04sIGRhdGE6IHJlcXVlc3RQYXJhbSB9LCAnZGlyZWN0aW9uJykpIH07IFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpIH0gfTsgbW9kdWxlLmV4cG9ydHMgPSBRUU1hcFdYOyJdLCJzb3VyY2VSb290IjoiIn0=