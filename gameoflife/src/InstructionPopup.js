import React from "react";
import './InstructionPopup.css'


export default class InstructionPopup extends React.Component {
  handleClick = () => {
   this.props.toggle();
  };


render() {
  return (
   <div className="modal">
     <div className="modal_content">
     <span className="close" onClick={this.handleClick}>    </span>
     <h2>Rules</h2>
     <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
<ul>
<li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
<li>Any live cell with two or three live neighbours lives on to the next generation.</li>
<li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
<li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
<li>Any live cell with two or three live neighbours survives.</li>
<li>Any dead cell with three live neighbours becomes a live cell.</li>
<li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
</ul>
    </div>
   </div>
  );
 }
}