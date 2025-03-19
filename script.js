function calculateAge(){
    const birthdateInput = document.getElementById('birthdate').value ;
    if(!birthdateInput){
        alert("Veuillez entrer une date de naissance !") ;
        return ;
    }
    const birthdate = new Date(birthdateInput) ;
    const today = new Date('2025-03-19');
    let age = today.getFullYear() - birthdate.getFullYear();
}