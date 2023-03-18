import React, { lazy } from 'react';
import './App.css';
const Posts = lazy(() =>
	import('./components/Posts').then((module) => ({ default: module.Posts }))
);

function App() {
  return (
    <div>
      <h1>Blog Posts</h1>
      <Posts />
    </div>
  );
}

export default App;
