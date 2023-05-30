function register() {
    $('.header').empty();
    if (validate_register() != 0) {
        var data = $('#register__form').serialize();
       
        console.log(data);
        ajaxPromise(friendlyURL('?module=login&op=register'), 'POST', 'JSON',data)
            .then(function(result) {
                console.log(result);
                // console.log(data);
                if (result == "error_email") {
                    document.getElementById('error_email_reg').innerHTML = "El email ya esta en uso, asegurate de no tener ya una cuenta"
                } else if (result == "error_user") {
                    document.getElementById('error_username_reg').innerHTML = "El usuario ya esta en uso, intentalo con otro"
                } else {
                    console.log("se ha registrado correctamente");
                    toastr.success("Registery succesfully");
                    // setTimeout(' window.location.href = friendlyURL("index.php?module=login&op=view"); ', 1000);
                    toastr.success("Email sended");
                    setTimeout(function() {
                        window.location.href =friendlyURL('index.php?module=login&op=view');
                    }, 300);
                }
                // friendlyURL('index.php?module=login&op=view');
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}
function login() {
    // console.log('login');
    $('.header').empty();
    if (validate_login() != 0) {
        var data = $('#login__form').serialize();
        console.log(data);
        ajaxPromise(friendlyURL('?module=login&op=login'), 'POST', 'JSON', data)        
            .then(function(result) {
                console.log(result);
                console.log(data);
                if (result == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "El usario no existe,asegurase de que lo a escrito correctamente"
                } 
                else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                } 
                else {
                    localStorage.setItem("token", result);
                    toastr.success("Loged succesfully");

                    if (localStorage.getItem('redirect_like')) {
                        console.log('usuario1');
                        // setTimeout(' window.location.href = friendlyURL("index.php?module=shop&op=view"); ', 1000);                    
                        setTimeout(function() {
                            window.location.href =friendlyURL('index.php?module=shop&op=view');
                        }, 300);
                    } else if (localStorage.getItem('redirect_cart')){
                        console.log('cart');
                        // setTimeout(' window.location.href = friendlyURL("index.php?module=shop&op=view"); ', 1000);                    
                        setTimeout(function() {
                            window.location.href =friendlyURL('index.php?module=shop&op=view');
                        }, 300);
                    }else{
                        console.log('usuario2');
                        // setTimeout(' window.location.href = friendlyURL("index.php?module=shop&op=view"); ', 1000);
                        setTimeout(function() {
                            window.location.href =friendlyURL('index.php?module=shop&op=view');
                        }, 300);
                        // setTimeout(' window.location.href = "index.php?page=ctrl_home&op=list"; ', 1000);
                    }
                    
                }
            })
            .catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}





function key_register() {
    $('.header').empty();
    $("#register").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            console.log("enter");
            e.preventDefault();
            register();
        }
    });
}
function key_login() {
    $('.header').empty();
    console.log('key');
    $("#login").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_register() {
    $('.header').empty();
    $('#register').on('click', function(e) {
        // parar js
        e.preventDefault();
        register();
    });
}
function button_login() {
    $('.header').empty();
    console.log('button');
    $('#login').on('click', function(e) {
        e.preventDefault();
        login();
    });
}
function validate_register() {
    $('.header').empty();
    var username_exp = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if (document.getElementById('username_reg').value.length === 0) {
        document.getElementById('error_username_reg').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_reg').value.length < 5) {
            document.getElementById('error_username_reg').innerHTML = "El username tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            if (!username_exp.test(document.getElementById('username_reg').value)) {
                document.getElementById('error_username_reg').innerHTML = "No se pueden poner caracteres especiales";
                error = true;
            } else {
                document.getElementById('error_username_reg').innerHTML = "";
                // cont=cont+1;
                // console.log('cont');
            }
        }
    }

    if (document.getElementById('email_reg').value.length === 0) {
        document.getElementById('error_email_reg').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_reg').value)) {
            document.getElementById('error_email_reg').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }

    if (document.getElementById('passwd1_reg').value.length === 0) {
        document.getElementById('error_passwd1_reg').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd1_reg').value.length < 8) {
            document.getElementById('error_passwd1_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('passwd1_reg').value)) {
                document.getElementById('error_passwd1_reg').innerHTML = "Debe de contener minimo 8 caracteres, mayusculas, minusculas y simbolos especiales";
                error = true;
            } else {
                document.getElementById('error_passwd1_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('passwd2_reg').value.length === 0) {
        document.getElementById('error_passwd2_reg').innerHTML = "Tienes que repetir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd2_reg').value.length < 8) {
            document.getElementById('error_passwd2_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('passwd2_reg').value === document.getElementById('passwd1_reg').value) {
                document.getElementById('error_passwd2_reg').innerHTML = "";
            } else {
                document.getElementById('error_passwd2_reg').innerHTML = "La password's no coinciden";
                error = true;
            }


        }
    }

    // if (error == true) {
    //     return 0;
    // }
    if (error == true) {
        return 0;
    }else{
        return 1;
        
    }
 
        
 }
 function validate_login() {
    $('.header').empty();
    var error = false;
console.log('validate');
    if (document.getElementById('username_log').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_log').value.length < 5) {
            document.getElementById('error_username_log').innerHTML = "El usuario tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    // if (error == true) {
    //     return 0;
    // }

    if (error == true) {
        return 0;
    }else{
        return 1;
        
    }
}
// ------------------- RECOVER PASSWORD ------------------------ //

function load_form_recover_password(){
    console.log('load_form_recover_password');
    $(".login-wrap").hide();
    $(".forget_html").show();
    $('html, body').animate({scrollTop: $(".forget_html")});
    click_recover_password();
}

function click_recover_password(){
    console.log('click_recover_password');
    $(".forget_html").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_recover_password();
        }
    });

    $('#button_recover').on('click', function(e) {
        console.log('button_recover');
        e.preventDefault();
        send_recover_password();
    }); 
}

function validate_recover_password(){
    console.log('validate_recover_password');

    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if(document.getElementById('email_forg').value.length === 0){
		document.getElementById('error_email_forg').innerHTML = "Tienes que escribir un correo";
		error = true;
	}else{
        if(!mail_exp.test(document.getElementById('email_forg').value)){
            document.getElementById('error_email_forg').innerHTML = "El formato del mail es invalido"; 
            error = true;
        }else{
            document.getElementById('error_email_forg').innerHTML = "";
        }
    }
	
    if(error == true){
        return 0;
    }
}

function send_recover_password(){
    console.log('send_recover_password');

    if(validate_recover_password() != 0){
        var data = $('#recover_email_form').serialize();
        console.log(data);
        ajaxPromise(friendlyURL('?module=login&op=send_recover_email'), 'POST', 'JSON',data)
        .then(function(data) {
            console.log(data);
            if(data == "error"){		
                $("#error_email_forg").html("The email doesn't exist");
            } else{
                toastr.options.timeOut = 3000;
                toastr.success("Email sended");
                setTimeout(function() {
                    window.location.href =friendlyURL('index.php?module=login&op=recover_view');
                }, 1000);
                setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
            }
        }).catch(function( textStatus ) {
            // console.log('Error: Recover password error');
            // if (console && console.log) {
                console.log('Error: Recover password error' + textStatus);
           // }
        });    
    }
}

function load_form_new_password(){
    console.log('load_form_new_password');

    token_email = localStorage.getItem('token_email');
    localStorage.removeItem('token_email');
    ajaxPromise(friendlyURL('?module=login&op=verify_token'), 'POST', 'JSON', {token_email: token_email})
    .then(function(data) {
        console.log(data);
        if(data == "verify"){
            console.log('verified');
            click_new_password(token_email); 
        }else {
            console.log("error");
        }
    }).catch(function( textStatus ) {
        console.log("Error: Verify token error");
    });    
}

function click_new_password(token_email){
    console.log('click_new_password');

    $(".recover_html").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_new_password(token_email);
        }
    });

    $('#button_set_pass').on('click', function(e) {
        e.preventDefault();
        send_new_password(token_email);
    }); 
}

function validate_new_password(){
    console.log('validate_new_password');

    var error = false;

    if(document.getElementById('pass_rec').value.length === 0){
		document.getElementById('error_password_rec').innerHTML = "You have to write a password";
		error = true;
	}else{
        if(document.getElementById('pass_rec').value.length < 8){
            document.getElementById('error_password_rec').innerHTML = "The password must be longer than 8 characters";
            error = true;
        }else{
            document.getElementById('error_password_rec').innerHTML = "";
        }
    }

    if(document.getElementById('pass_rec_2').value != document.getElementById('pass_rec').value){
		document.getElementById('error_password_rec_2').innerHTML = "Passwords don't match";
		error = true;
	}else{
        document.getElementById('error_password_rec_2').innerHTML = "";
    }

    if(error == true){
        return 0;
    }
}

function send_new_password(token_email){
    console.log('send_new_password');

    if(validate_new_password() != 0){
        var data = {token_email: token_email, password : $('#pass_rec').val()};
        console.log(data);
        ajaxPromise(friendlyURL("?module=login&op=new_password"), 'POST', 'JSON', data)
        .then(function(data) {
            console.log(data);
            if(data === "done"){
                toastr.options.timeOut = 3000;
                toastr.success('New password changed');
                // setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
                setTimeout(function() {
                    window.location.href =friendlyURL('index.php?module=login&op=view');
                }, 1000);
            } else {
                toastr.options.timeOut = 3000;
                toastr.error('Error seting new password');
            }
        }).catch(function(textStatus) {
            console.log('Error: New password error' + textStatus);
            // console.log("Error: New password error");
        });    
    }
}

// ------------------- LOAD CONTENT ------------------------ //

function load_content() {
    console.log('load_content');

    let path = window.location.pathname.split('/');
    console.log(path);
    if(path[6] === 'recover'){
        window.location.href = friendlyURL("?module=login&op=recover_view");
        localStorage.setItem("token_email", path[7]);
    }else if (path[6] === 'verify') {
        ajaxPromise(friendlyURL("?module=login&op=verify_email"), 'POST', 'JSON', {token_email: path[7]})
        .then(function(data) {
            console.log(data);
            toastr.options.timeOut = 3000;
            toastr.success('Email verified');
            // setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
            setTimeout(function() {
                window.location.href =friendlyURL('index.php?module=home&op=view');
            }, 1000);
        })
        .catch(function() {
          console.log('Error: verify email error');
        });
    }else if (path[4] === 'view') {
        $(".login-wrap").show();
        $(".forget_html").hide();
    }else if (path[4] === 'recover_view') {
        load_form_new_password();
    }
}
$(document).ready(function() {
    // console.log('registro');
    click_new_password();
    click_recover_password();
    load_content();
    key_register();
    button_register();
    key_login();
    button_login();
});
