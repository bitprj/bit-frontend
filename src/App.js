import React, { Component } from 'react';
// import { render } from '@testing-library/react';

import NavBar from "./components/Learning/NavBar";
import Navigation from './components/Learning/Navigation';
import Content from './components/Learning/Content';

import LearningService from './services/LearningService';

class App extends Component {
    constructor() {
        super();
        this.state = {
            userLoggedIn: true,
            labTitle: "",
            cardTitle: "Object-Oriented Programming",
            cardContent: "Some Content Here.",
            cardTitles: [
                "This is Card 1",
                "And then Card 2",
                "Also Card 3",
                "End with Card 4"
            ],
            lastCardOpened: 0,
            totalGems: 256
        }

        this.learningService = new LearningService();
    }

    componentDidMount() {
        this.learningService.getLabInfo().then(data => {
            this.setState({ labTitle: data.lab_title })
        })
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
