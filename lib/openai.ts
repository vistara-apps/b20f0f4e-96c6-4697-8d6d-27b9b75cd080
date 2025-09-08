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
): Promise<LegalInformation> {
  try {
    const prompt = `Analyze the following legal document and provide a plain-language summary for ${jurisdiction} jurisdiction:

Document: "${documentText.slice(0, 2000)}"

Please provide:
1. Main purpose and key points
2. Important terms and conditions
3. Potential risks or concerns
4. Recommended actions

Format as JSON:
{
  "title": "Document Analysis",
  "summary": "Plain language summary",
  "detailedInfo": "Detailed analysis",
  "actionSteps": ["Action 1", "Action 2"],
  "tags": ["tag1", "tag2"]
}`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal document analyzer that breaks down complex legal language into plain English and identifies key points and risks.'
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

    const parsedResponse = JSON.parse(responseText);
    return {
      id: `analysis_${Date.now()}`,
      title: parsedResponse.title || 'Document Analysis',
      summary: parsedResponse.summary || 'Analysis unavailable',
      detailedInfo: parsedResponse.detailedInfo || '',
      actionSteps: parsedResponse.actionSteps || [],
      jurisdiction,
      tags: parsedResponse.tags || [],
    };
  } catch (error) {
    console.error('Error analyzing legal document:', error);
    throw new Error('Failed to analyze legal document');
  }
}
