
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
        <div className={style.header}>
          <ul className={style.operator}>
            <li><span>点赞</span></li>
            <li><span>分享</span></li>
            <li onClick={() => { this.openCommentList() }}><span className={style.commenterBtn}>评论</span></li>
          </ul>
          {
            this.props.isOpened ? <span onClick={() => { this.props.close() }}>
              收起
            </span> : <span onClick={() => { this.props.open() }}>
                展开阅读
            </span>
          }
        </div>
        {
          this.state.commentVisible ? <div className={style.commentorList}>
            <div>
              <div className={style.commentorInput} contentEditable={true}>
                text
                </div>
              <div>
                <button>发表</button>
              </div>
            </div>
          </div> : ''
        }
      </div>
    )
  }
}

Commentor.propTypes = {
  id: PropTypes.string,
  open: PropTypes.func,
  close: PropTypes.func,
}
export default Commentor;