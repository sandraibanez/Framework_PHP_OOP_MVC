 <?php
	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}
		public function get_insert_cart_BLL($args) {
			$id_car = $args[1];
			$dinfo = array();
		   
			try {
				$json = middleware::decode_token($args[0]);  
				$rdo = $this->dao->select_product($this ->db, $json['username'], $id_car);
				$dinfo = array();
				foreach ($rdo as $row) {
				array_push($dinfo, $row);
				}
				
			if ( empty($dinfo)) {
				
				$rdo = $this->dao->insert_product($this ->db,$json['username'], $id_car);
				
				
					return 'insert';
				
				
			} else {
				$rdo = $this->dao->update_product($this ->db,$json['username'], $id_car);
				
				return 'update';
			}
			} catch (Exception $e) {
				
				return 'error';
			}
			
		}
		public function get_delete_cart_BLL($args) {
			$id_car = $args[1];
                try{  
                    $json = middleware::decode_token($args[0]);
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
			
				$rdo = $this->dao->select_user_cart($this ->db,$json['username']);
		
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
				return $dinfo;
			}
			
		}
		
		
		
		
		public function get_update_qty_BLL($args) {
			$id_car = $args[1]; 
            $qty = $args[2] ;
      
                try{
                    $json = middleware::decode_token($args[0]); 
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
           
                $rdo = $this->dao->select_user_cart($this ->db,$json['username']);
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
				
                    $rdo = $this->dao->checkout($this ->db,$dinfo,$json['username']);
				
                    return 'checkout';
            }
		}

		
	}
?>  