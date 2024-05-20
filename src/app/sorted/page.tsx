'use client';
import { useSearchParams } from 'next/navigation';
import SortFilter from '@/components/Sort Page/SortFilter';
import SortedProducts from '@/components/Sort Page/SortedProduct';

export default function SortedPage() {
    const searchParams = useSearchParams();
    let query = searchParams.get('query') || '';

    return (
        <main className="p-16">
            <SortFilter value={query} />
            <SortedProducts/>
        </main>
    );
}
