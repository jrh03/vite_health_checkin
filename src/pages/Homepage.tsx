import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {LoginRedirect} from "./LoginRedirect.tsx";
import HospitalSelection from "./HospitalSelection.tsx";

export const Homepage: React.FC = () => {
    const {isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
     if (isAuthenticated) {
         console.log("isAuthenticated");
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