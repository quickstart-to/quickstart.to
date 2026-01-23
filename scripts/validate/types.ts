export interface ValidationError {
  file: string;
  rule: string;
  message: string;
  suggestion?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export type TemplateType = 'tool' | 'language' | 'framework' | 'service' | 'concept' | 'life' | 'aha' | 'collection' | 'people';

export const VALID_TEMPLATES: TemplateType[] = ['tool', 'language', 'framework', 'service', 'concept', 'life', 'aha', 'collection', 'people'];

export interface PeopleFrontmatter {
  owner_id?: number;
  display_name: string;
  tagline?: string;
}

export interface TemplateSection {
  name: string;
  optional: boolean;
}

export interface TemplateConfig {
  name: TemplateType;
  description: string;
  sections: TemplateSection[];
}
