document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        document.querySelector(this.getAttribute('href')).classList.add('active');
        this.classList.add('active');
    });
});