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

    for (let i = 0; i < values.length; i++) {
        let isRiscado = values[i].riscado ? "line-through" : "none";
        list.innerHTML += `<li style="text-decoration: ${isRiscado};">
                                ${values[i]['name']}
                                <div>
                                    <button id='btn-ok' onclick="riscarItem(${i})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                        </svg>
                                    </button>
                                    <button id='btn-remove' onclick="removeItem(${i})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5V6h2v9.5A1.5 1.5 0 0 1 11.5 17h-7A1.5 1.5 0 0 1 3 15.5V6h2v-.5zM4.118 4a1.5 1.5 0 0 1 1.415-1h5.934a1.5 1.5 0 0 1 1.415 1H15.5A1.5 1.5 0 0 1 17 5.5V6H3v-.5A1.5 1.5 0 0 1 4.118 4z"/>
                                        </svg>
                                    </button>
                                </div>
                            </li>`;
    }
}

function riscarItem(index) {
    // Obtemos o array de tarefas do localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    // Verifica se o item existe e alterna o estado de riscado
    if (values[index]) {
        values[index].riscado = !values[index].riscado;  // Alterna entre riscado e não riscado
        localStorage.setItem(localStorageKey, JSON.stringify(values));  // Salva a alteração no localStorage
    }

    // Atualiza a exibição da lista de tarefas
    showValues();
}


function removeItem(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    
    if (values[index]) {
        values.splice(index, 1);  // Remove o item do array
        localStorage.setItem(localStorageKey, JSON.stringify(values)); // Atualiza o localStorage
    }

    showValues();  // Atualiza a lista na página
}

    //chama a função que exibe a lista de valores armazenados no localStorage, atualizada
showValues();
