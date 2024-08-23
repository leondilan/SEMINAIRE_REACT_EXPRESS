import React from 'react'
import {Outlet} from "react-router-dom";
import {Toaster} from "sonner";

export default function App() {
    return (
        <>
            <Toaster position="top-center" expand={true}/>
            <Outlet />
        </>
    )
}