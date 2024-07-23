// import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//   // Suas configurações do Jest aqui
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
//   // Adicione outras configurações conforme necessário
// };

// export default config;

// // Adicione esta linha para evitar erros
// export {};
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
