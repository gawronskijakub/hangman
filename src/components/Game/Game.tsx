import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import { Mistakes } from '@/components/Mistakes';
import { Result } from '@/components/Result';
import { UsedLetters } from '@/components/UsedLetters';
import { Word } from '@/components/Word';
import { GAME_RESULTS } from '@/constants';

import styles from './Game.module.scss';

export const Game = () => {
	const gameRef = useRef<HTMLElement>(null);
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

	const getRandomWord = async () =>
		fetch('https://api.api-ninjas.com/v1/randomword?type=noun', {
			headers: {
				'X-Api-Key': import.meta.env.VITE_API_KEY,
			},
		});

	const guessLetter = (ev: KeyboardEvent) => {
		const keyPressed = ev.key.toLowerCase();
		const isInAlphabet = keyPressed.charCodeAt(0) >= 97 && keyPressed.charCodeAt(0) <= 122;

		if (gameStatus !== GAME_RESULTS.inGame || !isInAlphabet || usedLetters.includes(keyPressed)) {
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

	const startNewGame = async () => {
		setIsLoading(true);
		setGameStatus(GAME_RESULTS.inGame);
		setWord('');
		setWordToGuess('');
		setUsedLetters('');
		setMistakes(0);

		gameRef.current!.focus();

		try {
			const response = await getRandomWord();
			const json = await response.json();
			const { word } = json;

			setWordToGuess(word.toLowerCase());
			setWord('_'.repeat(word.length));
			setIsLoading(false);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<section
			className={styles.game}
			tabIndex={-1}
			onKeyDown={guessLetter}
			ref={gameRef}
		>
			{isLoading ? <Loader /> : <Word word={word} />}
			{gameStatus === GAME_RESULTS.inGame && (
				<>
					<Mistakes mistakes={mistakes} />
					<UsedLetters
						usedLetters={usedLetters}
						word={word}
					/>
				</>
			)}
			<Result gameStatus={gameStatus} />
			<Button
				text='Start New Game'
				onClick={startNewGame}
				hidden={gameStatus === GAME_RESULTS.inGame}
				disabled={word !== wordToGuess}
			/>
			<Button
				text='Reveal the word!'
				onClick={() => {
					setWord(wordToGuess);
				}}
				hidden={gameStatus === GAME_RESULTS.initial}
				disabled={gameStatus !== GAME_RESULTS.hasLost || word === wordToGuess}
			/>
		</section>
	);
};
