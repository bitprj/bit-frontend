import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Content from '../components/Learn/Content';
import HintSection from '../components/Learn/HintSection';
import Concept from '../components/Learn/Concept';
import Navigation from '../components/Learn/Navigation';

import LearnService from '../services/LearnService';

const LearnSection = styled.div`
    margin-top: 20px;
`

class Learn extends Component {
    constructor() {
        super();
        this.state = {
            labID: null,
            labTitle: '',
            cards: null,
            cardTitles: [],
            currentCard: null,
            lastCardUnlocked: null,
            totalGems: 256
        }
        this.cardTitleChangedHandler = this.cardTitleChangedHandler.bind(this);
        this.stepClickedHandler = this.stepClickedHandler.bind(this);
        this.moveClickedHandler = this.moveClickedHandler.bind(this);

        this.service = new LearnService();
    }

    componentDidMount() {
        this.service.getLabInfo(1).then(data => {
            this.setState({
                labID: data.lab_id,
                labTitle: data.lab_title,
                cards: data.cards,
                cardTitles: data.cards.map(card => card.card_title),
                currentCard: data.last_card_unlocked,
                lastCardUnlocked: data.last_card_unlocked
            })
        })
    }

    cardTitleChangedHandler = (event) => {
        this.setState({ cardTitle: event.target.value });
    }

    stepClickedHandler = (index) => {
        if (index < this.state.lastCardUnlocked) {
            this.setState({ currentCard: index });
        }
    }

    moveClickedHandler = (step) => {
        const destination = this.state.currentCard + step;
        const last = (destination > this.state.lastCardUnlocked) ? destination : this.state.lastCardUnlocked;
        if (destination >= 0 && destination < this.state.cards.length) {
            this.setState({
                currentCard: destination,
                lastCardUnlocked: last
            })
        };
    }

    render() {
        return (
            <LearnSection>
                <Grid container spacing={2}>
                    <Grid item xs={3} sm={2}>
                        <Navigation
                            labTitle={this.state.labTitle}
                            totalGems={this.state.totalGems}
                            cardTitles={this.state.cardTitles}
                            currentCard={this.state.currentCard}
                            lastCardUnlocked={this.state.lastCardUnlocked}
                            click={this.stepClickedHandler} />
                    </Grid>

                    <Grid item xs={9} sm={7}>
                        <Content cardContent={this.state.cardContent} click={this.moveClickedHandler} />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <HintSection />
                    </Grid>
                </Grid>
            </LearnSection>
        );
    }
}

export default Learn;