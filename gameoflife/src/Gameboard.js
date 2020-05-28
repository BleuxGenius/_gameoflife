import React from 'react';
import './Gameboard.css';


const cell_size = 35;
const width = 703;
const height = 903;

class Cell extends React.Component {

    render() {
        const { x,y} = this.props;
        return (
            <div className="Cell" style={{ left: `${cell_size * x + 1}px`,
        top:`${cell_size * y + 1}px`,width:`${cell_size - 1}px`,height:`${cell_size - 1}px`,}} />
        );
    }
}

class Gameboard extends React.Component {

    constructor() {
        super();
        this.rows = height/ cell_size;
        this.columns = width / cell_size
        this.board = this.makeEmptyBoard();
    }
    
    state = {
        cells: []
    }

    // to create an empty board
    makeEmptyBoard() {
        let board = [];
        for (let y = 0;
           y < this.rows; y++){
               board[y] = [];
               for (let x = 0; x < this.columns; x++) {
                   board[y][x] = false;
               }
           }
           return board;
    }

        // checks for position of the board element 
        getElementPosition() {
            const rect = this.boardRefrence.getBoundingClientRect();
            const doc = document.documentElement;
    
            return {
                x: (rect.left + window.pageXOffset) - doc.clientLeft,
                y: (rect.top + window.pageYOffset) - doc.clientTop,
            };
        }

    // create cells for the board 
    makeCells(){
        let cells = [];
        for (let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.columns; x++) {
                if (this.board[y][x]) {
                    cells.push({ x,y});
                }
            }
        }
        return cells;
    }

    // retrieves the clicked position and convert to associated position. calculates the columns and rows clicked then state is reverted
    handleClick = (event) => {
        const elementOffSet = this.getElementPosition();
        const offsetX = event.clientX - elementOffSet.x;
        const offsetY = event.clientY - elementOffSet.y;

        const x = Math.floor(offsetX / cell_size);
        const y = Math.floor(offsetY / cell_size);

        if (x >= 0 && x <= this.columns && y >= 0 && y <= this.rows){
            this.board[y][x] = !this.board [y][x];
        }
        this.setState({ cells: this.makeCells()});
    }


    render(){
            const {cells} = this.state; 
        return(
            <div>
                <div className="Gameboard" style={{width: width, height: height, backgroundSize: `${cell_size}px ${cell_size}px`}} onClick={this.handleClick} ref={(n)=> {this.boardRefrence = n;}}>

                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`}/>
                ))}    
                </div>
            </div>
        );
    }

}

export default Gameboard;