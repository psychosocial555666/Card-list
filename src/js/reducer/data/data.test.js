import { reducer, ActionCreator, ActionType } from "./data";


const mockCards = [
  { id: '1vIfYnxecu4dIX_mB9Lzo', title: 'HTML и CSS, уровень 2', description: '2', isLiked: false, date: '2021-04-16T15:41:03.575Z' },
  { id: 'rOjKRPYaDR6LtrTfEWkMD', title: 'JavaScript, уровень 1', description: '3', isLiked: false, date: '2021-04-16T15:41:08.558Z' },
  { id: '8aBwJ6yriZdQusLFBMA56', title: 'Профессия Фронтэнд разработчик', description: '4', isLiked: false, date: '2021-04-16T15:41:14.214Z' }, 
  { id: 'm6T_3u7kf13vOPpmdQkTZ', title: 'JavaScript, уровень 2', description: '5', isLiked: false, date: '2021-04-16T15:41:25.294Z' }
]

it(`Reducer without parameters return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    cards: [],
  });
});

it(`Reducer should update cards correctly`, () => {
  expect(reducer({
    cards: [],
  }, {
    type: ActionType.UPDATE_CARDS,
    payload: mockCards,
  })).toEqual({
    cards: mockCards,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for update cards returns correct action`, () => {
    expect(ActionCreator.updateCards(mockCards)).toEqual({
      type: ActionType.UPDATE_CARDS,
      payload: mockCards,
    });
  });
});