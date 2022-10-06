// eslint-disable-next-line
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
				"next/core-web-vitals"
    ],
    "overrides": [
    // Only uses Testing Library lint rules in test files
			{
				"files": [
					"**/__tests__/**/*.[jt]s?(x)",
					"**/?(*.)+(spec|test).[jt]s?(x)"
				],
				"extends": ["plugin:testing-library/react"]
			}
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
				"testing-library"
    ],
    "rules": {
			"react/react-in-jsx-scope": "off"


    }
}
