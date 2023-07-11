import { ALPHABET } from '@/constants';

import styles from './UsedLetters.module.scss';

interface IUsedLettersProps {
	usedLetters: string;
	word: string;
}

export const UsedLetters = ({ usedLetters, word }: IUsedLettersProps) => {
	const isCorrect = (letter: string) => usedLetters.includes(letter) && word.includes(letter);
	const isWrong = (letter: string) => usedLetters.includes(letter) && !word.includes(letter);

	return (
		<section className={styles.used}>
			<p className={styles.title}>Used letters:</p>
			<div className={styles.letters}>
				{[...ALPHABET.QWERTY_ROWS].map((row) => (
					<div
						className={styles.row}
						key={row}
					>
						{[...row].map((letter) => (
							<button
								className={`${styles.letter} ${
									isCorrect(letter) ? styles.correct : isWrong(letter) ? styles.wrong : ''
								}`}
								key={letter}
							>
								{letter}
							</button>
						))}
					</div>
				))}
			</div>
		</section>
	);
};
