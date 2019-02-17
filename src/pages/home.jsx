
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'robin',
      age: 33,
    }
  }
  test() {
    console.log("this robin god ds")
  }
  componentDidMount() {
    window.localStorage.setItem("name", "robin");
    var b = 0;
    fetch('queryUserByNameAndPassword?name=robin&password=15595469543', {
      method: 'GET',
      param: {
        name: "robin"
      }, headers: new Headers({
        'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
      })
    }).then(res => {

      return res.json()
    }).then(res => {
      console.log(res)
      this.setState({
        name: res[0].name,
      })
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <header>
          {this.state.name}
         </header>
        <main>
          this is main
         </main>
        <footer>
          this is footer s
         </footer>
        <h3>this is home page！</h3>
        <button onClick={this.test}>test</button>
      </div>
    )
  }
}

Home.propTypes = {
  list: PropTypes.array
}

console.log("robin")
if (typeof window !== "undefined") {
  ReactDom.render(<Home />, document.getElementById('root'))
}
