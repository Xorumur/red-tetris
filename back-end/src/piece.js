export class Tetriminos {
	constructor(colorid, y, shape) {
		this.colorid = colorid;
		this.y = y;
		this.shape = shape;
	}
	// constructPiece() {
	// 	let piece = new Piece(this.colorid, this.shape);
	// 	piece.y = this.y;
	// 	return (piece);
	// }
}

export const TEXTURE = [
    '',
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

export const TETRIMINOS = [
	new Tetriminos(
		1,
		-1,
		[
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	),
	new Tetriminos(
		2,
		0,
		[
			[1, 0, 0],
			[1, 1, 1],
			[0, 0, 0]
		]
	),
	new Tetriminos(
		3,
		0,
		[
			[0, 0, 1],
			[1, 1, 1],
			[0, 0, 0]
		]
	),
	new Tetriminos(
		4,
		0,
		[
			[1, 1],
			[1, 1]
		]
	),
	new Tetriminos(
		5,
		0,
		[
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0]
		]
	),
	new Tetriminos(
		6,
		0,
		[
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0]
		]
	),
	new Tetriminos(
		7,
		0,
		[
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0]
		]
	)
];