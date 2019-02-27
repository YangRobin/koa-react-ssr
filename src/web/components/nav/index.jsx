
import React from 'react';
import style from './style.scss';
import Card from '../card/index.jsx'
import { isScrollBottom, post, get } from '../../../util/request';
export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
      ],
      page: 1,
    }
  }
  componentDidMount() {
    post("/loadQuery", {
      page: this.state.page,
      pageSize: 6,
    }).then(res => {
      this.setState({
        data: res.data,
        hasNext: res.hasNext,
        page: this.state.page + 1,
      })
    })
    let timer = null;
    window.onscroll = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        await this.loadArticle()
        timer = null;
      }, 2000)
    }
  }

  throttle() {
    window.onscroll = () => {
      setTimeout(() => {
        console.log("robin")
      }, 3000)
    }
  }

  loadArticle() {
    post("/loadQuery", {
      page: this.state.page,
      pageSize: 6,
    }).then(res => {
      let data = this.state.data;
      data = data.concat(res.data)
      this.setState({
        data,
        hasNext: this.state.hasNext,
        page: this.state.page + 1,
      })
      return res;
    })
  }
  renderList() {
    return this.state.data.map(i => {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$", i)
      return (
        <Card
          key={i.id}
          data={i}
        />
      )
    })
  }
  render() {
    return (
      <div className={style.nav}>
        <ul className={style.menu}>
          <li>文章</li>
          <li>视频</li>
          <li>图片</li>
        </ul>
        <div className={style.list}>
          {
            this.renderList()
          }
        </div>
      </div>
    )
  }
}