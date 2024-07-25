(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from3, except, desc) => {
    if (from3 && typeof from3 === "object" || typeof from3 === "function") {
      for (let key of __getOwnPropNames(from3))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/@esbuild-plugins/node-globals-polyfill/process.js
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
  }
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e2) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e2) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  }
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  function noop() {
  }
  function binding(name) {
    throw new Error("process.binding is not supported");
  }
  function cwd() {
    return "/";
  }
  function chdir(dir) {
    throw new Error("process.chdir is not supported");
  }
  function umask() {
    return 0;
  }
  function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds, nanoseconds];
  }
  function uptime() {
    var currentTime = /* @__PURE__ */ new Date();
    var dif = currentTime - startTime;
    return dif / 1e3;
  }
  var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env2, argv, version, versions, release, config, on, addListener, once, off, removeListener, removeAllListeners, emit, performance, performanceNow, startTime, process, defines;
  var init_process = __esm({
    "node_modules/@esbuild-plugins/node-globals-polyfill/process.js"() {
      cachedSetTimeout = defaultSetTimout;
      cachedClearTimeout = defaultClearTimeout;
      if (typeof globalThis.setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      }
      if (typeof globalThis.clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      }
      queue = [];
      draining = false;
      queueIndex = -1;
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      title = "browser";
      platform = "browser";
      browser = true;
      env2 = {};
      argv = [];
      version = "";
      versions = {};
      release = {};
      config = {};
      on = noop;
      addListener = noop;
      once = noop;
      off = noop;
      removeListener = noop;
      removeAllListeners = noop;
      emit = noop;
      performance = globalThis.performance || {};
      performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
      startTime = /* @__PURE__ */ new Date();
      process = {
        nextTick,
        title,
        browser,
        env: env2,
        argv,
        version,
        versions,
        on,
        addListener,
        once,
        off,
        removeListener,
        removeAllListeners,
        emit,
        binding,
        cwd,
        chdir,
        umask,
        hrtime,
        platform,
        release,
        config,
        uptime
      };
      defines = {};
      Object.keys(defines).forEach((key) => {
        const segs = key.split(".");
        let target = process;
        for (let i = 0; i < segs.length; i++) {
          const seg = segs[i];
          if (i === segs.length - 1) {
            target[seg] = defines[key];
          } else {
            target = target[seg] || (target[seg] = {});
          }
        }
      });
    }
  });

  // node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js
  function init() {
    inited = true;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
  }
  function base64toByteArray(b64) {
    if (!inited) {
      init();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;
    if (len % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
    arr = new Arr(len * 3 / 4 - placeHolders);
    l = placeHolders > 0 ? len - 4 : len;
    var L = 0;
    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
      arr[L++] = tmp >> 16 & 255;
      arr[L++] = tmp >> 8 & 255;
      arr[L++] = tmp & 255;
    }
    if (placeHolders === 2) {
      tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
      arr[L++] = tmp & 255;
    } else if (placeHolders === 1) {
      tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
      arr[L++] = tmp >> 8 & 255;
      arr[L++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function base64fromByteArray(uint8) {
    if (!inited) {
      init();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3;
    var output = "";
    var parts = [];
    var maxChunkLength = 16383;
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(
        encodeChunk(
          uint8,
          i,
          i + maxChunkLength > len2 ? len2 : i + maxChunkLength
        )
      );
    }
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup[tmp >> 2];
      output += lookup[tmp << 4 & 63];
      output += "==";
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1];
      output += lookup[tmp >> 10];
      output += lookup[tmp >> 4 & 63];
      output += lookup[tmp << 2 & 63];
      output += "=";
    }
    parts.push(output);
    return parts.join("");
  }
  function kMaxLength() {
    return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function createBuffer(that, length) {
    if (kMaxLength() < length) {
      throw new RangeError("Invalid typed array length");
    }
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      that = new Uint8Array(length);
      that.__proto__ = Buffer2.prototype;
    } else {
      if (that === null) {
        that = new Buffer2(length);
      }
      that.length = length;
    }
    return that;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
      return new Buffer2(arg, encodingOrOffset, length);
    }
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new Error(
          "If encoding is specified then the first argument must be a string"
        );
      }
      return allocUnsafe(this, arg);
    }
    return from(this, arg, encodingOrOffset, length);
  }
  function from(that, value, encodingOrOffset, length) {
    if (typeof value === "number") {
      throw new TypeError('"value" argument must not be a number');
    }
    if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length);
    }
    if (typeof value === "string") {
      return fromString(that, value, encodingOrOffset);
    }
    return fromObject(that, value);
  }
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be a number');
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative');
    }
  }
  function alloc(that, size, fill3, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size);
    }
    if (fill3 !== void 0) {
      return typeof encoding === "string" ? createBuffer(that, size).fill(fill3, encoding) : createBuffer(that, size).fill(fill3);
    }
    return createBuffer(that, size);
  }
  function allocUnsafe(that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer2.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that;
  }
  function fromString(that, string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding');
    }
    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);
    var actual = that.write(string, encoding);
    if (actual !== length) {
      that = that.slice(0, actual);
    }
    return that;
  }
  function fromArrayLike(that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromArrayBuffer(that, array, byteOffset, length) {
    array.byteLength;
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError("'offset' is out of bounds");
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError("'length' is out of bounds");
    }
    if (byteOffset === void 0 && length === void 0) {
      array = new Uint8Array(array);
    } else if (length === void 0) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      that = array;
      that.__proto__ = Buffer2.prototype;
    } else {
      that = fromArrayLike(that, array);
    }
    return that;
  }
  function fromObject(that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);
      if (that.length === 0) {
        return that;
      }
      obj.copy(that, 0, 0, len);
      return that;
    }
    if (obj) {
      if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
        if (typeof obj.length !== "number" || isnan(obj.length)) {
          return createBuffer(that, 0);
        }
        return fromArrayLike(that, obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(that, obj.data);
      }
    }
    throw new TypeError(
      "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
    );
  }
  function checked(length) {
    if (length >= kMaxLength()) {
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes"
      );
    }
    return length | 0;
  }
  function internalIsBuffer(b) {
    return !!(b != null && b._isBuffer);
  }
  function byteLength(string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length;
    }
    if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      string = "" + string;
    }
    var len = string.length;
    if (len === 0)
      return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
        case void 0:
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase)
            return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (isNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (internalIsBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(
            buffer,
            val,
            byteOffset
          );
        } else {
          return Uint8Array.prototype.lastIndexOf.call(
            buffer,
            val,
            byteOffset
          );
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read2(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read2(arr, i + j) !== read2(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (strLen % 2 !== 0)
      throw new TypeError("Invalid hex string");
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(
      utf8ToBytes(string, buf.length - offset),
      buf,
      offset,
      length
    );
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function latin1Write(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(
      utf16leToBytes(string, buf.length - offset),
      buf,
      offset,
      length
    );
  }
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64fromByteArray(buf);
    } else {
      return base64fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = "";
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    var out = "";
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  function checkInt(buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 65535 + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
    }
  }
  function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 4294967295 + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
    }
  }
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(
        buf,
        value,
        offset,
        4,
        34028234663852886e22,
        -34028234663852886e22
      );
    }
    ieee754write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(
        buf,
        value,
        offset,
        8,
        17976931348623157e292,
        -17976931348623157e292
      );
    }
    ieee754write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function stringtrim(str) {
    if (str.trim)
      return str.trim();
    return str.replace(/^\s+|\s+$/g, "");
  }
  function toHex(n) {
    if (n < 16)
      return "0" + n.toString(16);
    return n.toString(16);
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isnan(val) {
    return val !== val;
  }
  function isBuffer(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
  }
  function isFastBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  }
  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
  }
  function ieee754read(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  }
  function ieee754write(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
    }
    buffer[offset + i - d] |= s * 128;
  }
  var lookup, revLookup, Arr, inited, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE;
  var init_Buffer = __esm({
    "node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js"() {
      init_process();
      init_buffer();
      lookup = [];
      revLookup = [];
      Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      inited = false;
      Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
      Buffer2.poolSize = 8192;
      Buffer2._augment = function(arr) {
        arr.__proto__ = Buffer2.prototype;
        return arr;
      };
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };
      Buffer2.kMaxLength = kMaxLength();
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        Buffer2.prototype.__proto__ = Uint8Array.prototype;
        Buffer2.__proto__ = Uint8Array;
        if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
        }
      }
      Buffer2.alloc = function(size, fill3, encoding) {
        return alloc(null, size, fill3, encoding);
      };
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer2.isBuffer = isBuffer;
      Buffer2.compare = function compare(a, b) {
        if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
          throw new TypeError("Arguments must be Buffers");
        }
        if (a === b)
          return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = Buffer2.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!internalIsBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      Buffer2.byteLength = byteLength;
      Buffer2.prototype._isBuffer = true;
      Buffer2.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        var length = this.length | 0;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.equals = function equals(b) {
        if (!internalIsBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
        if (!internalIsBuffer(target)) {
          throw new TypeError("Argument must be a Buffer");
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length)) {
            length = length | 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
              return asciiWrite(this, string, offset, length);
            case "latin1":
            case "binary":
              return latin1Write(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      MAX_ARGUMENTS_LENGTH = 4096;
      Buffer2.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf;
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer2.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer2(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }
        return newBuf;
      };
      Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength3, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength3 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          checkOffset(offset, byteLength3, this.length);
        }
        var val = this[offset + --byteLength3];
        var mul = 1;
        while (byteLength3 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength3] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength3, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength3 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength3);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength3, this.length);
        var i = byteLength3;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength3);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754read(this, offset, false, 52, 8);
      };
      Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
          checkInt(this, value, offset, byteLength3, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength3 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength3;
      };
      Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
          checkInt(this, value, offset, byteLength3, maxBytes, 0);
        }
        var i = byteLength3 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength3;
      };
      Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        if (!Buffer2.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength3 - 1);
          checkInt(this, value, offset, byteLength3, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength3 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength3;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength3 - 1);
          checkInt(this, value, offset, byteLength3, limit - 1, -limit);
        }
        var i = byteLength3 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength3;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (!Buffer2.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, start + len),
            targetStart
          );
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
        } else if (typeof val === "number") {
          val = val & 255;
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
    }
  });

  // node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js
  var init_buffer = __esm({
    "node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js"() {
      init_Buffer();
    }
  });

  // node-modules-polyfills:buffer
  var buffer_exports = {};
  __export(buffer_exports, {
    Buffer: () => Buffer3,
    INSPECT_MAX_BYTES: () => INSPECT_MAX_BYTES,
    SlowBuffer: () => SlowBuffer,
    isBuffer: () => isBuffer2,
    kMaxLength: () => _kMaxLength
  });
  function init2() {
    inited2 = true;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup2[i] = code[i];
      revLookup2[code.charCodeAt(i)] = i;
    }
    revLookup2["-".charCodeAt(0)] = 62;
    revLookup2["_".charCodeAt(0)] = 63;
  }
  function toByteArray(b64) {
    if (!inited2) {
      init2();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;
    if (len % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
    arr = new Arr2(len * 3 / 4 - placeHolders);
    l = placeHolders > 0 ? len - 4 : len;
    var L = 0;
    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = revLookup2[b64.charCodeAt(i)] << 18 | revLookup2[b64.charCodeAt(i + 1)] << 12 | revLookup2[b64.charCodeAt(i + 2)] << 6 | revLookup2[b64.charCodeAt(i + 3)];
      arr[L++] = tmp >> 16 & 255;
      arr[L++] = tmp >> 8 & 255;
      arr[L++] = tmp & 255;
    }
    if (placeHolders === 2) {
      tmp = revLookup2[b64.charCodeAt(i)] << 2 | revLookup2[b64.charCodeAt(i + 1)] >> 4;
      arr[L++] = tmp & 255;
    } else if (placeHolders === 1) {
      tmp = revLookup2[b64.charCodeAt(i)] << 10 | revLookup2[b64.charCodeAt(i + 1)] << 4 | revLookup2[b64.charCodeAt(i + 2)] >> 2;
      arr[L++] = tmp >> 8 & 255;
      arr[L++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase642(num) {
    return lookup2[num >> 18 & 63] + lookup2[num >> 12 & 63] + lookup2[num >> 6 & 63] + lookup2[num & 63];
  }
  function encodeChunk2(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
      output.push(tripletToBase642(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    if (!inited2) {
      init2();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3;
    var output = "";
    var parts = [];
    var maxChunkLength = 16383;
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk2(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup2[tmp >> 2];
      output += lookup2[tmp << 4 & 63];
      output += "==";
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1];
      output += lookup2[tmp >> 10];
      output += lookup2[tmp >> 4 & 63];
      output += lookup2[tmp << 2 & 63];
      output += "=";
    }
    parts.push(output);
    return parts.join("");
  }
  function read(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  }
  function write2(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
    }
    buffer[offset + i - d] |= s * 128;
  }
  function kMaxLength2() {
    return Buffer3.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function createBuffer2(that, length) {
    if (kMaxLength2() < length) {
      throw new RangeError("Invalid typed array length");
    }
    if (Buffer3.TYPED_ARRAY_SUPPORT) {
      that = new Uint8Array(length);
      that.__proto__ = Buffer3.prototype;
    } else {
      if (that === null) {
        that = new Buffer3(length);
      }
      that.length = length;
    }
    return that;
  }
  function Buffer3(arg, encodingOrOffset, length) {
    if (!Buffer3.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer3)) {
      return new Buffer3(arg, encodingOrOffset, length);
    }
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new Error(
          "If encoding is specified then the first argument must be a string"
        );
      }
      return allocUnsafe2(this, arg);
    }
    return from2(this, arg, encodingOrOffset, length);
  }
  function from2(that, value, encodingOrOffset, length) {
    if (typeof value === "number") {
      throw new TypeError('"value" argument must not be a number');
    }
    if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
      return fromArrayBuffer2(that, value, encodingOrOffset, length);
    }
    if (typeof value === "string") {
      return fromString2(that, value, encodingOrOffset);
    }
    return fromObject2(that, value);
  }
  function assertSize2(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be a number');
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative');
    }
  }
  function alloc2(that, size, fill3, encoding) {
    assertSize2(size);
    if (size <= 0) {
      return createBuffer2(that, size);
    }
    if (fill3 !== void 0) {
      return typeof encoding === "string" ? createBuffer2(that, size).fill(fill3, encoding) : createBuffer2(that, size).fill(fill3);
    }
    return createBuffer2(that, size);
  }
  function allocUnsafe2(that, size) {
    assertSize2(size);
    that = createBuffer2(that, size < 0 ? 0 : checked2(size) | 0);
    if (!Buffer3.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that;
  }
  function fromString2(that, string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer3.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding');
    }
    var length = byteLength2(string, encoding) | 0;
    that = createBuffer2(that, length);
    var actual = that.write(string, encoding);
    if (actual !== length) {
      that = that.slice(0, actual);
    }
    return that;
  }
  function fromArrayLike2(that, array) {
    var length = array.length < 0 ? 0 : checked2(array.length) | 0;
    that = createBuffer2(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromArrayBuffer2(that, array, byteOffset, length) {
    array.byteLength;
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError("'offset' is out of bounds");
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError("'length' is out of bounds");
    }
    if (byteOffset === void 0 && length === void 0) {
      array = new Uint8Array(array);
    } else if (length === void 0) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }
    if (Buffer3.TYPED_ARRAY_SUPPORT) {
      that = array;
      that.__proto__ = Buffer3.prototype;
    } else {
      that = fromArrayLike2(that, array);
    }
    return that;
  }
  function fromObject2(that, obj) {
    if (internalIsBuffer2(obj)) {
      var len = checked2(obj.length) | 0;
      that = createBuffer2(that, len);
      if (that.length === 0) {
        return that;
      }
      obj.copy(that, 0, 0, len);
      return that;
    }
    if (obj) {
      if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
        if (typeof obj.length !== "number" || isnan2(obj.length)) {
          return createBuffer2(that, 0);
        }
        return fromArrayLike2(that, obj);
      }
      if (obj.type === "Buffer" && isArray(obj.data)) {
        return fromArrayLike2(that, obj.data);
      }
    }
    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
  }
  function checked2(length) {
    if (length >= kMaxLength2()) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength2().toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer3.alloc(+length);
  }
  function internalIsBuffer2(b) {
    return !!(b != null && b._isBuffer);
  }
  function byteLength2(string, encoding) {
    if (internalIsBuffer2(string)) {
      return string.length;
    }
    if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      string = "" + string;
    }
    var len = string.length;
    if (len === 0)
      return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
        case void 0:
          return utf8ToBytes2(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes2(string).length;
        default:
          if (loweredCase)
            return utf8ToBytes2(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  function slowToString2(encoding, start, end) {
    var loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice2(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice2(this, start, end);
        case "ascii":
          return asciiSlice2(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice2(this, start, end);
        case "base64":
          return base64Slice2(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice2(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  function swap2(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  function bidirectionalIndexOf2(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (isNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer3.from(val, encoding);
    }
    if (internalIsBuffer2(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf2(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (Buffer3.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf2(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf2(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read2(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read2(arr, i + j) !== read2(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  function hexWrite2(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (strLen % 2 !== 0)
      throw new TypeError("Invalid hex string");
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write2(buf, string, offset, length) {
    return blitBuffer2(utf8ToBytes2(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite2(buf, string, offset, length) {
    return blitBuffer2(asciiToBytes2(string), buf, offset, length);
  }
  function latin1Write2(buf, string, offset, length) {
    return asciiWrite2(buf, string, offset, length);
  }
  function base64Write2(buf, string, offset, length) {
    return blitBuffer2(base64ToBytes2(string), buf, offset, length);
  }
  function ucs2Write2(buf, string, offset, length) {
    return blitBuffer2(utf16leToBytes2(string, buf.length - offset), buf, offset, length);
  }
  function base64Slice2(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return fromByteArray(buf);
    } else {
      return fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice2(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray2(res);
  }
  function decodeCodePointsArray2(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH2) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = "";
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH2)
      );
    }
    return res;
  }
  function asciiSlice2(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice2(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice2(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    var out = "";
    for (var i = start; i < end; ++i) {
      out += toHex2(buf[i]);
    }
    return out;
  }
  function utf16leSlice2(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  function checkOffset2(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  function checkInt2(buf, value, offset, ext, max, min) {
    if (!internalIsBuffer2(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  function objectWriteUInt162(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 65535 + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
    }
  }
  function objectWriteUInt322(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 4294967295 + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
    }
  }
  function checkIEEE7542(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat2(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE7542(buf, value, offset, 4);
    }
    write2(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  function writeDouble2(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE7542(buf, value, offset, 8);
    }
    write2(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  function base64clean2(str) {
    str = stringtrim2(str).replace(INVALID_BASE64_RE2, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function stringtrim2(str) {
    if (str.trim)
      return str.trim();
    return str.replace(/^\s+|\s+$/g, "");
  }
  function toHex2(n) {
    if (n < 16)
      return "0" + n.toString(16);
    return n.toString(16);
  }
  function utf8ToBytes2(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(
          codePoint >> 6 | 192,
          codePoint & 63 | 128
        );
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes2(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes2(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes2(str) {
    return toByteArray(base64clean2(str));
  }
  function blitBuffer2(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isnan2(val) {
    return val !== val;
  }
  function isBuffer2(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer2(obj) || isSlowBuffer2(obj));
  }
  function isFastBuffer2(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  }
  function isSlowBuffer2(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer2(obj.slice(0, 0));
  }
  var lookup2, revLookup2, Arr2, inited2, toString2, isArray, INSPECT_MAX_BYTES, _kMaxLength, MAX_ARGUMENTS_LENGTH2, INVALID_BASE64_RE2;
  var init_buffer2 = __esm({
    "node-modules-polyfills:buffer"() {
      init_process();
      init_buffer();
      lookup2 = [];
      revLookup2 = [];
      Arr2 = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      inited2 = false;
      toString2 = {}.toString;
      isArray = Array.isArray || function(arr) {
        return toString2.call(arr) == "[object Array]";
      };
      INSPECT_MAX_BYTES = 50;
      Buffer3.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
      _kMaxLength = kMaxLength2();
      Buffer3.poolSize = 8192;
      Buffer3._augment = function(arr) {
        arr.__proto__ = Buffer3.prototype;
        return arr;
      };
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from2(null, value, encodingOrOffset, length);
      };
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        Buffer3.prototype.__proto__ = Uint8Array.prototype;
        Buffer3.__proto__ = Uint8Array;
      }
      Buffer3.alloc = function(size, fill3, encoding) {
        return alloc2(null, size, fill3, encoding);
      };
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe2(null, size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe2(null, size);
      };
      Buffer3.isBuffer = isBuffer2;
      Buffer3.compare = function compare3(a, b) {
        if (!internalIsBuffer2(a) || !internalIsBuffer2(b)) {
          throw new TypeError("Arguments must be Buffers");
        }
        if (a === b)
          return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding2(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat2(list, length) {
        if (!isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = Buffer3.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!internalIsBuffer2(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      Buffer3.byteLength = byteLength2;
      Buffer3.prototype._isBuffer = true;
      Buffer3.prototype.swap16 = function swap162() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap2(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap322() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap2(this, i, i + 3);
          swap2(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap642() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap2(this, i, i + 7);
          swap2(this, i + 1, i + 6);
          swap2(this, i + 2, i + 5);
          swap2(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString3() {
        var length = this.length | 0;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice2(this, 0, length);
        return slowToString2.apply(this, arguments);
      };
      Buffer3.prototype.equals = function equals2(b) {
        if (!internalIsBuffer2(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        var str = "";
        var max = INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          if (this.length > max)
            str += " ... ";
        }
        return "<Buffer " + str + ">";
      };
      Buffer3.prototype.compare = function compare4(target, start, end, thisStart, thisEnd) {
        if (!internalIsBuffer2(target)) {
          throw new TypeError("Argument must be a Buffer");
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer3.prototype.includes = function includes2(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf2(val, byteOffset, encoding) {
        return bidirectionalIndexOf2(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf2(val, byteOffset, encoding) {
        return bidirectionalIndexOf2(this, val, byteOffset, encoding, false);
      };
      Buffer3.prototype.write = function write3(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length)) {
            length = length | 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite2(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write2(this, string, offset, length);
            case "ascii":
              return asciiWrite2(this, string, offset, length);
            case "latin1":
            case "binary":
              return latin1Write2(this, string, offset, length);
            case "base64":
              return base64Write2(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write2(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON2() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      MAX_ARGUMENTS_LENGTH2 = 4096;
      Buffer3.prototype.slice = function slice2(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf;
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer3.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer3(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }
        return newBuf;
      };
      Buffer3.prototype.readUIntLE = function readUIntLE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert)
          checkOffset2(offset, byteLength3, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength3 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUIntBE = function readUIntBE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          checkOffset2(offset, byteLength3, this.length);
        }
        var val = this[offset + --byteLength3];
        var mul = 1;
        while (byteLength3 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength3] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUInt8 = function readUInt82(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUInt16LE = function readUInt16LE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUInt16BE = function readUInt16BE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUInt32LE = function readUInt32LE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUInt32BE = function readUInt32BE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readIntLE = function readIntLE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert)
          checkOffset2(offset, byteLength3, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength3 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength3);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE2(offset, byteLength3, noAssert) {
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert)
          checkOffset2(offset, byteLength3, this.length);
        var i = byteLength3;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength3);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt82(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readFloatLE = function readFloatLE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 4, this.length);
        return read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 4, this.length);
        return read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 8, this.length);
        return read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE2(offset, noAssert) {
        if (!noAssert)
          checkOffset2(offset, 8, this.length);
        return read(this, offset, false, 52, 8);
      };
      Buffer3.prototype.writeUIntLE = function writeUIntLE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
          checkInt2(this, value, offset, byteLength3, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength3 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength3;
      };
      Buffer3.prototype.writeUIntBE = function writeUIntBE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength3 = byteLength3 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
          checkInt2(this, value, offset, byteLength3, maxBytes, 0);
        }
        var i = byteLength3 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength3;
      };
      Buffer3.prototype.writeUInt8 = function writeUInt82(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 1, 255, 0);
        if (!Buffer3.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUInt16LE = function writeUInt16LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 2, 65535, 0);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt162(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer3.prototype.writeUInt16BE = function writeUInt16BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 2, 65535, 0);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt162(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer3.prototype.writeUInt32LE = function writeUInt32LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 4, 4294967295, 0);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 255;
        } else {
          objectWriteUInt322(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer3.prototype.writeUInt32BE = function writeUInt32BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 4, 4294967295, 0);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt322(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer3.prototype.writeIntLE = function writeIntLE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength3 - 1);
          checkInt2(this, value, offset, byteLength3, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength3 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength3;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE2(value, offset, byteLength3, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength3 - 1);
          checkInt2(this, value, offset, byteLength3, limit - 1, -limit);
        }
        var i = byteLength3 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength3;
      };
      Buffer3.prototype.writeInt8 = function writeInt82(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 1, 127, -128);
        if (!Buffer3.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 2, 32767, -32768);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt162(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 2, 32767, -32768);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt162(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else {
          objectWriteUInt322(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE2(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt2(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        if (Buffer3.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt322(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer3.prototype.writeFloatLE = function writeFloatLE2(value, offset, noAssert) {
        return writeFloat2(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE2(value, offset, noAssert) {
        return writeFloat2(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE2(value, offset, noAssert) {
        return writeDouble2(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE2(value, offset, noAssert) {
        return writeDouble2(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy2(target, targetStart, start, end) {
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1e3 || !Buffer3.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, start + len),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill2(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
        } else if (typeof val === "number") {
          val = val & 255;
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = internalIsBuffer2(val) ? val : utf8ToBytes2(new Buffer3(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      INVALID_BASE64_RE2 = /[^+\/0-9A-Za-z-_]/g;
    }
  });

  // node-modules-polyfills-commonjs:buffer
  var require_buffer = __commonJS({
    "node-modules-polyfills-commonjs:buffer"(exports, module) {
      init_process();
      init_buffer();
      var polyfill = (init_buffer2(), __toCommonJS(buffer_exports));
      if (polyfill && polyfill.default) {
        module.exports = polyfill.default;
        for (let k in polyfill) {
          module.exports[k] = polyfill[k];
        }
      } else if (polyfill) {
        module.exports = polyfill;
      }
    }
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS({
    "node_modules/safe-buffer/index.js"(exports, module) {
      init_process();
      init_buffer();
      var buffer = require_buffer();
      var Buffer4 = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer4.from && Buffer4.alloc && Buffer4.allocUnsafe && Buffer4.allocUnsafeSlow) {
        module.exports = buffer;
      } else {
        copyProps(buffer, exports);
        exports.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer4(arg, encodingOrOffset, length);
      }
      SafeBuffer.prototype = Object.create(Buffer4.prototype);
      copyProps(Buffer4, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer4(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill3, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer4(size);
        if (fill3 !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill3, encoding);
          } else {
            buf.fill(fill3);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer4(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }
  });

  // node-modules-polyfills:events
  function EventHandlers() {
  }
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  function $getMaxListeners(that) {
    if (that._maxListeners === void 0)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  function emitNone(handler, isFn, self2) {
    if (isFn)
      handler.call(self2);
    else {
      var len = handler.length;
      var listeners2 = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners2[i].call(self2);
    }
  }
  function emitOne(handler, isFn, self2, arg1) {
    if (isFn)
      handler.call(self2, arg1);
    else {
      var len = handler.length;
      var listeners2 = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners2[i].call(self2, arg1);
    }
  }
  function emitTwo(handler, isFn, self2, arg1, arg2) {
    if (isFn)
      handler.call(self2, arg1, arg2);
    else {
      var len = handler.length;
      var listeners2 = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners2[i].call(self2, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
    if (isFn)
      handler.call(self2, arg1, arg2, arg3);
    else {
      var len = handler.length;
      var listeners2 = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners2[i].call(self2, arg1, arg2, arg3);
    }
  }
  function emitMany(handler, isFn, self2, args) {
    if (isFn)
      handler.apply(self2, args);
    else {
      var len = handler.length;
      var listeners2 = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners2[i].apply(self2, args);
    }
  }
  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    if (typeof listener !== "function")
      throw new TypeError('"listener" argument must be a function');
    events = target._events;
    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      if (events.newListener) {
        target.emit(
          "newListener",
          type,
          listener.listener ? listener.listener : listener
        );
        events = target._events;
      }
      existing = events[type];
    }
    if (!existing) {
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") {
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      } else {
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }
    return target;
  }
  function emitWarning(e) {
    typeof console.warn === "function" ? console.warn(e) : console.log(e);
  }
  function _onceWrap(target, type, listener) {
    var fired = false;
    function g2() {
      target.removeListener(type, g2);
      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }
    g2.listener = listener;
    return g2;
  }
  function listenerCount(type) {
    var events = this._events;
    if (events) {
      var evlistener = events[type];
      if (typeof evlistener === "function") {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }
    return 0;
  }
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
      list[i] = list[k];
    list.pop();
  }
  function arrayClone(arr, i) {
    var copy3 = new Array(i);
    while (i--)
      copy3[i] = arr[i];
    return copy3;
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }
  var domain, events_default;
  var init_events = __esm({
    "node-modules-polyfills:events"() {
      "use strict";
      init_process();
      init_buffer();
      EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
      events_default = EventEmitter;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.usingDomains = false;
      EventEmitter.prototype.domain = void 0;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._maxListeners = void 0;
      EventEmitter.defaultMaxListeners = 10;
      EventEmitter.init = function() {
        this.domain = null;
        if (EventEmitter.usingDomains) {
          if (domain.active && !(this instanceof domain.Domain)) {
            this.domain = domain.active;
          }
        }
        if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || isNaN(n))
          throw new TypeError('"n" argument must be a positive number');
        this._maxListeners = n;
        return this;
      };
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return $getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit2(type) {
        var er, handler, len, args, i, events, domain2;
        var needDomainExit = false;
        var doError = type === "error";
        events = this._events;
        if (events)
          doError = doError && events.error == null;
        else if (!doError)
          return false;
        domain2 = this.domain;
        if (doError) {
          er = arguments[1];
          if (domain2) {
            if (!er)
              er = new Error('Uncaught, unspecified "error" event');
            er.domainEmitter = this;
            er.domain = domain2;
            er.domainThrown = false;
            domain2.emit("error", er);
          } else if (er instanceof Error) {
            throw er;
          } else {
            var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
            err.context = er;
            throw err;
          }
          return false;
        }
        handler = events[type];
        if (!handler)
          return false;
        var isFn = typeof handler === "function";
        len = arguments.length;
        switch (len) {
          case 1:
            emitNone(handler, isFn, this);
            break;
          case 2:
            emitOne(handler, isFn, this, arguments[1]);
            break;
          case 3:
            emitTwo(handler, isFn, this, arguments[1], arguments[2]);
            break;
          case 4:
            emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
            break;
          default:
            args = new Array(len - 1);
            for (i = 1; i < len; i++)
              args[i - 1] = arguments[i];
            emitMany(handler, isFn, this, args);
        }
        if (needDomainExit)
          domain2.exit();
        return true;
      };
      EventEmitter.prototype.addListener = function addListener2(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      EventEmitter.prototype.once = function once2(type, listener) {
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener2(type, listener) {
        var list, events, position, i, originalListener;
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        events = this._events;
        if (!events)
          return this;
        list = events[type];
        if (!list)
          return this;
        if (list === listener || list.listener && list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length; i-- > 0; ) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (list.length === 1) {
            list[0] = void 0;
            if (--this._eventsCount === 0) {
              this._events = new EventHandlers();
              return this;
            } else {
              delete events[type];
            }
          } else {
            spliceOne(list, position);
          }
          if (events.removeListener)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function removeAllListeners2(type) {
        var listeners2, events;
        events = this._events;
        if (!events)
          return this;
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = new EventHandlers();
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = new EventHandlers();
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys2 = Object.keys(events);
          for (var i = 0, key; i < keys2.length; ++i) {
            key = keys2[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = new EventHandlers();
          this._eventsCount = 0;
          return this;
        }
        listeners2 = events[type];
        if (typeof listeners2 === "function") {
          this.removeListener(type, listeners2);
        } else if (listeners2) {
          do {
            this.removeListener(type, listeners2[listeners2.length - 1]);
          } while (listeners2[0]);
        }
        return this;
      };
      EventEmitter.prototype.listeners = function listeners(type) {
        var evlistener;
        var ret;
        var events = this._events;
        if (!events)
          ret = [];
        else {
          evlistener = events[type];
          if (!evlistener)
            ret = [];
          else if (typeof evlistener === "function")
            ret = [evlistener.listener || evlistener];
          else
            ret = unwrapListeners(evlistener);
        }
        return ret;
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      };
    }
  });

  // node-modules-polyfills:process
  function defaultSetTimout2() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout2() {
    throw new Error("clearTimeout has not been defined");
  }
  function runTimeout2(fun) {
    if (cachedSetTimeout2 === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout2 === defaultSetTimout2 || !cachedSetTimeout2) && setTimeout) {
      cachedSetTimeout2 = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout2(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout2.call(null, fun, 0);
      } catch (e2) {
        return cachedSetTimeout2.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout2(marker) {
    if (cachedClearTimeout2 === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout2 === defaultClearTimeout2 || !cachedClearTimeout2) && clearTimeout) {
      cachedClearTimeout2 = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout2(marker);
    } catch (e) {
      try {
        return cachedClearTimeout2.call(null, marker);
      } catch (e2) {
        return cachedClearTimeout2.call(this, marker);
      }
    }
  }
  function cleanUpNextTick2() {
    if (!draining2 || !currentQueue2) {
      return;
    }
    draining2 = false;
    if (currentQueue2.length) {
      queue2 = currentQueue2.concat(queue2);
    } else {
      queueIndex2 = -1;
    }
    if (queue2.length) {
      drainQueue2();
    }
  }
  function drainQueue2() {
    if (draining2) {
      return;
    }
    var timeout = runTimeout2(cleanUpNextTick2);
    draining2 = true;
    var len = queue2.length;
    while (len) {
      currentQueue2 = queue2;
      queue2 = [];
      while (++queueIndex2 < len) {
        if (currentQueue2) {
          currentQueue2[queueIndex2].run();
        }
      }
      queueIndex2 = -1;
      len = queue2.length;
    }
    currentQueue2 = null;
    draining2 = false;
    runClearTimeout2(timeout);
  }
  function nextTick2(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue2.push(new Item2(fun, args));
    if (queue2.length === 1 && !draining2) {
      runTimeout2(drainQueue2);
    }
  }
  function Item2(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  function noop2() {
  }
  function binding2(name) {
    throw new Error("process.binding is not supported");
  }
  function cwd2() {
    return "/";
  }
  function chdir2(dir) {
    throw new Error("process.chdir is not supported");
  }
  function umask2() {
    return 0;
  }
  function hrtime2(previousTimestamp) {
    var clocktime = performanceNow2.call(performance2) * 1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds, nanoseconds];
  }
  function uptime2() {
    var currentTime = /* @__PURE__ */ new Date();
    var dif = currentTime - startTime2;
    return dif / 1e3;
  }
  var cachedSetTimeout2, cachedClearTimeout2, queue2, draining2, currentQueue2, queueIndex2, title2, platform2, browser2, env3, argv2, version2, versions2, release2, config2, on2, addListener3, once3, off2, removeListener3, removeAllListeners3, emit3, performance2, performanceNow2, startTime2, browser$1, process_default;
  var init_process2 = __esm({
    "node-modules-polyfills:process"() {
      init_process();
      init_buffer();
      cachedSetTimeout2 = defaultSetTimout2;
      cachedClearTimeout2 = defaultClearTimeout2;
      if (typeof globalThis.setTimeout === "function") {
        cachedSetTimeout2 = setTimeout;
      }
      if (typeof globalThis.clearTimeout === "function") {
        cachedClearTimeout2 = clearTimeout;
      }
      queue2 = [];
      draining2 = false;
      queueIndex2 = -1;
      Item2.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      title2 = "browser";
      platform2 = "browser";
      browser2 = true;
      env3 = {};
      argv2 = [];
      version2 = "";
      versions2 = {};
      release2 = {};
      config2 = {};
      on2 = noop2;
      addListener3 = noop2;
      once3 = noop2;
      off2 = noop2;
      removeListener3 = noop2;
      removeAllListeners3 = noop2;
      emit3 = noop2;
      performance2 = globalThis.performance || {};
      performanceNow2 = performance2.now || performance2.mozNow || performance2.msNow || performance2.oNow || performance2.webkitNow || function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
      startTime2 = /* @__PURE__ */ new Date();
      browser$1 = {
        nextTick: nextTick2,
        title: title2,
        browser: browser2,
        env: env3,
        argv: argv2,
        version: version2,
        versions: versions2,
        on: on2,
        addListener: addListener3,
        once: once3,
        off: off2,
        removeListener: removeListener3,
        removeAllListeners: removeAllListeners3,
        emit: emit3,
        binding: binding2,
        cwd: cwd2,
        chdir: chdir2,
        umask: umask2,
        hrtime: hrtime2,
        platform: platform2,
        release: release2,
        config: config2,
        uptime: uptime2
      };
      process_default = browser$1;
    }
  });

  // node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js
  var inherits, inherits_default;
  var init_inherits = __esm({
    "node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js"() {
      init_process();
      init_buffer();
      if (typeof Object.create === "function") {
        inherits = function inherits2(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        inherits = function inherits2(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
      inherits_default = inherits;
    }
  });

  // node-modules-polyfills:util
  var util_exports = {};
  __export(util_exports, {
    _extend: () => _extend,
    debuglog: () => debuglog,
    default: () => util_default,
    deprecate: () => deprecate,
    format: () => format,
    inherits: () => inherits_default,
    inspect: () => inspect2,
    isArray: () => isArray2,
    isBoolean: () => isBoolean,
    isBuffer: () => isBuffer3,
    isDate: () => isDate,
    isError: () => isError,
    isFunction: () => isFunction,
    isNull: () => isNull,
    isNullOrUndefined: () => isNullOrUndefined,
    isNumber: () => isNumber,
    isObject: () => isObject,
    isPrimitive: () => isPrimitive,
    isRegExp: () => isRegExp,
    isString: () => isString,
    isSymbol: () => isSymbol,
    isUndefined: () => isUndefined,
    log: () => log
  });
  function format(f2) {
    if (!isString(f2)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect2(arguments[i]));
      }
      return objects.join(" ");
    }
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f2).replace(formatRegExp, function(x2) {
      if (x2 === "%%")
        return "%";
      if (i >= len)
        return x2;
      switch (x2) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
        default:
          return x2;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += " " + x;
      } else {
        str += " " + inspect2(x);
      }
    }
    return str;
  }
  function deprecate(fn, msg) {
    if (isUndefined(globalThis.process)) {
      return function() {
        return deprecate(fn, msg).apply(this, arguments);
      };
    }
    if (process_default.noDeprecation === true) {
      return fn;
    }
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process_default.throwDeprecation) {
          throw new Error(msg);
        } else if (process_default.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  }
  function debuglog(set) {
    if (isUndefined(debugEnviron))
      debugEnviron = process_default.env.NODE_DEBUG || "";
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
        var pid = 0;
        debugs[set] = function() {
          var msg = format.apply(null, arguments);
          console.error("%s %d: %s", set, pid, msg);
        };
      } else {
        debugs[set] = function() {
        };
      }
    }
    return debugs[set];
  }
  function inspect2(obj, opts) {
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    if (arguments.length >= 3)
      ctx.depth = arguments[2];
    if (arguments.length >= 4)
      ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      ctx.showHidden = opts;
    } else if (opts) {
      _extend(ctx, opts);
    }
    if (isUndefined(ctx.showHidden))
      ctx.showHidden = false;
    if (isUndefined(ctx.depth))
      ctx.depth = 2;
    if (isUndefined(ctx.colors))
      ctx.colors = false;
    if (isUndefined(ctx.customInspect))
      ctx.customInspect = true;
    if (ctx.colors)
      ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  function stylizeWithColor(str, styleType) {
    var style = inspect2.styles[styleType];
    if (style) {
      return "\x1B[" + inspect2.colors[style][0] + "m" + str + "\x1B[" + inspect2.colors[style][1] + "m";
    } else {
      return str;
    }
  }
  function stylizeNoColor(str, styleType) {
    return str;
  }
  function arrayToHash(array) {
    var hash = {};
    array.forEach(function(val, idx) {
      hash[val] = true;
    });
    return hash;
  }
  function formatValue(ctx, value, recurseTimes) {
    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== inspect2 && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
    var keys2 = Object.keys(value);
    var visibleKeys = arrayToHash(keys2);
    if (ctx.showHidden) {
      keys2 = Object.getOwnPropertyNames(value);
    }
    if (isError(value) && (keys2.indexOf("message") >= 0 || keys2.indexOf("description") >= 0)) {
      return formatError(value);
    }
    if (keys2.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name + "]", "special");
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date");
      }
      if (isError(value)) {
        return formatError(value);
      }
    }
    var base = "", array = false, braces = ["{", "}"];
    if (isArray2(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (isFunction(value)) {
      var n = value.name ? ": " + value.name : "";
      base = " [Function" + n + "]";
    }
    if (isRegExp(value)) {
      base = " " + RegExp.prototype.toString.call(value);
    }
    if (isDate(value)) {
      base = " " + Date.prototype.toUTCString.call(value);
    }
    if (isError(value)) {
      base = " " + formatError(value);
    }
    if (keys2.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      } else {
        return ctx.stylize("[Object]", "special");
      }
    }
    ctx.seen.push(value);
    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2);
    } else {
      output = keys2.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize("undefined", "undefined");
    if (isString(value)) {
      var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return ctx.stylize(simple, "string");
    }
    if (isNumber(value))
      return ctx.stylize("" + value, "number");
    if (isBoolean(value))
      return ctx.stylize("" + value, "boolean");
    if (isNull(value))
      return ctx.stylize("null", "null");
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(
          ctx,
          value,
          recurseTimes,
          visibleKeys,
          String(i),
          true
        ));
      } else {
        output.push("");
      }
    }
    keys2.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(
          ctx,
          value,
          recurseTimes,
          visibleKeys,
          key,
          true
        ));
      }
    });
    return output;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize("[Getter/Setter]", "special");
      } else {
        str = ctx.stylize("[Getter]", "special");
      }
    } else {
      if (desc.set) {
        str = ctx.stylize("[Setter]", "special");
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = "[" + key + "]";
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str.split("\n").map(function(line) {
              return "  " + line;
            }).join("\n").substr(2);
          } else {
            str = "\n" + str.split("\n").map(function(line) {
              return "   " + line;
            }).join("\n");
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special");
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify("" + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, "name");
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, "string");
      }
    }
    return name + ": " + str;
  }
  function reduceToSingleString(output, base, braces) {
    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf("\n") >= 0)
        numLinesEst++;
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) {
      return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    }
    return braces[0] + base + " " + output.join(", ") + " " + braces[1];
  }
  function isArray2(ar) {
    return Array.isArray(ar);
  }
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  function isNull(arg) {
    return arg === null;
  }
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  function isNumber(arg) {
    return typeof arg === "number";
  }
  function isString(arg) {
    return typeof arg === "string";
  }
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === "[object RegExp]";
  }
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  function isDate(d) {
    return isObject(d) && objectToString(d) === "[object Date]";
  }
  function isError(e) {
    return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
  }
  function isFunction(arg) {
    return typeof arg === "function";
  }
  function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
    typeof arg === "undefined";
  }
  function isBuffer3(maybeBuf) {
    return Buffer2.isBuffer(maybeBuf);
  }
  function objectToString(o2) {
    return Object.prototype.toString.call(o2);
  }
  function pad(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
  }
  function timestamp() {
    var d = /* @__PURE__ */ new Date();
    var time = [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds())
    ].join(":");
    return [d.getDate(), months[d.getMonth()], time].join(" ");
  }
  function log() {
    console.log("%s - %s", timestamp(), format.apply(null, arguments));
  }
  function _extend(origin, add) {
    if (!add || !isObject(add))
      return origin;
    var keys2 = Object.keys(add);
    var i = keys2.length;
    while (i--) {
      origin[keys2[i]] = add[keys2[i]];
    }
    return origin;
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var formatRegExp, debugs, debugEnviron, months, util_default;
  var init_util = __esm({
    "node-modules-polyfills:util"() {
      init_process();
      init_buffer();
      init_process2();
      init_inherits();
      formatRegExp = /%[sdj%]/g;
      debugs = {};
      inspect2.colors = {
        "bold": [1, 22],
        "italic": [3, 23],
        "underline": [4, 24],
        "inverse": [7, 27],
        "white": [37, 39],
        "grey": [90, 39],
        "black": [30, 39],
        "blue": [34, 39],
        "cyan": [36, 39],
        "green": [32, 39],
        "magenta": [35, 39],
        "red": [31, 39],
        "yellow": [33, 39]
      };
      inspect2.styles = {
        "special": "cyan",
        "number": "yellow",
        "boolean": "yellow",
        "undefined": "grey",
        "null": "bold",
        "string": "green",
        "date": "magenta",
        // "name": intentionally not styling
        "regexp": "red"
      };
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      util_default = {
        inherits: inherits_default,
        _extend,
        log,
        isBuffer: isBuffer3,
        isPrimitive,
        isFunction,
        isError,
        isDate,
        isObject,
        isRegExp,
        isUndefined,
        isSymbol,
        isString,
        isNumber,
        isNullOrUndefined,
        isNull,
        isBoolean,
        isArray: isArray2,
        inspect: inspect2,
        deprecate,
        format,
        debuglog
      };
    }
  });

  // node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js
  function BufferList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  var buffer_list_default;
  var init_buffer_list = __esm({
    "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js"() {
      init_process();
      init_buffer();
      init_buffer2();
      buffer_list_default = BufferList;
      BufferList.prototype.push = function(v) {
        var entry = { data: v, next: null };
        if (this.length > 0)
          this.tail.next = entry;
        else
          this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList.prototype.unshift = function(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0)
          this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList.prototype.shift = function() {
        if (this.length === 0)
          return;
        var ret = this.head.data;
        if (this.length === 1)
          this.head = this.tail = null;
        else
          this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList.prototype.clear = function() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList.prototype.join = function(s) {
        if (this.length === 0)
          return "";
        var p2 = this.head;
        var ret = "" + p2.data;
        while (p2 = p2.next) {
          ret += s + p2.data;
        }
        return ret;
      };
      BufferList.prototype.concat = function(n) {
        if (this.length === 0)
          return Buffer3.alloc(0);
        if (this.length === 1)
          return this.head.data;
        var ret = Buffer3.allocUnsafe(n >>> 0);
        var p2 = this.head;
        var i = 0;
        while (p2) {
          p2.data.copy(ret, i);
          i += p2.data.length;
          p2 = p2.next;
        }
        return ret;
      };
    }
  });

  // node-modules-polyfills:string_decoder
  function assertEncoding(encoding) {
    if (encoding && !isBufferEncoding(encoding)) {
      throw new Error("Unknown encoding: " + encoding);
    }
  }
  function StringDecoder(encoding) {
    this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
    assertEncoding(encoding);
    switch (this.encoding) {
      case "utf8":
        this.surrogateSize = 3;
        break;
      case "ucs2":
      case "utf16le":
        this.surrogateSize = 2;
        this.detectIncompleteChar = utf16DetectIncompleteChar;
        break;
      case "base64":
        this.surrogateSize = 3;
        this.detectIncompleteChar = base64DetectIncompleteChar;
        break;
      default:
        this.write = passThroughWrite;
        return;
    }
    this.charBuffer = new Buffer3(6);
    this.charReceived = 0;
    this.charLength = 0;
  }
  function passThroughWrite(buffer) {
    return buffer.toString(this.encoding);
  }
  function utf16DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 2;
    this.charLength = this.charReceived ? 2 : 0;
  }
  function base64DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 3;
    this.charLength = this.charReceived ? 3 : 0;
  }
  var isBufferEncoding;
  var init_string_decoder = __esm({
    "node-modules-polyfills:string_decoder"() {
      init_process();
      init_buffer();
      init_buffer2();
      isBufferEncoding = Buffer3.isEncoding || function(encoding) {
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      StringDecoder.prototype.write = function(buffer) {
        var charStr = "";
        while (this.charLength) {
          var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
          buffer.copy(this.charBuffer, this.charReceived, 0, available);
          this.charReceived += available;
          if (this.charReceived < this.charLength) {
            return "";
          }
          buffer = buffer.slice(available, buffer.length);
          charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
          var charCode = charStr.charCodeAt(charStr.length - 1);
          if (charCode >= 55296 && charCode <= 56319) {
            this.charLength += this.surrogateSize;
            charStr = "";
            continue;
          }
          this.charReceived = this.charLength = 0;
          if (buffer.length === 0) {
            return charStr;
          }
          break;
        }
        this.detectIncompleteChar(buffer);
        var end = buffer.length;
        if (this.charLength) {
          buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
          end -= this.charReceived;
        }
        charStr += buffer.toString(this.encoding, 0, end);
        var end = charStr.length - 1;
        var charCode = charStr.charCodeAt(end);
        if (charCode >= 55296 && charCode <= 56319) {
          var size = this.surrogateSize;
          this.charLength += size;
          this.charReceived += size;
          this.charBuffer.copy(this.charBuffer, size, 0, size);
          buffer.copy(this.charBuffer, 0, 0, size);
          return charStr.substring(0, end);
        }
        return charStr;
      };
      StringDecoder.prototype.detectIncompleteChar = function(buffer) {
        var i = buffer.length >= 3 ? 3 : buffer.length;
        for (; i > 0; i--) {
          var c = buffer[buffer.length - i];
          if (i == 1 && c >> 5 == 6) {
            this.charLength = 2;
            break;
          }
          if (i <= 2 && c >> 4 == 14) {
            this.charLength = 3;
            break;
          }
          if (i <= 3 && c >> 3 == 30) {
            this.charLength = 4;
            break;
          }
        }
        this.charReceived = i;
      };
      StringDecoder.prototype.end = function(buffer) {
        var res = "";
        if (buffer && buffer.length)
          res = this.write(buffer);
        if (this.charReceived) {
          var cr = this.charReceived;
          var buf = this.charBuffer;
          var enc = this.encoding;
          res += buf.slice(0, cr).toString(enc);
        }
        return res;
      };
    }
  });

  // node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js
  function prependListener2(emitter, event, fn) {
    if (typeof emitter.prependListener === "function") {
      return emitter.prependListener(event, fn);
    } else {
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
  }
  function listenerCount2(emitter, type) {
    return emitter.listeners(type).length;
  }
  function ReadableState(options, stream) {
    options = options || {};
    this.objectMode = !!options.objectMode;
    if (stream instanceof Duplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
    this.highWaterMark = ~~this.highWaterMark;
    this.buffer = new buffer_list_default();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.ranOut = false;
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    if (!(this instanceof Readable))
      return new Readable(options);
    this._readableState = new ReadableState(options, this);
    this.readable = true;
    if (options && typeof options.read === "function")
      this._read = options.read;
    events_default.call(this);
  }
  function readableAddChunk(stream, state, chunk, encoding, addToFront) {
    var er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit("error", er);
    } else if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (state.ended && !addToFront) {
        var e = new Error("stream.push() after EOF");
        stream.emit("error", e);
      } else if (state.endEmitted && addToFront) {
        var _e = new Error("stream.unshift() after end event");
        stream.emit("error", _e);
      } else {
        var skipAdd;
        if (state.decoder && !addToFront && !encoding) {
          chunk = state.decoder.write(chunk);
          skipAdd = !state.objectMode && chunk.length === 0;
        }
        if (!addToFront)
          state.reading = false;
        if (!skipAdd) {
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit("data", chunk);
            stream.read(0);
          } else {
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront)
              state.buffer.unshift(chunk);
            else
              state.buffer.push(chunk);
            if (state.needReadable)
              emitReadable(stream);
          }
        }
        maybeReadMore(stream, state);
      }
    } else if (!addToFront) {
      state.reading = false;
    }
    return needMoreData(state);
  }
  function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  }
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended)
      return 0;
    if (state.objectMode)
      return 1;
    if (n !== n) {
      if (state.flowing && state.length)
        return state.buffer.head.data.length;
      else
        return state.length;
    }
    if (n > state.highWaterMark)
      state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length)
      return n;
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }
  function chunkInvalid(state, chunk) {
    var er = null;
    if (!Buffer2.isBuffer(chunk) && typeof chunk !== "string" && chunk !== null && chunk !== void 0 && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    return er;
  }
  function onEofChunk(stream, state) {
    if (state.ended)
      return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    emitReadable(stream);
  }
  function emitReadable(stream) {
    var state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug("emitReadable", state.flowing);
      state.emittedReadable = true;
      if (state.sync)
        nextTick2(emitReadable_, stream);
      else
        emitReadable_(stream);
    }
  }
  function emitReadable_(stream) {
    debug("emit readable");
    stream.emit("readable");
    flow(stream);
  }
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      nextTick2(maybeReadMore_, stream, state);
    }
  }
  function maybeReadMore_(stream, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug("maybeReadMore read 0");
      stream.read(0);
      if (len === state.length)
        break;
      else
        len = state.length;
    }
    state.readingMore = false;
  }
  function pipeOnDrain(src) {
    return function() {
      var state = src._readableState;
      debug("pipeOnDrain", state.awaitDrain);
      if (state.awaitDrain)
        state.awaitDrain--;
      if (state.awaitDrain === 0 && src.listeners("data").length) {
        state.flowing = true;
        flow(src);
      }
    };
  }
  function nReadingNextTick(self2) {
    debug("readable nexttick read 0");
    self2.read(0);
  }
  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      nextTick2(resume_, stream, state);
    }
  }
  function resume_(stream, state) {
    if (!state.reading) {
      debug("resume read 0");
      stream.read(0);
    }
    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading)
      stream.read(0);
  }
  function flow(stream) {
    var state = stream._readableState;
    debug("flow", state.flowing);
    while (state.flowing && stream.read() !== null) {
    }
  }
  function fromList(n, state) {
    if (state.length === 0)
      return null;
    var ret;
    if (state.objectMode)
      ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      if (state.decoder)
        ret = state.buffer.join("");
      else if (state.buffer.length === 1)
        ret = state.buffer.head.data;
      else
        ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      ret = fromListPartial(n, state.buffer, state.decoder);
    }
    return ret;
  }
  function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
      ret = list.head.data.slice(0, n);
      list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
      ret = list.shift();
    } else {
      ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
    }
    return ret;
  }
  function copyFromBufferString(n, list) {
    var p2 = list.head;
    var c = 1;
    var ret = p2.data;
    n -= ret.length;
    while (p2 = p2.next) {
      var str = p2.data;
      var nb = n > str.length ? str.length : n;
      if (nb === str.length)
        ret += str;
      else
        ret += str.slice(0, n);
      n -= nb;
      if (n === 0) {
        if (nb === str.length) {
          ++c;
          if (p2.next)
            list.head = p2.next;
          else
            list.head = list.tail = null;
        } else {
          list.head = p2;
          p2.data = str.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }
  function copyFromBuffer(n, list) {
    var ret = Buffer2.allocUnsafe(n);
    var p2 = list.head;
    var c = 1;
    p2.data.copy(ret);
    n -= p2.data.length;
    while (p2 = p2.next) {
      var buf = p2.data;
      var nb = n > buf.length ? buf.length : n;
      buf.copy(ret, ret.length - n, 0, nb);
      n -= nb;
      if (n === 0) {
        if (nb === buf.length) {
          ++c;
          if (p2.next)
            list.head = p2.next;
          else
            list.head = list.tail = null;
        } else {
          list.head = p2;
          p2.data = buf.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }
  function endReadable(stream) {
    var state = stream._readableState;
    if (state.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    if (!state.endEmitted) {
      state.ended = true;
      nextTick2(endReadableNT, state, stream);
    }
  }
  function endReadableNT(state, stream) {
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit("end");
    }
  }
  function forEach(xs, f2) {
    for (var i = 0, l = xs.length; i < l; i++) {
      f2(xs[i], i);
    }
  }
  function indexOf3(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  }
  var debug, MAX_HWM;
  var init_readable = __esm({
    "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js"() {
      "use strict";
      init_process();
      init_buffer();
      init_events();
      init_util();
      init_buffer_list();
      init_string_decoder();
      init_duplex();
      init_process2();
      Readable.ReadableState = ReadableState;
      debug = debuglog("stream");
      inherits_default(Readable, events_default);
      Readable.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        if (!state.objectMode && typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
        }
        return readableAddChunk(this, state, chunk, encoding, false);
      };
      Readable.prototype.unshift = function(chunk) {
        var state = this._readableState;
        return readableAddChunk(this, state, chunk, "", true);
      };
      Readable.prototype.isPaused = function() {
        return this._readableState.flowing === false;
      };
      Readable.prototype.setEncoding = function(enc) {
        this._readableState.decoder = new StringDecoder(enc);
        this._readableState.encoding = enc;
        return this;
      };
      MAX_HWM = 8388608;
      Readable.prototype.read = function(n) {
        debug("read", n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        if (n !== 0)
          state.emittedReadable = false;
        if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
          debug("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended)
            endReadable(this);
          else
            emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0)
            endReadable(this);
          return null;
        }
        var doRead = state.needReadable;
        debug("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug("length less than watermark", doRead);
        }
        if (state.ended || state.reading) {
          doRead = false;
          debug("reading or ended", doRead);
        } else if (doRead) {
          debug("do read");
          state.reading = true;
          state.sync = true;
          if (state.length === 0)
            state.needReadable = true;
          this._read(state.highWaterMark);
          state.sync = false;
          if (!state.reading)
            n = howMuchToRead(nOrig, state);
        }
        var ret;
        if (n > 0)
          ret = fromList(n, state);
        else
          ret = null;
        if (ret === null) {
          state.needReadable = true;
          n = 0;
        } else {
          state.length -= n;
        }
        if (state.length === 0) {
          if (!state.ended)
            state.needReadable = true;
          if (nOrig !== n && state.ended)
            endReadable(this);
        }
        if (ret !== null)
          this.emit("data", ret);
        return ret;
      };
      Readable.prototype._read = function(n) {
        this.emit("error", new Error("not implemented"));
      };
      Readable.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch (state.pipesCount) {
          case 0:
            state.pipes = dest;
            break;
          case 1:
            state.pipes = [state.pipes, dest];
            break;
          default:
            state.pipes.push(dest);
            break;
        }
        state.pipesCount += 1;
        debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var doEnd = !pipeOpts || pipeOpts.end !== false;
        var endFn = doEnd ? onend2 : cleanup;
        if (state.endEmitted)
          nextTick2(endFn);
        else
          src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable) {
          debug("onunpipe");
          if (readable === src) {
            cleanup();
          }
        }
        function onend2() {
          debug("onend");
          dest.end();
        }
        var ondrain = pipeOnDrain(src);
        dest.on("drain", ondrain);
        var cleanedUp = false;
        function cleanup() {
          debug("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          dest.removeListener("drain", ondrain);
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend2);
          src.removeListener("end", cleanup);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
            ondrain();
        }
        var increasedAwaitDrain = false;
        src.on("data", ondata);
        function ondata(chunk) {
          debug("ondata");
          increasedAwaitDrain = false;
          var ret = dest.write(chunk);
          if (false === ret && !increasedAwaitDrain) {
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf3(state.pipes, dest) !== -1) && !cleanedUp) {
              debug("false write response, pause", src._readableState.awaitDrain);
              src._readableState.awaitDrain++;
              increasedAwaitDrain = true;
            }
            src.pause();
          }
        }
        function onerror(er) {
          debug("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (listenerCount2(dest, "error") === 0)
            dest.emit("error", er);
        }
        prependListener2(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (!state.flowing) {
          debug("pipe resume");
          src.resume();
        }
        return dest;
      };
      Readable.prototype.unpipe = function(dest) {
        var state = this._readableState;
        if (state.pipesCount === 0)
          return this;
        if (state.pipesCount === 1) {
          if (dest && dest !== state.pipes)
            return this;
          if (!dest)
            dest = state.pipes;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          if (dest)
            dest.emit("unpipe", this);
          return this;
        }
        if (!dest) {
          var dests = state.pipes;
          var len = state.pipesCount;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          for (var _i = 0; _i < len; _i++) {
            dests[_i].emit("unpipe", this);
          }
          return this;
        }
        var i = indexOf3(state.pipes, dest);
        if (i === -1)
          return this;
        state.pipes.splice(i, 1);
        state.pipesCount -= 1;
        if (state.pipesCount === 1)
          state.pipes = state.pipes[0];
        dest.emit("unpipe", this);
        return this;
      };
      Readable.prototype.on = function(ev, fn) {
        var res = events_default.prototype.on.call(this, ev, fn);
        if (ev === "data") {
          if (this._readableState.flowing !== false)
            this.resume();
        } else if (ev === "readable") {
          var state = this._readableState;
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.emittedReadable = false;
            if (!state.reading) {
              nextTick2(nReadingNextTick, this);
            } else if (state.length) {
              emitReadable(this, state);
            }
          }
        }
        return res;
      };
      Readable.prototype.addListener = Readable.prototype.on;
      Readable.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
          debug("resume");
          state.flowing = true;
          resume(this, state);
        }
        return this;
      };
      Readable.prototype.pause = function() {
        debug("call pause flowing=%j", this._readableState.flowing);
        if (false !== this._readableState.flowing) {
          debug("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        return this;
      };
      Readable.prototype.wrap = function(stream) {
        var state = this._readableState;
        var paused = false;
        var self2 = this;
        stream.on("end", function() {
          debug("wrapped end");
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length)
              self2.push(chunk);
          }
          self2.push(null);
        });
        stream.on("data", function(chunk) {
          debug("wrapped data");
          if (state.decoder)
            chunk = state.decoder.write(chunk);
          if (state.objectMode && (chunk === null || chunk === void 0))
            return;
          else if (!state.objectMode && (!chunk || !chunk.length))
            return;
          var ret = self2.push(chunk);
          if (!ret) {
            paused = true;
            stream.pause();
          }
        });
        for (var i in stream) {
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = function(method) {
              return function() {
                return stream[method].apply(stream, arguments);
              };
            }(i);
          }
        }
        var events = ["error", "close", "destroy", "pause", "resume"];
        forEach(events, function(ev) {
          stream.on(ev, self2.emit.bind(self2, ev));
        });
        self2._read = function(n) {
          debug("wrapped _read", n);
          if (paused) {
            paused = false;
            stream.resume();
          }
        };
        return self2;
      };
      Readable._fromList = fromList;
    }
  });

  // node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js
  function nop() {
  }
  function WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
  }
  function WritableState(options, stream) {
    Object.defineProperty(this, "buffer", {
      get: deprecate(function() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
    });
    options = options || {};
    this.objectMode = !!options.objectMode;
    if (stream instanceof Duplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
    this.highWaterMark = ~~this.highWaterMark;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  function Writable(options) {
    if (!(this instanceof Writable) && !(this instanceof Duplex))
      return new Writable(options);
    this._writableState = new WritableState(options, this);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
    }
    EventEmitter.call(this);
  }
  function writeAfterEnd(stream, cb) {
    var er = new Error("write after end");
    stream.emit("error", er);
    nextTick2(cb, er);
  }
  function validChunk(stream, state, chunk, cb) {
    var valid = true;
    var er = false;
    if (chunk === null) {
      er = new TypeError("May not write null values to stream");
    } else if (!Buffer3.isBuffer(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    if (er) {
      stream.emit("error", er);
      nextTick2(cb, er);
      valid = false;
    }
    return valid;
  }
  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer3.from(chunk, encoding);
    }
    return chunk;
  }
  function writeOrBuffer(stream, state, chunk, encoding, cb) {
    chunk = decodeChunk(state, chunk, encoding);
    if (Buffer3.isBuffer(chunk))
      encoding = "buffer";
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    if (!ret)
      state.needDrain = true;
    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev)
      stream._writev(chunk, state.onwrite);
    else
      stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync)
      nextTick2(cb, er);
    else
      cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit("error", er);
  }
  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }
  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    onwriteStateUpdate(state);
    if (er)
      onwriteError(stream, state, sync, er, cb);
    else {
      var finished = needFinish(state);
      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream, state);
      }
      if (sync) {
        nextTick2(afterWrite, stream, state, finished, cb);
      } else {
        afterWrite(stream, state, finished, cb);
      }
    }
  }
  function afterWrite(stream, state, finished, cb) {
    if (!finished)
      onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit("drain");
    }
  }
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      while (entry) {
        buffer[count] = entry;
        entry = entry.next;
        count += 1;
      }
      doWrite(stream, state, true, state.length, buffer, "", holder.finish);
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;
        doWrite(stream, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        if (state.writing) {
          break;
        }
      }
      if (entry === null)
        state.lastBufferedRequest = null;
    }
    state.bufferedRequestCount = 0;
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }
  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }
  function prefinish(stream, state) {
    if (!state.prefinished) {
      state.prefinished = true;
      stream.emit("prefinish");
    }
  }
  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      if (state.pendingcb === 0) {
        prefinish(stream, state);
        state.finished = true;
        stream.emit("finish");
      } else {
        prefinish(stream, state);
      }
    }
    return need;
  }
  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished)
        nextTick2(cb);
      else
        stream.once("finish", cb);
    }
    state.ended = true;
    stream.writable = false;
  }
  function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function(err) {
      var entry = _this.entry;
      _this.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      if (state.corkedRequestsFree) {
        state.corkedRequestsFree.next = _this;
      } else {
        state.corkedRequestsFree = _this;
      }
    };
  }
  var init_writable = __esm({
    "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js"() {
      init_process();
      init_buffer();
      init_util();
      init_buffer2();
      init_events();
      init_duplex();
      init_process2();
      Writable.WritableState = WritableState;
      inherits_default(Writable, EventEmitter);
      WritableState.prototype.getBuffer = function writableStateGetBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while (current) {
          out.push(current);
          current = current.next;
        }
        return out;
      };
      Writable.prototype.pipe = function() {
        this.emit("error", new Error("Cannot pipe, not readable"));
      };
      Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (Buffer3.isBuffer(chunk))
          encoding = "buffer";
        else if (!encoding)
          encoding = state.defaultEncoding;
        if (typeof cb !== "function")
          cb = nop;
        if (state.ended)
          writeAfterEnd(this, cb);
        else if (validChunk(this, state, chunk, cb)) {
          state.pendingcb++;
          ret = writeOrBuffer(this, state, chunk, encoding, cb);
        }
        return ret;
      };
      Writable.prototype.cork = function() {
        var state = this._writableState;
        state.corked++;
      };
      Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
            clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        if (typeof encoding === "string")
          encoding = encoding.toLowerCase();
        if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
          throw new TypeError("Unknown encoding: " + encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new Error("not implemented"));
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (chunk !== null && chunk !== void 0)
          this.write(chunk, encoding);
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (!state.ending && !state.finished)
          endWritable(this, state, cb);
      };
    }
  });

  // node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js
  function Duplex(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    if (options && options.readable === false)
      this.readable = false;
    if (options && options.writable === false)
      this.writable = false;
    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false)
      this.allowHalfOpen = false;
    this.once("end", onend);
  }
  function onend() {
    if (this.allowHalfOpen || this._writableState.ended)
      return;
    nextTick2(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  var keys, method, v;
  var init_duplex = __esm({
    "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js"() {
      init_process();
      init_buffer();
      init_util();
      init_process2();
      init_readable();
      init_writable();
      inherits_default(Duplex, Readable);
      keys = Object.keys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method])
          Duplex.prototype[method] = Writable.prototype[method];
      }
    }
  });

  // node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js
  function TransformState(stream) {
    this.afterTransform = function(er, data) {
      return afterTransform(stream, er, data);
    };
    this.needTransform = false;
    this.transforming = false;
    this.writecb = null;
    this.writechunk = null;
    this.writeencoding = null;
  }
  function afterTransform(stream, er, data) {
    var ts = stream._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (!cb)
      return stream.emit("error", new Error("no writecb in Transform class"));
    ts.writechunk = null;
    ts.writecb = null;
    if (data !== null && data !== void 0)
      stream.push(data);
    cb(er);
    var rs = stream._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      stream._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform))
      return new Transform(options);
    Duplex.call(this, options);
    this._transformState = new TransformState(this);
    var stream = this;
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options) {
      if (typeof options.transform === "function")
        this._transform = options.transform;
      if (typeof options.flush === "function")
        this._flush = options.flush;
    }
    this.once("prefinish", function() {
      if (typeof this._flush === "function")
        this._flush(function(er) {
          done(stream, er);
        });
      else
        done(stream);
    });
  }
  function done(stream, er) {
    if (er)
      return stream.emit("error", er);
    var ws = stream._writableState;
    var ts = stream._transformState;
    if (ws.length)
      throw new Error("Calling transform done when ws.length != 0");
    if (ts.transforming)
      throw new Error("Calling transform done when still transforming");
    return stream.push(null);
  }
  var init_transform = __esm({
    "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js"() {
      init_process();
      init_buffer();
      init_duplex();
      init_util();
      inherits_default(Transform, Duplex);
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        throw new Error("Not implemented");
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
            this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
    }
  });

  // node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  }
  var init_passthrough = __esm({
    "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js"() {
      init_process();
      init_buffer();
      init_transform();
      init_util();
      inherits_default(PassThrough, Transform);
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }
  });

  // node-modules-polyfills:stream
  var stream_exports = {};
  __export(stream_exports, {
    Duplex: () => Duplex,
    PassThrough: () => PassThrough,
    Readable: () => Readable,
    Stream: () => Stream,
    Transform: () => Transform,
    Writable: () => Writable,
    default: () => stream_default
  });
  function Stream() {
    events_default.call(this);
  }
  var stream_default;
  var init_stream = __esm({
    "node-modules-polyfills:stream"() {
      init_process();
      init_buffer();
      init_events();
      init_util();
      init_duplex();
      init_readable();
      init_writable();
      init_transform();
      init_passthrough();
      inherits_default(Stream, events_default);
      Stream.Readable = Readable;
      Stream.Writable = Writable;
      Stream.Duplex = Duplex;
      Stream.Transform = Transform;
      Stream.PassThrough = PassThrough;
      Stream.Stream = Stream;
      stream_default = Stream;
      Stream.prototype.pipe = function(dest, options) {
        var source = this;
        function ondata(chunk) {
          if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
              source.pause();
            }
          }
        }
        source.on("data", ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        dest.on("drain", ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on("end", onend2);
          source.on("close", onclose);
        }
        var didOnEnd = false;
        function onend2() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          dest.end();
        }
        function onclose() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          if (typeof dest.destroy === "function")
            dest.destroy();
        }
        function onerror(er) {
          cleanup();
          if (events_default.listenerCount(this, "error") === 0) {
            throw er;
          }
        }
        source.on("error", onerror);
        dest.on("error", onerror);
        function cleanup() {
          source.removeListener("data", ondata);
          dest.removeListener("drain", ondrain);
          source.removeListener("end", onend2);
          source.removeListener("close", onclose);
          source.removeListener("error", onerror);
          dest.removeListener("error", onerror);
          source.removeListener("end", cleanup);
          source.removeListener("close", cleanup);
          dest.removeListener("close", cleanup);
        }
        source.on("end", cleanup);
        source.on("close", cleanup);
        dest.on("close", cleanup);
        dest.emit("pipe", source);
        return dest;
      };
    }
  });

  // node-modules-polyfills-commonjs:stream
  var require_stream = __commonJS({
    "node-modules-polyfills-commonjs:stream"(exports, module) {
      init_process();
      init_buffer();
      var polyfill = (init_stream(), __toCommonJS(stream_exports));
      if (polyfill && polyfill.default) {
        module.exports = polyfill.default;
        for (let k in polyfill) {
          module.exports[k] = polyfill[k];
        }
      } else if (polyfill) {
        module.exports = polyfill;
      }
    }
  });

  // node-modules-polyfills-commonjs:util
  var require_util = __commonJS({
    "node-modules-polyfills-commonjs:util"(exports, module) {
      init_process();
      init_buffer();
      var polyfill = (init_util(), __toCommonJS(util_exports));
      if (polyfill && polyfill.default) {
        module.exports = polyfill.default;
        for (let k in polyfill) {
          module.exports[k] = polyfill[k];
        }
      } else if (polyfill) {
        module.exports = polyfill;
      }
    }
  });

  // node_modules/jws/lib/data-stream.js
  var require_data_stream = __commonJS({
    "node_modules/jws/lib/data-stream.js"(exports, module) {
      init_process();
      init_buffer();
      var Buffer4 = require_safe_buffer().Buffer;
      var Stream2 = require_stream();
      var util = require_util();
      function DataStream(data) {
        this.buffer = null;
        this.writable = true;
        this.readable = true;
        if (!data) {
          this.buffer = Buffer4.alloc(0);
          return this;
        }
        if (typeof data.pipe === "function") {
          this.buffer = Buffer4.alloc(0);
          data.pipe(this);
          return this;
        }
        if (data.length || typeof data === "object") {
          this.buffer = data;
          this.writable = false;
          process.nextTick(function() {
            this.emit("end", data);
            this.readable = false;
            this.emit("close");
          }.bind(this));
          return this;
        }
        throw new TypeError("Unexpected data type (" + typeof data + ")");
      }
      util.inherits(DataStream, Stream2);
      DataStream.prototype.write = function write4(data) {
        this.buffer = Buffer4.concat([this.buffer, Buffer4.from(data)]);
        this.emit("data", data);
      };
      DataStream.prototype.end = function end(data) {
        if (data)
          this.write(data);
        this.emit("end", data);
        this.emit("close");
        this.writable = false;
        this.readable = false;
      };
      module.exports = DataStream;
    }
  });

  // node_modules/buffer-equal-constant-time/index.js
  var require_buffer_equal_constant_time = __commonJS({
    "node_modules/buffer-equal-constant-time/index.js"(exports, module) {
      "use strict";
      init_process();
      init_buffer();
      var Buffer4 = require_buffer().Buffer;
      var SlowBuffer2 = require_buffer().SlowBuffer;
      module.exports = bufferEq;
      function bufferEq(a, b) {
        if (!Buffer4.isBuffer(a) || !Buffer4.isBuffer(b)) {
          return false;
        }
        if (a.length !== b.length) {
          return false;
        }
        var c = 0;
        for (var i = 0; i < a.length; i++) {
          c |= a[i] ^ b[i];
        }
        return c === 0;
      }
      bufferEq.install = function() {
        Buffer4.prototype.equal = SlowBuffer2.prototype.equal = function equal(that) {
          return bufferEq(this, that);
        };
      };
      var origBufEqual = Buffer4.prototype.equal;
      var origSlowBufEqual = SlowBuffer2.prototype.equal;
      bufferEq.restore = function() {
        Buffer4.prototype.equal = origBufEqual;
        SlowBuffer2.prototype.equal = origSlowBufEqual;
      };
    }
  });

  // node-modules-polyfills:crypto
  var crypto_exports = {};
  __export(crypto_exports, {
    default: () => crypto_default
  });
  var crypto_default;
  var init_crypto = __esm({
    "node-modules-polyfills:crypto"() {
      init_process();
      init_buffer();
      crypto_default = {};
    }
  });

  // node-modules-polyfills-commonjs:crypto
  var require_crypto = __commonJS({
    "node-modules-polyfills-commonjs:crypto"(exports, module) {
      init_process();
      init_buffer();
      var polyfill = (init_crypto(), __toCommonJS(crypto_exports));
      if (polyfill && polyfill.default) {
        module.exports = polyfill.default;
        for (let k in polyfill) {
          module.exports[k] = polyfill[k];
        }
      } else if (polyfill) {
        module.exports = polyfill;
      }
    }
  });

  // node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
  var require_param_bytes_for_alg = __commonJS({
    "node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports, module) {
      "use strict";
      init_process();
      init_buffer();
      function getParamSize(keySize) {
        var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
        return result;
      }
      var paramBytesForAlg = {
        ES256: getParamSize(256),
        ES384: getParamSize(384),
        ES512: getParamSize(521)
      };
      function getParamBytesForAlg(alg) {
        var paramBytes = paramBytesForAlg[alg];
        if (paramBytes) {
          return paramBytes;
        }
        throw new Error('Unknown algorithm "' + alg + '"');
      }
      module.exports = getParamBytesForAlg;
    }
  });

  // node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
  var require_ecdsa_sig_formatter = __commonJS({
    "node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports, module) {
      "use strict";
      init_process();
      init_buffer();
      var Buffer4 = require_safe_buffer().Buffer;
      var getParamBytesForAlg = require_param_bytes_for_alg();
      var MAX_OCTET = 128;
      var CLASS_UNIVERSAL = 0;
      var PRIMITIVE_BIT = 32;
      var TAG_SEQ = 16;
      var TAG_INT = 2;
      var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
      var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
      function base64Url(base64) {
        return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      function signatureAsBuffer(signature) {
        if (Buffer4.isBuffer(signature)) {
          return signature;
        } else if ("string" === typeof signature) {
          return Buffer4.from(signature, "base64");
        }
        throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
      }
      function derToJose(signature, alg) {
        signature = signatureAsBuffer(signature);
        var paramBytes = getParamBytesForAlg(alg);
        var maxEncodedParamLength = paramBytes + 1;
        var inputLength = signature.length;
        var offset = 0;
        if (signature[offset++] !== ENCODED_TAG_SEQ) {
          throw new Error('Could not find expected "seq"');
        }
        var seqLength = signature[offset++];
        if (seqLength === (MAX_OCTET | 1)) {
          seqLength = signature[offset++];
        }
        if (inputLength - offset < seqLength) {
          throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
        }
        if (signature[offset++] !== ENCODED_TAG_INT) {
          throw new Error('Could not find expected "int" for "r"');
        }
        var rLength = signature[offset++];
        if (inputLength - offset - 2 < rLength) {
          throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
        }
        if (maxEncodedParamLength < rLength) {
          throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
        }
        var rOffset = offset;
        offset += rLength;
        if (signature[offset++] !== ENCODED_TAG_INT) {
          throw new Error('Could not find expected "int" for "s"');
        }
        var sLength = signature[offset++];
        if (inputLength - offset !== sLength) {
          throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
        }
        if (maxEncodedParamLength < sLength) {
          throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
        }
        var sOffset = offset;
        offset += sLength;
        if (offset !== inputLength) {
          throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
        }
        var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
        var dst = Buffer4.allocUnsafe(rPadding + rLength + sPadding + sLength);
        for (offset = 0; offset < rPadding; ++offset) {
          dst[offset] = 0;
        }
        signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
        offset = paramBytes;
        for (var o2 = offset; offset < o2 + sPadding; ++offset) {
          dst[offset] = 0;
        }
        signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
        dst = dst.toString("base64");
        dst = base64Url(dst);
        return dst;
      }
      function countPadding(buf, start, stop) {
        var padding = 0;
        while (start + padding < stop && buf[start + padding] === 0) {
          ++padding;
        }
        var needsSign = buf[start + padding] >= MAX_OCTET;
        if (needsSign) {
          --padding;
        }
        return padding;
      }
      function joseToDer(signature, alg) {
        signature = signatureAsBuffer(signature);
        var paramBytes = getParamBytesForAlg(alg);
        var signatureBytes = signature.length;
        if (signatureBytes !== paramBytes * 2) {
          throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
        }
        var rPadding = countPadding(signature, 0, paramBytes);
        var sPadding = countPadding(signature, paramBytes, signature.length);
        var rLength = paramBytes - rPadding;
        var sLength = paramBytes - sPadding;
        var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
        var shortLength = rsBytes < MAX_OCTET;
        var dst = Buffer4.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
        var offset = 0;
        dst[offset++] = ENCODED_TAG_SEQ;
        if (shortLength) {
          dst[offset++] = rsBytes;
        } else {
          dst[offset++] = MAX_OCTET | 1;
          dst[offset++] = rsBytes & 255;
        }
        dst[offset++] = ENCODED_TAG_INT;
        dst[offset++] = rLength;
        if (rPadding < 0) {
          dst[offset++] = 0;
          offset += signature.copy(dst, offset, 0, paramBytes);
        } else {
          offset += signature.copy(dst, offset, rPadding, paramBytes);
        }
        dst[offset++] = ENCODED_TAG_INT;
        dst[offset++] = sLength;
        if (sPadding < 0) {
          dst[offset++] = 0;
          signature.copy(dst, offset, paramBytes);
        } else {
          signature.copy(dst, offset, paramBytes + sPadding);
        }
        return dst;
      }
      module.exports = {
        derToJose,
        joseToDer
      };
    }
  });

  // node_modules/jwa/index.js
  var require_jwa = __commonJS({
    "node_modules/jwa/index.js"(exports, module) {
      init_process();
      init_buffer();
      var bufferEqual = require_buffer_equal_constant_time();
      var Buffer4 = require_safe_buffer().Buffer;
      var crypto = require_crypto();
      var formatEcdsa = require_ecdsa_sig_formatter();
      var util = require_util();
      var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
      var MSG_INVALID_SECRET = "secret must be a string or buffer";
      var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
      var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
      var supportsKeyObjects = typeof crypto.createPublicKey === "function";
      if (supportsKeyObjects) {
        MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
        MSG_INVALID_SECRET += "or a KeyObject";
      }
      function checkIsPublicKey(key) {
        if (Buffer4.isBuffer(key)) {
          return;
        }
        if (typeof key === "string") {
          return;
        }
        if (!supportsKeyObjects) {
          throw typeError(MSG_INVALID_VERIFIER_KEY);
        }
        if (typeof key !== "object") {
          throw typeError(MSG_INVALID_VERIFIER_KEY);
        }
        if (typeof key.type !== "string") {
          throw typeError(MSG_INVALID_VERIFIER_KEY);
        }
        if (typeof key.asymmetricKeyType !== "string") {
          throw typeError(MSG_INVALID_VERIFIER_KEY);
        }
        if (typeof key.export !== "function") {
          throw typeError(MSG_INVALID_VERIFIER_KEY);
        }
      }
      function checkIsPrivateKey(key) {
        if (Buffer4.isBuffer(key)) {
          return;
        }
        if (typeof key === "string") {
          return;
        }
        if (typeof key === "object") {
          return;
        }
        throw typeError(MSG_INVALID_SIGNER_KEY);
      }
      function checkIsSecretKey(key) {
        if (Buffer4.isBuffer(key)) {
          return;
        }
        if (typeof key === "string") {
          return key;
        }
        if (!supportsKeyObjects) {
          throw typeError(MSG_INVALID_SECRET);
        }
        if (typeof key !== "object") {
          throw typeError(MSG_INVALID_SECRET);
        }
        if (key.type !== "secret") {
          throw typeError(MSG_INVALID_SECRET);
        }
        if (typeof key.export !== "function") {
          throw typeError(MSG_INVALID_SECRET);
        }
      }
      function fromBase64(base64) {
        return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      function toBase64(base64url) {
        base64url = base64url.toString();
        var padding = 4 - base64url.length % 4;
        if (padding !== 4) {
          for (var i = 0; i < padding; ++i) {
            base64url += "=";
          }
        }
        return base64url.replace(/\-/g, "+").replace(/_/g, "/");
      }
      function typeError(template) {
        var args = [].slice.call(arguments, 1);
        var errMsg = util.format.bind(util, template).apply(null, args);
        return new TypeError(errMsg);
      }
      function bufferOrString(obj) {
        return Buffer4.isBuffer(obj) || typeof obj === "string";
      }
      function normalizeInput(thing) {
        if (!bufferOrString(thing))
          thing = JSON.stringify(thing);
        return thing;
      }
      function createHmacSigner(bits) {
        return function sign(thing, secret) {
          checkIsSecretKey(secret);
          thing = normalizeInput(thing);
          var hmac = crypto.createHmac("sha" + bits, secret);
          var sig = (hmac.update(thing), hmac.digest("base64"));
          return fromBase64(sig);
        };
      }
      function createHmacVerifier(bits) {
        return function verify(thing, signature, secret) {
          var computedSig = createHmacSigner(bits)(thing, secret);
          return bufferEqual(Buffer4.from(signature), Buffer4.from(computedSig));
        };
      }
      function createKeySigner(bits) {
        return function sign(thing, privateKey) {
          checkIsPrivateKey(privateKey);
          thing = normalizeInput(thing);
          var signer = crypto.createSign("RSA-SHA" + bits);
          var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
          return fromBase64(sig);
        };
      }
      function createKeyVerifier(bits) {
        return function verify(thing, signature, publicKey) {
          checkIsPublicKey(publicKey);
          thing = normalizeInput(thing);
          signature = toBase64(signature);
          var verifier = crypto.createVerify("RSA-SHA" + bits);
          verifier.update(thing);
          return verifier.verify(publicKey, signature, "base64");
        };
      }
      function createPSSKeySigner(bits) {
        return function sign(thing, privateKey) {
          checkIsPrivateKey(privateKey);
          thing = normalizeInput(thing);
          var signer = crypto.createSign("RSA-SHA" + bits);
          var sig = (signer.update(thing), signer.sign({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
          }, "base64"));
          return fromBase64(sig);
        };
      }
      function createPSSKeyVerifier(bits) {
        return function verify(thing, signature, publicKey) {
          checkIsPublicKey(publicKey);
          thing = normalizeInput(thing);
          signature = toBase64(signature);
          var verifier = crypto.createVerify("RSA-SHA" + bits);
          verifier.update(thing);
          return verifier.verify({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
          }, signature, "base64");
        };
      }
      function createECDSASigner(bits) {
        var inner = createKeySigner(bits);
        return function sign() {
          var signature = inner.apply(null, arguments);
          signature = formatEcdsa.derToJose(signature, "ES" + bits);
          return signature;
        };
      }
      function createECDSAVerifer(bits) {
        var inner = createKeyVerifier(bits);
        return function verify(thing, signature, publicKey) {
          signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
          var result = inner(thing, signature, publicKey);
          return result;
        };
      }
      function createNoneSigner() {
        return function sign() {
          return "";
        };
      }
      function createNoneVerifier() {
        return function verify(thing, signature) {
          return signature === "";
        };
      }
      module.exports = function jwa(algorithm) {
        var signerFactories = {
          hs: createHmacSigner,
          rs: createKeySigner,
          ps: createPSSKeySigner,
          es: createECDSASigner,
          none: createNoneSigner
        };
        var verifierFactories = {
          hs: createHmacVerifier,
          rs: createKeyVerifier,
          ps: createPSSKeyVerifier,
          es: createECDSAVerifer,
          none: createNoneVerifier
        };
        var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
        if (!match)
          throw typeError(MSG_INVALID_ALGORITHM, algorithm);
        var algo = (match[1] || match[3]).toLowerCase();
        var bits = match[2];
        return {
          sign: signerFactories[algo](bits),
          verify: verifierFactories[algo](bits)
        };
      };
    }
  });

  // node_modules/jws/lib/tostring.js
  var require_tostring = __commonJS({
    "node_modules/jws/lib/tostring.js"(exports, module) {
      init_process();
      init_buffer();
      var Buffer4 = require_buffer().Buffer;
      module.exports = function toString4(obj) {
        if (typeof obj === "string")
          return obj;
        if (typeof obj === "number" || Buffer4.isBuffer(obj))
          return obj.toString();
        return JSON.stringify(obj);
      };
    }
  });

  // node_modules/jws/lib/sign-stream.js
  var require_sign_stream = __commonJS({
    "node_modules/jws/lib/sign-stream.js"(exports, module) {
      init_process();
      init_buffer();
      var Buffer4 = require_safe_buffer().Buffer;
      var DataStream = require_data_stream();
      var jwa = require_jwa();
      var Stream2 = require_stream();
      var toString4 = require_tostring();
      var util = require_util();
      function base64url(string, encoding) {
        return Buffer4.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      function jwsSecuredInput(header, payload, encoding) {
        encoding = encoding || "utf8";
        var encodedHeader = base64url(toString4(header), "binary");
        var encodedPayload = base64url(toString4(payload), encoding);
        return util.format("%s.%s", encodedHeader, encodedPayload);
      }
      function jwsSign(opts) {
        var header = opts.header;
        var payload = opts.payload;
        var secretOrKey = opts.secret || opts.privateKey;
        var encoding = opts.encoding;
        var algo = jwa(header.alg);
        var securedInput = jwsSecuredInput(header, payload, encoding);
        var signature = algo.sign(securedInput, secretOrKey);
        return util.format("%s.%s", securedInput, signature);
      }
      function SignStream(opts) {
        var secret = opts.secret || opts.privateKey || opts.key;
        var secretStream = new DataStream(secret);
        this.readable = true;
        this.header = opts.header;
        this.encoding = opts.encoding;
        this.secret = this.privateKey = this.key = secretStream;
        this.payload = new DataStream(opts.payload);
        this.secret.once("close", function() {
          if (!this.payload.writable && this.readable)
            this.sign();
        }.bind(this));
        this.payload.once("close", function() {
          if (!this.secret.writable && this.readable)
            this.sign();
        }.bind(this));
      }
      util.inherits(SignStream, Stream2);
      SignStream.prototype.sign = function sign() {
        try {
          var signature = jwsSign({
            header: this.header,
            payload: this.payload.buffer,
            secret: this.secret.buffer,
            encoding: this.encoding
          });
          this.emit("done", signature);
          this.emit("data", signature);
          this.emit("end");
          this.readable = false;
          return signature;
        } catch (e) {
          this.readable = false;
          this.emit("error", e);
          this.emit("close");
        }
      };
      SignStream.sign = jwsSign;
      module.exports = SignStream;
    }
  });

  // node_modules/jws/lib/verify-stream.js
  var require_verify_stream = __commonJS({
    "node_modules/jws/lib/verify-stream.js"(exports, module) {
      init_process();
      init_buffer();
      var Buffer4 = require_safe_buffer().Buffer;
      var DataStream = require_data_stream();
      var jwa = require_jwa();
      var Stream2 = require_stream();
      var toString4 = require_tostring();
      var util = require_util();
      var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
      function isObject2(thing) {
        return Object.prototype.toString.call(thing) === "[object Object]";
      }
      function safeJsonParse(thing) {
        if (isObject2(thing))
          return thing;
        try {
          return JSON.parse(thing);
        } catch (e) {
          return void 0;
        }
      }
      function headerFromJWS(jwsSig) {
        var encodedHeader = jwsSig.split(".", 1)[0];
        return safeJsonParse(Buffer4.from(encodedHeader, "base64").toString("binary"));
      }
      function securedInputFromJWS(jwsSig) {
        return jwsSig.split(".", 2).join(".");
      }
      function signatureFromJWS(jwsSig) {
        return jwsSig.split(".")[2];
      }
      function payloadFromJWS(jwsSig, encoding) {
        encoding = encoding || "utf8";
        var payload = jwsSig.split(".")[1];
        return Buffer4.from(payload, "base64").toString(encoding);
      }
      function isValidJws(string) {
        return JWS_REGEX.test(string) && !!headerFromJWS(string);
      }
      function jwsVerify(jwsSig, algorithm, secretOrKey) {
        if (!algorithm) {
          var err = new Error("Missing algorithm parameter for jws.verify");
          err.code = "MISSING_ALGORITHM";
          throw err;
        }
        jwsSig = toString4(jwsSig);
        var signature = signatureFromJWS(jwsSig);
        var securedInput = securedInputFromJWS(jwsSig);
        var algo = jwa(algorithm);
        return algo.verify(securedInput, signature, secretOrKey);
      }
      function jwsDecode(jwsSig, opts) {
        opts = opts || {};
        jwsSig = toString4(jwsSig);
        if (!isValidJws(jwsSig))
          return null;
        var header = headerFromJWS(jwsSig);
        if (!header)
          return null;
        var payload = payloadFromJWS(jwsSig);
        if (header.typ === "JWT" || opts.json)
          payload = JSON.parse(payload, opts.encoding);
        return {
          header,
          payload,
          signature: signatureFromJWS(jwsSig)
        };
      }
      function VerifyStream(opts) {
        opts = opts || {};
        var secretOrKey = opts.secret || opts.publicKey || opts.key;
        var secretStream = new DataStream(secretOrKey);
        this.readable = true;
        this.algorithm = opts.algorithm;
        this.encoding = opts.encoding;
        this.secret = this.publicKey = this.key = secretStream;
        this.signature = new DataStream(opts.signature);
        this.secret.once("close", function() {
          if (!this.signature.writable && this.readable)
            this.verify();
        }.bind(this));
        this.signature.once("close", function() {
          if (!this.secret.writable && this.readable)
            this.verify();
        }.bind(this));
      }
      util.inherits(VerifyStream, Stream2);
      VerifyStream.prototype.verify = function verify() {
        try {
          var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
          var obj = jwsDecode(this.signature.buffer, this.encoding);
          this.emit("done", valid, obj);
          this.emit("data", valid);
          this.emit("end");
          this.readable = false;
          return valid;
        } catch (e) {
          this.readable = false;
          this.emit("error", e);
          this.emit("close");
        }
      };
      VerifyStream.decode = jwsDecode;
      VerifyStream.isValid = isValidJws;
      VerifyStream.verify = jwsVerify;
      module.exports = VerifyStream;
    }
  });

  // node_modules/jws/index.js
  var require_jws = __commonJS({
    "node_modules/jws/index.js"(exports) {
      init_process();
      init_buffer();
      var SignStream = require_sign_stream();
      var VerifyStream = require_verify_stream();
      var ALGORITHMS = [
        "HS256",
        "HS384",
        "HS512",
        "RS256",
        "RS384",
        "RS512",
        "PS256",
        "PS384",
        "PS512",
        "ES256",
        "ES384",
        "ES512"
      ];
      exports.ALGORITHMS = ALGORITHMS;
      exports.sign = SignStream.sign;
      exports.verify = VerifyStream.verify;
      exports.decode = VerifyStream.decode;
      exports.isValid = VerifyStream.isValid;
      exports.createSign = function createSign(opts) {
        return new SignStream(opts);
      };
      exports.createVerify = function createVerify(opts) {
        return new VerifyStream(opts);
      };
    }
  });

  // node_modules/jsonwebtoken/decode.js
  var require_decode = __commonJS({
    "node_modules/jsonwebtoken/decode.js"(exports, module) {
      init_process();
      init_buffer();
      var jws = require_jws();
      module.exports = function(jwt2, options) {
        options = options || {};
        var decoded = jws.decode(jwt2, options);
        if (!decoded) {
          return null;
        }
        var payload = decoded.payload;
        if (typeof payload === "string") {
          try {
            var obj = JSON.parse(payload);
            if (obj !== null && typeof obj === "object") {
              payload = obj;
            }
          } catch (e) {
          }
        }
        if (options.complete === true) {
          return {
            header: decoded.header,
            payload,
            signature: decoded.signature
          };
        }
        return payload;
      };
    }
  });

  // node_modules/jsonwebtoken/lib/JsonWebTokenError.js
  var require_JsonWebTokenError = __commonJS({
    "node_modules/jsonwebtoken/lib/JsonWebTokenError.js"(exports, module) {
      init_process();
      init_buffer();
      var JsonWebTokenError = function(message, error) {
        Error.call(this, message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.name = "JsonWebTokenError";
        this.message = message;
        if (error)
          this.inner = error;
      };
      JsonWebTokenError.prototype = Object.create(Error.prototype);
      JsonWebTokenError.prototype.constructor = JsonWebTokenError;
      module.exports = JsonWebTokenError;
    }
  });

  // node_modules/jsonwebtoken/lib/NotBeforeError.js
  var require_NotBeforeError = __commonJS({
    "node_modules/jsonwebtoken/lib/NotBeforeError.js"(exports, module) {
      init_process();
      init_buffer();
      var JsonWebTokenError = require_JsonWebTokenError();
      var NotBeforeError = function(message, date) {
        JsonWebTokenError.call(this, message);
        this.name = "NotBeforeError";
        this.date = date;
      };
      NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
      NotBeforeError.prototype.constructor = NotBeforeError;
      module.exports = NotBeforeError;
    }
  });

  // node_modules/jsonwebtoken/lib/TokenExpiredError.js
  var require_TokenExpiredError = __commonJS({
    "node_modules/jsonwebtoken/lib/TokenExpiredError.js"(exports, module) {
      init_process();
      init_buffer();
      var JsonWebTokenError = require_JsonWebTokenError();
      var TokenExpiredError = function(message, expiredAt) {
        JsonWebTokenError.call(this, message);
        this.name = "TokenExpiredError";
        this.expiredAt = expiredAt;
      };
      TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
      TokenExpiredError.prototype.constructor = TokenExpiredError;
      module.exports = TokenExpiredError;
    }
  });

  // node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/ms/index.js"(exports, module) {
      init_process();
      init_buffer();
      var s = 1e3;
      var m = s * 60;
      var h2 = m * 60;
      var d = h2 * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h2;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h2) {
          return Math.round(ms / h2) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h2) {
          return plural(ms, msAbs, h2, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/jsonwebtoken/lib/timespan.js
  var require_timespan = __commonJS({
    "node_modules/jsonwebtoken/lib/timespan.js"(exports, module) {
      init_process();
      init_buffer();
      var ms = require_ms();
      module.exports = function(time, iat) {
        var timestamp2 = iat || Math.floor(Date.now() / 1e3);
        if (typeof time === "string") {
          var milliseconds = ms(time);
          if (typeof milliseconds === "undefined") {
            return;
          }
          return Math.floor(timestamp2 + milliseconds / 1e3);
        } else if (typeof time === "number") {
          return timestamp2 + time;
        } else {
          return;
        }
      };
    }
  });

  // node_modules/semver/internal/constants.js
  var require_constants = __commonJS({
    "node_modules/semver/internal/constants.js"(exports, module) {
      init_process();
      init_buffer();
      var SEMVER_SPEC_VERSION = "2.0.0";
      var MAX_LENGTH = 256;
      var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
      9007199254740991;
      var MAX_SAFE_COMPONENT_LENGTH = 16;
      var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
      var RELEASE_TYPES = [
        "major",
        "premajor",
        "minor",
        "preminor",
        "patch",
        "prepatch",
        "prerelease"
      ];
      module.exports = {
        MAX_LENGTH,
        MAX_SAFE_COMPONENT_LENGTH,
        MAX_SAFE_BUILD_LENGTH,
        MAX_SAFE_INTEGER,
        RELEASE_TYPES,
        SEMVER_SPEC_VERSION,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
      };
    }
  });

  // node_modules/semver/internal/debug.js
  var require_debug = __commonJS({
    "node_modules/semver/internal/debug.js"(exports, module) {
      init_process();
      init_buffer();
      var debug2 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
      };
      module.exports = debug2;
    }
  });

  // node_modules/semver/internal/re.js
  var require_re = __commonJS({
    "node_modules/semver/internal/re.js"(exports, module) {
      init_process();
      init_buffer();
      var {
        MAX_SAFE_COMPONENT_LENGTH,
        MAX_SAFE_BUILD_LENGTH,
        MAX_LENGTH
      } = require_constants();
      var debug2 = require_debug();
      exports = module.exports = {};
      var re = exports.re = [];
      var safeRe = exports.safeRe = [];
      var src = exports.src = [];
      var t2 = exports.t = {};
      var R = 0;
      var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
      var safeRegexReplacements = [
        ["\\s", 1],
        ["\\d", MAX_LENGTH],
        [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
      ];
      var makeSafeRegex = (value) => {
        for (const [token, max] of safeRegexReplacements) {
          value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
        }
        return value;
      };
      var createToken = (name, value, isGlobal) => {
        const safe = makeSafeRegex(value);
        const index = R++;
        debug2(name, index, value);
        t2[name] = index;
        src[index] = value;
        re[index] = new RegExp(value, isGlobal ? "g" : void 0);
        safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
      };
      createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
      createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
      createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
      createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
      createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
      createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
      createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
      createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
      createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
      createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
      createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
      createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
      createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
      createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
      createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
      createToken("GTLT", "((?:<|>)?=?)");
      createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
      createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
      createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
      createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
      createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
      createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
      createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
      createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
      createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
      createToken("COERCERTL", src[t2.COERCE], true);
      createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
      createToken("LONETILDE", "(?:~>?)");
      createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
      exports.tildeTrimReplace = "$1~";
      createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
      createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
      createToken("LONECARET", "(?:\\^)");
      createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
      exports.caretTrimReplace = "$1^";
      createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
      createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
      createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
      createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
      createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
      exports.comparatorTrimReplace = "$1$2$3";
      createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
      createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
      createToken("STAR", "(<|>)?=?\\s*\\*");
      createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
      createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    }
  });

  // node_modules/semver/internal/parse-options.js
  var require_parse_options = __commonJS({
    "node_modules/semver/internal/parse-options.js"(exports, module) {
      init_process();
      init_buffer();
      var looseOption = Object.freeze({ loose: true });
      var emptyOpts = Object.freeze({});
      var parseOptions = (options) => {
        if (!options) {
          return emptyOpts;
        }
        if (typeof options !== "object") {
          return looseOption;
        }
        return options;
      };
      module.exports = parseOptions;
    }
  });

  // node_modules/semver/internal/identifiers.js
  var require_identifiers = __commonJS({
    "node_modules/semver/internal/identifiers.js"(exports, module) {
      init_process();
      init_buffer();
      var numeric = /^[0-9]+$/;
      var compareIdentifiers = (a, b) => {
        const anum = numeric.test(a);
        const bnum = numeric.test(b);
        if (anum && bnum) {
          a = +a;
          b = +b;
        }
        return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
      };
      var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
      module.exports = {
        compareIdentifiers,
        rcompareIdentifiers
      };
    }
  });

  // node_modules/semver/classes/semver.js
  var require_semver = __commonJS({
    "node_modules/semver/classes/semver.js"(exports, module) {
      init_process();
      init_buffer();
      var debug2 = require_debug();
      var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
      var { safeRe: re, t: t2 } = require_re();
      var parseOptions = require_parse_options();
      var { compareIdentifiers } = require_identifiers();
      var SemVer = class {
        constructor(version3, options) {
          options = parseOptions(options);
          if (version3 instanceof SemVer) {
            if (version3.loose === !!options.loose && version3.includePrerelease === !!options.includePrerelease) {
              return version3;
            } else {
              version3 = version3.version;
            }
          } else if (typeof version3 !== "string") {
            throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version3}".`);
          }
          if (version3.length > MAX_LENGTH) {
            throw new TypeError(
              `version is longer than ${MAX_LENGTH} characters`
            );
          }
          debug2("SemVer", version3, options);
          this.options = options;
          this.loose = !!options.loose;
          this.includePrerelease = !!options.includePrerelease;
          const m = version3.trim().match(options.loose ? re[t2.LOOSE] : re[t2.FULL]);
          if (!m) {
            throw new TypeError(`Invalid Version: ${version3}`);
          }
          this.raw = version3;
          this.major = +m[1];
          this.minor = +m[2];
          this.patch = +m[3];
          if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError("Invalid major version");
          }
          if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
            throw new TypeError("Invalid minor version");
          }
          if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
            throw new TypeError("Invalid patch version");
          }
          if (!m[4]) {
            this.prerelease = [];
          } else {
            this.prerelease = m[4].split(".").map((id) => {
              if (/^[0-9]+$/.test(id)) {
                const num = +id;
                if (num >= 0 && num < MAX_SAFE_INTEGER) {
                  return num;
                }
              }
              return id;
            });
          }
          this.build = m[5] ? m[5].split(".") : [];
          this.format();
        }
        format() {
          this.version = `${this.major}.${this.minor}.${this.patch}`;
          if (this.prerelease.length) {
            this.version += `-${this.prerelease.join(".")}`;
          }
          return this.version;
        }
        toString() {
          return this.version;
        }
        compare(other) {
          debug2("SemVer.compare", this.version, this.options, other);
          if (!(other instanceof SemVer)) {
            if (typeof other === "string" && other === this.version) {
              return 0;
            }
            other = new SemVer(other, this.options);
          }
          if (other.version === this.version) {
            return 0;
          }
          return this.compareMain(other) || this.comparePre(other);
        }
        compareMain(other) {
          if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
          }
          return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
        }
        comparePre(other) {
          if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
          }
          if (this.prerelease.length && !other.prerelease.length) {
            return -1;
          } else if (!this.prerelease.length && other.prerelease.length) {
            return 1;
          } else if (!this.prerelease.length && !other.prerelease.length) {
            return 0;
          }
          let i = 0;
          do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            debug2("prerelease compare", i, a, b);
            if (a === void 0 && b === void 0) {
              return 0;
            } else if (b === void 0) {
              return 1;
            } else if (a === void 0) {
              return -1;
            } else if (a === b) {
              continue;
            } else {
              return compareIdentifiers(a, b);
            }
          } while (++i);
        }
        compareBuild(other) {
          if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
          }
          let i = 0;
          do {
            const a = this.build[i];
            const b = other.build[i];
            debug2("build compare", i, a, b);
            if (a === void 0 && b === void 0) {
              return 0;
            } else if (b === void 0) {
              return 1;
            } else if (a === void 0) {
              return -1;
            } else if (a === b) {
              continue;
            } else {
              return compareIdentifiers(a, b);
            }
          } while (++i);
        }
        // preminor will bump the version up to the next minor release, and immediately
        // down to pre-release. premajor and prepatch work the same way.
        inc(release3, identifier, identifierBase) {
          switch (release3) {
            case "premajor":
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor = 0;
              this.major++;
              this.inc("pre", identifier, identifierBase);
              break;
            case "preminor":
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor++;
              this.inc("pre", identifier, identifierBase);
              break;
            case "prepatch":
              this.prerelease.length = 0;
              this.inc("patch", identifier, identifierBase);
              this.inc("pre", identifier, identifierBase);
              break;
            case "prerelease":
              if (this.prerelease.length === 0) {
                this.inc("patch", identifier, identifierBase);
              }
              this.inc("pre", identifier, identifierBase);
              break;
            case "major":
              if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                this.major++;
              }
              this.minor = 0;
              this.patch = 0;
              this.prerelease = [];
              break;
            case "minor":
              if (this.patch !== 0 || this.prerelease.length === 0) {
                this.minor++;
              }
              this.patch = 0;
              this.prerelease = [];
              break;
            case "patch":
              if (this.prerelease.length === 0) {
                this.patch++;
              }
              this.prerelease = [];
              break;
            case "pre": {
              const base = Number(identifierBase) ? 1 : 0;
              if (!identifier && identifierBase === false) {
                throw new Error("invalid increment argument: identifier is empty");
              }
              if (this.prerelease.length === 0) {
                this.prerelease = [base];
              } else {
                let i = this.prerelease.length;
                while (--i >= 0) {
                  if (typeof this.prerelease[i] === "number") {
                    this.prerelease[i]++;
                    i = -2;
                  }
                }
                if (i === -1) {
                  if (identifier === this.prerelease.join(".") && identifierBase === false) {
                    throw new Error("invalid increment argument: identifier already exists");
                  }
                  this.prerelease.push(base);
                }
              }
              if (identifier) {
                let prerelease = [identifier, base];
                if (identifierBase === false) {
                  prerelease = [identifier];
                }
                if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                  if (isNaN(this.prerelease[1])) {
                    this.prerelease = prerelease;
                  }
                } else {
                  this.prerelease = prerelease;
                }
              }
              break;
            }
            default:
              throw new Error(`invalid increment argument: ${release3}`);
          }
          this.raw = this.format();
          if (this.build.length) {
            this.raw += `+${this.build.join(".")}`;
          }
          return this;
        }
      };
      module.exports = SemVer;
    }
  });

  // node_modules/semver/functions/parse.js
  var require_parse = __commonJS({
    "node_modules/semver/functions/parse.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var parse = (version3, options, throwErrors = false) => {
        if (version3 instanceof SemVer) {
          return version3;
        }
        try {
          return new SemVer(version3, options);
        } catch (er) {
          if (!throwErrors) {
            return null;
          }
          throw er;
        }
      };
      module.exports = parse;
    }
  });

  // node_modules/semver/functions/valid.js
  var require_valid = __commonJS({
    "node_modules/semver/functions/valid.js"(exports, module) {
      init_process();
      init_buffer();
      var parse = require_parse();
      var valid = (version3, options) => {
        const v = parse(version3, options);
        return v ? v.version : null;
      };
      module.exports = valid;
    }
  });

  // node_modules/semver/functions/clean.js
  var require_clean = __commonJS({
    "node_modules/semver/functions/clean.js"(exports, module) {
      init_process();
      init_buffer();
      var parse = require_parse();
      var clean = (version3, options) => {
        const s = parse(version3.trim().replace(/^[=v]+/, ""), options);
        return s ? s.version : null;
      };
      module.exports = clean;
    }
  });

  // node_modules/semver/functions/inc.js
  var require_inc = __commonJS({
    "node_modules/semver/functions/inc.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var inc = (version3, release3, options, identifier, identifierBase) => {
        if (typeof options === "string") {
          identifierBase = identifier;
          identifier = options;
          options = void 0;
        }
        try {
          return new SemVer(
            version3 instanceof SemVer ? version3.version : version3,
            options
          ).inc(release3, identifier, identifierBase).version;
        } catch (er) {
          return null;
        }
      };
      module.exports = inc;
    }
  });

  // node_modules/semver/functions/diff.js
  var require_diff = __commonJS({
    "node_modules/semver/functions/diff.js"(exports, module) {
      init_process();
      init_buffer();
      var parse = require_parse();
      var diff = (version1, version22) => {
        const v1 = parse(version1, null, true);
        const v2 = parse(version22, null, true);
        const comparison = v1.compare(v2);
        if (comparison === 0) {
          return null;
        }
        const v1Higher = comparison > 0;
        const highVersion = v1Higher ? v1 : v2;
        const lowVersion = v1Higher ? v2 : v1;
        const highHasPre = !!highVersion.prerelease.length;
        const lowHasPre = !!lowVersion.prerelease.length;
        if (lowHasPre && !highHasPre) {
          if (!lowVersion.patch && !lowVersion.minor) {
            return "major";
          }
          if (highVersion.patch) {
            return "patch";
          }
          if (highVersion.minor) {
            return "minor";
          }
          return "major";
        }
        const prefix = highHasPre ? "pre" : "";
        if (v1.major !== v2.major) {
          return prefix + "major";
        }
        if (v1.minor !== v2.minor) {
          return prefix + "minor";
        }
        if (v1.patch !== v2.patch) {
          return prefix + "patch";
        }
        return "prerelease";
      };
      module.exports = diff;
    }
  });

  // node_modules/semver/functions/major.js
  var require_major = __commonJS({
    "node_modules/semver/functions/major.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var major = (a, loose) => new SemVer(a, loose).major;
      module.exports = major;
    }
  });

  // node_modules/semver/functions/minor.js
  var require_minor = __commonJS({
    "node_modules/semver/functions/minor.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var minor = (a, loose) => new SemVer(a, loose).minor;
      module.exports = minor;
    }
  });

  // node_modules/semver/functions/patch.js
  var require_patch = __commonJS({
    "node_modules/semver/functions/patch.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var patch = (a, loose) => new SemVer(a, loose).patch;
      module.exports = patch;
    }
  });

  // node_modules/semver/functions/prerelease.js
  var require_prerelease = __commonJS({
    "node_modules/semver/functions/prerelease.js"(exports, module) {
      init_process();
      init_buffer();
      var parse = require_parse();
      var prerelease = (version3, options) => {
        const parsed = parse(version3, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
      };
      module.exports = prerelease;
    }
  });

  // node_modules/semver/functions/compare.js
  var require_compare = __commonJS({
    "node_modules/semver/functions/compare.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var compare5 = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
      module.exports = compare5;
    }
  });

  // node_modules/semver/functions/rcompare.js
  var require_rcompare = __commonJS({
    "node_modules/semver/functions/rcompare.js"(exports, module) {
      init_process();
      init_buffer();
      var compare5 = require_compare();
      var rcompare = (a, b, loose) => compare5(b, a, loose);
      module.exports = rcompare;
    }
  });

  // node_modules/semver/functions/compare-loose.js
  var require_compare_loose = __commonJS({
    "node_modules/semver/functions/compare-loose.js"(exports, module) {
      init_process();
      init_buffer();
      var compare5 = require_compare();
      var compareLoose = (a, b) => compare5(a, b, true);
      module.exports = compareLoose;
    }
  });

  // node_modules/semver/functions/compare-build.js
  var require_compare_build = __commonJS({
    "node_modules/semver/functions/compare-build.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var compareBuild = (a, b, loose) => {
        const versionA = new SemVer(a, loose);
        const versionB = new SemVer(b, loose);
        return versionA.compare(versionB) || versionA.compareBuild(versionB);
      };
      module.exports = compareBuild;
    }
  });

  // node_modules/semver/functions/sort.js
  var require_sort = __commonJS({
    "node_modules/semver/functions/sort.js"(exports, module) {
      init_process();
      init_buffer();
      var compareBuild = require_compare_build();
      var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
      module.exports = sort;
    }
  });

  // node_modules/semver/functions/rsort.js
  var require_rsort = __commonJS({
    "node_modules/semver/functions/rsort.js"(exports, module) {
      init_process();
      init_buffer();
      var compareBuild = require_compare_build();
      var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
      module.exports = rsort;
    }
  });

  // node_modules/semver/functions/gt.js
  var require_gt = __commonJS({
    "node_modules/semver/functions/gt.js"(exports, module) {
      init_process();
      init_buffer();
      var compare5 = require_compare();
      var gt = (a, b, loose) => compare5(a, b, loose) > 0;
      module.exports = gt;
    }
  });

  // node_modules/semver/functions/lt.js
  var require_lt = __commonJS({
    "node_modules/semver/functions/lt.js"(exports, module) {
      init_process();
      init_buffer();
      var compare5 = require_compare();
      var lt = (a, b, loose) => compare5(a, b, loose) < 0;
      module.exports = lt;
    }
  });

  // node_modules/semver/functions/eq.js
  var require_eq = __commonJS({
    "node_modules/semver/functions/eq.js"(exports, module) {
      init_process();
      init_buffer();
      var compare5 = require_compare();
      var eq = (a, b, loose) => compare5(a, b, loose) === 0;
      module.exports = eq;
    }
  });

  // node_modules/semver/functions/neq.js
  var require_neq = __commonJS({
    "node_modules/semver/functions/neq.js"(exports, module) {
      init_process();
      init_buffer();
      var compare5 = require_compare();
      var neq = (a, b, loose) => compare5(a, b, loose) !== 0;
      module.exports = neq;
    }
  });

  // node_modules/semver/functions/gte.js
  var require_gte = __commonJS({
    "node_modules/semver/functions/gte.js"(exports, module) {
      init_process();
      init_buffer();
      var compare5 = require_compare();
      var gte = (a, b, loose) => compare5(a, b, loose) >= 0;
      module.exports = gte;
    }
  });

  // node_modules/semver/functions/lte.js
  var require_lte = __commonJS({
    "node_modules/semver/functions/lte.js"(exports, module) {
      init_process();
      init_buffer();
      var compare5 = require_compare();
      var lte = (a, b, loose) => compare5(a, b, loose) <= 0;
      module.exports = lte;
    }
  });

  // node_modules/semver/functions/cmp.js
  var require_cmp = __commonJS({
    "node_modules/semver/functions/cmp.js"(exports, module) {
      init_process();
      init_buffer();
      var eq = require_eq();
      var neq = require_neq();
      var gt = require_gt();
      var gte = require_gte();
      var lt = require_lt();
      var lte = require_lte();
      var cmp = (a, op, b, loose) => {
        switch (op) {
          case "===":
            if (typeof a === "object") {
              a = a.version;
            }
            if (typeof b === "object") {
              b = b.version;
            }
            return a === b;
          case "!==":
            if (typeof a === "object") {
              a = a.version;
            }
            if (typeof b === "object") {
              b = b.version;
            }
            return a !== b;
          case "":
          case "=":
          case "==":
            return eq(a, b, loose);
          case "!=":
            return neq(a, b, loose);
          case ">":
            return gt(a, b, loose);
          case ">=":
            return gte(a, b, loose);
          case "<":
            return lt(a, b, loose);
          case "<=":
            return lte(a, b, loose);
          default:
            throw new TypeError(`Invalid operator: ${op}`);
        }
      };
      module.exports = cmp;
    }
  });

  // node_modules/semver/functions/coerce.js
  var require_coerce = __commonJS({
    "node_modules/semver/functions/coerce.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var parse = require_parse();
      var { safeRe: re, t: t2 } = require_re();
      var coerce = (version3, options) => {
        if (version3 instanceof SemVer) {
          return version3;
        }
        if (typeof version3 === "number") {
          version3 = String(version3);
        }
        if (typeof version3 !== "string") {
          return null;
        }
        options = options || {};
        let match = null;
        if (!options.rtl) {
          match = version3.match(options.includePrerelease ? re[t2.COERCEFULL] : re[t2.COERCE]);
        } else {
          const coerceRtlRegex = options.includePrerelease ? re[t2.COERCERTLFULL] : re[t2.COERCERTL];
          let next;
          while ((next = coerceRtlRegex.exec(version3)) && (!match || match.index + match[0].length !== version3.length)) {
            if (!match || next.index + next[0].length !== match.index + match[0].length) {
              match = next;
            }
            coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
          }
          coerceRtlRegex.lastIndex = -1;
        }
        if (match === null) {
          return null;
        }
        const major = match[2];
        const minor = match[3] || "0";
        const patch = match[4] || "0";
        const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
        const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
        return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
      };
      module.exports = coerce;
    }
  });

  // node_modules/semver/internal/lrucache.js
  var require_lrucache = __commonJS({
    "node_modules/semver/internal/lrucache.js"(exports, module) {
      init_process();
      init_buffer();
      var LRUCache = class {
        constructor() {
          this.max = 1e3;
          this.map = /* @__PURE__ */ new Map();
        }
        get(key) {
          const value = this.map.get(key);
          if (value === void 0) {
            return void 0;
          } else {
            this.map.delete(key);
            this.map.set(key, value);
            return value;
          }
        }
        delete(key) {
          return this.map.delete(key);
        }
        set(key, value) {
          const deleted = this.delete(key);
          if (!deleted && value !== void 0) {
            if (this.map.size >= this.max) {
              const firstKey = this.map.keys().next().value;
              this.delete(firstKey);
            }
            this.map.set(key, value);
          }
          return this;
        }
      };
      module.exports = LRUCache;
    }
  });

  // node_modules/semver/classes/range.js
  var require_range = __commonJS({
    "node_modules/semver/classes/range.js"(exports, module) {
      init_process();
      init_buffer();
      var SPACE_CHARACTERS = /\s+/g;
      var Range = class {
        constructor(range, options) {
          options = parseOptions(options);
          if (range instanceof Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
              return range;
            } else {
              return new Range(range.raw, options);
            }
          }
          if (range instanceof Comparator) {
            this.raw = range.value;
            this.set = [[range]];
            this.formatted = void 0;
            return this;
          }
          this.options = options;
          this.loose = !!options.loose;
          this.includePrerelease = !!options.includePrerelease;
          this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
          this.set = this.raw.split("||").map((r2) => this.parseRange(r2.trim())).filter((c) => c.length);
          if (!this.set.length) {
            throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
          }
          if (this.set.length > 1) {
            const first = this.set[0];
            this.set = this.set.filter((c) => !isNullSet(c[0]));
            if (this.set.length === 0) {
              this.set = [first];
            } else if (this.set.length > 1) {
              for (const c of this.set) {
                if (c.length === 1 && isAny(c[0])) {
                  this.set = [c];
                  break;
                }
              }
            }
          }
          this.formatted = void 0;
        }
        get range() {
          if (this.formatted === void 0) {
            this.formatted = "";
            for (let i = 0; i < this.set.length; i++) {
              if (i > 0) {
                this.formatted += "||";
              }
              const comps = this.set[i];
              for (let k = 0; k < comps.length; k++) {
                if (k > 0) {
                  this.formatted += " ";
                }
                this.formatted += comps[k].toString().trim();
              }
            }
          }
          return this.formatted;
        }
        format() {
          return this.range;
        }
        toString() {
          return this.range;
        }
        parseRange(range) {
          const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
          const memoKey = memoOpts + ":" + range;
          const cached = cache.get(memoKey);
          if (cached) {
            return cached;
          }
          const loose = this.options.loose;
          const hr = loose ? re[t2.HYPHENRANGELOOSE] : re[t2.HYPHENRANGE];
          range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
          debug2("hyphen replace", range);
          range = range.replace(re[t2.COMPARATORTRIM], comparatorTrimReplace);
          debug2("comparator trim", range);
          range = range.replace(re[t2.TILDETRIM], tildeTrimReplace);
          debug2("tilde trim", range);
          range = range.replace(re[t2.CARETTRIM], caretTrimReplace);
          debug2("caret trim", range);
          let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
          if (loose) {
            rangeList = rangeList.filter((comp) => {
              debug2("loose invalid filter", comp, this.options);
              return !!comp.match(re[t2.COMPARATORLOOSE]);
            });
          }
          debug2("range list", rangeList);
          const rangeMap = /* @__PURE__ */ new Map();
          const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
          for (const comp of comparators) {
            if (isNullSet(comp)) {
              return [comp];
            }
            rangeMap.set(comp.value, comp);
          }
          if (rangeMap.size > 1 && rangeMap.has("")) {
            rangeMap.delete("");
          }
          const result = [...rangeMap.values()];
          cache.set(memoKey, result);
          return result;
        }
        intersects(range, options) {
          if (!(range instanceof Range)) {
            throw new TypeError("a Range is required");
          }
          return this.set.some((thisComparators) => {
            return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
              return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
                return rangeComparators.every((rangeComparator) => {
                  return thisComparator.intersects(rangeComparator, options);
                });
              });
            });
          });
        }
        // if ANY of the sets match ALL of its comparators, then pass
        test(version3) {
          if (!version3) {
            return false;
          }
          if (typeof version3 === "string") {
            try {
              version3 = new SemVer(version3, this.options);
            } catch (er) {
              return false;
            }
          }
          for (let i = 0; i < this.set.length; i++) {
            if (testSet(this.set[i], version3, this.options)) {
              return true;
            }
          }
          return false;
        }
      };
      module.exports = Range;
      var LRU = require_lrucache();
      var cache = new LRU();
      var parseOptions = require_parse_options();
      var Comparator = require_comparator();
      var debug2 = require_debug();
      var SemVer = require_semver();
      var {
        safeRe: re,
        t: t2,
        comparatorTrimReplace,
        tildeTrimReplace,
        caretTrimReplace
      } = require_re();
      var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
      var isNullSet = (c) => c.value === "<0.0.0-0";
      var isAny = (c) => c.value === "";
      var isSatisfiable = (comparators, options) => {
        let result = true;
        const remainingComparators = comparators.slice();
        let testComparator = remainingComparators.pop();
        while (result && remainingComparators.length) {
          result = remainingComparators.every((otherComparator) => {
            return testComparator.intersects(otherComparator, options);
          });
          testComparator = remainingComparators.pop();
        }
        return result;
      };
      var parseComparator = (comp, options) => {
        debug2("comp", comp, options);
        comp = replaceCarets(comp, options);
        debug2("caret", comp);
        comp = replaceTildes(comp, options);
        debug2("tildes", comp);
        comp = replaceXRanges(comp, options);
        debug2("xrange", comp);
        comp = replaceStars(comp, options);
        debug2("stars", comp);
        return comp;
      };
      var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
      var replaceTildes = (comp, options) => {
        return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
      };
      var replaceTilde = (comp, options) => {
        const r2 = options.loose ? re[t2.TILDELOOSE] : re[t2.TILDE];
        return comp.replace(r2, (_, M, m, p2, pr) => {
          debug2("tilde", comp, _, M, m, p2, pr);
          let ret;
          if (isX(M)) {
            ret = "";
          } else if (isX(m)) {
            ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
          } else if (isX(p2)) {
            ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
          } else if (pr) {
            debug2("replaceTilde pr", pr);
            ret = `>=${M}.${m}.${p2}-${pr} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.${p2} <${M}.${+m + 1}.0-0`;
          }
          debug2("tilde return", ret);
          return ret;
        });
      };
      var replaceCarets = (comp, options) => {
        return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
      };
      var replaceCaret = (comp, options) => {
        debug2("caret", comp, options);
        const r2 = options.loose ? re[t2.CARETLOOSE] : re[t2.CARET];
        const z = options.includePrerelease ? "-0" : "";
        return comp.replace(r2, (_, M, m, p2, pr) => {
          debug2("caret", comp, _, M, m, p2, pr);
          let ret;
          if (isX(M)) {
            ret = "";
          } else if (isX(m)) {
            ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
          } else if (isX(p2)) {
            if (M === "0") {
              ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            } else {
              ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
            }
          } else if (pr) {
            debug2("replaceCaret pr", pr);
            if (M === "0") {
              if (m === "0") {
                ret = `>=${M}.${m}.${p2}-${pr} <${M}.${m}.${+p2 + 1}-0`;
              } else {
                ret = `>=${M}.${m}.${p2}-${pr} <${M}.${+m + 1}.0-0`;
              }
            } else {
              ret = `>=${M}.${m}.${p2}-${pr} <${+M + 1}.0.0-0`;
            }
          } else {
            debug2("no pr");
            if (M === "0") {
              if (m === "0") {
                ret = `>=${M}.${m}.${p2}${z} <${M}.${m}.${+p2 + 1}-0`;
              } else {
                ret = `>=${M}.${m}.${p2}${z} <${M}.${+m + 1}.0-0`;
              }
            } else {
              ret = `>=${M}.${m}.${p2} <${+M + 1}.0.0-0`;
            }
          }
          debug2("caret return", ret);
          return ret;
        });
      };
      var replaceXRanges = (comp, options) => {
        debug2("replaceXRanges", comp, options);
        return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
      };
      var replaceXRange = (comp, options) => {
        comp = comp.trim();
        const r2 = options.loose ? re[t2.XRANGELOOSE] : re[t2.XRANGE];
        return comp.replace(r2, (ret, gtlt, M, m, p2, pr) => {
          debug2("xRange", comp, ret, gtlt, M, m, p2, pr);
          const xM = isX(M);
          const xm = xM || isX(m);
          const xp = xm || isX(p2);
          const anyX = xp;
          if (gtlt === "=" && anyX) {
            gtlt = "";
          }
          pr = options.includePrerelease ? "-0" : "";
          if (xM) {
            if (gtlt === ">" || gtlt === "<") {
              ret = "<0.0.0-0";
            } else {
              ret = "*";
            }
          } else if (gtlt && anyX) {
            if (xm) {
              m = 0;
            }
            p2 = 0;
            if (gtlt === ">") {
              gtlt = ">=";
              if (xm) {
                M = +M + 1;
                m = 0;
                p2 = 0;
              } else {
                m = +m + 1;
                p2 = 0;
              }
            } else if (gtlt === "<=") {
              gtlt = "<";
              if (xm) {
                M = +M + 1;
              } else {
                m = +m + 1;
              }
            }
            if (gtlt === "<") {
              pr = "-0";
            }
            ret = `${gtlt + M}.${m}.${p2}${pr}`;
          } else if (xm) {
            ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
          } else if (xp) {
            ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
          }
          debug2("xRange return", ret);
          return ret;
        });
      };
      var replaceStars = (comp, options) => {
        debug2("replaceStars", comp, options);
        return comp.trim().replace(re[t2.STAR], "");
      };
      var replaceGTE0 = (comp, options) => {
        debug2("replaceGTE0", comp, options);
        return comp.trim().replace(re[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "");
      };
      var hyphenReplace = (incPr) => ($0, from3, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
        if (isX(fM)) {
          from3 = "";
        } else if (isX(fm)) {
          from3 = `>=${fM}.0.0${incPr ? "-0" : ""}`;
        } else if (isX(fp)) {
          from3 = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
        } else if (fpr) {
          from3 = `>=${from3}`;
        } else {
          from3 = `>=${from3}${incPr ? "-0" : ""}`;
        }
        if (isX(tM)) {
          to = "";
        } else if (isX(tm)) {
          to = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp)) {
          to = `<${tM}.${+tm + 1}.0-0`;
        } else if (tpr) {
          to = `<=${tM}.${tm}.${tp}-${tpr}`;
        } else if (incPr) {
          to = `<${tM}.${tm}.${+tp + 1}-0`;
        } else {
          to = `<=${to}`;
        }
        return `${from3} ${to}`.trim();
      };
      var testSet = (set, version3, options) => {
        for (let i = 0; i < set.length; i++) {
          if (!set[i].test(version3)) {
            return false;
          }
        }
        if (version3.prerelease.length && !options.includePrerelease) {
          for (let i = 0; i < set.length; i++) {
            debug2(set[i].semver);
            if (set[i].semver === Comparator.ANY) {
              continue;
            }
            if (set[i].semver.prerelease.length > 0) {
              const allowed = set[i].semver;
              if (allowed.major === version3.major && allowed.minor === version3.minor && allowed.patch === version3.patch) {
                return true;
              }
            }
          }
          return false;
        }
        return true;
      };
    }
  });

  // node_modules/semver/classes/comparator.js
  var require_comparator = __commonJS({
    "node_modules/semver/classes/comparator.js"(exports, module) {
      init_process();
      init_buffer();
      var ANY = Symbol("SemVer ANY");
      var Comparator = class {
        static get ANY() {
          return ANY;
        }
        constructor(comp, options) {
          options = parseOptions(options);
          if (comp instanceof Comparator) {
            if (comp.loose === !!options.loose) {
              return comp;
            } else {
              comp = comp.value;
            }
          }
          comp = comp.trim().split(/\s+/).join(" ");
          debug2("comparator", comp, options);
          this.options = options;
          this.loose = !!options.loose;
          this.parse(comp);
          if (this.semver === ANY) {
            this.value = "";
          } else {
            this.value = this.operator + this.semver.version;
          }
          debug2("comp", this);
        }
        parse(comp) {
          const r2 = this.options.loose ? re[t2.COMPARATORLOOSE] : re[t2.COMPARATOR];
          const m = comp.match(r2);
          if (!m) {
            throw new TypeError(`Invalid comparator: ${comp}`);
          }
          this.operator = m[1] !== void 0 ? m[1] : "";
          if (this.operator === "=") {
            this.operator = "";
          }
          if (!m[2]) {
            this.semver = ANY;
          } else {
            this.semver = new SemVer(m[2], this.options.loose);
          }
        }
        toString() {
          return this.value;
        }
        test(version3) {
          debug2("Comparator.test", version3, this.options.loose);
          if (this.semver === ANY || version3 === ANY) {
            return true;
          }
          if (typeof version3 === "string") {
            try {
              version3 = new SemVer(version3, this.options);
            } catch (er) {
              return false;
            }
          }
          return cmp(version3, this.operator, this.semver, this.options);
        }
        intersects(comp, options) {
          if (!(comp instanceof Comparator)) {
            throw new TypeError("a Comparator is required");
          }
          if (this.operator === "") {
            if (this.value === "") {
              return true;
            }
            return new Range(comp.value, options).test(this.value);
          } else if (comp.operator === "") {
            if (comp.value === "") {
              return true;
            }
            return new Range(this.value, options).test(comp.semver);
          }
          options = parseOptions(options);
          if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
            return false;
          }
          if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
            return false;
          }
          if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
            return true;
          }
          if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
            return true;
          }
          if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
            return true;
          }
          if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
            return true;
          }
          if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
            return true;
          }
          return false;
        }
      };
      module.exports = Comparator;
      var parseOptions = require_parse_options();
      var { safeRe: re, t: t2 } = require_re();
      var cmp = require_cmp();
      var debug2 = require_debug();
      var SemVer = require_semver();
      var Range = require_range();
    }
  });

  // node_modules/semver/functions/satisfies.js
  var require_satisfies = __commonJS({
    "node_modules/semver/functions/satisfies.js"(exports, module) {
      init_process();
      init_buffer();
      var Range = require_range();
      var satisfies = (version3, range, options) => {
        try {
          range = new Range(range, options);
        } catch (er) {
          return false;
        }
        return range.test(version3);
      };
      module.exports = satisfies;
    }
  });

  // node_modules/semver/ranges/to-comparators.js
  var require_to_comparators = __commonJS({
    "node_modules/semver/ranges/to-comparators.js"(exports, module) {
      init_process();
      init_buffer();
      var Range = require_range();
      var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
      module.exports = toComparators;
    }
  });

  // node_modules/semver/ranges/max-satisfying.js
  var require_max_satisfying = __commonJS({
    "node_modules/semver/ranges/max-satisfying.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var Range = require_range();
      var maxSatisfying = (versions3, range, options) => {
        let max = null;
        let maxSV = null;
        let rangeObj = null;
        try {
          rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions3.forEach((v) => {
          if (rangeObj.test(v)) {
            if (!max || maxSV.compare(v) === -1) {
              max = v;
              maxSV = new SemVer(max, options);
            }
          }
        });
        return max;
      };
      module.exports = maxSatisfying;
    }
  });

  // node_modules/semver/ranges/min-satisfying.js
  var require_min_satisfying = __commonJS({
    "node_modules/semver/ranges/min-satisfying.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var Range = require_range();
      var minSatisfying = (versions3, range, options) => {
        let min = null;
        let minSV = null;
        let rangeObj = null;
        try {
          rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions3.forEach((v) => {
          if (rangeObj.test(v)) {
            if (!min || minSV.compare(v) === 1) {
              min = v;
              minSV = new SemVer(min, options);
            }
          }
        });
        return min;
      };
      module.exports = minSatisfying;
    }
  });

  // node_modules/semver/ranges/min-version.js
  var require_min_version = __commonJS({
    "node_modules/semver/ranges/min-version.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var Range = require_range();
      var gt = require_gt();
      var minVersion = (range, loose) => {
        range = new Range(range, loose);
        let minver = new SemVer("0.0.0");
        if (range.test(minver)) {
          return minver;
        }
        minver = new SemVer("0.0.0-0");
        if (range.test(minver)) {
          return minver;
        }
        minver = null;
        for (let i = 0; i < range.set.length; ++i) {
          const comparators = range.set[i];
          let setMin = null;
          comparators.forEach((comparator) => {
            const compver = new SemVer(comparator.semver.version);
            switch (comparator.operator) {
              case ">":
                if (compver.prerelease.length === 0) {
                  compver.patch++;
                } else {
                  compver.prerelease.push(0);
                }
                compver.raw = compver.format();
              case "":
              case ">=":
                if (!setMin || gt(compver, setMin)) {
                  setMin = compver;
                }
                break;
              case "<":
              case "<=":
                break;
              default:
                throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
          });
          if (setMin && (!minver || gt(minver, setMin))) {
            minver = setMin;
          }
        }
        if (minver && range.test(minver)) {
          return minver;
        }
        return null;
      };
      module.exports = minVersion;
    }
  });

  // node_modules/semver/ranges/valid.js
  var require_valid2 = __commonJS({
    "node_modules/semver/ranges/valid.js"(exports, module) {
      init_process();
      init_buffer();
      var Range = require_range();
      var validRange = (range, options) => {
        try {
          return new Range(range, options).range || "*";
        } catch (er) {
          return null;
        }
      };
      module.exports = validRange;
    }
  });

  // node_modules/semver/ranges/outside.js
  var require_outside = __commonJS({
    "node_modules/semver/ranges/outside.js"(exports, module) {
      init_process();
      init_buffer();
      var SemVer = require_semver();
      var Comparator = require_comparator();
      var { ANY } = Comparator;
      var Range = require_range();
      var satisfies = require_satisfies();
      var gt = require_gt();
      var lt = require_lt();
      var lte = require_lte();
      var gte = require_gte();
      var outside = (version3, range, hilo, options) => {
        version3 = new SemVer(version3, options);
        range = new Range(range, options);
        let gtfn, ltefn, ltfn, comp, ecomp;
        switch (hilo) {
          case ">":
            gtfn = gt;
            ltefn = lte;
            ltfn = lt;
            comp = ">";
            ecomp = ">=";
            break;
          case "<":
            gtfn = lt;
            ltefn = gte;
            ltfn = gt;
            comp = "<";
            ecomp = "<=";
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (satisfies(version3, range, options)) {
          return false;
        }
        for (let i = 0; i < range.set.length; ++i) {
          const comparators = range.set[i];
          let high = null;
          let low = null;
          comparators.forEach((comparator) => {
            if (comparator.semver === ANY) {
              comparator = new Comparator(">=0.0.0");
            }
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) {
              high = comparator;
            } else if (ltfn(comparator.semver, low.semver, options)) {
              low = comparator;
            }
          });
          if (high.operator === comp || high.operator === ecomp) {
            return false;
          }
          if ((!low.operator || low.operator === comp) && ltefn(version3, low.semver)) {
            return false;
          } else if (low.operator === ecomp && ltfn(version3, low.semver)) {
            return false;
          }
        }
        return true;
      };
      module.exports = outside;
    }
  });

  // node_modules/semver/ranges/gtr.js
  var require_gtr = __commonJS({
    "node_modules/semver/ranges/gtr.js"(exports, module) {
      init_process();
      init_buffer();
      var outside = require_outside();
      var gtr = (version3, range, options) => outside(version3, range, ">", options);
      module.exports = gtr;
    }
  });

  // node_modules/semver/ranges/ltr.js
  var require_ltr = __commonJS({
    "node_modules/semver/ranges/ltr.js"(exports, module) {
      init_process();
      init_buffer();
      var outside = require_outside();
      var ltr = (version3, range, options) => outside(version3, range, "<", options);
      module.exports = ltr;
    }
  });

  // node_modules/semver/ranges/intersects.js
  var require_intersects = __commonJS({
    "node_modules/semver/ranges/intersects.js"(exports, module) {
      init_process();
      init_buffer();
      var Range = require_range();
      var intersects = (r1, r2, options) => {
        r1 = new Range(r1, options);
        r2 = new Range(r2, options);
        return r1.intersects(r2, options);
      };
      module.exports = intersects;
    }
  });

  // node_modules/semver/ranges/simplify.js
  var require_simplify = __commonJS({
    "node_modules/semver/ranges/simplify.js"(exports, module) {
      init_process();
      init_buffer();
      var satisfies = require_satisfies();
      var compare5 = require_compare();
      module.exports = (versions3, range, options) => {
        const set = [];
        let first = null;
        let prev = null;
        const v = versions3.sort((a, b) => compare5(a, b, options));
        for (const version3 of v) {
          const included = satisfies(version3, range, options);
          if (included) {
            prev = version3;
            if (!first) {
              first = version3;
            }
          } else {
            if (prev) {
              set.push([first, prev]);
            }
            prev = null;
            first = null;
          }
        }
        if (first) {
          set.push([first, null]);
        }
        const ranges = [];
        for (const [min, max] of set) {
          if (min === max) {
            ranges.push(min);
          } else if (!max && min === v[0]) {
            ranges.push("*");
          } else if (!max) {
            ranges.push(`>=${min}`);
          } else if (min === v[0]) {
            ranges.push(`<=${max}`);
          } else {
            ranges.push(`${min} - ${max}`);
          }
        }
        const simplified = ranges.join(" || ");
        const original = typeof range.raw === "string" ? range.raw : String(range);
        return simplified.length < original.length ? simplified : range;
      };
    }
  });

  // node_modules/semver/ranges/subset.js
  var require_subset = __commonJS({
    "node_modules/semver/ranges/subset.js"(exports, module) {
      init_process();
      init_buffer();
      var Range = require_range();
      var Comparator = require_comparator();
      var { ANY } = Comparator;
      var satisfies = require_satisfies();
      var compare5 = require_compare();
      var subset = (sub, dom, options = {}) => {
        if (sub === dom) {
          return true;
        }
        sub = new Range(sub, options);
        dom = new Range(dom, options);
        let sawNonNull = false;
        OUTER:
          for (const simpleSub of sub.set) {
            for (const simpleDom of dom.set) {
              const isSub = simpleSubset(simpleSub, simpleDom, options);
              sawNonNull = sawNonNull || isSub !== null;
              if (isSub) {
                continue OUTER;
              }
            }
            if (sawNonNull) {
              return false;
            }
          }
        return true;
      };
      var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
      var minimumVersion = [new Comparator(">=0.0.0")];
      var simpleSubset = (sub, dom, options) => {
        if (sub === dom) {
          return true;
        }
        if (sub.length === 1 && sub[0].semver === ANY) {
          if (dom.length === 1 && dom[0].semver === ANY) {
            return true;
          } else if (options.includePrerelease) {
            sub = minimumVersionWithPreRelease;
          } else {
            sub = minimumVersion;
          }
        }
        if (dom.length === 1 && dom[0].semver === ANY) {
          if (options.includePrerelease) {
            return true;
          } else {
            dom = minimumVersion;
          }
        }
        const eqSet = /* @__PURE__ */ new Set();
        let gt, lt;
        for (const c of sub) {
          if (c.operator === ">" || c.operator === ">=") {
            gt = higherGT(gt, c, options);
          } else if (c.operator === "<" || c.operator === "<=") {
            lt = lowerLT(lt, c, options);
          } else {
            eqSet.add(c.semver);
          }
        }
        if (eqSet.size > 1) {
          return null;
        }
        let gtltComp;
        if (gt && lt) {
          gtltComp = compare5(gt.semver, lt.semver, options);
          if (gtltComp > 0) {
            return null;
          } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
            return null;
          }
        }
        for (const eq of eqSet) {
          if (gt && !satisfies(eq, String(gt), options)) {
            return null;
          }
          if (lt && !satisfies(eq, String(lt), options)) {
            return null;
          }
          for (const c of dom) {
            if (!satisfies(eq, String(c), options)) {
              return false;
            }
          }
          return true;
        }
        let higher, lower;
        let hasDomLT, hasDomGT;
        let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
        let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
        if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
          needDomLTPre = false;
        }
        for (const c of dom) {
          hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
          hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
          if (gt) {
            if (needDomGTPre) {
              if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
                needDomGTPre = false;
              }
            }
            if (c.operator === ">" || c.operator === ">=") {
              higher = higherGT(gt, c, options);
              if (higher === c && higher !== gt) {
                return false;
              }
            } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
              return false;
            }
          }
          if (lt) {
            if (needDomLTPre) {
              if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
                needDomLTPre = false;
              }
            }
            if (c.operator === "<" || c.operator === "<=") {
              lower = lowerLT(lt, c, options);
              if (lower === c && lower !== lt) {
                return false;
              }
            } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
              return false;
            }
          }
          if (!c.operator && (lt || gt) && gtltComp !== 0) {
            return false;
          }
        }
        if (gt && hasDomLT && !lt && gtltComp !== 0) {
          return false;
        }
        if (lt && hasDomGT && !gt && gtltComp !== 0) {
          return false;
        }
        if (needDomGTPre || needDomLTPre) {
          return false;
        }
        return true;
      };
      var higherGT = (a, b, options) => {
        if (!a) {
          return b;
        }
        const comp = compare5(a.semver, b.semver, options);
        return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
      };
      var lowerLT = (a, b, options) => {
        if (!a) {
          return b;
        }
        const comp = compare5(a.semver, b.semver, options);
        return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
      };
      module.exports = subset;
    }
  });

  // node_modules/semver/index.js
  var require_semver2 = __commonJS({
    "node_modules/semver/index.js"(exports, module) {
      init_process();
      init_buffer();
      var internalRe = require_re();
      var constants = require_constants();
      var SemVer = require_semver();
      var identifiers = require_identifiers();
      var parse = require_parse();
      var valid = require_valid();
      var clean = require_clean();
      var inc = require_inc();
      var diff = require_diff();
      var major = require_major();
      var minor = require_minor();
      var patch = require_patch();
      var prerelease = require_prerelease();
      var compare5 = require_compare();
      var rcompare = require_rcompare();
      var compareLoose = require_compare_loose();
      var compareBuild = require_compare_build();
      var sort = require_sort();
      var rsort = require_rsort();
      var gt = require_gt();
      var lt = require_lt();
      var eq = require_eq();
      var neq = require_neq();
      var gte = require_gte();
      var lte = require_lte();
      var cmp = require_cmp();
      var coerce = require_coerce();
      var Comparator = require_comparator();
      var Range = require_range();
      var satisfies = require_satisfies();
      var toComparators = require_to_comparators();
      var maxSatisfying = require_max_satisfying();
      var minSatisfying = require_min_satisfying();
      var minVersion = require_min_version();
      var validRange = require_valid2();
      var outside = require_outside();
      var gtr = require_gtr();
      var ltr = require_ltr();
      var intersects = require_intersects();
      var simplifyRange = require_simplify();
      var subset = require_subset();
      module.exports = {
        parse,
        valid,
        clean,
        inc,
        diff,
        major,
        minor,
        patch,
        prerelease,
        compare: compare5,
        rcompare,
        compareLoose,
        compareBuild,
        sort,
        rsort,
        gt,
        lt,
        eq,
        neq,
        gte,
        lte,
        cmp,
        coerce,
        Comparator,
        Range,
        satisfies,
        toComparators,
        maxSatisfying,
        minSatisfying,
        minVersion,
        validRange,
        outside,
        gtr,
        ltr,
        intersects,
        simplifyRange,
        subset,
        SemVer,
        re: internalRe.re,
        src: internalRe.src,
        tokens: internalRe.t,
        SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: constants.RELEASE_TYPES,
        compareIdentifiers: identifiers.compareIdentifiers,
        rcompareIdentifiers: identifiers.rcompareIdentifiers
      };
    }
  });

  // node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js
  var require_asymmetricKeyDetailsSupported = __commonJS({
    "node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"(exports, module) {
      init_process();
      init_buffer();
      var semver = require_semver2();
      module.exports = semver.satisfies(process.version, ">=15.7.0");
    }
  });

  // node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js
  var require_rsaPssKeyDetailsSupported = __commonJS({
    "node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"(exports, module) {
      init_process();
      init_buffer();
      var semver = require_semver2();
      module.exports = semver.satisfies(process.version, ">=16.9.0");
    }
  });

  // node_modules/jsonwebtoken/lib/validateAsymmetricKey.js
  var require_validateAsymmetricKey = __commonJS({
    "node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"(exports, module) {
      init_process();
      init_buffer();
      var ASYMMETRIC_KEY_DETAILS_SUPPORTED = require_asymmetricKeyDetailsSupported();
      var RSA_PSS_KEY_DETAILS_SUPPORTED = require_rsaPssKeyDetailsSupported();
      var allowedAlgorithmsForKeys = {
        "ec": ["ES256", "ES384", "ES512"],
        "rsa": ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
        "rsa-pss": ["PS256", "PS384", "PS512"]
      };
      var allowedCurves = {
        ES256: "prime256v1",
        ES384: "secp384r1",
        ES512: "secp521r1"
      };
      module.exports = function(algorithm, key) {
        if (!algorithm || !key)
          return;
        const keyType = key.asymmetricKeyType;
        if (!keyType)
          return;
        const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
        if (!allowedAlgorithms) {
          throw new Error(`Unknown key type "${keyType}".`);
        }
        if (!allowedAlgorithms.includes(algorithm)) {
          throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(", ")}.`);
        }
        if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
          switch (keyType) {
            case "ec":
              const keyCurve = key.asymmetricKeyDetails.namedCurve;
              const allowedCurve = allowedCurves[algorithm];
              if (keyCurve !== allowedCurve) {
                throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
              }
              break;
            case "rsa-pss":
              if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
                const length = parseInt(algorithm.slice(-3), 10);
                const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
                if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
                  throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
                }
                if (saltLength !== void 0 && saltLength > length >> 3) {
                  throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
                }
              }
              break;
          }
        }
      };
    }
  });

  // node_modules/jsonwebtoken/lib/psSupported.js
  var require_psSupported = __commonJS({
    "node_modules/jsonwebtoken/lib/psSupported.js"(exports, module) {
      init_process();
      init_buffer();
      var semver = require_semver2();
      module.exports = semver.satisfies(process.version, "^6.12.0 || >=8.0.0");
    }
  });

  // node_modules/jsonwebtoken/verify.js
  var require_verify = __commonJS({
    "node_modules/jsonwebtoken/verify.js"(exports, module) {
      init_process();
      init_buffer();
      var JsonWebTokenError = require_JsonWebTokenError();
      var NotBeforeError = require_NotBeforeError();
      var TokenExpiredError = require_TokenExpiredError();
      var decode = require_decode();
      var timespan = require_timespan();
      var validateAsymmetricKey = require_validateAsymmetricKey();
      var PS_SUPPORTED = require_psSupported();
      var jws = require_jws();
      var { KeyObject, createSecretKey, createPublicKey } = require_crypto();
      var PUB_KEY_ALGS = ["RS256", "RS384", "RS512"];
      var EC_KEY_ALGS = ["ES256", "ES384", "ES512"];
      var RSA_KEY_ALGS = ["RS256", "RS384", "RS512"];
      var HS_ALGS = ["HS256", "HS384", "HS512"];
      if (PS_SUPPORTED) {
        PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
        RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
      }
      module.exports = function(jwtString, secretOrPublicKey, options, callback) {
        if (typeof options === "function" && !callback) {
          callback = options;
          options = {};
        }
        if (!options) {
          options = {};
        }
        options = Object.assign({}, options);
        let done2;
        if (callback) {
          done2 = callback;
        } else {
          done2 = function(err, data) {
            if (err)
              throw err;
            return data;
          };
        }
        if (options.clockTimestamp && typeof options.clockTimestamp !== "number") {
          return done2(new JsonWebTokenError("clockTimestamp must be a number"));
        }
        if (options.nonce !== void 0 && (typeof options.nonce !== "string" || options.nonce.trim() === "")) {
          return done2(new JsonWebTokenError("nonce must be a non-empty string"));
        }
        if (options.allowInvalidAsymmetricKeyTypes !== void 0 && typeof options.allowInvalidAsymmetricKeyTypes !== "boolean") {
          return done2(new JsonWebTokenError("allowInvalidAsymmetricKeyTypes must be a boolean"));
        }
        const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1e3);
        if (!jwtString) {
          return done2(new JsonWebTokenError("jwt must be provided"));
        }
        if (typeof jwtString !== "string") {
          return done2(new JsonWebTokenError("jwt must be a string"));
        }
        const parts = jwtString.split(".");
        if (parts.length !== 3) {
          return done2(new JsonWebTokenError("jwt malformed"));
        }
        let decodedToken;
        try {
          decodedToken = decode(jwtString, { complete: true });
        } catch (err) {
          return done2(err);
        }
        if (!decodedToken) {
          return done2(new JsonWebTokenError("invalid token"));
        }
        const header = decodedToken.header;
        let getSecret;
        if (typeof secretOrPublicKey === "function") {
          if (!callback) {
            return done2(new JsonWebTokenError("verify must be called asynchronous if secret or public key is provided as a callback"));
          }
          getSecret = secretOrPublicKey;
        } else {
          getSecret = function(header2, secretCallback) {
            return secretCallback(null, secretOrPublicKey);
          };
        }
        return getSecret(header, function(err, secretOrPublicKey2) {
          if (err) {
            return done2(new JsonWebTokenError("error in secret or public key callback: " + err.message));
          }
          const hasSignature = parts[2].trim() !== "";
          if (!hasSignature && secretOrPublicKey2) {
            return done2(new JsonWebTokenError("jwt signature is required"));
          }
          if (hasSignature && !secretOrPublicKey2) {
            return done2(new JsonWebTokenError("secret or public key must be provided"));
          }
          if (!hasSignature && !options.algorithms) {
            return done2(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
          }
          if (secretOrPublicKey2 != null && !(secretOrPublicKey2 instanceof KeyObject)) {
            try {
              secretOrPublicKey2 = createPublicKey(secretOrPublicKey2);
            } catch (_) {
              try {
                secretOrPublicKey2 = createSecretKey(typeof secretOrPublicKey2 === "string" ? Buffer2.from(secretOrPublicKey2) : secretOrPublicKey2);
              } catch (_2) {
                return done2(new JsonWebTokenError("secretOrPublicKey is not valid key material"));
              }
            }
          }
          if (!options.algorithms) {
            if (secretOrPublicKey2.type === "secret") {
              options.algorithms = HS_ALGS;
            } else if (["rsa", "rsa-pss"].includes(secretOrPublicKey2.asymmetricKeyType)) {
              options.algorithms = RSA_KEY_ALGS;
            } else if (secretOrPublicKey2.asymmetricKeyType === "ec") {
              options.algorithms = EC_KEY_ALGS;
            } else {
              options.algorithms = PUB_KEY_ALGS;
            }
          }
          if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
            return done2(new JsonWebTokenError("invalid algorithm"));
          }
          if (header.alg.startsWith("HS") && secretOrPublicKey2.type !== "secret") {
            return done2(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
          } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey2.type !== "public") {
            return done2(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
          }
          if (!options.allowInvalidAsymmetricKeyTypes) {
            try {
              validateAsymmetricKey(header.alg, secretOrPublicKey2);
            } catch (e) {
              return done2(e);
            }
          }
          let valid;
          try {
            valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey2);
          } catch (e) {
            return done2(e);
          }
          if (!valid) {
            return done2(new JsonWebTokenError("invalid signature"));
          }
          const payload = decodedToken.payload;
          if (typeof payload.nbf !== "undefined" && !options.ignoreNotBefore) {
            if (typeof payload.nbf !== "number") {
              return done2(new JsonWebTokenError("invalid nbf value"));
            }
            if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
              return done2(new NotBeforeError("jwt not active", new Date(payload.nbf * 1e3)));
            }
          }
          if (typeof payload.exp !== "undefined" && !options.ignoreExpiration) {
            if (typeof payload.exp !== "number") {
              return done2(new JsonWebTokenError("invalid exp value"));
            }
            if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
              return done2(new TokenExpiredError("jwt expired", new Date(payload.exp * 1e3)));
            }
          }
          if (options.audience) {
            const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
            const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
            const match = target.some(function(targetAudience) {
              return audiences.some(function(audience) {
                return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
              });
            });
            if (!match) {
              return done2(new JsonWebTokenError("jwt audience invalid. expected: " + audiences.join(" or ")));
            }
          }
          if (options.issuer) {
            const invalid_issuer = typeof options.issuer === "string" && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
            if (invalid_issuer) {
              return done2(new JsonWebTokenError("jwt issuer invalid. expected: " + options.issuer));
            }
          }
          if (options.subject) {
            if (payload.sub !== options.subject) {
              return done2(new JsonWebTokenError("jwt subject invalid. expected: " + options.subject));
            }
          }
          if (options.jwtid) {
            if (payload.jti !== options.jwtid) {
              return done2(new JsonWebTokenError("jwt jwtid invalid. expected: " + options.jwtid));
            }
          }
          if (options.nonce) {
            if (payload.nonce !== options.nonce) {
              return done2(new JsonWebTokenError("jwt nonce invalid. expected: " + options.nonce));
            }
          }
          if (options.maxAge) {
            if (typeof payload.iat !== "number") {
              return done2(new JsonWebTokenError("iat required when maxAge is specified"));
            }
            const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
            if (typeof maxAgeTimestamp === "undefined") {
              return done2(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
            }
            if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
              return done2(new TokenExpiredError("maxAge exceeded", new Date(maxAgeTimestamp * 1e3)));
            }
          }
          if (options.complete === true) {
            const signature = decodedToken.signature;
            return done2(null, {
              header,
              payload,
              signature
            });
          }
          return done2(null, payload);
        });
      };
    }
  });

  // node_modules/lodash.includes/index.js
  var require_lodash = __commonJS({
    "node_modules/lodash.includes/index.js"(exports, module) {
      init_process();
      init_buffer();
      var INFINITY = 1 / 0;
      var MAX_SAFE_INTEGER = 9007199254740991;
      var MAX_INTEGER = 17976931348623157e292;
      var NAN = 0 / 0;
      var argsTag = "[object Arguments]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var freeParseInt = parseInt;
      function arrayMap(array, iteratee) {
        var index = -1, length = array ? array.length : 0, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        if (value !== value) {
          return baseFindIndex(array, baseIsNaN, fromIndex);
        }
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      var objectProto = Object.prototype;
      var hasOwnProperty2 = objectProto.hasOwnProperty;
      var objectToString2 = objectProto.toString;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var nativeKeys = overArg(Object.keys, Object);
      var nativeMax = Math.max;
      function arrayLikeKeys(value, inherited) {
        var result = isArray3(value) || isArguments(value) ? baseTimes(value.length, String) : [];
        var length = result.length, skipIndexes = !!length;
        for (var key in value) {
          if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty2.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function isIndex(value, length) {
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function includes3(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      function isArguments(value) {
        return isArrayLikeObject(value) && hasOwnProperty2.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString2.call(value) == argsTag);
      }
      var isArray3 = Array.isArray;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction2(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isFunction2(value) {
        var tag = isObject2(value) ? objectToString2.call(value) : "";
        return tag == funcTag || tag == genTag;
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject2(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isString2(value) {
        return typeof value == "string" || !isArray3(value) && isObjectLike(value) && objectToString2.call(value) == stringTag;
      }
      function isSymbol2(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString2.call(value) == symbolTag;
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result = toFinite(value), remainder = result % 1;
        return result === result ? remainder ? result - remainder : result : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject2(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function keys2(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function values(object) {
        return object ? baseValues(object, keys2(object)) : [];
      }
      module.exports = includes3;
    }
  });

  // node_modules/lodash.isboolean/index.js
  var require_lodash2 = __commonJS({
    "node_modules/lodash.isboolean/index.js"(exports, module) {
      init_process();
      init_buffer();
      var boolTag = "[object Boolean]";
      var objectProto = Object.prototype;
      var objectToString2 = objectProto.toString;
      function isBoolean2(value) {
        return value === true || value === false || isObjectLike(value) && objectToString2.call(value) == boolTag;
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      module.exports = isBoolean2;
    }
  });

  // node_modules/lodash.isinteger/index.js
  var require_lodash3 = __commonJS({
    "node_modules/lodash.isinteger/index.js"(exports, module) {
      init_process();
      init_buffer();
      var INFINITY = 1 / 0;
      var MAX_INTEGER = 17976931348623157e292;
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var objectProto = Object.prototype;
      var objectToString2 = objectProto.toString;
      function isInteger(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isObject2(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol2(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString2.call(value) == symbolTag;
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result = toFinite(value), remainder = result % 1;
        return result === result ? remainder ? result - remainder : result : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject2(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = isInteger;
    }
  });

  // node_modules/lodash.isnumber/index.js
  var require_lodash4 = __commonJS({
    "node_modules/lodash.isnumber/index.js"(exports, module) {
      init_process();
      init_buffer();
      var numberTag = "[object Number]";
      var objectProto = Object.prototype;
      var objectToString2 = objectProto.toString;
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isNumber2(value) {
        return typeof value == "number" || isObjectLike(value) && objectToString2.call(value) == numberTag;
      }
      module.exports = isNumber2;
    }
  });

  // node_modules/lodash.isplainobject/index.js
  var require_lodash5 = __commonJS({
    "node_modules/lodash.isplainobject/index.js"(exports, module) {
      init_process();
      init_buffer();
      var objectTag = "[object Object]";
      function isHostObject(value) {
        var result = false;
        if (value != null && typeof value.toString != "function") {
          try {
            result = !!(value + "");
          } catch (e) {
          }
        }
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty2 = objectProto.hasOwnProperty;
      var objectCtorString = funcToString.call(Object);
      var objectToString2 = objectProto.toString;
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || objectToString2.call(value) != objectTag || isHostObject(value)) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      module.exports = isPlainObject;
    }
  });

  // node_modules/lodash.isstring/index.js
  var require_lodash6 = __commonJS({
    "node_modules/lodash.isstring/index.js"(exports, module) {
      init_process();
      init_buffer();
      var stringTag = "[object String]";
      var objectProto = Object.prototype;
      var objectToString2 = objectProto.toString;
      var isArray3 = Array.isArray;
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isString2(value) {
        return typeof value == "string" || !isArray3(value) && isObjectLike(value) && objectToString2.call(value) == stringTag;
      }
      module.exports = isString2;
    }
  });

  // node_modules/lodash.once/index.js
  var require_lodash7 = __commonJS({
    "node_modules/lodash.once/index.js"(exports, module) {
      init_process();
      init_buffer();
      var FUNC_ERROR_TEXT = "Expected a function";
      var INFINITY = 1 / 0;
      var MAX_INTEGER = 17976931348623157e292;
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var objectProto = Object.prototype;
      var objectToString2 = objectProto.toString;
      function before(n, func) {
        var result;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n > 0) {
            result = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = void 0;
          }
          return result;
        };
      }
      function once4(func) {
        return before(2, func);
      }
      function isObject2(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol2(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString2.call(value) == symbolTag;
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result = toFinite(value), remainder = result % 1;
        return result === result ? remainder ? result - remainder : result : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject2(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = once4;
    }
  });

  // node_modules/jsonwebtoken/sign.js
  var require_sign = __commonJS({
    "node_modules/jsonwebtoken/sign.js"(exports, module) {
      init_process();
      init_buffer();
      var timespan = require_timespan();
      var PS_SUPPORTED = require_psSupported();
      var validateAsymmetricKey = require_validateAsymmetricKey();
      var jws = require_jws();
      var includes3 = require_lodash();
      var isBoolean2 = require_lodash2();
      var isInteger = require_lodash3();
      var isNumber2 = require_lodash4();
      var isPlainObject = require_lodash5();
      var isString2 = require_lodash6();
      var once4 = require_lodash7();
      var { KeyObject, createSecretKey, createPrivateKey } = require_crypto();
      var SUPPORTED_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
      if (PS_SUPPORTED) {
        SUPPORTED_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
      }
      var sign_options_schema = {
        expiresIn: { isValid: function(value) {
          return isInteger(value) || isString2(value) && value;
        }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
        notBefore: { isValid: function(value) {
          return isInteger(value) || isString2(value) && value;
        }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
        audience: { isValid: function(value) {
          return isString2(value) || Array.isArray(value);
        }, message: '"audience" must be a string or array' },
        algorithm: { isValid: includes3.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
        header: { isValid: isPlainObject, message: '"header" must be an object' },
        encoding: { isValid: isString2, message: '"encoding" must be a string' },
        issuer: { isValid: isString2, message: '"issuer" must be a string' },
        subject: { isValid: isString2, message: '"subject" must be a string' },
        jwtid: { isValid: isString2, message: '"jwtid" must be a string' },
        noTimestamp: { isValid: isBoolean2, message: '"noTimestamp" must be a boolean' },
        keyid: { isValid: isString2, message: '"keyid" must be a string' },
        mutatePayload: { isValid: isBoolean2, message: '"mutatePayload" must be a boolean' },
        allowInsecureKeySizes: { isValid: isBoolean2, message: '"allowInsecureKeySizes" must be a boolean' },
        allowInvalidAsymmetricKeyTypes: { isValid: isBoolean2, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
      };
      var registered_claims_schema = {
        iat: { isValid: isNumber2, message: '"iat" should be a number of seconds' },
        exp: { isValid: isNumber2, message: '"exp" should be a number of seconds' },
        nbf: { isValid: isNumber2, message: '"nbf" should be a number of seconds' }
      };
      function validate(schema, allowUnknown, object, parameterName) {
        if (!isPlainObject(object)) {
          throw new Error('Expected "' + parameterName + '" to be a plain object.');
        }
        Object.keys(object).forEach(function(key) {
          const validator = schema[key];
          if (!validator) {
            if (!allowUnknown) {
              throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
            }
            return;
          }
          if (!validator.isValid(object[key])) {
            throw new Error(validator.message);
          }
        });
      }
      function validateOptions(options) {
        return validate(sign_options_schema, false, options, "options");
      }
      function validatePayload(payload) {
        return validate(registered_claims_schema, true, payload, "payload");
      }
      var options_to_payload = {
        "audience": "aud",
        "issuer": "iss",
        "subject": "sub",
        "jwtid": "jti"
      };
      var options_for_objects = [
        "expiresIn",
        "notBefore",
        "noTimestamp",
        "audience",
        "issuer",
        "subject",
        "jwtid"
      ];
      module.exports = function(payload, secretOrPrivateKey, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else {
          options = options || {};
        }
        const isObjectPayload = typeof payload === "object" && !Buffer2.isBuffer(payload);
        const header = Object.assign({
          alg: options.algorithm || "HS256",
          typ: isObjectPayload ? "JWT" : void 0,
          kid: options.keyid
        }, options.header);
        function failure(err) {
          if (callback) {
            return callback(err);
          }
          throw err;
        }
        if (!secretOrPrivateKey && options.algorithm !== "none") {
          return failure(new Error("secretOrPrivateKey must have a value"));
        }
        if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
          try {
            secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
          } catch (_) {
            try {
              secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === "string" ? Buffer2.from(secretOrPrivateKey) : secretOrPrivateKey);
            } catch (_2) {
              return failure(new Error("secretOrPrivateKey is not valid key material"));
            }
          }
        }
        if (header.alg.startsWith("HS") && secretOrPrivateKey.type !== "secret") {
          return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
        } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
          if (secretOrPrivateKey.type !== "private") {
            return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
          }
          if (!options.allowInsecureKeySizes && !header.alg.startsWith("ES") && secretOrPrivateKey.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
          secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
            return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
          }
        }
        if (typeof payload === "undefined") {
          return failure(new Error("payload is required"));
        } else if (isObjectPayload) {
          try {
            validatePayload(payload);
          } catch (error) {
            return failure(error);
          }
          if (!options.mutatePayload) {
            payload = Object.assign({}, payload);
          }
        } else {
          const invalid_options = options_for_objects.filter(function(opt) {
            return typeof options[opt] !== "undefined";
          });
          if (invalid_options.length > 0) {
            return failure(new Error("invalid " + invalid_options.join(",") + " option for " + typeof payload + " payload"));
          }
        }
        if (typeof payload.exp !== "undefined" && typeof options.expiresIn !== "undefined") {
          return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
        }
        if (typeof payload.nbf !== "undefined" && typeof options.notBefore !== "undefined") {
          return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
        }
        try {
          validateOptions(options);
        } catch (error) {
          return failure(error);
        }
        if (!options.allowInvalidAsymmetricKeyTypes) {
          try {
            validateAsymmetricKey(header.alg, secretOrPrivateKey);
          } catch (error) {
            return failure(error);
          }
        }
        const timestamp2 = payload.iat || Math.floor(Date.now() / 1e3);
        if (options.noTimestamp) {
          delete payload.iat;
        } else if (isObjectPayload) {
          payload.iat = timestamp2;
        }
        if (typeof options.notBefore !== "undefined") {
          try {
            payload.nbf = timespan(options.notBefore, timestamp2);
          } catch (err) {
            return failure(err);
          }
          if (typeof payload.nbf === "undefined") {
            return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
          }
        }
        if (typeof options.expiresIn !== "undefined" && typeof payload === "object") {
          try {
            payload.exp = timespan(options.expiresIn, timestamp2);
          } catch (err) {
            return failure(err);
          }
          if (typeof payload.exp === "undefined") {
            return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
          }
        }
        Object.keys(options_to_payload).forEach(function(key) {
          const claim = options_to_payload[key];
          if (typeof options[key] !== "undefined") {
            if (typeof payload[claim] !== "undefined") {
              return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
            }
            payload[claim] = options[key];
          }
        });
        const encoding = options.encoding || "utf8";
        if (typeof callback === "function") {
          callback = callback && once4(callback);
          jws.createSign({
            header,
            privateKey: secretOrPrivateKey,
            payload,
            encoding
          }).once("error", callback).once("done", function(signature) {
            if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
              return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
            }
            callback(null, signature);
          });
        } else {
          let signature = jws.sign({ header, payload, secret: secretOrPrivateKey, encoding });
          if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
            throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
          }
          return signature;
        }
      };
    }
  });

  // node_modules/jsonwebtoken/index.js
  var require_jsonwebtoken = __commonJS({
    "node_modules/jsonwebtoken/index.js"(exports, module) {
      init_process();
      init_buffer();
      module.exports = {
        decode: require_decode(),
        verify: require_verify(),
        sign: require_sign(),
        JsonWebTokenError: require_JsonWebTokenError(),
        NotBeforeError: require_NotBeforeError(),
        TokenExpiredError: require_TokenExpiredError()
      };
    }
  });

  // node_modules/bcryptjs/dist/bcrypt.js
  var require_bcrypt = __commonJS({
    "node_modules/bcryptjs/dist/bcrypt.js"(exports, module) {
      init_process();
      init_buffer();
      (function(global2, factory) {
        if (typeof define === "function" && define["amd"])
          define([], factory);
        else if (typeof __require === "function" && typeof module === "object" && module && module["exports"])
          module["exports"] = factory();
        else
          (global2["dcodeIO"] = global2["dcodeIO"] || {})["bcrypt"] = factory();
      })(exports, function() {
        "use strict";
        var bcrypt2 = {};
        var randomFallback = null;
        function random(len) {
          if (typeof module !== "undefined" && module && module["exports"])
            try {
              return require_crypto()["randomBytes"](len);
            } catch (e) {
            }
          try {
            var a;
            (self["crypto"] || self["msCrypto"])["getRandomValues"](a = new Uint32Array(len));
            return Array.prototype.slice.call(a);
          } catch (e) {
          }
          if (!randomFallback)
            throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
          return randomFallback(len);
        }
        var randomAvailable = false;
        try {
          random(1);
          randomAvailable = true;
        } catch (e) {
        }
        randomFallback = null;
        bcrypt2.setRandomFallback = function(random2) {
          randomFallback = random2;
        };
        bcrypt2.genSaltSync = function(rounds, seed_length) {
          rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
          if (typeof rounds !== "number")
            throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
          if (rounds < 4)
            rounds = 4;
          else if (rounds > 31)
            rounds = 31;
          var salt = [];
          salt.push("$2a$");
          if (rounds < 10)
            salt.push("0");
          salt.push(rounds.toString());
          salt.push("$");
          salt.push(base64_encode(random(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
          return salt.join("");
        };
        bcrypt2.genSalt = function(rounds, seed_length, callback) {
          if (typeof seed_length === "function")
            callback = seed_length, seed_length = void 0;
          if (typeof rounds === "function")
            callback = rounds, rounds = void 0;
          if (typeof rounds === "undefined")
            rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
          else if (typeof rounds !== "number")
            throw Error("illegal arguments: " + typeof rounds);
          function _async(callback2) {
            nextTick3(function() {
              try {
                callback2(null, bcrypt2.genSaltSync(rounds));
              } catch (err) {
                callback2(err);
              }
            });
          }
          if (callback) {
            if (typeof callback !== "function")
              throw Error("Illegal callback: " + typeof callback);
            _async(callback);
          } else
            return new Promise(function(resolve, reject) {
              _async(function(err, res) {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(res);
              });
            });
        };
        bcrypt2.hashSync = function(s, salt) {
          if (typeof salt === "undefined")
            salt = GENSALT_DEFAULT_LOG2_ROUNDS;
          if (typeof salt === "number")
            salt = bcrypt2.genSaltSync(salt);
          if (typeof s !== "string" || typeof salt !== "string")
            throw Error("Illegal arguments: " + typeof s + ", " + typeof salt);
          return _hash(s, salt);
        };
        bcrypt2.hash = function(s, salt, callback, progressCallback) {
          function _async(callback2) {
            if (typeof s === "string" && typeof salt === "number")
              bcrypt2.genSalt(salt, function(err, salt2) {
                _hash(s, salt2, callback2, progressCallback);
              });
            else if (typeof s === "string" && typeof salt === "string")
              _hash(s, salt, callback2, progressCallback);
            else
              nextTick3(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof salt)));
          }
          if (callback) {
            if (typeof callback !== "function")
              throw Error("Illegal callback: " + typeof callback);
            _async(callback);
          } else
            return new Promise(function(resolve, reject) {
              _async(function(err, res) {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(res);
              });
            });
        };
        function safeStringCompare(known, unknown) {
          var right = 0, wrong = 0;
          for (var i = 0, k = known.length; i < k; ++i) {
            if (known.charCodeAt(i) === unknown.charCodeAt(i))
              ++right;
            else
              ++wrong;
          }
          if (right < 0)
            return false;
          return wrong === 0;
        }
        bcrypt2.compareSync = function(s, hash) {
          if (typeof s !== "string" || typeof hash !== "string")
            throw Error("Illegal arguments: " + typeof s + ", " + typeof hash);
          if (hash.length !== 60)
            return false;
          return safeStringCompare(bcrypt2.hashSync(s, hash.substr(0, hash.length - 31)), hash);
        };
        bcrypt2.compare = function(s, hash, callback, progressCallback) {
          function _async(callback2) {
            if (typeof s !== "string" || typeof hash !== "string") {
              nextTick3(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof hash)));
              return;
            }
            if (hash.length !== 60) {
              nextTick3(callback2.bind(this, null, false));
              return;
            }
            bcrypt2.hash(s, hash.substr(0, 29), function(err, comp) {
              if (err)
                callback2(err);
              else
                callback2(null, safeStringCompare(comp, hash));
            }, progressCallback);
          }
          if (callback) {
            if (typeof callback !== "function")
              throw Error("Illegal callback: " + typeof callback);
            _async(callback);
          } else
            return new Promise(function(resolve, reject) {
              _async(function(err, res) {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(res);
              });
            });
        };
        bcrypt2.getRounds = function(hash) {
          if (typeof hash !== "string")
            throw Error("Illegal arguments: " + typeof hash);
          return parseInt(hash.split("$")[2], 10);
        };
        bcrypt2.getSalt = function(hash) {
          if (typeof hash !== "string")
            throw Error("Illegal arguments: " + typeof hash);
          if (hash.length !== 60)
            throw Error("Illegal hash length: " + hash.length + " != 60");
          return hash.substring(0, 29);
        };
        var nextTick3 = typeof process !== "undefined" && process && typeof process.nextTick === "function" ? typeof setImmediate === "function" ? setImmediate : process.nextTick : setTimeout;
        function stringToBytes(str) {
          var out = [], i = 0;
          utfx.encodeUTF16toUTF8(function() {
            if (i >= str.length)
              return null;
            return str.charCodeAt(i++);
          }, function(b) {
            out.push(b);
          });
          return out;
        }
        var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
        var BASE64_INDEX = [
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          0,
          1,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          63,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          -1,
          -1,
          -1,
          -1,
          -1
        ];
        var stringFromCharCode = String.fromCharCode;
        function base64_encode(b, len) {
          var off3 = 0, rs = [], c1, c2;
          if (len <= 0 || len > b.length)
            throw Error("Illegal len: " + len);
          while (off3 < len) {
            c1 = b[off3++] & 255;
            rs.push(BASE64_CODE[c1 >> 2 & 63]);
            c1 = (c1 & 3) << 4;
            if (off3 >= len) {
              rs.push(BASE64_CODE[c1 & 63]);
              break;
            }
            c2 = b[off3++] & 255;
            c1 |= c2 >> 4 & 15;
            rs.push(BASE64_CODE[c1 & 63]);
            c1 = (c2 & 15) << 2;
            if (off3 >= len) {
              rs.push(BASE64_CODE[c1 & 63]);
              break;
            }
            c2 = b[off3++] & 255;
            c1 |= c2 >> 6 & 3;
            rs.push(BASE64_CODE[c1 & 63]);
            rs.push(BASE64_CODE[c2 & 63]);
          }
          return rs.join("");
        }
        function base64_decode(s, len) {
          var off3 = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o2, code;
          if (len <= 0)
            throw Error("Illegal len: " + len);
          while (off3 < slen - 1 && olen < len) {
            code = s.charCodeAt(off3++);
            c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            code = s.charCodeAt(off3++);
            c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            if (c1 == -1 || c2 == -1)
              break;
            o2 = c1 << 2 >>> 0;
            o2 |= (c2 & 48) >> 4;
            rs.push(stringFromCharCode(o2));
            if (++olen >= len || off3 >= slen)
              break;
            code = s.charCodeAt(off3++);
            c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            if (c3 == -1)
              break;
            o2 = (c2 & 15) << 4 >>> 0;
            o2 |= (c3 & 60) >> 2;
            rs.push(stringFromCharCode(o2));
            if (++olen >= len || off3 >= slen)
              break;
            code = s.charCodeAt(off3++);
            c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
            o2 = (c3 & 3) << 6 >>> 0;
            o2 |= c4;
            rs.push(stringFromCharCode(o2));
            ++olen;
          }
          var res = [];
          for (off3 = 0; off3 < olen; off3++)
            res.push(rs[off3].charCodeAt(0));
          return res;
        }
        var utfx = function() {
          "use strict";
          var utfx2 = {};
          utfx2.MAX_CODEPOINT = 1114111;
          utfx2.encodeUTF8 = function(src, dst) {
            var cp = null;
            if (typeof src === "number")
              cp = src, src = function() {
                return null;
              };
            while (cp !== null || (cp = src()) !== null) {
              if (cp < 128)
                dst(cp & 127);
              else if (cp < 2048)
                dst(cp >> 6 & 31 | 192), dst(cp & 63 | 128);
              else if (cp < 65536)
                dst(cp >> 12 & 15 | 224), dst(cp >> 6 & 63 | 128), dst(cp & 63 | 128);
              else
                dst(cp >> 18 & 7 | 240), dst(cp >> 12 & 63 | 128), dst(cp >> 6 & 63 | 128), dst(cp & 63 | 128);
              cp = null;
            }
          };
          utfx2.decodeUTF8 = function(src, dst) {
            var a, b, c, d, fail = function(b2) {
              b2 = b2.slice(0, b2.indexOf(null));
              var err = Error(b2.toString());
              err.name = "TruncatedError";
              err["bytes"] = b2;
              throw err;
            };
            while ((a = src()) !== null) {
              if ((a & 128) === 0)
                dst(a);
              else if ((a & 224) === 192)
                (b = src()) === null && fail([a, b]), dst((a & 31) << 6 | b & 63);
              else if ((a & 240) === 224)
                ((b = src()) === null || (c = src()) === null) && fail([a, b, c]), dst((a & 15) << 12 | (b & 63) << 6 | c & 63);
              else if ((a & 248) === 240)
                ((b = src()) === null || (c = src()) === null || (d = src()) === null) && fail([a, b, c, d]), dst((a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63);
              else
                throw RangeError("Illegal starting byte: " + a);
            }
          };
          utfx2.UTF16toUTF8 = function(src, dst) {
            var c1, c2 = null;
            while (true) {
              if ((c1 = c2 !== null ? c2 : src()) === null)
                break;
              if (c1 >= 55296 && c1 <= 57343) {
                if ((c2 = src()) !== null) {
                  if (c2 >= 56320 && c2 <= 57343) {
                    dst((c1 - 55296) * 1024 + c2 - 56320 + 65536);
                    c2 = null;
                    continue;
                  }
                }
              }
              dst(c1);
            }
            if (c2 !== null)
              dst(c2);
          };
          utfx2.UTF8toUTF16 = function(src, dst) {
            var cp = null;
            if (typeof src === "number")
              cp = src, src = function() {
                return null;
              };
            while (cp !== null || (cp = src()) !== null) {
              if (cp <= 65535)
                dst(cp);
              else
                cp -= 65536, dst((cp >> 10) + 55296), dst(cp % 1024 + 56320);
              cp = null;
            }
          };
          utfx2.encodeUTF16toUTF8 = function(src, dst) {
            utfx2.UTF16toUTF8(src, function(cp) {
              utfx2.encodeUTF8(cp, dst);
            });
          };
          utfx2.decodeUTF8toUTF16 = function(src, dst) {
            utfx2.decodeUTF8(src, function(cp) {
              utfx2.UTF8toUTF16(cp, dst);
            });
          };
          utfx2.calculateCodePoint = function(cp) {
            return cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
          };
          utfx2.calculateUTF8 = function(src) {
            var cp, l = 0;
            while ((cp = src()) !== null)
              l += utfx2.calculateCodePoint(cp);
            return l;
          };
          utfx2.calculateUTF16asUTF8 = function(src) {
            var n = 0, l = 0;
            utfx2.UTF16toUTF8(src, function(cp) {
              ++n;
              l += utfx2.calculateCodePoint(cp);
            });
            return [n, l];
          };
          return utfx2;
        }();
        Date.now = Date.now || function() {
          return +/* @__PURE__ */ new Date();
        };
        var BCRYPT_SALT_LEN = 16;
        var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
        var BLOWFISH_NUM_ROUNDS = 16;
        var MAX_EXECUTION_TIME = 100;
        var P_ORIG = [
          608135816,
          2242054355,
          320440878,
          57701188,
          2752067618,
          698298832,
          137296536,
          3964562569,
          1160258022,
          953160567,
          3193202383,
          887688300,
          3232508343,
          3380367581,
          1065670069,
          3041331479,
          2450970073,
          2306472731
        ];
        var S_ORIG = [
          3509652390,
          2564797868,
          805139163,
          3491422135,
          3101798381,
          1780907670,
          3128725573,
          4046225305,
          614570311,
          3012652279,
          134345442,
          2240740374,
          1667834072,
          1901547113,
          2757295779,
          4103290238,
          227898511,
          1921955416,
          1904987480,
          2182433518,
          2069144605,
          3260701109,
          2620446009,
          720527379,
          3318853667,
          677414384,
          3393288472,
          3101374703,
          2390351024,
          1614419982,
          1822297739,
          2954791486,
          3608508353,
          3174124327,
          2024746970,
          1432378464,
          3864339955,
          2857741204,
          1464375394,
          1676153920,
          1439316330,
          715854006,
          3033291828,
          289532110,
          2706671279,
          2087905683,
          3018724369,
          1668267050,
          732546397,
          1947742710,
          3462151702,
          2609353502,
          2950085171,
          1814351708,
          2050118529,
          680887927,
          999245976,
          1800124847,
          3300911131,
          1713906067,
          1641548236,
          4213287313,
          1216130144,
          1575780402,
          4018429277,
          3917837745,
          3693486850,
          3949271944,
          596196993,
          3549867205,
          258830323,
          2213823033,
          772490370,
          2760122372,
          1774776394,
          2652871518,
          566650946,
          4142492826,
          1728879713,
          2882767088,
          1783734482,
          3629395816,
          2517608232,
          2874225571,
          1861159788,
          326777828,
          3124490320,
          2130389656,
          2716951837,
          967770486,
          1724537150,
          2185432712,
          2364442137,
          1164943284,
          2105845187,
          998989502,
          3765401048,
          2244026483,
          1075463327,
          1455516326,
          1322494562,
          910128902,
          469688178,
          1117454909,
          936433444,
          3490320968,
          3675253459,
          1240580251,
          122909385,
          2157517691,
          634681816,
          4142456567,
          3825094682,
          3061402683,
          2540495037,
          79693498,
          3249098678,
          1084186820,
          1583128258,
          426386531,
          1761308591,
          1047286709,
          322548459,
          995290223,
          1845252383,
          2603652396,
          3431023940,
          2942221577,
          3202600964,
          3727903485,
          1712269319,
          422464435,
          3234572375,
          1170764815,
          3523960633,
          3117677531,
          1434042557,
          442511882,
          3600875718,
          1076654713,
          1738483198,
          4213154764,
          2393238008,
          3677496056,
          1014306527,
          4251020053,
          793779912,
          2902807211,
          842905082,
          4246964064,
          1395751752,
          1040244610,
          2656851899,
          3396308128,
          445077038,
          3742853595,
          3577915638,
          679411651,
          2892444358,
          2354009459,
          1767581616,
          3150600392,
          3791627101,
          3102740896,
          284835224,
          4246832056,
          1258075500,
          768725851,
          2589189241,
          3069724005,
          3532540348,
          1274779536,
          3789419226,
          2764799539,
          1660621633,
          3471099624,
          4011903706,
          913787905,
          3497959166,
          737222580,
          2514213453,
          2928710040,
          3937242737,
          1804850592,
          3499020752,
          2949064160,
          2386320175,
          2390070455,
          2415321851,
          4061277028,
          2290661394,
          2416832540,
          1336762016,
          1754252060,
          3520065937,
          3014181293,
          791618072,
          3188594551,
          3933548030,
          2332172193,
          3852520463,
          3043980520,
          413987798,
          3465142937,
          3030929376,
          4245938359,
          2093235073,
          3534596313,
          375366246,
          2157278981,
          2479649556,
          555357303,
          3870105701,
          2008414854,
          3344188149,
          4221384143,
          3956125452,
          2067696032,
          3594591187,
          2921233993,
          2428461,
          544322398,
          577241275,
          1471733935,
          610547355,
          4027169054,
          1432588573,
          1507829418,
          2025931657,
          3646575487,
          545086370,
          48609733,
          2200306550,
          1653985193,
          298326376,
          1316178497,
          3007786442,
          2064951626,
          458293330,
          2589141269,
          3591329599,
          3164325604,
          727753846,
          2179363840,
          146436021,
          1461446943,
          4069977195,
          705550613,
          3059967265,
          3887724982,
          4281599278,
          3313849956,
          1404054877,
          2845806497,
          146425753,
          1854211946,
          1266315497,
          3048417604,
          3681880366,
          3289982499,
          290971e4,
          1235738493,
          2632868024,
          2414719590,
          3970600049,
          1771706367,
          1449415276,
          3266420449,
          422970021,
          1963543593,
          2690192192,
          3826793022,
          1062508698,
          1531092325,
          1804592342,
          2583117782,
          2714934279,
          4024971509,
          1294809318,
          4028980673,
          1289560198,
          2221992742,
          1669523910,
          35572830,
          157838143,
          1052438473,
          1016535060,
          1802137761,
          1753167236,
          1386275462,
          3080475397,
          2857371447,
          1040679964,
          2145300060,
          2390574316,
          1461121720,
          2956646967,
          4031777805,
          4028374788,
          33600511,
          2920084762,
          1018524850,
          629373528,
          3691585981,
          3515945977,
          2091462646,
          2486323059,
          586499841,
          988145025,
          935516892,
          3367335476,
          2599673255,
          2839830854,
          265290510,
          3972581182,
          2759138881,
          3795373465,
          1005194799,
          847297441,
          406762289,
          1314163512,
          1332590856,
          1866599683,
          4127851711,
          750260880,
          613907577,
          1450815602,
          3165620655,
          3734664991,
          3650291728,
          3012275730,
          3704569646,
          1427272223,
          778793252,
          1343938022,
          2676280711,
          2052605720,
          1946737175,
          3164576444,
          3914038668,
          3967478842,
          3682934266,
          1661551462,
          3294938066,
          4011595847,
          840292616,
          3712170807,
          616741398,
          312560963,
          711312465,
          1351876610,
          322626781,
          1910503582,
          271666773,
          2175563734,
          1594956187,
          70604529,
          3617834859,
          1007753275,
          1495573769,
          4069517037,
          2549218298,
          2663038764,
          504708206,
          2263041392,
          3941167025,
          2249088522,
          1514023603,
          1998579484,
          1312622330,
          694541497,
          2582060303,
          2151582166,
          1382467621,
          776784248,
          2618340202,
          3323268794,
          2497899128,
          2784771155,
          503983604,
          4076293799,
          907881277,
          423175695,
          432175456,
          1378068232,
          4145222326,
          3954048622,
          3938656102,
          3820766613,
          2793130115,
          2977904593,
          26017576,
          3274890735,
          3194772133,
          1700274565,
          1756076034,
          4006520079,
          3677328699,
          720338349,
          1533947780,
          354530856,
          688349552,
          3973924725,
          1637815568,
          332179504,
          3949051286,
          53804574,
          2852348879,
          3044236432,
          1282449977,
          3583942155,
          3416972820,
          4006381244,
          1617046695,
          2628476075,
          3002303598,
          1686838959,
          431878346,
          2686675385,
          1700445008,
          1080580658,
          1009431731,
          832498133,
          3223435511,
          2605976345,
          2271191193,
          2516031870,
          1648197032,
          4164389018,
          2548247927,
          300782431,
          375919233,
          238389289,
          3353747414,
          2531188641,
          2019080857,
          1475708069,
          455242339,
          2609103871,
          448939670,
          3451063019,
          1395535956,
          2413381860,
          1841049896,
          1491858159,
          885456874,
          4264095073,
          4001119347,
          1565136089,
          3898914787,
          1108368660,
          540939232,
          1173283510,
          2745871338,
          3681308437,
          4207628240,
          3343053890,
          4016749493,
          1699691293,
          1103962373,
          3625875870,
          2256883143,
          3830138730,
          1031889488,
          3479347698,
          1535977030,
          4236805024,
          3251091107,
          2132092099,
          1774941330,
          1199868427,
          1452454533,
          157007616,
          2904115357,
          342012276,
          595725824,
          1480756522,
          206960106,
          497939518,
          591360097,
          863170706,
          2375253569,
          3596610801,
          1814182875,
          2094937945,
          3421402208,
          1082520231,
          3463918190,
          2785509508,
          435703966,
          3908032597,
          1641649973,
          2842273706,
          3305899714,
          1510255612,
          2148256476,
          2655287854,
          3276092548,
          4258621189,
          236887753,
          3681803219,
          274041037,
          1734335097,
          3815195456,
          3317970021,
          1899903192,
          1026095262,
          4050517792,
          356393447,
          2410691914,
          3873677099,
          3682840055,
          3913112168,
          2491498743,
          4132185628,
          2489919796,
          1091903735,
          1979897079,
          3170134830,
          3567386728,
          3557303409,
          857797738,
          1136121015,
          1342202287,
          507115054,
          2535736646,
          337727348,
          3213592640,
          1301675037,
          2528481711,
          1895095763,
          1721773893,
          3216771564,
          62756741,
          2142006736,
          835421444,
          2531993523,
          1442658625,
          3659876326,
          2882144922,
          676362277,
          1392781812,
          170690266,
          3921047035,
          1759253602,
          3611846912,
          1745797284,
          664899054,
          1329594018,
          3901205900,
          3045908486,
          2062866102,
          2865634940,
          3543621612,
          3464012697,
          1080764994,
          553557557,
          3656615353,
          3996768171,
          991055499,
          499776247,
          1265440854,
          648242737,
          3940784050,
          980351604,
          3713745714,
          1749149687,
          3396870395,
          4211799374,
          3640570775,
          1161844396,
          3125318951,
          1431517754,
          545492359,
          4268468663,
          3499529547,
          1437099964,
          2702547544,
          3433638243,
          2581715763,
          2787789398,
          1060185593,
          1593081372,
          2418618748,
          4260947970,
          69676912,
          2159744348,
          86519011,
          2512459080,
          3838209314,
          1220612927,
          3339683548,
          133810670,
          1090789135,
          1078426020,
          1569222167,
          845107691,
          3583754449,
          4072456591,
          1091646820,
          628848692,
          1613405280,
          3757631651,
          526609435,
          236106946,
          48312990,
          2942717905,
          3402727701,
          1797494240,
          859738849,
          992217954,
          4005476642,
          2243076622,
          3870952857,
          3732016268,
          765654824,
          3490871365,
          2511836413,
          1685915746,
          3888969200,
          1414112111,
          2273134842,
          3281911079,
          4080962846,
          172450625,
          2569994100,
          980381355,
          4109958455,
          2819808352,
          2716589560,
          2568741196,
          3681446669,
          3329971472,
          1835478071,
          660984891,
          3704678404,
          4045999559,
          3422617507,
          3040415634,
          1762651403,
          1719377915,
          3470491036,
          2693910283,
          3642056355,
          3138596744,
          1364962596,
          2073328063,
          1983633131,
          926494387,
          3423689081,
          2150032023,
          4096667949,
          1749200295,
          3328846651,
          309677260,
          2016342300,
          1779581495,
          3079819751,
          111262694,
          1274766160,
          443224088,
          298511866,
          1025883608,
          3806446537,
          1145181785,
          168956806,
          3641502830,
          3584813610,
          1689216846,
          3666258015,
          3200248200,
          1692713982,
          2646376535,
          4042768518,
          1618508792,
          1610833997,
          3523052358,
          4130873264,
          2001055236,
          3610705100,
          2202168115,
          4028541809,
          2961195399,
          1006657119,
          2006996926,
          3186142756,
          1430667929,
          3210227297,
          1314452623,
          4074634658,
          4101304120,
          2273951170,
          1399257539,
          3367210612,
          3027628629,
          1190975929,
          2062231137,
          2333990788,
          2221543033,
          2438960610,
          1181637006,
          548689776,
          2362791313,
          3372408396,
          3104550113,
          3145860560,
          296247880,
          1970579870,
          3078560182,
          3769228297,
          1714227617,
          3291629107,
          3898220290,
          166772364,
          1251581989,
          493813264,
          448347421,
          195405023,
          2709975567,
          677966185,
          3703036547,
          1463355134,
          2715995803,
          1338867538,
          1343315457,
          2802222074,
          2684532164,
          233230375,
          2599980071,
          2000651841,
          3277868038,
          1638401717,
          4028070440,
          3237316320,
          6314154,
          819756386,
          300326615,
          590932579,
          1405279636,
          3267499572,
          3150704214,
          2428286686,
          3959192993,
          3461946742,
          1862657033,
          1266418056,
          963775037,
          2089974820,
          2263052895,
          1917689273,
          448879540,
          3550394620,
          3981727096,
          150775221,
          3627908307,
          1303187396,
          508620638,
          2975983352,
          2726630617,
          1817252668,
          1876281319,
          1457606340,
          908771278,
          3720792119,
          3617206836,
          2455994898,
          1729034894,
          1080033504,
          976866871,
          3556439503,
          2881648439,
          1522871579,
          1555064734,
          1336096578,
          3548522304,
          2579274686,
          3574697629,
          3205460757,
          3593280638,
          3338716283,
          3079412587,
          564236357,
          2993598910,
          1781952180,
          1464380207,
          3163844217,
          3332601554,
          1699332808,
          1393555694,
          1183702653,
          3581086237,
          1288719814,
          691649499,
          2847557200,
          2895455976,
          3193889540,
          2717570544,
          1781354906,
          1676643554,
          2592534050,
          3230253752,
          1126444790,
          2770207658,
          2633158820,
          2210423226,
          2615765581,
          2414155088,
          3127139286,
          673620729,
          2805611233,
          1269405062,
          4015350505,
          3341807571,
          4149409754,
          1057255273,
          2012875353,
          2162469141,
          2276492801,
          2601117357,
          993977747,
          3918593370,
          2654263191,
          753973209,
          36408145,
          2530585658,
          25011837,
          3520020182,
          2088578344,
          530523599,
          2918365339,
          1524020338,
          1518925132,
          3760827505,
          3759777254,
          1202760957,
          3985898139,
          3906192525,
          674977740,
          4174734889,
          2031300136,
          2019492241,
          3983892565,
          4153806404,
          3822280332,
          352677332,
          2297720250,
          60907813,
          90501309,
          3286998549,
          1016092578,
          2535922412,
          2839152426,
          457141659,
          509813237,
          4120667899,
          652014361,
          1966332200,
          2975202805,
          55981186,
          2327461051,
          676427537,
          3255491064,
          2882294119,
          3433927263,
          1307055953,
          942726286,
          933058658,
          2468411793,
          3933900994,
          4215176142,
          1361170020,
          2001714738,
          2830558078,
          3274259782,
          1222529897,
          1679025792,
          2729314320,
          3714953764,
          1770335741,
          151462246,
          3013232138,
          1682292957,
          1483529935,
          471910574,
          1539241949,
          458788160,
          3436315007,
          1807016891,
          3718408830,
          978976581,
          1043663428,
          3165965781,
          1927990952,
          4200891579,
          2372276910,
          3208408903,
          3533431907,
          1412390302,
          2931980059,
          4132332400,
          1947078029,
          3881505623,
          4168226417,
          2941484381,
          1077988104,
          1320477388,
          886195818,
          18198404,
          3786409e3,
          2509781533,
          112762804,
          3463356488,
          1866414978,
          891333506,
          18488651,
          661792760,
          1628790961,
          3885187036,
          3141171499,
          876946877,
          2693282273,
          1372485963,
          791857591,
          2686433993,
          3759982718,
          3167212022,
          3472953795,
          2716379847,
          445679433,
          3561995674,
          3504004811,
          3574258232,
          54117162,
          3331405415,
          2381918588,
          3769707343,
          4154350007,
          1140177722,
          4074052095,
          668550556,
          3214352940,
          367459370,
          261225585,
          2610173221,
          4209349473,
          3468074219,
          3265815641,
          314222801,
          3066103646,
          3808782860,
          282218597,
          3406013506,
          3773591054,
          379116347,
          1285071038,
          846784868,
          2669647154,
          3771962079,
          3550491691,
          2305946142,
          453669953,
          1268987020,
          3317592352,
          3279303384,
          3744833421,
          2610507566,
          3859509063,
          266596637,
          3847019092,
          517658769,
          3462560207,
          3443424879,
          370717030,
          4247526661,
          2224018117,
          4143653529,
          4112773975,
          2788324899,
          2477274417,
          1456262402,
          2901442914,
          1517677493,
          1846949527,
          2295493580,
          3734397586,
          2176403920,
          1280348187,
          1908823572,
          3871786941,
          846861322,
          1172426758,
          3287448474,
          3383383037,
          1655181056,
          3139813346,
          901632758,
          1897031941,
          2986607138,
          3066810236,
          3447102507,
          1393639104,
          373351379,
          950779232,
          625454576,
          3124240540,
          4148612726,
          2007998917,
          544563296,
          2244738638,
          2330496472,
          2058025392,
          1291430526,
          424198748,
          50039436,
          29584100,
          3605783033,
          2429876329,
          2791104160,
          1057563949,
          3255363231,
          3075367218,
          3463963227,
          1469046755,
          985887462
        ];
        var C_ORIG = [
          1332899944,
          1700884034,
          1701343084,
          1684370003,
          1668446532,
          1869963892
        ];
        function _encipher(lr, off3, P, S) {
          var n, l = lr[off3], r2 = lr[off3 + 1];
          l ^= P[0];
          n = S[l >>> 24];
          n += S[256 | l >> 16 & 255];
          n ^= S[512 | l >> 8 & 255];
          n += S[768 | l & 255];
          r2 ^= n ^ P[1];
          n = S[r2 >>> 24];
          n += S[256 | r2 >> 16 & 255];
          n ^= S[512 | r2 >> 8 & 255];
          n += S[768 | r2 & 255];
          l ^= n ^ P[2];
          n = S[l >>> 24];
          n += S[256 | l >> 16 & 255];
          n ^= S[512 | l >> 8 & 255];
          n += S[768 | l & 255];
          r2 ^= n ^ P[3];
          n = S[r2 >>> 24];
          n += S[256 | r2 >> 16 & 255];
          n ^= S[512 | r2 >> 8 & 255];
          n += S[768 | r2 & 255];
          l ^= n ^ P[4];
          n = S[l >>> 24];
          n += S[256 | l >> 16 & 255];
          n ^= S[512 | l >> 8 & 255];
          n += S[768 | l & 255];
          r2 ^= n ^ P[5];
          n = S[r2 >>> 24];
          n += S[256 | r2 >> 16 & 255];
          n ^= S[512 | r2 >> 8 & 255];
          n += S[768 | r2 & 255];
          l ^= n ^ P[6];
          n = S[l >>> 24];
          n += S[256 | l >> 16 & 255];
          n ^= S[512 | l >> 8 & 255];
          n += S[768 | l & 255];
          r2 ^= n ^ P[7];
          n = S[r2 >>> 24];
          n += S[256 | r2 >> 16 & 255];
          n ^= S[512 | r2 >> 8 & 255];
          n += S[768 | r2 & 255];
          l ^= n ^ P[8];
          n = S[l >>> 24];
          n += S[256 | l >> 16 & 255];
          n ^= S[512 | l >> 8 & 255];
          n += S[768 | l & 255];
          r2 ^= n ^ P[9];
          n = S[r2 >>> 24];
          n += S[256 | r2 >> 16 & 255];
          n ^= S[512 | r2 >> 8 & 255];
          n += S[768 | r2 & 255];
          l ^= n ^ P[10];
          n = S[l >>> 24];
          n += S[256 | l >> 16 & 255];
          n ^= S[512 | l >> 8 & 255];
          n += S[768 | l & 255];
          r2 ^= n ^ P[11];
          n = S[r2 >>> 24];
          n += S[256 | r2 >> 16 & 255];
          n ^= S[512 | r2 >> 8 & 255];
          n += S[768 | r2 & 255];
          l ^= n ^ P[12];
          n = S[l >>> 24];
          n += S[256 | l >> 16 & 255];
          n ^= S[512 | l >> 8 & 255];
          n += S[768 | l & 255];
          r2 ^= n ^ P[13];
          n = S[r2 >>> 24];
          n += S[256 | r2 >> 16 & 255];
          n ^= S[512 | r2 >> 8 & 255];
          n += S[768 | r2 & 255];
          l ^= n ^ P[14];
          n = S[l >>> 24];
          n += S[256 | l >> 16 & 255];
          n ^= S[512 | l >> 8 & 255];
          n += S[768 | l & 255];
          r2 ^= n ^ P[15];
          n = S[r2 >>> 24];
          n += S[256 | r2 >> 16 & 255];
          n ^= S[512 | r2 >> 8 & 255];
          n += S[768 | r2 & 255];
          l ^= n ^ P[16];
          lr[off3] = r2 ^ P[BLOWFISH_NUM_ROUNDS + 1];
          lr[off3 + 1] = l;
          return lr;
        }
        function _streamtoword(data, offp) {
          for (var i = 0, word = 0; i < 4; ++i)
            word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
          return { key: word, offp };
        }
        function _key(key, P, S) {
          var offset = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
          for (var i = 0; i < plen; i++)
            sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
          for (i = 0; i < plen; i += 2)
            lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
          for (i = 0; i < slen; i += 2)
            lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
        }
        function _ekskey(data, key, P, S) {
          var offp = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
          for (var i = 0; i < plen; i++)
            sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
          offp = 0;
          for (i = 0; i < plen; i += 2)
            sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
          for (i = 0; i < slen; i += 2)
            sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
        }
        function _crypt(b, salt, rounds, callback, progressCallback) {
          var cdata = C_ORIG.slice(), clen = cdata.length, err;
          if (rounds < 4 || rounds > 31) {
            err = Error("Illegal number of rounds (4-31): " + rounds);
            if (callback) {
              nextTick3(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          if (salt.length !== BCRYPT_SALT_LEN) {
            err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
            if (callback) {
              nextTick3(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          rounds = 1 << rounds >>> 0;
          var P, S, i = 0, j;
          if (Int32Array) {
            P = new Int32Array(P_ORIG);
            S = new Int32Array(S_ORIG);
          } else {
            P = P_ORIG.slice();
            S = S_ORIG.slice();
          }
          _ekskey(salt, b, P, S);
          function next() {
            if (progressCallback)
              progressCallback(i / rounds);
            if (i < rounds) {
              var start = Date.now();
              for (; i < rounds; ) {
                i = i + 1;
                _key(b, P, S);
                _key(salt, P, S);
                if (Date.now() - start > MAX_EXECUTION_TIME)
                  break;
              }
            } else {
              for (i = 0; i < 64; i++)
                for (j = 0; j < clen >> 1; j++)
                  _encipher(cdata, j << 1, P, S);
              var ret = [];
              for (i = 0; i < clen; i++)
                ret.push((cdata[i] >> 24 & 255) >>> 0), ret.push((cdata[i] >> 16 & 255) >>> 0), ret.push((cdata[i] >> 8 & 255) >>> 0), ret.push((cdata[i] & 255) >>> 0);
              if (callback) {
                callback(null, ret);
                return;
              } else
                return ret;
            }
            if (callback)
              nextTick3(next);
          }
          if (typeof callback !== "undefined") {
            next();
          } else {
            var res;
            while (true)
              if (typeof (res = next()) !== "undefined")
                return res || [];
          }
        }
        function _hash(s, salt, callback, progressCallback) {
          var err;
          if (typeof s !== "string" || typeof salt !== "string") {
            err = Error("Invalid string / salt: Not a string");
            if (callback) {
              nextTick3(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          var minor, offset;
          if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
            err = Error("Invalid salt version: " + salt.substring(0, 2));
            if (callback) {
              nextTick3(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          if (salt.charAt(2) === "$")
            minor = String.fromCharCode(0), offset = 3;
          else {
            minor = salt.charAt(2);
            if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
              err = Error("Invalid salt revision: " + salt.substring(2, 4));
              if (callback) {
                nextTick3(callback.bind(this, err));
                return;
              } else
                throw err;
            }
            offset = 4;
          }
          if (salt.charAt(offset + 2) > "$") {
            err = Error("Missing salt rounds");
            if (callback) {
              nextTick3(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
          s += minor >= "a" ? "\0" : "";
          var passwordb = stringToBytes(s), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
          function finish(bytes) {
            var res = [];
            res.push("$2");
            if (minor >= "a")
              res.push(minor);
            res.push("$");
            if (rounds < 10)
              res.push("0");
            res.push(rounds.toString());
            res.push("$");
            res.push(base64_encode(saltb, saltb.length));
            res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
            return res.join("");
          }
          if (typeof callback == "undefined")
            return finish(_crypt(passwordb, saltb, rounds));
          else {
            _crypt(passwordb, saltb, rounds, function(err2, bytes) {
              if (err2)
                callback(err2, null);
              else
                callback(null, finish(bytes));
            }, progressCallback);
          }
        }
        bcrypt2.encodeBase64 = base64_encode;
        bcrypt2.decodeBase64 = base64_decode;
        return bcrypt2;
      });
    }
  });

  // src/index.js
  init_process();
  init_buffer();

  // node_modules/itty-router/index.mjs
  init_process();
  init_buffer();
  var t = ({ base: e = "", routes: t2 = [], ...r2 } = {}) => ({ __proto__: new Proxy({}, { get: (r3, o2, a, s) => (r4, ...c) => t2.push([o2.toUpperCase?.(), RegExp(`^${(s = (e + r4).replace(/\/+(\/|$)/g, "$1")).replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`), c, s]) && a }), routes: t2, ...r2, async fetch(e2, ...o2) {
    let a, s, c = new URL(e2.url), n = e2.query = { __proto__: null };
    for (let [e3, t3] of c.searchParams)
      n[e3] = n[e3] ? [].concat(n[e3], t3) : t3;
    e:
      try {
        for (let t3 of r2.before || [])
          if (null != (a = await t3(e2.proxy ?? e2, ...o2)))
            break e;
        t:
          for (let [r3, n2, l, i] of t2)
            if ((r3 == e2.method || "ALL" == r3) && (s = c.pathname.match(n2))) {
              e2.params = s.groups || {}, e2.route = i;
              for (let t3 of l)
                if (null != (a = await t3(e2.proxy ?? e2, ...o2)))
                  break t;
            }
      } catch (t3) {
        if (!r2.catch)
          throw t3;
        a = await r2.catch(t3, e2.proxy ?? e2, ...o2);
      }
    try {
      for (let t3 of r2.finally || [])
        a = await t3(a, e2.proxy ?? e2, ...o2) ?? a;
    } catch (t3) {
      if (!r2.catch)
        throw t3;
      a = await r2.catch(t3, e2.proxy ?? e2, ...o2);
    }
    return a;
  } });
  var r = (e = "text/plain; charset=utf-8", t2) => (r2, o2 = {}) => {
    if (void 0 === r2 || r2 instanceof Response)
      return r2;
    const a = new Response(t2?.(r2) ?? r2, o2.url ? void 0 : o2);
    return a.headers.set("content-type", e), a;
  };
  var o = r("application/json; charset=utf-8", JSON.stringify);
  var p = r("text/plain; charset=utf-8", String);
  var f = r("text/html");
  var u = r("image/jpeg");
  var h = r("image/png");
  var g = r("image/webp");

  // src/index.js
  var import_jsonwebtoken = __toESM(require_jsonwebtoken());
  var import_bcryptjs = __toESM(require_bcrypt());
  var router = t();
  var db = env.DB;
  var JWT_SECRET = process.env.JWT_SECRET;
  var DATABASE_USER = "users";
  var DATABASE_JOBS = "job_applications";
  var USERNAME = "username";
  var USER_ID = "user_id";
  router.post("/login", async (request) => {
    const { username, password } = await request.json();
    if (!username || !password) {
      return new Response(JSON.stringify({ error: "Invalid requests" }), { status: 400 });
    }
    const user = await db.prepare("SELECT * FROM ? WHERE ? = ?").bind(DATABASE_USER, USERNAME, username).first();
    if (!user || !await import_bcryptjs.default.compare(password, user.password)) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
    }
    const token = import_jsonwebtoken.default.sign({ USERNAME: username, USER_ID: user.user_id }, JWT_SECRET, { expiresIn: "1h" });
    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" }
    });
  });
  router.get("/applications", async (request) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authorization header missing" }), { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const { user_id } = await request.json();
    if (!user_id) {
      return new Response(JSON.stringify({ error: "Invalid requests" }), { status: 400 });
    }
    try {
      const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
      const data = await db.prepare("SELECT * FROM  ? WHERE ? = ?").bind(DATABASE_JOBS, USER_ID, decoded.user_id).all();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
  });
  router.all("*", () => new Response("Not Found", { status: 404 }));
  addEventListener("fetch", (event) => {
    event.respondWith(router.handle(event.request));
  });
})();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/*! Bundled license information:

@esbuild-plugins/node-globals-polyfill/Buffer.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

bcryptjs/dist/bcrypt.js:
  (**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   *)
*/
//# sourceMappingURL=index.js.map
