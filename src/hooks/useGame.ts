import { useEffect, useState } from 'react';

import { GAME_RESULTS } from '@/constants';

export const useGame = () => {
	const [gameStatus, setGameStatus] = useState(GAME_RESULTS.initial);
	const [isLoading, setIsLoading] = useState(false);
	const [mistakes, setMistakes] = useState(0);
	const [word, setWord] = useState('');
	const [wordToGuess, setWordToGuess] = useState('');
	const [usedLetters, setUsedLetters] = useState('');

	useEffect(() => {
		if (gameStatus !== GAME_RESULTS.inGame) return;

		if (word.length > 0 && word === wordToGuess) {
			setGameStatus(GAME_RESULTS.hasWon);
		} else if (mistakes === 7) {
			setGameStatus(GAME_RESULTS.hasLost);
		}
	}, [word, mistakes]);

	return {
		gameStatus,
		setGameStatus,
		isLoading,
		setIsLoading,
		mistakes,
		setMistakes,
		word,
		setWord,
		wordToGuess,
		setWordToGuess,
		usedLetters,
		setUsedLetters,
	};
};
