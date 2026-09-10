// src/components/cards/EixoCard.tsx

import React from 'react';
import { motion } from 'framer-motion';
import type { IConteudoEixo } from '../../types';

interface EixoCardProps {
  item: IConteudoEixo;
}

const EixoCard: React.FC<EixoCardProps> = ({ item }) => {
  return (
    <motion.div
      className="
        bg-white 
        rounded-lg 
        shadow-sm 
        overflow-hidden
        transition-all duration-300
        border border-gray-200 
        hover:border-green-500 hover:shadow-md
        p-5
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full h-full flex items-start gap-4">
        {/* Ícone */}
        <div className="w-12 h-12 flex-shrink-0 bg-green-100 rounded-lg flex items-center justify-center">
          <img 
            src={item.imagemUrl} 
            alt={item.titulo} 
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Conteúdo */}
        <div className="h-full flex-1 justify-between flex flex-col ">
          <h3 className="text-lg font-semibold text-gray-800">
            {item.titulo}
          </h3>
          
          <p className="text-gray-600 text-sm mt-1">
            {item.descricao}
          </p>
          
          {/* Botão */}
          <div className="flex justify-center mt-4"> 
            <a 
              href={item.acaoUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block w-full text-center
                bg-green-600 text-white font-medium text-sm
                py-2 px-4 rounded-lg 
                transition duration-300 hover:bg-green-700
              "
            >
              Acessar
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EixoCard;