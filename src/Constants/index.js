import axios from "axios"

export const apiDomain="https://api.electrozevents.in/api/"

export const appRoutes = {
    // page Routes
    home: '/',
    database: '/database',
    auction: '/auction',

    // module Routes
    team: '/team',
    player: '/player',
    playercategury: '/playercategury',
    users: '/users',

    // auth Routes
    authlogin: '/',
    authforgetpassword: '/authforgetpassword',
    authotpveryfy: '/authotpveryfy',
}
export const apiRoutes = {
    authLogin:"auth/login",
    team:"team/",
    playearcategury:"playearcategury/",
    player:"player/",
    user:"user/",
    soldplayer:"soldplayer/",
}

export const lsk = {
    authStatus: "authStatus",
    user: "user",
    apiKey: "apiKey",
}

export const appAxios= axios.create({
    baseURL:apiDomain
})