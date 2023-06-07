<?php
    class shop_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        public function select_all_cars($db) {
            $prod = $_POST['total_prod'];
            $items2 = $_POST['items_page'];
            $sql = "SELECT DISTINCT * 
            FROM car c, model m
            WHERE c.model = m.id_model  
            ORDER BY c.countcar DESC
            LIMIT $items2 OFFSET $prod";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count($db) {
            
            $sql = "SELECT COUNT(*) contador
            FROM car";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_count_filter($db,$filter ) {
          
            $consulta = "SELECT COUNT(DISTINCT c.id_car) contador
            FROM car c INNER JOIN img_cars i INNER JOIN category ca INNER JOIN type_motor t INNER JOIN model m 
            ON c.id_car = i.id_car AND  i.img_cars LIKE ('%1%') AND c.category = ca.id_cat AND c.motor = t.cod_tmotor
            AND c.model= m.id_model";
            for ($i=0; $i < count($filter); $i++){
                if ($i==0){
                    if ($filter[$i][0] == 'car'){
                        $consulta.= " ORDER BY " . $filter[$i][1] . " ASC";

                    }
                    else{
                    $consulta.= " WHERE c." . $filter[$i][0] . "= '" . $filter[$i][1]."'";
                    }
                }
                else {
                    if ($filter[$i][0] == 'car'){
                        $consulta.= " ORDER BY " . $filter[$i][1] . " ASC";

                    }
                    else{$consulta.= " AND c." . $filter[$i][0] . "= '" . $filter[$i][1]."'";}
                }        
            }   
            $stmt = $db->ejecutar($consulta);
            return $db->listar($stmt);
        }
        public function count_filter_home($db,$brand2,$category2,$motor2,$opc) {
            $opc_filter = $opc;
            
		    $filter = "";
            
            if ($opc_filter == "brand") {
                $brand = $brand2;
                $filter = "m.id_brand = '" . $brand . "'";
            } else if ($opc_filter == "cate") {
                $category = $category2;
                $filter = "ca.name_cat = '" . $category . "'";
            } else {
                $type_motor = $motor2;
                $filter = "t.name_tmotor = '" . $type_motor . "'";
            }
            
               $sql = "SELECT COUNT(*) contador
               FROM car c, model m, type_motor t, category ca
               WHERE  c.model = m.id_model 
               AND c.category = ca.id_cat
               AND c.motor = t.cod_tmotor
               AND $filter";
          
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function count_search($db, $filters_search) {
            $count = 1;
        $consulta = "SELECT COUNT(*) contador
		FROM car c INNER JOIN category ca INNER JOIN type_motor t INNER JOIN model m1 INNER JOIN brand b1 
		ON c.category=ca.id_cat and c.img_car LIKE ('%1%') AND c.model = m1.id_model 
		AND m1.id_brand=b1.name_brand and c.motor=t.cod_tmotor";
	
	
        for ($i=0; $i < $count; $i++){
            if ($count==1){
                if ($filters_search[0]['brand'][0]){
                    $consulta .= " WHERE b1.name_brand  = '" . ($filters_search[0]['brand'][0]."'");
                    $count = 2;
                }
                else if ($filters_search[0]['category'][0]){
                    $consulta .= " WHERE ca.name_cat = '" . ($filters_search[0]['category'][0])."'";
                    $count = 3;
                }
                else if ($filters_search[0]['city'][0]){
                    $consulta .= " WHERE c.city = '" . ($filters_search[0]['city'][0])."'";
                    $count = 4;
                }
             }else  {
                if ($filters_search[1]['category'][0]){
                    $consulta .= " AND ca.name_cat = '" . ($filters_search[1]['category'][0])."'";
					
                }
                if ($filters_search[2]['city'][0]){
                    $consulta .= " AND c.city = '" .($filters_search[2]['city'][0])."'";
					
                }
			}
        }

            $stmt = $db->ejecutar($consulta);
            return $db->listar($stmt);
        }
        public function select_one_car($db, $id) {
            $sql = "SELECT *
            FROM car c, model m, type_motor t, category ca
            WHERE c.id_car = '$id'
            AND  c.model = m.id_model 
            AND c.category = ca.id_cat
            AND c.motor = t.cod_tmotor ";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        public function select_imgs_car($db, $id) {
            $details = self::select_one_car($db, $id);
            $sql = "SELECT i.id_car, i.img_cars
            FROM img_cars i
            WHERE i.id_car = '$id'";
            $stmt = $db->ejecutar($sql);
            
            $array = array();
            
            if (mysqli_num_rows($stmt) > 0) {
                foreach ($stmt as $row) {
                    array_push($array, $row);
                }
            }

            $rdo = array();
            $rdo[0] = $details;
            $rdo[1][] = $array;

            return $rdo;
        }
        public function countcar($db, $id) {
            $sql = "UPDATE car c1 
            SET c1.countcar= c1.countcar+1 
            WHERE c1.id_car=$id";
             $stmt = $db->ejecutar($sql);
            return "countcar";
        }
        public function filters($db, $filter) {
            $total_prod =  $_POST['total_prod'];
            $items_page =  $_POST['items_page'];
            $consulta = "SELECT DISTINCT c.*
            FROM car c INNER JOIN img_cars i INNER JOIN category ca INNER JOIN type_motor t INNER JOIN model m 
            ON c.id_car = i.id_car AND  i.img_cars LIKE ('%1%') AND c.category = ca.id_cat AND c.motor = t.cod_tmotor
            AND c.model= m.id_model";
                for ($i=0; $i < count($filter); $i++){
                    if ($i==0){
                        if ($filter[$i][0] == 'car'){
                            $consulta.=" ORDER BY " . $filter[$i][1] .  " DESC";
            
                        } else {
                            $consulta.= " WHERE c." . $filter[$i][0] . "='" . $filter[$i][1]."'";
                        }
                    }
                    else{
                        if ($filter[$i][0] == 'car'){
                            $consulta.=" ORDER BY " . $filter[$i][1] . " DESC";
                        
                        }else{
                            $consulta.= " AND c." . $filter[$i][0] . "='" . $filter[$i][1]."'";
                        }
                    }     
                    
                }   
                $consulta.="LIMIT $total_prod,$items_page ";   
            $stmt = $db->ejecutar($consulta);
            return $db->listar($stmt);
            
        }
        
        public function detalle_coche($db) {
            $opc_filter = $_GET['opc'];
            $filter = "";
            if ($opc_filter == "coche") {
                $coche = $_GET['coche'];
                $filter = "m.id_brand = '" . $coche . "'";
            }
    
            $sql="SELECT * 
            FROM car c, model m, type_motor t, category ca, img_cars i1 
            WHERE c.id_car = 1 AND c.model = m.id_model AND c.category = ca.id_cat 
            AND c.motor = t.cod_tmotor and c.id_car=i1.id_car
            and $filter";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
            
        }
        public function select_filter_home($db,$brand,$category2,$motor2, $opc) {
            $total_prod =  $_POST['total_prod'];
	        $items_page =  $_POST['items_page'];
            $opc_filter = $opc;
            $filter = "";
            if ($opc_filter == "brand") {
                $brand1 =$brand;
                $filter = "m.id_brand = '" . $brand1 . "'";
            } else if ($opc_filter == "cate") {
                $category = $category2;
                $filter = "ca.name_cat = '" . $category . "'";
            } else {
                $type_motor = $motor2;
                $filter = "t.name_tmotor = '" . $type_motor . "'";
            }
            $sql = "SELECT c.*,m.id_brand, m.name_model, t.name_tmotor, ca.name_cat
            FROM car c, model m, type_motor t, category ca
            WHERE  c.model = m.id_model 
            AND c.category = ca.id_cat
            AND c.motor = t.cod_tmotor
            AND $filter";
             $sql.="LIMIT $total_prod,$items_page ";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
            
        }

        public function search($db,$filters_search) {
            $prod = $_POST['total_prod'];
            $items_page =  $_POST['items_page'];
            $count = 1;
            $consulta = "SELECT *
            FROM car c INNER JOIN category ca INNER JOIN type_motor t INNER JOIN model m1 INNER JOIN brand b1 
            ON c.category=ca.id_cat and c.img_car LIKE ('%1%') AND c.model = m1.id_model 
            AND m1.id_brand=b1.name_brand and c.motor=t.cod_tmotor";
        
            for ($i=0; $i < $count; $i++){
                if ($count==1){
                    if ($filters_search[0]['brand'][0]){
                        $consulta .= " WHERE b1.name_brand  = '" . ($filters_search[0]['brand'][0]."'");
                        $count = 2;
                    }
                    else if ($filters_search[0]['category'][0]){
                        $consulta .= " WHERE ca.name_cat = '" . ($filters_search[0]['category'][0])."'";
                        $count = 3;
                    }
                    else if ($filters_search[0]['city'][0]){
                        $consulta .= " WHERE c.city = '" . ($filters_search[0]['city'][0])."'";
                        $count = 4;
                    }
                 }else  {
                    if ($filters_search[1]['category'][0]){
                        $consulta .= " AND ca.name_cat = '" . ($filters_search[1]['category'][0])."'";
                        
                    }
                    if ($filters_search[2]['city'][0]){
                        $consulta .= " AND c.city = '" .($filters_search[2]['city'][0])."'";
                        
                    }
                }
            }
    
            $consulta.="LIMIT $prod,$items_page ";
            $stmt = $db->ejecutar($consulta);
            return $db->listar($stmt);
            
        }
        public function count_more_cars_related($db,$type_car) {
            $sql = "SELECT COUNT(*) AS n_prod
            FROM car c INNER JOIN type_motor t1 on c.motor=t1.cod_tmotor
            WHERE t1.name_tmotor = '$type_car'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
            
        }
        public function select_cars_related($db,$type, $loaded, $items) {
            $sql = "SELECT * 
            FROM car c, model m, type_motor t 
            WHERE c.model = m.id_model and t.cod_tmotor=c.motor 
            AND t.name_tmotor = '$type' 
            LIMIT $loaded, $items";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
            
        }

        public function select_load_likes($db,$username) {
            $sql = "SELECT l.id_car FROM likes l WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
            
        }

        public function select_likes($db,$id_car, $username) {
            $sql = " SELECT id_car FROM likes l
            WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')
            AND l.id_car = $id_car";            
           
             $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
            
        }

    public function like($db, $id_car, $username) {
        $sql = "call likes3 ('like','$username','$id_car',@car1);";
        return $stmt = $db->ejecutar($sql);
        }
    
        public function dislike($db,$id_car, $username) {
            $sql = "call likes3 ('dislike','$username','$id_car',@car1);";
                return $stmt = $db->ejecutar($sql);            
        }
    }

?>

