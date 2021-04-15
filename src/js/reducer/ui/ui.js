import { extend } from "../../utils/utils";

const ActionType = {
  SET_CURRENT_CARD: `SET_CURRENT_CARD`,
};

const initialState = {
  currentCard: {},
};

const ActionCreator = {

  setCurrentCard: (card) => ({
    type: ActionType.SET_CURRENT_CARD,
    payload: card,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_CARD:
      return extend(state, {
        currentCard: action.payload,
      });

    default:
      return state;
  };
};

export { reducer, ActionType, ActionCreator };
