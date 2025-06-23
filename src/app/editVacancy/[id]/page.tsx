import * as React from "react";
import { GoBack } from "@/components/goBack/page";
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page"; 
import EditVacancyComponent from "@/components/editVacancyComponent/page";

interface IParams { 
  params: {id : string}
}

const EditVacancy = async ({params: {id}} : IParams) => {

  return (
    <>
      <HeaderLoggedAdmin />
      <GoBack />
  
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] items-center pb-6">
          <EditVacancyComponent id={id}/>
      </div> 
    </>
  );
}

export default EditVacancy;