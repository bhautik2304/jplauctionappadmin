import { createSlice } from '@reduxjs/toolkit'
import { lsk } from "../../Constants/index"

console.log(lsk);

const authStatus = localStorage.getItem(lsk.authStatus)
const authUser = localStorage.getItem(lsk.user)
const apiKey = localStorage.getItem(lsk.apiKey)

const initialState = {
    authStatus: authStatus || false,
    authUser: authUser || {},
    apiKey: apiKey || "",
}

export const counterSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem(lsk.authStatus, true)
            localStorage.setItem(lsk.user, action.payload.tocken)
            localStorage.setItem(lsk.apiKey, JSON.stringify(action.payload.user))
            window.location.reload()
        },
        logout: () => {
            localStorage.removeItem(lsk.authStatus)
            localStorage.removeItem(lsk.user)
            localStorage.removeItem(lsk.apiKey)
            window.location.reload()
        },
        checkLogin: {},
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkLogin } = counterSlice.actions

export default counterSlice.reducer