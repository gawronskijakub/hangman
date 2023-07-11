import { useRef } from 'react';

import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import { Mistakes } from '@/components/Mistakes';
import { Result } from '@/components/Result';
import { UsedLetters } from '@/components/UsedLetters';
import { Word } from '@/components/Word';
import { GAME_RESULTS, BUTTON_LABELS } from '@/constants';
import { useGame } from '@/hooks/useGame';
import { GuessLetterProps, NewGameProps } from '@/types';
import { guessLetter } from '@/utils/guessLetter';

import styles from './Game.module.scss';
import { startNewGame } from '@/utils/startNewGame';

export const Game = () => {
	const gameRef = useRef<HTMLDivElement>(null);
	const {
		gameStatus,
		setGameStatus,
		isLoading,
		setIsLoading,
		mistakes,
		setMistakes,
		word,
		setWord,
		wordToGuess,
		setWordToGuess,
		usedLetters,
		setUsedLetters,
	} = useGame();

	const guessLetterProps: GuessLetterProps = {
		gameStatus,
		setMistakes,
		setWord,
		wordToGuess,
		usedLetters,
		setUsedLetters,
	};

	const newGameProps: NewGameProps = {
		gameRef,
		setGameStatus,
		setIsLoading,
		setMistakes,
		setWord,
		setWordToGuess,
		setUsedLetters,
	};

	return (
		<div
			className={styles.game}
			tabIndex={-1}
			onKeyDown={(ev) => {
				guessLetter(ev, guessLetterProps);
			}}
			ref={gameRef}
		>
			{isLoading ? <Loader /> : <Word word={word} />}
			{gameStatus === GAME_RESULTS.isPlaying && <Mistakes mistakes={mistakes} />}
			<Result gameStatus={gameStatus} />
			{gameStatus !== GAME_RESULTS.initial && (
				<UsedLetters
					usedLetters={usedLetters}
					word={word}
				/>
			)}
			<section className={styles.buttons}>
				<Button
					text={BUTTON_LABELS.startNewGame}
					onClick={() => {
						startNewGame(newGameProps);
					}}
					disabled={gameStatus === GAME_RESULTS.isPlaying}
				/>
				<Button
					text={BUTTON_LABELS.revealTheWord}
					onClick={() => {
						setWord(wordToGuess);
					}}
					hidden={gameStatus === GAME_RESULTS.initial}
					disabled={gameStatus !== GAME_RESULTS.hasLost || word === wordToGuess}
				/>
			</section>
		</div>
	);
};
