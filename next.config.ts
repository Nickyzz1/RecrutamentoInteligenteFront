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
          source : '/manageApplication',
          destination: '/manageApplication'
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


      ]
  },
};

export default nextConfig;
