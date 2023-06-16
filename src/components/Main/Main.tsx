import { KeyboardEvent, useState } from 'react';

import { Result } from '@/components/Result';

import styles from './Main.module.scss';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const Main = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [wordToGuess, setWordToGuess] = useState('');
	const [word, setWord] = useState('');
	const [mistakes, setMistakes] = useState(0);
	const [usedLetters, setUsedLetters] = useState('');

	const getRandomWord = async () =>
		fetch('https://api.api-ninjas.com/v1/randomword?type=noun', {
			headers: {
				'X-Api-Key': import.meta.env.VITE_API_KEY,
			},
		});

	const guessLetter = (ev: KeyboardEvent) => {
		const keyPressed = ev.key.toLowerCase();

		if (!isPlaying || !alphabet.includes(keyPressed) || usedLetters.includes(keyPressed)) {
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

	const startNewGame = async function () {
		setIsLoading(true);
		setIsPlaying(true);
		setWord('');
		setUsedLetters('');
		setMistakes(0);

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
			className={styles.main}
			tabIndex={-1}
			onKeyDown={guessLetter}
		>
			<button
				className={styles.button}
				onClick={startNewGame}
			>
				Start
			</button>
			{isLoading ? <p>Loading...</p> : <p>{word}</p>}
			{isPlaying && <p>{`Mistakes: ${mistakes}`}</p>}
			<Result
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				word={word}
				mistakes={mistakes}
			/>
			{!isPlaying && word !== wordToGuess && word.length > 0 && (
				<button
					className={styles.button}
					onClick={() => {
						setWord(wordToGuess);
					}}
				>
					Reveal the word!
				</button>
			)}
		</main>
	);
};
