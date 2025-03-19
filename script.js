function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    if (!birthdateInput) {
        alert("Veuillez entrer une date de naissance valide !");
        return;
    }

    const birthdate = new Date(birthdateInput);
    const today = new Date('2025-03-19');
    if (birthdate > today) {
        alert("La date de naissance ne peut pas être dans le futur !");
        return;
    }

    // Afficher le chargement
    const loadingDiv = document.getElementById('loading');
    loadingDiv.classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');

    setTimeout(() => {
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        const dayDiff = today.getDate() - birthdate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        const daysLived = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));
        const funFacts = [
            `À ${age} ans, tu pourrais avoir vu environ ${age * 50} couchers de soleil mémorables !`,
            `Tu as peut-être ri ${daysLived * 5} fois dans ta vie !`,
            `À cet âge, tu pourrais avoir marché l'équivalent de ${Math.floor(daysLived / 100)} tours du monde !`
        ];
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

        // Afficher le résultat
        loadingDiv.classList.add('hidden');
        const resultDiv = document.getElementById('result');
        const ageSpan = document.getElementById('age');
        const extraInfo = document.getElementById('extra-info');
        const funFact = document.getElementById('fun-fact');

        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('show-result');

        let currentAge = 0;
        const interval = setInterval(() => {
            if (currentAge <= age) {
                ageSpan.textContent = currentAge;
                ageSpan.classList.add('count-up');
                currentAge++;
            } else {
                clearInterval(interval);
            }
        }, 50);

        extraInfo.textContent = `Tu as vécu environ ${daysLived} jours !`;
        funFact.textContent = randomFact;
    }, 1000); // Délai pour simuler un calcul
}

function resetForm() {
    document.getElementById('birthdate').value = '';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
}

document.getElementById('birthdate').max = '2025-03-19';