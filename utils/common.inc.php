<?php
   
    class common {
        // die('<script>console.log("contact");</script>');
        public static function load_error() {
            require_once (VIEW_PATH_INC . 'top_page.html');
            require_once (VIEW_PATH_INC . 'header.html');
            require_once (VIEW_PATH_INC . 'error404.html');
            require_once (VIEW_PATH_INC . 'footer.html');
        }
        
        public static function load_view($topPage, $view) {
            // $topPage, $view
            // echo "hola_common.inc.php";
            $topPage = VIEW_PATH_INC . $topPage;
            //  include($ruta1);
            //  echo $ruta1;
            if ((file_exists($topPage)) && (file_exists($view))) {
                require_once ($topPage);
                // require_once ('C:/xampp/htdocs/Ejercicios/Framework_PHP_OO_MVC/view/inc/header.html');
                require_once (VIEW_PATH_INC . 'header.html');
                // include('C:\xampp\htdocs\MVC_CRUD_conccesionario3\Framework_PHP_OOP_MVC\view\inc\top_page_contact.html');
                // /////include('C:\xampp\htdocs\MVC_CRUD_conccesionario3\Framework_PHP_OOP_MVC\view\inc\header.html');
                // include("view/inc/header.html");
                ////////include('C:\xampp\htdocs\MVC_CRUD_conccesionario3\Framework_PHP_OOP_MVC\module\contact\view\contact_list.html');
                require_once ($view);
                require_once (VIEW_PATH_INC . 'footer.html');
                // include('C:\xampp\htdocs\MVC_CRUD_conccesionario3\Framework_PHP_OOP_MVC\view\inc\footer.html');
                
                    // include("view/inc/footer.html");
            }else {
                self::load_error();
            }
        }
        
        public static function load_model($model, $function = null, $args = null) {
            $dir = explode('_', $model);
            $path = constant('MODEL_' . strtoupper($dir[0])) .  $model . '.class.singleton.php';
            // $path = 'C:/xampp/htdocs/Ejercicios/Framework_PHP_OO_MVC/module/login/model/model/login_model.class.singleton.php';
            // die('<script>console.log('.json_encode( 'hey' ) .');</script>');
            if (file_exists($path)) {
                require_once ($path);
                if (method_exists($model, $function)) {
                    $obj = $model::getInstance();
                    if ($args != null) {
                        return call_user_func(array($obj, $function), $args);
                    }
                    return call_user_func(array($obj, $function));
                }
            }
            throw new Exception();
        }

        public static function generate_token_secure($longitud){
            if ($longitud < 4) {
                $longitud = 4;
            }
            return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
        }

        // function friendlyURL_php($url) {
        //     $link = "";
        //     if (URL_FRIENDLY) {
        //         $url = explode("&", str_replace("?", "", $url));
        //         foreach ($url as $key => $value) {
        //             $aux = explode("=", $value);
        //             $link .=  $aux[1]."/";
        //         }
        //     } else {
        //         $link = "index.php?" . $url;
        //     }
        //     return SITE_PATH . $link;
        // }
    }
?>