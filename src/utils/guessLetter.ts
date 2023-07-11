import { KeyboardEvent } from 'react';

import { ALPHABET, GAME_RESULTS } from '@/constants';
import { GuessLetterProps } from '@/types';

export const guessLetter = (
	ev: KeyboardEvent,
	{ gameStatus, setMistakes, setWord, wordToGuess, usedLetters, setUsedLetters }: GuessLetterProps
) => {
	const keyPressed = ev.key.toLowerCase();
	const isInAlphabet =
		keyPressed.charCodeAt(0) >= ALPHABET.ASCII_KEYCODES.LOWERCASE_A &&
		keyPressed.charCodeAt(0) <= ALPHABET.ASCII_KEYCODES.LOWERCASE_Z;

	if (gameStatus !== GAME_RESULTS.isPlaying || !isInAlphabet || usedLetters.includes(keyPressed)) {
		return;
	}

	setUsedLetters((u) => `${u}${keyPressed}`);

	if (!wordToGuess.includes(keyPressed)) {
		setMistakes((m) => m + 1);
		return;
	}

	const indices = [...wordToGuess].map((el, index) => (el === keyPressed ? index : '')).filter(String);

	setWord((currentWord) => {
		indices.forEach((index) => {
			currentWord = currentWord.replace(/./g, (char, currIndex) => (currIndex === index ? keyPressed : char));
		});

		return currentWord;
	});
};
