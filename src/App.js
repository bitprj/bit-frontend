import React from 'react';
import NavBar from "./components/NavBar";
import Navigation from './components/Navigation';
import Content from './components/Content';

function App() {
	return (
		<div className="App">
			<NavBar />
			<Navigation />
			<Content />
		</div>
	);
}

export default App;
