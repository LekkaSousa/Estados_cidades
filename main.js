async function fetchStates() {
    try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const states = await response.json();
        populateStateSelect(states);
    } catch (error) {
        console.error("Erro ao buscar estados:", error);
    }
}

function populateStateSelect(states) {
    const stateSelect = document.getElementById("estadoSelect");
    states.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena os estados pelo nome

    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state.id;
        option.textContent = state.nome;
        stateSelect.appendChild(option);
    });
}

async function fetchCities() {
    const stateId = document.getElementById("estadoSelect").value;
    if (!stateId) return; // Retorna se nenhum estado for selecionado

    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
        const cities = await response.json();
        displayCities(cities);
    } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        document.getElementById("cidadeDetalhes").innerHTML = `<p>Erro ao buscar cidades: ${error.message}</p>`;
    }
}

function displayCities(cities) {
    const cityDetails = document.getElementById("cidadeDetalhes");
    const cityList = cities.map(city => `<li>${city.nome}</li>`).join("");
    cityDetails.innerHTML = `<h2>Cidades:</h2><ul>${cityList}</ul>`;
}

// Chama a função para buscar os estados ao carregar a página
document.addEventListener("DOMContentLoaded", fetchStates);

