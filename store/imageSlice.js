import { createSlice } from '@reduxjs/toolkit';

export const imageSlice = createSlice({
    name: 'image',
    initialState: {
        current_url: ''
    },
    reducers: {
        setCurrentUrl: (state, action) => {
            state.current_url = action.payload
        },
    },
});

export const selectCurrentUrl = state => state.image.current_url;

export default imageSlice.reducer;
