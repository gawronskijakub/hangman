import { GAME_RESULTS } from '@/constants';

interface IResultProps {
	isPlaying: boolean;
	gameResult: number;
}

export const Result = ({ isPlaying, gameResult }: IResultProps) => {
	if (isPlaying || gameResult === GAME_RESULTS.initial || gameResult === GAME_RESULTS.inGame) return null;

	const resultText = gameResult === GAME_RESULTS.hasWon ? 'Congratulations' : 'You lost...';

	return <section>{resultText}</section>;
};
