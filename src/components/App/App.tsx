import { Game } from '@/components/Game';
import { Header } from '@/components/Header';

import styles from './App.module.scss';

export const App = () => {
	return (
		<div className={styles.app}>
			<Header />
			<Game />
		</div>
	);
};
