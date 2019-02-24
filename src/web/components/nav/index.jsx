
import React from 'react';
import style from './style.scss';
import Card from '../card/index.jsx'

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
      ]
    }
  }
  componentDidMount() {
    fetch('queryAllArticle?name=33', {
      method: 'GET',
      // body: {
      //   name: 'age'
      // },
       headers: new Headers({
        'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        data: res,
      })
    })
  }
  renderList() {
    return this.state.data.map(i => {
      return (

        <Card
          key={i.title}
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