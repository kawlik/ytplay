import { defineConfig } from 'vite'
import { resolve } from 'path';


// global config
import config from './src/config/config';


// import plugins
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';


// make config
export default defineConfig({


    // enable plugins
    plugins: [

        VitePWA( config.PWA ),
        
        react(),
    ],


    // compiler path resolver
    resolve: {
        alias: {

            // 'src' folder
            '@': resolve( __dirname, './src/' ),
        },
    },


    // dev server setings
    server: {
        watch: {

            // wsl dev server polling
            usePolling: true,
        }
    }
});
