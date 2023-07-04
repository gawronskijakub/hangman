import { GAME_RESULTS, URLS } from '@/constants';
import { NewGameProps } from '@/types';
import { getRandomWord } from './getRandomWord';

export const startNewGame = async ({
	gameRef,
	setGameStatus,
	setIsLoading,
	setMistakes,
	setWord,
	setWordToGuess,
	setUsedLetters,
}: NewGameProps) => {
	setIsLoading(true);
	setGameStatus(GAME_RESULTS.inGame);
	setWord('');
	setWordToGuess('');
	setUsedLetters('');
	setMistakes(0);

	gameRef.current!.focus();

	try {
		const { url, headers } = URLS.randomWord;
		const response = await getRandomWord(url, headers);
		const json = await response.json();
		const { word } = json;

		setWordToGuess(word.toLowerCase());
		setWord('_'.repeat(word.length));
		setIsLoading(false);
	} catch (e) {
		console.error(e);
	}
};
