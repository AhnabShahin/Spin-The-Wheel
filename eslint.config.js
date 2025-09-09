import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'

// Configurations for different file types
const jsConfig = {
  files: ['**/*.js'],
  ignores: ['dist/**', 'build/**', 'node_modules/**', 'ui-resources/**'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
      wp: 'readonly',
      jQuery: 'readonly',
      process: 'readonly',
      __dirname: 'readonly',
      module: 'readonly',
      require: 'readonly'
    },
  },
};

const jsxConfig = {
  files: ['**/*.jsx'],
  ignores: ['dist/**', 'build/**', 'node_modules/**', 'ui-resources/**'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      wp: 'readonly',
      jQuery: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
    },
  },
  settings: {
    react: {
      version: '18.3'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    import: importPlugin,
  },
  rules: {
    // React Rules
    'react/prop-types': 'warn',
    'react/jsx-no-undef': 'error',
    'react/jsx-key': 'error',
    'react/no-array-index-key': 'warn',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'off',
    
    // React Hooks Rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // React Refresh
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    
    // Import Rules
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-unused-modules': 'warn',
    'import/no-duplicates': 'error',
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true
      }
    }],

    // General Rules
    'no-unused-vars': ['warn', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': true,
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }],
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }],
    'no-debugger': 'warn',
  }
};

const configFiles = {
  files: ['**/webpack.config.js', '**/vite.config.js'],
  ignores: ['node_modules/**'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.node,
      process: 'readonly',
      __dirname: 'readonly',
      module: 'readonly',
      require: 'readonly'
    }
  }
};

export default [
  { ignores: ['dist/**', 'build/**', 'node_modules/**', 'ui-resources/**'] },
  {
    ...js.configs.recommended
  },
  jsConfig,
  jsxConfig,
  configFiles
];
