import * as React from "react";
import { GoBack } from "@/components/goBack/page";
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"; 
import EditVacancyComponent from "@/components/editVacancyComponent/page";

interface IParams { 
  params: {id : string}
}

const EditVacancy = async ({params} : any) => {

  const {id} = await params;

  return (
    <>
      <HeaderLoggedAdmin />
      <GoBack />
  
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] items-center pb-6">
          {/* fazer requisições para update com hooks no componente abaixo, ele é client component */}
          <EditVacancyComponent id={id}/>
      </div> 
    </>
  );
}

export default EditVacancy;