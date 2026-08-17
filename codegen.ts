// codegen.ts 
// change the schema's uri with our graphql server end point
module.exports = {
    overwrite: true,
    schema:'http://localhost/graphql',
    documents: [
      'src/features/**/*.graphql',
    ],
    generates: {
      'src/generated/graphql.ts': {
        plugins: [
          'typescript',
          'typed-document-node',
          'typescript-operations',
        ]
      }
    }
  };