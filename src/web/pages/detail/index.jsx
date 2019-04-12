import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Layout from '../../components/Layout/index.jsx'
import Wrapper from '../../components/wrapper/index.jsx'
import style from './style.less'
import { post, get } from '../../../util/request'
import 'highlight.js/styles/atom-one-light.css'
import '../../common/common.css'

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "detail",
      id: null,
      data: {},
      hostList: [],
    }
  }
  componentDidMount() {
    const id = location.href.split('/').pop();
    this.queryArticleById(id);
    this.queryHostList();
  }
  queryHostList() {
    get('/api/queryHostList').then(res => {
      this.setState({
        hostList: res.result,
      })
    })
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
  renderHotList() {
    return this.state.hostList.map((item, index) => {
      return (
        <li><span>{index + 1 + "."}</span><a href={"/detail/"+item.id}>{
          item.title.length > 10 ? item.title.substr(0, 10) +"..." : item.title
        }</a></li>
      )
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
              <div>
                <div className={style.title} >
                  <span>推荐文章</span>
                </div>
                <ul>
                  {this.renderHotList()}
                  {/* <li><a href="/#">react hooks的使用</a></li>
                  <li><a href="/#">正则表达式的掌握</a></li>
                  <li><a href="/#">web缓存</a></li>
                  <li><a href="/#">vuejs入门到精通</a></li> */}
                </ul>
              </div>
            </div>
            <div className={style.right}>
              <div>
                <span>实用工具</span>
              </div>
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