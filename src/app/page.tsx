"use client"

//import styles from "./page.module.css";

import Row from "@/components/css_grid/rowDiv";
import Columns from "@/components/css_grid/columnsDiv";
import Subject_Matter from "@/components/matterNav";
import Explication from "@/components/introDiv";
import Notes from "@/components/notesSection";
import Buttons from "@/components/buttonsFooter";
import ProgressBar from "@/components/showingProgressBar";
import { ThemeProvider } from "@/useContext/themeContext";
import { ProgressBarProvider } from "@/useContext/progressBarContext";
import { FilterDataProvider } from "@/useContext/filterDataContext";

export default function Home() {
  return (
    <>
      <header className="text-bg-dark p-3 text-center">
        <h2 className="fw-semibold">Bienvenidos sean, Udistas</h2>
      </header>

      <ThemeProvider>
        <ProgressBarProvider>
          <FilterDataProvider>

            <Row styles="container-fluid text-center p-4">
              
              <Columns styles="p-2 col-md-3 col-sm-12">
                <Subject_Matter />

                <div className="card m-3">
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>Thinking less, doing more being starving and thirsty of knowledge</p>
                      <footer className="blockquote-footer text-start">Author: <cite title="Source Title">Unknown</cite></footer>
                      <footer className="blockquote-footer text-start">Nick: <cite title="Source Title">Alejo</cite></footer>
                    </blockquote>
                  </div>
                </div>

              </Columns>
                
              <Columns styles="p-2 col-md-9 col-sm-12">
                <Explication />

                <ProgressBar />
  
                <div className="card text-center">
                  <div className="card-header text-bg-dark">
                    Notas de los Udistas
                  </div>
                
                    <Notes />
                    <Buttons />
                </div>
              </Columns>

            </Row>

          </FilterDataProvider>
        </ProgressBarProvider>
      </ThemeProvider>
    </>
  );
}
