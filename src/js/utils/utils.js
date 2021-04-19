
export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const checkTitleValidity = (value) => {
  if (4 < value.length && value.length <= 255) {
    return true;
  }
  return false;
};

export const saveDataToStorage = (data, needToSave) => {
  let storage = window.localStorage;

  needToSave ? storage.setItem('cards', JSON.stringify(data)) : '';

  return data;
}

export const getDataFromStorage = () => {
  let storage = window.localStorage;

  return storage.cards ? JSON.parse(storage.cards) : [];
}

export const updateCardItem = (cards, card, data) => {
  let newCard = extend(card, data);
  let index = cards.findIndex((item) => {return item.id === card.id});

  let newCards = cards.slice(0, cards.length);
  newCards.splice(index, 1, newCard);

  return newCards;
}

export const deleteCardItem = (cards, card) => {
  let index = cards.findIndex((item) => {return item.id === card.id});

  let newCards = cards.slice(0, cards.length);
  newCards.splice(index, 1);

  return newCards;
}

export const pushNewCard = (cards, newCard) => {
  let newCards = cards.concat(newCard);
  return newCards;
};

export const noop = () => {};

