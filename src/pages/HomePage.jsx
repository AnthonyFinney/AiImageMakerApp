import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={classes.homePage}>
      <div className={classes.gridContainer}>
        <h1>Ai Image Maker</h1>
        <div className={classes.buttonGroup}>
          <button onClick={() => handleNavigate("/create")}>Create Image</button>
          <button onClick={() => handleNavigate("/browse")}>Browse Image</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;