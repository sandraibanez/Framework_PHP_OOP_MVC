<?php
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
                case 'contact';
                    $email['toEmail'] = 'sandrasoler2017@gmail.com';
                    $email['fromEmail'] = "sandrasoleribanez@gmail.com";
                    $email['inputEmail'] = 'sandrasoleribanez@gmail.com';
                        break;
                case 'validate';
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
                $config['api_url'] = $jwt['api_url']; 
                $config['api_key'] = $jwt['api_key'];
            $message = array();
            $message['from'] = $values['fromEmail'];
            $message['to'] = $values['toEmail'];
            $message['h:Reply-To'] = $values['inputEmail'];
            $message['subject'] = $values['inputMatter'];
            $message['html'] = $values['inputMessage'];
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