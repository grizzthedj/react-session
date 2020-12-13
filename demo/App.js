import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactSession from '../src/ReactSession';
import { Home, Memory, Cookie, LocalStorage, SessionStorage } from './examples/Index';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/memory" component={Memory} />
          <Route path="/cookie" component={Cookie} />
          <Route path="/localStorage" component={LocalStorage} />
          <Route path="/sessionStorage" component={SessionStorage} />
        </Switch>
      </div>
    );
  }
}

export default App;
