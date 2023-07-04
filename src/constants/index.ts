export const GAME_RESULTS = {
	initial: 0,
	inGame: 1,
	hasWon: 2,
	hasLost: 3,
};

export const URLS = {
	randomWord: {
		url: 'https://api.api-ninjas.com/v1/randomword?type=noun',
		headers: {
			'X-Api-Key': import.meta.env.VITE_API_KEY,
		},
	},
};

export const BUTTON_LABELS = {
	startNewGame: 'Start New Game',
	revealTheWord: 'Reveal the word!',
};
