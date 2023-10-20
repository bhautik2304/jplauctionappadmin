import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiRoutes, appAxios } from '../../Constants';

export const fetcchplayer = createAsyncThunk(
  'player',
  async () => {
    const response = await appAxios(apiRoutes.player).then((e) => {
      return e.data.player
    });
    return response
  }
)
const initialState = {
  player: [],
  status: true
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: {
    [fetcchplayer.fulfilled]: (state, action) => {
      state.player = action.payload
    },
  }
});

export const { } = playerSlice.actions

export default playerSlice.reducer