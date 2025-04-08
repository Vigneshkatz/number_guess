class NumberGuessGame {
    constructor() {
        this.rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.generatedNumber = 0;
        this.attempts = 0;
        this.max = 100;
        this.highScore = new Map();
    }

    start() {
        console.log('Welcome to the Number Guessing Game!');
        console.log("I'm thinking of a number between 1 and 100.");
        console.log(`Please select the difficulty level:
            1. Easy (10 chances)
            2. Medium (5 chances)
            3. Hard (3 chances)`);
        this.rl.question('Enter your choice: ', (level) => {
            if (!this.validateInput(level, 1, 3)) {
                console.log('Invalid level. Please enter 0, 1, or 2.');
                return this.start();
            }

            console.log(`You have selected level ${level}!`);
            console.log("Let's start!");
            this.setupNumber(parseInt(level));
        });
    }

    validateInput(input, min, max) {
        const parsedInput = parseInt(input);
        return !isNaN(parsedInput) && parsedInput >= min && parsedInput <= max;
    }

    startGuess() {
        this.rl.question(`Enter your choice: (you have ${this.attempts} attempts left): `, (guess) => {
            if (!this.validateInput(guess, 0, this.max)) {
                console.log('Invalid input. Please enter a valid number.');
                return this.startGuess();
            }

            this.attempts--;
            this.checkGuess(parseInt(guess));
        });
    }

    restart() {
        this.rl.question('Do you want to play again? (yes or no): ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
                this.start();
            } else {
                console.log('Thanks for playing!');
                this.rl.close();
            }
        });
    }

    updateHighScore(){
        let attemp = this.maxAttempts - this.attempts;
        if(attemp < this.highScore.get(this.maxAttempts) || this.highScore.get(this.maxAttempts) === undefined){
            this.highScore = attemp;
            console.log(`New high score! You guessed the number in ${attemp} attempts.`);
        }
    }

    checkGuess(guess) {
        if (guess === this.generatedNumber) {
            console.log('Congratulations! You guessed the number! With ' + this.attempts + ' attempts left and completed in ' + (new Date().getTime() - this.currentTime)/ 1000 + 's');
            this.updateHighScore();
            this.restart();
        } else if (this.attempts === 0) {
            console.log(`Sorry, you've run out of attempts. The number was ${this.generatedNumber}.`);
            this.restart();
        } else {
            console.log(guess < this.generatedNumber ? 'Too low!' : 'Too high!');
            this.startGuess();
        }
    }

    setupNumber(level) {
        switch (level) {
            case 1:
                this.generatedNumber = Math.floor(Math.random() * this.max);
                this.attempts = 10;
                this.maxAttempts = 10;
                break;
            case 2:
                this.generatedNumber = Math.floor(Math.random() * this.max);
                this.attempts = 5;
                this.maxAttempts = 5;
                break;
            case 3:
                this.generatedNumber = Math.floor(Math.random() * this.max);
                this.attempts = 3;
                this.maxAttempts = 10;
                break;
        }
        this.currentTime = new Date().getTime();
        console.log(`Setting up the game for level ${level}...`);
        this.startGuess();
    }
}

const game = new NumberGuessGame();
game.start();