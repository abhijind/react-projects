import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, isAuthRequired = true }: { children: ReactNode, isAuthRequired: boolean }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state: { auth: { status: boolean } }) => state?.auth?.status);

    useEffect(() => {
        if (isAuthRequired && authStatus !== isAuthRequired) {
            navigate('/login');
        } else if (!isAuthRequired && authStatus !== isAuthRequired) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, isAuthRequired]);
    return loader ? <h1>Loading...</h1> : <>{children}</>
}