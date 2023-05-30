function changeLang(lang) {
    lang = lang || localStorage.getItem('app-lang') || 'eng';
    localStorage.setItem('app-lang', lang);
    var elmnts = document.querySelectorAll('[data-tr]');

    // $.ajax({
    //     url: 'http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/view/lang/' + lang + '.json',
    //     // C:\xampp\htdocs\MVC_CRUD_conccesionario3\Framework_PHP_OOP_MVC\view\lang\eng.json
    //         type: 'GET',  /// GET
    //         dataType: 'JSON',
    //         success: function (data) {
    //             for (var i = 0; i < elmnts.length; i++) {
    //                 elmnts[i].innerHTML = data.hasOwnProperty(lang) ? data[lang][elmnts[i].dataset.tr] : elmnts[i].dataset.tr;
    //             }
    //         }
    // })
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
