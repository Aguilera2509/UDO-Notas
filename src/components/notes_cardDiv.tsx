import { TFORM } from "@/lib/types";
import Columns from "./css_grid/columnsDiv";
import Row from "./css_grid/rowDiv";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { dbFirestore, storageFirebase } from "@/lib/firebase";
import { ShowImages } from "./images_notes_cardDiv";
import { doc, setDoc } from "firebase/firestore";
import { NotComments } from "./alertsDiv";

function time(id_date:number):string{
    const postingDate:Date = new Date(id_date);

    let day:number = postingDate.getDate();
    let month:number = postingDate.getMonth() + 1; //start at 0, getMonth works between 0 - 11;
    let year:number = postingDate.getFullYear();
    let hour:number = postingDate.getHours();
    let minute:number | string = postingDate.getMinutes().toString().length === 1 ? `0${postingDate.getMinutes()}` : postingDate.getMinutes()

    const formattedHuman:string = `Publicado el ${day}/${month}/${year} a las ${hour}:${minute} (Modo de Fecha Latina)`;
    return formattedHuman;
};

export default function CardToShowNotes({ dataToShow }:{ dataToShow:TFORM }){
    const [image, setImage] = useState<string[]>([]);
    const [comments, setComments] = useState<boolean>(false);

    useEffect(() => {
        if(dataToShow.files.length === 0) return;

        const gettingImage = async() => {
            try{
                const promises = dataToShow.files.map(async (file) => {
                    const pathReference = ref(
                        storageFirebase,
                        `semestre ${dataToShow.semester}/${dataToShow.speciality}/${dataToShow.course}/${dataToShow.professor} && ${dataToShow.date}/${file}`
                    );

                    const url = await getDownloadURL(pathReference);

                    return url;
                });
                
                const urls = await Promise.all(promises);

                setImage(urls);
            }catch(err){
                console.error(err);
            };
        };

        gettingImage();
    }, [dataToShow]);

    return(
        <div className="card text-start m-2">
            <div className="card-header">
                <Row styles="container-fluid text-center">
                    <Columns styles="col-md-4 col-sm-4 fw-bold">
                        Profesor: {dataToShow["professor"]}
                    </Columns>
                    <Columns styles="col-md-4 col-sm-4 fw-bold">
                        Materia: {dataToShow["course"]}
                    </Columns>
                    <Columns styles="col-md-4 col-sm-4 fw-bold">
                        Semestre: {dataToShow["semester"]}
                    </Columns>
                </Row>
            </div>

            <div className="card-body">
                <p className="card-text">{dataToShow["comment"]}</p>
                {dataToShow.files.length !== 0 &&
                    <Row styles="container-fluid text-center">
                        {
                            image.map((el:string, index:number) => <ShowImages key={(Date.now() + index)} img={el} />)
                        }
                    </Row>
                }
            </div>

            <div className="card-footer text-body-secondary">
                <p className="text-center">{time(dataToShow["date"])}</p>
                <button type="button" className="btn btn-link w-100" onClick={(e)=> setComments(!comments)}>Comentarios</button>
            </div>

            {comments &&
                <>
                    <User_Comment_Form db={dataToShow} />
                    <hr />
                    {dataToShow.userComment.length === 0 ? 
                        <NotComments msg="No Comentarios se el primero" />
                        : dataToShow.userComment.map((el, index) => (
                            <div className="card m-1 text-bg-secondary" key={(Date.now()+index)}>
                                <div className="card-body">
                                    {el}
                                </div>
                            </div>
                        ))
                    }
                </>
            }

        </div>
    );
};

function User_Comment_Form({ db }: { db:TFORM }){
    const [userComment, setUserComment] = useState<string>("");

    const handleSubmitComment = async (e:any) => {
        e.preventDefault();

        if(!/^[\w'\-,.][^÷\ˆ]{2,300}$/.test(userComment)) return;

        db.userComment = [...db.userComment, userComment];

        await setDoc(doc(dbFirestore, `semestre ${db.semester}`, `${db.speciality}`, `${db.course}`, `${db.professor} && ${db.date}`), {
            ...db
        });

        setUserComment("");
    };
    
    return(
        <form onSubmit={handleSubmitComment}>
            <div className="input-group p-2">
                <input type="text" value={userComment} onChange={(e) => setUserComment(e.target.value)} className="form-control border-primary" placeholder="Deja tu Comentario aqui de 3 a 300 carateres" required />
                <button className="btn btn-success" type="submit">Enviar</button>
            </div>
        </form>
    );
};