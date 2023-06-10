import { KeyboardEvent, useState } from 'react';

import styles from './Main.module.scss';

export const Main = (): JSX.Element => {
	const wordToGuess = 'alphabet';
	const [word, setWord] = useState('_'.repeat(wordToGuess.length));

	const printLetter = (ev: KeyboardEvent) => {
		const keyPressed = ev.key;

		if (!wordToGuess.includes(keyPressed)) return;

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
			onKeyDown={printLetter}
		>
			<p>{word}</p>
			<p>{!word.includes('_') && 'BRAVO'}</p>
		</main>
	);
};
