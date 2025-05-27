import type { NextConfig } from "next";
import { sourceMapsEnabled } from "process";

const nextConfig = {
  rewrites:() => {
      return[
        {
          source : '/',
          destination: '/home',
        },
        {
          source : '/manageApplication',
          destination: '/manageApplication'
        },
         {
          source : '/login',
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

      ]
  },
};

export default nextConfig;
