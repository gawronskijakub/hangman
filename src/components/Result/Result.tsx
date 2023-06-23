import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IResultProps {
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;
	word: string;
	mistakes: number;
}

export const Result = ({ isPlaying, setIsPlaying, word, mistakes }: IResultProps) => {
	const [resultText, setResultText] = useState('');

	useEffect(() => {
		if (mistakes === 7) {
			setResultText('You lost...');
			setIsPlaying(false);
		} else if (word.length > 0 && !word.includes('_')) {
			setResultText('Congratulations');
			setIsPlaying(false);
		}
	}, [word, mistakes]);

	return !isPlaying && resultText ? <p>{resultText}</p> : null;
};
