const Tetriminos = [
    [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
    ],
    [
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ],
    ],
    [
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ],
    [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ],
    [
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ]
    ]
];

// const io = require('socket.io');

class Game {
    constructor(io, client, room) {
        this.GRID_WIDTH = 6;
        this.GRID_HEIGHT = 6;
        this.gameGrid = [];
        this.currentPiece = null;
        this.score = 0;
        this.initializeGrid();
        this.io = io;
        this.client = client;
        this.game();
        this.roomId = room.id;

        room.players.map((player) => {
            if (player.socket !== 'test')
                player.socket.join(this.roomId);
        });
    }

    isInRoom(socket) {
        const room = io.scokets.in(this.roomId);
        return room.connected[socket.id] !== undefined;
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
            shape: Tetriminos[randomKey][0],
            forms: Tetriminos[randomKey],
            currentForm: 0,
            x: 0,
            y: 0
        };
    }

    copyPiece(piece) {
        return {
            shape: piece.shape,
            forms: piece.forms,
            currentForm: piece.currentForm,
            x: piece.x,
            y: piece.y
        };
    }

    async game() {
        this.initBlock();
        console.log(this.currentPiece);
        while (this.collision(this.currentPiece) === false) {
            let collisionDetected = false;
            for (let y = 0; y < this.gameGrid.length; y++) {
                const copyPiece = this.copyPiece(this.currentPiece);
                copyPiece.y++;
                if (this.collision(copyPiece) === false) {
                    this.currentPiece.y++;
                } else 
                    collisionDetected = true;
                if (collisionDetected)
                    break; 
                console.log("Map : ", this.getMap());
            }
            await this.sleep(2000);
            this.saveCurrentPiece();
            this.initBlock();
        }
        console.log("Game Over end map : ", this.getMap());
    }

    initBlock() {
        this.generateRandomPiece();
        this.currentPiece.x = Math.floor(this.GRID_WIDTH / 2) - Math.floor(this.currentPiece.shape[0].length / 2);
        if (this.currentPiece.x === NaN)
            this.currentPiece.x = Math.floor(this.GRID_WIDTH / 2);
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

    saveCurrentPiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x] !== 0) {
                    this.gameGrid[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.shape[y][x];
                }
            }
        }
    }

    rotation() {
        let newShape = [];
        // const size = this.currentPiece.shape.length;
        // for (let i = 0; i < this.currentPiece.shape.length; i++) {
        //     newShape.push([]);
        // }
        // for (let y = 0; y < this.currentPiece.shape.length; y++) {
        //     for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        //         newShape[x][y] = this.currentPiece.shape[size - y - 1][x];
        //     }
        // }
        newShape = this.currentPiece.forms[this.currentPiece.currentForm + 1] || this.currentPiece.forms[0];

        if (this.collision(this.currentPiece, this.currentPiece.x, this.currentPiece.y)) {
            return ;
        } else {
            this.incrShape();
            // this.currentPiece.shape = newShape;
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

    handleLeft() {
        this.eraseCurrentPiece();
        this.currentPiece.x--;
        if (this.collision(this.currentPiece)) {
            this.currentPiece.x++;
        }
    }

    handleRight() {
        this.eraseCurrentPiece();
        this.currentPiece.x++;
        if (this.collision(this.currentPiece)) {
            this.currentPiece.x--;
        }
    }

    handleDown() {
        this.eraseCurrentPiece();
        this.currentPiece.y++;
        if (this.collision(this.currentPiece)) {
            this.currentPiece.y--;
        }
    }

    getMap() {
        // Créer une copie profonde de gameGrid
        let newMap = this.gameGrid.map(row => [...row]);
    
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x] !== 0) {
                    newMap[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.shape[y][x];
                }
            }
        }
        return newMap;
    }

    incrShape() {
        this.currentPiece.currentForm = this.currentPiece.currentForm + 1;
        if (this.currentPiece.currentForm >= this.currentPiece.forms.length)
            this.currentPiece.currentForm = 0;
        this.currentPiece.shape = this.currentPiece.forms[this.currentPiece.currentForm];
    }

    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
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