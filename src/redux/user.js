import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, deleteUser, readUsers, updateUser } from "./api";
import thunks from "./thunks";

export const addUser = createAsyncThunk("users/addUser", (req) =>
  createUser({ req })
);
export const fetchUsers = createAsyncThunk("users/fetchUsers", readUsers);
export const editUser = createAsyncThunk("users/editUser", (req) =>
  updateUser({ req })
);
export const removeUser = createAsyncThunk("users/removeUser", deleteUser);

const initialState = {
  users: [],
  selectedUser: null,
  status: null
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    resetSelectedUser: (state) => {
      state.selectedUser = null;
    }
  },
  extraReducers: {
    ...thunks.create,
    ...thunks.read,
    ...thunks.update,
    ...thunks.del
  }
});

export const { setSelectedUser, resetSelectedUser } = userSlice.actions;

export default userSlice.reducer;
