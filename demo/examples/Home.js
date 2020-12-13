import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div style={{marginLeft: '30px'}}>
        <h2>react-client-session</h2>
        <h3><strong>Examples</strong></h3>
        <p>Click the links below to see the examples in action.</p>

        <ul>
          <li><Link to="/memory">Client Session store with memory only persistence</Link></li>
          <li><Link to="/cookie">Client Session store with cookie persistence</Link></li>
          <li><Link to="/localStorage">Client Session store with localStorage persistence</Link></li>
          <li><Link to="/sessionStorage">Client Session store with sessionStorage persistence</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;