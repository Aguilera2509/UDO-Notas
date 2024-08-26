const semesterMedicina:string[] = ["semestre 1", "semestre 2", "semestre 3", "semestre 4", "semestre 5", "semestre 6", "semestre 7", "semestre 8", "semestre 9", "semestre 10", 
    "semestre 11", "semestre 12", "semestre 13"];

const semesterTecnologico:string[] = ["semestre 1", "semestre 2", "semestre 3", "semestre 4", "semestre 5", "semestre 6"];

const semesterTurismo:string[] = ["semestre 1", "semestre 2", "semestre 3", "semestre 4"];

const semesterToTen:string[] = ["semestre 1", "semestre 2", "semestre 3", "semestre 4", "semestre 5", "semestre 6", "semestre 7", "semestre 8", "semestre 9", "semestre 10"];

const semesterToNine:string[] = ["semestre 1", "semestre 2", "semestre 3", "semestre 4", "semestre 5", "semestre 6", "semestre 7", "semestre 8", "semestre 9"];

const allSemesters:any = {
    "Administracion": semesterToTen,
    "Contaduria_Publica": semesterToTen,
    "Ingenieria_De_Petroleo": semesterToNine,
    "Ingenieria_En_Computacion": semesterToNine,
    "Ingenieria_Quimica": semesterToTen,
    "Medicina": semesterMedicina,
    "Arquitectura": semesterToNine,
    "Ingenieria_Civil": semesterToTen,
    "Ingenieria_De_Sistemas": semesterToNine,
    "Ingenieria_Industrial": semesterToTen,
    "Ingenieria_Electrica": semesterToTen,
    "Ingenieria_Mecanica": semesterToTen,
    "Licenciatura_En_Turismo": semesterTurismo,
    "Tecnologico_En_Fabricacion_Mecanica": semesterTecnologico,
    "Tecnologico_En_Electronica": semesterTecnologico
};

const speciality:string[] = ["Administracion", "Contaduria_Publica", "Medicina", "Arquitectura", "Ingenieria_En_Computacion", "Ingenieria_Mecanica", "Ingenieria_Quimica", "Ingenieria_De_Petroleo", 
    "Ingenieria_Electrica", "Ingenieria_Industrial", "Ingenieria_De_Sistemas", "Ingenieria_Civil", "Tecnologico_En_Fabricacion_Mecanica", "Tecnologico_En_Electronica", "Licenciatura_En_Turismo"];

export {
    allSemesters, speciality
};