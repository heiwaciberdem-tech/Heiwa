// src/components/ui/CarouselSlider.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Número de itens visíveis por vez
const VISIBLE_ITEMS = 3;
const SLIDE_STEP = 1;
const MAX_ITEMS = 6; // máximo de itens exibidos no slider

interface CarouselSliderProps<T> {
  data: T[];
  CardComponent: React.FC<{ item: T }>;
  viewMoreLink: string;
  title?: string;
  seeMoreLabel?: string;
  cardProps?: object;
}

const CarouselSlider = <T extends { id: string } | { id: number }>({
  data,
  CardComponent,
  viewMoreLink,
  title,
  seeMoreLabel = 'Ver mais',
  cardProps = {},
}: CarouselSliderProps<T>) => {
  const itemsToShow = data.slice(0, MAX_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxSlideIndex = Math.max(0, itemsToShow.length - VISIBLE_ITEMS);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + SLIDE_STEP, maxSlideIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - SLIDE_STEP, 0));
  };

  const translateX = useMemo(() => {
    const itemWidth = 100 / VISIBLE_ITEMS;
    return -currentIndex * itemWidth;
  }, [currentIndex]);

  if (itemsToShow.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">
        Nenhum item disponível.
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Container com overflow */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {itemsToShow.map((item, index) => (
            <div
              key={(item as { id: string | number }).id || index}
              className="flex-shrink-0 w-full md:w-1/3 p-4"
            >
              <CardComponent item={item} {...cardProps} />
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
      {itemsToShow.length > VISIBLE_ITEMS && (
        <>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`
              absolute left-0 top-1/2 transform -translate-y-1/2 
              p-3 rounded-full bg-white shadow-xl z-10 
              transition duration-300 
              ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
            `}
            style={{ marginLeft: '-1rem' }}
            aria-label="Anterior"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxSlideIndex}
            className={`
              absolute right-0 top-1/2 transform -translate-y-1/2 
              p-3 rounded-full bg-white shadow-xl z-10 
              transition duration-300 
              ${currentIndex >= maxSlideIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
            `}
            style={{ marginRight: '-1rem' }}
            aria-label="Próximo"
          >
            <FaArrowRight />
          </button>
        </>
      )}

      {/* Botão Ver mais */}
      <div className="flex justify-end mt-4 px-4">
        <Link
          to={viewMoreLink}
          className="inline-flex items-center gap-1 text-sm text-green-600 font-medium
                     hover:text-green-700 hover:underline transition-colors duration-200"
        >
          {title ? `${seeMoreLabel} ${title}` : seeMoreLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
};

export default CarouselSlider;