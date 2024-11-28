/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config()
const config = {
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
	experimental: {
		typedRoutes: false,
	},
	// used in the Dockerfile
	output:
    process.env.NEXT_OUTPUT === "standalone"
      ? "standalone"
      : process.env.NEXT_OUTPUT === "export"
        ? "export"
        : undefined,
  env: {
    NEXT_PUBLIC_SALEOR_API_URL: process.env.NEXT_PUBLIC_SALEOR_API_URL,
    NEXT_PUBLIC_SALEOR_CHANNEL: process.env.NEXT_PUBLIC_SALEOR_CHANNEL,
    REACT_APP_ADMIN_EMAIL: process.env.REACT_APP_ADMIN_EMAIL,
    REACT_APP_ADMIN_PASSWORD: process.env.REACT_APP_ADMIN_PASSWORD,
    NEXT_PUBLIC_DEFAULT_CURRENCY: "MRU", // Setting MRU as the default currency
  }
};

export default config;


