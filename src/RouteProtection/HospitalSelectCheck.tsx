import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";
import {Navigate, Outlet} from "react-router-dom";
import {selectHospital} from "../redux/hospitalSlice.ts";

export function HospitalSelectCheck() {
    const hospital = useSelector((state: RootState) => selectHospital(state));
    if (!hospital) {
        return (<Navigate to={"/"} replace />)
    }
    return (<Outlet/>)
}