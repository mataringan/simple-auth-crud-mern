import {
  FETCH_DATA_SUCCESS,
  ADD_DATA_SUCCESS,
  UPDATE_DATA_SUCCESS,
  DELETE_DATA_SUCCESS,
} from "../actions/dataActions";

const initialState = {
  data: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,

        data: action.payload,
      };
    case ADD_DATA_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case UPDATE_DATA_SUCCESS:
      const updatedData = state.data.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      return {
        ...state,
        data: updatedData,
      };
    case DELETE_DATA_SUCCESS:
      const filteredData = state.data.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        data: filteredData,
      };
    default:
      return state;
  }
};

export default dataReducer;
