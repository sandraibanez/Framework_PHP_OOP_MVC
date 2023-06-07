<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        public function get_all_cars_BLL() {
		return $this -> dao -> select_all_cars($this->db);
		}
		public function get_count_BLL() {
			return $this -> dao -> select_count($this->db);
		}
		public function get_count_filters_BLL($args) {
			return $this -> dao -> select_count_filter($this->db,$args);
		}
		public function get_count_home_BLL($args) {
			if(isset($args['name_brand'])==null){
				$brand_filter = $args;
			}
			if(isset($args['category_home'])==null){
				$motor = $args;
			}
			if(isset($args['name_tmotor'])==null){
				$category = $args;
			}
			$brand = '';
			$motor1 = '';
			$category1 = '';
		
			if (isset($brand_filter[0]['name_brand'])) {
				$brand = $brand_filter[0]['name_brand'][0];
				$opc ='brand';
			}
			if (isset($brand_filter[0]['name_tmotor'])) {
				$motor1 = $motor[0]['name_tmotor'][0];
				$opc ='';
			}
			if (isset($brand_filter[0]['category_home'])) {
				$category1 = $category[0]['category_home'][0];
				$opc ='cate';
			}
			return $this -> dao -> count_filter_home($this->db, $brand,$category1,$motor1,$opc);
		}
		public function get_count_search_BLL($args) {
			return $this -> dao -> count_search($this->db,$args);
		}	
		public function get_details_car_BLL($args) {
			return $this -> dao -> select_imgs_car($this->db,$args);
		}	
		public function get_countcar_BLL($args) {
			return $this -> dao -> countcar($this->db,$args);
		}
		public function get_filter_BLL($args) {
			
			return $this -> dao -> filters($this->db,$args);
		}
		public function get_detalle_coche_BLL() {
			return $this -> dao -> detalle_coche($this->db);
		}
		
		public function get_home_filter_BLL($args) {
			
			if(isset($args['name_brand'])==null){
				$brand_filter = $args;
			}
			if(isset($args['category_home'])==null){
				$motor = $args;
			}
			if(isset($args['name_tmotor'])==null){
				$category = $args;
			}
		
			$brand = '';
			$motor1 = '';
			$category1 = '';
		
			if (isset($brand_filter[0]['name_brand'])) {
				$brand = $brand_filter[0]['name_brand'][0];
				$opc ='brand';
			}
			if (isset($brand_filter[0]['name_tmotor'])) {
				$motor1 = $motor[0]['name_tmotor'][0];
				$opc ='';
			}
			if (isset($brand_filter[0]['category_home'])) {
				$category1 = $category[0]['category_home'][0];
				$opc ='cate';
			}

		
		}
		
		
		
		public function get_search_BLL($args) {
			return $this -> dao -> search($this->db,$args);
		}
		public function get_count_cars_related_BLL($args) {
			return $this -> dao -> count_more_cars_related($this->db,$args);
		}
		public function get_cars_related_BLL($args) {
			return $this -> dao -> select_cars_related($this->db,$args[0], $args[1], $args[2]);
		}
		
		public function get_control_likes_BLL($args) {
			try {
				$json = middleware::decode_token($args[0]);
				$rdo = $this->dao->select_likes($this->db, $args[1], $json['username']);
				if ($rdo) {
					$rdo2=$this->dao->dislike($this->db, $args[1], $json['username']);
					return 'delete';
				}
				$rdo3= $this->dao->like($this->db, $args[1], $json['username']);
				return 'likes';
			} catch (Exception $e) {
				
				return 'error';
			}
		}
		
		
		public function get_load_likes_user_BLL($args) {
			try {
				$json = middleware::decode_token($args);
				$rdo = $this ->dao->select_load_likes($this->db,$json['username']);
			} catch (Exception $e) {
			
				return 'error';
			}
			if (!$rdo) {
				
				return 'error';
			} else {
				$dinfo = array();
				foreach ($rdo as $row) {
					array_push($dinfo, $row);
				}
			
				return $dinfo;
			}
				
		}
        
	}
?>