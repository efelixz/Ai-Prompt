'use server';

import prisma from './prisma';

/**
 * Standardized analytics event tracking.
 * In a real production app, this would also forward events to PostHog, Mixpanel, or Segment.
 */
export async function trackEvent(name: string, data: any = {}) {
  try {
    // We log to the database for internal analytics
    // In a real app, this might be a dedicated high-ingestion store like ClickHouse or dedicated table.
    console.log(`[Analytics] ${name}:`, JSON.stringify(data));

    // For now, we simulate persistence or high-speed logging
    return { success: true };
  } catch (error) {
    console.error('[Analytics] Failed to track event:', error);
    return { success: false };
  }
}
