import { buildASTSchema } from 'graphql';
import * as schemaDefinition from './schema.graphql';

const schema = buildASTSchema(schemaDefinition);

export default schema;
