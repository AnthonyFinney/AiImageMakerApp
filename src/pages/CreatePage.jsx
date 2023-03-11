import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';
import Loader from "../components/Loader";
import preview from "../assets/preview.png";

import classes from "./CreatePage.module.css";

const CreatePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://long-teal-mackerel-wear.cyclic.app/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://long-teal-mackerel-wear.cyclic.app/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        navigate("/browse");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <div className={classes.createPage}>
      <Header />
      <div className={classes.gridContainer}>
        <div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <label>Enter Name and Prompt To Create Your Image</label>
            <input type="text" name="prompt" onChange={handleChange} placeholder="Enter Prompt" />
            <input type="text" name="name" onChange={handleChange} placeholder='Enter Name' />
            <div>
              <button type="button" onClick={generateImage}>
                {generatingImg ? 'Generating...' : 'Generate'}
              </button>
              <button type="submit">{loading ? 'Sharing...' : 'Share'}</button>
            </div>
          </form>
        </div>
        <div className={classes.aiImage}>
          {generatingImg ? (
            <div>
              <Loader />
            </div>
          ) : (
            form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
              />
            ) : (
              <img
                src={preview}
                alt="preview"
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePage;