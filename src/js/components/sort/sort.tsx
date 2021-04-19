import * as React from 'react';
import { getCardsList } from '../../reducer/data/selectors';
import { ActionCreator as ActionCreatorDATA } from "../../reducer/data/data";
import { connect } from "react-redux";
import { Card } from '../../types';
import up from '../../../img/arrow-up.svg';
import down from '../../../img/arrow-down.svg';
import { SortTypes } from '../../const';
import * as Moment from 'moment';
let moment = require('moment');


interface Props {
  cards: Card[];
  updateCards: (cards: Card[], isNeedToSave: boolean) => void;
}

class Sort extends React.PureComponent<Props, {}> {

  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  _sortButtonClickHandler(cards: Card[], type: string) {
    const { updateCards } = this.props;
    let sortedCards = cards;

    switch (type) {
      case SortTypes.NEW:
        sortedCards = cards.slice(0, cards.length).sort((a: any, b: any) => {
          let diff = moment(b.date).diff(a.date);
          return diff;
        });
        break;
      case SortTypes.OLD:
        sortedCards = cards.slice(0, cards.length).sort((a: any, b: any) => {
          let diff = moment(a.date).diff(b.date);
          return diff;
        });
        break;
      default:
        break;
    }
    updateCards(sortedCards, false);
  }

  render() {
    const { cards } = this.props;

    return (
      <ul className="main-screen__sort sort">
        <li className="sort__item">
          <button className="sort__button"
            type="button"
            onClick={() => { this._sortButtonClickHandler(cards, SortTypes.NEW) }}
          >
            <img src={up} alt="New first" />
            <span>New first</span>
          </button>
        </li>
        <li className="sort__item">
          <button className="sort__button"
            type="button"
            onClick={() => { this._sortButtonClickHandler(cards, SortTypes.OLD) }}
          >
            <img src={down} alt="Old first" />
            <span>Old first</span>
          </button>
        </li>
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

export { Sort };

export default connect(mapStateToProps, mapDispatchToProps)(Sort);