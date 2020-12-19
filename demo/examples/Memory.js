import React from 'react';
import { Link } from 'react-router-dom';
import ReactSession from '../../src/ReactSession';

class Memory extends React.Component {
  constructor() {
    super(); 
    this.state = {
      username: "",
      sessionUsername: ""
    }
    this.setUsername = this.setUsername.bind(this);
    this.handleChange = this.handleChange.bind(this);

    ReactSession.setStoreType("memory");
  }

  setUsername(event) {
    event.preventDefault();
    ReactSession.set("username", this.state.username);

    this.setState({
      sessionUsername: "User Name is: " + ReactSession.get("username")
    });
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <blockquote>
        <h3>Client Session store using memory only persistence</h3>
        
        <p>Add a username and display it &nbsp;<Link to="/">Back</Link></p><br />

        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Set a username" />&nbsp;&nbsp;&nbsp;
        <button type="submit" onClick={this.setUsername}>Add to Session(memory)</button>

        <br /><br />
        <p>{this.state.sessionUsername}</p>
        <br />

        <pre><code>
          import React from 'react';<br />
          import ReactSession from 'react-client-session';<br />
          <br />
          class Memory extends React.Component &#123;<br />
            &nbsp;&nbsp;constructor() &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;super(); <br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.state = &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username: "",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sessionUsername: ""<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.setUsername = this.setUsername.bind(this);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.handleChange = this.handleChange.bind(this);<br />
            &nbsp;&nbsp;&#125;<br />
            <br />
            &nbsp;&nbsp;setUsername(event) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;event.preventDefault();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;ReactSession.set("username", this.state.username);<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.setState(&#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sessionUsername: "User Name is: " + ReactSession.get("username")<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
            &nbsp;&nbsp;&#125;<br />
            <br />
            &nbsp;&nbsp;handleChange(event) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;const value = event.target.value;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;const name = event.target.name;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.setState(&#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[name]: value,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
            &nbsp;&nbsp;&#125;<br />
            <br />
            &nbsp;&nbsp;render() &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;return (<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;User Name is: &#123;this.state.sessionUsername&#125;&lt;/p&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;)<br />
            &nbsp;&nbsp;&#125;<br />
          &#125;<br />
        </code></pre>

        <Link to="/">Back</Link>
        </blockquote>
      </div>
    );
  }
}

export default Memory;
