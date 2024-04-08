import CenteredBox from "../components/CenteredBox.tsx";
import {useGetAccessToken} from "../helpers/get_token.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {selectHospital} from "../redux/hospitalSlice.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const QueuePage = () => {
    const accessToken = useGetAccessToken("read:self");
    const hospital = useSelector((state: RootState) => selectHospital(state));
    const navigate = useNavigate();
    useEffect(() => {
        if (!hospital) {
            navigate("/");
            return;
        }
        if (!accessToken) {
            return;
        }
        const getPatientsAhead = async () => {
            try {
                console.log(accessToken);
                const response = await fetch('http://localhost:8080/waittime', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({Hospital: hospital})
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                
                console.log(data);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        getPatientsAhead();
    }, [accessToken, navigate, hospital]); // accessToken is not included here as it's already a dependency

    return <CenteredBox>
        <h1>Queue Page</h1>
        <p>You are now waiting in the queue and saved in our system.</p>
    </CenteredBox>
}