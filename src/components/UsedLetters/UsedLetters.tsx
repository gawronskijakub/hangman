import styles from './UsedLetters.module.scss';

interface IUsedLettersProps {
	usedLetters: string;
	word: string;
}

export const UsedLetters = ({ usedLetters, word }: IUsedLettersProps) => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';

	return (
		<section className={styles.used}>
			Used letters:{' '}
			<p>
				{alphabet.split('').map((letter) => (
					<span
						key={letter}
						className={usedLetters.includes(letter) ? (word.includes(letter) ? styles.correct : styles.wrong) : ''}
					>
						{letter}
					</span>
				))}
			</p>
		</section>
	);
};
