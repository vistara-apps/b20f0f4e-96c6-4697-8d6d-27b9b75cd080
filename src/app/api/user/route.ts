import { NextRequest, NextResponse } from 'next/server';
import { validateUserRequest } from '@/utils/validation';
import { ERROR_MESSAGES } from '@/lib/constants';
import { User, Jurisdiction } from '@/types';

// Handle POST requests for user creation/update
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the user request
    const validatedData = validateUserRequest(body);
    const { farcasterId, walletAddress, jurisdiction } = validatedData;

    // In a production app, you would:
    // 1. Check if user already exists
    // 2. Create or update user in database
    // 3. Handle user preferences and settings
    // 4. Set up user analytics tracking

    // For now, return a mock user response
    const user: User & {
      createdAt: string;
      updatedAt: string;
      preferences: {
        notifications: boolean;
        dataSharing: boolean;
        language: string;
      };
      usage: {
        queriesUsed: number;
        templatesGenerated: number;
        lastActive: string;
      };
    } = {
      farcasterId,
      walletAddress,
      jurisdiction,
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

    // Log user creation/update for analytics
    console.log(`User ${farcasterId} created/updated:`, {
      jurisdiction,
      walletAddress: walletAddress ? 'provided' : 'not provided',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in POST /api/user:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid user data', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Handle GET requests - return user profile
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

    // In a production app, you would fetch the user from your database
    
    // For now, return a mock user profile
    const userProfile = {
      farcasterId: farcasterId || 'unknown',
      walletAddress: walletAddress || null,
      jurisdiction: 'GENERAL' as Jurisdiction,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
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
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Handle PUT requests - update user preferences
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

    // In a production app, you would:
    // 1. Validate the user exists
    // 2. Update user preferences in database
    // 3. Handle jurisdiction changes
    // 4. Update user settings

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
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Handle DELETE requests - delete user account
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const farcasterId = searchParams.get('farcasterId');

    if (!farcasterId) {
      return NextResponse.json(
        { error: 'farcasterId is required' },
        { status: 400 }
      );
    }

    // In a production app, you would:
    // 1. Validate the user exists
    // 2. Delete user data from database
    // 3. Handle data retention policies
    // 4. Send confirmation

    console.log(`User ${farcasterId} account deleted:`, {
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'User account deleted successfully' 
    });
  } catch (error) {
    console.error('Error in DELETE /api/user:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}
