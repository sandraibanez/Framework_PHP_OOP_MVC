<?php
    class cart_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_product($db,$user, $id) {
           
           
            $sql = "SELECT * FROM cart WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= '$user' ) AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);

        }

        public function insert_product($db,$user, $id) {
         
            $sql ="call cart_product ('insert_product','$user', '$id',@hist_carts )";
           
            return $stmt = $db->ejecutar($sql);
            
        }
   

    public function update_product($db, $user, $id) {
        $sql ="call cart_product ('update_product','$user', '$id',@hist_carts )";

     
        return $stmt = $db->ejecutar($sql);
        }
    
        public function select_user_cart($db,$nameuser) {
           
            $sql = "SELECT c1.user, c1.codigo_producto, c1.qty, c2.img_car, m.name_model, c2.price, b.name_brand,c2.gear_shift, c.qty_max
            FROM  cart c INNER JOIN cart_hist c1 INNER JOIN car c2 INNER JOIN model m INNER JOIN brand b
             ON c.cod_cart=c1.cod_cart  and c.codigo_producto= c2.id_car and c2.model=m.id_model and m.id_brand=b.name_brand 
            WHERE c.codigo_producto AND c.user=(SELECT u.id_user FROM users u WHERE u.username= '$nameuser' )";
             
                
                $stmt = $db->ejecutar($sql);
                return $db->listar($stmt);
           
        }
        public function update_qty($db, $user, $id, $qty) {
            $sql ="call cart_cantidad ('update_qty','$user','$id','$qty',@hist_carts3 )";

            return $stmt = $db->ejecutar($sql);
            }
            public function delete_cart($db,$user, $id) {
                
                $sql = " call cart_product ('delete_cart','$user', '$id',@hist_carts )";
                
                return $stmt = $db->ejecutar($sql);
    
                
            }
            public function checkout($db,$data, $user) {
                $date = date("Ymd");

                foreach($data as $fila){
                        $cod_prod = $fila["codigo_producto"];
                        $cantidad = $fila["qty"];
                        $precio = $fila["precio"];
                        $total_precio = $fila["precio"]*$fila["qty"];
                        $sql ="call cart_checkout ('checkout','$user', '$cod_prod',' $cantidad',' $total_precio','$date',@hist_carts4 )";
                        
                       
                }
                return $stmt = $db->ejecutar($sql);
            }
        
    }

?>

