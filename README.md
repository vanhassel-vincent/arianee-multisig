# Arianee-Multisig
Arianee-Multisig project to implement Multisig majority consensus on Arianee Project. 

- Arianee Github : https://github.com/Arianee/ArianeeMaster
- Arianee Documentation : https://docs.arianee.org/docs/arianee-project

# But du projet 

- "Approve" donné au contrat pour un certificat
- Liste "d'amis" ajouté au contrat (addresse ethereum)
- Si plus de 50% des amis change le propriétaire, déclenchement d'un "transfert" vers le nouveau propriétaire

# Interface - ReactJS

- Publier un contrat de récupération MultiSignatures et y ajouter des adresses de personne pouvant nous aider à récupérer notre certificat si un problème grave est arrivé.


- L'utilisateur va déclencher la fonction "approve" sur le contrat ERC 721 afin d'ajouter l'adresse du contrat de récupération publié auparavant.

- Lorsque les " amis " qui sont indiqués sur le contrat de récupération recoivent un message de l'utilisateur pour déclencher la fonction de récupération dans laquelle ils indiquent l'adresse transmise par l'utilisateur, qui sera la nouvelle adresse détentrice du certificat.

# API - NodeJS
