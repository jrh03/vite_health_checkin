import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {selectCheckedIn} from "../redux/checkedInSlice.ts";
import {Navigate, Outlet} from "react-router-dom";

export function CheckedInProtection() {
    const checkedIn = useSelector((state: RootState) => selectCheckedIn(state));
    if (!checkedIn) {
        return (<Navigate to={"/checkin"} replace />)
    }
    return (<Outlet/>)
}