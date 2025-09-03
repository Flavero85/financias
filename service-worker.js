// Define o nome e a versão do cache
const CACHE_NAME = 'financeiro-pro-cache-v1';
// Lista de arquivos essenciais para o funcionamento offline
const urlsToCache = [
  '.', // O diretório raiz
  'index.html',
  'dicas.html',
  'relatorio.html'
  // Adicione aqui os caminhos para os ícones quando os tiver, ex: 'icon-192x192.png'
];

// Evento de instalação: é disparado quando o Service Worker é instalado
self.addEventListener('install', event => {
  // Aguarda até que a promessa dentro de waitUntil seja resolvida
  event.waitUntil(
    // Abre o cache com o nome definido
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        // Adiciona todos os arquivos da lista ao cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: é disparado para cada requisição feita pela página
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar uma resposta para a requisição no cache
    caches.match(event.request)
      .then(response => {
        // Se encontrar uma resposta no cache, a retorna
        if (response) {
          return response;
        }
        // Se não encontrar, faz a requisição à rede
        return fetch(event.request);
      }
    )
  );
});
