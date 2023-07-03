import { GAME_RESULTS } from '@/constants';

interface IResultProps {
	gameStatus: number;
}

export const Result = ({ gameStatus }: IResultProps) => {
	if (gameStatus === GAME_RESULTS.initial || gameStatus === GAME_RESULTS.inGame) return null;

	const resultText = gameStatus === GAME_RESULTS.hasWon ? 'Congratulations' : 'You lost...';

	return <section>{resultText}</section>;
};
