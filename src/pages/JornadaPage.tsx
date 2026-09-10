// src/pages/JornadaPage.tsx
import React, { useEffect, useState } from 'react';
import { loadArrayData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls';
import type { IConteudoEixo } from '../types';
import LoadingCircle from '../components/ui/LoadingDots';
import CarouselSlider from '../components/ui/CarouselSlider';
import EixoCard from '../components/cards/EixoCard';
import InfoTooltip from '../components/ui/InfoTooltip';

// --- ÍCONES DAS ETAPAS ---
const stepIcons = {
  dataset: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173104-removebg-preview.png',
  model: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173513-removebg-preview.png',
  visualization: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_174110-removebg-preview.png',
};

// =========================================================================================
// TEXTOS DOS TOOLTIPS — AGUARDANDO TEXTOS DEFINITIVOS DA PROFESSORA RENATA
// Substituir o conteúdo de cada `tooltip` abaixo quando os textos finais chegarem.
// =========================================================================================
const tooltipsPlaceholder = {
  intro: 'TEXTO PENDENTE — explicação geral sobre o que é o Laboratório Heiwa e o que o pesquisador pode fazer aqui.',
  dataset: 'TEXTO PENDENTE — explicação sobre o que é um dataset e como escolher uma base para iniciar a análise.',
  modelo: 'TEXTO PENDENTE — explicação sobre o que é um modelo de mineração e como escolher uma ferramenta.',
  visualizacao: 'TEXTO PENDENTE — explicação sobre as formas de visualização dos resultados da análise.',
};

// --- CONFIGURAÇÃO DAS SEÇÕES ---
interface SecaoConfig {
  chave: 'curadoria' | 'mineracaoArgumentos' | 'visualizacaoDiscussoes';
  titulo: string;
  descricao: string;
  tooltip: string;
  icon: string;
  verMaisLink: string;
}

const secoes: SecaoConfig[] = [
  {
    chave: 'curadoria',
    titulo: 'Datasets',
    descricao: 'Explore as bases de dados disponíveis para iniciar sua análise.',
    tooltip: tooltipsPlaceholder.dataset,
    icon: stepIcons.dataset,
    verMaisLink: '/eixos/curadoria',
  },
  {
    chave: 'mineracaoArgumentos',
    titulo: 'Modelos de Mineração',
    descricao: 'Ferramentas para realizar a mineração de argumentos.',
    tooltip: tooltipsPlaceholder.modelo,
    icon: stepIcons.model,
    verMaisLink: '/eixos/mineracaoArgumentos',
  },
  {
    chave: 'visualizacaoDiscussoes',
    titulo: 'Visualizações',
    descricao: 'Formas de visualizar os resultados da análise.',
    tooltip: tooltipsPlaceholder.visualizacao,
    icon: stepIcons.visualization,
    verMaisLink: '/eixos/visualizacaoDiscussoes',
  },
];

const JornadaPage: React.FC = () => {
  const [itensPorEixo, setItensPorEixo] = useState<Record<string, IConteudoEixo[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEixos = async () => {
      try {
        const resultados = await Promise.all(
          secoes.map(async (secao) => {
            const url = dataUrls.eixos[secao.chave];
            const data = await loadArrayData<IConteudoEixo>(url);
            return [secao.chave, data] as const;
          })
        );

        const mapa: Record<string, IConteudoEixo[]> = {};
        resultados.forEach(([chave, data]) => {
          mapa[chave] = data || [];
        });
        setItensPorEixo(mapa);
      } catch (err) {
        console.error('Erro ao carregar dados dos eixos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEixos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* ===================== CABEÇALHO ===================== */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Laboratório Heiwa
          </h1>
          <InfoTooltip text={tooltipsPlaceholder.intro} size={20} />
        </div>

        <p className="text-xl text-gray-600 max-w-3xl">
          Explore os recursos disponíveis em cada etapa da sua análise.
        </p>

        {/* Texto introdutório explicativo */}
        {/* PENDENTE: substituir pelo texto definitivo da professora Renata */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-800">
              Sobre este Laboratório:
            </span>{' '}
            <span className="italic text-gray-500">
              [TEXTO PENDENTE]
            </span>
          </p>
        </div>
      </div>

      {/* ===================== SEÇÕES ===================== */}
      {secoes.map((secao) => {
        const itens = itensPorEixo[secao.chave] || [];

        return (
          <section key={secao.chave} className="mb-16">
            {/* Cabeçalho da seção com tooltip ao lado do título */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <img src={secao.icon} alt={secao.titulo} className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {secao.titulo}
              </h2>
              <InfoTooltip text={secao.tooltip} size={18} />
            </div>
            <p className="text-gray-600 mb-6">{secao.descricao}</p>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-800">
              Sobre este Laboratório:
            </span>{' '}
            <span className="italic text-gray-500">
              [TEXTO PENDENTE]
            </span>
          </p>
        </div>

            {/* Slider */}
            {itens.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Nenhum item disponível.
              </p>
            ) : (
              <CarouselSlider
                data={itens}
                CardComponent={EixoCard}
                viewMoreLink={secao.verMaisLink}
                title={secao.titulo}
              />
            )}
          </section>
        );
      })}
    </div>
  );
};

export default JornadaPage;