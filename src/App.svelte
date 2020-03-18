<script>
	import {Game} from './game';

	const game = new Game();
	game.init();

	let key;
	const handleInput = (event) => {
		key = event.key;
		switch (key) {
		case 'ArrowUp':
		case 'ArrowDown':
		case 'ArrowLeft':
		case 'ArrowRight':
			game.handleInput(key);
			console.log('grid', game.grid)
			game.grid = game.grid;
			return;
		default:
			console.log('Not an arrow key', key);
		}
	};

</script>
	<div class="content">
		<h1>
			Welcome to 2048!
		</h1>
		<div class="key">{key}</div>
		<div class="grid">
			{#each game.grid as rows, i}
				{#each rows as row, j}
					<div class="cell">
						{#if game.grid[i][j] !== 0}
							{game.grid[i][j]}
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	</div>
	<div class="footer">
		<div class="score">
			<div class="score-title">
				SCORE
			</div>
			<div class="score-number">
				{game.score}
			</div>
		</div>
	</div>
	<svelte:window on:keydown={handleInput}/>
<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		justify-content: center;
    	align-items: center;
		background-image: url('/tree_bark.png');
	}

	h1 {
		color: #615D6C;
		text-align: center;
	}

	.grid {
		padding: 10px;
		background: rgb(242,177,121, 0.7);
		display: grid;
		grid-gap: 10px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-auto-rows: 1fr;
	}

	.cell {
        background-color: #615D6C;
        color: #fff;
        border-radius: 5px;
		width: 48px;
		height: 48px;
        padding: 10px;
        font-size: 150%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer {
		padding: 10px;
	}

	.score {
	    background-color: #fff;
        color:rgb(242,177,121, 0.7);
		font-weight: 900;
        border-radius: 5px;
		width: 48px;
		height: 48px;
        padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
</style>