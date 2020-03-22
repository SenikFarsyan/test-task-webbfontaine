import React from 'react';
import { connect } from 'react-redux';

//actions
import { saveUserScore } from '../../redux/user/user.actions';

//components
import TextSample from '../../components/preview/preview.component';
import Speed from '../../components/speed/speed.component';
import HighScores from '../../components/sideBar/sideBar.component';

//styles
import classes from './homepage.module.css';
//icons
import Spinner from '../../assets/loader.gif';

const initialState = {
  text: '',
  userInput: '',
  correctSymbols: 0,
  seconds: 0,
  started: false,
  finished: false,
  error: false,
  wpm: 0
};
class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  getDumyText = () => {
    fetch(
      'https://baconipsum.com/api/?type=all-meat&sentences=2&start-with-lorem=1'
    )
      .then(res => res.json())
      .then(data => this.setState({ text: data.join('') }))
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.getDumyText();
  }
  onRestart = () => {
    this.setState(initialState);
    this.getDumyText();
  };

  countCorrectSymbols(userInput) {
    const text = this.state.text.replace(' ', '');
    return userInput
      .replace(' ', '')
      .split('')
      .filter((s, i) => s === text[i]).length;
  }

  handleInputChange = e => {
    const v = e.target.value;
    let letterIndex = this.state.userInput.length;
    if (v[letterIndex] !== this.state.text[letterIndex]) {
      this.setState({ error: true });
      return;
    }
    this.setTimer();
    this.setState({
      userInput: v,
      correctSymbols: this.countCorrectSymbols(v),
      error: false
    });
  };
  calcWPM = () => {
    const { correctSymbols, seconds } = this.state;
    if (correctSymbols !== 0 && seconds !== 0) {
      const wpm = correctSymbols / 5 / (seconds / 60);
      this.setState({ wpm: Math.floor(wpm) });
    }
  };
  onFinish(userInput) {
    if (
      userInput.length === this.state.text.length ||
      this.state.seconds > 180
    ) {
      clearInterval(this.interval);
      const user = JSON.parse(sessionStorage.getItem('user'));
      user.history.push({ score: this.state.wpm, date: Date.now() });
      this.props.saveUserScore(user);
      sessionStorage.setItem('user', JSON.stringify(user));

      this.setState({
        finished: true
      });
    }
  }

  setTimer() {
    if (!this.state.started) {
      this.setState({ started: true });
      this.interval = setInterval(() => {
        this.setState(
          prevProps => {
            return { seconds: prevProps.seconds + 1 };
          },
          () => {
            this.calcWPM();
            this.onFinish(this.state.userInput);
          }
        );
      }, 1000);
    }
  }
  render() {
    const { text, userInput, wpm, finished, error } = this.state;

    return text ? (
      <div className={classes.homeContainer}>
        <HighScores />
        <div className={classes.gameContainer}>
          <h3>Start typing and the game will begin!</h3>
          <TextSample text={text} userInput={userInput} />
          <textarea
            cols='30'
            rows='5'
            className={`${classes.userInput} ${
              error ? classes.wrongLetter : ''
            }`}
            value={userInput}
            onChange={this.handleInputChange}
            placeholder='Start typing here...'
            readOnly={finished}
          ></textarea>
          <Speed wpm={wpm} />
          {finished && (
            <div>
              <p>Game was finished, your score is {wpm} wpm</p>
            </div>
          )}

          <div>
            <button className={classes.button} onClick={this.onRestart}>
              Restart
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className={classes.loader}>
        <img src={Spinner} alt='loader' />
      </div>
    );
  }
}

const mapDispatchToProps = { saveUserScore };

export default connect(null, mapDispatchToProps)(HomePage);
