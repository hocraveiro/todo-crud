import React from 'react';
import styles from './header.module.scss';

function Header (props) {
  return (
    <div className="header">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/"><img className={styles.logo} alt="app logo" src="/icon.svg"></img> TODO CRUD</a>
      </nav>
    </div>
  );
}

export default Header;
