# ♻️ EcoPonto

Aplicação web para localizar e cadastrar pontos de coleta de materiais recicláveis, com mapa interativo, cadastro de pontos e suporte a PWA.

---

## 🚀 Funcionalidades

- 📍 Visualização de pontos de coleta no mapa (Leaflet)
- ➕ Cadastro de novos pontos de coleta
- 📱 Instale como PWA no seu dispositivo
- 🌐 Interface moderna com React, Bootstrap e TailwindCSS

---

## 🖥️ Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- [Bootstrap](https://getbootstrap.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Axios](https://axios-http.com/) (para consumo de API)
- [Node.js/Express](https://expressjs.com/) (opcional, se usar backend próprio)

---

## 📦 Instalação e Uso Local

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/SEU_USUARIO/Ecopoint_web.git
   cd Ecopoint_web
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Rode o frontend:**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **(Opcional) Rode o backend:**
   ```sh
   cd ../backend
   npm install
   npm run dev
   ```

5. **Acesse no navegador:**  
   [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deploy

- **Frontend:** Deploy automático na [Vercel](https://vercel.com/)
- **API:** Consome endpoint público em [https://ecoponto-api.vercel.app/api/ecopontos](https://ecoponto-api.vercel.app/api/ecopontos)

---

## 📝 Como cadastrar um ponto de coleta

1. Clique em **Adicionar Ponto de Coleta**
2. Preencha nome, latitude e longitude (ou use sua localização)
3. Clique em **Cadastrar**
4. O ponto será salvo e exibido no mapa!

---

## 📱 PWA

- Instale o app no seu dispositivo clicando em "Instalar" na barra do navegador ou no menu do navegador.
- Funciona offline e pode ser adicionado à tela inicial do celular.

---

## ⚠️ Observações

- **Banco de dados:** Não envie arquivos de banco ou credenciais para o repositório.
- **Chaves/API Keys:** Use variáveis de ambiente para proteger informações sensíveis.
- **CORS:** Se consumir APIs externas, garanta que o domínio do frontend está liberado.

---

## 🤝 Contribuição

Contribuições são bem-vindas!  
Abra uma issue ou envie um pull request.

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

<div align="center">
  Feito com 💚 por [Prof.Clodomilson Silva]
  Apoio [Prof. Freedson Medeiros]
</div>
