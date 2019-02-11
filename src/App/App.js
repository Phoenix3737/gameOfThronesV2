import React, { Component } from 'react';
import styles from './App.module.scss';
import Letter from '../Letter/Letter'


// selects a random word from an array.//
const wordArray = ['STARK', 'LANNISTER', 'WILDLING', 'DRAGON',
    'WILDFIRE', 'WINTERFELL', 'BARATHEON', 'WESTEROS',
    'WOLF', 'LION', 'DRAGONSTONE', 'FIRE', 'ICE']

class App extends Component {
    constructor() {
        super();
        this.state = {
            wins: 0,
            losses: 0,
            showInfo: true,
            info: 'Press any letter key to start',
            alreadyGuessed: '',
            currentWord: this.generateWord(),
            guessesRemaining: 15,
            isActive: true
        };
        console.log(this.state.currentWord)
    }

    componentDidMount() {
        //Event listener for keys//
        window.addEventListener("keyup", (e) => {
            if (!this.state.isActive) {
                if (e.keyCode === 13) { //<--- Press enter to play agian//
                    // window.location.reload();
                    this.setState({
                        currentWord: this.generateWord(),
                        guessesRemaining: 15,
                        alreadyGuessed: []
                    })
                }
            }
            else {
                this.process(e.key);
            }
        });

        // Event listener for audio to play when the game starts//
        // document.getElementById("mute").style.display = "none";
        // window.addEventListener("keyup", function mute() {
        //     document.getElementById("mute").style.display = "block";
        //     var audio = document.getElementById("music");
        //     audio.volume = 0.1;
        //     audio.play();
        //     //Mute button//
        //     var muteButton = document.getElementById("mute");
        //     muteButton.onclick = function () {
        //         if (audio.paused) {
        //             audio.play();
        //             document.getElementById("mute").src = "http://franriavilla.in/images/mute.png";
        //         } else {
        //             audio.pause();
        //             document.getElementById("mute").src = "http://franriavilla.in/images/unmute.png";
        //             window.removeEventListener("keyup", mute); //<--remove listener so that audio doesn't restart after key press//
        //         }
        //     }
        // }
        // );
    }


    generateWord() {
        return wordArray[Math.floor(Math.random() * wordArray.length)]
            .split('')
            .map((letter) => ({
                letter,
                guessed: false,
            }))
    }

    process(key) {
        let upperCaseKey = key.toUpperCase()
        if (/[A-Z]/.test(upperCaseKey) && upperCaseKey.length === 1) {
            this.setState({
                showInfo: false,
            });
            if (this.state.alreadyGuessed.indexOf(upperCaseKey) > -1) {
                this.setState({
                    showInfo: true,
                    info: "You've already guessed that letter",
                    guessesRemaining: this.state.guessesRemaining + 1  //<--So that it doesnt count as a turn//
                });
            }
            else {
                this.setState({
                    alreadyGuessed: this.state.alreadyGuessed + upperCaseKey,
                });
            }

            if (this.state.guessesRemaining > 0) {
                this.setState({
                    guessesRemaining: this.state.guessesRemaining - 1,
                });

                if (this.state.currentWord.indexOf(upperCaseKey > -1)) {

                    this.state.currentWord.forEach((letter, i) => {
                        if (upperCaseKey === letter.letter) {
                            this.updateCurrentWord(i);

                        }
                        if (false) {
                            this.setState({
                                showInfo: true,
                                info: "You Win! - Press enter to play again",
                                isActive: false,
                                wins: this.state.wins + 1,
                            });
                        }
                    })
                }
            }

            else {
                this.setState({
                    guessesRemaining: this.state.guessesRemaining - 1,
                    showInfo: true,
                    info: "Game Over - You Lose - Press enter to play again",
                    losses: this.state.losses + 1,
                    isActive: false,
                });
            }
        }
    }


    replaceAtIndex(originalString, index, replacement) {
        return originalString.substr(0, index) + replacement + originalString.substr(index + replacement.length);
    }

    onClickReset = () => {
        this.setState({
            wins: 0,
            losses: 0
        })
        console.log('sucess')
    }

    updateCurrentWord(i) {
        const newCurrentWord = this.state.currentWord.map((letter, key) => {
            if (i === key) {
                return {
                    ...letter,
                    guessed: true,
                }
            }
            return letter
        })
        this.setState({
            currentWord: newCurrentWord,
        }, () => {this.forceUpdate()})
    }

    renderWord() {
        return this.state.currentWord.map((item, key) => {
            return <Letter key={key} letter={item.letter} guessed={item.guessed}/>
        })
    }

    render() {
        return (
            <div>

                <div className={styles.header}>
                    <div className={styles.got}>#</div>
                    <h2>Hangman Game</h2>
                </div>

                <div>
                    <div className={styles.infoContainer}>
                        <div className={styles.info}>
                            <div className={styles.pulsate}> {this.state.info} </div>
                        </div>
                    </div>

                    <div className={styles.bodyContainer}>

                        <div className={styles.guess}>
                            <h1>Guess the Word</h1>
                            <div className={styles.currentWord}>{this.renderWord()}</div>
                        </div>

                        <div className={styles.score}>

                            <div>Wins=
                        <span className={styles.wins}>0</span>
                            </div>
                            
                            <div>Losses=
                        <span className={styles.losses}>0</span>
                            </div>
                            {/* <button className="btn btn-danger btn-yes" onClick={this.props.onClick}>YES</button> */}
                            <button type="button" className={styles.reset} onClick={this.onClickReset}>RESET</button>
                        </div>
                        <div className={styles.remaining}>
                            <h3>Guesses Remaining</h3>
                            <div className={styles.guessesRemaining}></div>
                        </div>

                        <div className={styles.already}>
                            <h3>Already Guessed</h3>
                            <div className={styles.alreadyGuessed}></div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default App;
