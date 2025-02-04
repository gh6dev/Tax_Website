// Enhanced mock database with alphabetically sorted taxpayers
let taxpayers = [
    // A
    {
        id: 1,
        name: "Austin Goldberg",
        nin: "123-45-6789",
        address: "742 Evergreen Terrace, Springfield, IL",
        phone: "(555) 123-4567",
        email: "austin.g@email.com",
        status: "Filed",
        lastFiled: "2023",
        occupation: "Software Engineer",
        income: "$120,000",
        dependents: 2,
        filingStatus: "Married Filing Jointly",
        deductions: {
            mortgage: "$15,000",
            charitable: "$2,500",
            medical: "$4,000"
        },
        taxCredits: ["Child Tax Credit", "Energy Efficiency Credit"],
        paymentHistory: [
            { year: "2023", amount: "$28,500", status: "Paid" },
            { year: "2022", amount: "$26,800", status: "Paid" },
            { year: "2021", amount: "$25,400", status: "Paid" }
        ]
    },
    {
        id: 2,
        name: "Amelia Shams",
        nin: "234-56-7890",
        address: "123 Oak Lane, Boston, MA",
        phone: "(555) 234-5678",
        email: "amelia.s@email.com",
        status: "Pending",
        lastFiled: "2023",
        occupation: "Medical Doctor",
        income: "$245,000",
        dependents: 1,
        filingStatus: "Single",
        deductions: {
            mortgage: "$22,000",
            charitable: "$15,000",
            medical: "$2,000"
        },
        taxCredits: ["Education Credits"],
        paymentHistory: [
            { year: "2023", amount: "$65,400", status: "Pending" },
            { year: "2022", amount: "$62,300", status: "Paid" },
            { year: "2021", amount: "$59,800", status: "Paid" }
        ]
    },
    // B
    {
        id: 3,
        name: "Benedict Mathieu",
        nin: "345-67-8901",
        address: "567 Maple Dr, Seattle, WA",
        phone: "(555) 345-6789",
        email: "benedict.m@email.com",
        status: "Filed",
        lastFiled: "2023",
        occupation: "Restaurant Owner",
        income: "$175,000",
        dependents: 3,
        filingStatus: "Married Filing Jointly",
        deductions: {
            mortgage: "$18,000",
            charitable: "$5,000",
            business: "$45,000"
        },
        taxCredits: ["Child Tax Credit", "Small Business Credits"],
        paymentHistory: [
            { year: "2023", amount: "$32,400", status: "Paid" },
            { year: "2022", amount: "$30,100", status: "Paid" },
            { year: "2021", amount: "$28,900", status: "Paid" }
        ]
    },
    // C
    {
        id: 4,
        name: "Catherine Zhou",
        nin: "456-78-9012",
        address: "890 Pine St, San Francisco, CA",
        phone: "(555) 456-7890",
        email: "catherine.z@email.com",
        status: "Filed",
        lastFiled: "2023",
        occupation: "Tech Executive",
        income: "$320,000",
        dependents: 0,
        filingStatus: "Single",
        deductions: {
            mortgage: "$35,000",
            charitable: "$25,000",
            retirement: "$20,500"
        },
        taxCredits: ["Energy Efficiency Credit"],
        paymentHistory: [
            { year: "2023", amount: "$95,600", status: "Paid" },
            { year: "2022", amount: "$92,400", status: "Paid" },
            { year: "2021", amount: "$88,700", status: "Paid" }
        ]
    },
    // D
    {
        id: 5,
        name: "David Rodriguez",
        nin: "567-89-0123",
        address: "432 Elm St, Miami, FL",
        phone: "(555) 567-8901",
        email: "david.r@email.com",
        status: "Late",
        lastFiled: "2022",
        occupation: "Real Estate Agent",
        income: "$95,000",
        dependents: 2,
        filingStatus: "Head of Household",
        deductions: {
            mortgage: "$12,000",
            charitable: "$1,500",
            business: "$15,000"
        },
        taxCredits: ["Child Tax Credit"],
        paymentHistory: [
            { year: "2023", amount: "$18,900", status: "Late" },
            { year: "2022", amount: "$17,800", status: "Paid" },
            { year: "2021", amount: "$16,500", status: "Paid" }
        ]
    }
    // Add more taxpayers as needed...
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
    renderAlphabeticalList();
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTaxpayers = taxpayers.filter(taxpayer =>
        taxpayer.name.toLowerCase().includes(searchTerm) ||
        taxpayer.nin.includes(searchTerm)
    );
    renderAlphabeticalList(filteredTaxpayers); //Updated to use alphabetical rendering
}


// Function to group taxpayers by first letter
function groupTaxpayersByLetter() {
    return taxpayers.reduce((acc, taxpayer) => {
        const firstLetter = taxpayer.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(taxpayer);
        return acc;
    }, {});
}

// Render alphabetical list
function renderAlphabeticalList(taxpayersToRender = taxpayers) { //Added parameter for filtering
    const grouped = groupTaxpayersByLetter();
    const letters = Object.keys(grouped).sort();

    taxpayersList.innerHTML = letters.map(letter => `
        <div class="letter-group">
            <h2 class="letter-header">${letter}</h2>
            ${grouped[letter].map(taxpayer => `
                <div class="taxpayer-item" onclick="showProfile(${taxpayer.id})">
                    <div class="taxpayer-info">
                        <div class="taxpayer-name">${taxpayer.name}</div>
                        <div class="taxpayer-details">
                            NIN: XXX-XX-${taxpayer.nin.slice(-4)} | ${taxpayer.occupation}
                        </div>
                    </div>
                </div>
            `).join('')}
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

// Enhanced profile view
function showProfile(id) {
    const taxpayer = taxpayers.find(t => t.id === id);
    if (!taxpayer) return;

    profileModal.style.display = 'block';
    document.getElementById('profileContent').innerHTML = `
        <h2>${taxpayer.name}'s Profile</h2>

        <div class="profile-sections">
            <section class="profile-section">
                <h3>Personal Information</h3>
                <div class="profile-details">
                    <p><strong>NIN:</strong> XXX-XX-${taxpayer.nin.slice(-4)}</p>
                    <p><strong>Address:</strong> ${taxpayer.address}</p>
                    <p><strong>Phone:</strong> ${taxpayer.phone}</p>
                    <p><strong>Email:</strong> ${taxpayer.email}</p>
                    <p><strong>Occupation:</strong> ${taxpayer.occupation}</p>
                    <p><strong>Filing Status:</strong> ${taxpayer.filingStatus}</p>
                    <p><strong>Dependents:</strong> ${taxpayer.dependents}</p>
                </div>
            </section>

            <section class="profile-section">
                <h3>Financial Information</h3>
                <div class="profile-details">
                    <p><strong>Annual Income:</strong> ${taxpayer.income}</p>
                    <h4>Deductions</h4>
                    <ul>
                        ${Object.entries(taxpayer.deductions).map(([key, value]) =>
                            `<li>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</li>`
                        ).join('')}
                    </ul>
                    <h4>Tax Credits</h4>
                    <ul>
                        ${taxpayer.taxCredits.map(credit =>
                            `<li>${credit}</li>`
                        ).join('')}
                    </ul>
                </div>
            </section>

            <section class="profile-section">
                <h3>Payment History</h3>
                <div class="payment-history">
                    <table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${taxpayer.paymentHistory.map(payment => `
                                <tr>
                                    <td>${payment.year}</td>
                                    <td>${payment.amount}</td>
                                    <td><span class="status-badge ${payment.status.toLowerCase()}">${payment.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <div class="profile-actions">
            <button onclick="editTaxpayer(${taxpayer.id})" class="edit-btn">Edit Profile</button>
            <button onclick="viewDocuments(${taxpayer.id})" class="docs-btn">View Documents</button>
            <button onclick="generateTaxReport(${taxpayer.id})" class="report-btn">Generate Tax Report</button>
            <button onclick="deleteTaxpayer(${taxpayer.id})" class="delete-btn">Delete Profile</button>
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
        lastFiled: "N/A",
        occupation: document.getElementById('occupation').value,
        income: document.getElementById('income').value,
        dependents: document.getElementById('dependents').value,
        filingStatus: document.getElementById('filingStatus').value,
        deductions: {
            mortgage: document.getElementById('mortgage').value,
            charitable: document.getElementById('charitable').value,
            medical: document.getElementById('medical').value,
            business: document.getElementById('business').value,
            retirement: document.getElementById('retirement').value
        },
        taxCredits: [document.getElementById('taxCredits').value],
        paymentHistory: []
    };

    taxpayers.push(newTaxpayer);
    renderAlphabeticalList(); //Updated to use alphabetical rendering
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
        renderAlphabeticalList(); //Updated to use alphabetical rendering
        closeProfile();
    }
}

function viewDocuments(id) {
    alert(`Viewing documents for taxpayer ID ${id}`);
    // Implement document viewing logic
}

function generateTaxReport(id) {
    const taxpayer = taxpayers.find(t => t.id === id);
    if (!taxpayer) return;

    const report = `Tax Report for ${taxpayer.name}:\n\n` +
        `Annual Income: ${taxpayer.income}\n` +
        `Total Deductions: $${Object.values(taxpayer.deductions).reduce((sum, val) => sum + parseFloat(val.replace('$', '')), 0)}\n` +
        `Taxable Income: $${parseFloat(taxpayer.income.replace('$', '')) - Object.values(taxpayer.deductions).reduce((sum, val) => sum + parseFloat(val.replace('$', '')), 0)}\n` +
        `Tax Credits: ${taxpayer.taxCredits.join(', ')}\n` +
        `Payment History: \n${taxpayer.paymentHistory.map(payment => `${payment.year}: ${payment.amount} (${payment.status})`).join('\n')}`;

    alert(report);
}

// Initialize the application
init();

// Window click event to close modals
window.onclick = function (event) {
    if (event.target === addTaxpayerModal) {
        closeAddForm();
    }
    if (event.target === profileModal) {
        closeProfile();
    }
}