
import PropTypes from 'prop-types';

import React ,{ Component} from 'react';
import ReactDom from 'react-dom';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'robin',
      age:33,
    }
  }
  test(){
    console.log("this robin god ds")
  }
  componentDidMount(){
    window.localStorage.setItem("name","robin");
    var b=0;
    fetch('test').then(res=>{
      return res.json()
    }).then(res=>{
      this.setState({
        name:res.name,
        age:res.age,
      })
    })
  }
  
  render(){
    console.log(this.props)
    return (
      <div>
        good robin
        <h1>hahaha</h1>
         <h1>{this.state.name}</h1>
         <h2>{this.state.age}</h2>
         <header>
            this is header
         </header>
         <main>
           this is main
         </main>
         <footer>
           this is footer
         </footer>
        <h3>this is home page！</h3>
        <button onClick={this.test}>{this.state.name} </button>
      </div>
    )
  }
}

Home.propTypes={
  list:PropTypes.array
}

console.log("robin")
if(typeof window  !== "undefined"){
  ReactDom.render(<Home />,document.getElementById('root'))
}
