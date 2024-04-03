import CenteredBox from "../components/CenteredBox.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useGetAccessToken} from "../helpers/get_token.ts";
import {useEffect} from "react";

export const StaffDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = useGetAccessToken("read:staff");

    useEffect(() => {
        if (!location.state) {
            navigate("/");
            return;
        }

        const getPatients = async () => {
            try {
                const response = await fetch('http://localhost:8080/waiting', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }, body: JSON.stringify({Hospital: location.state.hospital})
                })

                console.log(response)

                if (response.status !== 200) {
                    console.error('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                const data = await response.json(); // Assuming the server responds with JSON
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getPatients()
    }, [location.state, navigate, accessToken]); // Depend on accessToken too if it's expected to change over time


    return (
        <CenteredBox>
            <div>
                <h1 className="text-2xl font-bold">{location.state.hospital.Hospital_Name} Waiting List</h1>
            </div>
        </CenteredBox>
    )

}