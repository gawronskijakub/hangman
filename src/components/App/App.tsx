import { Main } from '@/components/Main';
import { Header } from '@/components/Header';

import styles from './App.module.scss';

export const App = () => {
	return (
		<div className={styles.app}>
			<Header />
			<Main />
		</div>
	);
};
