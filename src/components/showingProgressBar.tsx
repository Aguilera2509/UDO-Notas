import ProgressBarContext from "@/useContext/progressBarContext";
import { useContext } from "react";

export default function ProgressBar(){
    const barContext = useContext(ProgressBarContext);

    if(barContext.progress === 0) return <></>

    return(
        <div className="alert alert-success" role="alert">
            Subiendo archivo {barContext.progress}%
        </div>
    );
};