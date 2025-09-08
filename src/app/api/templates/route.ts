import { NextRequest, NextResponse } from 'next/server';
import { generateTemplate } from '@/lib/openai';
import { validateTemplateRequest, sanitizeInput } from '@/utils/validation';
import { ERROR_MESSAGES, TEMPLATE_TYPES } from '@/lib/constants';
import { Template } from '@/types';

// Handle POST requests for template generation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validatedData = validateTemplateRequest(body);
    const { templateType, context, jurisdiction, variables } = validatedData;

    // Sanitize the context input
    const sanitizedContext = sanitizeInput(context);

    // Generate the template using OpenAI
    const template = await generateTemplate(
      templateType,
      sanitizedContext,
      jurisdiction,
      variables
    );

    // Add metadata to the response
    const enhancedTemplate: Template & {
      disclaimer: string;
      instructions: string;
      pricing: {
        cost: number;
        currency: string;
      };
    } = {
      ...template,
      disclaimer: 'This template is for informational purposes only. Have it reviewed by a qualified attorney before use.',
      instructions: 'Fill in the bracketed variables with your specific information. Review all content carefully before sending or filing.',
      pricing: {
        cost: 0.05, // $0.05 in ETH equivalent
        currency: 'ETH',
      },
    };

    return NextResponse.json(enhancedTemplate);
  } catch (error) {
    console.error('Error in POST /api/templates:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.message },
        { status: 400 }
      );
    }

    // Handle OpenAI API errors
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Handle GET requests - return available template types
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const templates = [
      {
        id: 'demand-letter',
        name: 'Demand Letter',
        description: 'Formal request for payment or action before legal proceedings',
        category: 'debt-collection',
        complexity: 'simple',
        estimatedTime: '5-10 minutes',
        price: 0.05,
        variables: ['RECIPIENT_NAME', 'AMOUNT_OWED', 'DUE_DATE', 'DESCRIPTION'],
        preview: 'Dear [RECIPIENT_NAME], This letter serves as formal demand for payment of $[AMOUNT_OWED]...',
      },
      {
        id: 'cease-desist',
        name: 'Cease and Desist Letter',
        description: 'Stop unwanted behavior or infringement',
        category: 'intellectual-property',
        complexity: 'moderate',
        estimatedTime: '10-15 minutes',
        price: 0.05,
        variables: ['RECIPIENT_NAME', 'INFRINGING_ACTIVITY', 'DEADLINE'],
        preview: 'Dear [RECIPIENT_NAME], You are hereby directed to CEASE AND DESIST from [INFRINGING_ACTIVITY]...',
      },
      {
        id: 'notice-to-quit',
        name: 'Notice to Quit',
        description: 'Formal notice to tenant to vacate property',
        category: 'landlord-tenant',
        complexity: 'moderate',
        estimatedTime: '10-15 minutes',
        price: 0.05,
        variables: ['TENANT_NAME', 'PROPERTY_ADDRESS', 'QUIT_DATE', 'REASON'],
        preview: 'TO: [TENANT_NAME] You are hereby notified to quit and surrender the premises located at [PROPERTY_ADDRESS]...',
      },
      {
        id: 'complaint-letter',
        name: 'Complaint Letter',
        description: 'Formal complaint to business or organization',
        category: 'consumer-protection',
        complexity: 'simple',
        estimatedTime: '5-10 minutes',
        price: 0.05,
        variables: ['COMPANY_NAME', 'ISSUE_DESCRIPTION', 'DESIRED_RESOLUTION'],
        preview: 'Dear [COMPANY_NAME], I am writing to formally complain about [ISSUE_DESCRIPTION]...',
      },
      {
        id: 'settlement-agreement',
        name: 'Settlement Agreement',
        description: 'Agreement to resolve dispute without litigation',
        category: 'dispute-resolution',
        complexity: 'complex',
        estimatedTime: '20-30 minutes',
        price: 0.25,
        variables: ['PARTY1_NAME', 'PARTY2_NAME', 'SETTLEMENT_AMOUNT', 'DISPUTE_DESCRIPTION'],
        preview: 'SETTLEMENT AGREEMENT between [PARTY1_NAME] and [PARTY2_NAME] regarding [DISPUTE_DESCRIPTION]...',
      },
      {
        id: 'nda',
        name: 'Non-Disclosure Agreement',
        description: 'Protect confidential information',
        category: 'business',
        complexity: 'complex',
        estimatedTime: '15-25 minutes',
        price: 0.25,
        variables: ['DISCLOSING_PARTY', 'RECEIVING_PARTY', 'PURPOSE', 'DURATION'],
        preview: 'NON-DISCLOSURE AGREEMENT between [DISCLOSING_PARTY] and [RECEIVING_PARTY]...',
      },
      {
        id: 'employment-contract',
        name: 'Employment Contract',
        description: 'Basic employment agreement template',
        category: 'employment',
        complexity: 'complex',
        estimatedTime: '25-35 minutes',
        price: 0.25,
        variables: ['EMPLOYEE_NAME', 'POSITION', 'SALARY', 'START_DATE', 'COMPANY_NAME'],
        preview: 'EMPLOYMENT AGREEMENT between [COMPANY_NAME] and [EMPLOYEE_NAME] for the position of [POSITION]...',
      },
      {
        id: 'service-agreement',
        name: 'Service Agreement',
        description: 'Contract for services between parties',
        category: 'business',
        complexity: 'moderate',
        estimatedTime: '15-20 minutes',
        price: 0.10,
        variables: ['SERVICE_PROVIDER', 'CLIENT_NAME', 'SERVICES_DESCRIPTION', 'PAYMENT_TERMS'],
        preview: 'SERVICE AGREEMENT between [SERVICE_PROVIDER] and [CLIENT_NAME] for [SERVICES_DESCRIPTION]...',
      },
    ];

    // Filter by category if specified
    const filteredTemplates = category 
      ? templates.filter(template => template.category === category)
      : templates;

    return NextResponse.json({ 
      templates: filteredTemplates,
      categories: [
        'debt-collection',
        'intellectual-property',
        'landlord-tenant',
        'consumer-protection',
        'dispute-resolution',
        'business',
        'employment',
      ],
    });
  } catch (error) {
    console.error('Error in GET /api/templates:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Handle PUT requests - customize existing template
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateId, variables, customizations } = body;

    // In a real implementation, you would:
    // 1. Fetch the base template
    // 2. Apply the variables and customizations
    // 3. Return the customized template

    // For now, return a placeholder response
    return NextResponse.json({
      message: 'Template customization not yet implemented',
      templateId,
      variables,
      customizations,
    });
  } catch (error) {
    console.error('Error in PUT /api/templates:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}
