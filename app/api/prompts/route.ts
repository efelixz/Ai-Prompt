import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for initial implementation
  const prompts = [
    {
      id: '1',
      title: 'Hyper-realistic Ethereal Architecture',
      slug: 'hyper-realistic-ethereal-architecture',
      shortDescription: 'Generate stunningly complex architectural structures that blend organic forms with futuristic materials.',
      isFeatured: true,
      aiTools: ['Midjourney'],
      category: 'Architecture',
    },
    {
      id: '2',
      title: 'Micro-interaction Logic Framework',
      slug: 'micro-interaction-logic-framework',
      shortDescription: 'A precision prompt that crafts complex React micro-interactions with performant state logic.',
      isFeatured: true,
      aiTools: ['ChatGPT-4'],
      category: 'Code Mastery',
    }
  ];

  return NextResponse.json(prompts);
}
