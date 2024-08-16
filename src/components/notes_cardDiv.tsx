import { TFORM } from "@/lib/types";
import Columns from "./css_grid/columnsDiv";
import Row from "./css_grid/rowDiv";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storageFirebase } from "@/lib/firebase";
import { ShowImages } from "./images_notes_cardDiv";

function time(id_date:number):string{
    const postingDate:Date = new Date(id_date);

    let day:number = postingDate.getDate();
    let month:number = postingDate.getMonth() + 1; //start at 0, getMonth works between 0 - 11;
    let year:number = postingDate.getFullYear();

    const formattedHuman:string = `Publicado el ${day}/${month}/${year} (Modo de Fecha Latina)`;
    return formattedHuman;
};

export default function CardToShowNotes({ dataToShow }:{ dataToShow:TFORM }){
    const [image, setImage] = useState<string[]>([]);

    useEffect(() => {
        if(dataToShow.files.length === 0) return;

        const gettingImage = async() => {
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
                {/*<Row styles="container-fluid text-center">
                    <Columns styles="col-md-6 col-sm-12">
                        <button type="button" className="btn btn-success w-100">Responder</button>
                    </Columns>
                    <Columns styles="col-md-6 col-sm-12">
                        <button type="button" className="btn btn-info w-100"> 0 Like/s</button>
                    </Columns>
                </Row>
                <hr />*/}
                <p className="text-center">{time(dataToShow["date"])}</p>
            </div>
        </div>
    );
};