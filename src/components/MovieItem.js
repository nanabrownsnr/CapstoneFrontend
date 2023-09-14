import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {deleteMovie} from '../reduxslice/movieslice'
import { onAdd } from "../reduxslice/cartslice";
import MovieEdit from './MovieEdit'



export default function MovieItem({movie}) {
  const isUserLoggedIn = useSelector((state)=> state.userreducer.isUserLoggedIn);
  const isAdminLoggedIn = useSelector((state)=> state.adminreducer.isAdminLoggedIn);
  const [isedit, setIsedit] = useState(false)
  let dispatch = useDispatch();
  // let navigate = useNavigate()

const addtoCart = (movie)=>
{
  dispatch(onAdd(movie))

    // navigate('/')
}

const EditMovie = (movie)=>
{
    setIsedit(true)
}

const cancel=()=>{
  setIsedit(false)
}

const deleteEvent = (movie_id)=>
{
  dispatch(deleteMovie(movie_id))

}
  return (
    <div className="container mt-4">

      {movie !== undefined ? (
        <div className="row">
          <div className="col-md-2">
            <p>
              <img src={movie.imageurl} className="img-fluid" height="100" width="200"/>
            </p>
          </div>
          <div className="col-md-6">
            <h2>{movie.title}</h2>
            <h5>{movie.price}</h5>
            <h6>{movie.showingtime}</h6>
            <p>{movie.synopsis}</p>
            <br></br>
            {isUserLoggedIn &&   <div class="d-grid gap-2 col-4">

              <button class="btn btn-primary" type="button" onClick={()=>{addtoCart(movie)}}>Add Ticket to Cart</button>
            </div>}
            {isAdminLoggedIn &&   <div class="d-grid gap-2 col-4">

              <button class="btn btn-primary" type="button" onClick={()=>{EditMovie(movie)}}>Edit</button>
              <button class="btn btn-danger" onClick={()=>{deleteEvent(movie.id)}} >Delete</button>
             
            </div>}
          </div>

          <div className="col-md-8">
          {isedit && <MovieEdit movie ={movie} cancel={cancel} setIsedit={setIsedit}/>}
          </div>
        </div>)
         : 
         (<div>No item yet</div>)}
    </div>
  );
}