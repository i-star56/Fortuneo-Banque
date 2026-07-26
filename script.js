let currentBalance = 7585024.00;
let savings1 = 125400.00;
let savings2 = 48250.00;
let selectedTransferType = 'immediat';

let userProfile = {
    name: "Edmond Garnier",
    email: "edmond.garnier@client-hexagone.fr",
    phone: "+33 6 12 34 56 78",
    address: "12 Boulevard Haussmann, 75009 Paris"
};

// GÉNÉRATION DE L'HISTORIQUE DE TRANSACTIONS
const titlesIn = ["Virement reçu", "Incrémentation d'actifs", "Cession d'actions", "Dividendes Euronext", "Règlement Partenaire", "Remboursement Fisc", "Avoir Banque"];
const titlesOut = ["Achat Équipement", "Honoraire Conseil", "Virement Sortant", "Paiement Fournisseur", "Frais de Gestion", "Prélèvement Assurance", "Règlement Facture"];

let transactions = [];

function generateTransactions() {
    let idCounter = 1000;
    const years = [2022, 2023, 2024, 2025];
    
    years.forEach(year => {
        for (let month = 1; month <= 12; month++) {
            let numTx = (year === 2025 && month === 12) ? 3 : 1; 
            for (let i = 0; i < numTx; i++) {
                let day = Math.floor(Math.random() * 25) + 1;
                let dayStr = day < 10 ? '0' + day : day;
                let monthStr = month < 10 ? '0' + month : month;
                let dateStr = `${dayStr}/${monthStr}/${year}`;

                let isPositive = Math.random() > 0.4;
                let title = isPositive ? titlesIn[Math.floor(Math.random() * titlesIn.length)] : titlesOut[Math.floor(Math.random() * titlesOut.length)];
                let amount = isPositive ? (Math.floor(Math.random() * 80000) + 5000) : -(Math.floor(Math.random() * 15000) + 500);

                transactions.push({
                    ref: `TX-${year}-${idCounter++}`,
                    title: title,
                    amount: amount,
                    date: dateStr,
                    reason: `Opération comptabilisée sous référence #HEXA-${idCounter}`,
                    type: isPositive ? "positive" : "negative"
                });
            }
        }
    });

    transactions.reverse();
}

generateTransactions();

function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;

    if (userInput === "450893127" && passInput === "K9#pZ!m7$") {
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.reload();
    } else {
        alert("Identifiant ou mot de passe incorrect.");
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

function toggleQuickMenu() {
    const qm = document.getElementById('quick-menu-modal');
    qm.style.display = (qm.style.display === 'none' || qm.style.display === '') ? 'flex' : 'none';
}

function selectTransferType(type) {
    selectedTransferType = type;
    document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`type-${type}`).classList.add('active');

    const dateField = document.getElementById('date-execution-field');
    if (type === 'differe') {
        dateField.style.display = 'block';
    } else {
        dateField.style.display = 'none';
    }
}

function applySavedBeneficiary() {
    const val = document.getElementById('saved-beneficiary').value;
    if (val) {
        const parts = val.split('|');
        document.getElementById('beneficiary').value = parts[0];
        document.getElementById('iban-input').value = parts[1];
        document.getElementById('reason-input').value = `Virement vers ${parts[2]}`;
    }
}

function toggleCheckbox(id) {
    const cb = document.getElementById(id);
    if (cb) cb.checked = !cb.checked;
}

function updateProfile() {
    userProfile.name = document.getElementById('user-email-input').value;
    userProfile.phone = document.getElementById('user-phone-input').value;
    userProfile.address = document.getElementById('user-address-input').value;

    alert("Données personnelles mises à jour avec succès !");
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
        item.onclick = () => openDetails(tx.ref, tx.title, `${tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`, tx.date, tx.reason);
        item.innerHTML = `
            <div class="tx-info">
                <span class="tx-title">${tx.title}</span>
                <span class="tx-date">${tx.date} • ${tx.ref}</span>
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
        const matchesQuery = tx.title.toLowerCase().includes(query) || tx.date.includes(query) || tx.ref.toLowerCase().includes(query);
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
                    ref: `TX-2025-${Math.floor(Math.random()*9000)+1000}`,
                    title: `Virement [${selectedTransferType.toUpperCase()}] vers ${beneficiary}`,
                    amount: -amount,
                    date: "31/12/2025",
                    reason: reason,
                    type: "negative"
                });

                filterTransactions();

                alert(`✅ Virement (${selectedTransferType}) de ${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} exécuté.`);

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

function depositSavings(id) {
    let amount = prompt("Entrez le montant à verser sur ce compte d'épargne :");
    amount = parseFloat(amount);
    if (!isNaN(amount) && amount > 0) {
        if (amount > currentBalance) {
            alert("Solde principal insuffisant.");
            return;
        }
        currentBalance -= amount;
        document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

        if (id === 1) {
            savings1 += amount;
            document.getElementById('savings-balance-1').innerText = savings1.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
        } else {
            savings2 += amount;
            document.getElementById('savings-balance-2').innerText = savings2.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
        }
        updateTotalSavings();
        alert("Règlement/Transfert vers l'épargne effectué avec succès !");
    }
}

function withdrawSavings(id) {
    let amount = prompt("Entrez le montant à récupérer vers votre compte principal :");
    amount = parseFloat(amount);
    if (!isNaN(amount) && amount > 0) {
        let currentTarget = (id === 1) ? savings1 : savings2;
        if (amount > currentTarget) {
            alert("Solde d'épargne insuffisant.");
            return;
        }
        currentBalance += amount;
        document.getElementById('balance').innerText = currentBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

        if (id === 1) {
            savings1 -= amount;
            document.getElementById('savings-balance-1').innerText = savings1.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
        } else {
            savings2 -= amount;
            document.getElementById('savings-balance-2').innerText = savings2.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
        }
        updateTotalSavings();
        alert("Fonds rapatriés sur votre compte principal !");
    }
}

function configureAutoDeposit() {
    alert("Module de versements programmés : Vous pouvez mettre en place un versement mensuel automatique de 500 € vers votre Livret A.");
}

function updateTotalSavings() {
    const total = savings1 + savings2;
    document.getElementById('total-savings-balance').innerText = total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

function openEdocuments() {
    alert("📄 E-DOCUMENTS MENSUELS PDF :\n\n- Relevé de compte Décembre 2025 (PDF)\n- Relevé de compte Novembre 2025 (PDF)\n- Relevé Annuel d'Opérations 2025 (PDF)");
}

function openMessaging() {
    alert("💬 MESSAGERIE SÉCURISÉE BANQUE PRIVÉE :\n\nVotre conseiller dédié : M. Jean-Marc Valette\nStatut : En ligne\n\n[Dernier message] : 'Bonjour M. Garnier, je reste à votre disposition.'");
}

function modPlafond(type) {
    let newCap = prompt(`Nouveau plafond de ${type} souhaité (€) :`);
    if (newCap) alert(`Votre demande de modification de plafond de ${type} (${newCap} €) a été transmise à votre conseiller.`);
}

function tempLockCard() {
    alert("🔒 Votre carte bancaire a été verrouillée temporairement. Vous pouvez la déverrouiller à tout moment.");
}

function oppositionCard() {
    if (confirm("🛑 Êtes-vous sûr de vouloir mettre votre carte en opposition définitive ? Un remplacement sera commandé.")) {
        alert("Opposition enregistrée. Votre carte est bloquée définitivement.");
    }
}

function showPinCode() {
    alert("🔑 Votre code PIN confidentiel est : 4 8 2 9 (Ne le communiquez à personne)");
}

function changePasswordModal() {
    prompt("Entrez votre nouveau mot de passe / code secret à 6 chiffres :");
    alert("Mot de passe mis à jour avec succès.");
}

function viewCivilIdentity() {
    alert("👤 ÉTAT CIVIL & IDENTITÉ :\n\nNom : GARNIER\nPrénom : Edmond\nDate de naissance : 14/08/1975\nSituation : Marié\nN° Fiscal : 1849 2039 4829");
}

function openDetails(ref, title, amount, date, reason) {
    document.getElementById('modal-ref').innerText = ref;
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
    filterTransactions();
} else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-screen').style.display = 'none';
}
