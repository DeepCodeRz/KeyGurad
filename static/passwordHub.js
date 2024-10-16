let passwordList = document.getElementsByClassName("password-list")[0];
const addPasswordBtn = document.getElementById("addPasswordBtn");
const addPasswordModal = document.getElementById("addPasswordModal");
const registerPasswordBtn = document.getElementById("registerPasswordBtn");
const passwordRegisteredImg = document.getElementById("passwordRegisteredImg");
const closeAddPasswordModal = document.getElementById("closeAddPasswordModal");
const editPasswordModal = document.getElementById("editPasswordModal");
const savePasswordBtn = document.getElementById("savePasswordBtn");
const cancelEditPasswordBtn = document.getElementById("cancelEditPasswordBtn");
const passwordSavedImg = document.getElementById("passwordSavedImg");
const closeEditPasswordModal = document.getElementById("closeEditPasswordModal");
const deletePasswordModal = document.getElementById("deletePasswordModal");
const confirmDeletePassword = document.getElementById("confirmDeletePasswordBtn");
const cancelDeletePassword = document.getElementById("cancelDeletePasswordBtn");
const passwordDeletedImg = document.getElementById("passwordDeletedImg");
const closeDeletePasswordModal = document.getElementById("closeDeletePasswordModal");
let password_id;

function addNewPassword(passwordId, website, username, password, date) {
    password_id = passwordId
    const newPassword = document.createElement("div");
    newPassword.id = `${password_id}-password-item`

    newPassword.className = `password-item`;
    newPassword.innerHTML = `<div>
                                 <strong>Website:</strong>
                                 <span class="website" id="website-${password_id}" style="display: inline-block; width: 10rem; color: var(--secondary-text-color);">${website}</span>
                                 <strong style="">Username:</strong>
                                 <span class="username" id="username-${password_id}" style="color: var(--secondary-text-color);">${username}</span>
                                 <br>
                                 <br>
                                 <strong>Password:</strong>
                                 <span id="password-${password_id}" class="hidden" style="display: inline-block; width: 9.2rem; color: var(--secondary-text-color);">${password}</span>
                                 <strong style="">Date:</strong>
                                 <span class="date" id="date-${password_id}" style="color: var(--secondary-text-color);">${date}</span>
                             </div>
                             <div class="password-actions">
                                <button id="visibility-${password_id}" class="btn btn-icon" aria-label="Show/Hide Password"><i class="ri-eye-line"></i></button>
                                <button id="copy-${password_id}" class="btn btn-icon" aria-label="Copy Password"><i class="ri-clipboard-line"></i></button>
                                <button id="edit-${password_id}" class="btn btn-icon" aria-label="Edit Password"><i class="ri-edit-line"></i></button>
                                <button id="analyze-${password_id}" class="btn btn-icon" aria-label="Analyze Password"><i class="ri-line-chart-line"></i></button>
                                <button id="delete-${password_id}" class="btn btn-icon" aria-label="Delete Password"><i class="ri-delete-bin-line"></i></button>
                             </div>`;

    passwordList.appendChild(newPassword);

    const webSiteSearchList = document.getElementById("webSiteSearchList");

    const newSearchWebsite = document.createElement("option")
    newSearchWebsite.innerHTML = `<option value="${website}">`
    webSiteSearchList.appendChild(newSearchWebsite);

    const passwordCard = document.getElementById(`${password_id}-password-item`);
    const visibilityBtn = document.getElementById(`visibility-${password_id}`);
    const copyBtn = document.getElementById(`copy-${password_id}`);
    const editBtn = document.getElementById(`edit-${password_id}`);
    const analyzeBtn = document.getElementById(`analyze-${password_id}`);
    const deleteBtn = document.getElementById(`delete-${password_id}`);

    const websiteSpan = document.getElementById(`website-${password_id}`);
    const usernameSpan = document.getElementById(`username-${password_id}`);
    const passwordSpan = document.getElementById(`password-${password_id}`);

    countPassword()

    visibilityBtn.addEventListener("click", function() {
        if (passwordSpan.classList.contains('hidden')) {
            visibilityBtn.innerHTML = `<i class="ri-eye-off-line"></i>`;
        } else {
            visibilityBtn.innerHTML = `<i class="ri-eye-line"></i>`;
        }

        passwordSpan.classList.toggle('hidden')
    })

    copyBtn.addEventListener("click", function() {
        if (passwordSpan.classList.contains('hidden')) {
            passwordSpan.classList.remove('hidden')
            navigator.clipboard.writeText(passwordSpan.innerText);
            passwordSpan.classList.add('hidden')
        } else {
            navigator.clipboard.writeText(passwordSpan.innerText);
        }

        copyBtn.innerHTML = `<i class="ri-check-line"></i>`;

        setTimeout(function() {
            copyBtn.innerHTML = `<i class="ri-clipboard-line"></i>`;
        }, 2000);

    })

    analyzeBtn.addEventListener("click", function() {
        if (passwordSpan.classList.contains('hidden')) {
            passwordSpan.classList.remove('hidden')
            analyzePassword(passwordSpan.innerText)
            passwordSpan.classList.add('hidden')
        } else {
            analyzePassword(passwordSpan.innerText)
        }

    })

    editBtn.addEventListener("click", function() {
        let editedWebsite = document.getElementById('editWebsite')
        let editedUsername = document.getElementById('editUsername')
        let editedPassword = document.getElementById('editPassword')

        function setEditModal() {
            const currentPassword = document.getElementById(`password-${password_id}`).innerText
            editedWebsite = document.getElementById('editWebsite')
            editedUsername = document.getElementById('editUsername')
            editedPassword = document.getElementById('editPassword')

            editedWebsite.value = websiteSpan.innerText;
            editedUsername.value = usernameSpan.innerText;
            editedPassword.value = currentPassword;
        }

        const websiteSpan = document.getElementById(`website-${password_id}`)
        const usernameSpan = document.getElementById(`username-${password_id}`)
        if (passwordSpan.classList.contains('hidden')) {
            passwordSpan.classList.remove('hidden')
            setEditModal()
            passwordSpan.classList.add('hidden')
        } else {
            setEditModal()
        }

        savePasswordBtn.addEventListener("click", function(event) {
            event.preventDefault()

            websiteSpan.innerText = editedWebsite.value
            usernameSpan.innerText = editedUsername.value
            passwordSpan.innerText = editedPassword.value

            fetch('editPassword', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({password_id: password_id, editedWebsite: editedWebsite.value, editedUsername: editedUsername.value, editedPassword: editedPassword.value})
            }).catch(function(error) {console.log(error)})

            passwordSavedImg.style.display = 'block'
            document.getElementById("editPasswordForm").style.display = 'none'

            setTimeout(function() {
                editPasswordModal.style.display = 'none'
                passwordSavedImg.style.display = 'none'
                document.getElementById("editPasswordForm").style.display = 'block'
            }, 2000)
        })

        editPasswordModal.style.display = 'block';

        cancelEditPasswordBtn.addEventListener("click", function(event) {
            event.preventDefault()
            editPasswordModal.style.display = 'none'
        })

        closeEditPasswordModal.addEventListener("click", function() {
            editPasswordModal.style.display = 'none'
        })
    })

    deleteBtn.addEventListener("click", function() {
        deletePasswordModal.style.display = "block";

        confirmDeletePassword.addEventListener("click", function(event) {
            event.preventDefault()

            fetch('/deletePassword', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({password_id: password_id})
            }).catch(function(error) {console.log(error)})

            passwordCard.remove()

            countPassword()

            passwordDeletedImg.style.display = 'block'
            document.getElementById("deletePasswordForm").style.display = 'none'

            setTimeout(function() {
                deletePasswordModal.style.display = 'none'
                passwordDeletedImg.style.display = 'none'
                document.getElementById("deletePasswordForm").style.display = 'block'
            }, 2000)
        })

        cancelDeletePassword.addEventListener("click", function(event) {
            event.preventDefault()
            deletePasswordModal.style.display = "none";
        })

        closeDeletePasswordModal.addEventListener("click", function() {
            deletePasswordModal.style.display = "none";
            console.log(1)
        })
    })

}

function registering(event) {
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
            addNewPassword(data["password_id"], website, username, password, data["date"])
        })

    document.getElementById("addPasswordForm").reset()

    passwordRegisteredImg.style.display = 'block'
    addPasswordModal.getElementsByTagName("h2")[0].style.display = "none";
    addPasswordModal.getElementsByTagName("form")[0].style.display = "none";
    addPasswordModal.getElementsByClassName("btn")[0].style.display = "none";
    addPasswordModal.getElementsByClassName("close")[0].style.display = "none";


    setTimeout(function() {
        addPasswordModal.style.display = 'none'
        passwordRegisteredImg.style.display = 'none'
        addPasswordModal.getElementsByTagName("h2")[0].style.display = "block";
        addPasswordModal.getElementsByTagName("form")[0].style.display = "block";
        addPasswordModal.getElementsByClassName("btn")[0].style.display = "block";
        addPasswordModal.getElementsByClassName("close")[0].style.display = "block";
    }, 2000)
}


addPasswordBtn.addEventListener("click", function() {
    addPasswordModal.style.display = "block";
})

registerPasswordBtn.addEventListener("click", registering)


closeAddPasswordModal.addEventListener("click", function () {
    addPasswordModal.style.display = "none";
})