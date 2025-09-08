import { NextRequest, NextResponse } from 'next/server';
import { generateLegalTemplate } from '@/lib/openai';
import { validateTemplateRequest, createError, generateId } from '@/lib/utils';
import { TemplateRequest, GeneratedTemplate } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the request
    const validation = validateTemplateRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        createError('VALIDATION_ERROR', 'Invalid template request', validation.errors),
        { status: 400 }
      );
    }

    const { templateType, jurisdiction, context, customizations } = body as TemplateRequest;

    // Generate the template using OpenAI
    const template = await generateLegalTemplate(templateType, context, jurisdiction);
    
    // Create enhanced template response
    const generatedTemplate: GeneratedTemplate = {
      ...template,
      generatedAt: new Date(),
      cost: 0.05, // Template generation cost
      downloadUrl: `/api/templates/${template.id}/download`,
    };

    // Log the template generation for analytics
    console.log(`Template generated: ${templateType} for ${jurisdiction}`, {
      templateId: template.id,
      cost: generatedTemplate.cost,
      timestamp: generatedTemplate.generatedAt,
    });

    return NextResponse.json({
      success: true,
      data: generatedTemplate,
      message: 'Template generated successfully',
    });

  } catch (error) {
    console.error('Template generation error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        createError('GENERATION_ERROR', error.message),
        { status: 500 }
      );
    }

    return NextResponse.json(
      createError('INTERNAL_ERROR', 'Failed to generate template'),
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jurisdiction = searchParams.get('jurisdiction') || 'US';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // In a real app, this would fetch from a database
    const templateTypes = [
      {
        id: 'demand-letter',
        title: 'Demand Letter',
        description: 'Professional demand letter for unpaid debts or services',
        category: 'debt-collection',
        cost: 0.05,
        estimatedTime: '2-3 minutes',
      },
      {
        id: 'lease-termination',
        title: 'Lease Termination Notice',
        description: 'Formal notice to terminate a rental lease agreement',
        category: 'tenant-rights',
        cost: 0.05,
        estimatedTime: '2-3 minutes',
      },
      {
        id: 'cease-desist',
        title: 'Cease and Desist Letter',
        description: 'Legal notice to stop harmful or illegal activities',
        category: 'intellectual-property',
        cost: 0.05,
        estimatedTime: '3-4 minutes',
      },
      {
        id: 'employment-complaint',
        title: 'Employment Complaint Letter',
        description: 'Formal complaint about workplace issues or violations',
        category: 'workplace-rights',
        cost: 0.05,
        estimatedTime: '3-4 minutes',
      },
      {
        id: 'contract-cancellation',
        title: 'Contract Cancellation Notice',
        description: 'Notice to cancel or terminate a contract agreement',
        category: 'contract-law',
        cost: 0.05,
        estimatedTime: '2-3 minutes',
      },
      {
        id: 'privacy-request',
        title: 'Data Privacy Request',
        description: 'Request for data access, deletion, or portability under privacy laws',
        category: 'privacy-law',
        cost: 0.05,
        estimatedTime: '2-3 minutes',
      },
    ];

    // Filter by category if specified
    const filteredTemplates = category 
      ? templateTypes.filter(t => t.category === category)
      : templateTypes;

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedTemplates,
      pagination: {
        page,
        limit,
        total: filteredTemplates.length,
        hasNext: endIndex < filteredTemplates.length,
        hasPrev: page > 1,
      },
    });

  } catch (error) {
    console.error('Template listing error:', error);
    return NextResponse.json(
      createError('FETCH_ERROR', 'Failed to fetch templates'),
      { status: 500 }
    );
  }
}
