import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, deleteUser, readUsers, updateUser } from "./api";

const addUser = createAsyncThunk("users/addUser", (req) => createUser({ req }));
const fetchUsers = createAsyncThunk("users/fetchUsers", readUsers);
const editUser = createAsyncThunk("users/editUser", (req) =>
  updateUser({ req })
);
const removeUser = createAsyncThunk("users/removeUser", deleteUser);

const create = {
  [addUser.pending]: (state) => {
    state.status = "loading";
  },
  [addUser.fulfilled]: (state, { payload }) => {
    state.users = [...state.users, payload];
    state.status = "success";
  },
  [addUser.rejected]: (state) => {
    state.status = "failed";
    state.users = [];
  }
};

const read = {
  [fetchUsers.pending]: (state) => {
    state.status = "loading";
  },
  [fetchUsers.fulfilled]: (state, { payload }) => {
    const withCity = payload.map((item) => ({
      ...item,
      city: item.address.city
    }));
    state.users = withCity;
    state.status = "success";
  },
  [fetchUsers.rejected]: (state) => {
    state.status = "failed";
    state.users = [];
  }
};

const update = {
  [editUser.pending]: (state) => {
    state.status = "loading";
  },
  [editUser.fulfilled]: (state, { payload }) => {
    state.users = state.users.map((user) => {
      return user.id === payload.id ? payload : user;
    });
    state.status = "success";
  },
  [editUser.rejected]: (state) => {
    state.status = "failed";
    state.users = [];
  }
};

const del = {
  [removeUser.pending]: (state) => {
    state.status = "loading";
  },
  [removeUser.fulfilled]: (state, { payload }) => {
    console.log(payload);
    const temp = state.users.filter((user) => user.id !== payload.id);
    state.users = temp;
    state.status = "success";
  },
  [removeUser.rejected]: (state) => {
    state.status = "failed";
    state.users = [];
  }
};

export default { create, read, update, del };
