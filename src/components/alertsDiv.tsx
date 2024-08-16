export function ErrAlert({ err }:{err:string}){
    return(
        <div className="alert alert-danger m-2" role="alert">
            {err}
        </div>
    );
};

export function NotDataAlert({ message, sp, sem, course }:{message:string, sp:string, sem:string, course:string}){
    return(
        <div className="alert alert-primary m-2" role="alert">
            {`${message} ${sem} -- ${sp.replaceAll("_", " ")} -- ${course}.`} 
        </div>
    );
};


//NOTE_MODALDIV.TSX ---- COMPONENTS

export function InvalidData({msg}:{msg:string}){
    return(
        <div className="alert alert-danger m-2" role="alert">
            {msg}
        </div>
    );
};