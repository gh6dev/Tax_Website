// Mock database
let taxpayers = [
    {
        id: 1,
        name: "John Doe",
        nin: "123-45-6789",
        address: "123 Main St, Anytown, USA",
        phone: "(555) 123-4567",
        email: "john@example.com",
        status: "Filed",
        lastFiled: "2023"
    },
    // Add more mock data as needed
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const taxpayersList = document.getElementById('taxpayersList');
const addTaxpayerModal = document.getElementById('addTaxpayerModal');
const profileModal = document.getElementById('profileModal');
const taxpayerForm = document.getElementById('taxpayerForm');

// Event Listeners
searchInput.addEventListener('input', handleSearch);
taxpayerForm.addEventListener('submit', handleFormSubmit);

// Initialize
function init() {
    renderTaxpayersList(taxpayers);
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTaxpayers = taxpayers.filter(taxpayer => 
        taxpayer.name.toLowerCase().includes(searchTerm) ||
        taxpayer.nin.includes(searchTerm)
    );
    renderTaxpayersList(filteredTaxpayers);
}

// Render taxpayers list
function renderTaxpayersList(taxpayersToRender) {
    taxpayersList.innerHTML = taxpayersToRender.map(taxpayer => `
        <div class="taxpayer-item" onclick="showProfile(${taxpayer.id})">
            <div class="taxpayer-info">
                <div class="taxpayer-name">${taxpayer.name}</div>
                <div class="taxpayer-details">
                    NIN: XXX-XX-${taxpayer.nin.slice(-4)} | Status: ${taxpayer.status}
                </div>
            </div>
        </div>
    `).join('');
}

// Modal functions
function showAddForm() {
    addTaxpayerModal.style.display = 'block';
}

function closeAddForm() {
    addTaxpayerModal.style.display = 'none';
    taxpayerForm.reset();
}

function showProfile(id) {
    const taxpayer = taxpayers.find(t => t.id === id);
    if (!taxpayer) return;

    profileModal.style.display = 'block';
    document.getElementById('profileContent').innerHTML = `
        <h2>${taxpayer.name}'s Profile</h2>
        <div class="profile-details">
            <p><strong>NIN:</strong> XXX-XX-${taxpayer.nin.slice(-4)}</p>
            <p><strong>Address:</strong> ${taxpayer.address}</p>
            <p><strong>Phone:</strong> ${taxpayer.phone}</p>
            <p><strong>Email:</strong> ${taxpayer.email}</p>
            <p><strong>Status:</strong> ${taxpayer.status}</p>
            <p><strong>Last Filed:</strong> ${taxpayer.lastFiled}</p>
        </div>
        <div class="profile-actions">
            <button onclick="editTaxpayer(${taxpayer.id})">Edit</button>
            <button onclick="deleteTaxpayer(${taxpayer.id})">Delete</button>
        </div>
    `;
}

function closeProfile() {
    profileModal.style.display = 'none';
}

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    const newTaxpayer = {
        id: taxpayers.length + 1,
        name: document.getElementById('name').value,
        nin: document.getElementById('nin').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        status: "Pending",
        lastFiled: "N/A"
    };

    taxpayers.push(newTaxpayer);
    renderTaxpayersList(taxpayers);
    closeAddForm();
}

// Additional features
function generateReport() {
    alert('Generating tax report...');
    // Implement report generation logic
}

function showDeadlines() {
    alert('Tax Deadlines:\n- Individual Returns: April 15\n- Corporate Returns: March 15\n- Extension Deadline: October 15');
}

function editTaxpayer(id) {
    alert('Edit functionality to be implemented');
    // Implement edit logic
}

function deleteTaxpayer(id) {
    if (confirm('Are you sure you want to delete this taxpayer?')) {
        taxpayers = taxpayers.filter(t => t.id !== id);
        renderTaxpayersList(taxpayers);
        closeProfile();
    }
}

// Initialize the application
init();

// Window click event to close modals
window.onclick = function(event) {
    if (event.target === addTaxpayerModal) {
        closeAddForm();
    }
    if (event.target === profileModal) {
        closeProfile();
    }
}