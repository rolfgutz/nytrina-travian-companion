NytrinA Travian Companion 4.1.0

BUILD E TESTES

Requisitos: Node.js e Tampermonkey.

Gerar o userscript:

    node .\build\build.js

Executar os testes:

    node --test .\tests\learning.test.js

O arquivo gerado e nytrina.user.js. Importe-o no Tampermonkey e habilite-o.

RECOMENDACOES

O Scanner oferece tres prioridades:

- Mais seguro: quantil p99, maior falha histórica + 1 e alvo estatístico de 95%.
- Equilibrado: quantil p75.
- Economico: quantil p50 e base teorica minima.

A calibracao e separada por tribo, tropa e presenca do heroi. O aprendizado por
oasis guarda observacoes por relatorio e usa quantis, para que uma batalha
extrema nao governe sozinha toda sugestao futura. Relatorios com mais de um tipo
de tropa nao treinam um perfil de tropa unica.

As estimativas ainda usam uma base teorica simplificada. Elas nao conhecem todos
os atributos da conta, como melhorias de ferraria, atributos do heroi e efeitos
especificos de versao. Trate a confianca como evidencia historica, nao como
garantia de resultado. Importe relatorios de combate para melhorar a calibracao.

TRANSFERIR DADOS ENTRE COMPUTADORES

1. Em Configuracoes, exporte o backup do servidor atual.
2. Mova o JSON baixado para backups/ no repositorio.
3. Mantenha o repositorio privado, pois o arquivo contem relatorios e dados da
   conta.
4. Sincronize o repositorio no outro computador e escolha Mesclar Backup.

A mesclagem preserva as configuracoes locais, adiciona relatorios e oasis que
faltam e sincroniza perfis estatisticos sem somar duas copias do mesmo snapshot.
Relatorios com aprendizado incompleto podem ser retomados sem duplicar amostras.
O host do backup precisa corresponder ao servidor aberto. Substituir por Backup
apaga os dados locais do servidor antes de importar.

Backups antigos continuam aceitos. Ao abrir um banco da versao anterior, o
programa cria marcadores de aprendizado para os relatorios ja refletidos nas
estatisticas. Fatores antigos sem uma base teorica recuperavel deixam de
influenciar novas sugestoes; as contagens de sucesso, falha e lucro permanecem.

MODULOS

- src/parser/: leitura de mapa, oasis e relatorios.
- src/core/: armazenamento, scanner, ranking, economia e aprendizado.
- src/ui/: painel, abas, notificacoes e estilos.
- src/data/: tropas, animais e configuracoes.
- build/build.js: concatena os modulos para o userscript.
