 <?php
//   require_once(SITE_ROOT.'module/home/model/BLL/home_bll.class.singleton.php');
//   require_once(SITE_ROOT.'module/home/model/DAO/home_dao.class.singleton.php');
//   require_once(SITE_ROOT.'model/db.class.singleton.php');
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = home_dao::getInstance();
			$this -> db = db::getInstance();
			// echo json_encode('hola');
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_carrusel_BLL() {
			// return $this->dao;
			return $this -> dao -> select_data_carrusel($this -> db);
			// $this -> db
		}

		public function get_category_BLL() {
			// return 'get_category_BLL';
			return $this -> dao -> select_data_category($this -> db);
			// $this -> db
		}

		public function get_type_BLL() {
			return $this -> dao -> select_data_type($this -> db);
			// $this -> db
		}
		public function get_visitas_BLL() {
			return $this -> dao -> select_data_visitas($this -> db);
			// $this -> db
		}
	}
?>  