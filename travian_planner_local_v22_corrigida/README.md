
# Travian Planner Local

Como usar:

1. Extraia o ZIP.
2. Abra o arquivo `index.html` no navegador.
3. Marque as etapas conforme for fazendo.
4. Use o botão `+ Nova aldeia` quando fundar outra aldeia.
5. Use `Exportar save` para salvar um backup em JSON.

Observação:
- O progresso fica salvo no localStorage do navegador.
- Se trocar de navegador/computador, exporte e importe o save JSON.


## Versão 2
- Ordem de construção e tarefas diárias lado a lado.
- Cada painel tem scroll próprio.
- Pontuação diária fica visível ao lado enquanto você segue os passos.


## Versão 3
- Adicionada Calculadora do Herói: Atacar vs Produzir.
- Calcula recursos do oásis, produção sacrificada, saldo e recomendação.
- Considera modo de produção em 1 recurso ou todos os recursos.
- Considera bônus de produção +25%.


## Versão 4 corrigida
- Corrigida perda dos registros da ordem de construção.
- Diárias agora usam seletor 0/max preservando compatibilidade com save antigo.
- Adicionada flag real em checkbox: Mapa Pequeno (+30% retorno).
- Calculadora mostra item usado, volta calculada, vida perdida e recursos por 1% de vida.


## Versão 5
- Calculadora agora aceita tempo copiado do Travian no formato HH:MM:SS, exemplo: 2:30:04.
- A volta base é calculada automaticamente igual à ida.
- Se marcar Mapa Pequeno, somente a volta recebe +30% velocidade.


## Versão 6
- Adicionado campo visível de Tempo Total na calculadora.


## Versão 7
- Adicionada calculadora de perdas de tropas romanas.
- Desconta Legionário, Pretoriano, Imperiano, Equites Legati, EI e EC mortos.
- Resultado agora mostra lucro líquido real: recursos do oásis - produção sacrificada - tropas mortas.
- Mostra ROI sobre tropas e detalhe de custo por unidade perdida.


## Versão 8
- Adicionado parser para colar exército/perdas do Travian.
- Interpreta 11 colunas romanas: Legionário, Pretoriano, Imperiano, EL, EI, EC, Aríete, Catapulta, Senador, Colonizador, Herói.
- Pode interpretar como exército atual ou preencher automaticamente perdas de tropas.
- Mostra custo total e consumo/h do bloco interpretado.


## Versão 9
- Reorganização estrutural com menu superior.
- Abas: Dashboard, Aldeias, Diárias, Herói, Fundação e Config.
- Calculadora do Herói movida para a aba Herói.
- Ordem de construção movida para a aba Aldeias.
- Diárias e rotação de recompensas movidas para a aba Diárias.
- Dashboard ganhou próximo passo automático.


## Versão 10
- Adicionada opção: considerar tropas da enfermaria como perda.
- Ao interpretar perdas, se houver duas linhas negativas no relatório, o Planner soma mortos + enfermaria.
- O resultado mostra modo de interpretação e quantas linhas foram usadas.


## Versão 11
- Ao interpretar perdas, o Planner também tenta preencher madeira/barro/ferro/cereal usando os 4 recursos do relatório.
- Mensagem de ROI foi trocada por texto mais didático: retorno das tropas e resultado só das tropas.


## Versão 12
- Explicação da base de produção do herói ficou mais clara.
- Adicionada estimativa de XP do herói com base nos animais mortos no bloco Defensor.
- Mostra detalhamento: animal morto x XP estimado.


## Versão 13
- XP passou a ser exibida como XP provável, não como valor exato.
- Adicionado fator de ajuste de XP, padrão 0.72, calibrado pelo relatório real do usuário.
- Mostra XP bruta pela tabela, XP provável, XP/hora e XP por 1% de vida.


## Versão 14
- Adicionado campo para renomear a aldeia ativa no Dashboard e na aba Aldeias.
- Checkboxes da ordem de construção aumentados.
- Agora dá para clicar na linha inteira da etapa para marcar/desmarcar.
- Etapa concluída fica destacada em verde e riscada.
- Abas das aldeias ficaram maiores para nomes como M - Osgiliath.


## Versão 15
- Dashboard agora mostra pendências por ordem original, não apenas a próxima etapa.
- Se você pular etapas, ele lista as pendentes corretamente.
- Clique em uma pendência para abrir a aba Aldeias e destacar a linha.
- Trocar aldeia pelas abas atualiza Dashboard, nome, progresso, pendências, config e listas.
- Dashboard mostra aldeia ativa.


## Versão 16
- Mantida estimativa de XP por valores dos animais, sem fator global.
- Removida dependência do fator 0.72 na interface.
- Importação de JSON agora valida se existe lista de aldeias e avisa erro.
- Pequenos refinamentos visuais para nomes grandes de aldeias.


## Versão 17
- Tabela de XP dos animais corrigida e validada com os relatórios reais.
- Rato, Aranha, Cobra, Morcego = 1 XP.
- Javali, Lobo = 2 XP.
- Urso, Crocodilo, Tigre = 3 XP.
- Elefante = 5 XP.
- Mantida a estimativa por valor fixo de animal, sem fator global.


## Versão 18
- Adicionado Simulador de Ferreiro.
- Permite cadastrar ou colar exército romano.
- Calcula ataque base, bônus por nível, ataque melhorado e ganho estimado.
- Percentual por nível editável, padrão 1.2%.


## Versão 19
- Simulador de Ferreiro agora mostra o ganho equivalente em tropas.
- Exemplo: bônus do ferreiro equivale a +X Imperianos/EI/EC.
- Mostra também quanto o último nível do ferreiro adicionou isoladamente.


## Versão 20
- Adicionado Planejador de Evolução do Herói.
- Você informa XP atual e XP do próximo nível.
- Ao colar um relatório de oásis, o Planner mostra:
  - XP do oásis
  - XP após ataque
  - se o herói upa ou não
  - XP que sobra ou falta
  - ataques iguais necessários
  - equivalência em animais para o XP restante


## Versão 21
- Adicionado total de animais detectados no relatório.
- Classificação automática do oásis:
  - Pequeno: menos de 80 animais
  - Médio: 80 a 149 animais
  - Grande: 150+ animais
- Total de animais aparece na calculadora, no painel de evolução do herói e no resultado do parser.
- Mantido apenas Mapa Pequeno para ajuste de volta, pois botas/montaria já entram no tempo copiado do Travian.


## Versão 22
- Melhorias mobile/responsivas.
- Menu superior com rolagem horizontal mais confortável.
- Cards e calculadoras viram 1 coluna no celular.
- Botões e inputs maiores para toque.
- Área de colar relatório maior.
- Tabelas com scroll horizontal controlado.
- Checkboxes da ordem de construção ainda maiores no mobile.
