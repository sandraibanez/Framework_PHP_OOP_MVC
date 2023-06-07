function protecturl() {

    var token = localStorage.getItem('token');
	ajaxPromise(friendlyURL("?module=login&op=controluser"), 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            console.log(data);
            console.log(protecturl);
            if (data == "Correct_User") {
                console.log("CORRECTO-->El usario coincide con la session");
            } else if (data == "Wrong_User") {
                console.log("INCORRCTO--> Estan intentando acceder a una cuenta");
                logout_auto();
            }
        })
        .catch(function() { console.log("ANONYMOUS_user") });
}

function control_activity() {
    console.log('control_activity');
    var token = localStorage.getItem('token');
    if (token) {
        console.log(token);
		ajaxPromise(friendlyURL("?module=login&op=actividad"), 'POST', 'JSON')
            .then(function(response) {
                console.log(response);
                 if (response == "inactivo") {
                    console.log(response);
                    console.log('innactivo');
                    logout_auto();
                 }else {
                    console.log(response);
                    console.log('activo');
                 }

            });
    } else {
        console.log("No hay usario logeado");
    }

}

function refresh_token() {
    var token = localStorage.getItem('token');
    if (token) {
		ajaxPromise(friendlyURL("?module=login&op=refresh_token"), 'POST', 'JSON', { 'token': token })
            .then(function(data_token) {
                console.log(data_token);
                console.log("Refresh token correctly");
                localStorage.setItem("token", data_token);
            });
    }

}

function refresh_cookie() {
    console.log('cookies');
	ajaxPromise(friendlyURL("?module=login&op=refresh_cookie"), 'POST', 'JSON')
        .then(function(response) {
            console.log(response);
            console.log("Refresh cookie correctly");
            document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
}

function logout_auto() {
	ajaxPromise(friendlyURL("?module=login&op=logout"), 'POST', 'JSON')

        .then(function(data) {
            localStorage.removeItem('token');
            toastr.warning("Se ha cerrado la cuenta por seguridad!!");
			setTimeout(function() {
				window.location.href =friendlyURL('index.php?module=login&op=login');
			}, 200);
            window.location.reload();
                }).catch(function() {
            console.log('Something has occured');
        });
}

$(document).ready(function() {
    setInterval(function() { control_activity() }, 600000); 
    protecturl();
    setInterval(function() { refresh_token() }, 600000);
    setInterval(function() { refresh_cookie() }, 600000);
});