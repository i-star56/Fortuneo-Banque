/* ==========================================
   FORTUNEO BANQUE PREMIUM
   SCRIPT FINAL FUSIONNÉ
========================================== */


let connectedUser = null;


/* ==========================================
   DEMARRAGE APPLICATION
========================================== */


document.addEventListener("DOMContentLoaded", () => {


    const loginForm =
    document.getElementById("login-form");


    const loginButton =
    document.querySelector(".btn-connexion");


    const logoutButton =
    document.querySelector(".btn-logout-icon")
    ||
    document.getElementById("logout-button");




    /* ======================================
       RESTAURATION SESSION
    ====================================== */


    const savedUser =
    localStorage.getItem("connectedUser");



    if(savedUser){


        const user =
        usersDatabase.find(
            u => u.id == savedUser
        );



        if(user){

            connectedUser = user;

            openClientSpace();

        }


    }





    /* ======================================
       CONNEXION
    ====================================== */


    if(loginForm){


        loginForm.addEventListener(
        "submit",
        function(e){


            e.preventDefault();



            connectUser();



        });



    }






    if(loginButton){


        loginButton.addEventListener(
        "click",
        function(e){


            e.preventDefault();


            connectUser();


        });


    }









    function connectUser(){



        const username =
        document
        .getElementById("username")
        .value
        .trim();




        const password =
        document
        .getElementById("password")
        .value;






        const user =

        usersDatabase.find(

            u =>

            u.username === username

            &&

            u.password === password

        );







        if(!user){


            showMessage(
            "Identifiant ou mot de passe incorrect."
            );


            return;


        }






        connectedUser = user;



        localStorage.setItem(

            "connectedUser",

            user.id

        );







        if(loginButton){


            loginButton.innerText =
            "Authentification...";


            loginButton.disabled=true;


        }





        setTimeout(()=>{


            openClientSpace();



        },700);





    }









    function showMessage(message){



        let box =
        document.getElementById(
            "login-message"
        );



        if(box){


            box.innerText=message;


        }

        else{


            alert(message);


        }



    }











/* ==========================================
   OUVERTURE ESPACE CLIENT
========================================== */


function openClientSpace(){



    const loginScreen =
    document.getElementById(
        "login-screen"
    )
    ||
    document.getElementById(
        "login-page"
    );



    const appScreen =
    document.getElementById(
        "app-screen"
    )
    ||
    document.getElementById(
        "client-space"
    );





    if(loginScreen){


        loginScreen.style.display="none";


    }





    if(appScreen){


        appScreen.style.display="flex";


        appScreen.classList.remove(
            "hidden"
        );


    }







    loadAllData();




}









/* ==========================================
   CHARGEMENT GLOBAL
========================================== */


function loadAllData(){



    if(!connectedUser)
    return;





    loadHeader();


    loadProfile();


    loadAccount();


    loadBalance();


    loadOperations();


    loadDashboard();


    loadCards();


    loadNotifications();


    loadStatistics();




}






/* ==========================================
   HEADER UTILISATEUR
========================================== */


function loadHeader(){



    const p =
    connectedUser.profile;




    const name =

    `${p.firstName} ${p.lastName}`;





    const nameBox =
    document.getElementById(
        "client-name"
    )
    ||
    document.querySelector(
        ".user-status"
    );



    if(nameBox){


        nameBox.innerText=name;


    }




    const avatar =
    document.querySelector(
        ".avatar"
    );



    if(avatar){


        avatar.innerText =
        p.initials;


    }





}
/* ==========================================
   AFFICHAGE SOLDE
========================================== */


function loadBalance(){



    const balance =
    connectedUser.account.balance;




    const balanceBox =

    document.getElementById(
        "balance"
    )
    ||

    document.getElementById(
        "account-balance"
    );




    if(balanceBox){


        balanceBox.innerText =
        formatMoney(balance);


    }



}









/* ==========================================
   COMPTE BANCAIRE
========================================== */


function loadAccount(){



    const user =
    connectedUser;



    const container =
    document.getElementById(
        "accounts-container"
    );




    if(container){



        container.innerHTML = `


        <h3>
        ${user.account.name}
        </h3>


        <p>
        Solde disponible :
        <strong>
        ${formatMoney(
            user.account.balance
        )}
        </strong>
        </p>


        <p>
        ${user.account.status}
        </p>


        `;



    }





    const iban =
    document.getElementById(
        "rib-iban"
    );



    const bic =
    document.getElementById(
        "rib-bic"
    );



    const number =
    document.getElementById(
        "rib-number"
    );



    const holder =
    document.getElementById(
        "rib-holder"
    );





    if(holder)
    holder.innerText =
    `${user.profile.firstName} ${user.profile.lastName}`;



    if(iban)
    iban.innerText =
    user.account.bankingDetails.iban;




    if(bic)
    bic.innerText =
    user.account.bankingDetails.bic;




    if(number)
    number.innerText =
    user.account.bankingDetails.accountNumber;




}









/* ==========================================
   PROFIL
========================================== */


function loadProfile(){



    const profile =
    connectedUser.profile;




    const fullName =
    document.getElementById(
        "profile-full-name"
    );



    const email =
    document.getElementById(
        "profile-email"
    );



    const phone =
    document.getElementById(
        "profile-phone"
    );



    const login =
    document.getElementById(
        "profile-login"
    );





    if(fullName)
    fullName.innerText =
    `${profile.firstName} ${profile.lastName}`;




    if(email)
    email.innerText =
    profile.email;




    if(phone)
    phone.innerText =
    profile.phone;




    if(login)
    login.innerText =
    connectedUser.username;



}









/* ==========================================
   HISTORIQUE OPERATIONS
========================================== */


function loadOperations(){



    const box =

    document.getElementById(
        "history-container"
    );




    if(!box)
    return;





    box.innerHTML="";





    connectedUser.operations
    .forEach(operation=>{



        const item =
        document.createElement(
            "div"
        );



        item.className =
        "operation";



        item.innerHTML = `


        <div>

        <strong>
        ${operation.label}
        </strong>


        <br>


        <small>
        ${operation.date}
        </small>


        </div>



        <div>


        <b>
        ${operation.amount}
        </b>


        <br>


        <small>
        ${operation.category}
        </small>


        </div>



        `;




        item.onclick = () =>

        openOperationDetails(
            operation
        );




        box.appendChild(item);



    });



}









/* ==========================================
   DASHBOARD DERNIERES OPERATIONS
========================================== */


function loadDashboard(){



    const box =

    document.getElementById(
        "dashboard-history"
    )
    ||

    document.getElementById(
        "transactions-list"
    );





    if(!box)
    return;





    box.innerHTML="";






    connectedUser.operations
    .slice(0,5)
    .forEach(op=>{



        const div =
        document.createElement(
            "div"
        );



        div.className =
        "transaction-item";




        div.innerHTML = `


        <div class="tx-info">

        <span class="tx-title">
        ${op.label}
        </span>


        <span class="tx-date">
        ${op.date}
        </span>


        </div>



        <span class="tx-amount 
        ${op.amount.includes("-") ? 
        "negative":"positive"}">


        ${op.amount}


        </span>



        `;




        div.onclick = () =>
        openOperationDetails(op);




        box.appendChild(div);



    });



}









/* ==========================================
   CARTES BANCAIRES
========================================== */


function loadCards(){



    const box =
    document.getElementById(
        "cards-container"
    );



    if(!box)
    return;





    const card =
    connectedUser.card;





    box.innerHTML = `


    <div class="credit-card-ui">


    <div class="cc-brand">
    fortuneo
    </div>


    <div class="cc-chip"></div>


    <div class="cc-number">

    **** **** **** ${card.number}

    </div>



    <div class="cc-footer">


    <div>

    <span class="cc-label">
    TITULAIRE
    </span>


    <span class="cc-value">
    ${card.holder}
    </span>


    </div>


    <span>
    ${card.type}
    </span>


    </div>


    </div>



    `;



}








/* ==========================================
   FORMAT MONETAIRE
========================================== */


function formatMoney(value){


    return new Intl.NumberFormat(
        "fr-FR",
        {
            style:"currency",
            currency:"EUR"
        }

    ).format(value);



}/* ==========================================
   NOTIFICATIONS
========================================== */


function loadNotifications(){



    const box =
    document.getElementById(
        "notifications-container"
    );



    if(!box)
    return;





    box.innerHTML="";





    connectedUser.notifications
    .forEach(notification=>{



        const item =
        document.createElement(
            "p"
        );



        item.innerHTML = `
        
        🔔 ${notification}

        `;



        box.appendChild(item);



    });



}









/* ==========================================
   STATISTIQUES COMPTE
========================================== */


function loadStatistics(){



    let income = 0;

    let expense = 0;





    connectedUser.operations
    .forEach(op=>{



        const amount =

        parseFloat(

            op.amount

            .replace("€","")

            .replace(/\s/g,"")

            .replace(",",".")
        );





        if(amount > 0){

            income += amount;

        }
        else{

            expense += Math.abs(amount);

        }



    });






    const count =
    document.getElementById(
        "operation-count"
    );



    const incomeBox =
    document.getElementById(
        "income-total"
    );



    const expenseBox =
    document.getElementById(
        "expense-total"
    );





    if(count)

    count.innerText =
    connectedUser.operations.length;




    if(incomeBox)

    incomeBox.innerText =
    formatMoney(income);




    if(expenseBox)

    expenseBox.innerText =
    formatMoney(expense);



}









/* ==========================================
   RECHERCHE HISTORIQUE
========================================== */


const searchInput =

document.getElementById(
    "history-search"
);



if(searchInput){



searchInput.addEventListener(

"input",

function(){



    const value =

    this.value
    .toLowerCase();





    document

    .querySelectorAll(
        ".operation"
    )

    .forEach(item=>{



        item.style.display =

        item.innerText
        .toLowerCase()
        .includes(value)

        ?

        "flex"

        :

        "none";



    });



}



);



}









/* ==========================================
   DETAIL OPERATION
========================================== */


function openOperationDetails(operation){



    const modal =

    document.getElementById(
        "operation-modal"
    )
    ||

    document.getElementById(
        "tx-modal"
    );





    if(!modal)
    return;





    const details =

    document.getElementById(
        "operation-details"
    );





    if(details){



        details.innerHTML = `


        <p>
        <strong>Libellé :</strong>
        ${operation.label}
        </p>



        <p>
        <strong>Date :</strong>
        ${operation.date}
        </p>



        <p>
        <strong>Catégorie :</strong>
        ${operation.category}
        </p>



        <p>
        <strong>Référence :</strong>
        ${operation.reference}
        </p>



        <p>
        <strong>Description :</strong>
        ${operation.description}
        </p>



        <p>
        <strong>Montant :</strong>
        ${operation.amount}
        </p>



        `;



    }






    modal.style.display =
    "flex";


    modal.classList.remove(
        "hidden"
    );



}









const closeModal =

document.getElementById(
    "close-modal"
);



if(closeModal){



closeModal.onclick = function(){



    const modal =

    document.getElementById(
        "operation-modal"
    );



    if(modal)

    modal.classList.add(
        "hidden"
    );



};



}









/* ==========================================
   NAVIGATION ENTRE LES PAGES
========================================== */


window.showPage = function(page){



    document

    .querySelectorAll(
        ".website-page"
    )

    .forEach(section=>{


        section.classList.remove(
            "active-page"
        );


    });






    const target =

    document.getElementById(
        page
    );





    if(target){


        target.classList.add(
            "active-page"
        );


    }




};









/* ==========================================
   NAVIGATION APPLICATION MOBILE
========================================== */


window.showSection = function(sectionId){



    document

    .querySelectorAll(
        ".app-section"
    )

    .forEach(section=>{


        section.classList.remove(
            "active-section"
        );


    });






    const section =

    document.getElementById(
        sectionId
    );





    if(section){


        section.classList.add(
            "active-section"
        );


    }





    document

    .querySelectorAll(
        ".nav-item"
    )

    .forEach(btn=>{


        btn.classList.remove(
            "active-nav"
        );


    });





    if(event && event.currentTarget){


        event.currentTarget
        .classList.add(
            "active-nav"
        );


    }




};









/* ==========================================
   DECONNEXION
========================================== */


window.logout = function(){



    localStorage.removeItem(
        "connectedUser"
    );



    sessionStorage.removeItem(
        "isLoggedIn"
    );



    window.location.reload();



};





const logoutButton =

document.getElementById(
    "logout-button"
);



if(logoutButton){


    logoutButton.onclick =
    logout;


}/* ==========================================
   VIREMENT BANCAIRE
========================================== */


const transferButton =

document.getElementById(
    "transfer-button"
)
||
document.getElementById(
    "btn-transfert"
);





if(transferButton){



    transferButton.onclick =

    startTransfer;




}









function startTransfer(){



    const beneficiary =

    document.getElementById(
        "beneficiary-name"
    )
    ||
    document.getElementById(
        "beneficiary"
    );




    const iban =

    document.getElementById(
        "beneficiary-iban"
    )
    ||
    document.getElementById(
        "iban-input"
    );




    const amountInput =

    document.getElementById(
        "transfer-amount"
    )
    ||
    document.getElementById(
        "amount-input"
    );




    const reasonInput =

    document.getElementById(
        "transfer-reason"
    )
    ||
    document.getElementById(
        "reason-input"
    );





    if(
        !beneficiary.value ||
        !iban.value ||
        !amountInput.value ||
        !reasonInput.value
    ){


        alert(
        "Veuillez remplir toutes les informations du virement."
        );


        return;


    }






    const amount =

    Number(
        amountInput.value
    );






    if(amount <= 0){


        alert(
        "Le montant doit être supérieur à zéro."
        );


        return;


    }








    const form =

    document.getElementById(
        "form-container"
    );



    const loader =

    document.getElementById(
        "loader-container"
    );






    if(form)

    form.style.display="none";



    if(loader)

    loader.style.display="block";






    let progress = 0;





    const progressBar =

    document.getElementById(
        "progress-bar-fill"
    );



    const progressText =

    document.getElementById(
        "progress-text"
    );






    const interval =

    setInterval(()=>{



        progress +=

        Math.floor(
            Math.random()*10
        )+5;





        if(progress >= 100){



            progress = 100;


            clearInterval(
                interval
            );





            setTimeout(()=>{



                finishTransfer(
                    beneficiary.value,
                    amount,
                    reasonInput.value
                );



            },600);



        }





        if(progressBar)

        progressBar.style.width =
        progress+"%";





        if(progressText)

        progressText.innerText =
        progress+"%";





    },180);





}









/* ==========================================
   RESULTAT VIREMENT
========================================== */


function finishTransfer(
    beneficiary,
    amount,
    reason
){





    alert(

    "Votre demande de virement a été enregistrée."

    );






    const history =

    document.getElementById(
        "dashboard-history"
    )
    ||
    document.getElementById(
        "transactions-list"
    );





    if(history){



        const item =

        document.createElement(
            "div"
        );



        item.className =
        "transaction-item";





        item.innerHTML = `


        <div class="tx-info">

        <span class="tx-title">
        Virement demandé
        </span>


        <span class="tx-date">
        Aujourd'hui • ${reason}
        </span>


        </div>



        <span class="tx-amount negative">

        -${formatMoney(amount)}

        </span>


        `;



        history.prepend(item);



    }






    const form =

    document.getElementById(
        "form-container"
    );



    const loader =

    document.getElementById(
        "loader-container"
    );





    if(loader)

    loader.style.display="none";



    if(form)

    form.style.display="block";





}









/* ==========================================
   DATE AUTOMATIQUE
========================================== */


const dateBox =

document.getElementById(
    "current-date"
);



if(dateBox){



    dateBox.innerText =

    new Date()

    .toLocaleDateString(
        "fr-FR"
    );


}









/* ==========================================
   MEMORISATION IDENTIFIANT
========================================== */


const remember =

document.getElementById(
    "remember"
);





const usernameField =

document.getElementById(
    "username"
);





if(remember && usernameField){



    const savedLogin =

    localStorage.getItem(
        "savedLogin"
    );



    if(savedLogin){


        usernameField.value =
        savedLogin;


        remember.checked=true;


    }





    remember.addEventListener(
    "change",
    ()=>{


        if(remember.checked){


            localStorage.setItem(
                "savedLogin",
                usernameField.value
            );


        }

        else{


            localStorage.removeItem(
                "savedLogin"
            );


        }



    });



}









/* ==========================================
   SECURITE : FERMETURE AUTO SESSION
========================================== */


let inactivityTimer;



function resetTimer(){



    clearTimeout(
        inactivityTimer
    );



    inactivityTimer =

    setTimeout(()=>{


        if(localStorage.getItem(
            "connectedUser"
        )){


            alert(
            "Votre session a expiré."
            );


            logout();


        }



    },30*60*1000);



}



document.addEventListener(
"mousemove",
resetTimer
);



document.addEventListener(
"keypress",
resetTimer
);



resetTimer();





/* ==========================================
   FIN SCRIPT FINAL
========================================== */
