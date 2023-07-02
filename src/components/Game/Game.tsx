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
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [wordToGuess, setWordToGuess] = useState('');
	const [word, setWord] = useState('');
	const [usedLetters, setUsedLetters] = useState('');
	const [mistakes, setMistakes] = useState(0);

	const [gameResult, setGameResult] = useState(GAME_RESULTS.initial);

	useEffect(() => {
		if (!isPlaying) return;

		if (word.length > 0 && word === wordToGuess) {
			setIsPlaying(false);
			setGameResult(GAME_RESULTS.hasWon);
		} else if (mistakes === 7) {
			setIsPlaying(false);
			setGameResult(GAME_RESULTS.hasLost);
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

		if (!isPlaying || !isInAlphabet || usedLetters.includes(keyPressed)) {
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
		setIsPlaying(true);
		setGameResult(GAME_RESULTS.inGame);
		setWord('');
		setUsedLetters('');
		setMistakes(0);

		gameRef.current!.focus();

		await getRandomWord()
			.then((res) => res.json())
			.then(({ word }) => {
				setWordToGuess(word.toLowerCase());

				return word;
			})
			.then((resultWord) => {
				setWord('_'.repeat(resultWord.length));
				setIsLoading(false);
			});
	};

	return (
		<main
			className={styles.game}
			tabIndex={-1}
			onKeyDown={guessLetter}
			ref={gameRef}
		>
			{isLoading ? <Loader /> : <Word word={word} />}
			{isPlaying && (
				<>
					<Mistakes mistakes={mistakes} />
					<UsedLetters
						usedLetters={usedLetters}
						word={word}
					/>
				</>
			)}
			<Result
				isPlaying={isPlaying}
				gameResult={gameResult}
			/>
			{!isPlaying && word === wordToGuess && (
				<Button
					text='Start New Game'
					onClick={startNewGame}
				/>
			)}
			{!isPlaying && word !== wordToGuess && word.length > 0 && (
				<Button
					text='Reveal the word!'
					onClick={() => {
						setWord(wordToGuess);
					}}
				/>
			)}
		</main>
	);
};
