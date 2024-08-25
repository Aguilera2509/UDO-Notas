"use client"

import CardToShowNotes from "./notes_cardDiv";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { dbFirestore } from "@/lib/firebase";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { TCourse, TFORM } from "@/lib/types";
import Loader from "./loaderDiv";
import { ErrAlert, NotDataAlert } from "./alertsDiv";
import { speciality } from "@/helpers/globalVariables";
import ThemeContext from "@/useContext/themeContext";
import FilterDataContext from "@/useContext/filterDataContext";

const maxArraySize:number = 15;

async function queryData(sem:string, sp:string, course:string, setCollectionFb: Dispatch<SetStateAction<TFORM[][]>>, setNotData: Dispatch<SetStateAction<boolean>>, contextSizeArray:Dispatch<SetStateAction<number>>){
    const queryFb = query(collection(dbFirestore, `${sem}/${sp}/${course}`), orderBy("date", "desc"));
    const { docs } = await getDocs(queryFb) as any;

    if(docs.length === 0) return setNotData(true);

    let pagination: TFORM[][] = [];

    docs.forEach((el: any) => {
        const separator: TFORM[] = [el.data()];

        if (pagination.length === 0 || pagination[pagination.length - 1].length === maxArraySize) {
            pagination.push(separator);
        } else {
            pagination[pagination.length - 1].push(...separator);
        }
    });

    setCollectionFb(pagination);
    contextSizeArray(pagination.length);
};

export default function Notes(){
    const [collectionFb, setCollectionFb] = useState<TFORM[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setErr] = useState<string>("");
    const [notData, setNotData] = useState<boolean>(false);

    const [semesters, setSemesters] = useState<string[]>([]);
    const [randomNumberSem, setRandomNumberSem] = useState<number>(0);
    const [courses, setCourses] = useState<TCourse[]>([]);
    const [randomNumberCourse, setRandomNumberCourse] = useState<number>(0);

    const [randomSpeciality, setRandomSpeciality] = useState<number>(Math.floor(Math.random() * 15)); 

    const context = useContext(ThemeContext);
    const { filterData } = useContext(FilterDataContext);

    const getCollectionFirebase = async() => {
        try {
            if(/^ *$/.test(filterData.semester) && /^ *$/.test(filterData.speciality) && /^ *$/.test(filterData.course)){
                queryData(semesters[randomNumberSem], speciality[randomSpeciality], courses[randomNumberCourse].name, setCollectionFb, setNotData, context.setSizeArray);
            }else{
                queryData(filterData.semester, filterData.speciality, filterData.course, setCollectionFb, setNotData, context.setSizeArray);
            };
        }catch(err){
            console.error(err);
            setErr("It's happened an error, try again later pls");
        }finally{
            setLoading(false);
        };
    };

    useEffect(()=> {
        fetch(`${speciality[randomSpeciality]}.json`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
        .then(response => response.json())
        .then(data => {
            setRandomNumberSem(  Math.floor(Math.random() * Object.keys(data["courses"]).length) );
            setSemesters(Object.keys(data["courses"]));
        });
    }, []);

    useEffect(()=> {
        fetch(`${speciality[randomSpeciality]}.json`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
        .then(response => response.json())
        .then(data => {
            const gettingData:TCourse[] = data["courses"][semesters[randomNumberSem]];
            if(gettingData){
                setRandomNumberCourse( Math.floor(Math.random() * gettingData.length) );
                setCourses(gettingData);
            };
        });
    }, [semesters]);

    useEffect(() => {
        if(courses.length === 0 && /^ *$/.test(filterData.course)) return;
        setCollectionFb([]);
        setNotData(false);
        setLoading(true);

        getCollectionFirebase();
    }, [courses, filterData.course]);

    useEffect(()=> {
        if(loading) return;
        setLoading(true);

        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 500);
    
        return () => clearTimeout(timeoutId);
    }, [context.page]);

    if(loading){
        return(
            <Layout>
                <Loader />
            </Layout>
        );
    }

    if(notData){
        return(
            <Layout>
                <NotDataAlert message="Not Data Found" sp={filterData.speciality} sem={filterData.semester} course={filterData.course} />
            </Layout>
        );
    }

    if(err){
        return(
            <Layout>
                <ErrAlert err={err} />
            </Layout>
        );
    };

    return(
        <Layout>
            { 
                collectionFb.length !== 0 ? collectionFb[context.page].map((data:TFORM) => <CardToShowNotes key={data.date} dataToShow={data} />) : <></>
            }
        </Layout>
    );
};

function Layout({children}: {children:ReactNode}){
    return(
        <div style={{"height": "76vh"}}>
            <section style={{"height": "100%", "width": "100%", "backgroundColor": "salmon", "overflowY": "scroll"}}>
                {children}
            </section>
        </div>
    )
};