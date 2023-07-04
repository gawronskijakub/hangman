import { Dispatch, RefObject, SetStateAction } from 'react';

export interface GuessLetterProps {
	gameStatus: number;
	setMistakes: Dispatch<SetStateAction<number>>;
	setWord: Dispatch<SetStateAction<string>>;
	wordToGuess: string;
	usedLetters: string;
	setUsedLetters: Dispatch<SetStateAction<string>>;
}

export interface NewGameProps {
	gameRef: RefObject<HTMLElement>;
	setGameStatus: Dispatch<SetStateAction<number>>;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	setMistakes: Dispatch<SetStateAction<number>>;
	setWord: Dispatch<SetStateAction<string>>;
	setWordToGuess: Dispatch<SetStateAction<string>>;
	setUsedLetters: Dispatch<SetStateAction<string>>;
}
