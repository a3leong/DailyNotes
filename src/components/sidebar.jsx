import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const sidebarClass = classNames({
    [styles.Sidebar]: true,
    [styles.open]: sidebarIsOpen,
  });

  return (
    <div className={sidebarClass}>
      <div className={styles.header} onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
        <div>Groups</div>
        <div>{sidebarIsOpen ? '<' : '>'}</div>
      </div>
      <div className={styles.content}>
          Sidebar content goes here
      </div>
    </div>
  );
}

Sidebar.displayName = 'Sidebar';
