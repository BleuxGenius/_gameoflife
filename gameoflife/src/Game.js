import React from 'react';
import './Game.css';
import InstructionPopup from './InstructionPopup.js'

// creates grid : cell size , width of grid and height of grid
const cell_size = 20;
const width = 800;
const height = 600;


class Cell extends React.Component {

    render() {

        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${cell_size * x + 1}px`,
                top: `${cell_size * y + 1}px`,
                width: `${cell_size - 1}px`,
                height: `${cell_size - 1}px`,
            }} />
        );
    }
}


class Game extends React.Component {

    constructor() {
        super();
        this.rows = height / cell_size;
        this.cols = width / cell_size;

        this.board = this.makeEmptyBoard();
    }
// state of the cells, if the game is running , if the pop up is seen or not, and how often the cells are updated per milisec
    state = {
        cells: [],
        isRunning: false,
        interval: 100,
        seen: false
    };
   togglePop = () => {
    this.setState({
     seen: !this.state.seen
    });
    }

// creates an empty board
    makeEmptyBoard() {
        // board is = empty array
        let board = [];
        // let y equal 0 
        for (let y = 0; 
        // if y is less than the amount of rows then increase empty cells
            y < this.rows; y++) {
                // then board will equal empty array
            board[y] = [];
                //  if x is less than amount of columns then increase those empty cells 
            for (let x = 0; x < this.cols; x++) {
                // both x and y equal false 
                board[y][x] = false;
            }
        }
        //  return the empty board 
        return board;
    }

// calculates the location of the board elements 
    getElementLocation() {
        // method returns size of elements position relative to the viewport 
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            // Returns the value of element's class content attribute. Can be set to change it.
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

// creates the cells 
    makeCells() {
        // cells equal empty array 
        let cells = [];
        // the cells selected in y and x will increase and those slections will be selected on the game board
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    // appends the selected cells to the board
                    cells.push({ x, y });
                }
            }
        }
//  return the cells 
        return cells;
    }
// retrieve the clicked positions , and convert the relative positons 
//  of the board element, convert it to the relative position , and calculate
    handleClick = (event) => {
        const elementOffset = this.getElementLocation();
        const offsetX = event.clientX - elementOffset.x;
        const offsetY = event.clientY - elementOffset.y;
        // uses basic math to Returns the greatest integer less than or equal to its numeric argument.
        const x = Math.floor(offsetX / cell_size);
        const y = Math.floor(offsetY / cell_size);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }
        // then the cell state is reverted 
        this.setState({ cells: this.makeCells() });
    }

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runIteration() {
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }
// 
        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }
    // compute the number of neighbors of given (x, y)
    calculateNeighbors(board, x, y) {
        let neighbors = 0;
        // array of intervals for the diagnal neighboring partners to create animations 
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];
                //  if x is greater than 0 or less than 1 
            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }
// handles the change for the intervals range of number between how many miliseconds 
    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }
// the handle for clearing the board 
    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
    }

    // will randomize the cells 
    handleRandom = () => {

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) 
            // Returns a pseudorandom number between 0 and 1.
            {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells() });
    }

   

    render() {
        const { cells, interval, isRunning, seen } = this.state;
        return (
            <div>
   
                <div className="Board"
                    style={{ width: width, height: height, backgroundSize: `${cell_size}px ${cell_size}px`}}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>

                <div className="controls">
                    Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
                    {isRunning ?
                        <button className="button" onClick={this.stopGame}>Stop</button> :
                        <button className="button" onClick={this.runGame}>Run</button>
                    }
                    <button className="button" onClick={this.handleRandom}>Random</button>
                    <button className="button" onClick={this.handleClear}>Clear</button>
                </div>
            </div>
        );
    }
}


export default Game;