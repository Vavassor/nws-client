import { JsonLdContext } from "../common";

/**
 * The glossary of phrases and abbreviations used by the NWS.
 * 
 * @see {@link https://w1.weather.gov/glossary National Weather Service Glossary}.
 */
export interface Glossary {
  /**
   * Term definitions for the data in this resource. This is metadata, not the
   * glossary terms.
   */
  "@context": JsonLdContext;
  /** Definitions of terms. */
  glossary: GlossaryDefinition[];
}

/** A definition in the glossary. */
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
