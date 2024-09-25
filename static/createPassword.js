let generateBtn = document.getElementById('generateBtn');

function generatePassword() {
    generateBtn.addEventListener('click', function () {
        const length = document.getElementById('length').value;
        const uppercase = document.getElementById('uppercase').checked;
        const lowercase = document.getElementById('lowercase').checked;
        const numbers = document.getElementById('numbers').checked;
        const special = document.getElementById('special').checked;
        const keyword = document.getElementById('keyword').value;

        document.getElementById('generated-password').classList.add('hidden');
        document.getElementById('showHide').innerHTML = 'Show password'

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
                            document.getElementById('generated-password').value = data.password;
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

function copy() {
    const copy = document.getElementById('copy');
    const password = document.getElementById('generated-password').value;

    copy.innerHTML = `<i class="ri-check-line"></i>`;

    setTimeout(function() {
        copy.innerHTML = `<i class="ri-clipboard-line"></i>`;
    }, 2000);

    navigator.clipboard.writeText(password);
}

function showHide(){
    const showHideBtn = document.getElementById('showHide')
    const password = document.getElementById('generated-password')

    if (showHideBtn.innerHTML === `<i class="ri-eye-line"></i>`) {
        password.classList.remove('hidden');
        showHideBtn.innerHTML = `<i class="ri-eye-off-line"></i>`
    } else {
        password.classList.add('hidden');
        showHideBtn.innerHTML = `<i class="ri-eye-line"></i>`
    }
}