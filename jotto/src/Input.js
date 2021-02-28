import React, { Component } from 'react';
import { connect } from 'react-redux';

import { guessWord } from './actions';

export class UnconnectedInput extends Component {

  /**
   * @method constructor
   * @param {object} props - Component props
   * @returns {undefined}
   */
  constructor(props) {
    super(props);

    this.state = {
      currentGuess: null
    };

    //bind `this` for submitGuessedWord
    //we need to do this because we are usig `this` in the submitGuessedWord function
    //declared in line 26, so we need to `pass along` the `this` reference
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(evt) {
    //The preventDefault() method cancels the event if it is cancelable, meaning that the
    //default action that belongs to the event will not occur. For example, this can be useful when:
    // -Clicking on a "Submit" button, prevent it from submitting a form
    // -Clicking on a link, prevent the link from following the URL
    //In this case, we use it to not submit the form, we just want to do something else
    evt.preventDefault();

    const guessedWord = this.state.currentGuess;

    if(guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
    }
  }

  render() {
    const contents = this.props.success
    ? null
    : (
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          value={this.state.currentGuess}
          onChange={evt => this.setState({ currentGuess: evt.target.value })}
          placeholder="Enter guess" />
        <button
          data-test="submit-button"
          onClick={ (evt) => { this.submitGuessedWord(evt) }}
          className="btn btn-primary mb-2"
          type="submit">
          Submit
        </button>
      </form>
    );

    return (
      <div data-test="component-input">
      {contents}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    success: state.success
  };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
