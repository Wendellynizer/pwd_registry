import { Outlet } from "react-router";

const GuestLayout = () => {

    return(
        <>
            <h1>Guest Layout</h1>

            <Outlet />
        </>
    );
}

export default GuestLayout;