const COMPTE_UNIQUE = {
    user: "450893127",
    pass: "K9#pZ!m7$",
    balance: 7585024.00
};

function login() {
    const userInput = document.getElementById('username').value.trim();
    const passInput = document.getElementById('password').value;
    const btn = document.querySelector('.btn-connexion');

    if (userInput === COMPTE_UNIQUE.user && passInput === COMPTE_UNIQUE.pass) {
        btn.innerText = "Connexion en cours...";
        btn.disabled = true;
        setTimeout(() => {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.reload();
        }, 800);
    } else {
        alert("Identifiant ou mot de passe incorrect. (Démo: Identifiant 450893127 / Mdp: K9#pZ!m7$)");
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
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active-nav');
    }
}

function startTransferAnimation() {
    const beneficiary = document.getElementById('beneficiary').value.trim();
    const iban = document.getElementById('iban-input').value.trim();
    const bic = document.getElementById('bic-input').value.trim();
    const amount = parseFloat(document.getElementById('amount-input').value);
    const reason = document.getElementById('reason-input').value.trim();

    if (!beneficiary || !iban || !bic || isNaN(amount) || amount <= 0 || !reason) {
        alert("Veuillez renseigner l'ensemble des champs pour effectuer la simulation.");
        return;
    }

    document.getElementById('form-container').style.display = 'none';
    document.getElementById('loader-container').style.display = 'block';

    let progress = 0;
    const progressFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                alert(`✅ TRANSFERT SIMULÉ AVEC SUCCÈS\n\nMontant : ${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}\nDestination : ${beneficiary}`);

                // Mise à jour du solde
                COMPTE_UNIQUE.balance -= amount;
                document.getElementById('balance').innerText = COMPTE_UNIQUE.balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

                // Ajout à l'historique
                const list = document.getElementById('transactions-list');
                const newItem = document.createElement('div');
                newItem.className = 'transaction-item';
                newItem.onclick = function() {
                    openDetails(`Virement envoyé (${reason})`, `-${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`, 'Aujourd\'hui', `Transfert vers ${beneficiary}`, 'Validé');
                };
                newItem.innerHTML = `
                    <div class="tx-info">
                        <span class="tx-title">Virement vers ${beneficiary}</span>
                        <span class="tx-date">Aujourd'hui • ${reason}</span>
                    </div>
                    <span class="tx-amount negative">-${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                `;
                list.insertBefore(newItem, list.firstChild);

                // Réinitialisation du formulaire
                document.getElementById('beneficiary').value = '';
                document.getElementById('iban-input').value = '';
                document.getElementById('bic-input').value = '';
                document.getElementById('amount-input').value = '';
                document.getElementById('reason-input').value = '';

                document.getElementById('loader-container').style.display = 'none';
                document.getElementById('form-container').style.display = 'block';
                showSection('home-section');
            }, 400);
        }
        progressFill.style.width = progress + '%';
        progressText.innerText = progress + '%';
    }, 120);
}

function openDetails(title, amount, date, reason, status) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-type').innerText = title;
    document.getElementById('modal-amount').innerText = amount;
    document.getElementById('modal-date').innerText = date;
    document.getElementById('modal-reason').innerText = reason;
    
    const statusLabel = document.getElementById('modal-status');
    statusLabel.innerText = status;
    statusLabel.style.color = '#10b981';
    statusLabel.style.fontWeight = 'bold';

    document.getElementById('tx-modal').style.display = 'flex';
}

function closeDetails() {
    document.getElementById('tx-modal').style.display = 'none';
}

// Vérification de la session au chargement
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    document.getElementById('balance').innerText = COMPTE_UNIQUE.balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
} else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-screen').style.display = 'none';
}
