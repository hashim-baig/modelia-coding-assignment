/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1', // optional: path alias if you use "@/..."
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

module.exports = config;
