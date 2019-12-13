import React from 'react';
import NavBar from "./components/NavBar";
import Navigation from './components/Navigation';
import Content from './components/Content';

function App() {
	return (
		<div className="App">
			<NavBar />
			<div class="learn-section">
				<Navigation />
				<Content />
			</div>
			<style jsx>{`
                .learn-section {
                    display: flex;
            `}</style>
		</div>
	);
}

export default App;
