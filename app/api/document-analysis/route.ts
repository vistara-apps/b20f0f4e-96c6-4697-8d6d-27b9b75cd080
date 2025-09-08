import { NextRequest, NextResponse } from 'next/server';
import { analyzeLegalDocument } from '@/lib/openai';
import { validateDocumentAnalysisRequest, createError, generateId } from '@/lib/utils';
import { DocumentAnalysisRequest, DocumentAnalysisResponse } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the request
    const validation = validateDocumentAnalysisRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        createError('VALIDATION_ERROR', 'Invalid document analysis request', validation.errors),
        { status: 400 }
      );
    }

    const { documentText, documentType, jurisdiction, analysisType } = body as DocumentAnalysisRequest;

    // Check document length
    if (documentText.length > 10000) {
      return NextResponse.json(
        createError('DOCUMENT_TOO_LARGE', 'Document exceeds maximum length of 10,000 characters'),
        { status: 400 }
      );
    }

    // Analyze the document using OpenAI
    const analysis = await analyzeLegalDocument(documentText, jurisdiction);
    
    // Create enhanced analysis response
    const analysisResponse: DocumentAnalysisResponse = {
      id: generateId(),
      summary: analysis.summary,
      keyPoints: analysis.detailedInfo.split('\n').filter(point => point.trim()),
      risks: extractRisks(analysis.detailedInfo),
      recommendations: analysis.actionSteps,
      compliance: {
        jurisdiction,
        requirements: extractRequirements(analysis.detailedInfo, jurisdiction),
        violations: extractViolations(analysis.detailedInfo),
      },
      confidence: calculateConfidence(documentText, analysis),
    };

    // Calculate cost based on analysis type and document length
    const cost = calculateAnalysisCost(analysisType, documentText.length);

    // Log the analysis for analytics
    console.log(`Document analyzed: ${analysisType} for ${jurisdiction}`, {
      analysisId: analysisResponse.id,
      documentType,
      documentLength: documentText.length,
      cost,
      confidence: analysisResponse.confidence,
      timestamp: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: analysisResponse,
      cost,
      message: 'Document analyzed successfully',
    });

  } catch (error) {
    console.error('Document analysis error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        createError('ANALYSIS_ERROR', error.message),
        { status: 500 }
      );
    }

    return NextResponse.json(
      createError('INTERNAL_ERROR', 'Failed to analyze document'),
      { status: 500 }
    );
  }
}

// Helper functions
function extractRisks(detailedInfo: string): string[] {
  const riskKeywords = ['risk', 'danger', 'liability', 'penalty', 'violation', 'breach', 'consequence'];
  const sentences = detailedInfo.split(/[.!?]+/);
  
  return sentences
    .filter(sentence => 
      riskKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword)
      )
    )
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10)
    .slice(0, 5); // Limit to top 5 risks
}

function extractRequirements(detailedInfo: string, jurisdiction: string): string[] {
  const requirementKeywords = ['must', 'required', 'mandatory', 'shall', 'obligation', 'duty'];
  const sentences = detailedInfo.split(/[.!?]+/);
  
  return sentences
    .filter(sentence => 
      requirementKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword)
      )
    )
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10)
    .slice(0, 5); // Limit to top 5 requirements
}

function extractViolations(detailedInfo: string): string[] {
  const violationKeywords = ['violate', 'breach', 'non-compliant', 'illegal', 'unlawful', 'invalid'];
  const sentences = detailedInfo.split(/[.!?]+/);
  
  return sentences
    .filter(sentence => 
      violationKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword)
      )
    )
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10)
    .slice(0, 3); // Limit to top 3 violations
}

function calculateConfidence(documentText: string, analysis: any): number {
  let confidence = 0.7; // Base confidence
  
  // Increase confidence based on document length (more context = higher confidence)
  if (documentText.length > 1000) confidence += 0.1;
  if (documentText.length > 3000) confidence += 0.1;
  
  // Increase confidence if analysis contains specific legal terms
  const legalTerms = ['contract', 'agreement', 'clause', 'provision', 'statute', 'regulation'];
  const termsFound = legalTerms.filter(term => 
    documentText.toLowerCase().includes(term) || 
    analysis.summary.toLowerCase().includes(term)
  ).length;
  
  confidence += (termsFound / legalTerms.length) * 0.1;
  
  // Cap confidence at 0.95
  return Math.min(confidence, 0.95);
}

function calculateAnalysisCost(analysisType: string, documentLength: number): number {
  const baseCosts = {
    'summary': 0.05,
    'risks': 0.08,
    'compliance': 0.12,
    'full': 0.15,
  };
  
  const baseCost = baseCosts[analysisType as keyof typeof baseCosts] || 0.10;
  
  // Add cost based on document length
  const lengthMultiplier = Math.min(documentLength / 5000, 2); // Max 2x multiplier
  
  return Math.round((baseCost * lengthMultiplier) * 100) / 100; // Round to 2 decimal places
}

export async function GET(req: NextRequest) {
  try {
    // Return supported analysis types and their costs
    const analysisTypes = [
      {
        type: 'summary',
        name: 'Document Summary',
        description: 'Get a plain-language summary of the document',
        baseCost: 0.05,
        estimatedTime: '1-2 minutes',
      },
      {
        type: 'risks',
        name: 'Risk Analysis',
        description: 'Identify potential legal risks and liabilities',
        baseCost: 0.08,
        estimatedTime: '2-3 minutes',
      },
      {
        type: 'compliance',
        name: 'Compliance Check',
        description: 'Check compliance with relevant laws and regulations',
        baseCost: 0.12,
        estimatedTime: '3-4 minutes',
      },
      {
        type: 'full',
        name: 'Full Analysis',
        description: 'Comprehensive analysis including summary, risks, and compliance',
        baseCost: 0.15,
        estimatedTime: '4-5 minutes',
      },
    ];

    return NextResponse.json({
      success: true,
      data: analysisTypes,
      message: 'Analysis types retrieved successfully',
    });

  } catch (error) {
    console.error('Analysis types fetch error:', error);
    return NextResponse.json(
      createError('FETCH_ERROR', 'Failed to fetch analysis types'),
      { status: 500 }
    );
  }
}
