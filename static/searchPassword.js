function searchPassword() {
    let passwords;

    fetch('searchPassword', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json()).then(data => {
        passwords = data["passwords"]

        searchedPassword = document.getElementById("search").value;

        // HAVE TO FIX
        for (i in document.getElementsByClassName('password-item')) {
            document.getElementsByClassName('password-item')[i].style.display = "none";
        }
        // HAVE TO FIX

        let passwordItem;
        for (i in passwords) {
            console.log(passwords[i]);
            if (document.getElementById(`website-${passwords[i]}`).innerText === null) {
                alert("Password couldn't find!");
            } else {
                passwordItem = document.getElementById(`website-${passwords[i]}`).innerText;

                if (passwordItem === searchedPassword) {
                    alert("Password found!");
                } else {
                    alert("Password couldn't find!");
                }
            }
            }
    })
}