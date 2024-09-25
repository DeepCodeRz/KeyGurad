const analyzeBtn = document.getElementById("analyzeBtn")
const strengthMeter = document.getElementsByClassName("strength-meter-fill")[0]
const strengthText = document.getElementById("strength-text")

analyzeBtn.addEventListener("click", function(event) {
    event.preventDefault()

    const passwordToAnalyze = document.getElementById("password-to-analyze").value

    let securityScore = 0

    let containsUpper = /[A-Z]/.test(passwordToAnalyze);
    let containsLower = /[a-z]/.test(passwordToAnalyze);
    let containsNum = /\d/.test(passwordToAnalyze);
    let containsSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordToAnalyze);
    let checkLength = passwordToAnalyze.length;
    let checkCommonPassword = true

    fetch('/checkCommonPassword', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({passwordToAnalyze})
    }).then(res => res.json()).then((data) => {

        if (data["true"]) {
            checkCommonPassword = true
        } else {
            checkCommonPassword = false
            securityScore += 1;
        }

        function checkCriteria(criteria) {
            if (criteria) {
                securityScore += 1;
            }
        }

        checkCriteria(containsUpper)
        checkCriteria(containsLower)
        checkCriteria(containsNum)
        checkCriteria(containsSpecial)

        if (checkLength >= 12) {
            securityScore += 1;
        }

        function updateStrengthMeter(strength, width, text) {
            strengthMeter.classList.remove('weak', 'medium', 'strong');
            strengthMeter.classList.add(strength);
            strengthMeter.style.width = width;
            strengthText.innerText = text;
        }

        if (securityScore === 1) {
            updateStrengthMeter('weak', '15%', 'Too Weak');
        } else if (securityScore === 2) {
            updateStrengthMeter('weak', '30%', 'Weak');
        } else if (securityScore === 3 ) {
            updateStrengthMeter('medium', '40%', 'Medium');
        } else if (securityScore === 4) {
            updateStrengthMeter('medium', '60%', 'Medium');
        } else if (securityScore === 5) {
            updateStrengthMeter('strong', '80%', 'Strong');
        } else if (securityScore === 6) {
            updateStrengthMeter('strong', '100%', 'Strong');
        }


    })
})