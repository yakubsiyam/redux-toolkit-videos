const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// Initial State
const initialState = {
    loading: false,
    videos: {},
    error: "",
}

// Define the API endpoint URL
const API_URL = 'http://localhost:9000/videos';

// create async thunk
const fetchVideos = createAsyncThunk("video/fetchVideos", async() => {
    const response = await fetch(
        API_URL
    );

    const videos = await response.json();
    return videos;
});

// Define an async thunk to fetch related videos based on tags
const fetchRelatedVideos = createAsyncThunk('videos/fetchRelatedVideos', async (tags) => {
    const response = await fetch(`${API_URL}?tags_like=${tags.join('&tags_like=')}`);
    return response.data;
  });

const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {

        // Add reducers for fetchVideos async thunk
        builder.addCase(fetchVideos.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.videos = action.payload;
        });

        builder.addCase(fetchVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.videos = {};
        });

        // Add reducers for fetchRelatedVideos async thunk
        builder.addCase(fetchRelatedVideos.pending, (state) => {
        state.loading = true;
        });

        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
        });

        builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        });
    },
})

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
module.exports.fetchRelatedVideos = fetchRelatedVideos;