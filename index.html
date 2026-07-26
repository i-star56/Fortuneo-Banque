const COMPTE_UNIQUE = {
   user: "450893127",
   pass: "K9#pZ!m7$",
   balance: "7585024.00"
};

function login() {
   const userInput = document.getElementById('username').value.trim();
   const passInput = document.getElementById('password').value;
   const btn = document.querySelector('.btn-connexion');

   if (userInput === COMPTE_UNIQUE.user && passInput === COMPTE_UNIQUE.pass) {
       btn.innerText = "Authentification Cryptée...";
       btn.disabled = true;
       setTimeout(() => {
           sessionStorage.setItem('isLoggedIn', 'true');
           window.location.reload();
       }, 1000);
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
   event.currentTarget.classList.add('active-nav');
}

// LOGIQUE DU CHARGEMENT À 100% AVEC ERREUR ADMINISTRATIVE
function startTransferAnimation() {
   const beneficiary = document.getElementById('beneficiary').value.trim();
   const iban = document.getElementById('iban-input').value.trim();
   const bic = document.getElementById('bic-input').value.trim();
   const amount = parseFloat(document.getElementById('amount-input').value);
   const reason = document.getElementById('reason-input').value.trim();

   if (!beneficiary || !iban || !bic || isNaN(amount) || amount <= 0 || !reason) {
       alert("Contrôle système : Veuillez renseigner l'intégralité des informations requises.");
       return;
   }

   // Basculer du formulaire vers la jauge de chargement
   document.getElementById('form-container').style.display = 'none';
   document.getElementById('loader-container').style.display = 'block';

   let progress = 0;
   const progressFill = document.getElementById('progress-bar-fill');
   const progressText = document.getElementById('progress-text');

   const interval = setInterval(() => {
       progress += Math.floor(Math.random() * 8) + 2; // Avancement irrégulier pour faire vrai
       if (progress >= 100) {
           progress = 100;
           clearInterval(interval);
           
           // Une fois à 100%, déclencher la boîte d'échec
           setTimeout(() => {
               alert(`⚠️ ÉCHEC CRITIQUE DE TRANSMISSION INTERBANCAIRE\n\nVotre virement de ${amount.toLocaleString('fr-FR')} € vers ${beneficiary} a été REJETÉ.\n\nMotif : Compte bancaire bloqué par mesure de sécurité administrative nationale. Vous devez impérativement vous rendre dans votre agence Fortuneo Haute Gestion muni d'un justificatif d'identité original.`);
               
               // Ajouter l'opération en échec dans l'historique
               const list = document.getElementById('transactions-list');
               const newItem = document.createElement('div');
               newItem.className = 'transaction-item blocked-tx';
               newItem.onclick = function() {
                   openDetails(`Virement Rejeté (${reason})`, `-${amount.toLocaleString('fr-FR')} €`, 'Aujourd\'hui', `Échec d'envoi vers ${beneficiary} (Motif: ${reason}) - Compte sous restrictions administratives graves. Présentation physique requise.`, 'REFUSÉ PAR LA BANQUE');
               };
               newItem.innerHTML = `
                   <div class="tx-info">
                       <span class="tx-title" style="color:#ef4444;">❌ Virement Bloqué — ${reason}</span>
                       <span class="tx-date">Aujourd'hui • Vers ${beneficiary}</span>
                   </div>
                   <span class="tx-amount negative" style="text-decoration: line-through;">-${amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
               `;
               list.insertBefore(newItem, list.firstChild);

               // Réinitialiser le formulaire et l'affichage
               document.getElementById('beneficiary').value = '';
               document.getElementById('iban-input').value = '';
               document.getElementById('bic-input').value = '';
               document.getElementById('amount-input').value = '';
               document.getElementById('reason-input').value = '';

               document.getElementById('loader-container').style.display = 'none';
               document.getElementById('form-container').style.display = 'block';
               showSection('home-section');
           }, 600);
       }
       progressFill.style.width = progress + '%';
       progressText.innerText = progress + '%';
   }, 150); // Met environ 3 secondes à charger à 100%
}

// NAVIGATION DU POP-UP DE DÉTAILS
function openDetails(title, amount, date, reason, status) {
   document.getElementById('modal-title').innerText = title;
   document.getElementById('modal-type').innerText = title;
   document.getElementById('modal-amount').innerText = amount;
   document.getElementById('modal-date').innerText = date;
   document.getElementById('modal-reason').innerText = reason;
   document.getElementById('modal-status').innerText = status;
   
   const statusLabel = document.getElementById('modal-status');
   if(status === 'Validé') { statusLabel.style.color = '#10b981'; } else { statusLabel.style.color = '#ef4444'; statusLabel.style.fontWeight = 'bold'; }

   document.getElementById('tx-modal').style.display = 'flex';
}

function closeDetails() {
   document.getElementById('tx-modal').style.display = 'none';
}

if (sessionStorage.getItem('isLoggedIn') === 'true') {
   document.getElementById('login-screen').style.display = 'none';
   document.getElementById('app-screen').style.display = 'flex';
   document.getElementById('balance').innerText = (7585024).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
} else {
   document.getElementById('login-screen').style.display = 'flex';
   document.getElementById('app-screen').style.display = 'none';
}
