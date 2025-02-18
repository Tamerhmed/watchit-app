import React, { useEffect, useState } from 'react';
import { KEY } from '../apiKey';

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const {
    Title: title,
    Year: year,
    Poster: poster,
    RunTime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
  } = movie;
  console.log(title, year);
  //api parameters documentation

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        // console.log(data);
        setMovie(data);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = 'watchIt';
      };
    },
    [title]
  );

  return (
    <div className='details'>
      <header>
        <button className='btn-back' onClick={() => onCloseMovie()}>
          &larr;
        </button>
        <img src={poster} alt={title} />
        <div className='details-overview'>
          <h2>{title}</h2>
          <p>{released}</p>
          <p>
            <span>⭐</span>
            {imdbRating}
          </p>
        </div>
      </header>
      <section>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
