import CenteredBox from "../components/CenteredBox.tsx";
import {useGetAccessToken} from "../helpers/get_token.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {selectHospital} from "../redux/hospitalSlice.ts";
import {useEffect} from "react";
import OuterBoxDiv from "../components/OuterBoxDiv.tsx";
import LogoutButton from "../components/auth/LogoutButton.tsx";
import {selectCheckedIn} from "../redux/checkedInSlice.ts";
import {selectRole} from "../redux/roleSlice.ts";

export const QueuePage = () => {
    const accessToken = useGetAccessToken("read:self");
    const hospital = useSelector((state: RootState) => selectHospital(state));
    const checkedIn = useSelector((state: RootState) => selectCheckedIn(state));
    const role = useSelector((state: RootState) => selectRole(state));
    console.log("Checked IN:" + checkedIn);
    console.log("Hospital:" + hospital)
    console.log(hospital)
    console.log("Role:"  )
    console.log(role)

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        fetch('http://localhost:8080/waittime', {
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

        }).then(
            data => {
                console.log(data);
            }
        ).catch(error => {
            console.error('Error:', error);
        });
}, [accessToken, hospital]
)

return (
    <div>
    <LogoutButton/>
    <OuterBoxDiv>
        <CenteredBox>
            <h1>Queue Page</h1>
            <p>You are now waiting in the queue and saved in our system.</p>
        </CenteredBox>
    </OuterBoxDiv>
    </div>
);
}