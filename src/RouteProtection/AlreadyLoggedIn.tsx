import {useAuth0} from "@auth0/auth0-react";
import OuterBoxDiv from "../components/OuterBoxDiv.tsx";
import CenteredBox from "../components/CenteredBox.tsx";
import {Navigate, Outlet} from "react-router-dom";

export function AlreadyLoggedIn() {
    const {isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return (<OuterBoxDiv>
            <CenteredBox>Loading...</CenteredBox>
        </OuterBoxDiv>);
    }

    if (isAuthenticated) {
        return (<Navigate to="/" replace/>);
    }
    return (<Outlet/>);

}