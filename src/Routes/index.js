import React from 'react'
import { appRoutes } from '../Constants'
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Login, Home, Player, Team, Auction, Database, } from '../Pages';
// import { PageLayoutes } from '../Components';
import AppLayouts from '../Layouts/AppLayouts'

export default function Routess() {
    const { authStatus } = useSelector(state => state.auth)
    if (!authStatus) {
        console.log("Hello");
        return (
            <>
                <BrowserRouter>
                    <Routes >
                        <Route index path={appRoutes.authlogin} element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    } else {
        console.log("hello 2");
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path={appRoutes.home} element={<AppLayouts />}>
                            {/* <Route path={appRoutes.home} element={<Home />} /> */}
                            <Route path={appRoutes.home} element={<Auction />} />
                            <Route path={appRoutes.database} element={<Database />} />
                            <Route path={appRoutes.player} element={<Player />} />
                            <Route path={appRoutes.team} element={<Team />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </>
        )

    }
}
