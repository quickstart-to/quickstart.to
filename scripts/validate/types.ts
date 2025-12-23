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

export type TemplateType = 'tool' | 'language' | 'framework' | 'service' | 'concept' | 'life';

export const VALID_TEMPLATES: TemplateType[] = ['tool', 'language', 'framework', 'service', 'concept', 'life'];

export interface TemplateSection {
  name: string;
  optional: boolean;
}

export interface TemplateConfig {
  name: TemplateType;
  description: string;
  sections: TemplateSection[];
}
