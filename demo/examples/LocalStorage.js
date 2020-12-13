import React from 'react';
import { Link } from 'react-router-dom';
import ReactSession from '../../src/ReactSession';

class LocalStorage extends React.Component {
  constructor() {
    super(); 
    this.state = {
      username: "",
      sessionUsername: "",
      message: ""
    }
    this.setUsername = this.setUsername.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);

    ReactSession.setStoreType("localStorage");
  }

  setUsername(event) {
    event.preventDefault();
    ReactSession.set("username", this.state.username);

    this.setState({
      sessionUsername: "User Name is: " + ReactSession.get("username")
    });
  }

  clear(event) {
    event.preventDefault();
    ReactSession.remove("username");

    this.setState({
      sessionUsername: "User Name is: " + ReactSession.get("username"),
      message: "Cleared!"
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
        <h3>Client Session store using localStorage persistence</h3>
        
        <p>Add a username and display it &nbsp;<Link to="/">Back</Link></p><br />

        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Set a username" />&nbsp;&nbsp;&nbsp;
        <button type="submit" onClick={this.setUsername}>Add to Session(localStorage)</button>

        <br /><br />
        <p>{this.state.sessionUsername}</p>
        <br />

        <button type="submit" disabled={this.state.sessionUsername === ""} onClick={this.clear}>Clear from localStorage</button>
        &nbsp;&nbsp;&nbsp;{this.state.message}
        <br /><br />

        <pre><code>
          import React from 'react';<br />
          import ReactSession from 'react-client-session';<br />
          <br />
          class LocalStorage extends React.Component &#123;<br />
            &nbsp;&nbsp;constructor() &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;super(); <br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.state = &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username: "",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sessionUsername: ""<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.setUsername = this.setUsername.bind(this);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.handleChange = this.handleChange.bind(this);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.clear = this.clear.bind(this);<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;ReactSession.setStoreType("localStorage");
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
            &nbsp;&nbsp;clear(event) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;event.preventDefault();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;ReactSession.remove("username");<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;this.setState(&#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sessionUsername: "User Name is: " + ReactSession.get("username"),<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message: "Cleared!"<br />
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;&#123;this.state.sessionUsername&#125;&lt;/p&gt;&lt;<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3&gt;Client Session store with localStorage persistence&lt;/h3&gt;<br />
            <br />         
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Add a username and display it &nbsp;&lt;Link to="/"&gt;Back&lt;/Link&gt;&lt;/p&gt;<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="text" name="username" value=&#123;this.state.username&#125; onChange=&#123;this.handleChange&#125; placeholder="Set a username" /&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type="submit" onClick=&#123;this.setUsername&#125;&gt;Add to Session(localStorage)&lt;/button&gt;<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;&#123;this.state.sessionUsername&#125;&lt;/p&gt;<br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type="submit" disabled=&#123;this.state.sessionUsername === ""&#125; onClick=&#123;this.clear&#125;&gt;Clear from localStorage&lt;/button&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;this.state.message&#125;<br />
            <br />
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

export default LocalStorage;
