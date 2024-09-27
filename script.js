let product;
let factorPairs = [];

function startExercise() {
    document.getElementById("questionContainer").classList.remove("hidden");
    generateQuestion();

    // Lägg till event listener som triggar när användaren trycker på Enter
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();  // Anropa checkAnswer() när Enter trycks
        }
    });

    // Sätt fokus på första faktorfältet när träningen startar
    document.getElementById("factor1").focus();
}

function generateQuestion() {
    let factor1, factor2;
    let useTable11Or12 = Math.random() < 0.5; // 50% sannolikhet för att använda 11 eller 12

    if (useTable11Or12) {
        // 50% av fallen ska vi ha en av faktorerna som 11 eller 12
        if (Math.random() < 0.5) {
            // Om det är 11:ans tabell, se till att produkten är över 99 (dvs faktor2 minst 10)
            factor1 = 11;
            factor2 = Math.floor(Math.random() * 3) + 10; // Faktor2 blir antingen 10, 11 eller 12
        } else {
            // För 12:ans tabell är det ingen restriktion
            factor1 = 12;
            factor2 = Math.floor(Math.random() * 12) + 1; // Slumpa faktor2 mellan 1 och 12
        }
    } else {
        // Resterande 50% slumpar vi fritt båda faktorerna mellan 1 och 12
        factor1 = Math.floor(Math.random() * 12) + 1;
        factor2 = Math.floor(Math.random() * 12) + 1;
    }

    // Räkna ut produkten
    product = factor1 * factor2;

    // Hitta alla möjliga faktorkombinationer till produkten
    factorPairs = findFactorPairs(product);

    // Visa produkten i frågan
    document.getElementById("question").innerText = `Vilka två faktorer multipliceras till ${product}?`;

    // Rensa inputfält och feedback
    document.getElementById("factor1").value = '';
    document.getElementById("factor2").value = '';
    document.getElementById("feedback").innerText = '';

    // Sätt fokus på första faktorfältet
    document.getElementById("factor1").focus();
}

// Funktion för att hitta alla faktorkombinationer till en produkt
function findFactorPairs(num) {
    let pairs = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            let correspondingFactor = num / i;
            // Lägg till faktorparet i listan
            pairs.push([i, correspondingFactor]);
        }
    }
    return pairs;
}

function checkAnswer() {
    // Hämta användarens svar från inputfälten
    const userFactor1 = parseInt(document.getElementById("factor1").value);
    const userFactor2 = parseInt(document.getElementById("factor2").value);

    // Kolla om användarens faktorer finns bland alla möjliga faktorkombinationer
    let correct = false;
    for (let pair of factorPairs) {
        if ((userFactor1 === pair[0] && userFactor2 === pair[1]) ||
            (userFactor1 === pair[1] && userFactor2 === pair[0])) {
            correct = true;
            break;
        }
    }

    // Visa feedback beroende på om svaret är rätt eller fel
    if (correct) {
        document.getElementById("feedback").innerText = "Rätt!";
    } else {
        const correctAnswers = factorPairs.map(pair => `${pair[0]} och ${pair[1]}`).join(', ');
        document.getElementById("feedback").innerText = `Fel! Möjliga faktorer är: ${correctAnswers}.`;
    }

    // Efter 2 sekunder generera en ny fråga och fokusera på första faktorfältet
    setTimeout(() => {
        generateQuestion();
        document.getElementById("factor1").focus();  // Fokusera på första inputfältet
    }, 3000);
}
