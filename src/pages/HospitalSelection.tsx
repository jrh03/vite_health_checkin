import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import 'reactjs-popup/dist/index.css';
import CenteredBox from "../components/CenteredBox.tsx"; // Import css
import LogoutButton from "../components/auth/LogoutButton.tsx";
import { useDispatch, useSelector } from 'react-redux';
import {setHospital, clearHospital, selectHospital} from "../redux/hospitalSlice.ts";
import type { AppDispatch, RootState } from '../redux/store.ts';
import {useGetAccessToken} from "../helpers/get_token.ts";
import OuterBoxDiv from "../components/OuterBoxDiv.tsx";
import {selectCheckedIn, setCheckedIn} from "../redux/checkedInSlice.ts";
import {selectRole} from "../redux/roleSlice.ts";

const HospitalSelection = (): React.ReactElement => {
    const [isFull, setIsFull] = useState(false);
    const requiredLength = 6; // Set the length of your verification input
    const dispatch = useDispatch<AppDispatch>();
    const hospital = useSelector((state: RootState) => selectHospital(state));
    const checkedIn = useSelector((state: RootState) => selectCheckedIn(state));
    const role = useSelector((state: RootState) => selectRole(state));
    const navigate = useNavigate();
    const token = useGetAccessToken("read:self");

    console.log(role);

    useEffect(() => {
        if (hospital) {
            redirectNextStep();
        }
    }, [hospital]);

    useEffect(() => {
        if (role === "Patient") {
            fetch('http://localhost:8080/ischecked', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    console.log(data['Hospital'])
                    if (data) {
                        dispatch(setHospital(data['Hospital']));
                        dispatch(setCheckedIn());
                    }
                })// Parse the JSON response
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [dispatch, role, token]);


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
                dispatch(setHospital(data));

            })
            .catch(error => {
                dispatch(clearHospital());
                console.error('Error:', error);
            });
    }

    const redirectNextStep = () => {
        if (role === "Staff") {
            navigate("/dash");
        }
        // Redirect to the profile page
       else if (checkedIn) {
           navigate("/queue");
       }
       else {
              navigate("/check");
        }

    }

    const HospitalFound = () : React.ReactElement => {
        return (
            <div>
                {hospital && <p> Hospital: {hospital.Hospital_Name}</p> }
                <p> Is this the hospital you are currently at?</p>
                <button onClick={redirectNextStep}>Yes</button>
                <button onClick={() => dispatch(clearHospital())}>No</button>
            </div>
        )
    }

    return (
        <div>
            <LogoutButton/>
            <OuterBoxDiv>
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
                                inputProps={{inputMode: "numeric"}}
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
            </OuterBoxDiv>
        </div>
    );


}


export default HospitalSelection;