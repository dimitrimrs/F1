// Chave usada para salvar os dados da newsletter no localStorage
const LOCAL_STORAGE_KEY = 'f1WikiNewsletterSignups';

document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');

    // Escuta o envio do formulário
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleFormSubmit);
    }

    // Define o vídeo do YouTube no iframe
    const videoIframe = document.querySelector('.video-wrapper iframe');
    if (videoIframe) {
        videoIframe.src = "https://www.youtube.com/embed/HlJ5rQn1o_Q?si=rX16K12lVzE6z6n5";
    }
});

/**
 * Lida com o envio do formulário.
 * @param {Event} event - Evento de submit.
 */
function handleFormSubmit(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Pega os valores do formulário
    const formData = {
        nome: document.getElementById('nome').value.trim(),
        sobrenome: document.getElementById('sobrenome').value.trim(),
        pais: document.getElementById('pais').value.trim(),
        equipe: document.getElementById('equipe').value.trim(),
        piloto: document.getElementById('piloto').value.trim(),
        email: document.getElementById('email').value.trim()
    };

    // Verifica campos obrigatórios
    if (!formData.nome || !formData.sobrenome || !formData.pais || !formData.email) {
        alert('Preencha todos os campos obrigatórios (Nome, Sobrenome, País, E-mail).');
        return;
    }

    // Valida o e-mail
    if (!isValidEmail(formData.email)) {
        alert('Informe um e-mail válido.');
        return;
    }

    // Salva os dados localmente
    saveSignupData(formData);

    // Confirmação ao usuário
    alert('Obrigado por assinar nossa Newsletter! 🎉');

    // Limpa o formulário
    event.target.reset();
}

/**
 * Verifica se o e-mail é válido.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Salva os dados no localStorage.
 * @param {Object} newSignup
 */
function saveSignupData(newSignup) {
    let existingSignups = [];
    try {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
            existingSignups = JSON.parse(storedData);
            if (!Array.isArray(existingSignups)) {
                existingSignups = [];
            }
        }
    } catch (e) {
        console.error("Erro ao ler dados:", e);
        existingSignups = [];
    }

    // Adiciona novo dado com timestamp
    existingSignups.push({
        ...newSignup,
        timestamp: new Date().toISOString()
    });

    // Salva no localStorage
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingSignups));
        console.log("Dados salvos:", newSignup);
        console.log("Todos os cadastros:", JSON.stringify(existingSignups, null, 2));
    } catch (e) {
        console.error("Erro ao salvar:", e);
        alert('Erro ao salvar suas informações. Tente novamente.');
    }
}

// Visualiza todos os dados salvos no console
function viewAllSignups() {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
        console.log("Dados salvos:", JSON.parse(storedData));
    } else {
        console.log("Nenhum dado salvo.");
    }
}
