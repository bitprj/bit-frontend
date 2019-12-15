import React, { Component } from 'react';
import NavBar from "./components/LearningView/NavBar";
import Navigation from './components/LearningView/Navigation';
import Content from './components/LearningView/Content';
// import { render } from '@testing-library/react';

class App extends Component {
    state = {
        userLoggedIn: true,
        labTitle: "Intro to Python",
        cardTitle: "Object-Oriented Programming",
        cardContent: "Some Content Here.",
        cardTitles: [
            "This is Card 1",
            "And then Card 2",
            "Also Card 3",
            "End with Card 4"
        ],
        totalGems: 256
    }

    cardTitleChangedHandler = (e) => {
        this.setState({ cardTitle: e.target.value });
    }

    render() {
        return (
            <div className="App">
                <NavBar
                    labTitle={this.state.labTitle}
                    cardTitle={this.state.cardTitle}
                    totalGems={this.state.totalGems}
                />

                <div className="learn-section">
                    <Navigation cardTitles={this.state.cardTitles} />
                    <Content cardContent={this.state.cardContent} />
                </div>

                <style jsx>{`
					.learn-section {
						display: flex;
				`}</style>

                {/* input for testing */}
                <input type='text' onChange={this.cardTitleChangedHandler} value={this.state.cardTitle} />
            </div>
        );
    }
}

export default App;
