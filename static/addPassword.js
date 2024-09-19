let passwordList = document.getElementsByClassName("password-list")[0];
const addPasswordBtn = document.getElementById("addPasswordBtn");
const addPasswordModal = document.getElementById("addPasswordModal");
const savePasswordBtn = document.getElementById("savePasswordBtn");
const closeModal = document.getElementById("closeModal");
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
    }).then(response => {return response.json()})
        .then(data => {

            password_id = data["password_id"]
            const newPassword = document.createElement("div");
            newPassword.className = "password-item";
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
                                <button id="t" class="btn btn-icon" aria-label="Show/Hide Password" onclick="changePasswordVisibility()"><i class="ri-eye-line"></i></button>
                                <button class="btn btn-icon" aria-label="Copy Password"><i class="ri-clipboard-line"></i></button>
                                <button class="btn btn-icon" aria-label="Edit Password"><i class="ri-edit-line"></i></button>
                                <button class="btn btn-icon" aria-label="Delete Password"><i class="ri-delete-bin-line"></i></button>
                             </div>`;

            passwordList.appendChild(newPassword);
        })

    document.getElementById("addPasswordForm").reset()
    addPasswordModal.style.display = "none";
})

closeModal.addEventListener("click", function() {
    addPasswordModal.style.display = "none";
})