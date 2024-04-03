import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./auth/LogoutButton.tsx";

// Modify the component to accept props
interface CenteredBoxProps {
    children: React.ReactNode;
}
const CenteredBox: React.FC<CenteredBoxProps> = ({children}) => {
    const {user} = useAuth0()


    return (
        <div className="flex justify-center items-center h-screen">
            {user  && <LogoutButton/>}
            <div className="flex flex-col justify-between bg-white p-6 rounded shadow-lg w-1/2 h-1/2 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default CenteredBox;
