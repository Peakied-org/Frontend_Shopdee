'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AddStore from "@/components/storeAdd/AddStore";
import NotAllow from "@/components/storeAdd/NotAllow";
import getUserProfile from '@/lib/getUserProfile';
import getMyStore from '@/lib/getMyStore';

export default function StoreAdd() {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [hasStore, setHasStore] = useState<boolean | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            const fetchData = async () => {
                try {
                    const profile = await getUserProfile(session.user.body.token);
                    if (profile) {
                        setUserRole(profile.body.role);
                        const store = await getMyStore();
                        setHasStore(store !== null);
                    }
                } catch (error) {
                    console.error('Failed to fetch profile or store:', error);
                }
            };
            fetchData();
        }
    }, [session]);

    if ((userRole === "SELLER" &&  hasStore === false) || userRole === "ADMIN" ) {
        return (
            <div className="mt-20">
                <AddStore />
            </div>
        );
    } else {
        return (
            <div className="mt-20">
                <NotAllow />
            </div>
        );
    }
}
