// Função para verificar se o usuário é superusuário
async function isAdmin() {
    // Supondo que há uma API para obter dados do usuário logado
    const response = await fetch('/api/users/me');
    if (!response.ok) return false;
    const user = await response.json();
    return user.isAdmin === true;
}

// Função para mostrar botão de relatório se for admin
async function showReportButton() {
    const admin = await isAdmin();
    if (admin) {
        const btn = document.getElementById('btnReportStock');
        if (btn) btn.style.display = 'block';
    }
}

let allProducts = []; // variável global para armazenar produtos carregados

// Função para renderizar produtos na div product-grid
function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    productGrid.innerHTML = '';

    if (products.length === 0) {
        productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    products.forEach(p => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.border = '1px solid #ccc';
        productCard.style.borderRadius = '5px';
        productCard.style.padding = '10px';
        productCard.style.margin = '10px';
        productCard.style.width = '200px';
        productCard.style.boxSizing = 'border-box';
        productCard.style.display = 'inline-block';
        productCard.style.verticalAlign = 'top';
        productCard.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = p.imageUrl || 'placeholder.png';
        img.alt = p.name;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.borderRadius = '5px';
        productCard.appendChild(img);

        const name = document.createElement('h3');
        name.textContent = p.name;
        productCard.appendChild(name);

        const price = document.createElement('p');
        price.textContent = `R$ ${p.price.toFixed(2)}`;
        productCard.appendChild(price);

        productGrid.appendChild(productCard);
    });
}

// Função para filtrar produtos por nome e classe
function filterProducts() {
    const searchInput = document.getElementById('search-input');
    const classSelect = document.getElementById('class-select');
    if (!searchInput || !classSelect) return;

    const searchTerm = searchInput.value.toLowerCase();
    const selectedClass = classSelect.value;

    const filtered = allProducts.filter(p => {
        const matchesName = p.name.toLowerCase().includes(searchTerm);
        const matchesClass = selectedClass === 'Todos' || p.class === selectedClass;
        return matchesName && matchesClass;
    });

    renderProducts(filtered);
}

// Função para carregar produtos da API e inicializar a exibição
async function loadProducts() {
    const response = await fetch('/products');
    if (!response.ok) {
        alert('Erro ao carregar produtos');
        return;
    }
    allProducts = await response.json();
    filterProducts(); // renderiza produtos filtrados inicialmente (todos)
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    showReportButton();

    const btnReport = document.getElementById('btnReportStock');
    if (btnReport) {
        btnReport.addEventListener('click', generateStockReport);
    }

    const searchInput = document.getElementById('search-input');
    const classSelect = document.getElementById('class-select');
    const searchButton = document.getElementById('search-button');

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    if (classSelect) {
        classSelect.addEventListener('change', filterProducts);
    }
    if (searchButton) {
        searchButton.addEventListener('click', filterProducts);
    }
});

// Função para validar estoque antes da venda
async function validateStock(productId, quantity) {
    const response = await fetch('/products/validate-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
    });
    if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Erro ao validar estoque');
        return false;
    }
    return true;
}

// Função para gerar relatório de estoque
async function generateStockReport() {
    const response = await fetch('/products/report');
    if (!response.ok) {
        alert('Erro ao gerar relatório');
        return;
    }
    const report = await response.json();
    let reportText = 'Relatório de Estoque:\n\n';
    report.forEach(p => {
        reportText += `Produto: ${p.name} | Preço: R$${p.price.toFixed(2)} | Estoque: ${p.stock}\n`;
    });
    alert(reportText);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    showReportButton();
    const btnReport = document.getElementById('btnReportStock');
    if (btnReport) {
        btnReport.addEventListener('click', generateStockReport);
    }
});
