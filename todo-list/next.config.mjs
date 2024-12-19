/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/api-backoffice/:path*",
                destination: process.env.URL_API + ":path*"
            },
        ]
    },
     
};
export default nextConfig;
