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
			
			if (!empty($args['brand']) && empty($args['category'])){
				
				$complete = $args['complete'];
				$brand = $args['brand'];
				return $this -> dao ->select_only_brand($this->db,$complete,$brand);
			}
			else if(!empty($args['brand']) && !empty($args['category'])){
			
				return $this -> dao ->select_brand_category($this->db,$args['complete'], $args['brand'], $args['category']);
			
			}else if(empty($args['brand']) && !empty($args['category'])){
			
				return $this -> dao ->select_only_category($this->db,$args['category'], $args['complete']);
			
			}else {
				
				return $this -> dao ->select_city($this->db,$args['complete']);
			}
		}

		
		
	}
?>