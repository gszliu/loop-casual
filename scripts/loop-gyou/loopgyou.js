/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7981);

module.exports = parent;

/***/ }),

/***/ 2529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9390);

__webpack_require__(5892);

var entryUnbind = __webpack_require__(1305);

module.exports = entryUnbind('Array', 'flat');

/***/ }),

/***/ 1755:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(3642);

/***/ }),

/***/ 3642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7987);

module.exports = parent;

/***/ }),

/***/ 8257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

var tryToString = __webpack_require__(5637);

var $TypeError = TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 6288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var create = __webpack_require__(3590);

var defineProperty = (__webpack_require__(4615).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ 2569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(794);

var $String = String;
var $TypeError = TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};

/***/ }),

/***/ 5766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(2977);

var toAbsoluteIndex = __webpack_require__(6782);

var lengthOfArrayLike = __webpack_require__(1825); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 5289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(4521);

var isConstructor = __webpack_require__(2097);

var isObject = __webpack_require__(794);

var wellKnownSymbol = __webpack_require__(3649);

var SPECIES = wellKnownSymbol('species');
var $Array = Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? $Array : C;
};

/***/ }),

/***/ 4822:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(5289); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate


module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 3058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(8191);

var isCallable = __webpack_require__(9212);

var classofRaw = __webpack_require__(9624);

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),

/***/ 3478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2870);

var ownKeys = __webpack_require__(929);

var getOwnPropertyDescriptorModule = __webpack_require__(6683);

var definePropertyModule = __webpack_require__(4615);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ 57:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 4677:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 5999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPropertyKey = __webpack_require__(8734);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ 3746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

var createNonEnumerableProperty = __webpack_require__(57);

var makeBuiltIn = __webpack_require__(9594);

var defineGlobalProperty = __webpack_require__(2296);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);

  if (options.global) {
    if (simple) O[key] = value;else defineGlobalProperty(key, value);
  } else {
    if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value);
  }

  return O;
};

/***/ }),

/***/ 2296:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583); // eslint-disable-next-line es-x/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ 8494:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ 6668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 6768:
/***/ ((module) => {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};

/***/ }),

/***/ 6918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ 4061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var userAgent = __webpack_require__(6918);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ 1305:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

module.exports = function (CONSTRUCTOR, METHOD) {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};

/***/ }),

/***/ 5690:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 7263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getOwnPropertyDescriptor = (__webpack_require__(6683).f);

var createNonEnumerableProperty = __webpack_require__(57);

var defineBuiltIn = __webpack_require__(3746);

var defineGlobalProperty = __webpack_require__(2296);

var copyConstructorProperties = __webpack_require__(3478);

var isForced = __webpack_require__(4451);
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }

    defineBuiltIn(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 6544:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 1266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isArray = __webpack_require__(4521);

var lengthOfArrayLike = __webpack_require__(1825);

var doesNotExceedSafeInteger = __webpack_require__(6768);

var bind = __webpack_require__(2938); // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        doesNotExceedSafeInteger(targetIndex + 1);
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ 2938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var aCallable = __webpack_require__(8257);

var NATIVE_BIND = __webpack_require__(8987);

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 8987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ 8262:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 4340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var hasOwn = __webpack_require__(2870);

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 7386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 5897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 8272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(3058);

var getMethod = __webpack_require__(911);

var Iterators = __webpack_require__(339);

var wellKnownSymbol = __webpack_require__(3649);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),

/***/ 6307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var aCallable = __webpack_require__(8257);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var getIteratorMethod = __webpack_require__(8272);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),

/***/ 911:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(8257); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

/***/ }),

/***/ 7583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es-x/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 2870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toObject = __webpack_require__(1324);

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 4639:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 482:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ 275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544);

var createElement = __webpack_require__(6668); // Thanks to IE8 for its funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 5044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var classof = __webpack_require__(9624);

var $Object = Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;

/***/ }),

/***/ 9734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var isCallable = __webpack_require__(9212);

var store = __webpack_require__(1314);

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ 2743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(9491);

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var isObject = __webpack_require__(794);

var createNonEnumerableProperty = __webpack_require__(57);

var hasOwn = __webpack_require__(2870);

var shared = __webpack_require__(1314);

var sharedKey = __webpack_require__(9137);

var hiddenKeys = __webpack_require__(4639);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function set(it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget(store, it) || {};
  };

  has = function has(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var Iterators = __webpack_require__(339);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ 4521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(9624); // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe


module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

/***/ }),

/***/ 9212:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 2097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var classof = __webpack_require__(3058);

var getBuiltIn = __webpack_require__(5897);

var inspectSource = __webpack_require__(9734);

var noop = function noop() {
  /* empty */
};

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

/***/ }),

/***/ 4451:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 6268:
/***/ ((module) => {

module.exports = false;

/***/ }),

/***/ 5871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

var isCallable = __webpack_require__(9212);

var isPrototypeOf = __webpack_require__(2447);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

/***/ }),

/***/ 4026:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(2938);

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var isArrayIteratorMethod = __webpack_require__(114);

var lengthOfArrayLike = __webpack_require__(1825);

var isPrototypeOf = __webpack_require__(2447);

var getIterator = __webpack_require__(6307);

var getIteratorMethod = __webpack_require__(8272);

var iteratorClose = __webpack_require__(7093);

var $TypeError = TypeError;

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

/***/ }),

/***/ 7093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var getMethod = __webpack_require__(911);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

/***/ }),

/***/ 339:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(97); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 9594:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var hasOwn = __webpack_require__(2870);

var DESCRIPTORS = __webpack_require__(8494);

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(4340).CONFIGURABLE);

var inspectSource = __webpack_require__(9734);

var InternalStateModule = __webpack_require__(2743);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () {
    /* empty */
  }, 'length', {
    value: 8
  }).length !== 8;
});
var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }

  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;

  if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    defineProperty(value, 'name', {
      value: name,
      configurable: true
    });
  }

  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', {
      value: options.arity
    });
  }

  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', {
        writable: false
      }); // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) {
    /* empty */
  }

  var state = enforceInternalState(value);

  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  }

  return value;
}; // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required


Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

/***/ }),

/***/ 9021:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor; // `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe

module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

/***/ }),

/***/ 8640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(4061);

var fails = __webpack_require__(6544); // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 9491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var inspectSource = __webpack_require__(9734);

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

/***/ }),

/***/ 3590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(2569);

var definePropertiesModule = __webpack_require__(8728);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = __webpack_require__(4639);

var html = __webpack_require__(482);

var documentCreateElement = __webpack_require__(6668);

var sharedKey = __webpack_require__(9137);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function EmptyConstructor() {
  /* empty */
};

var scriptTag = function scriptTag(content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  }

  return _NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

/***/ }),

/***/ 8728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var definePropertyModule = __webpack_require__(4615);

var anObject = __webpack_require__(2569);

var toIndexedObject = __webpack_require__(2977);

var objectKeys = __webpack_require__(5432); // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe


exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    definePropertyModule.f(O, key = keys[index++], props[key]);
  }

  return O;
};

/***/ }),

/***/ 4615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var IE8_DOM_DEFINE = __webpack_require__(275);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var anObject = __webpack_require__(2569);

var toPropertyKey = __webpack_require__(8734);

var $TypeError = TypeError; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 6683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var call = __webpack_require__(8262);

var propertyIsEnumerableModule = __webpack_require__(112);

var createPropertyDescriptor = __webpack_require__(4677);

var toIndexedObject = __webpack_require__(2977);

var toPropertyKey = __webpack_require__(8734);

var hasOwn = __webpack_require__(2870);

var IE8_DOM_DEFINE = __webpack_require__(275); // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 9275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 4012:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 8356:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var hasOwn = __webpack_require__(2870);

var toIndexedObject = __webpack_require__(2977);

var indexOf = (__webpack_require__(5766).indexOf);

var hiddenKeys = __webpack_require__(4639);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }

  return result;
};

/***/ }),

/***/ 5432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 9953:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var uncurryThis = __webpack_require__(7386);

var objectKeys = __webpack_require__(5432);

var toIndexedObject = __webpack_require__(2977);

var $propertyIsEnumerable = (__webpack_require__(112).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push); // `Object.{ entries, values }` methods implementation

var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ 6252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var isCallable = __webpack_require__(9212);

var isObject = __webpack_require__(794);

var $TypeError = TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

var uncurryThis = __webpack_require__(7386);

var getOwnPropertyNamesModule = __webpack_require__(9275);

var getOwnPropertySymbolsModule = __webpack_require__(4012);

var anObject = __webpack_require__(2569);

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 3955:
/***/ ((module) => {

var $TypeError = TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 9137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(7836);

var uid = __webpack_require__(8284);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 1314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var defineGlobalProperty = __webpack_require__(2296);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});
module.exports = store;

/***/ }),

/***/ 7836:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6268);

var store = __webpack_require__(1314);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.22.8',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.22.8/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ 6782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 2977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(5044);

var requireObjectCoercible = __webpack_require__(3955);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 7486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(9021); // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity


module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- NaN check

  return number !== number || number === 0 ? 0 : trunc(number);
};

/***/ }),

/***/ 97:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 1324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(3955);

var $Object = Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 2670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var isObject = __webpack_require__(794);

var isSymbol = __webpack_require__(5871);

var getMethod = __webpack_require__(911);

var ordinaryToPrimitive = __webpack_require__(6252);

var wellKnownSymbol = __webpack_require__(3649);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 8734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(2670);

var isSymbol = __webpack_require__(5871); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 8191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ 5637:
/***/ ((module) => {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 8284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 7786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(8640);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ 7670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544); // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334


module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

/***/ }),

/***/ 3649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var shared = __webpack_require__(7836);

var hasOwn = __webpack_require__(2870);

var uid = __webpack_require__(8284);

var NATIVE_SYMBOL = __webpack_require__(8640);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 9390:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $ = __webpack_require__(7263);

var flattenIntoArray = __webpack_require__(1266);

var toObject = __webpack_require__(1324);

var lengthOfArrayLike = __webpack_require__(1825);

var toIntegerOrInfinity = __webpack_require__(7486);

var arraySpeciesCreate = __webpack_require__(4822); // `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat


$({
  target: 'Array',
  proto: true
}, {
  flat: function
    /* depthArg = 1 */
  flat() {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

/***/ }),

/***/ 5892:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(6288); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('flat');

/***/ }),

/***/ 6737:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var $entries = (__webpack_require__(9953).entries); // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries


$({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});

/***/ }),

/***/ 5809:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var iterate = __webpack_require__(4026);

var createProperty = __webpack_require__(5999); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: true
    });
    return obj;
  }
});

/***/ }),

/***/ 7981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(2529);

module.exports = parent;

/***/ }),

/***/ 4405:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "args": () => (/* binding */ args),
  "main": () => (/* binding */ main)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(6737);
// EXTERNAL MODULE: ./node_modules/core-js/features/array/flat.js
var flat = __webpack_require__(1755);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.from-entries.js
var es_object_from_entries = __webpack_require__(5809);
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTypes.js
/** THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseDefaultProperties.ts for more information */
var booleanProperties = ["abortOnChoiceWhenNotInChoice", "addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "gitInstallDependencies", "gitShowCommitMessages", "gitUpdateOnLogin", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_gitUpdated", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "madnessBakeryAvailable", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "overgrownLotAvailable", "pathedSummonsHardcore", "pathedSummonsSoftcore", "popularTartUnlocked", "potatoAlarmClockUsed", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "scriptCascadingMenus", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "skeletonStoreAvailable", "sleazeAirportAlways", "snojoAvailable", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "suppressInappropriateNags", "suppressPowerPixellation", "suppressMallPriceCacheMessages", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "trackVoteMonster", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useBookOfEverySkillHardcore", "useBookOfEverySkillSoftcore", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_bookOfEverySkillUsed", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lookingGlass", "_loveTunnelToday", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shrubDecorated", "_silverDreadFlaskUsed", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_telegraphOfficeToday", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758"];
var numericProperties = ["coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "ascensionsToday", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "barrelGoal", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "familiarSweat", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homemadeRobotUpgrades", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBarrelSmashed", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTr4pz0rQuest", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lovebugsAridDesert", "lovebugsBeachBuck", "lovebugsBooze", "lovebugsChroner", "lovebugsCoinspiracy", "lovebugsCyrpt", "lovebugsFreddy", "lovebugsFunFunds", "lovebugsHoboNickel", "lovebugsItemDrop", "lovebugsMeat", "lovebugsMeatDrop", "lovebugsMoxie", "lovebugsMuscle", "lovebugsMysticality", "lovebugsOilPeak", "lovebugsOrcChasm", "lovebugsPowder", "lovebugsWalmart", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "nuclearAutumnPoints", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "turtleBlessingTurns", "twinPeakProgress", "twoCRSPoints", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerCharge", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_clanFortuneConsultUses", "_clipartSummons", "_coldMedicineConsults", "_coldMedicineEquipmentTaken", "_companionshipCasts", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_lovebugsBeachBuck", "_lovebugsChroner", "_lovebugsCoinspiracy", "_lovebugsFreddy", "_lovebugsFunFunds", "_lovebugsHoboNickel", "_lovebugsWalmart", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_spelunkerCharges", "_spelunkingTalesDrops", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount"];
var monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"];
var locationProperties = ["currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation"];
var stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "lastRelayUpdate", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "afterAdventureScript", "autoOlfact", "autoPutty", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "barrelLayout", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "duckAreasCleared", "duckAreasSelected", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastCombatEnvironments", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "scriptMRUList", "seahorseName", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_pottedPowerPlant", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateGear", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"];
var numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475"];
var familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "stillsuitFamiliar"];
var statProperties = ["nsChallenge1", "snojoSetting"];
var phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTyping.js

var booleanPropertiesSet = new Set(booleanProperties);
var numericPropertiesSet = new Set(numericProperties);
var numericOrStringPropertiesSet = new Set(numericOrStringProperties);
var stringPropertiesSet = new Set(stringProperties);
var locationPropertiesSet = new Set(locationProperties);
var monsterPropertiesSet = new Set(monsterProperties);
var familiarPropertiesSet = new Set(familiarProperties);
var statPropertiesSet = new Set(statProperties);
var phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/property.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var createPropertyGetter = transform => (property, default_) => {
  var value = (0,external_kolmafia_namespaceObject.getProperty)(property);

  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

var createMafiaClassPropertyGetter = (Type, toType) => createPropertyGetter(value => {
  if (value === "") return null;
  var v = toType(value);
  return v === Type.none ? null : v;
});

var getString = createPropertyGetter(value => value);
var getCommaSeparated = createPropertyGetter(value => value.split(/, ?/));
var getBoolean = createPropertyGetter(value => value === "true");
var getNumber = createPropertyGetter(value => Number(value));
var getBounty = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Bounty, external_kolmafia_namespaceObject.toBounty);
var getClass = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Class, external_kolmafia_namespaceObject.toClass);
var getCoinmaster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Coinmaster, external_kolmafia_namespaceObject.toCoinmaster);
var getEffect = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Effect, external_kolmafia_namespaceObject.toEffect);
var getElement = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Element, external_kolmafia_namespaceObject.toElement);
var getFamiliar = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Familiar, external_kolmafia_namespaceObject.toFamiliar);
var getItem = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Item, external_kolmafia_namespaceObject.toItem);
var getLocation = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Location, external_kolmafia_namespaceObject.toLocation);
var getMonster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Monster, external_kolmafia_namespaceObject.toMonster);
var getPhylum = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Phylum, external_kolmafia_namespaceObject.toPhylum);
var getServant = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Servant, external_kolmafia_namespaceObject.toServant);
var getSkill = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Skill, external_kolmafia_namespaceObject.toSkill);
var getSlot = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Slot, external_kolmafia_namespaceObject.toSlot);
var getStat = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Stat, external_kolmafia_namespaceObject.toStat);
var getThrall = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Thrall, external_kolmafia_namespaceObject.toThrall);
function property_get(property, _default) {
  var value = getString(property); // Handle known properties.

  if (isBooleanProperty(property)) {
    var _getBoolean;

    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : false;
  } else if (isNumericProperty(property)) {
    var _getNumber;

    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else if (isLocationProperty(property)) {
    return getLocation(property, _default);
  } else if (isMonsterProperty(property)) {
    return getMonster(property, _default);
  } else if (isFamiliarProperty(property)) {
    return getFamiliar(property, _default);
  } else if (isStatProperty(property)) {
    return getStat(property, _default);
  } else if (isPhylumProperty(property)) {
    return getPhylum(property, _default);
  } else if (isStringProperty(property)) {
    return value;
  } // Not a KnownProperty from here on out.


  if (_default instanceof external_kolmafia_namespaceObject.Location) {
    return getLocation(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Monster) {
    return getMonster(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Familiar) {
    return getFamiliar(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Stat) {
    return getStat(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Phylum) {
    return getPhylum(property, _default);
  } else if (typeof _default === "boolean") {
    return value === "true" ? true : value === "false" ? false : _default;
  } else if (typeof _default === "number") {
    return value === "" ? _default : parseInt(value);
  } else if (value === "") {
    return _default === undefined ? "" : _default;
  } else {
    return value;
  }
} // eslint-disable-next-line @typescript-eslint/no-explicit-any

function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,external_kolmafia_namespaceObject.setProperty)(property, stringValue);
}


function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    _set(prop, value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(_ref => {
    var _ref2 = _slicedToArray(_ref, 1),
        prop = _ref2[0];

    return [prop, property_get(prop)];
  }));
  setProperties(properties);

  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  withProperties(_defineProperty({}, property, value), callback);
}
function withChoices(choices, callback) {
  var properties = Object.fromEntries(Object.entries(choices).map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2),
        choice = _ref4[0],
        option = _ref4[1];

    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var PropertiesManager = /*#__PURE__*/function () {
  function PropertiesManager() {
    _classCallCheck(this, PropertiesManager);

    _defineProperty(this, "properties", {});
  }

  _createClass(PropertiesManager, [{
    key: "storedValues",
    get: function get() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     * @param propertiesToSet A Properties object, keyed by property name.
     */

  }, {
    key: "set",
    value: function set(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            propertyName = _Object$entries2$_i[0],
            propertyValue = _Object$entries2$_i[1];

        if (this.properties[propertyName] === undefined) {
          this.properties[propertyName] = property_get(propertyName);
        }

        _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     * @param choicesToSet An object keyed by choice adventure number.
     */

  }, {
    key: "setChoices",
    value: function setChoices(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(_ref5 => {
        var _ref6 = _slicedToArray(_ref5, 2),
            choiceNumber = _ref6[0],
            choiceValue = _ref6[1];

        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Sets a single choice adventure property to the given value, storing the old value.
     * @param choiceToSet The number of the choice adventure to set the property for.
     * @param value The value to assign to that choice adventure.
     */

  }, {
    key: "setChoice",
    value: function setChoice(choiceToSet, value) {
      this.setChoices(_defineProperty({}, choiceToSet, value));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     * @param properties Collection of properties to reset.
     */

  }, {
    key: "reset",
    value: function reset() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }

      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var property = _properties[_i3];
        var value = this.properties[property];

        if (value) {
          _set(property, value);
        }
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */

  }, {
    key: "resetAll",
    value: function resetAll() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     * @param properties Properties for the manager to forget.
     */

  }, {
    key: "clear",
    value: function clear() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        properties[_key2] = arguments[_key2];
      }

      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var property = _properties2[_i4];

        if (this.properties[property]) {
          delete this.properties[property];
        }
      }
    }
    /**
     * Clears all properties.
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMinimumValue",
    value: function setMinimumValue(property, value) {
      if (property_get(property, 0) < value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMaximumValue",
    value: function setMaximumValue(property, value) {
      if (property_get(property, 0) > value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Creates a new PropertiesManager with identical stored values to this one.
     * @returns A new PropertiesManager, with identical stored values to this one.
     */

  }, {
    key: "clone",
    value: function clone() {
      var newGuy = new PropertiesManager();
      newGuy.properties = this.storedValues;
      return newGuy;
    }
    /**
     * Clamps a numeric property, modulating it up or down to fit within a specified range
     * @param property The numeric property to clamp
     * @param min The lower bound for what we want the property to be allowed to be.
     * @param max The upper bound for what we want the property to be allowed to be.
     * @returns Whether we ended up changing the property or not.
     */

  }, {
    key: "clamp",
    value: function clamp(property, min, max) {
      if (max < min) return false;
      var start = property_get(property);
      this.setMinimumValue(property, min);
      this.setMaximumValue(property, max);
      return start !== property_get(property);
    }
    /**
     * Determines whether this PropertiesManager has identical stored values to another.
     * @param other The PropertiesManager to compare to this one.
     * @returns Whether their StoredValues are identical.
     */

  }, {
    key: "equals",
    value: function equals(other) {
      var thisProps = Object.entries(this.storedValues);
      var otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size) return false;

      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2),
            propertyName = _thisProps$_i[0],
            propertyValue = _thisProps$_i[1];

        if (otherProps.get(propertyName) === propertyValue) return false;
      }

      return true;
    }
    /**
     * Merges a PropertiesManager onto this one, letting the input win in the event that both PropertiesManagers have a value stored.
     * @param other The PropertiesManager to be merged onto this one.
     * @returns A new PropertiesManager with stored values from both its parents.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var newGuy = new PropertiesManager();
      newGuy.properties = _objectSpread(_objectSpread({}, this.properties), other.properties);
      return newGuy;
    }
    /**
     * Merges an arbitrary collection of PropertiesManagers, letting the rightmost PropertiesManager win in the event of verlap.
     * @param mergees The PropertiesManagers to merge together.
     * @returns A PropertiesManager that is just an amalgam of all the constituents.
     */

  }], [{
    key: "merge",
    value: function merge() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        mergees[_key3] = arguments[_key3];
      }

      if (mergees.length === 0) return new PropertiesManager();
      return mergees.reduce((a, b) => a.merge(b));
    }
  }]);

  return PropertiesManager;
}();
;// CONCATENATED MODULE: ./node_modules/libram/dist/utils.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || utils_unsupportedIterableToArray(arr, i) || utils_nonIterableRest(); }

function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || utils_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return utils_arrayLikeToArray(arr); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */

function chunk(array, chunkSize) {
  var result = [];

  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array)) return array;
  var map = new Map();
  array.forEach(item => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  return map;
}
function countedMapToArray(map) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(_toConsumableArray(map).map(_ref2 => {
    var _ref3 = utils_slicedToArray(_ref2, 2),
        item = _ref3[0],
        quantity = _ref3[1];

    return Array(quantity).fill(item);
  })));
}
function countedMapToString(map) {
  return _toConsumableArray(map).map(_ref4 => {
    var _ref5 = utils_slicedToArray(_ref4, 2),
        item = _ref5[0],
        quantity = _ref5[1];

    return "".concat(quantity, " x ").concat(item);
  }).join(", ");
}
/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction function to turn elements into numbers
 */

function sum(addends, mappingFunction) {
  return addends.reduce((subtotal, element) => subtotal + mappingFunction(element), 0);
}
function sumNumbers(addends) {
  return sum(addends, x => x);
}
/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 * @param item Needle
 * @param array Readonly array haystack
 * @returns Whether the item is in the array, and narrows the type of the item.
 */

function arrayContains(item, array) {
  return array.includes(item);
}
/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */

function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort();

  var sortedB = _toConsumableArray(b).sort();

  return a.length === b.length && sortedA.every((item, index) => item === sortedB[index]);
}
/**
 * Reverses keys and values for a given map
 * @param map Map to invert
 */

function invertMap(map) {
  var returnValue = new Map();

  var _iterator = _createForOfIteratorHelper(map),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = utils_slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}
/**
 * Creates a Type Guard function for a string union type defined via an array as const.
 */

function createStringUnionTypeGuardFunction(array) {
  return function (x) {
    return array.includes(x);
  };
}
/**
 * Splits a string by commas while also respecting escaping commas with a backslash
 * @param str String to split
 * @returns List of tokens
 */

function splitByCommasWithEscapes(str) {
  var returnValue = [];
  var ignoreNext = false;
  var currentString = "";

  var _iterator2 = _createForOfIteratorHelper(str.split("")),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var char = _step2.value;

      if (char === "\\") {
        ignoreNext = true;
      } else {
        if (char == "," && !ignoreNext) {
          returnValue.push(currentString.trim());
          currentString = "";
        } else {
          currentString += char;
        }

        ignoreNext = false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  returnValue.push(currentString.trim());
  return returnValue;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/template-string.js



var concatTemplateString = function concatTemplateString(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    placeholders[_key - 1] = arguments[_key];
  }

  return literals.raw.reduce((acc, literal, i) => {
    var _placeholders$i;

    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
};

var createSingleConstant = Type => {
  var tagFunction = function tagFunction(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      placeholders[_key2 - 1] = arguments[_key2];
    }

    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    return Type.get(input);
  };

  tagFunction.none = Type.none;
  return tagFunction;
};

var createPluralConstant = Type => function (literals) {
  for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    placeholders[_key3 - 1] = arguments[_key3];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));

  if (input === "") {
    return Type.all();
  }

  return Type.get(splitByCommasWithEscapes(input));
};
/**
 * A Bounty specified by name.
 *
 * @category In-game constant
 */


var $bounty = createSingleConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */

var $bounties = createPluralConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A Class specified by name.
 *
 * @category In-game constant
 */

var $class = createSingleConstant(external_kolmafia_namespaceObject.Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */

var $classes = createPluralConstant(external_kolmafia_namespaceObject.Class);
/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */

var $coinmaster = createSingleConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */

var $coinmasters = createPluralConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */

var $effect = createSingleConstant(external_kolmafia_namespaceObject.Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */

var $effects = createPluralConstant(external_kolmafia_namespaceObject.Effect);
/**
 * An Element specified by name.
 *
 * @category In-game constant
 */

var $element = createSingleConstant(external_kolmafia_namespaceObject.Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */

var $elements = createPluralConstant(external_kolmafia_namespaceObject.Element);
/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */

var template_string_$familiar = createSingleConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */

var $familiars = createPluralConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * An Item specified by name.
 *
 * @category In-game constant
 */

var template_string_$item = createSingleConstant(external_kolmafia_namespaceObject.Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */

var template_string_$items = createPluralConstant(external_kolmafia_namespaceObject.Item);
/**
 * A Location specified by name.
 *
 * @category In-game constant
 */

var $location = createSingleConstant(external_kolmafia_namespaceObject.Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */

var $locations = createPluralConstant(external_kolmafia_namespaceObject.Location);
/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */

var $monster = createSingleConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */

var $monsters = createPluralConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */

var $phylum = createSingleConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */

var $phyla = createPluralConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */

var $servant = createSingleConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */

var $servants = createPluralConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */

var $skill = createSingleConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */

var $skills = createPluralConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */

var $slot = createSingleConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */

var $slots = createPluralConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */

var $stat = createSingleConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */

var $stats = createPluralConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */

var $thrall = createSingleConstant(external_kolmafia_namespaceObject.Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */

var $thralls = createPluralConstant(external_kolmafia_namespaceObject.Thrall);
;// CONCATENATED MODULE: ./node_modules/libram/dist/lib.js
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33;

function lib_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function lib_createClass(Constructor, protoProps, staticProps) { if (protoProps) lib_defineProperties(Constructor.prototype, protoProps); if (staticProps) lib_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function lib_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function lib_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = lib_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function lib_slicedToArray(arr, i) { return lib_arrayWithHoles(arr) || lib_iterableToArrayLimit(arr, i) || lib_unsupportedIterableToArray(arr, i) || lib_nonIterableRest(); }

function lib_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function lib_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return lib_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return lib_arrayLikeToArray(o, minLen); }

function lib_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function lib_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function lib_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** @module GeneralLibrary */






/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 */

function getSongLimit() {
  return 3 + (booleanModifier("Four Songs") ? 1 : 0) + numericModifier("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  if (skillOrEffect instanceof external_kolmafia_namespaceObject.Effect && skillOrEffect.attributes.includes("song")) {
    return true;
  } else {
    var skill = skillOrEffect instanceof external_kolmafia_namespaceObject.Effect ? (0,external_kolmafia_namespaceObject.toSkill)(skillOrEffect) : skillOrEffect;
    return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
  }
}
/**
 * List all active Effects
 *
 * @category General
 */

function getActiveEffects() {
  return Object.keys(myEffects()).map(e => Effect.get(e));
}
/**
 * List currently active Accordion Thief songs
 *
 * @category General
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 *
 * @category General
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Returns true if the player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 */

function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(location => monster.name in appearanceRates(location));
}
/**
 * Return the player's remaining liver space
 *
 * @category General
 */

function getRemainingLiver() {
  return inebrietyLimit() - myInebriety();
}
/**
 * Return the player's remaining stomach space
 *
 * @category General
 */

function getRemainingStomach() {
  return fullnessLimit() - myFullness();
}
/**
 * Return the player's remaining spleen space
 *
 * @category General
 */

function getRemainingSpleen() {
  return spleenLimit() - mySpleenUse();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Number to check that the player has
 */

function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (thing instanceof external_kolmafia_namespaceObject.Effect) {
    return (0,external_kolmafia_namespaceObject.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Familiar) {
    return (0,external_kolmafia_namespaceObject.haveFamiliar)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Item) {
    return (0,external_kolmafia_namespaceObject.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Servant) {
    return (0,external_kolmafia_namespaceObject.haveServant)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Skill) {
    return (0,external_kolmafia_namespaceObject.haveSkill)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Thrall) {
    var thrall = (0,external_kolmafia_namespaceObject.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 *
 * @category General
 * @param item The item mafia uses to represent the campground item
 */

function haveInCampground(item) {
  return Object.keys(getCampground()).map(i => Item.get(i)).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 *
 * @category General
 */

function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxTurns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Return whether the player has the queried wandering counter
 *
 * @category Wanderers
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 */

function isVoteWandererNow() {
  return totalTurnsPlayed() % 11 === 1 && get("lastVoteMonsterTurn") < totalTurnsPlayed();
}
/**
 * Tells us whether we can expect a given wanderer now. Behaves differently
 * for different types of wanderer.
 *
 * - For deterministic wanderers, return whether the player will encounter
 *   the queried wanderer on the next turn
 *
 * - For variable wanderers (window), return whether the player is within
 *   an encounter window for the queried wanderer
 *
 * - For variable wanderers (chance per turn), returns true unless the player
 *   has exhausted the number of wanderers possible
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer === Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return get("_hipsterAdv") < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 */

function getKramcoWandererChance() {
  var fights = property_get("_sausageFights");
  var lastFight = property_get("_lastSausageMonsterTurn");
  var totalTurns = (0,external_kolmafia_namespaceObject.totalTurnsPlayed)();

  if (fights < 1) {
    return lastFight === totalTurns && (0,external_kolmafia_namespaceObject.myTurncount)() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 */

function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv");
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = get("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - myTurncount();
    return 1.0 / window;
  }

  return 0.0;
}
/**
 * Returns true if the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 */

function isCurrentFamiliar(familiar) {
  return myFamiliar() === familiar;
}
/**
 * Returns the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 */

function getFoldGroup(item) {
  return Object.entries(getRelated(item, "fold")).sort((_ref, _ref2) => {
    var _ref3 = lib_slicedToArray(_ref, 2),
        a = _ref3[1];

    var _ref4 = lib_slicedToArray(_ref2, 2),
        b = _ref4[1];

    return a - b;
  }).map(_ref5 => {
    var _ref6 = lib_slicedToArray(_ref5, 1),
        i = _ref6[0];

    return Item.get(i);
  });
}
/**
 * Returns the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 */

function getZapGroup(item) {
  return Object.keys(getRelated(item, "zap")).map(i => Item.get(i));
}
/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 */

function getBanishedMonsters() {
  var banishes = chunk(property_get("banishedMonsters").split(":"), 3);
  var result = new Map();

  var _iterator = lib_createForOfIteratorHelper(banishes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = lib_slicedToArray(_step.value, 2),
          foe = _step$value[0],
          banisher = _step$value[1];

      if (foe === undefined || banisher === undefined) break; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

      var banisherItem = (0,external_kolmafia_namespaceObject.toItem)(banisher);

      if (banisher.toLowerCase() === "saber force") {
        result.set($skill(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Use the Force"]))), external_kolmafia_namespaceObject.Monster.get(foe));
      } else if ([external_kolmafia_namespaceObject.Item.none, external_kolmafia_namespaceObject.Item.get("training scroll:  Snokebomb"), external_kolmafia_namespaceObject.Item.get("tomayohawk-style reflex hammer"), null].includes(banisherItem)) {
        if (external_kolmafia_namespaceObject.Skill.get(banisher) === $skill.none) {
          break;
        } else {
          result.set(external_kolmafia_namespaceObject.Skill.get(banisher), external_kolmafia_namespaceObject.Monster.get(foe));
        }
      } else {
        result.set(banisherItem, external_kolmafia_namespaceObject.Monster.get(foe));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
/**
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */

function canUse(item) {
  var path = myPath();

  if (path !== "Nuclear Autumn") {
    if ($items(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item)) {
      return false;
    }
  }

  if (path === "G-Lover") {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === "Bees Hate You") {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}
/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 */

function noneToNull(thing) {
  if (thing instanceof Effect) {
    return thing === Effect.none ? null : thing;
  }

  if (thing instanceof Familiar) {
    return thing === Familiar.none ? null : thing;
  }

  if (thing instanceof Item) {
    return thing === Item.none ? null : thing;
  }

  return thing;
}
/**
 * Return the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 */

function getAverage(range) {
  var _range$match;

  if (range.indexOf("-") < 0) return Number(range);

  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"],
      _ref8 = lib_slicedToArray(_ref7, 3),
      lower = _ref8[1],
      upper = _ref8[2];

  return (Number(lower) + Number(upper)) / 2;
}
/**
 * Return average adventures expected from consuming an item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 */

function getAverageAdventures(item) {
  return getAverage(item.adventures);
}
/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 */

function uneffect(effect) {
  return (0,external_kolmafia_namespaceObject.cliExecute)("uneffect ".concat(effect.name));
}
/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @returns Object containing id and name of player
 */

function getPlayerFromIdOrName(idOrName) {
  var id = typeof idOrName === "number" ? idOrName : parseInt(getPlayerId(idOrName));
  return {
    name: getPlayerName(id),
    id: id
  };
}
/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 */

function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished" || stringStep === "") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw new Error("Quest state parsing error.");
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
var EnsureError = /*#__PURE__*/function (_Error) {
  _inherits(EnsureError, _Error);

  var _super = _createSuper(EnsureError);

  function EnsureError(cause, reason) {
    var _this;

    lib_classCallCheck(this, EnsureError);

    _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : ""));
    _this.name = "Ensure Error";
    return _this;
  }

  return lib_createClass(EnsureError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Tries to get an effect using the default method
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 *
 * @throws {EnsureError} Throws an error if the effect cannot be guaranteed
 */

function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) < turns) {
    if (ef.default === null) {
      throw new EnsureError(ef, "No default action");
    }

    if (!(0,external_kolmafia_namespaceObject.cliExecute)(ef.default) || (0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
      throw new EnsureError(ef);
    }
  }
}
var valueMap = new Map();
var MALL_VALUE_MODIFIER = 0.9;
/**
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
 */

function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items.map(item => {
    if (valueMap.has(item)) return valueMap.get(item) || 0;

    if (item.discardable) {
      valueMap.set(item, (0,external_kolmafia_namespaceObject.mallPrice)(item) > Math.max(2 * (0,external_kolmafia_namespaceObject.autosellPrice)(item), 100) ? MALL_VALUE_MODIFIER * (0,external_kolmafia_namespaceObject.mallPrice)(item) : (0,external_kolmafia_namespaceObject.autosellPrice)(item));
    } else {
      valueMap.set(item, (0,external_kolmafia_namespaceObject.mallPrice)(item) > 100 ? MALL_VALUE_MODIFIER * (0,external_kolmafia_namespaceObject.mallPrice)(item) : 0);
    }

    return valueMap.get(item) || 0;
  }).reduce((s, price) => s + price, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};
/**
 * Returns the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 * @param familiar The familiar whose leprechaun multiplier you're interested in
 */

function findLeprechaunMultiplier(familiar) {
  if (familiar === $familiar(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Mutant Cactus Bud"])))) {
    return numericModifier(familiar, "Leprechaun Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var meatBonus = numericModifier(familiar, "Meat Drop", 1, $item.none);
  if (meatBonus === 0) return 0;
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
/**
 * Returns the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 * @param familiar The familiar whose fairy multiplier you're interested in
 */

function findFairyMultiplier(familiar) {
  if (familiar === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Mutant Fire Ant"])))) {
    return numericModifier(familiar, "Fairy Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var itemBonus = numericModifier(familiar, "Item Drop", 1, $item.none);
  if (itemBonus === 0) return 0;
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0,external_kolmafia_namespaceObject.holiday)().split("/").map(holiday => {
    var _holidayWanderers$get;

    return (_holidayWanderers$get = holidayWanderers.get(holiday)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
/**
 * Determines & returns whether or not we can safely call visitUrl(), based on whether we're in a fight, multi-fight, choice, etc
 */

function canVisitUrl() {
  return !(currentRound() || inMultiFight() || choiceFollowsFight() || handlingChoice());
}
/**
 * Calculate damage taken from a specific element after factoring in resistance
 * @param baseDamage
 * @param element
 * @returns damage after factoring in resistances
 */

function damageTakenByElement(baseDamage, element) {
  if (baseDamage < 0) return 1;
  var res = elementalResistance(element);
  return Math.max(1, Math.ceil(baseDamage - baseDamage * res / 100));
}
var telescopeStats = new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Moxie"])))]]);
var telescopeElements = new Map([["people, all of whom appear to be on fire", $element(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap1 = new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap2 = new Map([["smoke rising from deeper within the maze", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap3 = new Map([["with lava slowly oozing out of it", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["cold"])))]]);
/**
 * @returns An object with all information the telescope gives you about the sorceress's contests and maze
 */

function telescope() {
  return {
    statContest: telescopeStats.get(get("telescope1")),
    elementContest: telescopeElements.get(get("telescope2")),
    hedge1: hedgeTrap1.get(get("telescope3")),
    hedge2: hedgeTrap2.get(get("telescope4")),
    hedge3: hedgeTrap3.get(get("telescope5"))
  };
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/combat.js
var combat_templateObject, combat_templateObject2;

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = combat_getPrototypeOf(object); if (object === null) break; } return object; }

function combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function combat_toConsumableArray(arr) { return combat_arrayWithoutHoles(arr) || combat_iterableToArray(arr) || combat_unsupportedIterableToArray(arr) || combat_nonIterableSpread(); }

function combat_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return combat_arrayLikeToArray(o, minLen); }

function combat_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function combat_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return combat_arrayLikeToArray(arr); }

function combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function combat_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) combat_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) combat_setPrototypeOf(subClass, superClass); }

function combat_createSuper(Derived) { var hasNativeReflectConstruct = combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return combat_possibleConstructorReturn(this, result); }; }

function combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return combat_assertThisInitialized(self); }

function combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function combat_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; combat_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !combat_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return combat_construct(Class, arguments, combat_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return combat_setPrototypeOf(Wrapper, Class); }; return combat_wrapNativeSuper(Class); }

function combat_construct(Parent, args, Class) { if (combat_isNativeReflectConstruct()) { combat_construct = Reflect.construct.bind(); } else { combat_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) combat_setPrototypeOf(instance, Class.prototype); return instance; }; } return combat_construct.apply(null, arguments); }

function combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function combat_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function combat_setPrototypeOf(o, p) { combat_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return combat_setPrototypeOf(o, p); }

function combat_getPrototypeOf(o) { combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return combat_getPrototypeOf(o); }

function combat_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,external_kolmafia_namespaceObject.xpath)((0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0,external_kolmafia_namespaceObject.xpath)(newMacroText, "//input[@name=macroid]/@value")[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? external_kolmafia_namespaceObject.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems = template_string_$items(combat_templateObject || (combat_templateObject = combat_taggedTemplateLiteral(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom"])));
var substringCombatSkills = $skills(combat_templateObject2 || (combat_templateObject2 = combat_taggedTemplateLiteral(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow"])));

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ? item.name : (0,external_kolmafia_namespaceObject.toInt)(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return "hascombatitem ".concat(itemOrItems);
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return external_kolmafia_namespaceObject.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill) ? skill.name : (0,external_kolmafia_namespaceObject.toInt)(skill);
}

var InvalidMacroError = /*#__PURE__*/function (_Error) {
  combat_inherits(InvalidMacroError, _Error);

  var _super = combat_createSuper(InvalidMacroError);

  function InvalidMacroError() {
    combat_classCallCheck(this, InvalidMacroError);

    return _super.apply(this, arguments);
  }

  return combat_createClass(InvalidMacroError);
}( /*#__PURE__*/combat_wrapNativeSuper(Error));
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */

var Macro = /*#__PURE__*/function () {
  function Macro() {
    combat_classCallCheck(this, Macro);

    combat_defineProperty(this, "components", []);

    combat_defineProperty(this, "name", MACRO_NAME);
  }

  combat_createClass(Macro, [{
    key: "toString",
    value:
    /**
     * Convert macro to string.
     */
    function toString() {
      return (this.components.join(";") + ";").replace(/;;+/g, ";");
    }
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The previous name assigned to this macro.
     */

  }, {
    key: "rename",
    value: function rename(name) {
      var returnValue = this.name;
      this.name = name;
      return returnValue;
    }
    /**
     * Save a macro to a Mafia property for use in a consult script.
     */

  }, {
    key: "save",
    value: function save() {
      _set(Macro.SAVED_MACRO_PROPERTY, this.toString());
    }
    /**
     * Load a saved macro from the Mafia property.
     */

  }, {
    key: "step",
    value:
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
    function step() {
      var _ref, _this$components;

      for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {
        nextSteps[_key] = arguments[_key];
      }

      var nextStepsStrings = (_ref = []).concat.apply(_ref, combat_toConsumableArray(nextSteps.map(x => x instanceof Macro ? x.components : [x])));

      (_this$components = this.components).push.apply(_this$components, combat_toConsumableArray(nextStepsStrings.filter(s => s.length > 0)));

      return this;
    }
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "submit",
    value:
    /**
     * Submit the built macro to KoL. Only works inside combat.
     */
    function submit() {
      var final = this.toString();
      return (0,external_kolmafia_namespaceObject.visitUrl)("fight.php?action=macro&macrotext=".concat((0,external_kolmafia_namespaceObject.urlEncode)(final)), true, true);
    }
    /**
     * Set this macro as a KoL native autoattack.
     */

  }, {
    key: "setAutoAttack",
    value: function setAutoAttack() {
      var id = Macro.cachedMacroIds.get(this.name);

      if (id === undefined) {
        id = getMacroId(this.name);
        Macro.cachedMacroIds.set(this.name, id);
      }

      if ((0,external_kolmafia_namespaceObject.getAutoAttack)() === 99000000 + id && this.toString() === Macro.cachedAutoAttacks.get(this.name)) {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.name), "&macrotext=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.toString()), "&action=save"), true, true);
      (0,external_kolmafia_namespaceObject.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99000000 + id, "&ajax=1"));
      Macro.cachedAutoAttacks.set(this.name, this.toString());
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */

  }, {
    key: "setAutoAttackAs",
    value: function setAutoAttackAs(name) {
      this.name = name;
      this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */

  }, {
    key: "abort",
    value:
    /**
     * Add an "abort" step to this macro.
     * @returns {Macro} This object itself.
     */
    function abort() {
      return this.step("abort");
    }
    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "runaway",
    value:
    /**
     * Add a "runaway" step to this macro.
     * @returns {Macro} This object itself.
     */
    function runaway() {
      return this.step("runaway");
    }
    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "if_",
    value:
    /**
     * Add an "if" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function if_(condition, ifTrue) {
      var ballsCondition = "";

      if (condition instanceof external_kolmafia_namespaceObject.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof Array) {
        ballsCondition = condition.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        ballsCondition = "(".concat(ballsCondition, ")");
      } else if (condition instanceof external_kolmafia_namespaceObject.Effect) {
        ballsCondition = "haseffect ".concat((0,external_kolmafia_namespaceObject.toInt)(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof external_kolmafia_namespaceObject.Class) {
        if ((0,external_kolmafia_namespaceObject.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof external_kolmafia_namespaceObject.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      return this.step("if ".concat(ballsCondition)).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "while_",
    value:
    /**
     * Add a "while" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
    function while_(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }
    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "externalIf",
    value:
    /**
     * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
    function externalIf(condition, ifTrue, ifFalse) {
      if (condition) return this.step(ifTrue);else if (ifFalse) return this.step(ifFalse);else return this;
    }
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "repeat",
    value:
    /**
     * Add a repeat step to the macro.
     * @returns {Macro} This object itself.
     */
    function repeat() {
      return this.step("repeat");
    }
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "skill",
    value: function skill() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        skills[_key2] = arguments[_key2];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return "skill ".concat(skillBallsMacroName(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
    function trySkill() {
      for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        skills[_key3] = arguments[_key3];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
    function trySkillRepeat() {
      for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        skills[_key4] = arguments[_key4];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill).repeat());
      })));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function item() {
      for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        items[_key5] = arguments[_key5];
      }

      return this.step.apply(this, combat_toConsumableArray(items.map(itemOrItems => {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function tryItem() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }

      return this.step.apply(this, combat_toConsumableArray(items.map(item => {
        return Macro.if_(itemOrItemsBallsMacroPredicate(item), "use ".concat(itemOrItemsBallsMacroName(item)));
      })));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "attack",
    value:
    /**
     * Add an attack step to the macro.
     * @returns {Macro} This object itself.
     */
    function attack() {
      return this.step("attack");
    }
    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
     * @param macro The macro to place in the if_ statement
     */
    function ifHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this;
      return this.if_(todaysWanderers.map(monster => "monsterid ".concat(monster.id)).join(" || "), macro);
    }
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }, {
    key: "ifNotHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
     * @param macro The macro to place in the if_ statement.
     */
    function ifNotHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this.step(macro);
      return this.if_(todaysWanderers.map(monster => "!monsterid ".concat(monster.id)).join(" && "), macro);
    }
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }], [{
    key: "load",
    value: function load() {
      var _this;

      return (_this = new this()).step.apply(_this, combat_toConsumableArray(property_get(Macro.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */

  }, {
    key: "clearSaved",
    value: function clearSaved() {
      (0,external_kolmafia_namespaceObject.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function step() {
      var _this2;

      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function clearAutoAttackMacros() {
      var _iterator = combat_createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _Macro$cachedMacroIds;

          var name = _step.value;
          var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));
          Macro.cachedAutoAttacks.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function abort() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function runaway() {
      return new this().runaway();
    }
  }, {
    key: "if_",
    value: function if_(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function while_(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function skill() {
      var _this3;

      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this4;

      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this5;

      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this6;

      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this7;

      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function attack() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function ifHolidayWanderer(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function ifNotHolidayWanderer(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]);

  return Macro;
}();
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

combat_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");

combat_defineProperty(Macro, "cachedMacroIds", new Map());

combat_defineProperty(Macro, "cachedAutoAttacks", new Map());

function adventureMacro(loc, macro) {
  macro.save();
  setAutoAttack(0);

  try {
    adv1(loc, 0, "");

    while (inMultiFight()) {
      runCombat();
    }

    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro;

  var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();

  try {
    adv1(loc, 0, "");

    while (inMultiFight()) {
      runCombat();
    }

    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_Macro) {
  combat_inherits(StrictMacro, _Macro);

  var _super2 = combat_createSuper(StrictMacro);

  function StrictMacro() {
    combat_classCallCheck(this, StrictMacro);

    return _super2.apply(this, arguments);
  }

  combat_createClass(StrictMacro, [{
    key: "skill",
    value:
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
    function skill() {
      var _get2;

      for (var _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        skills[_key7] = arguments[_key7];
      }

      return (_get2 = _get(combat_getPrototypeOf(StrictMacro.prototype), "skill", this)).call.apply(_get2, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function item() {
      var _get3;

      for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        items[_key8] = arguments[_key8];
      }

      return (_get3 = _get(combat_getPrototypeOf(StrictMacro.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkill() {
      var _get4;

      for (var _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        skills[_key9] = arguments[_key9];
      }

      return (_get4 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function tryItem() {
      var _get5;

      for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        items[_key10] = arguments[_key10];
      }

      return (_get5 = _get(combat_getPrototypeOf(StrictMacro.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkillRepeat() {
      var _get6;

      for (var _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        skills[_key11] = arguments[_key11];
      }

      return (_get6 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */

  }], [{
    key: "skill",
    value: function skill() {
      var _this8;

      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this9;

      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this10;

      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this11;

      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this12;

      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]);

  return StrictMacro;
}(Macro)));
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/args.js
function args_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = args_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function args_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return args_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return args_arrayLikeToArray(o, minLen); }

function args_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function args_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function args_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? args_ownKeys(Object(source), !0).forEach(function (key) { args_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : args_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function args_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function args_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function args_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function args_createClass(Constructor, protoProps, staticProps) { if (protoProps) args_defineProperties(Constructor.prototype, protoProps); if (staticProps) args_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Args = /*#__PURE__*/function () {
  function Args() {
    args_classCallCheck(this, Args);
  }

  args_createClass(Args, null, [{
    key: "custom",
    value: function custom(spec, parser, valueHelpName) {
      if ("default" in spec && spec.options) {
        if (!spec.options.map(option => option[0]).includes(spec.default)) {
          throw "Invalid default value ".concat(spec.default);
        }
      }

      return args_objectSpread(args_objectSpread({}, spec), {}, {
        valueHelpName: valueHelpName,
        parser: parser
      });
    }
  }, {
    key: "string",
    value: function string(spec) {
      return this.custom(spec, value => value, "TEXT");
    }
  }, {
    key: "number",
    value: function number(spec) {
      return this.custom(spec, value => isNaN(Number(value)) ? undefined : Number(value), "NUMBER");
    }
  }, {
    key: "boolean",
    value: function boolean(spec) {
      return this.custom(spec, value => {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return undefined;
      }, "BOOLEAN");
    }
  }, {
    key: "flag",
    value: function flag(spec) {
      return this.custom(spec, value => {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return undefined;
      }, "FLAG");
    }
    /**
     * Create a set of input arguments for a script.
     * @param scriptName Prefix for property names; often the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others).
     * @returns An object which can hold parsed argument values. The keys of this
     *    object are identical to the keys in 'args'.
     */

  }, {
    key: "create",
    value: function create(scriptName, scriptHelp, args) {
      var _res;

      var _a, _b;

      for (var k in args) {
        if (k === "help" || args[k].key === "help") throw "help is a reserved argument name";
      }

      var argsWithHelp = args_objectSpread(args_objectSpread({}, args), {}, {
        help: this.flag({
          help: "Show this message and exit.",
          setting: ""
        })
      });

      var res = (_res = {}, args_defineProperty(_res, specSymbol, argsWithHelp), args_defineProperty(_res, scriptSymbol, scriptName), args_defineProperty(_res, scriptHelpSymbol, scriptHelp), _res); // Fill the default values for each argument.

      for (var _k in argsWithHelp) {
        var v = argsWithHelp[_k];
        if ("default" in v) res[_k] = v["default"];else res[_k] = undefined;
      } // Parse values from settings.


      for (var _k2 in argsWithHelp) {
        var setting = (_a = argsWithHelp[_k2].setting) !== null && _a !== void 0 ? _a : "".concat(scriptName, "_").concat((_b = argsWithHelp[_k2].key) !== null && _b !== void 0 ? _b : _k2);
        if (setting === "") continue; // no setting

        var value_str = property_get(setting, "");
        if (value_str === "") continue;
        res[_k2] = parseAndValidate(argsWithHelp[_k2], "Setting ".concat(setting), value_str);
      }

      return res;
    }
    /**
     * Parse the command line input into the provided script arguments.
     * @param args An object to hold the parsed argument values, from Args.create(*).
     * @param command The command line input.
     */

  }, {
    key: "fill",
    value: function fill(args, command) {
      var _a, _b, _c;

      if (command === undefined || command === "") return;
      var spec = args[specSymbol];
      var keys = new Set();
      var flags = new Set();

      for (var k in spec) {
        if (spec[k].valueHelpName === "FLAG") flags.add((_a = spec[k].key) !== null && _a !== void 0 ? _a : k);else keys.add((_b = spec[k].key) !== null && _b !== void 0 ? _b : k);
      } // Parse new argments from the command line


      var parsed = new CommandParser(command, keys, flags).parse();

      for (var _k3 in spec) {
        var key = (_c = spec[_k3].key) !== null && _c !== void 0 ? _c : _k3;
        var value_str = parsed.get(key);
        if (value_str === undefined) continue; // eslint-disable-next-line @typescript-eslint/no-explicit-any

        args[_k3] = parseAndValidate(spec[_k3], "Argument ".concat(key), value_str);
      }
    }
    /**
     * Parse command line input into a new set of script arguments.
     * @param scriptName Prefix to use in property names; typically the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param spec An object specifying the script arguments.
     * @param command The command line input.
     */

  }, {
    key: "parse",
    value: function parse(scriptName, scriptHelp, spec, command) {
      var args = this.create(scriptName, scriptHelp, spec);
      this.fill(args, command);
      return args;
    }
    /**
     * Print a description of the script arguments to the CLI.
     * @param args An object of parsed arguments, from Args.create(*).
     * @param maxOptionsToDisplay If given, do not list more than this many options for each arg.
     */

  }, {
    key: "showHelp",
    value: function showHelp(args, maxOptionsToDisplay) {
      var _a, _b, _c, _d, _e;

      var spec = args[specSymbol];
      var scriptName = args[scriptSymbol];
      var scriptHelp = args[scriptHelpSymbol];
      (0,external_kolmafia_namespaceObject.printHtml)("".concat(scriptHelp));
      (0,external_kolmafia_namespaceObject.printHtml)("<font color='blue'><b>Options:</b></font>");

      for (var k in spec) {
        var arg = spec[k];
        if (arg.hidden) continue;
        var nameText = "<font color='blue'>".concat((_a = arg.key) !== null && _a !== void 0 ? _a : k, "</font>");
        var valueText = arg.valueHelpName === "FLAG" ? "" : "<font color='purple'>".concat(arg.valueHelpName, "</font>");
        var helpText = (_b = arg.help) !== null && _b !== void 0 ? _b : "";
        var defaultText = "default" in arg ? "<font color='#888888'>[default: ".concat(arg.default, "]</font>") : "";
        var settingText = arg.setting === "" ? "" : "<font color='#888888'>[setting: ".concat((_c = arg.setting) !== null && _c !== void 0 ? _c : "".concat(scriptName, "_").concat((_d = arg.key) !== null && _d !== void 0 ? _d : k), "]</font>");
        (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;".concat([nameText, valueText, "-", helpText, defaultText, settingText].join(" ")));
        var valueOptions = (_e = arg.options) !== null && _e !== void 0 ? _e : [];

        if (valueOptions.length < (maxOptionsToDisplay !== null && maxOptionsToDisplay !== void 0 ? maxOptionsToDisplay : Number.MAX_VALUE)) {
          var _iterator = args_createForOfIteratorHelper(valueOptions),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var option = _step.value;

              if (option.length === 1) {
                (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0]));
              } else {
                (0,external_kolmafia_namespaceObject.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0], " - ").concat(option[1]));
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    }
  }]);

  return Args;
}();
/**
 * Metadata for the parsed arguments.
 *
 * This information is hidden within the parsed argument object so that it
 * is invisible to the user but available to fill(*) and showHelp(*).
 */

var specSymbol = Symbol("spec");
var scriptSymbol = Symbol("script");
var scriptHelpSymbol = Symbol("scriptHelp");
/**
 * Parse a string into a value for a given argument, throwing if the parsing fails.
 * @param arg An argument that takes values in T.
 * @param source A description of where this value came from, for the error message.
 * @param value The value to parse.
 * @returns the parsed value.
 */

function parseAndValidate(arg, source, value) {
  var parsed_value = arg.parser(value);
  if (parsed_value === undefined) throw "".concat(source, " could not parse value: ").concat(value);
  var options = arg.options;

  if (options) {
    if (!options.map(option => option[0]).includes(parsed_value)) {
      throw "".concat(source, " received invalid value: ").concat(value);
    }
  }

  return parsed_value;
}
/**
 * A parser to extract key/value pairs from a command line input.
 * @member command The command line input.
 * @member keys The set of valid keys that can appear.
 * @member flags The set of valid flags that can appear.
 * @member index An internal marker for the progress of the parser over the input.
 */


var CommandParser = /*#__PURE__*/function () {
  function CommandParser(command, keys, flags) {
    args_classCallCheck(this, CommandParser);

    this.command = command;
    this.index = 0;
    this.keys = keys;
    this.flags = flags;
  }
  /**
   * Perform the parsing of (key, value) pairs.
   * @returns The set of extracted (key, value) pairs.
   */


  args_createClass(CommandParser, [{
    key: "parse",
    value: function parse() {
      this.index = 0; // reset the parser

      var result = new Map();

      while (!this.finished()) {
        // A flag F may appear as !F to be parsed as false.
        var parsing_negative_flag = false;

        if (this.peek() === "!") {
          parsing_negative_flag = true;
          this.consume(["!"]);
        }

        var key = this.parseKey();

        if (result.has(key)) {
          throw "Duplicate key: ".concat(key);
        }

        if (this.flags.has(key)) {
          // The key corresponds to a flag.
          // Parse [key] as true and ![key] as false.
          result.set(key, parsing_negative_flag ? "false" : "true");
          if (this.peek() === "=") throw "Flag ".concat(key, " cannot be assigned a value");
          if (!this.finished()) this.consume([" "]);
        } else {
          // Parse [key]=[value] or [key] [value]
          this.consume(["=", " "]);
          var value = this.parseValue();
          if (!this.finished()) this.consume([" "]);
          result.set(key, value);
        }
      }

      return result;
    }
    /**
     * @returns True if the entire command has been parsed.
     */

  }, {
    key: "finished",
    value: function finished() {
      return this.index >= this.command.length;
    }
    /**
     * @returns The next character to parse, if it exists.
     */

  }, {
    key: "peek",
    value: function peek() {
      if (this.index >= this.command.length) return undefined;
      return this.command.charAt(this.index);
    }
    /**
     * Advance the internal marker over the next expected character.
     * Throws an error on unexpected characters.
     *
     * @param allowed Characters that are expected.
     */

  }, {
    key: "consume",
    value: function consume(allowed) {
      var _a;

      if (this.finished()) throw "Expected ".concat(allowed);

      if (allowed.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "")) {
        this.index += 1;
      }
    }
    /**
     * Find the next occurance of one of the provided characters, or the end of
     * the string if the characters never appear again.
     *
     * @param searchValue The characters to locate.
     */

  }, {
    key: "findNext",
    value: function findNext(searchValue) {
      var result = this.command.length;

      var _iterator2 = args_createForOfIteratorHelper(searchValue),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var value = _step2.value;
          var index = this.command.indexOf(value, this.index);
          if (index !== -1 && index < result) result = index;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return result;
    }
    /**
     * Starting from the internal marker, parse a single key.
     * This also advances the internal marker.
     *
     * @returns The next key.
     */

  }, {
    key: "parseKey",
    value: function parseKey() {
      var keyEnd = this.findNext(["=", " "]);
      var key = this.command.substring(this.index, keyEnd);
      this.index = keyEnd;

      if (!this.keys.has(key) && !this.flags.has(key)) {
        throw "Unknown key: ".concat(key);
      }

      return key;
    }
    /**
     * Starting from the internal marker, parse a single value.
     * This also advances the internal marker.
     *
     * Values are a single word or enclosed in matching quotes, i.e. one of:
     *    "[^"]*"
     *    '[^']*"
     *    [^'"][^ ]*
     *
     * @returns The next value.
     */

  }, {
    key: "parseValue",
    value: function parseValue() {
      var _a, _b;

      var valueEnder = " ";
      var quotes = ["'", '"'];

      if (quotes.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "")) {
        valueEnder = (_b = this.peek()) !== null && _b !== void 0 ? _b : ""; // The value is everything until the next quote

        this.consume([valueEnder]); // Consume opening quote
      }

      var valueEnd = this.findNext([valueEnder]);
      var value = this.command.substring(this.index, valueEnd);

      if (valueEnder !== " " && valueEnd === this.command.length) {
        throw "No closing ".concat(valueEnder, " found for ").concat(valueEnder).concat(value);
      } // Consume the value (and closing quote)


      this.index = valueEnd;
      if (valueEnder !== " ") this.consume([valueEnder]);
      return value;
    }
  }]);

  return CommandParser;
}();
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/combat.js
function dist_combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) dist_combat_setPrototypeOf(subClass, superClass); }

function dist_combat_setPrototypeOf(o, p) { dist_combat_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return dist_combat_setPrototypeOf(o, p); }

function dist_combat_createSuper(Derived) { var hasNativeReflectConstruct = dist_combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = dist_combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = dist_combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return dist_combat_possibleConstructorReturn(this, result); }; }

function dist_combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return dist_combat_assertThisInitialized(self); }

function dist_combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function dist_combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function dist_combat_getPrototypeOf(o) { dist_combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return dist_combat_getPrototypeOf(o); }

function dist_combat_toConsumableArray(arr) { return dist_combat_arrayWithoutHoles(arr) || dist_combat_iterableToArray(arr) || dist_combat_unsupportedIterableToArray(arr) || dist_combat_nonIterableSpread(); }

function dist_combat_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dist_combat_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function dist_combat_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return dist_combat_arrayLikeToArray(arr); }

function dist_combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = dist_combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function dist_combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dist_combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dist_combat_arrayLikeToArray(o, minLen); }

function dist_combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dist_combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dist_combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dist_combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) dist_combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) dist_combat_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




function undelay(macro) {
  if (macro instanceof Macro) return macro;else return macro();
}
/**
 * The strategy to use for combat for a task, which indicates what to do
 * for each monster.
 *
 * There are two ways to specify in a task what to do for a given monster:
 *   1. Provide a macro directly through .macro(macro, ...monsters)
 *   2. Provide an action through .action(action, ...monsters)
 *
 * An action is a strategy for dealing with a monster that is not fully
 * defined in the task. The possible actions are set with the type parameter A.
 * Actions should typically end the fight.
 *
 * For example, a task may want to banish a monster but not necessarily know or
 * care which banisher is used. Instead, it is best for the engine to determine
 * which banisher to use on the monster. To facilitate this, "banish" can be
 * defined as an action, e.g. with CombatStrategy<"banish">;
 *
 * Each action can be resolved by the engine by:
 *   1. Providing a default macro for the action through ActionDefaults<A>,
 *      which can be done through combat_defaults in Engine options, or
 *   2. Providing a CombatResource for the action through CombatResources<A>.
 *      This is typically done in Engine.customize() by checking if a given
 *      action is requested by the task with combat.can(.), and then providing
 *      an appropriate resource with resources.provide(.).
 *
 * A monster may have both a macro and an action defined, and a macro or action
 * can be specified to be done on all monsters. The order of combat is then:
 * 1. The macro(s) given in .startingMacro().
 * 2. The monster-specific macro(s) from .macro().
 * 3. The general macro(s) from .macro().
 * 4. The monster-specific action from .action().
 * 5. The general action from .action().
 */


var CombatStrategy = /*#__PURE__*/function () {
  function CombatStrategy() {
    dist_combat_classCallCheck(this, CombatStrategy);

    this.macros = new Map();
    this.actions = new Map();
  }
  /**
   * Add a macro to perform for this monster. If multiple macros are given
   * for the same monster, they are concatinated.
   *
   * @param macro The macro to perform.
   * @param monsters Which monsters to use the macro on. If not given, add the
   *  macro as a general macro.
   * @param prepend If true, add the macro before all previous macros for
   *    the same monster. If false, add after all previous macros.
   * @returns this
   */


  dist_combat_createClass(CombatStrategy, [{
    key: "macro",
    value: function macro(_macro, monsters, prepend) {
      var _a, _b;

      if (monsters === undefined) {
        if (this.default_macro === undefined) this.default_macro = [];
        if (prepend) this.default_macro.unshift(_macro);else this.default_macro.push(_macro);
      } else {
        if (monsters instanceof external_kolmafia_namespaceObject.Monster) monsters = [monsters];

        var _iterator = dist_combat_createForOfIteratorHelper(monsters),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var monster = _step.value;
            if (!this.macros.has(monster)) this.macros.set(monster, []);
            if (prepend) (_a = this.macros.get(monster)) === null || _a === void 0 ? void 0 : _a.unshift(_macro);else (_b = this.macros.get(monster)) === null || _b === void 0 ? void 0 : _b.push(_macro);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return this;
    }
    /**
     * Add a macro to perform at the start of combat.
     * @param macro The macro to perform.
     * @param prepend If true, add the macro before all previous starting
     *    macros. If false, add after all previous starting macros.
     * @returns this
     */

  }, {
    key: "startingMacro",
    value: function startingMacro(macro, prepend) {
      if (this.starting_macro === undefined) this.starting_macro = [];
      if (prepend) this.starting_macro.unshift(macro);else this.starting_macro.push(macro);
      return this;
    }
    /**
     * Add an action to perform for this monster. Only one action can be set for
     * each monster; any previous actions are overwritten.
     *
     * @param action The action to perform.
     * @param monsters Which monsters to use the action on. If not given, set the
     *  action as the general action for all monsters.
     * @returns this
     */

  }, {
    key: "action",
    value: function action(_action, monsters) {
      if (monsters === undefined) {
        this.default_action = _action;
      } else if (monsters instanceof external_kolmafia_namespaceObject.Monster) {
        this.actions.set(monsters, _action);
      } else {
        var _iterator2 = dist_combat_createForOfIteratorHelper(monsters),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var monster = _step2.value;
            this.actions.set(monster, _action);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return this;
    }
    /**
     * Check if the provided action was requested for any monsters, or for the
     * general action.
     */

  }, {
    key: "can",
    value: function can(action) {
      if (action === this.default_action) return true;
      return Array.from(this.actions.values()).includes(action);
    }
    /**
     * Return the general action (if it exists).
     */

  }, {
    key: "getDefaultAction",
    value: function getDefaultAction() {
      return this.default_action;
    }
    /**
     * Return all monsters where the provided action was requested.
     */

  }, {
    key: "where",
    value: function where(action) {
      return Array.from(this.actions.keys()).filter(key => this.actions.get(key) === action);
    }
    /**
     * Return the requested action (if it exists) for the provided monster.
     */

  }, {
    key: "currentStrategy",
    value: function currentStrategy(monster) {
      var _a;

      return (_a = this.actions.get(monster)) !== null && _a !== void 0 ? _a : this.default_action;
    }
    /**
     * Perform a deep copy of this combat strategy.
     */

  }, {
    key: "clone",
    value: function clone() {
      var result = new CombatStrategy();
      if (this.starting_macro) result.starting_macro = dist_combat_toConsumableArray(this.starting_macro);
      result.default_action = this.default_action;
      if (this.default_macro) result.default_macro = dist_combat_toConsumableArray(this.default_macro);

      var _iterator3 = dist_combat_createForOfIteratorHelper(this.macros),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var pair = _step3.value;
          result.macros.set(pair[0], dist_combat_toConsumableArray(pair[1]));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = dist_combat_createForOfIteratorHelper(this.actions),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _pair = _step4.value;
          result.actions.set(_pair[0], _pair[1]);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return result;
    }
    /**
     * Compile this combat strategy into a complete macro.
     *
     * @param resources The resources to use to fulfil actions.
     * @param defaults Macros to perform for each action without a resource.
     * @param location The adventuring location, if known.
     * @returns The compiled macro.
     */

  }, {
    key: "compile",
    value: function compile(resources, defaults, location) {
      var _a, _b;

      var result = new Macro(); // If there is macro precursor, do it now

      if (this.starting_macro) {
        result.step.apply(result, dist_combat_toConsumableArray(this.starting_macro.map(undelay)));
      } // Perform any monster-specific macros (these may or may not end the fight)


      var monster_macros = new CompressedMacro();
      this.macros.forEach((value, key) => {
        var _Macro;

        monster_macros.add(key, (_Macro = new Macro()).step.apply(_Macro, dist_combat_toConsumableArray(value.map(undelay))));
      });
      result.step(monster_macros.compile()); // Perform the non-monster specific macro

      if (this.default_macro) result.step.apply(result, dist_combat_toConsumableArray(this.default_macro.map(undelay))); // Perform any monster-specific actions (these should end the fight)

      var monster_actions = new CompressedMacro();
      this.actions.forEach((action, key) => {
        var _a, _b;

        var macro = (_a = resources.getMacro(action)) !== null && _a !== void 0 ? _a : (_b = defaults === null || defaults === void 0 ? void 0 : defaults[action]) === null || _b === void 0 ? void 0 : _b.call(defaults, key);
        if (macro) monster_actions.add(key, new Macro().step(macro));
      });
      result.step(monster_actions.compile()); // Perform the non-monster specific action (these should end the fight)

      if (this.default_action) {
        var macro = (_a = resources.getMacro(this.default_action)) !== null && _a !== void 0 ? _a : (_b = defaults === null || defaults === void 0 ? void 0 : defaults[this.default_action]) === null || _b === void 0 ? void 0 : _b.call(defaults, location);
        if (macro) result.step(macro);
      }

      return result;
    }
    /**
     * For advanced users, this method will generate a fluent API for requesting
     * actions. That is, it allows you to do
     *   combat.banish(monster1).kill(monster2)
     * instead of
     *   combat.action("banish", monster1).action("kill", monster2)
     *
     * Example usage:
     *   const myActions = ["kill", "banish"] as const;
     *   class MyCombatStrategy extends CombatStrategy.withActions(myActions) {}
     *
     *   const foo: MyCombatStrategy = new MyCombatStrategy();
     *   const bar: MyCombatStrategy = foo.banish($monster`crate`).kill($monster`tumbleweed`);
     */

  }], [{
    key: "withActions",
    value: function withActions(actions) {
      var CombatStrategyWithActions = /*#__PURE__*/function (_this) {
        dist_combat_inherits(CombatStrategyWithActions, _this);

        var _super = dist_combat_createSuper(CombatStrategyWithActions);

        function CombatStrategyWithActions() {
          dist_combat_classCallCheck(this, CombatStrategyWithActions);

          return _super.apply(this, arguments);
        }

        return dist_combat_createClass(CombatStrategyWithActions);
      }(this); // eslint-disable-next-line @typescript-eslint/no-explicit-any


      var proto = CombatStrategyWithActions.prototype;

      var _iterator5 = dist_combat_createForOfIteratorHelper(actions),
          _step5;

      try {
        var _loop = function _loop() {
          var action = _step5.value;

          proto[action] = function (monsters) {
            return this.action(action, monsters);
          };
        };

        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          _loop();
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return CombatStrategyWithActions;
    }
  }]);

  return CombatStrategy;
}();
/**
 * A class to build a macro that combines if statements (keyed on monster) with
 * identical body into a single if statement, to avoid the 37-action limit.
 * Ex: [if x; A; if y; B; if z; A;] will turn into [if x || z; A; if y; B]
 */

var CompressedMacro = /*#__PURE__*/function () {
  function CompressedMacro() {
    dist_combat_classCallCheck(this, CompressedMacro);

    this.components = new Map();
  }
  /**
   * Set the macro for a given monster (replacing any previous macros).
   */


  dist_combat_createClass(CompressedMacro, [{
    key: "add",
    value: function add(monster, macro) {
      var _a;

      var macro_text = macro.toString();
      if (macro_text.length === 0) return;
      if (!this.components.has(macro_text)) this.components.set(macro_text, [monster]);else (_a = this.components.get(macro_text)) === null || _a === void 0 ? void 0 : _a.push(monster);
    }
    /**
     * Compile the compressed form of the macro.
     */

  }, {
    key: "compile",
    value: function compile() {
      var result = new Macro();
      this.components.forEach((monsters, macro) => {
        var condition = monsters.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        result.if_(condition, macro);
      });
      return result;
    }
  }]);

  return CompressedMacro;
}();
/**
 * A class for providing resources to fulfil combat actions.
 */


var CombatResources = /*#__PURE__*/function () {
  function CombatResources() {
    dist_combat_classCallCheck(this, CombatResources);

    this.resources = new Map();
  }
  /**
   * Use the provided resource to fulfil the provided action.
   * (If the resource is undefined, this does nothing).
   */


  dist_combat_createClass(CombatResources, [{
    key: "provide",
    value: function provide(action, resource) {
      if (resource === undefined) return;
      this.resources.set(action, resource);
    }
    /**
     * Return true if the provided action has a resource provided.
     */

  }, {
    key: "has",
    value: function has(action) {
      return this.resources.has(action);
    }
    /**
     * Return all provided combat resources.
     */

  }, {
    key: "all",
    value: function all() {
      return Array.from(this.resources.values());
    }
    /**
     * Get the macro provided by the resource for this action, or undefined if
     * no resource was provided.
     */

  }, {
    key: "getMacro",
    value: function getMacro(action) {
      var resource = this.resources.get(action);
      if (resource === undefined) return undefined;
      if (resource.do instanceof external_kolmafia_namespaceObject.Item) return new Macro().item(resource.do);
      if (resource.do instanceof external_kolmafia_namespaceObject.Skill) return new Macro().skill(resource.do);
      return resource.do;
    }
  }]);

  return CombatResources;
}();
;// CONCATENATED MODULE: ./node_modules/libram/dist/logger.js
function logger_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function logger_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function logger_createClass(Constructor, protoProps, staticProps) { if (protoProps) logger_defineProperties(Constructor.prototype, protoProps); if (staticProps) logger_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function logger_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultHandlers = {
  info: message => (0,external_kolmafia_namespaceObject.printHtml)("<b>[Libram]</b> ".concat(message)),
  warning: message => (0,external_kolmafia_namespaceObject.printHtml)("<span style=\"background: orange; color: white;\"><b>[Libram]</b> ".concat(message, "</span>")),
  error: _error => (0,external_kolmafia_namespaceObject.printHtml)("<span style=\"background: red; color: white;\"><b>[Libram]</b> ".concat(_error.toString(), "</span>"))
};

var Logger = /*#__PURE__*/function () {
  function Logger() {
    logger_classCallCheck(this, Logger);

    logger_defineProperty(this, "handlers", defaultHandlers);
  }

  logger_createClass(Logger, [{
    key: "setHandler",
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setHandler(level, callback) {
      this.handlers[level] = callback;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "log",
    value: function log(level, message) {
      this.handlers[level](message);
    }
  }, {
    key: "info",
    value: function info(message) {
      this.log("info", message);
    }
  }, {
    key: "warning",
    value: function warning(message) {
      this.log("warning", message);
    }
  }, {
    key: "error",
    value: function error(message) {
      this.log("error", message);
    }
  }]);

  return Logger;
}();

/* harmony default export */ const logger = (new Logger());
;// CONCATENATED MODULE: ./node_modules/libram/dist/maximize.js
var maximize_templateObject, maximize_templateObject2, maximize_templateObject3, maximize_templateObject4, maximize_templateObject5, maximize_templateObject6, maximize_templateObject7, maximize_templateObject8, maximize_templateObject9, maximize_templateObject10, maximize_templateObject11, maximize_templateObject12, maximize_templateObject13, maximize_templateObject14, maximize_templateObject15, maximize_templateObject16, maximize_templateObject17, maximize_templateObject18, maximize_templateObject19, maximize_templateObject20, maximize_templateObject21, maximize_templateObject22, maximize_templateObject23, maximize_templateObject24, maximize_templateObject25, maximize_templateObject26, maximize_templateObject27, maximize_templateObject28, maximize_templateObject29, maximize_templateObject30, maximize_templateObject31, maximize_templateObject32, maximize_templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42;

function maximize_slicedToArray(arr, i) { return maximize_arrayWithHoles(arr) || maximize_iterableToArrayLimit(arr, i) || maximize_unsupportedIterableToArray(arr, i) || maximize_nonIterableRest(); }

function maximize_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function maximize_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function maximize_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = maximize_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function maximize_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function maximize_createClass(Constructor, protoProps, staticProps) { if (protoProps) maximize_defineProperties(Constructor.prototype, protoProps); if (staticProps) maximize_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function maximize_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function maximize_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function maximize_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function maximize_toConsumableArray(arr) { return maximize_arrayWithoutHoles(arr) || maximize_iterableToArray(arr) || maximize_unsupportedIterableToArray(arr) || maximize_nonIterableSpread(); }

function maximize_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return maximize_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return maximize_arrayLikeToArray(o, minLen); }

function maximize_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function maximize_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return maximize_arrayLikeToArray(arr); }

function maximize_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Merges a Partial<MaximizeOptions> onto a MaximizeOptions. We merge via overriding for all boolean properties and for onlySlot, and concat all other array properties.
 * @param defaultOptions MaximizeOptions to use as a "base."
 * @param addendums Options to attempt to merge onto defaultOptions.
 */

function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat;

  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(maximize_toConsumableArray(defaultOptions.forceEquip), maximize_toConsumableArray((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(maximize_toConsumableArray(defaultOptions.preventEquip), maximize_toConsumableArray((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(item => {
      var _addendums$forceEquip2;

      return !defaultOptions.forceEquip.includes(item) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item));
    }),
    bonusEquip: new Map([].concat(maximize_toConsumableArray(defaultOptions.bonusEquip), maximize_toConsumableArray((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(maximize_toConsumableArray(defaultOptions.preventSlot), maximize_toConsumableArray((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate
  };
}

var defaultMaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnCanEquipChanged: true,
  useOutfitCaching: true,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: false
};
/**
 *
 * @param options Default options for each maximizer run.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */

function setDefaultMaximizeOptions(options) {
  Object.assign(defaultMaximizeOptions, options);
} // Subset of slots that are valid for caching.

var cachedSlots = $slots(maximize_templateObject || (maximize_templateObject = maximize_taggedTemplateLiteral(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"])));

var CacheEntry = /*#__PURE__*/maximize_createClass(function CacheEntry(equipment, rider, familiar, canEquipItemCount) {
  maximize_classCallCheck(this, CacheEntry);

  maximize_defineProperty(this, "equipment", void 0);

  maximize_defineProperty(this, "rider", void 0);

  maximize_defineProperty(this, "familiar", void 0);

  maximize_defineProperty(this, "canEquipItemCount", void 0);

  this.equipment = equipment;
  this.rider = rider;
  this.familiar = familiar;
  this.canEquipItemCount = canEquipItemCount;
});

var _outfitSlots = /*#__PURE__*/new WeakMap();

var _useHistory = /*#__PURE__*/new WeakMap();

var _maxSize = /*#__PURE__*/new WeakMap();

var OutfitLRUCache = /*#__PURE__*/function () {
  // Current outfits allocated
  // Array of indices into #outfitSlots in order of use. Most recent at the front.
  function OutfitLRUCache(maxSize) {
    maximize_classCallCheck(this, OutfitLRUCache);

    _classPrivateFieldInitSpec(this, _outfitSlots, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _useHistory, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _maxSize, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maxSize, maxSize);
  }

  maximize_createClass(OutfitLRUCache, [{
    key: "checkConsistent",
    value: function checkConsistent() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory)).sort().every((value, index) => value === index)) {
        throw new Error("Outfit cache consistency failed.");
      }
    }
  }, {
    key: "promote",
    value: function promote(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory).filter(i => i !== index))));

      this.checkConsistent();
    }
  }, {
    key: "get",
    value: function get(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);

      if (index < 0) return undefined;
      this.promote(index);
      return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function insert(key) {
      var lastUseIndex = undefined;

      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop();

        if (lastUseIndex === undefined) {
          throw new Error("Outfit cache consistency failed.");
        }

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex);

        _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key;
        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, index);

        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }]);

  return OutfitLRUCache;
}();
/**
 * Save current equipment as KoL-native outfit.
 * @param name Name of new outfit.
 */


maximize_defineProperty(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");

function saveOutfit(name) {
  (0,external_kolmafia_namespaceObject.cliExecute)("outfit save ".concat(name));
} // Objective cache entries.


var cachedObjectives = {}; // Outfit cache entries. Keep 6 by default to avoid cluttering list.

var outfitCache = new OutfitLRUCache(6); // Cache to prevent rescanning all items unnecessarily

var cachedStats = [0, 0, 0];
var cachedCanEquipItemCount = 0;
/**
 * Count the number of unique items that can be equipped.
 * @returns The count of unique items.
 */

function canEquipItemCount() {
  var stats = $stats(maximize_templateObject2 || (maximize_templateObject2 = maximize_taggedTemplateLiteral(["Muscle, Mysticality, Moxie"]))).map(stat => Math.min((0,external_kolmafia_namespaceObject.myBasestat)(stat), 300));

  if (stats.every((value, index) => value === cachedStats[index])) {
    return cachedCanEquipItemCount;
  }

  cachedStats = stats;
  cachedCanEquipItemCount = external_kolmafia_namespaceObject.Item.all().filter(item => (0,external_kolmafia_namespaceObject.canEquip)(item)).length;
  return cachedCanEquipItemCount;
}
/**
 * Checks the objective cache for a valid entry.
 * @param cacheKey The cache key to check.
 * @param updateOnFamiliarChange Ignore cache if familiar has changed.
 * @param updateOnCanEquipChanged Ignore cache if stats have changed what can be equipped.
 * @returns A valid CacheEntry or null.
 */


function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];

  if (!entry) {
    return null;
  }

  if (options.updateOnFamiliarChange && (0,external_kolmafia_namespaceObject.myFamiliar)() !== entry.familiar) {
    logger.warning("Equipment found in maximize cache but familiar is different.");
    return null;
  }

  if (options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount()) {
    logger.warning("Equipment found in maximize cache but equippable item list is out of date.");
    return null;
  }

  return entry;
}
/**
 * Applies equipment that was found in the cache.
 * @param entry The CacheEntry to apply
 */


function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : undefined;

  if (outfitName) {
    if (!(0,external_kolmafia_namespaceObject.isWearingOutfit)(outfitName)) {
      (0,external_kolmafia_namespaceObject.outfit)(outfitName);
    }

    var familiarEquip = entry.equipment.get($slot(maximize_templateObject3 || (maximize_templateObject3 = maximize_taggedTemplateLiteral(["familiar"]))));
    if (familiarEquip) (0,external_kolmafia_namespaceObject.equip)($slot(maximize_templateObject4 || (maximize_templateObject4 = maximize_taggedTemplateLiteral(["familiar"]))), familiarEquip);
  } else {
    var _iterator = maximize_createForOfIteratorHelper(entry.equipment),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = maximize_slicedToArray(_step.value, 2),
            slot = _step$value[0],
            item = _step$value[1];

        if ((0,external_kolmafia_namespaceObject.equippedItem)(slot) !== item && (0,external_kolmafia_namespaceObject.availableAmount)(item) > 0) {
          (0,external_kolmafia_namespaceObject.equip)(slot, item);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);

      logger.info("Saving equipment to outfit ".concat(_outfitName, "."));
      saveOutfit(_outfitName);
    }
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject5 || (maximize_templateObject5 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject6 || (maximize_templateObject6 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    (0,external_kolmafia_namespaceObject.enthroneFamiliar)(entry.rider.get(template_string_$item(maximize_templateObject7 || (maximize_templateObject7 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) || template_string_$familiar.none);
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject8 || (maximize_templateObject8 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject9 || (maximize_templateObject9 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    (0,external_kolmafia_namespaceObject.bjornifyFamiliar)(entry.rider.get(template_string_$item(maximize_templateObject10 || (maximize_templateObject10 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) || template_string_$familiar.none);
  }
}

var slotStructure = [$slots(maximize_templateObject11 || (maximize_templateObject11 = maximize_taggedTemplateLiteral(["hat"]))), $slots(maximize_templateObject12 || (maximize_templateObject12 = maximize_taggedTemplateLiteral(["back"]))), $slots(maximize_templateObject13 || (maximize_templateObject13 = maximize_taggedTemplateLiteral(["shirt"]))), $slots(maximize_templateObject14 || (maximize_templateObject14 = maximize_taggedTemplateLiteral(["weapon, off-hand"]))), $slots(maximize_templateObject15 || (maximize_templateObject15 = maximize_taggedTemplateLiteral(["pants"]))), $slots(maximize_templateObject16 || (maximize_templateObject16 = maximize_taggedTemplateLiteral(["acc1, acc2, acc3"]))), $slots(maximize_templateObject17 || (maximize_templateObject17 = maximize_taggedTemplateLiteral(["familiar"])))];
/**
 * Verifies that a CacheEntry was applied successfully.
 * @param entry The CacheEntry to verify
 * @returns If all desired equipment was appliedn in the correct slots.
 */

function verifyCached(entry) {
  var success = true;

  var _iterator2 = maximize_createForOfIteratorHelper(slotStructure),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var slotGroup = _step2.value;
      var desiredSlots = slotGroup.map(slot => {
        var _entry$equipment$get;

        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(_ref => {
        var _ref2 = maximize_slicedToArray(_ref, 2),
            item = _ref2[1];

        return item !== null;
      });
      var desiredSet = desiredSlots.map(_ref3 => {
        var _ref4 = maximize_slicedToArray(_ref3, 2),
            item = _ref4[1];

        return item;
      });
      var equippedSet = desiredSlots.map(_ref5 => {
        var _ref6 = maximize_slicedToArray(_ref5, 1),
            slot = _ref6[0];

        return (0,external_kolmafia_namespaceObject.equippedItem)(slot);
      });

      if (!setEqual(desiredSet, equippedSet)) {
        logger.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), "."));
        success = false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject18 || (maximize_templateObject18 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject19 || (maximize_templateObject19 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    if (entry.rider.get(template_string_$item(maximize_templateObject20 || (maximize_templateObject20 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) !== (0,external_kolmafia_namespaceObject.myEnthronedFamiliar)()) {
      logger.warning("Failed to apply ".concat(entry.rider.get(template_string_$item(maximize_templateObject21 || (maximize_templateObject21 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))), " in ").concat(template_string_$item(maximize_templateObject22 || (maximize_templateObject22 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), "."));
      success = false;
    }
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject23 || (maximize_templateObject23 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get(template_string_$item(maximize_templateObject24 || (maximize_templateObject24 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    if (entry.rider.get(template_string_$item(maximize_templateObject25 || (maximize_templateObject25 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) !== (0,external_kolmafia_namespaceObject.myBjornedFamiliar)()) {
      logger.warning("Failed to apply".concat(entry.rider.get(template_string_$item(maximize_templateObject26 || (maximize_templateObject26 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))), " in ").concat(template_string_$item(maximize_templateObject27 || (maximize_templateObject27 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), "."));
      success = false;
    }
  }

  return success;
}
/**
 * Save current equipment to the objective cache.
 * @param cacheKey The cache key to save.
 */


function saveCached(cacheKey, options) {
  var equipment = new Map();
  var rider = new Map();

  var _iterator3 = maximize_createForOfIteratorHelper(cachedSlots),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _slot2 = _step3.value;
      equipment.set(_slot2, (0,external_kolmafia_namespaceObject.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject28 || (maximize_templateObject28 = maximize_taggedTemplateLiteral(["card sleeve"])))) > 0) {
    equipment.set($slot(maximize_templateObject29 || (maximize_templateObject29 = maximize_taggedTemplateLiteral(["card-sleeve"]))), (0,external_kolmafia_namespaceObject.equippedItem)($slot(maximize_templateObject30 || (maximize_templateObject30 = maximize_taggedTemplateLiteral(["card-sleeve"])))));
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject31 || (maximize_templateObject31 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0) {
    rider.set(template_string_$item(maximize_templateObject32 || (maximize_templateObject32 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), (0,external_kolmafia_namespaceObject.myEnthronedFamiliar)());
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(maximize_templateObject33 || (maximize_templateObject33 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0) {
    rider.set(template_string_$item(_templateObject34 || (_templateObject34 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), (0,external_kolmafia_namespaceObject.myBjornedFamiliar)());
  }

  if (options.preventSlot && options.preventSlot.length > 0) {
    var _iterator4 = maximize_createForOfIteratorHelper(options.preventSlot),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var slot = _step4.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    if (options.preventSlot.includes($slot(_templateObject35 || (_templateObject35 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete(template_string_$item(_templateObject36 || (_templateObject36 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (options.preventSlot.includes($slot(_templateObject37 || (_templateObject37 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete(template_string_$item(_templateObject38 || (_templateObject38 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator5 = maximize_createForOfIteratorHelper(external_kolmafia_namespaceObject.Slot.all()),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _slot = _step5.value;

        if (!options.onlySlot.includes(_slot)) {
          equipment.delete(_slot);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    if (!options.onlySlot.includes($slot(_templateObject39 || (_templateObject39 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete(template_string_$item(_templateObject40 || (_templateObject40 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (!options.onlySlot.includes($slot(_templateObject41 || (_templateObject41 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete(template_string_$item(_templateObject42 || (_templateObject42 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  var entry = new CacheEntry(equipment, rider, (0,external_kolmafia_namespaceObject.myFamiliar)(), canEquipItemCount());
  cachedObjectives[cacheKey] = entry;

  if (options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger.info("Saving equipment to outfit ".concat(outfitName, "."));
    saveOutfit(outfitName);
  }
}
/**
 * Run the maximizer, but only if the objective and certain pieces of game state haven't changed since it was last run.
 * @param objectives Objectives to maximize for.
 * @param options Options for this run of the maximizer.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 * @returns Whether the maximize call succeeded.
 */


function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options);
  var forceEquip = fullOptions.forceEquip,
      preventEquip = fullOptions.preventEquip,
      bonusEquip = fullOptions.bonusEquip,
      onlySlot = fullOptions.onlySlot,
      preventSlot = fullOptions.preventSlot,
      forceUpdate = fullOptions.forceUpdate; // Sort each group in objective to ensure consistent ordering in string

  var objective = maximize_toConsumableArray(new Set([].concat(maximize_toConsumableArray(objectives.sort()), maximize_toConsumableArray(forceEquip.map(item => "equip ".concat(item)).sort()), maximize_toConsumableArray(preventEquip.map(item => "-equip ".concat(item)).sort()), maximize_toConsumableArray(onlySlot.map(slot => "".concat(slot)).sort()), maximize_toConsumableArray(preventSlot.map(slot => "-".concat(slot)).sort()), maximize_toConsumableArray(Array.from(bonusEquip.entries()).filter(_ref7 => {
    var _ref8 = maximize_slicedToArray(_ref7, 2),
        bonus = _ref8[1];

    return bonus !== 0;
  }).map(_ref9 => {
    var _ref10 = maximize_slicedToArray(_ref9, 2),
        item = _ref10[0],
        bonus = _ref10[1];

    return "".concat(Math.round(bonus * 100) / 100, " bonus ").concat(item);
  }).sort())))).join(", "); // Items equipped in slots not touched by the maximizer must be in the cache key


  var untouchedSlots = cachedSlots.filter(slot => preventSlot.includes(slot) || onlySlot.length > 0 && !onlySlot.includes(slot));
  var cacheKey = [objective].concat(maximize_toConsumableArray(untouchedSlots.map(slot => "".concat(slot, ":").concat((0,external_kolmafia_namespaceObject.equippedItem)(slot))).sort())).join("; ");
  var cacheEntry = checkCache(cacheKey, fullOptions);

  if (cacheEntry && !forceUpdate) {
    logger.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry, fullOptions);

    if (verifyCached(cacheEntry)) {
      logger.info("Equipped cached ".concat(cacheKey));
      return true;
    }

    logger.warning("Maximize cache application failed, maximizing...");
  }

  var result = (0,external_kolmafia_namespaceObject.maximize)(objective, false);
  saveCached(cacheKey, fullOptions);
  return result;
}

var _maximizeParameters = /*#__PURE__*/new WeakMap();

var _maximizeOptions = /*#__PURE__*/new WeakMap();

var Requirement = /*#__PURE__*/function () {
  /**
   * A convenient way of combining maximization parameters and options
   * @param maximizeParameters Parameters you're attempting to maximize
   * @param maximizeOptions Object potentially containing forceEquips, bonusEquips, preventEquips, and preventSlots
   */
  function Requirement(maximizeParameters, maximizeOptions) {
    maximize_classCallCheck(this, Requirement);

    _classPrivateFieldInitSpec(this, _maximizeParameters, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _maximizeOptions, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters);

    _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }

  maximize_createClass(Requirement, [{
    key: "maximizeParameters",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     * @param other Requirement to merge with.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption3, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot;

      var optionsA = this.maximizeOptions;
      var optionsB = other.maximizeOptions;
      return new Requirement([].concat(maximize_toConsumableArray(this.maximizeParameters), maximize_toConsumableArray(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(maximize_toConsumableArray((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), maximize_toConsumableArray((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])).filter(x => {
          var _other$maximizeOption2;

          return !((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 && _other$maximizeOption2.includes(x));
        }),
        preventEquip: [].concat(maximize_toConsumableArray((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), maximize_toConsumableArray((_other$maximizeOption3 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption3 !== void 0 ? _other$maximizeOption3 : [])).filter(x => {
          var _other$maximizeOption4;

          return !((_other$maximizeOption4 = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption4 !== void 0 && _other$maximizeOption4.includes(x));
        }),
        bonusEquip: new Map([].concat(maximize_toConsumableArray((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), maximize_toConsumableArray((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(maximize_toConsumableArray((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), maximize_toConsumableArray((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(maximize_toConsumableArray((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), maximize_toConsumableArray((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : [])),
        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate
      });
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     * @param allRequirements Requirements to merge
     */

  }, {
    key: "maximize",
    value:
    /**
     * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
     * @returns Whether the maximize call succeeded.
     */
    function maximize() {
      return maximizeCached(this.maximizeParameters, this.maximizeOptions);
    }
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     * @param requirements Requirements to maximize on
     */

  }], [{
    key: "merge",
    value: function merge(allRequirements) {
      return allRequirements.reduce((x, y) => x.merge(y), new Requirement([], {}));
    }
  }, {
    key: "maximize",
    value: function maximize() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++) {
        requirements[_key] = arguments[_key];
      }

      Requirement.merge(requirements).maximize();
    }
  }]);

  return Requirement;
}();
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/task.js

var outfitSlots = ["hat", "back", "weapon", "offhand", "shirt", "pants", "acc1", "acc2", "acc3", "famequip"];
/**
 * Returns the state of a quest as a numeric value as follows:
 *   "unstarted" => -1
 *   "started" => 0
 *   "stepNUM" => NUM
 *   "finished" => 999
 */

function step(questName) {
  var stringStep = property_get(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw "Quest state parsing error.";
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/outfit.js
var outfit_templateObject, outfit_templateObject2, outfit_templateObject3, outfit_templateObject4, outfit_templateObject5, outfit_templateObject6, outfit_templateObject7, outfit_templateObject8, outfit_templateObject9, outfit_templateObject10, outfit_templateObject11, outfit_templateObject12, outfit_templateObject13, outfit_templateObject14, outfit_templateObject15, outfit_templateObject16, outfit_templateObject17, outfit_templateObject18, outfit_templateObject19, outfit_templateObject20, outfit_templateObject21, outfit_templateObject22, outfit_templateObject23, outfit_templateObject24, outfit_templateObject25, outfit_templateObject26, outfit_templateObject27, outfit_templateObject28, outfit_templateObject29, outfit_templateObject30;

function outfit_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = outfit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function outfit_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function outfit_toConsumableArray(arr) { return outfit_arrayWithoutHoles(arr) || outfit_iterableToArray(arr) || outfit_unsupportedIterableToArray(arr) || outfit_nonIterableSpread(); }

function outfit_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function outfit_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return outfit_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return outfit_arrayLikeToArray(o, minLen); }

function outfit_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function outfit_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return outfit_arrayLikeToArray(arr); }

function outfit_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function outfit_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function outfit_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function outfit_createClass(Constructor, protoProps, staticProps) { if (protoProps) outfit_defineProperties(Constructor.prototype, protoProps); if (staticProps) outfit_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var weaponHands = i => i ? (0,external_kolmafia_namespaceObject.weaponHands)(i) : 0;

var Outfit = /*#__PURE__*/function () {
  function Outfit() {
    outfit_classCallCheck(this, Outfit);

    this.equips = new Map();
    this.accessories = [];
    this.skipDefaults = false;
    this.modifier = "";
    this.avoid = [];
  }

  outfit_createClass(Outfit, [{
    key: "countEquipped",
    value: function countEquipped(item) {
      return [].concat(outfit_toConsumableArray(this.equips.values()), outfit_toConsumableArray(this.accessories)).filter(i => i === item).length;
    }
  }, {
    key: "isAvailable",
    value: function isAvailable(item) {
      var _a;

      if ((_a = this.avoid) === null || _a === void 0 ? void 0 : _a.includes(item)) return false;
      if (!have(item, this.countEquipped(item) + 1)) return false;
      if ((0,external_kolmafia_namespaceObject.booleanModifier)(item, "Single Equip") && this.countEquipped(item) > 0) return false;
      return true;
    }
  }, {
    key: "haveEquipped",
    value: function haveEquipped(item, slot) {
      if (slot === undefined) return this.countEquipped(item) > 0;
      if ($slots(outfit_templateObject || (outfit_templateObject = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))).includes(slot)) return this.accessories.includes(item); // TODO handle equipping multiple of an accessory

      return this.equips.get(slot) === item;
    }
  }, {
    key: "equipItemNone",
    value: function equipItemNone(item, slot) {
      if (item !== template_string_$item.none) return false;
      if (slot === undefined) return true;
      if (this.equips.has(slot)) return false;
      this.equips.set(slot, item);
      return true;
    }
  }, {
    key: "equipNonAccessory",
    value: function equipNonAccessory(item, slot) {
      if ($slots(outfit_templateObject2 || (outfit_templateObject2 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))).includes((0,external_kolmafia_namespaceObject.toSlot)(item))) return false;
      if (slot !== undefined && slot !== (0,external_kolmafia_namespaceObject.toSlot)(item)) return false;
      if (this.equips.has((0,external_kolmafia_namespaceObject.toSlot)(item))) return false;

      switch ((0,external_kolmafia_namespaceObject.toSlot)(item)) {
        case $slot(outfit_templateObject3 || (outfit_templateObject3 = outfit_taggedTemplateLiteral(["off-hand"]))):
          if (this.equips.has($slot(outfit_templateObject4 || (outfit_templateObject4 = outfit_taggedTemplateLiteral(["weapon"])))) && weaponHands(this.equips.get($slot(outfit_templateObject5 || (outfit_templateObject5 = outfit_taggedTemplateLiteral(["weapon"]))))) !== 1) {
            return false;
          }

          break;

        case $slot(outfit_templateObject6 || (outfit_templateObject6 = outfit_taggedTemplateLiteral(["familiar"]))):
          if (this.familiar !== undefined && !(0,external_kolmafia_namespaceObject.canEquip)(this.familiar, item)) return false;
      }

      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject7 || (outfit_templateObject7 = outfit_taggedTemplateLiteral(["familiar"]))) && !(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;
      this.equips.set((0,external_kolmafia_namespaceObject.toSlot)(item), item);
      return true;
    }
  }, {
    key: "equipAccessory",
    value: function equipAccessory(item, slot) {
      if (![undefined].concat(outfit_toConsumableArray($slots(outfit_templateObject8 || (outfit_templateObject8 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))))).includes(slot)) return false;
      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject9 || (outfit_templateObject9 = outfit_taggedTemplateLiteral(["acc1"])))) return false;
      if (this.accessories.length >= 3) return false;
      if (!(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;
      this.accessories.push(item);
      return true;
    }
  }, {
    key: "equipUsingDualWield",
    value: function equipUsingDualWield(item, slot) {
      if (![undefined, $slot(outfit_templateObject10 || (outfit_templateObject10 = outfit_taggedTemplateLiteral(["off-hand"])))].includes(slot)) return false;
      if ((0,external_kolmafia_namespaceObject.toSlot)(item) !== $slot(outfit_templateObject11 || (outfit_templateObject11 = outfit_taggedTemplateLiteral(["weapon"])))) return false;

      if (this.equips.has($slot(outfit_templateObject12 || (outfit_templateObject12 = outfit_taggedTemplateLiteral(["weapon"])))) && weaponHands(this.equips.get($slot(outfit_templateObject13 || (outfit_templateObject13 = outfit_taggedTemplateLiteral(["weapon"]))))) !== 1) {
        return false;
      }

      if (this.equips.has($slot(outfit_templateObject14 || (outfit_templateObject14 = outfit_taggedTemplateLiteral(["off-hand"]))))) return false;
      if (!have($skill(outfit_templateObject15 || (outfit_templateObject15 = outfit_taggedTemplateLiteral(["Double-Fisted Skull Smashing"]))))) return false;
      if (weaponHands(item) !== 1) return false;
      if (!(0,external_kolmafia_namespaceObject.canEquip)(item)) return false;
      this.equips.set($slot(outfit_templateObject16 || (outfit_templateObject16 = outfit_taggedTemplateLiteral(["off-hand"]))), item);
      return true;
    }
  }, {
    key: "getHoldingFamiliar",
    value: function getHoldingFamiliar(item) {
      switch ((0,external_kolmafia_namespaceObject.toSlot)(item)) {
        case $slot(outfit_templateObject17 || (outfit_templateObject17 = outfit_taggedTemplateLiteral(["weapon"]))):
          return template_string_$familiar(outfit_templateObject18 || (outfit_templateObject18 = outfit_taggedTemplateLiteral(["Disembodied Hand"])));

        case $slot(outfit_templateObject19 || (outfit_templateObject19 = outfit_taggedTemplateLiteral(["off-hand"]))):
          return template_string_$familiar(outfit_templateObject20 || (outfit_templateObject20 = outfit_taggedTemplateLiteral(["Left-Hand Man"])));

        default:
          return undefined;
      }
    }
  }, {
    key: "equipUsingFamiliar",
    value: function equipUsingFamiliar(item, slot) {
      if (![undefined, $slot(outfit_templateObject21 || (outfit_templateObject21 = outfit_taggedTemplateLiteral(["familiar"])))].includes(slot)) return false;
      if (this.equips.has($slot(outfit_templateObject22 || (outfit_templateObject22 = outfit_taggedTemplateLiteral(["familiar"]))))) return false;
      if ((0,external_kolmafia_namespaceObject.booleanModifier)(item, "Single Equip")) return false;
      var familiar = this.getHoldingFamiliar(item);
      if (familiar === undefined || !this.equip(familiar)) return false;
      this.equips.set($slot(outfit_templateObject23 || (outfit_templateObject23 = outfit_taggedTemplateLiteral(["familiar"]))), item);
      return true;
    }
  }, {
    key: "equipItem",
    value: function equipItem(item, slot) {
      return this.haveEquipped(item, slot) || this.equipItemNone(item, slot) || this.isAvailable(item) && (this.equipNonAccessory(item, slot) || this.equipAccessory(item, slot) || this.equipUsingDualWield(item, slot) || this.equipUsingFamiliar(item, slot));
    }
  }, {
    key: "equipFamiliar",
    value: function equipFamiliar(familiar) {
      if (familiar === this.familiar) return true;
      if (this.familiar !== undefined) return false;
      if (familiar !== template_string_$familiar.none && !have(familiar)) return false;
      var item = this.equips.get($slot(outfit_templateObject24 || (outfit_templateObject24 = outfit_taggedTemplateLiteral(["familiar"]))));
      if (item !== undefined && item !== template_string_$item.none && !(0,external_kolmafia_namespaceObject.canEquip)(familiar, item)) return false;
      this.familiar = familiar;
      return true;
    }
  }, {
    key: "equipSpec",
    value: function equipSpec(spec) {
      var _this$avoid;

      var _a, _b, _c, _d;

      var succeeded = true;

      var _iterator = outfit_createForOfIteratorHelper(outfitSlots),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var slotName = _step.value;
          var slot = (_a = new Map([["famequip", $slot(outfit_templateObject25 || (outfit_templateObject25 = outfit_taggedTemplateLiteral(["familiar"])))], ["offhand", $slot(outfit_templateObject26 || (outfit_templateObject26 = outfit_taggedTemplateLiteral(["off-hand"])))]]).get(slotName)) !== null && _a !== void 0 ? _a : (0,external_kolmafia_namespaceObject.toSlot)(slotName);
          var itemOrItems = spec[slotName];
          if (itemOrItems !== undefined && !this.equip(itemOrItems, slot)) succeeded = false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = outfit_createForOfIteratorHelper((_b = spec === null || spec === void 0 ? void 0 : spec.equip) !== null && _b !== void 0 ? _b : []),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          if (!this.equip(item)) succeeded = false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if ((spec === null || spec === void 0 ? void 0 : spec.familiar) !== undefined) {
        if (!this.equip(spec.familiar)) succeeded = false;
      }

      (_this$avoid = this.avoid).push.apply(_this$avoid, outfit_toConsumableArray((_c = spec === null || spec === void 0 ? void 0 : spec.avoid) !== null && _c !== void 0 ? _c : []));

      this.skipDefaults = this.skipDefaults || ((_d = spec.skipDefaults) !== null && _d !== void 0 ? _d : false);

      if (spec.modifier) {
        this.modifier = this.modifier + (this.modifier ? ", " : "") + spec.modifier;
      }

      return succeeded;
    }
  }, {
    key: "equip",
    value: function equip(thing, slot) {
      if (Array.isArray(thing)) {
        if (slot !== undefined) return thing.some(val => this.equip(val, slot));
        return thing.every(val => this.equip(val));
      }

      if (thing instanceof external_kolmafia_namespaceObject.Item) return this.equipItem(thing, slot);
      if (thing instanceof external_kolmafia_namespaceObject.Familiar) return this.equipFamiliar(thing);
      return this.equipSpec(thing);
    }
  }, {
    key: "canEquip",
    value: function canEquip(thing) {
      var outfit = this.clone();
      return outfit.equip(thing);
    }
    /**
     * Equip this outfit.
     * @param extraOptions Passed to any maximizer calls made.
     */

  }, {
    key: "dress",
    value: function dress(extraOptions) {
      if (this.familiar) (0,external_kolmafia_namespaceObject.useFamiliar)(this.familiar);
      var targetEquipment = Array.from(this.equips.values());
      var accessorySlots = $slots(outfit_templateObject27 || (outfit_templateObject27 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"])));

      var _iterator3 = outfit_createForOfIteratorHelper($slots(outfit_templateObject28 || (outfit_templateObject28 = outfit_taggedTemplateLiteral(["weapon, off-hand, hat, shirt, pants, familiar, buddy-bjorn, crown-of-thrones, back"])))),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var slot = _step3.value;
          if (targetEquipment.includes((0,external_kolmafia_namespaceObject.equippedItem)(slot)) && this.equips.get(slot) !== (0,external_kolmafia_namespaceObject.equippedItem)(slot)) (0,external_kolmafia_namespaceObject.equip)(slot, template_string_$item.none);
        } //Order is anchored here to prevent DFSS shenanigans

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = outfit_createForOfIteratorHelper($slots(outfit_templateObject29 || (outfit_templateObject29 = outfit_taggedTemplateLiteral(["weapon, off-hand, hat, back, shirt, pants, familiar, buddy-bjorn, crown-of-thrones"])))),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _slot = _step4.value;
          var equipment = this.equips.get(_slot);
          if (equipment) (0,external_kolmafia_namespaceObject.equip)(_slot, equipment);
        } //We don't care what order accessories are equipped in, just that they're equipped

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var accessoryEquips = this.accessories;

      var _iterator5 = outfit_createForOfIteratorHelper(accessorySlots),
          _step5;

      try {
        var _loop = function _loop() {
          var slot = _step5.value;
          var toEquip = accessoryEquips.find(equip => (0,external_kolmafia_namespaceObject.equippedAmount)(equip) < accessoryEquips.filter(accessory => accessory === equip).length);
          if (!toEquip) return "break";
          var currentEquip = (0,external_kolmafia_namespaceObject.equippedItem)(slot); //We never want an empty accessory slot

          if (currentEquip === template_string_$item.none || (0,external_kolmafia_namespaceObject.equippedAmount)(currentEquip) > accessoryEquips.filter(accessory => accessory === currentEquip).length) {
            (0,external_kolmafia_namespaceObject.equip)(slot, toEquip);
          }
        };

        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _ret = _loop();

          if (_ret === "break") break;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (this.modifier) {
        var allRequirements = [new Requirement([this.modifier], {
          preventSlot: outfit_toConsumableArray(this.equips.keys()),
          forceEquip: accessoryEquips,
          preventEquip: this.avoid
        })];
        if (extraOptions) allRequirements.push(new Requirement([], extraOptions));

        if (!Requirement.merge(allRequirements).maximize()) {
          throw "Unable to maximize ".concat(this.modifier);
        }

        (0,external_kolmafia_namespaceObject.logprint)("Maximize: ".concat(this.modifier));
      } // Verify that all equipment was indeed equipped


      if (this.familiar !== undefined && (0,external_kolmafia_namespaceObject.myFamiliar)() !== this.familiar) throw "Failed to fully dress (expected: familiar ".concat(this.familiar, ")");

      var _iterator6 = outfit_createForOfIteratorHelper(this.equips),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var slotted_item = _step6.value;

          if ((0,external_kolmafia_namespaceObject.equippedItem)(slotted_item[0]) !== slotted_item[1]) {
            throw "Failed to fully dress (expected: ".concat(slotted_item[0], " ").concat(slotted_item[1], ")");
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      var _iterator7 = outfit_createForOfIteratorHelper(this.accessories),
          _step7;

      try {
        var _loop2 = function _loop2() {
          var accessory = _step7.value;

          if (!$slots(outfit_templateObject30 || (outfit_templateObject30 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"]))).some(slot => (0,external_kolmafia_namespaceObject.equippedItem)(slot) === accessory)) {
            throw "Failed to fully dress (expected: acc ".concat(accessory, ")");
          }
        };

        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      var result = new Outfit();
      result.equips = new Map(this.equips);
      result.accessories = outfit_toConsumableArray(this.accessories);
      result.skipDefaults = this.skipDefaults;
      result.familiar = this.familiar;
      result.modifier = this.modifier;
      result.avoid = outfit_toConsumableArray(this.avoid);
      return result;
    }
  }]);

  return Outfit;
}();
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/engine.js
var engine_templateObject;

function engine_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_toConsumableArray(arr) { return engine_arrayWithoutHoles(arr) || engine_iterableToArray(arr) || engine_unsupportedIterableToArray(arr) || engine_nonIterableSpread(); }

function engine_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_arrayLikeToArray(arr); }

function engine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = engine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function engine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_arrayLikeToArray(o, minLen); }

function engine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function engine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function engine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var EngineOptions = /*#__PURE__*/(/* unused pure expression or super */ null && (engine_createClass(function EngineOptions() {
  engine_classCallCheck(this, EngineOptions);
})));
var grimoireCCS = "grimoire_macro";
var Engine = /*#__PURE__*/function () {
  /**
   * Create the engine.
   * @param tasks A list of tasks for looking up task dependencies.
   * @param options Basic configuration of the engine.
   */
  function Engine(tasks, options) {
    engine_classCallCheck(this, Engine);

    this.attempts = {};
    this.propertyManager = new PropertiesManager();
    this.tasks_by_name = new Map();
    this.tasks = tasks;
    this.options = options !== null && options !== void 0 ? options : {};

    var _iterator = engine_createForOfIteratorHelper(tasks),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var task = _step.value;
        this.tasks_by_name.set(task.name, task);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.initPropertiesManager(this.propertyManager);
  }
  /**
   * Determine the next task to perform.
   * By default, this is the first task in the task list that is available.
   * @returns The next task to perform, or undefined if no tasks are available.
   */


  engine_createClass(Engine, [{
    key: "getNextTask",
    value: function getNextTask() {
      return this.tasks.find(task => this.available(task));
    }
    /**
     * Continually get the next task and execute it.
     * @param actions If given, only perform up to this many tasks.
     */

  }, {
    key: "run",
    value: function run(actions) {
      for (var i = 0; i < (actions !== null && actions !== void 0 ? actions : Infinity); i++) {
        var task = this.getNextTask();
        if (!task) return;
        this.execute(task);
      }
    }
    /**
     * Close the engine and reset all properties.
     * After this has been called, this object should not be used.
     */

  }, {
    key: "destruct",
    value: function destruct() {
      this.propertyManager.resetAll();
    }
    /**
     * Check if the given task is available at this moment.
     * @returns true if all dependencies are complete and the task is ready.
     *  Note that dependencies are not checked transitively. That is, if
     *  A depends on B which depends on C, then A is ready if B is complete
     *  (regardless of if C is complete or not).
     */

  }, {
    key: "available",
    value: function available(task) {
      var _a;

      var _iterator2 = engine_createForOfIteratorHelper((_a = task.after) !== null && _a !== void 0 ? _a : []),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var after = _step2.value;
          var after_task = this.tasks_by_name.get(after);
          if (after_task === undefined) throw "Unknown task dependency ".concat(after, " on ").concat(task.name);
          if (!after_task.completed()) return false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (task.ready && !task.ready()) return false;
      if (task.completed()) return false;
      return true;
    }
    /**
     * Perform all steps to execute the provided task.
     * This is the main entry point for the Engine.
     * @param task The current executing task.
     */

  }, {
    key: "execute",
    value: function execute(task) {
      var _a, _b, _c;

      (0,external_kolmafia_namespaceObject.print)("");
      (0,external_kolmafia_namespaceObject.print)("Executing ".concat(task.name), "blue"); // Acquire any items and effects first, possibly for later execution steps.

      this.acquireItems(task);
      this.acquireEffects(task); // Prepare the outfit, with resources.

      var task_combat = (_b = (_a = task.combat) === null || _a === void 0 ? void 0 : _a.clone()) !== null && _b !== void 0 ? _b : new CombatStrategy();
      var outfit = this.createOutfit(task);
      var task_resources = new CombatResources();
      this.customize(task, outfit, task_combat, task_resources);
      this.dress(task, outfit); // Prepare combat and choices

      this.setCombat(task, task_combat, task_resources);
      this.setChoices(task, this.propertyManager); // Actually perform the task

      var _iterator3 = engine_createForOfIteratorHelper(task_resources.all()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var resource = _step3.value;
          (_c = resource.prepare) === null || _c === void 0 ? void 0 : _c.call(resource);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.prepare(task);
      this.do(task);

      while (this.shouldRepeatAdv(task)) {
        _set("lastEncounter", "");
        this.do(task);
      }

      this.post(task); // Mark that we tried the task, and apply limits

      this.markAttempt(task);
      if (!task.completed()) this.checkLimits(task);
    }
    /**
     * Acquire all items for the task.
     * @param task The current executing task.
     */

  }, {
    key: "acquireItems",
    value: function acquireItems(task) {
      var _a;

      var acquire = task.acquire instanceof Function ? task.acquire() : task.acquire;

      var _iterator4 = engine_createForOfIteratorHelper(acquire || []),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var to_get = _step4.value;
          var num_needed = (_a = to_get.num) !== null && _a !== void 0 ? _a : 1;
          var num_have = (0,external_kolmafia_namespaceObject.itemAmount)(to_get.item) + (0,external_kolmafia_namespaceObject.equippedAmount)(to_get.item);
          if (num_needed <= num_have) continue;
          if (to_get.useful !== undefined && !to_get.useful()) continue;

          if (to_get.get) {
            to_get.get();
          } else if (to_get.price !== undefined) {
            (0,external_kolmafia_namespaceObject.buy)(to_get.item, num_needed - num_have, to_get.price);
          } else if (Object.keys((0,external_kolmafia_namespaceObject.getRelated)(to_get.item, "fold")).length > 0) {
            (0,external_kolmafia_namespaceObject.cliExecute)("fold ".concat(to_get.item));
          } else {
            (0,external_kolmafia_namespaceObject.retrieveItem)(to_get.item, num_needed);
          }

          if ((0,external_kolmafia_namespaceObject.itemAmount)(to_get.item) + (0,external_kolmafia_namespaceObject.equippedAmount)(to_get.item) < num_needed && !to_get.optional) {
            throw "Task ".concat(task.name, " was unable to acquire ").concat(num_needed, " ").concat(to_get.item);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    /**
     * Acquire all effects for the task.
     * @param task The current executing task.
     */

  }, {
    key: "acquireEffects",
    value: function acquireEffects(task) {
      var _a, _b, _c;

      var songs = (_b = (_a = task.effects) === null || _a === void 0 ? void 0 : _a.filter(effect => isSong(effect))) !== null && _b !== void 0 ? _b : [];
      if (songs.length > maxSongs()) throw "Too many AT songs";
      var extraSongs = Object.keys((0,external_kolmafia_namespaceObject.myEffects)()).map(effectName => (0,external_kolmafia_namespaceObject.toEffect)(effectName)).filter(effect => isSong(effect) && !songs.includes(effect));

      while (songs.length + extraSongs.length > maxSongs()) {
        var toRemove = extraSongs.pop();

        if (toRemove === undefined) {
          break;
        } else {
          uneffect(toRemove);
        }
      }

      var _iterator5 = engine_createForOfIteratorHelper((_c = task.effects) !== null && _c !== void 0 ? _c : []),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var effect = _step5.value;
          ensureEffect(effect);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
    /**
     * Create an outfit for the task with all required equipment.
     * @param task The current executing task.
     */

  }, {
    key: "createOutfit",
    value: function createOutfit(task) {
      var spec = typeof task.outfit === "function" ? task.outfit() : task.outfit;
      var outfit = new Outfit();

      if (spec !== undefined) {
        if (!outfit.equip(spec)) {
          throw "Unable to equip all items for ".concat(task.name);
        }
      }

      return outfit;
    }
    /**
     * Equip the outfit for the task.
     * @param task The current executing task.
     * @param outfit The outfit for the task, possibly augmented by the engine.
     */

  }, {
    key: "dress",
    value: function dress(task, outfit) {
      outfit.dress();
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */

    /**
     * Perform any engine-specific customization for the outfit and combat plan.
     *
     * This is a natural method to override in order to:
     *   * Enable the use of any resources in the outfit or combat (e.g., allocate banishers).
     *   * Equip a default outfit.
     *   * Determine additional monster macros at a global level (e.g., use flyers).
     * @param task The current executing task.
     * @param outfit The outfit for the task.
     * @param combat The combat strategy so far for the task.
     * @param resources The combat resources assigned so far for the task.
     */

  }, {
    key: "customize",
    value: function customize(task, outfit, combat, resources) {// do nothing by default
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */

    /**
     * Set the choice settings for the task.
     * @param task The current executing task.
     * @param manager The property manager to use.
     */

  }, {
    key: "setChoices",
    value: function setChoices(task, manager) {
      var choices = {};

      for (var choice_id_str in task.choices) {
        var choice_id = parseInt(choice_id_str);
        var choice = task.choices[choice_id];
        if (typeof choice === "number") choices[choice_id] = choice;else choices[choice_id] = choice();
      }

      manager.setChoices(choices);
    }
    /**
     * Save the combat macro for this task.
     * @param task The current executing task.
     * @param combat The completed combat strategy far for the task.
     * @param resources The combat resources assigned for the task.
     */

  }, {
    key: "setCombat",
    value: function setCombat(task, task_combat, task_resources) {
      var _a;

      var macro = task_combat.compile(task_resources, (_a = this.options) === null || _a === void 0 ? void 0 : _a.combat_defaults, task.do instanceof external_kolmafia_namespaceObject.Location ? task.do : undefined);
      macro.save();

      if (!this.options.ccs) {
        // Use the macro through a CCS file
        (0,external_kolmafia_namespaceObject.writeCcs)("[ default ]\n\"".concat(macro.toString(), "\""), grimoireCCS);
        (0,external_kolmafia_namespaceObject.cliExecute)("ccs ".concat(grimoireCCS)); // force Mafia to reparse the ccs
      }

      (0,external_kolmafia_namespaceObject.logprint)("Macro: ".concat(macro.toString()));
    }
    /**
     * Do any task-specific preparation.
     * @param task The current executing task.
     */

  }, {
    key: "prepare",
    value: function prepare(task) {
      var _a;

      (_a = task.prepare) === null || _a === void 0 ? void 0 : _a.call(task);
    }
    /**
     * Actually perform the task.
     * @param task The current executing task.
     */

  }, {
    key: "do",
    value: function _do(task) {
      if (typeof task.do === "function") {
        task.do();
      } else {
        (0,external_kolmafia_namespaceObject.adv1)(task.do, 0, "");
      }

      (0,external_kolmafia_namespaceObject.runCombat)();

      while ((0,external_kolmafia_namespaceObject.inMultiFight)()) {
        (0,external_kolmafia_namespaceObject.runCombat)();
      }

      if ((0,external_kolmafia_namespaceObject.choiceFollowsFight)()) (0,external_kolmafia_namespaceObject.runChoice)(-1);
    }
    /**
     * Check if the task.do should be immediately repeated without any prep.
     *
     * By default, this is only used to repeat a task if we hit one of:
     *   1. Halloweener dog noncombats,
     *   2. June cleaver noncombats, or
     *   3. Lil' Doctor™ bag noncombt.
     * @param task The current executing task.
     * @returns True if the task should be immediately repeated.
     */

  }, {
    key: "shouldRepeatAdv",
    value: function shouldRepeatAdv(task) {
      return task.do instanceof external_kolmafia_namespaceObject.Location && lastEncounterWasWanderingNC();
    }
    /**
     * Do any task-specific wrapup activities.
     * @param task The current executing task.
     */

  }, {
    key: "post",
    value: function post(task) {
      var _a;

      (_a = task.post) === null || _a === void 0 ? void 0 : _a.call(task);
    }
    /**
     * Mark that an attempt was made on the current task.
     * @param task The current executing task.
     */

  }, {
    key: "markAttempt",
    value: function markAttempt(task) {
      if (!(task.name in this.attempts)) this.attempts[task.name] = 0;
      this.attempts[task.name]++;
    }
    /**
     * Check if the task has passed any of its internal limits.
     * @param task The task to check.
     * @throws An error if any of the internal limits have been passed.
     */

  }, {
    key: "checkLimits",
    value: function checkLimits(task) {
      if (!task.limit) return;
      var failureMessage = task.limit.message ? " ".concat(task.limit.message) : "";
      if (task.limit.tries && this.attempts[task.name] >= task.limit.tries) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.tries, " attempts. Please check what went wrong.").concat(failureMessage);
      if (task.limit.soft && this.attempts[task.name] >= task.limit.soft) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.soft, " attempts. Please check what went wrong (you may just be unlucky).").concat(failureMessage);
      if (task.limit.turns && task.do instanceof external_kolmafia_namespaceObject.Location && task.do.turnsSpent >= task.limit.turns) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.turns, " turns. Please check what went wrong.").concat(failureMessage);
    }
    /**
     * Initialize properties for the script.
     * @param manager The properties manager to use.
     */

  }, {
    key: "initPropertiesManager",
    value: function initPropertiesManager(manager) {
      var _a; // Properties adapted from garbo


      manager.set({
        logPreferenceChange: true,
        logPreferenceChangeFilter: engine_toConsumableArray(new Set([].concat(engine_toConsumableArray(property_get("logPreferenceChangeFilter").split(",")), ["libram_savedMacro", "maximizerMRUList", "testudinalTeachings", "_lastCombatStarted"]))).sort().filter(a => a).join(","),
        battleAction: "custom combat script",
        autoSatisfyWithMall: true,
        autoSatisfyWithNPCs: true,
        autoSatisfyWithCoinmasters: true,
        autoSatisfyWithStash: false,
        dontStopForCounters: true,
        maximizerFoldables: true,
        hpAutoRecovery: "-0.05",
        hpAutoRecoveryTarget: "0.0",
        mpAutoRecovery: "-0.05",
        mpAutoRecoveryTarget: "0.0",
        afterAdventureScript: "",
        betweenBattleScript: "",
        choiceAdventureScript: "",
        familiarScript: "",
        currentMood: "apathetic",
        autoTuxedo: true,
        autoPinkyRing: true,
        autoGarish: true,
        allowNonMoodBurning: false,
        allowSummonBurning: true,
        libramSkillsSoftcore: "none"
      });

      if (this.options.ccs !== "") {
        if (this.options.ccs === undefined && (0,external_kolmafia_namespaceObject.readCcs)(grimoireCCS) === "") {
          // Write a simple CCS so we can switch to it
          (0,external_kolmafia_namespaceObject.writeCcs)("[ default ]\nabort", grimoireCCS);
        }

        manager.set({
          customCombatScript: (_a = this.options.ccs) !== null && _a !== void 0 ? _a : grimoireCCS
        });
      }
    }
  }]);

  return Engine;
}();
function maxSongs() {
  return have($skill(engine_templateObject || (engine_templateObject = engine_taggedTemplateLiteral(["Mariachi Memory"])))) ? 4 : 3;
}
var wanderingNCs = new Set(["Wooof! Wooooooof!", "Playing Fetch*", "A Pound of Cure", "Aunts not Ants", "Bath Time", "Beware of Aligator", "Delicious Sprouts", "Hypnotic Master", "Lost and Found", "Poetic Justice", "Summer Days", "Teacher's Pet"]);
/**
 * Return true if the last adv was one of:
 *   1. Halloweener dog noncombats,
 *   2. June cleaver noncombats, or
 *   3. Lil' Doctor™ bag noncombt.
 */

function lastEncounterWasWanderingNC() {
  return wanderingNCs.has(property_get("lastEncounter"));
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/route.js
function route_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = route_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function route_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return route_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return route_arrayLikeToArray(o, minLen); }

function route_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getTasks(quests) {
  var implicitAfter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _a, _b;

  var result = [];

  var _iterator = route_createForOfIteratorHelper(quests),
      _step;

  try {
    var _loop = function _loop() {
      var quest = _step.value;
      var questCompleted = quest.completed;

      var _iterator3 = route_createForOfIteratorHelper(quest.tasks),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _task2 = _step3.value;
          // Include quest name in task names and dependencies (unless dependency quest is given)
          _task2.name = "".concat(quest.name, "/").concat(_task2.name);
          _task2.after = (_a = _task2.after) === null || _a === void 0 ? void 0 : _a.map(after => after.includes("/") ? after : "".concat(quest.name, "/").concat(after)); // Include previous task as a dependency

          if (implicitAfter && _task2.after === undefined && result.length > 0) _task2.after = [result[result.length - 1].name]; // Include quest completion in task completion

          if (questCompleted !== undefined) {
            (function () {
              var taskCompleted = _task2.completed;

              _task2.completed = () => questCompleted() || taskCompleted();
            })();
          }

          result.push(_task2);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    } // Verify the dependency names of all tasks

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var names = new Set();

  for (var _i = 0, _result = result; _i < _result.length; _i++) {
    var task = _result[_i];
    names.add(task.name);
  }

  for (var _i2 = 0, _result2 = result; _i2 < _result2.length; _i2++) {
    var _task = _result2[_i2];

    var _iterator2 = route_createForOfIteratorHelper((_b = _task.after) !== null && _b !== void 0 ? _b : []),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var after = _step2.value;

        if (!names.has(after)) {
          throw "Unknown task dependency ".concat(after, " of ").concat(_task.name);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return result;
}
function orderByRoute(tasks, routing, ignore_missing_tasks) {
  var priorities = new Map();

  var _iterator4 = route_createForOfIteratorHelper(tasks),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var task = _step4.value;
      priorities.set(task.name, [1000, task]);
    } // Prioritize the routing list of tasks first

  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  function setPriorityRecursive(task, priority) {
    var _a;

    var old_priority = priorities.get(task);

    if (old_priority === undefined) {
      if (ignore_missing_tasks) return;
      throw "Unknown routing task ".concat(task);
    }

    if (old_priority[0] <= priority) return;
    priorities.set(task, [priority, old_priority[1]]);

    var _iterator5 = route_createForOfIteratorHelper((_a = old_priority[1].after) !== null && _a !== void 0 ? _a : []),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var requirement = _step5.value;
        setPriorityRecursive(requirement, priority - 0.01);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }

  for (var i = 0; i < routing.length; i++) {
    setPriorityRecursive(routing[i], i);
  } // Sort all tasks by priority.
  // Since this sort is stable, we default to earlier tasks.


  var result = tasks.slice();
  result.sort((a, b) => (priorities.get(a.name) || [1000])[0] - (priorities.get(b.name) || [1000])[0]);
  return result;
}
;// CONCATENATED MODULE: ./node_modules/grimoire-kolmafia/dist/index.js






;// CONCATENATED MODULE: ./src/engine/combat.ts
var engine_combat_templateObject, engine_combat_templateObject2, combat_templateObject3, combat_templateObject4, combat_templateObject5, combat_templateObject6;

function engine_combat_toConsumableArray(arr) { return engine_combat_arrayWithoutHoles(arr) || engine_combat_iterableToArray(arr) || engine_combat_unsupportedIterableToArray(arr) || engine_combat_nonIterableSpread(); }

function engine_combat_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_combat_arrayLikeToArray(o, minLen); }

function engine_combat_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_combat_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_combat_arrayLikeToArray(arr); }

function engine_combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function engine_combat_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_combat_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function engine_combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function engine_combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) engine_combat_setPrototypeOf(subClass, superClass); }

function engine_combat_setPrototypeOf(o, p) { engine_combat_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return engine_combat_setPrototypeOf(o, p); }

function engine_combat_createSuper(Derived) { var hasNativeReflectConstruct = engine_combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = engine_combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = engine_combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return engine_combat_possibleConstructorReturn(this, result); }; }

function engine_combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return engine_combat_assertThisInitialized(self); }

function engine_combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function engine_combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function engine_combat_getPrototypeOf(o) { engine_combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return engine_combat_getPrototypeOf(o); }




var myActions = ["ignore", // Task doesn't care what happens
"ignoreNoBanish", // Task doesn't care what happens, as long as it is not banished
"kill", // Task needs to kill it, with or without a free kill
"killFree", // Task needs to kill it with a free kill
"killHard", // Task needs to kill it without using a free kill (i.e., boss, or already free)
"banish", // Task doesn't care what happens, but banishing is useful
"abort", // Abort the macro and the script; an error has occured
"killItem" // Kill with an item boost
];
var combat_CombatStrategy = /*#__PURE__*/function (_BaseCombatStrategy$w) {
  engine_combat_inherits(CombatStrategy, _BaseCombatStrategy$w);

  var _super = engine_combat_createSuper(CombatStrategy);

  function CombatStrategy() {
    engine_combat_classCallCheck(this, CombatStrategy);

    return _super.apply(this, arguments);
  }

  return engine_combat_createClass(CombatStrategy);
}(CombatStrategy.withActions(myActions));
var MyActionDefaults = /*#__PURE__*/function () {
  function MyActionDefaults() {
    engine_combat_classCallCheck(this, MyActionDefaults);
  }

  engine_combat_createClass(MyActionDefaults, [{
    key: "ignore",
    value: function ignore(target) {
      return this.kill(target);
    }
  }, {
    key: "kill",
    value: function kill(target) {
      return this.killWith(target, $skill(engine_combat_templateObject || (engine_combat_templateObject = engine_combat_taggedTemplateLiteral(["Infinite Loop"]))), $stat(engine_combat_templateObject2 || (engine_combat_templateObject2 = engine_combat_taggedTemplateLiteral(["Moxie"]))));
    }
  }, {
    key: "killHard",
    value: function killHard(target) {
      return this.kill(target);
    }
  }, {
    key: "ignoreNoBanish",
    value: function ignoreNoBanish(target) {
      return this.kill(target);
    }
  }, {
    key: "killFree",
    value: function killFree() {
      return this.abort();
    } // Abort if no resource provided

  }, {
    key: "banish",
    value: function banish(target) {
      return this.kill(target);
    }
  }, {
    key: "abort",
    value: function abort() {
      return new Macro().abort();
    }
  }, {
    key: "killItem",
    value: function killItem(target) {
      if (have($skill(combat_templateObject3 || (combat_templateObject3 = engine_combat_taggedTemplateLiteral(["Double Nanovision"]))))) return this.killWith(target, $skill(combat_templateObject4 || (combat_templateObject4 = engine_combat_taggedTemplateLiteral(["Double Nanovision"]))), $stat(combat_templateObject5 || (combat_templateObject5 = engine_combat_taggedTemplateLiteral(["Mysticality"]))));else return this.kill(target);
    }
  }, {
    key: "killWith",
    value: function killWith(target, killing_blow, killing_stat) {
      if (target instanceof external_kolmafia_namespaceObject.Monster && target.physicalResistance >= 70 || (0,external_kolmafia_namespaceObject.myMp)() < 20 || !have(killing_blow)) return new Macro().attack().repeat(); // Weaken monsters with Pseudopod slap until they are in range of our kill.
      // Since monsterhpabove is locked behind manuel/factoids, just do the maximum
      // number of slaps we could ever need for the monster/zone.

      if ((0,external_kolmafia_namespaceObject.myBuffedstat)(killing_stat) * (0,external_kolmafia_namespaceObject.floor)((0,external_kolmafia_namespaceObject.myMp)() / 20) < 100) {
        var HPgap = maxHP(target) - (0,external_kolmafia_namespaceObject.myBuffedstat)(killing_stat) * (0,external_kolmafia_namespaceObject.floor)((0,external_kolmafia_namespaceObject.myMp)() / 20);
        var slaps = Math.ceil(HPgap / 10);

        if (slaps > 0) {
          return new Macro().while_("!times ".concat(slaps), new Macro().skill($skill(combat_templateObject6 || (combat_templateObject6 = engine_combat_taggedTemplateLiteral(["Pseudopod Slap"]))))).while_("!mpbelow 20", new Macro().skill(killing_blow)).attack().repeat();
        }
      }

      return new Macro().while_("!mpbelow 20", new Macro().skill(killing_blow)).attack().repeat();
    }
  }]);

  return MyActionDefaults;
}();

function getMonsters(where) {
  if (where === undefined) return [];
  return Object.entries((0,external_kolmafia_namespaceObject.appearanceRates)(where)) // Get the maximum HP in the location
  .filter(i => i[1] > 0).map(i => external_kolmafia_namespaceObject.Monster.get(i[0]));
}

function maxHP(target) {
  if (target === undefined) return 1;
  var base = target instanceof external_kolmafia_namespaceObject.Location ? Math.max.apply(Math, engine_combat_toConsumableArray(getMonsters(target).map(maxHP))) : target.baseHp;
  return Math.floor(1.05 * base) + (0,external_kolmafia_namespaceObject.numericModifier)("Monster Level");
}
;// CONCATENATED MODULE: ./src/lib.ts
var lib_templateObject, lib_templateObject2, lib_templateObject3, lib_templateObject4, lib_templateObject5, lib_templateObject6, lib_templateObject7, lib_templateObject8, lib_templateObject9, lib_templateObject10, lib_templateObject11, lib_templateObject12, lib_templateObject13, lib_templateObject14, lib_templateObject15, lib_templateObject16, lib_templateObject17, lib_templateObject18, lib_templateObject19, lib_templateObject20, lib_templateObject21, lib_templateObject22, lib_templateObject23, lib_templateObject24;

function lib_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



function debug(message, color) {
  if (color) {
    (0,external_kolmafia_namespaceObject.print)(message, color);
  } else {
    (0,external_kolmafia_namespaceObject.print)(message);
  }
} // From phccs

function convertMilliseconds(milliseconds) {
  var seconds = milliseconds / 1000;
  var minutes = Math.floor(seconds / 60);
  var secondsLeft = Math.round((seconds - minutes * 60) * 1000) / 1000;
  var hours = Math.floor(minutes / 60);
  var minutesLeft = Math.round(minutes - hours * 60);
  return (hours !== 0 ? "".concat(hours, " hours, ") : "") + (minutesLeft !== 0 ? "".concat(minutesLeft, " minutes, ") : "") + (secondsLeft !== 0 ? "".concat(secondsLeft, " seconds") : "");
}
function atLevel(level) {
  var goal = Math.pow(level - 1, 2) + 4;
  return (0,external_kolmafia_namespaceObject.myBasestat)($stat(lib_templateObject || (lib_templateObject = lib_taggedTemplateLiteral(["muscle"])))) >= goal || (0,external_kolmafia_namespaceObject.myBasestat)($stat(lib_templateObject2 || (lib_templateObject2 = lib_taggedTemplateLiteral(["mysticality"])))) >= goal || (0,external_kolmafia_namespaceObject.myBasestat)($stat(lib_templateObject3 || (lib_templateObject3 = lib_taggedTemplateLiteral(["moxie"])))) >= goal;
}
var legionForms = [template_string_$item(lib_templateObject4 || (lib_templateObject4 = lib_taggedTemplateLiteral(["Loathing Legion abacus"]))), template_string_$item(lib_templateObject5 || (lib_templateObject5 = lib_taggedTemplateLiteral(["Loathing Legion can opener"]))), template_string_$item(lib_templateObject6 || (lib_templateObject6 = lib_taggedTemplateLiteral(["Loathing Legion chainsaw"]))), template_string_$item(lib_templateObject7 || (lib_templateObject7 = lib_taggedTemplateLiteral(["Loathing Legion corkscrew"]))), template_string_$item(lib_templateObject8 || (lib_templateObject8 = lib_taggedTemplateLiteral(["Loathing Legion defibrillator"]))), template_string_$item(lib_templateObject9 || (lib_templateObject9 = lib_taggedTemplateLiteral(["Loathing Legion double prism"]))), template_string_$item(lib_templateObject10 || (lib_templateObject10 = lib_taggedTemplateLiteral(["Loathing Legion electric knife"]))), template_string_$item(lib_templateObject11 || (lib_templateObject11 = lib_taggedTemplateLiteral(["Loathing Legion flamethrower"]))), template_string_$item(lib_templateObject12 || (lib_templateObject12 = lib_taggedTemplateLiteral(["Loathing Legion hammer"]))), template_string_$item(lib_templateObject13 || (lib_templateObject13 = lib_taggedTemplateLiteral(["Loathing Legion helicopter"]))), template_string_$item(lib_templateObject14 || (lib_templateObject14 = lib_taggedTemplateLiteral(["Loathing Legion jackhammer"]))), template_string_$item(lib_templateObject15 || (lib_templateObject15 = lib_taggedTemplateLiteral(["Loathing Legion kitchen sink"]))), template_string_$item(lib_templateObject16 || (lib_templateObject16 = lib_taggedTemplateLiteral(["Loathing Legion knife"]))), template_string_$item(lib_templateObject17 || (lib_templateObject17 = lib_taggedTemplateLiteral(["Loathing Legion many-purpose hook"]))), template_string_$item(lib_templateObject18 || (lib_templateObject18 = lib_taggedTemplateLiteral(["Loathing Legion moondial"]))), template_string_$item(lib_templateObject19 || (lib_templateObject19 = lib_taggedTemplateLiteral(["Loathing Legion necktie"]))), template_string_$item(lib_templateObject20 || (lib_templateObject20 = lib_taggedTemplateLiteral(["Loathing Legion pizza stone"]))), template_string_$item(lib_templateObject21 || (lib_templateObject21 = lib_taggedTemplateLiteral(["Loathing Legion rollerblades"]))), template_string_$item(lib_templateObject22 || (lib_templateObject22 = lib_taggedTemplateLiteral(["Loathing Legion tape measure"]))), template_string_$item(lib_templateObject23 || (lib_templateObject23 = lib_taggedTemplateLiteral(["Loathing Legion tattoo needle"]))), template_string_$item(lib_templateObject24 || (lib_templateObject24 = lib_taggedTemplateLiteral(["Loathing Legion universal screwdriver"])))];
function haveLoathingLegion() {
  return legionForms.some(item => have(item));
}
;// CONCATENATED MODULE: ./src/tasks/level13.ts
var level13_templateObject, level13_templateObject2, level13_templateObject3, level13_templateObject4, level13_templateObject5, level13_templateObject6, level13_templateObject7, level13_templateObject8, level13_templateObject9, level13_templateObject10, level13_templateObject11, level13_templateObject12, level13_templateObject13, level13_templateObject14, level13_templateObject15, level13_templateObject16, level13_templateObject17, level13_templateObject18, level13_templateObject19, level13_templateObject20, level13_templateObject21, level13_templateObject22, level13_templateObject23, level13_templateObject24, level13_templateObject25, level13_templateObject26, level13_templateObject27, level13_templateObject28, level13_templateObject29, level13_templateObject30, level13_templateObject31, level13_templateObject32, level13_templateObject33, level13_templateObject34, level13_templateObject35, level13_templateObject36, level13_templateObject37, level13_templateObject38, level13_templateObject39, level13_templateObject40, level13_templateObject41, level13_templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104;

function level13_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var Challenges = [{
  name: "Speed Challenge",
  after: ["Start", "Absorb/Overclocking"],
  ready: () => towerReady(),
  completed: () => property_get("nsContestants1") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(1);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "init",
    familiar: template_string_$familiar(level13_templateObject || (level13_templateObject = level13_taggedTemplateLiteral(["Oily Woim"])))
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Moxie Challenge",
  after: ["Start"],
  ready: () => property_get("nsChallenge1") === $stat(level13_templateObject2 || (level13_templateObject2 = level13_taggedTemplateLiteral(["Moxie"]))) && towerReady(),
  completed: () => property_get("nsContestants2") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(2);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "moxie"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Muscle Challenge",
  after: ["Start"],
  ready: () => property_get("nsChallenge1") === $stat(level13_templateObject3 || (level13_templateObject3 = level13_taggedTemplateLiteral(["Muscle"]))) && towerReady(),
  completed: () => property_get("nsContestants2") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(2);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "muscle"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Mysticality Challenge",
  after: ["Start"],
  ready: () => property_get("nsChallenge1") === $stat(level13_templateObject4 || (level13_templateObject4 = level13_taggedTemplateLiteral(["Mysticality"]))) && towerReady(),
  completed: () => property_get("nsContestants2") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(2);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "mysticality"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Hot Challenge",
  after: ["Start"],
  ready: () => property_get("nsChallenge2") === "hot" && towerReady(),
  completed: () => property_get("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(3);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "hot dmg, hot spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Cold Challenge",
  after: ["Start"],
  ready: () => property_get("nsChallenge2") === "cold" && towerReady(),
  completed: () => property_get("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(3);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "cold dmg, cold spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Spooky Challenge",
  after: ["Start"],
  ready: () => property_get("nsChallenge2") === "spooky" && towerReady(),
  completed: () => property_get("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(3);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "spooky dmg, spooky spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Stench Challenge",
  after: ["Start"],
  ready: () => property_get("nsChallenge2") === "stench" && towerReady(),
  completed: () => property_get("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(3);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "stench dmg, stench spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Sleaze Challenge",
  after: ["Start"],
  ready: () => property_get("nsChallenge2") === "sleaze" && towerReady(),
  completed: () => property_get("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_namespaceObject.runChoice)(3);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  },
  outfit: {
    modifier: "sleaze dmg, sleaze spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var ChallengeBosses = [{
  name: "Speed Boss",
  after: ["Speed Challenge"],
  completed: () => property_get("nsContestants1") === 0,
  do: $location(level13_templateObject5 || (level13_templateObject5 = level13_taggedTemplateLiteral(["Fastest Adventurer Contest"]))),
  combat: new combat_CombatStrategy().killHard(),
  limit: {
    tries: 5
  },
  boss: true
}, {
  name: "Stat Boss",
  after: ["Muscle Challenge", "Moxie Challenge", "Mysticality Challenge"],
  completed: () => property_get("nsContestants2") === 0,
  do: $location(level13_templateObject6 || (level13_templateObject6 = level13_taggedTemplateLiteral(["A Crowd of (Stat) Adventurers"]))),
  combat: new combat_CombatStrategy().killHard(),
  limit: {
    tries: 1
  },
  boss: true
}, {
  name: "Element Boss",
  after: ["Hot Challenge", "Cold Challenge", "Spooky Challenge", "Stench Challenge", "Sleaze Challenge"],
  completed: () => property_get("nsContestants3") === 0,
  do: $location(level13_templateObject7 || (level13_templateObject7 = level13_taggedTemplateLiteral(["A Crowd of (Element) Adventurers"]))),
  combat: new combat_CombatStrategy().killHard(),
  limit: {
    tries: 10
  },
  boss: true
}];
var Door = [{
  name: "Boris Lock",
  after: ["Maze", "Keys/All Heroes"],
  acquire: [{
    item: template_string_$item(level13_templateObject8 || (level13_templateObject8 = level13_taggedTemplateLiteral(["Boris's key"])))
  }],
  completed: () => property_get("nsTowerDoorKeysUsed").includes("Boris"),
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock1"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Jarlsberg Lock",
  after: ["Maze", "Keys/All Heroes"],
  acquire: [{
    item: template_string_$item(level13_templateObject9 || (level13_templateObject9 = level13_taggedTemplateLiteral(["Jarlsberg's key"])))
  }],
  completed: () => property_get("nsTowerDoorKeysUsed").includes("Jarlsberg"),
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock2"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Sneaky Pete Lock",
  after: ["Maze", "Keys/All Heroes"],
  acquire: [{
    item: template_string_$item(level13_templateObject10 || (level13_templateObject10 = level13_taggedTemplateLiteral(["Sneaky Pete's key"])))
  }],
  completed: () => property_get("nsTowerDoorKeysUsed").includes("Sneaky Pete"),
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock3"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Star Lock",
  after: ["Maze", "Keys/Star Key"],
  acquire: [{
    item: template_string_$item(level13_templateObject11 || (level13_templateObject11 = level13_taggedTemplateLiteral(["Richard's star key"])))
  }],
  completed: () => property_get("nsTowerDoorKeysUsed").includes("Richard's star key"),
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock4"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Digital Lock",
  after: ["Maze", "Keys/Digital Key"],
  acquire: [{
    item: template_string_$item(level13_templateObject12 || (level13_templateObject12 = level13_taggedTemplateLiteral(["digital key"])))
  }],
  completed: () => property_get("nsTowerDoorKeysUsed").includes("digital key"),
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock5"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Skeleton Lock",
  after: ["Maze", "Keys/Skeleton Key"],
  acquire: [{
    item: template_string_$item(level13_templateObject13 || (level13_templateObject13 = level13_taggedTemplateLiteral(["skeleton key"])))
  }],
  completed: () => property_get("nsTowerDoorKeysUsed").includes("skeleton key"),
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock6"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Door",
  after: ["Boris Lock", "Jarlsberg Lock", "Sneaky Pete Lock", "Star Lock", "Digital Lock", "Skeleton Lock"],
  completed: () => step("questL13Final") > 5,
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=ns_doorknob"),
  limit: {
    tries: 1
  },
  freeaction: true
}];
var wand = [{
  name: "Wand W",
  after: ["Wall of Bones"],
  ready: () => !have(template_string_$item(level13_templateObject14 || (level13_templateObject14 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => have(template_string_$item(level13_templateObject15 || (level13_templateObject15 = level13_taggedTemplateLiteral(["ruby W"])))) || have(template_string_$item(level13_templateObject16 || (level13_templateObject16 = level13_taggedTemplateLiteral(["WA"])))) || have(template_string_$item(level13_templateObject17 || (level13_templateObject17 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || towerSkip(),
  do: $location(level13_templateObject18 || (level13_templateObject18 = level13_taggedTemplateLiteral(["Pandamonium Slums"]))),
  outfit: {
    modifier: "item"
  },
  combat: new combat_CombatStrategy().killItem($monster(level13_templateObject19 || (level13_templateObject19 = level13_taggedTemplateLiteral(["W imp"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Wand A",
  after: ["Wall of Bones"],
  ready: () => !have(template_string_$item(level13_templateObject20 || (level13_templateObject20 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => have(template_string_$item(level13_templateObject21 || (level13_templateObject21 = level13_taggedTemplateLiteral(["metallic A"])))) || have(template_string_$item(level13_templateObject22 || (level13_templateObject22 = level13_taggedTemplateLiteral(["WA"])))) || have(template_string_$item(level13_templateObject23 || (level13_templateObject23 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || towerSkip(),
  do: $location(level13_templateObject24 || (level13_templateObject24 = level13_taggedTemplateLiteral(["The Penultimate Fantasy Airship"]))),
  outfit: {
    modifier: "item"
  },
  combat: new combat_CombatStrategy().killItem($monster(level13_templateObject25 || (level13_templateObject25 = level13_taggedTemplateLiteral(["MagiMechTech MechaMech"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Wand N",
  after: ["Wall of Bones"],
  ready: () => !have(template_string_$item(level13_templateObject26 || (level13_templateObject26 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => have(template_string_$item(level13_templateObject27 || (level13_templateObject27 = level13_taggedTemplateLiteral(["lowercase N"])))) || have(template_string_$item(level13_templateObject28 || (level13_templateObject28 = level13_taggedTemplateLiteral(["ND"])))) || have(template_string_$item(level13_templateObject29 || (level13_templateObject29 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || towerSkip(),
  do: $location(level13_templateObject30 || (level13_templateObject30 = level13_taggedTemplateLiteral(["The Valley of Rof L'm Fao"]))),
  outfit: {
    modifier: "item"
  },
  combat: new combat_CombatStrategy().killItem($monster(level13_templateObject31 || (level13_templateObject31 = level13_taggedTemplateLiteral(["XXX pr0n"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Wand D",
  after: ["Wall of Bones"],
  ready: () => !have(template_string_$item(level13_templateObject32 || (level13_templateObject32 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => have(template_string_$item(level13_templateObject33 || (level13_templateObject33 = level13_taggedTemplateLiteral(["heavy D"])))) || have(template_string_$item(level13_templateObject34 || (level13_templateObject34 = level13_taggedTemplateLiteral(["ND"])))) || have(template_string_$item(level13_templateObject35 || (level13_templateObject35 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || towerSkip(),
  do: $location(level13_templateObject36 || (level13_templateObject36 = level13_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
  outfit: {
    modifier: "item"
  },
  combat: new combat_CombatStrategy().killItem($monster(level13_templateObject37 || (level13_templateObject37 = level13_taggedTemplateLiteral(["Alphabet Giant"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Wand Parts",
  after: ["Wall of Bones"],
  ready: () => have(template_string_$item(level13_templateObject38 || (level13_templateObject38 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => have(template_string_$item(level13_templateObject39 || (level13_templateObject39 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || (have(template_string_$item(level13_templateObject40 || (level13_templateObject40 = level13_taggedTemplateLiteral(["WA"])))) || have(template_string_$item(level13_templateObject41 || (level13_templateObject41 = level13_taggedTemplateLiteral(["ruby W"])))) && have(template_string_$item(level13_templateObject42 || (level13_templateObject42 = level13_taggedTemplateLiteral(["metallic A"]))))) && (have(template_string_$item(_templateObject43 || (_templateObject43 = level13_taggedTemplateLiteral(["ND"])))) || have(template_string_$item(_templateObject44 || (_templateObject44 = level13_taggedTemplateLiteral(["lowercase N"])))) && have(template_string_$item(_templateObject45 || (_templateObject45 = level13_taggedTemplateLiteral(["heavy D"]))))) || towerSkip(),
  prepare: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject46 || (_templateObject46 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  do: $location(_templateObject47 || (_templateObject47 = level13_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
  limit: {
    tries: 1
  }
}, {
  name: "Wand",
  ready: () => towerReady(),
  after: ["Wand W", "Wand A", "Wand N", "Wand D", "Wand Parts"],
  completed: () => have(template_string_$item(_templateObject48 || (_templateObject48 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))),
  do: () => {
    (0,external_kolmafia_namespaceObject.cliExecute)("make Wand of Nagamar");
  },
  limit: {
    tries: 1
  }
}];
var TowerQuest = {
  name: "Tower",
  tasks: [{
    name: "Start",
    after: ["Mosquito/Finish", "Tavern/Finish", "Bat/Finish", "Knob/King", "Friar/Finish", "Crypt/Finish", "McLargeHuge/Finish", "Orc Chasm/Finish", "Giant/Finish", "Macguffin/Finish", "War/Boss Hippie"],
    ready: () => atLevel(13),
    completed: () => step("questL13Final") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }].concat(Challenges, ChallengeBosses, [{
    name: "Coronation",
    after: ["Speed Boss", "Stat Boss", "Element Boss"],
    completed: () => step("questL13Final") > 2,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
      (0,external_kolmafia_namespaceObject.runChoice)(-1);
    },
    choices: {
      1003: 4
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Frank",
    after: ["Coronation"],
    completed: () => step("questL13Final") > 3,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_02_coronation");
      (0,external_kolmafia_namespaceObject.runChoice)(-1);
    },
    choices: {
      1020: 1,
      1021: 1,
      1022: 1
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Maze",
    after: ["Frank"],
    completed: () => step("questL13Final") > 4,
    prepare: () => {
      fillHp();
    },
    do: $location(_templateObject49 || (_templateObject49 = level13_taggedTemplateLiteral(["The Hedge Maze"]))),
    choices: {
      1004: 1,
      1005: 2,
      1008: 2,
      1011: 2,
      1013: 1,
      1022: 1
    },
    outfit: {
      modifier: "hot res, cold res, stench res, spooky res, sleaze res",
      familiar: template_string_$familiar(_templateObject50 || (_templateObject50 = level13_taggedTemplateLiteral(["Exotic Parrot"])))
    },
    effects: $effects(_templateObject51 || (_templateObject51 = level13_taggedTemplateLiteral(["Red Door Syndrome"]))),
    limit: {
      tries: 1
    }
  }], Door, [{
    name: "Beehive",
    after: ["Macguffin/Forest", "Reprocess/The Black Forest"],
    completed: () => have(template_string_$item(_templateObject52 || (_templateObject52 = level13_taggedTemplateLiteral(["beehive"])))) || have(template_string_$familiar(_templateObject53 || (_templateObject53 = level13_taggedTemplateLiteral(["Shorter-Order Cook"])))) || step("questL13Final") > 6,
    do: $location(_templateObject54 || (_templateObject54 = level13_taggedTemplateLiteral(["The Black Forest"]))),
    choices: {
      923: 1,
      924: 3,
      1018: 1,
      1019: 1
    },
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 5
    }
  }, {
    name: "Wall of Skin",
    after: ["Door", "Beehive"],
    prepare: () => {
      if (have(template_string_$item(_templateObject55 || (_templateObject55 = level13_taggedTemplateLiteral(["handful of hand chalk"]))))) ensureEffect($effect(_templateObject56 || (_templateObject56 = level13_taggedTemplateLiteral(["Chalky Hand"]))));
      fillHp();
    },
    completed: () => step("questL13Final") > 6,
    do: $location(_templateObject57 || (_templateObject57 = level13_taggedTemplateLiteral(["Tower Level 1"]))),
    outfit: {
      familiar: template_string_$familiar(_templateObject58 || (_templateObject58 = level13_taggedTemplateLiteral(["Shorter-Order Cook"]))),
      equip: template_string_$items(_templateObject59 || (_templateObject59 = level13_taggedTemplateLiteral(["hot plate"])))
    },
    combat: new combat_CombatStrategy().macro(new Macro().tryItem(template_string_$item(_templateObject60 || (_templateObject60 = level13_taggedTemplateLiteral(["beehive"])))).skill($skill(_templateObject61 || (_templateObject61 = level13_taggedTemplateLiteral(["Grey Noise"])))).repeat()),
    boss: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Wall of Meat",
    after: ["Wall of Skin"],
    prepare: () => {
      fillHp();
    },
    completed: () => step("questL13Final") > 7,
    do: $location(_templateObject62 || (_templateObject62 = level13_taggedTemplateLiteral(["Tower Level 2"]))),
    outfit: {
      modifier: "meat",
      equip: template_string_$items(_templateObject63 || (_templateObject63 = level13_taggedTemplateLiteral(["amulet coin"])))
    },
    combat: new combat_CombatStrategy().killHard(),
    boss: true,
    limit: {
      tries: 2
    }
  }, {
    name: "Wall of Bones",
    after: ["Wall of Meat", "Giant/Ground Knife"],
    completed: () => step("questL13Final") > 8,
    prepare: () => {
      if (have(template_string_$item(_templateObject64 || (_templateObject64 = level13_taggedTemplateLiteral(["electric boning knife"]))))) return;

      if ((0,external_kolmafia_namespaceObject.haveEquipped)(template_string_$item(_templateObject65 || (_templateObject65 = level13_taggedTemplateLiteral(["Great Wolf's rocket launcher"]))))) {
        if ((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(_templateObject66 || (_templateObject66 = level13_taggedTemplateLiteral(["moxie"])))) < 1000) ensureEffect($effect(_templateObject67 || (_templateObject67 = level13_taggedTemplateLiteral(["Cock of the Walk"]))));
        if ((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(_templateObject68 || (_templateObject68 = level13_taggedTemplateLiteral(["moxie"])))) < 1000) ensureEffect($effect(_templateObject69 || (_templateObject69 = level13_taggedTemplateLiteral(["Superhuman Sarcasm"]))));
        if ((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(_templateObject70 || (_templateObject70 = level13_taggedTemplateLiteral(["moxie"])))) < 1000) ensureEffect($effect(_templateObject71 || (_templateObject71 = level13_taggedTemplateLiteral(["Gr8ness"]))));
        fillHp();
      } else if (have(template_string_$item(_templateObject72 || (_templateObject72 = level13_taggedTemplateLiteral(["Drunkula's bell"]))))) {
        if ((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(_templateObject73 || (_templateObject73 = level13_taggedTemplateLiteral(["mysticality"])))) < 2700) ensureEffect($effect(_templateObject74 || (_templateObject74 = level13_taggedTemplateLiteral(["On the Shoulders of Giants"]))));
        if ((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(_templateObject75 || (_templateObject75 = level13_taggedTemplateLiteral(["mysticality"])))) < 2700) ensureEffect($effect(_templateObject76 || (_templateObject76 = level13_taggedTemplateLiteral(["Mystically Oiled"]))));
        if ((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(_templateObject77 || (_templateObject77 = level13_taggedTemplateLiteral(["mysticality"])))) < 2700) ensureEffect($effect(_templateObject78 || (_templateObject78 = level13_taggedTemplateLiteral(["Gr8ness"]))));
      }
    },
    do: $location(_templateObject79 || (_templateObject79 = level13_taggedTemplateLiteral(["Tower Level 3"]))),
    outfit: () => {
      if (have(template_string_$item(_templateObject80 || (_templateObject80 = level13_taggedTemplateLiteral(["Great Wolf's rocket launcher"]))))) return {
        equip: template_string_$items(_templateObject81 || (_templateObject81 = level13_taggedTemplateLiteral(["Great Wolf's rocket launcher"]))),
        modifier: "moxie"
      };
      if (have(template_string_$item(_templateObject82 || (_templateObject82 = level13_taggedTemplateLiteral(["Drunkula's bell"]))))) return {
        modifier: "myst"
      };
      return {};
    },
    combat: new combat_CombatStrategy().macro(() => {
      if (have(template_string_$item(_templateObject83 || (_templateObject83 = level13_taggedTemplateLiteral(["electric boning knife"]))))) return Macro.item(template_string_$item(_templateObject84 || (_templateObject84 = level13_taggedTemplateLiteral(["electric boning knife"]))));
      if ((0,external_kolmafia_namespaceObject.haveEquipped)(template_string_$item(_templateObject85 || (_templateObject85 = level13_taggedTemplateLiteral(["Great Wolf's rocket launcher"]))))) return Macro.skill($skill(_templateObject86 || (_templateObject86 = level13_taggedTemplateLiteral(["Fire Rocket"]))));
      if (have(template_string_$item(_templateObject87 || (_templateObject87 = level13_taggedTemplateLiteral(["Drunkula's bell"]))))) return Macro.item(template_string_$item(_templateObject88 || (_templateObject88 = level13_taggedTemplateLiteral(["Drunkula's bell"]))));
      throw "Unable to find way to kill Wall of Bones";
    }),
    boss: true,
    limit: {
      tries: 1
    }
  }], wand, [{
    name: "Mirror",
    after: ["Wall of Bones", "Wand"],
    acquire: [{
      item: template_string_$item(_templateObject89 || (_templateObject89 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))
    }],
    completed: () => step("questL13Final") > 9,
    do: $location(_templateObject90 || (_templateObject90 = level13_taggedTemplateLiteral(["Tower Level 4"]))),
    choices: {
      1015: 2
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Shadow",
    after: ["Mirror", "Absorb/Twin Peak"],
    prepare: () => {
      if (have(template_string_$item(_templateObject91 || (_templateObject91 = level13_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) && (property_get("retroCapeSuperhero") !== "heck" || property_get("retroCapeWashingInstructions") !== "hold")) {
        (0,external_kolmafia_namespaceObject.cliExecute)("retrocape heck hold");
      }

      fillHp();
    },
    completed: () => step("questL13Final") > 10,
    do: $location(_templateObject92 || (_templateObject92 = level13_taggedTemplateLiteral(["Tower Level 5"]))),
    outfit: () => {
      if (have(template_string_$item(_templateObject93 || (_templateObject93 = level13_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) return {
        equip: template_string_$items(_templateObject94 || (_templateObject94 = level13_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))
      };else if (have(template_string_$item(_templateObject95 || (_templateObject95 = level13_taggedTemplateLiteral(["attorney's badge"]))))) return {
        modifier: "HP",
        equip: template_string_$items(_templateObject96 || (_templateObject96 = level13_taggedTemplateLiteral(["attorney's badge"]))),
        avoid: template_string_$items(_templateObject97 || (_templateObject97 = level13_taggedTemplateLiteral(["extra-wide head candle"])))
      };else return {
        modifier: "HP",
        avoid: template_string_$items(_templateObject98 || (_templateObject98 = level13_taggedTemplateLiteral(["extra-wide head candle"])))
      };
    },
    combat: new combat_CombatStrategy().macro(new Macro().item(template_string_$item(_templateObject99 || (_templateObject99 = level13_taggedTemplateLiteral(["gauze garter"])))).repeat()),
    boss: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Naughty Sorceress",
    after: ["Shadow"],
    completed: () => step("questL13Final") > 11,
    do: $location(_templateObject100 || (_templateObject100 = level13_taggedTemplateLiteral(["The Naughty Sorceress' Chamber"]))),
    outfit: {
      modifier: "muscle"
    },
    combat: new combat_CombatStrategy().kill(),
    boss: true,
    limit: {
      tries: 1
    }
  }])
};
function fillHp() {
  if ((0,external_kolmafia_namespaceObject.myHp)() < (0,external_kolmafia_namespaceObject.myMaxhp)()) {
    if (!(0,external_kolmafia_namespaceObject.restoreHp)((0,external_kolmafia_namespaceObject.myMaxhp)())) {
      // Backup healing plan in a pinch
      if (have(template_string_$item(_templateObject101 || (_templateObject101 = level13_taggedTemplateLiteral(["scroll of drastic healing"]))))) {
        (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject102 || (_templateObject102 = level13_taggedTemplateLiteral(["scroll of drastic healing"]))));
      } else if (property_get("_hotTubSoaks") < 5) {
        (0,external_kolmafia_namespaceObject.visitUrl)("clan_viplounge.php?action=hottub");
      }

      var tries = 0;

      while ((0,external_kolmafia_namespaceObject.myHp)() < (0,external_kolmafia_namespaceObject.myMaxhp)() && (0,external_kolmafia_namespaceObject.myMeat)() >= 1000 && tries < 30) {
        tries++;
        (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(_templateObject103 || (_templateObject103 = level13_taggedTemplateLiteral(["Doc Galaktik's Homeopathic Elixir"]))));
        (0,external_kolmafia_namespaceObject.use)(template_string_$item(_templateObject104 || (_templateObject104 = level13_taggedTemplateLiteral(["Doc Galaktik's Homeopathic Elixir"]))));
      }
    }
  }
}
/* Skip this until ronin if the tower is delayed. */

function towerReady() {
  return !args.delaytower || (0,external_kolmafia_namespaceObject.myTurncount)() >= 1000;
}
/* Skip this entirely, either in-ronin or when delaying until ronin. */

function towerSkip() {
  return args.delaytower || (0,external_kolmafia_namespaceObject.myTurncount)() >= 1000;
}
;// CONCATENATED MODULE: ./src/tasks/keys.ts
var keys_templateObject, keys_templateObject2, keys_templateObject3, keys_templateObject4, keys_templateObject5, keys_templateObject6, keys_templateObject7, keys_templateObject8, keys_templateObject9, keys_templateObject10, keys_templateObject11, keys_templateObject12, keys_templateObject13, keys_templateObject14, keys_templateObject15, keys_templateObject16, keys_templateObject17, keys_templateObject18, keys_templateObject19, keys_templateObject20, keys_templateObject21, keys_templateObject22, keys_templateObject23, keys_templateObject24, keys_templateObject25, keys_templateObject26, keys_templateObject27, keys_templateObject28, keys_templateObject29, keys_templateObject30, keys_templateObject31, keys_templateObject32, keys_templateObject33, keys_templateObject34, keys_templateObject35, keys_templateObject36, keys_templateObject37, keys_templateObject38, keys_templateObject39, keys_templateObject40, keys_templateObject41, keys_templateObject42, keys_templateObject43, keys_templateObject44, keys_templateObject45, keys_templateObject46, keys_templateObject47, keys_templateObject48, keys_templateObject49, keys_templateObject50, keys_templateObject51, keys_templateObject52, keys_templateObject53, keys_templateObject54, keys_templateObject55, keys_templateObject56, keys_templateObject57, keys_templateObject58, keys_templateObject59, keys_templateObject60, keys_templateObject61, keys_templateObject62, keys_templateObject63, keys_templateObject64, keys_templateObject65, keys_templateObject66, keys_templateObject67, keys_templateObject68, keys_templateObject69, keys_templateObject70, keys_templateObject71, keys_templateObject72, keys_templateObject73, keys_templateObject74, keys_templateObject75, keys_templateObject76, keys_templateObject77, keys_templateObject78, keys_templateObject79, keys_templateObject80, keys_templateObject81, keys_templateObject82, keys_templateObject83, keys_templateObject84, keys_templateObject85, keys_templateObject86, keys_templateObject87, keys_templateObject88, keys_templateObject89, keys_templateObject90, keys_templateObject91;

function keys_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function keys_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? keys_ownKeys(Object(source), !0).forEach(function (key) { keys_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : keys_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function keys_toConsumableArray(arr) { return keys_arrayWithoutHoles(arr) || keys_iterableToArray(arr) || keys_unsupportedIterableToArray(arr) || keys_nonIterableSpread(); }

function keys_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function keys_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function keys_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return keys_arrayLikeToArray(arr); }

function keys_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = keys_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function keys_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return keys_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return keys_arrayLikeToArray(o, minLen); }

function keys_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function keys_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function keys_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function keys_createClass(Constructor, protoProps, staticProps) { if (protoProps) keys_defineProperties(Constructor.prototype, protoProps); if (staticProps) keys_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function keys_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function keys_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var Keys;

(function (Keys) {
  Keys["Deck"] = "Deck";
  Keys["Malware"] = "Daily Dungeon Malware";
  Keys["Dungeon"] = "Daily Dungeon";
  Keys["Fantasy"] = "Fantasy";
  Keys["Zap"] = "Zap";
})(Keys || (Keys = {}));

var heroKeys = [{
  which: Keys.Deck,
  possible: () => have(template_string_$item(keys_templateObject || (keys_templateObject = keys_taggedTemplateLiteral(["Deck of Every Card"])))) && property_get("_deckCardsDrawn") === 0,
  after: [],
  priority: () => OverridePriority.Free,
  completed: () => property_get("_deckCardsDrawn") > 0 || !have(template_string_$item(keys_templateObject2 || (keys_templateObject2 = keys_taggedTemplateLiteral(["Deck of Every Card"])))),
  do: () => {
    (0,external_kolmafia_namespaceObject.cliExecute)("cheat tower");
    if (property_get("_deckCardsDrawn") <= 10) (0,external_kolmafia_namespaceObject.cliExecute)("cheat sheep");
    if (property_get("_deckCardsDrawn") <= 10) (0,external_kolmafia_namespaceObject.cliExecute)("cheat mine");
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  which: Keys.Malware,
  possible: () => !property_get("dailyDungeonDone") && !property_get("_dailyDungeonMalwareUsed"),
  acquire: [{
    item: template_string_$item(keys_templateObject3 || (keys_templateObject3 = keys_taggedTemplateLiteral(["daily dungeon malware"])))
  }, {
    item: template_string_$item(keys_templateObject4 || (keys_templateObject4 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))),
    optional: true
  }, {
    item: template_string_$item(keys_templateObject5 || (keys_templateObject5 = keys_taggedTemplateLiteral(["eleven-foot pole"]))),
    optional: true
  }, {
    item: template_string_$item(keys_templateObject6 || (keys_templateObject6 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"]))),
    optional: true
  }],
  ready: () => (step("questL13Final") !== -1 || have(template_string_$item(keys_templateObject7 || (keys_templateObject7 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"])))) && have(template_string_$item(keys_templateObject8 || (keys_templateObject8 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) && have(template_string_$item(keys_templateObject9 || (keys_templateObject9 = keys_taggedTemplateLiteral(["eleven-foot pole"]))))) && towerReady(),
  after: [],
  completed: () => property_get("dailyDungeonDone") || property_get("_dailyDungeonMalwareUsed"),
  prepare: () => {
    _set("_loop_gyou_malware_amount", (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject10 || (keys_templateObject10 = keys_taggedTemplateLiteral(["daily dungeon malware"])))));
    if (have(template_string_$item(keys_templateObject11 || (keys_templateObject11 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return;
    if (have(template_string_$item(keys_templateObject12 || (keys_templateObject12 = keys_taggedTemplateLiteral(["Platinum Yendorian Express Card"]))))) return;
    if (have(template_string_$item(keys_templateObject13 || (keys_templateObject13 = keys_taggedTemplateLiteral(["skeleton bone"])))) && have(template_string_$item(keys_templateObject14 || (keys_templateObject14 = keys_taggedTemplateLiteral(["loose teeth"])))) && !have(template_string_$item(keys_templateObject15 || (keys_templateObject15 = keys_taggedTemplateLiteral(["skeleton key"]))))) (0,external_kolmafia_namespaceObject.cliExecute)("make skeleton key");
  },
  do: $location(keys_templateObject16 || (keys_templateObject16 = keys_taggedTemplateLiteral(["The Daily Dungeon"]))),
  post: () => {
    if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject17 || (keys_templateObject17 = keys_taggedTemplateLiteral(["daily dungeon malware"])))) < property_get("_loop_gyou_malware_amount", 0)) _set("_dailyDungeonMalwareUsed", true);
    uneffect($effect(keys_templateObject18 || (keys_templateObject18 = keys_taggedTemplateLiteral(["Apathy"]))));
  },
  outfit: {
    equip: template_string_$items(keys_templateObject19 || (keys_templateObject19 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"]))),
    modifier: "init"
  },
  // Avoid apathy
  combat: new combat_CombatStrategy().macro(new Macro().item(template_string_$item(keys_templateObject20 || (keys_templateObject20 = keys_taggedTemplateLiteral(["daily dungeon malware"]))))).kill(),
  choices: {
    689: 1,
    690: () => have(template_string_$item(keys_templateObject21 || (keys_templateObject21 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) ? 2 : 3,
    691: () => 3,
    // Do not skip the second chest; there is a chance we skip all the monsters
    692: () => {
      if (have(template_string_$item(keys_templateObject22 || (keys_templateObject22 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return 3;
      if (have(template_string_$item(keys_templateObject23 || (keys_templateObject23 = keys_taggedTemplateLiteral(["Platinum Yendorian Express Card"]))))) return 7;
      if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject24 || (keys_templateObject24 = keys_taggedTemplateLiteral(["skeleton key"])))) + min((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject25 || (keys_templateObject25 = keys_taggedTemplateLiteral(["skeleton bone"])))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject26 || (keys_templateObject26 = keys_taggedTemplateLiteral(["loose teeth"]))))) > 1) return 2;
      if (have(template_string_$item(keys_templateObject27 || (keys_templateObject27 = keys_taggedTemplateLiteral(["skeleton key"])))) && property_get("nsTowerDoorKeysUsed").includes("skeleton key")) return 2;
      return 4;
    },
    693: () => have(template_string_$item(keys_templateObject28 || (keys_templateObject28 = keys_taggedTemplateLiteral(["eleven-foot pole"])))) ? 2 : 1
  },
  limit: {
    tries: 15
  }
}, {
  which: Keys.Dungeon,
  possible: () => !property_get("dailyDungeonDone"),
  acquire: [{
    item: template_string_$item(keys_templateObject29 || (keys_templateObject29 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))),
    optional: true
  }, {
    item: template_string_$item(keys_templateObject30 || (keys_templateObject30 = keys_taggedTemplateLiteral(["eleven-foot pole"]))),
    optional: true
  }, {
    item: template_string_$item(keys_templateObject31 || (keys_templateObject31 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"]))),
    optional: true
  }],
  ready: () => (step("questL13Final") !== -1 || have(template_string_$item(keys_templateObject32 || (keys_templateObject32 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"])))) && have(template_string_$item(keys_templateObject33 || (keys_templateObject33 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) && have(template_string_$item(keys_templateObject34 || (keys_templateObject34 = keys_taggedTemplateLiteral(["eleven-foot pole"]))))) && towerReady(),
  after: ["Daily Dungeon Malware"],
  completed: () => property_get("dailyDungeonDone"),
  prepare: () => {
    if (have(template_string_$item(keys_templateObject35 || (keys_templateObject35 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return;
    if (have(template_string_$item(keys_templateObject36 || (keys_templateObject36 = keys_taggedTemplateLiteral(["Platinum Yendorian Express Card"]))))) return;
    if (have(template_string_$item(keys_templateObject37 || (keys_templateObject37 = keys_taggedTemplateLiteral(["skeleton bone"])))) && have(template_string_$item(keys_templateObject38 || (keys_templateObject38 = keys_taggedTemplateLiteral(["loose teeth"])))) && !have(template_string_$item(keys_templateObject39 || (keys_templateObject39 = keys_taggedTemplateLiteral(["skeleton key"]))))) (0,external_kolmafia_namespaceObject.cliExecute)("make skeleton key");
  },
  do: $location(keys_templateObject40 || (keys_templateObject40 = keys_taggedTemplateLiteral(["The Daily Dungeon"]))),
  post: () => {
    uneffect($effect(keys_templateObject41 || (keys_templateObject41 = keys_taggedTemplateLiteral(["Apathy"]))));
  },
  outfit: {
    equip: template_string_$items(keys_templateObject42 || (keys_templateObject42 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"]))),
    modifier: "init"
  },
  // Avoid apathy
  combat: new combat_CombatStrategy().kill(),
  choices: {
    689: 1,
    690: () => have(template_string_$item(keys_templateObject43 || (keys_templateObject43 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) ? 2 : 3,
    691: () => have(template_string_$item(keys_templateObject44 || (keys_templateObject44 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) ? 2 : 3,
    692: () => {
      if (have(template_string_$item(keys_templateObject45 || (keys_templateObject45 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return 3;
      if (have(template_string_$item(keys_templateObject46 || (keys_templateObject46 = keys_taggedTemplateLiteral(["Platinum Yendorian Express Card"]))))) return 7;
      if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject47 || (keys_templateObject47 = keys_taggedTemplateLiteral(["skeleton key"])))) + min((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject48 || (keys_templateObject48 = keys_taggedTemplateLiteral(["skeleton bone"])))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject49 || (keys_templateObject49 = keys_taggedTemplateLiteral(["loose teeth"]))))) > 1) return 2;
      if (have(template_string_$item(keys_templateObject50 || (keys_templateObject50 = keys_taggedTemplateLiteral(["skeleton key"])))) && property_get("nsTowerDoorKeysUsed").includes("skeleton key")) return 2;
      return 4;
    },
    693: () => have(template_string_$item(keys_templateObject51 || (keys_templateObject51 = keys_taggedTemplateLiteral(["eleven-foot pole"])))) ? 2 : 1
  },
  limit: {
    tries: 15
  }
}, {
  which: Keys.Fantasy,
  possible: () => property_get("frAlways") || property_get("_frToday"),
  after: ["Misc/Open Fantasy"],
  ready: () => (0,external_kolmafia_namespaceObject.myBasestat)($stat(keys_templateObject52 || (keys_templateObject52 = keys_taggedTemplateLiteral(["moxie"])))) >= 120,
  completed: () => $location(keys_templateObject53 || (keys_templateObject53 = keys_taggedTemplateLiteral(["The Bandit Crossroads"]))).turnsSpent >= 5,
  do: $location(keys_templateObject54 || (keys_templateObject54 = keys_taggedTemplateLiteral(["The Bandit Crossroads"]))),
  outfit: {
    familiar: template_string_$familiar(keys_templateObject55 || (keys_templateObject55 = keys_taggedTemplateLiteral(["none"]))),
    equip: template_string_$items(keys_templateObject56 || (keys_templateObject56 = keys_taggedTemplateLiteral(["FantasyRealm G. E. M."]))),
    modifier: "moxie"
  },
  combat: new combat_CombatStrategy().kill(),
  limit: {
    tries: 5
  }
}, {
  which: Keys.Zap,
  possible: () => property_get("lastZapperWandExplosionDay") <= 0,
  after: ["Wand/Wand"],
  ready: () => towerReady(),
  completed: () => property_get("lastZapperWandExplosionDay") >= 1 || property_get("_zapCount") >= 1,
  do: () => {
    unequipAcc(keyStrategy.getZapChoice());
    if (!have(keyStrategy.getZapChoice()) && (0,external_kolmafia_namespaceObject.myTurncount)() >= 1000) (0,external_kolmafia_namespaceObject.buy)(keyStrategy.getZapChoice(), 1, 100000);
    (0,external_kolmafia_namespaceObject.cliExecute)("zap ".concat(keyStrategy.getZapChoice()));
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var KeyState;

(function (KeyState) {
  KeyState["DONE"] = "Done";
  KeyState["READY"] = "Ready";
  KeyState["MAYBE"] = "Maybe";
  KeyState["UNNEEDED"] = "Unneeded";
  KeyState["IMPOSSIBLE"] = "Impossible";
})(KeyState || (KeyState = {}));

var KeyStrategy = /*#__PURE__*/function () {
  function KeyStrategy(tasks) {
    keys_classCallCheck(this, KeyStrategy);

    keys_defineProperty(this, "plan", new Map());

    keys_defineProperty(this, "tasks", void 0);

    keys_defineProperty(this, "zap_choice", void 0);

    this.tasks = tasks;
  }

  keys_createClass(KeyStrategy, [{
    key: "update",
    value: function update() {
      var keysNeeded = Math.max(0, 3 - keyCount());
      var sureKeys = 0; // Number of keys we have definitely planned.

      var maybeKeys = 0; // Number of keys we plan to attempt if possible.

      var _iterator = keys_createForOfIteratorHelper(this.tasks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;

          // If we have already guaranteed all keys, no more are needed
          if (sureKeys >= keysNeeded) {
            this.plan.set(task.which, KeyState.UNNEEDED);
            continue;
          }

          switch (task.possible()) {
            case false:
              // This key is impossible to get.
              this.plan.set(task.which, KeyState.IMPOSSIBLE);
              break;

            case true:
              // If all the maybe-keys above succeed, then there is no need for this key. So set our state to maybe.
              // If there are not enough maybe-keys above, then we plan to do this key.
              this.plan.set(task.which, maybeKeys < keysNeeded ? KeyState.READY : KeyState.MAYBE);
              sureKeys++;
              maybeKeys++;
              break;

            case undefined:
              // The key is maybe possible to get.
              this.plan.set(task.which, KeyState.MAYBE);
              maybeKeys++;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (sureKeys < keysNeeded) {
        var info = Array.from(this.plan.entries()).map(keyinfo => keyinfo.join("=")).join("; ");
        throw "Can only guarantee ".concat(sureKeys, " of ").concat(keysNeeded, " keys. (").concat(info, ")");
      }
    }
  }, {
    key: "useful",
    value: function useful(key) {
      if (this.plan.get(key) === KeyState.READY) return true;
      if (this.plan.get(key) === KeyState.MAYBE) return undefined;
      return false;
    }
  }, {
    key: "getZapChoice",
    value: function getZapChoice() {
      if (!this.zap_choice) {
        this.zap_choice = makeZapChoice();
      }

      return this.zap_choice;
    }
  }]);

  return KeyStrategy;
}();

var keyStrategy = new KeyStrategy(heroKeys);
var KeysQuest = {
  name: "Keys",
  tasks: [].concat(keys_toConsumableArray(keyStrategy.tasks.map(task => {
    return keys_objectSpread(keys_objectSpread({}, task), {}, {
      name: task.which,
      completed: () => task.completed() || keyStrategy.plan.get(task.which) === KeyState.DONE || keyStrategy.plan.get(task.which) === KeyState.UNNEEDED || keyStrategy.plan.get(task.which) === KeyState.IMPOSSIBLE,
      ready: () => (task.ready === undefined || task.ready()) && keyStrategy.plan.get(task.which) === KeyState.READY
    });
  })), [{
    name: "All Heroes",
    after: keyStrategy.tasks.map(task => task.which),
    completed: () => keyCount() >= 3,
    do: () => {
      throw "Unable to obtain enough fat loot tokens";
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Open 8-Bit",
    after: [],
    completed: () => have(template_string_$item(keys_templateObject57 || (keys_templateObject57 = keys_taggedTemplateLiteral(["continuum transfunctioner"])))),
    do: () => {
      if (!have(template_string_$item(keys_templateObject58 || (keys_templateObject58 = keys_taggedTemplateLiteral(["continuum transfunctioner"]))))) {
        (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=forestvillage&action=fv_mystic");
        (0,external_kolmafia_namespaceObject.runChoice)(1);
        (0,external_kolmafia_namespaceObject.runChoice)(1);
        (0,external_kolmafia_namespaceObject.runChoice)(1);
      }
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Digital Key",
    after: ["Open 8-Bit"],
    ready: () => step("questL13Final") > 2 || !have(template_string_$item(keys_templateObject59 || (keys_templateObject59 = keys_taggedTemplateLiteral(["Powerful Glove"])))),
    completed: () => property_get("nsTowerDoorKeysUsed").includes("digital key") || have(template_string_$item(keys_templateObject60 || (keys_templateObject60 = keys_taggedTemplateLiteral(["digital key"])))) || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject61 || (keys_templateObject61 = keys_taggedTemplateLiteral(["white pixel"])))) + Math.min((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject62 || (keys_templateObject62 = keys_taggedTemplateLiteral(["blue pixel"])))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject63 || (keys_templateObject63 = keys_taggedTemplateLiteral(["red pixel"])))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject64 || (keys_templateObject64 = keys_taggedTemplateLiteral(["green pixel"]))))) >= 30 || towerSkip(),
    do: $location(keys_templateObject65 || (keys_templateObject65 = keys_taggedTemplateLiteral(["8-Bit Realm"]))),
    outfit: {
      equip: template_string_$items(keys_templateObject66 || (keys_templateObject66 = keys_taggedTemplateLiteral(["continuum transfunctioner"]))),
      modifier: "item",
      avoid: template_string_$items(keys_templateObject67 || (keys_templateObject67 = keys_taggedTemplateLiteral(["broken champagne bottle"])))
    },
    combat: new combat_CombatStrategy().kill(),
    limit: {
      soft: 40
    }
  }, {
    name: "Star Key",
    after: ["Giant/Unlock HITS"],
    completed: () => have(template_string_$item(keys_templateObject68 || (keys_templateObject68 = keys_taggedTemplateLiteral(["star chart"])))) && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject69 || (keys_templateObject69 = keys_taggedTemplateLiteral(["star"])))) >= 8 && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject70 || (keys_templateObject70 = keys_taggedTemplateLiteral(["line"])))) >= 7 || have(template_string_$item(keys_templateObject71 || (keys_templateObject71 = keys_taggedTemplateLiteral(["Richard's star key"])))) || property_get("nsTowerDoorKeysUsed").includes("Richard's star key") || towerSkip(),
    do: $location(keys_templateObject72 || (keys_templateObject72 = keys_taggedTemplateLiteral(["The Hole in the Sky"]))),
    outfit: {
      modifier: "item",
      avoid: template_string_$items(keys_templateObject73 || (keys_templateObject73 = keys_taggedTemplateLiteral(["broken champagne bottle"])))
    },
    combat: new combat_CombatStrategy().kill($monster(keys_templateObject74 || (keys_templateObject74 = keys_taggedTemplateLiteral(["Astronomer"])))).killItem(),
    limit: {
      soft: 20
    },
    orbtargets: () => !have(template_string_$item(keys_templateObject75 || (keys_templateObject75 = keys_taggedTemplateLiteral(["star chart"])))) ? [$monster(keys_templateObject76 || (keys_templateObject76 = keys_taggedTemplateLiteral(["Astronomer"])))] : []
  }, {
    name: "Skeleton Key",
    after: ["Crypt/Nook Boss", "Tower/Start"],
    prepare: () => {
      if (step("questM23Meatsmith") === -1) {
        (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith");
        (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
        (0,external_kolmafia_namespaceObject.runChoice)(1);
      }
    },
    completed: () => have(template_string_$item(keys_templateObject77 || (keys_templateObject77 = keys_taggedTemplateLiteral(["skeleton bone"])))) && have(template_string_$item(keys_templateObject78 || (keys_templateObject78 = keys_taggedTemplateLiteral(["loose teeth"])))) || have(template_string_$item(keys_templateObject79 || (keys_templateObject79 = keys_taggedTemplateLiteral(["skeleton key"])))) || property_get("nsTowerDoorKeysUsed").includes("skeleton key") || towerSkip(),
    outfit: {
      modifier: "item",
      avoid: template_string_$items(keys_templateObject80 || (keys_templateObject80 = keys_taggedTemplateLiteral(["broken champagne bottle"])))
    },
    combat: new combat_CombatStrategy().killItem($monsters(keys_templateObject81 || (keys_templateObject81 = keys_taggedTemplateLiteral(["factory-irregular skeleton, remaindered skeleton, swarm of skulls"])))).banish($monster(keys_templateObject82 || (keys_templateObject82 = keys_taggedTemplateLiteral(["novelty tropical skeleton"])))),
    do: $location(keys_templateObject83 || (keys_templateObject83 = keys_taggedTemplateLiteral(["The Skeleton Store"]))),
    limit: {
      soft: 10
    }
  }])
};

function keyCount() {
  var count = (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(keys_templateObject84 || (keys_templateObject84 = keys_taggedTemplateLiteral(["fat loot token"]))));
  if (towerSkip()) count += (0,external_kolmafia_namespaceObject.storageAmount)(template_string_$item(keys_templateObject85 || (keys_templateObject85 = keys_taggedTemplateLiteral(["fat loot token"]))));
  if (have(template_string_$item(keys_templateObject86 || (keys_templateObject86 = keys_taggedTemplateLiteral(["Boris's key"])))) || property_get("nsTowerDoorKeysUsed").includes("Boris")) count++;
  if (have(template_string_$item(keys_templateObject87 || (keys_templateObject87 = keys_taggedTemplateLiteral(["Jarlsberg's key"])))) || property_get("nsTowerDoorKeysUsed").includes("Jarlsberg")) count++;
  if (have(template_string_$item(keys_templateObject88 || (keys_templateObject88 = keys_taggedTemplateLiteral(["Sneaky Pete's key"])))) || property_get("nsTowerDoorKeysUsed").includes("Sneaky Pete")) count++;
  return count;
}

function unequipAcc(acc) {
  if (!(0,external_kolmafia_namespaceObject.haveEquipped)(acc)) return;

  var _iterator2 = keys_createForOfIteratorHelper($slots(keys_templateObject89 || (keys_templateObject89 = keys_taggedTemplateLiteral(["acc1, acc2, acc3"])))),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var slot = _step2.value;
      if ((0,external_kolmafia_namespaceObject.equippedItem)(slot) === acc) (0,external_kolmafia_namespaceObject.equip)(slot, template_string_$item(keys_templateObject90 || (keys_templateObject90 = keys_taggedTemplateLiteral(["none"]))));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function makeZapChoice() {
  var options = template_string_$items(keys_templateObject91 || (keys_templateObject91 = keys_taggedTemplateLiteral(["Boris's ring, Jarlsberg's earring, Sneaky Pete's breath spray"])));

  var _iterator3 = keys_createForOfIteratorHelper(options),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var option = _step3.value;
      if (have(option)) return option;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var _iterator4 = keys_createForOfIteratorHelper(options),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _option = _step4.value;
      if ((0,external_kolmafia_namespaceObject.storageAmount)(_option) > 0) return _option;
    } // If we don't have any of the zappables, just buy the lowest priced one

  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return options.sort((i, j) => (0,external_kolmafia_namespaceObject.mallPrice)(i) - (0,external_kolmafia_namespaceObject.mallPrice)(j))[0];
}

function min(a, b) {
  return a < b ? a : b;
}
;// CONCATENATED MODULE: ./src/engine/outfit.ts
var engine_outfit_templateObject, engine_outfit_templateObject2, engine_outfit_templateObject3, engine_outfit_templateObject4, engine_outfit_templateObject5, engine_outfit_templateObject6, engine_outfit_templateObject7, engine_outfit_templateObject8, engine_outfit_templateObject9, engine_outfit_templateObject10, engine_outfit_templateObject11, engine_outfit_templateObject12, engine_outfit_templateObject13, engine_outfit_templateObject14, engine_outfit_templateObject15, engine_outfit_templateObject16, engine_outfit_templateObject17, engine_outfit_templateObject18, engine_outfit_templateObject19, engine_outfit_templateObject20, engine_outfit_templateObject21, engine_outfit_templateObject22, engine_outfit_templateObject23, engine_outfit_templateObject24, engine_outfit_templateObject25, engine_outfit_templateObject26, engine_outfit_templateObject27, engine_outfit_templateObject28, engine_outfit_templateObject29, engine_outfit_templateObject30, outfit_templateObject31, outfit_templateObject32, outfit_templateObject33, outfit_templateObject34, outfit_templateObject35, outfit_templateObject36, outfit_templateObject37, outfit_templateObject38, outfit_templateObject39, outfit_templateObject40, outfit_templateObject41, outfit_templateObject42, outfit_templateObject43, outfit_templateObject44, outfit_templateObject45, outfit_templateObject46, outfit_templateObject47, outfit_templateObject48, outfit_templateObject49, outfit_templateObject50, outfit_templateObject51, outfit_templateObject52, outfit_templateObject53, outfit_templateObject54, outfit_templateObject55, outfit_templateObject56, outfit_templateObject57, outfit_templateObject58, outfit_templateObject59, outfit_templateObject60, outfit_templateObject61, outfit_templateObject62, outfit_templateObject63, outfit_templateObject64, outfit_templateObject65, outfit_templateObject66, outfit_templateObject67, outfit_templateObject68, outfit_templateObject69;

function engine_outfit_toConsumableArray(arr) { return engine_outfit_arrayWithoutHoles(arr) || engine_outfit_iterableToArray(arr) || engine_outfit_unsupportedIterableToArray(arr) || engine_outfit_nonIterableSpread(); }

function engine_outfit_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_outfit_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_outfit_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_outfit_arrayLikeToArray(arr); }

function engine_outfit_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_outfit_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = engine_outfit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function engine_outfit_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_outfit_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_outfit_arrayLikeToArray(o, minLen); }

function engine_outfit_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






function equipFirst(outfit, resources) {
  var _iterator = engine_outfit_createForOfIteratorHelper(resources),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _resource$equip, _resource$equip2;

      var resource = _step.value;
      if (!resource.available()) continue;
      if (resource.chance && resource.chance() === 0) continue;
      if (!outfit.canEquip((_resource$equip = resource.equip) !== null && _resource$equip !== void 0 ? _resource$equip : [])) continue;
      if (!outfit.equip((_resource$equip2 = resource.equip) !== null && _resource$equip2 !== void 0 ? _resource$equip2 : [])) continue;
      return resource;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return undefined;
}
function equipUntilCapped(outfit, resources) {
  var result = [];

  var _iterator2 = engine_outfit_createForOfIteratorHelper(resources),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _resource$equip3, _resource$equip4;

      var resource = _step2.value;
      if (!resource.available()) continue;
      if (resource.chance && resource.chance() === 0) continue;
      if (!outfit.canEquip((_resource$equip3 = resource.equip) !== null && _resource$equip3 !== void 0 ? _resource$equip3 : [])) continue;
      if (!outfit.equip((_resource$equip4 = resource.equip) !== null && _resource$equip4 !== void 0 ? _resource$equip4 : [])) continue;
      result.push(resource);
      if (resource.chance && resource.chance() === 1) break;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return result;
}
function equipInitial(outfit) {
  var _outfit$modifier, _outfit$modifier5, _outfit$modifier6, _outfit$modifier7;

  if ((_outfit$modifier = outfit.modifier) !== null && _outfit$modifier !== void 0 && _outfit$modifier.includes("item")) {
    var _outfit$modifier2, _outfit$modifier3, _outfit$modifier4;

    outfit.equip(template_string_$familiar(engine_outfit_templateObject || (engine_outfit_templateObject = engine_outfit_taggedTemplateLiteral(["Grey Goose"]))));
    if (!((_outfit$modifier2 = outfit.modifier) !== null && _outfit$modifier2 !== void 0 && _outfit$modifier2.includes("+combat")) && !((_outfit$modifier3 = outfit.modifier) !== null && _outfit$modifier3 !== void 0 && _outfit$modifier3.includes(" combat")) && !((_outfit$modifier4 = outfit.modifier) !== null && _outfit$modifier4 !== void 0 && _outfit$modifier4.includes("res"))) outfit.equip(template_string_$item(engine_outfit_templateObject2 || (engine_outfit_templateObject2 = engine_outfit_taggedTemplateLiteral(["protonic accelerator pack"]))));
  } // if (spec.modifier.includes("+combat")) outfit.equip($familiar`Jumpsuited Hound Dog`);


  if ((_outfit$modifier5 = outfit.modifier) !== null && _outfit$modifier5 !== void 0 && _outfit$modifier5.includes("meat")) {
    outfit.equip(template_string_$familiar(engine_outfit_templateObject3 || (engine_outfit_templateObject3 = engine_outfit_taggedTemplateLiteral(["Hobo Monkey"]))));
    outfit.equip(template_string_$familiar(engine_outfit_templateObject4 || (engine_outfit_templateObject4 = engine_outfit_taggedTemplateLiteral(["Leprechaun"])))); // backup
  }

  if ((_outfit$modifier6 = outfit.modifier) !== null && _outfit$modifier6 !== void 0 && _outfit$modifier6.includes("+combat") && !((_outfit$modifier7 = outfit.modifier) !== null && _outfit$modifier7 !== void 0 && _outfit$modifier7.includes("res"))) outfit.equip(template_string_$item(engine_outfit_templateObject5 || (engine_outfit_templateObject5 = engine_outfit_taggedTemplateLiteral(["thermal blanket"]))));
}
function equipCharging(outfit) {
  if (outfit.skipDefaults) return;

  if ((0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(engine_outfit_templateObject6 || (engine_outfit_templateObject6 = engine_outfit_taggedTemplateLiteral(["Grey Goose"])))) < 6 || (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(engine_outfit_templateObject7 || (engine_outfit_templateObject7 = engine_outfit_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && engine_outfit_toConsumableArray(outfit.equips.values()).includes(template_string_$item(engine_outfit_templateObject8 || (engine_outfit_templateObject8 = engine_outfit_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) && getKramcoWandererChance() === 1) {
    if (outfit.equip(template_string_$familiar(engine_outfit_templateObject9 || (engine_outfit_templateObject9 = engine_outfit_taggedTemplateLiteral(["Grey Goose"]))))) {
      outfit.equip(template_string_$item(engine_outfit_templateObject10 || (engine_outfit_templateObject10 = engine_outfit_taggedTemplateLiteral(["yule hatchet"]))));
      outfit.equip(template_string_$item(engine_outfit_templateObject11 || (engine_outfit_templateObject11 = engine_outfit_taggedTemplateLiteral(["ghostly reins"]))));
      outfit.equip(template_string_$item(engine_outfit_templateObject12 || (engine_outfit_templateObject12 = engine_outfit_taggedTemplateLiteral(["teacher's pen"]))));
      outfit.equip(template_string_$item(engine_outfit_templateObject13 || (engine_outfit_templateObject13 = engine_outfit_taggedTemplateLiteral(["familiar scrapbook"]))));
    }
  } else if ((!have(template_string_$item(engine_outfit_templateObject14 || (engine_outfit_templateObject14 = engine_outfit_taggedTemplateLiteral(["eleven-foot pole"])))) || !have(template_string_$item(engine_outfit_templateObject15 || (engine_outfit_templateObject15 = engine_outfit_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) || !have(template_string_$item(engine_outfit_templateObject16 || (engine_outfit_templateObject16 = engine_outfit_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) && keyStrategy.useful(Keys.Dungeon) !== false && !towerSkip()) {
    outfit.equip(template_string_$familiar(engine_outfit_templateObject17 || (engine_outfit_templateObject17 = engine_outfit_taggedTemplateLiteral(["Gelatinous Cubeling"]))));
  } else if (property_get("camelSpit") < 100 && property_get("zeppelinProtestors") < 80) {
    outfit.equip(template_string_$familiar(engine_outfit_templateObject18 || (engine_outfit_templateObject18 = engine_outfit_taggedTemplateLiteral(["Melodramedary"]))));
  }
}
function equipDefaults(outfit) {
  var _outfit$modifier8;

  if (outfit.skipDefaults) return;
  if ((_outfit$modifier8 = outfit.modifier) !== null && _outfit$modifier8 !== void 0 && _outfit$modifier8.includes("-combat")) outfit.equip(template_string_$familiar(engine_outfit_templateObject19 || (engine_outfit_templateObject19 = engine_outfit_taggedTemplateLiteral(["Disgeist"])))); // low priority

  if (have(template_string_$familiar(engine_outfit_templateObject20 || (engine_outfit_templateObject20 = engine_outfit_taggedTemplateLiteral(["Temporal Riftlet"]))))) {
    outfit.equip(template_string_$familiar(engine_outfit_templateObject21 || (engine_outfit_templateObject21 = engine_outfit_taggedTemplateLiteral(["Temporal Riftlet"]))));
  } else if (have(template_string_$item(engine_outfit_templateObject22 || (engine_outfit_templateObject22 = engine_outfit_taggedTemplateLiteral(["gnomish housemaid's kgnee"]))))) {
    outfit.equip(template_string_$familiar(engine_outfit_templateObject23 || (engine_outfit_templateObject23 = engine_outfit_taggedTemplateLiteral(["Reagnimated Gnome"]))));
  } else outfit.equip(template_string_$familiar(engine_outfit_templateObject24 || (engine_outfit_templateObject24 = engine_outfit_taggedTemplateLiteral(["Galloping Grill"]))));

  outfit.equip(template_string_$familiar(engine_outfit_templateObject25 || (engine_outfit_templateObject25 = engine_outfit_taggedTemplateLiteral(["Melodramedary"]))));
  if (outfit.familiar === template_string_$familiar(engine_outfit_templateObject26 || (engine_outfit_templateObject26 = engine_outfit_taggedTemplateLiteral(["Grey Goose"]))) && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(engine_outfit_templateObject27 || (engine_outfit_templateObject27 = engine_outfit_taggedTemplateLiteral(["Grey Goose"])))) < 6) outfit.equip(template_string_$item(engine_outfit_templateObject28 || (engine_outfit_templateObject28 = engine_outfit_taggedTemplateLiteral(["grey down vest"]))));
  if (outfit.familiar === template_string_$familiar(engine_outfit_templateObject29 || (engine_outfit_templateObject29 = engine_outfit_taggedTemplateLiteral(["Melodramedary"]))) && property_get("camelSpit") < 100) outfit.equip(template_string_$item(engine_outfit_templateObject30 || (engine_outfit_templateObject30 = engine_outfit_taggedTemplateLiteral(["dromedary drinking helmet"]))));
  if (outfit.familiar === template_string_$familiar(outfit_templateObject31 || (outfit_templateObject31 = engine_outfit_taggedTemplateLiteral(["Reagnimated Gnome"])))) outfit.equip(template_string_$item(outfit_templateObject32 || (outfit_templateObject32 = engine_outfit_taggedTemplateLiteral(["gnomish housemaid's kgnee"]))));
  outfit.equip(template_string_$item(outfit_templateObject33 || (outfit_templateObject33 = engine_outfit_taggedTemplateLiteral(["mafia thumb ring"]))));

  if ((0,external_kolmafia_namespaceObject.myBasestat)($stat(outfit_templateObject34 || (outfit_templateObject34 = engine_outfit_taggedTemplateLiteral(["moxie"])))) <= 200) {
    // Equip some extra equipment for early survivability
    outfit.equip(template_string_$item(outfit_templateObject35 || (outfit_templateObject35 = engine_outfit_taggedTemplateLiteral(["plastic vampire fangs"]))));
    outfit.equip(template_string_$item(outfit_templateObject36 || (outfit_templateObject36 = engine_outfit_taggedTemplateLiteral(["warbear goggles"]))));
    outfit.equip(template_string_$item(outfit_templateObject37 || (outfit_templateObject37 = engine_outfit_taggedTemplateLiteral(["burning paper slippers"]))));
  }

  if (!outfit.modifier) {
    // Default outfit
    outfit.equip(template_string_$item(outfit_templateObject38 || (outfit_templateObject38 = engine_outfit_taggedTemplateLiteral(["giant yellow hat"]))));
    outfit.equip(template_string_$item(outfit_templateObject39 || (outfit_templateObject39 = engine_outfit_taggedTemplateLiteral(["ice crown"]))));
    outfit.equip(template_string_$item(outfit_templateObject40 || (outfit_templateObject40 = engine_outfit_taggedTemplateLiteral(["June cleaver"]))));
    outfit.equip(template_string_$item(outfit_templateObject41 || (outfit_templateObject41 = engine_outfit_taggedTemplateLiteral(["industrial fire extinguisher"]))));
    if (have($skill(outfit_templateObject42 || (outfit_templateObject42 = engine_outfit_taggedTemplateLiteral(["Torso Awareness"]))))) outfit.equip(template_string_$item(outfit_templateObject43 || (outfit_templateObject43 = engine_outfit_taggedTemplateLiteral(["fresh coat of paint"]))));
    outfit.equip(template_string_$item(outfit_templateObject44 || (outfit_templateObject44 = engine_outfit_taggedTemplateLiteral(["familiar scrapbook"]))));
    outfit.equip(template_string_$item(outfit_templateObject45 || (outfit_templateObject45 = engine_outfit_taggedTemplateLiteral(["protonic accelerator pack"]))));
    outfit.equip(template_string_$item(outfit_templateObject46 || (outfit_templateObject46 = engine_outfit_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))));
    outfit.equip(template_string_$item(outfit_templateObject47 || (outfit_templateObject47 = engine_outfit_taggedTemplateLiteral(["designer sweatpants"]))));
    outfit.equip(template_string_$item(outfit_templateObject48 || (outfit_templateObject48 = engine_outfit_taggedTemplateLiteral(["warbear long johns"]))));
    outfit.equip(template_string_$item(outfit_templateObject49 || (outfit_templateObject49 = engine_outfit_taggedTemplateLiteral(["square sponge pants"]))));
    outfit.equip(template_string_$item(outfit_templateObject50 || (outfit_templateObject50 = engine_outfit_taggedTemplateLiteral(["Cargo Cultist Shorts"]))));
    outfit.equip(template_string_$item(outfit_templateObject51 || (outfit_templateObject51 = engine_outfit_taggedTemplateLiteral(["lucky gold ring"]))));
    outfit.equip(template_string_$item(outfit_templateObject52 || (outfit_templateObject52 = engine_outfit_taggedTemplateLiteral(["Powerful Glove"]))));
    if (outfit.familiar === template_string_$familiar(outfit_templateObject53 || (outfit_templateObject53 = engine_outfit_taggedTemplateLiteral(["Grey Goose"]))) && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(outfit_templateObject54 || (outfit_templateObject54 = engine_outfit_taggedTemplateLiteral(["Grey Goose"])))) < 6 && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(outfit_templateObject55 || (outfit_templateObject55 = engine_outfit_taggedTemplateLiteral(["teacher's pen"])))) >= 2) outfit.equip(template_string_$item(outfit_templateObject56 || (outfit_templateObject56 = engine_outfit_taggedTemplateLiteral(["teacher's pen"]))));
    outfit.equip(template_string_$item(outfit_templateObject57 || (outfit_templateObject57 = engine_outfit_taggedTemplateLiteral(["backup camera"]))));
    outfit.equip(template_string_$item(outfit_templateObject58 || (outfit_templateObject58 = engine_outfit_taggedTemplateLiteral(["birch battery"]))));
    outfit.equip(template_string_$item(outfit_templateObject59 || (outfit_templateObject59 = engine_outfit_taggedTemplateLiteral(["combat lover's locket"]))));
  } else {
    outfit.modifier += ", 0.01 MP regen, 0.001 HP regen"; // Defibrillator breaks the Beaten up tests

    if (haveLoathingLegion()) {
      outfit.avoid.push(template_string_$item(outfit_templateObject60 || (outfit_templateObject60 = engine_outfit_taggedTemplateLiteral(["Loathing Legion defibrillator"]))));
    } // Do not use umbrella for -ML


    if (outfit.modifier.match("-[\\d .]*ML")) {
      outfit.avoid.push(template_string_$item(outfit_templateObject61 || (outfit_templateObject61 = engine_outfit_taggedTemplateLiteral(["unbreakable umbrella"]))));
    } // Avoid burning CMG void fight just for the modifier


    if (have(template_string_$item(outfit_templateObject62 || (outfit_templateObject62 = engine_outfit_taggedTemplateLiteral(["cursed magnifying glass"])))) && property_get("cursedMagnifyingGlassCount") >= 13 && engine_outfit_toConsumableArray(outfit.equips.values()).includes(template_string_$item(outfit_templateObject63 || (outfit_templateObject63 = engine_outfit_taggedTemplateLiteral(["cursed magnifying glass"]))))) {
      outfit.avoid.push(template_string_$item(outfit_templateObject64 || (outfit_templateObject64 = engine_outfit_taggedTemplateLiteral(["cursed magnifying glass"]))));
    }
  }

  outfit.equip(template_string_$item(outfit_templateObject65 || (outfit_templateObject65 = engine_outfit_taggedTemplateLiteral(["miniature crystal ball"])))); // If we never found a better familiar, just keep charging the goose

  outfit.equip(template_string_$familiar(outfit_templateObject66 || (outfit_templateObject66 = engine_outfit_taggedTemplateLiteral(["Grey Goose"]))));
}
function fixFoldables(outfit) {
  // Libram outfit cache may not autofold umbrella, so we need to
  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(outfit_templateObject67 || (outfit_templateObject67 = engine_outfit_taggedTemplateLiteral(["unbreakable umbrella"])))) > 0) {
    var _outfit$modifier9, _outfit$modifier10, _outfit$modifier11;

    if ((_outfit$modifier9 = outfit.modifier) !== null && _outfit$modifier9 !== void 0 && _outfit$modifier9.includes("-combat")) {
      if (property_get("umbrellaState") !== "cocoon") (0,external_kolmafia_namespaceObject.cliExecute)("umbrella cocoon");
    } else if ((_outfit$modifier10 = outfit.modifier) !== null && _outfit$modifier10 !== void 0 && _outfit$modifier10.includes("ML")) {
      if (property_get("umbrellaState") !== "broken") (0,external_kolmafia_namespaceObject.cliExecute)("umbrella broken");
    } else if ((_outfit$modifier11 = outfit.modifier) !== null && _outfit$modifier11 !== void 0 && _outfit$modifier11.includes("item")) {
      if (property_get("umbrellaState") !== "bucket style") (0,external_kolmafia_namespaceObject.cliExecute)("umbrella bucket");
    } else {
      if (property_get("umbrellaState") !== "forward-facing") (0,external_kolmafia_namespaceObject.cliExecute)("umbrella forward");
    }
  } // Libram outfit cache may not autofold camera, so we need to


  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(outfit_templateObject68 || (outfit_templateObject68 = engine_outfit_taggedTemplateLiteral(["backup camera"])))) > 0) {
    var _outfit$modifier12, _outfit$modifier13;

    if ((_outfit$modifier12 = outfit.modifier) !== null && _outfit$modifier12 !== void 0 && _outfit$modifier12.includes("ML") && !outfit.modifier.match("-[\\d .]*ML")) {
      if (property_get("backupCameraMode").toLowerCase() !== "ml") (0,external_kolmafia_namespaceObject.cliExecute)("backupcamera ml");
    } else if ((_outfit$modifier13 = outfit.modifier) !== null && _outfit$modifier13 !== void 0 && _outfit$modifier13.includes("init")) {
      if (property_get("backupCameraMode").toLowerCase() !== "init") (0,external_kolmafia_namespaceObject.cliExecute)("backupcamera init");
    } else {
      if (property_get("backupCameraMode").toLowerCase() !== "meat") (0,external_kolmafia_namespaceObject.cliExecute)("backupcamera meat");
    }

    if (!property_get("backupCameraReverserEnabled")) {
      (0,external_kolmafia_namespaceObject.cliExecute)("backupcamera reverser on");
    }
  } // Libram outfit cache may not autofold cape, so we need to


  if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(outfit_templateObject69 || (outfit_templateObject69 = engine_outfit_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) > 0) {
    var _outfit$modifier14;

    if ((_outfit$modifier14 = outfit.modifier) !== null && _outfit$modifier14 !== void 0 && _outfit$modifier14.includes("res") && property_get("retroCapeSuperhero") !== "vampire" || property_get("retroCapeWashingInstructions") !== "hold") {
      (0,external_kolmafia_namespaceObject.cliExecute)("retrocape vampire hold");
    }
  }
}
;// CONCATENATED MODULE: ./src/engine/resources.ts
var resources_templateObject, resources_templateObject2, resources_templateObject3, resources_templateObject4, resources_templateObject5, resources_templateObject6, resources_templateObject7, resources_templateObject8, resources_templateObject9, resources_templateObject10, resources_templateObject11, resources_templateObject12, resources_templateObject13, resources_templateObject14, resources_templateObject15, resources_templateObject16, resources_templateObject17, resources_templateObject18, resources_templateObject19, resources_templateObject20, resources_templateObject21, resources_templateObject22, resources_templateObject23, resources_templateObject24, resources_templateObject25, resources_templateObject26, resources_templateObject27, resources_templateObject28, resources_templateObject29, resources_templateObject30, resources_templateObject31, resources_templateObject32, resources_templateObject33, resources_templateObject34, resources_templateObject35, resources_templateObject36, resources_templateObject37, resources_templateObject38, resources_templateObject39, resources_templateObject40, resources_templateObject41, resources_templateObject42, resources_templateObject43;

function resources_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = resources_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function resources_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return resources_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return resources_arrayLikeToArray(o, minLen); }

function resources_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function resources_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function resources_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function resources_createClass(Constructor, protoProps, staticProps) { if (protoProps) resources_defineProperties(Constructor.prototype, protoProps); if (staticProps) resources_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function resources_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function resources_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var banishSources = [{
  name: "Bowl Curveball",
  available: () => have(template_string_$item(resources_templateObject || (resources_templateObject = resources_taggedTemplateLiteral(["cosmic bowling ball"])))),
  do: $skill(resources_templateObject2 || (resources_templateObject2 = resources_taggedTemplateLiteral(["Bowl a Curveball"])))
}, {
  name: "System Sweep",
  available: () => have($skill(resources_templateObject3 || (resources_templateObject3 = resources_taggedTemplateLiteral(["System Sweep"])))),
  do: $skill(resources_templateObject4 || (resources_templateObject4 = resources_taggedTemplateLiteral(["System Sweep"])))
}, {
  name: "Latte",
  available: () => (!property_get("_latteBanishUsed") || property_get("_latteRefillsUsed") < 2) && // Save one refil for aftercore
  have(template_string_$item(resources_templateObject5 || (resources_templateObject5 = resources_taggedTemplateLiteral(["latte lovers member's mug"])))),
  prepare: () => {
    if (property_get("_latteBanishUsed")) {
      var modifiers = [];
      if (property_get("latteUnlocks").includes("wing")) modifiers.push("wing");
      if (property_get("latteUnlocks").includes("cajun")) modifiers.push("cajun");
      modifiers.push("cinnamon", "pumpkin", "vanilla");
      (0,external_kolmafia_namespaceObject.cliExecute)("latte refill ".concat(modifiers.slice(0, 3).join(" "))); // Always unlocked
    }
  },
  do: $skill(resources_templateObject6 || (resources_templateObject6 = resources_taggedTemplateLiteral(["Throw Latte on Opponent"]))),
  equip: template_string_$item(resources_templateObject7 || (resources_templateObject7 = resources_taggedTemplateLiteral(["latte lovers member's mug"])))
}, {
  name: "Reflex Hammer",
  available: () => property_get("_reflexHammerUsed") < 3 && have(template_string_$item(resources_templateObject8 || (resources_templateObject8 = resources_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))),
  do: $skill(resources_templateObject9 || (resources_templateObject9 = resources_taggedTemplateLiteral(["Reflex Hammer"]))),
  equip: template_string_$item(resources_templateObject10 || (resources_templateObject10 = resources_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))
}, {
  name: "KGB dart",
  available: () => property_get("_kgbTranquilizerDartUses") < 3 && have(template_string_$item(resources_templateObject11 || (resources_templateObject11 = resources_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))),
  do: $skill(resources_templateObject12 || (resources_templateObject12 = resources_taggedTemplateLiteral(["KGB tranquilizer dart"]))),
  equip: template_string_$item(resources_templateObject13 || (resources_templateObject13 = resources_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))
}, {
  name: "Middle Finger",
  available: () => !property_get("_mafiaMiddleFingerRingUsed") && have(template_string_$item(resources_templateObject14 || (resources_templateObject14 = resources_taggedTemplateLiteral(["mafia middle finger ring"])))),
  do: $skill(resources_templateObject15 || (resources_templateObject15 = resources_taggedTemplateLiteral(["Show them your ring"]))),
  equip: template_string_$item(resources_templateObject16 || (resources_templateObject16 = resources_taggedTemplateLiteral(["mafia middle finger ring"])))
}];
var BanishState = /*#__PURE__*/function () {
  function BanishState() {
    resources_classCallCheck(this, BanishState);

    resources_defineProperty(this, "already_banished", void 0);

    this.already_banished = new Map(Array.from(getBanishedMonsters(), entry => [entry[1], entry[0]]));
  } // Return true if some of the monsters in the task are banished


  resources_createClass(BanishState, [{
    key: "isPartiallyBanished",
    value: function isPartiallyBanished(task) {
      var _task$combat, _task$combat$where;

      return ((_task$combat = task.combat) === null || _task$combat === void 0 ? void 0 : (_task$combat$where = _task$combat.where("banish")) === null || _task$combat$where === void 0 ? void 0 : _task$combat$where.find(monster => this.already_banished.has(monster) && this.already_banished.get(monster) !== template_string_$item(resources_templateObject17 || (resources_templateObject17 = resources_taggedTemplateLiteral(["ice house"]))))) !== undefined;
    } // Return true if all requested monsters in the task are banished

  }, {
    key: "isFullyBanished",
    value: function isFullyBanished(task) {
      var _task$combat2, _task$combat2$where;

      return ((_task$combat2 = task.combat) === null || _task$combat2 === void 0 ? void 0 : (_task$combat2$where = _task$combat2.where("banish")) === null || _task$combat2$where === void 0 ? void 0 : _task$combat2$where.find(monster => !this.already_banished.has(monster))) === undefined;
    } // Return a list of all banishes not allocated to some available task

  }, {
    key: "unusedBanishes",
    value: function unusedBanishes(tasks) {
      var used_banishes = new Set();

      var _iterator = resources_createForOfIteratorHelper(tasks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;
          if (task.combat === undefined) continue;

          var _iterator2 = resources_createForOfIteratorHelper(task.combat.where("banish")),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var monster = _step2.value;
              var banished_with = this.already_banished.get(monster);
              if (banished_with !== undefined) used_banishes.add(banished_with);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return banishSources.filter(banish => banish.available() && !used_banishes.has(banish.do));
    }
  }]);

  return BanishState;
}();
var wandererSources = [{
  name: "Voted",
  available: () => have(template_string_$item(resources_templateObject18 || (resources_templateObject18 = resources_taggedTemplateLiteral(["\"I Voted!\" sticker"])))) && (0,external_kolmafia_namespaceObject.totalTurnsPlayed)() % 11 === 1 && property_get("lastVoteMonsterTurn") < (0,external_kolmafia_namespaceObject.totalTurnsPlayed)() && property_get("_voteFreeFights") < 3 && atLevel(5),
  equip: template_string_$item(resources_templateObject19 || (resources_templateObject19 = resources_taggedTemplateLiteral(["\"I Voted!\" sticker"]))),
  monsters: [$monster(resources_templateObject20 || (resources_templateObject20 = resources_taggedTemplateLiteral(["government bureaucrat"]))), $monster(resources_templateObject21 || (resources_templateObject21 = resources_taggedTemplateLiteral(["terrible mutant"]))), $monster(resources_templateObject22 || (resources_templateObject22 = resources_taggedTemplateLiteral(["angry ghost"]))), $monster(resources_templateObject23 || (resources_templateObject23 = resources_taggedTemplateLiteral(["annoyed snake"]))), $monster(resources_templateObject24 || (resources_templateObject24 = resources_taggedTemplateLiteral(["slime blob"])))],
  chance: () => 1 // when available

}, {
  name: "Cursed Magnifying Glass",
  available: () => have(template_string_$item(resources_templateObject25 || (resources_templateObject25 = resources_taggedTemplateLiteral(["cursed magnifying glass"])))) && property_get("_voidFreeFights") < 5 && property_get("cursedMagnifyingGlassCount") >= 13 && ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(resources_templateObject26 || (resources_templateObject26 = resources_taggedTemplateLiteral(["barrel of gunpowder"])))) >= 5 || // Done with cmg + meteor trick
  property_get("sidequestLighthouseCompleted") !== "none"),
  equip: template_string_$item(resources_templateObject27 || (resources_templateObject27 = resources_taggedTemplateLiteral(["cursed magnifying glass"]))),
  monsters: [$monster(resources_templateObject28 || (resources_templateObject28 = resources_taggedTemplateLiteral(["void guy"]))), $monster(resources_templateObject29 || (resources_templateObject29 = resources_taggedTemplateLiteral(["void slab"]))), $monster(resources_templateObject30 || (resources_templateObject30 = resources_taggedTemplateLiteral(["void spider"])))],
  chance: () => 1 // when available

}, {
  name: "Kramco",
  available: () => have(template_string_$item(resources_templateObject31 || (resources_templateObject31 = resources_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) && atLevel(5),
  equip: template_string_$item(resources_templateObject32 || (resources_templateObject32 = resources_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))),
  monsters: [$monster(resources_templateObject33 || (resources_templateObject33 = resources_taggedTemplateLiteral(["sausage goblin"])))],
  chance: () => getKramcoWandererChance(),
  action: new Macro().trySkill($skill(resources_templateObject34 || (resources_templateObject34 = resources_taggedTemplateLiteral(["Emit Matter Duplicating Drones"]))))
}];
function canChargeVoid() {
  return property_get("_voidFreeFights") < 5 && property_get("cursedMagnifyingGlassCount") < 13;
}
var runawayValue = have(template_string_$item(resources_templateObject35 || (resources_templateObject35 = resources_taggedTemplateLiteral(["Greatest American Pants"])))) || have(template_string_$item(resources_templateObject36 || (resources_templateObject36 = resources_taggedTemplateLiteral(["navel ring of navel gazing"])))) ? 0.8 * property_get("valueOfAdventure") : property_get("valueOfAdventure");
var runawaySources = [{
  name: "Bowl Curveball",
  available: () => false,
  do: new Macro().skill($skill(resources_templateObject37 || (resources_templateObject37 = resources_taggedTemplateLiteral(["Bowl a Curveball"])))),
  chance: () => 1,
  banishes: true
}, {
  name: "GAP",
  available: () => have(template_string_$item(resources_templateObject38 || (resources_templateObject38 = resources_taggedTemplateLiteral(["Greatest American Pants"])))),
  equip: template_string_$item(resources_templateObject39 || (resources_templateObject39 = resources_taggedTemplateLiteral(["Greatest American Pants"]))),
  do: new Macro().runaway(),
  chance: () => property_get("_navelRunaways") < 3 ? 1 : 0.2,
  banishes: false
}, {
  name: "Navel Ring",
  available: () => have(template_string_$item(resources_templateObject40 || (resources_templateObject40 = resources_taggedTemplateLiteral(["navel ring of navel gazing"])))),
  equip: template_string_$item(resources_templateObject41 || (resources_templateObject41 = resources_taggedTemplateLiteral(["navel ring of navel gazing"]))),
  do: new Macro().runaway(),
  chance: () => property_get("_navelRunaways") < 3 ? 1 : 0.2,
  banishes: false
}, {
  name: "Peppermint Parasol",
  available: () => have(template_string_$item(resources_templateObject42 || (resources_templateObject42 = resources_taggedTemplateLiteral(["peppermint parasol"])))),
  do: new Macro().item(template_string_$item(resources_templateObject43 || (resources_templateObject43 = resources_taggedTemplateLiteral(["peppermint parasol"])))),
  chance: () => property_get("_navelRunaways") < 3 ? 1 : 0.2,
  banishes: false
}];
var freekillSources = [];
;// CONCATENATED MODULE: ./src/tasks/yellowray.ts
var yellowray_templateObject, yellowray_templateObject2, yellowray_templateObject3, yellowray_templateObject4, yellowray_templateObject5, yellowray_templateObject6, yellowray_templateObject7, yellowray_templateObject8, yellowray_templateObject9, yellowray_templateObject10, yellowray_templateObject11;

function yellowray_toConsumableArray(arr) { return yellowray_arrayWithoutHoles(arr) || yellowray_iterableToArray(arr) || yellowray_unsupportedIterableToArray(arr) || yellowray_nonIterableSpread(); }

function yellowray_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function yellowray_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return yellowray_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return yellowray_arrayLikeToArray(o, minLen); }

function yellowray_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function yellowray_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return yellowray_arrayLikeToArray(arr); }

function yellowray_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function yellowray_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function yellowray_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function yellowray_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? yellowray_ownKeys(Object(source), !0).forEach(function (key) { yellowray_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : yellowray_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function yellowray_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function yellowray(task, alternativeOutfit, monsters) {
  var _task$combat;

  return yellowray_objectSpread(yellowray_objectSpread({}, task), {}, {
    ready: () => {
      var _task$ready, _task$ready2;

      return ((_task$ready = (_task$ready2 = task.ready) === null || _task$ready2 === void 0 ? void 0 : _task$ready2.call(task)) !== null && _task$ready !== void 0 ? _task$ready : true) && (have($effect(yellowray_templateObject || (yellowray_templateObject = yellowray_taggedTemplateLiteral(["Everything Looks Yellow"])))) || (0,external_kolmafia_namespaceObject.myMeat)() >= 250 || have(template_string_$item(yellowray_templateObject2 || (yellowray_templateObject2 = yellowray_taggedTemplateLiteral(["yellow rocket"])))));
    },
    acquire: () => {
      var _task$acquire;

      var acquire = typeof task.acquire === "function" ? task.acquire() : (_task$acquire = task.acquire) !== null && _task$acquire !== void 0 ? _task$acquire : [];
      return [].concat(yellowray_toConsumableArray(acquire), [{
        item: template_string_$item(yellowray_templateObject3 || (yellowray_templateObject3 = yellowray_taggedTemplateLiteral(["yellow rocket"]))),
        useful: () => !have($effect(yellowray_templateObject4 || (yellowray_templateObject4 = yellowray_taggedTemplateLiteral(["Everything Looks Yellow"])))) && have(template_string_$item(yellowray_templateObject5 || (yellowray_templateObject5 = yellowray_taggedTemplateLiteral(["Clan VIP Lounge key"]))))
      }]);
    },
    priority: () => have($effect(yellowray_templateObject6 || (yellowray_templateObject6 = yellowray_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.BadYR : have(template_string_$item(yellowray_templateObject7 || (yellowray_templateObject7 = yellowray_taggedTemplateLiteral(["Clan VIP Lounge key"])))) ? OverridePriority.YR : OverridePriority.None,
    combat: ((_task$combat = task.combat) !== null && _task$combat !== void 0 ? _task$combat : new combat_CombatStrategy()).macro(() => have($effect(yellowray_templateObject8 || (yellowray_templateObject8 = yellowray_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? new Macro() : Macro.tryItem(template_string_$item(yellowray_templateObject9 || (yellowray_templateObject9 = yellowray_taggedTemplateLiteral(["yellow rocket"])))), monsters),
    outfit: () => {
      var spec = typeof task.outfit === "function" ? task.outfit() : task.outfit;
      return have($effect(yellowray_templateObject10 || (yellowray_templateObject10 = yellowray_taggedTemplateLiteral(["Everything Looks Yellow"])))) || !have(template_string_$item(yellowray_templateObject11 || (yellowray_templateObject11 = yellowray_taggedTemplateLiteral(["Clan VIP Lounge key"])))) ? alternativeOutfit : spec;
    }
  });
}
;// CONCATENATED MODULE: ./src/tasks/level12.ts
var level12_templateObject, level12_templateObject2, level12_templateObject3, level12_templateObject4, level12_templateObject5, level12_templateObject6, level12_templateObject7, level12_templateObject8, level12_templateObject9, level12_templateObject10, level12_templateObject11, level12_templateObject12, level12_templateObject13, level12_templateObject14, level12_templateObject15, level12_templateObject16, level12_templateObject17, level12_templateObject18, level12_templateObject19, level12_templateObject20, level12_templateObject21, level12_templateObject22, level12_templateObject23, level12_templateObject24, level12_templateObject25, level12_templateObject26, level12_templateObject27, level12_templateObject28, level12_templateObject29, level12_templateObject30, level12_templateObject31, level12_templateObject32, level12_templateObject33, level12_templateObject34, level12_templateObject35, level12_templateObject36, level12_templateObject37, level12_templateObject38, level12_templateObject39, level12_templateObject40, level12_templateObject41, level12_templateObject42, level12_templateObject43, level12_templateObject44, level12_templateObject45, level12_templateObject46, level12_templateObject47, level12_templateObject48, level12_templateObject49, level12_templateObject50, level12_templateObject51, level12_templateObject52, level12_templateObject53, level12_templateObject54, level12_templateObject55, level12_templateObject56, level12_templateObject57, level12_templateObject58, level12_templateObject59, level12_templateObject60, level12_templateObject61, level12_templateObject62, level12_templateObject63, level12_templateObject64, level12_templateObject65, level12_templateObject66, level12_templateObject67, level12_templateObject68, level12_templateObject69, level12_templateObject70, level12_templateObject71, level12_templateObject72, level12_templateObject73, level12_templateObject74, level12_templateObject75, level12_templateObject76, level12_templateObject77, level12_templateObject78, level12_templateObject79, level12_templateObject80, level12_templateObject81, level12_templateObject82, level12_templateObject83, level12_templateObject84, level12_templateObject85, level12_templateObject86, level12_templateObject87, level12_templateObject88, level12_templateObject89, level12_templateObject90, level12_templateObject91, level12_templateObject92, level12_templateObject93, level12_templateObject94, level12_templateObject95, level12_templateObject96, level12_templateObject97, level12_templateObject98, level12_templateObject99, level12_templateObject100, level12_templateObject101, level12_templateObject102, level12_templateObject103, level12_templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129;

function level12_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = level12_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function level12_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level12_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level12_arrayLikeToArray(o, minLen); }

function level12_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level12_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








function flyersDone() {
  return property_get("flyeredML") >= 10000;
}
var Flyers = [{
  name: "Flyers Start",
  after: ["Enrage"],
  completed: () => have(template_string_$item(level12_templateObject || (level12_templateObject = level12_taggedTemplateLiteral(["rock band flyers"])))) || property_get("sidequestArenaCompleted") !== "none",
  outfit: {
    equip: template_string_$items(level12_templateObject2 || (level12_templateObject2 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=concert&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}, {
  name: "Flyers End",
  after: ["Flyers Start"],
  priority: () => OverridePriority.Free,
  ready: () => flyersDone(),
  // Buffer for mafia tracking
  completed: () => property_get("sidequestArenaCompleted") !== "none",
  outfit: {
    equip: template_string_$items(level12_templateObject3 || (level12_templateObject3 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=concert&pwd");
    (0,external_kolmafia_namespaceObject.cliExecute)("refresh inv");

    if (have(template_string_$item(level12_templateObject4 || (level12_templateObject4 = level12_taggedTemplateLiteral(["rock band flyers"]))))) {
      debug("Mafia tracking was incorrect for rock band flyers; continuing to flyer...");
      _set("_loopgyou_flyeredML_buffer", property_get("_loopgyou_flyeredML_buffer", 0) + (property_get("flyeredML") - 9900));
      _set("flyeredML", 9900);
    } else if (property_get("_loopgyou_flyeredML_buffer", 0) > 0) {
      debug("Mafia tracking was incorrect for rock band flyers; quest completed at ".concat(property_get("flyeredML") + property_get("_loopgyou_flyeredML_buffer", 0)));
    }
  },
  freeaction: true,
  limit: {
    soft: 10,
    message: "See https://kolmafia.us/threads/flyeredml-tracking-wrong.27567/"
  }
}];
var Lighthouse = [// Use CMG to replace a void monster into a Lobsterfrogman, then backup into the Boss Bat's lair
{
  name: "Lighthouse",
  after: ["Enrage", "Bat/Use Sonar 3"],
  ready: () => property_get("cursedMagnifyingGlassCount") >= 13 && property_get("_voidFreeFights") < 5,
  completed: () => property_get("lastCopyableMonster") === $monster(level12_templateObject5 || (level12_templateObject5 = level12_taggedTemplateLiteral(["lobsterfrogman"]))) || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level12_templateObject6 || (level12_templateObject6 = level12_taggedTemplateLiteral(["barrel of gunpowder"])))) >= 5 || property_get("sidequestLighthouseCompleted") !== "none" || !have(template_string_$item(level12_templateObject7 || (level12_templateObject7 = level12_taggedTemplateLiteral(["cursed magnifying glass"])))) || !have(template_string_$item(level12_templateObject8 || (level12_templateObject8 = level12_taggedTemplateLiteral(["Powerful Glove"])))) || !have(template_string_$item(level12_templateObject9 || (level12_templateObject9 = level12_taggedTemplateLiteral(["backup camera"])))),
  do: $location(level12_templateObject10 || (level12_templateObject10 = level12_taggedTemplateLiteral(["Sonofa Beach"]))),
  outfit: {
    offhand: template_string_$item(level12_templateObject11 || (level12_templateObject11 = level12_taggedTemplateLiteral(["cursed magnifying glass"]))),
    equip: template_string_$items(level12_templateObject12 || (level12_templateObject12 = level12_taggedTemplateLiteral(["Powerful Glove"])))
  },
  combat: new combat_CombatStrategy().macro(new Macro().trySkill($skill(level12_templateObject13 || (level12_templateObject13 = level12_taggedTemplateLiteral(["CHEAT CODE: Replace Enemy"])))), $monsters(level12_templateObject14 || (level12_templateObject14 = level12_taggedTemplateLiteral(["void guy, void slab, void spider"])))).kill($monster(level12_templateObject15 || (level12_templateObject15 = level12_taggedTemplateLiteral(["lobsterfrogman"])))),
  limit: {
    tries: 1
  }
}, {
  name: "Lighthouse Basic",
  after: ["Enrage", "Lighthouse"],
  completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level12_templateObject16 || (level12_templateObject16 = level12_taggedTemplateLiteral(["barrel of gunpowder"])))) >= 5 || property_get("sidequestLighthouseCompleted") !== "none",
  do: $location(level12_templateObject17 || (level12_templateObject17 = level12_taggedTemplateLiteral(["Sonofa Beach"]))),
  outfit: {
    modifier: "+combat"
  },
  combat: new combat_CombatStrategy().kill($monster(level12_templateObject18 || (level12_templateObject18 = level12_taggedTemplateLiteral(["lobsterfrogman"])))),
  limit: {
    soft: 40
  }
}, {
  name: "Lighthouse End",
  after: ["Lighthouse Basic"],
  completed: () => property_get("sidequestLighthouseCompleted") !== "none",
  outfit: {
    equip: template_string_$items(level12_templateObject19 || (level12_templateObject19 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=lighthouse&action=pyro&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}];
var Junkyard = [{
  name: "Junkyard Start",
  after: ["Enrage"],
  completed: () => have(template_string_$item(level12_templateObject20 || (level12_templateObject20 = level12_taggedTemplateLiteral(["molybdenum magnet"])))) || property_get("sidequestJunkyardCompleted") !== "none",
  outfit: {
    equip: template_string_$items(level12_templateObject21 || (level12_templateObject21 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?action=junkman&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}, {
  name: "Junkyard Hammer",
  after: ["Junkyard Start"],
  completed: () => have(template_string_$item(level12_templateObject22 || (level12_templateObject22 = level12_taggedTemplateLiteral(["molybdenum hammer"])))) || property_get("sidequestJunkyardCompleted") !== "none",
  acquire: [{
    item: template_string_$item(level12_templateObject23 || (level12_templateObject23 = level12_taggedTemplateLiteral(["seal tooth"])))
  }],
  outfit: {
    equip: template_string_$items(level12_templateObject24 || (level12_templateObject24 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: $location(level12_templateObject25 || (level12_templateObject25 = level12_taggedTemplateLiteral(["Next to that Barrel with Something Burning in it"]))),
  combat: new combat_CombatStrategy().macro(new Macro().while_("!match whips out && !times 28 && !hpbelow 30", new Macro().item(template_string_$item(level12_templateObject26 || (level12_templateObject26 = level12_taggedTemplateLiteral(["seal tooth"]))))).if_("match whips out", new Macro().item("molybdenum magnet")), $monster(level12_templateObject27 || (level12_templateObject27 = level12_taggedTemplateLiteral(["batwinged gremlin (tool)"])))).banish($monster(level12_templateObject28 || (level12_templateObject28 = level12_taggedTemplateLiteral(["A.M.C. gremlin"])))).kill($monster(level12_templateObject29 || (level12_templateObject29 = level12_taggedTemplateLiteral(["batwinged gremlin (tool)"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Junkyard Wrench",
  after: ["Junkyard Start"],
  completed: () => have(template_string_$item(level12_templateObject30 || (level12_templateObject30 = level12_taggedTemplateLiteral(["molybdenum crescent wrench"])))) || property_get("sidequestJunkyardCompleted") !== "none",
  acquire: [{
    item: template_string_$item(level12_templateObject31 || (level12_templateObject31 = level12_taggedTemplateLiteral(["seal tooth"])))
  }],
  outfit: {
    equip: template_string_$items(level12_templateObject32 || (level12_templateObject32 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: $location(level12_templateObject33 || (level12_templateObject33 = level12_taggedTemplateLiteral(["Over Where the Old Tires Are"]))),
  combat: new combat_CombatStrategy().macro(new Macro().while_("!match whips out && !times 28 && !hpbelow 30", new Macro().item(template_string_$item(level12_templateObject34 || (level12_templateObject34 = level12_taggedTemplateLiteral(["seal tooth"]))))).if_("match whips out", new Macro().item("molybdenum magnet")), $monster(level12_templateObject35 || (level12_templateObject35 = level12_taggedTemplateLiteral(["erudite gremlin (tool)"])))).banish($monster(level12_templateObject36 || (level12_templateObject36 = level12_taggedTemplateLiteral(["A.M.C. gremlin"])))).kill($monster(level12_templateObject37 || (level12_templateObject37 = level12_taggedTemplateLiteral(["erudite gremlin (tool)"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Junkyard Pliers",
  after: ["Junkyard Start"],
  acquire: [{
    item: template_string_$item(level12_templateObject38 || (level12_templateObject38 = level12_taggedTemplateLiteral(["seal tooth"])))
  }],
  completed: () => have(template_string_$item(level12_templateObject39 || (level12_templateObject39 = level12_taggedTemplateLiteral(["molybdenum pliers"])))) || property_get("sidequestJunkyardCompleted") !== "none",
  outfit: {
    equip: template_string_$items(level12_templateObject40 || (level12_templateObject40 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: $location(level12_templateObject41 || (level12_templateObject41 = level12_taggedTemplateLiteral(["Near an Abandoned Refrigerator"]))),
  combat: new combat_CombatStrategy().macro(new Macro().while_("!match whips out && !times 28 && !hpbelow 30", new Macro().item(template_string_$item(level12_templateObject42 || (level12_templateObject42 = level12_taggedTemplateLiteral(["seal tooth"]))))).if_("match whips out", new Macro().item("molybdenum magnet")), $monster(level12_templateObject43 || (level12_templateObject43 = level12_taggedTemplateLiteral(["spider gremlin (tool)"])))).banish($monster(level12_templateObject44 || (level12_templateObject44 = level12_taggedTemplateLiteral(["A.M.C. gremlin"])))).kill($monster(level12_templateObject45 || (level12_templateObject45 = level12_taggedTemplateLiteral(["spider gremlin (tool)"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Junkyard Screwdriver",
  after: ["Junkyard Start"],
  completed: () => have(template_string_$item(level12_templateObject46 || (level12_templateObject46 = level12_taggedTemplateLiteral(["molybdenum screwdriver"])))) || property_get("sidequestJunkyardCompleted") !== "none",
  acquire: [{
    item: template_string_$item(level12_templateObject47 || (level12_templateObject47 = level12_taggedTemplateLiteral(["seal tooth"])))
  }],
  outfit: {
    equip: template_string_$items(level12_templateObject48 || (level12_templateObject48 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: $location(level12_templateObject49 || (level12_templateObject49 = level12_taggedTemplateLiteral(["Out by that Rusted-Out Car"]))),
  combat: new combat_CombatStrategy().macro(new Macro().while_("!match whips out && !times 28 && !hpbelow 30", new Macro().item(template_string_$item(level12_templateObject50 || (level12_templateObject50 = level12_taggedTemplateLiteral(["seal tooth"]))))).if_("match whips out", new Macro().item("molybdenum magnet")), $monster(level12_templateObject51 || (level12_templateObject51 = level12_taggedTemplateLiteral(["vegetable gremlin (tool)"])))).banish($monster(level12_templateObject52 || (level12_templateObject52 = level12_taggedTemplateLiteral(["A.M.C. gremlin"])))).kill($monster(level12_templateObject53 || (level12_templateObject53 = level12_taggedTemplateLiteral(["vegetable gremlin (tool)"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Junkyard End",
  after: ["Junkyard Hammer", "Junkyard Wrench", "Junkyard Pliers", "Junkyard Screwdriver"],
  completed: () => property_get("sidequestJunkyardCompleted") !== "none",
  outfit: {
    equip: template_string_$items(level12_templateObject54 || (level12_templateObject54 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?action=junkman&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}];
var Orchard = [yellowray({
  name: "Orchard Hatching",
  after: ["Enrage"],
  completed: () => have(template_string_$item(level12_templateObject55 || (level12_templateObject55 = level12_taggedTemplateLiteral(["filthworm hatchling scent gland"])))) || have($effect(level12_templateObject56 || (level12_templateObject56 = level12_taggedTemplateLiteral(["Filthworm Larva Stench"])))) || have(template_string_$item(level12_templateObject57 || (level12_templateObject57 = level12_taggedTemplateLiteral(["filthworm drone scent gland"])))) || have($effect(level12_templateObject58 || (level12_templateObject58 = level12_taggedTemplateLiteral(["Filthworm Drone Stench"])))) || have(template_string_$item(level12_templateObject59 || (level12_templateObject59 = level12_taggedTemplateLiteral(["filthworm royal guard scent gland"])))) || have($effect(level12_templateObject60 || (level12_templateObject60 = level12_taggedTemplateLiteral(["Filthworm Guard Stench"])))) || have(template_string_$item(level12_templateObject61 || (level12_templateObject61 = level12_taggedTemplateLiteral(["heart of the filthworm queen"])))) || property_get("sidequestOrchardCompleted") !== "none",
  do: $location(level12_templateObject62 || (level12_templateObject62 = level12_taggedTemplateLiteral(["The Hatching Chamber"]))),
  combat: new combat_CombatStrategy().killItem(),
  limit: {
    soft: 10
  }
}, {
  modifier: "item"
}, $monster(level12_templateObject63 || (level12_templateObject63 = level12_taggedTemplateLiteral(["larval filthworm"])))), yellowray({
  name: "Orchard Feeding",
  after: ["Orchard Hatching"],
  completed: () => have(template_string_$item(level12_templateObject64 || (level12_templateObject64 = level12_taggedTemplateLiteral(["filthworm drone scent gland"])))) || have($effect(level12_templateObject65 || (level12_templateObject65 = level12_taggedTemplateLiteral(["Filthworm Drone Stench"])))) || have(template_string_$item(level12_templateObject66 || (level12_templateObject66 = level12_taggedTemplateLiteral(["filthworm royal guard scent gland"])))) || have($effect(level12_templateObject67 || (level12_templateObject67 = level12_taggedTemplateLiteral(["Filthworm Guard Stench"])))) || have(template_string_$item(level12_templateObject68 || (level12_templateObject68 = level12_taggedTemplateLiteral(["heart of the filthworm queen"])))) || property_get("sidequestOrchardCompleted") !== "none",
  do: $location(level12_templateObject69 || (level12_templateObject69 = level12_taggedTemplateLiteral(["The Feeding Chamber"]))),
  effects: $effects(level12_templateObject70 || (level12_templateObject70 = level12_taggedTemplateLiteral(["Filthworm Larva Stench"]))),
  combat: new combat_CombatStrategy().killItem(),
  limit: {
    soft: 10
  }
}, {
  modifier: "item"
}, $monster(level12_templateObject71 || (level12_templateObject71 = level12_taggedTemplateLiteral(["filthworm drone"])))), yellowray({
  name: "Orchard Guard",
  after: ["Orchard Feeding"],
  completed: () => have(template_string_$item(level12_templateObject72 || (level12_templateObject72 = level12_taggedTemplateLiteral(["filthworm royal guard scent gland"])))) || have($effect(level12_templateObject73 || (level12_templateObject73 = level12_taggedTemplateLiteral(["Filthworm Guard Stench"])))) || have(template_string_$item(level12_templateObject74 || (level12_templateObject74 = level12_taggedTemplateLiteral(["heart of the filthworm queen"])))) || property_get("sidequestOrchardCompleted") !== "none",
  do: $location(level12_templateObject75 || (level12_templateObject75 = level12_taggedTemplateLiteral(["The Royal Guard Chamber"]))),
  effects: $effects(level12_templateObject76 || (level12_templateObject76 = level12_taggedTemplateLiteral(["Filthworm Drone Stench"]))),
  combat: new combat_CombatStrategy().killItem(),
  limit: {
    soft: 10
  }
}, {
  modifier: "item"
}, $monster(level12_templateObject77 || (level12_templateObject77 = level12_taggedTemplateLiteral(["filthworm royal guard"])))), {
  name: "Orchard Queen",
  after: ["Orchard Guard"],
  completed: () => have(template_string_$item(level12_templateObject78 || (level12_templateObject78 = level12_taggedTemplateLiteral(["heart of the filthworm queen"])))) || property_get("sidequestOrchardCompleted") !== "none",
  do: $location(level12_templateObject79 || (level12_templateObject79 = level12_taggedTemplateLiteral(["The Filthworm Queen's Chamber"]))),
  effects: $effects(level12_templateObject80 || (level12_templateObject80 = level12_taggedTemplateLiteral(["Filthworm Guard Stench"]))),
  combat: new combat_CombatStrategy().kill(),
  limit: {
    tries: 2
  },
  // allow wanderer
  boss: true
}, {
  name: "Orchard Finish",
  after: ["Orchard Queen", "Open Orchard"],
  completed: () => property_get("sidequestOrchardCompleted") !== "none",
  outfit: {
    equip: template_string_$items(level12_templateObject81 || (level12_templateObject81 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=orchard&action=stand&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}];
var Nuns = [{
  name: "Nuns",
  after: ["Open Nuns"],
  completed: () => property_get("sidequestNunsCompleted") !== "none",
  priority: () => have($effect(level12_templateObject82 || (level12_templateObject82 = level12_taggedTemplateLiteral(["Winklered"])))) ? OverridePriority.Effect : OverridePriority.None,
  prepare: () => {
    if (have(template_string_$item(level12_templateObject83 || (level12_templateObject83 = level12_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])))) && property_get("boomBoxSong") !== "Total Eclipse of Your Meat") (0,external_kolmafia_namespaceObject.cliExecute)("boombox meat");
    if (!property_get("concertVisited")) ensureEffect($effect(level12_templateObject84 || (level12_templateObject84 = level12_taggedTemplateLiteral(["Winklered"]))));
  },
  do: $location(level12_templateObject85 || (level12_templateObject85 = level12_taggedTemplateLiteral(["The Themthar Hills"]))),
  outfit: () => {
    if (have(template_string_$familiar(level12_templateObject86 || (level12_templateObject86 = level12_taggedTemplateLiteral(["Trick-or-Treating Tot"])))) && have(template_string_$item(level12_templateObject87 || (level12_templateObject87 = level12_taggedTemplateLiteral(["li'l pirate costume"]))))) {
      return {
        modifier: "meat",
        familiar: template_string_$familiar(level12_templateObject88 || (level12_templateObject88 = level12_taggedTemplateLiteral(["Trick-or-Treating Tot"]))),
        equip: template_string_$items(level12_templateObject89 || (level12_templateObject89 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin, li'l pirate costume"])))
      };
    }

    return {
      modifier: "meat",
      equip: template_string_$items(level12_templateObject90 || (level12_templateObject90 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin, amulet coin"]))) // Use amulet coin (if we have) to avoid using orb

    };
  },
  freecombat: true,
  // Do not equip cmg or carn plant
  combat: new combat_CombatStrategy().macro(new Macro().trySkill($skill(level12_templateObject91 || (level12_templateObject91 = level12_taggedTemplateLiteral(["Bowl Straight Up"])))).trySkill($skill(level12_templateObject92 || (level12_templateObject92 = level12_taggedTemplateLiteral(["Sing Along"]))))).kill(),
  limit: {
    soft: 25
  },
  boss: true
}];
var WarQuest = {
  name: "War",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(12) && councilSafe(),
    completed: () => step("questL12War") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, yellowray({
    name: "Outfit Hippy",
    after: ["Misc/Unlock Island"],
    completed: () => have(template_string_$item(level12_templateObject93 || (level12_templateObject93 = level12_taggedTemplateLiteral(["filthy corduroys"])))) && have(template_string_$item(level12_templateObject94 || (level12_templateObject94 = level12_taggedTemplateLiteral(["filthy knitted dread sack"])))),
    do: $location(level12_templateObject95 || (level12_templateObject95 = level12_taggedTemplateLiteral(["Hippy Camp"]))),
    limit: {
      soft: 10
    },
    outfit: {
      modifier: "+combat"
    },
    choices: {
      136: () => have(template_string_$item(level12_templateObject96 || (level12_templateObject96 = level12_taggedTemplateLiteral(["filthy corduroys"])))) ? 2 : 1,
      137: () => have(template_string_$item(level12_templateObject97 || (level12_templateObject97 = level12_taggedTemplateLiteral(["filthy corduroys"])))) ? 1 : 2
    },
    combat: new combat_CombatStrategy().killItem()
  }, {
    modifier: "item"
  }), yellowray({
    name: "Outfit Frat",
    after: ["Start", "Outfit Hippy"],
    completed: () => have(template_string_$item(level12_templateObject98 || (level12_templateObject98 = level12_taggedTemplateLiteral(["beer helmet"])))) && have(template_string_$item(level12_templateObject99 || (level12_templateObject99 = level12_taggedTemplateLiteral(["distressed denim pants"])))) && have(template_string_$item(level12_templateObject100 || (level12_templateObject100 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))),
    do: $location(level12_templateObject101 || (level12_templateObject101 = level12_taggedTemplateLiteral(["Frat House"]))),
    limit: {
      soft: 10
    },
    outfit: {
      equip: template_string_$items(level12_templateObject102 || (level12_templateObject102 = level12_taggedTemplateLiteral(["filthy corduroys, filthy knitted dread sack"]))),
      modifier: "+combat"
    },
    choices: {
      142: 3,
      143: 3,
      144: 3,
      145: 1,
      146: 3,
      1433: 3
    },
    combat: new combat_CombatStrategy().killItem()
  }, {
    equip: template_string_$items(level12_templateObject103 || (level12_templateObject103 = level12_taggedTemplateLiteral(["filthy corduroys, filthy knitted dread sack"]))),
    modifier: "item"
  }), {
    name: "Enrage",
    after: ["Start", "Misc/Unlock Island", "Outfit Frat"],
    completed: () => step("questL12War") >= 1,
    outfit: {
      equip: template_string_$items(level12_templateObject104 || (level12_templateObject104 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"]))),
      modifier: "-combat"
    },
    do: $location(_templateObject105 || (_templateObject105 = level12_taggedTemplateLiteral(["Wartime Hippy Camp (Frat Disguise)"]))),
    choices: {
      142: 3,
      143: 3,
      144: 3,
      145: 1,
      146: 3,
      1433: 3
    },
    limit: {
      soft: 20
    }
  }].concat(Flyers, Lighthouse, Junkyard, [{
    name: "Open Orchard",
    after: ["Flyers End", "Lighthouse End", "Junkyard End"],
    acquire: [{
      item: template_string_$item(_templateObject106 || (_templateObject106 = level12_taggedTemplateLiteral(["beer helmet"])))
    }, {
      item: template_string_$item(_templateObject107 || (_templateObject107 = level12_taggedTemplateLiteral(["distressed denim pants"])))
    }, {
      item: template_string_$item(_templateObject108 || (_templateObject108 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))
    }],
    completed: () => property_get("hippiesDefeated") >= 64,
    outfit: {
      equip: template_string_$items(_templateObject109 || (_templateObject109 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
    },
    do: $location(_templateObject110 || (_templateObject110 = level12_taggedTemplateLiteral(["The Battlefield (Frat Uniform)"]))),
    post: dimesForGarters,
    combat: new combat_CombatStrategy().kill(),
    limit: {
      tries: 10
    }
  }], Orchard, [{
    name: "Open Nuns",
    after: ["Orchard Finish"],
    acquire: [{
      item: template_string_$item(_templateObject111 || (_templateObject111 = level12_taggedTemplateLiteral(["beer helmet"])))
    }, {
      item: template_string_$item(_templateObject112 || (_templateObject112 = level12_taggedTemplateLiteral(["distressed denim pants"])))
    }, {
      item: template_string_$item(_templateObject113 || (_templateObject113 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))
    }],
    completed: () => property_get("hippiesDefeated") >= 192,
    outfit: {
      equip: template_string_$items(_templateObject114 || (_templateObject114 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
    },
    do: $location(_templateObject115 || (_templateObject115 = level12_taggedTemplateLiteral(["The Battlefield (Frat Uniform)"]))),
    combat: new combat_CombatStrategy().kill(),
    limit: {
      tries: 9
    }
  }], Nuns, [{
    name: "Clear",
    after: ["Nuns"],
    acquire: [{
      item: template_string_$item(_templateObject116 || (_templateObject116 = level12_taggedTemplateLiteral(["beer helmet"])))
    }, {
      item: template_string_$item(_templateObject117 || (_templateObject117 = level12_taggedTemplateLiteral(["distressed denim pants"])))
    }, {
      item: template_string_$item(_templateObject118 || (_templateObject118 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))
    }],
    completed: () => property_get("hippiesDefeated") >= 1000,
    outfit: {
      equip: template_string_$items(_templateObject119 || (_templateObject119 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
    },
    do: $location(_templateObject120 || (_templateObject120 = level12_taggedTemplateLiteral(["The Battlefield (Frat Uniform)"]))),
    post: dimesForGarters,
    combat: new combat_CombatStrategy().kill(),
    limit: {
      tries: 30
    }
  }, {
    name: "Boss Hippie",
    after: ["Clear"],
    completed: () => step("questL12War") === 999,
    outfit: {
      equip: template_string_$items(_templateObject121 || (_templateObject121 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
    },
    prepare: dimesForGarters,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=camp&whichcamp=1&confirm7=1");
      (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?action=bossfight&pwd");
    },
    combat: new combat_CombatStrategy().killHard(),
    limit: {
      tries: 1
    },
    boss: true
  }])
};
function councilSafe() {
  // Check if it is safe to visit the council without making the war outfit worse
  // (It is harder to get the hippy outfit after the war starts)
  return !atLevel(12) || have(template_string_$item(_templateObject122 || (_templateObject122 = level12_taggedTemplateLiteral(["filthy corduroys"])))) && have(template_string_$item(_templateObject123 || (_templateObject123 = level12_taggedTemplateLiteral(["filthy knitted dread sack"])))) || have(template_string_$item(_templateObject124 || (_templateObject124 = level12_taggedTemplateLiteral(["beer helmet"])))) && have(template_string_$item(_templateObject125 || (_templateObject125 = level12_taggedTemplateLiteral(["distressed denim pants"])))) && have(template_string_$item(_templateObject126 || (_templateObject126 = level12_taggedTemplateLiteral(["bejeweled pledge pin"]))));
}

function dimesForGarters() {
  if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject127 || (_templateObject127 = level12_taggedTemplateLiteral(["gauze garter"])))) >= 20) return;
  var to_sell = template_string_$items(_templateObject128 || (_templateObject128 = level12_taggedTemplateLiteral(["pink clay bead, purple clay bead, green clay bead, communications windchimes, bullet-proof corduroys, round purple sunglasses, reinforced beaded headband"])));

  var _iterator = level12_createForOfIteratorHelper(to_sell),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var it = _step.value;
      if ((0,external_kolmafia_namespaceObject.itemAmount)(it) > 0) (0,external_kolmafia_namespaceObject.sell)(it.buyer, (0,external_kolmafia_namespaceObject.itemAmount)(it), it);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if ($coinmaster(_templateObject129 || (_templateObject129 = level12_taggedTemplateLiteral(["Quartersmaster"]))).availableTokens >= 2) (0,external_kolmafia_namespaceObject.cliExecute)("make * gauze garter");
}
;// CONCATENATED MODULE: ./src/tasks/absorb.ts
var absorb_templateObject, absorb_templateObject2, absorb_templateObject3, absorb_templateObject4, absorb_templateObject5, absorb_templateObject6, absorb_templateObject7, absorb_templateObject8, absorb_templateObject9, absorb_templateObject10, absorb_templateObject11, absorb_templateObject12, absorb_templateObject13, absorb_templateObject14, absorb_templateObject15, absorb_templateObject16, absorb_templateObject17, absorb_templateObject18, absorb_templateObject19, absorb_templateObject20, absorb_templateObject21, absorb_templateObject22, absorb_templateObject23, absorb_templateObject24, absorb_templateObject25, absorb_templateObject26, absorb_templateObject27, absorb_templateObject28, absorb_templateObject29, absorb_templateObject30, absorb_templateObject31, absorb_templateObject32, absorb_templateObject33, absorb_templateObject34, absorb_templateObject35, absorb_templateObject36, absorb_templateObject37, absorb_templateObject38, absorb_templateObject39, absorb_templateObject40, absorb_templateObject41, absorb_templateObject42, absorb_templateObject43, absorb_templateObject44, absorb_templateObject45, absorb_templateObject46, absorb_templateObject47, absorb_templateObject48, absorb_templateObject49, absorb_templateObject50, absorb_templateObject51, absorb_templateObject52, absorb_templateObject53, absorb_templateObject54, absorb_templateObject55, absorb_templateObject56, absorb_templateObject57, absorb_templateObject58, absorb_templateObject59, absorb_templateObject60, absorb_templateObject61, absorb_templateObject62, absorb_templateObject63, absorb_templateObject64, absorb_templateObject65, absorb_templateObject66, absorb_templateObject67, absorb_templateObject68, absorb_templateObject69, absorb_templateObject70, absorb_templateObject71, absorb_templateObject72, absorb_templateObject73, absorb_templateObject74, absorb_templateObject75, absorb_templateObject76, absorb_templateObject77, absorb_templateObject78, absorb_templateObject79, absorb_templateObject80, absorb_templateObject81, absorb_templateObject82, absorb_templateObject83, absorb_templateObject84, absorb_templateObject85, absorb_templateObject86, absorb_templateObject87, absorb_templateObject88, absorb_templateObject89, absorb_templateObject90, absorb_templateObject91, absorb_templateObject92, absorb_templateObject93, absorb_templateObject94, absorb_templateObject95, absorb_templateObject96, absorb_templateObject97, absorb_templateObject98, absorb_templateObject99, absorb_templateObject100, absorb_templateObject101, absorb_templateObject102, absorb_templateObject103, absorb_templateObject104, absorb_templateObject105, absorb_templateObject106, absorb_templateObject107, absorb_templateObject108, absorb_templateObject109, absorb_templateObject110, absorb_templateObject111, absorb_templateObject112, absorb_templateObject113, absorb_templateObject114, absorb_templateObject115, absorb_templateObject116, absorb_templateObject117, absorb_templateObject118, absorb_templateObject119, absorb_templateObject120, absorb_templateObject121, absorb_templateObject122, absorb_templateObject123, absorb_templateObject124, absorb_templateObject125, absorb_templateObject126, absorb_templateObject127, absorb_templateObject128, absorb_templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150, _templateObject151, _templateObject152, _templateObject153, _templateObject154, _templateObject155, _templateObject156, _templateObject157, _templateObject158, _templateObject159, _templateObject160, _templateObject161, _templateObject162, _templateObject163, _templateObject164, _templateObject165, _templateObject166, _templateObject167, _templateObject168, _templateObject169, _templateObject170, _templateObject171, _templateObject172, _templateObject173, _templateObject174, _templateObject175, _templateObject176, _templateObject177, _templateObject178, _templateObject179, _templateObject180, _templateObject181, _templateObject182, _templateObject183, _templateObject184, _templateObject185, _templateObject186, _templateObject187, _templateObject188, _templateObject189, _templateObject190, _templateObject191, _templateObject192, _templateObject193, _templateObject194, _templateObject195, _templateObject196, _templateObject197, _templateObject198, _templateObject199, _templateObject200, _templateObject201, _templateObject202, _templateObject203, _templateObject204, _templateObject205, _templateObject206, _templateObject207, _templateObject208, _templateObject209, _templateObject210, _templateObject211, _templateObject212, _templateObject213, _templateObject214, _templateObject215, _templateObject216, _templateObject217, _templateObject218, _templateObject219, _templateObject220, _templateObject221, _templateObject222, _templateObject223, _templateObject224, _templateObject225, _templateObject226, _templateObject227, _templateObject228, _templateObject229, _templateObject230, _templateObject231, _templateObject232, _templateObject233, _templateObject234, _templateObject235, _templateObject236, _templateObject237, _templateObject238, _templateObject239, _templateObject240, _templateObject241, _templateObject242, _templateObject243, _templateObject244, _templateObject245, _templateObject246, _templateObject247, _templateObject248, _templateObject249, _templateObject250, _templateObject251, _templateObject252, _templateObject253, _templateObject254, _templateObject255, _templateObject256, _templateObject257, _templateObject258, _templateObject259, _templateObject260, _templateObject261, _templateObject262, _templateObject263, _templateObject264, _templateObject265, _templateObject266, _templateObject267, _templateObject268, _templateObject269, _templateObject270, _templateObject271, _templateObject272, _templateObject273, _templateObject274, _templateObject275, _templateObject276, _templateObject277, _templateObject278, _templateObject279, _templateObject280, _templateObject281, _templateObject282, _templateObject283, _templateObject284, _templateObject285, _templateObject286, _templateObject287, _templateObject288, _templateObject289, _templateObject290, _templateObject291, _templateObject292, _templateObject293, _templateObject294, _templateObject295, _templateObject296, _templateObject297, _templateObject298, _templateObject299, _templateObject300, _templateObject301, _templateObject302, _templateObject303, _templateObject304, _templateObject305, _templateObject306, _templateObject307, _templateObject308, _templateObject309, _templateObject310, _templateObject311, _templateObject312, _templateObject313, _templateObject314, _templateObject315, _templateObject316, _templateObject317;

function absorb_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function absorb_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? absorb_ownKeys(Object(source), !0).forEach(function (key) { absorb_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : absorb_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function absorb_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function absorb_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function absorb_createClass(Constructor, protoProps, staticProps) { if (protoProps) absorb_defineProperties(Constructor.prototype, protoProps); if (staticProps) absorb_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function absorb_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function absorb_toConsumableArray(arr) { return absorb_arrayWithoutHoles(arr) || absorb_iterableToArray(arr) || absorb_unsupportedIterableToArray(arr) || absorb_nonIterableSpread(); }

function absorb_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function absorb_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function absorb_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return absorb_arrayLikeToArray(arr); }

function absorb_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = absorb_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function absorb_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return absorb_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return absorb_arrayLikeToArray(o, minLen); }

function absorb_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function absorb_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








 // Add a shorthand for expressing absorption-only tasks; there are a lot.

// A list of all locations that might have important monsters
// Roughly in order of unlock in a basic run
var absorbTasks = [// Level 2
{
  do: $location(absorb_templateObject || (absorb_templateObject = absorb_taggedTemplateLiteral(["The Spooky Forest"]))),
  after: ["Hidden City/Open Temple"],
  choices: {
    502: 2,
    505: 2,
    334: 1
  }
}, // Level 3
{
  do: $location(absorb_templateObject2 || (absorb_templateObject2 = absorb_taggedTemplateLiteral(["A Barroom Brawl"]))),
  after: ["Tavern/Start"]
}, // Level 4
{
  do: $location(absorb_templateObject3 || (absorb_templateObject3 = absorb_taggedTemplateLiteral(["The Bat Hole Entrance"]))),
  after: ["Bat/Start"]
}, {
  do: $location(absorb_templateObject4 || (absorb_templateObject4 = absorb_taggedTemplateLiteral(["Guano Junction"]))),
  ready: () => stenchRes(true) >= 1,
  prepare: () => {
    if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 1) ensureEffect($effect(absorb_templateObject5 || (absorb_templateObject5 = absorb_taggedTemplateLiteral(["Red Door Syndrome"]))));
    if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 1) throw "Unable to ensure cold res for The Icy Peak";
  },
  after: ["Bat/Get Sonar 3"],
  choices: {
    1427: 2
  }
}, {
  do: $location(absorb_templateObject6 || (absorb_templateObject6 = absorb_taggedTemplateLiteral(["The Batrat and Ratbat Burrow"]))),
  after: ["Bat/Use Sonar 1", "Palindome/Bat Snake"],
  skill: $skill(absorb_templateObject7 || (absorb_templateObject7 = absorb_taggedTemplateLiteral(["Nanofur"])))
}, {
  do: $location(absorb_templateObject8 || (absorb_templateObject8 = absorb_taggedTemplateLiteral(["The Beanbat Chamber"]))),
  after: ["Bat/Use Sonar 2", "Giant/Grow Beanstalk"]
}, // Level 5
{
  do: $location(absorb_templateObject9 || (absorb_templateObject9 = absorb_taggedTemplateLiteral(["The Outskirts of Cobb's Knob"]))),
  after: ["Knob/Open Knob"],
  choices: {
    111: 3,
    113: 2,
    118: 1
  },
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject10 || (absorb_templateObject10 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: $location(absorb_templateObject11 || (absorb_templateObject11 = absorb_taggedTemplateLiteral(["Cobb's Knob Kitchens"]))),
  after: ["Knob/Open Knob"]
}, {
  do: $location(absorb_templateObject12 || (absorb_templateObject12 = absorb_taggedTemplateLiteral(["Cobb's Knob Barracks"]))),
  after: ["Knob/Open Knob"],
  choices: {
    522: 2
  }
}, {
  do: $location(absorb_templateObject13 || (absorb_templateObject13 = absorb_taggedTemplateLiteral(["Cobb's Knob Harem"]))),
  after: ["Knob/King"]
}, {
  do: $location(absorb_templateObject14 || (absorb_templateObject14 = absorb_taggedTemplateLiteral(["Cobb's Knob Treasury"]))),
  after: ["Knob/Open Knob"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject15 || (absorb_templateObject15 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: $location(absorb_templateObject16 || (absorb_templateObject16 = absorb_taggedTemplateLiteral(["Cobb's Knob Laboratory"]))),
  after: ["Knob/King"]
}, {
  do: $location(absorb_templateObject17 || (absorb_templateObject17 = absorb_taggedTemplateLiteral(["The Knob Shaft"]))),
  after: ["Knob/King"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject18 || (absorb_templateObject18 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: $location(absorb_templateObject19 || (absorb_templateObject19 = absorb_taggedTemplateLiteral(["Cobb's Knob Menagerie, Level 1"]))),
  after: ["Knob/Open Menagerie"]
}, {
  do: $location(absorb_templateObject20 || (absorb_templateObject20 = absorb_taggedTemplateLiteral(["Cobb's Knob Menagerie, Level 2"]))),
  after: ["Knob/Open Menagerie"],
  skill: $skill(absorb_templateObject21 || (absorb_templateObject21 = absorb_taggedTemplateLiteral(["Fluid Dynamics Simulation"])))
}, {
  do: $location(absorb_templateObject22 || (absorb_templateObject22 = absorb_taggedTemplateLiteral(["Cobb's Knob Menagerie, Level 3"]))),
  after: ["Knob/Open Menagerie"],
  skill: $skill(absorb_templateObject23 || (absorb_templateObject23 = absorb_taggedTemplateLiteral(["Phase Shift"])))
}, // Level 6
{
  do: $location(absorb_templateObject24 || (absorb_templateObject24 = absorb_taggedTemplateLiteral(["The Dark Heart of the Woods"]))),
  after: ["Friar/Heart"],
  ready: () => step("questL06Friar") < 999
}, {
  do: $location(absorb_templateObject25 || (absorb_templateObject25 = absorb_taggedTemplateLiteral(["The Dark Neck of the Woods"]))),
  after: ["Friar/Neck"],
  ready: () => step("questL06Friar") < 999
}, {
  do: $location(absorb_templateObject26 || (absorb_templateObject26 = absorb_taggedTemplateLiteral(["The Dark Elbow of the Woods"]))),
  after: ["Friar/Elbow"],
  ready: () => step("questL06Friar") < 999
}, {
  do: $location(absorb_templateObject27 || (absorb_templateObject27 = absorb_taggedTemplateLiteral(["Pandamonium Slums"]))),
  prepare: () => {
    if (step("questM10Azazel") === -1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=temp");
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=sven");
    }
  },
  after: ["Friar/Finish"]
}, {
  do: $location(absorb_templateObject28 || (absorb_templateObject28 = absorb_taggedTemplateLiteral(["The Laugh Floor"]))),
  prepare: () => {
    if (step("questM10Azazel") === -1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=temp");
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=sven");
    }
  },
  after: ["Friar/Finish"]
}, {
  do: $location(absorb_templateObject29 || (absorb_templateObject29 = absorb_taggedTemplateLiteral(["Infernal Rackets Backstage"]))),
  prepare: () => {
    if (step("questM10Azazel") === -1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=temp");
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=sven");
    }
  },
  after: ["Friar/Finish"],
  skill: $skill(absorb_templateObject30 || (absorb_templateObject30 = absorb_taggedTemplateLiteral(["Gravitational Compression"])))
}, // Level 7
{
  do: $location(absorb_templateObject31 || (absorb_templateObject31 = absorb_taggedTemplateLiteral(["The VERY Unquiet Garves"]))),
  after: ["Crypt/Start", "Crypt/Finish"]
}, // Level 8
{
  do: $location(absorb_templateObject32 || (absorb_templateObject32 = absorb_taggedTemplateLiteral(["Itznotyerzitz Mine"]))),
  after: ["McLargeHuge/Trapper Request"],
  choices: {
    18: 3,
    19: 3,
    20: 3,
    556: 2
  },
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject33 || (absorb_templateObject33 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: $location(absorb_templateObject34 || (absorb_templateObject34 = absorb_taggedTemplateLiteral(["The Goatlet"]))),
  after: ["McLargeHuge/Goatlet"]
}, {
  do: $location(absorb_templateObject35 || (absorb_templateObject35 = absorb_taggedTemplateLiteral(["Lair of the Ninja Snowmen"]))),
  after: ["McLargeHuge/Climb", "Palindome/Cold Snake"]
}, {
  do: $location(absorb_templateObject36 || (absorb_templateObject36 = absorb_taggedTemplateLiteral(["The eXtreme Slope"]))),
  after: ["McLargeHuge/Climb"],
  choices: {
    15: 3,
    16: 3,
    17: 3,
    575: 3
  },
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject37 || (absorb_templateObject37 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: $location(absorb_templateObject38 || (absorb_templateObject38 = absorb_taggedTemplateLiteral(["The Icy Peak"]))),
  after: ["McLargeHuge/Peak"],
  ready: () => coldRes(true) >= 5,
  prepare: () => {
    if ((0,external_kolmafia_namespaceObject.numericModifier)("cold resistance") < 5) ensureEffect($effect(absorb_templateObject39 || (absorb_templateObject39 = absorb_taggedTemplateLiteral(["Red Door Syndrome"]))));
    if ((0,external_kolmafia_namespaceObject.numericModifier)("cold resistance") < 5) throw "Unable to ensure cold res for The Icy Peak";
  },
  outfit: {
    modifier: "10 cold res 5min, +combat",
    equip: template_string_$items(absorb_templateObject40 || (absorb_templateObject40 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  combat: new combat_CombatStrategy().macro(new Macro().attack().repeat(), $monster(absorb_templateObject41 || (absorb_templateObject41 = absorb_taggedTemplateLiteral(["Snow Queen"]))))
}, // Level 9
{
  do: $location(absorb_templateObject42 || (absorb_templateObject42 = absorb_taggedTemplateLiteral(["The Smut Orc Logging Camp"]))),
  after: ["Orc Chasm/Bridge"],
  choices: {
    1345: 1
  }
}, {
  do: $location(absorb_templateObject43 || (absorb_templateObject43 = absorb_taggedTemplateLiteral(["A-Boo Peak"]))),
  after: ["Orc Chasm/ABoo Clues"],
  combat: new combat_CombatStrategy().macro(new Macro().attack().repeat())
}, {
  do: $location(absorb_templateObject44 || (absorb_templateObject44 = absorb_taggedTemplateLiteral(["Twin Peak"]))),
  after: ["Orc Chasm/Twin Init"],
  skill: $skill(absorb_templateObject45 || (absorb_templateObject45 = absorb_taggedTemplateLiteral(["Overclocking"])))
}, {
  do: $location(absorb_templateObject46 || (absorb_templateObject46 = absorb_taggedTemplateLiteral(["Oil Peak"]))),
  after: ["Orc Chasm/Oil Peak"],
  ready: () => have(template_string_$item(absorb_templateObject47 || (absorb_templateObject47 = absorb_taggedTemplateLiteral(["backup camera"])))) || have(template_string_$item(absorb_templateObject48 || (absorb_templateObject48 = absorb_taggedTemplateLiteral(["old patched suit-pants"])))),
  prepare: () => {
    // Unequip the umbrella if it pushes us over the cap
    if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(absorb_templateObject49 || (absorb_templateObject49 = absorb_taggedTemplateLiteral(["unbreakable umbrella"])))) > 0 && property_get("umbrellaState") === "broken" && (0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") >= 80) {
      (0,external_kolmafia_namespaceObject.equip)($slot(absorb_templateObject50 || (absorb_templateObject50 = absorb_taggedTemplateLiteral(["off-hand"]))), template_string_$item(absorb_templateObject51 || (absorb_templateObject51 = absorb_taggedTemplateLiteral(["none"]))));
    } // Unequip items one-by-one until we are below 100 ML
    // (Always leave the backup camera on)


    var _iterator = absorb_createForOfIteratorHelper(external_kolmafia_namespaceObject.Slot.all()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var slot = _step.value;
        if ((0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") < 100) break;
        var item = (0,external_kolmafia_namespaceObject.equippedItem)(slot);
        if (item === template_string_$item(absorb_templateObject52 || (absorb_templateObject52 = absorb_taggedTemplateLiteral(["none"])))) continue; // eslint-disable-next-line libram/verify-constants

        if ((0,external_kolmafia_namespaceObject.numericModifier)(item, "Monster Level") === 0 && item !== template_string_$item(absorb_templateObject53 || (absorb_templateObject53 = absorb_taggedTemplateLiteral(["Jurassic Parka"])))) continue;
        if (item === template_string_$item(absorb_templateObject54 || (absorb_templateObject54 = absorb_taggedTemplateLiteral(["backup camera"])))) continue; // Always keep equipped to ensure we can get to 50

        (0,external_kolmafia_namespaceObject.equip)(slot, template_string_$item(absorb_templateObject55 || (absorb_templateObject55 = absorb_taggedTemplateLiteral(["none"]))));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if ((0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") >= 100 && (0,external_kolmafia_namespaceObject.currentMcd)() > 0) (0,external_kolmafia_namespaceObject.changeMcd)(0);
    if ((0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") < 50 && (0,external_kolmafia_namespaceObject.currentMcd)() < 10) (0,external_kolmafia_namespaceObject.changeMcd)(10);
    if ((0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") < 50 || (0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") >= 100) throw "Unable to get 50-99 ML for oil barons";
  },
  post: () => {
    if ((0,external_kolmafia_namespaceObject.currentMcd)() > 0) (0,external_kolmafia_namespaceObject.changeMcd)(0);
  },
  freecombat: true,
  outfit: {
    modifier: "ML 50min"
  },
  limit: {
    tries: 1
  }
}, {
  do: $location(absorb_templateObject56 || (absorb_templateObject56 = absorb_taggedTemplateLiteral(["The Valley of Rof L'm Fao"]))),
  after: ["Orc Chasm/Finish"]
}, // Level 10
{
  do: $location(absorb_templateObject57 || (absorb_templateObject57 = absorb_taggedTemplateLiteral(["The Penultimate Fantasy Airship"]))),
  after: ["Giant/Airship"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject58 || (absorb_templateObject58 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    178: 2,
    182: 2
  }
}, {
  do: $location(absorb_templateObject59 || (absorb_templateObject59 = absorb_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
  after: ["Giant/Basement Finish"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject60 || (absorb_templateObject60 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    670: 3,
    669: 1,
    671: 3
  }
}, {
  do: $location(absorb_templateObject61 || (absorb_templateObject61 = absorb_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Ground Floor)"]))),
  after: ["Giant/Ground"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject62 || (absorb_templateObject62 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    672: 3,
    673: 3,
    674: 3,
    1026: 3
  }
}, {
  do: $location(absorb_templateObject63 || (absorb_templateObject63 = absorb_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
  after: ["Giant/Top Floor", "Palindome/Hot Snake Postcastle"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject64 || (absorb_templateObject64 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    675: 4,
    676: 4,
    677: 4,
    678: 1,
    679: 1,
    1431: 4
  }
}, {
  do: $location(absorb_templateObject65 || (absorb_templateObject65 = absorb_taggedTemplateLiteral(["The Hole in the Sky"]))),
  after: ["Giant/Unlock HITS", "Keys/Star Key"]
}, // Level 11
{
  do: $location(absorb_templateObject66 || (absorb_templateObject66 = absorb_taggedTemplateLiteral(["The Black Forest"]))),
  after: ["Macguffin/Forest"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject67 || (absorb_templateObject67 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    923: 1,
    924: 1
  },
  skill: $skill(absorb_templateObject68 || (absorb_templateObject68 = absorb_taggedTemplateLiteral(["Photonic Shroud"])))
}, // Level 11: Hidden City
{
  do: $location(absorb_templateObject69 || (absorb_templateObject69 = absorb_taggedTemplateLiteral(["The Hidden Temple"]))),
  after: ["Hidden City/Open City"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject70 || (absorb_templateObject70 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    579: () => {
      return property_get("lastTempleAdventures") === (0,external_kolmafia_namespaceObject.myAscensions)() ? 2 : 1;
    },
    580: 3,
    581: 3
  }
}, {
  do: $location(absorb_templateObject71 || (absorb_templateObject71 = absorb_taggedTemplateLiteral(["The Hidden Park"]))),
  after: ["Hidden City/Open City", "Hidden City/Banish Janitors"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject72 || (absorb_templateObject72 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    789: () => {
      return property_get("relocatePygmyJanitor") === (0,external_kolmafia_namespaceObject.myAscensions)() ? 2 : 3;
    }
  },
  skill: $skill(absorb_templateObject73 || (absorb_templateObject73 = absorb_taggedTemplateLiteral(["System Sweep"])))
}, {
  do: $location(absorb_templateObject74 || (absorb_templateObject74 = absorb_taggedTemplateLiteral(["The Hidden Apartment Building"]))),
  after: ["Hidden City/Apartment"],
  choices: {
    780: 4
  }
}, {
  do: $location(absorb_templateObject75 || (absorb_templateObject75 = absorb_taggedTemplateLiteral(["The Hidden Office Building"]))),
  after: ["Hidden City/Office Boss"],
  choices: {
    786: 4
  }
}, {
  do: $location(absorb_templateObject76 || (absorb_templateObject76 = absorb_taggedTemplateLiteral(["The Hidden Hospital"]))),
  after: ["Hidden City/Hospital"]
}, {
  do: $location(absorb_templateObject77 || (absorb_templateObject77 = absorb_taggedTemplateLiteral(["The Hidden Bowling Alley"]))),
  after: ["Hidden City/Bowling"]
}, // Level 11: Manor
{
  do: $location(absorb_templateObject78 || (absorb_templateObject78 = absorb_taggedTemplateLiteral(["The Haunted Pantry"]))),
  after: [],
  choices: {
    114: 2,
    115: 1,
    116: 4,
    117: 1
  },
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject79 || (absorb_templateObject79 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: $location(absorb_templateObject80 || (absorb_templateObject80 = absorb_taggedTemplateLiteral(["The Haunted Conservatory"]))),
  after: ["Manor/Start"],
  choices: {
    899: 2
  },
  skill: $skill(absorb_templateObject81 || (absorb_templateObject81 = absorb_taggedTemplateLiteral(["Ponzi Apparatus"])))
}, {
  do: $location(absorb_templateObject82 || (absorb_templateObject82 = absorb_taggedTemplateLiteral(["The Haunted Kitchen"]))),
  after: ["Manor/Kitchen"],
  choices: {
    893: 2
  }
}, {
  do: $location(absorb_templateObject83 || (absorb_templateObject83 = absorb_taggedTemplateLiteral(["The Haunted Billiards Room"]))),
  after: ["Manor/Billiards"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject84 || (absorb_templateObject84 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  combat: new combat_CombatStrategy().macro(new Macro().attack().repeat(), $monster(absorb_templateObject85 || (absorb_templateObject85 = absorb_taggedTemplateLiteral(["chalkdust wraith"])))),
  choices: {
    900: 2
  },
  skill: $skill(absorb_templateObject86 || (absorb_templateObject86 = absorb_taggedTemplateLiteral(["Subatomic Hardening"])))
}, {
  do: $location(absorb_templateObject87 || (absorb_templateObject87 = absorb_taggedTemplateLiteral(["The Haunted Library"]))),
  after: ["Manor/Library"],
  choices: {
    163: 4,
    888: 4,
    889: 5,
    894: 1
  }
}, {
  do: $location(absorb_templateObject88 || (absorb_templateObject88 = absorb_taggedTemplateLiteral(["The Haunted Gallery"]))),
  after: ["Manor/Gallery"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject89 || (absorb_templateObject89 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    89: 6,
    896: 1
  }
}, {
  do: $location(absorb_templateObject90 || (absorb_templateObject90 = absorb_taggedTemplateLiteral(["The Haunted Bathroom"]))),
  after: ["Manor/Bathroom"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject91 || (absorb_templateObject91 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    881: 1,
    105: 1,
    892: 1
  },
  skill: $skill(absorb_templateObject92 || (absorb_templateObject92 = absorb_taggedTemplateLiteral(["Clammy Microcilia"])))
}, {
  do: $location(absorb_templateObject93 || (absorb_templateObject93 = absorb_taggedTemplateLiteral(["The Haunted Bedroom"]))),
  after: ["Manor/Bedroom"],
  choices: {
    876: 1,
    877: 1,
    878: 4,
    879: 1,
    880: 1,
    897: 2
  }
}, {
  do: $location(absorb_templateObject94 || (absorb_templateObject94 = absorb_taggedTemplateLiteral(["The Haunted Ballroom"]))),
  after: ["Manor/Ballroom"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject95 || (absorb_templateObject95 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    881: 1,
    105: 1,
    892: 1
  }
}, {
  do: $location(absorb_templateObject96 || (absorb_templateObject96 = absorb_taggedTemplateLiteral(["The Haunted Wine Cellar"]))),
  after: ["Manor/Wine Cellar"],
  choices: {
    901: 2
  }
}, {
  do: $location(absorb_templateObject97 || (absorb_templateObject97 = absorb_taggedTemplateLiteral(["The Haunted Laundry Room"]))),
  after: ["Manor/Laundry Room"],
  choices: {
    891: 2
  }
}, {
  do: $location(absorb_templateObject98 || (absorb_templateObject98 = absorb_taggedTemplateLiteral(["The Haunted Boiler Room"]))),
  after: ["Manor/Boiler Room"],
  choices: {
    902: 2
  }
}, {
  prepare: () => {
    if (step("questM17Babies") === -1) (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor3&action=manor3_ladys");
  },
  do: $location(absorb_templateObject99 || (absorb_templateObject99 = absorb_taggedTemplateLiteral(["The Haunted Storage Room"]))),
  after: ["Manor/Finish Floor2"],
  choices: {
    886: 6,
    890: 1
  }
}, {
  prepare: () => {
    if (step("questM17Babies") === -1) (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor3&action=manor3_ladys");
  },
  do: $location(absorb_templateObject100 || (absorb_templateObject100 = absorb_taggedTemplateLiteral(["The Haunted Nursery"]))),
  after: ["Manor/Finish Floor2"],
  choices: {
    884: 6,
    885: 6,
    898: 2
  }
}, {
  prepare: () => {
    if (step("questM17Babies") === -1) (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor3&action=manor3_ladys");
  },
  do: $location(absorb_templateObject101 || (absorb_templateObject101 = absorb_taggedTemplateLiteral(["The Haunted Laboratory"]))),
  after: ["Manor/Finish Floor2"],
  choices: {
    884: 6,
    903: 2
  }
}, // Level 11: Palindome
{
  do: $location(absorb_templateObject102 || (absorb_templateObject102 = absorb_taggedTemplateLiteral(["The Copperhead Club"]))),
  after: ["Palindome/Copperhead"],
  choices: {
    855: 4
  }
}, {
  do: $location(absorb_templateObject103 || (absorb_templateObject103 = absorb_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))),
  after: ["Palindome/Protesters Finish"]
}, {
  do: $location(absorb_templateObject104 || (absorb_templateObject104 = absorb_taggedTemplateLiteral(["The Red Zeppelin"]))),
  after: ["Palindome/Zepplin"]
}, {
  do: $location(absorb_templateObject105 || (absorb_templateObject105 = absorb_taggedTemplateLiteral(["Inside the Palindome"]))),
  after: ["Palindome/Palindome Photos"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject106 || (absorb_templateObject106 = absorb_taggedTemplateLiteral(["Talisman o' Namsilat, miniature crystal ball"])))
  },
  choices: {
    2: 2,
    126: 1,
    127: 1,
    180: 2
  }
}, {
  do: $location(absorb_templateObject107 || (absorb_templateObject107 = absorb_taggedTemplateLiteral(["Whitey's Grove"]))),
  after: ["Palindome/Open Alarm"],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject108 || (absorb_templateObject108 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    73: 3,
    74: 2,
    75: 2
  }
}, // Level 11: Pyramid
{
  do: $location(absorb_templateObject109 || (absorb_templateObject109 = absorb_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"]))),
  after: ["Macguffin/Desert"]
}, {
  priority: () => have($effect(absorb_templateObject110 || (absorb_templateObject110 = absorb_taggedTemplateLiteral(["Ultrahydrated"])))) && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(absorb_templateObject111 || (absorb_templateObject111 = absorb_taggedTemplateLiteral(["Grey Goose"])))) >= 6 ? OverridePriority.Effect : OverridePriority.None,
  do: $location(absorb_templateObject112 || (absorb_templateObject112 = absorb_taggedTemplateLiteral(["The Oasis"]))),
  after: ["Macguffin/Desert"]
}, {
  do: $location(absorb_templateObject113 || (absorb_templateObject113 = absorb_taggedTemplateLiteral(["The Upper Chamber"]))),
  after: ["Macguffin/Upper Chamber"]
}, {
  do: $location(absorb_templateObject114 || (absorb_templateObject114 = absorb_taggedTemplateLiteral(["The Middle Chamber"]))),
  after: ["Macguffin/Middle Chamber"]
}, // Misc areas
// These are probably only worthwhile with orb
{
  do: $location(absorb_templateObject115 || (absorb_templateObject115 = absorb_taggedTemplateLiteral(["South of the Border"]))),
  ready: () => have(template_string_$item(absorb_templateObject116 || (absorb_templateObject116 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))),
  after: ["Misc/Unlock Beach", "Absorb/Whitey's Grove"],
  choices: {
    4: 3
  },
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(absorb_templateObject117 || (absorb_templateObject117 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: $location(absorb_templateObject118 || (absorb_templateObject118 = absorb_taggedTemplateLiteral(["The Unquiet Garves"]))),
  after: ["Crypt/Start"]
}, {
  do: $location(absorb_templateObject119 || (absorb_templateObject119 = absorb_taggedTemplateLiteral(["The Old Landfill"]))),
  after: ["Mosquito/Start"],
  prepare: () => {
    if (step("questM19Hippy") === -1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=woods&action=woods_smokesignals");
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=798&option=1");
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=798&option=2");
      (0,external_kolmafia_namespaceObject.visitUrl)("woods.php");
    }

    if (have(template_string_$item(absorb_templateObject120 || (absorb_templateObject120 = absorb_taggedTemplateLiteral(["funky junk key"]))))) {
      (0,external_kolmafia_namespaceObject.putCloset)(template_string_$item(absorb_templateObject121 || (absorb_templateObject121 = absorb_taggedTemplateLiteral(["funky junk key"]))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(absorb_templateObject122 || (absorb_templateObject122 = absorb_taggedTemplateLiteral(["funky junk key"])))));
    }
  },
  ready: () => atLevel(6)
}, {
  do: $location(absorb_templateObject123 || (absorb_templateObject123 = absorb_taggedTemplateLiteral(["The Skeleton Store"]))),
  after: [],
  prepare: () => {
    if (step("questM23Meatsmith") === -1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith");
      (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
      (0,external_kolmafia_namespaceObject.runChoice)(1);
    }
  },
  choices: {
    1060: 1
  }
}, {
  do: $location(absorb_templateObject124 || (absorb_templateObject124 = absorb_taggedTemplateLiteral(["The Overgrown Lot"]))),
  after: [],
  prepare: () => {
    if (step("questM24Doc") === -1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=doc");
      (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=doc&action=talk");
      (0,external_kolmafia_namespaceObject.runChoice)(1);
    }
  },
  choices: {
    1062: 3
  }
}, {
  do: $location(absorb_templateObject125 || (absorb_templateObject125 = absorb_taggedTemplateLiteral(["Madness Bakery"]))),
  after: [],
  prepare: () => {
    if (step("questM25Armorer") === -1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=armory");
      (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=armory&action=talk");
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=1065&option=1");
    }
  },
  choices: {
    1061: 5
  }
}, {
  do: $location(absorb_templateObject126 || (absorb_templateObject126 = absorb_taggedTemplateLiteral(["The Dungeons of Doom"]))),
  skill: $skill(absorb_templateObject127 || (absorb_templateObject127 = absorb_taggedTemplateLiteral(["Hivemindedness"]))),
  after: [],
  prepare: () => {
    if (have(template_string_$item(absorb_templateObject128 || (absorb_templateObject128 = absorb_taggedTemplateLiteral(["plus sign"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(absorb_templateObject129 || (absorb_templateObject129 = absorb_taggedTemplateLiteral(["plus sign"]))));
  },
  ready: () => property_get("lastPlusSignUnlock") === (0,external_kolmafia_namespaceObject.myAscensions)(),
  choices: {
    25: 3
  },
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(_templateObject130 || (_templateObject130 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, // Moon-sign zones
{
  do: $location(_templateObject131 || (_templateObject131 = absorb_taggedTemplateLiteral(["The Bugbear Pen"]))),
  ready: () => (0,external_kolmafia_namespaceObject.knollAvailable)(),
  prepare: () => {
    if (step("questM03Bugbear") === -1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=knoll_friendly&action=dk_mayor");
    }
  },
  after: ["Mosquito/Start"]
}, {
  do: $location(_templateObject132 || (_templateObject132 = absorb_taggedTemplateLiteral(["Outskirts of Camp Logging Camp"]))),
  ready: () => (0,external_kolmafia_namespaceObject.canadiaAvailable)(),
  after: [],
  outfit: {
    modifier: "+combat",
    equip: template_string_$items(_templateObject133 || (_templateObject133 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: $location(_templateObject134 || (_templateObject134 = absorb_taggedTemplateLiteral(["Thugnderdome"]))),
  ready: () => (0,external_kolmafia_namespaceObject.gnomadsAvailable)(),
  after: []
}]; // All monsters that give adventures upon absorption

var reprocessTargets = new Set([// 10 adv monsters
$monster(_templateObject135 || (_templateObject135 = absorb_taggedTemplateLiteral(["1335 HaXx0r"]))), $monster(_templateObject136 || (_templateObject136 = absorb_taggedTemplateLiteral(["Alphabet Giant"]))), $monster(_templateObject137 || (_templateObject137 = absorb_taggedTemplateLiteral(["black magic woman"]))), $monster(_templateObject138 || (_templateObject138 = absorb_taggedTemplateLiteral(["blur"]))), $monster(_templateObject139 || (_templateObject139 = absorb_taggedTemplateLiteral(["Bob Racecar"]))), $monster(_templateObject140 || (_templateObject140 = absorb_taggedTemplateLiteral(["coaltergeist"]))), $monster(_templateObject141 || (_templateObject141 = absorb_taggedTemplateLiteral(["fleet woodsman"]))), $monster(_templateObject142 || (_templateObject142 = absorb_taggedTemplateLiteral(["Iiti Kitty"]))), $monster(_templateObject143 || (_templateObject143 = absorb_taggedTemplateLiteral(["Irritating Series of Random Encounters"]))), $monster(_templateObject144 || (_templateObject144 = absorb_taggedTemplateLiteral(["Little Man in the Canoe"]))), $monster(_templateObject145 || (_templateObject145 = absorb_taggedTemplateLiteral(["mad wino"]))), $monster(_templateObject146 || (_templateObject146 = absorb_taggedTemplateLiteral(["Mob Penguin Capo"]))), $monster(_templateObject147 || (_templateObject147 = absorb_taggedTemplateLiteral(["One-Eyed Willie"]))), $monster(_templateObject148 || (_templateObject148 = absorb_taggedTemplateLiteral(["pygmy blowgunner"]))), $monster(_templateObject149 || (_templateObject149 = absorb_taggedTemplateLiteral(["pygmy headhunter"]))), $monster(_templateObject150 || (_templateObject150 = absorb_taggedTemplateLiteral(["pygmy orderlies"]))), $monster(_templateObject151 || (_templateObject151 = absorb_taggedTemplateLiteral(["pygmy shaman"]))), $monster(_templateObject152 || (_templateObject152 = absorb_taggedTemplateLiteral(["Racecar Bob"]))), $monster(_templateObject153 || (_templateObject153 = absorb_taggedTemplateLiteral(["Raver Giant"]))), $monster(_templateObject154 || (_templateObject154 = absorb_taggedTemplateLiteral(["Renaissance Giant"]))), $monster(_templateObject155 || (_templateObject155 = absorb_taggedTemplateLiteral(["swarm of fire ants"]))), $monster(_templateObject156 || (_templateObject156 = absorb_taggedTemplateLiteral(["tomb asp"]))), // 7 adv monsters
$monster(_templateObject157 || (_templateObject157 = absorb_taggedTemplateLiteral(["animated rustic nightstand"]))), $monster(_templateObject158 || (_templateObject158 = absorb_taggedTemplateLiteral(["basic lihc"]))), $monster(_templateObject159 || (_templateObject159 = absorb_taggedTemplateLiteral(["Battlie Knight Ghost"]))), $monster(_templateObject160 || (_templateObject160 = absorb_taggedTemplateLiteral(["Bubblemint Twins"]))), $monster(_templateObject161 || (_templateObject161 = absorb_taggedTemplateLiteral(["CH Imp"]))), $monster(_templateObject162 || (_templateObject162 = absorb_taggedTemplateLiteral(["chalkdust wraith"]))), $monster(_templateObject163 || (_templateObject163 = absorb_taggedTemplateLiteral(["cloud of disembodied whiskers"]))), $monster(_templateObject164 || (_templateObject164 = absorb_taggedTemplateLiteral(["eXtreme Orcish snowboarder"]))), $monster(_templateObject165 || (_templateObject165 = absorb_taggedTemplateLiteral(["gluttonous ghuol"]))), $monster(_templateObject166 || (_templateObject166 = absorb_taggedTemplateLiteral(["Grass Elemental"]))), $monster(_templateObject167 || (_templateObject167 = absorb_taggedTemplateLiteral(["grave rober zmobie"]))), $monster(_templateObject168 || (_templateObject168 = absorb_taggedTemplateLiteral(["guy with a pitchfork, and his wife"]))), $monster(_templateObject169 || (_templateObject169 = absorb_taggedTemplateLiteral(["junksprite sharpener"]))), $monster(_templateObject170 || (_templateObject170 = absorb_taggedTemplateLiteral(["Knob Goblin Very Mad Scientist"]))), $monster(_templateObject171 || (_templateObject171 = absorb_taggedTemplateLiteral(["model skeleton"]))), $monster(_templateObject172 || (_templateObject172 = absorb_taggedTemplateLiteral(["Ninja Snowman Janitor"]))), $monster(_templateObject173 || (_templateObject173 = absorb_taggedTemplateLiteral(["oil baron"]))), $monster(_templateObject174 || (_templateObject174 = absorb_taggedTemplateLiteral(["party skelteon"]))), $monster(_templateObject175 || (_templateObject175 = absorb_taggedTemplateLiteral(["possessed silverware drawer"]))), $monster(_templateObject176 || (_templateObject176 = absorb_taggedTemplateLiteral(["possessed toy chest"]))), $monster(_templateObject177 || (_templateObject177 = absorb_taggedTemplateLiteral(["revolving bugbear"]))), $monster(_templateObject178 || (_templateObject178 = absorb_taggedTemplateLiteral(["sabre-toothed goat"]))), $monster(_templateObject179 || (_templateObject179 = absorb_taggedTemplateLiteral(["serialbus"]))), $monster(_templateObject180 || (_templateObject180 = absorb_taggedTemplateLiteral(["sheet ghost"]))), $monster(_templateObject181 || (_templateObject181 = absorb_taggedTemplateLiteral(["skeletal hamster"]))), $monster(_templateObject182 || (_templateObject182 = absorb_taggedTemplateLiteral(["smut orc pipelayer"]))), $monster(_templateObject183 || (_templateObject183 = absorb_taggedTemplateLiteral(["swarm of killer bees"]))), $monster(_templateObject184 || (_templateObject184 = absorb_taggedTemplateLiteral(["tapdancing skeleton"]))), $monster(_templateObject185 || (_templateObject185 = absorb_taggedTemplateLiteral(["toilet papergeist"]))), $monster(_templateObject186 || (_templateObject186 = absorb_taggedTemplateLiteral(["upgraded ram"]))), $monster(_templateObject187 || (_templateObject187 = absorb_taggedTemplateLiteral(["vicious gnauga"]))), $monster(_templateObject188 || (_templateObject188 = absorb_taggedTemplateLiteral(["whitesnake"]))), $monster(_templateObject189 || (_templateObject189 = absorb_taggedTemplateLiteral(["Booze Giant"]))), // 5 adv monsters
$monster(_templateObject190 || (_templateObject190 = absorb_taggedTemplateLiteral(["dire pigeon"]))), $monster(_templateObject191 || (_templateObject191 = absorb_taggedTemplateLiteral(["gingerbread murderer"]))), $monster(_templateObject192 || (_templateObject192 = absorb_taggedTemplateLiteral(["grave rober"]))), $monster(_templateObject193 || (_templateObject193 = absorb_taggedTemplateLiteral(["irate mariachi"]))), $monster(_templateObject194 || (_templateObject194 = absorb_taggedTemplateLiteral(["plastered frat orc"]))), $monster(_templateObject195 || (_templateObject195 = absorb_taggedTemplateLiteral(["swarm of skulls"]))), $monster(_templateObject196 || (_templateObject196 = absorb_taggedTemplateLiteral(["albino bat"]))), $monster(_templateObject197 || (_templateObject197 = absorb_taggedTemplateLiteral(["batrat"]))), $monster(_templateObject198 || (_templateObject198 = absorb_taggedTemplateLiteral(["G imp"]))), $monster(_templateObject199 || (_templateObject199 = absorb_taggedTemplateLiteral(["Knob Goblin Bean Counter"]))), $monster(_templateObject200 || (_templateObject200 = absorb_taggedTemplateLiteral(["Knob Goblin Madam"]))), $monster(_templateObject201 || (_templateObject201 = absorb_taggedTemplateLiteral(["Knob Goblin Master Chef"]))), $monster(_templateObject202 || (_templateObject202 = absorb_taggedTemplateLiteral(["L imp"]))), $monster(_templateObject203 || (_templateObject203 = absorb_taggedTemplateLiteral(["magical fruit bat"]))), $monster(_templateObject204 || (_templateObject204 = absorb_taggedTemplateLiteral(["P imp"]))), $monster(_templateObject205 || (_templateObject205 = absorb_taggedTemplateLiteral(["swarm of Knob lice"]))), $monster(_templateObject206 || (_templateObject206 = absorb_taggedTemplateLiteral(["W imp"]))), $monster(_templateObject207 || (_templateObject207 = absorb_taggedTemplateLiteral(["warwelf"])))]); // Other monsters that give skills

var usefulSkills = new Map([[$skill(_templateObject208 || (_templateObject208 = absorb_taggedTemplateLiteral(["Ponzi Apparatus"]))), $monster(_templateObject209 || (_templateObject209 = absorb_taggedTemplateLiteral(["anglerbush"])))], [$skill(_templateObject210 || (_templateObject210 = absorb_taggedTemplateLiteral(["Ominous Substrate"]))), $monster(_templateObject211 || (_templateObject211 = absorb_taggedTemplateLiteral(["animated ornate nightstand"])))], [$skill(_templateObject212 || (_templateObject212 = absorb_taggedTemplateLiteral(["Innuendo Circuitry"]))), $monster(_templateObject213 || (_templateObject213 = absorb_taggedTemplateLiteral(["Astronomer"])))], [$skill(_templateObject214 || (_templateObject214 = absorb_taggedTemplateLiteral(["Exhaust Tubules"]))), $monster(_templateObject215 || (_templateObject215 = absorb_taggedTemplateLiteral(["beanbat"])))], [$skill(_templateObject216 || (_templateObject216 = absorb_taggedTemplateLiteral(["Overclocking"]))), $monster(_templateObject217 || (_templateObject217 = absorb_taggedTemplateLiteral(["Big Wheelin' Twins"])))], [$skill(_templateObject218 || (_templateObject218 = absorb_taggedTemplateLiteral(["Photonic Shroud"]))), $monster(_templateObject219 || (_templateObject219 = absorb_taggedTemplateLiteral(["black panther"])))], [$skill(_templateObject220 || (_templateObject220 = absorb_taggedTemplateLiteral(["Fluid Dynamics Simulation"]))), $monster(_templateObject221 || (_templateObject221 = absorb_taggedTemplateLiteral(["Carnivorous Moxie Weed"])))], [$skill(_templateObject222 || (_templateObject222 = absorb_taggedTemplateLiteral(["Ectogenesis"]))), $monster(_templateObject223 || (_templateObject223 = absorb_taggedTemplateLiteral(["Claybender Sorcerer Ghost"])))], [$skill(_templateObject224 || (_templateObject224 = absorb_taggedTemplateLiteral(["Microburner"]))), $monster(_templateObject225 || (_templateObject225 = absorb_taggedTemplateLiteral(["Cobb's Knob oven"])))], [$skill(_templateObject226 || (_templateObject226 = absorb_taggedTemplateLiteral(["Localized Vacuum"]))), $monster(_templateObject227 || (_templateObject227 = absorb_taggedTemplateLiteral(["cubist bull"])))], [$skill(_templateObject228 || (_templateObject228 = absorb_taggedTemplateLiteral(["Infernal Automata"]))), $monster(_templateObject229 || (_templateObject229 = absorb_taggedTemplateLiteral(["demonic icebox"])))], [$skill(_templateObject230 || (_templateObject230 = absorb_taggedTemplateLiteral(["Secondary Fermentation"]))), $monster(_templateObject231 || (_templateObject231 = absorb_taggedTemplateLiteral(["drunk goat"])))], [$skill(_templateObject232 || (_templateObject232 = absorb_taggedTemplateLiteral(["Double Nanovision"]))), $monster(_templateObject233 || (_templateObject233 = absorb_taggedTemplateLiteral(["drunk pygmy"])))], [$skill(_templateObject234 || (_templateObject234 = absorb_taggedTemplateLiteral(["Microweave"]))), $monster(_templateObject235 || (_templateObject235 = absorb_taggedTemplateLiteral(["eXtreme cross-country hippy"])))], [$skill(_templateObject236 || (_templateObject236 = absorb_taggedTemplateLiteral(["AUTOEXEC.BAT"]))), $monster(_templateObject237 || (_templateObject237 = absorb_taggedTemplateLiteral(["Flock of Stab-bats"])))], [$skill(_templateObject238 || (_templateObject238 = absorb_taggedTemplateLiteral(["Propagation Drive"]))), $monster(_templateObject239 || (_templateObject239 = absorb_taggedTemplateLiteral(["junksprite bender"])))], [$skill(_templateObject240 || (_templateObject240 = absorb_taggedTemplateLiteral(["Camp Subroutines"]))), $monster(_templateObject241 || (_templateObject241 = absorb_taggedTemplateLiteral(["Knob Goblin Harem Girl"])))], [$skill(_templateObject242 || (_templateObject242 = absorb_taggedTemplateLiteral(["Cryocurrency"]))), $monster(_templateObject243 || (_templateObject243 = absorb_taggedTemplateLiteral(["Knob Goblin MBA"])))], [$skill(_templateObject244 || (_templateObject244 = absorb_taggedTemplateLiteral(["Curses Library"]))), $monster(_templateObject245 || (_templateObject245 = absorb_taggedTemplateLiteral(["lihc"])))], [$skill(_templateObject246 || (_templateObject246 = absorb_taggedTemplateLiteral(["Clammy Microcilia"]))), $monster(_templateObject247 || (_templateObject247 = absorb_taggedTemplateLiteral(["malevolent hair clog"])))], [$skill(_templateObject248 || (_templateObject248 = absorb_taggedTemplateLiteral(["Financial Spreadsheets"]))), $monster(_templateObject249 || (_templateObject249 = absorb_taggedTemplateLiteral(["me4t begZ0r"])))], [$skill(_templateObject250 || (_templateObject250 = absorb_taggedTemplateLiteral(["Hivemindedness"]))), $monster(_templateObject251 || (_templateObject251 = absorb_taggedTemplateLiteral(["mind flayer"])))], [$skill(_templateObject252 || (_templateObject252 = absorb_taggedTemplateLiteral(["Cooling Tubules"]))), $monster(_templateObject253 || (_templateObject253 = absorb_taggedTemplateLiteral(["Ninja Snowman Weaponmaster"])))], // [$skill`Lubricant Layer`, $monster`oil slick`],
[$skill(_templateObject254 || (_templateObject254 = absorb_taggedTemplateLiteral(["Conifer Polymers"]))), $monster(_templateObject255 || (_templateObject255 = absorb_taggedTemplateLiteral(["pine bat"])))], [$skill(_templateObject256 || (_templateObject256 = absorb_taggedTemplateLiteral(["Subatomic Hardening"]))), $monster(_templateObject257 || (_templateObject257 = absorb_taggedTemplateLiteral(["pooltergeist"])))], [$skill(_templateObject258 || (_templateObject258 = absorb_taggedTemplateLiteral(["Legacy Code"]))), $monster(_templateObject259 || (_templateObject259 = absorb_taggedTemplateLiteral(["possessed wine rack"])))], [$skill(_templateObject260 || (_templateObject260 = absorb_taggedTemplateLiteral(["System Sweep"]))), $monster(_templateObject261 || (_templateObject261 = absorb_taggedTemplateLiteral(["pygmy janitor"])))], [$skill(_templateObject262 || (_templateObject262 = absorb_taggedTemplateLiteral(["Infinite Loop"]))), $monster(_templateObject263 || (_templateObject263 = absorb_taggedTemplateLiteral(["pygmy witch lawyer"])))], [$skill(_templateObject264 || (_templateObject264 = absorb_taggedTemplateLiteral(["Ire Proof"]))), $monster(_templateObject265 || (_templateObject265 = absorb_taggedTemplateLiteral(["raging bull"])))], [$skill(_templateObject266 || (_templateObject266 = absorb_taggedTemplateLiteral(["Nanofur"]))), $monster(_templateObject267 || (_templateObject267 = absorb_taggedTemplateLiteral(["ratbat"])))], [$skill(_templateObject268 || (_templateObject268 = absorb_taggedTemplateLiteral(["Procgen Ribaldry"]))), $monster(_templateObject269 || (_templateObject269 = absorb_taggedTemplateLiteral(["smut orc screwer"])))], [$skill(_templateObject270 || (_templateObject270 = absorb_taggedTemplateLiteral(["Snow-Cooling System"]))), $monster(_templateObject271 || (_templateObject271 = absorb_taggedTemplateLiteral(["Snow Queen"])))], [$skill(_templateObject272 || (_templateObject272 = absorb_taggedTemplateLiteral(["Phase Shift"]))), $monster(_templateObject273 || (_templateObject273 = absorb_taggedTemplateLiteral(["Spectral Jellyfish"])))], [$skill(_templateObject274 || (_templateObject274 = absorb_taggedTemplateLiteral(["Autovampirism Routines"]))), $monster(_templateObject275 || (_templateObject275 = absorb_taggedTemplateLiteral(["spooky vampire"])))], [$skill(_templateObject276 || (_templateObject276 = absorb_taggedTemplateLiteral(["Steam Mycelia"]))), $monster(_templateObject277 || (_templateObject277 = absorb_taggedTemplateLiteral(["steam elemental"])))], [$skill(_templateObject278 || (_templateObject278 = absorb_taggedTemplateLiteral(["Gravitational Compression"]))), $monster(_templateObject279 || (_templateObject279 = absorb_taggedTemplateLiteral(["suckubus"])))], [$skill(_templateObject280 || (_templateObject280 = absorb_taggedTemplateLiteral(["Grey Noise"]))), $monster(_templateObject281 || (_templateObject281 = absorb_taggedTemplateLiteral(["Boss Bat"])))], [$skill(_templateObject282 || (_templateObject282 = absorb_taggedTemplateLiteral(["Anti-Sleaze Recursion"]))), $monster(_templateObject283 || (_templateObject283 = absorb_taggedTemplateLiteral(["werecougar"])))], [$skill(_templateObject284 || (_templateObject284 = absorb_taggedTemplateLiteral(["Piezoelectric Honk"]))), $monster(_templateObject285 || (_templateObject285 = absorb_taggedTemplateLiteral(["white lion"])))]]);
var usefulMonsters = new Set([].concat(absorb_toConsumableArray(reprocessTargets), absorb_toConsumableArray(usefulSkills.values())));

function monstersAt(location) {
  var result = Object.entries((0,external_kolmafia_namespaceObject.appearanceRates)(location)).filter(i => i[1] !== -2) // Avoid impossible monsters
  .map(i => external_kolmafia_namespaceObject.Monster.get(i[0]));
  return result;
}

var AbsorbState = /*#__PURE__*/function () {
  function AbsorbState() {
    absorb_classCallCheck(this, AbsorbState);

    absorb_defineProperty(this, "absorbed", new Set());

    absorb_defineProperty(this, "reprocessed", new Set());

    absorb_defineProperty(this, "ignored", new Set());

    absorb_defineProperty(this, "ignoredSkills", new Set());

    var charsheet = (0,external_kolmafia_namespaceObject.visitUrl)("charsheet.php");
    var match; // Mark down all absorbed monsters that didn't give skills

    var monster_regex = new RegExp(/Absorbed [^<]* from ([^<]*)\./g);

    do {
      match = monster_regex.exec(charsheet);

      if (match) {
        var name = match[1].replace(/^a /g, "").replace(/^an /g, "").replace(/^some /g, "").replace(/^the /g, "").replace(/^The /g, "");
        this.absorbed.add(external_kolmafia_namespaceObject.Monster.get(name));
      }
    } while (match); // Mark down all absorbed monsters that gave skills


    var skill_regex = new RegExp(/<a onClick='javascript:poop\("[^"]*","skill", \d+, \d+\)'>([^<]*)<\/a>/g);

    do {
      match = skill_regex.exec(charsheet);

      if (match) {
        var monster = usefulSkills.get(external_kolmafia_namespaceObject.Skill.get(match[1]));
        if (monster === undefined) continue;
        this.absorbed.add(monster);
      }
    } while (match); // Mark down all monsters that we have reprocessed


    property_get("gooseReprocessed").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => external_kolmafia_namespaceObject.Monster.get(id)).map(monster => this.reprocessed.add(monster)); // Ignore the elemental skills that are not useful for the tower

    var ignored_skills = new Set();
    var needed_elem_skills = {
      hot: $skills(_templateObject286 || (_templateObject286 = absorb_taggedTemplateLiteral(["Microburner, Infernal Automata, Steam Mycelia"]))),
      cold: $skills(_templateObject287 || (_templateObject287 = absorb_taggedTemplateLiteral(["Cryocurrency, Cooling Tubules, Snow-Cooling System"]))),
      spooky: $skills(_templateObject288 || (_templateObject288 = absorb_taggedTemplateLiteral(["Curses Library, Ominous Substrate, Legacy Code"]))),
      stench: $skills(_templateObject289 || (_templateObject289 = absorb_taggedTemplateLiteral(["Exhaust Tubules, Secondary Fermentation, AUTOEXEC.BAT"]))),
      sleaze: $skills(_templateObject290 || (_templateObject290 = absorb_taggedTemplateLiteral(["Camp Subroutines, Procgen Ribaldry, Innuendo Circuitry"])))
    };

    for (var _elem in needed_elem_skills) {
      if (property_get("nsChallenge2") !== _elem) {
        var _iterator2 = absorb_createForOfIteratorHelper(needed_elem_skills[_elem]),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var unneeded_skill = _step2.value;
            ignored_skills.add(unneeded_skill);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } // No need for resistance skills if we already have enough
    // Get at least 3 cold res for icy peak


    if (coldRes(false) >= 3) ignored_skills.add($skill(_templateObject291 || (_templateObject291 = absorb_taggedTemplateLiteral(["Nanofur"])))); // Get at least 4 stench res for twin peaks

    if (stenchRes(false) >= 2) ignored_skills.add($skill(_templateObject292 || (_templateObject292 = absorb_taggedTemplateLiteral(["Clammy Microcilia"])))); // Other res skills are only needed for the tower hedge maze

    var res_skills = $skills(_templateObject293 || (_templateObject293 = absorb_taggedTemplateLiteral(["Ire Proof, Autovampirism Routines, Conifer Polymers, Anti-Sleaze Recursion, Localized Vacuum, Microweave, Ectogenesis, Lubricant Layer"])));

    if (towerSkip()) {
      var _iterator3 = absorb_createForOfIteratorHelper(res_skills),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var skill = _step3.value;
          ignored_skills.add(skill);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    } // We need a single +cold dmg source for orcs


    if (!have(template_string_$item(_templateObject294 || (_templateObject294 = absorb_taggedTemplateLiteral(["frozen jeans"])))) && !have(template_string_$item(_templateObject295 || (_templateObject295 = absorb_taggedTemplateLiteral(["June cleaver"])))) && !have(template_string_$item(_templateObject296 || (_templateObject296 = absorb_taggedTemplateLiteral(["industrial fire extinguisher"])))) && !have($skill(_templateObject297 || (_templateObject297 = absorb_taggedTemplateLiteral(["Cryocurrency"])))) && !have($skill(_templateObject298 || (_templateObject298 = absorb_taggedTemplateLiteral(["Cooling Tubules"]))))) {
      ignored_skills.delete($skill(_templateObject299 || (_templateObject299 = absorb_taggedTemplateLiteral(["Snow-Cooling System"]))));
    }

    var _iterator4 = absorb_createForOfIteratorHelper(ignored_skills),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _skill = _step4.value;

        var _monster2 = usefulSkills.get(_skill);

        this.ignoredSkills.add(_skill);
        if (_monster2 === undefined) continue;
        this.ignored.add(_monster2);
      } // Ignore skills after the NS is defeated

    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    if (step("questL13Final") > 11) {
      var _iterator5 = absorb_createForOfIteratorHelper(usefulSkills.values()),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _monster = _step5.value;
          this.ignored.add(_monster);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    } // Don't bother to chase the ice house banished monster


    var icehouse = getBanishedMonsters().get(template_string_$item(_templateObject300 || (_templateObject300 = absorb_taggedTemplateLiteral(["ice house"]))));
    if (icehouse !== undefined) this.ignored.add(icehouse);
  }

  absorb_createClass(AbsorbState, [{
    key: "remainingReprocess",
    value: function remainingReprocess(location) {
      // Return all remaining desired and unreprocessed monsters, in this location or everywhere
      if (!location) {
        return absorb_toConsumableArray(reprocessTargets).filter(monster => !this.reprocessed.has(monster) && !this.ignored.has(monster));
      }

      return monstersAt(location).filter(monster => this.isReprocessTarget(monster));
    }
  }, {
    key: "remainingAbsorbs",
    value: function remainingAbsorbs(location) {
      // Return all remaining desired and unabsorbed monsters, in this location or everywhere
      if (!location) {
        return absorb_toConsumableArray(usefulMonsters).filter(monster => !this.absorbed.has(monster) && !this.ignored.has(monster));
      }

      return monstersAt(location).filter(monster => this.isTarget(monster));
    }
  }, {
    key: "hasTargets",
    value: function hasTargets(location) {
      // Return true if the location has at least one desired unabsorbed monster
      return this.remainingAbsorbs(location).length > 0;
    }
  }, {
    key: "hasReprocessTargets",
    value: function hasReprocessTargets(location) {
      // Return true if the location has at least one desired unabsorbed monster we desire to reprocess
      return this.remainingReprocess(location).length > 0;
    }
  }, {
    key: "isTarget",
    value: function isTarget(monster) {
      // Return true if the monster is desired and unabsorbed
      return usefulMonsters.has(monster) && !this.absorbed.has(monster) && !this.ignored.has(monster);
    }
  }, {
    key: "isReprocessTarget",
    value: function isReprocessTarget(monster) {
      // Return true if the monster is desired and unreprocessed
      return reprocessTargets.has(monster) && !this.reprocessed.has(monster) && !this.ignored.has(monster);
    }
  }, {
    key: "skillCompleted",
    value: function skillCompleted(skill) {
      // Return true if the skill is obtained or is safe to ignore
      return have(skill) || this.ignoredSkills.has(skill);
    }
  }]);

  return AbsorbState;
}();
var AbsorbQuest = {
  name: "Absorb",
  tasks: [].concat(absorb_toConsumableArray(absorbTasks.map(task => {
    var _task$after, _task$combat;

    var result = absorb_objectSpread(absorb_objectSpread({
      name: task.do.toString(),
      completed: () => !globalStateCache.absorb().hasTargets(task.do)
    }, task), {}, {
      after: task.skill ? [].concat(absorb_toConsumableArray((_task$after = task.after) !== null && _task$after !== void 0 ? _task$after : []), [task.skill.name]) : task.after,
      combat: ((_task$combat = task.combat) !== null && _task$combat !== void 0 ? _task$combat : new combat_CombatStrategy()).ignore(),
      // killing targetting monsters is set in the engine
      limit: {
        soft: 25
      }
    });

    if (result.outfit === undefined) result.outfit = {
      equip: template_string_$items(_templateObject301 || (_templateObject301 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
    };
    return result;
  })), absorb_toConsumableArray(absorbTasks.filter(task => task.skill !== undefined).map(task => {
    var _task$skill$name, _task$skill, _task$combat2;

    var result = absorb_objectSpread(absorb_objectSpread({
      name: (_task$skill$name = (_task$skill = task.skill) === null || _task$skill === void 0 ? void 0 : _task$skill.name) !== null && _task$skill$name !== void 0 ? _task$skill$name : "",
      completed: () => {
        var _task$skill2;

        return globalStateCache.absorb().skillCompleted((_task$skill2 = task.skill) !== null && _task$skill2 !== void 0 ? _task$skill2 : $skill(_templateObject302 || (_templateObject302 = absorb_taggedTemplateLiteral(["none"]))));
      }
    }, task), {}, {
      combat: ((_task$combat2 = task.combat) !== null && _task$combat2 !== void 0 ? _task$combat2 : new combat_CombatStrategy()).ignore(),
      // killing targetting monsters is set in the engine
      limit: {
        soft: 25
      }
    });

    if (result.outfit === undefined) result.outfit = {
      equip: template_string_$items(_templateObject303 || (_templateObject303 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
    };
    return result;
  })), [{
    // Add a last task for routing
    name: "All",
    after: absorbTasks.map(task => task.do.toString()),
    ready: () => false,
    completed: () => true,
    do: () => {
      throw "Unable to absorb all target monsters";
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
var ReprocessQuest = {
  name: "Reprocess",
  tasks: [].concat(absorb_toConsumableArray(absorbTasks.map(task => {
    var _task$after2, _task$combat3;

    var result = absorb_objectSpread(absorb_objectSpread({
      name: task.do.toString(),
      completed: () => !globalStateCache.absorb().hasReprocessTargets(task.do)
    }, task), {}, {
      after: [].concat(absorb_toConsumableArray((_task$after2 = task.after) !== null && _task$after2 !== void 0 ? _task$after2 : []), ["Absorb/".concat(task.do.toString())]),
      ready: () => (task.ready === undefined || task.ready()) && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(_templateObject304 || (_templateObject304 = absorb_taggedTemplateLiteral(["Grey Goose"])))) >= 6,
      combat: ((_task$combat3 = task.combat) !== null && _task$combat3 !== void 0 ? _task$combat3 : new combat_CombatStrategy()).ignore(),
      // killing targetting monsters is set in the engine
      limit: {
        soft: 25
      }
    });

    if (result.outfit === undefined) result.outfit = {
      equip: template_string_$items(_templateObject305 || (_templateObject305 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
    };
    return result;
  })), [{
    // Add a last task for routing
    name: "All",
    after: absorbTasks.map(task => task.do.toString()),
    ready: () => false,
    completed: () => true,
    do: () => {
      throw "Unable to reprocess all target monsters";
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
function coldRes(with_black_paint) {
  var with_back = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var res = 0;
  if (have(template_string_$item(_templateObject306 || (_templateObject306 = absorb_taggedTemplateLiteral(["ice crown"]))))) res += 3;
  if (with_back && have(template_string_$item(_templateObject307 || (_templateObject307 = absorb_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) res += 3;
  if (have(template_string_$item(_templateObject308 || (_templateObject308 = absorb_taggedTemplateLiteral(["ghost of a necklace"]))))) res += 1;
  if (have($skill(_templateObject309 || (_templateObject309 = absorb_taggedTemplateLiteral(["Nanofur"]))))) res += 3;
  if (have($skill(_templateObject310 || (_templateObject310 = absorb_taggedTemplateLiteral(["Microweave"]))))) res += 2;
  if (with_black_paint && (have($effect(_templateObject311 || (_templateObject311 = absorb_taggedTemplateLiteral(["Red Door Syndrome"])))) || (0,external_kolmafia_namespaceObject.myMeat)() >= 1000 && step("questL11Black") >= 2)) res += 2;
  return res;
}
function stenchRes(with_black_paint) {
  var res = 0;
  if (have(template_string_$item(_templateObject312 || (_templateObject312 = absorb_taggedTemplateLiteral(["ice crown"]))))) res += 3;
  if (have(template_string_$item(_templateObject313 || (_templateObject313 = absorb_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) res += 3;
  if (have(template_string_$item(_templateObject314 || (_templateObject314 = absorb_taggedTemplateLiteral(["ghost of a necklace"]))))) res += 1;
  if (have($skill(_templateObject315 || (_templateObject315 = absorb_taggedTemplateLiteral(["Conifer Polymers"]))))) res += 3;
  if (have($skill(_templateObject316 || (_templateObject316 = absorb_taggedTemplateLiteral(["Clammy Microcilia"]))))) res += 2;
  if (with_black_paint && (have($effect(_templateObject317 || (_templateObject317 = absorb_taggedTemplateLiteral(["Red Door Syndrome"])))) || (0,external_kolmafia_namespaceObject.myMeat)() >= 1000 && step("questL11Black") >= 2)) res += 2;
  return res;
}
;// CONCATENATED MODULE: ./src/engine/state.ts
function state_slicedToArray(arr, i) { return state_arrayWithHoles(arr) || state_iterableToArrayLimit(arr, i) || state_unsupportedIterableToArray(arr, i) || state_nonIterableRest(); }

function state_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function state_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return state_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return state_arrayLikeToArray(o, minLen); }

function state_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function state_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function state_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function state_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function state_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function state_createClass(Constructor, protoProps, staticProps) { if (protoProps) state_defineProperties(Constructor.prototype, protoProps); if (staticProps) state_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function state_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var GameState = /*#__PURE__*/function () {
  function GameState() {
    state_classCallCheck(this, GameState);

    state_defineProperty(this, "_banishes", void 0);

    state_defineProperty(this, "_absorb", void 0);

    state_defineProperty(this, "_orb", void 0);
  }

  state_createClass(GameState, [{
    key: "banishes",
    value: function banishes() {
      if (this._banishes === undefined) {
        this._banishes = new BanishState();
      }

      return this._banishes;
    }
  }, {
    key: "absorb",
    value: function absorb() {
      if (this._absorb === undefined) {
        this._absorb = new AbsorbState();
      }

      return this._absorb;
    }
  }, {
    key: "orb",
    value: function orb() {
      if (this._orb === undefined) {
        this._orb = new OrbState();
      }

      return this._orb;
    }
  }, {
    key: "invalidate",
    value: function invalidate() {
      this._banishes = undefined;
      this._absorb = undefined;
      this._orb = undefined;
    }
  }]);

  return GameState;
}();

var OrbState = /*#__PURE__*/function () {
  function OrbState() {
    state_classCallCheck(this, OrbState);

    state_defineProperty(this, "predictions", void 0);

    (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?ponder=1", false);
    this.predictions = new Map(property_get("crystalBallPredictions").split("|").map(element => element.split(":")).map(_ref => {
      var _ref2 = state_slicedToArray(_ref, 3),
          location = _ref2[1],
          monster = _ref2[2];

      return [(0,external_kolmafia_namespaceObject.toLocation)(location), (0,external_kolmafia_namespaceObject.toMonster)(monster)];
    }));
  }

  state_createClass(OrbState, [{
    key: "prediction",
    value: function prediction(loc) {
      return this.predictions.get(loc);
    }
  }]);

  return OrbState;
}();

var globalStateCache = new GameState();
;// CONCATENATED MODULE: ./src/tasks/misc.ts
var misc_templateObject, misc_templateObject2, misc_templateObject3, misc_templateObject4, misc_templateObject5, misc_templateObject6, misc_templateObject7, misc_templateObject8, misc_templateObject9, misc_templateObject10, misc_templateObject11, misc_templateObject12, misc_templateObject13, misc_templateObject14, misc_templateObject15, misc_templateObject16, misc_templateObject17, misc_templateObject18, misc_templateObject19, misc_templateObject20, misc_templateObject21, misc_templateObject22, misc_templateObject23, misc_templateObject24, misc_templateObject25, misc_templateObject26, misc_templateObject27, misc_templateObject28, misc_templateObject29, misc_templateObject30, misc_templateObject31, misc_templateObject32, misc_templateObject33, misc_templateObject34, misc_templateObject35, misc_templateObject36, misc_templateObject37, misc_templateObject38, misc_templateObject39, misc_templateObject40, misc_templateObject41, misc_templateObject42, misc_templateObject43, misc_templateObject44, misc_templateObject45, misc_templateObject46, misc_templateObject47, misc_templateObject48, misc_templateObject49, misc_templateObject50, misc_templateObject51, misc_templateObject52, misc_templateObject53, misc_templateObject54, misc_templateObject55, misc_templateObject56, misc_templateObject57, misc_templateObject58, misc_templateObject59, misc_templateObject60, misc_templateObject61, misc_templateObject62, misc_templateObject63, misc_templateObject64, misc_templateObject65, misc_templateObject66, misc_templateObject67, misc_templateObject68, misc_templateObject69, misc_templateObject70, misc_templateObject71, misc_templateObject72, misc_templateObject73, misc_templateObject74, misc_templateObject75, misc_templateObject76, misc_templateObject77, misc_templateObject78, misc_templateObject79, misc_templateObject80, misc_templateObject81, misc_templateObject82, misc_templateObject83, misc_templateObject84, misc_templateObject85, misc_templateObject86, misc_templateObject87, misc_templateObject88, misc_templateObject89, misc_templateObject90, misc_templateObject91, misc_templateObject92, misc_templateObject93, misc_templateObject94, misc_templateObject95, misc_templateObject96, misc_templateObject97, misc_templateObject98, misc_templateObject99, misc_templateObject100, misc_templateObject101, misc_templateObject102, misc_templateObject103, misc_templateObject104, misc_templateObject105, misc_templateObject106, misc_templateObject107, misc_templateObject108, misc_templateObject109, misc_templateObject110, misc_templateObject111, misc_templateObject112, misc_templateObject113, misc_templateObject114, misc_templateObject115, misc_templateObject116, misc_templateObject117, misc_templateObject118, misc_templateObject119, misc_templateObject120, misc_templateObject121, misc_templateObject122, misc_templateObject123, misc_templateObject124, misc_templateObject125, misc_templateObject126, misc_templateObject127, misc_templateObject128, misc_templateObject129, misc_templateObject130, misc_templateObject131, misc_templateObject132, misc_templateObject133, misc_templateObject134, misc_templateObject135, misc_templateObject136, misc_templateObject137, misc_templateObject138, misc_templateObject139, misc_templateObject140, misc_templateObject141, misc_templateObject142, misc_templateObject143, misc_templateObject144, misc_templateObject145, misc_templateObject146, misc_templateObject147, misc_templateObject148, misc_templateObject149, misc_templateObject150, misc_templateObject151, misc_templateObject152, misc_templateObject153, misc_templateObject154, misc_templateObject155, misc_templateObject156, misc_templateObject157, misc_templateObject158, misc_templateObject159, misc_templateObject160, misc_templateObject161, misc_templateObject162, misc_templateObject163, misc_templateObject164, misc_templateObject165, misc_templateObject166, misc_templateObject167, misc_templateObject168, misc_templateObject169, misc_templateObject170, misc_templateObject171, misc_templateObject172, misc_templateObject173, misc_templateObject174;

function misc_toConsumableArray(arr) { return misc_arrayWithoutHoles(arr) || misc_iterableToArray(arr) || misc_unsupportedIterableToArray(arr) || misc_nonIterableSpread(); }

function misc_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function misc_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function misc_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return misc_arrayLikeToArray(arr); }

function misc_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = misc_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function misc_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return misc_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return misc_arrayLikeToArray(o, minLen); }

function misc_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function misc_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }












var MiscQuest = {
  name: "Misc",
  tasks: [{
    name: "Unlock Beach",
    after: [],
    ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= ((0,external_kolmafia_namespaceObject.knollAvailable)() ? 538 : 5000),
    completed: () => have(template_string_$item(misc_templateObject || (misc_templateObject = misc_taggedTemplateLiteral(["bitchin' meatcar"])))) || have(template_string_$item(misc_templateObject2 || (misc_templateObject2 = misc_taggedTemplateLiteral(["Desert Bus pass"])))),
    do: () => {
      if ((0,external_kolmafia_namespaceObject.knollAvailable)()) (0,external_kolmafia_namespaceObject.cliExecute)("acquire 1 bitchin' meatcar");else (0,external_kolmafia_namespaceObject.cliExecute)("acquire 1 desert bus pass");
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Island Scrip",
    after: ["Unlock Beach"],
    ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 6000 || step("questL11Black") >= 4 && (0,external_kolmafia_namespaceObject.myMeat)() >= 500,
    completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(misc_templateObject3 || (misc_templateObject3 = misc_taggedTemplateLiteral(["Shore Inc. Ship Trip Scrip"])))) >= 3 || have(template_string_$item(misc_templateObject4 || (misc_templateObject4 = misc_taggedTemplateLiteral(["dinghy plans"])))) || have(template_string_$item(misc_templateObject5 || (misc_templateObject5 = misc_taggedTemplateLiteral(["dingy dinghy"])))) || have(template_string_$item(misc_templateObject6 || (misc_templateObject6 = misc_taggedTemplateLiteral(["junk junk"])))) || have(template_string_$item(misc_templateObject7 || (misc_templateObject7 = misc_taggedTemplateLiteral(["skeletal skiff"])))) || have(template_string_$item(misc_templateObject8 || (misc_templateObject8 = misc_taggedTemplateLiteral(["yellow submarine"])))),
    do: $location(misc_templateObject9 || (misc_templateObject9 = misc_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))),
    choices: {
      793: 1
    },
    limit: {
      tries: 5
    }
  }, {
    name: "Unlock Island",
    after: ["Island Scrip"],
    ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 400 || have(template_string_$item(misc_templateObject10 || (misc_templateObject10 = misc_taggedTemplateLiteral(["dingy planks"])))),
    completed: () => have(template_string_$item(misc_templateObject11 || (misc_templateObject11 = misc_taggedTemplateLiteral(["dingy dinghy"])))) || have(template_string_$item(misc_templateObject12 || (misc_templateObject12 = misc_taggedTemplateLiteral(["junk junk"])))) || have(template_string_$item(misc_templateObject13 || (misc_templateObject13 = misc_taggedTemplateLiteral(["skeletal skiff"])))) || have(template_string_$item(misc_templateObject14 || (misc_templateObject14 = misc_taggedTemplateLiteral(["yellow submarine"])))),
    do: () => {
      (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(misc_templateObject15 || (misc_templateObject15 = misc_taggedTemplateLiteral(["dingy planks"]))));
      (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(misc_templateObject16 || (misc_templateObject16 = misc_taggedTemplateLiteral(["dinghy plans"]))));
      (0,external_kolmafia_namespaceObject.use)(template_string_$item(misc_templateObject17 || (misc_templateObject17 = misc_taggedTemplateLiteral(["dinghy plans"]))));
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Floundry",
    after: [],
    ready: () => false,
    completed: () => have(template_string_$item(misc_templateObject18 || (misc_templateObject18 = misc_taggedTemplateLiteral(["fish hatchet"])))) || true,
    do: () => (0,external_kolmafia_namespaceObject.cliExecute)("acquire 1 fish hatchet"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Acquire Kgnee",
    after: [],
    priority: () => OverridePriority.Free,
    ready: () => have(template_string_$familiar(misc_templateObject19 || (misc_templateObject19 = misc_taggedTemplateLiteral(["Reagnimated Gnome"])))) && !have(template_string_$item(misc_templateObject20 || (misc_templateObject20 = misc_taggedTemplateLiteral(["gnomish housemaid's kgnee"])))) && !property_get("_loopcasual_checkedGnome", false),
    completed: () => !have(template_string_$familiar(misc_templateObject21 || (misc_templateObject21 = misc_taggedTemplateLiteral(["Reagnimated Gnome"])))) || have(template_string_$item(misc_templateObject22 || (misc_templateObject22 = misc_taggedTemplateLiteral(["gnomish housemaid's kgnee"])))) || property_get("_loopcasual_checkedGnome", false),
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("arena.php");
      (0,external_kolmafia_namespaceObject.runChoice)(4);
      _set("_loopcasual_checkedGnome", true);
    },
    outfit: {
      familiar: template_string_$familiar(misc_templateObject23 || (misc_templateObject23 = misc_taggedTemplateLiteral(["Reagnimated Gnome"])))
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Voting",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => have(template_string_$item(misc_templateObject24 || (misc_templateObject24 = misc_taggedTemplateLiteral(["\"I Voted!\" sticker"])))) || property_get("_voteToday") || !property_get("voteAlways"),
    do: () => {
      // Taken from garbo
      var voterValueTable = [{
        monster: $monster(misc_templateObject25 || (misc_templateObject25 = misc_taggedTemplateLiteral(["terrible mutant"]))),
        value: getSaleValue(template_string_$item(misc_templateObject26 || (misc_templateObject26 = misc_taggedTemplateLiteral(["glob of undifferentiated tissue"])))) + 10
      }, {
        monster: $monster(misc_templateObject27 || (misc_templateObject27 = misc_taggedTemplateLiteral(["angry ghost"]))),
        value: getSaleValue(template_string_$item(misc_templateObject28 || (misc_templateObject28 = misc_taggedTemplateLiteral(["ghostly ectoplasm"])))) * 1.11
      }, {
        monster: $monster(misc_templateObject29 || (misc_templateObject29 = misc_taggedTemplateLiteral(["government bureaucrat"]))),
        value: getSaleValue(template_string_$item(misc_templateObject30 || (misc_templateObject30 = misc_taggedTemplateLiteral(["absentee voter ballot"])))) * 0.05 + 75 * 0.25 + 50
      }, {
        monster: $monster(misc_templateObject31 || (misc_templateObject31 = misc_taggedTemplateLiteral(["annoyed snake"]))),
        value: 25 * 0.5 + 25
      }, {
        monster: $monster(misc_templateObject32 || (misc_templateObject32 = misc_taggedTemplateLiteral(["slime blob"]))),
        value: 20 * 0.4 + 50 * 0.2 + 250 * 0.01
      }];
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=town_right&action=townright_vote");
      var votingMonsterPriority = voterValueTable.sort((a, b) => b.value - a.value).map(element => element.monster.name);
      var initPriority = new Map([["Meat Drop: +30", 10], ["Item Drop: +15", 9], ["Familiar Experience: +2", 8], ["Adventures: +1", 7], ["Monster Level: +10", 5], ["".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " Percent: +25"), 3], ["Experience (".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), "): +4"), 2], ["Meat Drop: -30", -2], ["Item Drop: -15", -2], ["Familiar Experience: -2", -2]]);
      var monsterVote = votingMonsterPriority.indexOf(property_get("_voteMonster1")) < votingMonsterPriority.indexOf(property_get("_voteMonster2")) ? 1 : 2;
      var voteLocalPriorityArr = [[0, initPriority.get(property_get("_voteLocal1")) || (property_get("_voteLocal1").indexOf("-") === -1 ? 1 : -1)], [1, initPriority.get(property_get("_voteLocal2")) || (property_get("_voteLocal2").indexOf("-") === -1 ? 1 : -1)], [2, initPriority.get(property_get("_voteLocal3")) || (property_get("_voteLocal3").indexOf("-") === -1 ? 1 : -1)], [3, initPriority.get(property_get("_voteLocal4")) || (property_get("_voteLocal4").indexOf("-") === -1 ? 1 : -1)]];
      var bestVotes = voteLocalPriorityArr.sort((a, b) => b[1] - a[1]);
      var firstInit = bestVotes[0][0];
      var secondInit = bestVotes[1][0];
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?option=1&whichchoice=1331&g=".concat(monsterVote, "&local[]=").concat(firstInit, "&local[]=").concat(secondInit));
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Protonic Ghost",
    after: [],
    completed: () => false,
    priority: () => OverridePriority.Always,
    ready: () => {
      if (!have(template_string_$item(misc_templateObject33 || (misc_templateObject33 = misc_taggedTemplateLiteral(["protonic accelerator pack"]))))) return false;
      if (property_get("questPAGhost") === "unstarted") return false;

      switch (property_get("ghostLocation")) {
        case $location(misc_templateObject34 || (misc_templateObject34 = misc_taggedTemplateLiteral(["Cobb's Knob Treasury"]))):
          return step("questL05Goblin") >= 1;

        case $location(misc_templateObject35 || (misc_templateObject35 = misc_taggedTemplateLiteral(["The Haunted Conservatory"]))):
          return step("questM20Necklace") >= 0;

        case $location(misc_templateObject36 || (misc_templateObject36 = misc_taggedTemplateLiteral(["The Haunted Gallery"]))):
          return step("questM21Dance") >= 1;

        case $location(misc_templateObject37 || (misc_templateObject37 = misc_taggedTemplateLiteral(["The Haunted Kitchen"]))):
          return step("questM20Necklace") >= 0;

        case $location(misc_templateObject38 || (misc_templateObject38 = misc_taggedTemplateLiteral(["The Haunted Wine Cellar"]))):
          return step("questL11Manor") >= 1;

        case $location(misc_templateObject39 || (misc_templateObject39 = misc_taggedTemplateLiteral(["The Icy Peak"]))):
          return step("questL08Trapper") === 999;

        case $location(misc_templateObject40 || (misc_templateObject40 = misc_taggedTemplateLiteral(["Inside the Palindome"]))):
          return have(template_string_$item(misc_templateObject41 || (misc_templateObject41 = misc_taggedTemplateLiteral(["Talisman o' Namsilat"]))));

        case $location(misc_templateObject42 || (misc_templateObject42 = misc_taggedTemplateLiteral(["The Old Landfill"]))):
          return (0,external_kolmafia_namespaceObject.myBasestat)((0,external_kolmafia_namespaceObject.myPrimestat)()) >= 25 && step("questL02Larva") >= 0;

        case $location(misc_templateObject43 || (misc_templateObject43 = misc_taggedTemplateLiteral(["Madness Bakery"]))):
        case $location(misc_templateObject44 || (misc_templateObject44 = misc_taggedTemplateLiteral(["The Overgrown Lot"]))):
        case $location(misc_templateObject45 || (misc_templateObject45 = misc_taggedTemplateLiteral(["The Skeleton Store"]))):
          return true;
        // Can freely start quest

        case $location(misc_templateObject46 || (misc_templateObject46 = misc_taggedTemplateLiteral(["The Smut Orc Logging Camp"]))):
          return step("questL09Topping") >= 0;

        case $location(misc_templateObject47 || (misc_templateObject47 = misc_taggedTemplateLiteral(["The Spooky Forest"]))):
          return step("questL02Larva") >= 0;
      }

      return false;
    },
    prepare: () => {
      // Start quests if needed
      switch (property_get("ghostLocation")) {
        case $location(misc_templateObject48 || (misc_templateObject48 = misc_taggedTemplateLiteral(["Madness Bakery"]))):
          if (step("questM25Armorer") === -1) {
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=armory");
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=armory&action=talk");
            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=1065&option=1");
          }

          return;

        case $location(misc_templateObject49 || (misc_templateObject49 = misc_taggedTemplateLiteral(["The Old Landfill"]))):
          if (step("questM19Hippy") === -1) {
            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=woods&action=woods_smokesignals");
            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=798&option=1");
            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=798&option=2");
            (0,external_kolmafia_namespaceObject.visitUrl)("woods.php");
          }

          return;

        case $location(misc_templateObject50 || (misc_templateObject50 = misc_taggedTemplateLiteral(["The Overgrown Lot"]))):
          if (step("questM24Doc") === -1) {
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=doc");
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=doc&action=talk");
            (0,external_kolmafia_namespaceObject.runChoice)(1);
          }

          return;

        case $location(misc_templateObject51 || (misc_templateObject51 = misc_taggedTemplateLiteral(["The Skeleton Store"]))):
          if (step("questM23Meatsmith") === -1) {
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith");
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
            (0,external_kolmafia_namespaceObject.runChoice)(1);
          }

          return;

        case $location(misc_templateObject52 || (misc_templateObject52 = misc_taggedTemplateLiteral(["The Icy Peak"]))):
          if ((0,external_kolmafia_namespaceObject.numericModifier)("cold resistance") < 5) ensureEffect($effect(misc_templateObject53 || (misc_templateObject53 = misc_taggedTemplateLiteral(["Red Door Syndrome"]))));
          if ((0,external_kolmafia_namespaceObject.numericModifier)("cold resistance") < 5) throw "Unable to ensure cold res for The Icy Peak";
          return;

        default:
          return;
      }
    },
    do: () => {
      var _get;

      (0,external_kolmafia_namespaceObject.adv1)((_get = property_get("ghostLocation")) !== null && _get !== void 0 ? _get : $location(misc_templateObject54 || (misc_templateObject54 = misc_taggedTemplateLiteral(["none"]))), 0, "");

      if (engine_wanderingNCs.has(property_get("lastEncounter"))) {
        var _get2;

        (0,external_kolmafia_namespaceObject.adv1)((_get2 = property_get("ghostLocation")) !== null && _get2 !== void 0 ? _get2 : $location(misc_templateObject55 || (misc_templateObject55 = misc_taggedTemplateLiteral(["none"]))), 0, "");
      }
    },
    outfit: () => {
      if (property_get("ghostLocation") === $location(misc_templateObject56 || (misc_templateObject56 = misc_taggedTemplateLiteral(["Inside the Palindome"])))) return {
        equip: template_string_$items(misc_templateObject57 || (misc_templateObject57 = misc_taggedTemplateLiteral(["Talisman o' Namsilat, protonic accelerator pack"]))),
        modifier: "DA, DR"
      };

      if (property_get("ghostLocation") === $location(misc_templateObject58 || (misc_templateObject58 = misc_taggedTemplateLiteral(["The Icy Peak"])))) {
        if (coldRes(true, false) >= 5) return {
          equip: template_string_$items(misc_templateObject59 || (misc_templateObject59 = misc_taggedTemplateLiteral(["protonic accelerator pack"]))),
          modifier: "1000 cold res, DA, DR"
        };else return {
          modifier: "1000 cold res, DA, DR"
        }; // not enough cold res without back
      }

      return {
        equip: template_string_$items(misc_templateObject60 || (misc_templateObject60 = misc_taggedTemplateLiteral(["protonic accelerator pack"]))),
        modifier: "DA, DR"
      };
    },
    combat: new combat_CombatStrategy().macro(() => {
      if ((0,external_kolmafia_namespaceObject.myHp)() < (0,external_kolmafia_namespaceObject.myMaxhp)() || property_get("ghostLocation") === $location(misc_templateObject61 || (misc_templateObject61 = misc_taggedTemplateLiteral(["The Haunted Wine Cellar"]))) || property_get("ghostLocation") === $location(misc_templateObject62 || (misc_templateObject62 = misc_taggedTemplateLiteral(["The Overgrown Lot"]))) || (0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(misc_templateObject63 || (misc_templateObject63 = misc_taggedTemplateLiteral(["protonic accelerator pack"])))) === 0) return new Macro().attack().repeat();else return new Macro().skill($skill(misc_templateObject64 || (misc_templateObject64 = misc_taggedTemplateLiteral(["Shoot Ghost"])))).skill($skill(misc_templateObject65 || (misc_templateObject65 = misc_taggedTemplateLiteral(["Shoot Ghost"])))).skill($skill(misc_templateObject66 || (misc_templateObject66 = misc_taggedTemplateLiteral(["Shoot Ghost"])))).skill($skill(misc_templateObject67 || (misc_templateObject67 = misc_taggedTemplateLiteral(["Trap Ghost"]))));
    }),
    post: () => {
      if (property_get("questPAGhost") !== "unstarted") {
        throw "Failed to kill ghost from protonic accelerator pack";
      }
    },
    limit: {
      tries: 20
    }
  }, {
    name: "Acquire Birch Battery",
    after: [],
    priority: () => OverridePriority.Free,
    ready: () => have(template_string_$item(misc_templateObject68 || (misc_templateObject68 = misc_taggedTemplateLiteral(["SpinMaster\u2122 lathe"])))) && (!property_get("_spinmasterLatheVisited") || have(template_string_$item(misc_templateObject69 || (misc_templateObject69 = misc_taggedTemplateLiteral(["flimsy hardwood scraps"]))))),
    completed: () => have(template_string_$item(misc_templateObject70 || (misc_templateObject70 = misc_taggedTemplateLiteral(["birch battery"])))),
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=lathe");
      (0,external_kolmafia_namespaceObject.cliExecute)("acquire birch battery");
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Acquire Firework Hat",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => have(template_string_$item(misc_templateObject71 || (misc_templateObject71 = misc_taggedTemplateLiteral(["sombrero-mounted sparkler"])))) || property_get("_fireworksShopHatBought") || !have(template_string_$item(misc_templateObject72 || (misc_templateObject72 = misc_taggedTemplateLiteral(["Clan VIP Lounge key"])))),
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("clan_viplounge.php");
      (0,external_kolmafia_namespaceObject.visitUrl)("clan_viplounge.php?action=fwshop&whichfloor=2");
      (0,external_kolmafia_namespaceObject.cliExecute)("acquire sombrero-mounted sparkler");
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Goose Exp",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(misc_templateObject73 || (misc_templateObject73 = misc_taggedTemplateLiteral(["Grey Goose"])))) >= 9 || property_get("_loop_gyou_chef_goose") === "true" || !have(template_string_$familiar(misc_templateObject74 || (misc_templateObject74 = misc_taggedTemplateLiteral(["Shorter-Order Cook"])))),
    do: () => {
      _set("_loop_gyou_chef_goose", "true");
    },
    outfit: {
      familiar: template_string_$familiar(misc_templateObject75 || (misc_templateObject75 = misc_taggedTemplateLiteral(["Grey Goose"])))
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Hermit Clover",
    after: ["Palindome/Protesters Start"],
    ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 1000,
    completed: () => property_get("_loop_gyou_clovers") === "true",
    do: () => {
      (0,external_kolmafia_namespaceObject.hermit)(template_string_$item(misc_templateObject76 || (misc_templateObject76 = misc_taggedTemplateLiteral(["11-leaf clover"]))), 3);
      _set("_loop_gyou_clovers", "true");
    },
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Fortune",
    after: ["Hidden City/Open City"],
    completed: () => property_get("_clanFortuneBuffUsed") || !have(template_string_$item(misc_templateObject77 || (misc_templateObject77 = misc_taggedTemplateLiteral(["Clan VIP Lounge key"])))),
    priority: () => OverridePriority.Free,
    do: () => {
      (0,external_kolmafia_namespaceObject.cliExecute)("fortune buff susie");
    },
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Friar Buff",
    after: ["Friar/Finish", "Macguffin/Desert"],
    // After the desert to avoid wasting it on the camel
    completed: () => property_get("friarsBlessingReceived"),
    ready: () => (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(misc_templateObject78 || (misc_templateObject78 = misc_taggedTemplateLiteral(["Grey Goose"])))) < 6,
    priority: () => OverridePriority.Free,
    do: () => {
      (0,external_kolmafia_namespaceObject.cliExecute)("friars familiar");
    },
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Dog Chow",
    after: [],
    ready: () => have(template_string_$item(misc_templateObject79 || (misc_templateObject79 = misc_taggedTemplateLiteral(["Ghost Dog Chow"])))) && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(misc_templateObject80 || (misc_templateObject80 = misc_taggedTemplateLiteral(["Grey Goose"])))) < 6,
    completed: () => globalStateCache.absorb().remainingReprocess().length === 0,
    do: () => {
      (0,external_kolmafia_namespaceObject.use)(template_string_$item(misc_templateObject81 || (misc_templateObject81 = misc_taggedTemplateLiteral(["Ghost Dog Chow"]))));
      if ((0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(misc_templateObject82 || (misc_templateObject82 = misc_taggedTemplateLiteral(["Grey Goose"])))) < 6 && have(template_string_$item(misc_templateObject83 || (misc_templateObject83 = misc_taggedTemplateLiteral(["Ghost Dog Chow"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(misc_templateObject84 || (misc_templateObject84 = misc_taggedTemplateLiteral(["Ghost Dog Chow"]))));
    },
    outfit: {
      familiar: template_string_$familiar(misc_templateObject85 || (misc_templateObject85 = misc_taggedTemplateLiteral(["Grey Goose"])))
    },
    freeaction: true,
    limit: {
      soft: 20
    }
  }, {
    name: "Cake-Shaped Arena",
    after: [],
    ready: () => (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(misc_templateObject86 || (misc_templateObject86 = misc_taggedTemplateLiteral(["Grey Goose"])))) < 6 && (0,external_kolmafia_namespaceObject.myMeat)() >= 100,
    completed: () => globalStateCache.absorb().remainingReprocess().length === 0,
    do: arenaFight,
    outfit: {
      familiar: template_string_$familiar(misc_templateObject87 || (misc_templateObject87 = misc_taggedTemplateLiteral(["Grey Goose"]))),
      modifier: "50 familiar exp, familiar weight"
    },
    freeaction: true,
    limit: {
      soft: 75
    }
  }, {
    name: "Amulet Coin",
    after: [],
    completed: () => have(template_string_$item(misc_templateObject88 || (misc_templateObject88 = misc_taggedTemplateLiteral(["amulet coin"])))) || !have($skill(misc_templateObject89 || (misc_templateObject89 = misc_taggedTemplateLiteral(["Summon Clip Art"])))) || property_get("tomeSummons") >= 3 || !have(template_string_$familiar(misc_templateObject90 || (misc_templateObject90 = misc_taggedTemplateLiteral(["Cornbeefadon"])))),
    priority: () => OverridePriority.Free,
    do: () => {
      (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(misc_templateObject91 || (misc_templateObject91 = misc_taggedTemplateLiteral(["box of Familiar Jacks"]))));
      (0,external_kolmafia_namespaceObject.use)(template_string_$item(misc_templateObject92 || (misc_templateObject92 = misc_taggedTemplateLiteral(["box of Familiar Jacks"]))));
    },
    outfit: {
      familiar: template_string_$familiar(misc_templateObject93 || (misc_templateObject93 = misc_taggedTemplateLiteral(["Cornbeefadon"])))
    },
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Boombox",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => !have(template_string_$item(misc_templateObject94 || (misc_templateObject94 = misc_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])))) || property_get("boomBoxSong") === "Total Eclipse of Your Meat" || have($skill(misc_templateObject95 || (misc_templateObject95 = misc_taggedTemplateLiteral(["System Sweep"])))) && have($skill(misc_templateObject96 || (misc_templateObject96 = misc_taggedTemplateLiteral(["Double Nanovision"])))) || property_get("_boomBoxSongsLeft") === 0,
    do: () => (0,external_kolmafia_namespaceObject.cliExecute)("boombox meat"),
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Boombox Seasoning",
    after: [],
    priority: () => OverridePriority.Free,
    ready: () => have($skill(misc_templateObject97 || (misc_templateObject97 = misc_taggedTemplateLiteral(["System Sweep"])))) && have($skill(misc_templateObject98 || (misc_templateObject98 = misc_taggedTemplateLiteral(["Double Nanovision"])))) && (property_get("currentNunneryMeat") === 0 || property_get("currentNunneryMeat") === 100000),
    completed: () => !have(template_string_$item(misc_templateObject99 || (misc_templateObject99 = misc_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])))) || property_get("boomBoxSong") === "Food Vibrations" || property_get("_boomBoxSongsLeft") === 0,
    do: () => (0,external_kolmafia_namespaceObject.cliExecute)("boombox food"),
    freeaction: true,
    limit: {
      tries: 2
    }
  }, {
    name: "Gnome Shirt",
    after: [],
    ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 11000 && (0,external_kolmafia_namespaceObject.gnomadsAvailable)(),
    completed: () => have($skill(misc_templateObject100 || (misc_templateObject100 = misc_taggedTemplateLiteral(["Torso Awareness"])))),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("gnomes.php?action=trainskill&whichskill=12");
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Gnome Items",
    after: ["Gnome Shirt"],
    ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 11000 && (0,external_kolmafia_namespaceObject.gnomadsAvailable)(),
    completed: () => have($skill(misc_templateObject101 || (misc_templateObject101 = misc_taggedTemplateLiteral(["Powers of Observatiogn"])))),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("gnomes.php?action=trainskill&whichskill=10");
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Tune from Muscle",
    after: ["Unlock Beach", "Reprocess/The Bugbear Pen"],
    ready: () => (0,external_kolmafia_namespaceObject.knollAvailable)() && ((0,external_kolmafia_namespaceObject.mySign)() !== "Vole" || (0,external_kolmafia_namespaceObject.myMaxmp)() - (0,external_kolmafia_namespaceObject.numericModifier)("Maximum MP") >= 50 && (0,external_kolmafia_namespaceObject.myMaxhp)() - (0,external_kolmafia_namespaceObject.numericModifier)("Maximum HP") >= 60 && (0,external_kolmafia_namespaceObject.myMeat)() >= 11000),
    completed: () => !have(template_string_$item(misc_templateObject102 || (misc_templateObject102 = misc_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || args.tune === undefined || property_get("moonTuned", false),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => (0,external_kolmafia_namespaceObject.cliExecute)("spoon ".concat(args.tune)),
    limit: {
      tries: 1
    }
  }, {
    name: "Tune from Myst",
    after: ["Reprocess/Outskirts of Camp Logging Camp"],
    ready: () => (0,external_kolmafia_namespaceObject.canadiaAvailable)(),
    completed: () => !have(template_string_$item(misc_templateObject103 || (misc_templateObject103 = misc_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || args.tune === undefined || property_get("moonTuned", false),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => (0,external_kolmafia_namespaceObject.cliExecute)("spoon ".concat(args.tune)),
    limit: {
      tries: 1
    }
  }, {
    name: "Tune from Moxie",
    after: ["Reprocess/Thugnderdome", "Gnome Shirt", "Gnome Items"],
    ready: () => (0,external_kolmafia_namespaceObject.gnomadsAvailable)(),
    completed: () => !have(template_string_$item(misc_templateObject104 || (misc_templateObject104 = misc_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || args.tune === undefined || property_get("moonTuned", false),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => (0,external_kolmafia_namespaceObject.cliExecute)("spoon ".concat(args.tune)),
    limit: {
      tries: 1
    }
  }, {
    name: "Retune Moon",
    after: ["Tune from Muscle", "Tune from Myst", "Tune from Moxie"],
    ready: () => false,
    completed: () => !have(template_string_$item(misc_templateObject105 || (misc_templateObject105 = misc_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || args.tune === undefined || property_get("moonTuned", false),
    do: () => false,
    limit: {
      tries: 1
    }
  }, {
    name: "Mayday",
    after: ["Macguffin/Start"],
    priority: () => OverridePriority.Free,
    completed: () => !property_get("hasMaydayContract") || !have(template_string_$item(misc_templateObject106 || (misc_templateObject106 = misc_taggedTemplateLiteral(["MayDay\u2122 supply package"])))) && atLevel(11),
    ready: () => have(template_string_$item(misc_templateObject107 || (misc_templateObject107 = misc_taggedTemplateLiteral(["MayDay\u2122 supply package"])))) && (0,external_kolmafia_namespaceObject.myTurncount)() < 1000,
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(misc_templateObject108 || (misc_templateObject108 = misc_taggedTemplateLiteral(["MayDay\u2122 supply package"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Open Fantasy",
    after: [],
    ready: () => property_get("frAlways") || property_get("_frToday"),
    completed: () => have(template_string_$item(misc_templateObject109 || (misc_templateObject109 = misc_taggedTemplateLiteral(["FantasyRealm G. E. M."])))),
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=realm_fantasy&action=fr_initcenter");
      (0,external_kolmafia_namespaceObject.runChoice)(-1);
    },
    choices: {
      1280: 1
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Mumming Trunk",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => !have(template_string_$item(misc_templateObject110 || (misc_templateObject110 = misc_taggedTemplateLiteral(["mumming trunk"])))) || property_get("_mummeryUses").includes("2,"),
    do: () => (0,external_kolmafia_namespaceObject.cliExecute)("mummery mp"),
    outfit: {
      familiar: template_string_$familiar(misc_templateObject111 || (misc_templateObject111 = misc_taggedTemplateLiteral(["Grey Goose"])))
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
var WandQuest = {
  name: "Wand",
  tasks: [{
    name: "Plus Sign",
    after: [],
    ready: () => (0,external_kolmafia_namespaceObject.myBasestat)($stat(misc_templateObject112 || (misc_templateObject112 = misc_taggedTemplateLiteral(["muscle"])))) >= 45 && (0,external_kolmafia_namespaceObject.myBasestat)($stat(misc_templateObject113 || (misc_templateObject113 = misc_taggedTemplateLiteral(["mysticality"])))) >= 45 && (0,external_kolmafia_namespaceObject.myBasestat)($stat(misc_templateObject114 || (misc_templateObject114 = misc_taggedTemplateLiteral(["moxie"])))) >= 45,
    completed: () => have(template_string_$item(misc_templateObject115 || (misc_templateObject115 = misc_taggedTemplateLiteral(["plus sign"])))) || property_get("lastPlusSignUnlock") === (0,external_kolmafia_namespaceObject.myAscensions)(),
    do: $location(misc_templateObject116 || (misc_templateObject116 = misc_taggedTemplateLiteral(["The Enormous Greater-Than Sign"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      451: 3
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Get Teleportitis",
    after: ["Plus Sign"],
    ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 1000 && // Meat for goal teleportitis choice adventure
    (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(misc_templateObject117 || (misc_templateObject117 = misc_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && // Goose exp for potential absorbs during teleportits
    have(template_string_$item(misc_templateObject118 || (misc_templateObject118 = misc_taggedTemplateLiteral(["soft green echo eyedrop antidote"])))),
    // Antitdote to remove teleportitis afterwards
    priority: () => (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(misc_templateObject119 || (misc_templateObject119 = misc_taggedTemplateLiteral(["Grey Goose"])))) >= 6 ? OverridePriority.GoodGoose : OverridePriority.None,
    completed: () => have($effect(misc_templateObject120 || (misc_templateObject120 = misc_taggedTemplateLiteral(["Teleportitis"])))) || property_get("lastPlusSignUnlock") === (0,external_kolmafia_namespaceObject.myAscensions)(),
    do: $location(misc_templateObject121 || (misc_templateObject121 = misc_taggedTemplateLiteral(["The Enormous Greater-Than Sign"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      451: 5
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Mimic",
    after: ["Get Teleportitis"],
    ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 5000,
    completed: () => have(template_string_$item(misc_templateObject122 || (misc_templateObject122 = misc_taggedTemplateLiteral(["dead mimic"])))) || property_get("lastZapperWand") === (0,external_kolmafia_namespaceObject.myAscensions)() || have(template_string_$item(misc_templateObject123 || (misc_templateObject123 = misc_taggedTemplateLiteral(["aluminum wand"])))) || have(template_string_$item(misc_templateObject124 || (misc_templateObject124 = misc_taggedTemplateLiteral(["ebony wand"])))) || have(template_string_$item(misc_templateObject125 || (misc_templateObject125 = misc_taggedTemplateLiteral(["hexagonal wand"])))) || have(template_string_$item(misc_templateObject126 || (misc_templateObject126 = misc_taggedTemplateLiteral(["marble wand"])))) || have(template_string_$item(misc_templateObject127 || (misc_templateObject127 = misc_taggedTemplateLiteral(["pine wand"])))) || keyStrategy.useful(Keys.Zap) === false,
    prepare: () => {
      if (have(template_string_$item(misc_templateObject128 || (misc_templateObject128 = misc_taggedTemplateLiteral(["plus sign"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(misc_templateObject129 || (misc_templateObject129 = misc_taggedTemplateLiteral(["plus sign"]))));
    },
    do: $location(misc_templateObject130 || (misc_templateObject130 = misc_taggedTemplateLiteral(["The Dungeons of Doom"]))),
    outfit: {
      modifier: "-combat, init",
      familiar: template_string_$familiar(misc_templateObject131 || (misc_templateObject131 = misc_taggedTemplateLiteral(["Grey Goose"])))
    },
    combat: new combat_CombatStrategy().banish($monster(misc_templateObject132 || (misc_templateObject132 = misc_taggedTemplateLiteral(["Quantum Mechanic"])))).kill($monsters(misc_templateObject133 || (misc_templateObject133 = misc_taggedTemplateLiteral(["mimic, The Master Of Thieves"])))),
    // Avoid getting more teleportitis
    choices: {
      25: 2
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Wand",
    after: ["Mimic"],
    completed: () => property_get("lastZapperWand") === (0,external_kolmafia_namespaceObject.myAscensions)() || have(template_string_$item(misc_templateObject134 || (misc_templateObject134 = misc_taggedTemplateLiteral(["aluminum wand"])))) || have(template_string_$item(misc_templateObject135 || (misc_templateObject135 = misc_taggedTemplateLiteral(["ebony wand"])))) || have(template_string_$item(misc_templateObject136 || (misc_templateObject136 = misc_taggedTemplateLiteral(["hexagonal wand"])))) || have(template_string_$item(misc_templateObject137 || (misc_templateObject137 = misc_taggedTemplateLiteral(["marble wand"])))) || have(template_string_$item(misc_templateObject138 || (misc_templateObject138 = misc_taggedTemplateLiteral(["pine wand"])))) || keyStrategy.useful(Keys.Zap) === false,
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(misc_templateObject139 || (misc_templateObject139 = misc_taggedTemplateLiteral(["dead mimic"])))),
    freeaction: true,
    limit: {
      tries: 1
    }
  }]
};
function teleportitisTask(engine, tasks) {
  // Combine the choice selections from all tasks
  // Where multiple tasks make different choices at the same choice, prefer:
  //  * Earlier tasks to later tasks
  //  * Uncompleted tasks to completed tasks
  var choices = {
    3: 3
  }; // The goal choice

  var done_tasks = tasks.filter(task => task.completed());
  var left_tasks = tasks.filter(task => !task.completed());

  var _iterator = misc_createForOfIteratorHelper([].concat(misc_toConsumableArray(left_tasks), misc_toConsumableArray(done_tasks)).reverse()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var task = _step.value;

      for (var choice_id_str in task.choices) {
        var choice_id = parseInt(choice_id_str);
        choices[choice_id] = task.choices[choice_id];
      }
    } // Escape the hidden city alters

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  choices[781] = 6;
  choices[783] = 6;
  choices[785] = 6;
  choices[787] = 6;

  if (step("questL11Worship") >= 3) {
    // Escape the hidden heart of the hidden temple
    choices[580] = 3;
  } // Exit NEP intro choice


  choices[1322] = 6;
  return {
    name: "Teleportitis",
    after: ["Wand/Get Teleportitis"],
    ready: () => have($effect(misc_templateObject140 || (misc_templateObject140 = misc_taggedTemplateLiteral(["Teleportitis"])))),
    completed: () => property_get("lastPlusSignUnlock") === (0,external_kolmafia_namespaceObject.myAscensions)(),
    do: $location(misc_templateObject141 || (misc_templateObject141 = misc_taggedTemplateLiteral(["The Enormous Greater-Than Sign"]))),
    post: () => {
      // Some tracking is broken when we encounter it with teleportitis
      if (property_get("lastEncounter") === "Having a Ball in the Ballroom") _set("questM21Dance", "step4");
      if (property_get("lastEncounter") === "Too Much Humanity" && step("questL11Ron") < 1) _set("questL11Ron", "step1");
    },
    outfit: {
      equip: template_string_$items(misc_templateObject142 || (misc_templateObject142 = misc_taggedTemplateLiteral(["antique machete"])))
    },
    choices: choices,
    limit: {
      soft: 20
    }
  };
}
var removeTeleportitis = {
  name: "Clear Teleportitis",
  after: [],
  ready: () => have(template_string_$item(misc_templateObject143 || (misc_templateObject143 = misc_taggedTemplateLiteral(["soft green echo eyedrop antidote"])))),
  completed: () => !have($effect(misc_templateObject144 || (misc_templateObject144 = misc_taggedTemplateLiteral(["Teleportitis"])))),
  do: () => {
    uneffect($effect(misc_templateObject145 || (misc_templateObject145 = misc_taggedTemplateLiteral(["Teleportitis"]))));
  },
  limit: {
    soft: 2
  },
  freeaction: true
}; // Cake-shaped arena strengths for all of the possible house familiars (and the goose)

var houseFamiliars = new Map([[template_string_$familiar(misc_templateObject146 || (misc_templateObject146 = misc_taggedTemplateLiteral(["Angry Goat"]))), [3, 0, 2, 1]], [template_string_$familiar(misc_templateObject147 || (misc_templateObject147 = misc_taggedTemplateLiteral(["Baby Gravy Fairy"]))), [0, 3, 1, 2]], // mafia and wiki disagree
[template_string_$familiar(misc_templateObject148 || (misc_templateObject148 = misc_taggedTemplateLiteral(["Barrrnacle"]))), [0, 2, 1, 3]], [template_string_$familiar(misc_templateObject149 || (misc_templateObject149 = misc_taggedTemplateLiteral(["Blood-Faced Volleyball"]))), [0, 1, 3, 2]], [template_string_$familiar(misc_templateObject150 || (misc_templateObject150 = misc_taggedTemplateLiteral(["Clockwork Grapefruit"]))), [3, 2, 0, 1]], [template_string_$familiar(misc_templateObject151 || (misc_templateObject151 = misc_taggedTemplateLiteral(["Cocoabo"]))), [2, 3, 0, 1]], [template_string_$familiar(misc_templateObject152 || (misc_templateObject152 = misc_taggedTemplateLiteral(["Fuzzy Dice"]))), [2, 2, 2, 2]], [template_string_$familiar(misc_templateObject153 || (misc_templateObject153 = misc_taggedTemplateLiteral(["Ghuol Whelp"]))), [1, 2, 0, 3]], [template_string_$familiar(misc_templateObject154 || (misc_templateObject154 = misc_taggedTemplateLiteral(["Grue"]))), [2, 0, 1, 3]], [template_string_$familiar(misc_templateObject155 || (misc_templateObject155 = misc_taggedTemplateLiteral(["Hanukkimbo Dreidl"]))), [2, 1, 3, 1]], [template_string_$familiar(misc_templateObject156 || (misc_templateObject156 = misc_taggedTemplateLiteral(["Hovering Sombrero"]))), [0, 3, 2, 1]], [template_string_$familiar(misc_templateObject157 || (misc_templateObject157 = misc_taggedTemplateLiteral(["Howling Balloon Monkey"]))), [1, 3, 2, 0]], [template_string_$familiar(misc_templateObject158 || (misc_templateObject158 = misc_taggedTemplateLiteral(["Killer Bee"]))), [3, 1, 2, 0]], [template_string_$familiar(misc_templateObject159 || (misc_templateObject159 = misc_taggedTemplateLiteral(["Leprechaun"]))), [1, 3, 0, 2]], [template_string_$familiar(misc_templateObject160 || (misc_templateObject160 = misc_taggedTemplateLiteral(["Levitating Potato"]))), [0, 1, 2, 3]], [template_string_$familiar(misc_templateObject161 || (misc_templateObject161 = misc_taggedTemplateLiteral(["MagiMechTech MicroMechaMech"]))), [3, 0, 1, 2]], [template_string_$familiar(misc_templateObject162 || (misc_templateObject162 = misc_taggedTemplateLiteral(["Mosquito"]))), [2, 1, 3, 0]], [template_string_$familiar(misc_templateObject163 || (misc_templateObject163 = misc_taggedTemplateLiteral(["Sabre-Toothed Lime"]))), [3, 0, 2, 1]], [template_string_$familiar(misc_templateObject164 || (misc_templateObject164 = misc_taggedTemplateLiteral(["Spooky Pirate Skeleton"]))), [2, 3, 1, 0]], [template_string_$familiar(misc_templateObject165 || (misc_templateObject165 = misc_taggedTemplateLiteral(["Stab Bat"]))), [3, 2, 1, 0]], [template_string_$familiar(misc_templateObject166 || (misc_templateObject166 = misc_taggedTemplateLiteral(["Star Starfish"]))), [2, 1, 3, 0]], [template_string_$familiar(misc_templateObject167 || (misc_templateObject167 = misc_taggedTemplateLiteral(["Whirling Maple Leaf"]))), [3, 1, 2, 0]], // Along with our non-house familiar
[template_string_$familiar(misc_templateObject168 || (misc_templateObject168 = misc_taggedTemplateLiteral(["Grey Goose"]))), [1, 2, 3, 3]]]);

function arenaStrength(familiar, weight, event) {
  var strengths = houseFamiliars.get(familiar);

  if (strengths === undefined) {
    throw "Weights for familiar ".concat(familiar.hatchling, " not found.");
  }

  var strength = strengths[event - 1];

  switch (strength) {
    case 3:
      return weight + 3;

    case 2:
      return weight;

    case 1:
      return weight - 3;

    case 0:
      return 0;
  }

  return 0;
}

function arenaFight() {
  // Train for a single round in the arena, using our current equipment
  // Parse arena opponents
  var familiar_regex = new RegExp(/<[^>]+value=(\d+)><\/td><td[^>]*><img[^>]+><\/td><td class=small><b>[^<]+<\/b> the ([^<]+)<br>([\d]+) lb/g);
  var arena = (0,external_kolmafia_namespaceObject.visitUrl)("arena.php");
  var match;
  var options = [];

  do {
    match = familiar_regex.exec(arena);

    if (match) {
      var opponent = parseInt(match[1]);
      var familiar = external_kolmafia_namespaceObject.Familiar.get(match[2]);
      var weight = parseInt(match[3]);

      if (Number.isNaN(opponent) || Number.isNaN(weight) || weight === 0 || familiar === template_string_$familiar(misc_templateObject169 || (misc_templateObject169 = misc_taggedTemplateLiteral(["none"])))) {
        throw "Unable to parse arena familiar ".concat(match[1], " @ ").concat(match[2], " lbs");
      }

      for (var _i = 0, _arr = [1, 2, 3, 4]; _i < _arr.length; _i++) {
        var event = _arr[_i];
        options.push({
          opponent: opponent,
          familiar: familiar,
          event: event,
          delta: arenaStrength(template_string_$familiar(misc_templateObject170 || (misc_templateObject170 = misc_taggedTemplateLiteral(["Grey Goose"]))), (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(misc_templateObject171 || (misc_templateObject171 = misc_taggedTemplateLiteral(["Grey Goose"])))) + (0,external_kolmafia_namespaceObject.weightAdjustment)(), event) - arenaStrength(familiar, weight, event)
        });
      }
    }
  } while (match); // Find the best opponent.
  // i.e. the strongest opponent that we can beat with at least 4 weight


  var bestOption = options.sort((o, p) => o.delta - p.delta).find(o => o.delta >= 4);

  if (bestOption === undefined) {
    debug("Unable to find good arena opponent; defaulting to mafia", "red");
    (0,external_kolmafia_namespaceObject.cliExecute)("train turns 1");
  } else {
    debug("Fighting ".concat(bestOption.familiar, " with \u0394weight=").concat(bestOption.delta));
    var start_exp = template_string_$familiar(misc_templateObject172 || (misc_templateObject172 = misc_taggedTemplateLiteral(["Grey Goose"]))).experience;
    (0,external_kolmafia_namespaceObject.visitUrl)("arena.php?action=go&whichopp=".concat(bestOption.opponent, "&event=").concat(bestOption.event), true);
    if (start_exp === template_string_$familiar(misc_templateObject173 || (misc_templateObject173 = misc_taggedTemplateLiteral(["Grey Goose"]))).experience) throw "Lost training in cake-shaped arena";
    debug("Experience gained: ".concat(template_string_$familiar(misc_templateObject174 || (misc_templateObject174 = misc_taggedTemplateLiteral(["Grey Goose"]))).experience - start_exp));
  }
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2022/CombatLoversLocket.js
var CombatLoversLocket_templateObject;

function CombatLoversLocket_slicedToArray(arr, i) { return CombatLoversLocket_arrayWithHoles(arr) || CombatLoversLocket_iterableToArrayLimit(arr, i) || CombatLoversLocket_unsupportedIterableToArray(arr, i) || CombatLoversLocket_nonIterableRest(); }

function CombatLoversLocket_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CombatLoversLocket_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CombatLoversLocket_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CombatLoversLocket_arrayLikeToArray(o, minLen); }

function CombatLoversLocket_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CombatLoversLocket_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function CombatLoversLocket_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CombatLoversLocket_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





 // eslint-disable-next-line libram/verify-constants

var locket = template_string_$item(CombatLoversLocket_templateObject || (CombatLoversLocket_templateObject = CombatLoversLocket_taggedTemplateLiteral(["Combat Lover's Locket"])));
function CombatLoversLocket_have() {
  return have(locket);
}
/**
 * Filters the set of all unlocked locket monsters to only the ones available to be locketed right now.
 * @returns An array consisting of all Monsters you can fight with your locket right now.
 */

function availableLocketMonsters() {
  if (reminiscesLeft() === 0) return [];
  return Object.entries((0,external_kolmafia_namespaceObject.getLocketMonsters)()).filter(_ref => {
    var _ref2 = CombatLoversLocket_slicedToArray(_ref, 2),
        unused = _ref2[1];

    return unused;
  }).map(_ref3 => {
    var _ref4 = CombatLoversLocket_slicedToArray(_ref3, 1),
        name = _ref4[0];

    return (0,external_kolmafia_namespaceObject.toMonster)(name);
  });
}
/**
 * Parses getLocketMonsters and returns the collection of all Monsters as an Array.
 * @returns An array consisting of all Monsters you can hypothetically fight, regardless of whether they've been fought today.
 */

function unlockedLocketMonsters() {
  return Object.entries((0,external_kolmafia_namespaceObject.getLocketMonsters)()).map(_ref5 => {
    var _ref6 = CombatLoversLocket_slicedToArray(_ref5, 1),
        name = _ref6[0];

    return (0,external_kolmafia_namespaceObject.toMonster)(name);
  });
}

function parseLocketProperty() {
  return property_get("_locketMonstersFought").split(",").filter(id => id.trim().length > 0);
}
/**
 * Determines how many reminisces remain by parsing the _locketMonstersFought property.
 * @returns The number of reminisces a player has available; 0 if they lack the Locket.
 */


function reminiscesLeft() {
  return CombatLoversLocket_have() ? clamp(3 - parseLocketProperty().length, 0, 3) : 0;
}
/**
 * Determines which monsters were reminisced today by parsing the _locketMonstersFought property.
 * @returns An array consisting of the Monsters reminisced today.
 */

function monstersReminisced() {
  return parseLocketProperty().map(id => (0,external_kolmafia_namespaceObject.toMonster)(id));
}
/**
 * Fight a Monster using the Combat Lover's Locket
 * @param monster The Monster to fight
 * @returns false if we are unable to reminisce about this monster. Else, returns whether, at the end of all things, we have reminisced about this monster.
 */

function reminisce(monster) {
  if (!CombatLoversLocket_have() || reminiscesLeft() === 0 || !(0,external_kolmafia_namespaceObject.getLocketMonsters)()[monster.name]) {
    return false;
  }

  (0,external_kolmafia_namespaceObject.cliExecute)("reminisce ".concat(monster));
  (0,external_kolmafia_namespaceObject.runCombat)();
  return monstersReminisced().includes(monster);
}
/**
 * This function efficiently evaluates all of an adventurer's possibly reminiscable monsters, placing them through a filtering criteria and evaluating them based on a passed function.
 * @param criteria A filtering function for delineating which monsters are "fair game" for the search, such as "is this monster free".
 * @param value A function for deciding which monsters are "better" than others.
 * @returns A singular monster that fulfills the criteria function and maximizes the value function.
 */

function findMonster(criteria) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => 1;
  if (!CombatLoversLocket_have() || reminiscesLeft() === 0) return null;
  var options = availableLocketMonsters().filter(criteria);
  if (!options.length) return null;
  return options.reduce((a, b) => value(a) > value(b) ? a : b);
}
;// CONCATENATED MODULE: ./src/tasks/summons.ts
var summons_templateObject, summons_templateObject2, summons_templateObject3, summons_templateObject4, summons_templateObject5, summons_templateObject6, summons_templateObject7, summons_templateObject8, summons_templateObject9, summons_templateObject10, summons_templateObject11, summons_templateObject12, summons_templateObject13, summons_templateObject14, summons_templateObject15, summons_templateObject16, summons_templateObject17, summons_templateObject18, summons_templateObject19, summons_templateObject20, summons_templateObject21, summons_templateObject22, summons_templateObject23, summons_templateObject24, summons_templateObject25, summons_templateObject26, summons_templateObject27, summons_templateObject28, summons_templateObject29, summons_templateObject30, summons_templateObject31, summons_templateObject32, summons_templateObject33, summons_templateObject34, summons_templateObject35, summons_templateObject36, summons_templateObject37, summons_templateObject38, summons_templateObject39, summons_templateObject40, summons_templateObject41, summons_templateObject42, summons_templateObject43, summons_templateObject44, summons_templateObject45, summons_templateObject46, summons_templateObject47, summons_templateObject48, summons_templateObject49, summons_templateObject50, summons_templateObject51, summons_templateObject52, summons_templateObject53, summons_templateObject54, summons_templateObject55, summons_templateObject56, summons_templateObject57, summons_templateObject58;

function summons_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function summons_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? summons_ownKeys(Object(source), !0).forEach(function (key) { summons_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : summons_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function summons_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = summons_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function summons_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function summons_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function summons_createClass(Constructor, protoProps, staticProps) { if (protoProps) summons_defineProperties(Constructor.prototype, protoProps); if (staticProps) summons_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function summons_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function summons_toConsumableArray(arr) { return summons_arrayWithoutHoles(arr) || summons_iterableToArray(arr) || summons_unsupportedIterableToArray(arr) || summons_nonIterableSpread(); }

function summons_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function summons_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return summons_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return summons_arrayLikeToArray(o, minLen); }

function summons_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function summons_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return summons_arrayLikeToArray(arr); }

function summons_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function summons_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










var extraReprocessTargets = [{
  after: ["Absorb/The Hole in the Sky"],
  target: $monster(summons_templateObject || (summons_templateObject = summons_taggedTemplateLiteral(["One-Eyed Willie"]))),
  needed: () => (0,external_kolmafia_namespaceObject.myAscensions)() % 2 === 1
}, {
  after: ["Absorb/The Hole in the Sky"],
  target: $monster(summons_templateObject2 || (summons_templateObject2 = summons_taggedTemplateLiteral(["Little Man in the Canoe"]))),
  needed: () => (0,external_kolmafia_namespaceObject.myAscensions)() % 2 === 0
}, {
  after: ["Misc/Retune Moon"],
  target: $monster(summons_templateObject3 || (summons_templateObject3 = summons_taggedTemplateLiteral(["revolving bugbear"]))),
  needed: () => !(0,external_kolmafia_namespaceObject.knollAvailable)()
}, {
  after: ["Misc/Retune Moon"],
  target: $monster(summons_templateObject4 || (summons_templateObject4 = summons_taggedTemplateLiteral(["cloud of disembodied whiskers"]))),
  needed: () => !(0,external_kolmafia_namespaceObject.canadiaAvailable)()
}, {
  after: ["Misc/Retune Moon"],
  target: $monster(summons_templateObject5 || (summons_templateObject5 = summons_taggedTemplateLiteral(["vicious gnauga"]))),
  needed: () => !(0,external_kolmafia_namespaceObject.gnomadsAvailable)()
}];
var summonTargets = [{
  target: $monster(summons_templateObject6 || (summons_templateObject6 = summons_taggedTemplateLiteral(["pygmy witch lawyer"]))),
  priority: () => OverridePriority.Start,
  after: [],
  completed: () => have($skill(summons_templateObject7 || (summons_templateObject7 = summons_taggedTemplateLiteral(["Infinite Loop"])))),
  acquire: [{
    item: template_string_$item(summons_templateObject8 || (summons_templateObject8 = summons_taggedTemplateLiteral(["Arr, M80"]))),
    num: 2,
    useful: () => have(template_string_$familiar(summons_templateObject9 || (summons_templateObject9 = summons_taggedTemplateLiteral(["Vampire Vintner"])))) && have(template_string_$item(summons_templateObject10 || (summons_templateObject10 = summons_taggedTemplateLiteral(["cosmic bowling ball"])))) && have(template_string_$item(summons_templateObject11 || (summons_templateObject11 = summons_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))
  }, {
    // Backup plan if missing Vintner/bowling ball
    item: template_string_$item(summons_templateObject12 || (summons_templateObject12 = summons_taggedTemplateLiteral(["yellow rocket"]))),
    num: 1,
    useful: () => !have(template_string_$familiar(summons_templateObject13 || (summons_templateObject13 = summons_taggedTemplateLiteral(["Vampire Vintner"])))) || !have(template_string_$item(summons_templateObject14 || (summons_templateObject14 = summons_taggedTemplateLiteral(["cosmic bowling ball"])))) || !have(template_string_$item(summons_templateObject15 || (summons_templateObject15 = summons_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))
  }],
  prepare: () => {
    if (((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(summons_templateObject16 || (summons_templateObject16 = summons_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) === 0 || (0,external_kolmafia_namespaceObject.myFamiliar)() !== template_string_$familiar(summons_templateObject17 || (summons_templateObject17 = summons_taggedTemplateLiteral(["Vampire Vintner"])))) && !have(template_string_$item(summons_templateObject18 || (summons_templateObject18 = summons_taggedTemplateLiteral(["yellow rocket"]))))) (0,external_kolmafia_namespaceObject.abort)("Not ready for pygmy locket");
    if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(summons_templateObject19 || (summons_templateObject19 = summons_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) > 0) (0,external_kolmafia_namespaceObject.cliExecute)("retrocape heck hold");
    if ((0,external_kolmafia_namespaceObject.initiativeModifier)() < 50) (0,external_kolmafia_namespaceObject.cliExecute)("pool stylish");
    if ((0,external_kolmafia_namespaceObject.initiativeModifier)() < 50) (0,external_kolmafia_namespaceObject.abort)("Not ready for pygmy locket");
  },
  combat: new combat_CombatStrategy().macro(new Macro().tryItem(template_string_$item(summons_templateObject20 || (summons_templateObject20 = summons_taggedTemplateLiteral(["yellow rocket"])))).tryItem(template_string_$item(summons_templateObject21 || (summons_templateObject21 = summons_taggedTemplateLiteral(["cosmic bowling ball"])))).step("if hascombatitem 10769;use Arr;endif;") // Arr, M80; "use Arr, M80" trys and fails to funksling
  .step("if hascombatitem 10769;use Arr;endif;").skill($skill(summons_templateObject22 || (summons_templateObject22 = summons_taggedTemplateLiteral(["Pseudopod Slap"])))).repeat()),
  outfit: () => {
    if (have(template_string_$familiar(summons_templateObject23 || (summons_templateObject23 = summons_taggedTemplateLiteral(["Vampire Vintner"])))) && have(template_string_$item(summons_templateObject24 || (summons_templateObject24 = summons_taggedTemplateLiteral(["cosmic bowling ball"])))) && have(template_string_$item(summons_templateObject25 || (summons_templateObject25 = summons_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) return {
      modifier: "init",
      equip: template_string_$items(summons_templateObject26 || (summons_templateObject26 = summons_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))),
      familiar: template_string_$familiar(summons_templateObject27 || (summons_templateObject27 = summons_taggedTemplateLiteral(["Vampire Vintner"])))
    };else return {
      modifier: "init, -1ML"
    }; // Just use yellow rocket
  }
}, yellowray({
  target: $monster(summons_templateObject28 || (summons_templateObject28 = summons_taggedTemplateLiteral(["mountain man"]))),
  after: [],
  completed: () => {
    if (step("questL08Trapper") >= 2) return true;
    if (!have(template_string_$item(summons_templateObject29 || (summons_templateObject29 = summons_taggedTemplateLiteral(["Clan VIP Lounge key"]))))) return true; // For now, do not do without yellow rocket

    var ore_needed = 3;
    if (have(template_string_$item(summons_templateObject30 || (summons_templateObject30 = summons_taggedTemplateLiteral(["Deck of Every Card"])))) && property_get("_deckCardsDrawn") === 0) ore_needed--;
    var pulled = new Set(property_get("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => external_kolmafia_namespaceObject.Item.get(id)));
    if (!pulled.has(template_string_$item(summons_templateObject31 || (summons_templateObject31 = summons_taggedTemplateLiteral(["asbestos ore"])))) && !pulled.has(template_string_$item(summons_templateObject32 || (summons_templateObject32 = summons_taggedTemplateLiteral(["chrome ore"])))) && !pulled.has(template_string_$item(summons_templateObject33 || (summons_templateObject33 = summons_taggedTemplateLiteral(["linoleum ore"]))))) ore_needed--;
    return (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(summons_templateObject34 || (summons_templateObject34 = summons_taggedTemplateLiteral(["asbestos ore"])))) >= ore_needed || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(summons_templateObject35 || (summons_templateObject35 = summons_taggedTemplateLiteral(["chrome ore"])))) >= ore_needed || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(summons_templateObject36 || (summons_templateObject36 = summons_taggedTemplateLiteral(["linoleum ore"])))) >= ore_needed;
  },
  prepare: () => {
    if (have(template_string_$item(summons_templateObject37 || (summons_templateObject37 = summons_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) (0,external_kolmafia_namespaceObject.cliExecute)("retrocape heck hold");
  },
  outfit: {
    equip: template_string_$items(summons_templateObject38 || (summons_templateObject38 = summons_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))
  },
  combat: new combat_CombatStrategy()
}, {
  modifier: "item"
})].concat(summons_toConsumableArray(extraReprocessTargets.map(target => {
  return {
    target: target.target,
    after: target.after,
    completed: () => !globalStateCache.absorb().isReprocessTarget(target.target) || !target.needed(),
    priority: () => OverridePriority.GoodGoose,
    ready: () => (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(summons_templateObject39 || (summons_templateObject39 = summons_taggedTemplateLiteral(["Grey Goose"])))) >= 6,
    outfit: () => {
      if (CombatLoversLocket_have() && !unlockedLocketMonsters().includes(target.target)) {
        // Store this monster in the locket for the next run
        return {
          familiar: template_string_$familiar(summons_templateObject40 || (summons_templateObject40 = summons_taggedTemplateLiteral(["Grey Goose"]))),
          equip: template_string_$items(summons_templateObject41 || (summons_templateObject41 = summons_taggedTemplateLiteral(["combat lover's locket"])))
        };
      } else {
        return {
          familiar: template_string_$familiar(summons_templateObject42 || (summons_templateObject42 = summons_taggedTemplateLiteral(["Grey Goose"])))
        };
      }
    },
    combat: new combat_CombatStrategy() // .autoattack(new Macro().trySkill($skill`Re-Process Matter`))
    .macro(new Macro().trySkill($skill(summons_templateObject43 || (summons_templateObject43 = summons_taggedTemplateLiteral(["Re-Process Matter"]))))).kill()
  };
})), [{
  target: $monster(summons_templateObject44 || (summons_templateObject44 = summons_taggedTemplateLiteral(["white lion"]))),
  after: ["Hidden City/Bowling Skills"],
  ready: () => have(template_string_$item(summons_templateObject45 || (summons_templateObject45 = summons_taggedTemplateLiteral(["white page"])))),
  completed: () => have($skill(summons_templateObject46 || (summons_templateObject46 = summons_taggedTemplateLiteral(["Piezoelectric Honk"])))) || (0,external_kolmafia_namespaceObject.inHardcore)(),
  choices: {
    940: 2
  },
  outfit: {
    modifier: "item",
    avoid: template_string_$items(summons_templateObject47 || (summons_templateObject47 = summons_taggedTemplateLiteral(["broken champagne bottle"])))
  },
  combat: new combat_CombatStrategy().killItem()
}]);
var summonSources = [{
  name: "Cargo Shorts",
  available: () => have(template_string_$item(summons_templateObject48 || (summons_templateObject48 = summons_taggedTemplateLiteral(["Cargo Cultist Shorts"])))) && !property_get("_cargoPocketEmptied") ? 1 : 0,
  canFight: mon => mon === $monster(summons_templateObject49 || (summons_templateObject49 = summons_taggedTemplateLiteral(["mountain man"]))),
  // Only use for mountain man
  summon: () => (0,external_kolmafia_namespaceObject.cliExecute)("cargo 565")
}, {
  name: "White Page",
  available: () => have(template_string_$item(summons_templateObject50 || (summons_templateObject50 = summons_taggedTemplateLiteral(["white page"])))) ? 1 : 0,
  canFight: mon => mon === $monster(summons_templateObject51 || (summons_templateObject51 = summons_taggedTemplateLiteral(["white lion"]))),
  // Only use for mountain man
  summon: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(summons_templateObject52 || (summons_templateObject52 = summons_taggedTemplateLiteral(["white page"]))))
}, {
  name: "Fax",
  available: () => args.fax && !property_get("_photocopyUsed") ? 1 : 0,
  canFight: mon => (0,external_kolmafia_namespaceObject.canFaxbot)(mon),
  summon: mon => {
    (0,external_kolmafia_namespaceObject.chatPrivate)("cheesefax", mon.name);

    for (var i = 0; i < 3; i++) {
      (0,external_kolmafia_namespaceObject.wait)(10);
      if (checkFax(mon)) break;
      if (i === 2) throw "Failed to acquire photocopied ".concat(mon.name, ".");
    }

    (0,external_kolmafia_namespaceObject.use)(template_string_$item(summons_templateObject53 || (summons_templateObject53 = summons_taggedTemplateLiteral(["photocopied monster"]))));
  }
}, {
  name: "Combat Locket",
  available: () => CombatLoversLocket_have() ? reminiscesLeft() : 0,
  canFight: mon => availableLocketMonsters().includes(mon),
  summon: mon => reminisce(mon)
}, {
  name: "Wish",
  available: () => have(template_string_$item(summons_templateObject54 || (summons_templateObject54 = summons_taggedTemplateLiteral(["genie bottle"])))) ? 3 - property_get("_genieWishesUsed") : 0,
  canFight: () => true,
  summon: mon => {
    (0,external_kolmafia_namespaceObject.cliExecute)("genie monster ".concat(mon.name));
    (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
  }
}]; // From garbo

function checkFax(mon) {
  if (!have(template_string_$item(summons_templateObject55 || (summons_templateObject55 = summons_taggedTemplateLiteral(["photocopied monster"]))))) (0,external_kolmafia_namespaceObject.cliExecute)("fax receive");
  if (property_get("photocopyMonster") === mon) return true;
  (0,external_kolmafia_namespaceObject.cliExecute)("fax send");
  return false;
}

var SummonStrategy = /*#__PURE__*/function () {
  function SummonStrategy(targets, sources) {
    summons_classCallCheck(this, SummonStrategy);

    summons_defineProperty(this, "targets", void 0);

    summons_defineProperty(this, "sources", void 0);

    summons_defineProperty(this, "plan", new Map());

    this.targets = targets;
    this.sources = sources;
  }

  summons_createClass(SummonStrategy, [{
    key: "update",
    value: function update() {
      this.plan.clear();
      var targets = this.targets.filter(t => !t.completed()).map(t => t.target);

      var _iterator = summons_createForOfIteratorHelper(this.sources),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var source = _step.value;
          var available = source.available();

          var _iterator2 = summons_createForOfIteratorHelper(targets),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var target = _step2.value;

              if (available > 0 && !this.plan.has(target) && source.canFight(target)) {
                this.plan.set(target, source);
                available -= 1;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (!have($skill(summons_templateObject56 || (summons_templateObject56 = summons_taggedTemplateLiteral(["Infinite Loop"])))) && !this.plan.has($monster(summons_templateObject57 || (summons_templateObject57 = summons_taggedTemplateLiteral(["pygmy witch lawyer"]))))) throw "Unable to summon pygmy witch lawyer";
    }
  }, {
    key: "getSourceFor",
    value: function getSourceFor(monster) {
      return this.plan.get(monster);
    }
  }]);

  return SummonStrategy;
}();

var summonStrategy = new SummonStrategy(summonTargets, summonSources);
var SummonQuest = {
  name: "Summon",
  tasks: summonTargets.map(task => {
    return summons_objectSpread(summons_objectSpread({}, task), {}, {
      name: task.target.name.replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
      // capitalize first letter of each word
      ready: () => {
        var _task$ready, _task$ready2;

        return ((_task$ready = (_task$ready2 = task.ready) === null || _task$ready2 === void 0 ? void 0 : _task$ready2.call(task)) !== null && _task$ready !== void 0 ? _task$ready : true) && summonStrategy.getSourceFor(task.target) !== undefined;
      },
      do: () => {
        // Some extra safety around the Pygmy Witch Lawyer summon
        if (task.target === $monster(summons_templateObject58 || (summons_templateObject58 = summons_taggedTemplateLiteral(["pygmy witch lawyer"])))) {
          if (property_get("_loopgyou_fought_pygmy", false)) {
            if (!(0,external_kolmafia_namespaceObject.userConfirm)("We already tried to fight a pygmy witch lawyer today and lost (or failed to start the fight). Are you sure we can win this time? Consider fighting a pygymy witch lawyer yourself (buy yellow rocket; ensure you have no ML running and +50 combat initative). Press yes to let the script try the fight again, or no to abort.")) {
              throw "Abort requested";
            }
          }

          _set("_loopgyou_fought_pygmy", true);
        } // Perform the actual summon


        var source = summonStrategy.getSourceFor(task.target);

        if (source) {
          debug("Summon source: ".concat(source.name));
          source.summon(task.target);
        } else throw "Unable to find summon source for ".concat(task.target.name);

        (0,external_kolmafia_namespaceObject.runCombat)();
      },
      limit: {
        tries: 1
      }
    });
  })
};
;// CONCATENATED MODULE: ./src/tasks/pulls.ts
var pulls_templateObject, pulls_templateObject2, pulls_templateObject3, pulls_templateObject4, pulls_templateObject5, pulls_templateObject6, pulls_templateObject7, pulls_templateObject8, pulls_templateObject9, pulls_templateObject10, pulls_templateObject11, pulls_templateObject12, pulls_templateObject13, pulls_templateObject14, pulls_templateObject15, pulls_templateObject16, pulls_templateObject17, pulls_templateObject18, pulls_templateObject19, pulls_templateObject20, pulls_templateObject21, pulls_templateObject22, pulls_templateObject23, pulls_templateObject24, pulls_templateObject25, pulls_templateObject26, pulls_templateObject27, pulls_templateObject28, pulls_templateObject29, pulls_templateObject30, pulls_templateObject31, pulls_templateObject32, pulls_templateObject33, pulls_templateObject34, pulls_templateObject35, pulls_templateObject36, pulls_templateObject37, pulls_templateObject38, pulls_templateObject39, pulls_templateObject40, pulls_templateObject41, pulls_templateObject42, pulls_templateObject43, pulls_templateObject44, pulls_templateObject45, pulls_templateObject46, pulls_templateObject47, pulls_templateObject48, pulls_templateObject49, pulls_templateObject50, pulls_templateObject51, pulls_templateObject52, pulls_templateObject53, pulls_templateObject54, pulls_templateObject55, pulls_templateObject56;

function pulls_toConsumableArray(arr) { return pulls_arrayWithoutHoles(arr) || pulls_iterableToArray(arr) || pulls_unsupportedIterableToArray(arr) || pulls_nonIterableSpread(); }

function pulls_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function pulls_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function pulls_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return pulls_arrayLikeToArray(arr); }

function pulls_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = pulls_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function pulls_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return pulls_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return pulls_arrayLikeToArray(o, minLen); }

function pulls_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function pulls_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pulls_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function pulls_createClass(Constructor, protoProps, staticProps) { if (protoProps) pulls_defineProperties(Constructor.prototype, protoProps); if (staticProps) pulls_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function pulls_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function pulls_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








/**
 * optional: If true, only pull this if there is one in storage (i.e., no mall buy).
 * useful: True if we need it, false if we don't, undefined if not sure yet.
 * duplicate: True if we should pull it even if we have it.
 * pull: The item to pull, or a list of options to pull.
 * name: If a list of options is given, what to use for the task (& sim) name.
 */

var pulls = [// Always pull the key items first
{
  pull: template_string_$item(pulls_templateObject || (pulls_templateObject = pulls_taggedTemplateLiteral(["daily dungeon malware"]))),
  useful: () => keyStrategy.useful(Keys.Malware) && !towerSkip()
}, {
  name: "Key Zappable",
  pull: () => keyStrategy.getZapChoice(),
  useful: () => keyStrategy.useful(Keys.Zap) && !towerSkip(),
  duplicate: true
}, {
  name: "Ore",
  pull: () => property_get("trapperOre") === "" ? undefined : external_kolmafia_namespaceObject.Item.get(property_get("trapperOre")),
  useful: () => {
    if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(pulls_templateObject2 || (pulls_templateObject2 = pulls_taggedTemplateLiteral(["asbestos ore"])))) >= 3 && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(pulls_templateObject3 || (pulls_templateObject3 = pulls_taggedTemplateLiteral(["linoleum ore"])))) >= 3 && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(pulls_templateObject4 || (pulls_templateObject4 = pulls_taggedTemplateLiteral(["chrome ore"])))) >= 3) return false;
    if (have(template_string_$item(pulls_templateObject5 || (pulls_templateObject5 = pulls_taggedTemplateLiteral(["Deck of Every Card"]))))) return false;
    if (property_get("trapperOre") === "") return undefined;
    return (0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get(property_get("trapperOre"))) < 3 && step("questL08Trapper") < 2;
  },
  duplicate: true
}, {
  pull: template_string_$item(pulls_templateObject6 || (pulls_templateObject6 = pulls_taggedTemplateLiteral(["1,970 carat gold"]))),
  useful: () => {
    if ((0,external_kolmafia_namespaceObject.myMeat)() < 200 && step("questM05Toot") > 0 && !have(template_string_$item(pulls_templateObject7 || (pulls_templateObject7 = pulls_taggedTemplateLiteral(["letter from King Ralph XI"]))))) return true;
    if ((0,external_kolmafia_namespaceObject.myMeat)() < 4000 && step("questL11Black") === 2 && !have(template_string_$item(pulls_templateObject8 || (pulls_templateObject8 = pulls_taggedTemplateLiteral(["forged identification documents"]))))) return true;
    if (have($skill(pulls_templateObject9 || (pulls_templateObject9 = pulls_taggedTemplateLiteral(["System Sweep"])))) && have($skill(pulls_templateObject10 || (pulls_templateObject10 = pulls_taggedTemplateLiteral(["Double Nanovision"]))))) return false; // early run is over

    return undefined;
  }
}, {
  pull: template_string_$item(pulls_templateObject11 || (pulls_templateObject11 = pulls_taggedTemplateLiteral(["1952 Mickey Mantle card"]))),
  useful: () => {
    if (have(template_string_$item(pulls_templateObject12 || (pulls_templateObject12 = pulls_taggedTemplateLiteral(["forged identification documents"])))) || step("questL11Black") >= 4) return false;
    if (step("questL11Black") >= 2 && (0,external_kolmafia_namespaceObject.myTurncount)() >= 200) return true;
    return undefined;
  }
}, {
  pull: template_string_$items(pulls_templateObject13 || (pulls_templateObject13 = pulls_taggedTemplateLiteral(["Greatest American Pants, navel ring of navel gazing"]))),
  optional: true,
  name: "Runaway IoTM"
}, {
  pull: template_string_$item(pulls_templateObject14 || (pulls_templateObject14 = pulls_taggedTemplateLiteral(["ring of conflict"]))),
  // Last chance for -5% combat frequency
  useful: () => !have(template_string_$item(pulls_templateObject15 || (pulls_templateObject15 = pulls_taggedTemplateLiteral(["unbreakable umbrella"])))) && !have(template_string_$item(pulls_templateObject16 || (pulls_templateObject16 = pulls_taggedTemplateLiteral(["Space Trip safety headphones"])))) && (0,external_kolmafia_namespaceObject.storageAmount)(template_string_$item(pulls_templateObject17 || (pulls_templateObject17 = pulls_taggedTemplateLiteral(["Space Trip safety headphones"])))) === 0 && !have(template_string_$item(pulls_templateObject18 || (pulls_templateObject18 = pulls_taggedTemplateLiteral(["protonic accelerator pack"]))))
}, {
  pull: template_string_$items(pulls_templateObject19 || (pulls_templateObject19 = pulls_taggedTemplateLiteral(["warbear long johns, square sponge pants"]))),
  useful: () => !have(template_string_$item(pulls_templateObject20 || (pulls_templateObject20 = pulls_taggedTemplateLiteral(["designer sweatpants"])))),
  optional: true,
  name: "MP Regen Pants"
}, {
  pull: template_string_$items(pulls_templateObject21 || (pulls_templateObject21 = pulls_taggedTemplateLiteral(["plastic vampire fangs, warbear goggles, burning newspaper"]))),
  useful: () => !have(template_string_$item(pulls_templateObject22 || (pulls_templateObject22 = pulls_taggedTemplateLiteral(["designer sweatpants"])))) && property_get("greyYouPoints") < 11 && !have(template_string_$item(pulls_templateObject23 || (pulls_templateObject23 = pulls_taggedTemplateLiteral(["burning paper slippers"])))),
  optional: true,
  post: () => {
    if (have(template_string_$item(pulls_templateObject24 || (pulls_templateObject24 = pulls_taggedTemplateLiteral(["burning newspaper"]))))) (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(pulls_templateObject25 || (pulls_templateObject25 = pulls_taggedTemplateLiteral(["burning paper slippers"]))));
  },
  name: "Max HP with low path progression"
}, {
  pull: template_string_$item(pulls_templateObject26 || (pulls_templateObject26 = pulls_taggedTemplateLiteral(["white page"]))),
  useful: () => !have($skill(pulls_templateObject27 || (pulls_templateObject27 = pulls_taggedTemplateLiteral(["Piezoelectric Honk"]))))
}, {
  pull: template_string_$item(pulls_templateObject28 || (pulls_templateObject28 = pulls_taggedTemplateLiteral(["portable cassette player"])))
}, {
  pull: template_string_$item(pulls_templateObject29 || (pulls_templateObject29 = pulls_taggedTemplateLiteral(["antique machete"])))
}, {
  pull: template_string_$item(pulls_templateObject30 || (pulls_templateObject30 = pulls_taggedTemplateLiteral(["book of matches"])))
}, {
  pull: template_string_$items(pulls_templateObject31 || (pulls_templateObject31 = pulls_taggedTemplateLiteral(["Space Trip safety headphones, HOA regulation book"]))),
  name: "-ML",
  optional: true
}, {
  pull: template_string_$item(pulls_templateObject32 || (pulls_templateObject32 = pulls_taggedTemplateLiteral(["yule hatchet"])))
}, {
  pull: template_string_$item(pulls_templateObject33 || (pulls_templateObject33 = pulls_taggedTemplateLiteral(["grey down vest"])))
}, {
  pull: template_string_$item(pulls_templateObject34 || (pulls_templateObject34 = pulls_taggedTemplateLiteral(["teacher's pen"]))),
  duplicate: true
}, {
  pull: template_string_$item(pulls_templateObject35 || (pulls_templateObject35 = pulls_taggedTemplateLiteral(["blackberry galoshes"]))),
  useful: () => step("questL11Black") < 2
}, {
  pull: template_string_$item(pulls_templateObject36 || (pulls_templateObject36 = pulls_taggedTemplateLiteral(["killing jar"]))),
  useful: () => !have(template_string_$familiar(pulls_templateObject37 || (pulls_templateObject37 = pulls_taggedTemplateLiteral(["Melodramedary"]))))
}, {
  pull: template_string_$item(pulls_templateObject38 || (pulls_templateObject38 = pulls_taggedTemplateLiteral(["old patched suit-pants"]))),
  optional: true
}, {
  pull: template_string_$item(pulls_templateObject39 || (pulls_templateObject39 = pulls_taggedTemplateLiteral(["transparent pants"]))),
  optional: true,
  useful: () => !have(template_string_$item(pulls_templateObject40 || (pulls_templateObject40 = pulls_taggedTemplateLiteral(["designer sweatpants"]))))
}, {
  pull: template_string_$item(pulls_templateObject41 || (pulls_templateObject41 = pulls_taggedTemplateLiteral(["deck of lewd playing cards"]))),
  optional: true
}, {
  pull: template_string_$item(pulls_templateObject42 || (pulls_templateObject42 = pulls_taggedTemplateLiteral(["mafia thumb ring"]))),
  optional: true
}, {
  pull: template_string_$item(pulls_templateObject43 || (pulls_templateObject43 = pulls_taggedTemplateLiteral(["giant yellow hat"])))
}, {
  pull: template_string_$item(pulls_templateObject44 || (pulls_templateObject44 = pulls_taggedTemplateLiteral(["gravy boat"])))
}, {
  pull: template_string_$item(pulls_templateObject45 || (pulls_templateObject45 = pulls_taggedTemplateLiteral(["Mohawk wig"]))),
  useful: () => have(template_string_$item(pulls_templateObject46 || (pulls_templateObject46 = pulls_taggedTemplateLiteral(["S.O.C.K."])))) ? !have(template_string_$item(pulls_templateObject47 || (pulls_templateObject47 = pulls_taggedTemplateLiteral(["Mohawk wig"])))) : undefined // if one didn't drop naturally

}, {
  pull: template_string_$item(pulls_templateObject48 || (pulls_templateObject48 = pulls_taggedTemplateLiteral(["11-leaf clover"]))),
  duplicate: true
}, {
  pull: template_string_$item(pulls_templateObject49 || (pulls_templateObject49 = pulls_taggedTemplateLiteral(["wet stew"]))),
  useful: () => step("questL11Palindome") < 5 && !have(template_string_$item(pulls_templateObject50 || (pulls_templateObject50 = pulls_taggedTemplateLiteral(["wet stunt nut stew"])))) && !have(template_string_$item(pulls_templateObject51 || (pulls_templateObject51 = pulls_taggedTemplateLiteral(["wet stew"])))) && (!have(template_string_$item(pulls_templateObject52 || (pulls_templateObject52 = pulls_taggedTemplateLiteral(["lion oil"])))) || !have(template_string_$item(pulls_templateObject53 || (pulls_templateObject53 = pulls_taggedTemplateLiteral(["bird rib"])))))
}, {
  pull: template_string_$item(pulls_templateObject54 || (pulls_templateObject54 = pulls_taggedTemplateLiteral(["ninja rope"]))),
  useful: () => step("questL08Trapper") < 3 && step("questL11Shen") > 3
}, {
  pull: template_string_$item(pulls_templateObject55 || (pulls_templateObject55 = pulls_taggedTemplateLiteral(["ninja carabiner"]))),
  useful: () => step("questL08Trapper") < 3 && step("questL11Shen") > 3
}, {
  pull: template_string_$item(pulls_templateObject56 || (pulls_templateObject56 = pulls_taggedTemplateLiteral(["ninja crampons"]))),
  useful: () => step("questL08Trapper") < 3 && step("questL11Shen") > 3
}];

var Pull = /*#__PURE__*/function () {
  function Pull(spec) {
    var _spec$duplicate, _spec$optional, _spec$useful, _spec$post;

    pulls_classCallCheck(this, Pull);

    pulls_defineProperty(this, "items", void 0);

    pulls_defineProperty(this, "name", void 0);

    pulls_defineProperty(this, "optional", void 0);

    pulls_defineProperty(this, "duplicate", void 0);

    pulls_defineProperty(this, "useful", void 0);

    pulls_defineProperty(this, "post", void 0);

    pulls_defineProperty(this, "description", void 0);

    if ("name" in spec) {
      this.name = spec.name;
      this.description = spec.name;
    } else {
      this.name = spec.pull.name;
    }

    var pull = spec.pull;
    this.items = pull instanceof external_kolmafia_namespaceObject.Item ? () => [pull] : typeof pull === "function" ? () => [pull()] : () => pull;
    this.duplicate = (_spec$duplicate = spec.duplicate) !== null && _spec$duplicate !== void 0 ? _spec$duplicate : false;
    this.optional = (_spec$optional = spec.optional) !== null && _spec$optional !== void 0 ? _spec$optional : false;
    this.useful = (_spec$useful = spec.useful) !== null && _spec$useful !== void 0 ? _spec$useful : () => true;
    this.post = (_spec$post = spec.post) !== null && _spec$post !== void 0 ? _spec$post : () => {
      null;
    };
  }

  pulls_createClass(Pull, [{
    key: "wasPulled",
    value: function wasPulled(pulled) {
      var _iterator = pulls_createForOfIteratorHelper(this.items()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          if (item === undefined) continue;
          if (!this.duplicate && have(item)) return true;
          if (pulled.has(item)) return true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
  }, {
    key: "shouldPull",
    value: function shouldPull() {
      var needed = this.useful();
      if (needed === false) return false;
      if (!this.optional) return needed; // For optional items, return false if we have none
      // and defer to needed if we have some.

      var _iterator2 = pulls_createForOfIteratorHelper(this.items()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          if (item === undefined) return undefined; // We don't even know which item yet

          if ((0,external_kolmafia_namespaceObject.storageAmount)(item) > 0) return needed;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return false;
    }
  }, {
    key: "pull",
    value: function pull() {
      var _iterator3 = pulls_createForOfIteratorHelper(this.items()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item = _step3.value;
          if (item === undefined) throw "Unable to pull ".concat(this.name, "; the desired item is undefined");

          if ((0,external_kolmafia_namespaceObject.storageAmount)(item) > 0 || (0,external_kolmafia_namespaceObject.buyUsingStorage)(1, item, 100000)) {
            (0,external_kolmafia_namespaceObject.cliExecute)("pull ".concat(item.name));
            return;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);

  return Pull;
}();

var PullState;

(function (PullState) {
  PullState[PullState["PULLED"] = 0] = "PULLED";
  PullState[PullState["READY"] = 1] = "READY";
  PullState[PullState["MAYBE"] = 2] = "MAYBE";
  PullState[PullState["UNNEEDED"] = 3] = "UNNEEDED";
})(PullState || (PullState = {}));

var PullStrategy = /*#__PURE__*/function () {
  function PullStrategy(pulls) {
    pulls_classCallCheck(this, PullStrategy);

    pulls_defineProperty(this, "pulls", void 0);

    pulls_defineProperty(this, "enabled", void 0);

    this.pulls = pulls.map(pull => new Pull(pull));
    this.enabled = pulls.map(() => PullState.MAYBE);
  }

  pulls_createClass(PullStrategy, [{
    key: "update",
    value: function update() {
      var pulled = new Set(property_get("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => external_kolmafia_namespaceObject.Item.get(id)));
      var count = (0,external_kolmafia_namespaceObject.pullsRemaining)() - (20 - args.pulls);
      if ((0,external_kolmafia_namespaceObject.inHardcore)() || (0,external_kolmafia_namespaceObject.myTurncount)() >= 1000) count = 0; // No pulls in hardcore or out of ronin

      for (var i = 0; i < this.pulls.length; i++) {
        if (this.pulls[i].wasPulled(pulled)) {
          this.enabled[i] = PullState.PULLED;
          continue;
        }

        switch (this.pulls[i].shouldPull()) {
          case false:
            this.enabled[i] = PullState.UNNEEDED;
            continue;

          case true:
            this.enabled[i] = count > 0 ? PullState.READY : PullState.MAYBE; // Only pull if there is room in the plan

            count--;
            continue;

          case undefined:
            this.enabled[i] = PullState.MAYBE;
            count--;
            continue;
        }
      }
    }
  }, {
    key: "pullsUsed",
    value: function pullsUsed() {
      return property_get("_roninStoragePulls").split(",").length;
    }
  }]);

  return PullStrategy;
}();

var pullStrategy = new PullStrategy(pulls);
var PullQuest = {
  name: "Pull",
  tasks: [].concat(pulls_toConsumableArray(pullStrategy.pulls.map((pull, index) => {
    return {
      name: pull.name,
      priority: () => OverridePriority.Free,
      after: [],
      ready: () => pullStrategy.enabled[index] === PullState.READY,
      completed: () => pullStrategy.enabled[index] === PullState.PULLED || pullStrategy.enabled[index] === PullState.UNNEEDED,
      do: () => pull.pull(),
      post: () => {
        pull.post();
        pullStrategy.update();
      },
      limit: {
        tries: 1
      },
      freeaction: true
    };
  })), [{
    // Add a last task that tracks if all pulls have been done, for routing
    name: "All",
    after: pullStrategy.pulls.map(pull => pull.name),
    completed: () => true,
    do: () => {
      throw "Should never run";
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
;// CONCATENATED MODULE: ./src/engine/engine.ts
var engine_engine_templateObject, engine_templateObject2, engine_templateObject3, engine_templateObject4, engine_templateObject5, engine_templateObject6, engine_templateObject7, engine_templateObject8, engine_templateObject9, engine_templateObject10, engine_templateObject11, engine_templateObject12, engine_templateObject13, engine_templateObject14, engine_templateObject15, engine_templateObject16, engine_templateObject17, engine_templateObject18, engine_templateObject19, engine_templateObject20, engine_templateObject21, engine_templateObject22, engine_templateObject23, engine_templateObject24, engine_templateObject25, engine_templateObject26, engine_templateObject27, engine_templateObject28, engine_templateObject29, engine_templateObject30, engine_templateObject31, engine_templateObject32, engine_templateObject33, engine_templateObject34, engine_templateObject35, engine_templateObject36, engine_templateObject37, engine_templateObject38, engine_templateObject39, engine_templateObject40, engine_templateObject41;

function engine_engine_toConsumableArray(arr) { return engine_engine_arrayWithoutHoles(arr) || engine_engine_iterableToArray(arr) || engine_engine_unsupportedIterableToArray(arr) || engine_engine_nonIterableSpread(); }

function engine_engine_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_engine_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_engine_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_engine_arrayLikeToArray(arr); }

function engine_engine_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_engine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = engine_engine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function engine_engine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_engine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_engine_arrayLikeToArray(o, minLen); }

function engine_engine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function engine_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function engine_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? engine_ownKeys(Object(source), !0).forEach(function (key) { engine_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : engine_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function engine_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function engine_engine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function engine_engine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_engine_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_engine_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_engine_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function engine_get() { if (typeof Reflect !== "undefined" && Reflect.get) { engine_get = Reflect.get.bind(); } else { engine_get = function _get(target, property, receiver) { var base = engine_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return engine_get.apply(this, arguments); }

function engine_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = engine_getPrototypeOf(object); if (object === null) break; } return object; }

function engine_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) engine_setPrototypeOf(subClass, superClass); }

function engine_setPrototypeOf(o, p) { engine_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return engine_setPrototypeOf(o, p); }

function engine_createSuper(Derived) { var hasNativeReflectConstruct = engine_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = engine_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = engine_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return engine_possibleConstructorReturn(this, result); }; }

function engine_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return engine_assertThisInitialized(self); }

function engine_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function engine_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function engine_getPrototypeOf(o) { engine_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return engine_getPrototypeOf(o); }


















var engine_wanderingNCs = new Set(["Wooof! Wooooooof!", "Playing Fetch*", "A Pound of Cure", "Aunts not Ants", "Bath Time", "Beware of Aligator", "Delicious Sprouts", "Hypnotic Master", "Lost and Found", "Poetic Justice", "Summer Days", "Teacher's Pet"]);
var engine_Engine = /*#__PURE__*/function (_BaseEngine) {
  engine_inherits(Engine, _BaseEngine);

  var _super = engine_createSuper(Engine);

  function Engine(tasks, ignoreTasks, completedTasks) {
    var _this;

    engine_engine_classCallCheck(this, Engine);

    var ignore_set = new Set(ignoreTasks.map(n => n.trim()));
    var completed_set = new Set(completedTasks.map(n => n.trim())); // Completed tasks are always completed, ignored tasks are never ready

    tasks = tasks.map(task => {
      if (completed_set.has(task.name)) return engine_objectSpread(engine_objectSpread({}, task), {}, {
        completed: () => true
      });
      if (ignore_set.has(task.name)) return engine_objectSpread(engine_objectSpread({}, task), {}, {
        ready: () => false
      });
      return task;
    });
    _this = _super.call(this, tasks, {
      combat_defaults: new MyActionDefaults()
    });

    var _iterator = engine_engine_createForOfIteratorHelper(ignore_set),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var task = _step.value;
        if (!_this.tasks_by_name.has(task)) debug("Warning: Unknown ignoretask ".concat(task));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var _iterator2 = engine_engine_createForOfIteratorHelper(completed_set),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _task = _step2.value;
        if (!_this.tasks_by_name.has(_task)) debug("Warning: Unknown completedtask ".concat(_task));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return _this;
  }

  engine_engine_createClass(Engine, [{
    key: "available",
    value: function available(task) {
      // Wait until we get Infinite Loop before doing most things
      if (task.do instanceof external_kolmafia_namespaceObject.Location && !have($skill(engine_engine_templateObject || (engine_engine_templateObject = engine_engine_taggedTemplateLiteral(["Infinite Loop"]))))) return false;
      return engine_get(engine_getPrototypeOf(Engine.prototype), "available", this).call(this, task);
    }
  }, {
    key: "hasDelay",
    value: function hasDelay(task) {
      if (!task.delay) return false;
      if (!(task.do instanceof external_kolmafia_namespaceObject.Location)) return false;
      return task.do.turnsSpent < task.delay;
    }
  }, {
    key: "getNextTask",
    value: function getNextTask() {
      var available_tasks = this.tasks.filter(task => this.available(task));
      this.updatePlan(); // eslint-disable-next-line eqeqeq

      if ((0,external_kolmafia_namespaceObject.myPath)() != "Grey You") return undefined; // Prism broken
      // Teleportitis overrides all

      if (have($effect(engine_templateObject2 || (engine_templateObject2 = engine_engine_taggedTemplateLiteral(["Teleportitis"]))))) {
        var teleportitis = teleportitisTask(this, this.tasks);

        if (teleportitis.completed() && removeTeleportitis.ready()) {
          return engine_objectSpread(engine_objectSpread({}, removeTeleportitis), {}, {
            active_priority: Prioritization.fixed(OverridePriority.Always)
          });
        }

        return engine_objectSpread(engine_objectSpread({}, teleportitis), {}, {
          active_priority: Prioritization.fixed(OverridePriority.Always)
        });
      } // First, check for any heavily prioritized tasks


      var priority = available_tasks.find(task => {
        var _task$priority;

        return ((_task$priority = task.priority) === null || _task$priority === void 0 ? void 0 : _task$priority.call(task)) === OverridePriority.LastCopyableMonster;
      });

      if (priority !== undefined) {
        return engine_objectSpread(engine_objectSpread({}, priority), {}, {
          active_priority: Prioritization.fixed(OverridePriority.LastCopyableMonster)
        });
      } // If a wanderer is up try to place it in a useful location


      var wanderer = wandererSources.find(source => source.available() && source.chance() === 1);
      var delay_burning = available_tasks.find(task => {
        var _wanderer$equip;

        return this.hasDelay(task) && this.createOutfit(task).canEquip((_wanderer$equip = wanderer === null || wanderer === void 0 ? void 0 : wanderer.equip) !== null && _wanderer$equip !== void 0 ? _wanderer$equip : []);
      });

      if (wanderer !== undefined && delay_burning !== undefined) {
        return engine_objectSpread(engine_objectSpread({}, delay_burning), {}, {
          active_priority: Prioritization.fixed(OverridePriority.Wanderer),
          wanderer: wanderer
        });
      } // Next, choose tasks by priorty, then by route.


      var task_priorities = available_tasks.map(task => {
        return engine_objectSpread(engine_objectSpread({}, task), {}, {
          active_priority: Prioritization.from(task)
        });
      });
      var highest_priority = Math.max.apply(Math, engine_engine_toConsumableArray(task_priorities.map(tp => tp.active_priority.score())));
      var todo = task_priorities.find(tp => tp.active_priority.score() === highest_priority);

      if (todo !== undefined) {
        return todo;
      } // No next task


      return undefined;
    }
  }, {
    key: "execute",
    value: function execute(task) {
      var _task$active_priority, _task$active_priority2, _task$ready, _task$ready2;

      debug("");
      var reason = (_task$active_priority = (_task$active_priority2 = task.active_priority) === null || _task$active_priority2 === void 0 ? void 0 : _task$active_priority2.explain()) !== null && _task$active_priority !== void 0 ? _task$active_priority : "";
      var why = reason === "" ? "Route" : reason;
      debug("Executing ".concat(task.name, " [").concat(why, "]"), "blue");
      this.checkLimits(task);

      engine_get(engine_getPrototypeOf(Engine.prototype), "execute", this).call(this, task);

      if (task.completed()) {
        debug("".concat(task.name, " completed!"), "blue");
      } else if (!((_task$ready = (_task$ready2 = task.ready) === null || _task$ready2 === void 0 ? void 0 : _task$ready2.call(task)) !== null && _task$ready !== void 0 ? _task$ready : true)) {
        debug("".concat(task.name, " not completed! [Again? Not ready]"), "blue");
      } else {
        var priority_explain = Prioritization.from(task).explain();

        if (priority_explain !== "") {
          debug("".concat(task.name, " not completed! [Again? ").concat(priority_explain, "]"), "blue");
        } else {
          debug("".concat(task.name, " not completed!"), "blue");
        }

        this.checkLimits(task); // Error if too many tries occur
      }
    }
  }, {
    key: "customize",
    value: function customize(task, outfit, combat, resources) {
      equipInitial(outfit);
      var wanderers = task.wanderer ? [task.wanderer] : [];

      for (var _i = 0, _wanderers = wanderers; _i < _wanderers.length; _i++) {
        var _wanderer$equip2;

        var wanderer = _wanderers[_i];
        if (!outfit.equip((_wanderer$equip2 = wanderer === null || wanderer === void 0 ? void 0 : wanderer.equip) !== null && _wanderer$equip2 !== void 0 ? _wanderer$equip2 : [])) throw "Wanderer equipment ".concat(wanderer.equip, " conflicts with ").concat(task.name);
      }

      if (task.freeaction) {
        // Prepare only as requested by the task
        return;
      } // Prepare combat macro


      if (combat.getDefaultAction() === undefined) combat.action("ignore"); // Use rock-band flyers if needed (300 extra as a buffer for mafia tracking)

      var blacklist = new Set($locations(engine_templateObject3 || (engine_templateObject3 = engine_engine_taggedTemplateLiteral(["The Copperhead Club, The Black Forest, Oil Peak"]))));

      if ((0,external_kolmafia_namespaceObject.myBasestat)($stat(engine_templateObject4 || (engine_templateObject4 = engine_engine_taggedTemplateLiteral(["Moxie"])))) >= 200 && (0,external_kolmafia_namespaceObject.myBuffedstat)($stat(engine_templateObject5 || (engine_templateObject5 = engine_engine_taggedTemplateLiteral(["Moxie"])))) >= 200 && have(template_string_$item(engine_templateObject6 || (engine_templateObject6 = engine_engine_taggedTemplateLiteral(["rock band flyers"])))) && !flyersDone() && (!(task.do instanceof external_kolmafia_namespaceObject.Location) || !blacklist.has(task.do)) && task.name !== "Misc/Protonic Ghost") {
        combat.macro(new Macro().if_( // Avoid sausage goblin (2104), ninja snowman assassin (1185), protagonist (160), quantum mechanic (223)
        "!hpbelow 50 && !monsterid 2104 && !monsterid 1185 &&!monsterid 160 && !monsterid 223", new Macro().tryItem(template_string_$item(engine_templateObject7 || (engine_templateObject7 = engine_engine_taggedTemplateLiteral(["rock band flyers"]))))), undefined, true);
      } // Absorb targeted monsters
      // (if we have teleportitis, everything is a possible target)


      var absorb_state = globalStateCache.absorb();
      var absorb_targets = task.do instanceof external_kolmafia_namespaceObject.Location ? new Set([].concat(engine_engine_toConsumableArray(absorb_state.remainingAbsorbs(have($effect(engine_templateObject8 || (engine_templateObject8 = engine_engine_taggedTemplateLiteral(["Teleportitis"])))) ? undefined : task.do)), engine_engine_toConsumableArray(absorb_state.remainingReprocess(have($effect(engine_templateObject9 || (engine_templateObject9 = engine_engine_taggedTemplateLiteral(["Teleportitis"])))) ? undefined : task.do)))) : [];

      var _iterator3 = engine_engine_createForOfIteratorHelper(absorb_targets),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var monster = _step3.value;

          if (absorb_state.isReprocessTarget(monster)) {
            outfit.equip(template_string_$familiar(engine_templateObject19 || (engine_templateObject19 = engine_engine_taggedTemplateLiteral(["Grey Goose"])))); // combat.autoattack(new Macro().trySkill($skill`Re-Process Matter`), monster);

            combat.macro(new Macro().trySkill($skill(engine_templateObject20 || (engine_templateObject20 = engine_engine_taggedTemplateLiteral(["Re-Process Matter"])))), monster, true);
            debug("Target x2: ".concat(monster.name), "purple");
          } else {
            debug("Target: ".concat(monster.name), "purple");
          }

          var strategy = combat.currentStrategy(monster);

          if (strategy === "ignore" || strategy === "banish" || strategy === "ignoreNoBanish") {
            combat.action("kill", monster); // TODO: KillBanish for Banish, KillNoBanish for IgnoreNoBanish
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (wanderers.length === 0) {
        var _task$active_priority3;

        // Set up a banish if needed
        var banish_state = globalStateCache.banishes();

        if (combat.can("banish") && !banish_state.isFullyBanished(task)) {
          var available_tasks = this.tasks.filter(task => this.available(task));
          var banishSources = banish_state.unusedBanishes(available_tasks);
          resources.provide("banish", equipFirst(outfit, banishSources));
          debug("Banish targets: ".concat(combat.where("banish").filter(monster => !banish_state.already_banished.has(monster)).join(", ")));
          debug("Banishes available: ".concat(Array.from(banishSources).map(b => b.do).join(", ")));
        } // Equip an orb if we have a good target.
        // (If we have banished all the bad targets, there is no need to force an orb)


        if ((_task$active_priority3 = task.active_priority) !== null && _task$active_priority3 !== void 0 && _task$active_priority3.has(OverridePriority.GoodOrb) && (!combat.can("banish") || !banish_state.isFullyBanished(task))) {
          outfit.equip(template_string_$item(engine_templateObject10 || (engine_templateObject10 = engine_engine_taggedTemplateLiteral(["miniature crystal ball"]))));
        } // Set up a runaway if there are combats we do not care about


        var runaway = undefined;

        if (combat.can("ignore") && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(engine_templateObject11 || (engine_templateObject11 = engine_engine_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && (0,external_kolmafia_namespaceObject.myLevel)() >= 11) {
          runaway = equipFirst(outfit, runawaySources);
          resources.provide("ignore", runaway);
        }

        if (combat.can("ignoreNoBanish") && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(engine_templateObject12 || (engine_templateObject12 = engine_engine_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && (0,external_kolmafia_namespaceObject.myLevel)() >= 11) {
          if (runaway !== undefined && !runaway.banishes) resources.provide("ignoreNoBanish", runaway);else resources.provide("ignoreNoBanish", equipFirst(outfit, runawaySources.filter(source => !source.banishes)));
        } // Set up a free kill if needed, or if no free kills will ever be needed again


        if (combat.can("killFree") || combat.can("kill") && !task.boss && this.tasks.every(t => {
          var _t$combat;

          return t.completed() || !((_t$combat = t.combat) !== null && _t$combat !== void 0 && _t$combat.can("killFree"));
        })) {
          resources.provide("killFree", equipFirst(outfit, freekillSources));
        }
      }

      equipCharging(outfit);
      if (wanderers.length === 0 && this.hasDelay(task)) wanderers.push.apply(wanderers, engine_engine_toConsumableArray(equipUntilCapped(outfit, wandererSources))); // Prepare full outfit

      if (!outfit.skipDefaults) {
        var freecombat = task.freecombat || wanderers.find(wanderer => wanderer.chance() === 1); // if (!task_combat.boss && !freecombat) outfit.equip($item`carnivorous potted plant`);

        if (canChargeVoid() && (!outfit.modifier || !outfit.modifier.includes("-combat")) && !freecombat && (combat.can("kill") && !resources.has("killFree") || combat.can("killHard") || task.boss)) outfit.equip(template_string_$item(engine_templateObject13 || (engine_templateObject13 = engine_engine_taggedTemplateLiteral(["cursed magnifying glass"]))));
        equipDefaults(outfit);
      } // Kill wanderers


      for (var _i2 = 0, _wanderers2 = wanderers; _i2 < _wanderers2.length; _i2++) {
        var _wanderer = _wanderers2[_i2];
        combat.action("killHard", _wanderer.monsters);
        if (_wanderer.action) combat.macro(_wanderer.action, _wanderer.monsters);
      } // Always be ready to fight sausage goblins
      // TODO: only if we equip kramco


      if (have(template_string_$item(engine_templateObject14 || (engine_templateObject14 = engine_engine_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) && wanderers.find(w => w.equip === template_string_$item(engine_templateObject15 || (engine_templateObject15 = engine_engine_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) === undefined) {
        combat.action("killHard", $monster(engine_templateObject16 || (engine_templateObject16 = engine_engine_taggedTemplateLiteral(["sausage goblin"]))));
        combat.macro(new Macro().trySkill($skill(engine_templateObject17 || (engine_templateObject17 = engine_engine_taggedTemplateLiteral(["Emit Matter Duplicating Drones"])))), $monster(engine_templateObject18 || (engine_templateObject18 = engine_engine_taggedTemplateLiteral(["sausage goblin"]))));
      } // Kill holiday wanderers


      var holidayMonsters = getTodaysHolidayWanderers(); // TODO: better detection of which zones holiday monsters can appear

      if (holidayMonsters.length > 0 && !task.boss) combat.action.apply(combat, ["ignore"].concat(engine_engine_toConsumableArray(holidayMonsters))); // Upgrade normal kills to free kills if provided

      if (resources.has("killFree") && !task.boss) {
        var _combat$where;

        combat.action("killFree", ((_combat$where = combat.where("kill")) !== null && _combat$where !== void 0 ? _combat$where : []).filter(mon => !mon.boss));
        if (combat.getDefaultAction() === "kill") combat.action("killFree");
      }
    }
  }, {
    key: "createOutfit",
    value: function createOutfit(task) {
      var spec = typeof task.outfit === "function" ? task.outfit() : task.outfit;
      var outfit = new Outfit();
      if (spec !== undefined) outfit.equip(spec); // no error on failure

      return outfit;
    }
  }, {
    key: "dress",
    value: function dress(task, outfit) {
      var _outfit$modifier;

      try {
        outfit.dress();
      } catch (_unused) {
        // If we fail to dress, this is maybe just a mafia desync.
        // So refresh our inventory and try again (once).
        debug("Possible mafia desync detected; refreshing...");
        (0,external_kolmafia_namespaceObject.cliExecute)("refresh all");
        outfit.dress({
          forceUpdate: true
        });
      }

      fixFoldables(outfit);
      applyEffects((_outfit$modifier = outfit.modifier) !== null && _outfit$modifier !== void 0 ? _outfit$modifier : "", task.effects || []);

      if (args.verboseequip) {
        var equipped = engine_engine_toConsumableArray(new Set(external_kolmafia_namespaceObject.Slot.all().map(slot => (0,external_kolmafia_namespaceObject.equippedItem)(slot))));

        (0,external_kolmafia_namespaceObject.print)("Equipped: ".concat(equipped.join(", ")));
      } // HP/MP upkeep
      // HP/MP upkeep


      if (!task.freeaction) {
        if ((0,external_kolmafia_namespaceObject.myHp)() < 50 && (0,external_kolmafia_namespaceObject.myHp)() < (0,external_kolmafia_namespaceObject.myMaxhp)()) (0,external_kolmafia_namespaceObject.restoreHp)((0,external_kolmafia_namespaceObject.myMaxhp)() < 50 ? (0,external_kolmafia_namespaceObject.myMaxhp)() : 50);
        if ((0,external_kolmafia_namespaceObject.myMp)() < 40 && (0,external_kolmafia_namespaceObject.myMaxmp)() >= 40) customRestoreMp(40);
      }
    }
  }, {
    key: "setChoices",
    value: function setChoices(task, manager) {
      engine_get(engine_getPrototypeOf(Engine.prototype), "setChoices", this).call(this, task, manager);

      if ((0,external_kolmafia_namespaceObject.equippedAmount)(template_string_$item(engine_templateObject21 || (engine_templateObject21 = engine_engine_taggedTemplateLiteral(["June cleaver"])))) > 0) {
        this.propertyManager.setChoices({
          // June cleaver noncombats
          1467: 3,
          // +adv
          1468: property_get("_juneCleaverSkips", 0) < 5 ? 4 : 1,
          1469: property_get("_juneCleaverSkips", 0) < 5 ? 4 : 3,
          1470: 2,
          // teacher's pen
          1471: property_get("_juneCleaverSkips", 0) < 5 ? 4 : 1,
          1472: property_get("_juneCleaverSkips", 0) < 5 ? 4 : 2,
          1473: property_get("_juneCleaverSkips", 0) < 5 ? 4 : 2,
          1474: property_get("_juneCleaverSkips", 0) < 5 ? 4 : 2,
          1475: property_get("_juneCleaverSkips", 0) < 5 ? 4 : 1
        });
      }
    }
  }, {
    key: "do",
    value: function _do(task) {
      var beaten_turns = (0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject22 || (engine_templateObject22 = engine_engine_taggedTemplateLiteral(["Beaten Up"]))));
      var start_advs = (0,external_kolmafia_namespaceObject.myAdventures)();
      var goose_weight = (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(engine_templateObject23 || (engine_templateObject23 = engine_engine_taggedTemplateLiteral(["Grey Goose"]))));

      engine_get(engine_getPrototypeOf(Engine.prototype), "do", this).call(this, task);

      if ((0,external_kolmafia_namespaceObject.myAdventures)() !== start_advs) getExtros(); // Crash if we unexpectedly lost the fight

      if (!task.expectbeatenup && have($effect(engine_templateObject24 || (engine_templateObject24 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))) && (0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject25 || (engine_templateObject25 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))) !== 5) {
        // Poetic Justice gives 5
        if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject26 || (engine_templateObject26 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))) > beaten_turns || // Turns of beaten-up increased, so we lost
        (0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject27 || (engine_templateObject27 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))) === beaten_turns && ( // Turns of beaten-up was constant but adventures went down, so we lost fight while already beaten up
        (0,external_kolmafia_namespaceObject.myAdventures)() < start_advs || // Check if adventures went down but also we reprocessed a monster
        (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(engine_templateObject28 || (engine_templateObject28 = engine_engine_taggedTemplateLiteral(["Grey Goose"])))) < goose_weight && ((0,external_kolmafia_namespaceObject.myAdventures)() === start_advs + 4 || (0,external_kolmafia_namespaceObject.myAdventures)() === start_advs + 6 || (0,external_kolmafia_namespaceObject.myAdventures)() === start_advs + 9))) throw "Fight was lost (debug info: ".concat(beaten_turns, " => ").concat((0,external_kolmafia_namespaceObject.haveEffect)($effect(engine_templateObject29 || (engine_templateObject29 = engine_engine_taggedTemplateLiteral(["Beaten Up"])))), ", (").concat(start_advs, " => ").concat((0,external_kolmafia_namespaceObject.myAdventures)(), "); stop.");
      }
    }
  }, {
    key: "post",
    value: function post(task) {
      engine_get(engine_getPrototypeOf(Engine.prototype), "post", this).call(this, task);

      absorbConsumables();
      autosellJunk();

      var _iterator4 = engine_engine_createForOfIteratorHelper($effects(engine_templateObject30 || (engine_templateObject30 = engine_engine_taggedTemplateLiteral(["Hardly Poisoned at All, A Little Bit Poisoned, Somewhat Poisoned, Really Quite Poisoned, Majorly Poisoned, Toad In The Hole"])))),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var poisoned = _step4.value;
          if (have(poisoned)) uneffect(poisoned);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      globalStateCache.invalidate();
    }
  }, {
    key: "initPropertiesManager",
    value: function initPropertiesManager(manager) {
      engine_get(engine_getPrototypeOf(Engine.prototype), "initPropertiesManager", this).call(this, manager);

      manager.set({
        louvreGoal: 7,
        louvreDesiredGoal: 7,
        requireBoxServants: false,
        autoAbortThreshold: "-0.05",
        mpAutoRecoveryItems: ensureRecovery("mpAutoRecoveryItems", ["black cherry soda", "doc galaktik's invigorating tonic"]),
        hpAutoRecoveryItems: ensureRecovery("hpAutoRecoveryItems", ["scroll of drastic healing", "doc galaktik's homeopathic elixir"])
      });
      manager.setChoices({
        1106: 3,
        // Ghost Dog Chow
        1107: 1,
        // tennis ball
        1340: 3,
        // Is There A Doctor In The House?
        1341: 1 // Cure her poison

      });
    }
  }, {
    key: "updatePlan",
    value: function updatePlan() {
      // Note order matters for these strategy updates
      globalStateCache.invalidate();
      summonStrategy.update(); // Update summon plan with current state

      keyStrategy.update(); // Update key plan with current state

      pullStrategy.update(); // Update pull plan with current state
    }
  }]);

  return Engine;
}(Engine);
var consumables_blacklist = new Set(template_string_$items(engine_templateObject31 || (engine_templateObject31 = engine_engine_taggedTemplateLiteral(["wet stew, wet stunt nut stew, stunt nuts, astral pilsner, astral hot dog dinner, giant marshmallow, booze-soaked cherry, sponge cake, gin-soaked blotter paper, steel margarita, bottle of Chateau de Vinegar, Bowl of Scorpions, unnamed cocktail, Flamin' Whatshisname, goat cheese, Extrovermectin\u2122, blueberry muffin, bran muffin, chocolate chip muffin, Schr\xF6dinger's thermos, quantum taco, pirate fork, everfull glass, [glitch season reward name]"]))));

function autosellJunk() {
  // eslint-disable-next-line eqeqeq
  if ((0,external_kolmafia_namespaceObject.myPath)() != "Grey You") return; // final safety

  if ((0,external_kolmafia_namespaceObject.myMeat)() >= 10000) return;
  if ((0,external_kolmafia_namespaceObject.myTurncount)() >= 1000) return; // stop after breaking ronin

  if (have(template_string_$item(engine_templateObject32 || (engine_templateObject32 = engine_engine_taggedTemplateLiteral(["pork elf goodies sack"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(engine_templateObject33 || (engine_templateObject33 = engine_engine_taggedTemplateLiteral(["pork elf goodies sack"])))); // Sell junk items

  var junk = template_string_$items(engine_templateObject34 || (engine_templateObject34 = engine_engine_taggedTemplateLiteral(["hamethyst, baconstone, meat stack, dense meat stack, facsimile dictionary, space blanket, 1,970 carat gold, black snake skin, demon skin, hellion cube, adder bladder, weremoose spit, Knob Goblin firecracker, wussiness potion, diamond-studded cane, Knob Goblin tongs, Knob Goblin scimitar, eggbeater, red-hot sausage fork, Knob Goblin pants, awful poetry journal, black pixel, pile of dusty animal bones, 1952 Mickey Mantle card, liquid ice"], ["hamethyst, baconstone, meat stack, dense meat stack, facsimile dictionary, space blanket, 1\\,970 carat gold, black snake skin, demon skin, hellion cube, adder bladder, weremoose spit, Knob Goblin firecracker, wussiness potion, diamond-studded cane, Knob Goblin tongs, Knob Goblin scimitar, eggbeater, red-hot sausage fork, Knob Goblin pants, awful poetry journal, black pixel, pile of dusty animal bones, 1952 Mickey Mantle card, liquid ice"])));

  var _iterator5 = engine_engine_createForOfIteratorHelper(junk),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _item = _step5.value;
      if (have(_item)) (0,external_kolmafia_namespaceObject.autosell)(_item, (0,external_kolmafia_namespaceObject.itemAmount)(_item));
    } // Sell all but one of a few items

  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  var partial_junk = template_string_$items(engine_templateObject35 || (engine_templateObject35 = engine_engine_taggedTemplateLiteral(["porquoise, ruby W, metallic A, lowercase N, heavy D"])));

  var _iterator6 = engine_engine_createForOfIteratorHelper(partial_junk),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _item2 = _step6.value;
      if ((0,external_kolmafia_namespaceObject.itemAmount)(_item2) > 1) (0,external_kolmafia_namespaceObject.autosell)(_item2, (0,external_kolmafia_namespaceObject.itemAmount)(_item2) - 1);
    } // Use wallets

  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  var wallets = template_string_$items(engine_templateObject36 || (engine_templateObject36 = engine_engine_taggedTemplateLiteral(["ancient vinyl coin purse, black pension check, old leather wallet, Gathered Meat-Clip, old coin purse"])));

  var _iterator7 = engine_engine_createForOfIteratorHelper(wallets),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var _item3 = _step7.value;
      if (have(_item3)) (0,external_kolmafia_namespaceObject.use)(_item3, (0,external_kolmafia_namespaceObject.itemAmount)(_item3));
    } // Sell extra consumables (after 1 has been absorbed)

  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  for (var item_name in (0,external_kolmafia_namespaceObject.getInventory)()) {
    var item = external_kolmafia_namespaceObject.Item.get(item_name);
    if (consumables_blacklist.has(item)) continue;
    if ((0,external_kolmafia_namespaceObject.autosellPrice)(item) === 0) continue;

    if (item.inebriety > 0 || item.fullness > 0 || item.spleen > 0) {
      (0,external_kolmafia_namespaceObject.autosell)(item, (0,external_kolmafia_namespaceObject.itemAmount)(item));
    }
  }
}

function absorbConsumables() {
  // eslint-disable-next-line eqeqeq
  if ((0,external_kolmafia_namespaceObject.myPath)() != "Grey You") return; // final safety

  if ((0,external_kolmafia_namespaceObject.myTurncount)() >= 1000) return; // stop after breaking ronin

  var absorbed_list = property_get("_loop_gyou_absorbed_consumables", "");
  var absorbed = new Set(absorbed_list.split(","));

  for (var item_name in (0,external_kolmafia_namespaceObject.getInventory)()) {
    var item = external_kolmafia_namespaceObject.Item.get(item_name);
    var item_id = "".concat((0,external_kolmafia_namespaceObject.toInt)(item));
    if (consumables_blacklist.has(item)) continue;

    if (item.inebriety > 0 && !absorbed.has(item_id)) {
      (0,external_kolmafia_namespaceObject.overdrink)(item);
      absorbed_list += absorbed_list.length > 0 ? ",".concat(item_id) : item_id;
    }

    if (item.fullness > 0 && !absorbed.has(item_id)) {
      if (have(template_string_$item(engine_templateObject37 || (engine_templateObject37 = engine_engine_taggedTemplateLiteral(["Special Seasoning"]))))) (0,external_kolmafia_namespaceObject.putCloset)((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(engine_templateObject38 || (engine_templateObject38 = engine_engine_taggedTemplateLiteral(["Special Seasoning"])))), template_string_$item(engine_templateObject39 || (engine_templateObject39 = engine_engine_taggedTemplateLiteral(["Special Seasoning"]))));
      (0,external_kolmafia_namespaceObject.eat)(item);
      absorbed_list += absorbed_list.length > 0 ? ",".concat(item_id) : item_id;
    }
  }

  _set("_loop_gyou_absorbed_consumables", absorbed_list);
}

function getExtros() {
  if ((0,external_kolmafia_namespaceObject.getWorkshed)() !== template_string_$item(engine_templateObject40 || (engine_templateObject40 = engine_engine_taggedTemplateLiteral(["cold medicine cabinet"])))) return;

  if (property_get("_coldMedicineConsults") >= 5 || property_get("_nextColdMedicineConsult") > (0,external_kolmafia_namespaceObject.totalTurnsPlayed)()) {
    return;
  }

  var options = (0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=workshed");
  var match;
  var regexp = /descitem\((\d+)\)/g;

  while ((match = regexp.exec(options)) !== null) {
    var item = (0,external_kolmafia_namespaceObject.descToItem)(match[1]);

    if (item === template_string_$item(engine_templateObject41 || (engine_templateObject41 = engine_engine_taggedTemplateLiteral(["Extrovermectin\u2122"])))) {
      (0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=workshed");
      (0,external_kolmafia_namespaceObject.runChoice)(5);
      return;
    }
  }
}

function customRestoreMp(target) {
  if ((0,external_kolmafia_namespaceObject.myMp)() >= target) return;

  if (property_get("sweat", 0) >= 80) {
    // Use visit URL to avoid needing to equip the pants
    (0,external_kolmafia_namespaceObject.visitUrl)("runskillz.php?action=Skillz&whichskill=7420&targetplayer=0&pwd&quantity=1");
  }

  (0,external_kolmafia_namespaceObject.restoreMp)(target);
}

function ensureRecovery(property, items) {
  var recovery_property = property_get(property).split(";");

  var _iterator8 = engine_engine_createForOfIteratorHelper(items),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var item = _step8.value;

      if (!recovery_property.includes(item)) {
        recovery_property.push(item);
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }

  return recovery_property.join(";");
}
;// CONCATENATED MODULE: ./src/engine/moods.ts
var moods_templateObject, moods_templateObject2, moods_templateObject3, moods_templateObject4, moods_templateObject5, moods_templateObject6, moods_templateObject7, moods_templateObject8, moods_templateObject9, moods_templateObject10, moods_templateObject11, moods_templateObject12, moods_templateObject13, moods_templateObject14, moods_templateObject15, moods_templateObject16, moods_templateObject17, moods_templateObject18, moods_templateObject19, moods_templateObject20, moods_templateObject21, moods_templateObject22;

function moods_slicedToArray(arr, i) { return moods_arrayWithHoles(arr) || moods_iterableToArrayLimit(arr, i) || moods_unsupportedIterableToArray(arr, i) || moods_nonIterableRest(); }

function moods_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function moods_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function moods_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function moods_toConsumableArray(arr) { return moods_arrayWithoutHoles(arr) || moods_iterableToArray(arr) || moods_unsupportedIterableToArray(arr) || moods_nonIterableSpread(); }

function moods_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function moods_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function moods_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return moods_arrayLikeToArray(arr); }

function moods_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = moods_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function moods_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return moods_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return moods_arrayLikeToArray(o, minLen); }

function moods_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function moods_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function getRelevantEffects() {
  var result = {
    "-combat": [],
    "+combat": [],
    " combat": [] // Maximizer has issues with "50 +combat" and similar

  };
  if (have(template_string_$item(moods_templateObject || (moods_templateObject = moods_taggedTemplateLiteral(["Clan VIP Lounge key"])))) && (!property_get("_olympicSwimmingPool") || have($effect(moods_templateObject2 || (moods_templateObject2 = moods_taggedTemplateLiteral(["Silent Running"])))))) result["-combat"].push($effect(moods_templateObject3 || (moods_templateObject3 = moods_taggedTemplateLiteral(["Silent Running"])))); // Noncombat/combat buffs

  if (have($skill(moods_templateObject4 || (moods_templateObject4 = moods_taggedTemplateLiteral(["Phase Shift"]))))) result["-combat"].push($effect(moods_templateObject5 || (moods_templateObject5 = moods_taggedTemplateLiteral(["Shifted Phase"]))));
  if (have($skill(moods_templateObject6 || (moods_templateObject6 = moods_taggedTemplateLiteral(["Photonic Shroud"]))))) result["-combat"].push($effect(moods_templateObject7 || (moods_templateObject7 = moods_taggedTemplateLiteral(["Darkened Photons"]))));
  if (have($skill(moods_templateObject8 || (moods_templateObject8 = moods_taggedTemplateLiteral(["Piezoelectric Honk"]))))) result["+combat"].push($effect(moods_templateObject9 || (moods_templateObject9 = moods_taggedTemplateLiteral(["Hooooooooonk!"]))));
  result[" combat"] = result["+combat"];
  return result;
}

function shrug(effects) {
  var _iterator = moods_createForOfIteratorHelper(effects),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var effect = _step.value;
      if (have(effect)) uneffect(effect);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function moodCompatible(modifier) {
  // Since shrugging is limited, ensure we do not attempt a +combat task
  // while under -combat effects, and vice-versa.
  if (modifier === undefined) return true;

  if (modifier.includes("+combat") || modifier.includes(" combat")) {
    return !have($effect(moods_templateObject10 || (moods_templateObject10 = moods_taggedTemplateLiteral(["Shifted Phase"])))) && !have($effect(moods_templateObject11 || (moods_templateObject11 = moods_taggedTemplateLiteral(["Darkened Photons"]))));
  }

  if (modifier.includes("-combat")) {
    return !have($effect(moods_templateObject12 || (moods_templateObject12 = moods_taggedTemplateLiteral(["Hooooooooonk!"]))));
  }

  return true;
}
function applyEffects(modifier, required) {
  var relevantEffects = getRelevantEffects();
  var useful_effects = [];
  useful_effects.push.apply(useful_effects, moods_toConsumableArray(required));

  for (var key in relevantEffects) {
    if (modifier.includes(key)) {
      useful_effects.push.apply(useful_effects, moods_toConsumableArray(relevantEffects[key]));
    }
  } // Remove wrong combat effects


  if (modifier.includes("+combat") || modifier.includes(" combat")) shrug(relevantEffects["-combat"]);
  if (modifier.includes("-combat")) shrug(relevantEffects["+combat"]);
  var mpcosts = new Map([[$effect(moods_templateObject13 || (moods_templateObject13 = moods_taggedTemplateLiteral(["Shifted Phase"]))), 50], [$effect(moods_templateObject14 || (moods_templateObject14 = moods_taggedTemplateLiteral(["Hooooooooonk!"]))), 50], [$effect(moods_templateObject15 || (moods_templateObject15 = moods_taggedTemplateLiteral(["Darkened Photons"]))), 40]]); // Apply all relevant effects

  var hotswapped = []; //

  for (var _i = 0, _useful_effects = useful_effects; _i < _useful_effects.length; _i++) {
    var _mpcosts$get;

    var effect = _useful_effects[_i];
    if (have(effect)) continue; // If we don't have the MP for this effect, hotswap some equipment

    var mpcost = (_mpcosts$get = mpcosts.get(effect)) !== null && _mpcosts$get !== void 0 ? _mpcosts$get : 0;

    if (mpcost > (0,external_kolmafia_namespaceObject.myMaxmp)()) {
      hotswapped.push.apply(hotswapped, moods_toConsumableArray(swapEquipmentForMp(mpcost)));
    }

    if ((0,external_kolmafia_namespaceObject.myMp)() < mpcost) customRestoreMp(mpcost);
    ensureEffect(effect);
  } // If we hotswapped equipment, restore our old equipment (in-reverse, to work well if we moved equipment around)


  hotswapped.reverse();

  for (var _i2 = 0, _hotswapped = hotswapped; _i2 < _hotswapped.length; _i2++) {
    var _hotswapped$_i = moods_slicedToArray(_hotswapped[_i2], 2),
        slot = _hotswapped$_i[0],
        item = _hotswapped$_i[1];

    (0,external_kolmafia_namespaceObject.equip)(item, slot);
  }
}
function swapEquipmentForMp(mpgoal) {
  var hotswapped = [];
  var inventory_options = Object.entries((0,external_kolmafia_namespaceObject.getInventory)()).map(v => external_kolmafia_namespaceObject.Item.get(v[0])).filter(item => (0,external_kolmafia_namespaceObject.numericModifier)(item, "Maximum MP") > 0 && (0,external_kolmafia_namespaceObject.canEquip)(item));

  var _iterator2 = moods_createForOfIteratorHelper(external_kolmafia_namespaceObject.Slot.all()),
      _step2;

  try {
    var _loop = function _loop() {
      var slot = _step2.value;
      if (mpgoal <= (0,external_kolmafia_namespaceObject.myMaxmp)()) return "break";
      if (slot === $slot(moods_templateObject16 || (moods_templateObject16 = moods_taggedTemplateLiteral(["weapon"]))) || slot === $slot(moods_templateObject17 || (moods_templateObject17 = moods_taggedTemplateLiteral(["off-hand"])))) return "continue"; // skip weapon handedness (for now)

      var item = (0,external_kolmafia_namespaceObject.equippedItem)(slot);
      if (item === template_string_$item(moods_templateObject18 || (moods_templateObject18 = moods_taggedTemplateLiteral(["none"])))) return "continue"; // Find an item in the same slot that gives more max MP

      var canonical_slot = slot === $slot(moods_templateObject19 || (moods_templateObject19 = moods_taggedTemplateLiteral(["acc3"]))) ? $slot(moods_templateObject20 || (moods_templateObject20 = moods_taggedTemplateLiteral(["acc1"]))) : slot === $slot(moods_templateObject21 || (moods_templateObject21 = moods_taggedTemplateLiteral(["acc2"]))) ? $slot(moods_templateObject22 || (moods_templateObject22 = moods_taggedTemplateLiteral(["acc1"]))) : slot;
      var slot_options = inventory_options.filter(it => (0,external_kolmafia_namespaceObject.equippedAmount)(it) === 0 && (0,external_kolmafia_namespaceObject.toSlot)(it) === canonical_slot && (0,external_kolmafia_namespaceObject.numericModifier)(it, "Maximum HP") >= (0,external_kolmafia_namespaceObject.numericModifier)(item, "Maximum HP") && (0,external_kolmafia_namespaceObject.numericModifier)(it, "Maximum MP") > (0,external_kolmafia_namespaceObject.numericModifier)(item, "Maximum MP")).sort((a, b) => (0,external_kolmafia_namespaceObject.numericModifier)(b, "Maximum MP") - (0,external_kolmafia_namespaceObject.numericModifier)(a, "Maximum MP")); // If there is such an item, equip it

      if (slot_options.length === 0) return "continue";
      hotswapped.push([slot, item]);
      (0,external_kolmafia_namespaceObject.equip)(slot, slot_options[0]);
    };

    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _ret = _loop();

      if (_ret === "break") break;
      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return hotswapped;
}
;// CONCATENATED MODULE: ./src/engine/priority.ts
var priority_templateObject, priority_templateObject2, priority_templateObject3, priority_templateObject4, priority_templateObject5, priority_templateObject6, priority_templateObject7, priority_templateObject8, priority_templateObject9, priority_templateObject10;

function priority_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function priority_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = priority_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function priority_toConsumableArray(arr) { return priority_arrayWithoutHoles(arr) || priority_iterableToArray(arr) || priority_unsupportedIterableToArray(arr) || priority_nonIterableSpread(); }

function priority_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function priority_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return priority_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return priority_arrayLikeToArray(o, minLen); }

function priority_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function priority_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return priority_arrayLikeToArray(arr); }

function priority_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function priority_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function priority_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function priority_createClass(Constructor, protoProps, staticProps) { if (protoProps) priority_defineProperties(Constructor.prototype, protoProps); if (staticProps) priority_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function priority_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Temporary priorities that override the routing.
 */





var OverridePriority;

(function (OverridePriority) {
  OverridePriority[OverridePriority["Wanderer"] = 20000] = "Wanderer";
  OverridePriority[OverridePriority["Always"] = 10000] = "Always";
  OverridePriority[OverridePriority["Free"] = 1000] = "Free";
  OverridePriority[OverridePriority["Start"] = 900] = "Start";
  OverridePriority[OverridePriority["LastCopyableMonster"] = 100] = "LastCopyableMonster";
  OverridePriority[OverridePriority["Effect"] = 20] = "Effect";
  OverridePriority[OverridePriority["GoodOrb"] = 15] = "GoodOrb";
  OverridePriority[OverridePriority["YR"] = 10] = "YR";
  OverridePriority[OverridePriority["GoodGoose"] = 1] = "GoodGoose";
  OverridePriority[OverridePriority["GoodBanish"] = 0.5] = "GoodBanish";
  OverridePriority[OverridePriority["None"] = 0] = "None";
  OverridePriority[OverridePriority["BadOrb"] = -2] = "BadOrb";
  OverridePriority[OverridePriority["BadGoose"] = -16] = "BadGoose";
  OverridePriority[OverridePriority["BadYR"] = -30] = "BadYR";
  OverridePriority[OverridePriority["BadMood"] = -100] = "BadMood";
  OverridePriority[OverridePriority["Last"] = -10000] = "Last";
})(OverridePriority || (OverridePriority = {}));

var Prioritization = /*#__PURE__*/function () {
  function Prioritization() {
    priority_classCallCheck(this, Prioritization);

    priority_defineProperty(this, "priorities", new Set());

    priority_defineProperty(this, "orb_monster", undefined);
  }

  priority_createClass(Prioritization, [{
    key: "explain",
    value: function explain() {
      var reasons = new Map([[OverridePriority.Wanderer, "Wanderer"], [OverridePriority.Always, "Forced"], [OverridePriority.Free, "Free action"], [OverridePriority.Start, "Initial tasks"], [OverridePriority.LastCopyableMonster, "Copy last monster"], [OverridePriority.Effect, "Useful effect"], [OverridePriority.GoodOrb, this.orb_monster ? "Target ".concat(this.orb_monster) : "Target ?"], [OverridePriority.YR, "Yellow ray"], [OverridePriority.GoodGoose, "Goose charged"], [OverridePriority.GoodBanish, "Banishes committed"], [OverridePriority.BadYR, "Too early for yellow ray"], [OverridePriority.BadOrb, this.orb_monster ? "Avoid ".concat(this.orb_monster) : "Avoid ?"], [OverridePriority.BadGoose, "Goose not charged"], [OverridePriority.BadMood, "Wrong combat modifiers"]]);
      return priority_toConsumableArray(this.priorities).map(priority => reasons.get(priority)).filter(priority => priority !== undefined).join(", ");
    }
  }, {
    key: "has",
    value: function has(priorty) {
      return this.priorities.has(priorty);
    }
  }, {
    key: "score",
    value: function score() {
      var result = 0;

      var _iterator = priority_createForOfIteratorHelper(this.priorities),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var priority = _step.value;
          result += priority;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    }
  }], [{
    key: "fixed",
    value: function fixed(priority) {
      var result = new Prioritization();
      result.priorities.add(priority);
      return result;
    }
  }, {
    key: "from",
    value: function from(task) {
      var _task$priority, _task$priority2;

      var result = new Prioritization();
      var base = (_task$priority = (_task$priority2 = task.priority) === null || _task$priority2 === void 0 ? void 0 : _task$priority2.call(task)) !== null && _task$priority !== void 0 ? _task$priority : OverridePriority.None;
      if (base !== OverridePriority.None) result.priorities.add(base); // Check if Grey Goose is charged

      if (needsChargedGoose(task)) {
        if ((0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(priority_templateObject || (priority_templateObject = priority_taggedTemplateLiteral(["Grey Goose"])))) < 6) {
          // Do not trigger BadGoose if a YR is up, to make the airship flow better.
          // This way we can get the YR off and use the goose separately
          if (!result.priorities.has(OverridePriority.YR)) {
            result.priorities.add(OverridePriority.BadGoose);
          }
        } else {
          result.priorities.add(OverridePriority.GoodGoose);
        }
      } // Dodge useless monsters with the orb


      if (task.do instanceof external_kolmafia_namespaceObject.Location) {
        var next_monster = globalStateCache.orb().prediction(task.do);

        if (next_monster !== undefined) {
          result.orb_monster = next_monster;
          result.priorities.add(orbPriority(task, next_monster));
        }
      } // Ensure that the current +/- combat effects are compatible
      //  (Macguffin/Forest is tough and doesn't need much +combat; just power though)


      var outfit_spec = typeof task.outfit === "function" ? task.outfit() : task.outfit;

      if (!moodCompatible(outfit_spec === null || outfit_spec === void 0 ? void 0 : outfit_spec.modifier) && task.name !== "Macguffin/Forest") {
        result.priorities.add(OverridePriority.BadMood);
      } // Burn off desert debuffs


      if ((have($effect(priority_templateObject2 || (priority_templateObject2 = priority_taggedTemplateLiteral(["Prestidigysfunction"])))) || have($effect(priority_templateObject3 || (priority_templateObject3 = priority_taggedTemplateLiteral(["Turned Into a Skeleton"]))))) && task.combat && task.combat.can("killItem")) {
        result.priorities.add(OverridePriority.BadMood);
      } // Wait until we get a -combat skill before doing any -combat


      if (outfit_spec !== null && outfit_spec !== void 0 && outfit_spec.modifier && outfit_spec.modifier.includes("-combat") && !have($skill(priority_templateObject4 || (priority_templateObject4 = priority_taggedTemplateLiteral(["Phase Shift"])))) && !( // All these add up to -25 combat fine, no need to wait
      have(template_string_$item(priority_templateObject5 || (priority_templateObject5 = priority_taggedTemplateLiteral(["Space Trip safety headphones"])))) && have(template_string_$item(priority_templateObject6 || (priority_templateObject6 = priority_taggedTemplateLiteral(["unbreakable umbrella"])))) && have(template_string_$item(priority_templateObject7 || (priority_templateObject7 = priority_taggedTemplateLiteral(["protonic accelerator pack"])))) && (!property_get("_olympicSwimmingPool") || have($effect(priority_templateObject8 || (priority_templateObject8 = priority_taggedTemplateLiteral(["Silent Running"]))))))) {
        result.priorities.add(OverridePriority.BadMood);
      } // If we have already used banishes in the zone, prefer it


      if (globalStateCache.banishes().isPartiallyBanished(task)) {
        result.priorities.add(OverridePriority.GoodBanish);
      }

      return result;
    }
  }]);

  return Prioritization;
}();

function orbPriority(task, monster) {
  if (!(task.do instanceof external_kolmafia_namespaceObject.Location)) return OverridePriority.None; // If the goose is not charged, do not aim to reprocess

  var absorb_state = globalStateCache.absorb();
  if (absorb_state.isReprocessTarget(monster) && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(priority_templateObject9 || (priority_templateObject9 = priority_taggedTemplateLiteral(["Grey Goose"])))) < 6) return OverridePriority.None; // Determine if a monster is useful or not based on the combat goals

  if (task.orbtargets === undefined) {
    var _task$combat;

    var task_combat = (_task$combat = task.combat) !== null && _task$combat !== void 0 ? _task$combat : new combat_CombatStrategy();
    var next_monster_strategy = task_combat.currentStrategy(monster);
    var next_useless = (next_monster_strategy === "ignore" || next_monster_strategy === "ignoreNoBanish" || next_monster_strategy === "banish") && !absorb_state.isTarget(monster) && (!absorb_state.isReprocessTarget(monster) || (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(priority_templateObject10 || (priority_templateObject10 = priority_taggedTemplateLiteral(["Grey Goose"])))) < 6);
    var others_useless = task_combat.can("ignore") || task_combat.can("ignoreNoBanish") || task_combat.can("banish");
    var others_useful = absorb_state.hasTargets(task.do) || absorb_state.hasReprocessTargets(task.do) || task_combat.can("kill") || task_combat.can("killFree") || task_combat.can("killHard") || task_combat.can("killItem");

    if (next_useless && others_useful) {
      return OverridePriority.BadOrb;
    } else if (!next_useless && others_useless) {
      return OverridePriority.GoodOrb;
    } else {
      return OverridePriority.None;
    }
  } // Use orbtargets to decide if the next monster is useful


  var fromTask = task.orbtargets();
  if (fromTask === undefined) return OverridePriority.None;
  var targets = [].concat(priority_toConsumableArray(fromTask), priority_toConsumableArray(absorb_state.remainingAbsorbs(task.do)), priority_toConsumableArray(absorb_state.remainingReprocess(task.do)));
  if (targets.length === 0) return OverridePriority.None;

  if (targets.find(t => t === monster) === undefined) {
    return OverridePriority.BadOrb;
  } else {
    return OverridePriority.GoodOrb;
  }
}

function needsChargedGoose(task) {
  // Note that we purposefully do not check if we will be equipping the goose
  // in the location. We want to eventually reprocess everything, and so a
  // charged goose allows us to use the orb to target reprocess monsters.
  return task.do instanceof external_kolmafia_namespaceObject.Location && globalStateCache.absorb().hasReprocessTargets(task.do);
}
;// CONCATENATED MODULE: ./src/tasks/level1.ts
var level1_templateObject, level1_templateObject2;

function level1_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var TootQuest = {
  name: "Toot",
  tasks: [{
    name: "Start",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => step("questM05Toot") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Toot",
    after: ["Start"],
    priority: () => OverridePriority.Free,
    completed: () => step("questM05Toot") > 0,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("tutorial.php?action=toot"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Finish",
    after: ["Toot"],
    priority: () => OverridePriority.Free,
    completed: () => step("questM05Toot") > 0 && !have(template_string_$item(level1_templateObject || (level1_templateObject = level1_taggedTemplateLiteral(["letter from King Ralph XI"])))),
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(level1_templateObject2 || (level1_templateObject2 = level1_taggedTemplateLiteral(["letter from King Ralph XI"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level2.ts
var level2_templateObject, level2_templateObject2, level2_templateObject3;

function level2_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var MosquitoQuest = {
  name: "Mosquito",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(2),
    completed: () => step("questL02Larva") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Burn Delay",
    after: ["Start"],
    completed: () => $location(level2_templateObject || (level2_templateObject = level2_taggedTemplateLiteral(["The Spooky Forest"]))).turnsSpent >= 5 || step("questL02Larva") >= 1,
    do: $location(level2_templateObject2 || (level2_templateObject2 = level2_taggedTemplateLiteral(["The Spooky Forest"]))),
    choices: {
      502: 2,
      505: 1,
      334: 1
    },
    limit: {
      tries: 5
    },
    delay: 5
  }, {
    name: "Mosquito",
    after: ["Burn Delay"],
    completed: () => step("questL02Larva") >= 1,
    do: $location(level2_templateObject3 || (level2_templateObject3 = level2_taggedTemplateLiteral(["The Spooky Forest"]))),
    choices: {
      502: 2,
      505: 1,
      334: 1
    },
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Finish",
    after: ["Mosquito"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL02Larva") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level3.ts
var level3_templateObject, level3_templateObject2;

function level3_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var TavernQuest = {
  name: "Tavern",
  tasks: [{
    name: "Start",
    after: ["Mosquito/Finish"],
    ready: () => atLevel(3),
    completed: () => step("questL03Rat") >= 0,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Tavernkeep",
    after: ["Start"],
    completed: () => step("questL03Rat") >= 1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("tavern.php?place=barkeep"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Basement",
    after: ["Tavernkeep"],
    completed: () => step("questL03Rat") >= 2,
    priority: () => atLevel(17) || !have(template_string_$item(level3_templateObject || (level3_templateObject = level3_taggedTemplateLiteral(["backup camera"])))) ? OverridePriority.None : OverridePriority.BadGoose,
    // Wait for backup camera to max out
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("cellar.php");
      var layout = (0,external_kolmafia_namespaceObject.getProperty)("tavernLayout");
      var path = [3, 2, 1, 0, 5, 10, 15, 20, 16, 21];

      for (var i = 0; i < path.length; i++) {
        if (layout.charAt(path[i]) === "0") {
          (0,external_kolmafia_namespaceObject.visitUrl)("cellar.php?action=explore&whichspot=".concat(path[i] + 1));
          (0,external_kolmafia_namespaceObject.runCombat)();
          (0,external_kolmafia_namespaceObject.runChoice)(-1);
          break;
        }
      }
    },
    outfit: {
      modifier: "ML, +combat"
    },
    combat: new combat_CombatStrategy().kill($monster(level3_templateObject2 || (level3_templateObject2 = level3_taggedTemplateLiteral(["drunken rat king"])))).ignoreNoBanish(),
    choices: {
      509: 1,
      510: 1,
      511: 2,
      514: () => (0,external_kolmafia_namespaceObject.numericModifier)("Stench Damage") >= 20 ? 2 : 1,
      515: () => (0,external_kolmafia_namespaceObject.numericModifier)("Spooky Damage") >= 20 ? 2 : 1,
      496: () => (0,external_kolmafia_namespaceObject.numericModifier)("Hot Damage") >= 20 ? 2 : 1,
      513: () => (0,external_kolmafia_namespaceObject.numericModifier)("Cold Damage") >= 20 ? 2 : 1
    },
    limit: {
      tries: 10
    }
  }, {
    name: "Finish",
    after: ["Basement"],
    completed: () => step("questL03Rat") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("tavern.php?place=barkeep"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level4.ts
var level4_templateObject, level4_templateObject2, level4_templateObject3, level4_templateObject4, level4_templateObject5, level4_templateObject6, level4_templateObject7, level4_templateObject8, level4_templateObject9, level4_templateObject10, level4_templateObject11, level4_templateObject12, level4_templateObject13, level4_templateObject14, level4_templateObject15, level4_templateObject16, level4_templateObject17, level4_templateObject18, level4_templateObject19, level4_templateObject20, level4_templateObject21, level4_templateObject22, level4_templateObject23, level4_templateObject24, level4_templateObject25, level4_templateObject26, level4_templateObject27, level4_templateObject28, level4_templateObject29, level4_templateObject30, level4_templateObject31, level4_templateObject32, level4_templateObject33, level4_templateObject34, level4_templateObject35, level4_templateObject36, level4_templateObject37;

function level4_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var BatQuest = {
  name: "Bat",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(4),
    completed: () => step("questL04Bat") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Get Sonar 1",
    after: [],
    completed: () => step("questL04Bat") + (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level4_templateObject || (level4_templateObject = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))) >= 1,
    do: $location(level4_templateObject2 || (level4_templateObject2 = level4_taggedTemplateLiteral(["Guano Junction"]))),
    ready: () => stenchRes(true) >= 1,
    priority: () => have(template_string_$item(level4_templateObject3 || (level4_templateObject3 = level4_taggedTemplateLiteral(["industrial fire extinguisher"])))) || have($skill(level4_templateObject4 || (level4_templateObject4 = level4_taggedTemplateLiteral(["Double Nanovision"])))) ? OverridePriority.None : OverridePriority.BadMood,
    prepare: () => {
      if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 1) ensureEffect($effect(level4_templateObject5 || (level4_templateObject5 = level4_taggedTemplateLiteral(["Red Door Syndrome"]))));
      if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 1) throw "Unable to ensure stench res for guano junction";
    },
    post: () => {
      if (have(template_string_$item(level4_templateObject6 || (level4_templateObject6 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level4_templateObject7 || (level4_templateObject7 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))));
    },
    outfit: () => {
      if (have(template_string_$item(level4_templateObject8 || (level4_templateObject8 = level4_taggedTemplateLiteral(["industrial fire extinguisher"])))) && property_get("_fireExtinguisherCharge") >= 20 && !property_get("fireExtinguisherBatHoleUsed")) return {
        equip: template_string_$items(level4_templateObject9 || (level4_templateObject9 = level4_taggedTemplateLiteral(["industrial fire extinguisher"]))),
        modifier: "stench res"
      };else return {
        modifier: "item, 10 stench res"
      };
    },
    combat: new combat_CombatStrategy().macro(new Macro().trySkill($skill(level4_templateObject10 || (level4_templateObject10 = level4_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))))).kill($monster(level4_templateObject11 || (level4_templateObject11 = level4_taggedTemplateLiteral(["screambat"])))).killItem(),
    limit: {
      tries: 10
    }
  }, {
    name: "Use Sonar 1",
    after: ["Get Sonar 1"],
    completed: () => step("questL04Bat") >= 1,
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(level4_templateObject12 || (level4_templateObject12 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))),
    limit: {
      tries: 3
    },
    freeaction: true
  }, {
    name: "Get Sonar 2",
    after: ["Use Sonar 1"],
    completed: () => step("questL04Bat") + (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level4_templateObject13 || (level4_templateObject13 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))) >= 2,
    priority: () => step("questL11Shen") === 999 || have(template_string_$item(level4_templateObject14 || (level4_templateObject14 = level4_taggedTemplateLiteral(["The Stankara Stone"])))) || (0,external_kolmafia_namespaceObject.myDaycount)() === 1 && step("questL11Shen") > 1 ? OverridePriority.None : OverridePriority.BadMood,
    prepare: () => {
      if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 1) ensureEffect($effect(level4_templateObject15 || (level4_templateObject15 = level4_taggedTemplateLiteral(["Red Door Syndrome"]))));
      if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 1) throw "Unable to ensure stench res for guano junction";
    },
    do: $location(level4_templateObject16 || (level4_templateObject16 = level4_taggedTemplateLiteral(["Guano Junction"]))),
    post: () => {
      if (have(template_string_$item(level4_templateObject17 || (level4_templateObject17 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level4_templateObject18 || (level4_templateObject18 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))));
    },
    outfit: {
      modifier: "item, 10 stench res"
    },
    combat: new combat_CombatStrategy().kill($monster(level4_templateObject19 || (level4_templateObject19 = level4_taggedTemplateLiteral(["screambat"])))).killItem(),
    limit: {
      tries: 10
    }
  }, {
    name: "Use Sonar 2",
    after: ["Get Sonar 2"],
    completed: () => step("questL04Bat") >= 2,
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(level4_templateObject20 || (level4_templateObject20 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))),
    limit: {
      tries: 3
    },
    freeaction: true
  }, {
    name: "Get Sonar 3",
    after: ["Use Sonar 2"],
    completed: () => step("questL04Bat") + (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level4_templateObject21 || (level4_templateObject21 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))) >= 3,
    prepare: () => {
      if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 1) ensureEffect($effect(level4_templateObject22 || (level4_templateObject22 = level4_taggedTemplateLiteral(["Red Door Syndrome"]))));
      if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 1) throw "Unable to ensure stench res for guano junction";
    },
    do: $location(level4_templateObject23 || (level4_templateObject23 = level4_taggedTemplateLiteral(["Guano Junction"]))),
    post: () => {
      if (have(template_string_$item(level4_templateObject24 || (level4_templateObject24 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level4_templateObject25 || (level4_templateObject25 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))));
    },
    outfit: {
      modifier: "item, 10 stench res"
    },
    combat: new combat_CombatStrategy().kill($monster(level4_templateObject26 || (level4_templateObject26 = level4_taggedTemplateLiteral(["screambat"])))).killItem(),
    limit: {
      tries: 10
    }
  }, {
    name: "Use Sonar 3",
    after: ["Get Sonar 3"],
    completed: () => step("questL04Bat") >= 3,
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(level4_templateObject27 || (level4_templateObject27 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))),
    limit: {
      tries: 3
    },
    freeaction: true
  }, {
    name: "Lobsterfrogman Drop",
    after: ["Use Sonar 3"],
    ready: () => property_get("lastCopyableMonster") === $monster(level4_templateObject28 || (level4_templateObject28 = level4_taggedTemplateLiteral(["lobsterfrogman"]))),
    priority: () => property_get("lastCopyableMonster") === $monster(level4_templateObject29 || (level4_templateObject29 = level4_taggedTemplateLiteral(["lobsterfrogman"]))) ? OverridePriority.LastCopyableMonster : OverridePriority.None,
    completed: () => step("questL04Bat") >= 4 || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level4_templateObject30 || (level4_templateObject30 = level4_taggedTemplateLiteral(["barrel of gunpowder"])))) >= 5 || property_get("sidequestLighthouseCompleted") !== "none" || !have(template_string_$item(level4_templateObject31 || (level4_templateObject31 = level4_taggedTemplateLiteral(["backup camera"])))),
    do: $location(level4_templateObject32 || (level4_templateObject32 = level4_taggedTemplateLiteral(["The Boss Bat's Lair"]))),
    combat: new combat_CombatStrategy().macro(new Macro().trySkill($skill(level4_templateObject33 || (level4_templateObject33 = level4_taggedTemplateLiteral(["Back-Up to your Last Enemy"]))))).kill($monsters(level4_templateObject34 || (level4_templateObject34 = level4_taggedTemplateLiteral(["Boss Bat, lobsterfrogman"])))),
    outfit: {
      equip: template_string_$items(level4_templateObject35 || (level4_templateObject35 = level4_taggedTemplateLiteral(["backup camera"])))
    },
    limit: {
      tries: 4
    }
  }, {
    name: "Boss Bat",
    after: ["Bat/Use Sonar 3", "Lobsterfrogman Drop"],
    completed: () => step("questL04Bat") >= 4,
    do: $location(level4_templateObject36 || (level4_templateObject36 = level4_taggedTemplateLiteral(["The Boss Bat's Lair"]))),
    combat: new combat_CombatStrategy().kill($monster(level4_templateObject37 || (level4_templateObject37 = level4_taggedTemplateLiteral(["Boss Bat"])))).ignoreNoBanish(),
    limit: {
      soft: 10
    },
    delay: 6
  }, {
    name: "Finish",
    after: ["Boss Bat"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL04Bat") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level5.ts
var level5_templateObject, level5_templateObject2, level5_templateObject3, level5_templateObject4, level5_templateObject5, level5_templateObject6, level5_templateObject7, level5_templateObject8, level5_templateObject9, level5_templateObject10, level5_templateObject11, level5_templateObject12, level5_templateObject13, level5_templateObject14, level5_templateObject15, level5_templateObject16, level5_templateObject17, level5_templateObject18, level5_templateObject19, level5_templateObject20, level5_templateObject21, level5_templateObject22, level5_templateObject23, level5_templateObject24, level5_templateObject25, level5_templateObject26, level5_templateObject27, level5_templateObject28, level5_templateObject29, level5_templateObject30, level5_templateObject31, level5_templateObject32;

function level5_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var KnobQuest = {
  name: "Knob",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(5),
    completed: () => step("questL05Goblin") >= 0,
    prepare: () => {
      if (have(template_string_$item(level5_templateObject || (level5_templateObject = level5_taggedTemplateLiteral(["natural magick candle"]))))) ensureEffect($effect(level5_templateObject2 || (level5_templateObject2 = level5_taggedTemplateLiteral(["The Odour of Magick"]))));
    },
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Outskirts",
    after: [],
    completed: () => have(template_string_$item(level5_templateObject3 || (level5_templateObject3 = level5_taggedTemplateLiteral(["Knob Goblin encryption key"])))) || step("questL05Goblin") > 0,
    do: $location(level5_templateObject4 || (level5_templateObject4 = level5_taggedTemplateLiteral(["The Outskirts of Cobb's Knob"]))),
    choices: {
      111: 3,
      113: 2,
      118: 1
    },
    limit: {
      tries: 12
    },
    delay: 10
  }, {
    name: "Open Knob",
    after: ["Start", "Outskirts"],
    completed: () => step("questL05Goblin") >= 1,
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(level5_templateObject5 || (level5_templateObject5 = level5_taggedTemplateLiteral(["Cobb's Knob map"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Harem",
    after: ["Open Knob"],
    completed: () => have(template_string_$item(level5_templateObject6 || (level5_templateObject6 = level5_taggedTemplateLiteral(["Knob Goblin harem veil"])))) && have(template_string_$item(level5_templateObject7 || (level5_templateObject7 = level5_taggedTemplateLiteral(["Knob Goblin harem pants"])))),
    do: $location(level5_templateObject8 || (level5_templateObject8 = level5_taggedTemplateLiteral(["Cobb's Knob Harem"]))),
    outfit: () => {
      if (have(template_string_$item(level5_templateObject9 || (level5_templateObject9 = level5_taggedTemplateLiteral(["industrial fire extinguisher"])))) && property_get("_fireExtinguisherCharge") >= 20 && !property_get("fireExtinguisherHaremUsed")) return {
        equip: template_string_$items(level5_templateObject10 || (level5_templateObject10 = level5_taggedTemplateLiteral(["industrial fire extinguisher"])))
      };else return {
        modifier: "item",
        avoid: template_string_$items(level5_templateObject11 || (level5_templateObject11 = level5_taggedTemplateLiteral(["broken champagne bottle"])))
      };
    },
    combat: new combat_CombatStrategy().macro( // Always use the fire extinguisher on the guard
    new Macro().trySkill($skill(level5_templateObject12 || (level5_templateObject12 = level5_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"])))), $monster(level5_templateObject13 || (level5_templateObject13 = level5_taggedTemplateLiteral(["Knob Goblin Harem Guard"])))).macro( // Don't use the fire extinguisher if we want to absorb the madam
    () => new Macro().externalIf(!globalStateCache.absorb().isTarget($monster(level5_templateObject14 || (level5_templateObject14 = level5_taggedTemplateLiteral(["Knob Goblin Madam"])))), new Macro().trySkill($skill(level5_templateObject15 || (level5_templateObject15 = level5_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))))), $monster(level5_templateObject16 || (level5_templateObject16 = level5_taggedTemplateLiteral(["Knob Goblin Madam"])))).macro( // Don't use the fire extinguisher if we want to absorb the girl
    () => new Macro().externalIf(!globalStateCache.absorb().isTarget($monster(level5_templateObject17 || (level5_templateObject17 = level5_taggedTemplateLiteral(["Knob Goblin Harem Girl"])))), new Macro().trySkill($skill(level5_templateObject18 || (level5_templateObject18 = level5_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))))), $monster(level5_templateObject19 || (level5_templateObject19 = level5_taggedTemplateLiteral(["Knob Goblin Harem Girl"])))).banish($monster(level5_templateObject20 || (level5_templateObject20 = level5_taggedTemplateLiteral(["Knob Goblin Harem Guard"])))).killItem(),
    limit: {
      soft: 20
    } // Allow for Cobb's Knob lab key

  }, {
    name: "Perfume",
    after: ["Harem"],
    completed: () => have($effect(level5_templateObject21 || (level5_templateObject21 = level5_taggedTemplateLiteral(["Knob Goblin Perfume"])))) || have(template_string_$item(level5_templateObject22 || (level5_templateObject22 = level5_taggedTemplateLiteral(["Knob Goblin perfume"])))) || step("questL05Goblin") === 999,
    do: $location(level5_templateObject23 || (level5_templateObject23 = level5_taggedTemplateLiteral(["Cobb's Knob Harem"]))),
    outfit: {
      equip: template_string_$items(level5_templateObject24 || (level5_templateObject24 = level5_taggedTemplateLiteral(["Knob Goblin harem veil, Knob Goblin harem pants"])))
    },
    limit: {
      tries: 2
    } // Allow for Cobb's Knob lab key

  }, {
    name: "King",
    after: ["Harem", "Perfume"],
    priority: () => have($effect(level5_templateObject25 || (level5_templateObject25 = level5_taggedTemplateLiteral(["Knob Goblin Perfume"])))) ? OverridePriority.Effect : OverridePriority.None,
    completed: () => step("questL05Goblin") === 999,
    do: $location(level5_templateObject26 || (level5_templateObject26 = level5_taggedTemplateLiteral(["Throne Room"]))),
    combat: new combat_CombatStrategy().kill($monster(level5_templateObject27 || (level5_templateObject27 = level5_taggedTemplateLiteral(["Knob Goblin King"])))),
    outfit: {
      equip: template_string_$items(level5_templateObject28 || (level5_templateObject28 = level5_taggedTemplateLiteral(["Knob Goblin harem veil, Knob Goblin harem pants"]))),
      modifier: "moxie, -10ML"
    },
    effects: $effects(level5_templateObject29 || (level5_templateObject29 = level5_taggedTemplateLiteral(["Knob Goblin Perfume"]))),
    limit: {
      tries: 1
    },
    boss: true
  }, {
    name: "Open Menagerie",
    after: ["King"],
    completed: () => have(template_string_$item(level5_templateObject30 || (level5_templateObject30 = level5_taggedTemplateLiteral(["Cobb's Knob Menagerie key"])))),
    do: $location(level5_templateObject31 || (level5_templateObject31 = level5_taggedTemplateLiteral(["Cobb's Knob Laboratory"]))),
    combat: new combat_CombatStrategy().kill($monster(level5_templateObject32 || (level5_templateObject32 = level5_taggedTemplateLiteral(["Knob Goblin Very Mad Scientist"])))),
    limit: {
      soft: 15
    }
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level6.ts
var level6_templateObject, level6_templateObject2, level6_templateObject3, level6_templateObject4, level6_templateObject5, level6_templateObject6, level6_templateObject7, level6_templateObject8, level6_templateObject9, level6_templateObject10, level6_templateObject11, level6_templateObject12, level6_templateObject13, level6_templateObject14, level6_templateObject15, level6_templateObject16, level6_templateObject17, level6_templateObject18, level6_templateObject19, level6_templateObject20, level6_templateObject21, level6_templateObject22, level6_templateObject23, level6_templateObject24, level6_templateObject25, level6_templateObject26, level6_templateObject27;

function level6_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var FriarQuest = {
  name: "Friar",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(6),
    completed: () => step("questL06Friar") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Heart",
    after: ["Start"],
    completed: () => have(template_string_$item(level6_templateObject || (level6_templateObject = level6_taggedTemplateLiteral(["box of birthday candles"])))) || step("questL06Friar") === 999,
    do: $location(level6_templateObject2 || (level6_templateObject2 = level6_taggedTemplateLiteral(["The Dark Heart of the Woods"]))),
    outfit: () => {
      if (have(template_string_$item(level6_templateObject3 || (level6_templateObject3 = level6_taggedTemplateLiteral(["latte lovers member's mug"])))) && !property_get("latteUnlocks").includes("wing")) {
        return {
          modifier: "-combat",
          equip: template_string_$items(level6_templateObject4 || (level6_templateObject4 = level6_taggedTemplateLiteral(["latte lovers member's mug"])))
        };
      }

      return {
        modifier: "-combat"
      };
    },
    limit: {
      tries: 20
    }
  }, {
    name: "Neck",
    after: ["Start"],
    completed: () => have(template_string_$item(level6_templateObject5 || (level6_templateObject5 = level6_taggedTemplateLiteral(["dodecagram"])))) || step("questL06Friar") === 999,
    do: $location(level6_templateObject6 || (level6_templateObject6 = level6_taggedTemplateLiteral(["The Dark Neck of the Woods"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      1428: 2
    },
    limit: {
      tries: 20
    }
  }, {
    name: "Elbow",
    after: ["Start"],
    completed: () => have(template_string_$item(level6_templateObject7 || (level6_templateObject7 = level6_taggedTemplateLiteral(["eldritch butterknife"])))) || step("questL06Friar") === 999,
    do: $location(level6_templateObject8 || (level6_templateObject8 = level6_taggedTemplateLiteral(["The Dark Elbow of the Woods"]))),
    outfit: {
      modifier: "-combat"
    },
    limit: {
      tries: 20
    }
  }, {
    name: "Finish",
    after: ["Heart", "Neck", "Elbow", // Finish reprocessing first, since these zones close
    "Reprocess/The Dark Heart of the Woods", "Reprocess/The Dark Neck of the Woods", "Reprocess/The Dark Elbow of the Woods"],
    completed: () => step("questL06Friar") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("friars.php?action=ritual&pwd"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
var OrganQuest = {
  name: "Organ",
  tasks: [{
    name: "Start",
    after: ["Friar/Finish"],
    completed: () => step("questM10Azazel") >= 0,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=temp");
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=sven");
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Tutu",
    after: ["Start"],
    completed: () => have(template_string_$item(level6_templateObject9 || (level6_templateObject9 = level6_taggedTemplateLiteral(["Azazel's tutu"])))) || step("questM10Azazel") === 999,
    acquire: [{
      item: template_string_$item(level6_templateObject10 || (level6_templateObject10 = level6_taggedTemplateLiteral(["imp air"]))),
      num: 5
    }, {
      item: template_string_$item(level6_templateObject11 || (level6_templateObject11 = level6_taggedTemplateLiteral(["bus pass"]))),
      num: 5
    }],
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=moan"),
    limit: {
      tries: 2
    },
    freeaction: true
  }, {
    name: "Arena",
    after: ["Start"],
    completed: () => {
      if (step("questM10Azazel") === 999) return true;
      if (have(template_string_$item(level6_templateObject12 || (level6_templateObject12 = level6_taggedTemplateLiteral(["Azazel's unicorn"]))))) return true;

      var count = items => items.reduce((sum, item) => sum + (0,external_kolmafia_namespaceObject.itemAmount)(item), 0);

      if (count(template_string_$items(level6_templateObject13 || (level6_templateObject13 = level6_taggedTemplateLiteral(["giant marshmallow, beer-scented teddy bear, gin-soaked blotter paper"])))) < 2) return false;
      if (count(template_string_$items(level6_templateObject14 || (level6_templateObject14 = level6_taggedTemplateLiteral(["booze-soaked cherry, comfy pillow, sponge cake"])))) < 2) return false;
      return true;
    },
    do: $location(level6_templateObject15 || (level6_templateObject15 = level6_taggedTemplateLiteral(["Infernal Rackets Backstage"]))),
    limit: {
      soft: 30
    },
    outfit: {
      modifier: "-combat"
    }
  }, {
    name: "Unicorn",
    after: ["Arena"],
    completed: () => have(template_string_$item(level6_templateObject16 || (level6_templateObject16 = level6_taggedTemplateLiteral(["Azazel's unicorn"])))) || step("questM10Azazel") === 999,
    do: () => {
      var goals = {
        Bognort: template_string_$items(level6_templateObject17 || (level6_templateObject17 = level6_taggedTemplateLiteral(["giant marshmallow, gin-soaked blotter paper"]))),
        Stinkface: template_string_$items(level6_templateObject18 || (level6_templateObject18 = level6_taggedTemplateLiteral(["beer-scented teddy bear, gin-soaked blotter paper"]))),
        Flargwurm: template_string_$items(level6_templateObject19 || (level6_templateObject19 = level6_taggedTemplateLiteral(["booze-soaked cherry, sponge cake"]))),
        Jim: template_string_$items(level6_templateObject20 || (level6_templateObject20 = level6_taggedTemplateLiteral(["comfy pillow, sponge cake"])))
      };
      (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=sven");

      for (var _i = 0, _Object$keys = Object.keys(goals); _i < _Object$keys.length; _i++) {
        var member = _Object$keys[_i];
        if (goals[member].length === 0) throw "Unable to solve Azazel's arena quest";
        var item = have(goals[member][0]) ? (0,external_kolmafia_namespaceObject.toInt)(goals[member][0]) : (0,external_kolmafia_namespaceObject.toInt)(goals[member][1]);
        (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=sven&bandmember=".concat(member, "&togive=").concat(item, "&preaction=try"));
      }
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Comedy Club",
    after: ["Start"],
    completed: () => have(template_string_$item(level6_templateObject21 || (level6_templateObject21 = level6_taggedTemplateLiteral(["observational glasses"])))),
    do: $location(level6_templateObject22 || (level6_templateObject22 = level6_taggedTemplateLiteral(["The Laugh Floor"]))),
    outfit: {
      modifier: "+combat"
    },
    combat: new combat_CombatStrategy().kill($monsters(level6_templateObject23 || (level6_templateObject23 = level6_taggedTemplateLiteral(["Carbuncle Top, Larry of the Field of Signs, Victor the Insult Comic Hellhound"])))),
    limit: {
      soft: 30
    }
  }, {
    name: "Lollipop",
    after: ["Comedy Club"],
    completed: () => have(template_string_$item(level6_templateObject24 || (level6_templateObject24 = level6_taggedTemplateLiteral(["Azazel's lollipop"])))) || step("questM10Azazel") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=mourn&preaction=observe"),
    outfit: {
      equip: template_string_$items(level6_templateObject25 || (level6_templateObject25 = level6_taggedTemplateLiteral(["observational glasses"])))
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Azazel",
    after: ["Tutu", "Unicorn", "Lollipop"],
    completed: () => step("questM10Azazel") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php?action=temp"),
    limit: {
      tries: 1
    }
  }, {
    name: "Finish",
    after: ["Azazel"],
    completed: () => have($skill(level6_templateObject26 || (level6_templateObject26 = level6_taggedTemplateLiteral(["Liver of Steel"])))),
    do: () => (0,external_kolmafia_namespaceObject.drink)(template_string_$item(level6_templateObject27 || (level6_templateObject27 = level6_taggedTemplateLiteral(["steel margarita"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level7.ts
var level7_templateObject, level7_templateObject2, level7_templateObject3, level7_templateObject4, level7_templateObject5, level7_templateObject6, level7_templateObject7, level7_templateObject8, level7_templateObject9, level7_templateObject10, level7_templateObject11, level7_templateObject12, level7_templateObject13, level7_templateObject14, level7_templateObject15, level7_templateObject16, level7_templateObject17, level7_templateObject18, level7_templateObject19, level7_templateObject20, level7_templateObject21, level7_templateObject22, level7_templateObject23, level7_templateObject24, level7_templateObject25, level7_templateObject26, level7_templateObject27, level7_templateObject28, level7_templateObject29, level7_templateObject30, level7_templateObject31, level7_templateObject32, level7_templateObject33, level7_templateObject34, level7_templateObject35, level7_templateObject36, level7_templateObject37, level7_templateObject38, level7_templateObject39, level7_templateObject40, level7_templateObject41, level7_templateObject42;

function level7_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










function tuneCape() {
  if (have(template_string_$item(level7_templateObject || (level7_templateObject = level7_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) && (property_get("retroCapeSuperhero") !== "vampire" || property_get("retroCapeWashingInstructions") !== "kill")) {
    (0,external_kolmafia_namespaceObject.cliExecute)("retrocape vampire kill");
  }
}

function tryCape(sword) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  if (have(template_string_$item(level7_templateObject2 || (level7_templateObject2 = level7_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) {
    rest.unshift(template_string_$item(level7_templateObject3 || (level7_templateObject3 = level7_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))));
    rest.unshift(sword);
  }

  return rest;
}

var slay_macro = new Macro().trySkill($skill(level7_templateObject4 || (level7_templateObject4 = level7_taggedTemplateLiteral(["Slay the Dead"])))).attack().repeat();
var Alcove = [{
  name: "Alcove",
  after: ["Start"],
  prepare: tuneCape,
  ready: () => // Reprocess the grave rober, then wait for the +init skill
  (globalStateCache.absorb().hasReprocessTargets($location(level7_templateObject5 || (level7_templateObject5 = level7_taggedTemplateLiteral(["The Defiled Alcove"])))) || have($skill(level7_templateObject6 || (level7_templateObject6 = level7_taggedTemplateLiteral(["Overclocking"])))) || !!(property_get("twinPeakProgress") & 8)) && (0,external_kolmafia_namespaceObject.myBasestat)($stat(level7_templateObject7 || (level7_templateObject7 = level7_taggedTemplateLiteral(["Muscle"])))) >= 62,
  completed: () => property_get("cyrptAlcoveEvilness") <= 25,
  do: $location(level7_templateObject8 || (level7_templateObject8 = level7_taggedTemplateLiteral(["The Defiled Alcove"]))),
  outfit: () => {
    return {
      equip: tryCape(template_string_$item(level7_templateObject9 || (level7_templateObject9 = level7_taggedTemplateLiteral(["antique machete"]))), template_string_$item(level7_templateObject10 || (level7_templateObject10 = level7_taggedTemplateLiteral(["gravy boat"])))),
      modifier: "init 850max"
    };
  },
  // Modern zmobie does not show up in orb
  orbtargets: () => [],
  choices: {
    153: 4
  },
  combat: new combat_CombatStrategy().macro(slay_macro),
  limit: {
    turns: 25
  }
}, {
  name: "Alcove Boss",
  after: ["Start", "Alcove"],
  completed: () => property_get("cyrptAlcoveEvilness") === 0 && step("questL07Cyrptic") !== -1,
  do: $location(level7_templateObject11 || (level7_templateObject11 = level7_taggedTemplateLiteral(["The Defiled Alcove"]))),
  combat: new combat_CombatStrategy().kill(),
  boss: true,
  limit: {
    tries: 1
  }
}];
var Cranny = [{
  name: "Cranny",
  after: ["Start"],
  ready: () => (0,external_kolmafia_namespaceObject.myBasestat)($stat(level7_templateObject12 || (level7_templateObject12 = level7_taggedTemplateLiteral(["Muscle"])))) >= 62,
  completed: () => property_get("cyrptCrannyEvilness") <= 25,
  prepare: () => {
    tuneCape();
    (0,external_kolmafia_namespaceObject.changeMcd)(10);
  },
  post: () => {
    if ((0,external_kolmafia_namespaceObject.currentMcd)() > 0) (0,external_kolmafia_namespaceObject.changeMcd)(0);
  },
  do: $location(level7_templateObject13 || (level7_templateObject13 = level7_taggedTemplateLiteral(["The Defiled Cranny"]))),
  outfit: () => {
    return {
      equip: tryCape(template_string_$item(level7_templateObject14 || (level7_templateObject14 = level7_taggedTemplateLiteral(["antique machete"]))), template_string_$item(level7_templateObject15 || (level7_templateObject15 = level7_taggedTemplateLiteral(["gravy boat"]))), template_string_$item(level7_templateObject16 || (level7_templateObject16 = level7_taggedTemplateLiteral(["old patched suit-pants"])))),
      modifier: "-combat, ML"
    };
  },
  choices: {
    523: 4
  },
  combat: new combat_CombatStrategy().macro(slay_macro).kill($monsters(level7_templateObject17 || (level7_templateObject17 = level7_taggedTemplateLiteral(["swarm of ghuol whelps, big swarm of ghuol whelps, giant swarm of ghuol whelps, huge ghuol"])))),
  // Do not search for swarm with orb
  orbtargets: () => [],
  limit: {
    turns: 25
  }
}, {
  name: "Cranny Boss",
  after: ["Start", "Cranny"],
  completed: () => property_get("cyrptCrannyEvilness") === 0 && step("questL07Cyrptic") !== -1,
  do: $location(level7_templateObject18 || (level7_templateObject18 = level7_taggedTemplateLiteral(["The Defiled Cranny"]))),
  combat: new combat_CombatStrategy().killHard(),
  boss: true,
  limit: {
    tries: 1
  }
}];
var Niche = [{
  name: "Niche",
  after: ["Start"],
  prepare: tuneCape,
  ready: () => (0,external_kolmafia_namespaceObject.myBasestat)($stat(level7_templateObject19 || (level7_templateObject19 = level7_taggedTemplateLiteral(["Muscle"])))) >= 62,
  completed: () => property_get("cyrptNicheEvilness") <= 25,
  do: $location(level7_templateObject20 || (level7_templateObject20 = level7_taggedTemplateLiteral(["The Defiled Niche"]))),
  choices: {
    157: 4
  },
  outfit: () => {
    if (have(template_string_$item(level7_templateObject21 || (level7_templateObject21 = level7_taggedTemplateLiteral(["industrial fire extinguisher"])))) && property_get("_fireExtinguisherCharge") >= 20 && !property_get("fireExtinguisherCyrptUsed")) return {
      equip: template_string_$items(level7_templateObject22 || (level7_templateObject22 = level7_taggedTemplateLiteral(["gravy boat, industrial fire extinguisher"])))
    };else return {
      equip: tryCape(template_string_$item(level7_templateObject23 || (level7_templateObject23 = level7_taggedTemplateLiteral(["antique machete"]))), template_string_$item(level7_templateObject24 || (level7_templateObject24 = level7_taggedTemplateLiteral(["gravy boat"]))))
    };
  },
  combat: new combat_CombatStrategy().macro(slay_macro, $monster(level7_templateObject25 || (level7_templateObject25 = level7_taggedTemplateLiteral(["dirty old lihc"])))).macro( // Don't use the fire extinguisher if we want to absorb the lihc
  () => new Macro().externalIf(!globalStateCache.absorb().isTarget($monster(level7_templateObject26 || (level7_templateObject26 = level7_taggedTemplateLiteral(["basic lihc"])))), new Macro().trySkill($skill(level7_templateObject27 || (level7_templateObject27 = level7_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))))), $monster(level7_templateObject28 || (level7_templateObject28 = level7_taggedTemplateLiteral(["basic lihc"])))).macro(new Macro().trySkill($skill(level7_templateObject29 || (level7_templateObject29 = level7_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"])))).step(slay_macro), $monsters(level7_templateObject30 || (level7_templateObject30 = level7_taggedTemplateLiteral(["senile lihc, slick lihc"])))).banish($monsters(level7_templateObject31 || (level7_templateObject31 = level7_taggedTemplateLiteral(["basic lihc, senile lihc, slick lihc"])))),
  orbtargets: () => [$monster(level7_templateObject32 || (level7_templateObject32 = level7_taggedTemplateLiteral(["dirty old lihc"])))],
  limit: {
    turns: 25
  }
}, {
  name: "Niche Boss",
  after: ["Start", "Niche"],
  completed: () => property_get("cyrptNicheEvilness") === 0 && step("questL07Cyrptic") !== -1,
  do: $location(level7_templateObject33 || (level7_templateObject33 = level7_taggedTemplateLiteral(["The Defiled Niche"]))),
  combat: new combat_CombatStrategy().kill(),
  boss: true,
  limit: {
    tries: 1
  }
}];
var Nook = [{
  name: "Nook",
  after: ["Start"],
  prepare: tuneCape,
  ready: () => (0,external_kolmafia_namespaceObject.myBasestat)($stat(level7_templateObject34 || (level7_templateObject34 = level7_taggedTemplateLiteral(["Muscle"])))) >= 62,
  completed: () => property_get("cyrptNookEvilness") <= 25,
  do: $location(level7_templateObject35 || (level7_templateObject35 = level7_taggedTemplateLiteral(["The Defiled Nook"]))),
  post: () => {
    // Use evil eyes via chat until mafia tracking is fixed
    if (property_get("cyrptNookEvilness") > 25) (0,external_kolmafia_namespaceObject.cliExecute)("/use * evil eye"); // while (have($item`evil eye`) && get("cyrptNookEvilness") > 25) cliExecute("use * evil eye");
  },
  outfit: () => {
    return {
      equip: tryCape(template_string_$item(level7_templateObject36 || (level7_templateObject36 = level7_taggedTemplateLiteral(["antique machete"]))), template_string_$item(level7_templateObject37 || (level7_templateObject37 = level7_taggedTemplateLiteral(["gravy boat"])))),
      modifier: "item 500max"
    };
  },
  choices: {
    155: 5,
    1429: 1
  },
  combat: new combat_CombatStrategy().macro(slay_macro, $monsters(level7_templateObject38 || (level7_templateObject38 = level7_taggedTemplateLiteral(["spiny skelelton, toothy sklelton"])))).banish($monster(level7_templateObject39 || (level7_templateObject39 = level7_taggedTemplateLiteral(["party skelteon"])))),
  limit: {
    soft: 30
  }
}, {
  name: "Nook Eye",
  // In case we get eyes from outside sources (Nostalgia)
  after: ["Start"],
  ready: () => have(template_string_$item(level7_templateObject40 || (level7_templateObject40 = level7_taggedTemplateLiteral(["evil eye"])))),
  completed: () => property_get("cyrptNookEvilness") <= 25,
  do: () => {
    (0,external_kolmafia_namespaceObject.cliExecute)("use * evil eye");
  },
  freeaction: true,
  limit: {
    tries: 9
  }
}, {
  name: "Nook Boss",
  after: ["Start", "Nook", "Nook Eye"],
  completed: () => property_get("cyrptNookEvilness") === 0 && step("questL07Cyrptic") !== -1,
  do: $location(level7_templateObject41 || (level7_templateObject41 = level7_taggedTemplateLiteral(["The Defiled Nook"]))),
  combat: new combat_CombatStrategy().killItem(),
  boss: true,
  limit: {
    tries: 1
  }
}];
var CryptQuest = {
  name: "Crypt",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(7),
    completed: () => step("questL07Cyrptic") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }].concat(Alcove, Cranny, Niche, Nook, [{
    name: "Bonerdagon",
    after: ["Start", "Alcove Boss", "Cranny Boss", "Niche Boss", "Nook Boss"],
    completed: () => step("questL07Cyrptic") >= 1,
    do: $location(level7_templateObject42 || (level7_templateObject42 = level7_taggedTemplateLiteral(["Haert of the Cyrpt"]))),
    choices: {
      527: 1
    },
    combat: new combat_CombatStrategy().kill(),
    boss: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Finish",
    after: ["Start", "Bonerdagon"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL07Cyrptic") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level8.ts
var level8_templateObject, level8_templateObject2, level8_templateObject3, level8_templateObject4, level8_templateObject5, level8_templateObject6, level8_templateObject7, level8_templateObject8, level8_templateObject9, level8_templateObject10, level8_templateObject11, level8_templateObject12, level8_templateObject13, level8_templateObject14, level8_templateObject15, level8_templateObject16, level8_templateObject17, level8_templateObject18, level8_templateObject19, level8_templateObject20, level8_templateObject21, level8_templateObject22;

function level8_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }











var McLargeHugeQuest = {
  name: "McLargeHuge",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(8),
    completed: () => step("questL08Trapper") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Trapper Request",
    after: ["Start"],
    completed: () => step("questL08Trapper") >= 1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin"),
    limit: {
      tries: 1
    },
    priority: () => OverridePriority.Free,
    freeaction: true
  }, {
    name: "Clover Ore",
    after: ["Trapper Request", "Pull/Ore", "Misc/Hermit Clover"],
    ready: () => have(template_string_$item(level8_templateObject || (level8_templateObject = level8_taggedTemplateLiteral(["11-leaf clover"])))),
    prepare: () => {
      if (!have($effect(level8_templateObject2 || (level8_templateObject2 = level8_taggedTemplateLiteral(["Lucky!"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level8_templateObject3 || (level8_templateObject3 = level8_taggedTemplateLiteral(["11-leaf clover"]))));
    },
    completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level8_templateObject4 || (level8_templateObject4 = level8_taggedTemplateLiteral(["asbestos ore"])))) >= 3 || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level8_templateObject5 || (level8_templateObject5 = level8_taggedTemplateLiteral(["chrome ore"])))) >= 3 || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level8_templateObject6 || (level8_templateObject6 = level8_taggedTemplateLiteral(["linoleum ore"])))) >= 3 || step("questL08Trapper") >= 2 || summonStrategy.getSourceFor($monster(level8_templateObject7 || (level8_templateObject7 = level8_taggedTemplateLiteral(["mountain man"])))) !== undefined,
    do: $location(level8_templateObject8 || (level8_templateObject8 = level8_taggedTemplateLiteral(["Itznotyerzitz Mine"]))),
    limit: {
      tries: 2
    }
  }, {
    name: "Goatlet",
    after: ["Trapper Request"],
    completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level8_templateObject9 || (level8_templateObject9 = level8_taggedTemplateLiteral(["goat cheese"])))) >= 3 || step("questL08Trapper") >= 2,
    do: $location(level8_templateObject10 || (level8_templateObject10 = level8_taggedTemplateLiteral(["The Goatlet"]))),
    outfit: {
      modifier: "item",
      avoid: template_string_$items(level8_templateObject11 || (level8_templateObject11 = level8_taggedTemplateLiteral(["broken champagne bottle"])))
    },
    combat: new combat_CombatStrategy().killItem($monster(level8_templateObject12 || (level8_templateObject12 = level8_taggedTemplateLiteral(["dairy goat"])))).banish($monsters(level8_templateObject13 || (level8_templateObject13 = level8_taggedTemplateLiteral(["drunk goat, sabre-toothed goat"])))),
    limit: {
      soft: 15
    }
  }, {
    name: "Trapper Return",
    after: ["Goatlet", "Pull/Ore", "Summon/Mountain Man", "Clover Ore"],
    completed: () => step("questL08Trapper") >= 2,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Ninja",
    after: ["Trapper Return", "Summon/White Lion", "Palindome/Cold Snake"],
    completed: () => have(template_string_$item(level8_templateObject14 || (level8_templateObject14 = level8_taggedTemplateLiteral(["ninja rope"])))) && have(template_string_$item(level8_templateObject15 || (level8_templateObject15 = level8_taggedTemplateLiteral(["ninja carabiner"])))) && have(template_string_$item(level8_templateObject16 || (level8_templateObject16 = level8_taggedTemplateLiteral(["ninja crampons"])))) || step("questL08Trapper") >= 3,
    prepare: () => {
      fillHp();
    },
    do: $location(level8_templateObject17 || (level8_templateObject17 = level8_taggedTemplateLiteral(["Lair of the Ninja Snowmen"]))),
    outfit: {
      modifier: "50 combat, init"
    },
    limit: {
      soft: 20
    },
    combat: new combat_CombatStrategy().killHard([$monster(level8_templateObject18 || (level8_templateObject18 = level8_taggedTemplateLiteral(["Frozen Solid Snake"]))), $monster(level8_templateObject19 || (level8_templateObject19 = level8_taggedTemplateLiteral(["ninja snowman assassin"])))]),
    orbtargets: () => [] // no assassins in orbs

  }, {
    name: "Climb",
    after: ["Trapper Return", "Ninja"],
    completed: () => step("questL08Trapper") >= 3,
    ready: () => coldRes(true) >= 5,
    prepare: () => {
      if ((0,external_kolmafia_namespaceObject.numericModifier)("cold resistance") < 5) ensureEffect($effect(level8_templateObject20 || (level8_templateObject20 = level8_taggedTemplateLiteral(["Red Door Syndrome"]))));
      if ((0,external_kolmafia_namespaceObject.numericModifier)("cold resistance") < 5) throw "Unable to ensure cold res for The Icy Peak";
    },
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=cloudypeak");
    },
    outfit: {
      modifier: "cold res"
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Peak",
    after: ["Climb"],
    completed: () => step("questL08Trapper") >= 5,
    ready: () => coldRes(true) >= 5,
    prepare: () => {
      if ((0,external_kolmafia_namespaceObject.numericModifier)("cold resistance") < 5) ensureEffect($effect(level8_templateObject21 || (level8_templateObject21 = level8_taggedTemplateLiteral(["Red Door Syndrome"]))));
      if ((0,external_kolmafia_namespaceObject.numericModifier)("cold resistance") < 5) throw "Unable to ensure cold res for The Icy Peak";
    },
    do: $location(level8_templateObject22 || (level8_templateObject22 = level8_taggedTemplateLiteral(["Mist-Shrouded Peak"]))),
    outfit: {
      modifier: "cold res"
    },
    combat: new combat_CombatStrategy().kill(),
    boss: true,
    limit: {
      tries: 4
    }
  }, {
    name: "Finish",
    after: ["Peak"],
    completed: () => step("questL08Trapper") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level9.ts
var level9_templateObject, level9_templateObject2, level9_templateObject3, level9_templateObject4, level9_templateObject5, level9_templateObject6, level9_templateObject7, level9_templateObject8, level9_templateObject9, level9_templateObject10, level9_templateObject11, level9_templateObject12, level9_templateObject13, level9_templateObject14, level9_templateObject15, level9_templateObject16, level9_templateObject17, level9_templateObject18, level9_templateObject19, level9_templateObject20, level9_templateObject21, level9_templateObject22, level9_templateObject23, level9_templateObject24, level9_templateObject25, level9_templateObject26, level9_templateObject27, level9_templateObject28, level9_templateObject29, level9_templateObject30, level9_templateObject31, level9_templateObject32, level9_templateObject33, level9_templateObject34, level9_templateObject35, level9_templateObject36, level9_templateObject37, level9_templateObject38, level9_templateObject39, level9_templateObject40, level9_templateObject41, level9_templateObject42, level9_templateObject43, level9_templateObject44, level9_templateObject45, level9_templateObject46, level9_templateObject47, level9_templateObject48, level9_templateObject49, level9_templateObject50, level9_templateObject51, level9_templateObject52, level9_templateObject53, level9_templateObject54, level9_templateObject55, level9_templateObject56, level9_templateObject57, level9_templateObject58, level9_templateObject59, level9_templateObject60, level9_templateObject61, level9_templateObject62, level9_templateObject63, level9_templateObject64, level9_templateObject65, level9_templateObject66, level9_templateObject67, level9_templateObject68, level9_templateObject69, level9_templateObject70;

function level9_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










var ABoo = [{
  name: "ABoo Start",
  after: ["Start Peaks"],
  completed: () => $location(level9_templateObject || (level9_templateObject = level9_taggedTemplateLiteral(["A-Boo Peak"]))).noncombatQueue.includes("Faction Traction = Inaction") || property_get("booPeakProgress") < 100,
  do: $location(level9_templateObject2 || (level9_templateObject2 = level9_taggedTemplateLiteral(["A-Boo Peak"]))),
  limit: {
    tries: 1
  }
}, {
  name: "ABoo Clues",
  after: ["ABoo Start"],
  completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level9_templateObject3 || (level9_templateObject3 = level9_taggedTemplateLiteral(["A-Boo clue"])))) * 30 >= property_get("booPeakProgress"),
  do: $location(level9_templateObject4 || (level9_templateObject4 = level9_taggedTemplateLiteral(["A-Boo Peak"]))),
  outfit: {
    modifier: "item",
    equip: template_string_$items(level9_templateObject5 || (level9_templateObject5 = level9_taggedTemplateLiteral(["Space Trip safety headphones, HOA regulation book"])))
  },
  combat: new combat_CombatStrategy().macro(() => (0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") < -45 ? new Macro() : new Macro().attack().repeat() // Attack the ghost directly if ML is too high
  ).killItem(),
  choices: {
    611: 1,
    1430: 1
  },
  limit: {
    soft: 15
  }
}, {
  name: "ABoo Horror",
  after: ["ABoo Start", "Absorb/The Batrat and Ratbat Burrow", "Absorb/The Spooky Forest", "Absorb/The eXtreme Slope", "Absorb/A-Boo Peak"],
  ready: () => have(template_string_$item(level9_templateObject6 || (level9_templateObject6 = level9_taggedTemplateLiteral(["A-Boo clue"])))),
  completed: () => property_get("booPeakProgress") === 0,
  prepare: () => {
    if (have(template_string_$item(level9_templateObject7 || (level9_templateObject7 = level9_taggedTemplateLiteral(["pec oil"]))))) ensureEffect($effect(level9_templateObject8 || (level9_templateObject8 = level9_taggedTemplateLiteral(["Oiled-Up"]))));
    (0,external_kolmafia_namespaceObject.use)(template_string_$item(level9_templateObject9 || (level9_templateObject9 = level9_taggedTemplateLiteral(["A-Boo clue"]))));
    fillHp();
  },
  do: $location(level9_templateObject10 || (level9_templateObject10 = level9_taggedTemplateLiteral(["A-Boo Peak"]))),
  effects: $effects(level9_templateObject11 || (level9_templateObject11 = level9_taggedTemplateLiteral(["Red Door Syndrome"]))),
  outfit: {
    modifier: "20 spooky res, 20 cold res, HP",
    familiar: template_string_$familiar(level9_templateObject12 || (level9_templateObject12 = level9_taggedTemplateLiteral(["Exotic Parrot"]))),
    skipDefaults: true
  },
  choices: {
    611: 1
  },
  limit: {
    tries: 5
  },
  freeaction: true,
  expectbeatenup: true
}, {
  name: "ABoo Peak",
  after: ["ABoo Clues", "ABoo Horror"],
  completed: () => property_get("booPeakLit"),
  do: $location(level9_templateObject13 || (level9_templateObject13 = level9_taggedTemplateLiteral(["A-Boo Peak"]))),
  limit: {
    tries: 1
  }
}];
var Oil = [{
  name: "Oil Kill",
  after: ["Start Peaks"],
  completed: () => property_get("oilPeakProgress") === 0,
  prepare: () => {
    if ((0,external_kolmafia_namespaceObject.myMp)() < 80 && (0,external_kolmafia_namespaceObject.myMaxmp)() >= 80) (0,external_kolmafia_namespaceObject.restoreMp)(80 - (0,external_kolmafia_namespaceObject.myMp)());
    if ((0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") < 100) (0,external_kolmafia_namespaceObject.changeMcd)(10);
  },
  post: () => {
    if ((0,external_kolmafia_namespaceObject.currentMcd)() > 0) (0,external_kolmafia_namespaceObject.changeMcd)(0);
  },
  do: $location(level9_templateObject14 || (level9_templateObject14 = level9_taggedTemplateLiteral(["Oil Peak"]))),
  outfit: () => {
    if (have(template_string_$item(level9_templateObject15 || (level9_templateObject15 = level9_taggedTemplateLiteral(["unbreakable umbrella"]))))) return {
      modifier: "ML 80 max, 0.1 item",
      equip: template_string_$items(level9_templateObject16 || (level9_templateObject16 = level9_taggedTemplateLiteral(["unbreakable umbrella"])))
    };else return {
      modifier: "ML 100 max, 0.1 item"
    };
  },
  combat: new combat_CombatStrategy().killItem(),
  limit: {
    tries: 18
  },
  orbtargets: undefined
}, {
  name: "Oil Peak",
  after: ["Oil Kill"],
  completed: () => property_get("oilPeakLit"),
  do: $location(level9_templateObject17 || (level9_templateObject17 = level9_taggedTemplateLiteral(["Oil Peak"]))),
  limit: {
    tries: 1
  },
  orbtargets: undefined
}, {
  name: "Oil Jar",
  // get oil for jar of oil
  after: ["Oil Peak"],
  completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level9_templateObject18 || (level9_templateObject18 = level9_taggedTemplateLiteral(["bubblin' crude"])))) >= 12 || have(template_string_$item(level9_templateObject19 || (level9_templateObject19 = level9_taggedTemplateLiteral(["jar of oil"])))) || !!(property_get("twinPeakProgress") & 4),
  do: $location(level9_templateObject20 || (level9_templateObject20 = level9_taggedTemplateLiteral(["Oil Peak"]))),
  outfit: () => {
    if (have(template_string_$item(level9_templateObject21 || (level9_templateObject21 = level9_taggedTemplateLiteral(["unbreakable umbrella"]))))) return {
      modifier: "ML 80 max, 0.1 item, monster level percent",
      equip: template_string_$items(level9_templateObject22 || (level9_templateObject22 = level9_taggedTemplateLiteral(["unbreakable umbrella"])))
    };else return {
      modifier: "ML, 0.1 item"
    };
  },
  combat: new combat_CombatStrategy().killItem(),
  limit: {
    soft: 5
  },
  orbtargets: undefined
}];
var Twin = [{
  name: "Twin Stench Search",
  after: ["Start Peaks"],
  ready: () => !have(template_string_$item(level9_templateObject23 || (level9_templateObject23 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))) && stenchRes(true) >= 4,
  completed: () => !!(property_get("twinPeakProgress") & 1),
  prepare: () => {
    if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 4) ensureEffect($effect(level9_templateObject24 || (level9_templateObject24 = level9_taggedTemplateLiteral(["Red Door Syndrome"]))));
    if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 4) throw "Unable to ensure cold res for The Icy Peak";
  },
  do: $location(level9_templateObject25 || (level9_templateObject25 = level9_taggedTemplateLiteral(["Twin Peak"]))),
  choices: {
    606: 1,
    607: 1
  },
  outfit: {
    modifier: "100 stench res, -combat, item"
  },
  combat: new combat_CombatStrategy().killItem($monsters(level9_templateObject26 || (level9_templateObject26 = level9_taggedTemplateLiteral(["bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal"])))),
  limit: {
    soft: 10
  }
}, {
  name: "Twin Stench",
  after: ["Start Peaks"],
  ready: () => have(template_string_$item(level9_templateObject27 || (level9_templateObject27 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))) && stenchRes(true) >= 4,
  completed: () => !!(property_get("twinPeakProgress") & 1),
  prepare: () => {
    if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 4) ensureEffect($effect(level9_templateObject28 || (level9_templateObject28 = level9_taggedTemplateLiteral(["Red Door Syndrome"]))));
    if ((0,external_kolmafia_namespaceObject.numericModifier)("stench resistance") < 4) throw "Unable to ensure cold res for The Icy Peak";
  },
  do: () => {
    (0,external_kolmafia_namespaceObject.use)(template_string_$item(level9_templateObject29 || (level9_templateObject29 = level9_taggedTemplateLiteral(["rusty hedge trimmers"]))));
  },
  choices: {
    606: 1,
    607: 1
  },
  outfit: {
    modifier: "stench res"
  },
  limit: {
    tries: 1
  }
}, {
  name: "Twin Item Search",
  after: ["Start Peaks"],
  ready: () => !have(template_string_$item(level9_templateObject30 || (level9_templateObject30 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!(property_get("twinPeakProgress") & 2),
  do: $location(level9_templateObject31 || (level9_templateObject31 = level9_taggedTemplateLiteral(["Twin Peak"]))),
  choices: {
    606: 2,
    608: 1
  },
  outfit: {
    modifier: "item 50min, -combat"
  },
  combat: new combat_CombatStrategy().killItem($monsters(level9_templateObject32 || (level9_templateObject32 = level9_taggedTemplateLiteral(["bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal"])))),
  limit: {
    soft: 10
  }
}, {
  name: "Twin Item",
  after: ["Start Peaks"],
  ready: () => have(template_string_$item(level9_templateObject33 || (level9_templateObject33 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!(property_get("twinPeakProgress") & 2),
  do: () => {
    (0,external_kolmafia_namespaceObject.use)(template_string_$item(level9_templateObject34 || (level9_templateObject34 = level9_taggedTemplateLiteral(["rusty hedge trimmers"]))));
  },
  choices: {
    606: 2,
    608: 1
  },
  outfit: {
    modifier: "item 50min"
  },
  limit: {
    tries: 1
  }
}, {
  name: "Twin Oil Search",
  after: ["Start Peaks", "Oil Jar"],
  ready: () => !have(template_string_$item(level9_templateObject35 || (level9_templateObject35 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!(property_get("twinPeakProgress") & 4),
  do: $location(level9_templateObject36 || (level9_templateObject36 = level9_taggedTemplateLiteral(["Twin Peak"]))),
  choices: {
    606: 3,
    609: 1,
    616: 1
  },
  outfit: {
    modifier: "item, -combat"
  },
  combat: new combat_CombatStrategy().killItem($monsters(level9_templateObject37 || (level9_templateObject37 = level9_taggedTemplateLiteral(["bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal"])))),
  acquire: [{
    item: template_string_$item(level9_templateObject38 || (level9_templateObject38 = level9_taggedTemplateLiteral(["jar of oil"])))
  }],
  limit: {
    soft: 10
  }
}, {
  name: "Twin Oil",
  after: ["Start Peaks", "Oil Jar"],
  ready: () => have(template_string_$item(level9_templateObject39 || (level9_templateObject39 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!(property_get("twinPeakProgress") & 4),
  do: () => {
    (0,external_kolmafia_namespaceObject.use)(template_string_$item(level9_templateObject40 || (level9_templateObject40 = level9_taggedTemplateLiteral(["rusty hedge trimmers"]))));
  },
  choices: {
    606: 3,
    609: 1,
    616: 1
  },
  acquire: [{
    item: template_string_$item(level9_templateObject41 || (level9_templateObject41 = level9_taggedTemplateLiteral(["jar of oil"])))
  }],
  limit: {
    tries: 1
  }
}, {
  name: "Twin Init Search",
  after: ["Twin Stench", "Twin Item", "Twin Oil", "Twin Stench Search", "Twin Item Search", "Twin Oil Search"],
  ready: () => !have(template_string_$item(level9_templateObject42 || (level9_templateObject42 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!(property_get("twinPeakProgress") & 8),
  do: $location(level9_templateObject43 || (level9_templateObject43 = level9_taggedTemplateLiteral(["Twin Peak"]))),
  choices: {
    606: 4,
    610: 1,
    1056: 1
  },
  outfit: {
    modifier: "init 40 min, item, -combat"
  },
  combat: new combat_CombatStrategy().killItem($monsters(level9_templateObject44 || (level9_templateObject44 = level9_taggedTemplateLiteral(["bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal"])))),
  limit: {
    soft: 10
  }
}, {
  name: "Twin Init",
  after: ["Twin Stench", "Twin Item", "Twin Oil", "Twin Stench Search", "Twin Item Search", "Twin Oil Search"],
  ready: () => have(template_string_$item(level9_templateObject45 || (level9_templateObject45 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!(property_get("twinPeakProgress") & 8),
  do: () => {
    (0,external_kolmafia_namespaceObject.use)(template_string_$item(level9_templateObject46 || (level9_templateObject46 = level9_taggedTemplateLiteral(["rusty hedge trimmers"]))));
  },
  choices: {
    606: 4,
    610: 1,
    1056: 1
  },
  limit: {
    tries: 1
  }
}];
var ChasmQuest = {
  name: "Orc Chasm",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(9),
    completed: () => step("questL09Topping") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Bridge",
    after: ["Start", "Macguffin/Forest"],
    // Wait for black paint
    ready: () => (have(template_string_$item(level9_templateObject47 || (level9_templateObject47 = level9_taggedTemplateLiteral(["frozen jeans"])))) || have(template_string_$item(level9_templateObject48 || (level9_templateObject48 = level9_taggedTemplateLiteral(["industrial fire extinguisher"])))) || have(template_string_$item(level9_templateObject49 || (level9_templateObject49 = level9_taggedTemplateLiteral(["June cleaver"])))) && property_get("_juneCleaverCold", 0) >= 5 || have($skill(level9_templateObject50 || (level9_templateObject50 = level9_taggedTemplateLiteral(["Cryocurrency"])))) || have($skill(level9_templateObject51 || (level9_templateObject51 = level9_taggedTemplateLiteral(["Cooling Tubules"])))) || have($skill(level9_templateObject52 || (level9_templateObject52 = level9_taggedTemplateLiteral(["Snow-Cooling System"]))))) && property_get("smutOrcNoncombatProgress") < 15 || (have($effect(level9_templateObject53 || (level9_templateObject53 = level9_taggedTemplateLiteral(["Red Door Syndrome"])))) || (0,external_kolmafia_namespaceObject.myMeat)() >= 1000) && (0,external_kolmafia_namespaceObject.myBasestat)($stat(level9_templateObject54 || (level9_templateObject54 = level9_taggedTemplateLiteral(["Moxie"])))) >= 400,
    completed: () => step("questL09Topping") >= 1,
    prepare: () => {
      if (property_get("smutOrcNoncombatProgress") >= 15 && step("questL11Black") >= 2) {
        ensureEffect($effect(level9_templateObject55 || (level9_templateObject55 = level9_taggedTemplateLiteral(["Red Door Syndrome"]))));
        ensureEffect($effect(level9_templateObject56 || (level9_templateObject56 = level9_taggedTemplateLiteral(["Butt-Rock Hair"]))));
      }
    },
    do: $location(level9_templateObject57 || (level9_templateObject57 = level9_taggedTemplateLiteral(["The Smut Orc Logging Camp"]))),
    post: () => {
      if (have(template_string_$item(level9_templateObject58 || (level9_templateObject58 = level9_taggedTemplateLiteral(["smut orc keepsake box"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level9_templateObject59 || (level9_templateObject59 = level9_taggedTemplateLiteral(["smut orc keepsake box"]))));
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=orc_chasm&action=bridge".concat(property_get("chasmBridgeProgress"))); // use existing materials
    },
    outfit: () => {
      if (property_get("smutOrcNoncombatProgress") < 15) {
        var equip = template_string_$items(level9_templateObject60 || (level9_templateObject60 = level9_taggedTemplateLiteral(["Space Trip safety headphones, HOA regulation book"])));

        if (!have($skill(level9_templateObject61 || (level9_templateObject61 = level9_taggedTemplateLiteral(["Cryocurrency"])))) && !have($skill(level9_templateObject62 || (level9_templateObject62 = level9_taggedTemplateLiteral(["Cooling Tubules"])))) && !have($skill(level9_templateObject63 || (level9_templateObject63 = level9_taggedTemplateLiteral(["Snow-Cooling System"]))))) {
          if (have(template_string_$item(level9_templateObject64 || (level9_templateObject64 = level9_taggedTemplateLiteral(["frozen jeans"]))))) equip.push(template_string_$item(level9_templateObject65 || (level9_templateObject65 = level9_taggedTemplateLiteral(["frozen jeans"]))));else if (have(template_string_$item(level9_templateObject66 || (level9_templateObject66 = level9_taggedTemplateLiteral(["June cleaver"])))) && property_get("_juneCleaverCold", 0) >= 5) equip.push(template_string_$item(level9_templateObject67 || (level9_templateObject67 = level9_taggedTemplateLiteral(["June cleaver"]))));else if (have(template_string_$item(level9_templateObject68 || (level9_templateObject68 = level9_taggedTemplateLiteral(["industrial fire extinguisher"]))))) equip.push(template_string_$item(level9_templateObject69 || (level9_templateObject69 = level9_taggedTemplateLiteral(["industrial fire extinguisher"]))));
        }

        return {
          modifier: "item, -ML",
          equip: equip
        };
      } else return {
        modifier: "sleaze res",
        equip: template_string_$items(level9_templateObject70 || (level9_templateObject70 = level9_taggedTemplateLiteral(["combat lover's locket"])))
      };
    },
    combat: new combat_CombatStrategy().macro(new Macro().attack().repeat()).ignore(),
    choices: {
      1345: 3
    },
    freeaction: () => property_get("smutOrcNoncombatProgress") >= 15,
    limit: {
      soft: 45
    }
  }, {
    name: "Start Peaks",
    after: ["Bridge"],
    completed: () => step("questL09Topping") >= 2,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=highlands&action=highlands_dude");
      (0,external_kolmafia_namespaceObject.council)();
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }].concat(ABoo, Oil, Twin, [{
    name: "Finish",
    after: ["ABoo Peak", "Oil Peak", "Twin Init", "Twin Init Search"],
    completed: () => step("questL09Topping") === 999,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=highlands&action=highlands_dude");
      (0,external_kolmafia_namespaceObject.council)();
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level10.ts
var level10_templateObject, level10_templateObject2, level10_templateObject3, level10_templateObject4, level10_templateObject5, level10_templateObject6, level10_templateObject7, level10_templateObject8, level10_templateObject9, level10_templateObject10, level10_templateObject11, level10_templateObject12, level10_templateObject13, level10_templateObject14, level10_templateObject15, level10_templateObject16, level10_templateObject17, level10_templateObject18, level10_templateObject19, level10_templateObject20, level10_templateObject21, level10_templateObject22, level10_templateObject23, level10_templateObject24, level10_templateObject25, level10_templateObject26, level10_templateObject27, level10_templateObject28, level10_templateObject29, level10_templateObject30, level10_templateObject31, level10_templateObject32, level10_templateObject33, level10_templateObject34, level10_templateObject35, level10_templateObject36, level10_templateObject37, level10_templateObject38;

function level10_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var GiantQuest = {
  name: "Giant",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(10),
    completed: () => step("questL10Garbage") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Get Bean",
    after: ["Bat/Use Sonar 2"],
    completed: () => have(template_string_$item(level10_templateObject || (level10_templateObject = level10_taggedTemplateLiteral(["enchanted bean"])))) || step("questL10Garbage") >= 1,
    do: $location(level10_templateObject2 || (level10_templateObject2 = level10_taggedTemplateLiteral(["The Beanbat Chamber"]))),
    outfit: {
      modifier: "item",
      avoid: template_string_$items(level10_templateObject3 || (level10_templateObject3 = level10_taggedTemplateLiteral(["broken champagne bottle"])))
    },
    combat: new combat_CombatStrategy().killItem($monster(level10_templateObject4 || (level10_templateObject4 = level10_taggedTemplateLiteral(["beanbat"])))),
    limit: {
      soft: 5
    }
  }, {
    name: "Grow Beanstalk",
    after: ["Start", "Get Bean"],
    completed: () => step("questL10Garbage") >= 1,
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(level10_templateObject5 || (level10_templateObject5 = level10_taggedTemplateLiteral(["enchanted bean"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }, yellowray({
    name: "Airship YR Healer",
    after: ["Grow Beanstalk"],
    completed: () => have(template_string_$item(level10_templateObject6 || (level10_templateObject6 = level10_taggedTemplateLiteral(["amulet of extreme plot significance"])))),
    do: $location(level10_templateObject7 || (level10_templateObject7 = level10_taggedTemplateLiteral(["The Penultimate Fantasy Airship"]))),
    choices: {
      178: 2,
      182: () => have(template_string_$item(level10_templateObject8 || (level10_templateObject8 = level10_taggedTemplateLiteral(["model airship"])))) ? 1 : 4
    },
    post: () => {
      if (have($effect(level10_templateObject9 || (level10_templateObject9 = level10_taggedTemplateLiteral(["Temporary Amnesia"]))))) (0,external_kolmafia_namespaceObject.cliExecute)("uneffect Temporary Amnesia");
    },
    orbtargets: () => undefined,
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 50
    },
    delay: () => have(template_string_$item(level10_templateObject10 || (level10_templateObject10 = level10_taggedTemplateLiteral(["Plastic Wrap Immateria"])))) ? 25 : have(template_string_$item(level10_templateObject11 || (level10_templateObject11 = level10_taggedTemplateLiteral(["Gauze Immateria"])))) ? 20 : 15,
    // After that, just look for noncombats
    combat: new combat_CombatStrategy().killItem($monster(level10_templateObject12 || (level10_templateObject12 = level10_taggedTemplateLiteral(["Burly Sidekick"])))).killItem($monster(level10_templateObject13 || (level10_templateObject13 = level10_taggedTemplateLiteral(["Quiet Healer"]))))
  }, {
    modifier: "-combat, item",
    avoid: template_string_$items(level10_templateObject14 || (level10_templateObject14 = level10_taggedTemplateLiteral(["broken champagne bottle"])))
  }, $monster(level10_templateObject15 || (level10_templateObject15 = level10_taggedTemplateLiteral(["Quiet Healer"])))), {
    name: "Airship",
    after: ["Airship YR Healer"],
    completed: () => have(template_string_$item(level10_templateObject16 || (level10_templateObject16 = level10_taggedTemplateLiteral(["S.O.C.K."])))),
    do: $location(level10_templateObject17 || (level10_templateObject17 = level10_taggedTemplateLiteral(["The Penultimate Fantasy Airship"]))),
    choices: {
      178: 2,
      182: () => have(template_string_$item(level10_templateObject18 || (level10_templateObject18 = level10_taggedTemplateLiteral(["model airship"])))) ? 1 : 4
    },
    post: () => {
      if (have($effect(level10_templateObject19 || (level10_templateObject19 = level10_taggedTemplateLiteral(["Temporary Amnesia"]))))) (0,external_kolmafia_namespaceObject.cliExecute)("uneffect Temporary Amnesia");
    },
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 50
    },
    delay: () => have(template_string_$item(level10_templateObject20 || (level10_templateObject20 = level10_taggedTemplateLiteral(["Plastic Wrap Immateria"])))) ? 25 : have(template_string_$item(level10_templateObject21 || (level10_templateObject21 = level10_taggedTemplateLiteral(["Gauze Immateria"])))) ? 20 : 15,
    // After that, just look for noncombats
    combat: new combat_CombatStrategy().killItem($monsters(level10_templateObject22 || (level10_templateObject22 = level10_taggedTemplateLiteral(["Quiet Healer, Burly Sidekick"]))))
  }, {
    name: "Basement Search",
    after: ["Airship"],
    completed: () => (0,external_kolmafia_namespaceObject.containsText)($location(level10_templateObject23 || (level10_templateObject23 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))).noncombatQueue, "Mess Around with Gym") || step("questL10Garbage") >= 8,
    do: $location(level10_templateObject24 || (level10_templateObject24 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 20
    },
    choices: {
      670: 5,
      669: 1,
      671: 4
    }
  }, {
    name: "Basement Finish",
    after: ["Basement Search"],
    completed: () => step("questL10Garbage") >= 8,
    do: $location(level10_templateObject25 || (level10_templateObject25 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
    outfit: {
      equip: template_string_$items(level10_templateObject26 || (level10_templateObject26 = level10_taggedTemplateLiteral(["amulet of extreme plot significance"])))
    },
    choices: {
      670: 4
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Ground",
    after: ["Basement Finish"],
    completed: () => step("questL10Garbage") >= 9,
    do: $location(level10_templateObject27 || (level10_templateObject27 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Ground Floor)"]))),
    choices: {
      672: 3,
      673: 3,
      674: 3,
      1026: 2
    },
    outfit: () => {
      if (have(template_string_$item(level10_templateObject28 || (level10_templateObject28 = level10_taggedTemplateLiteral(["electric boning knife"]))))) return {};else return {
        modifier: "-combat"
      };
    },
    limit: {
      turns: 12
    },
    delay: 10
  }, {
    name: "Ground Knife",
    after: ["Ground", "Tower/Wall of Meat"],
    completed: () => have(template_string_$item(level10_templateObject29 || (level10_templateObject29 = level10_taggedTemplateLiteral(["electric boning knife"])))) || step("questL13Final") > 8 || have(template_string_$item(level10_templateObject30 || (level10_templateObject30 = level10_taggedTemplateLiteral(["Great Wolf's rocket launcher"])))) || have(template_string_$item(level10_templateObject31 || (level10_templateObject31 = level10_taggedTemplateLiteral(["Drunkula's bell"])))),
    do: $location(level10_templateObject32 || (level10_templateObject32 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Ground Floor)"]))),
    choices: {
      672: 3,
      673: 3,
      674: 3,
      1026: 2
    },
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 20
    },
    delay: 10
  }, {
    name: "Top Floor",
    after: ["Ground"],
    completed: () => step("questL10Garbage") >= 10,
    do: $location(level10_templateObject33 || (level10_templateObject33 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
    outfit: {
      equip: template_string_$items(level10_templateObject34 || (level10_templateObject34 = level10_taggedTemplateLiteral(["Mohawk wig"]))),
      modifier: "-combat"
    },
    combat: new combat_CombatStrategy().kill($monster(level10_templateObject35 || (level10_templateObject35 = level10_taggedTemplateLiteral(["Burning Snake of Fire"])))),
    choices: {
      675: 4,
      676: 4,
      677: 1,
      678: 1,
      679: 1,
      1431: 4
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Finish",
    after: ["Top Floor"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL10Garbage") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      soft: 10
    },
    freeaction: true
  }, {
    name: "Unlock HITS",
    after: ["Top Floor"],
    completed: () => have(template_string_$item(level10_templateObject36 || (level10_templateObject36 = level10_taggedTemplateLiteral(["steam-powered model rocketship"])))),
    do: $location(level10_templateObject37 || (level10_templateObject37 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
    outfit: {
      modifier: "-combat"
    },
    combat: new combat_CombatStrategy().kill($monster(level10_templateObject38 || (level10_templateObject38 = level10_taggedTemplateLiteral(["Burning Snake of Fire"])))),
    choices: {
      675: 4,
      676: 4,
      677: 2,
      678: 3,
      679: 1,
      1431: 4
    },
    limit: {
      soft: 20
    }
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level11_hidden.ts
var level11_hidden_templateObject, level11_hidden_templateObject2, level11_hidden_templateObject3, level11_hidden_templateObject4, level11_hidden_templateObject5, level11_hidden_templateObject6, level11_hidden_templateObject7, level11_hidden_templateObject8, level11_hidden_templateObject9, level11_hidden_templateObject10, level11_hidden_templateObject11, level11_hidden_templateObject12, level11_hidden_templateObject13, level11_hidden_templateObject14, level11_hidden_templateObject15, level11_hidden_templateObject16, level11_hidden_templateObject17, level11_hidden_templateObject18, level11_hidden_templateObject19, level11_hidden_templateObject20, level11_hidden_templateObject21, level11_hidden_templateObject22, level11_hidden_templateObject23, level11_hidden_templateObject24, level11_hidden_templateObject25, level11_hidden_templateObject26, level11_hidden_templateObject27, level11_hidden_templateObject28, level11_hidden_templateObject29, level11_hidden_templateObject30, level11_hidden_templateObject31, level11_hidden_templateObject32, level11_hidden_templateObject33, level11_hidden_templateObject34, level11_hidden_templateObject35, level11_hidden_templateObject36, level11_hidden_templateObject37, level11_hidden_templateObject38, level11_hidden_templateObject39, level11_hidden_templateObject40, level11_hidden_templateObject41, level11_hidden_templateObject42, level11_hidden_templateObject43, level11_hidden_templateObject44, level11_hidden_templateObject45, level11_hidden_templateObject46, level11_hidden_templateObject47, level11_hidden_templateObject48, level11_hidden_templateObject49, level11_hidden_templateObject50, level11_hidden_templateObject51, level11_hidden_templateObject52, level11_hidden_templateObject53, level11_hidden_templateObject54, level11_hidden_templateObject55, level11_hidden_templateObject56, level11_hidden_templateObject57, level11_hidden_templateObject58, level11_hidden_templateObject59, level11_hidden_templateObject60, level11_hidden_templateObject61, level11_hidden_templateObject62, level11_hidden_templateObject63, level11_hidden_templateObject64, level11_hidden_templateObject65, level11_hidden_templateObject66, level11_hidden_templateObject67, level11_hidden_templateObject68, level11_hidden_templateObject69, level11_hidden_templateObject70, level11_hidden_templateObject71, level11_hidden_templateObject72, level11_hidden_templateObject73, level11_hidden_templateObject74, level11_hidden_templateObject75, level11_hidden_templateObject76, level11_hidden_templateObject77, level11_hidden_templateObject78, level11_hidden_templateObject79, level11_hidden_templateObject80, level11_hidden_templateObject81, level11_hidden_templateObject82, level11_hidden_templateObject83, level11_hidden_templateObject84, level11_hidden_templateObject85, level11_hidden_templateObject86, level11_hidden_templateObject87, level11_hidden_templateObject88, level11_hidden_templateObject89, level11_hidden_templateObject90, level11_hidden_templateObject91, level11_hidden_templateObject92, level11_hidden_templateObject93, level11_hidden_templateObject94, level11_hidden_templateObject95, level11_hidden_templateObject96, level11_hidden_templateObject97, level11_hidden_templateObject98, level11_hidden_templateObject99, level11_hidden_templateObject100, level11_hidden_templateObject101, level11_hidden_templateObject102, level11_hidden_templateObject103, level11_hidden_templateObject104, level11_hidden_templateObject105, level11_hidden_templateObject106, level11_hidden_templateObject107, level11_hidden_templateObject108, level11_hidden_templateObject109, level11_hidden_templateObject110, level11_hidden_templateObject111, level11_hidden_templateObject112, level11_hidden_templateObject113, level11_hidden_templateObject114, level11_hidden_templateObject115, level11_hidden_templateObject116, level11_hidden_templateObject117;

function level11_hidden_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







function manualChoice(whichchoice, option) {
  return (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=".concat(whichchoice, "&pwd=").concat((0,external_kolmafia_namespaceObject.myHash)(), "&option=").concat(option));
}

var Temple = [{
  name: "Forest Coin",
  after: ["Mosquito/Burn Delay"],
  completed: () => have(template_string_$item(level11_hidden_templateObject || (level11_hidden_templateObject = level11_hidden_taggedTemplateLiteral(["tree-holed coin"])))) || have(template_string_$item(level11_hidden_templateObject2 || (level11_hidden_templateObject2 = level11_hidden_taggedTemplateLiteral(["Spooky Temple map"])))) || step("questM16Temple") === 999,
  do: $location(level11_hidden_templateObject3 || (level11_hidden_templateObject3 = level11_hidden_taggedTemplateLiteral(["The Spooky Forest"]))),
  choices: {
    502: 2,
    505: 2,
    334: 1
  },
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 10
  }
}, {
  name: "Forest Map",
  after: ["Forest Coin"],
  completed: () => have(template_string_$item(level11_hidden_templateObject4 || (level11_hidden_templateObject4 = level11_hidden_taggedTemplateLiteral(["Spooky Temple map"])))) || step("questM16Temple") === 999,
  do: $location(level11_hidden_templateObject5 || (level11_hidden_templateObject5 = level11_hidden_taggedTemplateLiteral(["The Spooky Forest"]))),
  choices: {
    502: 3,
    506: 3,
    507: 1,
    334: 1
  },
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 10
  }
}, {
  name: "Forest Sapling",
  after: ["Mosquito/Burn Delay"],
  completed: () => have(template_string_$item(level11_hidden_templateObject6 || (level11_hidden_templateObject6 = level11_hidden_taggedTemplateLiteral(["spooky sapling"])))) || step("questM16Temple") === 999,
  do: $location(level11_hidden_templateObject7 || (level11_hidden_templateObject7 = level11_hidden_taggedTemplateLiteral(["The Spooky Forest"]))),
  choices: {
    502: 1,
    503: 3,
    504: 3,
    334: 1
  },
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 10
  }
}, {
  name: "Forest Fertilizer",
  after: ["Mosquito/Burn Delay"],
  completed: () => have(template_string_$item(level11_hidden_templateObject8 || (level11_hidden_templateObject8 = level11_hidden_taggedTemplateLiteral(["Spooky-Gro fertilizer"])))) || step("questM16Temple") === 999,
  do: $location(level11_hidden_templateObject9 || (level11_hidden_templateObject9 = level11_hidden_taggedTemplateLiteral(["The Spooky Forest"]))),
  choices: {
    502: 3,
    506: 2,
    507: 1,
    334: 1
  },
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 10
  }
}, {
  name: "Open Temple",
  after: ["Forest Coin", "Forest Map", "Forest Sapling", "Forest Fertilizer"],
  completed: () => step("questM16Temple") === 999,
  do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_hidden_templateObject10 || (level11_hidden_templateObject10 = level11_hidden_taggedTemplateLiteral(["Spooky Temple map"])))),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Temple Wool",
  after: ["Open Temple"],
  completed: () => (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_hidden_templateObject11 || (level11_hidden_templateObject11 = level11_hidden_taggedTemplateLiteral(["stone wool"])))) >= 2 || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_hidden_templateObject12 || (level11_hidden_templateObject12 = level11_hidden_taggedTemplateLiteral(["stone wool"])))) === 1 && have(template_string_$item(level11_hidden_templateObject13 || (level11_hidden_templateObject13 = level11_hidden_taggedTemplateLiteral(["the Nostril of the Serpent"])))) || step("questL11Worship") >= 3,
  priority: () => {
    if (have(template_string_$item(level11_hidden_templateObject14 || (level11_hidden_templateObject14 = level11_hidden_taggedTemplateLiteral(["industrial fire extinguisher"]))))) return OverridePriority.None;
    if ((0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(level11_hidden_templateObject15 || (level11_hidden_templateObject15 = level11_hidden_taggedTemplateLiteral(["Grey Goose"])))) >= 6) return OverridePriority.GoodGoose;
    return OverridePriority.BadGoose;
  },
  prepare: () => {
    if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_hidden_templateObject16 || (level11_hidden_templateObject16 = level11_hidden_taggedTemplateLiteral(["11-leaf clover"])))) > 1 && !have($effect(level11_hidden_templateObject17 || (level11_hidden_templateObject17 = level11_hidden_taggedTemplateLiteral(["Lucky!"])))) && !have(template_string_$item(level11_hidden_templateObject18 || (level11_hidden_templateObject18 = level11_hidden_taggedTemplateLiteral(["industrial fire extinguisher"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_hidden_templateObject19 || (level11_hidden_templateObject19 = level11_hidden_taggedTemplateLiteral(["11-leaf clover"]))));
  },
  do: $location(level11_hidden_templateObject20 || (level11_hidden_templateObject20 = level11_hidden_taggedTemplateLiteral(["The Hidden Temple"]))),
  outfit: () => {
    if (have(template_string_$item(level11_hidden_templateObject21 || (level11_hidden_templateObject21 = level11_hidden_taggedTemplateLiteral(["industrial fire extinguisher"])))) && property_get("_fireExtinguisherCharge") >= 10) return {
      equip: template_string_$items(level11_hidden_templateObject22 || (level11_hidden_templateObject22 = level11_hidden_taggedTemplateLiteral(["industrial fire extinguisher"]))),
      modifier: "+combat"
    };else return {
      familiar: template_string_$familiar(level11_hidden_templateObject23 || (level11_hidden_templateObject23 = level11_hidden_taggedTemplateLiteral(["Grey Goose"]))),
      modifier: "+combat, item"
    };
  },
  combat: new combat_CombatStrategy().macro(new Macro().trySkill($skill(level11_hidden_templateObject24 || (level11_hidden_templateObject24 = level11_hidden_taggedTemplateLiteral(["Fire Extinguisher: Polar Vortex"])))).trySkill($skill(level11_hidden_templateObject25 || (level11_hidden_templateObject25 = level11_hidden_taggedTemplateLiteral(["Fire Extinguisher: Polar Vortex"])))), $monster(level11_hidden_templateObject26 || (level11_hidden_templateObject26 = level11_hidden_taggedTemplateLiteral(["baa-relief sheep"])))).macro(new Macro().trySkill($skill(level11_hidden_templateObject27 || (level11_hidden_templateObject27 = level11_hidden_taggedTemplateLiteral(["Emit Matter Duplicating Drones"])))), $monster(level11_hidden_templateObject28 || (level11_hidden_templateObject28 = level11_hidden_taggedTemplateLiteral(["Baa'baa'bu'ran"])))).killItem([$monster(level11_hidden_templateObject29 || (level11_hidden_templateObject29 = level11_hidden_taggedTemplateLiteral(["baa-relief sheep"]))), $monster(level11_hidden_templateObject30 || (level11_hidden_templateObject30 = level11_hidden_taggedTemplateLiteral(["Baa'baa'bu'ran"])))]),
  choices: {
    579: 2,
    580: 1,
    581: 3,
    582: 1
  },
  limit: {
    soft: 20
  }
}, {
  name: "Temple Nostril",
  after: ["Open Temple", "Temple Wool"],
  completed: () => have(template_string_$item(level11_hidden_templateObject31 || (level11_hidden_templateObject31 = level11_hidden_taggedTemplateLiteral(["the Nostril of the Serpent"])))) || step("questL11Worship") >= 3,
  do: $location(level11_hidden_templateObject32 || (level11_hidden_templateObject32 = level11_hidden_taggedTemplateLiteral(["The Hidden Temple"]))),
  choices: {
    579: 2,
    582: 1
  },
  effects: $effects(level11_hidden_templateObject33 || (level11_hidden_templateObject33 = level11_hidden_taggedTemplateLiteral(["Stone-Faced"]))),
  limit: {
    tries: 1
  }
}, {
  name: "Open City",
  after: ["Temple Nostril", "Macguffin/Diary"],
  acquire: [{
    item: template_string_$item(level11_hidden_templateObject34 || (level11_hidden_templateObject34 = level11_hidden_taggedTemplateLiteral(["stone wool"])))
  }],
  completed: () => step("questL11Worship") >= 3,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("adventure.php?snarfblat=280");
    manualChoice(582, 2);
    manualChoice(580, 2);
    manualChoice(584, 4);
    manualChoice(580, 1);
    manualChoice(123, 2);
    (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
    (0,external_kolmafia_namespaceObject.cliExecute)("dvorak");
    manualChoice(125, 3);
  },
  effects: $effects(level11_hidden_templateObject35 || (level11_hidden_templateObject35 = level11_hidden_taggedTemplateLiteral(["Stone-Faced"]))),
  limit: {
    tries: 1
  }
}];
var Apartment = [{
  name: "Open Apartment",
  after: ["Get Machete", "Open City"],
  completed: () => property_get("hiddenApartmentProgress") >= 1,
  do: $location(level11_hidden_templateObject36 || (level11_hidden_templateObject36 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Northwest)"]))),
  outfit: {
    equip: template_string_$items(level11_hidden_templateObject37 || (level11_hidden_templateObject37 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  },
  choices: {
    781: 1
  },
  limit: {
    tries: 4
  },
  freecombat: true,
  acquire: [{
    item: template_string_$item(level11_hidden_templateObject38 || (level11_hidden_templateObject38 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  }]
}, {
  name: "Apartment Files",
  // Get the last McClusky files here if needed, as a backup plan
  after: ["Open Apartment", "Office Files", "Banish Janitors"],
  priority: () => have($effect(level11_hidden_templateObject39 || (level11_hidden_templateObject39 = level11_hidden_taggedTemplateLiteral(["Once-Cursed"])))) || have($effect(level11_hidden_templateObject40 || (level11_hidden_templateObject40 = level11_hidden_taggedTemplateLiteral(["Twice-Cursed"])))) || have($effect(level11_hidden_templateObject41 || (level11_hidden_templateObject41 = level11_hidden_taggedTemplateLiteral(["Thrice-Cursed"])))) ? OverridePriority.Effect : OverridePriority.None,
  completed: () => have(template_string_$item(level11_hidden_templateObject42 || (level11_hidden_templateObject42 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 5)"])))) || have(template_string_$item(level11_hidden_templateObject43 || (level11_hidden_templateObject43 = level11_hidden_taggedTemplateLiteral(["McClusky file (complete)"])))) || property_get("hiddenOfficeProgress") >= 7,
  do: $location(level11_hidden_templateObject44 || (level11_hidden_templateObject44 = level11_hidden_taggedTemplateLiteral(["The Hidden Apartment Building"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_hidden_templateObject45 || (level11_hidden_templateObject45 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Apartment Building)"])))).kill($monster(level11_hidden_templateObject46 || (level11_hidden_templateObject46 = level11_hidden_taggedTemplateLiteral(["pygmy witch accountant"])))).banish($monsters(level11_hidden_templateObject47 || (level11_hidden_templateObject47 = level11_hidden_taggedTemplateLiteral(["pygmy janitor, pygmy witch lawyer"])))).ignoreNoBanish($monster(level11_hidden_templateObject48 || (level11_hidden_templateObject48 = level11_hidden_taggedTemplateLiteral(["pygmy shaman"])))).ignore(),
  limit: {
    tries: 9
  },
  choices: {
    780: 1
  }
}, {
  name: "Apartment",
  after: ["Open Apartment", "Apartment Files"],
  // Wait until after all needed pygmy witch lawyers are done
  priority: () => have($effect(level11_hidden_templateObject49 || (level11_hidden_templateObject49 = level11_hidden_taggedTemplateLiteral(["Once-Cursed"])))) || have($effect(level11_hidden_templateObject50 || (level11_hidden_templateObject50 = level11_hidden_taggedTemplateLiteral(["Twice-Cursed"])))) || have($effect(level11_hidden_templateObject51 || (level11_hidden_templateObject51 = level11_hidden_taggedTemplateLiteral(["Thrice-Cursed"])))) ? OverridePriority.Effect : OverridePriority.None,
  completed: () => property_get("hiddenApartmentProgress") >= 7,
  do: $location(level11_hidden_templateObject52 || (level11_hidden_templateObject52 = level11_hidden_taggedTemplateLiteral(["The Hidden Apartment Building"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_hidden_templateObject53 || (level11_hidden_templateObject53 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Apartment Building)"])))).banish($monsters(level11_hidden_templateObject54 || (level11_hidden_templateObject54 = level11_hidden_taggedTemplateLiteral(["pygmy janitor, pygmy witch lawyer, pygmy witch accountant"])))).ignoreNoBanish($monster(level11_hidden_templateObject55 || (level11_hidden_templateObject55 = level11_hidden_taggedTemplateLiteral(["pygmy shaman"])))).ignore(),
  orbtargets: () => {
    if (have($effect(level11_hidden_templateObject56 || (level11_hidden_templateObject56 = level11_hidden_taggedTemplateLiteral(["Thrice-Cursed"]))))) return [];else return [$monster(level11_hidden_templateObject57 || (level11_hidden_templateObject57 = level11_hidden_taggedTemplateLiteral(["pygmy shaman"])))];
  },
  choices: {
    780: 1
  },
  limit: {
    tries: 9
  }
}, {
  name: "Finish Apartment",
  after: ["Apartment"],
  completed: () => property_get("hiddenApartmentProgress") >= 8,
  do: $location(level11_hidden_templateObject58 || (level11_hidden_templateObject58 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Northwest)"]))),
  choices: {
    781: 2
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var Office = [{
  name: "Open Office",
  after: ["Get Machete", "Open City"],
  completed: () => property_get("hiddenOfficeProgress") >= 1,
  do: $location(level11_hidden_templateObject59 || (level11_hidden_templateObject59 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Northeast)"]))),
  outfit: {
    equip: template_string_$items(level11_hidden_templateObject60 || (level11_hidden_templateObject60 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  },
  choices: {
    785: 1
  },
  limit: {
    tries: 4
  },
  freecombat: true,
  acquire: [{
    item: template_string_$item(level11_hidden_templateObject61 || (level11_hidden_templateObject61 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  }]
}, {
  name: "Office Files",
  after: ["Open Office", "Banish Janitors"],
  completed: () => have(template_string_$item(level11_hidden_templateObject62 || (level11_hidden_templateObject62 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 1)"])))) && have(template_string_$item(level11_hidden_templateObject63 || (level11_hidden_templateObject63 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 2)"])))) && have(template_string_$item(level11_hidden_templateObject64 || (level11_hidden_templateObject64 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 3)"])))) && have(template_string_$item(level11_hidden_templateObject65 || (level11_hidden_templateObject65 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 4)"])))) && have(template_string_$item(level11_hidden_templateObject66 || (level11_hidden_templateObject66 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 5)"])))) || have(template_string_$item(level11_hidden_templateObject67 || (level11_hidden_templateObject67 = level11_hidden_taggedTemplateLiteral(["McClusky file (complete)"])))) || property_get("hiddenOfficeProgress") >= 7 || $location(level11_hidden_templateObject68 || (level11_hidden_templateObject68 = level11_hidden_taggedTemplateLiteral(["The Hidden Office Building"]))).turnsSpent >= 10,
  do: $location(level11_hidden_templateObject69 || (level11_hidden_templateObject69 = level11_hidden_taggedTemplateLiteral(["The Hidden Office Building"]))),
  combat: new combat_CombatStrategy().kill($monster(level11_hidden_templateObject70 || (level11_hidden_templateObject70 = level11_hidden_taggedTemplateLiteral(["pygmy witch accountant"])))).banish($monsters(level11_hidden_templateObject71 || (level11_hidden_templateObject71 = level11_hidden_taggedTemplateLiteral(["pygmy janitor, pygmy headhunter, pygmy witch lawyer"])))),
  choices: {
    786: 2
  },
  limit: {
    tries: 10
  }
}, {
  name: "Office Clip",
  after: ["Office Files", "Apartment Files"],
  completed: () => have(template_string_$item(level11_hidden_templateObject72 || (level11_hidden_templateObject72 = level11_hidden_taggedTemplateLiteral(["boring binder clip"])))) || have(template_string_$item(level11_hidden_templateObject73 || (level11_hidden_templateObject73 = level11_hidden_taggedTemplateLiteral(["McClusky file (complete)"])))) || property_get("hiddenOfficeProgress") >= 7,
  do: $location(level11_hidden_templateObject74 || (level11_hidden_templateObject74 = level11_hidden_taggedTemplateLiteral(["The Hidden Office Building"]))),
  choices: {
    786: 2
  },
  combat: new combat_CombatStrategy().ignore(),
  limit: {
    tries: 6
  }
}, {
  name: "Office Boss",
  after: ["Office Clip"],
  completed: () => property_get("hiddenOfficeProgress") >= 7,
  do: $location(level11_hidden_templateObject75 || (level11_hidden_templateObject75 = level11_hidden_taggedTemplateLiteral(["The Hidden Office Building"]))),
  choices: {
    786: 1
  },
  combat: new combat_CombatStrategy().killHard($monster(level11_hidden_templateObject76 || (level11_hidden_templateObject76 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Office Building)"])))).ignore(),
  orbtargets: () => [],
  limit: {
    soft: 10
  }
}, {
  name: "Finish Office",
  after: ["Office Boss"],
  completed: () => property_get("hiddenOfficeProgress") >= 8,
  do: $location(level11_hidden_templateObject77 || (level11_hidden_templateObject77 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Northeast)"]))),
  choices: {
    785: 2
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var Hospital = [{
  name: "Open Hospital",
  after: ["Get Machete", "Open City"],
  completed: () => property_get("hiddenHospitalProgress") >= 1,
  do: $location(level11_hidden_templateObject78 || (level11_hidden_templateObject78 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Southwest)"]))),
  outfit: {
    equip: template_string_$items(level11_hidden_templateObject79 || (level11_hidden_templateObject79 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  },
  choices: {
    783: 1
  },
  limit: {
    tries: 4
  },
  freecombat: true,
  acquire: [{
    item: template_string_$item(level11_hidden_templateObject80 || (level11_hidden_templateObject80 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  }]
}, {
  name: "Hospital",
  after: ["Open Hospital", "Banish Janitors"],
  completed: () => property_get("hiddenHospitalProgress") >= 7,
  do: $location(level11_hidden_templateObject81 || (level11_hidden_templateObject81 = level11_hidden_taggedTemplateLiteral(["The Hidden Hospital"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_hidden_templateObject82 || (level11_hidden_templateObject82 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Hospital)"])))).kill($monster(level11_hidden_templateObject83 || (level11_hidden_templateObject83 = level11_hidden_taggedTemplateLiteral(["pygmy witch surgeon"])))).banish($monsters(level11_hidden_templateObject84 || (level11_hidden_templateObject84 = level11_hidden_taggedTemplateLiteral(["pygmy orderlies, pygmy janitor, pygmy witch nurse"])))),
  outfit: {
    equip: template_string_$items(level11_hidden_templateObject85 || (level11_hidden_templateObject85 = level11_hidden_taggedTemplateLiteral(["half-size scalpel, head mirror, surgical mask, bloodied surgical dungarees"])))
  },
  choices: {
    784: 1
  },
  limit: {
    soft: 20
  }
}, {
  name: "Finish Hospital",
  after: ["Hospital"],
  completed: () => property_get("hiddenHospitalProgress") >= 8,
  do: $location(level11_hidden_templateObject86 || (level11_hidden_templateObject86 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Southwest)"]))),
  choices: {
    783: 2
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var Bowling = [{
  name: "Open Bowling",
  after: ["Get Machete", "Open City"],
  completed: () => property_get("hiddenBowlingAlleyProgress") >= 1,
  do: $location(level11_hidden_templateObject87 || (level11_hidden_templateObject87 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Southeast)"]))),
  outfit: {
    equip: template_string_$items(level11_hidden_templateObject88 || (level11_hidden_templateObject88 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  },
  choices: {
    787: 1
  },
  limit: {
    tries: 4
  },
  freecombat: true,
  acquire: [{
    item: template_string_$item(level11_hidden_templateObject89 || (level11_hidden_templateObject89 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  }]
}, {
  name: "Bowling Skills",
  after: ["Open Bowling"],
  ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 500,
  acquire: [{
    item: template_string_$item(level11_hidden_templateObject90 || (level11_hidden_templateObject90 = level11_hidden_taggedTemplateLiteral(["Bowl of Scorpions"]))),
    optional: true
  }],
  completed: () => (have($skill(level11_hidden_templateObject91 || (level11_hidden_templateObject91 = level11_hidden_taggedTemplateLiteral(["System Sweep"])))) || property_get("relocatePygmyJanitor") === (0,external_kolmafia_namespaceObject.myAscensions)()) && have($skill(level11_hidden_templateObject92 || (level11_hidden_templateObject92 = level11_hidden_taggedTemplateLiteral(["Double Nanovision"])))),
  prepare: () => {
    // No need for more bowling progress after we beat the boss
    if (property_get("hiddenBowlingAlleyProgress") >= 7 && have(template_string_$item(level11_hidden_templateObject93 || (level11_hidden_templateObject93 = level11_hidden_taggedTemplateLiteral(["bowling ball"]))))) (0,external_kolmafia_namespaceObject.putCloset)(template_string_$item(level11_hidden_templateObject94 || (level11_hidden_templateObject94 = level11_hidden_taggedTemplateLiteral(["bowling ball"]))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_hidden_templateObject95 || (level11_hidden_templateObject95 = level11_hidden_taggedTemplateLiteral(["bowling ball"]))))); // Open the hidden tavern if it is available.

    if (property_get("hiddenTavernUnlock") < (0,external_kolmafia_namespaceObject.myAscensions)() && have(template_string_$item(level11_hidden_templateObject96 || (level11_hidden_templateObject96 = level11_hidden_taggedTemplateLiteral(["book of matches"]))))) {
      (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_hidden_templateObject97 || (level11_hidden_templateObject97 = level11_hidden_taggedTemplateLiteral(["book of matches"]))));
      (0,external_kolmafia_namespaceObject.buy)(template_string_$item(level11_hidden_templateObject98 || (level11_hidden_templateObject98 = level11_hidden_taggedTemplateLiteral(["Bowl of Scorpions"]))));
    }
  },
  do: $location(level11_hidden_templateObject99 || (level11_hidden_templateObject99 = level11_hidden_taggedTemplateLiteral(["The Hidden Bowling Alley"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_hidden_templateObject100 || (level11_hidden_templateObject100 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Bowling Alley)"])))).killItem($monster(level11_hidden_templateObject101 || (level11_hidden_templateObject101 = level11_hidden_taggedTemplateLiteral(["pygmy bowler"])))) // .autoattack(new Macro().trySkill($skill`Infinite Loop`), $monster`drunk pygmy`)
  .banish($monster(level11_hidden_templateObject102 || (level11_hidden_templateObject102 = level11_hidden_taggedTemplateLiteral(["pygmy orderlies"])))),
  outfit: {
    modifier: "item",
    avoid: template_string_$items(level11_hidden_templateObject103 || (level11_hidden_templateObject103 = level11_hidden_taggedTemplateLiteral(["broken champagne bottle"])))
  },
  choices: {
    788: 1
  },
  limit: {
    soft: 15
  }
}, {
  name: "Bowling",
  after: ["Open Bowling", "Banish Janitors"],
  ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 500,
  acquire: [{
    item: template_string_$item(level11_hidden_templateObject104 || (level11_hidden_templateObject104 = level11_hidden_taggedTemplateLiteral(["Bowl of Scorpions"]))),
    optional: true
  }],
  completed: () => property_get("hiddenBowlingAlleyProgress") >= 7,
  do: $location(level11_hidden_templateObject105 || (level11_hidden_templateObject105 = level11_hidden_taggedTemplateLiteral(["The Hidden Bowling Alley"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_hidden_templateObject106 || (level11_hidden_templateObject106 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Bowling Alley)"])))).killItem($monster(level11_hidden_templateObject107 || (level11_hidden_templateObject107 = level11_hidden_taggedTemplateLiteral(["pygmy bowler"])))) // .autoattack(new Macro().trySkill($skill`Infinite Loop`), $monster`drunk pygmy`)
  .banish($monsters(level11_hidden_templateObject108 || (level11_hidden_templateObject108 = level11_hidden_taggedTemplateLiteral(["pygmy janitor, pygmy orderlies"])))),
  outfit: {
    modifier: "item",
    avoid: template_string_$items(level11_hidden_templateObject109 || (level11_hidden_templateObject109 = level11_hidden_taggedTemplateLiteral(["broken champagne bottle"])))
  },
  choices: {
    788: 1
  },
  limit: {
    soft: 25
  }
}, {
  name: "Finish Bowling",
  after: ["Bowling"],
  completed: () => property_get("hiddenBowlingAlleyProgress") >= 8,
  do: $location(level11_hidden_templateObject110 || (level11_hidden_templateObject110 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Southeast)"]))),
  choices: {
    787: 2
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var HiddenQuest = {
  name: "Hidden City",
  tasks: [].concat(Temple, [{
    name: "Get Machete",
    after: ["Open City"],
    completed: () => have(template_string_$item(level11_hidden_templateObject111 || (level11_hidden_templateObject111 = level11_hidden_taggedTemplateLiteral(["antique machete"])))),
    do: $location(level11_hidden_templateObject112 || (level11_hidden_templateObject112 = level11_hidden_taggedTemplateLiteral(["The Hidden Park"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      789: 2
    },
    limit: {
      soft: 10
    }
  }], Office, Apartment, Hospital, Bowling, [{
    name: "Banish Janitors",
    after: ["Bowling Skills"],
    completed: () => property_get("relocatePygmyJanitor") === (0,external_kolmafia_namespaceObject.myAscensions)(),
    do: $location(level11_hidden_templateObject113 || (level11_hidden_templateObject113 = level11_hidden_taggedTemplateLiteral(["The Hidden Park"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      789: 2
    },
    limit: {
      soft: 10
    }
  }, {
    name: "Boss",
    after: ["Finish Office", "Finish Apartment", "Finish Hospital", "Finish Bowling"],
    completed: () => step("questL11Worship") === 999,
    do: $location(level11_hidden_templateObject114 || (level11_hidden_templateObject114 = level11_hidden_taggedTemplateLiteral(["A Massive Ziggurat"]))),
    outfit: {
      equip: template_string_$items(level11_hidden_templateObject115 || (level11_hidden_templateObject115 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
    },
    choices: {
      791: 1
    },
    combat: new combat_CombatStrategy().kill($monsters(level11_hidden_templateObject116 || (level11_hidden_templateObject116 = level11_hidden_taggedTemplateLiteral(["dense liana, Protector Spectre"])))),
    // .autoattack(new Macro().trySkill($skill`Infinite Loop`), $monster`dense liana`),
    limit: {
      tries: 4
    },
    acquire: [{
      item: template_string_$item(level11_hidden_templateObject117 || (level11_hidden_templateObject117 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
    }],
    boss: true
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level11_manor.ts
var level11_manor_templateObject, level11_manor_templateObject2, level11_manor_templateObject3, level11_manor_templateObject4, level11_manor_templateObject5, level11_manor_templateObject6, level11_manor_templateObject7, level11_manor_templateObject8, level11_manor_templateObject9, level11_manor_templateObject10, level11_manor_templateObject11, level11_manor_templateObject12, level11_manor_templateObject13, level11_manor_templateObject14, level11_manor_templateObject15, level11_manor_templateObject16, level11_manor_templateObject17, level11_manor_templateObject18, level11_manor_templateObject19, level11_manor_templateObject20, level11_manor_templateObject21, level11_manor_templateObject22, level11_manor_templateObject23, level11_manor_templateObject24, level11_manor_templateObject25, level11_manor_templateObject26, level11_manor_templateObject27, level11_manor_templateObject28, level11_manor_templateObject29, level11_manor_templateObject30, level11_manor_templateObject31, level11_manor_templateObject32, level11_manor_templateObject33, level11_manor_templateObject34, level11_manor_templateObject35, level11_manor_templateObject36, level11_manor_templateObject37, level11_manor_templateObject38, level11_manor_templateObject39, level11_manor_templateObject40, level11_manor_templateObject41, level11_manor_templateObject42, level11_manor_templateObject43, level11_manor_templateObject44, level11_manor_templateObject45, level11_manor_templateObject46, level11_manor_templateObject47, level11_manor_templateObject48, level11_manor_templateObject49, level11_manor_templateObject50, level11_manor_templateObject51, level11_manor_templateObject52, level11_manor_templateObject53, level11_manor_templateObject54, level11_manor_templateObject55, level11_manor_templateObject56, level11_manor_templateObject57, level11_manor_templateObject58, level11_manor_templateObject59, level11_manor_templateObject60, level11_manor_templateObject61, level11_manor_templateObject62, level11_manor_templateObject63, level11_manor_templateObject64, level11_manor_templateObject65, level11_manor_templateObject66, level11_manor_templateObject67, level11_manor_templateObject68, level11_manor_templateObject69, level11_manor_templateObject70;

function level11_manor_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var Manor1 = [{
  name: "Kitchen",
  after: ["Start"],
  completed: () => step("questM20Necklace") >= 1,
  prepare: () => {
    if (have(template_string_$item(level11_manor_templateObject || (level11_manor_templateObject = level11_manor_taggedTemplateLiteral(["rainbow glitter candle"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_manor_templateObject2 || (level11_manor_templateObject2 = level11_manor_taggedTemplateLiteral(["rainbow glitter candle"]))));
  },
  do: $location(level11_manor_templateObject3 || (level11_manor_templateObject3 = level11_manor_taggedTemplateLiteral(["The Haunted Kitchen"]))),
  outfit: {
    modifier: "stench res, hot res"
  },
  choices: {
    893: 2
  },
  combat: new combat_CombatStrategy().kill(),
  limit: {
    soft: 21
  }
}, {
  name: "Billiards",
  after: ["Kitchen"],
  completed: () => step("questM20Necklace") >= 3,
  priority: () => have($effect(level11_manor_templateObject4 || (level11_manor_templateObject4 = level11_manor_taggedTemplateLiteral(["Chalky Hand"])))) && !have(template_string_$item(level11_manor_templateObject5 || (level11_manor_templateObject5 = level11_manor_taggedTemplateLiteral(["handful of hand chalk"])))) ? OverridePriority.Effect : OverridePriority.None,
  prepare: () => {
    if (have(template_string_$item(level11_manor_templateObject6 || (level11_manor_templateObject6 = level11_manor_taggedTemplateLiteral(["handful of hand chalk"]))))) ensureEffect($effect(level11_manor_templateObject7 || (level11_manor_templateObject7 = level11_manor_taggedTemplateLiteral(["Chalky Hand"]))));
  },
  ready: () => (0,external_kolmafia_namespaceObject.myInebriety)() <= 15,
  // Nonnegative contribution
  do: $location(level11_manor_templateObject8 || (level11_manor_templateObject8 = level11_manor_taggedTemplateLiteral(["The Haunted Billiards Room"]))),
  choices: {
    875: 1,
    900: 2,
    1436: 1
  },
  outfit: () => {
    return {
      equip: template_string_$items(level11_manor_templateObject9 || (level11_manor_templateObject9 = level11_manor_taggedTemplateLiteral(["pool cue"]))),
      modifier: "-combat"
    };
  },
  combat: new combat_CombatStrategy().ignore().killItem($monster(level11_manor_templateObject10 || (level11_manor_templateObject10 = level11_manor_taggedTemplateLiteral(["chalkdust wraith"])))).kill($monster(level11_manor_templateObject11 || (level11_manor_templateObject11 = level11_manor_taggedTemplateLiteral(["pooltergeist (ultra-rare)"])))),
  limit: {
    soft: 20,
    message: "Consider increasing your permanent pool skill with \"A Shark's Chum\", if you have not."
  }
}, {
  name: "Library",
  after: ["Billiards"],
  completed: () => step("questM20Necklace") >= 4,
  do: $location(level11_manor_templateObject12 || (level11_manor_templateObject12 = level11_manor_taggedTemplateLiteral(["The Haunted Library"]))),
  combat: new combat_CombatStrategy().banish($monsters(level11_manor_templateObject13 || (level11_manor_templateObject13 = level11_manor_taggedTemplateLiteral(["banshee librarian, bookbat"])))).kill(),
  choices: {
    163: 4,
    888: 4,
    889: 5,
    894: 1
  },
  limit: {
    soft: 15
  }
}, {
  name: "Finish Floor1",
  after: ["Library"],
  completed: () => step("questM20Necklace") === 999,
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor1&action=manor1_ladys"),
  limit: {
    tries: 1
  },
  freeaction: true
}];
var Manor2 = [{
  name: "Start Floor2",
  after: ["Finish Floor1"],
  completed: () => step("questM21Dance") >= 1,
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor2&action=manor2_ladys"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Gallery Delay",
  after: ["Start Floor2"],
  completed: () => $location(level11_manor_templateObject14 || (level11_manor_templateObject14 = level11_manor_taggedTemplateLiteral(["The Haunted Gallery"]))).turnsSpent >= 5 || have(template_string_$item(level11_manor_templateObject15 || (level11_manor_templateObject15 = level11_manor_taggedTemplateLiteral(["Lady Spookyraven's dancing shoes"])))) || step("questM21Dance") >= 2,
  do: $location(level11_manor_templateObject16 || (level11_manor_templateObject16 = level11_manor_taggedTemplateLiteral(["The Haunted Gallery"]))),
  choices: {
    89: 6,
    896: 1
  },
  // TODO: louvre
  limit: {
    turns: 5
  },
  delay: 5
}, {
  name: "Gallery",
  after: ["Gallery Delay"],
  completed: () => have(template_string_$item(level11_manor_templateObject17 || (level11_manor_templateObject17 = level11_manor_taggedTemplateLiteral(["Lady Spookyraven's dancing shoes"])))) || step("questM21Dance") >= 2,
  do: $location(level11_manor_templateObject18 || (level11_manor_templateObject18 = level11_manor_taggedTemplateLiteral(["The Haunted Gallery"]))),
  choices: {
    89: 6,
    896: 1
  },
  // TODO: louvre
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 15
  }
}, {
  name: "Bathroom Delay",
  after: ["Start Floor2"],
  completed: () => $location(level11_manor_templateObject19 || (level11_manor_templateObject19 = level11_manor_taggedTemplateLiteral(["The Haunted Bathroom"]))).turnsSpent >= 5 || have(template_string_$item(level11_manor_templateObject20 || (level11_manor_templateObject20 = level11_manor_taggedTemplateLiteral(["Lady Spookyraven's powder puff"])))) || step("questM21Dance") >= 2,
  do: $location(level11_manor_templateObject21 || (level11_manor_templateObject21 = level11_manor_taggedTemplateLiteral(["The Haunted Bathroom"]))),
  choices: {
    881: 1,
    105: 1,
    892: 1
  },
  combat: new combat_CombatStrategy().kill($monster(level11_manor_templateObject22 || (level11_manor_templateObject22 = level11_manor_taggedTemplateLiteral(["cosmetics wraith"])))),
  limit: {
    turns: 5
  },
  delay: 5,
  // No need to search for cosmetics wraith
  orbtargets: () => []
}, {
  name: "Bathroom",
  after: ["Bathroom Delay"],
  completed: () => have(template_string_$item(level11_manor_templateObject23 || (level11_manor_templateObject23 = level11_manor_taggedTemplateLiteral(["Lady Spookyraven's powder puff"])))) || step("questM21Dance") >= 2,
  do: $location(level11_manor_templateObject24 || (level11_manor_templateObject24 = level11_manor_taggedTemplateLiteral(["The Haunted Bathroom"]))),
  choices: {
    881: 1,
    105: 1,
    892: 1
  },
  outfit: {
    modifier: "-combat"
  },
  combat: new combat_CombatStrategy().kill($monster(level11_manor_templateObject25 || (level11_manor_templateObject25 = level11_manor_taggedTemplateLiteral(["cosmetics wraith"])))),
  limit: {
    soft: 15
  },
  // No need to search for cosmetics wraith
  orbtargets: () => []
}, {
  name: "Bedroom",
  after: ["Start Floor2"],
  completed: () => (have(template_string_$item(level11_manor_templateObject26 || (level11_manor_templateObject26 = level11_manor_taggedTemplateLiteral(["Lady Spookyraven's finest gown"])))) || step("questM21Dance") >= 2) && have(template_string_$item(level11_manor_templateObject27 || (level11_manor_templateObject27 = level11_manor_taggedTemplateLiteral(["Lord Spookyraven's spectacles"])))),
  do: $location(level11_manor_templateObject28 || (level11_manor_templateObject28 = level11_manor_taggedTemplateLiteral(["The Haunted Bedroom"]))),
  choices: {
    876: 1,
    877: 1,
    878: () => {
      if (!have(template_string_$item(level11_manor_templateObject29 || (level11_manor_templateObject29 = level11_manor_taggedTemplateLiteral(["Lord Spookyraven's spectacles"]))))) return 3;else return 4;
    },
    879: 1,
    880: 1,
    897: 2
  },
  combat: new combat_CombatStrategy().kill($monsters(level11_manor_templateObject30 || (level11_manor_templateObject30 = level11_manor_taggedTemplateLiteral(["elegant animated nightstand, animated ornate nightstand"])))) // kill ornate nightstand if banish fails
  .banish($monsters(level11_manor_templateObject31 || (level11_manor_templateObject31 = level11_manor_taggedTemplateLiteral(["animated mahogany nightstand, animated rustic nightstand, Wardr\xF6b nightstand"])))).ignore($monster(level11_manor_templateObject32 || (level11_manor_templateObject32 = level11_manor_taggedTemplateLiteral(["tumbleweed"])))),
  delay: () => have(template_string_$item(level11_manor_templateObject33 || (level11_manor_templateObject33 = level11_manor_taggedTemplateLiteral(["Lord Spookyraven's spectacles"])))) ? 5 : 0,
  limit: {
    soft: 15
  }
}, {
  name: "Bedroom Camera",
  after: ["Bedroom"],
  completed: () => have(template_string_$item(level11_manor_templateObject34 || (level11_manor_templateObject34 = level11_manor_taggedTemplateLiteral(["disposable instant camera"])))) || have(template_string_$item(level11_manor_templateObject35 || (level11_manor_templateObject35 = level11_manor_taggedTemplateLiteral(["photograph of a dog"])))) || step("questL11Palindome") >= 3,
  do: $location(level11_manor_templateObject36 || (level11_manor_templateObject36 = level11_manor_taggedTemplateLiteral(["The Haunted Bedroom"]))),
  choices: {
    876: 1,
    877: 1,
    878: 4,
    879: 1,
    880: 1,
    897: 2
  },
  combat: new combat_CombatStrategy().kill($monster(level11_manor_templateObject37 || (level11_manor_templateObject37 = level11_manor_taggedTemplateLiteral(["animated ornate nightstand"])))).banish($monsters(level11_manor_templateObject38 || (level11_manor_templateObject38 = level11_manor_taggedTemplateLiteral(["animated mahogany nightstand, animated rustic nightstand, Wardr\xF6b nightstand, elegant animated nightstand"])))).ignore($monster(level11_manor_templateObject39 || (level11_manor_templateObject39 = level11_manor_taggedTemplateLiteral(["tumbleweed"])))),
  limit: {
    soft: 10
  }
}, {
  name: "Open Ballroom",
  after: ["Gallery", "Bathroom", "Bedroom"],
  completed: () => step("questM21Dance") >= 3,
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor2&action=manor2_ladys"),
  limit: {
    tries: 1
  }
}, {
  name: "Finish Floor2",
  after: ["Open Ballroom"],
  completed: () => step("questM21Dance") >= 4,
  do: $location(level11_manor_templateObject40 || (level11_manor_templateObject40 = level11_manor_taggedTemplateLiteral(["The Haunted Ballroom"]))),
  limit: {
    turns: 1
  }
}];
var ManorBasement = [{
  name: "Ballroom Delay",
  after: ["Macguffin/Diary", "Finish Floor2"],
  completed: () => $location(level11_manor_templateObject41 || (level11_manor_templateObject41 = level11_manor_taggedTemplateLiteral(["The Haunted Ballroom"]))).turnsSpent >= 5 || step("questL11Manor") >= 1,
  do: $location(level11_manor_templateObject42 || (level11_manor_templateObject42 = level11_manor_taggedTemplateLiteral(["The Haunted Ballroom"]))),
  choices: {
    90: 3,
    106: 4,
    921: 1
  },
  limit: {
    turns: 5
  },
  delay: 5
}, {
  name: "Ballroom",
  after: ["Ballroom Delay"],
  completed: () => step("questL11Manor") >= 1,
  do: $location(level11_manor_templateObject43 || (level11_manor_templateObject43 = level11_manor_taggedTemplateLiteral(["The Haunted Ballroom"]))),
  outfit: {
    modifier: "-combat"
  },
  choices: {
    90: 3,
    106: 4,
    921: 1
  },
  limit: {
    soft: 10
  }
}, {
  name: "Learn Recipe",
  after: ["Ballroom"],
  completed: () => property_get("spookyravenRecipeUsed") === "with_glasses",
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor4&action=manor4_chamberwall");
    (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_manor_templateObject44 || (level11_manor_templateObject44 = level11_manor_taggedTemplateLiteral(["recipe: mortar-dissolving solution"]))));
  },
  outfit: {
    equip: template_string_$items(level11_manor_templateObject45 || (level11_manor_templateObject45 = level11_manor_taggedTemplateLiteral(["Lord Spookyraven's spectacles"])))
  },
  limit: {
    tries: 1
  }
}, {
  name: "Wine Cellar",
  after: ["Learn Recipe"],
  completed: () => have(template_string_$item(level11_manor_templateObject46 || (level11_manor_templateObject46 = level11_manor_taggedTemplateLiteral(["bottle of Chateau de Vinegar"])))) || have(template_string_$item(level11_manor_templateObject47 || (level11_manor_templateObject47 = level11_manor_taggedTemplateLiteral(["unstable fulminate"])))) || have(template_string_$item(level11_manor_templateObject48 || (level11_manor_templateObject48 = level11_manor_taggedTemplateLiteral(["wine bomb"])))) || step("questL11Manor") >= 3,
  do: $location(level11_manor_templateObject49 || (level11_manor_templateObject49 = level11_manor_taggedTemplateLiteral(["The Haunted Wine Cellar"]))),
  outfit: {
    modifier: "item, booze drop"
  },
  choices: {
    901: 2
  },
  combat: new combat_CombatStrategy().killItem($monster(level11_manor_templateObject50 || (level11_manor_templateObject50 = level11_manor_taggedTemplateLiteral(["possessed wine rack"])))).banish($monsters(level11_manor_templateObject51 || (level11_manor_templateObject51 = level11_manor_taggedTemplateLiteral(["mad wino, skeletal sommelier"])))),
  limit: {
    soft: 10
  }
}, {
  name: "Laundry Room",
  after: ["Learn Recipe"],
  completed: () => have(template_string_$item(level11_manor_templateObject52 || (level11_manor_templateObject52 = level11_manor_taggedTemplateLiteral(["blasting soda"])))) || have(template_string_$item(level11_manor_templateObject53 || (level11_manor_templateObject53 = level11_manor_taggedTemplateLiteral(["unstable fulminate"])))) || have(template_string_$item(level11_manor_templateObject54 || (level11_manor_templateObject54 = level11_manor_taggedTemplateLiteral(["wine bomb"])))) || step("questL11Manor") >= 3,
  do: $location(level11_manor_templateObject55 || (level11_manor_templateObject55 = level11_manor_taggedTemplateLiteral(["The Haunted Laundry Room"]))),
  outfit: {
    modifier: "item, food drop"
  },
  choices: {
    891: 2
  },
  combat: new combat_CombatStrategy().killItem($monster(level11_manor_templateObject56 || (level11_manor_templateObject56 = level11_manor_taggedTemplateLiteral(["cabinet of Dr. Limpieza"])))).banish($monsters(level11_manor_templateObject57 || (level11_manor_templateObject57 = level11_manor_taggedTemplateLiteral(["plaid ghost, possessed laundry press"])))),
  limit: {
    soft: 10
  }
}, {
  name: "Fulminate",
  after: ["Wine Cellar", "Laundry Room"],
  completed: () => have(template_string_$item(level11_manor_templateObject58 || (level11_manor_templateObject58 = level11_manor_taggedTemplateLiteral(["unstable fulminate"])))) || have(template_string_$item(level11_manor_templateObject59 || (level11_manor_templateObject59 = level11_manor_taggedTemplateLiteral(["wine bomb"])))) || step("questL11Manor") >= 3,
  do: () => (0,external_kolmafia_namespaceObject.create)(template_string_$item(level11_manor_templateObject60 || (level11_manor_templateObject60 = level11_manor_taggedTemplateLiteral(["unstable fulminate"])))),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Boiler Room",
  after: ["Fulminate"],
  completed: () => have(template_string_$item(level11_manor_templateObject61 || (level11_manor_templateObject61 = level11_manor_taggedTemplateLiteral(["wine bomb"])))) || step("questL11Manor") >= 3,
  prepare: () => {
    if ((0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") < 81) (0,external_kolmafia_namespaceObject.changeMcd)(10);
  },
  post: () => {
    if ((0,external_kolmafia_namespaceObject.currentMcd)() > 0) (0,external_kolmafia_namespaceObject.changeMcd)(0);
  },
  do: $location(level11_manor_templateObject62 || (level11_manor_templateObject62 = level11_manor_taggedTemplateLiteral(["The Haunted Boiler Room"]))),
  outfit: () => {
    if (have(template_string_$item(level11_manor_templateObject63 || (level11_manor_templateObject63 = level11_manor_taggedTemplateLiteral(["old patched suit-pants"])))) && have(template_string_$item(level11_manor_templateObject64 || (level11_manor_templateObject64 = level11_manor_taggedTemplateLiteral(["backup camera"]))))) // eslint-disable-next-line libram/verify-constants
      return {
        modifier: "ML",
        equip: template_string_$items(level11_manor_templateObject65 || (level11_manor_templateObject65 = level11_manor_taggedTemplateLiteral(["unstable fulminate, old patched suit-pants"]))),
        avoid: template_string_$items(level11_manor_templateObject66 || (level11_manor_templateObject66 = level11_manor_taggedTemplateLiteral(["Jurassic Parka"])))
      };
    return {
      modifier: "ML",
      equip: template_string_$items(level11_manor_templateObject67 || (level11_manor_templateObject67 = level11_manor_taggedTemplateLiteral(["unstable fulminate, old patched suit-pants"])))
    };
  },
  choices: {
    902: 2
  },
  combat: new combat_CombatStrategy().kill($monster(level11_manor_templateObject68 || (level11_manor_templateObject68 = level11_manor_taggedTemplateLiteral(["monstrous boiler"])))).banish($monsters(level11_manor_templateObject69 || (level11_manor_templateObject69 = level11_manor_taggedTemplateLiteral(["coaltergeist, steam elemental"])))),
  limit: {
    soft: 10
  }
}, {
  name: "Blow Wall",
  after: ["Boiler Room"],
  completed: () => step("questL11Manor") >= 3,
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor4&action=manor4_chamberwall"),
  limit: {
    tries: 1
  },
  freeaction: true
}];
var ManorQuest = {
  name: "Manor",
  tasks: [{
    name: "Start",
    after: [],
    completed: () => step("questM20Necklace") >= 0,
    do: () => (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_manor_templateObject70 || (level11_manor_templateObject70 = level11_manor_taggedTemplateLiteral(["telegram from Lady Spookyraven"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }].concat(Manor1, Manor2, ManorBasement, [{
    name: "Boss",
    after: ["Blow Wall"],
    completed: () => step("questL11Manor") >= 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor4&action=manor4_chamberboss"),
    combat: new combat_CombatStrategy().kill(),
    limit: {
      tries: 1
    },
    boss: true
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level11_palindome.ts
var level11_palindome_templateObject, level11_palindome_templateObject2, level11_palindome_templateObject3, level11_palindome_templateObject4, level11_palindome_templateObject5, level11_palindome_templateObject6, level11_palindome_templateObject7, level11_palindome_templateObject8, level11_palindome_templateObject9, level11_palindome_templateObject10, level11_palindome_templateObject11, level11_palindome_templateObject12, level11_palindome_templateObject13, level11_palindome_templateObject14, level11_palindome_templateObject15, level11_palindome_templateObject16, level11_palindome_templateObject17, level11_palindome_templateObject18, level11_palindome_templateObject19, level11_palindome_templateObject20, level11_palindome_templateObject21, level11_palindome_templateObject22, level11_palindome_templateObject23, level11_palindome_templateObject24, level11_palindome_templateObject25, level11_palindome_templateObject26, level11_palindome_templateObject27, level11_palindome_templateObject28, level11_palindome_templateObject29, level11_palindome_templateObject30, level11_palindome_templateObject31, level11_palindome_templateObject32, level11_palindome_templateObject33, level11_palindome_templateObject34, level11_palindome_templateObject35, level11_palindome_templateObject36, level11_palindome_templateObject37, level11_palindome_templateObject38, level11_palindome_templateObject39, level11_palindome_templateObject40, level11_palindome_templateObject41, level11_palindome_templateObject42, level11_palindome_templateObject43, level11_palindome_templateObject44, level11_palindome_templateObject45, level11_palindome_templateObject46, level11_palindome_templateObject47, level11_palindome_templateObject48, level11_palindome_templateObject49, level11_palindome_templateObject50, level11_palindome_templateObject51, level11_palindome_templateObject52, level11_palindome_templateObject53, level11_palindome_templateObject54, level11_palindome_templateObject55, level11_palindome_templateObject56, level11_palindome_templateObject57, level11_palindome_templateObject58, level11_palindome_templateObject59, level11_palindome_templateObject60, level11_palindome_templateObject61, level11_palindome_templateObject62, level11_palindome_templateObject63, level11_palindome_templateObject64, level11_palindome_templateObject65, level11_palindome_templateObject66, level11_palindome_templateObject67, level11_palindome_templateObject68, level11_palindome_templateObject69, level11_palindome_templateObject70, level11_palindome_templateObject71, level11_palindome_templateObject72, level11_palindome_templateObject73, level11_palindome_templateObject74, level11_palindome_templateObject75, level11_palindome_templateObject76, level11_palindome_templateObject77, level11_palindome_templateObject78, level11_palindome_templateObject79, level11_palindome_templateObject80, level11_palindome_templateObject81, level11_palindome_templateObject82, level11_palindome_templateObject83, level11_palindome_templateObject84, level11_palindome_templateObject85, level11_palindome_templateObject86, level11_palindome_templateObject87, level11_palindome_templateObject88, level11_palindome_templateObject89, level11_palindome_templateObject90, level11_palindome_templateObject91, level11_palindome_templateObject92, level11_palindome_templateObject93, level11_palindome_templateObject94, level11_palindome_templateObject95, level11_palindome_templateObject96, level11_palindome_templateObject97, level11_palindome_templateObject98, level11_palindome_templateObject99, level11_palindome_templateObject100, level11_palindome_templateObject101, level11_palindome_templateObject102, level11_palindome_templateObject103, level11_palindome_templateObject104, level11_palindome_templateObject105, level11_palindome_templateObject106, level11_palindome_templateObject107, level11_palindome_templateObject108, level11_palindome_templateObject109, level11_palindome_templateObject110, level11_palindome_templateObject111, level11_palindome_templateObject112, level11_palindome_templateObject113, level11_palindome_templateObject114, level11_palindome_templateObject115, level11_palindome_templateObject116, level11_palindome_templateObject117, level11_palindome_templateObject118, level11_palindome_templateObject119, level11_palindome_templateObject120, level11_palindome_templateObject121, level11_palindome_templateObject122, level11_palindome_templateObject123, level11_palindome_templateObject124;

function level11_palindome_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







function shenItem(item) {
  return property_get("shenQuestItem") === item.name && (step("questL11Shen") === 1 || step("questL11Shen") === 3 || step("questL11Shen") === 5);
}

var Copperhead = [{
  name: "Copperhead Start",
  after: ["Macguffin/Diary"],
  completed: () => step("questL11Shen") >= 1,
  do: $location(level11_palindome_templateObject || (level11_palindome_templateObject = level11_palindome_taggedTemplateLiteral(["The Copperhead Club"]))),
  choices: {
    1074: 1
  },
  limit: {
    tries: 1
  }
}, {
  name: "Copperhead",
  after: ["Copperhead Start"],
  ready: () => step("questL11Shen") === 2 || step("questL11Shen") === 4 || step("questL11Shen") === 6,
  completed: () => step("questL11Shen") === 999,
  prepare: () => {
    if (have(template_string_$item(level11_palindome_templateObject2 || (level11_palindome_templateObject2 = level11_palindome_taggedTemplateLiteral(["crappy waiter disguise"]))))) ensureEffect($effect(level11_palindome_templateObject3 || (level11_palindome_templateObject3 = level11_palindome_taggedTemplateLiteral(["Crappily Disguised as a Waiter"]))));
  },
  do: $location(level11_palindome_templateObject4 || (level11_palindome_templateObject4 = level11_palindome_taggedTemplateLiteral(["The Copperhead Club"]))),
  combat: new combat_CombatStrategy().killItem([$monster(level11_palindome_templateObject5 || (level11_palindome_templateObject5 = level11_palindome_taggedTemplateLiteral(["Copperhead Club bartender"]))), $monster(level11_palindome_templateObject6 || (level11_palindome_templateObject6 = level11_palindome_taggedTemplateLiteral(["ninja dressed as a waiter"]))), $monster(level11_palindome_templateObject7 || (level11_palindome_templateObject7 = level11_palindome_taggedTemplateLiteral(["waiter dressed as a ninja"])))]),
  choices: {
    852: 1,
    853: 1,
    854: 1,
    855: () => {
      return property_get("copperheadClubHazard") !== "lantern" ? 3 : 4;
    }
  },
  limit: {
    tries: 30
  } // Extra waiter disguise adventures

}, {
  name: "Bat Snake",
  after: ["Copperhead Start", "Bat/Use Sonar 1"],
  ready: () => shenItem(template_string_$item(level11_palindome_templateObject8 || (level11_palindome_templateObject8 = level11_palindome_taggedTemplateLiteral(["The Stankara Stone"])))) && ($location(level11_palindome_templateObject9 || (level11_palindome_templateObject9 = level11_palindome_taggedTemplateLiteral(["The Batrat and Ratbat Burrow"]))).turnsSpent < 5 || (0,external_kolmafia_namespaceObject.myBasestat)($stat(level11_palindome_templateObject10 || (level11_palindome_templateObject10 = level11_palindome_taggedTemplateLiteral(["Moxie"])))) >= 200),
  completed: () => step("questL11Shen") === 999 || have(template_string_$item(level11_palindome_templateObject11 || (level11_palindome_templateObject11 = level11_palindome_taggedTemplateLiteral(["The Stankara Stone"])))) || (0,external_kolmafia_namespaceObject.myDaycount)() === 1 && step("questL11Shen") > 1,
  do: $location(level11_palindome_templateObject12 || (level11_palindome_templateObject12 = level11_palindome_taggedTemplateLiteral(["The Batrat and Ratbat Burrow"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject13 || (level11_palindome_templateObject13 = level11_palindome_taggedTemplateLiteral(["Batsnake"])))).killItem(),
  outfit: {
    modifier: "item",
    avoid: template_string_$items(level11_palindome_templateObject14 || (level11_palindome_templateObject14 = level11_palindome_taggedTemplateLiteral(["broken champagne bottle"])))
  },
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Cold Snake",
  after: ["Copperhead Start", "McLargeHuge/Trapper Return", "Summon/White Lion"],
  ready: () => shenItem(template_string_$item(level11_palindome_templateObject15 || (level11_palindome_templateObject15 = level11_palindome_taggedTemplateLiteral(["The First Pizza"])))),
  completed: () => step("questL11Shen") === 999 || have(template_string_$item(level11_palindome_templateObject16 || (level11_palindome_templateObject16 = level11_palindome_taggedTemplateLiteral(["The First Pizza"])))) || (0,external_kolmafia_namespaceObject.myDaycount)() === 1 && step("questL11Shen") > 3,
  prepare: () => {
    (0,external_kolmafia_namespaceObject.restoreHp)((0,external_kolmafia_namespaceObject.myMaxhp)());
  },
  do: $location(level11_palindome_templateObject17 || (level11_palindome_templateObject17 = level11_palindome_taggedTemplateLiteral(["Lair of the Ninja Snowmen"]))),
  outfit: {
    modifier: "50 combat, init"
  },
  combat: new combat_CombatStrategy().killHard([$monster(level11_palindome_templateObject18 || (level11_palindome_templateObject18 = level11_palindome_taggedTemplateLiteral(["Frozen Solid Snake"]))), $monster(level11_palindome_templateObject19 || (level11_palindome_templateObject19 = level11_palindome_taggedTemplateLiteral(["ninja snowman assassin"])))]),
  orbtargets: () => [],
  // no assassins in orbs
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Hot Snake Precastle",
  after: ["Copperhead Start", "Giant/Ground"],
  acquire: [{
    item: template_string_$item(level11_palindome_templateObject20 || (level11_palindome_templateObject20 = level11_palindome_taggedTemplateLiteral(["Mohawk wig"])))
  }],
  ready: () => shenItem(template_string_$item(level11_palindome_templateObject21 || (level11_palindome_templateObject21 = level11_palindome_taggedTemplateLiteral(["Murphy's Rancid Black Flag"])))) && !have(template_string_$item(level11_palindome_templateObject22 || (level11_palindome_templateObject22 = level11_palindome_taggedTemplateLiteral(["steam-powered model rocketship"])))),
  completed: () => step("questL11Shen") === 999 || have(template_string_$item(level11_palindome_templateObject23 || (level11_palindome_templateObject23 = level11_palindome_taggedTemplateLiteral(["Murphy's Rancid Black Flag"])))),
  do: $location(level11_palindome_templateObject24 || (level11_palindome_templateObject24 = level11_palindome_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
  outfit: {
    equip: template_string_$items(level11_palindome_templateObject25 || (level11_palindome_templateObject25 = level11_palindome_taggedTemplateLiteral(["Mohawk wig"]))),
    modifier: "-combat"
  },
  choices: {
    675: 4,
    676: 4,
    677: () => {
      return step("questL10Garbage") >= 10 ? 2 : 1;
    },
    678: () => {
      return step("questL10Garbage") >= 10 ? 3 : 1;
    },
    679: 1,
    1431: 4
  },
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject26 || (level11_palindome_templateObject26 = level11_palindome_taggedTemplateLiteral(["Burning Snake of Fire"])))),
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Hot Snake Postcastle",
  after: ["Copperhead Start", "Giant/Ground"],
  ready: () => shenItem(template_string_$item(level11_palindome_templateObject27 || (level11_palindome_templateObject27 = level11_palindome_taggedTemplateLiteral(["Murphy's Rancid Black Flag"])))) && have(template_string_$item(level11_palindome_templateObject28 || (level11_palindome_templateObject28 = level11_palindome_taggedTemplateLiteral(["steam-powered model rocketship"])))),
  completed: () => step("questL11Shen") === 999 || have(template_string_$item(level11_palindome_templateObject29 || (level11_palindome_templateObject29 = level11_palindome_taggedTemplateLiteral(["Murphy's Rancid Black Flag"])))),
  do: $location(level11_palindome_templateObject30 || (level11_palindome_templateObject30 = level11_palindome_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
  choices: {
    675: 4,
    676: 4,
    677: 1,
    678: 1,
    679: 1,
    1431: 4
  },
  outfit: {
    modifier: "+combat"
  },
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject31 || (level11_palindome_templateObject31 = level11_palindome_taggedTemplateLiteral(["Burning Snake of Fire"])))),
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Sleaze Star Snake",
  after: ["Copperhead Start", "Giant/Unlock HITS"],
  ready: () => shenItem(template_string_$item(level11_palindome_templateObject32 || (level11_palindome_templateObject32 = level11_palindome_taggedTemplateLiteral(["The Eye of the Stars"])))),
  completed: () => step("questL11Shen") === 999 || have(template_string_$item(level11_palindome_templateObject33 || (level11_palindome_templateObject33 = level11_palindome_taggedTemplateLiteral(["The Eye of the Stars"])))),
  do: $location(level11_palindome_templateObject34 || (level11_palindome_templateObject34 = level11_palindome_taggedTemplateLiteral(["The Hole in the Sky"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject35 || (level11_palindome_templateObject35 = level11_palindome_taggedTemplateLiteral(["The Snake With Like Ten Heads"])))),
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Sleaze Frat Snake",
  after: ["Copperhead Start"],
  ready: () => shenItem(template_string_$item(level11_palindome_templateObject36 || (level11_palindome_templateObject36 = level11_palindome_taggedTemplateLiteral(["The Lacrosse Stick of Lacoronado"])))),
  completed: () => step("questL11Shen") === 999 || have(template_string_$item(level11_palindome_templateObject37 || (level11_palindome_templateObject37 = level11_palindome_taggedTemplateLiteral(["The Lacrosse Stick of Lacoronado"])))),
  do: $location(level11_palindome_templateObject38 || (level11_palindome_templateObject38 = level11_palindome_taggedTemplateLiteral(["The Smut Orc Logging Camp"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject39 || (level11_palindome_templateObject39 = level11_palindome_taggedTemplateLiteral(["The Frattlesnake"])))),
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Spooky Snake Precrypt",
  after: ["Copperhead Start"],
  ready: () => shenItem(template_string_$item(level11_palindome_templateObject40 || (level11_palindome_templateObject40 = level11_palindome_taggedTemplateLiteral(["The Shield of Brook"])))) && step("questL07Cyrptic") < 999,
  completed: () => step("questL11Shen") === 999 || have(template_string_$item(level11_palindome_templateObject41 || (level11_palindome_templateObject41 = level11_palindome_taggedTemplateLiteral(["The Shield of Brook"])))),
  do: $location(level11_palindome_templateObject42 || (level11_palindome_templateObject42 = level11_palindome_taggedTemplateLiteral(["The Unquiet Garves"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject43 || (level11_palindome_templateObject43 = level11_palindome_taggedTemplateLiteral(["Snakeleton"])))),
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Spooky Snake Postcrypt",
  after: ["Copperhead Start"],
  ready: () => shenItem(template_string_$item(level11_palindome_templateObject44 || (level11_palindome_templateObject44 = level11_palindome_taggedTemplateLiteral(["The Shield of Brook"])))) && step("questL07Cyrptic") === 999,
  completed: () => step("questL11Shen") === 999 || have(template_string_$item(level11_palindome_templateObject45 || (level11_palindome_templateObject45 = level11_palindome_taggedTemplateLiteral(["The Shield of Brook"])))),
  do: $location(level11_palindome_templateObject46 || (level11_palindome_templateObject46 = level11_palindome_taggedTemplateLiteral(["The VERY Unquiet Garves"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject47 || (level11_palindome_templateObject47 = level11_palindome_taggedTemplateLiteral(["Snakeleton"])))),
  limit: {
    soft: 10
  },
  delay: 5
}];
var Zepplin = [{
  name: "Protesters Start",
  after: ["Macguffin/Diary"],
  completed: () => step("questL11Ron") >= 1,
  do: $location(level11_palindome_templateObject48 || (level11_palindome_templateObject48 = level11_palindome_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject49 || (level11_palindome_templateObject49 = level11_palindome_taggedTemplateLiteral(["The Nuge"])))),
  choices: {
    856: 1,
    857: 1,
    858: 1,
    866: 2,
    1432: 1
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Protesters",
  after: ["Protesters Start", "Misc/Hermit Clover", "McLargeHuge/Clover Ore"],
  ready: () => (0,external_kolmafia_namespaceObject.canEquip)(template_string_$item(level11_palindome_templateObject50 || (level11_palindome_templateObject50 = level11_palindome_taggedTemplateLiteral(["transparent pants"])))) && ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_palindome_templateObject51 || (level11_palindome_templateObject51 = level11_palindome_taggedTemplateLiteral(["11-leaf clover"])))) > 1 || have(template_string_$item(level11_palindome_templateObject52 || (level11_palindome_templateObject52 = level11_palindome_taggedTemplateLiteral(["Flamin' Whatshisname"])))) || step("questL11Shen") === 999),
  prepare: () => {
    if (have(template_string_$item(level11_palindome_templateObject53 || (level11_palindome_templateObject53 = level11_palindome_taggedTemplateLiteral(["lynyrd musk"]))))) ensureEffect($effect(level11_palindome_templateObject54 || (level11_palindome_templateObject54 = level11_palindome_taggedTemplateLiteral(["Musky"]))));
    if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_palindome_templateObject55 || (level11_palindome_templateObject55 = level11_palindome_taggedTemplateLiteral(["11-leaf clover"])))) > 1 && !have($effect(level11_palindome_templateObject56 || (level11_palindome_templateObject56 = level11_palindome_taggedTemplateLiteral(["Lucky!"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_palindome_templateObject57 || (level11_palindome_templateObject57 = level11_palindome_taggedTemplateLiteral(["11-leaf clover"]))));
  },
  completed: () => property_get("zeppelinProtestors") >= 80,
  do: $location(level11_palindome_templateObject58 || (level11_palindome_templateObject58 = level11_palindome_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))),
  combat: new combat_CombatStrategy().macro(new Macro().tryItem(template_string_$item(level11_palindome_templateObject59 || (level11_palindome_templateObject59 = level11_palindome_taggedTemplateLiteral(["cigarette lighter"]))))).killHard($monster(level11_palindome_templateObject60 || (level11_palindome_templateObject60 = level11_palindome_taggedTemplateLiteral(["The Nuge"])))).killItem($monster(level11_palindome_templateObject61 || (level11_palindome_templateObject61 = level11_palindome_taggedTemplateLiteral(["Blue Oyster cultist"])))).killItem($monster(level11_palindome_templateObject62 || (level11_palindome_templateObject62 = level11_palindome_taggedTemplateLiteral(["lynyrd skinner"])))).kill(),
  choices: {
    856: 1,
    857: 1,
    858: 1,
    866: 2,
    1432: 1
  },
  outfit: () => {
    var sleazeitems = template_string_$items(level11_palindome_templateObject63 || (level11_palindome_templateObject63 = level11_palindome_taggedTemplateLiteral(["deck of lewd playing cards"])));
    if (have(template_string_$item(level11_palindome_templateObject64 || (level11_palindome_templateObject64 = level11_palindome_taggedTemplateLiteral(["designer sweatpants"]))))) sleazeitems.push(template_string_$item(level11_palindome_templateObject65 || (level11_palindome_templateObject65 = level11_palindome_taggedTemplateLiteral(["designer sweatpants"]))));else if (have(template_string_$item(level11_palindome_templateObject66 || (level11_palindome_templateObject66 = level11_palindome_taggedTemplateLiteral(["transparent pants"]))))) sleazeitems.push(template_string_$item(level11_palindome_templateObject67 || (level11_palindome_templateObject67 = level11_palindome_taggedTemplateLiteral(["transparent pants"]))));
    if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_palindome_templateObject68 || (level11_palindome_templateObject68 = level11_palindome_taggedTemplateLiteral(["11-leaf clover"])))) > 1 || have($effect(level11_palindome_templateObject69 || (level11_palindome_templateObject69 = level11_palindome_taggedTemplateLiteral(["Lucky!"]))))) return {
      modifier: "sleaze dmg, sleaze spell dmg",
      equip: sleazeitems,
      skipDefaults: true
    };
    return {
      modifier: "-combat, sleaze dmg, sleaze spell dmg",
      equip: sleazeitems
    };
  },
  limit: {
    soft: 30
  }
}, {
  name: "Protesters Finish",
  after: ["Protesters"],
  completed: () => step("questL11Ron") >= 2,
  do: $location(level11_palindome_templateObject70 || (level11_palindome_templateObject70 = level11_palindome_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))),
  combat: new combat_CombatStrategy().killHard($monster(level11_palindome_templateObject71 || (level11_palindome_templateObject71 = level11_palindome_taggedTemplateLiteral(["The Nuge"])))),
  choices: {
    856: 1,
    857: 1,
    858: 1,
    866: 2,
    1432: 1
  },
  limit: {
    tries: 2
  },
  // If clovers were used before the intro adventure, we need to clear both the intro and closing advs here.
  freeaction: true
}, {
  name: "Zepplin",
  after: ["Protesters Finish"],
  completed: () => step("questL11Ron") >= 5,
  prepare: () => {
    if (have(template_string_$item(level11_palindome_templateObject72 || (level11_palindome_templateObject72 = level11_palindome_taggedTemplateLiteral(["Red Zeppelin ticket"]))))) return;
    (0,external_kolmafia_namespaceObject.visitUrl)("woods.php");
    (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=blackmarket");
    (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=blackmarket&action=buyitem&whichrow=289&ajax=1&quantity=1");
    if (!have(template_string_$item(level11_palindome_templateObject73 || (level11_palindome_templateObject73 = level11_palindome_taggedTemplateLiteral(["Red Zeppelin ticket"]))))) throw "Unable to buy Red Zeppelin ticket; please buy manually";
  },
  do: $location(level11_palindome_templateObject74 || (level11_palindome_templateObject74 = level11_palindome_taggedTemplateLiteral(["The Red Zeppelin"]))),
  combat: new combat_CombatStrategy().kill($monster(level11_palindome_templateObject75 || (level11_palindome_templateObject75 = level11_palindome_taggedTemplateLiteral(["Ron \"The Weasel\" Copperhead"])))).macro(() => {
    if (property_get("_glarkCableUses") < 5) return new Macro().tryItem(template_string_$item(level11_palindome_templateObject76 || (level11_palindome_templateObject76 = level11_palindome_taggedTemplateLiteral(["glark cable"]))));else return new Macro();
  }, $monsters(level11_palindome_templateObject77 || (level11_palindome_templateObject77 = level11_palindome_taggedTemplateLiteral(["man with the red buttons, red skeleton, red butler"])))).banish($monsters(level11_palindome_templateObject78 || (level11_palindome_templateObject78 = level11_palindome_taggedTemplateLiteral(["Red Herring, Red Snapper"])))).kill(),
  limit: {
    soft: 13
  }
}];
var Dome = [{
  name: "Talisman",
  after: ["Copperhead", "Zepplin", "Bat Snake", "Cold Snake", "Hot Snake Precastle", "Hot Snake Postcastle", "Sleaze Star Snake", "Sleaze Frat Snake", "Spooky Snake Precrypt", "Spooky Snake Postcrypt"],
  completed: () => have(template_string_$item(level11_palindome_templateObject79 || (level11_palindome_templateObject79 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"])))),
  do: () => (0,external_kolmafia_namespaceObject.create)(template_string_$item(level11_palindome_templateObject80 || (level11_palindome_templateObject80 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"])))),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Palindome Dog",
  after: ["Talisman", "Manor/Bedroom Camera"],
  completed: () => have(template_string_$item(level11_palindome_templateObject81 || (level11_palindome_templateObject81 = level11_palindome_taggedTemplateLiteral(["photograph of a dog"])))) || step("questL11Palindome") >= 3,
  do: $location(level11_palindome_templateObject82 || (level11_palindome_templateObject82 = level11_palindome_taggedTemplateLiteral(["Inside the Palindome"]))),
  outfit: () => {
    if (have(template_string_$item(level11_palindome_templateObject83 || (level11_palindome_templateObject83 = level11_palindome_taggedTemplateLiteral(["stunt nuts"]))))) return {
      equip: template_string_$items(level11_palindome_templateObject84 || (level11_palindome_templateObject84 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat"
    };
    return {
      equip: template_string_$items(level11_palindome_templateObject85 || (level11_palindome_templateObject85 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat, item",
      avoid: template_string_$items(level11_palindome_templateObject86 || (level11_palindome_templateObject86 = level11_palindome_taggedTemplateLiteral(["broken champagne bottle"])))
    };
  },
  combat: new combat_CombatStrategy().banish($monsters(level11_palindome_templateObject87 || (level11_palindome_templateObject87 = level11_palindome_taggedTemplateLiteral(["Evil Olive, Flock of Stab-bats, Taco Cat, Tan Gnat"])))).macro(new Macro().item(template_string_$item(level11_palindome_templateObject88 || (level11_palindome_templateObject88 = level11_palindome_taggedTemplateLiteral(["disposable instant camera"])))), $monsters(level11_palindome_templateObject89 || (level11_palindome_templateObject89 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"])))).killItem($monsters(level11_palindome_templateObject90 || (level11_palindome_templateObject90 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"])))).kill(),
  limit: {
    soft: 20
  }
}, {
  name: "Palindome Dudes",
  after: ["Palindome Dog"],
  completed: () => have(external_kolmafia_namespaceObject.Item.get(7262)) || step("questL11Palindome") >= 3,
  do: $location(level11_palindome_templateObject91 || (level11_palindome_templateObject91 = level11_palindome_taggedTemplateLiteral(["Inside the Palindome"]))),
  outfit: () => {
    if (have(template_string_$item(level11_palindome_templateObject92 || (level11_palindome_templateObject92 = level11_palindome_taggedTemplateLiteral(["stunt nuts"]))))) return {
      equip: template_string_$items(level11_palindome_templateObject93 || (level11_palindome_templateObject93 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat"
    };
    return {
      equip: template_string_$items(level11_palindome_templateObject94 || (level11_palindome_templateObject94 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat, item",
      avoid: template_string_$items(level11_palindome_templateObject95 || (level11_palindome_templateObject95 = level11_palindome_taggedTemplateLiteral(["broken champagne bottle"])))
    };
  },
  combat: new combat_CombatStrategy().banish($monsters(level11_palindome_templateObject96 || (level11_palindome_templateObject96 = level11_palindome_taggedTemplateLiteral(["Evil Olive, Flock of Stab-bats, Taco Cat, Tan Gnat"])))).killItem($monsters(level11_palindome_templateObject97 || (level11_palindome_templateObject97 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"])))).kill(),
  limit: {
    soft: 20
  }
}, {
  name: "Palindome Photos",
  after: ["Palindome Dudes"],
  completed: () => have(template_string_$item(level11_palindome_templateObject98 || (level11_palindome_templateObject98 = level11_palindome_taggedTemplateLiteral(["photograph of a red nugget"])))) && have(template_string_$item(level11_palindome_templateObject99 || (level11_palindome_templateObject99 = level11_palindome_taggedTemplateLiteral(["photograph of God"])))) && have(template_string_$item(level11_palindome_templateObject100 || (level11_palindome_templateObject100 = level11_palindome_taggedTemplateLiteral(["photograph of an ostrich egg"])))) || step("questL11Palindome") >= 3,
  do: $location(level11_palindome_templateObject101 || (level11_palindome_templateObject101 = level11_palindome_taggedTemplateLiteral(["Inside the Palindome"]))),
  outfit: () => {
    if (have(template_string_$item(level11_palindome_templateObject102 || (level11_palindome_templateObject102 = level11_palindome_taggedTemplateLiteral(["stunt nuts"]))))) return {
      equip: template_string_$items(level11_palindome_templateObject103 || (level11_palindome_templateObject103 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat"
    };
    return {
      equip: template_string_$items(level11_palindome_templateObject104 || (level11_palindome_templateObject104 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat, item",
      avoid: template_string_$items(level11_palindome_templateObject105 || (level11_palindome_templateObject105 = level11_palindome_taggedTemplateLiteral(["broken champagne bottle"])))
    };
  },
  combat: new combat_CombatStrategy().killItem($monsters(level11_palindome_templateObject106 || (level11_palindome_templateObject106 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Palindome Nuts",
  after: ["Palindome Photos"],
  do: $location(level11_palindome_templateObject107 || (level11_palindome_templateObject107 = level11_palindome_taggedTemplateLiteral(["Inside the Palindome"]))),
  completed: () => have(template_string_$item(level11_palindome_templateObject108 || (level11_palindome_templateObject108 = level11_palindome_taggedTemplateLiteral(["stunt nuts"])))) || have(template_string_$item(level11_palindome_templateObject109 || (level11_palindome_templateObject109 = level11_palindome_taggedTemplateLiteral(["wet stunt nut stew"])))) || step("questL11Palindome") >= 5,
  outfit: {
    equip: template_string_$items(level11_palindome_templateObject110 || (level11_palindome_templateObject110 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
    modifier: "item",
    avoid: template_string_$items(level11_palindome_templateObject111 || (level11_palindome_templateObject111 = level11_palindome_taggedTemplateLiteral(["broken champagne bottle"])))
  },
  combat: new combat_CombatStrategy().killItem($monsters(level11_palindome_templateObject112 || (level11_palindome_templateObject112 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Alarm Gem",
  after: ["Palindome Dudes", "Palindome Photos"],
  completed: () => step("questL11Palindome") >= 3,
  do: () => {
    if (have(external_kolmafia_namespaceObject.Item.get(7262))) (0,external_kolmafia_namespaceObject.use)(external_kolmafia_namespaceObject.Item.get(7262));
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=palindome&action=pal_droffice");
    (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=".concat((0,external_kolmafia_namespaceObject.myHash)(), "&whichchoice=872&option=1&photo1=2259&photo2=7264&photo3=7263&photo4=7265"));
    (0,external_kolmafia_namespaceObject.use)(1, external_kolmafia_namespaceObject.Item.get(7270));
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=palindome&action=pal_mroffice");
    fillHp();
  },
  outfit: {
    equip: template_string_$items(level11_palindome_templateObject113 || (level11_palindome_templateObject113 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"])))
  },
  limit: {
    tries: 1
  },
  freeaction: true,
  expectbeatenup: true
}, {
  name: "Grove",
  after: ["Alarm Gem"],
  completed: () => have(template_string_$item(level11_palindome_templateObject114 || (level11_palindome_templateObject114 = level11_palindome_taggedTemplateLiteral(["bird rib"])))) && have(template_string_$item(level11_palindome_templateObject115 || (level11_palindome_templateObject115 = level11_palindome_taggedTemplateLiteral(["lion oil"])))) || have(template_string_$item(level11_palindome_templateObject116 || (level11_palindome_templateObject116 = level11_palindome_taggedTemplateLiteral(["wet stew"])))) || have(template_string_$item(level11_palindome_templateObject117 || (level11_palindome_templateObject117 = level11_palindome_taggedTemplateLiteral(["wet stunt nut stew"])))) || step("questL11Palindome") >= 5,
  do: $location(level11_palindome_templateObject118 || (level11_palindome_templateObject118 = level11_palindome_taggedTemplateLiteral(["Whitey's Grove"]))),
  outfit: {
    modifier: "50 combat, item"
  },
  combat: new combat_CombatStrategy().killItem($monster(level11_palindome_templateObject119 || (level11_palindome_templateObject119 = level11_palindome_taggedTemplateLiteral(["whitesnake"])))).killItem($monster(level11_palindome_templateObject120 || (level11_palindome_templateObject120 = level11_palindome_taggedTemplateLiteral(["white lion"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Open Alarm",
  after: ["Alarm Gem", "Palindome Nuts", "Grove"],
  completed: () => step("questL11Palindome") >= 5,
  do: () => {
    if (!have(template_string_$item(level11_palindome_templateObject121 || (level11_palindome_templateObject121 = level11_palindome_taggedTemplateLiteral(["wet stunt nut stew"]))))) (0,external_kolmafia_namespaceObject.create)(template_string_$item(level11_palindome_templateObject122 || (level11_palindome_templateObject122 = level11_palindome_taggedTemplateLiteral(["wet stunt nut stew"]))));
    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=palindome&action=pal_mrlabel");
  },
  outfit: {
    equip: template_string_$items(level11_palindome_templateObject123 || (level11_palindome_templateObject123 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"])))
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var PalindomeQuest = {
  name: "Palindome",
  tasks: [].concat(Copperhead, Zepplin, Dome, [{
    name: "Boss",
    after: ["Open Alarm"],
    completed: () => step("questL11Palindome") === 999,
    do: () => {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=palindome&action=pal_drlabel");
      (0,external_kolmafia_namespaceObject.runChoice)(-1);
    },
    outfit: {
      equip: template_string_$items(level11_palindome_templateObject124 || (level11_palindome_templateObject124 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat, Mega Gem"])))
    },
    choices: {
      131: 1
    },
    combat: new combat_CombatStrategy().kill(),
    limit: {
      tries: 1
    },
    boss: true
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level11.ts
var level11_templateObject, level11_templateObject2, level11_templateObject3, level11_templateObject4, level11_templateObject5, level11_templateObject6, level11_templateObject7, level11_templateObject8, level11_templateObject9, level11_templateObject10, level11_templateObject11, level11_templateObject12, level11_templateObject13, level11_templateObject14, level11_templateObject15, level11_templateObject16, level11_templateObject17, level11_templateObject18, level11_templateObject19, level11_templateObject20, level11_templateObject21, level11_templateObject22, level11_templateObject23, level11_templateObject24, level11_templateObject25, level11_templateObject26, level11_templateObject27, level11_templateObject28, level11_templateObject29, level11_templateObject30, level11_templateObject31, level11_templateObject32, level11_templateObject33, level11_templateObject34, level11_templateObject35, level11_templateObject36, level11_templateObject37, level11_templateObject38, level11_templateObject39, level11_templateObject40, level11_templateObject41, level11_templateObject42, level11_templateObject43, level11_templateObject44, level11_templateObject45, level11_templateObject46, level11_templateObject47, level11_templateObject48, level11_templateObject49, level11_templateObject50, level11_templateObject51, level11_templateObject52, level11_templateObject53, level11_templateObject54, level11_templateObject55, level11_templateObject56, level11_templateObject57, level11_templateObject58, level11_templateObject59, level11_templateObject60, level11_templateObject61, level11_templateObject62, level11_templateObject63, level11_templateObject64, level11_templateObject65, level11_templateObject66, level11_templateObject67, level11_templateObject68, level11_templateObject69, level11_templateObject70, level11_templateObject71, level11_templateObject72, level11_templateObject73, level11_templateObject74, level11_templateObject75, level11_templateObject76, level11_templateObject77, level11_templateObject78, level11_templateObject79, level11_templateObject80, level11_templateObject81, level11_templateObject82, level11_templateObject83, level11_templateObject84, level11_templateObject85, level11_templateObject86, level11_templateObject87, level11_templateObject88, level11_templateObject89, level11_templateObject90, level11_templateObject91, level11_templateObject92, level11_templateObject93, level11_templateObject94, level11_templateObject95, level11_templateObject96, level11_templateObject97, level11_templateObject98, level11_templateObject99, level11_templateObject100, level11_templateObject101, level11_templateObject102, level11_templateObject103, level11_templateObject104, level11_templateObject105, level11_templateObject106, level11_templateObject107, level11_templateObject108;

function level11_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










var Diary = [{
  name: "Forest",
  after: ["Start"],
  completed: () => step("questL11Black") >= 2,
  prepare: () => {
    if (have(template_string_$item(level11_templateObject || (level11_templateObject = level11_taggedTemplateLiteral(["MayDay\u2122 supply package"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_templateObject2 || (level11_templateObject2 = level11_taggedTemplateLiteral(["MayDay\u2122 supply package"]))));
  },
  do: $location(level11_templateObject3 || (level11_templateObject3 = level11_taggedTemplateLiteral(["The Black Forest"]))),
  post: () => {
    if (have($effect(level11_templateObject4 || (level11_templateObject4 = level11_taggedTemplateLiteral(["Really Quite Poisoned"]))))) uneffect($effect(level11_templateObject5 || (level11_templateObject5 = level11_taggedTemplateLiteral(["Really Quite Poisoned"]))));
  },
  outfit: () => {
    if (have(template_string_$item(level11_templateObject6 || (level11_templateObject6 = level11_taggedTemplateLiteral(["reassembled blackbird"]))))) {
      return {
        equip: template_string_$items(level11_templateObject7 || (level11_templateObject7 = level11_taggedTemplateLiteral(["blackberry galoshes"]))),
        modifier: "50 combat 5max, -1ML"
      };
    } else if (globalStateCache.absorb().isReprocessTarget($monster(level11_templateObject8 || (level11_templateObject8 = level11_taggedTemplateLiteral(["black magic woman"])))) && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(level11_templateObject9 || (level11_templateObject9 = level11_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && globalStateCache.orb().prediction($location(level11_templateObject10 || (level11_templateObject10 = level11_taggedTemplateLiteral(["The Black Forest"])))) === $monster(level11_templateObject11 || (level11_templateObject11 = level11_taggedTemplateLiteral(["black magic woman"])))) {
      // Swoop in for a single adventure to reprocess the black magic woman
      return {
        equip: template_string_$items(level11_templateObject12 || (level11_templateObject12 = level11_taggedTemplateLiteral(["blackberry galoshes, miniature crystal ball"]))),
        familiar: template_string_$familiar(level11_templateObject13 || (level11_templateObject13 = level11_taggedTemplateLiteral(["Grey Goose"]))),
        modifier: "50 combat 5max, -1ML"
      };
    } else {
      return {
        equip: template_string_$items(level11_templateObject14 || (level11_templateObject14 = level11_taggedTemplateLiteral(["blackberry galoshes"]))),
        familiar: template_string_$familiar(level11_templateObject15 || (level11_templateObject15 = level11_taggedTemplateLiteral(["Reassembled Blackbird"]))),
        modifier: "50 combat 5max, item, -1ML",
        avoid: template_string_$items(level11_templateObject16 || (level11_templateObject16 = level11_taggedTemplateLiteral(["broken champagne bottle"])))
      };
    }
  },
  choices: {
    923: 1,
    924: () => {
      if (!have(template_string_$familiar(level11_templateObject17 || (level11_templateObject17 = level11_taggedTemplateLiteral(["Shorter-Order Cook"])))) && !have(template_string_$item(level11_templateObject18 || (level11_templateObject18 = level11_taggedTemplateLiteral(["beehive"]))))) return 3;
      if (!have(template_string_$item(level11_templateObject19 || (level11_templateObject19 = level11_taggedTemplateLiteral(["blackberry galoshes"])))) && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject20 || (level11_templateObject20 = level11_taggedTemplateLiteral(["blackberry"])))) >= 3) return 2;
      return 1;
    },
    928: 4,
    1018: 1,
    1019: 1
  },
  combat: new combat_CombatStrategy().ignore($monster(level11_templateObject21 || (level11_templateObject21 = level11_taggedTemplateLiteral(["blackberry bush"])))).killItem($monsters(level11_templateObject22 || (level11_templateObject22 = level11_taggedTemplateLiteral(["black adder, black panther"])))).kill(),
  orbtargets: () => undefined,
  // do not dodge anything with orb
  limit: {
    soft: 15
  }
}, {
  name: "Buy Documents",
  after: ["Forest"],
  ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 5000,
  completed: () => have(template_string_$item(level11_templateObject23 || (level11_templateObject23 = level11_taggedTemplateLiteral(["forged identification documents"])))) || step("questL11Black") >= 4,
  do: () => {
    (0,external_kolmafia_namespaceObject.visitUrl)("woods.php");
    (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=blackmarket");
    (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=blackmarket&action=buyitem&whichrow=281&ajax=1&quantity=1");
  },
  outfit: {
    equip: template_string_$items(level11_templateObject24 || (level11_templateObject24 = level11_taggedTemplateLiteral(["designer sweatpants"])))
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Diary",
  after: ["Buy Documents", "Misc/Unlock Beach"],
  ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 500,
  completed: () => step("questL11Black") >= 4,
  do: $location(level11_templateObject25 || (level11_templateObject25 = level11_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))),
  post: () => {
    if (step("questL11Black") < 4) {
      debug("Possible mafia diary desync detected; refreshing...");
      (0,external_kolmafia_namespaceObject.cliExecute)("refresh all");
      if (have(template_string_$item(level11_templateObject26 || (level11_templateObject26 = level11_taggedTemplateLiteral(["your father's MacGuffin diary"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_templateObject27 || (level11_templateObject27 = level11_taggedTemplateLiteral(["your father's MacGuffin diary"]))));
      (0,external_kolmafia_namespaceObject.visitUrl)("questlog.php?which=1");
    }
  },
  choices: {
    793: 1
  },
  limit: {
    tries: 1
  }
}];
var Desert = [{
  name: "Scrip",
  after: ["Misc/Unlock Beach"],
  ready: () => (0,external_kolmafia_namespaceObject.myMeat)() >= 6000 || step("questL11Black") >= 4 && (0,external_kolmafia_namespaceObject.myMeat)() >= 500,
  completed: () => have(template_string_$item(level11_templateObject28 || (level11_templateObject28 = level11_taggedTemplateLiteral(["Shore Inc. Ship Trip Scrip"])))) || have(template_string_$item(level11_templateObject29 || (level11_templateObject29 = level11_taggedTemplateLiteral(["UV-resistant compass"])))),
  do: $location(level11_templateObject30 || (level11_templateObject30 = level11_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))),
  choices: {
    793: 1
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Compass",
  after: ["Misc/Unlock Beach", "Scrip"],
  completed: () => have(template_string_$item(level11_templateObject31 || (level11_templateObject31 = level11_taggedTemplateLiteral(["UV-resistant compass"])))),
  do: () => (0,external_kolmafia_namespaceObject.buy)($coinmaster(level11_templateObject32 || (level11_templateObject32 = level11_taggedTemplateLiteral(["The Shore, Inc. Gift Shop"]))), 1, template_string_$item(level11_templateObject33 || (level11_templateObject33 = level11_taggedTemplateLiteral(["UV-resistant compass"])))),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Oasis",
  after: ["Compass"],
  completed: () => property_get("desertExploration") >= 100,
  ready: () => !have($effect(level11_templateObject34 || (level11_templateObject34 = level11_taggedTemplateLiteral(["Ultrahydrated"])))) && property_get("desertExploration") > 0,
  do: $location(level11_templateObject35 || (level11_templateObject35 = level11_taggedTemplateLiteral(["The Oasis"]))),
  limit: {
    soft: 10
  }
}, {
  name: "Oasis Drum",
  after: ["Compass"],
  ready: () => have(template_string_$item(level11_templateObject36 || (level11_templateObject36 = level11_taggedTemplateLiteral(["worm-riding hooks"])))) || (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject37 || (level11_templateObject37 = level11_taggedTemplateLiteral(["worm-riding manual page"])))) >= 15,
  priority: () => have($effect(level11_templateObject38 || (level11_templateObject38 = level11_taggedTemplateLiteral(["Ultrahydrated"])))) ? OverridePriority.Effect : OverridePriority.None,
  completed: () => property_get("desertExploration") >= 100 || have(template_string_$item(level11_templateObject39 || (level11_templateObject39 = level11_taggedTemplateLiteral(["drum machine"])))) || (property_get("gnasirProgress") & 16) !== 0,
  prepare: () => {
    if (globalStateCache.absorb().hasReprocessTargets($location(level11_templateObject40 || (level11_templateObject40 = level11_taggedTemplateLiteral(["The Oasis"]))))) {
      // Use ghost dog chow to prepare to reprocess Blur without needing arena adventures
      while ((0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(level11_templateObject41 || (level11_templateObject41 = level11_taggedTemplateLiteral(["Grey Goose"])))) < 6 && have(template_string_$item(level11_templateObject42 || (level11_templateObject42 = level11_taggedTemplateLiteral(["Ghost Dog Chow"]))))) {
        (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_templateObject43 || (level11_templateObject43 = level11_taggedTemplateLiteral(["Ghost Dog Chow"]))));
      }
    }
  },
  do: $location(level11_templateObject44 || (level11_templateObject44 = level11_taggedTemplateLiteral(["The Oasis"]))),
  combat: new combat_CombatStrategy().killItem($monster(level11_templateObject45 || (level11_templateObject45 = level11_taggedTemplateLiteral(["blur"])))),
  outfit: {
    modifier: "item",
    avoid: template_string_$items(level11_templateObject46 || (level11_templateObject46 = level11_taggedTemplateLiteral(["broken champagne bottle"])))
  },
  limit: {
    soft: 10
  },
  post: () => {
    if (!$location(level11_templateObject47 || (level11_templateObject47 = level11_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"]))).noncombatQueue.includes("A Sietch in Time")) return;

    if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject48 || (level11_templateObject48 = level11_taggedTemplateLiteral(["worm-riding manual page"])))) >= 15 || (property_get("gnasirProgress") & 1) === 0 && have(template_string_$item(level11_templateObject49 || (level11_templateObject49 = level11_taggedTemplateLiteral(["stone rose"]))))) {
      var res = (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=desertbeach&action=db_gnasir");

      while (res.includes("value=2")) {
        res = (0,external_kolmafia_namespaceObject.runChoice)(2);
      }

      (0,external_kolmafia_namespaceObject.runChoice)(1);
    }

    (0,external_kolmafia_namespaceObject.cliExecute)("use * desert sightseeing pamphlet");
    if (have(template_string_$item(level11_templateObject50 || (level11_templateObject50 = level11_taggedTemplateLiteral(["worm-riding hooks"])))) && have(template_string_$item(level11_templateObject51 || (level11_templateObject51 = level11_taggedTemplateLiteral(["drum machine"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_templateObject52 || (level11_templateObject52 = level11_taggedTemplateLiteral(["drum machine"]))));
  }
}, {
  name: "Desert",
  after: ["Diary", "Compass"],
  acquire: [{
    item: template_string_$item(level11_templateObject53 || (level11_templateObject53 = level11_taggedTemplateLiteral(["can of black paint"]))),
    useful: () => (property_get("gnasirProgress") & 2) === 0
  }],
  ready: () => (have(template_string_$item(level11_templateObject54 || (level11_templateObject54 = level11_taggedTemplateLiteral(["can of black paint"])))) || (0,external_kolmafia_namespaceObject.myMeat)() >= 1000 || (property_get("gnasirProgress") & 2) !== 0) && (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject55 || (level11_templateObject55 = level11_taggedTemplateLiteral(["worm-riding manual page"])))) < 15 && !have(template_string_$item(level11_templateObject56 || (level11_templateObject56 = level11_taggedTemplateLiteral(["worm-riding hooks"])))) && (property_get("desertExploration") === 0 && !have($effect(level11_templateObject57 || (level11_templateObject57 = level11_taggedTemplateLiteral(["A Girl Named Sue"])))) || have($effect(level11_templateObject58 || (level11_templateObject58 = level11_taggedTemplateLiteral(["Ultrahydrated"]))))),
  priority: () => have($effect(level11_templateObject59 || (level11_templateObject59 = level11_taggedTemplateLiteral(["Ultrahydrated"])))) ? OverridePriority.Effect : OverridePriority.None,
  completed: () => property_get("desertExploration") >= 100,
  do: $location(level11_templateObject60 || (level11_templateObject60 = level11_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"]))),
  outfit: () => {
    if (have(template_string_$item(level11_templateObject61 || (level11_templateObject61 = level11_taggedTemplateLiteral(["industrial fire extinguisher"])))) && property_get("_fireExtinguisherCharge") >= 20 && !property_get("fireExtinguisherDesertUsed") && have($effect(level11_templateObject62 || (level11_templateObject62 = level11_taggedTemplateLiteral(["Ultrahydrated"]))))) return {
      equip: template_string_$items(level11_templateObject63 || (level11_templateObject63 = level11_taggedTemplateLiteral(["industrial fire extinguisher, UV-resistant compass, dromedary drinking helmet"]))),
      familiar: template_string_$familiar(level11_templateObject64 || (level11_templateObject64 = level11_taggedTemplateLiteral(["Melodramedary"])))
    };else if (globalStateCache.absorb().isReprocessTarget($monster(level11_templateObject65 || (level11_templateObject65 = level11_taggedTemplateLiteral(["swarm of fire ants"])))) && (0,external_kolmafia_namespaceObject.familiarWeight)(template_string_$familiar(level11_templateObject66 || (level11_templateObject66 = level11_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && have(template_string_$item(level11_templateObject67 || (level11_templateObject67 = level11_taggedTemplateLiteral(["miniature crystal ball"]))))) {
      if (globalStateCache.orb().prediction($location(level11_templateObject68 || (level11_templateObject68 = level11_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"])))) === $monster(level11_templateObject69 || (level11_templateObject69 = level11_taggedTemplateLiteral(["swarm of fire ants"])))) {
        // Swoop in for a single adventure to reprocess the fire ants
        return {
          equip: template_string_$items(level11_templateObject70 || (level11_templateObject70 = level11_taggedTemplateLiteral(["UV-resistant compass, miniature crystal ball"]))),
          familiar: template_string_$familiar(level11_templateObject71 || (level11_templateObject71 = level11_taggedTemplateLiteral(["Grey Goose"])))
        };
      } else {
        // Wait for the orb to predict swarm of fire ants
        return {
          equip: template_string_$items(level11_templateObject72 || (level11_templateObject72 = level11_taggedTemplateLiteral(["UV-resistant compass, miniature crystal ball"]))),
          familiar: template_string_$familiar(level11_templateObject73 || (level11_templateObject73 = level11_taggedTemplateLiteral(["Melodramedary"])))
        };
      }
    } else return {
      equip: template_string_$items(level11_templateObject74 || (level11_templateObject74 = level11_taggedTemplateLiteral(["UV-resistant compass, dromedary drinking helmet"]))),
      familiar: template_string_$familiar(level11_templateObject75 || (level11_templateObject75 = level11_taggedTemplateLiteral(["Melodramedary"])))
    };
  },
  combat: new combat_CombatStrategy().macro(() => {
    if (have($effect(level11_templateObject76 || (level11_templateObject76 = level11_taggedTemplateLiteral(["Ultrahydrated"])))) && have(template_string_$item(level11_templateObject77 || (level11_templateObject77 = level11_taggedTemplateLiteral(["industrial fire extinguisher"])))) && property_get("_fireExtinguisherCharge") >= 20 && !property_get("fireExtinguisherDesertUsed")) return new Macro().trySkill($skill(level11_templateObject78 || (level11_templateObject78 = level11_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))));else return new Macro();
  }).kill(),
  post: () => {
    if (!$location(level11_templateObject79 || (level11_templateObject79 = level11_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"]))).noncombatQueue.includes("A Sietch in Time")) return;
    if ((property_get("gnasirProgress") & 16) > 0) return;

    if ((0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject80 || (level11_templateObject80 = level11_taggedTemplateLiteral(["worm-riding manual page"])))) >= 15 || (property_get("gnasirProgress") & 1) === 0 && have(template_string_$item(level11_templateObject81 || (level11_templateObject81 = level11_taggedTemplateLiteral(["stone rose"])))) || (property_get("gnasirProgress") & 2) === 0 && have(template_string_$item(level11_templateObject82 || (level11_templateObject82 = level11_taggedTemplateLiteral(["can of black paint"])))) || (property_get("gnasirProgress") & 4) === 0 && have(template_string_$item(level11_templateObject83 || (level11_templateObject83 = level11_taggedTemplateLiteral(["killing jar"]))))) {
      var res = (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=desertbeach&action=db_gnasir");

      while (res.includes("value=2")) {
        res = (0,external_kolmafia_namespaceObject.runChoice)(2);
      }

      (0,external_kolmafia_namespaceObject.runChoice)(1);
    }

    (0,external_kolmafia_namespaceObject.cliExecute)("use * desert sightseeing pamphlet");
    if (have(template_string_$item(level11_templateObject84 || (level11_templateObject84 = level11_taggedTemplateLiteral(["worm-riding hooks"])))) && have(template_string_$item(level11_templateObject85 || (level11_templateObject85 = level11_taggedTemplateLiteral(["drum machine"]))))) (0,external_kolmafia_namespaceObject.use)(template_string_$item(level11_templateObject86 || (level11_templateObject86 = level11_taggedTemplateLiteral(["drum machine"]))));
  },
  limit: {
    soft: 30
  },
  choices: {
    805: 1
  }
}];

function rotatePyramid(goal) {
  var ratchets = (goal - property_get("pyramidPosition") + 5) % 5;
  var to_buy = ratchets - (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject87 || (level11_templateObject87 = level11_taggedTemplateLiteral(["tomb ratchet"])))) - (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject88 || (level11_templateObject88 = level11_taggedTemplateLiteral(["crumbling wooden wheel"]))));

  if (to_buy > 0) {
    (0,external_kolmafia_namespaceObject.buy)(template_string_$item(level11_templateObject89 || (level11_templateObject89 = level11_taggedTemplateLiteral(["tomb ratchet"]))), to_buy);
  }

  (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=pyramid&action=pyramid_control");

  for (var i = 0; i < ratchets; i++) {
    if (have(template_string_$item(level11_templateObject90 || (level11_templateObject90 = level11_taggedTemplateLiteral(["crumbling wooden wheel"]))))) {
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=929&option=1&pwd");
    } else {
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=929&option=2&pwd");
    }
  }

  if (property_get("pyramidPosition") !== goal) throw "Failed to rotate pyramid to ".concat(goal);
  (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=929&option=5&pwd");
}

var Pyramid = [{
  name: "Open Pyramid",
  after: ["Desert", "Oasis", "Oasis Drum", "Manor/Boss", "Palindome/Boss", "Hidden City/Boss"],
  completed: () => step("questL11Pyramid") >= 0,
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=desertbeach&action=db_pyramid1"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Upper Chamber",
  after: ["Open Pyramid"],
  completed: () => step("questL11Pyramid") >= 1,
  do: $location(level11_templateObject91 || (level11_templateObject91 = level11_taggedTemplateLiteral(["The Upper Chamber"]))),
  outfit: {
    modifier: "+combat"
  },
  limit: {
    turns: 6
  }
}, {
  name: "Middle Chamber",
  after: ["Upper Chamber"],
  completed: () => {
    if (!property_get("controlRoomUnlock")) return false;
    if (property_get("pyramidBombUsed")) return true;
    var ratchets = (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject92 || (level11_templateObject92 = level11_taggedTemplateLiteral(["tomb ratchet"])))) + (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(level11_templateObject93 || (level11_templateObject93 = level11_taggedTemplateLiteral(["crumbling wooden wheel"]))));
    var needed = have(template_string_$item(level11_templateObject94 || (level11_templateObject94 = level11_taggedTemplateLiteral(["ancient bomb"])))) ? 3 : have(template_string_$item(level11_templateObject95 || (level11_templateObject95 = level11_taggedTemplateLiteral(["ancient bronze token"])))) ? 7 : 10;
    return ratchets >= needed;
  },
  do: $location(level11_templateObject96 || (level11_templateObject96 = level11_taggedTemplateLiteral(["The Middle Chamber"]))),
  limit: {
    soft: 25
  },
  combat: new combat_CombatStrategy().macro(new Macro().tryItem(template_string_$item(level11_templateObject97 || (level11_templateObject97 = level11_taggedTemplateLiteral(["tangle of rat tails"])))), $monster(level11_templateObject98 || (level11_templateObject98 = level11_taggedTemplateLiteral(["tomb rat"])))).killItem([$monster(level11_templateObject99 || (level11_templateObject99 = level11_taggedTemplateLiteral(["tomb rat"]))), $monster(level11_templateObject100 || (level11_templateObject100 = level11_taggedTemplateLiteral(["tomb rat king"])))]).banish([$monster(level11_templateObject101 || (level11_templateObject101 = level11_taggedTemplateLiteral(["tomb asp"]))), $monster(level11_templateObject102 || (level11_templateObject102 = level11_taggedTemplateLiteral(["tomb servant"])))]),
  outfit: {
    modifier: "item"
  },
  delay: 9
}, {
  name: "Get Token",
  after: ["Middle Chamber"],
  completed: () => have(template_string_$item(level11_templateObject103 || (level11_templateObject103 = level11_taggedTemplateLiteral(["ancient bronze token"])))) || have(template_string_$item(level11_templateObject104 || (level11_templateObject104 = level11_taggedTemplateLiteral(["ancient bomb"])))) || property_get("pyramidBombUsed"),
  do: () => rotatePyramid(4),
  limit: {
    tries: 1
  }
}, {
  name: "Get Bomb",
  after: ["Get Token"],
  completed: () => have(template_string_$item(level11_templateObject105 || (level11_templateObject105 = level11_taggedTemplateLiteral(["ancient bomb"])))) || property_get("pyramidBombUsed"),
  do: () => rotatePyramid(3),
  limit: {
    tries: 1
  }
}, {
  name: "Use Bomb",
  after: ["Get Bomb"],
  completed: () => property_get("pyramidBombUsed"),
  do: () => rotatePyramid(1),
  limit: {
    tries: 1
  }
}, {
  name: "Boss",
  after: ["Use Bomb"],
  completed: () => step("questL11Pyramid") === 999,
  do: () => (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=pyramid&action=pyramid_state1a"),
  outfit: () => {
    if (!have(template_string_$item(level11_templateObject106 || (level11_templateObject106 = level11_taggedTemplateLiteral(["Pick-O-Matic lockpicks"])))) && !towerSkip()) return {
      familiar: template_string_$familiar(level11_templateObject107 || (level11_templateObject107 = level11_taggedTemplateLiteral(["Gelatinous Cubeling"])))
    }; // Ensure we get equipment

    return {};
  },
  combat: new combat_CombatStrategy().macro(new Macro().while_("!mpbelow 20", new Macro().trySkill($skill(level11_templateObject108 || (level11_templateObject108 = level11_taggedTemplateLiteral(["Infinite Loop"]))))).attack().repeat()).kill(),
  limit: {
    tries: 1
  },
  boss: true
}];
var MacguffinQuest = {
  name: "Macguffin",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(11),
    priority: () => OverridePriority.Free,
    // Always start this quest ASAP, it is key for routing
    completed: () => step("questL11MacGuffin") !== -1,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }].concat(Diary, Desert, Pyramid, [{
    name: "Finish",
    after: ["Boss"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL11MacGuffin") === 999,
    do: () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
;// CONCATENATED MODULE: ./src/tasks/all.ts






















function all_tasks() {
  var quests = [TootQuest, MiscQuest, PullQuest, WandQuest, KeysQuest, SummonQuest, MosquitoQuest, TavernQuest, BatQuest, KnobQuest, FriarQuest, // OrganQuest,
  CryptQuest, McLargeHugeQuest, ChasmQuest, GiantQuest, HiddenQuest, ManorQuest, PalindomeQuest, MacguffinQuest, WarQuest, TowerQuest, AbsorbQuest, ReprocessQuest];
  return getTasks(quests);
}
;// CONCATENATED MODULE: ./src/route.ts

var routing = [// Start with the basic leveling tasks
"Toot/Finish", // Get basic gear
"Misc/Goose Exp", "Misc/Acquire Firework Hat", "Misc/Acquire Birch Battery", "Keys/Deck", "Pull/All", // Get infinite loop
"Summon/Pygmy Witch Lawyer", "Summon/Mountain Man", "Absorb/Ponzi Apparatus", // Get +meat early, we'll want a lot
// Get initial -combat
"Knob/King", "Absorb/Phase Shift", "McLargeHuge/Trapper Request", // open for absorbing
"Absorb/Fluid Dynamics Simulation", // ASAP once level 11 is hit, grab -combat
"Absorb/Photonic Shroud", // Grind tasks until level 11
"Mosquito/Burn Delay", "Hidden City/Open Temple", // Get +item
"Absorb/Gravitational Compression", "Misc/Fortune", // Aim for remaining pygmies
"Hidden City/Bowling Skills", "Absorb/System Sweep", // Get from hidden park in hardcore
"Giant/Airship YR Healer", "Misc/Retune Moon", "War/Flyers Start", // Start the war and get flyers
"War/Flyers End", // End the flyers quest ASAP in case of tracking errors
// For MP regen, ASAP
"Wand/Wand", "Misc/Hermit Clover", "Absorb/Hivemindedness", // Open Hidden City with Sue buff
"Hidden City/Open Office", "Hidden City/Open Hospital", "Hidden City/Open Apartment", // Line up -combats
"Manor/Start Floor2", "Absorb/Subatomic Hardening", // Get soon after the Billiards room
"Manor/Bedroom", "Manor/Bathroom Delay", "Manor/Gallery Delay", "Palindome/Copperhead", "Palindome/Bat Snake", "Bat/Use Sonar 3", // Prepare for lobsterfrogman backups
"Palindome/Cold Snake", // Knock down -combats
"Manor/Finish Floor2", "Giant/Unlock HITS", "Crypt/Cranny", "Manor/Finish Floor2", "Mosquito/Finish", // The following 3 tasks should always stay in this order
"Macguffin/Oasis", // Get ultrahydrated as soon as needed
"Macguffin/Oasis Drum", // Get drum as soon as pages are gathered
"Macguffin/Desert", // charge camel for protestors
"McLargeHuge/Trapper Return", // ensure we don't need clovers for ore
"Palindome/Protesters", // Finish remaining quests
"McLargeHuge/Finish", "Manor/Boss", "Crypt/Finish", "Giant/Finish", "Tavern/Finish", "Macguffin/Finish", "Orc Chasm/Start Peaks", "Orc Chasm/Finish", "Reprocess/Twin Peak", // Work on absorbing Twin Peak during war
"War/Boss Hippie", // Finish up with last delay
"Bat/Finish", "Tower/Naughty Sorceress", "Absorb/South of the Border", // If we are doing this, do it early to give room for orb
"Absorb/All", "Reprocess/All", // Return to locations if reprocessing was missed
"Misc/Dog Chow", // Eat if there are no other options
"Misc/Cake-Shaped Arena" // Arena if there are no charged options
];
function prioritize(tasks) {
  return orderByRoute(tasks, routing, false);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/since.js
function since_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function since_createClass(Constructor, protoProps, staticProps) { if (protoProps) since_defineProperties(Constructor.prototype, protoProps); if (staticProps) since_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function since_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function since_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) since_setPrototypeOf(subClass, superClass); }

function since_createSuper(Derived) { var hasNativeReflectConstruct = since_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = since_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = since_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return since_possibleConstructorReturn(this, result); }; }

function since_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return since_assertThisInitialized(self); }

function since_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function since_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; since_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !since_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return since_construct(Class, arguments, since_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return since_setPrototypeOf(Wrapper, Class); }; return since_wrapNativeSuper(Class); }

function since_construct(Parent, args, Class) { if (since_isNativeReflectConstruct()) { since_construct = Reflect.construct.bind(); } else { since_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) since_setPrototypeOf(instance, Class.prototype); return instance; }; } return since_construct.apply(null, arguments); }

function since_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function since_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function since_setPrototypeOf(o, p) { since_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return since_setPrototypeOf(o, p); }

function since_getPrototypeOf(o) { since_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return since_getPrototypeOf(o); }

/**
 * Provides functions for checking KoLmafia's version and revision.
 * @packageDocumentation
 */

/**
 * Represents an exception thrown when the current KoLmafia version does not
 * match an expected condition.
 */

var KolmafiaVersionError = /*#__PURE__*/function (_Error) {
  since_inherits(KolmafiaVersionError, _Error);

  var _super = since_createSuper(KolmafiaVersionError);

  function KolmafiaVersionError(message) {
    var _this;

    since_classCallCheck(this, KolmafiaVersionError);

    _this = _super.call(this, message); // Explicitly set the prototype, so that 'instanceof' still works in Node.js
    // even when the class is transpiled down to ES5
    // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // Note that this code isn't needed for Rhino.

    Object.setPrototypeOf(since_assertThisInitialized(_this), KolmafiaVersionError.prototype);
    return _this;
  }

  return since_createClass(KolmafiaVersionError);
}( /*#__PURE__*/since_wrapNativeSuper(Error)); // Manually set class name, so that the stack trace shows proper name in Rhino

KolmafiaVersionError.prototype.name = "KolmafiaVersionError";
/**
 * Returns the currently executing script name, suitable for embedding in an
 * error message.
 * @returns Path of the main script wrapped in single-quotes, or `"This script"`
 *    if the path cannot be determined
 */

function getScriptName() {
  var _require$main;

  // In Rhino, the current script name is available in require.main.id
  var scriptName = (_require$main = __webpack_require__.c[__webpack_require__.s]) === null || _require$main === void 0 ? void 0 : _require$main.id;
  return scriptName ? "'".concat(scriptName, "'") : "This script";
}
/**
 * If KoLmafia's revision number is less than `revision`, throws an exception.
 * Otherwise, does nothing.
 *
 * This behaves like the `since rXXX;` statement in ASH.
 * @param revision Revision number
 * @throws {KolmafiaVersionError}
 *    If KoLmafia's revision number is less than `revision`.
 * @throws {TypeError} If `revision` is not an integer
 *
 * @example
 * ```ts
 * // Throws if KoLmafia revision is less than r20500
 * sinceKolmafiaRevision(20500);
 * ```
 */


function sinceKolmafiaRevision(revision) {
  if (!Number.isInteger(revision)) {
    throw new TypeError("Invalid revision number ".concat(revision, " (must be an integer)"));
  } // Based on net.sourceforge.kolmafia.textui.Parser.sinceException()


  var currentRevision = (0,external_kolmafia_namespaceObject.getRevision)();

  if (currentRevision > 0 && currentRevision < revision) {
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires revision r").concat(revision, " of kolmafia or higher (current: ").concat((0,external_kolmafia_namespaceObject.getRevision)(), "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
  }
}
/**
 * If KoLmafia's version is less than `majorVersion.minorVersion`, throws an
 * exception.
 * Otherwise, does nothing.
 *
 * This behaves like the `since X.Y;` statement in ASH.
 * @param majorVersion Major version number
 * @param minorVersion Minor version number
 * @deprecated Point versions are no longer released by KoLmafia
 * @throws {KolmafiaVersionError}
 *    If KoLmafia's major version is less than `majorVersion`, or if the major
 *    versions are equal but the minor version is less than `minorVersion`
 * @throws {TypeError}
 *    If either `majorVersion` or `minorVersion` are not integers
 *
 * @example
 * ```ts
 * // Throws if KoLmafia version is less than 20.7
 * sinceKolmafiaVersion(20, 7);
 * ```
 */

function sinceKolmafiaVersion(majorVersion, minorVersion) {
  if (getRevision() >= 25720) {
    return;
  }

  if (!Number.isInteger(majorVersion)) {
    throw new TypeError("Invalid major version number ".concat(majorVersion, " (must be an integer)"));
  }

  if (!Number.isInteger(minorVersion)) {
    throw new TypeError("Invalid minor version number ".concat(minorVersion, " (must be an integer)"));
  }

  if (majorVersion > 21 || majorVersion === 20 && minorVersion > 9) {
    throw new Error("There were no versions released after 21.09. This command will always fail");
  }

  var versionStr = getVersion();
  var versionStrMatch = /v(\d+)\.(\d+)/.exec(versionStr);

  if (!versionStrMatch) {
    // This is not something the user should handle
    throw new Error("Unexpected KoLmafia version string: \"".concat(versionStr, "\". You may need to update the script."));
  }

  var currentMajorVersion = Number(versionStrMatch[1]);
  var currentMinorVersion = Number(versionStrMatch[2]); // Based on net.sourceforge.kolmafia.textui.Parser.sinceException()

  if (currentMajorVersion < majorVersion || currentMajorVersion === majorVersion && currentMinorVersion < minorVersion) {
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires version ").concat(majorVersion, ".").concat(minorVersion, " of kolmafia or higher (current: ").concat(currentMajorVersion, ".").concat(currentMinorVersion, "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
  }
}
;// CONCATENATED MODULE: ./src/sim.ts
var sim_templateObject, sim_templateObject2, sim_templateObject3, sim_templateObject4, sim_templateObject5, sim_templateObject6, sim_templateObject7, sim_templateObject8, sim_templateObject9, sim_templateObject10, sim_templateObject11, sim_templateObject12, sim_templateObject13, sim_templateObject14, sim_templateObject15, sim_templateObject16, sim_templateObject17, sim_templateObject18, sim_templateObject19, sim_templateObject20, sim_templateObject21, sim_templateObject22, sim_templateObject23, sim_templateObject24, sim_templateObject25, sim_templateObject26, sim_templateObject27, sim_templateObject28, sim_templateObject29, sim_templateObject30, sim_templateObject31, sim_templateObject32, sim_templateObject33, sim_templateObject34, sim_templateObject35, sim_templateObject36, sim_templateObject37;

function sim_slicedToArray(arr, i) { return sim_arrayWithHoles(arr) || sim_iterableToArrayLimit(arr, i) || sim_unsupportedIterableToArray(arr, i) || sim_nonIterableRest(); }

function sim_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function sim_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function sim_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function sim_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = sim_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function sim_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return sim_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return sim_arrayLikeToArray(o, minLen); }

function sim_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function sim_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function sim_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function sim_createClass(Constructor, protoProps, staticProps) { if (protoProps) sim_defineProperties(Constructor.prototype, protoProps); if (staticProps) sim_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function sim_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sim_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Hardcoded = /*#__PURE__*/sim_createClass(function Hardcoded(have, name) {
  sim_classCallCheck(this, Hardcoded);

  sim_defineProperty(this, "have", void 0);

  sim_defineProperty(this, "name", void 0);

  this.have = have;
  this.name = name;
});

/**
 * Return: a list of all things required to run the script.
 */
function buildIotmList() {
  return [{
    thing: template_string_$familiar(sim_templateObject || (sim_templateObject = sim_taggedTemplateLiteral(["Grey Goose"]))),
    why: "Adventures"
  }, {
    thing: template_string_$item(sim_templateObject2 || (sim_templateObject2 = sim_taggedTemplateLiteral(["Clan VIP Lounge key"]))),
    why: "YRs, +combat"
  }, {
    thing: template_string_$item(sim_templateObject3 || (sim_templateObject3 = sim_taggedTemplateLiteral(["industrial fire extinguisher"]))),
    why: "Harem outfit, Bat hole, stone wool, Crypt, Ultrahydrated",
    optional: true
  }, {
    thing: template_string_$familiar(sim_templateObject4 || (sim_templateObject4 = sim_taggedTemplateLiteral(["Melodramedary"]))),
    why: "Desert progress",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject5 || (sim_templateObject5 = sim_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))),
    why: "Slay the dead in crypt, pygmy killing",
    optional: true
  }, {
    thing: template_string_$familiar(sim_templateObject6 || (sim_templateObject6 = sim_taggedTemplateLiteral(["Shorter-Order Cook"]))),
    why: "Kill the Wall of Skin, initial exp",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject7 || (sim_templateObject7 = sim_taggedTemplateLiteral(["Deck of Every Card"]))),
    why: "A key for the NS tower, stone wool, ore",
    optional: true
  }, {
    thing: new Hardcoded(have(template_string_$item(sim_templateObject8 || (sim_templateObject8 = sim_taggedTemplateLiteral(["cold medicine cabinet"])))) || (0,external_kolmafia_namespaceObject.getWorkshed)() === template_string_$item(sim_templateObject9 || (sim_templateObject9 = sim_taggedTemplateLiteral(["cold medicine cabinet"]))), "Cold medicine cabinet"),
    why: "Get Extrovermectin for profit",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject10 || (sim_templateObject10 = sim_taggedTemplateLiteral(["fresh coat of paint"]))),
    why: "Minor boosts in moxie sign",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject11 || (sim_templateObject11 = sim_taggedTemplateLiteral(["protonic accelerator pack"]))),
    why: "Wanderers",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject12 || (sim_templateObject12 = sim_taggedTemplateLiteral(["Cargo Cultist Shorts"]))),
    why: "Mountain man",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject13 || (sim_templateObject13 = sim_taggedTemplateLiteral(["Powerful Glove"]))),
    why: "Pixels and lobsterfrogmen",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject14 || (sim_templateObject14 = sim_taggedTemplateLiteral(["SpinMaster\u2122 lathe"]))),
    why: "QoL equipment",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject15 || (sim_templateObject15 = sim_taggedTemplateLiteral(["cursed magnifying glass"]))),
    why: "Lobsterfrogmen, delay",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject16 || (sim_templateObject16 = sim_taggedTemplateLiteral(["backup camera"]))),
    why: "Lobsterfrogmen, ML, init",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject17 || (sim_templateObject17 = sim_taggedTemplateLiteral(["combat lover's locket"]))),
    why: "Reminiscing",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject18 || (sim_templateObject18 = sim_taggedTemplateLiteral(["miniature crystal ball"]))),
    why: "Monster prediction",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject19 || (sim_templateObject19 = sim_taggedTemplateLiteral(["unbreakable umbrella"]))),
    why: "-combat modifier, ML",
    optional: true
  }, {
    thing: new Hardcoded(have(template_string_$item(sim_templateObject20 || (sim_templateObject20 = sim_taggedTemplateLiteral(["cosmic bowling ball"])))) || property_get("cosmicBowlingBallReturnCombats", -1) >= 0, "Cosmic bowling ball"),
    why: "Banishes, Pygmy killing",
    optional: true
  }, {
    thing: template_string_$familiar(sim_templateObject21 || (sim_templateObject21 = sim_taggedTemplateLiteral(["Vampire Vintner"]))),
    why: "Pygmy killing",
    optional: true
  }, {
    thing: $skill(sim_templateObject22 || (sim_templateObject22 = sim_taggedTemplateLiteral(["Summon Clip Art"]))),
    why: "Amulet coin",
    optional: true
  }, {
    thing: new Hardcoded("haunted doghouse" in (0,external_kolmafia_namespaceObject.getCampground)(), "haunted doghouse"),
    why: "Ghost dog chow",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject23 || (sim_templateObject23 = sim_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"]))),
    why: "Meat and special seasonings",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject24 || (sim_templateObject24 = sim_taggedTemplateLiteral(["hewn moon-rune spoon"]))),
    why: "Access to an extra monster absorb (see tune arg)",
    optional: true
  }, {
    thing: new Hardcoded(property_get("hasMaydayContract"), "MayDay™ contract"),
    why: "+combat, early meat",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject25 || (sim_templateObject25 = sim_taggedTemplateLiteral(["June cleaver"]))),
    why: "Cold damage, QoL, sometimes +famexp and +adv",
    optional: true
  }, {
    thing: template_string_$item(sim_templateObject26 || (sim_templateObject26 = sim_taggedTemplateLiteral(["designer sweatpants"]))),
    why: "Sleaze damage",
    optional: true
  }];
}

function buildLocketList() {
  return [{
    thing: $monster(sim_templateObject27 || (sim_templateObject27 = sim_taggedTemplateLiteral(["pygmy witch lawyer"]))),
    why: "Infinite Loop",
    optional: true
  }, {
    thing: $monster(sim_templateObject28 || (sim_templateObject28 = sim_taggedTemplateLiteral(["mountain man"]))),
    why: "Ore",
    optional: true
  }, {
    thing: $monster(sim_templateObject29 || (sim_templateObject29 = sim_taggedTemplateLiteral(["One-Eyed Willie"]))),
    why: "Absorbing adventures",
    optional: true
  }, {
    thing: $monster(sim_templateObject30 || (sim_templateObject30 = sim_taggedTemplateLiteral(["Little Man in the Canoe"]))),
    why: "Absorbing adventures",
    optional: true
  }, {
    thing: $monster(sim_templateObject31 || (sim_templateObject31 = sim_taggedTemplateLiteral(["revolving bugbear"]))),
    why: "Absorbing adventures",
    optional: true
  }, {
    thing: $monster(sim_templateObject32 || (sim_templateObject32 = sim_taggedTemplateLiteral(["cloud of disembodied whiskers"]))),
    why: "Absorbing adventures",
    optional: true
  }, {
    thing: $monster(sim_templateObject33 || (sim_templateObject33 = sim_taggedTemplateLiteral(["vicious gnauga"]))),
    why: "Absorbing adventures",
    optional: true
  }];
}

function buildMiscList() {
  return [{
    thing: template_string_$familiar(sim_templateObject34 || (sim_templateObject34 = sim_taggedTemplateLiteral(["Oily Woim"]))),
    why: "Bonus initiative",
    optional: true
  }, {
    thing: template_string_$familiar(sim_templateObject35 || (sim_templateObject35 = sim_taggedTemplateLiteral(["Hobo Monkey"]))),
    why: "Meat drops",
    optional: true
  }, {
    thing: template_string_$familiar(sim_templateObject36 || (sim_templateObject36 = sim_taggedTemplateLiteral(["Cornbeefadon"]))),
    why: "Amulet coin, with clip art",
    optional: true
  }, {
    thing: template_string_$items(sim_templateObject37 || (sim_templateObject37 = sim_taggedTemplateLiteral(["Great Wolf's rocket launcher, Drunkula's bell"]))),
    why: "Kill the wall of bones (with delaytower)",
    optional: true
  }];
}

function buildPullList() {
  var result = [];

  var _iterator = sim_createForOfIteratorHelper(pullStrategy.pulls),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _pull$description;

      var pull = _step.value;
      var items = pull.items().filter(item => item); // Ignore dynamic item selection for now

      if (items.length === 0) continue; // For cheap items, we will just buy it during the run

      var big_items = items.filter(item => (0,external_kolmafia_namespaceObject.mallPrice)(item) === 0 || (0,external_kolmafia_namespaceObject.mallPrice)(item) > 100000);
      if (big_items.length === 0) continue;
      result.push({
        thing: big_items,
        why: (_pull$description = pull.description) !== null && _pull$description !== void 0 ? _pull$description : "Pull",
        optional: pull.optional
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}

function checkThing(thing) {
  if (thing instanceof Hardcoded) return [thing.have, thing.name];
  if (thing instanceof external_kolmafia_namespaceObject.Familiar) return [have(thing), thing.hatchling.name];
  if (thing instanceof external_kolmafia_namespaceObject.Skill) return [have(thing), thing.name];
  if (thing instanceof external_kolmafia_namespaceObject.Monster) return [new Set(unlockedLocketMonsters()).has(thing), thing.name];
  return [have(thing) || (0,external_kolmafia_namespaceObject.storageAmount)(thing) > 0, thing.name];
}

function check(req) {
  if (Array.isArray(req.thing)) {
    var checks = req.thing.map(checkThing);
    return [checks.find(res => res[0]) !== undefined, checks.map(res => res[1]).join(" OR "), req];
  } else {
    var res = checkThing(req.thing);
    return [res[0], res[1], req];
  }
}

function checkRequirements() {
  var missing_optional = 0;
  var missing = 0;
  var categories = [["IoTMs", buildIotmList().filter(req => !req.optional)], ["Miscellany", buildMiscList().filter(req => !req.optional)], ["Expensive Pulls", buildPullList().filter(req => !req.optional)], ["IoTMs (Optional)", buildIotmList().filter(req => req.optional)], ["Combat Lover's Locket Monsters (Optional)", buildLocketList()], ["Miscellany (Optional)", buildMiscList().filter(req => req.optional)], ["Expensive Pulls (Optional)", buildPullList().filter(req => req.optional)]];
  (0,external_kolmafia_namespaceObject.printHtml)("Checking your character... Legend: <font color='#888888'>✓ Have</font> / <font color='red'>X Missing & Required</font> / <font color='black'>X Missing & Optional");

  for (var _i = 0, _categories = categories; _i < _categories.length; _i++) {
    var _categories$_i = sim_slicedToArray(_categories[_i], 2),
        name = _categories$_i[0],
        requirements = _categories$_i[1];

    if (requirements.length === 0) continue;
    var requirements_info = requirements.map(check);
    (0,external_kolmafia_namespaceObject.print)(name, "blue");

    var _iterator2 = sim_createForOfIteratorHelper(requirements_info.sort((a, b) => a[1].localeCompare(b[1]))),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = sim_slicedToArray(_step2.value, 3),
            have_it = _step2$value[0],
            _name = _step2$value[1],
            req = _step2$value[2];

        var color = have_it ? "#888888" : req.optional ? "black" : "red";
        var symbol = have_it ? "✓" : "X";
        if (!have_it && req.optional) missing_optional++;
        if (!have_it && !req.optional) missing++;
        (0,external_kolmafia_namespaceObject.print)("".concat(symbol, " ").concat(_name, " - ").concat(req.why), color);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    (0,external_kolmafia_namespaceObject.print)("");
  } // Print the count of missing things


  if (missing > 0) {
    (0,external_kolmafia_namespaceObject.print)("You are missing ".concat(missing, " required things. This script will not yet work for you."), "red");
    if (missing_optional > 0) (0,external_kolmafia_namespaceObject.print)("You are also missing ".concat(missing_optional, " optional things."));
  } else {
    if (missing_optional > 0) {
      (0,external_kolmafia_namespaceObject.print)("You are missing ".concat(missing_optional, " optional things. This script should work, but it could do better."));
    } else {
      (0,external_kolmafia_namespaceObject.print)("You have everything! You are the shiniest star. This script should work great.");
    }
  }
}
;// CONCATENATED MODULE: ./src/_git_commit.ts
var lastCommitHash = "00da79c";
;// CONCATENATED MODULE: ./src/main.ts
function main_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = main_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function main_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return main_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_arrayLikeToArray(o, minLen); }

function main_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }












var time_property = "_loop_gyou_first_start";
var svn_name = "Kasekopf-loop-casual-branches-release";
var args = Args.create("loopgyou", 'This is a script to complete Grey You Softcore runs. Run "loopgyou sim" without quotes to check if this script will work for you.\n\nYou must ascend manually into a Grey You Softcore run before running the script. The cold medicine cabinet is required in your workshed. Prefer the Vole sign until you have finished most of the path progression. Astral mask or astral belt are both useful, but neither is required. Prefer candles for your eurdora.\n\nThe arguments accepted by the script are listed below. Note that you can combine multiple options; for example "loopgyou pulls=18 tune=blender" will save 2 pulls and switch moon sign to Blender during the run. Most options also have an associated setting to set an option permanently; for example "set loopgyou_pulls=18" will cause the script to always save 2 pulls (unless overriden by using the pulls option at runtime).', {
  sim: Args.flag({
    help: "Check if you have the requirements to run this script.",
    setting: ""
  }),
  version: Args.flag({
    help: "Show script version and exit.",
    setting: ""
  }),
  actions: Args.number({
    help: "Maximum number of actions to perform, if given. Can be used to execute just a few steps at a time."
  }),
  class: Args.number({
    help: "If given, break the prism and choose a class. <font color='red'>You will be reduced to 40 adventures with full organs after breaking the prism.</font>",
    options: [[1, "Seal Clubber"], [2, "Turtle Tamer"], [3, "Pastamancer"], [4, "Saurceror"], [5, "Disco Bandit"], [6, "Accordion Thief"]]
  }),
  pulls: Args.number({
    help: "Number of pulls to use. Lower this if you would like to save some pulls to use for in-ronin farming. (Note that this argument is not needed if you pull all your farming items before running the script).",
    default: 20
  }),
  verboseequip: Args.flag({
    help: "Print out equipment usage before each task."
  }),
  tune: Args.string({
    help: "Use your hewn moon-rune spoon to retune to this sign when optimal."
  }),
  delaytower: Args.flag({
    help: "Delay the NS tower until after ronin ends.",
    default: false
  }),
  fax: Args.boolean({
    help: "Use a fax to summon a monster. Set to false if the faxbots are offline.",
    default: true
  }),
  ignoretasks: Args.string({
    help: "A comma-separated list of task names that should not be done. Can be used as a workaround for script bugs where a task is crashing.",
    setting: ""
  }),
  completedtasks: Args.string({
    help: "A comma-separated list of task names the should be treated as completed. Can be used as a workaround for script bugs.",
    setting: ""
  }),
  list: Args.flag({
    help: "Show the status of all tasks and exit."
  })
});
function main(command) {
  var _args$ignoretasks$spl, _args$ignoretasks, _args$completedtasks$, _args$completedtasks;

  sinceKolmafiaRevision(26718);
  Args.fill(args, command);

  if (args.help) {
    Args.showHelp(args);
    return;
  }

  if (args.sim) {
    checkRequirements();
    return;
  }

  printVersionInfo();
  if (args.version) return; // eslint-disable-next-line eqeqeq

  if ((0,external_kolmafia_namespaceObject.myPath)() != "Grey You") throw "You are not currently in a Grey You run. Please start one."; // Break the prism and exit if requested

  if (args.class !== undefined) {
    breakPrism(args.class);
    return;
  }

  var set_time_now = property_get(time_property, -1) === -1;
  if (set_time_now) _set(time_property, (0,external_kolmafia_namespaceObject.gametimeToInt)()); // Clear intro adventure

  _set("choiceAdventure1464", 1);
  if ((0,external_kolmafia_namespaceObject.visitUrl)("main.php").includes("somewhat-human-shaped mass of grey goo nanites")) (0,external_kolmafia_namespaceObject.runChoice)(-1);
  var tasks = prioritize(all_tasks());
  var engine = new engine_Engine(tasks, (_args$ignoretasks$spl = (_args$ignoretasks = args.ignoretasks) === null || _args$ignoretasks === void 0 ? void 0 : _args$ignoretasks.split(",")) !== null && _args$ignoretasks$spl !== void 0 ? _args$ignoretasks$spl : [], (_args$completedtasks$ = (_args$completedtasks = args.completedtasks) === null || _args$completedtasks === void 0 ? void 0 : _args$completedtasks.split(",")) !== null && _args$completedtasks$ !== void 0 ? _args$completedtasks$ : []);

  try {
    if (args.list) {
      listTasks(engine);
      return;
    }

    engine.run(args.actions);
    var remaining_tasks = tasks.filter(task => !task.completed());

    if (!runComplete()) {
      if (args.actions) {
        var next = engine.getNextTask();

        if (next) {
          debug("Next task: ".concat(next.name));
          return;
        }
      }

      debug("Remaining tasks:", "red");

      var _iterator = main_createForOfIteratorHelper(remaining_tasks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;
          if (!task.completed()) debug("".concat(task.name), "red");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      throw "Unable to find available task, but the run is not complete.";
    }
  } finally {
    engine.propertyManager.resetAll();
  }

  var absorb_state = globalStateCache.absorb();

  if (step("questL13Final") > 11) {
    (0,external_kolmafia_namespaceObject.print)("Grey you complete!", "purple");
  } else {
    (0,external_kolmafia_namespaceObject.print)("Grey you partially complete! Rerun after ronin ends.", "purple");
  }

  (0,external_kolmafia_namespaceObject.print)("   Adventures used: ".concat((0,external_kolmafia_namespaceObject.turnsPlayed)()), "purple");
  (0,external_kolmafia_namespaceObject.print)("   Adventures remaining: ".concat((0,external_kolmafia_namespaceObject.myAdventures)()), "purple");
  if (set_time_now) (0,external_kolmafia_namespaceObject.print)("   Time: ".concat(convertMilliseconds((0,external_kolmafia_namespaceObject.gametimeToInt)() - property_get(time_property, (0,external_kolmafia_namespaceObject.gametimeToInt)()))), "purple");else (0,external_kolmafia_namespaceObject.print)("   Time: ".concat(convertMilliseconds((0,external_kolmafia_namespaceObject.gametimeToInt)() - property_get(time_property, (0,external_kolmafia_namespaceObject.gametimeToInt)())), " since first run today started"), "purple");
  (0,external_kolmafia_namespaceObject.print)("   Pulls used: ".concat(property_get("_roninStoragePulls").split(",").length), "purple"); // eslint-disable-next-line eqeqeq

  (0,external_kolmafia_namespaceObject.print)("   Monsters remaining: ".concat(Array.from(absorb_state.remainingAbsorbs()).join(", ")), "purple");
  (0,external_kolmafia_namespaceObject.print)("   Reprocess remaining: ".concat(Array.from(absorb_state.remainingReprocess()).join(", ")), "purple");
}

function runComplete() {
  return step("questL13Final") > 11 || // eslint-disable-next-line eqeqeq
  (0,external_kolmafia_namespaceObject.myPath)() != "Grey You" || args.delaytower && (0,external_kolmafia_namespaceObject.myTurncount)() < 1000 && step("questL13Final") !== -1;
}

function printVersionInfo() {
  debug("Running loopgyou version [".concat(lastCommitHash !== null && lastCommitHash !== void 0 ? lastCommitHash : "custom-built", "] in KoLmafia r").concat((0,external_kolmafia_namespaceObject.getRevision)()));

  if (lastCommitHash !== undefined) {
    if ((0,external_kolmafia_namespaceObject.svnExists)(svn_name) && !(0,external_kolmafia_namespaceObject.svnAtHead)(svn_name)) debug('A newer version of this script is available and can be obtained with "svn update".', "red");else if (args.version) {
      debug("This script is up to date.", "red");
    }
  }
}

function breakPrism(into_class) {
  if (step("questL13Final") <= 11) throw "You have not finished your Grey You run. Do not set this argument yet.";
  var absorb_state = globalStateCache.absorb();
  (0,external_kolmafia_namespaceObject.print)("   Monsters remaining: ".concat(Array.from(absorb_state.remainingAbsorbs()).join(", ")), "purple");
  (0,external_kolmafia_namespaceObject.print)("   Reprocess remaining: ".concat(Array.from(absorb_state.remainingReprocess()).join(", ")), "purple");
  if (step("questL13Final") === 999) return;
  (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_11_prism");
  (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
  (0,external_kolmafia_namespaceObject.runChoice)(into_class);
  (0,external_kolmafia_namespaceObject.runChoice)(into_class);
}

function listTasks(engine) {
  engine.updatePlan();

  var _iterator2 = main_createForOfIteratorHelper(engine.tasks),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var task = _step2.value;
      var priority = Prioritization.from(task);
      var reason = priority.explain();
      var why = reason === "" ? "Route" : reason;
      debug("".concat(task.name, ": ").concat(task.completed() ? "Done" : engine.available(task) ? "Available [".concat(priority.score(), ": ").concat(why, "]") : "Not Available"), task.completed() ? "blue" : engine.available(task) ? undefined : "red");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = 4405);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;