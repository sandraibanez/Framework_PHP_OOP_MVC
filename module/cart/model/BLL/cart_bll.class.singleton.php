 <?php
//   require_once(SITE_ROOT.'module/home/model/BLL/home_bll.class.singleton.php');
//   require_once(SITE_ROOT.'module/home/model/DAO/home_dao.class.singleton.php');
//   require_once(SITE_ROOT.'model/db.class.singleton.php');
	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			$this -> db = db::getInstance();
			// echo json_encode('hola');
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}
		public function get_insert_cart_BLL($args) {
			// return $args;
			$id_car = $args[1];
			$dinfo = array();
		   
			try {
				$json = middleware::decode_token($args[0]);  
				// $dao = new DAOCart();
				$rdo = $this->dao->select_product($this ->db, $json['username'], $id_car);
				$dinfo = array();
				//  return $rdo;
				foreach ($rdo as $row) {
				array_push($dinfo, $row);
				}
				// return $dinfo;
				// echo json_encode($dinfo);
				// exit;
				// si un usuario inserta un coche ya no deja insertar mas coches
			if ( empty($dinfo)) {
				// $dao = new DAOCart();
				// return 'hola';
				$rdo = $this->dao->insert_product($this ->db,$json['username'], $id_car);
				// return $rdo;
				// echo json_encode("insert");
				// exit;
				
					return 'insert';
				
				
			} else {
				// $dao = new DAOCart();
				$rdo = $this->dao->update_product($this ->db,$json['username'], $id_car);
				// echo json_encode("update");
				// exit;
				return 'update';
			}
			} catch (Exception $e) {
				// echo json_encode("error");
				// exit;
				return 'error';
			}
			
		}
		public function get_delete_cart_BLL($args) {
			// return $this->dao;
			$id_car = $args[1];
                try{  
                    $json = middleware::decode_token($args[0]);
                    // $dao = new DAOCart();
                    $rdo = $this->dao->delete_cart($this ->db,$json['username'], $id_car);
                }catch (Exception $e){
                    return 'error';
                }
                if(!$rdo){
					return 'error';
                }else{
                    return 'delete';
                }
			
		}
		public function get_load_cart_BLL($args) {
			try{
				$json = middleware::decode_token($args); 
			//     echo json_encode($json);
			// exit; 
				// $dao = new DAOCart();
				$rdo = $this->dao->select_user_cart($this ->db,$json['username']);
			//         echo json_encode($rdo);
			// exit; 
			}catch (Exception $e){
				return 'error';
			}
			if(!$rdo){
				return 'lista_vacia';
			}else{
				$dinfo = array();
				foreach ($rdo as $row) {
					array_push($dinfo, $row);
				}
				// echo json_encode($dinfo);
				return $dinfo;
			}
			
		}
		
		
		
		
		public function get_update_qty_BLL($args) {
			$id_car = $args[1]; 
            $qty = $args[2] ;
            //  echo json_encode($id_car);
            //     exit; 
                try{
                    $json = middleware::decode_token($args[0]); 
                    // $dao = new DAOCart();
					$rdo = $this->dao->update_qty($this ->db,$json['username'], $id_car,$qty);
                }catch (Exception $e){
					return 'error';
                }
                if(!$rdo){
					return 'error';
                }else{
					return 'update';
                }
		}
		public function get_checkout_BLL($args) {
			try{
                $json = middleware::decode_token($args); 
            //     echo json_encode($json);
            // exit; 
                // $dao = new DAOCart();
                $rdo = $this->dao->select_user_cart($this ->db,$json['username']);
				// return $rdo;
            }catch (Exception $e){
                return 'error';
            }
            if(!$rdo){
				return 'error';
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
				// return $dinfo;
                // echo json_encode($dinfo);
                    // $dao = new DAOCart();
                    $rdo = $this->dao->checkout($this ->db,$dinfo,$json['username']);
					// return $rdo;
                    // echo json_encode($rdo);
                    // exit; 
                    return 'checkout';
            }
		}

		
	}
?>  