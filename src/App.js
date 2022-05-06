import { useState } from "react";
import axios from "axios";


import './App.css'

export const App = () => {
  const [link, setLink] = useState();
  const [metodo, setMetodo] = useState(null);
  const [headerTitle, setHeaderTitle] = useState();
  const [headerContent, setHeaderContent] = useState();
  const [body, setBody] = useState();
  const [resultado, setResultado] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    metodo === "DELETE" ?

      axios(
        {
          method: `${metodo}`,
          url: `${link}`,
          headers: {
            [`${headerTitle}`]: `${headerContent}`,
            "Content-Type": "application/json"
          },
        }
      ).then(data => setResultado(data.data)).catch(err => setResultado(err))
      :
      axios(
        {
          method: `${metodo}`,
          url: `${link}`,
          headers: {
            [`${headerTitle}`]: `${headerContent}`,
            "Content-Type": "application/json"
          },
          data: `${body}`
        }
      ).then(data => setResultado(data.data)).catch(err => setResultado(err))


  }

  return (
    <main>
      <h1>Labeman</h1>
      <form onSubmit={handleSubmit} >
        <label htmlFor="link-endpoint">Link do endpoint</label>
        <input type="text" id="link-endpoint" onChange={(e) => setLink(e.target.value)} />
        <label htmlFor="metodo-endpoint">Método</label>
        <select onChange={(e) => setMetodo(e.target.value)} type="checkbox" id="metodo-endpoint">
          <option value='' >Selecione um método</option>
          <option value='GET'>GET</option>
          <option value='POST'>POST</option>
          <option value='PUT'>PUT</option>
          <option value='PATCH'>PATCH</option>
          <option value='DELETE'>DELETE</option>
        </select>
        <label htmlFor="header-title">Titulo do header</label>
        <input onChange={(e) => setHeaderTitle(e.target.value)} type="text" id="header-title" />
        <label htmlFor="header-content">Conteúdo do header</label>
        <input onChange={(e) => setHeaderContent(e.target.value)} type="text" id="header-content" />
        {metodo === 'GET' || metodo === 'DELETE' || metodo === '' ? (
          <></>
        ) : (<>
          <label htmlFor="body">Corpo da requisição</label>
          <textarea onChange={(e) => setBody(e.target.value)} type='' id="body" />
        </>)}
        <button disabled={metodo === ''} type="submit" >Fazer requisição</button>

      </form>

      <pre>
        <code id="caixa-resultado" >{JSON.stringify(resultado, null, 4)}</code>
      </pre>

    </main>
  );
}

export default App;


