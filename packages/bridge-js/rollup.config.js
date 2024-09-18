import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/bridge-js.cjs.js',
                format: 'cjs',
                output: {
                    file: 'dist/bridge-js.cjs-bundle.js',
                    format: 'iife',
                    name: 'StraddleBridge',
                },
            },
            {
                file: 'dist/bridge-js.esm.js',
                format: 'es',
            },
            {
                file: 'dist/bridge-js.umd.js',
                format: 'umd',
                name: 'StraddleBridge',
                globals: {
                    '@straddleio/bridge-core': 'BridgeCore',
                },
            },
        ],
        plugins: [typescript(), resolve(), commonjs(), terser()],
        external: ['@straddleio/bridge-core'],
    },
    {
        input: 'dist/bridge-js.cjs.js',
        output: {
            file: 'dist/bridge-js.cjs-bundle.js',
            format: 'iife',
            name: 'StraddleBridgeDemo',
        },
        plugins: [
            resolve({
                browser: true,
            }),
            commonjs(),
            terser(),
        ],
    },
    {
        input: 'dist/bridge-js.esm.js',
        output: {
            file: 'dist/bridge-js.esm-bundle.js',
            format: 'iife',
            name: 'StraddleBridgeDemo',
        },
        plugins: [
            resolve({
                browser: true,
            }),
            commonjs(),
            terser(),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/bridge-js.umd.bundle.js',
            format: 'umd',
            name: 'StraddleBridge',
            sourcemap: true,
        },
        plugins: [
            typescript(),
            resolve({
                browser: true,
                preferBuiltins: false,
            }),
            commonjs(),
            terser(),
        ],
    },
    {
        input: 'node_modules/@straddleio/bridge-core/dist/index.js',
        output: {
            file: 'dist/bridge-core.umd.js',
            format: 'umd',
            name: 'BridgeCore',
            sourcemap: true,
        },
        plugins: [
            resolve({
                browser: true,
                preferBuiltins: false,
            }),
            commonjs(),
            terser(),
        ],
    },
]
