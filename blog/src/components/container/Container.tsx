import {  ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-full max-w-7-xl mx-auto px-4">
            { children}
        </div>
    )
}

export default Container;
