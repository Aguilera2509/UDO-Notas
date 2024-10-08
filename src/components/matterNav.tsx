"use client"

import { allSemesters, speciality } from "@/helpers/globalVariables";
import { gettingCoursesFilter } from "@/helpers/localFetch";
import { TOptionsCarreer } from "@/lib/types";
import FilterDataContext from "@/useContext/filterDataContext";
import ThemeContext from "@/useContext/themeContext";
import { useContext, useEffect, useState } from "react";

export default function Subject_Matter(){
    const [optionsCarreer, setOptionsCarreer] = useState<TOptionsCarreer[]>([]);

    const context = useContext(ThemeContext);
    const { filterData, setFilterData } = useContext(FilterDataContext);

    const handleGoingBack = () => {
        context.setSizeArray(0);
        context.setPage(0);
        window.sessionStorage.clear(); //Is it good to do this????
        if(filterData.semester) return setFilterData({...filterData, semester: "", course: ""});
        if(filterData.speciality) return setFilterData({...filterData, speciality: ""});
    };

    useEffect(()=> {
        if(/^ *$/.test(filterData.semester)) return;
        setOptionsCarreer([]);

        gettingCoursesFilter(filterData.speciality, setOptionsCarreer, filterData.semester);
    }, [filterData.semester]);

    useEffect(()=> {
        context.setPage(0);
        context.setSizeArray(0);

        if(/^ *$/.test(filterData.course)) return;

        window.sessionStorage.setItem("specialityStorage", filterData.speciality);
        window.sessionStorage.setItem("semesterStorage", filterData.semester);
        window.sessionStorage.setItem("courseStorage", filterData.course);
    }, [filterData.course]);

    useEffect(()=> {
        if(window.sessionStorage.getItem("courseStorage")){
            setFilterData({
                speciality: window.sessionStorage.getItem("specialityStorage") as string,
                semester: window.sessionStorage.getItem("semesterStorage") as string,
                course: window.sessionStorage.getItem("courseStorage") as string
            });
        };
    }, []);

    return(
        <nav>
            <div className="card">
                <h5 className="card-header text-center text-bg-dark">
                    {/^ *$/.test(filterData.speciality) 
                    ? "Especialidad" 
                    : /^ *$/.test(filterData.semester) ? "Semestre" : "Materias"}
                    </h5>
                <div className="card-body">
                    {/^ *$/.test(filterData.speciality) &&
                        speciality.map(sp => <button type="button" className="btn btn-link text-start w-100" key={sp} onClick={(e) => setFilterData({...filterData, speciality:sp})}>{sp.replaceAll("_", " ")}</button>)       
                    }
                    {!/^ *$/.test(filterData.speciality) && /^ *$/.test(filterData.semester) &&
                        allSemesters[filterData.speciality].map((sem:string) => <button type="button" className="btn btn-link text-start w-100" key={sem} onClick={(e) => setFilterData({...filterData, semester:sem})}>{sem}</button>)    
                    }
                    {!/^ *$/.test(filterData.semester) &&
                        optionsCarreer.map(option => <button type="button" className="btn btn-link text-start w-100" key={(option.id + Date.now())} onClick={(e) => setFilterData({...filterData, course:option.value})}>{option.value}</button>) 
                    }
                </div>
                {!/^ *$/.test(filterData.speciality) &&
                    <div className="card-footer text-start">
                        <button type="button" className="btn btn-link" onClick={handleGoingBack}>Atras</button>
                    </div>
                }
            </div>
        </nav>
    );
};