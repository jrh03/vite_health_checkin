import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {LoginRedirect} from "./LoginRedirect.tsx";
import HospitalSelection from "./HospitalSelection.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {Role, selectRole, setRole} from "../redux/roleSlice.ts";

export const Homepage: React.FC = () => {
    const {isAuthenticated, isLoading, user} = useAuth0();
    const role = useSelector((state: RootState) => selectRole(state));
    const dispatch = useDispatch<AppDispatch>();
    const roles_key = import.meta.env.VITE_AUTH0_ROLE_KEY;
    const getRoles = (): [Role] | null => {
        if (user) {
            return  user[roles_key];
        }
        return null;
    }

    if (isLoading) {
        return <div>Loading ...</div>;
    }
     if (isAuthenticated) {
         if (role === null) {
             const roleArr = getRoles();
             if (roleArr) {
                 dispatch(setRole(roleArr[0]));
             }
         }
            return (
                <HospitalSelection/>
            );
        } else {
         console.log("isNotAuthenticated")
            return (
                <LoginRedirect/>
            );
        }
}