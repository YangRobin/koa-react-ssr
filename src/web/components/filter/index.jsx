import React from 'react'
import style from './style.less'
import { connect } from 'react-redux'

import { Type } from '../../../util/type'
// import store from '../../pages/home/store.js';

class Filter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subType: []
    }
  }
  typeChange(type) {
    const temp = Type.type.find(i => {
      return i.name === type;
    })
      
    this.setState({
      subType: temp.subType
    })
  }
  renderFilters() {
    return Type.type.map(i => {
      return <li onClick={() => { this.typeChange(i.name) }} key={i.name}>{i.label}</li>
    })
  }
  renderSubType() {
    return this.state.subType.map(i => {
      return <li key={i.name}>{i.name}</li>
    })
  }
  render() {
    this.store
    // const filters =store.getState()
    return (
      <div className={style.filter}>
        <div className={style.type}>
          <span>学科:</span>
          <ul >
            {this.renderFilters()}
          </ul>
        </div>
        <div className={style.subType}>
          <span>类目:</span>
          <ul >
            {this.renderSubType('computer')}
          </ul>
        </div>
        {/* <div>{this.props.count}</div>
        <button onClick={this.props.add}> add</button> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  }
}
const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    add: () => {    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);