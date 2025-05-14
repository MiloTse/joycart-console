import Mine from './components/Mine';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Account from "./containers/Account/Account";
import Login from "./containers/Account/Login";
import Register from "./containers/Account/Register";

const router = createBrowserRouter([

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
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
