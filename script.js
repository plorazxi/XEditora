// Constante a seguir precisa definir para a execução normal
const IDbusca = '';
const chaveAPI = 'ca0de54a49d6977b45e9e6c8857ee028e996d04de7f95bcea9f1ada77bc99039';
const lingua = 'pt-br';
const segsEspera = 10; //em segundos

const { getJson } = require("serpapi");

function tratamento(caminho){
  fetch(caminho).then((response) => {
    response.json().then((dados) => {
      console.log(dados.organic_results)
    })
  })
}

function Busca(){
  let Busca;
  // Busca = document.getElementById(IDbusca).value;
  Busca = 'café';
  if (Busca.length == 0 || Busca == ' ') {
    alert("Erro!\nDigite algo no campo de pesquisa")
  } else {
    Busca += ' livro';
    // pagina indicadora de pesquisa
    setTimeout(() => { //função de verificar o tempo
      //função arrow para testar se chegou
    }, segsEspera*1000);
    getJson({
      api_key: chaveAPI,
      engine: "google_scholar",
      q: Busca,
      hl: lingua,
      num: "12"
    }, (json) => { 
      // função arrow para realizar o tratamento de dados
    });
  }
}

tratamento("result.json");