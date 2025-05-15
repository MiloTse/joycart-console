
import 'normalize.css';
import './styles/border.css';
import './styles/base.css';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import React from "react";
import Account from "./containers/Account/Account";
import Login from "./containers/Account/Login";
import Register from "./containers/Account/Register";
import Guide from "./containers/Guide/Guide";
import Home from "./containers/Home/Home";

const router = createHashRouter([{
        path: "/",
        element: <Guide />
    },

    {
        path: "/account",
        element: <Account />,
        children: [{
                path: "/account/login",
                element: <Login />
            }, {
                path: "/account/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/home",
        element: <Home />
    },
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
