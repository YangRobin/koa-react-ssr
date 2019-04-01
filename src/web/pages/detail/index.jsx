import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Layout from '../../components/Layout/index.jsx'
import Wrapper from '../../components/wrapper/index.jsx'
import style from './style.scss'
import { post } from '../../../util/request'
import 'highlight.js/styles/atom-one-light.css'
import '../../common/common.css'
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "detail",
      id: null,
      data: {}
    }
  }
  componentDidMount() {
    const id = location.href.split('/').pop();
    this.queryArticleById(id);
  }
  queryArticleById(id) {
    return post('/api/queryArticleById', { id }).then(res => {
      this.setState({
        data: res.result,
        id,
      })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const { data } = this.state
    // console.log(this.state)
    return (
      <div className={style.detail} >
        <Wrapper >
          <div className={style.main} >
            <div className={style.middle}>
              <h3>{data.title}</h3>
              <div>
                <img src={data.cover} alt="" />
              </div>
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <div className={style.left}>
              hotList
            </div>
            <div className={style.right}>
              adv
            </div>
          </div>
        </Wrapper>
      </div>
    )
  }
}
const App = Layout(Detail)
if (typeof window !== "undefined") {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRELOADED_STATE__
  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__

  ReactDom.hydrate(<App />, document.getElementById('root'))
}
export default Layout(Detail);