import Link from 'next/link';
import Author from './_child/author';
import Image from 'next/image';
import Fetcher from '@/lib/fetcher';
import Spinner from './_child/spinner';
import Error from './_child/error';

export default function Section2() {
  const { data, isLoading, isError } = Fetcher('/api/posts');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className='container mx-auto md:px-20 py-10'>
      <h1 className='font-bold text-4xl py-12 text-center'>Latest Posts</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-14'>
        {data.map((value, index) => (
          <Post data={value} key={index} />
        ))}
      </div>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, author } = data;

  return (
    <div className='item'>
      <div className='images'>
        <Link href={`/posts/${id}`}>
          <Image src={img || '/'} className='rounded' width={500} height={350} />
        </Link>
      </div>
      <div className='info flex justify-center flex-col py-4'>
        <div className='cat'>
          <Link href={`/posts/${id}`} className='text-orange-600 hover:text-orange-700'>
            {category || 'Unknown'}
          </Link>
          <Link href={`/posts/${id}`} className='text-gray-800 hover:text-gray-600'>
            - {published || 'Unknown'}
          </Link>
        </div>
        <div className='title'>
          <Link href={`/posts/${id}`} className='text-xl font-bold text-gray-800 hover:text-gray-600'>
            {title || 'Unknown'}
          </Link>
        </div>
        <p className='text-gray-500 py-3'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint nemo fugiat possimus aliquid, voluptatem iste
          quos.
        </p>
        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
