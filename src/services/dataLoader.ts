/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/dataLoader.ts

import { getCachedData, setCacheData } from "./LocalStorageCache";

// ===== CONTROLE DE REQUISIÇÕES SIMULTÂNEAS =====
const pendingRequests = new Map<string, Promise<any>>();

/**
 * Chave de cache primária para dados de array
 */
const getArrayCacheKey = (url: string) => `array_cache_${url}`;

/**
 * Carrega um array de objetos JSON de uma URL, USANDO CACHE.
 * @param url A URL da API.
 * @param forceRefresh Se verdadeiro, ignora o cache local e faz a requisição de rede.
 * @returns Uma Promise que resolve com um array de T ou um array vazio.
 */
export const loadArrayData = async <T>(url: string, forceRefresh: boolean = false): Promise<T[]> => {
    const cacheKey = getArrayCacheKey(url);
    
    // 1. TENTAR CARREGAR DO CACHE (se não for forceRefresh)
    if (!forceRefresh) {
        const cachedData = getCachedData<T[]>(cacheKey);
        if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
            console.log(`✅ loadArrayData: [CACHE HIT] - ${url}`);
            return cachedData;
        }
        if (cachedData && cachedData.length === 0) {
            console.log(`⚠️ loadArrayData: [CACHE VAZIO] - ${url}, buscando da rede...`);
        }
    } else {
        console.log(`🔄 loadArrayData: [FORCE REFRESH] - ${url}`);
        // Limpa cache antigo antes de forçar refresh
        localStorage.removeItem(cacheKey);
    }
    
    // 2. PREVENIR REQUISIÇÕES SIMULTÂNEAS PARA A MESMA URL
    const requestKey = forceRefresh ? `${url}?force=${Date.now()}` : url;
    
    if (pendingRequests.has(requestKey)) {
        console.log(`⏳ loadArrayData: [REQUISIÇÃO PENDENTE] - Aguardando...`);
        return pendingRequests.get(requestKey) as Promise<T[]>;
    }
    
    // 3. FAZER A REQUISIÇÃO
    const fetchPromise = (async () => {
        try {
            // Adiciona timestamp para evitar cache do browser quando forceRefresh
            const finalUrl = forceRefresh 
                ? `${url}${url.includes('?') ? '&' : '?'}_t=${Date.now()}`
                : url;
            
            console.log(`🌐 loadArrayData: [FETCH] - ${finalUrl.substring(0, 100)}...`);
            
            const response = await fetch(finalUrl, {
                cache: forceRefresh ? 'no-store' : 'default',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            // Tenta fazer o parse do JSON
            let rawData;
            try {
                rawData = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (jsonError) {
                console.error(`❌ loadArrayData: Resposta não é JSON válido para ${url}`);
                // Tenta ler como texto para debug
                const textResponse = await response.text();
                console.error(`Resposta (primeiros 300 chars):`, textResponse.substring(0, 300));
                throw new Error(`API não retornou JSON válido. Verifique se o Google Apps Script está publicado corretamente.`);
            }
            
            // 4. NORMALIZAR OS DADOS (lida com diferentes formatos de resposta)
            let finalData: T[] = [];
            
            // Log para debug
            console.log(`📦 loadArrayData: Tipo de resposta:`, typeof rawData);
            console.log(`📦 loadArrayData: É array?`, Array.isArray(rawData));
            console.log(`📦 loadArrayData: Tem property 'data'?`, !!(rawData && rawData.data));
            
            // Caso 1: Formato com sucesso/erro (recomendado para o novo backend)
            if (rawData && rawData.success === false) {
                console.error(`❌ API retornou erro: ${rawData.error || 'Erro desconhecido'}`);
                throw new Error(rawData.error || 'Erro na API do Google Sheets');
            }
            
            // Caso 2: Formato padrão { data: [...] }
            if (rawData && rawData.data && Array.isArray(rawData.data)) {
                finalData = rawData.data as T[];
                console.log(`✅ Formato OBJETO.data: ${finalData.length} itens`);
            }
            // Caso 3: Array direto
            else if (Array.isArray(rawData)) {
                finalData = rawData as T[];
                console.log(`✅ Formato ARRAY direto: ${finalData.length} itens`);
            }
            // Caso 4: Objeto de erro (formato antigo)
            else if (rawData && rawData.error) {
                console.error(`❌ API retornou erro: ${rawData.error}`);
                throw new Error(rawData.error);
            }
            // Caso 5: Formato desconhecido
            else {
                console.warn(`⚠️ Formato inesperado:`, rawData);
                return [];
            }
            
            // Validação básica dos dados
            if (finalData.length > 0) {
                // Verifica se o primeiro item tem as propriedades esperadas
                const firstItem = finalData[0] as any;
                console.log(`📊 Primeiro item:`, {
                    id: firstItem?.id,
                    titulo: firstItem?.titulo?.substring(0, 30),
                    temImagem: !!firstItem?.imagemUrl,
                    temAcao: !!firstItem?.acaoUrl
                });
            }
            
            // 5. SALVAR NO CACHE
            if (finalData.length > 0) {
                setCacheData(cacheKey, finalData);
                console.log(`💾 Cache salvo: ${finalData.length} itens`);
            } else {
                console.warn(`⚠️ Dados vazios, não salvando em cache`);
            }
            
            return finalData;
            
        } catch (error) {
            console.error(`❌ Erro em loadArrayData:`, error);
            
            // Tenta usar cache antigo como fallback em caso de erro
            const oldCache = getCachedData<T[]>(cacheKey);
            if (oldCache && oldCache.length > 0) {
                console.log(`🔄 Usando cache antigo como fallback (${oldCache.length} itens)`);
                return oldCache;
            }
            
            return [];
        } finally {
            // Remove da lista de requisições pendentes
            pendingRequests.delete(requestKey);
        }
    })();
    
    // Armazena a promise pendente
    pendingRequests.set(requestKey, fetchPromise);
    
    return fetchPromise;
};

// =========================================================================================

/**
 * Chave de cache primária para dados de objeto único
 */
const getSingleObjectCacheKey = (url: string) => `object_cache_${url}`;

/**
 * Carrega um único objeto JSON de uma URL, USANDO CACHE.
 * @param url A URL da API.
 * @param forceRefresh Se verdadeiro, ignora o cache local e faz a requisição de rede.
 * @returns Uma Promise que resolve com um objeto T ou null.
 */
export async function loadSingleObjectData<T>(url: string, forceRefresh: boolean = false): Promise<T | null> {
    const cacheKey = getSingleObjectCacheKey(url);
    
    // 1. TENTAR CARREGAR DO CACHE
    if (!forceRefresh) {
        const cachedData = getCachedData<T>(cacheKey);
        if (cachedData) {
            console.log(`✅ loadSingleObjectData: [CACHE HIT] - ${url}`);
            return cachedData;
        }
    }
    
    // 2. PREVENIR REQUISIÇÕES SIMULTÂNEAS
    const requestKey = forceRefresh ? `${url}?force=${Date.now()}` : url;
    
    if (pendingRequests.has(requestKey)) {
        console.log(`⏳ loadSingleObjectData: [REQUISIÇÃO PENDENTE]`);
        return pendingRequests.get(requestKey) as Promise<T | null>;
    }
    
    const fetchPromise = (async () => {
        try {
            const finalUrl = forceRefresh 
                ? `${url}${url.includes('?') ? '&' : '?'}_t=${Date.now()}`
                : url;
            
            const response = await fetch(finalUrl, {
                cache: forceRefresh ? 'no-store' : 'default',
                headers: { 'Accept': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const rawData = await response.json();
            let finalObject: T | null = null;
            
            // Verifica erro
            if (rawData && rawData.success === false) {
                console.error(`❌ API retornou erro: ${rawData.error}`);
                return null;
            }
            
            // Normalização
            if (!Array.isArray(rawData) && rawData !== null && typeof rawData === 'object') {
                finalObject = rawData as T;
            } else if (Array.isArray(rawData) && rawData.length > 0) {
                console.warn(`⚠️ Recebeu array, pegando primeiro elemento`);
                finalObject = rawData[0] as T;
            } else {
                console.warn(`⚠️ Formato inesperado:`, rawData);
            }
            
            if (finalObject) {
                setCacheData(cacheKey, finalObject);
            }
            
            return finalObject;
            
        } catch (error) {
            console.error(`❌ Erro em loadSingleObjectData:`, error);
            const oldCache = getCachedData<T>(cacheKey);
            return oldCache || null;
        } finally {
            pendingRequests.delete(requestKey);
        }
    })();
    
    pendingRequests.set(requestKey, fetchPromise);
    return fetchPromise;
}

// ===== FUNÇÕES UTILITÁRIAS =====

/**
 * Limpa o cache para uma URL específica
 */
export const clearCacheForUrl = (url: string) => {
    const arrayKey = getArrayCacheKey(url);
    const objectKey = getSingleObjectCacheKey(url);
    localStorage.removeItem(arrayKey);
    localStorage.removeItem(objectKey);
    console.log(`🗑️ Cache limpo para: ${url}`);
};

/**
 * Limpa todo o cache do aplicativo
 */
export const clearAllCache = () => {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('array_cache_') || key.startsWith('object_cache_'))) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`🗑️ Cache completo limpo: ${keysToRemove.length} itens removidos`);
};