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
}



// /* LOAD MENU */
function load_menu() {
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=home") + '" class="nav_link">Home</a>').appendTo('.nav_list');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=shop") + '" class="nav_link">Shop</a>').appendTo('.nav_list');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=contact") + '" class="nav_link">Contact us</a>').appendTo('.nav_list');
    $('<li></li>').attr({'class' : 'nav_item'}).html('<a href="' + friendlyURL("?module=login") + '" class="nav_link">Login</a>').appendTo('.nav_list');
   
    var token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        console.log('data_token');
    ajaxPromise(friendlyURL('?module=login&op=data_user'), 'POST', 'JSON', {token: localStorage.getItem('token')})
    .then(function(data) {
        console.log(data);
        console.log('hola');
        
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
       
        $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#des_inf_user')
        .html(
        
            '<a id="logout"><i id="icon-logout" class="fa-solid fa-right-from-bracket"></i></a>' +
            '<a>' + data[0]['username'] + '<a/>'

        )


    }).catch(function() {
        
    });
    }else {
        
        console.log("No hay token disponible");
        document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        $('#logout').hide();
        $('.opc_CRUD').empty();
        $('.opc_exceptions').empty();
        $('#user_info').hide();
        $('.log_icon').empty();

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


$(document).ready(function() {
    load_menu();
    click_logout();
});