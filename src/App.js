import { useEffect, useState } from 'react';
import Main from './components/Main.jsx';
import Navbar from './components/Navbar';
import { tempMovieData } from './data.js';
import Logo from './components/Logo.jsx';
import Search from './components/Search.jsx';
import NumResults from './components/NumResults.jsx';
import MovieList from './components/MovieList.jsx';
import { KEY } from './apiKey.js';
import Loader from './components/Loader.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import MovieDetails from './components/MovieDetails.jsx';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // const query = 'interstellar';
  // const query = 'fdgres';

  function handleSelectMovie(id) {
    setSelectedId(id);
    // setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies');
        }
        const data = await res.json();
        // console.log(data);
        //R AND F IN RESPONSE AND FALSE ARE CAPITAL LETTERS
        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }
        //S IN SEARCH IS CAPITAL LETTER
        setMovies(data.Search);
        // setIsLoading(false);
      } catch (err) {
        // console.error(err.message);
        setError(err.message);
        // setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <div className='box'>
          {/* <MovieList movies={movies} /> */}
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </div>
        <div className='box'>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <h3>No movie has been selected.</h3>
          )}
        </div>
      </Main>
    </>
  );
}

export default App;
