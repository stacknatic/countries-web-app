import React from 'react';
import countries from "../countries.jpeg"

const Home = () => {
  return (
    <div className='text-center mt-5 homepage-container'>
      <div>
        <span>Countries app </span>is a simple React application that shows useful information about all countries. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>.
      </div>
        <img className='p-3 countries-photo' src={countries} alt="Countries image"  />
    </div>
  );
};

export default Home;