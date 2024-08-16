import ThemeContext from "@/useContext/themeContext";
import { useContext } from "react";

export default function Pagination_Notes(){
    const context = useContext(ThemeContext);

    return(
        <nav style={{"overflowX": "scroll"}}>
            <ul className="pagination">
                {context.page !== 0 &&
                    <li className="page-item"><a className="page-link" onClick={(e) => context.handlePagination(e)}>Previous</a></li>
                }
                <Pagination_Links sizeArray={context.sizeArray} handlePagination={(e) => context.handlePagination(e)} page={context.page} />
                {context.sizeArray > 1 && (context.page+1) !== context.sizeArray &&
                    <li className="page-item"><a className="page-link" onClick={(e) => context.handlePagination(e)}>Next</a></li>
                }
            </ul>
        </nav>
    );
};

function Pagination_Links({ sizeArray, handlePagination, page }: { sizeArray:number, handlePagination: (e:any) => void, page:number } ){
    const renderValue = []

    for (let i = 0; i < sizeArray; i++) {
        renderValue.push(<li className={`page-item ${ (page === i) ? "active" : "" }`} key={(Date.now() + i)}><a className="page-link" onClick={(e) => handlePagination(e)} >{i+1}</a></li>)
    }

    return renderValue;
};