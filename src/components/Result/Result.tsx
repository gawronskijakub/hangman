import { GAME_RESULTS } from '@/constants';

import styles from './Result.module.scss';

interface IResultProps {
	gameStatus: number;
}

export const Result = ({ gameStatus }: IResultProps) => {
	if (gameStatus === GAME_RESULTS.initial || gameStatus === GAME_RESULTS.isPlaying) return null;

	const resultText = gameStatus === GAME_RESULTS.hasWon ? 'Congratulations' : 'You lost...';

	return <section className={styles.result}>{resultText}</section>;
};
