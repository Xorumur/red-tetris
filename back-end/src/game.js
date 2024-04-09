const Tetriminos = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]
];

class Game {
        constructor(io, client) {
        this.GRID_WIDTH = 6;
        this.GRID_HEIGHT = 6;
        this.gameGrid = [];
        this.currentPiece = null;
        this.score = 0;
        this.initializeGrid();
        this.io = io;
        this.client = client;
        this.game();
    }

    initializeGrid() {
        for (let i = 0; i < this.GRID_HEIGHT; i++) {
            this.gameGrid.push(new Array(this.GRID_WIDTH).fill(0));
        }
        for(let i = 0; i < this.GRID_HEIGHT; i++) {
            this.gameGrid[i][0] = 2;
            this.gameGrid[i][this.GRID_WIDTH - 1] = 2;
            if (i === this.GRID_HEIGHT - 1) {
                this.gameGrid[i].fill(2);
            }
        }
    }

    generateRandomPiece() {
        const keys = Object.keys(Tetriminos);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.currentPiece = {
            shape: Tetriminos[randomKey],
            x: 0,
            y: 0
        };
    }

    game() {
        this.initBlock();
        let t = this.getMap();
        console.log(t);
        console.log(this.gameGrid);
    }

    initBlock() {
        this.generateRandomPiece();
        this.currentPiece.x = Math.floor(this.GRID_WIDTH / 2) - Math.floor(this.currentPiece.shape[0].length / 2);
    }

    collision() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x] !== 0) {
                    if (this.gameGrid[this.currentPiece.y + y][this.currentPiece.x + x] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    getMap() {
        // let newMap = this.gameGrid;
        // this.currentPiece.shape.map((row, y) => {
        //     row.map((cell, x) => {
        //         if (cell !== 0) {
        //             newMap[this.currentPiece.y + y][this.currentPiece.x + x] = cell;
        //         }
        //     });
        // });
        // return newMap;

        let newMap = this.gameGrid;

        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x] !== 0) {
                    newMap[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.shape[y][x];
                }
            }
        }
        return newMap;
    }
};


const TEXTURE = [
    '',
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

module.exports = Game;