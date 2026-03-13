import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const GUESTBOOK_FILE = join(process.cwd(), 'guestbook.json');
const MAX_ENTRIES = 20;

interface GuestbookEntry {
  name: string;
  message: string;
  time: string;
}

function getEntries(): GuestbookEntry[] {
  if (!existsSync(GUESTBOOK_FILE)) {
    // Default sample entries
    return [
      { name: "Alice", message: "Cool portfolio! 🤘", time: "2024-01-15" },
      { name: "Bob", message: "Love the retro vibe", time: "2024-01-16" },
    ];
  }
  try {
    const data = readFileSync(GUESTBOOK_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveEntries(entries: GuestbookEntry[]) {
  // Keep only latest MAX_ENTRIES
  const trimmed = entries.slice(-MAX_ENTRIES);
  writeFileSync(GUESTBOOK_FILE, JSON.stringify(trimmed, null, 2));
}

export async function GET() {
  const entries = getEntries();
  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const entries = getEntries();
    const newEntry: GuestbookEntry = {
      name: name?.trim() || 'Guest',
      message: message.trim().slice(0, 500), // Limit message length
      time: new Date().toISOString().split('T')[0],
    };

    entries.push(newEntry);
    saveEntries(entries);

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add entry' }, { status: 500 });
  }
}
