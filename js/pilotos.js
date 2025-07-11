// Quando a página carregar, chama a função para mostrar os pilotos
document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderPilots();
});

// Carrega os dados dos pilotos e exibe na tela
async function loadAndRenderPilots() {
    try {
        // Busca o JSON com os dados
        const response = await fetch('data/pilots.json');

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados dos pilotos: ${response.statusText}`);
        }

        // Converte para objeto JavaScript
        const pilotsData = await response.json();

        // Seleciona onde os pilotos serão exibidos
        const pilotsList = document.querySelector('.pilots-list');

        // Cria e adiciona cada item da lista
        pilotsData.forEach((pilot, index) => {
            const pilotListItem = createPilotListItem(pilot, index);
            pilotsList.appendChild(pilotListItem);
        });

    } catch (error) {
        // Mostra erro no console e na interface, se necessário
        console.error('Erro ao carregar ou renderizar os pilotos:', error);

        const main = document.querySelector('main');
        if (main) {
            const errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Não foi possível carregar os dados dos pilotos. Tente novamente mais tarde.';
            main.prepend(errorMessage);
        }
    }
}

/**
 * Cria um item da lista (<li>) com os dados do piloto.
 * @param {Object} pilot - Dados do piloto.
 * @param {number} index - Posição na lista (para aplicar estilos alternados).
 * @returns {HTMLElement} - Elemento <li> pronto.
 */
function createPilotListItem(pilot, index) {
    const listItem = document.createElement('li');
    listItem.classList.add('pilot');

    // Adiciona classe extra para linhas alternadas
    if (index % 2 !== 0) {
        listItem.classList.add('even');
    }

    // Cria célula com nome e conteúdo (pode ser texto ou elemento)
    const createPilotCell = (dataName, content) => {
        const div = document.createElement('div');
        div.classList.add('pilot-cell');
        div.setAttribute('data-name', dataName);

        if (typeof content === 'string') {
            div.innerHTML = content;
        } else {
            div.appendChild(content);
        }

        return div;
    };

    // Adiciona a imagem do piloto
    const img = document.createElement('img');
    img.src = pilot.image;
    img.alt = pilot.name;
    listItem.appendChild(createPilotCell('Foto', img));

    // Adiciona as outras informações
    listItem.appendChild(createPilotCell('Nome do Piloto', pilot.name));
    listItem.appendChild(createPilotCell('Equipe', pilot.team));
    listItem.appendChild(createPilotCell('Nacionalidade', pilot.nationality));
    listItem.appendChild(createPilotCell('GPs Vencidos', pilot.gpsWon.toString()));
    listItem.appendChild(createPilotCell('GP Favorito', pilot.favoriteGp));
    listItem.appendChild(createPilotCell('Mundiais Vencidos', pilot.worldTitles.toString()));

    return listItem;
}
