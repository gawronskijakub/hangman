import styles from './Button.module.scss';

interface IButtonProps {
	classList?: string[];
	onClick: () => void;
	text: string;
	hidden?: boolean;
	disabled?: boolean;
}

export const Button = ({ classList, onClick, text, hidden, disabled }: IButtonProps) => {
	if (hidden) return null;

	return (
		<button
			className={`${classList ? classList?.join(' ') : ''} ${styles.button}`}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
};
