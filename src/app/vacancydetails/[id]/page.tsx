import * as React from "react";
import { GoBack } from "@/components/goBack/page";
import { HeaderLoggedAdmin } from "@/components/headerAdmin/page";
import VacancyTb from "@/components/vacancyTb/page";
import EditDelete from "@/components/editDeleteVacancy/page";
import VacancyDetails from "@/components/vacancyDetails/page";

const Page = async ({params} : any) => {

  const {id} = await params;
  return (
    <>
      <VacancyDetails id={id}/>
    </>
  );
}

export default Page;