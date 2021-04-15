import * as React from "react";
import { connect } from "react-redux";
import { Card } from '../../types';
import { getCardsList } from '../../reducer/data/selectors';
import { checkTitleValidity, pushNewCard } from "../../utils/utils";
import { ActionCreator} from "../../reducer/data/data";
import {nanoid} from 'nanoid';
import { withRouter } from 'react-router-dom';

interface Props {
  cards: Card[];
  updateCards: (cards: Card[], isNeedToSave: boolean) => void;
  history: any,
}

interface State {
  title: string;
  description: string;
}

class NewCard extends React.PureComponent<Props, State, {}> {
  constructor(props: Props | Readonly<Props>) {
    super(props);

    this.state = {
      title: '',
      description: '',
    }

    this._titleChangeHandler = this._titleChangeHandler.bind(this);
    this._descriptionChangeHandler = this._descriptionChangeHandler.bind(this);
    this._checkFormValidity = this._checkFormValidity.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }
  
  _titleChangeHandler(evt: { target: { value: string; }; }) {
    this.setState({title: evt.target.value});
  }

  _descriptionChangeHandler(evt: { target: { value: string; }; }) {
    this.setState({description: evt.target.value});
  }

  _checkFormValidity() {
    let title = this.state.title;
    let description = this.state.description;
    if(checkTitleValidity(title) && description.length !== 0){
      return true;
    }

    return false;
  }

  _formSubmitHandler(evt: { preventDefault: () => void; }) {
    evt.preventDefault();
    const {cards, updateCards} = this.props;
    let newCard = {};
    let title = this.state.title;
    let description = this.state.description;

    if(this._checkFormValidity()) {
      newCard = {
        id: nanoid(),
        title: title,
        description: description,
        isLiked: false,
        date: new Date(),
      }

      let newCards = pushNewCard(cards, newCard);
      updateCards(newCards, true);
      this.props.history.push('/');
    } else {
      console.log("Wrong!!!")
    }
  }

  render() {
    return (
      <section className="new-card">
        <div className="container">
          <article className="card-edit new-card">
            <h1>New card</h1>
            <form action="#" className="card-edit__form"
            onSubmit={this._formSubmitHandler}
            >
              <div className="card-edit__item">
                <input type="text" 
                id="title" 
                placeholder="Add new title"
                onChange={this._titleChangeHandler}
                value={this.state.title}
                />
                <label htmlFor="title"><span className="visually-hidden">Title</span></label>
              </div>
              <div className="card-edit__item">
                <textarea id="description" 
                placeholder="Add new description"
                onChange={this._descriptionChangeHandler}
                value={this.state.description}
                />
                <label htmlFor="description"><span className="visually-hidden">Description</span></label>
              </div>
              <button type="submit" className="card-edit__submit button">
                Save
              </button>
            </form>
          </article>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  cards: getCardsList(state),
});

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  updateCards(cards: any, isNeedToSave: boolean) {
    dispatch(ActionCreator.updateCards(cards, isNeedToSave));
  },
});

export { NewCard };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCard));
