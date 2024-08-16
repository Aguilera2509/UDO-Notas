import { TCSSGRID } from "@/lib/types";

export default function Row({children, styles}:TCSSGRID){
    return(
        <div className={`${styles}`}>
            <div className="row">
                {children}
            </div>
        </div>
    );
};