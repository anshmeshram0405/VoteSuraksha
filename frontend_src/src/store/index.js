import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import votingReducer from './votingSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        voting: votingReducer,
    },
});

export default store;
