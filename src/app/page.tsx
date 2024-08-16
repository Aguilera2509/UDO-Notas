"use client"

//import Image from "next/image";
//import styles from "./page.module.css";

import Row from "@/components/css_grid/rowDiv";
import Columns from "@/components/css_grid/columnsDiv";
import Subject_Matter from "@/components/matterNav";
import Explication from "@/components/introDiv";
import Notes from "@/components/notesSection";
import Buttons from "@/components/buttonsFooter";
import { useState } from "react";
import { TFilterData } from "@/lib/types";
import { ThemeProvider } from "@/useContext/themeContext";

export default function Home() {
  const [filterData, setFilterData] = useState<TFilterData>({
    speciality: "",
    semester: "",
    course: ""
  });

  const [progress, setProgress] = useState(0);

  return (
    <>
      <header className="text-bg-dark p-3 text-center">
        <h2 className="fw-semibold">Bienvenidos sean Udistas</h2>
      </header>

      <ThemeProvider>
        <Row styles="container-fluid text-center p-4">
          
          <Columns styles="p-2 col-md-3 col-sm-12">
            <Subject_Matter filterData={filterData} setFilterData={setFilterData} />
          </Columns>
            
          <Columns styles="p-2 col-md-9 col-sm-12">
            <Explication />

            {progress !== 0 &&
              <div className="alert alert-success" role="alert">
                Subiendo archivo {progress}%
              </div>
            }

            <div className="card text-center">
              <div className="card-header text-bg-dark">
                Notas de los Udistas
              </div>
            
                <Notes filterData={filterData} />
                <Buttons progress={progress} setProgress={setProgress} />
            </div>
          </Columns>

        </Row>
      </ThemeProvider>

    </>
  );
}
