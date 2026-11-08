import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  devIndicators: false,
  turbopack: {
    resolveAlias:
      process.env.NODE_ENV === "production"
        ? {
            "@/devtools/design-lab/design-lab":
              "./src/devtools/design-lab/disabled.tsx",
          }
        : {},
  },
};
export default config;
