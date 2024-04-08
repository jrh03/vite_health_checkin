import CenteredBox from "../components/CenteredBox.tsx";
import {useNavigate} from "react-router-dom";
import {useGetAccessToken} from "../helpers/get_token.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {selectHospital} from "../redux/hospitalSlice.ts";
import LogoutButton from "../components/auth/LogoutButton.tsx";

type name = {
    family: string;
    given: string[];
}
interface waiting_patient {
    _id: string;
    CheckInTime: Date;
    Patient: {
        name: name[];
    };
    Score: number;
    SeenByDoctor: boolean;
}

type PatientDisplayCategories = {
    [key: number]: waiting_patient[];
};

export const StaffDashboard = () => {
    const navigate = useNavigate();
    const accessToken = useGetAccessToken("read:staff");
    const hospital = useSelector((state: RootState) => selectHospital(state));
    const [patientDisplayCategories, setPatientDisplayCategories] = useState<PatientDisplayCategories>({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
    });

    useEffect(() => {
        if (!hospital) {
            navigate("/");
            return;
        }
        if (!accessToken) {
            return;
        }
        const getPatients = async () => {
            try {
                console.log(accessToken);
                const response = await fetch('http://localhost:8080/waiting', {
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

                const data: waiting_patient[] = await response.json();

                const newCategories: PatientDisplayCategories = {
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: [],
                };

                data.forEach(patient => {
                    newCategories[patient.Score].push(patient);
                });

                setPatientDisplayCategories(newCategories);
                console.log(patientDisplayCategories)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getPatients();
    }, [accessToken, navigate, hospital]); // accessToken is not included here as it's already a dependency

    // const renderTableForScore = (score: number) => (
    //     <div key={score}>
    //         <h2>Score: {score}</h2>
    //         <table>
    //             <thead>
    //             <tr>
    //                 <th>Name</th>
    //                 <th>Check-In Time</th>
    //                 <th>Seen By Doctor</th>
    //             </tr>
    //             </thead>
    //             <tbody>
    //             {patientDisplayCategories[score].map(patient => (
    //                 <tr key={patient._id}>
    //                     <td>{patient.Patient.name}</td>
    //                     <td>{patient.CheckInTime.toString()}</td>
    //                     <td>{patient.SeenByDoctor ? 'Yes' : 'No'}</td>
    //                 </tr>
    //             ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );

    return (
        <div>
            <LogoutButton />
            <CenteredBox>
                <div>
                    {hospital && <h1 className="text-2xl font-bold">{hospital.Hospital_Name} Waiting List</h1>}
                </div>
                <div>
                    {Object.keys(patientDisplayCategories).map(score => (
                        <div key={score}>
                            <h2>Score: {score}</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Check-In Time</th>
                                    <th>Seen By Doctor</th>
                                </tr>
                                </thead>
                                <tbody>
                                {patientDisplayCategories[parseInt(score)] && patientDisplayCategories[parseInt(score)].map(patient => (
                                    <tr key={patient._id && patient._id}>
                                        <td>{patient.Patient.name[0].family}</td>
                                        <td>{patient.CheckInTime.toString()}</td>
                                        <td>{patient.SeenByDoctor ? 'Yes' : 'No'}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </CenteredBox>
        </div>

    )

}