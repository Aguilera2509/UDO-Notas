import Row from "./css_grid/rowDiv";
import Columns from "./css_grid/columnsDiv";
import Pagination_Notes from "./paginationNav";
import NoteToMake from "./note_modalDiv";
import { Dispatch, SetStateAction } from "react";

export default function Buttons({ progress, setProgress }:{ progress:number, setProgress:Dispatch<SetStateAction<number>> }){
    return(
        <>
            <div className="card-footer text-body-secondary border-top border-1 border-success">
                <Row styles="container-fluid text-center">
                    <Columns styles="col-md-6 col-sm-12">
                        <Pagination_Notes />
                    </Columns>

                    <Columns styles="col-md-6 col-sm-12">
                        <button type="button" className="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Haz una nota</button>
                    </Columns>
                </Row>
            </div>

            <NoteToMake progress={progress} setProgress={setProgress} />
        </>
    );
};