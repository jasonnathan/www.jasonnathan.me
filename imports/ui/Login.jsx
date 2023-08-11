/* global document*/
import React from 'react';
import Helmet from 'react-helmet';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import StaggeredName from './components/StaggeredName.jsx';

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true
});

export default function Login(){
  return (
    <div>
      <Helmet
        title={`Area 51 | Jason J. Nathan`}
        meta={[
          {"name": "description", "content": "Restricted Area"}
        ]}
      />
      <div role="main">
        <section className="content" style={{bottom:0}}>
          <div className="scroll-y">
            <StaggeredName letters="Area 51">
              <small>Please enter your credentials to enter restricted areas</small>
            </StaggeredName>
            <Accounts.ui.LoginForm state={STATES.SIGN_IN} />
          </div>
        </section>
      </div>
    </div>
  );
}

// import React, {Component} from 'react'
// import { loginWithPassword } from 'meteor-apollo-accounts'
// import { browserHistory } from 'react-router'
//
// class Login extends Component {
//
//   async login(event) {
//     event.preventDefault();
//
//     let { data } = this.props
//     let { email, password } = this.refs
//     email = email.value
//     password = password.value
//
//     try {
//       const response = await loginWithPassword({ email, password }, ApolloClient)
//       Notification.success(response)
//       ApolloClient.resetStore()
//       browserHistory.push('/')
//     } catch (error) {
//       Notification.error(error)
//     }
//   }
//
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.login.bind(this)}>
//           <label>Email: </label>
//           <input
//           defaultValue="admin@example.com"
//           type="email"
//           ref="email" />
//           <br />
//
//           <label>Password: </label>
//           <input
//           defaultValue="password"
//           type="password"
//           ref="password" />
//           <br />
//
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     )
//   }
// }
//
// export default Login
