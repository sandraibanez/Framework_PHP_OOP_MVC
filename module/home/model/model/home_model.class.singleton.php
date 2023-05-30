<?php
// die('<script>console.log("home");</script>');
// require_once(SITE_ROOT.'module/home/model/BLL/home_bll.class.singleton.php');
    class home_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            // return '__construct';
            // echo json_encode('hola');
            $this -> bll = home_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        
        }

        public function get_carrusel() {
            // return 'hola_get_carrusel';
            return $this -> bll -> get_carrusel_BLL();
        }

        public function get_category() {
            // return 'hola_get_category';
            return $this -> bll -> get_category_BLL();
        }

        public function get_type() {
            // return 'hola car type';
            return $this -> bll -> get_type_BLL();
        }
        public function get_visitas() {
            // return 'hola car type';
            return $this -> bll -> get_visitas_BLL();
        }
  }
?>