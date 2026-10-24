# Convite de 15 anos – Maria Luiza

Site estático (HTML, CSS e JavaScript puros). Sem build, sem backend, sem chaves de API.

## Arquivos

```
index.html            página (capa + convite)
styles.css            estilos
script.js             abertura, contagem, .ics, WhatsApp, compartilhar  (CONFIG no topo)
assets/favicon.svg
assets/images/flores-topo.svg, flores-laterais.svg, flores-rodape.svg
assets/images/convite-social.png   prévia 1200x630 para apps de mensagem
```

Não há arquivo `CNAME` de propósito: ele só deve existir depois que o domínio for escolhido (passo 9).

## Ver localmente

Dê dois cliques em `index.html`. Ou, para simular a hospedagem: `python3 -m http.server` na pasta e abra `http://localhost:8000`.

## Dados pendentes

- **Horário da festa**: preencha `horario` em `script.js` (`CONFIG`). Vazio = não aparece.
- **Endereço por extenso**: preencha `enderecoExtenso`. O botão do mapa já usa o link informado.
- **URL pública**: troque `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/` nas 2 metatags `og:url` e `og:image` do `index.html` (precisa ser editada no HTML porque os aplicativos de mensagem não executam JavaScript) e, se quiser, preencha `siteUrl` em `script.js`. Os aplicativos podem manter a prévia antiga em cache por um tempo.

## Publicar no GitHub Pages

1. Crie uma conta e um repositório público (ex.: `convite-maria-luiza`) em github.com.
2. Envie todos os arquivos: **Add file > Upload files**, arraste o conteúdo da pasta (não a pasta em si) e faça o commit.
3. Em **Settings > Pages**, em *Build and deployment*, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/ (root)` e salve.
5. Após 1–2 minutos o endereço aparece no topo da mesma tela: `https://SEU-USUARIO.github.io/convite-maria-luiza/`. Todos os caminhos são relativos, então funciona nesse subdiretório e em domínio próprio.

## Domínio próprio (sugestão: marialuiza15.com.br)

A hospedagem no GitHub Pages pode ser gratuita dentro das condições do serviço. O domínio é pago (registro e renovação anuais) ao provedor. Este projeto não registrou nem verificou a disponibilidade de nenhum domínio.

6. Registre o domínio em um provedor (ex.: Registro.br para `.com.br`).
7. Em **Settings > Pages > Custom domain**, digite o domínio e salve.
8. No painel DNS do provedor, crie os registros conforme a documentação atual do GitHub (https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site): para domínio raiz, registros `A` (e opcionalmente `AAAA`) para os IPs do GitHub Pages; para `www`, um `CNAME` apontando para `SEU-USUARIO.github.io`. Confira os IPs na documentação, pois podem mudar.
9. Crie um arquivo `CNAME` na raiz do repositório contendo apenas o domínio (ex.: `marialuiza15.com.br`). O GitHub costuma criá-lo ao salvar o passo 7.
10. Aguarde o DNS propagar (pode levar horas) e marque **Enforce HTTPS** em Settings > Pages.
11. Teste no domínio final: imagens, botão do mapa, WhatsApp (mensagem preenchida), baixar `.ics`, compartilhar/copiar link, contagem e a prévia ao colar o link no WhatsApp. Atualize as metatags `og:` com o domínio definitivo.

## Observações

- A confirmação é feita pelo convidado no WhatsApp; o site não registra presenças.
- As fontes vêm do Google Fonts; se não carregarem, o site usa Georgia/fontes do sistema.
- Para alterar texto, data ou telefone, edite `index.html` e o `CONFIG` em `script.js`.
