import React, { Component } from 'react';

class GetHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: true
        };
        
        // setInterval(() => {
        //     this.setState({
        //         showText: !this.state.showText
        //     });
        // }, 1000);
   }
   
   render() {
       const text = document.getElementById('head2').textContent;
    //    const text = document.getElementById('head2');
    //    console.log(document.getElementById('head2').textContent);
       return (
      <div>
        <span style={{color: "red"}}>
          {text}
        </span>
      </div>
    );
    }
}

export default GetHeader;