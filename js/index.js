// Quando a página carregar, executa a função para carregar e mostrar os cards
document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderCards();
});

/**
 * Busca os dados dos cards e os exibe na tela.
 */
async function loadAndRenderCards() {
    try {
        // Busca o arquivo JSON com os dados dos cards
        const response = await fetch('data/cards-data.json');

        // Se houver erro na resposta, lança uma exceção
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.statusText}`);
        }

        // Converte a resposta em objeto JavaScript
        const cardsData = await response.json();

        // Seleciona onde os cards serão colocados
        const cardsGrid = document.querySelector('.cards-grid');
        const infoGrid = document.querySelector('.info-grid');

        // Para cada card, cria o HTML e insere na seção correta
        cardsData.forEach(cardData => {
            const cardElement = createCardElement(cardData);

            if (cardData.section === 'cards-grid') {
                cardsGrid.appendChild(cardElement);
            } else if (cardData.section === 'info-grid') {
                infoGrid.appendChild(cardElement);
            }
        });

    } catch (error) {
        // Mostra erro no console e na interface, se necessário
        console.error('Erro ao carregar ou renderizar os cards:', error);
        
        const main = document.querySelector('main');
        if (main) {
            const errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Não foi possível carregar os cards. Tente novamente mais tarde.';
            main.prepend(errorMessage);
        }
    }
}

/**
 * Cria e retorna o HTML de um card com base nos dados recebidos.
 * @param {Object} data - Dados com título e conteúdo do card.
 * @returns {HTMLElement} - O card em HTML.
 */
function createCardElement(data) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Adiciona o título do card
    const h2 = document.createElement('h2');
    h2.innerHTML = data.title;
    cardDiv.appendChild(h2);

    // Adiciona o conteúdo (parágrafos ou lista)
    if (data.content && Array.isArray(data.content)) {
        if (data.content.length > 0 && data.content[0].type === 'paragraph') {
            data.content.forEach(item => {
                const p = document.createElement('p');
                p.innerHTML = item.text;
                cardDiv.appendChild(p);
            });
        } else if (data.content.length > 0 && data.content[0].type === 'listItem') {
            const ul = document.createElement('ul');
            data.content.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = item.text;
                ul.appendChild(li);
            });
            cardDiv.appendChild(ul);
        }
    }

    return cardDiv;
}
