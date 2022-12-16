import { JsonLdContext } from "../common";

export interface Glossary {
  "@context": JsonLdContext;
  glossary: GlossaryDefinition[];
}

export interface GlossaryDefinition {
  /**
   * The definition as rich text.
   * 
   * This includes Hypertext Markup Language (HTML) for formatting.
   */
  definition: string;
  /**
   * The glossary term.
   */
  term: string;
}
