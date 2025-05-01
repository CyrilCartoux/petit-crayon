import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function apiLogger(request: NextRequest) {
  const startTime = Date.now();
  const method = request.method;
  const url = request.url;
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  // Nettoyer les headers pour enlever les informations sensibles
  const cleanHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    if (!key.toLowerCase().includes('cookie') && 
        !key.toLowerCase().includes('auth') && 
        !key.toLowerCase().includes('token')) {
      cleanHeaders[key] = value;
    }
  });

  console.log(`[${new Date().toISOString()}] ${method} ${url} (${ip})`);

  const response = await NextResponse.next();
  const duration = Date.now() - startTime;

  console.log(`[${new Date().toISOString()}] ${response.status} (${duration}ms)`);

  return response;
} 