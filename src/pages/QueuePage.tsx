import CenteredBox from "../components/CenteredBox.tsx";
import {useGetAccessToken} from "../helpers/get_token.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {selectHospital} from "../redux/hospitalSlice.ts";
import {useEffect, useState} from "react";
import OuterBoxDiv from "../components/OuterBoxDiv.tsx";
import LogoutButton from "../components/auth/LogoutButton.tsx";
import {selectCheckedIn} from "../redux/checkedInSlice.ts";
import {selectRole} from "../redux/roleSlice.ts";

export const QueuePage = () => {
    const [peopleInQueue, setPeopleInQueue] = useState(0);
    const [initial, setInitial] = useState(true);
    const accessToken = useGetAccessToken("read:self");
    const hospital = useSelector((state: RootState) => selectHospital(state));
    const checkedIn = useSelector((state: RootState) => selectCheckedIn(state));
    const role = useSelector((state: RootState) => selectRole(state));
    console.log("Checked IN:" + checkedIn);
    console.log("Hospital:" + hospital)
    console.log(hospital)
    console.log("Role:")
    console.log(role)

    useEffect(() => {
            if (!accessToken) {
                return;
            }
            const fetchData = () => {
                fetch(import.meta.env.VITE_API_URL + '/current-patient-wait', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({Hospital: hospital})
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();

                }).then(data => {
                    setPeopleInQueue(data);
                }).catch(error => {
                    console.error('Error:', error);
                });
            };

            if (initial) {
                fetchData();
                setInitial(false)
            }

            const interval = setInterval(fetchData, 300000);

            // Clear the interval when component unmounts

            return () => clearInterval(interval);
        }, [accessToken, hospital, initial]
    )

    return (
        <div>
            <LogoutButton/>
            <OuterBoxDiv>
                <CenteredBox>
                    <h1>Queue Page</h1>
                    <p>You are now waiting in the queue and saved in our system.</p>
                    {peopleInQueue !== 0 && <p>There are {peopleInQueue} people in front of you.</p>}
                </CenteredBox>
            </OuterBoxDiv>
        </div>
    );
}