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
    const resultDiv = document.getElementById('result');
    loadingDiv.classList.remove('hidden');
    resultDiv.classList.add('hidden');

    setTimeout(() => {
        // Calcul détaillé
        const diffMs = today - birthdate;
        const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
        const remainingMsAfterYears = diffMs % (1000 * 60 * 60 * 24 * 365.25);
        const months = Math.floor(remainingMsAfterYears / (1000 * 60 * 60 * 24 * 30.44));
        const remainingMsAfterMonths = remainingMsAfterYears % (1000 * 60 * 60 * 24 * 30.44);
        const days = Math.floor(remainingMsAfterMonths / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));

        // Afficher les résultats
        loadingDiv.classList.add('hidden');
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('show-result');

        animateValue('years', 0, years, 1000);
        animateValue('months', 0, months, 1000);
        animateValue('days', 0, days, 1000);
        animateValue('hours', 0, hours, 1500);
    }, 1000); // Délai pour simuler un calcul
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

function resetForm() {
    document.getElementById('birthdate').value = '';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
}

document.getElementById('birthdate').max = '2025-03-19';