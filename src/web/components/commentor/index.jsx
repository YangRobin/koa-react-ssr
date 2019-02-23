
import PropTypes from 'prop-types'
import React from 'react'
import style from './style.scss'
class Commentor extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      commentVisible: false,
    }
  }

  openCommentList() {
    this.setState({
      commentVisible: !this.state.commentVisible,
    })
  }
  render() {
    return (
      <div className={style.commentor}>
        <ul className={style.operator}>
          <li>点赞</li>
          <li>分享</li>
          <li onClick={() => { this.openCommentList() }}>评论</li>
        </ul>
        {
          this.state.commentVisible ? <div className={style.commentList}>
            comment list
           </div> : ''
        }
      </div>
    )
  }
}

Commentor.PropTypes = {
  id: PropTypes.number
}
export default Commentor;