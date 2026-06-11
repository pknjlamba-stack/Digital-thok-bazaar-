import { NextResponse } from 'next/server';

// Yeh API link par aane waale har affiliate click ko track karegi
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');

    if (!ref) {
      return NextResponse.json(
        { success: false, error: 'Access Denied: No referral token found' },
        { status: 400 }
      );
    }

    // 🌐 FUTURE DATABASE INTEGRATION:
    // Yahan hum Supabase ya MongoDB ki query likhenge jo real database me 
    // is affiliate ID ke 'clicks' count ko +1 badha dega.
    console.log(`📡 BACKEND LOG: Click locked for Affiliate ID: ${ref}`);

    return NextResponse.json({
      success: true,
      tracked: ref,
      status: "CONNECTED_TO_GATEWAY",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
