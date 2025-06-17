import type { NextConfig } from "next";
import { sourceMapsEnabled } from "process";

const nextConfig = {
  rewrites:() => {
      return[
        {
          source : '/home',
          destination: '/home',
        },
        {
          source : '/homeAdmin',
          destination: '/homeAdmin'
        },
         {
          source : '/',
          destination: '/login'
        },
         {
          source : '/register',
          destination: '/register'
        },
         {
          source : '/vacancyDeatails',
          destination: '/vacancyDeatails'
        },
         {
          source : '/viewCandidates',
          destination: '/viewCandidates'
        },
          {
          source : '/DashBoard',
          destination: '/DashBoard'
        },
        {
          source : '/resumeCandidate',
          destination: '/resumeCandidate'
        }, {
          source : '/createVacancy',
          destination: '/createVacancy'
        }, 
        {
          source : '/editVacancy',
          destination : '/editVacancy'
        }
      ]
  },
};

export default nextConfig;
