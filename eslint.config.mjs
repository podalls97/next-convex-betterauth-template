import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Disable explicit any errors
      "@typescript-eslint/no-explicit-any": "off",
      // Optionally disable unused vars errors if needed (or configure as desired)
      "@typescript-eslint/no-unused-vars": "off",
      // Disable unsafe function type warnings if needed
      "@typescript-eslint/no-unsafe-function-type": "off",
      // If you want to allow empty object types
      "@typescript-eslint/no-empty-object-type": "off",
      // Disable unescaped entities rule in JSX
      "react/no-unescaped-entities": "off",
      // Lower severity for ban-ts-comment (use ts-expect-error instead)
      "@typescript-eslint/ban-ts-comment": "off",
      // Lower severity for React hooks rules
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      // Disable Next.js rule about using <img> element
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
