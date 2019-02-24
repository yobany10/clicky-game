import React, { Component } from "react";
import Card from "../Card";
import cardData from "../../cards.json";
import Nav from "../Navbar";
import Jumbotron from "../Jumbotron";
import './style.scss';

class Game extends Component {

    state = {
        score: 0,
        highScore: 0,
        cardData,
        clickedList: []
    }

    componentDidMount() {
        const { cardData} = this.state;
        this.shuffleCards(cardData);
    }

    handleClick = (id) => {
        const { score, clickedList, cardData, highScore} = this.state;
        this.shuffleCards(cardData)
        const alreadyClicked = clickedList.includes(id);
        if (alreadyClicked) {
            const bestScore = Math.max(score, highScore)
            this.resetGame(bestScore);
        } else {
            const newScore = score + 1;
            this.setState({
                score: score + 1,
                clickedList: [...clickedList, id]
            })
            if (newScore === cardData.length) 
                this.resetGame(newScore);
        }
    }

    resetGame = highScore => {
        this.setState({
            score: 0,
            clickedList: [],
            highScore: highScore
        })
    } 

    shuffleCards = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        this.setState({
            cardData: [...array]
        })
    }

    render() {
        return (
            <div>
                <Nav 
                primaryHeadingText="Score:"
                primaryHeadingValue={this.state.score}
                secondaryHeadingText="High Score:"
                secondaryHeadingValue={this.state.highScore}
                />
                <Jumbotron />
                <div class="cards">
                {this.state.cardData.map((card) => (
                    <Card
                        name={card.name}
                        image={card.image}
                        key={card.id}
                        id={card.id}
                        handleClick={this.handleClick}
                    />
                ))}
                </div>
            </div>
        )
    }
}

export default Game;