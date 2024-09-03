import nekoConfig from '@nekochan0122/config/eslint'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  ...nekoConfig.presets.react,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
)
