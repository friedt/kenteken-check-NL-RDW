import eslint from '@eslint/js';
import globals from "globals"
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ['src/*.spec.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off'
        }
    },
    {
        files: ['src/*.js'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest
            },
        },
    }

);
