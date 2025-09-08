'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FrameButton } from './FrameButton';
import { LoadingSpinner } from './LoadingSpinner';
import { DocumentAnalysisResponse } from '@/lib/types';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { formatFileSize, isValidFileType } from '@/lib/utils';

interface DocumentUploadProps {
  onAnalysisComplete: (analysis: DocumentAnalysisResponse) => void;
  jurisdiction: string;
  analysisType: 'summary' | 'risks' | 'compliance' | 'full';
}

export function DocumentUpload({ 
  onAnalysisComplete, 
  jurisdiction, 
  analysisType 
}: DocumentUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [documentText, setDocumentText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['txt', 'pdf', 'doc', 'docx'];
    if (!isValidFileType(file.name, allowedTypes)) {
      setError('Please upload a text, PDF, or Word document');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);
    setError('');

    try {
      // Read file content
      const text = await readFileAsText(file);
      setDocumentText(text);
    } catch (err) {
      setError('Failed to read file content');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text.length > 10000) {
          reject(new Error('Document is too long (max 10,000 characters)'));
        } else {
          resolve(text);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) {
      setError('Please upload a document or enter text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('/api/document-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentText: documentText.trim(),
          documentType: uploadedFile?.type,
          jurisdiction,
          analysisType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Analysis failed');
      }

      onAnalysisComplete(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setDocumentText(text);
    setUploadedFile(null); // Clear uploaded file when typing
  };

  const analysisTypeLabels = {
    summary: 'Document Summary',
    risks: 'Risk Analysis',
    compliance: 'Compliance Check',
    full: 'Full Analysis',
  };

  const analysisTypeCosts = {
    summary: 0.05,
    risks: 0.08,
    compliance: 0.12,
    full: 0.15,
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-display text-text-primary mb-2">Document Analysis</h2>
        <p className="text-body text-text-secondary">
          Upload a legal document or paste text for {analysisTypeLabels[analysisType].toLowerCase()}
        </p>
      </div>

      {/* File Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary bg-opacity-5'
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <p className="text-lg font-medium text-text-primary">
              {isDragActive ? 'Drop your document here' : 'Upload a document'}
            </p>
            <p className="text-sm text-text-secondary mt-1">
              Drag & drop or click to select • TXT, PDF, DOC, DOCX • Max 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded File Info */}
      {uploadedFile && (
        <div className="info-card">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-text-primary">{uploadedFile.name}</p>
              <p className="text-sm text-text-secondary">
                {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
              </p>
            </div>
            <CheckCircle className="w-5 h-5 text-accent" />
          </div>
        </div>
      )}

      {/* Text Input Alternative */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Or paste document text directly
        </label>
        <textarea
          value={documentText}
          onChange={handleTextChange}
          placeholder="Paste your legal document text here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
          maxLength={10000}
        />
        <p className="text-caption">
          {documentText.length}/10,000 characters
        </p>
      </div>

      {/* Analysis Options */}
      <div className="info-card bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-text-primary">
              {analysisTypeLabels[analysisType]}
            </h3>
            <p className="text-sm text-text-secondary">
              {analysisType === 'summary' && 'Get a plain-language summary of the document'}
              {analysisType === 'risks' && 'Identify potential legal risks and liabilities'}
              {analysisType === 'compliance' && 'Check compliance with relevant laws'}
              {analysisType === 'full' && 'Comprehensive analysis including all aspects'}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium text-text-primary">
              ${analysisTypeCosts[analysisType].toFixed(2)}
            </p>
            <p className="text-sm text-text-secondary">Base cost</p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Analyze Button */}
      <FrameButton
        onClick={handleAnalyze}
        disabled={isAnalyzing || !documentText.trim()}
        className="w-full flex items-center justify-center gap-2"
      >
        {isAnalyzing ? (
          <>
            <LoadingSpinner />
            Analyzing Document...
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            Analyze Document (${analysisTypeCosts[analysisType].toFixed(2)})
          </>
        )}
      </FrameButton>

      {/* Disclaimer */}
      <div className="info-card bg-yellow-50 border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Document analysis is for informational purposes only. 
          Sensitive information should be redacted before upload. This does not constitute legal advice.
        </p>
      </div>
    </div>
  );
}
