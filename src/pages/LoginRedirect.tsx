import LoginButton from "../components/auth/LoginButton.tsx";
import React from "react";
import CenteredBox from "../components/CenteredBox.tsx";
export const LoginRedirect = () : React.ReactElement =>{
    return (
        <CenteredBox>
            <div className="flex flex-grow flex-col justify-end">
                <h1 className="text-2xl font-bold text-center mb-4">Accident and Emergency Organisation App</h1>
                <div className="flex-grow">
                    <p className="text-lg mb-2 text-center"> In order for us to properly organise your data, you must log in. </p>
                    <p className="text-lg text-center"> If you do not have an account, please head towards reception. </p>
                </div>
                <div className="w-full px-4"></div>
                <LoginButton/>
                <div className="flex-grow"></div>
            </div>
        </CenteredBox>
    );
}