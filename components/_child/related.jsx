import Image from 'next/image';
import Link from 'next/link';
import Author from './author';
import Fetcher from '@/lib/fetcher';
import Spinner from './spinner';
import Error from './error';

export default function Related() {
  const { data, isLoading, isError } = Fetcher('/api/popular');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className='pt-20'>
      <h1 className='font-bold text-3xl py-10'>Related</h1>
      <div className='flex flex-col gap-10'>
        {data.map((value, index) => (
          <Post key={index} data={value} />
        ))}
      </div>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, author } = data;

  return (
    <div className='flex gap-5'>
      <Link href={`/posts/${id}`}>
        <Image src={img || '/'} className='rounded' width={300} height={200} />
      </Link>
      <div className='info flex justify-center flex-col'>
        <div className='cat'>
          <Link href={`/posts/${id}`} className='text-orange-600 hover:text-orange-700'>
            {category || 'No category'}
          </Link>
          <Link href={`/posts/${id}`} className='text-gray-800 hover:text-gray-600'>
            - {published || 'Unknown'}
          </Link>
        </div>
        <div className='title'>
          <Link href={`/posts/${id}`} className='text-xl font-bold text-gray-800 hover:text-gray-600'>
            {title || 'No title'}
          </Link>
        </div>
        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
