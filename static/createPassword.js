let generateBtn = document.getElementById('generateBtn');
let generatedPassword = document.getElementById("generated-password");

function generatePassword() {
    generateBtn.addEventListener('click', function () {
        const length = document.getElementById('length').value;
        const uppercase = document.getElementById('uppercase').checked;
        const lowercase = document.getElementById('lowercase').checked;
        const numbers = document.getElementById('numbers').checked;
        const special = document.getElementById('special').checked;
        const keyword = document.getElementById('keyword').value;

        generatedPassword.classList.add('hidden');
        document.getElementById('showHide').innerHTML = `<i class="ri-eye-line"></i>`

        if (keyword.length < length) {
            if ((uppercase === true || lowercase === true || numbers === true || special === true)) {
                async function fetchData() {
                    try {
                        console.log(uppercase, lowercase, numbers, special);
                        const response = await fetch('/options', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            cache: 'no-store',
                            body: JSON.stringify({
                                length: length,
                                uppercase: uppercase,
                                lowercase: lowercase,
                                numbers: numbers,
                                special: special,
                                keyword: keyword,
                            })
                        });
                        const data = await response.json();
                        if (data.password) {
                            await new Promise(resolve => setTimeout(resolve, 500));
                            generatedPassword.value = data.password;
                        } else if (data.error1) {
                            alert(data.error1);
                        }
                    } catch (error) {
                        console.error('Error:', error);

                    }
                }

                fetchData()
            } else {
                alert('Please select minimum one option to create a password!')
            }
        } else {
            alert('Password length is too short to create the keyword!')
        }
    })
}

generatePassword()

const registerCreatedPasswordBtn = document.getElementById('registerCreatedPassword')

registerCreatedPasswordBtn.addEventListener("click", function() {
    addPasswordModal.style.display = "block";
    document.getElementById("password").value = generatedPassword.value;
})

function analyzePassword() {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('analyzer').classList.add('active');
    document.getElementById('analysisNavLink').classList.add('active');

    document.getElementById('password-to-analyze').value = generatedPassword.value;
    analyzeBtn.click()
}


function copy() {
    const copy = document.getElementById('copy');
    const password = generatedPassword.value;

    copy.innerHTML = `<i class="ri-check-line"></i>`;

    setTimeout(function() {
        copy.innerHTML = `<i class="ri-clipboard-line"></i>`;
    }, 2000);

    navigator.clipboard.writeText(password);
}

function showHide(){
    const showHideBtn = document.getElementById('showHide')

    if (showHideBtn.innerHTML === `<i class="ri-eye-line"></i>`) {
        generatedPassword.classList.remove('hidden');
        showHideBtn.innerHTML = `<i class="ri-eye-off-line"></i>`
    } else {
        generatedPassword.classList.add('hidden');
        showHideBtn.innerHTML = `<i class="ri-eye-line"></i>`
    }
}