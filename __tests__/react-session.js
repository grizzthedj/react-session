import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactSession from '../src/ReactSession';

const username = "bob";

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

  it('Setting invalid store type should throw an error', function() {
    expect(() => {
      ReactSession.setStore("not-a-store");
    }).toThrow();
  });
});