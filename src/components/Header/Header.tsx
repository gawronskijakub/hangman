import 'typeface-lilita-one';

import styles from './Header.module.scss';

export const Header = () => {
	return (
		<header className={styles.header}>
			<h1 className={styles.heading}>HANGMAN</h1>
		</header>
	);
};
