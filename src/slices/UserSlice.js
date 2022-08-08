import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRoot } from "../api/apiRoot";

export const getAllUser = createAsyncThunk(
  "userReducer/getAllUser",
  async (allEnteries) => {
    if(allEnteries.sort && allEnteries.order){
      return fetch(
        `${apiRoot}?_start=${allEnteries.initialEntry}&_end=${
          allEnteries.finalEntry
        }&_sort=id&_order=desc`
      ).then((resp) => resp.json());
    }
    else if(allEnteries.searchData){
      return fetch(
        `${apiRoot}/?name=${allEnteries.searchData}&_start=${allEnteries.initialEntry}&_end=${allEnteries.finalEntry}`
      ).then((resp) => resp.json());
    }
    else{
      return fetch(
        `${apiRoot}?_start=${allEnteries.initialEntry}&_end=${allEnteries.finalEntry}`
      ).then((resp) => resp.json());
    }
    
  }
);
// export const getSearchUser = createAsyncThunk(
//   "userReducer/getSearchUser",
//   async (searchData) => {
//     return fetch(`${apiRoot}/?name=${searchData}`).then((resp) => resp.json());
//   }
// );
export const addNewUser = createAsyncThunk(
  "userReducer/addNewUser",
  async (inputValues) => {
    return fetch(apiRoot, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValues),
    }).then((resp) => resp.json());
  }
);
export const deleteUser = createAsyncThunk(
  "userReducer/deleteUser",
  async (id) => {
    return fetch(`${apiRoot}/${id}`, { method: "DELETE" }).then((resp) => {
      return { id: id };
    });
  }
);
export const editUserId = createAsyncThunk(
  "userReducer/editUserId",
  async (id) => {
    return fetch(`${apiRoot}/${id}`)
      .then((resp) => resp.json())
      .then((response) => {
        return response;
      });
  }
);
export const updateUser = createAsyncThunk(
  "userReducer/updateUser",
  async (userData) => {
    return fetch(`${apiRoot}/${userData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData.inputValues),
    })
      .then((resp) => resp.json())
      .then((response) => {
        return response;
      });
  }
);
const initialState = {
  user: [],
  sortedArray: [],
  loading: false,
  userId: {},
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  baseUrl: apiRoot,
  extraReducers: {
    [getAllUser.pending]: (state) => {
      state.loading = true;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    // [getSearchUser.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getSearchUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    // },
    [addNewUser.pending]: (state) => {
      state.loading = true;
    },
    [addNewUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = [action.payload];
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = state.user.filter((item) => item.id !== action.payload);
    },
    [editUserId.pending]: (state) => {
      state.loading = true;
    },
    [editUserId.fulfilled]: (state, action) => {
      state.loading = false;
      state.userId = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = [action.payload];
    },
  },
});

export default userSlice.reducer;
