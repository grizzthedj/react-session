import React from 'react';

var ReactSession = (function () {
  const __COOKIE_DOMAIN = window.location.hostname; 
  const __COOKIE_NAME = "__react_session_" + __COOKIE_DOMAIN.toLowerCase() + "__";
  const __COOKIE_EXPIRATION_DAYS = 7; // TODO: Make this a prop?
  var SessionWriter = MemoryWriter;
  var sessionData = {};

  var get = function(key) {
    return SessionWriter.get(key);
  };

  var set = function(key, value) {
    SessionWriter.set(key, value);
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
      localStorage.setItem(key, value);
    },
    get: function(key) {
      return localStorage.getItem(key);
    },
    remove: function(key) {
      localStorage.removeItem(key);
    }
  }

  var SessionStorageWriter = {
    set: function(key, value) {
      sessionStorage.setItem(key, value);
    },
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    remove: function(key) {
      sessionStorage.removeItem(key);
    }
  }

  var CookieWriter = {
    set: function(key, value) {
      setCookieParam(key, value, __COOKIE_EXPIRATION_DAYS);
    },
    get: function(key) {
      return getCookieParam(key);
    },
    remove: function(key) {
      deleteCookieParam(key);
    }
  }

  var getUpdatedTime = function(numDays) {
    var now = new Date();
    now.setTime(now.getTime() + (numDays * 24 * 60 * 60 * 1000));
    return now.toUTCString();
  }

  var setCookieParam = function(key, value, numDays) {
    var expires = "expires=" + getUpdatedTime(__COOKIE_EXPIRATION_DAYS);
    var existingCookie = getCookie(__COOKIE_NAME);
    var cookieJson = {};

    if (existingCookie) {
      cookieJson = JSON.parse(existingCookie);
    }

    cookieJson[key] = value;

    var cookieStr = __COOKIE_NAME + "=" + JSON.stringify(cookieJson) + ";";
    cookieStr += expires + ";path=/";
    document.cookie = cookieStr;
  }

  var getCookieParam = function(key) {
    const cookieParam = JSON.parse(getCookie(__COOKIE_NAME));
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

  var deleteCookieParam = function(key) {
    var expires = "expires=" + getUpdatedTime(__COOKIE_EXPIRATION_DAYS);
    var existingCookie = getCookie(__COOKIE_NAME);
    var cookieJson = {};
    
    if (existingCookie) {
      cookieJson = JSON.parse(existingCookie); 
      delete cookieJson[key]; 
    }

    var cookieStr = __COOKIE_NAME + "=" + JSON.stringify(cookieJson) + ";";
    cookieStr += expires + ";path=/";
    document.cookie = cookieStr;
  }

  return {
    setStoreType: setStoreType,
    remove: remove,
    get: get,
    set: set
  }

})();

export default ReactSession;
