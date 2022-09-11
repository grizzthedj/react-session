import React from 'react';

var ReactSession = (function () {
  const SESSION_OBJECT_NAME = "__react_session__";
  const COOKIE_EXPIRATION_DAYS = 9;
  var SessionWriter = null;
  var sessionData = {};

  var get = function(key) {
    return SessionWriter.get(key);
  };

  var set = function(key, value, expirationDays) {
    SessionWriter.set(key, value, expirationDays);
  };

  var remove = function(key) {
    SessionWriter.remove(key);
  };

  var setStoreType = function(storeType) {
    if (!['memory', 'cookie', 'localstorage', 'sessionstorage'].includes(storeType.toLowerCase())) {
      throw "Unknown store type";
    }
    SessionWriter = getSessionWriter(storeType);
  };

  var getSessionWriter = function(storeType) {
    switch(storeType.toLowerCase()) {
      case "memory":
        return MemoryWriter;
      case "cookie":
        return CookieWriter;
      case "localstorage":
        return LocalStorageWriter;
      case "sessionstorage":
        return SessionStorageWriter;
      default:
        return MemoryWriter;
    }
  }

  var MemoryWriter = {
    set: function(key, value) {
      sessionData[key] = value;
    },
    get: function(key) {
      return sessionData[key];
    },
    remove: function(key) {
      if (sessionData.hasOwnProperty(key)) {
        delete sessionData[key];  
      }
    }
  }

  var LocalStorageWriter = {
    set: function(key, value) {
      setItem(localStorage, key, value);
    },
    get: function(key) {
      return getItem(localStorage, key);
    },
    remove: function(key) {
      removeItem(localStorage, key);
    }
  }

  var SessionStorageWriter = {
    set: function(key, value) {
      setItem(sessionStorage, key, value);
    },
    get: function(key) {
      return getItem(sessionStorage, key);
    },
    remove: function(key) {
      removeItem(sessionStorage, key);
    }
  }

  var getMaxNumberOfDays = function () {
    var now = new Date().getTime(),
    hours = 24,
    minutes = 60,
    seconds = 60,
    milliseconds = 1000,
    day = hours * minutes * seconds * milliseconds;
    /** Expiration intended to be indefinite by default 'Tue Jan 19 2038' - 
        The maximum value compatible with 32 bits systems for reference: https://stackoverflow.com/a/22479460/5035986 */
    var maxTimePossible = 2147483647000; // 'Tue Jan 19 2038'
  
    return Math.floor((maxTimePossible - now) / day);
  };

  var CookieWriter = {
    expirationInDays: getMaxNumberOfDays(),
    set: function(key, value, numDays) {
      if (numDays) this.expirationInDays =  numDays;
      setCookieParam(key, value, this.expirationInDays);
    },
    get: function(key) {
      return getCookieParam(key);
    },
    remove: function(key) {
      deleteCookieParam(key, this.expirationInDays);
    },
  }

  SessionWriter = MemoryWriter;

  var setItem = function(storageObject, key, value) {
    const item = getStorageItem(storageObject);
    item[key] = value;
    setStorageItem(storageObject, item);
  }

  var getItem = function(storageObject, key) {
    const item = getStorageItem(storageObject);
    return item[key];
  }

  var removeItem = function(storageObject, key) {
    const item = getStorageItem(storageObject);
    delete item[key];
    setStorageItem(storageObject, item);
  }

  var getStorageItem = function(storageObject) {
    const item = storageObject.getItem(SESSION_OBJECT_NAME);
    return item ? JSON.parse(item) : {};
  }

  var setStorageItem = function(storageObject, item) {
    storageObject.setItem(SESSION_OBJECT_NAME, JSON.stringify(item));
  }

  var getUpdatedTime = function(numDays) {
    var now = new Date();
    now.setTime(now.getTime() + (numDays * 24 * 60 * 60 * 1000));
    return now.toUTCString();
  }

  var setCookieParam = function(key, value, numDays) {
    var expires = "expires=" + getUpdatedTime(numDays);
    var existingCookie = getCookie(SESSION_OBJECT_NAME);
    var cookieJson = {};

    if (existingCookie) {
      cookieJson = JSON.parse(existingCookie);
    }

    cookieJson[key] = value;

    var cookieStr = SESSION_OBJECT_NAME + "=" + JSON.stringify(cookieJson) + ";";
    cookieStr += expires + ";path=/";
    document.cookie = cookieStr;
  }

  var getCookieParam = function(key) {
    const cookieParam = JSON.parse(getCookie(SESSION_OBJECT_NAME));
    return cookieParam[key];
  }

  var getCookie = function(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');

    for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  var deleteCookieParam = function(key, numDays) {
    var expires = "expires=" + getUpdatedTime(numDays);
    var existingCookie = getCookie(SESSION_OBJECT_NAME);
    var cookieJson = {};
    
    if (existingCookie) {
      cookieJson = JSON.parse(existingCookie); 
      delete cookieJson[key]; 
    }

    var cookieStr = SESSION_OBJECT_NAME + "=" + JSON.stringify(cookieJson) + ";";
    cookieStr += expires + ";path=/";
    document.cookie = cookieStr;
  }

  return {
    getCookie: getCookie,
    setStoreType: setStoreType,
    remove: remove,
    get: get,
    set: set
  }

})();

export default ReactSession;
