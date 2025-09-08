import OpenAI from 'openai';
import { LegalAdviceResponse, Jurisdiction, Template } from '@/types';
import { JURISDICTIONS } from './constants';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate legal advice using OpenAI GPT
 */
export async function generateLegalAdvice(
  query: string,
  jurisdiction: Jurisdiction
): Promise<LegalAdviceResponse> {
  try {
    const jurisdictionInfo = JURISDICTIONS[jurisdiction];
    
    const systemPrompt = `You are a legal information assistant that provides plain-language explanations of legal concepts and procedures. 

IMPORTANT DISCLAIMERS:
- You provide general legal information, NOT legal advice
- Users should consult with qualified attorneys for specific legal matters
- Information may not reflect the most current laws
- This is for educational purposes only

Your responses should:
1. Be clear and easy to understand (avoid legal jargon)
2. Be specific to ${jurisdictionInfo.name} when applicable
3. Include actionable next steps
4. Cite relevant laws or regulations when possible
5. Suggest when professional legal help is needed

Format your response as JSON with the following structure:
{
  "summary": "Clear, plain-language explanation of the legal issue",
  "actionSteps": ["Step 1", "Step 2", "Step 3"],
  "sources": ["Relevant law citations or official sources"],
  "jurisdiction": "${jurisdiction}"
}`;

    const userPrompt = `Legal question: ${query}

Please provide information relevant to ${jurisdictionInfo.name}.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const parsedResponse = JSON.parse(response) as LegalAdviceResponse;
    
    // Validate the response structure
    if (!parsedResponse.summary || !parsedResponse.actionSteps) {
      throw new Error('Invalid response structure from OpenAI');
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error generating legal advice:', error);
    throw new Error('Failed to generate legal advice');
  }
}

/**
 * Generate a legal document template
 */
export async function generateTemplate(
  templateType: string,
  context: string,
  jurisdiction: Jurisdiction,
  variables?: Record<string, string>
): Promise<Template> {
  try {
    const jurisdictionInfo = JURISDICTIONS[jurisdiction];
    
    const systemPrompt = `You are a legal document template generator. Create professional legal document templates that are:

1. Appropriate for ${jurisdictionInfo.name}
2. Written in clear, professional language
3. Include placeholder variables in [VARIABLE_NAME] format
4. Follow standard legal document formatting
5. Include necessary legal disclaimers

IMPORTANT: These are templates for informational purposes only. Users should have documents reviewed by qualified attorneys before use.

Format your response as JSON:
{
  "id": "unique_template_id",
  "title": "Template Title",
  "content": "Full template content with [VARIABLES]",
  "usageContext": "When and how to use this template",
  "jurisdiction": "${jurisdiction}",
  "variables": {"VARIABLE_NAME": "Description of what this variable should contain"}
}`;

    const userPrompt = `Create a ${templateType} template for the following context: ${context}

${variables ? `Include these specific variables: ${Object.keys(variables).join(', ')}` : ''}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const parsedResponse = JSON.parse(response) as Template;
    
    // Validate the response structure
    if (!parsedResponse.title || !parsedResponse.content) {
      throw new Error('Invalid template structure from OpenAI');
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error generating template:', error);
    throw new Error('Failed to generate template');
  }
}

/**
 * Analyze legal query to determine category and complexity
 */
export async function analyzeLegalQuery(query: string): Promise<{
  category: string;
  complexity: 'simple' | 'moderate' | 'complex';
  requiresAttorney: boolean;
  suggestedTemplates: string[];
}> {
  try {
    const systemPrompt = `Analyze the legal query and categorize it. Determine:
1. Legal category (Employment, Tenant Rights, Consumer Protection, etc.)
2. Complexity level (simple, moderate, complex)
3. Whether it requires attorney consultation
4. Suggested document templates that might be helpful

Respond in JSON format:
{
  "category": "Legal category",
  "complexity": "simple|moderate|complex",
  "requiresAttorney": true|false,
  "suggestedTemplates": ["Template 1", "Template 2"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      temperature: 0.1,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(response);
  } catch (error) {
    console.error('Error analyzing legal query:', error);
    return {
      category: 'General',
      complexity: 'moderate',
      requiresAttorney: true,
      suggestedTemplates: []
    };
  }
}
