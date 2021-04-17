import * as renderer from "react-test-renderer";
import { CardsList } from "./cards-list";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { noop } from "../../utils/utils";
import { Router } from "react-router";
import history from "../../history";


const mockStore = configureStore([]);


const cards = [
  { id: '1vIfYnxecu4dIX_mB9Lzo', title: 'HTML и CSS, уровень 2', description: '2', isLiked: false, date: '2021-04-16T15:41:03.575Z' },
  { id: 'rOjKRPYaDR6LtrTfEWkMD', title: 'JavaScript, уровень 1', description: '3', isLiked: false, date: '2021-04-16T15:41:08.558Z' },
  { id: '8aBwJ6yriZdQusLFBMA56', title: 'Профессия Фронтэнд разработчик', description: '4', isLiked: false, date: '2021-04-16T15:41:14.214Z' },
  { id: 'm6T_3u7kf13vOPpmdQkTZ', title: 'JavaScript, уровень 2', description: '5', isLiked: false, date: '2021-04-16T15:41:25.294Z' }
]

describe(`CardsList`, () => {
  it(`Render CardsList`, () => {
    const store = mockStore({
      cards: cards,
      updateCards: () => { },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <CardsList
              cards={cards}
              updateCards={noop}
            />
          </Router>

        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});