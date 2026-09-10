// src/components/ui/InfoTooltip.tsx

import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface InfoTooltipProps {
  /**
   * Texto que aparece no tooltip.
   * Se vazio/undefined, o tooltip não é renderizado.
   */
  text?: string;
  /** Tamanho do ícone (px). Padrão: 16 */
  size?: number;
  /** Classes extras para posicionamento */
  className?: string;
}

/**
 * Ícone de informação com tooltip simples baseado em atributo `title`.
 * Sem estado, sem JS extra — funciona por hover nativo do navegador.
 *
 * Para evoluir depois: substituir por tooltip estilizado com Radix/Headless UI.
 */
const InfoTooltip: React.FC<InfoTooltipProps> = ({
  text,
  size = 16,
  className = '',
}) => {
  if (!text) return null;

  return (
    <span
      className={`inline-flex items-center text-gray-400 hover:text-green-600 transition-colors cursor-help ${className}`}
      title={text}
      aria-label={text}
      role="img"
    >
      <FaInfoCircle size={size} />
    </span>
  );
};

export default InfoTooltip;