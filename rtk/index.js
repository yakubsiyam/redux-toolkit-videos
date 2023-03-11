const store = require("./app/store");
const { fetchVideos } = require("./features/video/videoSlice");

// subscribe to state changes
store.subscribe(() => {
  // console.log(store.getState());
});

// disptach actions
store.dispatch(fetchVideos());

console.log(`Hello ${fetchVideos()?.video?.videos}`);
