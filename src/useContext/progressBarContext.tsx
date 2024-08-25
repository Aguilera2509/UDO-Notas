import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type TProgressBarContext = {
    progress: number,
    setProgress: Dispatch<SetStateAction<number>>,
};

const ProgressBarContext = createContext<TProgressBarContext>({ progress: 0, setProgress(){} });

const ProgressBarProvider = ({ children }: { children:ReactNode }) => {
    const [progress, setProgress] = useState(0);

    const data = { progress, setProgress };

    return <ProgressBarContext.Provider value={data} >{children}</ProgressBarContext.Provider>
};

export default ProgressBarContext
export {
    ProgressBarProvider
}