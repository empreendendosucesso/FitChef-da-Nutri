# FitChef da Nutri 🥗

Uma experiência gourmet para criar receitas saudáveis instantaneamente.

## 🚀 Como Usar

Este é um aplicativo frontend simples que simula a geração de receitas saudáveis com base na sua entrada.
Basta digitar o nome de um prato saudável que você gostaria de criar e o FitChef fornecerá uma receita detalhada com ingredientes, instruções e macros.

### Funcionalidades:
-   **Geração de Receitas**: Insira um prato e receba uma receita "fit".
-   **Foco em Saúde**: Receitas elaboradas com ingredientes nutritivos.
-   **Exportar para PDF**: Salve suas receitas favoritas para acesso offline.

## ⚙️ Deploy no GitHub Pages

Para publicar seu aplicativo no GitHub Pages, siga estas etapas:

1.  **Crie um Secret `API_KEY` no GitHub**:
    *   Vá para o seu repositório no GitHub.
    *   Clique em **Settings** (Configurações).
    *   No menu lateral esquerdo, clique em **Secrets and variables** > **Actions**.
    *   Clique em **New repository secret** (Novo segredo do repositório).
    *   Nomeie o segredo como `API_KEY`.
    *   Cole sua chave de API do Gemini no campo "Secret value".
    *   Clique em **Add secret**.

2.  **Crie o arquivo de workflow**:
    *   Crie um arquivo chamado `.github/workflows/deploy.yml` na raiz do seu repositório com o conteúdo que foi fornecido (você já fez isso se seguiu as instruções).

3.  **Habilite o GitHub Pages**:
    *   Vá para o seu repositório no GitHub.
    *   Clique em **Settings** (Configurações).
    *   No menu lateral esquerdo, clique em **Pages**.
    *   Em "Source", selecione a opção **Deploy from a branch**.
    *   Em "Branch", selecione a branch `gh-pages` e a pasta `/ (root)`.
    *   Clique em **Save** (Salvar).

Após essas etapas, qualquer `push` para a branch `main` acionará o workflow de deploy, e seu aplicativo será publicado no GitHub Pages.

---
*Transformando ingredientes em saúde com Inteligência e Inspiração.*