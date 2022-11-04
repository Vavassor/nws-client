import { JsonLdContext } from "../common";

export interface Glossary {
  "@context": JsonLdContext;
  glossary: GlossaryDefinition[];
}

export interface GlossaryDefinition {
  definition: string;
  term: string;
}
