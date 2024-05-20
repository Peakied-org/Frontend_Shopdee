// pages/sorted.tsx
'use client';
import { useSearchParams } from 'next/navigation';

export default function SortedPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    return (
        <main className='mt-16'>
            <div>
                {query}
            </div>
        </main>
    );
}
