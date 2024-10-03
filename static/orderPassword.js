const orderOptions = document.getElementsByClassName('orderContent')[0].getElementsByTagName('a');

orderOptions[0].style.backgroundColor = "#020817FF"
orderOptions[0].style.color = "var(--hover-text-color)"

for (let i = 0; i < orderOptions.length; i++) {
    orderOptions[i].addEventListener('click', (e) => {
        e.preventDefault();

        for (let i = 0; i < orderOptions.length; i++) {
            orderOptions[i].style.backgroundColor = ""
            orderOptions[i].style.color = ""
        }

        orderOptions[i].style.backgroundColor = "#020817FF"
        orderOptions[i].style.color = "var(--hover-text-color)"
        let sortType = orderOptions[i].innerHTML
        console.log(sortType)

        function sortList() {
            let passwordList = document.getElementById('password-list');
            let passwordArray = Array.from(document.getElementsByClassName('password-item'));

            passwordArray.sort(function(a, b) {
                let aValue = parseInt(a.getAttribute('data-value'));
                let bValue = parseInt(b.getAttribute('data-value'));

                if (sortType === 'Date (Last-old)') {
                    let aValue = parseInt(a.getAttribute('data-value'));
                    let bValue = parseInt(b.getAttribute('data-value'));
                    return aValue - bValue;
                } else if (sortType === 'Date (Old-last)') {
                    let aValue = parseInt(a.getAttribute('data-value'));
                    let bValue = parseInt(b.getAttribute('data-value'));
                    return aValue - bValue;
                } else if (sortType === 'Security Level') {
                    let aValue = parseInt(a.getAttribute('data-value'));
                    let bValue = parseInt(b.getAttribute('data-value'));
                    return aValue - bValue;
                } else if (sortType === 'Website') {
                    let aValue = parseInt(a.getAttribute('data-value'));
                    let bValue = parseInt(b.getAttribute('data-value'));
                    return aValue - bValue;
                } else if (sortType === 'Username') {
                    let aValue = parseInt(a.getAttribute('data-value'));
                    let bValue = parseInt(b.getAttribute('data-value'));
                    return aValue - bValue;
                }
            });

            passwordList.innerHTML = '';

            passwordArray.forEach(function(item) {
                passwordList.appendChild(item);
            });
        }

        window.onload = sortList;
    })
}