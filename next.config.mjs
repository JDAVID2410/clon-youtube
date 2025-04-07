/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {
        SECRET_KEY: process.env.SECRET_KEY,
        ACCES_KEY: process.env.ACCES_KEY
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            }
        ]
    }

};

export default nextConfig;