import {useEffect, useState} from "react";
import React from "react";
import CenteredBox from "../components/CenteredBox.tsx";
import {useNavigate} from "react-router-dom";
import {useGetAccessToken} from "../helpers/get_token.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {selectHospital} from "../redux/hospitalSlice.ts";
import {setCheckedIn, selectCheckedIn} from "../redux/checkedInSlice.ts";
import OuterBoxDiv from "../components/OuterBoxDiv.tsx";
import LogoutButton from "../components/auth/LogoutButton.tsx";

export const HospitalCheckIn = () => {
    const navigate = useNavigate();
    const [currentQ, setCurrentQ] = useState(1);
    const accessToken = useGetAccessToken("read:self");
    const hospital = useSelector((state: RootState) => selectHospital(state));
    const checkedIn = useSelector((state: RootState) => selectCheckedIn(state));


    const nextQuestion = () => setCurrentQ(currentQ + 1);
    const prevQuestion = () => setCurrentQ(currentQ - 1);


    useEffect(() => {
        if (checkedIn) {
            navigate("/queue");
        }
    }, [checkedIn, hospital, navigate])



    const submitScore = async (num: number) => {

        const data = {
            CheckInTime: new Date(),
            Hospital: hospital,
            Score: num,
        }

            fetch(import.meta.env.VITE_API_URL + '/current-patient-checkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
            })
                .then(response => {
                    if (response.status !== 201) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                    }
                    setCheckedIn();
                    navigate("/queue");

                }) // Parse the JSON response
                .catch(error => {
                    console.error('Error:', error);
                });
        return;
    }

    const handleClick = (num : number) : React.MouseEventHandler<HTMLButtonElement> => async (event) => {
        event.preventDefault(); // Prevent the default action of the button click
        await submitScore(num); // Example score, replace with actual score
    };


    const firstQuestion = (): React.ReactElement => {
        return <div className={"question"}>
            <h2>Is the patient:</h2>
            <ul>
                <li>Experiencing severe difficulty breathing</li>
                <li>Unable to wake up or stay awake</li>
                <li>Experiencing severe chest pain</li>
                <li>Unable to speak</li>
                <li>Experiencing severe allergic reaction</li>
                <li>Experiencing severe pain or pressure in the chest</li>
                <li>Having a seizure</li>
            </ul>
            <input type="text"/>
            <button onClick={handleClick(1)}>Yes</button>
            <button onClick={nextQuestion}>No</button>
        </div>
    }

    const secondQuestion = (): React.ReactElement => {
        return <div className={"question"}>
            <h2>Is the patient: </h2>
            <ol>
                <li> Only responding to voice or pain</li>
                <li> Someone with a history of respiratory problems</li>
                <li> Experiencing exhaustion</li>
            </ol>
            <input type="text"/>
            <button onClick={handleClick(2)}>Yes</button>
            <button onClick={nextQuestion}>No</button>
        </div>
    }

    const thirdQuestion = (): React.ReactElement => {
        return <div className={"question"}>
            <h2>Is the patient experiencing a sharp pain when breathing in?</h2>
            <input type="text"/>
            <button onClick={handleClick(3)}>Yes</button>
            <button onClick={nextQuestion}>No</button>
        </div>
    }

    const fourthQuestion = (): React.ReactElement => {
        return <div className={"question"}>
            <h2>Is the patient experiencing a chest infection or chest injury?</h2>
            <input type="text"/>
            <button onClick={handleClick(4)}>Yes</button>
            <button onClick={handleClick(5)}>No</button>
        </div>
    }

    const Question = (): React.ReactElement => {
        switch (currentQ) {
            case 1:
                return firstQuestion();
            case 2:
                return secondQuestion();
            case 3:
                return thirdQuestion();
            case 4:
                return fourthQuestion();
        }
        return <div/>
    }

    return (
        <div>
            <LogoutButton/>
            <OuterBoxDiv>
                <CenteredBox>
                    <div>
                        <h1 className="text-2xl font-bold">{hospital && hospital.Hospital_Name} Check In</h1>
                        <Question/>
                        {currentQ > 1 && <button onClick={prevQuestion}>Back</button>}

                    </div>
                </CenteredBox>
            </OuterBoxDiv>
        </div>
    )
}