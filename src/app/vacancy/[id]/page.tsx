import { HeaderLogged } from "@/components/headerUser/page";
import { GoBack } from "@/components/goBack/page";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Box, Button, Divider, StepContent, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { notFound, useRouter } from "next/navigation";
import { EEducationType, EProficiencyLevel } from '@/constants/enums';
import { APIURL } from "@/constants/api";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { cookies } from "next/headers";

// Interface da vaga (opcional, pode estar em um arquivo separado)
interface IVacancy {

  "id": number,
  "title": string,
  "description": string,
  "workDays": number,
  "workStart": Date,
  "workEnd": Date,
  "createdAt": Date,
  "canApply": boolean,
  "requirements": {

    "title": string
  }[],
  "benefits": {

    "title": string
  }[],
  "assignments": {

    "title": string
  }[],
  "stages": {
    "id": number,
    "description": string,
    "startDate": Date,
    "endDate": Date
  }[],
  "desiredExperiences": {
    "id": number,
    "name": string,
    "time": number,
    "required": boolean
  }[],
  "desiredEducations": {
    "id": number,
    "name": string,
    "type": EEducationType,
    "required": boolean
  }[],
  "desiredLanguages": {
    "id": number,
    "name": string,
    "level": EProficiencyLevel,
    "required": boolean
  }[],
  "desiredSkills": {
    "id": number,
    "name": string,
    "required": boolean
  }[],

}

interface Props {
  params: {
    id: string;
  };
}

const getVacancyById = async (id: string): Promise<IVacancy | null> => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      console.warn("Token não encontrado no localStorage");
      return null;
    }

    const res = await fetch(`${APIURL}/vacancy/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.warn(`Erro ao buscar vaga - Status: ${res.status}`);
      return null;
    }
    const response = await res.json()
    const data: IVacancy = response.value;
    return data;
  } catch (error) {
    console.error("Erro ao buscar vaga:", error);
    return null;
  }
};

interface Props {
  params: {
    id: string;
  };
  searchParams?: {
    tab?: string;
  };
}

const VacancyPage = async ({ params, searchParams }: Props) => {

  const { id } = await params;
  const data = await getVacancyById(id);
  const tab = await searchParams?.tab ?? "Descrição";
  console.log("data:", data);

  // if (!data) return notFound(); 

  const vacancy: IVacancy | null = data;
  const activeStep = 2;

  const getContent = () : string | string[] => {
    switch (tab) {
      case "Descrição":
        return vacancy? vacancy.description: "Não há descrição ainda";
      case "Responsabilidades":
        return vacancy? vacancy.assignments.map(a => a).join(", "): []
      case "Requisitos":
        return vacancy? vacancy.requirements.map(r => r).join(", "): []
      case "Benefícios":
        return vacancy? vacancy.benefits.map(b => b).join(", "): []
      default:
        return vacancy? vacancy.description: "Não há descrição ainda";
    }
  };

  //  const CustomStepIcon = (props: any) => {
  //   // desestrutura as props que você usa e ignora o resto, inclusive last
  //   const { active, completed, className, ...other } = props;
  //   console.log(props)

  //   let color = "#B0BEC5";
  //   if (active) color = "#036D3C";
  //   if (completed) color = "#339d6c";

  //   return (
  //     <div
  //       className={className}
  //       style={{
  //         color: "#f0f0f0",
  //         borderRadius: "50%",
  //         backgroundColor: color,
  //         width: 24,
  //         height: 24,
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         fontWeight: "bold",
  //       }}
  //       // NÃO faça {...other} aqui para evitar passar props extras
  //     >
  //       ✓
  //     </div>
  //   );
  // };


  const content = getContent();

  return (
    <>
      <HeaderLogged />
      <div className="flex flex-col w-screen min-h-screen overflow-x-hidden p-2 lg:px-32 gap-5">
        <GoBack />

        <div className="flex flex-wrap flex-col md:flex-row bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">{vacancy ? vacancy.title : "Sem título"}</h1>
            <div className="flex flex-wrap gap-2">
              <CorporateFareIcon />
              <p className="font-xs text-gray-600">Darede à nuvem</p>
              <AddLocationIcon />
              <p className="font-xs text-gray-600">Curitiba, PR</p>
            </div>
            <div className="bg-orange-100 rounded-full border-1 w-28 border-amber-800">
              <p className="font-xs text-amber-950 text-center">Ativa</p>
            </div>
          </div>
          <div className="ml-auto w-full md:w-auto flex items-center">
            <Link href={`${ROUTES.sendcandidature}/${id}`}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#036D3C", width: "100%", maxWidth: "700px" }}

              >
                Candidate-se
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-9">
          <div className="flex flex-col gap-9">
            {/* Detalhes da vaga */}
            <div className="flex flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-5">
              <h1 className="text-xl font-semibold">Detalhes da vaga</h1>
              <div className="md:flex md:flex-row sm:grid sm:grid-cols-2 flex-col gap-0.5 flex-wrap">
                {/* {["Descrição", "Responsabilidades", "Requisitos", "Benefícios"].map((item) => (
                  <Button
                    key={item}
                    variant="outlined"
                    sx={{ color: "#036D3C", borderColor: "green", flexWrap: "wrap" }}
                  >
                    {item}
                  </Button>
                ))} */}

              
                  {["Descrição", "Responsabilidades", "Requisitos", "Benefícios"].map((item) => (
                    <Link
                      key={item}
                      href={`/vacancy/${id}?tab=${encodeURIComponent(item)}`}
                      className={tab === item ? "active" : ""}
                    >
                      <Button sx={{
                        color: "#036D3C",
                        borderColor: "green",
                        flexWrap: "wrap",
                        ...(tab === item
                          ? {
                              backgroundColor: "#036D3C",
                              color: "#fff",
                            }
                          : {}),
                      }} variant={tab === item ? "contained" : "outlined"}>
                        {item}
                      </Button>
                    </Link>
                  ))}
                
                          
              </div>
              <div className="bg-[#efffef] flex flex-wrap gap-4 rounded-r-sm">
                <div className="bg-[#60a860] w-2 "></div>
                {typeof content === "string" ? (
                <p className="m-2 flex flex-wrap">{content}</p> ) : (
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      {content.map((item, index) => (
                        <li key={index} className="text-justify">{item}</li>
                      ))}
                    </ul>
                )}

              </div>
            </div>

            {/* Etapas do processo */}
            <div className="flex flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
              <h2 className="text-xl font-semibold">Etapas do processo</h2>
                {
                vacancy?
                vacancy.stages.length != 0?
                vacancy.stages.map((item, index) => {
                    return(
                      
                      <div className="flex flex-row gap-3 items-center" key={index}>
                          <div className="bg-green-700 w-3 h-3 rounded-full"></div>
                          <div>
                            <p>{item.description}</p>
                            <p>{item.startDate.toString()} - {item.endDate.toString()}</p>
                          </div>
                      </div>
                     
                    )
                }) 
                : ( <p>Não há etapas cadastradas</p>) : (<p>Não há etapas cadastradas</p>)}
              
            </div>
          </div>

          {/* Informações da vaga */}
          <div className="flex flex-col gap-9">
            <div className="flex flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
              <h1 className="text-xl font-semibold">Informações da vaga</h1>
              <div className="flex flex-col gap-3">
                <h2 className="text-sm text-gray-500">Data de publicação</h2>
                <p>{new Date(vacancy ? vacancy.createdAt : "").toLocaleDateString()}</p>
                <Divider />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-sm text-gray-500">Local</h2>
                <p>Curitiba, PR</p>
                <Divider />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-sm text-gray-500">Empresa</h2>
                <p>Darede à nuvem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VacancyPage;
