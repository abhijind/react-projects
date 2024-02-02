import { ReactElement } from "react";

function Container({ children }: {children: ReactElement}) {
    return (
        <div className="w-full max-w-7-xl mx-auto px-4">
            { children}
        </div>
    )
}

export default Container;
