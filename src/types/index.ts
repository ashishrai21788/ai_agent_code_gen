export interface CodeResponse {
  code: string;
  language: string;
  explanation: string;
}

export interface ProjectRequest {
  prompt: string;
  projectType: 'web' | 'mobile' | 'desktop';
  framework?: string;
  additionalRequirements?: string;
}

export interface ProjectResponse {
  files: {
    name: string;
    content: string;
    path: string;
  }[];
  instructions: string;
  dependencies: string[];
} 