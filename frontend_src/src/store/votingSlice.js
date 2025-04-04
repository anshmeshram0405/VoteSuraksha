import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch candidates
export const fetchCandidates = createAsyncThunk('voting/fetchCandidates', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/api/candidates');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const votingSlice = createSlice({
    name: 'voting',
    initialState: {
        candidates: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCandidates.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCandidates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.candidates = action.payload;
            })
            .addCase(fetchCandidates.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default votingSlice.reducer;
