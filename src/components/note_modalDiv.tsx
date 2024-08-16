"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TFORM, TOptionSpeciality, TOptionsCarreer, TPARAMETERSFORM } from "@/lib/types";
import { dbFirestore, storageFirebase } from "@/lib/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable} from "firebase/storage"; 
import { gettingCourses } from "@/helpers/localFetch";
import { allSemesters } from "@/helpers/globalVariables";
import { InvalidData } from "./alertsDiv";

const optionSpeciality:TOptionSpeciality[] = [
    { value:"Administracion", label:"Administracion" },
    { value:"Contaduria_Publica", label:"Contaduria Publica" },
    { value:"Ingenieria_De_Petroleo", label:"Ingenieria De Petroleo" },
    { value:"Ingenieria_En_Computacion", label:"Ingenieria En Computacion" },
    { value:"Ingenieria_Quimica", label:"Ingenieria Quimica" },
    { value:"Medicina", label:"Medicina" },
    { value:"Tecnologico_En_Fabricacion_Mecanica", label:"Tecnologico En Fabricacion Mecanica" },
    { value:"Arquitectura", label:"Arquitectura" },
    { value:"Ingenieria_Civil", label:"Ingenieria Civil" },
    { value:"Ingenieria_De_Sistemas", label:"Ingenieria De Sistemas" },
    { value:"Ingenieria_Industrial", label:"Ingenieria Industrial" },
    { value:"Ingenieria_Electrica", label:"Ingenieria Electrica" },
    { value:"Ingenieria_Mecanica", label:"Ingenieria Mecanica" },
    { value:"Licenciatura_En_Turismo", label:"Licenciatura En Turismo" },
    { value:"Tecnologico_En_Electronica", label:"Tecnologico En Electronica" },
];

const DATA_FORM:TFORM = {
    professor: "",
    speciality: "",
    course: "",
    semester: 1,
    comment: "",
    date: 0,
    files: []
};

export default function NoteToMake({ progress, setProgress }:{ progress:number, setProgress:Dispatch<SetStateAction<number>> }){
    const [form, setForm] = useState(DATA_FORM);
    const [files, setFiles] = useState<FileList | null>(null);
    const [optionsCarreer, setOptionsCarreer] = useState<TOptionsCarreer[]>([]);
    const [invalid, setInvalid] = useState({
        professor: false,
        comment: false,
        files: false
    });
    const [validatedToSubmit, setValidateToSubmit] = useState(false);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(invalid.professor || invalid.comment || invalid.files) return;
        if(/^ *$/.test(form.speciality) || /^ *$/.test(form.course)) return;

        form.date = Date.now();

                                    ////semestre 1 / Administracion / MATEMATICAS 1 / Eulogio && 19289437434
        await setDoc(doc(dbFirestore, `semestre ${form.semester}`, `${form.speciality}`, `${form.course}`, `${form.professor} && ${form.date}`), {
            ...form
        });

        if(files){
            const uploadPromises: Promise<number>[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const storageRef = ref(storageFirebase, `semestre ${form.semester}/${form.speciality}/${form.course}/${form.professor} && ${form.date}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setProgress(progress);
                    },
                    (error) => {
                        console.error('Error uploading file:', error);
                    },
                    () => {
                        console.log(`File ${file.name} uploaded successfully!`);
                        uploadPromises.push(Promise.resolve(progress));
                    }
                );
            }
      
            Promise.all(uploadPromises).then(() => {
                console.log('All files uploaded!');
                setProgress(0);
            });
        };

        resetForm();
    };

    const resetForm = () =>{
        setForm(DATA_FORM);
        setFiles(null);
    };

    useEffect(()=> {
        if(/^ *$/.test(form.speciality)) return;
        setOptionsCarreer([]);
        setForm({...form, course:""});

        gettingCourses(form.speciality, setOptionsCarreer, allSemesters[form.speciality]);
    }, [form.speciality]);

    useEffect(()=> {
        if(/^ *$/.test(form.professor)) return;

        if(!/[\w'\-,.][^0-9_!¡?÷?¿/.,-\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(form.professor)){
            setInvalid(prev => ({
                ...prev,
                professor: true
            }));
            return;
        }else{
            setInvalid(prev => ({
                ...prev,
                professor: false
            }));
        };
    }, [form.professor]);

    useEffect(()=> {
        if(/^ *$/.test(form.comment)) return;

        if(!/^[\w'\-,.][^÷\ˆ]{10,600}$/.test(form.comment)) {
            setInvalid(prev => ({
                ...prev,
                comment: true
            }));
            return;
        }else{
            setInvalid(prev => ({
                ...prev,
                comment: false
            }));
        };
    }, [form.comment]);

    useEffect(()=> {
        if(form.files.length > 3) {
            setInvalid(prev => ({
                ...prev,
                files: true
            }));
            return;
        }else{
            setInvalid(prev => ({
                ...prev,
                files: false
            }));
        };
    }, [form.files]);

    useEffect(()=> {
        if(/^ *$/.test(form.professor) || /^ *$/.test(form.comment)) return;

        if(!invalid.professor && !invalid.comment && !invalid.files){
            setValidateToSubmit(true);
        }else if(!invalid.professor && !invalid.comment){
            setValidateToSubmit(true);
        }else{
            setValidateToSubmit(false);
        }
    }, [invalid]);

    return(
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" tabIndex={-1} data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crea tu nota aqui</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            {invalid.professor &&
                                <InvalidData msg="Err Professor: Escribe adecuadamente el nombre y apellido en minusculas, evitando usar signos y numeros" />
                            }
                            {invalid.comment &&
                                <InvalidData msg="Err Comentario: Tu comentario tiene que tener entre 10 a 500 caracteres" />
                            }
                            {invalid.files &&
                                <InvalidData msg="Err Archivos: Solo puedes adjuntas maximo 3 imagenes" />
                            }
                            <Modal_Body form={form} setForm={setForm} setFiles={setFiles} optionsCarreer={optionsCarreer} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={resetForm}>Cerrar</button>
                            {validatedToSubmit &&
                                <button type="submit" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Enviar</button>
                            }
                            {!validatedToSubmit &&
                                <button type="submit" className="btn btn-warning">Enviar</button>
                            }
                        </div>
                    </form>
                </div>
            </div>

            <Modal_Thanking />
        </>
    );
};

function Modal_Body({form, setForm, setFiles, optionsCarreer}: TPARAMETERSFORM){
    const handlechange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{        
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const handlechangeFiles = (e:React.ChangeEvent<HTMLInputElement>) =>{
        //console.log(e.target.files); //Property 'files' does not exist on type 'EventTarget & (HTMLInputElement | HTMLTextAreaElement)
        let file:FileList | null = (e.currentTarget as HTMLInputElement).files //In this case, the TypeScript compiler doesn't know you are returning an input element
        if(!file) return;
        setFiles(file);
        const getFiles:string[] = Array.from(file).map((filename) =>  filename.name);
        setForm({...form, files: getFiles});
    };

    useEffect(() => {
        if(/^ *$/.test(form.course)) return;
        const index:number = optionsCarreer.findIndex(el => el.value === form.course);
        setForm({...form, semester: optionsCarreer[index].id_semester});
    }, [form.course]);

    return(
        <>
            <div className="mb-3">
                <label htmlFor="professorInput" className="form-label">Profesor: </label>
                <input type="text" name="professor" value={form.professor} onChange={handlechange} className="form-control" id="professorInput" placeholder="Eulogio Herrera" required />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="optionSpeciality">Carrera: </label>
                <select className="form-select" id="optionSpeciality" name="speciality" value={form.speciality} onChange={handlechange} required>
                    <option key="Not Chosen 1" defaultValue=""></option>
                    {optionSpeciality.map((option) => (
                        <option value={option.value} key={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            {form.speciality &&
                <div className="mb-3">
                    <label className="form-label" htmlFor="optionsCarreer">Materia: </label>
                    <select className="form-select" id="optionsCarreer" name="course" value={form.course} onChange={handlechange} required>
                    <option key="Not Chosen 2" defaultValue=""></option>
                        {optionsCarreer.map((option) => (
                            <option value={option.value} key={option.id}>{option.value}</option>
                        ))}
                    </select>
                </div>
            }
            <div className="mb-3">
                <label htmlFor="semesterInput" className="form-label">Semestre: </label>
                <input type="number" value={form.semester} disabled className="form-control" id="semesterInput" placeholder="1" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="commentInput" className="form-label">Comentario: </label>
                <textarea name="comment" value={form.comment} onChange={handlechange} className="form-control" id="commentInput" rows={3} placeholder="Excelente profesor para explicar matematicas, recomendable y sin queja alguna" required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Adjuntar Imagenes: </label>
                <input type="file" accept="image/*" onChange={handlechangeFiles} className="form-control" id="formFileMultiple" multiple />
            </div>
            <div id="passwordHelpBlock" className="form-text fw-bold">
                Adjuntar clases, examenes, tips, todo lo que sirva para expresar mejor tu comentario si se desea. NOT VIDEOS 
            </div>
        </>
    );
};

function Modal_Thanking(){
    return(
        <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        Gracias por tu comentario, espero haya sido respetuoso, cuidate, my little random person : D 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/*function capitalizeFirstLetter(course:string):string{
    return course.charAt(0).toUpperCase() + course.slice(1);
};*/