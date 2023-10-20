import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiRoutes, appAxios } from '../../Constants';

export const fetchteams = createAsyncThunk(
  'teams',
  async () => {
    const response = await appAxios(apiRoutes.team).then((e) => {
      return e.data.team
    });
    return response
  }
)

const initialState = {
    team:[],
    status:true
}

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers:{},
  extraReducers: {
    [fetchteams.fulfilled]: (state, action) => {
      state.team = action.payload
    },
  }
});

export const {} = teamSlice.actions

export default teamSlice.reducer