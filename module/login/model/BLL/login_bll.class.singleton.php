<?php

	class login_bll {
		
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = login_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {
			$token_email = common::generate_Token_secure(20);
			try {
				$check = $this->dao->select_email($this->db, $args[0]);
				$usuario = $this->dao->select_name($this->db, $args[1]);
				
				if ($check) {
					$check_email = false;
				} else {
					$check_email = true;
				}
				
				if ($usuario) {
					$check_name = false;
				} else {
					$check_name = true;
				}
				
				// Si no existe el email, creará el usuario
				if ($check_email && $check_name) {
					try {
					    $this->dao->insert_user($this->db, $args[1], $args[0], $args[2],$token_email);
						$message = [ 'type' => 'validate', 
								'token' => $token_email, 
								'toEmail' =>  $args[0]];
					$email = json_decode(mail::send_email($message), true);
					} catch (Exception $e) {
						return 'error';
					}
					
					if (!empty($email)) {
						return;  
					}   
				} else if (!$check_email) {
					return 'error_email';
				} else {
					return 'error_user';
				}
			} catch (Exception $e) {
				return 'error';
			}
		}
		public function get_login_BLL($args) {
		
			try {
				$rdo = $this->dao->select_user($this->db, $args[0]);
			} catch (Exception $e) {
				return 'error';
			}
			
			if (!empty($rdo)) {
				if ($rdo == "error_user") {
					return 'error_user';
				} else {
					$contraseyna = $args[1];
					if (password_verify($contraseyna, $rdo[0]["password"])) {
						$token = middleware::create_token($rdo[0]["username"]);
						$_SESSION['username'] = $rdo[0]["username"];
						$_SESSION['tiempo'] = time();
						return $token;
					} else {
						return 'error_passwd';
					}
				}
			}
			
			// Si no se encontró un usuario, también se puede manejar como un error
			return 'error_user';
		}
		
		public function get_logout_BLL() {
			// return $args;
			unset($_SESSION['username']);
			unset($_SESSION['tiempo']);
			session_destroy();
			
			// setcookie('PHPSESSID', '', time() - 0);
			// include("module/login/view/login-register.html");
			return 'Done';
		}
		public function get_data_user_BLL($args) {
			// return $args;
			$json = middleware::decode_token($args);
			// $daoLog = new DAOLogin();
			return  $this -> dao -> select_data_user($this->db,$json['username']);
			// echo json_encode($rdo);
			// exit;
		}

		public function get_actividad_BLL() {
			// return $args;
			if (!isset($_SESSION["tiempo"])) {
				return 'inactivo';
			} else {
				if ((time() - $_SESSION["tiempo"]) >= 1800) { //1800s=30min
				// if ((time() - $_SESSION["tiempo"]) >= 0) { //1800s=30min
					return 'inactivo';
				} else {
					return 'activo';
				}
			}
		}
		public function get_controluser_BLL($args) {
			$token_dec = middleware::decode_token($args);

			if ($token_dec['exp'] < time()) {
			
				return 'Wrong_User';
			}
	
			if (isset($_SESSION['username']) && ($_SESSION['username']) == $token_dec['username']) {
				
				return 'Correct_User';
			} else {
				return 'Wrong_User';
				
			}
		}
		public function get_refresh_token_BLL($args) {
			// return $args;
			$old_token = middleware::decode_token($args);
			$new_token = middleware::create_token($old_token['username']);
			// echo json_encode($new_token);
			// exit;
			return $new_token;
		}
		public function get_refresh_cookie_BLL() {
			// return $args;
			session_regenerate_id();
       		// echo json_encode('Done');
			// exit;
			return 'Done';
		}


		public function get_verify_email_BLL($args) {
			// return $args;
			if($this -> dao -> select_verify_email($this->db, $args)){
				$this -> dao -> update_verify_email($this->db, $args);
				return 'verify';
			} else {
				return 'fail';
			}
		}

		public function get_recover_email_BBL($args) {
			// return $args;
			$user = $this -> dao -> select_recover_password($this->db, $args);
			$token = common::generate_Token_secure(20);
				// return $args;
			if (!empty($user)) {
				$user2= $this -> dao -> update_recover_password($this->db, $args, $token);
				// return $user2;
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return $email;  
				}   
            }else{
                return 'error';
            }
		}


		

		public function get_verify_token_BLL($args) {
			// return $args;
			if($this -> dao -> select_verify_email($this->db, $args)){
				return 'verify';
			}
			return 'fail';
		}

		public function get_new_password_BLL($args) {
			
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}

		public function get_social_login_BLL($args) {
			// return  $args[2];
			if (!empty($this -> dao -> select_user($this->db, $args[1]))) {
				$user = $this -> dao -> select_user($this->db, $args[1]);
				$email = $args[2];
					if ($email == $user[0]["email"]) {
						$token = middleware::create_token($user[0]["username"]);
						$_SESSION['username'] = $user[0]["username"];
						$_SESSION['tiempo'] = time();
						return $token;
					} else {
						return 'error_passwd';
					}
            } else {
				$this -> dao -> insert_social_login($this->db, $args[0], $args[1], $args[2], $args[3]);
				$user = $this -> dao -> select_user($this->db, $args[1]);
				$email = $args[2];
				if ($email == $user[0]["email"]) {
					$token = middleware::create_token($user[0]["username"]);
					$_SESSION['username'] = $user[0]["username"];
					$_SESSION['tiempo'] = time();
					return $token;
				} else {
					return 'error_passwd';
				}
			}
		}
		public function get_firebase_config_BLL() {
			$js ="";
    	    $js = parse_ini_file(UTILS.'js.ini'); 
			return $js;
		}
	}