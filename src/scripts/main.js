// Logo como botão para página inicial
const logoHome = document.getElementById('logo-home');
if (logoHome) {
    logoHome.addEventListener('click', function(event) {
        event.preventDefault();
        // Ativa a página inicial
        const links = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        links.forEach(l => l.classList.remove('active'));
        if (links[0]) links[0].classList.add('active');
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        const homePage = document.getElementById('page-home');
        if (homePage) homePage.classList.remove('hidden');
    });
}
const links = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const targetPage = this.getAttribute('data-page');
        
        pages.forEach(page => {
            page.style.display = 'none';
        });

        document.getElementById(`page-${targetPage}`).style.display = 'block';
    });
});