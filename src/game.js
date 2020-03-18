export class Game {
    constructor(dimension = 4, maxScore) {
        this.dimension = dimension;
        this.maxScore = maxScore;
        this.score = 0;
        this.grid = [...Array(dimension)].map(x => Array(dimension).fill(0));
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
     * Adds a 2 or 4 to a random tile
     */
    populateNextTile() {
        const tile = this.getNextTile();
        if (tile.length) {
            this.grid[tile[0]][tile[1]] = this.getNumber();
        }
    }

    getNumber() {
        return Math.random() < 0.8 ? 2 : 4;
    }

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

    isTileAvailable(row, col) {
        return this.grid[row][col] === 0;
    }

    /**
     *  Checks if we have a move available
     *  Combine rows/columns
     */
    isMoveAvailable() {
        return true;
    }

    /**
     * Returns true if we reach max score
     */
    isWon() {
        return this.score === this.maxScore;
    }

    handleInput(input) {
        // check if game is finished
        if (this.isWon()) {
            console.log('You won!');
            return;
        }

        if (!this.isMoveAvailable()) {
            console.log('You lost, no more moves!');
            return;
        }


        // combine stuff
        // up/down -> combine rows, move other squares over
        // left/right combine columns, move other squares over

        // populate next tile
        this.populateNextTile();
        
    }

}
