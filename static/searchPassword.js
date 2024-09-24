function searchPassword() {
    let passwords;

    fetch('searchPassword', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json()).then(data => {
        passwords = data["passwords"];

        let searchedPassword = document.getElementById("search").value;
        let found = false; // Şifre bulunup bulunmadığını kontrol etmek için

        for (let password of passwords) {
            let passwordElement = document.getElementById(`website-${password}`);

            if (passwordElement) {
                let passwordItem = passwordElement.innerText;

                if (passwordItem === searchedPassword) {
                    passwordElement.parentElement.parentElement.style.display = "block";
                    found = true;
                } else {
                    passwordElement.parentElement.parentElement.display = "none"; // Diğer şifreleri gizlemek için
                }
            }
        }

        if (!found) {
            alert("Password couldn't be found!");
        }
    }).catch(err => {
        console.error('Error fetching passwords:', err);
    });
}