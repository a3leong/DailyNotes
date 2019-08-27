import React from 'react';
import NotesDisplay from './components/NotesDisplay';
import Sidebar from './components/Sidebar';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <div>Daily Notes</div>
      </header>
      <Sidebar />
      <div className={styles.NotesDisplayHolder}>
        <NotesDisplay />
      </div>
    </div>
  );
}

export default App;
