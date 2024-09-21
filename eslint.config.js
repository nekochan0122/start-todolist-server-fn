import nekoConfig from '@nekochan0122/config/eslint'
import eslintPluginQuery from '@tanstack/eslint-plugin-query'
import eslintPluginRouter from '@tanstack/eslint-plugin-router'
import eslintPluginTailwind from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  ...nekoConfig.presets.react,
  ...eslintPluginQuery.configs['flat/recommended'],
  ...eslintPluginRouter.configs['flat/recommended'],
  ...eslintPluginTailwind.configs['flat/recommended'],
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ignores: [
      '.vinxi',
      '.output',
    ],
  },
)
