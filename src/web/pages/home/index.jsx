import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Layout from '../../components/Layout/index.jsx'
import Wrapper from '../../components/wrapper/index.jsx'
import Nav from '../../components/nav/index.jsx'
import style from './style.scss'
import store from './store.js'
import { Provider } from 'react-redux'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'robin',
      age: 33,
    }
  }
  test() {
     
  }
  componentDidMount() {

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
          {/* <div className={style.toolBar}>
            this is tool bar
            </div> */}
        </Wrapper>
      </div>
    )
  }
}
const App = Layout(Home)
if (typeof window !== "undefined") {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRELOADED_STATE__
  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__

  ReactDom.hydrate(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'))
}
export default Layout(Home);


