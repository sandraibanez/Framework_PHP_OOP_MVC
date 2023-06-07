<?php

    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_carrusel($db) {
            $sql = "SELECT * FROM brand ORDER BY name_brand ASC LIMIT 25";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_category($db) {
            $sql = "SELECT * FROM category";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_type($db) {
            $sql = "SELECT * FROM type_motor ORDER BY cod_tmotor DESC";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_visitas($db) {
            $sql = "SELECT  * 
			FROM car c, model m
			WHERE c.model = m.id_model  
			ORDER BY c.countcar DESC
			LIMIT 0, 4";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>