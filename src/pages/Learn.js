import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Content from '../components/Learn/Content/Content';
import HintSection from '../components/Learn/Hint/HintSection';
import Navigation from '../components/Learn/Navigation/Navigation';

import LearnService from '../services/LearnService';

const LearnSection = styled.div`
    margin: 10px -5px -5px -5px;
    display: flex;
`

const navbar_style = {
    background: '#0a192f',
    marginTop: '-5px',
}

class Learn extends Component {
    constructor(props) {
        super();
        this.state = {
            labID: '12345', // props.labID
            labTitle: '',
            cards: [],
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
            cards: [
                {
                    cardID: '5PKQgXzL92klwCqFkjdgSO',
                    // conceptID: '1gzvGY8AuGVhyxwAirTDrZ',
                },
                {
                    cardID: '1JwAQjfrrVPrX5vTTssXuk',
                    conceptID: null,
                    // conceptID: '3eMbITuRyLlFGUuAZ2X2NP',
                },
                {
                    cardID: '1jxXINtvTvhZXHT8eDiKPK',
                    conceptID: null,
                    // conceptID: '1gzvGY8AuGVhyxwAirTDrZ',
                },
                {
                    cardID: '5SFmjFkBTVdDyiSt32slHU',
                    conceptID: null,
                },
            ],
            cardTitles: ['Card 1', 'Card 2', 'Card 3', 'Card 4'],
            currentCardID: '1jxXINtvTvhZXHT8eDiKPK',
            currentCard: 2,
            lastCardUnlocked: 2,
            totalGems: 256
        })
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.cards !== prevProps.cards) {
    //         console.log(this.state.cards);

    //         const cardTitles = this.service.getCardTitles(this.state.cards);
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
                currentCardID: this.state.cards[index].cardID,
            });
        }
    }

    moveClickedHandler = (step) => {
        const destination = this.state.currentCard + step;
        const nextCardID = this.state.cards[destination].cardID;
        const last = (destination > this.state.lastCardUnlocked) ? destination : this.state.lastCardUnlocked;

        if (destination >= 0 && destination < this.state.cards.length && destination !== this.state.currentCard) {
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
        const lastCard = this.state.currentCard === this.state.cards.length - 1;
        const conceptID = this.state.cards[this.state.currentCard] ? this.state.cards[this.state.currentCard].conceptID : null;

        return (
            <LearnSection>
                <Grid container spacing={1} justify='center'>
                    <Grid item xs={12} sm={4} md={3} style={navbar_style}>
                        <Navigation
                            labTitle={this.state.labTitle}
                            totalGems={this.state.totalGems}
                            cardTitles={this.state.cardTitles}
                            currentCard={this.state.currentCard}
                            lastCardUnlocked={this.state.lastCardUnlocked}
                            click={this.stepClickedHandler} />
                    </Grid>

                    <Grid item xs={12} sm={8} md={5}>
                        <Content
                            cardID={this.state.currentCardID}
                            conceptID={conceptID}
                            click={this.moveClickedHandler}
                            firstCard={firstCard}
                            lastCard={lastCard} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <HintSection
                            labID={this.state.labID}
                            cardID={this.state.currentCardID}
                            changeTotalGems={this.changeTotalGems} />
                    </Grid>
                </Grid>
            </LearnSection>
        );
    }
}

export default Learn;
