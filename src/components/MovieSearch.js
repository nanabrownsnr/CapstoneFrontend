import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import { fetchMovie, fetchMovieByTitle } from '../reduxslice/movieslice';
import {SortInAscendingOrder, SortInDescendingOrder} from '../reduxslice/movieslice';

export default function MovieSearch() {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('');


    const handleChangeItem = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchMovieByTitle(title));
    }

    const allmovies = () => {
        dispatch(fetchMovie());
    }


    const handleSort = (e) => {
        e.preventDefault();

        const sortType = document.querySelector(`select[name="sort"]`).value
        if (sortType === "ascending") {
            dispatch(SortInAscendingOrder())
          }
          else if (sortType === "descending") {
            dispatch(SortInDescendingOrder())
          }
    }



    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>

                    <div className="row m-3">
                        <div className="col-4 p-2">
                            <input type="text" className="form-control"
                                name='title' value={title} onChange={handleChangeItem}
                                placeholder="Enter Movie Title Name" aria-label="First name" />
                        </div>
                        <div className="col-3 p-2">

                            <button type="submit"
                                className="btn btn-primary" onClick={handleSubmit}>Search</button>
                        </div>
                    </div>
                </form>

                <form onSubmit={handleSort}>

                    <div className="row m-3">

                        <div className="col-3 p-2">
                            <select name='sort' class="form-select" aria-label="Default select example">
                                <option selected>Sort the title by?</option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                        <div className="col-1 p-2">

                            <button type="submit"
                                className="btn btn-primary" onClick={handleSort}>Sort</button>
                        </div>

                    </div>
                </form>



                <div className="col-1 m-3 p-2">

                    <button type="submit"
                        className="btn btn-primary" onClick={allmovies}>All movies</button>



                </div>







            </div>
        </div>
    )
}