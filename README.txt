NytrinA Travian Companion 3.0.3

Correções:
- Relatório agora reconhece coordenadas com sinal unicode de menos, ex: (65|−11).
- Recursos ganhos agora somam:
  saque normal do Prêmio
  + recursos adicionais do herói.
- Reimportar o mesmo relatório agora atualiza o registro em vez de ignorar.
- Economia recalcula agregados após reimportar.

Exemplo esperado:
Prêmio: 187 + 187 + 741 + 742 = 1857
Extra herói: 2240 x 4 = 8960
Total ganho: 10817
Perda: 7000
Lucro: 3817

--------------------------------------------------
Arquitetura v4.0 (modular + build unico Tampermonkey)
--------------------------------------------------

Estrutura principal:

src/
  parser/
    mapParser.js
    oasisParser.js
    reportParser.js
  core/
    scanner.js
    ranking.js
    economy.js
    battleAI.js
    storage.js
    server.js
    utils.js
  ui/
    overlay.js
    tabs.js
    modal.js
    styles.css
  data/
    animals.js
    troops.js
    servers.js
    constants.js
  main.js

build/
  build.js

Geracao do userscript:

1) Executar build:
   node .\build\build.js

2) Arquivo final gerado:
   nytrina.user.js

3) Instalar no Tampermonkey normalmente.

Notas de design da v4:

- Persistencia principal em IndexedDB (stores: OASIS, REPORTS, SETTINGS, STATISTICS, HISTORY).
- Base separada por host de servidor para nao misturar dados entre mundos.
- Parser de oasIs e parser de relatorio desacoplados.
- Leitura de animais por icone (u31..u40).
- Leitura de recursos por celulas de tabela com icones de recurso.
- Overlay em componentes (Dashboard, Scanner, Ranking, Relatorios, Economia, Configuracoes, Debug oculto).

--------------------------------------------------
Como utilizar o script
--------------------------------------------------

Requisitos:

- Navegador com extensao Tampermonkey instalada.
- Node.js (somente para gerar o arquivo final via build).

Instalacao (desenvolvimento/build):

1) Abra a pasta do projeto.
2) Execute:
  node .\build\build.js
3) O arquivo final sera gerado como:
  nytrina.user.js
4) No Tampermonkey, use a opcao para criar/importar script e cole o conteudo de nytrina.user.js.
5) Salve e habilite o script.

Instalacao (uso direto):

1) Se nytrina.user.js ja estiver pronto, abra esse arquivo.
2) Copie o conteudo para um novo script no Tampermonkey.
3) Salve e habilite.

Como usar no Travian:

1) Acesse o mapa ou um relatorio de combate no Travian.
2) O painel NytrinA Companion aparece no canto superior direito.
3) Aba Scanner:
  - Passe o mouse no oasis ou abra a janela do oasis.
  - Clique em "Escanear agora" para forcar leitura.
  - O script salva apenas quando detecta mudanca real (evita duplicados).
4) Aba Relatorios:
  - Abra um relatorio de ataque a oasis.
  - Clique em "Importar relatorio".
  - O parser calcula recursos, perdas, lucro e XP.
5) Aba Economia:
  - Consulte lucro liquido, lucro/h, lucro/min, XP/h, recursos/h, perdas e ROI.
6) Aba Configuracoes:
  - Ajuste servidor, tipo de tropa, tribo, velocidade personalizada, mapa pequeno e idioma.
  - Clique em salvar para persistir no IndexedDB.

Debug:

- A aba Debug e oculta por padrao.
- Clique 5 vezes no titulo "NytrinA Companion 4.0" para habilitar.
- Use para visualizar JSON completo do parser e facilitar diagnostico.

Observacoes:

- Os dados sao separados por host (servidor) automaticamente.
- Se mudar de mundo/host, o script cria base independente para esse host.
