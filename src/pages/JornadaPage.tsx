// src/pages/JornadaPage.tsx
import React, { useEffect, useState } from 'react';
import { loadArrayData } from '../services/dataLoader';
import { dataUrls } from '../config/dataUrls';
import type { IConteudoEixo } from '../types';
import LoadingCircle from '../components/ui/LoadingDots';
import CarouselSlider from '../components/ui/CarouselSlider';
import EixoCard from '../components/cards/EixoCard';

// --- ÍCONES DAS ETAPAS ---
const stepIcons = {
  dataset: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173104-removebg-preview.png',
  model: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173513-removebg-preview.png',
  visualization: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Gemini_Generated_Image_fayjg0fayjg0fayj__4_-removebg-preview.png',
};

// --- CONFIGURAÇÃO DAS SEÇÕES ---
interface SecaoConfig {
  chave: 'curadoria' | 'mineracaoArgumentos' | 'visualizacaoDiscussoes';
  titulo: string;
  descricao: string;
  icon: string;
  verMaisLink: string;
}

const secoes: SecaoConfig[] = [
  {
    chave: 'curadoria',
    titulo: 'Datasets',
    descricao: 'Explore bases de dados disponíveis com dados brutos ou anotados.',
    icon: stepIcons.dataset,
    verMaisLink: '/eixos/curadoria',
  },
  {
    chave: 'mineracaoArgumentos',
    titulo: 'Modelos e Ferramentas de Mineração de Argumentos',
    descricao:
      'Modelos e ferramentas disponíveis para a tarefa de mineração de argumentos em conteúdos de redes sociais.',
    icon: stepIcons.model,
    verMaisLink: '/eixos/mineracaoArgumentos',
  },
  {
    chave: 'visualizacaoDiscussoes',
    titulo: 'Ferramentas de Visualização de Argumentos',
    descricao: 'Ferramentas para visualizar os resultados da análise.',
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Laboratório Heiwa
        </h1>

        {/* Subtítulo atualizado (sugestão 1) */}
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore os recursos disponíveis para análise e visualização de argumentos em redes sociais.
        </p>

        {/* Texto introdutório (sugestão 2) */}
        <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl">
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Nesta página estão disponibilizados recursos desenvolvidos pelo projeto{' '}
            <span className="font-semibold">HEIWA</span> que apoiam as etapas principais
            de um processo de mineração e visualização de argumentos em redes sociais:
          </p>

          <ul className="text-sm text-gray-700 leading-relaxed space-y-2 mb-3 list-disc list-inside">
            <li>
              <span className="font-semibold">Curadoria:</span> datasets brutos ou
              anotados para treinamento de modelos de mineração de argumentos.
            </li>
            <li>
              <span className="font-semibold">Mineração de argumentos:</span> modelos
              e códigos que implementam soluções de mineração de argumentos.
            </li>
            <li>
              <span className="font-semibold">Visualização:</span> ferramentas e
              códigos desenvolvidos para apresentar visualizações da argumentação
              analisada.
            </li>
          </ul>

          <p className="text-sm text-gray-700 leading-relaxed">
            Para usar os recursos, você pode realizar o download dos itens que desejar,
            instalá-los e usá-los em seu ambiente individual de desenvolvimento ou execução.
          </p>
        </div>
      </div>

      {/* ===================== SEÇÕES ===================== */}
      {secoes.map((secao) => {
        const itens = itensPorEixo[secao.chave] || [];

        return (
          <section key={secao.chave} className="mb-16">
            {/* Cabeçalho da seção (sem tooltip, conforme sugestão) */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <img src={secao.icon} alt={secao.titulo} className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {secao.titulo}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">{secao.descricao}</p>

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