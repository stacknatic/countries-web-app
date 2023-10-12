import React, { useEffect, useState, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../features/countries/countriesSlice';
import CountryCard from './CountryCard';

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);

  const [search, setSearch] = useState('');
  const [visibleCountries, setVisibleCountries] = useState(20);
  const [loading, setLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        canLoadMore &&
        containerRef.current &&
        window.innerHeight + window.scrollY >=
          containerRef.current.offsetTop + containerRef.current.offsetHeight * 0.9
      ) {
        setLoading(true);
        setCanLoadMore(false);

        setTimeout(() => {
          let remainingCountries = countriesList.length - visibleCountries;
          let countriesToLoad = remainingCountries >= 20 ? 20 : remainingCountries;
          setVisibleCountries(visibleCountries + countriesToLoad);

          if (visibleCountries < countriesList.length) {
            setCanLoadMore(true);
          } else {
            console.log('No more countries to load.');
          }

          setLoading(false);
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleCountries, canLoadMore, countriesList]);

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              className="me-2"
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3" ref={containerRef}>
        {countriesList
          .filter((c) => {
            return c.name.official.toLowerCase().includes(search.toLowerCase());
          })
          .slice(0, visibleCountries)
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </Row>
      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
};

export default Countries;
