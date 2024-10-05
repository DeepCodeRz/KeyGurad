const orderOptions = document.getElementsByClassName('orderSelect')[0].getElementsByTagName('option');

orderOptions[0].style.backgroundColor = "#020817FF"
orderOptions[0].style.color = "var(--hover-text-color)"

for (let i = 0; i < orderOptions.length; i++) {
    orderOptions[i].addEventListener('click', (e) => {
        e.preventDefault();

        let sortType = orderOptions[i].value
        console.log(sortType)

        sortList()
        function sortList() {
            let passwordList = document.getElementsByClassName('password-list')[0];
            let passwordArray = Array.from(document.getElementsByClassName('password-item'));
            console.log(passwordArray)

            passwordArray.sort(function(a, b) {
                if (sortType === 'last-old') {
                    let aValue = new Date(a.getElementsByClassName("date")[0].innerHTML);
                    let bValue = new Date(b.getElementsByClassName("date")[0].innerHTML);
                    return aValue - bValue;
                } else if (sortType === 'old-last') {
                    let aValue = new Date(a.getElementsByClassName("date")[0].innerHTML);
                    let bValue = new Date(b.getElementsByClassName("date")[0].innerHTML);
                    return bValue - aValue;
                } else if (sortType === 'website') {
                    let aValue = a.getElementsByClassName("website")[0].innerHTML;
                    let bValue = b.getElementsByClassName("website")[0].innerHTML;
                    return aValue.localeCompare(bValue);
                } else if (sortType === 'username') {
                    let aValue = a.getElementsByClassName("username")[0].innerHTML;
                    let bValue = b.getElementsByClassName("username")[0].innerHTML;
                    return aValue.localeCompare(bValue);
                }
            });
            console.log(passwordArray)



            passwordList.innerHTML = '';

            passwordArray.forEach(function(item) {
                passwordList.appendChild(item);
            });
        }

        window.onload = sortList;
    })
}