import { NextRequest, NextResponse } from 'next/server';
import { createError, generateId, validateWalletAddress } from '@/lib/utils';
import { UserSession, Query } from '@/lib/types';

// In-memory session storage (in production, use Redis or database)
const sessions = new Map<string, UserSession>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { farcasterId, walletAddress, jurisdiction } = body;

    // Validate required fields
    if (!jurisdiction) {
      return NextResponse.json(
        createError('VALIDATION_ERROR', 'Jurisdiction is required'),
        { status: 400 }
      );
    }

    // Validate wallet address if provided
    if (walletAddress && !validateWalletAddress(walletAddress)) {
      return NextResponse.json(
        createError('VALIDATION_ERROR', 'Invalid wallet address format'),
        { status: 400 }
      );
    }

    // Create new session
    const sessionId = generateId();
    const session: UserSession = {
      id: sessionId,
      farcasterId,
      walletAddress,
      jurisdiction,
      queries: [],
      totalSpent: 0,
      createdAt: new Date(),
      lastActive: new Date(),
    };

    // Store session
    sessions.set(sessionId, session);

    // Set session expiry (24 hours)
    setTimeout(() => {
      sessions.delete(sessionId);
    }, 24 * 60 * 60 * 1000);

    console.log(`Session created: ${sessionId}`, {
      farcasterId,
      walletAddress: walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : undefined,
      jurisdiction,
      timestamp: session.createdAt,
    });

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        jurisdiction,
        createdAt: session.createdAt,
      },
      message: 'Session created successfully',
    });

  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      createError('SESSION_ERROR', 'Failed to create session'),
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        createError('MISSING_PARAMETER', 'Session ID is required'),
        { status: 400 }
      );
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return NextResponse.json(
        createError('SESSION_NOT_FOUND', 'Session not found or expired'),
        { status: 404 }
      );
    }

    // Update last active timestamp
    session.lastActive = new Date();
    sessions.set(sessionId, session);

    // Return session data (excluding sensitive information)
    const sessionData = {
      id: session.id,
      jurisdiction: session.jurisdiction,
      totalQueries: session.queries.length,
      totalSpent: session.totalSpent,
      createdAt: session.createdAt,
      lastActive: session.lastActive,
      recentQueries: session.queries
        .slice(-5) // Last 5 queries
        .map(query => ({
          id: query.userId, // Using userId as query ID for simplicity
          queryString: query.queryString.slice(0, 100) + '...', // Truncated
          timestamp: query.timestamp,
          cost: query.cost,
        })),
    };

    return NextResponse.json({
      success: true,
      data: sessionData,
      message: 'Session retrieved successfully',
    });

  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      createError('SESSION_ERROR', 'Failed to retrieve session'),
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, query, cost } = body;

    if (!sessionId || !query) {
      return NextResponse.json(
        createError('VALIDATION_ERROR', 'Session ID and query are required'),
        { status: 400 }
      );
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return NextResponse.json(
        createError('SESSION_NOT_FOUND', 'Session not found or expired'),
        { status: 404 }
      );
    }

    // Add query to session
    const newQuery: Query = {
      userId: sessionId,
      queryString: query.queryString,
      jurisdiction: session.jurisdiction,
      timestamp: new Date(),
      responseType: query.responseType || 'summary',
      cost: cost || 0.01,
    };

    session.queries.push(newQuery);
    session.totalSpent += newQuery.cost;
    session.lastActive = new Date();

    // Update session
    sessions.set(sessionId, session);

    console.log(`Query added to session: ${sessionId}`, {
      queryType: newQuery.responseType,
      cost: newQuery.cost,
      totalQueries: session.queries.length,
      totalSpent: session.totalSpent,
    });

    return NextResponse.json({
      success: true,
      data: {
        queryId: newQuery.userId,
        totalQueries: session.queries.length,
        totalSpent: session.totalSpent,
      },
      message: 'Query added to session successfully',
    });

  } catch (error) {
    console.error('Session update error:', error);
    return NextResponse.json(
      createError('SESSION_ERROR', 'Failed to update session'),
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        createError('MISSING_PARAMETER', 'Session ID is required'),
        { status: 400 }
      );
    }

    const session = sessions.get(sessionId);
    if (!session) {
      return NextResponse.json(
        createError('SESSION_NOT_FOUND', 'Session not found or expired'),
        { status: 404 }
      );
    }

    // Delete session
    sessions.delete(sessionId);

    console.log(`Session deleted: ${sessionId}`, {
      totalQueries: session.queries.length,
      totalSpent: session.totalSpent,
      duration: new Date().getTime() - session.createdAt.getTime(),
    });

    return NextResponse.json({
      success: true,
      message: 'Session deleted successfully',
    });

  } catch (error) {
    console.error('Session deletion error:', error);
    return NextResponse.json(
      createError('SESSION_ERROR', 'Failed to delete session'),
      { status: 500 }
    );
  }
}
