import {configureStore} from '@reduxjs/toolkit';
import userreducer from './reduxslice/userslice';
import adminreducer from './reduxslice/adminslice';
import moviereducer from './reduxslice/movieslice';
import cartreducer from './reduxslice/cartslice';

export default configureStore({
    reducer:{
        userreducer,
        adminreducer,
        moviereducer,
        cartreducer

    }
});