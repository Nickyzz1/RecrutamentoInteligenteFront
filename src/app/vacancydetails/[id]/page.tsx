import * as React from "react";
import { GoBack } from "@/components/goBack/page";
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page";
import VacancyTb from "@/components/vacancyTb/page";



interface IParams { 
  params: {id : string}
}

const Page = async ({params: {id}} : IParams) => {

  return (
    <>
      <HeaderLoggedAdmin />
      <div className="flex flex-col p-6">
        <GoBack />
        <div className="bg-white rounded-xl mt-9 border border-zinc-400 p-4">
            <h2 className="text-2xl text-green-700 mb-4">Processo Seletivo</h2>
            <VacancyTb/>
        </div>
      </div>
    </>
  );
}

export default Page;