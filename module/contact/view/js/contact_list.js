function check_email() {
console.log('check_email');
		var pcontact_name = /^[a-zA-Z]+[\-'\s]?[a-zA-Z]{2,51}$/;
	    var pmessage = /^[0-9A-Za-z\s]{20,100}$/;
    	var pmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		var error = false;
	
		if(document.getElementById('contact_name').value.length === 0){
			document.getElementById('error_contact_name').innerHTML = "You have to write an username.";
			error = true;
		}else{
			if(!pcontact_name.test(document.getElementById('contact_name').value)){
				document.getElementById('error_contact_name').innerHTML = "The name must be longer than 3 characters."; 
				error = true;
			}else{
				document.getElementById('error_contact_name').innerHTML = "";
			}
		}
	
		if(document.getElementById('contact_email').value.length === 0){
			document.getElementById('error_contact_email').innerHTML = "You have to write an email.";
			error = true;
		}else{
			if(!pmail.test(document.getElementById('contact_email').value)){
				document.getElementById('error_contact_email').innerHTML = "The email format is invalid."; 
				error = true;
			}else{
				document.getElementById('error_contact_email').innerHTML = "";
			}
		}

		if (document.getElementById('matter').value === "Seleccione un asunto" ) {
			document.getElementById('error_matter').innerHTML = "Please, select a matter.";
			error = true;
		}else{
			document.getElementById('error_matter').innerHTML = "";
		}
	
		if(document.getElementById('message').value.length === 0){
			document.getElementById('error_message').innerHTML = "You have to write a message.";
			error = true;
		}else{
			if(!pmessage.test(document.getElementById('message').value)){
				document.getElementById('error_message').innerHTML = "The message must be longer than 20 characters."; 
				error = true;
			}else{
				document.getElementById('error_message').innerHTML = "";
			}
		}
		
		if(error == true){
			return 0;
		} 
}

function click_contact(){
	
	$("#contact_form").keypress(function(e) {
		console.log('click_contact');
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13){
        	e.preventDefault();
            send();
        }
    });

	$('#send_contact').on('click', function(e) {
		console.log('click_contact_send');
        e.preventDefault();
        send();
     }); 
}

function send(){

    if(check_email() != 0){
		console.log('send');
		send_email({name:$("#contact_name").val(), email:$("#contact_email").val(), matter:$("#matter").val(), message:$("#message").val()});
	 }
}
// include("module/contact/controller/controller_contact.class.php");

function send_email(content_email) {
	console.log('send_email');
	console.log(content_email);
	// console.log(email);
	// var url = "module/contact/controller/controller_contact.class.php?op=send_contact_us";
	// ajaxPromise("index.php?module=contact&op=send_contact_us", 'POST', 'JSON', content_email)
	
	ajaxPromise(friendlyURL("?module=contact&op=send_contact_us"), 'POST', 'JSON', content_email)
	// ajaxPromise("module/contact/controller/controller_contact.class.php&op=send_contact_us", 'POST', 'JSON', {'content_email':content_email})
	// ajaxPromise("module/cart/controller/controller_cart.php?op=insert_cart",'POST', 'JSON',{'token':token,'codigo_producto':codigo_producto})
	.then(function (data) {
		console.log(data);
		// toastr.success('Email sended');
	}).catch(function(data) {
		console.log('Error: send contact us error');
	});
}
// die('<script>console.log("contact_view2");</script>');
// console.log('contact_list_js2');
$(document).ready(function(){
	click_contact()
	// console.log('contact_list_js');
});