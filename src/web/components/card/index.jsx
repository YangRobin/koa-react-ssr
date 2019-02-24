

import PropTypes from 'prop-types';
import React from 'react';
import style from './style.scss'
import Commentor from '../commentor/index.jsx'
import Mark from 'react-markdown';
class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      content: '',
      isOpened: false
    }
  }
  componentWillMount() {
    const length = this.props.data.content.length;
    this.setState({
      content: length > 200 ? this.props.data.content.substr(0, 200) : this.props.data.content,
    })

  }
  openArticle() {
    this.setState({
      content: this.props.data.content,
      isOpened: true,
    })
  }
  closeArticle() {
    this.setState({
      content: this.props.data.content.substr(0, 200),
      isOpened: false
    })
  }

  render() {
    // const children = this.props.children;
    return (
      <div className={style.card}>
        <h3 className={style.title}>{this.props.data.title}</h3>
        <div className={style.content}>
          <img src="./avator.png" alt="" />
          <div className={style.text}>
            <Mark source={this.state.content} />
            {
              this.state.isOpened ? <button className={style.readBtn} onClick={() => { this.closeArticle() }}>
                收起
            </button> : <button className={style.readBtn} onClick={() => { this.openArticle() }}>
                  展开阅读
            </button>
            }
          </div>
        </div>
        <div className={style.footer}>
          <Commentor
            id={this.props.data.id}
          />
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  data: PropTypes.object
}

export default Card;