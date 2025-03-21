// Gestion des boutons de compteur
document.querySelectorAll('.counter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const field = this.dataset.field;
        const valueElement = document.getElementById(field);
        let value = parseInt(valueElement.textContent);

        const limits = {
            year: { min: 1900, max: new Date().getFullYear() },
            month: { min: 1, max: 12 },
            day: { min: 1, max: 31 }
        };

        if (this.classList.contains('up') && value < limits[field].max) {
            value++;
        } else if (this.classList.contains('down') && value > limits[field].min) {
            value--;
        }

        valueElement.textContent = value;
    });
});

// Validation de la saisie manuelle
document.querySelectorAll('.counter-value').forEach(valueElement => {
    valueElement.addEventListener('input', function() {
        let value = this.textContent.replace(/\D/g, ''); // Supprime tout sauf les chiffres
        const field = this.id;
        const limits = {
            year: { min: 1900, max: new Date().getFullYear() },
            month: { min: 1, max: 12 },
            day: { min: 1, max: 31 }
        };

        if (value === '') return; // Permet la suppression temporaire
        value = parseInt(value);
        if (value < limits[field].min) value = limits[field].min;
        if (value > limits[field].max) value = limits[field].max;
        this.textContent = value;
    });

    // Empêche les caractères non numériques lors de la saisie
    valueElement.addEventListener('keydown', function(e) {
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    });
});

function calculateAge() {
    const year = parseInt(document.getElementById('year').textContent);
    const month = parseInt(document.getElementById('month').textContent);
    const day = parseInt(document.getElementById('day').textContent);
    const resultDiv = document.getElementById('result');

    resultDiv.classList.add('hidden');

    const birthdate = new Date(year, month - 1, day);
    const today = new Date();

    const isValidDate = !isNaN(birthdate.getTime()) && 
                       year >= 1900 && year <= today.getFullYear() && 
                       month >= 1 && month <= 12 && 
                       day >= 1 && day <= new Date(year, month, 0).getDate();

    if (!isValidDate) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Cette date semble incorrecte. Vérifiez et réessayez !",
            confirmButtonColor: '#3498db',
            timer: 3000,
            timerProgressBar: true
        });
        return;
    }

    if (birthdate > today) {
        Swal.fire({
            icon: 'info',
            title: 'Voyageur du temps ?',
            text: "Votre date de naissance est dans le futur. Ajustez la date !",
            confirmButtonColor: '#3498db',
            timer: 3000,
            timerProgressBar: true
        });
        return;
    }

    setTimeout(() => {
        let years = today.getFullYear() - birthdate.getFullYear();
        let months = today.getMonth() - birthdate.getMonth();
        let days;

        if (months < 0 || (months === 0 && today.getDate() < birthdate.getDate())) {
            years--;
            months += 12;
        }

        if (today.getDate() < birthdate.getDate()) {
            months--;
            days = today.getDate();
        } else {
            days = today.getDate() - birthdate.getDate();
        }

        const diffMs = today - birthdate;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));

        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('show-result');

        animateValue('years', 0, years, 1000);
        animateValue('months', 0, months, 1000);
        animateValue('days', 0, days, 1000);
        animateValue('hours', 0, hours, 1500);
    }, 500);
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
    document.getElementById('year').textContent = '2000';
    document.getElementById('month').textContent = '1';
    document.getElementById('day').textContent = '1';
    document.getElementById('result').classList.add('hidden');
}