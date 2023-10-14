import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row, Spinner, Carousel } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!country.capital) {
          setError(true);
          setLoading(false);
        } else {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`);
          setWeather(response.data);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [country.capital]);

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="dark" />
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <Carousel>
              <Carousel.Item>
                <Image
                  thumbnail
                  src={`https://source.unsplash.com/1600x900/?${country.capital}&image=1`}
                  alt="First slide"
                  onLoad={() => setImageLoaded(true)}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  thumbnail
                  src={`https://source.unsplash.com/1600x900/?${country.capital}&image=2`}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  thumbnail
                  src={`https://source.unsplash.com/1600x900/?${country.capital}&image=3`}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          )}
          {!imageLoaded && !loading && (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="dark" />
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </Col>
        <Col>
          <h2 className="display-4">{country.name.common}</h2>
          <h3>{country.capital}</h3>
          {error && (
            <p>Sorry, we don't have weather information for this country.</p>
          )}
          {!error && weather && (
            <div>
              <p>
                Right now it is <strong>{parseInt(weather.main.temp)}</strong> degrees in {country.capital} and {weather.weather[0].description}
              </p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="light" onClick={() => navigate('/countries')} className="mt-1">
            Back to Countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
