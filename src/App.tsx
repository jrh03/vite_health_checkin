import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import {HospitalCheckIn} from "./pages/HospitalCheckIn.tsx";
import {QueuePage} from "./pages/QueuePage.tsx";
import {StaffDashboard} from "./pages/StaffDashboard.tsx";
import {ProtectedRoute} from "./RouteProtection/LoggedInRoute.tsx";
import {LoginRedirect} from "./pages/LoginRedirect.tsx";
import HospitalSelection from "./pages/HospitalSelection.tsx";
import {HospitalSelectCheck} from "./RouteProtection/HospitalSelectCheck.tsx";
import {CheckedInProtection} from "./RouteProtection/CheckedInProtection.tsx";
import {Role} from "./redux/roleSlice.ts";
import {AlreadyLoggedIn} from "./RouteProtection/AlreadyLoggedIn.tsx";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route element={<ProtectedRoute allowedRoles={undefined}/>}>
            <Route path={"/"} element={<HospitalSelection/>}/>,
            <Route element={<ProtectedRoute allowedRoles={[Role.Patient]}/>}>
                <Route element={<HospitalSelectCheck/>}>
                    <Route path={"/checkin"} element={<HospitalCheckIn/>}/>,
                    <Route element={<CheckedInProtection/>}>
                        <Route path={"/queue"} element={<QueuePage/>}/>,
                    </Route>
                </Route>
            </Route>,
            <Route element={<ProtectedRoute allowedRoles={[Role.Staff]}/>}>
                <Route element={<HospitalSelectCheck/>}>
                    <Route path={"/dash"} element={<StaffDashboard/>}/>,
                </Route>,
            </Route>,
        </Route>,
        <Route element={<AlreadyLoggedIn/>}>
            <Route path={"/login"} element={<LoginRedirect/>}/>,
        </Route>,
        <Route path="*" element={<div>Not Found</div>}/>,

    ])
);

function App() {

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App
