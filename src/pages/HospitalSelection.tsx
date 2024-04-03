import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import 'reactjs-popup/dist/index.css';
import CenteredBox from "../components/CenteredBox.tsx"; // Import css
import {useAuth0} from "@auth0/auth0-react"


interface Hospital {
    Hospital_Name: string;
    Code: number;
}

const HospitalSelection = (): React.ReactElement => {
    const [hospital, setHospital] = useState<Hospital | null>(null);
    const [isFull, setIsFull] = useState(false);
    const requiredLength = 6; // Set the length of your verification input
    const {user} = useAuth0();
    const navigate = useNavigate();

    const roles_key = import.meta.env.VITE_AUTH0_ROLES_KEY;
    const getRoles = (): [string] => {
        if (user) {
            return  user[roles_key];
        }
        return [''];
    }


    const handleChange = (value: string) => {
        // Check if the current value length is equal to the required length
        if (value.length === requiredLength) {
            setIsFull(true);
        } else {
            setIsFull(false);
        }
    };


    const getHospitalByCode = (value: string)  => {
        fetch('http://localhost:8080/hospital/' + value)
            .then(
                response =>
                {if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                }
                else {return response.json();} })
            .then(data => {
                setHospital(data);

            })
            .catch(error => {
                setHospital(null);
                console.error('Error:', error);
            });
    }

    const redirectToProfile = () => {
        const role = getRoles();
        console.log(role.includes('Staff'));

        if (role.includes('Staff')) {
            navigate("/dash", {state: {hospital: hospital}});
        }
        // Redirect to the profile page
       else {
           navigate("/check", {state: {hospital: hospital}});
       }

    }

    const HospitalFound = () : React.ReactElement => {
        return (
            <div>
                {hospital && <p> Hospital: {hospital.Hospital_Name}</p> }
                <p> Is this the hospital you are currently at?</p>
                <button onClick={redirectToProfile}>Yes</button>
                <button onClick={() => setHospital(null)}>No</button>
            </div>
        )
    }

    return (
        <CenteredBox>
            <div>
                <div className="flex flex-grow flex-col justify-end">
                    <h1>Hospital Selection</h1>
                    <p>Input the Hospital Code on display in the A&E department.</p>
                </div>
                <div className="w-full px-4 mt-8">
                    <VerificationInput
                        length={6}
                        validChars={'0-9'}
                        onChange={handleChange}
                        onComplete={(value: string) => getHospitalByCode(value)}
                        classNames={{
                            container: "container",
                            character: "character",
                            characterInactive: "character--inactive",
                            characterSelected: "character--selected",
                            characterFilled: "character--filled",
                        }}/>
                    {hospital && isFull ? (<HospitalFound/>) : null}
                    {isFull && !hospital ? (<p> Hospital not found. Check the code you entered!</p>) : null}
                </div>
            </div>
        </CenteredBox>
    );


}


export default HospitalSelection;