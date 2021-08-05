import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from './context';

const SingleMovie = () => {
  console.log(API_ENDPOINT);
  return <h2>single movie</h2>;
};

export default SingleMovie;
