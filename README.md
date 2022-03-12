# react-session

[![npm version](https://badge.fury.io/js/react-client-session.svg)](https://badge.fury.io/js/react-client-session)

A simple object to manage client session data in a React app. This is not synchronized with server side sessions.

## Installation

```js
npm install react-client-session --save
```

## Usage

A simple example. Download and run the demo for more examples, or browse the [examples here]( http://grizzthedj.github.io/react-session/demo/public).

1. Optionally set the storage type in the base App, and create a key value pair ... for example, `username`. 

Supported storage types are `memory`(default), `cookie`, `localStorage` and `sessionStorage`.

_*NOTE: When using `cookie` store type, all key value pairs that are set via `ReactSession.set(key, value);` are serialized as JSON in to one single cookie called `__react_session_<DOMAIN>`*_

```js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

function App() {
  ReactSession.setStoreType("localStorage");
  ReactSession.set("username", "Bob");

  return (
    <div>
      <Switch>
        // Routes 
      </Switch>
    </div>
  );
}

export default App;
```
2. Display the `username` from somewhere else in your App.

```js
import React from 'react';
import { ReactSession } from 'react-client-session';

function MyComponent() {
  const username = ReactSession.get("username");

  return (
    <p>User Name is: {username}</p>
  )
}

export default Simple;
```

## Download Examples

```js
git clone https://github.com/grizzthedj/react-session.git
cd react-session
npm install
gulp demo
Browse http://localhost:8080
```
