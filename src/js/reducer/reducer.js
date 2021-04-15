import {combineReducers} from "redux";
import {reducer as ui} from "./ui/ui";
import {reducer as data} from "./data/data";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.UI]: ui,
  [NameSpace.DATA]: data,
});
