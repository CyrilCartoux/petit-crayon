'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const reviews = [
  {
    name: 'Sophie C.',
    profileColor: 'bg-[var(--color-primary)]',
    example: '/images/example1.png',
    text: 'Un service incroyable ! Les coloriages sont magnifiques, mes enfants ont adoré. Je recommande à 100% !',
  },
  {
    name: 'Lucas L.',
    profileColor: 'bg-[var(--color-accent)]',
    example: '/images/example2.png',
    text: 'Super expérience, rapide et facile. Le résultat est bluffant, parfait pour offrir !',
  },
  {
    name: 'Emma P.',
    profileColor: 'bg-[var(--color-secondary)]',
    example: '/images/example3.png',
    text: 'Très satisfaite, le rendu est top et l\'équipe est très réactive. Merci !',
  },
];

function getInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-4 shadow-sm h-full">
      {/* Avatar cercle avec initiale */}
      <div className={`w-14 h-14 mb-2 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow ${review.profileColor}`}>
        {getInitial(review.name)}
      </div>
      <p className="text-gray-700 text-sm mb-2">&quot;{review.text}&quot;</p>
      <span className="text-xs text-gray-500 font-medium mb-2">{review.name}</span>
      {/* Image d'exemple */}
      <div className="w-full h-28 relative mt-2 rounded-lg overflow-hidden border border-gray-200 bg-white">
        <Image
          src={review.example}
          alt={`Exemple de coloriage de ${review.name}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-md px-6 py-8">
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-3xl font-bold text-gray-900">4,95</span>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-500 text-sm">(123 avis)</span>
      </div>

      {/* Carousel pour mobile */}
      <div className="md:hidden relative">
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            },
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          spaceBetween={20}
          slidesPerView={1}
          className="pb-12"
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Flèches de navigation */}
        <div className="swiper-button-prev !left-2 !w-8 !h-8 !bg-white !rounded-full !shadow-md after:!text-primary after:!text-sm" />
        <div className="swiper-button-next !right-2 !w-8 !h-8 !bg-white !rounded-full !shadow-md after:!text-primary after:!text-sm" />
        
        {/* Indicateurs de pagination */}
        <div className="swiper-pagination !bottom-0 !relative !mt-4" />
      </div>

      {/* Grille pour desktop */}
      <div className="hidden md:grid gap-6 md:grid-cols-3">
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: #CBD5E1;
          opacity: 1;
          margin: 0 6px;
        }
        .swiper-pagination-bullet-active {
          background-color: var(--color-primary);
          transform: scale(1.2);
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 16px !important;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
} 