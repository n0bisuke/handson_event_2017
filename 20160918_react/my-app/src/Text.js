import React, { Component } from 'react';

//  class Text extends Component {
//   render() {
//     return (
//       <span style={{color: "red"}}>
//         {this.props.text}
//       </span>
//     );
//   }
// }

 class Text extends Component {
   constructor(props) {
     super(props);
     this.state = {
       showText: true
     };

     setInterval(() => {
      this.setState({
        showText: !this.state.showText
      });
     }, 1000);
   }

  render() {
    const text = this.state.showText? this.props.text : '';
    return (
      <div>
        <span className="App-text">
          {text}
        </span>
      </div>
    );
  }
}

export default Text;