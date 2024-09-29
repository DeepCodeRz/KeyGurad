function searchPassword() {
    document.getElementById("search").placeholder = "Search password..";
    let passwords;

    const passwordItems = document.getElementsByClassName("password-item");

    for (let i = 0; i < passwordItems.length; i++) {
        passwordItems[i].classList.remove("display-none");
    }

    fetch('searchPassword', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json()).then(data => {
        passwords = data["passwords"];

        let searchedPassword = document.getElementById("search").value;
        let found = false;

        for (let password of passwords) {
            let passwordElement = document.getElementById(`website-${password}`);

            if (passwordElement) {
                let passwordItem = passwordElement.innerText;

                if (passwordItem.includes(searchedPassword)) {
                    found = true;
                } else {
                    console.log(1)
                    document.getElementById(`${password}-password-item`).classList.add('display-none')
                }
            }
        }

        if (!found) {
            document.getElementById("search").value = "Password couldn't be found!";
            for (let i = 0; i < passwordItems.length; i++) {
                passwordItems[i].classList.remove("display-none");
            }
        }
    }).catch(err => {
        console.error('Error fetching passwords:', err);
    });
}