import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to log in
export const loginUser = createAsyncThunk('user/login', async (formData, thunkAPI) => {
    try {
        const response = await axios.post('/api/users/login', formData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logoutUser(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
