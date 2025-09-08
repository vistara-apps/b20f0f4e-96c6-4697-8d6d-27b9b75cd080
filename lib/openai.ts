import OpenAI from 'openai';
import { LegalAdviceResponse, LegalInformation, Template } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateLegalAdvice(
  query: string,
  jurisdiction: string
): Promise<LegalAdviceResponse> {
  try {
    const prompt = `You are a legal information assistant. Provide plain-language legal information for the following query in ${jurisdiction} jurisdiction. 

Query: "${query}"

Please provide:
1. A clear, easy-to-understand summary (2-3 sentences)
2. 3-5 actionable next steps
3. Relevant laws or regulations (if applicable)
4. Disclaimer that this is informational only

Format your response as JSON with the following structure:
{
  "summary": "Plain language explanation",
  "actionSteps": ["Step 1", "Step 2", "Step 3"],
  "relevantLaws": ["Law 1", "Law 2"],
  "sources": ["Source 1", "Source 2"]
}

Important: This is for informational purposes only and does not constitute legal advice.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful legal information assistant that provides clear, accurate, and jurisdiction-specific legal information in plain language. Always include appropriate disclaimers.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    try {
      const parsedResponse = JSON.parse(responseText);
      return {
        summary: parsedResponse.summary || 'Unable to generate summary',
        actionSteps: parsedResponse.actionSteps || [],
        relevantLaws: parsedResponse.relevantLaws || [],
        sources: parsedResponse.sources || [],
      };
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        summary: responseText.slice(0, 300) + '...',
        actionSteps: ['Consult with a qualified attorney for specific advice'],
        relevantLaws: [],
        sources: ['Legal information assistant'],
      };
    }
  } catch (error) {
    console.error('Error generating legal advice:', error);
    throw new Error('Failed to generate legal advice');
  }
}

export async function generateLegalTemplate(
  templateType: string,
  context: Record<string, string>,
  jurisdiction: string
): Promise<Template> {
  try {
    const prompt = `Generate a legal template for "${templateType}" in ${jurisdiction} jurisdiction.

Context: ${JSON.stringify(context)}

Please create a professional template with:
1. Proper legal formatting
2. Placeholder fields for customization
3. Appropriate legal language
4. Jurisdiction-specific requirements

Format as JSON:
{
  "title": "Template Title",
  "content": "Template content with [PLACEHOLDER] fields",
  "usageContext": "When and how to use this template",
  "variables": ["PLACEHOLDER1", "PLACEHOLDER2"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal document assistant that creates professional legal templates with proper formatting and jurisdiction-specific language.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    const parsedResponse = JSON.parse(responseText);
    return {
      id: `template_${Date.now()}`,
      title: parsedResponse.title || templateType,
      content: parsedResponse.content || 'Template content unavailable',
      usageContext: parsedResponse.usageContext || 'General use',
      jurisdiction,
      variables: parsedResponse.variables || [],
    };
  } catch (error) {
    console.error('Error generating legal template:', error);
    throw new Error('Failed to generate legal template');
  }
}

export async function analyzeLegalDocument(
  documentText: string,
  jurisdiction: string
): Promise<LegalAdviceResponse> {
  try {
    const prompt = `Analyze the following legal document and provide a comprehensive analysis for ${jurisdiction} jurisdiction:

Document: "${documentText.slice(0, 2000)}"

Please provide:
1. Main purpose and key points of the document
2. Important terms, conditions, and clauses
3. Potential legal risks or concerns
4. Recommended actions or next steps
5. Compliance considerations

Format as JSON:
{
  "summary": "Plain language summary of the document",
  "actionSteps": ["Action 1", "Action 2", "Action 3"],
  "relevantLaws": ["Relevant law 1", "Relevant law 2"],
  "sources": ["Source 1", "Source 2"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal document analyzer that breaks down complex legal language into plain English, identifies key provisions, risks, and provides actionable recommendations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    try {
      const parsedResponse = JSON.parse(responseText);
      return {
        summary: parsedResponse.summary || 'Document analysis unavailable',
        actionSteps: parsedResponse.actionSteps || [],
        relevantLaws: parsedResponse.relevantLaws || [],
        sources: parsedResponse.sources || [],
        templates: [],
      };
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        summary: responseText.slice(0, 400) + '...',
        actionSteps: ['Review document with a qualified attorney'],
        relevantLaws: [],
        sources: ['Document analysis assistant'],
        templates: [],
      };
    }
  } catch (error) {
    console.error('Error analyzing legal document:', error);
    throw new Error('Failed to analyze legal document');
  }
}

export async function generateContextualAdvice(
  query: string,
  jurisdiction: string,
  context: {
    previousQueries?: string[];
    userType?: 'individual' | 'business' | 'organization';
    urgency?: 'low' | 'medium' | 'high';
  }
): Promise<LegalAdviceResponse> {
  try {
    const contextInfo = [
      context.previousQueries?.length ? `Previous queries: ${context.previousQueries.join(', ')}` : '',
      context.userType ? `User type: ${context.userType}` : '',
      context.urgency ? `Urgency level: ${context.urgency}` : '',
    ].filter(Boolean).join('\n');

    const prompt = `Provide contextual legal information for ${jurisdiction} jurisdiction:

Query: "${query}"

${contextInfo ? `Context:\n${contextInfo}\n` : ''}

Please provide tailored advice considering the context:
1. A clear, contextual summary addressing the specific situation
2. Prioritized action steps based on urgency and user type
3. Relevant laws or regulations that apply
4. Resources and next steps
5. When to seek professional legal help

Format as JSON:
{
  "summary": "Contextual summary addressing the situation",
  "actionSteps": ["Prioritized step 1", "Step 2", "Step 3"],
  "relevantLaws": ["Relevant law 1", "Relevant law 2"],
  "sources": ["Resource 1", "Resource 2"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a contextual legal information assistant. Provide tailored advice based on user context, urgency, and previous interactions. Always emphasize appropriate next steps and when professional help is needed.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1200,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    try {
      const parsedResponse = JSON.parse(responseText);
      return {
        summary: parsedResponse.summary || 'Contextual advice unavailable',
        actionSteps: parsedResponse.actionSteps || [],
        relevantLaws: parsedResponse.relevantLaws || [],
        sources: parsedResponse.sources || [],
        templates: [],
      };
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        summary: responseText.slice(0, 350) + '...',
        actionSteps: ['Consult with a qualified attorney for specific advice'],
        relevantLaws: [],
        sources: ['Contextual legal assistant'],
        templates: [],
      };
    }
  } catch (error) {
    console.error('Error generating contextual advice:', error);
    throw new Error('Failed to generate contextual legal advice');
  }
}
