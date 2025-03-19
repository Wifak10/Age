function calculateAge(){
    const birthdateInput = document.getElementById('birthdate').value ;
    if(!birthdateInput){
        alert("Veuillez entrer une date de naissance !") ;
        return ;
    }
    const birthdate = new Date(birthdateInput) ;
    const today = new Date('2025-03-19');
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth() ;
    const dayDiff = today.getDate() - birthdate.getDate();

    //Ajuster l'âge si l'anniverssaire n'est pas encore passé cette année
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age-- ;
    }
    //Calculer les jours vécus (approximation)
    const daysLived = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));
}