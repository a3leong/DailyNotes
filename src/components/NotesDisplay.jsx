import React from 'react';
import { useSelector } from 'react-redux';
import styles from './NotesDisplay.module.scss';

export default function NotesDisplay() {
  const selectedLabelKey = useSelector(state => state.selectedLabelKey);
  const notes = useSelector(state => state.notes[selectedLabelKey]);

  console.log(notes);
  return (
    <div className={styles.NotesDisplay}>
      {
        notes.items.map(noteObj => (
          <div>{noteObj.title}</div>
        ))
      }
    </div>
  );
}

NotesDisplay.displayName = 'NotesDisplay';
