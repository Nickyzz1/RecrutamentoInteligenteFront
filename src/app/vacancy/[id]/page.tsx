import { HeaderLogged } from "@/components/headerUser/page";
import { GoBack } from "@/components/goBack/page";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Box, Button, Divider, StepContent, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { notFound } from "next/navigation";
import { EEducationType, EProficiencyLevel } from '@/constants/enums';
import { APIURL } from "@/constants/api";

// Interface da vaga (opcional, pode estar em um arquivo separado)
interface IVacancy {
    
    "id" : number,
    "title" : string,
    "description" : string,
    "workDays" : number,
    "workStart" : Date,
    "workEnd" : Date,
    "createdAt" : Date,
    "canApply" : boolean,
    "requirements" : {
        "id" : number,
        "title" : string
    }[],
    "benefits" : {
        "id" : number,
        "title" : string
    }[],
    "assignments" : {
        "id" : number,
        "title" : string
    }[],
    "stages" : {
        "id" : number,
        "description" : string,
        "startDate" : Date,
        "endDate" : Date
    }[],
    "desiredExperiences" : {
        "id" : number,
        "name" : string,
        "time" : number,
        "required" : boolean
    }[],
    "desiredEducations" : {
        "id" : number,
        "name" : string,
        "type" : EEducationType,
        "required" : boolean
    }[],
    "desiredLanguages" : {
        "id" : number,
        "name" : string,
        "level" : EProficiencyLevel,
        "required" : boolean
    }[],
    "desiredSkills" : {
        "id" : number,
        "name" : string,
        "required" : boolean
    }[],

}

interface Props {
  params: {
    id: string;
  };
}

const getVacancyById = async (id: string): Promise<IVacancy | null> => {
  try {
    const res = await fetch(`${APIURL}/vacancy/${id}`, {
      cache: "no-store", // evita cache em dev
    });

    if (!res.ok) return null;

    const data: IVacancy = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar vaga:", error);
    return null;
  }
};

const VacancyPage = async ({ params }: Props) => {
  const id = params.id; // ← ISSO SÓ FUNCIONA ASSIM DENTRO DE async FUNCTION   

  console.log("🔍 PARAMS:", params);
  console.log("📦 ID:", id);

  const data = await getVacancyById(id);

  if (!data) return notFound(); // <- sai da função aqui se for null

  const vacancy: IVacancy = data; // <- aqui o TypeScript sabe que não é mais null
  const activeStep = 2;

  const CustomStepIcon = (props: any) => {
    const { active, completed, className } = props;
    let color = "#B0BEC5";
    if (active) color = "#036D3C";
    if (completed) color = "#339d6c";

    return (
      <div
        className={className}
        style={{
          color: "#f0f0f0",
          borderRadius: "50%",
          backgroundColor: color,
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        ✓
      </div>
    );
  };

  console.log("params", params);
  // return <div>ID: {params.id}</div>;

  return (
    <>
      <HeaderLogged />
      <div className="flex flex-col w-screen min-h-screen overflow-x-hidden p-2 lg:px-32 gap-5">
        <GoBack />

        <div className="flex flex-wrap flex-col md:flex-row bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">{vacancy.title}</h1>
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
            <Button
              variant="contained"
              sx={{ backgroundColor: "#036D3C", width: "100%", maxWidth: "700px" }}
              disabled={!vacancy.canApply}
            >
              Candidate-se
            </Button>
          </div>
        </div>

        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-9">
          <div className="flex flex-col gap-9">
            {/* Detalhes da vaga */}
            <div className="flex flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-5">
              <h1 className="text-xl font-semibold">Detalhes da vaga</h1>
              <div className="md:flex sm:grid sm:grid-cols-2 flex-col gap-0.5 flex-wrap">
                {["Descrição", "Responsabilidades", "Requisitos", "Benefícios"].map((item) => (
                  <Button
                    key={item}
                    variant="outlined"
                    sx={{ color: "#036D3C", borderColor: "green", flexWrap: "wrap" }}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className="bg-[#efffef] flex flex-wrap gap-4 rounded-r-sm">
                <div className="bg-[#60a860] w-2 "></div>
                <p className="m-2 flex flex-wrap">{vacancy.description}</p>
              </div>
            </div>

            {/* Etapas do processo */}
            <div className="flex flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
              <h2 className="text-xl font-semibold">Etapas do processo</h2>
              <Stepper activeStep={activeStep} orientation="vertical">
                {vacancy.stages.map((step) => (
                  <Step key={step.id}>
                    <StepLabel StepIconComponent={CustomStepIcon}>
                      {step.description}
                    </StepLabel>
                    <StepContent>
                      <Typography variant="caption">
                        {step.startDate} - {step.endDate}
                      </Typography>
                      <Box sx={{ mb: 2, backgroundColor: "#036D3C" }}></Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>

          {/* Informações da vaga */}
          <div className="flex flex-col gap-9">
            <div className="flex flex-col bg-white border-1 rounded-2xl border-gray-200 p-7 gap-9">
              <h1 className="text-xl font-semibold">Informações da vaga</h1>
              <div className="flex flex-col gap-3">
                <h2 className="text-sm text-gray-500">Data de publicação</h2>
                <p>{new Date(vacancy.createdAt).toLocaleDateString()}</p>
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
