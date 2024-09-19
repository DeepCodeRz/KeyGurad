let passwordList = document.getElementsByClassName("password-list")[0];
const addPasswordBtn = document.getElementById("addPasswordBtn");
const addPasswordModal = document.getElementById("addPasswordModal");
const savePasswordBtn = document.getElementById("savePasswordBtn");
const closeModal = document.getElementById("closeModal");


addPasswordBtn.addEventListener("click", function() {
    addPasswordModal.style.display = "block";
})

savePasswordBtn.addEventListener("click", function() {
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    document.addEventListener("DOMContentLoaded", function() {
        const newPassword = document.createElement("div");
        newPassword.className = "password-item";
        newPassword.innerHTML = `<div>
                                <strong>${website}</strong>
                                <span style="color: var(--secondary-text-color);">${username}</span>
                             </div>
                             <div class="password-actions">
                                <button class="btn btn-icon" aria-label="Show/Hide Password"><i class="ri-eye-line"></i></button>
                                <button class="btn btn-icon" aria-label="Copy Password"><i class="ri-clipboard-line"></i></button>
                                <button class="btn btn-icon" aria-label="Edit Password"><i class="ri-edit-line"></i></button>
                                <button class="btn btn-icon" aria-label="Delete Password"><i class="ri-delete-bin-line"></i></button>
                             </div>`;

        passwordList.appendChild(newPassword);
    });


})

closeModal.addEventListener("click", function() {
    addPasswordModal.style.display = "none";
})