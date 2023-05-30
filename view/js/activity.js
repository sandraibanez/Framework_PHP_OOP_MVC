function protecturl() {

    var token = localStorage.getItem('token');
	//     ajaxPromise('module/login/ctrl/ctrl_login.php?op=controluser', 'POST', 'JSON', { 'token': token })
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
    //     // ajaxPromise('module/login/ctrl/ctrl_login.php?op=actividad', 'POST', 'JSON')
		ajaxPromise(friendlyURL("?module=login&op=actividad"), 'POST', 'JSON')
            .then(function(response) {
                console.log(response);
                 if (response == "inactivo") {
                    console.log(response);
                    console.log('innactivo');
                //     console.log("usuario INACTIVO");
                    logout_auto();
                 }else {
                    console.log(response);
                    console.log('activo');
                //     console.log("usuario ACTIVO")
                 }

            });
    } else {
        console.log("No hay usario logeado");
    }

}

function refresh_token() {
    var token = localStorage.getItem('token');
    if (token) {
        // ajaxPromise('module/login/ctrl/ctrl_login.php?op=refresh_token', 'POST', 'JSON', { 'token': token })
		ajaxPromise(friendlyURL("?module=login&op=refresh_token"), 'POST', 'JSON', { 'token': token })
            .then(function(data_token) {
                console.log(data_token);
                console.log("Refresh token correctly");
                localStorage.setItem("token", data_token);
                // load_menu();
            });
    }

}

function refresh_cookie() {
    console.log('cookies');
    // ajaxPromise('module/login/ctrl/ctrl_login.php?op=refresh_cookie', 'POST', 'JSON')
	ajaxPromise(friendlyURL("?module=login&op=refresh_cookie"), 'POST', 'JSON')
        .then(function(response) {
            console.log(response);
            console.log("Refresh cookie correctly");
            // //document.cookie = "nombre=PHPSESSID; max-age=0";
            document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            ////ponniendo una fecha del pasado se borrara siempre
        });
}

function logout_auto() {

    // localStorage.removeItem('token');
    // toastr.warning("Se ha cerrado la cuenta por seguridad!!");
    // // setTimeout('window.location.href = "index.php?module=ctrl_login&op=login-register_view";', 2000);
    // setTimeout('window.location.href = "index.php?page=ctrl_login&op=logout"', 3000);
    // // setTimeout('window.location.href = "index.php?page=ctrl_home&op=list";', 2000);

    // ajaxPromise('module/login/ctrl/ctrl_login.php?op=logout', 'POST', 'JSON')
	ajaxPromise(friendlyURL("?module=login&op=logout"), 'POST', 'JSON')

        .then(function(data) {
            localStorage.removeItem('token');
            // document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            toastr.warning("Se ha cerrado la cuenta por seguridad!!");
            // setTimeout('window.location.href = "index.php?module=ctrl_login&op=login-register_view";', 2000);
			setTimeout(function() {
				window.location.href =friendlyURL('index.php?module=login&op=login');
			}, 200);
            window.location.reload();
                }).catch(function() {
            console.log('Something has occured');
        });
}

$(document).ready(function() {
    setInterval(function() { control_activity() }, 600000); //10min= 600000
    // control_activity();
    protecturl();
    // refresh_token();
    // refresh_cookie();
    setInterval(function() { refresh_token() }, 600000);
    setInterval(function() { refresh_cookie() }, 600000);
});

// function protecturl() {
// 	$.ajax({
// 		type : 'POST',
// 		url  : friendlyURL("?module=login&op=controluser"),
// 		data :  {token: localStorage.getItem('token')}
// 	})
// 	.done(function(data){
// 		if (data == "match"){
// 			console.log(data);
// 		}else if (data == "not_match"){
// 			toastr.options.timeOut = 2000;
// 			toastr.error("Debes realizar login");
// 			setInterval(function(){logout()}, 2000);
// 		}
// 	})
// 	.fail( function(response){
// 		console.log(response)	
// 	});
// }

// function protect_activity() {
// 	setInterval(function(){
// 		$.ajax({
// 			type : 'POST',
// 			url  : friendlyURL("?module=login&op=actividad"),
// 			success :  function(response){
// 				if(response == "inactivo"){
// 					toastr.options.timeOut = 2000;
// 					toastr.error("Tiempo agotado, porfavor inicie sesión de nuevo");
// 					setInterval(function(){logout()}, 2000);
// 				}
// 			}
// 		});
// 	}, 600000);
// }

// function token_expires() {
// 	setInterval(function(){
// 		if(localStorage.getItem('token') == null){
// 			console.log('Not registred');
// 		} else {
// 			$.ajax({
// 				type : 'POST',
// 				url  : friendlyURL("?module=login&op=refresh_token"),
// 				data :  {token: localStorage.getItem('token')}
// 			})
// 			.done(function(data){
// 				console.log(data);
// 				if (data == "activo"){
// 					console.log(data);
// 				}else if (data == "inactivo"){
// 					toastr.options.timeOut = 2000;
// 					toastr.error("Tiempo agotado, porfavor inicie sesión de nuevo");
// 					setInterval(function(){logout()}, 2000);
// 				}					
// 			})
// 			.fail( function(response){
// 				console.log(response)	
// 			});
// 		}
// 	}, 600000);
// }

// function refresh_session() {
// 	setInterval(function(){
// 		$.ajax({
// 			type : 'POST',
// 			url  : friendlyURL("?module=login&op=refresh_cookie"),
// 		}).done(function(data){			
// 			console.log("$Session updated");
// 		})
// 		.fail( function(response){
// 			console.log(response);	
// 		});
// 	}, 600000);
// }

// function refresh_token() {
// 	setInterval(function(){
// 		$.ajax({
// 			type : 'POST',
// 			url  : friendlyURL("?module=login&op=refresh_cookie"),
// 			data :  {token: localStorage.getItem('token')}
// 		}).done(function(data){			
// 			localStorage.setItem("token", data);
// 		})
// 		.fail( function(response){
// 			console.log(response);	
// 		});
// 	}, 600000);
// }

// $(document).ready(function(){
// 	protect_activity();
// 	token_expires();
// 	refresh_token();
// 	refresh_session();
// 	protecturl();
// });
