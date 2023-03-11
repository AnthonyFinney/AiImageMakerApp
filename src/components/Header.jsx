import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className={classes.header}>
      <button onClick={() => handleNavigate("/")}>AI Image</button>
      <nav>
        <ul className={classes.navLink}>
          <li>
            <button onClick={() => handleNavigate("/create")}>
              Create Image
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigate("/browse")}>
              Browse Image
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;