import React from 'react';

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <p>Copyright © Anthony. All rights reserved.</p>
        <p>This website uses Openai's Dall-E software under license,</p>
        <p> and is not affiliated with or endorsed by Openai.</p>
      </div>
    </footer>
  );
};

export default Footer;