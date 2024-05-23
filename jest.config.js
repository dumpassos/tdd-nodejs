/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true, //propriedade adicionada
  testTimeout: 30000
};