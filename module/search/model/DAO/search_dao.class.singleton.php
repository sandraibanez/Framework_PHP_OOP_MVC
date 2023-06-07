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
            
			$sql = "SELECT ca.name_cat 
            FROM car c, category ca, model m1 
            WHERE ca.id_cat = c.category AND m1.id_model=c.model and m1.id_brand ='$brand'";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_only_brand($db,$complete, $brand){
         
			$sql = "SELECT * 
            FROM car c INNER JOIN model m1 on c.model=m1.id_model 
            WHERE m1.id_brand = '$brand' AND city LIKE '$complete%'";
           
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        function select_only_category($db,$category, $complete){
            
			$sql = "SELECT * 
            FROM car c INNER JOIN category c1 on c.category=c1.id_cat 
            WHERE c1.name_cat = '$category' AND city LIKE '$complete%'";
         
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        function select_brand_category($db,$complete, $brand, $category){
          
			$sql = "SELECT * 
            FROM car c INNER JOIN category c1 INNER JOIN model m1 on c.category=c1.id_cat and c.model=m1.id_model 
            WHERE m1.id_brand = '$brand' AND c1.name_cat = '$category' AND c.city LIKE '$complete%'";
          
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        function select_city($db, $complete){
            
			$sql = "SELECT *
            FROM car c
            WHERE c.city LIKE '$complete%'";
                
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }



        
    }

?>