import NameSpace from "../name-space";


const NAME_SPACE = NameSpace.DATA;

export const getCardsList = (state) => {
  return state[NAME_SPACE].cards;
};