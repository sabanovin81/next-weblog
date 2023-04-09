import Image from 'next/image';
import Link from 'next/link';
import Author from './_child/author';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
//import 'swiper/components/autoplay/autoplay.min.css';
import fetcher from '../lib/fetcher';
import Spinner from './_child/spinner';
import Error from './_child/error';

SwiperCore.use([Autoplay]);

export default function Section1() {
  const { data, isLoading, isError } = fetcher('api/trending');

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className='py-16 bg-gray-100'>
      <div className='container px-4 mx-auto md:px-10 lg:px-16 xl:px-24'>
        <h1 className='mb-10 text-3xl font-bold tracking-widest text-center text-gray-800 uppercase sm:text-4xl md:text-5xl'>
          Trending Posts
        </h1>
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className='mySwiper'
        >
          {data.map((value, index) => (
            <SwiperSlide key={index}>
              <Slide data={value} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ data }) {
  const { id, title, category, img, published, description, author } = data;

  return (
    <div className='flex flex-col items-center justify-center gap-8 md:flex-row'>
      <div className='relative w-full md:w-1/2'>
        <Link legacyBehavior href={`/posts/${id}`}>
          <a>
            <Image
              src={img || '/placeholder.jpg'}
              alt={title}
              width={600}
              height={400}
              className='object-cover w-full h-full rounded-lg shadow-lg'
            />
          </a>
        </Link>
      </div>
      <div className='w-full md:w-1/2'>
        <div className='flex items-center mb-4 text-sm font-semibold text-gray-500'>
          <Link href={`/posts/${id}`} className='hover:text-gray-700'>
            {category || 'Uncategorized'}
          </Link>
          <span className='mx-2'>|</span>
          <span>{published || 'Unknown'}</span>
        </div>
        <Link legacyBehavior href={`/posts/${id}`}>
          <a className='mb-4 text-2xl font-bold text-gray-800 hover:text-gray-700'>{title || 'Untitled'}</a>
        </Link>
        <p className='mb-6 text-gray-600 line-clamp-3'>{description || 'No description available.'}</p>
        {author ? <Author {...author} /> : null}
      </div>
    </div>
  );
}
