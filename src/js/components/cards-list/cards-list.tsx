import * as React from 'react';
import { getCardsList } from '../../reducer/data/selectors';
import { ActionCreator as ActionCreatorDATA } from "../../reducer/data/data";
import { connect } from "react-redux";
import { Card } from '../../types';
import edit from '../../../img/pencil-square.svg';
import plus from '../../../img/plus.svg';
import { Link } from 'react-router-dom';
import { extend } from '../../utils/utils';
let moment = require('moment');

interface Props {
  cards: Card[];
  updateCards: (cards: Card[], isNeedToSave: boolean) => void;
}

class CardsList extends React.PureComponent<Props, {}> {

  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  _likeChangeHandler(cards: Card[], i: number, status: boolean) {
    const {updateCards} = this.props;

    let newCard = extend(cards[i], {isLiked: !status});

    let newCards = cards.slice(0, cards.length);
    newCards.splice(i, 1, newCard);
    updateCards(newCards, true);
  }

  render() {
    const { cards } = this.props;

    return (
      <ul className="main-screen__list cards-list">
        <li className="cards-list__item card card--new">
          <Link to="/new">
            <img src={plus} alt="Add new card" width="70" height="70" />
          </Link>
        </li>
        {cards.length > 0 ? cards.map((item, i) => {
          return (
            <li key={i} className="cards-list__item card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="card__controls">
                <Link to={`/edit/${item.id}`} 
                  className="card__edit"
                  >
                  <span className="visually-hidden">Edit</span>
                  <img src={edit} alt="Edit" width="30" height="30" />
                </Link>
                <div className="card__like">
                  <input type="checkbox" 
                  id={`like ${item.id}`} 
                  className="visually-hidden" 
                  checked={item.isLiked} 
                  onChange={() => {this._likeChangeHandler(cards, i, item.isLiked)}}
                  />
                  <label htmlFor={`like ${item.id}`}><span className="visually-hidden">Like</span></label>
                </div>
              </div>
              <span className="card__time">{moment(item.date).format(`hh:mm DD MMMM YYYY`)}</span>
            </li>
          )
        })
          : ''}
      </ul>
    );
  }
};

const mapStateToProps = (state: any) => ({
  cards: getCardsList(state),
});

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  updateCards(cards: any, isNeedToSave: boolean) {
    dispatch(ActionCreatorDATA.updateCards(cards, isNeedToSave));
  },
});

export { CardsList };

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);