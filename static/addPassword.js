const addPasswordBtn = document.getElementById("addPasswordBtn");
const addPasswordModal = document.getElementById("addPasswordModal");
const closeModal = document.getElementById("closeModal");

addPasswordBtn.addEventListener("click", function() {
    addPasswordModal.style.display = "block";
})

closeModal.addEventListener("click", function() {
    addPasswordModal.style.display = "none";
})