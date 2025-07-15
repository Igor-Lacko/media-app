import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import * as path from "path";

export default defineConfig({
    plugins: [
        ...VitePluginNode({
            // Nodejs native Request adapter
            // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
            // you can also pass a function if you are using other frameworks, see Custom Adapter section
            adapter: "express",

            // tell the plugin where is your project entry
            appPath: path.resolve(__dirname, "./src/main.ts"),

            // Optional, default: 'viteNodeApp'
            // the name of named export of you app from the appPath file
            exportName: "viteNodeApp",

            // Optional, default: false
            // if you want to init your app on boot, set this to true
            initAppOnBoot: false,

            // Optional, default: 'esbuild'
            // The TypeScript compiler you want to use
            // by default this plugin is using vite default ts compiler which is esbuild
            // 'swc' compiler is supported to use as well for frameworks
            // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
            // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
            tsCompiler: "esbuild",

            // Optional, default: {
            // jsc: {
            //   target: 'es2019',
            //   parser: {
            //     syntax: 'typescript',
            //     decorators: true
            //   },
            //  transform: {
            //     legacyDecorator: true,
            //     decoratorMetadata: true
            //   }
            // }
            // }
            // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
            swcOptions: {},
        }),
    ],
    build: {
        target: "node22",
        outDir: "dist",
        rollupOptions: {
            external: ["process", "path", "url", "node:process", "node:path", "node:url"]
        }
    },
    server: {
        port: 3000,
        host: "127.0.0.1",
    },
    resolve: {
        alias: {
            // This works for some reason
            'controllers': path.resolve(__dirname, './src/controllers'),
            'routes': path.resolve(__dirname, './src/routes'),
            'db': path.resolve(__dirname, './src/db'),
            'generated': path.resolve(__dirname, './src/generated'),
            'utils': path.resolve(__dirname, './src/utils'),
            'adapters': path.resolve(__dirname, './src/adapters'),
            '3rdparty': path.resolve(__dirname, './src/3rdparty'),
            '@shared': path.resolve(__dirname, '../shared')
        }
    }
});
