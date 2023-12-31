import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { apiRoutes} from '../../Constants';

export const fetchplayercategury = createAsyncThunk(
  'playercategury',
  async () => {
    const response = await axios(apiRoutes.playearcategury).then((e) => {
      return e.data.Playercategury
    });
    return response
  }
)
const initialState = {
  playerCategury:[],
  status:true
}

const playerCategurySlice = createSlice({
  name: "playerCategury",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchplayercategury.fulfilled]: (state, action) => {
      state.playerCategury = action.payload
    },
  }
});

export const {} = playerCategurySlice.actions

export default playerCategurySlice.reducer