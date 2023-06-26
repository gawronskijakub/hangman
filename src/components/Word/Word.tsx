import styles from './Word.module.scss';

interface IWordProps {
	word: string;
}

export const Word = ({ word }: IWordProps) => {
	return word ? <section className={styles.word}>{word}</section> : null;
};
