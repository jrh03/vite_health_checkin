import CenteredBox from "../components/CenteredBox.tsx";
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

interface available_staff {
    _id: string;
    Staff: {
        name: name[];
    };
    available: boolean;
}

type PatientDisplayCategories = {
    [key: number]: waiting_patient[];
};

export const StaffDashboard = () => {
    const accessToken = useGetAccessToken("read:staff");
    const hospital = useSelector((state: RootState) => selectHospital(state));
    const [patientDisplayCategories, setPatientDisplayCategories] = useState<PatientDisplayCategories>({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
    });
    const [availableStaff, setAvailableStaff] = useState([]);
    const [ping, setPing] = useState(true);

    useEffect(() => {
            if (!accessToken) {
                return;
            }
            if (ping) {
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
                })
                    .then(data => {
                        const newCategories: PatientDisplayCategories = {
                            1: [],
                            2: [],
                            3: [],
                            4: [],
                            5: [],
                        };

                        data.forEach((patient: waiting_patient) => {
                            newCategories[patient.Score].push(patient);
                        });

                        setPatientDisplayCategories(newCategories);
                        console.log(patientDisplayCategories)
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                fetch(import.meta.env.VITE_API_URL + '/working-staff', {
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
                    setAvailableStaff(data);
                })
                    .catch(error => {
                        console.error('Error:', error);
                    })
                setPing(false)
            }
        }
        , [accessToken, hospital, patientDisplayCategories, ping]); // accessToken is not included here as it's already a dependency

    return (
        <div>
            <LogoutButton/>
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
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {patientDisplayCategories[parseInt(score)] && patientDisplayCategories[parseInt(score)].map(patient => (
                                    <tr key={patient._id && patient._id}>
                                        <td>{patient.Patient.name[0].family}</td>
                                        <td>{patient.CheckInTime.toString()}</td>
                                        <td>{patient.SeenByDoctor ? 'Yes' : 'No'}</td>
                                        <td>
                                            <select>
                                                {availableStaff.map((staff: available_staff) => (
                                                    <option key={staff._id} value={staff._id}>{staff.Staff.name[0].family}</option>
                                                ))}
                                            </select>
                                        </td>
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