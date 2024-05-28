document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://localhost:7072';
  
    // Função para buscar e renderizar dados de um endpoint e renderizar em um elemento
    function fetchAndRender(endpoint, elementId) {
        fetch(`${baseUrl}/${endpoint}`)
            .then(response => response.json())
            .then(data => {
                const element = document.getElementById(elementId);
                element.innerHTML = ''; // Limpar conteúdo existente
                data.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'item';
                    itemElement.innerHTML = `
                        <h3>${item.nome || item.id}</h3>
                        <p>${JSON.stringify(item)}</p>
                        <button onclick="deleteItem('${endpoint}', ${item.id})">Delete</button>
                        <button onclick="showUpdateForm('${endpoint}', ${item.id})">Update</button>
                    `;
                    element.appendChild(itemElement);
                });
            })
            .catch(error => console.error(`Erro ao buscar os dados de ${endpoint}:`, error));
    }
  
    // Função para buscar e renderizar dados de veículos
    function fetchAndRenderVehicles() {
      fetch(`${baseUrl}/api/veiculos`)
        .then(response => response.json())
        .then(data => {
          const vehicleList = document.querySelector('.vehicle-list');
          vehicleList.innerHTML = '';
          data.forEach(vehicle => {
            const vehicleItem = document.createElement('div');
            vehicleItem.className = 'vehicle-item';
            vehicleItem.innerHTML = `
              <img src="${vehicle.image || 'default-image.png'}" alt="${vehicle.name}">
              <div class="vehicle-details">
                <p class="vehicle-name">${vehicle.name}</p>
                <p class="vehicle-status">${vehicle.status}</p>
                <p class="vehicle-price">${vehicle.price}</p>
              </div>
              <a href="descricao_carro.html?id=${vehicle.id}" class="view-vehicle">Ver Veículo</a>
            `;
            vehicleList.appendChild(vehicleItem);
          });
        })
        .catch(error => console.error('Erro ao buscar dados dos veículos:', error));
    }
  
    // Função para adicionar um novo item
    async function addItem(endpoint, item) {
        try {
            const response = await fetch(`${baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
            if (response.ok) {
                console.log('Item adicionado com sucesso');
                fetchAndRender(endpoint, `${endpoint}-list`);
            } else {
                console.error('Erro ao adicionar item');
            }
        } catch (error) {
            console.error(`Erro ao adicionar item a ${endpoint}:`, error);
        }
    }
  
    // Função para atualizar um item
    async function updateItem(endpoint, id, updatedItem) {
        try {
            const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedItem)
            });
            if (response.ok) {
                console.log('Item atualizado com sucesso');
                fetchAndRender(endpoint, `${endpoint}-list`);
            } else {
                console.error('Erro ao atualizar item');
            }
        } catch (error) {
            console.error(`Erro ao atualizar item em ${endpoint}:`, error);
        }
    }
  
    // Função para deletar um item
    async function deleteItem(endpoint, id) {
        try {
            const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Item deletado com sucesso');
                fetchAndRender(endpoint, `${endpoint}-list`);
            } else {
                console.error('Erro ao deletar item');
            }
        } catch (error) {
            console.error(`Erro ao deletar item de ${endpoint}:`, error);
        }
    }
  
    // Exibir formulário para atualizar um item
    function showUpdateForm(endpoint, id) {
        const form = document.getElementById('update-form');
        form.innerHTML = `
            <h2>Update ${endpoint} ID: ${id}</h2>
            <form onsubmit="submitUpdateForm(event, '${endpoint}', ${id})">
                <input type="text" id="update-input" placeholder="Enter new data">
                <button type="submit">Update</button>
            </form>
        `;
    }
  
    // Função para submeter o formulário de atualização
    function submitUpdateForm(event, endpoint, id) {
        event.preventDefault();
        const updatedData = { /* preencher com os dados necessários */ };
        const inputData = document.getElementById('update-input').value;
        // Atualizar o objeto updatedData conforme necessário
        updateItem(endpoint, id, updatedData);
    }
  
    // Chamadas para buscar e renderizar dados de diferentes endpoints
    const endpoints = [
        'Alugueres',
        'Carros',
        'Categoriacarros',
        'Caucaos',
        'Clientes',
        'Codigospostais',
        'Devolucoes',
        'Driveeases',
        'Entregas',
        'Estadocarros',
        'Faturas',
        'Manutencoes',
        'Marcas',
        'Modelos',
        'Pagamentos',
        'Reviews',
        'Tecnicos',
        'Tipopagamentos'
    ];
  
    endpoints.forEach(endpoint => fetchAndRender(`api/${endpoint}`, endpoint));
  
    // Carregar e renderizar dados de veículos
    fetchAndRenderVehicles();
  });
  