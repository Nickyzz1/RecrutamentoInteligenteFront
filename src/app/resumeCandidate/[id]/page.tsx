import {ApplicationRequest} from "@/components/request/page";


const ResumeCandidate = async ({params} : any) => {

    const {id} = await params;
    return (
        <>
            <ApplicationRequest id={id}/>
        </>
    )
}

export default ResumeCandidate;