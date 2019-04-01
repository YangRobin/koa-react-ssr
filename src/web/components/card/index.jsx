

import PropTypes from 'prop-types';
import React from 'react';
import style from './style.scss'
import Commentor from '../commentor/index.jsx'
import Mark from 'react-markdown';
import UserInfo from '../userinfo/index.jsx'
import CONST from '../../../util/const'

class Card extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      content: '',
      isOpened: false
    }
    this.openArticle = this.openArticle.bind(this);
    this.closeArticle = this.closeArticle.bind(this);
  }
  componentWillMount() {
    const length = this.props.data.content.length;
    this.setState({
      content: length > CONST.LIMIT ? this.props.data.content.substr(0, CONST.LIMIT) + "......" : this.props.data.content,
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
      content: this.props.data.content.substr(0, CONST.LIMIT) + "......",
      isOpened: false
    })
  }

  render() {

    // const children = this.props.children;
    const user = this.props.data.creator[0];
    return (
      <div className={style.card}>
        {/* <UserInfo data={user} /> */}
        <h3 className={style.title}>
          <a href={"/detail/"+this.props.data.id}>{this.props.data.title}</a>
        </h3>
        <div className={style.content}>
          {/* {
            this.state.isOpened ? '' : <img src={this.props.data.cover} alt="" />
          } */}
          <div className={style.text}>
            {/* <Mark source={this.state.content} /> */}
            <div dangerouslySetInnerHTML={{
              __html: this.state.content
            }}></div>
          </div>
        </div>
        <div className={style.footer}>
          <Commentor
            isOpened={this.state.isOpened}
            id={this.props.data.id}
            open={this.openArticle}
            close={this.closeArticle}
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


