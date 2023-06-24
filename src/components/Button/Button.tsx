import styles from './Button.module.scss';

interface IButtonProps {
	classList?: string[];
	onClick: () => void;
	text: string;
}

export const Button = ({ classList, onClick, text }: IButtonProps) => {
	return (
		<button
			className={`${classList?.join(' ')} ${styles.button}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};
