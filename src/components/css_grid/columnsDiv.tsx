import { TCSSGRID } from "@/lib/types";

export default function Columns({children, styles}:TCSSGRID){
    return(
        <div className={`${styles}`}>
           {children}
        </div>
    );
};