import { useState } from 'react';
import Main from './components/Main.jsx';
import Navbar from './components/Navbar';
import { tempMovieData } from './data.js';
import Logo from './components/Logo.jsx';
import Search from './components/Search.jsx';
import NumResults from './components/NumResults.jsx';
import MovieList from './components/MovieList.jsx';

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  console.log(movies);
  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <div className='box'>
          <MovieList movies={movies} />
        </div>
      </Main>
    </>
  );
}

export default App;
