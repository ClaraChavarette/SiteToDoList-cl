//centraliza toda a logica do site -obs.dados inseridos na lista estão sendo salvos no navegador, no proprio localStorage

//constante- nunca muda, é a chve do localStorage(que guarda os elementos)
const localStorageKey = 'to-do-list'

//função nova tarefa, iniciada quando clicar no botão criar nova tarefa
function newTask(){

    //variavel input, pega o input la no documento
    let input = document.getElementById("input-new-task")

    //validação
    if(!input.value){  //se não tiver nada escrito no input...
        alert("Digite algo para inserir na lista") //mostra essa menssagem
    }

    else{
        //incrementa no localStorage

        //criando a variavel values e o JSON.parse converte a string (salva no localStorage) em um array
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

        //coloca os valores do input dentro do array values
        values.push({
            name:input.value
        })

        //transformar o array em string, pois o local storage só armazena string
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }

    //apagar o que ta escrito depois que aperta para criar nota
    input.value = ''
}

function showValues(){   //função que exibe a lista de valores armazenados no localStorage
    //JSON.parse converte a string do array e se não tiver dados retorna um array vazio e obtem os dados no localStorage usando a chave localStorageKey
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    
    //pega a lista do HTML, onde exibe os itens
    let list = document.getElementById('to-do-list')

    //limpa o conteudo da lista para evitar duplicaçoes
    list.innerHTML = ""

    //percorre cada item do array values
    for(let i = 0; i< values.length; i++){
        //cada item do array, adiciona um novo valor em forma de item a lista html e colocava um botão check no final de cada um
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick="removeItem('${values[i]['name']}')" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg></button></li>`
    }
}


function removeItem(data){ //função remove item
    //obtem o item armazenado no localStorage com a chave localStorageKey e converte a string json em um array de objetos, se não tiver nada, usa um array vazio(padão)
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

    //encontra o indice do 1º elemento do array values, onde atributo name é = valor de data
    let index = values.findIndex(x => x.name == data)

    //remove o item do array na posição index
    values.splice(index, 1)

    //converte o array em string de volta e armazena a string atualizada no localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(values))

    //chama a função que exibe a lista de valores armazenados no localStorage, sem o item removido
    showValues();
}

    //chama a função que exibe a lista de valores armazenados no localStorage, atualizada
showValues();
