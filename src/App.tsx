import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {Homepage} from "./pages/Homepage.tsx";
import {HospitalCheckIn} from "./pages/HospitalCheckIn.tsx";
import {QueuePage} from "./pages/QueuePage.tsx";
import {StaffDashboard} from "./pages/StaffDashboard.tsx";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<Homepage />} />,
        <Route path={"/check"} element={<HospitalCheckIn/>} />,
        <Route path={"/queue"} element={<QueuePage/>}/>,
        <Route path={"/dash"} element={<StaffDashboard/>} />,
        <Route path="*" element={<div>Not Found</div>} />
    ])
);

function App() {

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App
