import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovie } from '../reduxslice/movieslice';
import MovieItem from './MovieItem';
import MovieCreate from './MovieCreate'

export default function MovieList() {

    const isAdminLoggedIn = useSelector((state)=> state.adminreducer.isAdminLoggedIn);

    const [isedit, setIsedit] = useState(false)

    const createEvent = ()=>
    {
        setIsedit(true)
    }

    const cancel=()=>{
        setIsedit(false)
    }

    const dispatch = useDispatch()
    const status = useSelector((state) => state.moviereducer.status);
    const movies = useSelector((state) => state.moviereducer.movies);
    
    useEffect(()=>{
      if(status==='idle'){
          dispatch(fetchMovie());
      }
    },[dispatch, status])
    
    let content = 'Hi there'
    if(status === 'loading'){
        console.log(content)
      content = "Loading...";
    }
    else if (status === 'success') {

      console.log(movies)
      if (movies[0] !== undefined) {
        content = (<div className='col-8'>{movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
        </div>
        )
        console.log(">1")
      }
      else {
        content = (<div className='col-8'>'No movies in database. </div>)
      }
  
    }
    return (

      <div> 

        { isAdminLoggedIn &&<div className="col-8 m-3">
        <button class="btn btn-primary" onClick={createEvent}>Create Event</button>
        </div>}
        {isedit && <MovieCreate cancel={cancel} setIsedit={setIsedit}/>}
        {content}

      </div>
    )
  }