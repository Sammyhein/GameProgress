import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
    // Interdit les variables déclarées mais jamais utilisées
    "no-unused-vars" : "warn",

    // Interdit les consols.log oubliées (warn pour pas bloquer le CI)
    "no-console": "warn",

    //POur interdir les == au lieu de ===
    "eqeqeq": "error",

    // Interdir le any en TypeScript
    "@typescript-eslint/no-explicit-any" : "warn"
    }
  }
]);

export default eslintConfig;
