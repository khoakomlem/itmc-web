// Import '@fontsource/inter';

import React, { useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

import { cn } from '@/utils';

import { ItemCard, type ItemCardProps } from './ItemCard';

export type ItemWrapperProps = {
  readonly title: string;
  readonly items: ItemCardProps[];
  readonly className?: string;
};

export function ItemWrapper(props: ItemWrapperProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = React.useState(false);
  const [scrollRight, setScrollRight] = React.useState(true);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = 50;
    }
  }, []);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    if (element.scrollLeft <= 100) {
      setScrollLeft(false);
    } else {
      setScrollLeft(true);
    }

    if (element.scrollWidth - element.scrollLeft - element.clientWidth < 100) {
      setScrollRight(false);
    } else {
      setScrollRight(true);
    }
  };

  const scrollRightHandler = () => {
    const element = ref.current;
    if (element) {
      element.scrollLeft += 320;
    }
  };

  const scrollLeftHandler = () => {
    const element = ref.current;
    if (element) {
      element.scrollLeft -= 320;
    }
  };

  return (
    <div
      className={cn(
        'container mx-auto px-4 sm:px-6 lg:px-8 rounded-[30px] mt-3 py-8 shadow-sm',
        props.className
      )}
    >
      <div className='flex pl-4'>
        <span className='gradient-text font-[Inter] lg:text-5xl text-4xl py-2 font-extrabold w-[80%]'>
          {props.title}
        </span>
        <div className='flex items-center relative w-[20%]'>
          <input
            type='button'
            className='rounded-[3rem] bg-[#D9D9D9] py-1 px-5 text-[24px] font-[Inter] absolute right-1'
            value='Chi tiết'
          />
        </div>
      </div>
      <div
        ref={ref}
        className='container relative overflow-x-scroll flex flex-row py-8 hidescrollbar scroll-smooth select-none'
        onScroll={onScroll}
      >
        {scrollLeft ? (
          <button
            type='button'
            className='sticky h-[100%] my-auto left-0 z-10 active:scale-90 duration-150'
            onClick={scrollLeftHandler}
          >
            <ChevronLeftIcon className='h-12 w-12 bg-[#616161] rounded-full' />
          </button>
        ) : (
          <div className='sticky h-[100%] my-auto'>
            <div className='right-0 h-12 w-12 rounded-full' />
          </div>
        )}
        {props.items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ItemCard key={`member${index}`} {...item} />
        ))}
        {scrollRight ? (
          <button
            type='button'
            className='sticky h-[100%] my-auto right-0 active:scale-90 duration-150'
            onClick={scrollRightHandler}
          >
            <ChevronRightIcon className='h-12 w-12 bg-[#616161] rounded-full' />
          </button>
        ) : (
          <div className='sticky h-[100%] my-auto'>
            <div className='right-0 h-12 w-12 rounded-full' />
          </div>
        )}
      </div>
    </div>
  );
}
