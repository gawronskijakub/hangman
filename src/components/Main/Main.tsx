import { KeyboardEvent, useState } from 'react';

import { Result } from '@/components/Result';

import styles from './Main.module.scss';

export const Main = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [wordToGuess, setWordToGuess] = useState('');
	const [word, setWord] = useState('');
	const [mistakes, setMistakes] = useState(0);

	const getRandomWord = async () => {
		const res = fetch('https://api.api-ninjas.com/v1/randomword?type=noun', {
			headers: {
				'X-Api-Key': import.meta.env.VITE_API_KEY,
			},
		});

		return res;
	};

	const guessLetter = (ev: KeyboardEvent) => {
		const keyPressed = ev.key;

		if (!isPlaying) {
			return;
		}

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

	return (
		<main
			className={styles.main}
			tabIndex={-1}
			onKeyDown={guessLetter}
		>
			<button
				className={styles.button}
				onClick={async () => {
					setIsPlaying(true);
					setIsLoading(true);
					setMistakes(0);

					await getRandomWord()
						.then((res) => res.json())
						.then(({ word }) => {
							setWordToGuess(word.toLowerCase());
							setIsLoading(false);

							return word;
						})
						.then((resultWord) => {
							setWord('_'.repeat(resultWord.length));
						});
				}}
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
		</main>
	);
};
