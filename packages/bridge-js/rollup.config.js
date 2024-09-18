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
            },
            {
                file: 'dist/bridge-js.esm.js',
                format: 'es',
            },
            {
                file: 'dist/bridge-js.umd.js',
                format: 'umd',
                name: 'BridgeJS',
                globals: {
                    '@straddleio/bridge-core': 'BridgeCore',
                },
            },
        ],
        plugins: [typescript(), resolve(), commonjs(), terser()],
        external: ['@straddleio/bridge-core'],
    },
]
