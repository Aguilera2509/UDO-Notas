import Image from "next/image";

export default function Loader(){
    return(
        <div className="text-center">
            <Image
                src="/ball-triangle.svg"
                width={90}
                height={85}
                alt="Loading..."
                className="text-center"
            />
        </div>
    );
};