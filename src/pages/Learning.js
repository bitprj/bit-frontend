import React, { Component } from 'react';

import NavBar from '../components/Learning/NavBar';
import Navigation from '../components/Learning/Navigation';
import Content from '../components/Learning/Content';
import HintSection from '../components/Learning/HintSection';

import LearningService from '../services/LearningService';

class Learning extends Component {
    constructor() {
        super();
        this.state = {
            userLoggedIn: true,
            labTitle: "",
            cardTitle: "Object-Oriented Programming",
            cardContent: "",
            cardTitles: [
                "This is Card 1",
                "And then Card 2",
                "Also Card 3",
                "End with Card 4"
            ],
            currentCard: null,
            totalGems: 256
        }

        this.learningService = new LearningService();
    }

    componentDidMount() {
        this.learningService.getLabInfo().then(data => {
            this.setState({
                labTitle: data.lab_title,
                currentCard: data.last_card_opened
            })
        })
    }

    cardTitleChangedHandler = (event) => {
        this.setState({ cardTitle: event.target.value });
    }

    stepClickedHandler = (index) => {
        this.setState({ currentCard: index });
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
                    <Navigation
                        cardTitles={this.state.cardTitles}
                        currentCard={this.state.currentCard}
                        click={this.stepClickedHandler}
                    />
                    <Content cardContent={this.state.cardContent} />
                    <HintSection />
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

export default Learning;