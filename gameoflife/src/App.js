import React from 'react';
import './App.css';
import Game from './Game.js'
import InstructionPopup from './InstructionPopup.js'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { showPopup: false};
  }
state ={
  seen: true
};
togglePop = () => {
this.setState({
 seen: !this.state.seen
});
}


  popupToggle(){
    this.setState({
      seen: !this.state.seen
    });
  }
  render() {
  return (
   
    <div className="App">
      <div><h1>Conway's Game of Life</h1></div>
      <div className="btn" onClick={this.togglePop}>
      <button>Instructions</button>
    </div>
    {this.state.seen ? <InstructionPopup toggle={this.togglePop} /> : null}
     <Game />
    </div>
  
  );
  }
}

export default App;
