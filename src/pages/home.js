
import PropTypes from 'prop-types';

import React ,{ Component} from 'react';
import ReactDom from 'react-dom';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'robin',
     
    }
  }
  test(){
    console.log("this robin god ds")
  }
  componentDidMount(){
    window.localStorage.setItem("name","robin");
    var b=0;
  }
  
  render(){
    console.log(this.props)
    return (
      <div>
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

if(typeof window  !== "undefined"){
  ReactDom.render(<Home />,document.getElementById('root'))
}
