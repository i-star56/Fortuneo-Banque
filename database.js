/* ======================================
   BASE DE DONNÉES CLIENTS
   FORTUNEO ESPACE CLIENT
====================================== */


const usersDatabase = [



{
    id:1,

    username:"450893127",

    password:"K9#pZ!m7$",



    profile:{


        firstName:"Edmond",

        lastName:"Garnier",

        initials:"EG",

        email:"edmond.garnier@example.com",

        phone:"06 00 00 00 01"


    },



    account:{


        name:"Compte Courant Excellence",

        balance:7585024.00,

        status:"Compte disponible",



        bankingDetails:{


            iban:"FR76 1180 6000 2001 9845 3321 094",

            bic:"FORFRPPXXX",

            accountNumber:"000000094"


        }


    },





    card:{


        type:"Mastercard World Elite",

        number:"8842",

        holder:"EDMOND GARNIER",

        expiry:"12/29",

        status:"Active"


    },






    operations:[


        {

            id:1,

            date:"26/07/2026",

            label:"Transfert d'actifs financiers",

            category:"Crédit",

            description:
            "Dépôt institutionnel",

            reference:
            "INV-20260726-001",

            amount:"+7 500 000,00 €"


        },



        {

            id:2,

            date:"24/07/2026",

            label:"Versement dividendes",

            category:"Crédit",

            description:
            "Rendements financiers",

            reference:
            "DIV-20260724-002",

            amount:"+85 024,00 €"


        },



        {

            id:3,

            date:"20/07/2026",

            label:"Paiement carte",

            category:"Carte",

            description:
            "Achat professionnel",

            reference:
            "CB-20260720-003",

            amount:"-2 450,00 €"


        }



    ],





    notifications:[


        "Votre espace personnel est sécurisé.",

        "Nouvelle opération disponible.",

        "Votre relevé bancaire est disponible."


    ]

},







{
    id:2,


    username:"975899351",

    password:"D#8@Z!B€$",




    profile:{


        firstName:"Brigitte",

        lastName:"Garnier",

        initials:"BG",

        email:
        "brigitte.garnier@example.com",

        phone:
        "06 00 00 00 02"


    },





    account:{


        name:
        "Compte Courant Premium",


        balance:
        1351254.50,


        status:
        "Compte disponible",




        bankingDetails:{


            iban:
            "FR76 1180 6000 2001 9845 3321 095",


            bic:
            "FORFRPPXXX",


            accountNumber:
            "000000095"


        }


    },







    card:{


        type:
        "Mastercard Premium",


        number:
        "7741",


        holder:
        "BRIGITTE GARNIER",


        expiry:
        "06/30",


        status:
        "Active"


    },








    operations:[


        {

            id:1,

            date:"25/07/2026",

            label:
            "Versement reçu",

            category:
            "Crédit",

            description:
            "Entrée de fonds",

            reference:
            "VER-20260725-001",

            amount:
            "+20 000,00 €"


        },



        {

            id:2,

            date:"18/07/2026",

            label:
            "Paiement carte",

            category:
            "Carte",

            description:
            "Achat magasin",

            reference:
            "CB-20260718-002",

            amount:
            "-350,40 €"


        },



        {

            id:3,

            date:"10/07/2026",

            label:
            "Prélèvement",

            category:
            "Débit",

            description:
            "Facture mensuelle",

            reference:
            "PRE-20260710-003",

            amount:
            "-180,00 €"


        }


    ],





    notifications:[


        "Votre historique a été mis à jour.",

        "Une opération récente est disponible.",

        "La sécurité de votre compte est active."


    ]

}




];






/* ======================================
   UTILITAIRE FORMAT MONNAIE
====================================== */


function formatMoney(value){


    return new Intl.NumberFormat(
        "fr-FR",
        {
            style:"currency",
            currency:"EUR"
        }

    ).format(value);



}
