function changeLang(lang) {
    lang = lang || localStorage.getItem('app-lang') || 'eng';
    localStorage.setItem('app-lang', lang);
    var elmnts = document.querySelectorAll('[data-tr]');

    
}

$(document).ready(function() {

    changeLang();
    $("#btn-eng").on("click", function() {
        changeLang('eng')
        });
    $("#btn-esp").on("click", function() {
        changeLang('esp')
        });
    $("#btn-val").on("click", function() {
        changeLang('val')
    });
});
