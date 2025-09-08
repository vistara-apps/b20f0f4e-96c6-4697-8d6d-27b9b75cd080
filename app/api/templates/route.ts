import { NextRequest, NextResponse } from 'next/server';
import { generateLegalTemplate } from '@/lib/openai';
import { sanitizeInput, validateQuery } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateType, jurisdiction, customFields, context } = body;

    // Validate required fields
    if (!templateType || !jurisdiction) {
      return NextResponse.json(
        { error: 'Template type and jurisdiction are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedContext = context ? sanitizeInput(context) : '';
    const sanitizedFields = customFields ? 
      Object.fromEntries(
        Object.entries(customFields).map(([key, value]) => [
          key, 
          typeof value === 'string' ? sanitizeInput(value) : value
        ])
      ) : {};

    // Generate the legal template
    const template = await generateLegalTemplate(
      templateType,
      jurisdiction,
      sanitizedFields,
      sanitizedContext
    );

    return NextResponse.json({
      success: true,
      data: {
        templateId: `template_${Date.now()}`,
        templateType,
        jurisdiction,
        content: template.content,
        instructions: template.instructions,
        disclaimer: template.disclaimer,
        generatedAt: new Date().toISOString(),
        customFields: sanitizedFields,
      },
    });

  } catch (error) {
    console.error('Template generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate template' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jurisdiction = searchParams.get('jurisdiction') || 'GENERAL';
    const category = searchParams.get('category');

    // Return available templates
    const availableTemplates = [
      {
        id: 'demand-letter',
        title: 'Demand Letter',
        description: 'Professional demand letter for unpaid debts or services',
        category: 'debt-collection',
        jurisdiction: jurisdiction,
        fields: ['debtor_name', 'amount_owed', 'due_date', 'description'],
        cost: 0.02, // ETH
      },
      {
        id: 'lease-termination',
        title: 'Lease Termination Notice',
        description: 'Formal notice to terminate a rental lease agreement',
        category: 'housing',
        jurisdiction: jurisdiction,
        fields: ['landlord_name', 'tenant_name', 'property_address', 'termination_date'],
        cost: 0.02,
      },
      {
        id: 'cease-desist',
        title: 'Cease and Desist Letter',
        description: 'Legal notice to stop unwanted behavior or harassment',
        category: 'harassment',
        jurisdiction: jurisdiction,
        fields: ['recipient_name', 'behavior_description', 'consequences'],
        cost: 0.03,
      },
      {
        id: 'employment-complaint',
        title: 'Employment Complaint Letter',
        description: 'Formal complaint about workplace issues',
        category: 'employment',
        jurisdiction: jurisdiction,
        fields: ['employer_name', 'issue_description', 'desired_resolution'],
        cost: 0.02,
      },
      {
        id: 'small-claims-demand',
        title: 'Small Claims Demand Letter',
        description: 'Pre-litigation demand letter for small claims court',
        category: 'litigation',
        jurisdiction: jurisdiction,
        fields: ['defendant_name', 'claim_amount', 'incident_description', 'deadline'],
        cost: 0.04,
      },
    ];

    // Filter by category if provided
    const filteredTemplates = category 
      ? availableTemplates.filter(template => template.category === category)
      : availableTemplates;

    return NextResponse.json({
      success: true,
      data: {
        templates: filteredTemplates,
        jurisdiction: jurisdiction,
        categories: ['debt-collection', 'housing', 'harassment', 'employment', 'litigation'],
      },
    });

  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
