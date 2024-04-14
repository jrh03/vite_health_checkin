import {Role, selectRole, setRole} from "../redux/roleSlice.ts";
import {useAuth0, User} from "@auth0/auth0-react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import OuterBoxDiv from "../components/OuterBoxDiv.tsx";
import CenteredBox from "../components/CenteredBox.tsx";
import {Navigate, NavLink, Outlet} from "react-router-dom";

const roles_key = import.meta.env.VITE_AUTH0_ROLE_KEY;
const getRoles = (user: User | undefined): Role[] | null => {
    if (user) {
        return user[roles_key];
    }
    return null;
}

interface ProtectedRouteProps {
    allowedRoles?: Role[] | null; // Define allowedRoles as an array of strings, optionally provided
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({allowedRoles}) => {
    const {isAuthenticated, isLoading, user} = useAuth0();
    const role = useSelector((state: RootState) => selectRole(state));
    const dispatch = useDispatch<AppDispatch>();

    if (isLoading) {
        return (<OuterBoxDiv>
            <CenteredBox>Loading...</CenteredBox>
        </OuterBoxDiv>);
    }

    if (!isAuthenticated) {
        return (<Navigate to="/login" replace/>);
    }

    if (role === null) {
        const roleArr = getRoles(user);
        if (roleArr) {
            dispatch(setRole(roleArr[0]));
        }
    }

    // @ts-expect-error Role might be null
    if (allowedRoles && !allowedRoles.includes(role)) {
        return (
            <OuterBoxDiv>
                <CenteredBox>
                    <h1>Unauthorized</h1>
                    <p>You are not authorized to view this page.</p>
                    <NavLink to={"/"}> Click here to return. </NavLink>
                </CenteredBox>
            </OuterBoxDiv>
        );
    }
    return (<Outlet/>);

}