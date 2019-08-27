import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { fetchNotes } from '../actions';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const dispatch = useDispatch();

  dispatch(() => fetchNotes('general'));
  // dispatch(fetchNotes('general')).then(() => console.log(store.getState()));

  const labels = useSelector(state => state.sidebar.labels);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const sidebarClass = classNames({
    [styles.Sidebar]: true,
    [styles.open]: sidebarIsOpen,
  });

  return (
    <div className={sidebarClass}>
      <div className={styles.header} onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
        <div>Labels</div>
        <div>{sidebarIsOpen ? '<' : '>'}</div>
      </div>
      <div className={styles.content}>
        {
          labels.map(labelObj => (
            <div key={labelObj.key}>{labelObj.label}</div>
          ))
        }
      </div>
    </div>
  );
}

Sidebar.displayName = 'Sidebar';
