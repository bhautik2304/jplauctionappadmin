import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { apiRoutes} from '../../Constants';

export const fetchUsers = createAsyncThunk(
  'users',
  async () => {
    const response = await axios(apiRoutes.user).then((e) => {
      return e.data.users
    });
    return response
  }
)

const initialState = {
  user: [],
  status: true
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.user = action.payload
    },
  }
});

export const { } = userSlice.actions

export default userSlice.reducer