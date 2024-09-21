let passwordList = document.getElementsByClassName("password-list")[0];
const addPasswordBtn = document.getElementById("addPasswordBtn");
const addPasswordModal = document.getElementById("addPasswordModal");
const savePasswordBtn = document.getElementById("savePasswordBtn");
const closeAddPasswordModal = document.getElementById("closeAddPasswordModal");
const deletePasswordModal = document.getElementById("deletePasswordModal");
const confirmDeletePassword = document.getElementById("confirmDeletePasswordBtn");
const cancelDeletePassword = document.getElementById("cancelDeletePasswordBtn");
const closeDeletePasswordModal = document.getElementById("closeAddPasswordModal");
let password_id;


addPasswordBtn.addEventListener("click", function() {
    addPasswordModal.style.display = "block";
})

savePasswordBtn.addEventListener("click", function(event) {
    event.preventDefault()

    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('/addNewPassword', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({website, username, password})
    }).then(response => {
        return response.json()
    })
        .then(data => {
            password_id = data["password_id"]
            const newPassword = document.createElement("div");
            newPassword.id = `${password_id}-password-item`

            newPassword.className = `password-item`;
            newPassword.innerHTML = `<div>
                                 <strong>Website:</strong>
                                 <span style="color: var(--secondary-text-color);">${website}</span>
                                 <br>
                                 <strong>Username:</strong>
                                 <span style="color: var(--secondary-text-color);">${username}</span>
                                 <br>
                                 <strong>Password:</strong>
                                 <span id="${password_id}" class="hidden" style="color: var(--secondary-text-color);">${password}</span>
                             </div>
                             <div class="password-actions">
                                <button id="visibility-${password_id}" class="btn btn-icon" aria-label="Show/Hide Password"><i class="ri-eye-line"></i></button>
                                <button id="copy-${password_id}" class="btn btn-icon" aria-label="Copy Password"><i class="ri-clipboard-line"></i></button>
                                <button id="edit-${password_id}" class="btn btn-icon" aria-label="Edit Password"><i class="ri-edit-line"></i></button>
                                <button id="delete-${password_id}" class="btn btn-icon" aria-label="Delete Password"><i class="ri-delete-bin-line"></i></button>
                             </div>`;


            passwordList.appendChild(newPassword);

            const passwordCard = document.getElementById(`${password_id}-password-item`);
            const visibilityBtn = document.getElementById(`visibility-${password_id}`);
            const copyBtn = document.getElementById(`copy-${password_id}`);
            const deleteBtn = document.getElementById(`delete-${password_id}`);

            const passwordContent = document.getElementById(`${password_id}`);

            visibilityBtn.addEventListener("click", function() {
                if (passwordContent.classList.contains('hidden')) {
                    visibilityBtn.innerHTML = `<i class="ri-eye-off-line"></i>`;
                } else {
                    visibilityBtn.innerHTML = `<i class="ri-eye-line"></i>`;
                }

                passwordContent.classList.toggle('hidden')
            })

            copyBtn.addEventListener("click", function() {
                if (passwordContent.classList.contains('hidden')) {
                    passwordContent.classList.remove('hidden')
                    navigator.clipboard.writeText(passwordContent.innerText);
                    passwordContent.classList.add('hidden')
                } else {
                    navigator.clipboard.writeText(passwordContent.innerText);
                }

                copyBtn.innerHTML = `<i class="ri-check-line"></i>`;

                setTimeout(function() {
                    copyBtn.innerHTML = `<i class="ri-clipboard-line"></i>`;
                }, 2000);

            })

            deleteBtn.addEventListener("click", function() {
                deletePasswordModal.style.display = "block";

                confirmDeletePassword.addEventListener("click", function() {

                    console.log(password_id);
                    fetch('/deletePassword', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({password_id: password_id})
                    })

                    passwordCard.remove()

                    deletePasswordModal.style.display = "none";
                })

                cancelDeletePassword.addEventListener("click", function() {
                    deletePasswordModal.style.display = "none";
                })

                closeDeletePasswordModal.addEventListener("click", function() {
                    deletePasswordModal.style.display = "none";
                })

            })


        })

    document.getElementById("addPasswordForm").reset()
    addPasswordModal.style.display = "none";


    closeAddPasswordModal.addEventListener("click", function () {
        addPasswordModal.style.display = "none";
    })
})