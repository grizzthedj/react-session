import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactSession from '../src/ReactSession';

const username = "Bob";
const SESSION_OBJECT_NAME = "__react_session__";

describe('ReactSession', function() {
  beforeEach(() => {
    ReactSession.setStoreType("memory");
  });

  it('Setter should set value', function() {
    ReactSession.set("username", username);
    const sessionUsername = ReactSession.get("username");
    expect(sessionUsername).toEqual(username);
  });

  it('Getter should get value that was set in previous test', function() {
    const sessionUsername = ReactSession.get("username");
    expect(sessionUsername).toEqual(username);
  });

  it('Getter should return value from localStorage when using localStorage store type', function() {
    ReactSession.setStoreType("localStorage");
    ReactSession.set("username", username);
    const item = localStorage.getItem(SESSION_OBJECT_NAME);
    console.log(JSON.stringify(item));
    expect(JSON.stringify(item)).toEqual("\"{\\\"username\\\":\\\"Bob\\\"}\"");
  });

  it('Getter should return value from sessionStorage when using sessionStorage store type', function() {
    ReactSession.setStoreType("sessionStorage");
    ReactSession.set("username", username);
    const item = sessionStorage.getItem(SESSION_OBJECT_NAME);
    console.log(JSON.stringify(item));
    expect(JSON.stringify(item)).toEqual("\"{\\\"username\\\":\\\"Bob\\\"}\"");
  });

  it('Getter should return value from cookie when using cookie store type', function() {
    ReactSession.setStoreType("cookie");
    ReactSession.set("username", username);
    const cookieParam = JSON.parse(ReactSession.getCookie(SESSION_OBJECT_NAME));
    expect(JSON.stringify(cookieParam)).toEqual("{\"username\":\"Bob\"}");
  });

  it('Setting invalid store type should throw an error', function() {
    expect(() => {
      ReactSession.setStore("not-a-store");
    }).toThrow();
  });
});