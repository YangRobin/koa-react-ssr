

import PropTypes from 'prop-types';
import React from 'react';
import style from './style.scss'
import Commentor from '../commentor/index.jsx'
class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    // const children = this.props.children;
    return (
      <div className={style.card}>
        <h3 className={style.title}>{this.props.data.title}</h3>
        <div className={style.content}>
          <img src="./avator.png" alt="" />
          <div className={style.text}>
            {this.props.data.content}
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