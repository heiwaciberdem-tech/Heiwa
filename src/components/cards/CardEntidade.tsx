// src/components/cards/CardEntidade.tsx

import React from 'react';
import type { IEntidadeCard } from '../../types';

const CardEntidade: React.FC<{ item: IEntidadeCard }> = ({ item }) => {
  const { logoUrl, nome, link } = item;

  // Se não tiver logo, não renderiza nada
  if (!logoUrl) return null;

  // Conteúdo da imagem
  const imageElement = (
    <img 
      src={logoUrl} 
      alt={nome} 
      className="h-12 w-auto object-contain filter hover:grayscale transition-all duration-300" 
    />
  );

  // Se tiver link, envolve em <a>
  if (link && link.trim() !== '') {
    return (
      <div className="flex flex-col items-center justify-center p-2">
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          title={`Visitar site de ${nome}`}
        >
          {imageElement}
        </a>
      </div>
    );
  }

  // Sem link, apenas a imagem
  return (
    <div className="flex flex-col items-center justify-center p-2">
      {imageElement}
    </div>
  );
};

export default CardEntidade;