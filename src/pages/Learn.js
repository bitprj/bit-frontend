import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Content from '../components/Learn/Content';
import HintSection from '../components/Learn/HintSection';
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
            // cards: null,
            cardIDs: [],
            cardTitles: [],
            currentCard: null,
            lastCardUnlocked: null,
            currentCardID: '',
            totalGems: null
        }
        this.cardTitleChangedHandler = this.cardTitleChangedHandler.bind(this);
        this.stepClickedHandler = this.stepClickedHandler.bind(this);
        this.moveClickedHandler = this.moveClickedHandler.bind(this);
        this.changeTotalGems = this.changeTotalGems.bind(this);

        this.service = new LearnService();
    }

    componentDidMount() {
        // this.service.getActivityInfo(1).then(data => {
        //     this.setState({
        //         labID: data.lab_id,
        //         labTitle: data.lab_title,
        //         cards: data.cards,
        //         // cardTitles: data.cards.map(card => card.card_title),
        //         currentCard: data.last_card_unlocked,
        //         lastCardUnlocked: data.last_card_unlocked
        //     })
        // })

        this.setState({
            labID: '12345',
            labTitle: 'Intro to Programming',
            cardIDs: ['5PKQgXzL92klwCqFkjdgSO', '1JwAQjfrrVPrX5vTTssXuk', '1jxXINtvTvhZXHT8eDiKPK', '5SFmjFkBTVdDyiSt32slHU'],
            cardTitles: ['Card 1', 'Card 2', 'Card 3', 'Card 4',],
            currentCardID: '5PKQgXzL92klwCqFkjdgSO',
            currentCard: 0,
            lastCardUnlocked: 0,
            totalGems: 256
        })

        // console.log(this.state.cardIDs);

        // const cardTitles = this.service.getCardTitles(this.state.cardIDs);
        // // console.log(cardTitles);
        // this.setState({
        //     cardTitles: cardTitles
        // })
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.cardIDs !== prevProps.cardIDs) {
    //         console.log(this.state.cardIDs);

    //         const cardTitles = this.service.getCardTitles(this.state.cardIDs);
    //         // console.log(cardTitles);
    //         this.setState({
    //             cardTitles: cardTitles
    //         })
    //     }
    // }

    cardTitleChangedHandler = (event) => {
        this.setState({ cardTitle: event.target.value });
    }

    stepClickedHandler = (index) => {
        if (index <= this.state.lastCardUnlocked) {
            this.setState({
                currentCard: index,
                currentCardID: this.state.cardIDs[index],
            });
        }
    }

    moveClickedHandler = (step) => {
        const destination = this.state.currentCard + step;
        const nextCardID = this.state.cardIDs[destination];
        const last = (destination > this.state.lastCardUnlocked) ? destination : this.state.lastCardUnlocked;

        if (destination >= 0 && destination < this.state.cardIDs.length && destination !== this.state.currentCard) {
            this.setState({
                currentCard: destination,
                currentCardID: nextCardID,
                lastCardUnlocked: last
            })
        };
    }

    changeTotalGems = (difference) => {
        const newTotalGems = this.state.totalGems + difference;
        this.setState({
            totalGems: newTotalGems
        })
    }

    render() {
        const firstCard = this.state.currentCard === 0;
        const lastCard = this.state.currentCard === this.state.cardIDs.length - 1;
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

                    <Grid item xs={9} sm={6}>
                        <Content
                            cardID={this.state.currentCardID}
                            click={this.moveClickedHandler}
                            firstCard={firstCard}
                            lastCard={lastCard} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <HintSection changeTotalGems={this.changeTotalGems} />
                    </Grid>
                </Grid>
            </LearnSection>
        );
    }
}

export default Learn;