<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}
		public function get_search_brand_BLL() {
			return $this -> dao -> search_brand($this->db);
		}
		public function get_search_category_null_BLL() {
			return $this -> dao -> search_category_null($this->db);
		}
		public function get_search_category_BLL($args) {
			return $this -> dao -> search_category($this->db,$args);
		}
		public function get_autocomplete_BLL($args) {
			// return ($args['brand']);
			// isset($args['name_brand'])==null
			// {complete: 'o', brand: 'Audi', category: 'Second Hand'}
			if (!empty($args['brand']) && empty($args['category'])){
				// echo json_encode('autocomplete1.php');
				// exit;
				$complete = $args['complete'];
				$brand = $args['brand'];
				// $category = $args['category'];
				return $this -> dao ->select_only_brand($this->db,$complete,$brand);
			}
			else if(!empty($args['brand']) && !empty($args['category'])){
				//  echo json_encode('autocomplete2.php');
				// exit;
				return $this -> dao ->select_brand_category($this->db,$args['complete'], $args['brand'], $args['category']);
			
			}else if(empty($args['brand']) && !empty($args['category'])){
				//  echo json_encode('autocomplete3.php');
				// exit;
				return $this -> dao ->select_only_category($this->db,$args['category'], $args['complete']);
			
			}else {
				//  echo json_encode('autocomplete4.php');
				// exit;
				return $this -> dao ->select_city($this->db,$args['complete']);
			}
			//// return $this -> dao -> select_car_type($this->db);
		}

		// public function get_car_type_BLL() {
		// 	return $this -> dao -> select_car_type($this->db);
		// }

		// public function get_car_brand_BLL() {
		// 	return $this -> dao -> select_car_brand($this->db);
		// }

        // public function get_car_type_brand_BLL($args) {
		// 	return $this -> dao -> select_car_type_brand($this->db, $args);
		// }

		// public function get_auto_car_type_BLL($args) {
        //     // return ($args[1]);
		// 	return $this -> dao -> select_auto_car_type($this->db, $args[0], $args[1]);
		// }

        // public function get_auto_car_brand_BLL($args) {
		// 	return $this -> dao -> select_auto_car_brand($this->db, $args[0], $args[1]);
		// }

        // public function get_auto_car_type_brand_BLL($args) {
		// 	return $this -> dao -> select_auto_car_type_brand($this->db, $args[0], $args[1], $args[2]);
		// }

        // public function get_auto_BLL($args) {
		// 	return $this -> dao -> select_auto($this->db, $args);
		// }
		
	}
?>