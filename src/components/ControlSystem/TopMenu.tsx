'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import getUserProfile from '@/lib/getUserProfile';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchStores } from "@/redux/features/storeSlice";

export default function TopMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const dispatch = useAppDispatch();
    const { stores, sloading  } = useAppSelector((state) => state.stores);
    const [store, setStore] = useState<Store | null>(null);

    const [user, setUser] = useState<User | null>(null);
    const {data:session} = useSession();
    
    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);
    
    if(session){
    useEffect(() => {
        const fetchData = async () => {
          const profile = await getUserProfile(session.user.body.token);
          if (profile) {
            setUser(profile);
          }
        };
        fetchData();
        }, []);

        useEffect(() => {
            const fetchProductAndStores = async () => {
                try {
                    if (!sloading && stores.length > 0) {
                      const matchedStore = stores.find((store: { userID: number }) => store.userID === user?.body.id);
                      setStore(matchedStore || null);
                    }
                } catch (error) {
                    console.error('Error fetching product or stores:', error);
                }
            };
      
            fetchProductAndStores();
        }, [sloading, stores]);
    }
    
    const handleSearch = (event: any) => {
        event.preventDefault();
        const searchQuery = event.target.elements.searchInput.value;
        router.push(`/sorted?query=${searchQuery}`);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bg-custom-green h-24 z-30 flex gap-5 flex-row-reverse">
            <div className='flex flex-row absolute left-10 h-full items-center'>
                <Link href="/" className='pr-16'>
                    <Image src='/img/weblogo.png' alt='logo' style={{ height: '100%', width: 'auto' }}
                        width={0} height={0} sizes='100vh' />
                </Link>

                <div className="ml-4 w-[50vw]">
                    <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl shadow-lg w-full">
                        <input type="text" id="searchInput" name="query" placeholder="Search"
                            className="bg-white rounded-xl w-full p-2 text-gray-700 focus:outline-none" />
                        <button type="submit" className="mr-2">
                        <Image src='/img/searchIcon.png' alt='logo' style={{ height: '100%', width: 'auto' }} width={0} height={0} sizes='60vh' />
                        </button>
                    </form>
                </div>
            </div>

            <div className='flex flex-row absolute items-center right-10 h-full space-x-16'>
                {
                    user? 
                        user.body.role === "SELLER" ? store?

                        <Link href={`/store/${store.id}`}>
                            <Image src='/img/sellerIcon.png' alt='store' style={{ height: '30%', width: 'auto' }}
                                width={100} height={100} sizes='25vh' />
                        </Link> : "" : user.body.role === "ADMIN" ? 

                            <Link href="/store">
                                <Image src='/img/adminIcon.png' alt='cart' style={{ height: '30%', width: 'auto' }}
                                    width={0} height={0} sizes='25vh' />
                            </Link> : ""
                    : ""
                }
                <Link href="/cart">
                    <Image src='/img/cart.png' alt='cart' style={{ height: '30%', width: 'auto' }}
                        width={0} height={0} sizes='25vh' />
                </Link>

                <button onClick={() => setShowMenu(!showMenu)}>
                    <Image src='/img/profileIcon.png' alt='profile' width={50} height={50} />
                </button>
                {showMenu && (
                    <div className="absolute right-0 mt-24 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                        <button className="w-full px-4 py-2 text-right" onClick={() => setShowMenu(false)}>X</button>
                        <Link href="/profile">
                            <p className="w-full px-4 py-2 text-left" onClick={() => setShowMenu(false)}>My Profile</p>
                        </Link>
                        <Link href="/orders">
                            <p className="w-full px-4 py-2 text-left" onClick={() => setShowMenu(false)}>Order History</p>
                        </Link>
                        {
                            user?  <Link href="/api/auth/signout">
                            <p className="w-full px-4 py-2 text-left" onClick={() => setShowMenu(false)}>Log-out {user.body.name}</p>
                        </Link> 
                            : 
                            <Link href="/auth/login">
                            <p className="w-full px-4 py-2 text-left" onClick={() => setShowMenu(false)}>Log-in</p>
                        </Link>
                        }
                        
                    </div>
                )}
            </div>
        </div>
    );
}