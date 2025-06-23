import * as React from "react";
import { GoBack } from "@/components/goBack/page";
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page";
import VacancyTb from "@/components/vacancyTb/page";
import EditDelete from "@/components/editDeleteVacancy/page"; 

interface IParams { 
  params: {id : string}
}

const Page = async ({params: {id}} : IParams) => {

  return (
    <>
      <HeaderLoggedAdmin />
      <GoBack />
      <div className="flex flex-col px-6">
        <div className="bg-white rounded-xl border border-zinc-400 p-4">
            <div className="w-full flex justify-between p-2">
              <h2 className="text-2xl text-green-700 mb-4">Processo Seletivo</h2>
              <EditDelete id={id}/>
            </div>
            <VacancyTb id={id} />
        </div>
      </div>
    </>
  );
}

export default Page;