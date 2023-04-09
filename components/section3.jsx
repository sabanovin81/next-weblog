import Image from 'next/image';
import Link from 'next/link';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Author from './_child/author';
import Fetcher from '@/lib/fetcher';
import Spinner from './_child/spinner';
import Error from './_child/error';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Section3() {
  const { data, isLoading, isError } = Fetcher('/api/popular');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className='container mx-auto md:mx-20 py-16'>
      <h1 className='font-bold text-4xl py-12 text-center'>Most Popular</h1>
      <Swiper 
      slidesPerView={2} 
      navigation 
      autoplay
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 30
        }
      }}
      >
        {data.map((value, index) => (
          <SwiperSlide key={index}>
            <Post data={value} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, author, description } = data;

  return (
    <div className='grid'>
      <div className='images'>
        <Link href={`/posts/${id}`}>
          <Image src={img || '/'} width={600} height={400} />
        </Link>
      </div>
      <div className='info flex justify-center flex-col py-4'>
        <div className='cat'>
          <Link href={`/posts/${id}`} className='text-orange-600 hover:text-orange-700'>
            {category || 'No category'}
          </Link>
          ,&nbsp;
          <Link href={`/posts/${id}`} className='text-orange-600 hover:text-orange-700'>
            Travel
          </Link>
          &nbsp;
          <Link href={`/posts/${id}`} className='text-gray-800 hover:text-gray-600'>
            - {published || 'Unknown'}
          </Link>
        </div>
        <div className='title'>
          <Link href={`/posts/${id}`} className='text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600'>
            {title || 'No title'}
          </Link>
        </div>
        <p className='text-gray-500 py-3'>{description || 'No description'}</p>
        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
