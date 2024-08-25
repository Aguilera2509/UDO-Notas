import Image from "next/image";
import Columns from "./css_grid/columnsDiv";
import Link from "next/link";

export const ShowImages = ({ img }: { img:string }) => {
    return (
        <Columns styles="col-md-4 col-sm-12" >
            <Link href={img} target="_blank" rel="noopener noreferrer">
                <Image src={img} alt="..." width={480} height={280} className="w-100"/>
            </Link>
        </Columns>
    );
};