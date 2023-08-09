import axios from "axios";

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS";
export const UPDATE_DATA_SUCCESS = "UPDATE_DATA_SUCCESS";
export const DELETE_DATA_SUCCESS = "DELETE_DATA_SUCCESS";

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const addDataSuccess = (data) => ({
  type: ADD_DATA_SUCCESS,
  payload: data,
});

export const updateDataSuccess = (data) => ({
  type: UPDATE_DATA_SUCCESS,
  payload: data,
});

export const deleteDataSuccess = (dataId) => ({
  type: DELETE_DATA_SUCCESS,
  payload: dataId,
});

export const fetchData = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:9000/api/data", {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const addData = (data) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:9000/api/data",
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(addDataSuccess(response.data));
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
};

export const updateData = (data) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:9000/api/data/${data._id}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(updateDataSuccess(response.data));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
};

export const deleteData = (dataId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:9000/api/data/${dataId}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteDataSuccess(dataId));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
};
