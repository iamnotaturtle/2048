<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css">
	<script src="https://cdn.jsdelivr.net/npm/swiped-events@1.0.9/src/swiped-events.min.js"></script>
</svelte:head>

<script>
	import MakeItRain from './MakeItRain.svelte';
	import {Game} from './game';

	const mobileKeyMap = {
		'swiped-up': 'ArrowUp',
		'swiped-down': 'ArrowDown',
		'swiped-left': 'ArrowLeft',
		'swiped-right': 'ArrowRight',
	}
	const mobileKeys = Object.keys(mobileKeyMap);

	const setupMobile = () => {
 		mobileKeys.forEach(eventName => {
			document.addEventListener(eventName, (event) => {
				event.key = mobileKeyMap[event.type];
				handleInput(event);
			});
		})
	}
	setupMobile();

	const handleInput = (event) => {
		switch (event.key) {
		case 'ArrowUp':
		case 'ArrowDown':
		case 'ArrowLeft':
		case 'ArrowRight':
			game.handleInput(event.key);
			game.grid = game.grid;
			return;
		default:
			return;
		}
	};

	const animateCSS = (node, value) => {
		return {
			update(value) {
				if (value === 0) {
					return;
				}
				node.classList.add('animated', 'shake');

				const handleAnimationEnd = () => {
					node.classList.remove('animated', 'shake');
					node.removeEventListener('animationend', handleAnimationEnd);
				};
				node.addEventListener('animationend', handleAnimationEnd);
			},
		};
	};

	const game = new Game();
	game.init();
</script>
	<div class="content">
		<div class="header">
			<div class="title">
				2048
			</div>
			<div class="subtitle">
				Join the tiles to get 2048!
			</div>
		</div>
		<div class="grid">
			{#each game.grid as rows, i}
				{#each rows as row, j}
					<div class="cell" use:animateCSS={game.grid[i][j]}>
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
	{#if game.isWon()}
		<MakeItRain characters={['🥳', '🎉', '✨', 'Winner']}/>	
	{:else if game.isOver()}
		<MakeItRain characters={['💧', '😭', 'Loser']}/>	
	{/if}
	<svelte:window on:keydown={handleInput}/>
<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		justify-content: center;
    	align-items: center;
		background-image: url('./tree_bark.png');
	}

	.header {
		padding-bottom: 10px;
	}

	.title {
		color: #615D6C;
		font-weight: bold;
		font-size: xx-large;
	}

	.subtitle {
		font-size: medium;
		color: #615D6C;
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