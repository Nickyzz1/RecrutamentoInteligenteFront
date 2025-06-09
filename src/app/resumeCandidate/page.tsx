import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { GoBack } from "@/components/goBack/page";

const ResumeCandidate = () => {

    enum EEducationStatus {
        Incomplete = 0,
        Underway = 1,
        Complete = 2
    }
    enum EEducationType {
        BasicEducation = 0,
        TechnicalCourse = 1,
        Graduation = 2,
        PosGraduation = 3
    }
    enum EProficiencyLevel {
        Benniger = 0,
        Intermediate = 1,
        Advanced = 2,
        Fluent = 3
    }

    interface IResume {
        
            "id" : number,
            "name" : string,
            "email" : string,
            "bio" : string | null,
            "admin" : boolean,
            "phone" : string
            "educations" : {
                "id" : number,
                "institution" : string,
                "course" : string,
                "status" : EEducationStatus,
                "type" : EEducationType,
                "startDate" : Date,
                "endDate" : Date
            }[],
            "experiences" : {
                "id" : number,
                "company" : string,
                "role" : string,
                "description" : string,
                "location" : string,
                "startDate" : Date,
                "endDate" : Date | null
            }[],
            "languages" : {
                "id" : number,
                "name" : string,
                "level" : EProficiencyLevel
            }[],
            "addresses" : {
                "id" : number,
                "address" : string
            }[],
            "skills" : {
                "id" : number,
                "name" : string
            }[],
            "links" : {
                "id" : number,
                "url" : string,
                "description" : string
            }[]
        }
        

        return(
            <>
                <HeaderLoggedAdmin/>
                <div className="flex flex-col items-center min-h-screen" >
                    <GoBack/>
                    <div>
                        <FeedOutlinedIcon/>
                    </div>
                </div>           
            </>
        )

}

export default ResumeCandidate;