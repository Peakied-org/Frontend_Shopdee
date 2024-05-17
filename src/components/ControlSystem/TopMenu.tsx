import Image from 'next/image';
import Link from 'next/link';


export default async function TopMenu() {
    
    return (
        <div className={"fixed top-0 left-0 right-0 bg-custom-green h-24 z-30 flex gap-5 flex-row-reverse"}>
            <div className='flex flex-row absolute left-10 h-full items-center'>
                <Link href="/" className='pr-16'>
                    <Image src={'/img/weblogo.png'} alt='logo' style={{ height: '100%', width: 'auto' }}
                    width={0} height={0} sizes='100vh'/>
                </Link>

                <div className="ml-4 w-[50vw]">
                    <form className="flex flex-col items-center bg-white rounded-2xl shadow-lg">
                    <div className="flex items-center w-full">
                        <input type="text" id="name" name="name" placeholder="Search"
                        className="bg-white rounded-xl w-full p-2 text-gray-700 focus:outline-none"/>
                        <div className="mr-2">
                            <Image src={'/img/searchIcon.png'} alt='logo' style={{ height: '100%', width: 'auto' }}
                            width={0} height={0} sizes='60vh'/>
                        </div>
                    </div> 
                    </form>
                </div>

            </div>
            

            <div className='flex flex-row absolute items-center right-10 h-full space-x-16'>

            <Link href="/cart">
                    <Image src={'/img/cart.png'} alt='logo' style={{ height: '30%', width: 'auto' }}
                    width={0} height={0} sizes='25vh'/>
            </Link>                

            <Link href="/" className="text-white font-semibold font-sans text-lg">
                    Sign-in
            </Link>

            
            </div>

            
        </div>
    );
}