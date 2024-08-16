import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type Tlol = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    handlePagination: (e:any) => void,
    sizeArray: number,
    setSizeArray: Dispatch<SetStateAction<number>>
};

const ThemeContext = createContext<Tlol>({ page: 0, setPage(){}, handlePagination(e){}, sizeArray: 0, setSizeArray(){} });

const ThemeProvider = ({ children }: { children:ReactNode }) => {
    const [page, setPage] = useState(0);
    const [sizeArray, setSizeArray] = useState(0);

    const handlePagination = (e:any) => {
        const valueContent:string = e.target.textContent; 
        const eValue:number = parseInt(valueContent);

        if(eValue === 1){
            setPage(0);
        }else if(eValue >= page || eValue <= page){
            setPage((eValue-1));
        }else if(valueContent === "Previous"){
            setPage((page-1));
        }else if(valueContent === "Next"){
            setPage((page+1));
        };
    };

    const data = { page, setPage , handlePagination, sizeArray, setSizeArray };

    return <ThemeContext.Provider value={data} >{children}</ThemeContext.Provider>
};

export default ThemeContext
export {
    ThemeProvider
}