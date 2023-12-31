import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { apiRoutes} from '../../Constants';

export const fetchSoldplayer = createAsyncThunk(
    'Soldplayer',
    async () => {
        const response = await axios(apiRoutes.soldplayer).then((e) => {
            return e.data.soldplayer
        });
        return response
    }
)
const initialState = {
    soldplayer: [],
    status: true
}

const soldplayerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSoldplayer.fulfilled]: (state, action) => {
            state.soldplayer = action.payload
        },
    }
});

export const { } = soldplayerSlice.actions

export default soldplayerSlice.reducer