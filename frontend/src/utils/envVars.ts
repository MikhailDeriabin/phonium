type EnvName = 'VITE_API_URL';

export const envVars: Record<EnvName, string> = {
    VITE_API_URL: import.meta.env.VITE_API_URL || "http://localhost:8080",
}
