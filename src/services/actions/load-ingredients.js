import { dataLoad } from "../../utils/dataLoad";
import { LOAD_DATA_ERROR, LOAD_DATA_START, LOAD_DATA_SUCCESS } from "./index";

export function loadIngredientsAction() {
  return function (dispatch) {
    dispatch({ type: LOAD_DATA_START });
    dataLoad()
      .then((data) => {
        dispatch({ type: LOAD_DATA_SUCCESS, data: data });
      })
      .catch((err) => {
        dispatch({ type: LOAD_DATA_ERROR });
      });
  };
}
