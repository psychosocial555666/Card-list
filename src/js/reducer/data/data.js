import { extend, getDataFromStorage, saveDataToStorage } from "../../utils/utils";


const ActionType = {
  UPDATE_CARDS: `UPDATE_CARDS`,
};

const initialState = {
  cards: getDataFromStorage(),
};

const ActionCreator = {

  updateCards: (cards, isNeedToSave) => ({
    type: ActionType.UPDATE_CARDS,
    payload: saveDataToStorage(cards, isNeedToSave),
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_CARDS:
      return extend(state, {
        cards: action.payload,
      });

    default:
      return state;
  };
};

export { reducer, ActionType, ActionCreator };
