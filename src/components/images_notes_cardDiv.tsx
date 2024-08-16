import Image from "next/image";
import Columns from "./css_grid/columnsDiv";

export const ShowImages = ({ img }: { img:string }) => {
    return (
        <Columns styles="col-md-4 col-sm-12" >
            <Image src={img} alt="..." width={480} height={280} className="w-100" />
        </Columns>
    );

};