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

        io.on('connection', (socket) => {
            socket.on("left", (data) => {
                if (this.collision(this.currentPiece, this.currentPiece.x - 1, this.currentPiece.y)) {
                    return ;
                } 
            });

            socket.on("right", (data) => {

            });

            socket.on("down", (data) => {

            });
        });
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
        console.log(this.currentPiece);
        this.currentPiece.y++;
        // console.log(this.getMap());
        this.rotation();
        console.log(this.currentPiece);
        console.log(this.getMap());
        this.rotation();
        console.log(this.currentPiece);
        console.log(this.getMap());
    }

    initBlock() {
        this.generateRandomPiece();
        this.currentPiece.x = Math.floor(this.GRID_WIDTH / 2) - Math.floor(this.currentPiece.shape[0].length / 2);
    }
b 
    collision(piece) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x] !== 0) {
                    if (this.gameGrid[piece.y + y][piece.x + x] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    rotation() {
        let newShape = [];
        const size = this.currentPiece.shape.length;
        for (let i = 0; i < this.currentPiece.shape.length; i++) {
            newShape.push([]);
        }
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                newShape[x][y] = this.currentPiece.shape[size - y - 1][x];
            }
        }
        if (this.collision(this.currentPiece, this.currentPiece.x, this.currentPiece.y)) {
            return ;
        } else {
            this.currentPiece.shape = newShape;
        }
    }

    eraseCurrentPiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x] !== 0) {
                    this.gameGrid[this.currentPiece.y + y][this.currentPiece.x + x] = 0;
                }
            }
        }
    }

    getMap() {
        let newMap = this.gameGrid.map((row) => {
            return row;
        });

        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x] !== 0) {
                    newMap[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.shape[y][x];
                }
            }
        }
        // console.log(newMap);
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