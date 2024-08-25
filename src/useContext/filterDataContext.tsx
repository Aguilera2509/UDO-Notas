import { TFilterData } from "@/lib/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type TFilterContext = {
    filterData: {
        speciality: string,
        semester: string,
        course: string,
    },
    setFilterData: Dispatch<SetStateAction<TFilterData>>
};

const FilterDataContext = createContext<TFilterContext>({ filterData:{ speciality: "", semester: "", course: "" }, setFilterData(){} });

const FilterDataProvider = ({ children }: { children:ReactNode }) => {
    const [filterData, setFilterData] = useState<TFilterData>({
        speciality: "",
        semester: "",
        course: ""
    });
    
    const data = { filterData, setFilterData };

    return <FilterDataContext.Provider value={data} >{children}</FilterDataContext.Provider>
};

export default FilterDataContext
export {
    FilterDataProvider
}