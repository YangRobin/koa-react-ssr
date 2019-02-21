

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import TopMenu from '../../components/top-menu/topMenu.jsx'
export default class Login extends Component {
  render() {
    return (
      <div>
        <TopMenu />
        <h3>this is login page</h3>
        <div>
          <form action="/upload " method="post" enctype="multipart/form-data">
            <input type="file" name="file" multiple="multiple" />
            <input type="submit" value="sbmt" />
          </form>

        </div>
      </div>
    )
  }
}

if (typeof window !== "undefined") {
  ReactDom.render(<Login />, document.getElementById('root'))
}