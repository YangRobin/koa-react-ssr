

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import TopMenu from '../components/top-menu/topMenu.jsx'
export default class Login extends Component {
  render() {
    return (
      <div>
        <TopMenu/>
        <h3>this is login page</h3>
        <div>
          <div>
            <label>
              用户名
            </label>
            <input type="text" />
          </div>
          <div>
            <label>
              密码
            </label>
            <input type="text" />
          </div>
          <div>
            <button>登陆</button>
            <button>注册</button>
          </div>
        </div>
      </div>
    )
  }
}

if (typeof window !== "undefined") {
  ReactDom.render(<Login />, document.getElementById('root'))
}