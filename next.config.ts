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

      ]
  },
};

export default nextConfig;
