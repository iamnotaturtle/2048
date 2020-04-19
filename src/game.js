export class Game {
    constructor(dimension = 4, maxScore = 2048) {
        this.dimension = dimension;
        this.maxScore = maxScore;
        this.score = 0;
        this.grid = [...Array(dimension)].map(x => Array(dimension).fill(0));
        this.prevGrid = this.grid;
    }

    /**
     * Seeds board with a number of random tiles
     */
    init(num = 2) {
        for(let i = 0; i < num; i += 1){
            this.populateNextTile();
        }
    }

    /**
     * Returns list of [row, col] tiles which are free
     */
    getFreeTiles() {
        const tiles = [];

        for (let i = 0; i < this.dimension; i += 1) {
            for (let j = 0; j < this.dimension; j += 1) {
                if (this.grid[i][j] === 0) {
                    tiles.push([i, j]);
                }
            }
        }

        return tiles;
    }

    /**
     * Returns next free tile to populate
     */
    getNextTile() {
        const tiles = this.getFreeTiles();
        const index = Math.floor(Math.random() * tiles.length);
        return tiles.length ? tiles[index] : [];
    }

    getRandomNumber() {
        return Math.random() < 0.9 ? 2 : 4;
    }

    /**
     * Adds a 2 or 4 to a random tile
     */
    populateNextTile() {
        const tile = this.getNextTile();
        if (tile.length) {
            this.grid[tile[0]][tile[1]] = this.getRandomNumber();
        }
    }

    /**
     *  Checks if we have a move available
     *  There are no empty spaces and no adjacent tiles with the same value
     */
    isOver() {
        const isRowLeftMovable = (row) => {
            const change = (i) => {

                // Move
                if (row[i] === 0 && row[i + 1] !== 0) {
                    return true;
                }

                // Merge
                if (row[i] !== 0 && row[i] === row[i + 1]) {
                    return true;
                }

                return false;
            }

            return [...Array(row.length - 1).keys()].map(c => change(c)).some(c => c === true);
        };

        let res = [];

        // Left
        for(let i = 0; i < this.grid.length; i += 1) {
            res.push(isRowLeftMovable(this.grid[i]));
        }

        // Right

        // Up

        // Down
        return false;
    }

    /**
     * Returns true if we reach max score
     */
    isWon() {
        return this.score >= this.maxScore;
    }

    handleInput(input) {
        let grid = [...this.grid];
		switch (input) {
            case 'ArrowUp':
                grid = this.transpose(grid);
                for(let i = 0; i < grid.length; i += 1) {
                    grid[i] = this.move(grid[i]);
                }
                grid = this.transpose(grid);
                break;
            case 'ArrowDown':
                grid = this.transpose(grid);
                for(let i = 0; i < grid.length; i += 1) {
                    grid[i] = this.move(grid[i].reverse()).reverse();
                }
                grid = this.transpose(grid);
                break;
            case 'ArrowLeft':
                for(let i = 0; i < grid.length; i += 1) {
                    grid[i] = this.move(grid[i]);
                }
                break;
            case 'ArrowRight':
                for(let i = 0; i < grid.length; i += 1) {
                    grid[i] = this.move(grid[i].reverse()).reverse();
                }
                break;
        }

        this.prevGrid = [...this.grid];
        this.grid = grid;

        if (this.isWon()) {
            console.log('You won!');
            return;
        }

        if (this.isOver()) {
            console.log('You lost, no more moves!');
            return;
        }

        this.populateNextTile();        
    }

    move(row) {

        // Squeeze non-zero elements together
        const tighten = (row) => {
            const newRow = row.filter(cell => cell !== 0);
            newRow.push(...Array(row.length - newRow.length).fill(0));
            return newRow;
        }

        const merge = (row) => {
            let pair = false;
            const newRow = [];

            for (let i = 0; i < row.length; i += 1) {
                if (pair) {
                    newRow.push(2 * row[i]);
                    this.score += 2 * row[i];
                    pair = false;
                } else if (i + 1 < row.length && row[i] === row[i + 1]){
                    pair = true;
                    newRow.push(0);
                } else {
                    newRow.push(row[i]);
                }
            }
            return newRow;
        }

        return tighten(merge(tighten(row)));

    }

    // https://stackoverflow.com/a/46805290
    transpose(matrix) {
        return matrix.reduce((prev, next) => next.map((item, i) =>
            (prev[i] || []).concat(next[i])
        ), []);
    }
}