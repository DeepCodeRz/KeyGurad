const passwordToAnalyze = document.getElementById("password-to-analyze")
const analyzeBtn = document.getElementById("analyzeBtn")

analyzeBtn.addEventListener("click", function(event) {
    event.preventDefault()

    let securityScore = 0

    let containsUpper = /[A-Z]/.test(passwordToAnalyze);
    let containsLower = /[a-z]/.test(passwordToAnalyze);
    let containsNum = /[0-9]/.test(passwordToAnalyze);

    if (containsUpper) {
        securityScore += 1;
    }

    if (containsLower) {
        securityScore += 1;
    }

    if (containsNum) {
        securityScore += 1;
    }

    console.log(securityScore);
})