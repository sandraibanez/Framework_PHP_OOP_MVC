<?php
// die('<script>console.log("contact");</script>');
// include("utils/common.inc.php");
	class controller_contact {
		
		// private $nameModule;
		function view(){
			// die('<script>console.log("contact_view");</script>');
			// common::load_view("view/inc/top_page_contact.html");
			// common::load_view();
			common::load_view('top_page_contact.html', VIEW_PATH_CONTACT . 'contact_list.html');
			// include("module/contact/view/contact_list.html");
			// include ("view/inc/top_page_contact.html");
		}
		
		function send_contact_us(){
			// die('<script>console.log("contact_view");</script>');
			// $message = ['type' => 'contact',
			// 			'inputName' => $_POST['name']
			// 			];
			// $contact = $_POST['content_email'];
			// // $name = $_POST['name'];
			// echo json_encode($contact);
			// exit;
			// echo "send_contact_us";
			$message = ['type' => 'contact',
						'inputName' => $_POST['name'], 
						'fromEmail' => $_POST['email'],
						'inputMatter' => $_POST['matter'], 
						// 'inputMessage' => $_POST['message']
						];
			// echo json_encode($message);
			// exit;
			$email = mail::send_email($message);
			// $email = json_decode(mail::send_mailgun(), true);
			// echo json_encode($email);
			// exit;
			if (!empty($email)) {
				echo json_encode('Done!');
				return;  
			} else {
				echo json_encode('Error!');
			}
		 }
	}
?>
