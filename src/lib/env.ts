const nodeEnvironments = ["development", "test", "production"] as const;

export type NodeEnvironment = (typeof nodeEnvironments)[number];

function readNodeEnvironment(value: string | undefined): NodeEnvironment {
  return nodeEnvironments.includes(value as NodeEnvironment)
    ? (value as NodeEnvironment)
    : "development";
}

export const runtimeEnv = {
  nodeEnv: readNodeEnvironment(process.env.NODE_ENV),
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  releaseVersion: process.env.APP_VERSION ?? "0.1.0",
} as const;

export function requireServerEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }

  return value;
}
