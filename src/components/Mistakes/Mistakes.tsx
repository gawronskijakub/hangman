import styles from './Mistakes.module.scss';

interface IMistakesProps {
	mistakes: number;
}

export const Mistakes = ({ mistakes }: IMistakesProps) => {
	return <section className={styles.miastakes}>{`Mistakes: ${mistakes}`}</section>;
};
