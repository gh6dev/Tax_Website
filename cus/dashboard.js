// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // Populate account overview
    document.getElementById('totalPayments').textContent = '15';
    document.getElementById('pendingPayments').textContent = '3';
    document.getElementById('accountBalance').textContent = '$1,234.56';

    // Populate recent transactions
    const recentTransactions = [
        { date: '2023-05-01', description: 'Property Tax', amount: '$500.00' },
        { date: '2023-04-15', description: 'Business License', amount: '$200.00' },
        { date: '2023-03-30', description: 'Utility Bill', amount: '$150.00' },
    ];

    const recentTransactionsEl = document.getElementById('recentTransactions');
    recentTransactions.forEach(transaction => {
        const transactionEl = document.createElement('div');
        transactionEl.className = 'taxpayer-item';
        transactionEl.innerHTML = `
            <div class="taxpayer-info">
                <div class="taxpayer-name">${transaction.description}</div>
                <div class="taxpayer-details">${transaction.date} | ${transaction.amount}</div>
            </div>
        `;
        recentTransactionsEl.appendChild(transactionEl);
    });

    // Populate upcoming payments
    const upcomingPayments = [
        { dueDate: '2023-06-15', description: 'Quarterly Tax', amount: '$750.00' },
        { dueDate: '2023-07-01', description: 'Annual License Renewal', amount: '$300.00' },
    ];

    const upcomingPaymentsEl = document.getElementById('upcomingPayments');
    upcomingPayments.forEach(payment => {
        const paymentEl = document.createElement('div');
        paymentEl.className = 'taxpayer-item';
        paymentEl.innerHTML = `
            <div class="taxpayer-info">
                <div class="taxpayer-name">${payment.description}</div>
                <div class="taxpayer-details">Due: ${payment.dueDate} | ${payment.amount}</div>
            </div>
        `;
        upcomingPaymentsEl.appendChild(paymentEl);
    });

    // Modal functionality
    const makePaymentBtn = document.getElementById('makePaymentBtn');
    const makePaymentModal = document.getElementById('makePaymentModal');
    const viewRevenueCodesBtn = document.getElementById('viewRevenueCodesBtn');
    const revenueCodesModal = document.getElementById('revenueCodesModal');
    const closeBtns = document.querySelectorAll('.close-btn, .close-modal');

    makePaymentBtn.addEventListener('click', () => {
        makePaymentModal.style.display = 'block';
    });

    viewRevenueCodesBtn.addEventListener('click', () => {
        revenueCodesModal.style.display = 'block';
        // Populate revenue codes (this would typically come from an API)
        const revenueCodes = [
            { code: '1001', description: 'Property Tax', rate: '1.5%' },
            { code: '1002', description: 'Business License', rate: 'Flat $200' },
            { code: '1003', description: 'Utility Tax', rate: '5%' },
        ];
        const revenueCodesListEl = document.getElementById('revenueCodesList');
        revenueCodesListEl.innerHTML = revenueCodes.map(code => `
            <div class="taxpayer-item">
                <div class="taxpayer-info">
                    <div class="taxpayer-name">${code.code} - ${code.description}</div>
                    <div class="taxpayer-details">Rate: ${code.rate}</div>
                </div>
            </div>
        `).join('');
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            makePaymentModal.style.display = 'none';
            revenueCodesModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === makePaymentModal) {
            makePaymentModal.style.display = 'none';
        }
        if (event.target === revenueCodesModal) {
            revenueCodesModal.style.display = 'none';
        }
    });

    // Handle payment form submission
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('paymentAmount').value;
        const description = document.getElementById('paymentDescription').value;
        // Here you would typically send this data to your server
        alert(`Payment of $${amount} for ${description} submitted successfully!`);
        makePaymentModal.style.display = 'none';
    });
});