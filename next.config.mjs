/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['sequelize'],
    experimental: {
        serverActions: {
            bodySizeLimit: "50mb"
        }
    },
    reactStrictMode: false
};

export default nextConfig;
