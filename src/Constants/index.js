import axios from "axios"

export const apiDomain="http://43.206.149.16/api/"

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
    authLogin:`${apiDomain}auth/login`,
    team:`${apiDomain}team/`,
    playearcategury:`${apiDomain}playearcategury/`,
    player:`${apiDomain}player/`,
    user:`${apiDomain}user/`,
    soldplayer:`${apiDomain}soldplayer/`,
}

export const lsk = {
    authStatus: "authStatus",
    user: "user",
    apiKey: "apiKey",
}

export default axios