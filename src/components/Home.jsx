import React from 'react';
import countries from "../countries.jpeg"

const Home = () => {
  return (
    <div className='text-center mt-5 homepage-container'>
      <div>
        <span>Countries app </span>is a simple React application made in
        Business College Helsinki lessons. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>.
      </div>
        <img src={countries} alt="Countries" className='countries-photo' />
    </div>
  );
};

export default Home;
