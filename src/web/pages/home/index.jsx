import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Layout from '../../components/Layout/index.jsx'
import Wrapper from '../../components/wrapper/index.jsx'
import Card from '../../components/card/index.jsx'
import Nav from '../../components/nav/index.jsx'
import style from './style.scss'
class Home extends Component {
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
    // window.localStorage.setItem("name", "robin");
    // var b = 0;
    // fetch('queryUserByNameAndPassword?name=robin&password=15595469543', {
    //   method: 'GET',
    //   param: {
    //     name: "robin"
    //   }, headers: new Headers({
    //     'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
    //   })
    // }).then(res => {

    //   return res.json()
    // }).then(res => {
    //   console.log(res)
    //   this.setState({
    //     name: res[0].name,
    //   })
    // })
  }

  render() {

    return (
      <div >
        <Wrapper >
          <div className={style.home}>
            <div className={style.left}>
              <Nav />
            </div>
            <div className={style.right}>
              <div className={style.info}>
                <div className={style.avator}>
                  <img src="avator.png" alt="avator" />
                </div>
                <div className="brief">
                  <h3>name</h3>
                  <p>robin is god!</p>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    )
  }
}


const P = Layout(Home)
export default Layout(Home);

if (typeof window !== "undefined") {
  ReactDom.render(<P />, document.getElementById('root'))
}

