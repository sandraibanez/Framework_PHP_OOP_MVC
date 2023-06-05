<?php
    class controller_login {

        function view() {
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'login.html');
        }
        function recover_view() {
            
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
        }
        function register() {
            // echo json_encode($_POST['email_reg']);
            // exit;
            echo json_encode(common::load_model('login_model', 'get_register',[$_POST['email_reg'],$_POST['username_reg'],$_POST['passwd1_reg']]));
        }
        function login() {
            // echo json_encode('login');
            // exit;
            echo json_encode(common::load_model('login_model', 'get_login',[$_POST['username_log'],$_POST['passwd_log']]));
        }
        function logout() {
            // echo json_encode('logout');
            // exit;
            echo json_encode(common::load_model('login_model', 'get_logout'));
            // echo json_encode(common::load_model('home_model', 'get_carrusel'));
        }
       
       function verify_email() {
        
        //    echo json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));

            $verify = json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));
            echo json_encode($verify);
           
        }

        function send_recover_email() {
            echo json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email_forg']));
        }

        function verify_token() {
            echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token_email']));
        }

        function new_password() {
            echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token_email'], $_POST['password']]));
        } 
        
        function data_user() {
            echo json_encode(common::load_model('login_model', 'get_data_user',$_POST['token']));
        }
        function actividad() {
            // echo json_encode('actividad');
            // exit;
            echo json_encode(common::load_model('login_model', 'get_actividad'));
        }
        function controluser() {
            echo json_encode(common::load_model('login_model', 'get_controluser',$_POST['token']));
        }
        function refresh_token() {
            echo json_encode(common::load_model('login_model', 'get_refresh_token',$_POST['token']));
        }
        function refresh_cookie() {
            // session_regenerate_id();
            // echo json_encode('Done');
            // exit;
            echo json_encode(common::load_model('login_model', 'get_refresh_cookie'));
        }
        function social_login() {
            // echo json_encode( $_POST['email']);
            // exit;
            echo json_encode(common::load_model('login_model', 'get_social_login', [$_POST['id'], $_POST['username'], $_POST['email'], $_POST['avatar']]));
        } 
        function firebase_config() {
            // echo json_encode('firebase_config');
            // exit;
            echo json_encode(common::load_model('login_model', 'get_firebase_config'));
        }
    }
    
?>