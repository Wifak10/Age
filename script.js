// Fonction principale pour calculer l'âge
function calculateAge() {
    // Récupère la valeur entrée dans le champ de date
    const birthdateInput = document.getElementById('birthdate').value;
    
    // Joue le son de clic
    const clickSound = document.getElementById('click-sound');

    // Récupère les éléments HTML pour le chargement et le résultat
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    // Cache les résultats au début
    resultDiv.classList.add('hidden');

    // Vérifie si une date a été entrée
    if (!birthdateInput) {
        Swal.fire({
            icon: 'warning',
            title: 'Oups !',
            text: "Il semble que tu n'aies pas entré de date de naissance. Essaye encore !",
            confirmButtonColor: '#ee2773',
            timer: 3000,
            timerProgressBar: true
        });
        return; // Arrête la fonction si rien n'est entré
    }

    // Crée un objet Date à partir de la date entrée par l'utilisateur
    const birthdate = new Date(birthdateInput);
    
    // Définit la date actuelle (fixée au 19 mars 2025 pour cet exemple)
    const today = new Date('2025-03-19');

    // Validation stricte de la date
    const [year, month, day] = birthdateInput.split('-').map(Number);
    const isValidDate = !isNaN(birthdate.getTime()) && // Vérifie si la date est valide
                       year >= 1900 && year <= today.getFullYear() && // Année entre 1900 et aujourd'hui
                       month >= 1 && month <= 12 && // Mois entre 1 et 12
                       day >= 1 && day <= new Date(year, month, 0).getDate(); // Jour valide pour le mois

    if (!isValidDate) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Hmm... Cette date semble incorrecte (année, mois ou jour invalide). Vérifie et réessaie !",
            confirmButtonColor: '#ee2773',
            timer: 3000,
            timerProgressBar: true
        });
        return; // Arrête la fonction si la date est invalide
    }

    // Vérifie si la date de naissance est dans le futur
    if (birthdate > today) {
        Swal.fire({
            icon: 'info',
            title: 'Voyageur du temps ?',
            text: "Ta date de naissance est dans le futur. Entre une date valide !",
            confirmButtonColor: '#ee2773',
            timer: 3000,
            timerProgressBar: true
        });
        return; // Arrête la fonction si la date est dans le futur
    }

    // Affiche l'animation de chargement
    loadingDiv.classList.remove('hidden');

    // Simule un délai de 1 seconde pour donner un effet de "calcul"
    setTimeout(() => {
        // Calcule la différence en millisecondes entre aujourd'hui et la date de naissance
        const diffMs = today - birthdate;

        // Calcule les années : divise les millisecondes par le nombre de millisecondes dans une année (365.25 jours pour les années bissextiles)
        const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
        
        // Calcule ce qui reste après avoir retiré les années complètes
        const remainingMsAfterYears = diffMs % (1000 * 60 * 60 * 24 * 365.25);
        
        // Calcule les mois restants : divise les millisecondes restantes par le nombre moyen de millisecondes dans un mois (30.44 jours)
        const months = Math.floor(remainingMsAfterYears / (1000 * 60 * 60 * 24 * 30.44));
        
        // Calcule ce qui reste après avoir retiré les mois
        const remainingMsAfterMonths = remainingMsAfterYears % (1000 * 60 * 60 * 24 * 30.44);
        
        // Calcule les jours restants : divise les millisecondes restantes par le nombre de millisecondes dans un jour
        const days = Math.floor(remainingMsAfterMonths / (1000 * 60 * 60 * 24));
        
        // Calcule le total des heures vécues depuis la naissance
        const hours = Math.floor(diffMs / (1000 * 60 * 60));

        // Cache le chargement et affiche les résultats
        loadingDiv.classList.add('hidden');
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('show-result');

        // Anime chaque valeur (années, mois, jours, heures) de 0 jusqu'à sa valeur finale
        animateValue('years', 0, years, 1000);  // 1000ms = 1 seconde
        animateValue('months', 0, months, 1000);
        animateValue('days', 0, days, 1000);
        animateValue('hours', 0, hours, 1500);  // Plus long pour les heures car plus grand nombre
    }, 1000); // Délai de 1 seconde avant d'afficher les résultats
}

// Fonction pour animer les nombres de manière fluide
function animateValue(id, start, end, duration) {
    // Récupère l'élément HTML où afficher la valeur (ex. : span avec id="years")
    const element = document.getElementById(id);
    
    // Initialise le timestamp de départ pour l'animation
    let startTimestamp = null;
    
    // Fonction qui met à jour la valeur à chaque frame
    const step = (timestamp) => {
        // Si c'est la première frame, enregistre le timestamp initial
        if (!startTimestamp) startTimestamp = timestamp;
        
        // Calcule le progrès (entre 0 et 1) en fonction du temps écoulé
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Calcule la valeur actuelle en interpolant entre "start" et "end"
        const value = Math.floor(progress * (end - start) + start);
        
        // Met à jour le texte dans l'élément HTML
        element.textContent = value;
        
        // Continue l'animation si elle n'est pas terminée
        if (progress < 1) {
            requestAnimationFrame(step); // Demande la prochaine frame
        }
    };
    
    // Lance l'animation
    requestAnimationFrame(step);
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    // Joue le son de réinitialisation
    const resetSound = document.getElementById('reset-sound');
    
    // Vide le champ de date
    document.getElementById('birthdate').value = '';
    
    // Cache les résultats et le chargement
    document.getElementById('result').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
}

// Définit la date maximale du champ de date à aujourd'hui (19 mars 2025)
document.getElementById('birthdate').max = '2025-03-19';