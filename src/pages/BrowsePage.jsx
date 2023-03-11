import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import PhotoAlbum from "react-photo-album";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

import classes from "./BrowsePage.module.css";

const BrowsePage = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://long-teal-mackerel-wear.cyclic.app/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        const photo = result.data.map(post => (
          { src: post.photo, width: 1080, height: 1080 }
        ));
        setAllPosts(photo.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  let content;

  if (allPosts.length <= 0) {
    content = <Loader />;
  } else {
    content = <PhotoAlbum layout="masonry" photos={allPosts} />;
  }

  return (
    <div className={classes.browsePage}>
      <Header />
      <h1>Browse Image</h1>
      <div className={classes.content}>
        {content}
      </div>
      <Footer />
    </div>
  );
};

export default BrowsePage;