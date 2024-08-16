import { ReactNode, Dispatch, SetStateAction } from "react";

//ROW && COLUMNS'S TYPE --- COMPONENTS \\
export type TCSSGRID = {
    children: ReactNode,
    styles: string
};

//FORM FROM NOTE_MODALDIV --- COMPONENT \\
export type TFORM = {
    professor: string,
    speciality: string,
    course: string,
    semester: number,
    comment: string,
    date: number,
    files: string[]
};

//MODAL_MODY'S TYPE --- NOTE_MODALDIV.TSX --- COMPONENT \\ 
export type TPARAMETERSFORM = {
    form: TFORM,
    setForm: Dispatch<SetStateAction<TFORM>>,
    setFiles: Dispatch<SetStateAction<FileList | null>>,
    optionsCarreer: TOptionsCarreer[]
}

//NOTE_MODALDIV'S TYE --- COMPONENT \\
export type TOptionSpeciality = {
    value: string,
    label: string
};

export type TOptionsCarreer = {
    value: string,
    id: number,
    id_semester: number
};

//FILTERDATA'S TYPE ----- APP/PAGE.TSX
export type TFilterData = {
    speciality: string,
    semester: string,
    course: string
};

//COURSE'S TYPE AT NOTESECTION --- COMPONENTS
export type TCourse = {
    id:number,
    name: string,
    id_semester: number,
};