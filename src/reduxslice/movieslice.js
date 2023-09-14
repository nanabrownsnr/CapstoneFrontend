import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const initialState = {
    movies:[],
    status:"idle",
    error:''
}

export const fetchMovie = createAsyncThunk('fetch/Movie',async()=>{
        let response = await fetch('http://localhost:9000/movies')
        await console.log(response)
    return await response.json()
    
})


export const fetchMovieByTitle = createAsyncThunk('fetch/MovieByTitle',async(title)=>{
    let response = await fetch(`http://localhost:9000/movies/${title}`)
return await response.json()

})

export const addMovie = createAsyncThunk('add/Movie', async(movie)=>{
    let response =  await fetch(`http://localhost:9000/movies`,{
         method:'POST',
         body: JSON.stringify(movie),
         headers:{
             'Content-Type' : 'application/json'
         }
     })
     let data = await response;
     if(!data.ok){
         return Promise.reject('failure')
     }
     return Promise.resolve('success')
 })
 
 export const deleteMovie = createAsyncThunk('delete/Movie', async(id)=>{
     let response =  await fetch(`http://localhost:9000/movies/remove/${id}`,{
          method:'DELETE',
          
 
      })
     let data = await response;
     if(!data.ok){
         return Promise.reject('failure')
     }
     return Promise.resolve('success')
 
  })


  export const updateMovie = createAsyncThunk('update/Movie', async(movie)=>{
    console.log("updating")
    let response =  await fetch(`http://localhost:9000/movies`,{
         method:'PUT',
         body: JSON.stringify(movie),
         headers:{
             'Content-Type' : 'application/json'
         }

     })
    let data = await response;
    if(!data.ok){
        return Promise.reject('failure')
    }
    return Promise.resolve('success')

 })


const movieslice = createSlice({
    name:"movies",
    initialState, 
    reducers:{

        SortInAscendingOrder:(state, action)=>{
            state.movies = state.movies.sort((a, b) => a.title.localeCompare(b.title));     
        },
        SortInDescendingOrder:(state, action)=>{
            state.movies = state.movies.sort((a, b) => a.title.localeCompare(b.title) * -1); 
        }


    },
    extraReducers(builder){
        builder.addCase(fetchMovie.fulfilled, (state, action)=>{
            state.status = 'success';
            state.movies = action.payload
        })
        builder.addCase(fetchMovie.rejected, (state, action)=>{
            state.status='error'

        })
        builder.addCase(fetchMovieByTitle.fulfilled, (state, action)=>{
            state.status = 'success';

            console.log(action.payload)
            state.movies = action.payload
        })
        builder.addCase(fetchMovieByTitle.rejected, (state, action)=>{
            state.status='error'

        })
        builder.addCase(deleteMovie.fulfilled, (state, action)=>{
            state.status = 'success';
            state.movies = state.movies.filter(movie => movie.id !== action.meta.arg);

        })
        builder.addCase(deleteMovie.rejected, (state, action)=>{
            state.status='error'

        })
        builder.addCase(addMovie.fulfilled, (state, action)=>{
            state.status = 'success';
            state.movies = state.movies.concat(action.meta.arg);

        })
        builder.addCase(addMovie.rejected, (state, action)=>{
            state.status='error'

        })
        builder.addCase(updateMovie.fulfilled, (state, action)=>{
            state.status = 'success';
            console.log(action.meta.arg)
            state.movies = state.movies.filter(movie => movie.id !== action.meta.arg.id).concat(action.meta.arg);
  
        })
        builder.addCase(updateMovie.rejected, (state, action)=>{
            state.status='error'

        })
    }
})

export let {SortInAscendingOrder, SortInDescendingOrder} = movieslice.actions
export default movieslice.reducer;

