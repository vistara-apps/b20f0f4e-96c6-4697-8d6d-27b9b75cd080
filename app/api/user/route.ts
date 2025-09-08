import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { farcasterId, walletAddress, jurisdiction } = body;

    // Validate required fields
    if (!farcasterId) {
      return NextResponse.json(
        { error: 'farcasterId is required' },
        { status: 400 }
      );
    }

    // In a production app, you would:
    // 1. Check if user already exists
    // 2. Create or update user in database
    // 3. Handle user preferences and settings
    // 4. Set up user analytics tracking

    const user = {
      farcasterId,
      walletAddress: walletAddress || null,
      jurisdiction: jurisdiction || 'GENERAL',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preferences: {
        notifications: true,
        dataSharing: false,
        language: 'en',
      },
      usage: {
        queriesUsed: 0,
        templatesGenerated: 0,
        lastActive: new Date().toISOString(),
      },
    };

    console.log(`User ${farcasterId} created/updated:`, {
      jurisdiction,
      walletAddress: walletAddress ? 'provided' : 'not provided',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in POST /api/user:', error);
    return NextResponse.json(
      { error: 'User creation failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const farcasterId = searchParams.get('farcasterId');
    const walletAddress = searchParams.get('walletAddress');

    if (!farcasterId && !walletAddress) {
      return NextResponse.json(
        { error: 'Either farcasterId or walletAddress is required' },
        { status: 400 }
      );
    }

    // Mock user profile
    const userProfile = {
      farcasterId: farcasterId || 'unknown',
      walletAddress: walletAddress || null,
      jurisdiction: 'GENERAL',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date().toISOString(),
      preferences: {
        notifications: true,
        dataSharing: false,
        language: 'en',
      },
      usage: {
        queriesUsed: 15,
        templatesGenerated: 3,
        totalSpent: 0.15, // ETH
        favoriteCategories: ['employment', 'tenant-rights'],
      },
      subscription: {
        type: 'pay-per-use',
        status: 'active',
        balance: 0.05, // ETH
      },
    };

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error in GET /api/user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { farcasterId, preferences, jurisdiction } = body;

    if (!farcasterId) {
      return NextResponse.json(
        { error: 'farcasterId is required' },
        { status: 400 }
      );
    }

    const updatedUser = {
      farcasterId,
      jurisdiction: jurisdiction || 'GENERAL',
      preferences: {
        notifications: preferences?.notifications ?? true,
        dataSharing: preferences?.dataSharing ?? false,
        language: preferences?.language ?? 'en',
      },
      updatedAt: new Date().toISOString(),
    };

    console.log(`User ${farcasterId} preferences updated:`, {
      jurisdiction,
      preferences,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error in PUT /api/user:', error);
    return NextResponse.json(
      { error: 'User update failed' },
      { status: 500 }
    );
  }
}
