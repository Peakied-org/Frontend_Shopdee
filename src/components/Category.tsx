import Link from 'next/link';
import { category } from '@/category';

export default function Category(){
    return(
        <div>
            {/* Topic */}
            <div className="my-5 mx-5 px-2 bg-white max-h-fit">
                <div className="text-xl py-3 pl-5">Category</div>
            </div>

            {/* Category Row */}
            <div className="mx-5 px-2 bg-white max-h-fit">
                <div className="grid grid-cols-10 gap-4 p-5">
                    {category.map((item, index) => (
                        <Link href={item.name}>
                            <div key={index}>
                                <img src={item.picture} alt={item.name} />
                                <div className='text-center text-xs py-2'>{item.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        
    )
}