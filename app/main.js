const list = document.getElementById("list");
let value = 3;

let signature = [];
let multisig = [];
let certif = [];
let owner = [];

function add() {
    if(value < 200) {
        value += 1;
        list.innerHTML += `
        <div class="form-group" id="group-form-` + value + `">
            <input class="form-control form-control-lg" id="key-` + value + `" type="text" placeholder="pubKey n°` + value + `">
        </div>`;
        value += 1;
        list.innerHTML += `
        <div class="form-group" id="group-form-` + value + `">
            <input class="form-control form-control-lg" id="key-` + value + `" type="text" placeholder="pubKey n°` + value + `">
        </div>`;
    }
    return value;
}

function remove() {
    if(value > 3) {
        document.getElementById('group-form-' + value).outerHTML = "";
        value -= 1;
        document.getElementById('group-form-' + value).outerHTML = "";
        value -= 1;
    }
    return value;
}

function signatureForm() {
    signature = []
    for(let x = 1; x <= value; x++) {
        if(document.getElementById('key-' + value) == null) {
            signature = [];
            document.getElementById('warning-signature').innerHTML = '<h6>toutes les signatures ne sont pas présentent</h6>';
            return;
        }
        else {
            signature.push(document.getElementById(`key-` + x).value);
        }
    }
    console.log(signature);
    return signature;
}

function multisigApprove() {
    multisig = [];
    if (document.getElementById('privateKey').value) {
        if (document.getElementById('multiSig').value) {
            multisig.push(document.getElementById('privateKey').value);
            multisig.push(document.getElementById('multiSig').value);
        }
    } else {
        document.getElementById('warning-multisig').innerHTML = '<h6>les input sont vides</h6>';
    }
    console.log(multisig);
    return multisig;
}

function multisigMigrate() {
    certif = [];
    if (document.getElementById('certif').value) {
        if (document.getElementById('newAddresse').value) {
            certif.push(document.getElementById('certif').value);
            certif.push(document.getElementById('newAddresse').value);
        }
    } else {
        document.getElementById('warning-certif').innerHTML = '<h6>les input sont vides</h6>';
    }
    console.log(certif);
    return certif;
}

function newOwner() {
    owner = [];
    if (document.getElementById('ownerKey').value) {
        owner.push(document.getElementById('ownerKey').value)
    } else {
        document.getElementById('warning-owner').innerHTML = '<h6>aucune clef privée</h6>';
    }
    console.log(owner)
    return owner;
}