import React , {useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateMovie} from '../reduxslice/movieslice'

export default function MovieEdit({setIsedit, movie}) {

    const dispatch = useDispatch()
    let newmovie ={}
    const [title, setTitle] = useState(movie.title);
    const [price, setPrice] = useState(movie.price);
    const [showingtime, setShowingtime] = useState(movie.showingtime);
    const [synopsis, setSynopsis] = useState(movie.synopsis);
    const [imageurl, setImageurl] = useState(movie.imageurl);


    const handleChangeItem =(event)=>{
        let name = event.target.name;
        let value = event.target.value;
        switch(name){
            case 'title' : 
                setTitle(value);
                break;
            case 'price' : 
                setPrice(value);
                break;
            case 'showingtime' : 
                setShowingtime(value);
                break;
            case 'synopsis' : 
                setSynopsis(value);
                break;
            case 'imageurl' : 
                setImageurl(value);
                break;
            default:
                break;

        }

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        newmovie.id = movie.id
        newmovie.title= title
        newmovie.price= price
        newmovie.showingtime= showingtime
        newmovie.synopsis= synopsis
        newmovie.imageurl= imageurl
        console.log(newmovie)
        dispatch(updateMovie(newmovie));
        setIsedit(false)
    }

    const cancel=()=>{
      setIsedit(false)
  }
 

  return (
    <div>
    <div>
    <form onSubmit={handleSubmit}>
        <div className="p-5">
        <div className="row mb-2">
                <input type="text" className="form-control" 
                name='title' value={title} onChange={handleChangeItem}
                placeholder="Enter movie title"/>
            </div>
            <div className="row mb-2">
                <input type="text" className="form-control" 
                name='price' value={price} onChange={handleChangeItem} 
                placeholder="Enter price"/>
            </div>
            <div className="row mb-2">
                <input type="text" className="form-control" 
                name='showingtime' value={showingtime} onChange={handleChangeItem} 
                placeholder="Enter showing time"/>
            </div>
            <div className="row mb-2">
                <input type="text" className="form-control" 
                name='synopsis' value={synopsis} onChange={handleChangeItem} 
                placeholder="Enter movie synopsis"/>
            </div>
            <div className="row mb-2">
                <input type="text" className="form-control" 
                name='imageurl' value={imageurl} onChange={handleChangeItem} 
                placeholder="Enter image url" aria-label="Last name"/>
            </div>
        </div>
        <div className='row text-center mb-1'>
            <div className="col-12">
                <button type="submit"
                className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        <div className='row text-center mb-1'>
            <div className="col-12">
                <button type="submit"
                className="btn btn-primary" onClick={cancel}>Cancel</button>
            </div>
            
        </div>
        
    </form>
</div>
</div>
  )
}