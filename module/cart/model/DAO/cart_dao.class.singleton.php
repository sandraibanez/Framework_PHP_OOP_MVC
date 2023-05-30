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
            // echo json_encode('select_load_like');
            // exit;
           
            $sql = "SELECT * FROM cart WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= '$user' ) AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);

            // $sql = "call cart_product ('select_product','$user', '$id',@hist_carts );";
            // // $stmt = $db->ejecutar($sql);
            //  $stmt = $db->procedure_select($sql);
            // return $db->listar($stmt);
        }

        public function insert_product($db,$user, $id) {
            // return $id;
            // echo json_encode('insert_product');
            // exit;
            $sql ="call cart_product ('insert_product','$user', '$id',@hist_carts )";
            // $sql = " INSERT INTO cart (user, codigo_producto, qty) VALUES ((SELECT  u.id_user FROM users u WHERE u.username= '$user' ),'$id', '1')";
            // echo json_encode($sql);
            // exit;
    //   echo json_encode($sql);
    //   exit;
         
            // return $stmt = $db->ejecutar($sql);
            // return  $stmt = $db->procedure_select2($sql);
            // return $db->listar($stmt);
            return $stmt = $db->ejecutar($sql);
            
        }
   

    public function update_product($db, $user, $id) {
        // $sql = "UPDATE cart SET qty = qty+1 WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= '$user' ) AND codigo_producto='$id'";
        $sql ="call cart_product ('update_product','$user', '$id',@hist_carts )";

        // $stmt = $db->ejecutar($sql);
        // if ($stmt) {
        //     return "like";
        // } else {
        //     return "error";
        // }
        // echo json_encode($sql);
        // exit;
        return $stmt = $db->ejecutar($sql);
        }
    
        public function select_user_cart($db,$nameuser) {
           
            $sql = "SELECT c1.user, c1.codigo_producto, c1.qty, c2.img_car, m.name_model, c2.price, b.name_brand,c2.gear_shift, c.qty_max
            FROM  cart c INNER JOIN cart_hist c1 INNER JOIN car c2 INNER JOIN model m INNER JOIN brand b
             ON c.cod_cart=c1.cod_cart  and c.codigo_producto= c2.id_car and c2.model=m.id_model and m.id_brand=b.name_brand 
            WHERE c.codigo_producto AND c.user=(SELECT u.id_user FROM users u WHERE u.username= '$nameuser' )";
            // $sql ="call user_cart2 ('select_user_cart','$nameuser',@hist_carts2 )";
            
            //  echo json_encode($sql);
            //  exit;
    //   echo json_encode($sql);
    //   exit;
         
            // return $stmt = $db->ejecutar($sql);
                //  $stmt = $db->ejecutar($sql);
                //  return "unlike";
                // return $stmt = $db->ejecutar($sql);  
                
                $stmt = $db->ejecutar($sql);
                return $db->listar($stmt);
            //     $stmt = $db->procedure_select($sql);
            // return $db->listar($stmt);
        }
        public function update_qty($db, $user, $id, $qty) {
            // $sql = "UPDATE cart SET qty = '$qty' WHERE user=(SELECT  u.id_user FROM users u WHERE u.username= '$user' ) AND codigo_producto='$id'";
            $sql ="call cart_cantidad ('update_qty','$user','$id','$qty',@hist_carts3 )";

            // $stmt = $db->ejecutar($sql);
            // return $db->listar($stmt);
            return $stmt = $db->ejecutar($sql);
            }
            public function delete_cart($db,$user, $id) {
                
                $sql = " call cart_product ('delete_cart','$user', '$id',@hist_carts )";
                
                return $stmt = $db->ejecutar($sql);
    
                
            }
            public function checkout($db,$data, $user) {
                // return $user;
                $date = date("Ymd");

                foreach($data as $fila){
                    // return $fila["codigo_producto"];
                        $cod_prod = $fila["codigo_producto"];
                        // $talla = $fila["talla"];
                        $cantidad = $fila["qty"];
                        $precio = $fila["precio"];
                        $total_precio = $fila["precio"]*$fila["qty"];
                        // $sql = " INSERT INTO `producto2`( `user`, `cod_prod`, `cantidad`, `precio`, `total_precio`, `fecha`) 
                        //          VALUES ((SELECT  u.id_user FROM users u WHERE u.username= '$user' ),'$cod_prod','$cantidad',(SELECT  c.price FROM car c WHERE c.id_car='$cod_prod'),'$total_precio','$date')";
                        $sql ="call cart_checkout ('checkout','$user', '$cod_prod',' $cantidad',' $total_precio','$date',@hist_carts4 )";
                        // return $sql;
                        // $stmt = $db->ejecutar($sql);
                        // return $db->listar($stmt);
                       
                }
                return $stmt = $db->ejecutar($sql);
            }
        
    }

?>

