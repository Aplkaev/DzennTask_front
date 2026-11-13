// codegen.ts
// Схема берётся с запущенного бэкенда. Без него можно указать файл, выгруженный из бэкенда:
//   php bin/console api:graphql:export -o schema.graphql
//   GRAPHQL_SCHEMA=../../DzennTask_main/schema.graphql npm run generate
module.exports = {
    overwrite: true,
    schema: process.env.GRAPHQL_SCHEMA ?? 'http://localhost/graphql',
    documents: [
      'src/features/**/*.graphql',
    ],
    generates: {
      'src/generated/graphql.ts': {
        plugins: [
          'typescript',
          'typed-document-node',
          'typescript-operations',
        ],
        // enum → `as const`-объект: в tsconfig включён erasableSyntaxOnly, TS-enum там запрещён
        config: {
          enumsAsConst: true,
        },
      }
    }
  };
