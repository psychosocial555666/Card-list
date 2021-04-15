import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.UI;

export const getCurrentCard= (state) => {
  return state[NAME_SPACE].currentCard;
};

