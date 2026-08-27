// src/pages/JornadaPage.tsx
import React, { useState } from 'react';

// --- Dados Fictícios (Estrutura para fácil substituição futura) ---

const datasets = [
  {
    id: 'ds1',
    name: 'Tweets 8/Jan/2023',
    description: 'Base de dados destinada à análise de discussões relacionadas aos eventos de 8 de janeiro.',
    format: 'CSV',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173104-removebg-preview.png?updatedAt=1787863318635',
  },
  {
    id: 'ds2',
    name: 'Debates políticos',
    description: 'Conjunto de dados para análise de argumentos e relações presentes em debates políticos.',
    format: 'CSV',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173104-removebg-preview.png?updatedAt=1787863318635',
  },
  {
    id: 'ds3',
    name: 'Dataset de demonstração',
    description: 'Base de exemplo utilizada para demonstrar a jornada de análise.',
    format: 'CSV',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173104-removebg-preview.png?updatedAt=1787863318635',
  },
];

const models = [
  {
    id: 'm1',
    name: 'Argument Mining Model A',
    description: 'Mineração de argumentos',
    purpose: 'mineração de argumentos',
    language: 'Python',
    inputFormat: 'CSV',
    outputFormat: 'dados estruturados',
    version: '1.0',
    repo: '#',
    docs: '#',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173513-removebg-preview.png?updatedAt=1787863318724',
  },
  {
    id: 'm2',
    name: 'Argument Mining Model B',
    description: 'Identificação de relações argumentativas',
    purpose: 'identificação de relações argumentativas',
    language: 'Python',
    inputFormat: 'CSV / JSON',
    outputFormat: 'JSON',
    version: '0.9',
    repo: '#',
    docs: '#',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173513-removebg-preview.png?updatedAt=1787863318724',
  },
];

const visualizations = [
  {
    id: 'v1',
    name: 'Rede de argumentos',
    description: 'Visualização das relações entre argumentos e participantes de uma discussão.',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_174110-removebg-preview.png?updatedAt=1787863318745',
  },
  {
    id: 'v2',
    name: 'Mapa de relações',
    description: 'Representação visual das conexões identificadas nos dados.',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_174110-removebg-preview.png?updatedAt=1787863318745',
  },
  {
    id: 'v3',
    name: 'Timeline',
    description: 'Visualização da evolução das discussões ao longo do tempo.',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_174110-removebg-preview.png?updatedAt=1787863318745',
  },
  {
    id: 'v4',
    name: 'Dashboard',
    description: 'Painel para exploração de diferentes métricas e resultados.',
    icon: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_174110-removebg-preview.png?updatedAt=1787863318745',
  },
];

// Ícones para as etapas (placeholders - você substituirá pelas URLs reais)
const stepIcons = {
  dataset: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173104-removebg-preview.png',
  model: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173513-removebg-preview.png',
  visualization: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_174110-removebg-preview.png',
  preparation: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_173549-removebg-preview.png?updatedAt=1787863318102',
  share: 'https://ik.imagekit.io/csktgzt59/Heiwa%20IMG/New%20Folder/icones%20mvp2/Captura_de_tela_2026-08-27_174904-removebg-preview.png',
};

// --- Componente Principal ---

const JornadaPage: React.FC = () => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>('ds1');
  const [selectedModelId, setSelectedModelId] = useState<string | null>('m1');
  const [selectedVisualizationId, setSelectedVisualizationId] = useState<string | null>('v1');

  const handleSelectDataset = (id: string) => {
    setSelectedDatasetId(id);
  };

  const handleSelectModel = (id: string) => {
    setSelectedModelId(id);
  };

  const handleSelectVisualization = (id: string) => {
    setSelectedVisualizationId(id);
  };

  const selectedDataset = datasets.find(ds => ds.id === selectedDatasetId);
  const selectedModel = models.find(m => m.id === selectedModelId);
  const selectedVisualization = visualizations.find(v => v.id === selectedVisualizationId);

  // Definindo quais etapas estão ativas/visualizadas
  const activeSteps = {
    dataset: true,
    model: true,
    visualization: true,
    preparation: true,
    share: true,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Cabeçalho da Página */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Jornada do Pesquisador
        </h1>
        <p className="text-xl text-gray-600">Escolha os recursos necessários para realizar sua análise.</p>
      </div>

      {/* Indicador de Progresso Visual com Ícones */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-12">
        {/* Etapa 1 - Dataset */}
        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            activeSteps.dataset 
              ? 'bg-green-100 text-green-800 border-2 border-green-500' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            <img src={stepIcons.dataset} alt="Dataset" className="w-5 h-5" />
            <span className="font-medium">Dataset</span>
          </div>
        </div>

        <span className="text-gray-400 text-xl">→</span>

        {/* Etapa 2 - Modelo */}
        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            activeSteps.model 
              ? 'bg-green-100 text-green-800 border-2 border-green-500' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            <img src={stepIcons.model} alt="Modelo" className="w-5 h-5" />
            <span className="font-medium">Modelo</span>
          </div>
        </div>

        <span className="text-gray-400 text-xl">→</span>

        {/* Etapa 3 - Visualização */}
        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            activeSteps.visualization 
              ? 'bg-green-100 text-green-800 border-2 border-green-500' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            <img src={stepIcons.visualization} alt="Visualização" className="w-5 h-5" />
            <span className="font-medium">Visualização</span>
          </div>
        </div>

        <span className="text-gray-400 text-xl">→</span>

        {/* Etapa 4 - Preparação */}
        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            activeSteps.preparation 
              ? 'bg-green-100 text-green-800 border-2 border-green-500' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            <img src={stepIcons.preparation} alt="Preparação" className="w-5 h-5" />
            <span className="font-medium">Download</span>
          </div>
        </div>

        <span className="text-gray-400 text-xl">→</span>

        {/* Etapa 5 - Compartilhar */}
        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            activeSteps.share 
              ? 'bg-green-100 text-green-800 border-2 border-green-500' 
              : 'bg-gray-100 text-gray-500'
          }`}>
            <img src={stepIcons.share} alt="Compartilhar" className="w-5 h-5" />
            <span className="font-medium">Compartilhar</span>
          </div>
        </div>
      </div>

      {/* ETAPA 01: Dataset */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <img src={stepIcons.dataset} alt="Dataset" className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dataset</h2>
        </div>
        <p className="text-gray-600 mb-6">Escolha uma base disponível para iniciar sua análise.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {datasets.map((ds) => (
            <div
              key={ds.id}
              onClick={() => handleSelectDataset(ds.id)}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${
                selectedDatasetId === ds.id
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-green-100 rounded-lg flex items-center justify-center">
                  <img src={ds.icon} alt="" className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800">{ds.name}</h3>
                    {selectedDatasetId === ds.id && (
                      <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">Selecionado</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{ds.description}</p>
                  <p className="text-xs text-gray-400 mt-3">Formato: {ds.format}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ETAPA 02: Modelo de mineração */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <img src={stepIcons.model} alt="Modelo" className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Modelo de mineração</h2>
        </div>
        <p className="text-gray-600 mb-6">Escolha uma ferramenta para realizar a mineração de argumentos.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => handleSelectModel(model.id)}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${
                selectedModelId === model.id
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-green-100 rounded-lg flex items-center justify-center">
                  <img src={model.icon} alt="" className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800">{model.name}</h3>
                    {selectedModelId === model.id && (
                      <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">Selecionado</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{model.description}</p>
                  <ul className="text-sm text-gray-600 mt-3 space-y-1">
                    <li><span className="font-medium">Finalidade:</span> {model.purpose}</li>
                    <li><span className="font-medium">Linguagem:</span> {model.language}</li>
                    <li><span className="font-medium">Entrada:</span> {model.inputFormat}</li>
                    <li><span className="font-medium">Saída:</span> {model.outputFormat}</li>
                    <li><span className="font-medium">Versão:</span> {model.version}</li>
                  </ul>
                  <div className="mt-4 flex gap-4 text-sm">
                    <a href={model.repo} className="text-green-600 hover:text-green-700 hover:underline font-medium">Repositório</a>
                    <a href={model.docs} className="text-green-600 hover:text-green-700 hover:underline font-medium">Documentação</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ETAPA 03: Visualização */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <img src={stepIcons.visualization} alt="Visualização" className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Visualização</h2>
        </div>
        <p className="text-gray-600 mb-6">Escolha como deseja visualizar os resultados da análise.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visualizations.map((vis) => (
            <div
              key={vis.id}
              onClick={() => handleSelectVisualization(vis.id)}
              className={`cursor-pointer border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${
                selectedVisualizationId === vis.id
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <img src={vis.icon} alt="" className="w-10 h-10" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-lg font-semibold text-gray-800">{vis.name}</h3>
                    {selectedVisualizationId === vis.id && (
                      <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">✓</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{vis.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ETAPA 04: Preparar minha análise */}
      <section className="mb-16 bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <img src={stepIcons.preparation} alt="Preparação" className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Preparar minha análise</h2>
        </div>
        <p className="text-gray-600 mb-6">Confira os recursos escolhidos para sua análise.</p>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Sua jornada</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <img src={stepIcons.dataset} alt="Dataset" className="w-6 h-6" />
              <div>
                <span className="font-medium text-gray-700">Dataset:</span>
                <span className="ml-2 text-gray-800">{selectedDataset?.name || 'Nenhum selecionado'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <img src={stepIcons.model} alt="Modelo" className="w-6 h-6" />
              <div>
                <span className="font-medium text-gray-700">Modelo:</span>
                <span className="ml-2 text-gray-800">{selectedModel?.name || 'Nenhum selecionado'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <img src={stepIcons.visualization} alt="Visualização" className="w-6 h-6" />
              <div>
                <span className="font-medium text-gray-700">Visualização:</span>
                <span className="ml-2 text-gray-800">{selectedVisualization?.name || 'Nenhum selecionado'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg">
            Baixar recursos
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors">
            Abrir documentação
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">ℹ️</span> O processamento dos dados será realizado no ambiente escolhido pelo pesquisador, utilizando os recursos escolhidos e disponibilizados pelo Projeto Heiwa nos passos anteriores.
          </p>
        </div>
      </section>

      {/* ETAPA 05: Compartilhe sua análise */}
      <section className="mb-8 bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <img src={stepIcons.share} alt="Compartilhar" className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Compartilhe sua análise</h2>
          <span className="bg-gray-300 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">Opcional</span>
        </div>
        <p className="text-gray-600 mb-6">
          Depois de realizar sua análise, você pode voltar aqui para compartilhar os resultados com a comunidade Heiwa.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg">
           Desejo Publicar resultado
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors">
            Não Desejo publicar resultado
          </button>
          
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">ℹ️</span> O compartilhamento é voluntário. Ao clicar em "Desejo Publicar resultado" será gerado um link para publicar futuramente, os resultados obtidos, contribuir em futuras pesquisas e para a comunidade científica.
          </p>
        </div>
      </section>
    </div>
  );
};

export default JornadaPage;