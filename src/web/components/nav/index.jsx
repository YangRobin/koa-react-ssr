
import React from 'react';
import style from './style.less';
import Card from '../card/index.jsx'
import Filter from '../../components/filter/index.jsx'
import { isScrollBottom, post, get } from '../../../util/request';
export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
      ],
      page: 1,
      isMoreShow: false,
      hasNext:true,
      loadingText:"下拉加载更多..."
    }
  }
  componentDidMount() {
    console.log("robin")
    this.loadArticle();
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
  loadArticle() {
    if(!this.state.hasNext){
      this.setState({
        loadingText:"没有更多了"
      })
      return;
    }
    post("/api/loadQuery", {
      page: this.state.page,
      pageSize: 5,
    }).then(res => {
      let data = this.state.data;
      data = data.concat(res.data)
      this.setState({
        data,
        hasNext: res.hasNext,
        page: this.state.page + 1,
      })
      return res;
    })
  }
  renderList() {
    return this.state.data.map(i => {
      return (
        <Card
          key={i.id}
          data={i}
        />
      )
    })
  }
  showMore() {
    this.setState({
      isMoreShow: !this.state.isMoreShow,
    })
  }
  render() {
    return (
      <div className={style.nav}>
        <ul className={style.menu}>
          <li>文章</li>
          {/* <li>视频</li>
          <li>图片</li>
          <li className={style.showMore}
            onClick={() => { this.showMore() }}
          ><span>更多..</span></li> */}
        </ul>
        {
          this.state.isMoreShow ? (
            <Filter />
          ) : ''
        }
        <div className={style.list}>
          {
            this.renderList()
          }
        </div>
        <div className={style.loading}>
          <span>{this.state.loadingText}</span>
        </div>
      </div>
    )
  }
}