import { createSlice } from '@reduxjs/toolkit'


const teamData = {
  owner_name: "",
  team_name: "",
  owner_mobaile: "",
  totale_points: "",
};

const auctionData={
  teams_id:'',
  players_id:'',
  sold:''
}

const userData = {
  name: "",
  email: "",
  mobaile: "",
  password: "",
};
const playerData = {
  player_no: "",
  name: "",
  mobaile: "",
  image: "",
  skill: "",
  playercategurie_id: "Choose Categury",
};
const playerCateguryData = {
  name: "",
  points: "",
};

const initialState = {
  auction: auctionData,
  team: teamData,
  user: userData,
  player: playerData,
  playerCategury: playerCateguryData,
  teamModel: false,
  auctionModel: false,
  userModel: false,
  playerModel: false,
  playerCateguryModel: false,
  teamMood: "c",
  userMood: "c",
  playerMood: "c",
  playerCateguryMood: "c",
  auctionMood: "c",
}

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    onInputCheng: (state, action) => {
      // data pk ck
      state[action.payload.pk][action.payload.ck] = action.payload.data
    },
    dataCheng: (state, action) => {
      // data pk ck
      state[action.payload.pk] = action.payload.data
    },
    updateModel: (state, action) => {
      state.playerCateguryModel = true
      state.playerCateguryMood = 'u'
      state.playerCategury = action.payload.data
    },
    openModel: (state, action) => {
      state[action.payload.key] = action.payload.st
    },
    teamClear: (state, action) => {
      state.team = teamData
      state.teamMood = 'c'
    },
    userClear: (state, action) => {
      state.user = userData
      state.userMood = 'c'
    },
    playerClear: (state, action) => {
      state.player = playerData
      state.playerMood = 'c'
    },
    playerCateguryClear: (state, action) => {
      state.playerCategury = playerCateguryData
      state.playerCateguryMood = 'c'
    },
    auctionClear: (state, action) => {
      state.playerCategury = playerCateguryData
      state.playerCateguryMood = 'c'
    },
  }
});

export const {auctionClear, teamClear, userClear, playerClear, playerCateguryClear, openModel, onInputCheng, updateModel,dataCheng } = modelSlice.actions

export default modelSlice.reducer

