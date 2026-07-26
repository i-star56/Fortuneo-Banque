let currentBalance = 7585024.00;
let userProfile = {
    name: "Edmond Garnier",
    email: "edmond.garnier@hexagone.fr",
    phone: "+33 6 12 34 56 78"
};

let transactions = [
    { title: "Dépôt d'investissement", amount: 7500000.00, date: "Hier", reason: "Allocation initiale de fonds", type: "positive" },
    { title: "Dividendes Euronext", amount: 85024.00, date: "Il y a 2 jours", reason: "Rendements actions", type: "positive" },
    { title: "Achat Matériel Informatique", amount: -2450.00, date: "Il y a 3 jours", reason: "Équipement bureau", type: "negative" },
    { title: "Prestation Conseil", amount: -10000.00, date: "Il y a 5 jours", reason: "Honoraires de cabinet", type: "negative" }
];

function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;

    if (userInput === "450893127" && passInput === "K9#pZ!m7$") {
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.reload();
    } else {
        alert("Identifiant ou mot de passe incorrect. (Démo: 450893127 / K9#pZ!m7$)");
    }
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.reload();
}

function showSection(sectionId) {
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active-nav'));
    if (event && event.currentTarget && event.currentTarget.classList) {
        event.currentTarget.classList.add('active-nav');
    }
}

function updateProfile() {
    userProfile.name = document.getElementById('user-name-input').value;
    userProfile.email = document.getElementById('user-email-input').value;
    userProfile.phone = document.getElementById('user-phone-input').value;

    document.getElementById('header-username').innerText = `M. ${userProfile.name}`;
    document.getElementById('card-holder-name').innerText = userProfile.name.toUpperCase();
    document.getElementById('acc-modal-owner').innerText = userProfile.name;

    const initials = userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase();
    document.getElementById('header-avatar').innerText = initials;

    alert("Profil mis à jour avec succès !");
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}

function openAccountDetails() {
    document.getElementById('acc-modal-balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    document.getElementById('account-modal').style.display = 'flex';
}

function closeAccountDetails() {
    document.getElementById('account-modal').style.display = 'none';
}

function renderTransactions(items) {
    const list = document.getElementById('transactions-list');
    list.innerHTML = '';

    items.forEach(tx => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        item.onclick = () => openDetails(tx.title, `${tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`, tx.date, tx.reason);
        item.innerHTML = `
            <div class="tx-info">
                <span class="tx-title">${tx.title}</span>
                <span class="tx-date">${tx.date} • ${tx.reason}</span>
            </div>
            <span class="tx-amount ${tx.type}">${tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
        `;
        list.appendChild(item);
    });
}

function filterTransactions() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const type = document.getElementById('filter-type').value;

    const filtered = transactions.filter(tx => {
        const matchesQuery = tx.title.toLowerCase().includes(query) || tx.reason.toLowerCase().includes(query);
        const matchesType = type === 'all' || tx.type === type;
        return matchesQuery && matchesType;
    });

    renderTransactions(filtered);
}

function startTransferAnimation() {
    const beneficiary = document.getElementById('beneficiary').value.trim();
    const iban = document.getElementById('iban-input').value.trim();
    const amount = parseFloat(document.getElementById('amount-input').value);
    const reason = document.getElementById('reason-input').value.trim();

    if (!beneficiary || !iban || isNaN(amount) || amount <= 0 || !reason) {
        alert("Veuillez remplir correctement tous les champs.");
        return;
    }

    if (amount > currentBalance) {
        alert("Solde insuffisant pour exécuter ce virement.");
        return;
    }

    document.getElementById('form-container').style.display = 'none';
    document.getElementById('loader-container').style.display = 'block';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        document.getElementById('progress-bar-fill').style.width = progress + '%';
        document.getElementById('progress-text').innerText = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                currentBalance -= amount;
                document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

                transactions.unshift({
                    title: `Virement vers ${beneficiary}`,
                    amount: -amount,
                    date: "Aujourd'hui",
                    reason: reason,
                    type: "negative"
                });

                filterTransactions();

                alert(`✅ Virement de ${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} exécuté avec succès.`);

                document.getElementById('beneficiary').value = '';
                document.getElementById('iban-input').value = '';
                document.getElementById('amount-input').value = '';
                document.getElementById('reason-input').value = '';
                document.getElementById('loader-container').style.display = 'none';
                document.getElementById('form-container').style.display = 'block';
                showSection('home-section');
            }, 400);
        }
    }, 120);
}

function calculateSavings() {
    const P = parseFloat(document.getElementById('sim-initial').value) || 0;
    const PMT = parseFloat(document.getElementById('sim-monthly').value) || 0;
    const r = (parseFloat(document.getElementById('sim-rate').value) || 0) / 100 / 12;
    const n = (parseFloat(document.getElementById('sim-years').value) || 0) * 12;

    let total = P;
    let totalInvested = P + (PMT * n);

    for (let i = 0; i < n; i++) {
        total = (total + PMT) * (1 + r);
    }

    const interestGained = total - totalInvested;

    document.getElementById('sim-total').innerText = total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    document.getElementById('sim-details').innerText = `Total versé : ${totalInvested.toLocaleString('fr-FR')} € | Intérêts gagnés : ${interestGained.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €`;
    document.getElementById('sim-result').style.display = 'block';
}

function openDetails(title, amount, date, reason) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-type').innerText = title;
    document.getElementById('modal-amount').innerText = amount;
    document.getElementById('modal-date').innerText = date;
    document.getElementById('modal-reason').innerText = reason;
    document.getElementById('tx-modal').style.display = 'flex';
}

function closeDetails() {
    document.getElementById('tx-modal').style.display = 'none';
}

if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    renderTransactions(transactions);
} else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-screen').style.display = 'none';
}
