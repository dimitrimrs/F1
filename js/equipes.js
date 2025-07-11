// Quando a página carregar, chama a função para mostrar os cards das equipes
document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderTeams();
});

async function loadAndRenderTeams() {
    try {
        // Busca os dados do JSON das equipes
        const response = await fetch('data/teams.json');

        // Se a resposta não for ok, lança erro
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados das equipes: ${response.statusText}`);
        }

        // Converte os dados para objeto JavaScript
        const teamsData = await response.json();

        // Seleciona onde os cards das equipes serão colocados
        const teamsGrid = document.querySelector('.teams-grid');

        // Cria e adiciona um card para cada equipe
        teamsData.forEach(team => {
            const teamCardElement = createTeamCardElement(team);
            teamsGrid.appendChild(teamCardElement);
        });

    } catch (error) {
        // Mostra o erro no console e opcionalmente na interface
        console.error('Erro ao carregar ou renderizar as equipes:', error);

        const main = document.querySelector('main');
        if (main) {
            const errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Não foi possível carregar as informações das equipes. Tente novamente mais tarde.';
            main.prepend(errorMessage);
        }
    }
}

/**
 * Cria o card HTML de uma equipe.
 * @param {Object} team - Dados da equipe.
 * @returns {HTMLElement} - Elemento HTML do card.
 */
function createTeamCardElement(team) {
    const teamCardDiv = document.createElement('div');
    teamCardDiv.classList.add('team-card', team.id); // Classe base + classe específica

    // Header com logo e nome da equipe
    const teamHeaderDiv = document.createElement('div');
    teamHeaderDiv.classList.add('team-header');
    
    const logoImg = document.createElement('img');
    logoImg.src = team.logo;
    logoImg.alt = `${team.name} Logo`;
    teamHeaderDiv.appendChild(logoImg);
    
    const h2 = document.createElement('h2');
    h2.textContent = team.name;
    teamHeaderDiv.appendChild(h2);
    
    teamCardDiv.appendChild(teamHeaderDiv);

    // Lista de pilotos
    const teamDriversDiv = document.createElement('div');
    teamDriversDiv.classList.add('team-drivers');

    team.drivers.forEach(driver => {
        const driverDiv = document.createElement('div');

        const driverImg = document.createElement('img');
        driverImg.src = driver.image;
        driverImg.alt = `${driver.firstName} ${driver.lastName}`;
        driverDiv.appendChild(driverImg);

        const driverNameB = document.createElement('b');
        driverNameB.textContent = driver.firstName + ' ';

        const driverLastNameSpan = document.createElement('span');
        driverLastNameSpan.textContent = driver.lastName;

        driverNameB.appendChild(driverLastNameSpan);
        driverDiv.appendChild(driverNameB);

        teamDriversDiv.appendChild(driverDiv);
    });

    teamCardDiv.appendChild(teamDriversDiv);

    // Imagem do carro da equipe
    const carImageDiv = document.createElement('div');
    carImageDiv.classList.add('car-image');

    const carImg = document.createElement('img');
    carImg.src = team.carImage;
    carImg.alt = `Carro ${team.name}`;
    carImageDiv.appendChild(carImg);

    teamCardDiv.appendChild(carImageDiv);

    return teamCardDiv;
}
