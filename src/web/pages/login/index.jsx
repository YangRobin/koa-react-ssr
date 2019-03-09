

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Layout from '../../components/Layout/index.jsx'
import Wrapper from '../../components/wrapper/index.jsx'
import LoginCard from '../../components/login/index.jsx';
import style from './style.scss'


class Login extends Component {
  render() {
    return (
      <div>
        <Wrapper >
          <div className={style.card}>
            <LoginCard></LoginCard>
          </div>
        </Wrapper>

      </div>
    )
  }
}


const P = Layout(Login)
export default Layout(Login);

if (typeof window !== "undefined") {
  ReactDom.render(<P />, document.getElementById('root'))
}
