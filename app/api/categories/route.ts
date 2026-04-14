import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for initial implementation
  const categories = [
    { id: '1', name: 'Text', slug: 'text', icon: 'Layout' },
    { id: '2', name: 'Image', slug: 'image', icon: 'ImageIcon' },
    { id: '3', name: 'Video', slug: 'video', icon: 'Video' },
    { id: '4', name: 'Marketing', slug: 'marketing', icon: 'Megaphone' },
    { id: '5', name: 'Code', slug: 'code', icon: 'Code' },
    { id: '6', name: 'Business', slug: 'business', icon: 'Briefcase' },
    { id: '7', name: 'Studies', slug: 'studies', icon: 'GraduationCap' },
  ];

  return NextResponse.json(categories);
}
