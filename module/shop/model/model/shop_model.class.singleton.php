<?php
    class shop_model {
        private $bll;
        static $_instance;

        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_all_cars() {
            return $this -> bll -> get_all_cars_BLL();
        }
        public function get_count() {
            return $this -> bll -> get_count_BLL();
        }
        public function get_count_filters($args) {
            return $this -> bll -> get_count_filters_BLL($args);
        }
        public function get_count_home($args) {
            return $this -> bll -> get_count_home_BLL($args);
        }
        public function get_count_search($args) {
            return $this -> bll -> get_count_search_BLL($args);
        }
        public function get_details_car($args) {
            return $this -> bll -> get_details_car_BLL($args);
        }
        public function get_countcar($args) {
            return $this -> bll -> get_countcar_BLL($args);
        }
        public function get_filter($args) {
            return $this -> bll -> get_filter_BLL($args);
        }
        public function get_detalle_coche() {
            return $this -> bll -> get_detalle_coche_BLL();
        }
        public function get_home_filter($args) {
            return $this -> bll -> get_home_filter_BLL($args);
        }
        public function get_search($args) {
            return $this -> bll -> get_search_BLL($args);
        }
        public function get_count_cars_related($args) {
            return $this -> bll -> get_count_cars_related_BLL($args);
        }
        public function get_cars_related($args) {
            return $this -> bll -> get_cars_related_BLL($args);
        }
        public function get_control_likes($args) {
            return $this -> bll -> get_control_likes_BLL($args);
        }
        public function get_load_likes_user($args) {
            return $this -> bll -> get_load_likes_user_BLL($args);
        }
    }
?>
