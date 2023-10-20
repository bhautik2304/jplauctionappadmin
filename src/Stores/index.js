import { configureStore } from '@reduxjs/toolkit'
import {soldPlayerReducer,authReducer, modelReducer, playerCateguryReducer,playerReducer,teamReducer,userReducer} from './Slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    palyercategury: playerCateguryReducer,
    palyer: playerReducer,
    team: teamReducer,
    modalData: modelReducer,
    users: userReducer,
    soldPlayer: soldPlayerReducer,
  },
})