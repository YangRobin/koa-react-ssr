
import React from 'react';
import style from './style.scss';
import Card from '../card/index.jsx'

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          title: 'robin',
          content: 'this is content！ so pay a attention to this part！'
        },
        {
          id: 1,
          title: 'robin',
          content: 'this is content！ so pay a attention to this part！'
        }
      ]
    }
  }
  componentDidMount() {

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