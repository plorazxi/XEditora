//constantes iniciais:
const IDbusca = ''; //a definir
const IDdivResultados = ''; //a definir
const IDPaginacao = ''; //a definir
const pagInicial = ''; //a definir
const pagResultados = ''; //a definir
const chaveAPI = 'ead182d061bbc092e9ddbad23aaaee2e3e345472154294182bdb764fcba87983'; //sujeito a alteração
const lingua = 'pt-br';
const segsEspera = 10; //em segundos
const msgTempEsg = 'Ops...\nPor algum motivo, sua pesquisa demorou muito, tente novamente mais tarde.';
const msgCampVazio = 'Erro!\nDigite algo no campo de pesquisa';

const { getJson } = require("serpapi");

//função para salvar o json no Client-Side e mudar para pagResultados:
function InitTratamento(json){
  localStorage.setItem('resultados', JSON.stringify(json.organic_results));
  localStorage.setItem('paginacao', JSON.stringify(json.serpapi_pagination));
  window.location = pagResultados;
}

//função para criar a pagina de resultados:
function Tratamento(){
  let divResultados = document.getElementById(IDdivResultados);
  //criação cada resultado:
  for(i=0; i<12; i++){
    let resultado = JSON.parse(localStorage.getItem('resultados'))[i];
    let CodHTML = ``; // Codigo para criar cada resultado
    divResultados.innerHTML += CodHTML;
  }
  //criação da paginação:
  let divPaginacao = document.getElementById(IDPaginacao);
  let paginas = JSON.parse(localStorage.getItem('paginacao'));
  CodHTML = ``; // Codigo para criar a paginacao --- OBS: vai chamar a função InitTratamento(link)
  divPaginacao.innerHTML += CodHTML;
}

function Busca() {
  let Busca;
  // Busca = document.getElementById(IDbusca).value;
  Busca = 'café';
  //verificação se o campo de busca está vazio:
  if (Busca.length == 0 || Busca == ' ') {
    alert(msgCampVazio);
  } else {
    Busca += ' livro';
    // pagina indicadora de pesquisa??
    //função de verificar o tempo:
    setTimeout(() => {
      if(localStorage.length == 0) {
        alert(msgTempEsg);
        window.location = pagInicial;
      }
    }, segsEspera * 1000);
    //chamada da API:
    getJson({
      api_key: chaveAPI,
      engine: "google_scholar",
      q: Busca,
      hl: lingua,
      num: "12"
    }, (json) => {
      InitTratamento(json);
    });
  }
}