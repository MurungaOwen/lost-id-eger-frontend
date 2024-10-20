import { IdCard as Id } from "lucide-react";

interface idData{
    first_name: string;
    last_name: string;
    course?: string;
    reg_no?: string;
    found_by?: string;
    image_url?: string;
}
export const IdCard = (props: idData) => {
    return (
        <>
            <div className="rounded-md">
                <a href={props.image_url}><img src={props.image_url} alt={`id of ${props.reg_no}`} /></a>
                <div className="content space-y-3">
                    <p><Id/>{props.reg_no}</p>
                </div>
            </div>  
        </>
    );
}