import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store.ts";

const LogoutButton = (): React.ReactElement => {
    const { logout } = useAuth0();
    const dispatch = useDispatch<AppDispatch>()

    const cleanup = () => {
        console.log("cleanup")
        dispatch({type: 'reset'});
        logout({ logoutParams: { returnTo: window.location.origin } })
    }

    return (
        <button onClick={() => cleanup()}>
            Log Out
        </button>
    );
};

export default LogoutButton;