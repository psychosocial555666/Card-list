import * as React from "react";
import { connect } from "react-redux";
import { Card } from '../../types';
import { getCardsList } from '../../reducer/data/selectors';
import { checkTitleValidity, updateCardItem, deleteCardItem } from "../../utils/utils";
import { ActionCreator as ActionCreatorDATA } from "../../reducer/data/data";
import { withRouter } from 'react-router-dom';
import { Prompt } from 'react-router';
import trash from "../../../img/trash.svg"

interface Props {
  cards: Card[];
  updateCards: (cards: Card[], isNeedToSave: boolean) => void;
  history: any,
  match: any,
}

interface State {
  title: string;
  currentCard: object;
  description: string;
  thereIsUnsavedData: boolean;
}

class EditCard extends React.PureComponent<Props, State, {}> {

  constructor(props: Props | Readonly<Props>) {
    super(props);

    this.state = {
      title: '',
      description: '',
      currentCard: {},
      thereIsUnsavedData: true,
    }

    this._titleChangeHandler = this._titleChangeHandler.bind(this);
    this._descriptionChangeHandler = this._descriptionChangeHandler.bind(this);
    this._checkFormValidity = this._checkFormValidity.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }

  componentDidMount() {
    const { cards } = this.props;

    let currentCard = cards.find((item) => {
      return item.id === this.props.match.params.id
    }) 

    

    if(currentCard) {
      this.setState(
        {
          title: currentCard.title,
          description: currentCard.description,
          currentCard: currentCard,
        }
      );
    }
  }

  componentDidUpdate() {
    this.state.thereIsUnsavedData ? null : this.props.history.push('/');
  }

  _titleChangeHandler(evt: { target: { value: string; }; }) {
    this.setState({
      title: evt.target.value,
      thereIsUnsavedData: true,
    });
  }

  _descriptionChangeHandler(evt: { target: { value: string; }; }) {
    this.setState({
      description: evt.target.value,
      thereIsUnsavedData: true,
    });
  }

  _checkFormValidity() {
    let title = this.state.title;
    let description = this.state.description;
    if (checkTitleValidity(title) && description.length !== 0) {
      return true;
    }

    return false;
  }

  _deleteButtonClickHandler() {
    this.setState({ thereIsUnsavedData: false });

    const { cards, updateCards } = this.props;
    const {currentCard} = this.state;

    let newCards = deleteCardItem(cards, currentCard,);
    updateCards(newCards, true);
  }

  _formSubmitHandler(evt: { preventDefault: () => void; }) {
    evt.preventDefault();
    const { cards, updateCards } = this.props;
    const {currentCard} = this.state;
    let title = this.state.title;
    let description = this.state.description;

    if (this._checkFormValidity()) {
      this.setState({ thereIsUnsavedData: false });
      let newData = {
        title: title,
        description: description,
      }

      let newCards = updateCardItem(cards, currentCard, newData);
      updateCards(newCards, true);
    } else {
      console.log("Wrong!!!")
    }
  }

  render() {
    return (
      <React.Fragment>
        <Prompt
          when={this.state.thereIsUnsavedData === true}
          message='You have unsaved changes, are you sure you want to leave?'
        />
        <section className="edit-card">
          <div className="container">
            <article className="card-edit">
              <h1>Card info</h1>
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
                <div className="card-edit__wrapper">
                  <button type="submit" className="card-edit__submit button">
                    Save
              </button>
                  <button type="button" className="card-edit__delete">
                    <span>Delete</span>
                    <img src={trash} alt="DELETE"
                      width="50"
                      height="50"
                      onClick={this._deleteButtonClickHandler}
                    />
                  </button>
                </div>
              </form>
            </article>
          </div>
        </section>
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state: any) => ({
  cards: getCardsList(state),
});

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  updateCards(cards: any, isNeedToSave: boolean) {
    dispatch(ActionCreatorDATA.updateCards(cards, isNeedToSave));
  },
});

export { EditCard };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCard));
