document.addEventListener('DOMContentLoaded', () => {
    // Quando a página carregar, chama a função para mostrar os circuitos
    loadAndRenderCircuits();
});

async function loadAndRenderCircuits() {
    try {
        // Faz a requisição para o arquivo JSON dos circuitos
        const response = await fetch('data/circuits.json');

        // Verifica se a resposta da requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados dos circuitos: ${response.statusText}`);
        }

        // Converte a resposta para JSON
        const circuitsData = await response.json();

        // Seleciona o contêiner onde os cartões dos circuitos serão inseridos
        const circuitsGrid = document.querySelector('.circuits-grid');

        // Itera sobre os dados dos circuitos e cria os elementos HTML para cada um
        circuitsData.forEach(circuit => {
            const circuitCard = createCircuitCard(circuit);
            circuitsGrid.appendChild(circuitCard);
        });

    } catch (error) {
        // Exibe um erro no console caso algo dê errado
        console.error('Erro ao carregar ou renderizar os circuitos:', error);
        // Opcional: Adicionar uma mensagem de erro na interface do usuário
        const main = document.querySelector('main');
        if (main) {
            const errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Não foi possível carregar as informações dos circuitos. Por favor, tente novamente mais tarde.';
            main.prepend(errorMessage);
        }
    }
}

/**
 * Cria um elemento <div> HTML para um cartão de circuito com base nos dados fornecidos.
 * @param {Object} circuit - Objeto contendo os dados de um circuito.
 * @returns {HTMLElement} O elemento <div> do cartão de circuito HTML.
 */
function createCircuitCard(circuit) {
    const card = document.createElement('div');
    card.classList.add('circuit-card');

    // Adiciona a classe 'current-calendar' se estiver no calendário de 2025
    if (circuit.in2025Calendar) {
        card.classList.add('current-calendar');
    } else {
        card.classList.add('historic'); // Mantém a classe 'historic' para circuitos não atuais
    }

    const h3 = document.createElement('h3');
    const link = document.createElement('a');
    link.href = circuit.link;
    link.target = "_blank"; // Abre em nova aba
    link.textContent = circuit.name;
    h3.appendChild(link);
    card.appendChild(h3);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('circuit-details');

    // Função auxiliar para criar parágrafos de detalhes
    const addDetail = (label, value) => {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = label + ': ';
        p.appendChild(strong);
        p.insertAdjacentText('beforeend', value);
        detailsDiv.appendChild(p);
    };

    addDetail('País', circuit.country);
    addDetail('Local', circuit.location);
    addDetail('Tipo', circuit.type);
    addDetail('GPs', circuit.gpsCount);

    card.appendChild(detailsDiv);

    return card;
}