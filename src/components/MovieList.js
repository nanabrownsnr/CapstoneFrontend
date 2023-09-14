import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovie } from '../reduxslice/movieslice';
import MovieItem from './MovieItem';
import MovieSearch from './MovieSearch';

export default function MovieList() {

  const dispatch = useDispatch()
  const status = useSelector((state) => state.moviereducer.status);
  const movies = useSelector((state) => state.moviereducer.movies);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovie());
    }
  }, [dispatch, status])
  let content = 'Hi there'
  if (status === 'loading') {
    console.log(content)
    content = "Loading...";
  }
  else if (status === 'success') {

    if (movies[0] !== undefined) {
      content = (<div className='col-8'>{movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
      </div>
      )
      console.log(">1")
    }
    else {
      content = (<div className='col-8'>'No matching movies found. </div>)
    }

  }
  return (

    <div>
      {<MovieSearch />}
      {content}

    </div>
  )
}