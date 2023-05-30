<?php
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
                case 'contact';
                    $email['toEmail'] = 'sandrasoler2017@gmail.com';
                    $email['fromEmail'] = "sandrasoleribanez@gmail.com";
                    $email['inputEmail'] = 'sandrasoleribanez@gmail.com';
                    // $email['inputMatter'] = 'Email verification';
    //                 // $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/index.php?module=contact&op=view'>Click here for verify your email.</a>";
    //                     $email['inputMessage'] ="hola";
                        break;
                case 'validate';
                    // $email['toEmail'] = 'sandrasoler2017@gmail.com';
                    $email['fromEmail'] = 'sandrasoleribanez@gmail.com';
                    $email['inputEmail'] = 'sandrasoleribanez@gmail.com';
                    $email['inputMatter'] = 'Email verification';
                    $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/index.php/module/login/verify/$email[token]'>Click here for verify your email.</a>";
                    break;
                case 'recover';
                    $email['fromEmail'] = 'sandrasoleribanez@gmail.com';
                    $email['inputEmail'] = 'sandrasoleribanez@gmail.com';
                    $email['inputMatter'] = 'Recover password';
                    $email['inputMessage'] = "<a href='http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/index.php/module/login/recover/$email[token]'>Click here for recover your password.</a>";
                    break;
             }
            return self::send_mailgun($email);
           
        }

        public static function send_mailgun($values){
            $jwt = parse_ini_file(MODEL_PATH."jwt.php.ini");   
                $config['api_url'] = $jwt['api_url']; //API Base URL
                $config['api_key'] = $jwt['api_key'];
                // $email = 'sandrasoler2017@gmail.com';
            $message = array();
            $message['from'] = $values['fromEmail'];
            $message['to'] = $values['toEmail'];
            $message['h:Reply-To'] = $values['inputEmail'];
            $message['subject'] = $values['inputMatter'];
            // $message['html'] = 'Hello ' .$values['toEmail'] . ',</br></br> This is a test';
            $message['html'] = $values['inputMessage'];
    // $message = array();
    // $message['from'] = "sandrasoleribanez@gmail.com";
    // $message['to'] = $email;
    // $message['h:Reply-To'] = "sandrasoleribanez@gmail.com";
    // $message['subject'] = "Hello, this is a test";
    // $message['html'] = 'Hello ' .$email . ',</br></br> This is a test';
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $config['api_url']);
            curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        }
   

}
?> 