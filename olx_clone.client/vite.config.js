import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "olx_clone.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7051';


const databaseRoutes = {
    '^/chathub': {
        target: 'https://localhost:7051', 
        changeOrigin: true,
        secure: false,
        ws: true
    },
    '^/api/auth/register': {
        target,
        secure: false
    },
    '^/api/auth/login': {
        target,
        secure: false
    },
    '^/api/users': {
        target,
        secure: false
    },
    '^/api/users/short-info': {
        target,
        secure: false
    },
    '^/api/users/update-last-seen': {
        target,
        secure: false
    },
    '^/api/users/update-online-status': {
        target,
        secure: false
    },
    '^/api/categories': {
        target,
        secure: false
    },
    '^/api/chats': {
        target,
        secure: false
    },
    '^/api/chats/user': {
        target,
        secure: false
    },
    '^/api/chats/mark-as-read': {
        target,
        secure: false
    },
    '^/api/posts': {
        target,
        secure: false
    },
    '^/api/posts/by-status': {
        target,
        secure: false
    },
    '^/api/favorites': {
        target,
        secure: false
    },
    '^/api/favorites/user': {
        target,
        secure: false
    },
    '^/api/posts/photo': {
        target,
        secure: false
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            ...databaseRoutes
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
