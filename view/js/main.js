/* AJAX PROMISE */
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

/* FRIENDLY URL */
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link += "/" + aux[1] + "/";	
        }else{
        	link += "/" + aux[1];
        }
    }
    return "//localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC" + link;
    // C:\xampp\htdocs\MVC_CRUD_conccesionario3\Framework_PHP_OOP_MVC\view\js\main.js
}

// /* Loading Spinner */
// function loading_spinner() {
//     window.onload = function(){
//         var contenedor = document.getElementById('contenedor_carga');

//         contenedor.style.visibility = "hidden";
//         contenedor.style.opacity = '0';
//     }
// }

// /* LOAD MENU */
function load_menu() {
    // $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=home&op=view") + '" class="nav_link">Home</a>').appendTo('.nav_list');
    // $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=shop&op=view") + '" class="nav_link">Shop</a>').appendTo('.nav_list');
    // $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=contact&op=view") + '" class="nav_link">Contact us</a>').appendTo('.nav_list');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=home") + '" class="nav_link">Home</a>').appendTo('.nav_list');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=shop") + '" class="nav_link">Shop</a>').appendTo('.nav_list');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=contact") + '" class="nav_link">Contact us</a>').appendTo('.nav_list');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=login") + '" class="nav_link">Login</a>').appendTo('.nav_list');
    // .then(function(data) {
    //     if (data[0].user_type === 'admin') {
    //         menu_admin();
    //     }else if (data[0].user_type === 'client') {
    //         menu_client();
    //     }
    var token = localStorage.getItem('token');
    if (token) {
    ajaxPromise(friendlyURL('?module=login&op=data_user'), 'POST', 'JSON', {token: localStorage.getItem('token')})
    .then(function(data) {
        console.log(data);
        //     if (data[0].user_type === 'admin') {
        //     menu_admin();
        // }else if (data[0].user_type === 'client') {
        //     menu_client();
        // }
        if (data.type_user == "client") {
            console.log("Client loged");
            $('.opc_CRUD').empty();
            $('.opc_exceptions').empty();
        } else {
            console.log("Admin loged");
            $('.opc_CRUD').show();
            $('.opc_exceptions').show();
        }
     
    
        $('.log_icon').empty();
        $('#user_info').empty();
        $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=cart") + '" class="nav_link">cart</a>').appendTo('.nav_list');
        $('<img src="' + data[0]['avatar'] + '" alt="Robot">').css({'width': '50px', 'height': '50px', 'border-radius':'25px'}).appendTo('.log_icon');
        // ===============================================================================================================
        // click_profile(data[0]);
        $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#des_inf_user')
        .html(
        //    '<li>'+
        // //    '<a href="index.php?page=controller_cart&op=view">'+
        //    '<i class="fa fa-shopping-cart">'+'</i>'+
        //    '<span class="nav-text">'+'cart'+'</span>'+
        //    '</a>'+
        //    '</li>'+
            '<a id="logout"><i id="icon-logout" class="fa-solid fa-right-from-bracket"></i></a>' +
            '<a>' + data[0]['username'] + '<a/>'

        )

// }).catch(function() {
//     console.log("Error al cargar los datos del user");
// });
    }).catch(function() {
        // $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=login&op=view") + '" class="nav_link" data-tr="Log in">Log in</a>').appendTo('.nav_list');
        $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=login") + '" class="nav_link" data-tr="Log in">Log in</a>').appendTo('.nav_list');

    });
    }else {
        
        console.log("No hay token disponible");
        document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        $('#logout').hide();
        $('.opc_CRUD').empty();
        $('.opc_exceptions').empty();
        $('#user_info').hide();
        $('.log_icon').empty();
        // $('<a href="index.php?module=login&op=login_view" data-tr="Login"></a>').appendTo('.log_icon');

    }
}
function click_logout() {
    $(document).on('click', '#logout', function() {
        document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('total_prod');
        toastr.success("Logout succesfully");
        setTimeout('logout(); ', 1000);
    });
}

// //================LOG-OUT================
// function logout() {
//     ajaxPromise(friendlyURL("?module=login&op=logout"), 'POST', 'JSON')
//         .then(function(data) {
//             localStorage.removeItem('token');
//             // document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//             document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//             window.location.href = friendlyURL('index.php?module=home&op=view');
//             window.location.reload();
//         }).catch(function() {
//             console.log('Something has occured');
//         });
// }
// function click_logout() {
//     document.addEventListener('DOMContentLoaded', function() {
//         $(document).on('click', '#logout', function() {
//             document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//             localStorage.removeItem('total_prod');
//             toastr.success("Logout successfully");
//             setTimeout(logout, 1000);
//         });
//     });
//}
function logout() {
    ajaxPromise(friendlyURL("?module=login&op=logout"), 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('token');
            document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = friendlyURL('index.php?module=home&op=view');
        })
        .catch(function() {
            console.log('Something has occurred');
        });
}

// /* MENUS */
// function menu_admin() {
//     $('<li></li>').attr('class', 'profile').attr('id', 'profile').html('<a id="profile" class="nav_link" data-tr="Profile">Profile</a>').appendTo('.nav_list');
// }

// function menu_client() {
//     $('<li></li>').attr('class', 'profile').attr('id', 'profile').html('<a id="profile" class="nav_link" data-tr="Profile">Profile</a>').appendTo('.nav_list');
// }

// /* CLICK PROFILE */
// function click_profile(data) {
//     $(document).on('click', '#profile', function() {
//         $(".profile_options").remove();
//         $('<div></div>').attr('class', 'profile_options').attr('id', 'profile_options').appendTo('.nav_list_profile')
//         .html(
//             "<ul class='profile_list' id='profile_list'>" +
//                 "<li><div class='user'>" +
//                 "<div class='user_img'><img class='avatar_img' src='" + data.avatar + "'></div>" + 
//                 "<div class='user_name'>" + data.username + "</div></li>" +
//                 "<li><div id='logout' class='logout' data-tr='Log out'>Log out</div></li>" +
//             "</ul>"
//         )
//     });
//     $(document).on('click scroll', function(event) {
//         if (event.target.id !== 'profile') {
//             $('.profile_options').fadeOut(500);
//         }
//     });
// }


// // /* CLICK LOGOUT */
// function click_logout() {
//     $(document).on('click', '#logout', function() {
//         logout();
//         setTimeout(1000, window.location.href = friendlyURL("?module=home&op=view"));
//     });
// }

// // /* LOGOUT */
// function logout() {
//     $.ajax({
//         url: friendlyURL("?module=login&op=logout"),
//         type: 'POST',
//         dataType: 'JSON'
//     }).done(function(data) {
//         localStorage.removeItem('token');
//         window.location.href = friendlyURL("?module=home&op=view");
//         console.log("Sesion cerrada");
//     }).fail(function() {
//         console.log("Error: Logout error");
//     });
// }

$(document).ready(function() {
    load_menu();
    click_logout();
    // loading_spinner();
});