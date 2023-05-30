<?php
    class search_dao{
        static $_instance;

        private function __construct() {
        }
    
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        function search_brand($db){

			$sql = "SELECT name_brand FROM brand";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function search_category_null($db){

			$sql = "SELECT DISTINCT name_cat FROM category";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function search_category($db, $brand){
            // echo json_encode($brand);
            // exit;
			$sql = "SELECT ca.name_cat 
            FROM car c, category ca, model m1 
            WHERE ca.id_cat = c.category AND m1.id_model=c.model and m1.id_brand ='$brand'";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_only_brand($db,$complete, $brand){
            // echo json_encode($brand);
            // exit;
			$sql = "SELECT * 
            FROM car c INNER JOIN model m1 on c.model=m1.id_model 
            WHERE m1.id_brand = '$brand' AND city LIKE '$complete%'";
                //  echo json_encode($sql);
                //  exit;
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        function select_only_category($db,$category, $complete){
            // echo json_encode($complete);
            // exit;
			$sql = "SELECT * 
            FROM car c INNER JOIN category c1 on c.category=c1.id_cat 
            WHERE c1.name_cat = '$category' AND city LIKE '$complete%'";
            // echo json_encode($sql);
            // exit;
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        function select_brand_category($db,$complete, $brand, $category){
          
			$sql = "SELECT * 
            FROM car c INNER JOIN category c1 INNER JOIN model m1 on c.category=c1.id_cat and c.model=m1.id_model 
            WHERE m1.id_brand = '$brand' AND c1.name_cat = '$category' AND c.city LIKE '$complete%'";
            // echo json_encode($sql);
            // exit;
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        function select_city($db, $complete){
            // echo json_encode($complete);
            // exit;
			$sql = "SELECT *
            FROM car c
            WHERE c.city LIKE '$complete%'";
                // echo json_encode($sql);
                // exit;
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }


        // function select_car_type($db){

		// 	$sql = "SELECT DISTINCT type_name FROM type";

		// 	$stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // function select_car_brand($db){

        //     $sql = "SELECT DISTINCT brand_name FROM brand";

		// 	$stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // function select_car_type_brand($db, $car_type){

        //     $sql = "SELECT DISTINCT b.brand_name FROM cars c INNER JOIN type t INNER JOIN brand b ON c.brand = b.cod_brand AND c.type = t.cod_type WHERE t.type_name='$car_type'";
			
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // function select_auto_car_type($db, $car_type, $auto){

        //     $sql = "SELECT DISTINCT c.city FROM cars c INNER JOIN type t ON c.type = t.cod_type WHERE t.type_name='$car_type' AND c.city LIKE '$auto%'";

		// 	$stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // function select_auto_car_brand($db, $car_brand, $auto){

        //     $sql = "SELECT DISTINCT c.city FROM cars c INNER JOIN brand b ON c.brand = b.cod_brand WHERE b.brand_name='$car_brand' AND c.city LIKE '$auto%'";

		// 	$stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // function select_auto_car_type_brand($db, $car_type, $car_brand, $auto){

        //     $sql = "SELECT DISTINCT c.city FROM cars c INNER JOIN type t INNER JOIN brand b ON c.brand = b.cod_brand AND c.type = t.cod_type WHERE t.type_name='$car_type' AND b.brand_name='$car_brand' AND c.city LIKE '$auto%'";
			
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // function select_auto($db, $auto){

        //     $sql = "SELECT DISTINCT city FROM cars WHERE city LIKE '$auto%'";

		// 	$stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        
    }

?>