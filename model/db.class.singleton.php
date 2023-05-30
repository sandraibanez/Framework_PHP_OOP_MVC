<?php
    class db {
        private $server;
        private $user;
        private $password;
        private $database;
        private $link;
        private $stmt;
        private $array;
        static $_instance;

        private function __construct() {
            $this -> setConexion();
            $this -> conectar();
        }
        
        private function setConexion() {
            require_once 'Conf.class.singleton.php';
            $conf = Conf::getInstance();
            
            $this->server = $conf -> getHostDB();
            $this->database = $conf -> getDB();
            $this->user = $conf -> getUserDB();
            $this->password = $conf -> getPassDB();
        }

        private function __clone() {

        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self))
                self::$_instance = new self();
            return self::$_instance;
        }

        private function conectar() {
            $this -> link = new mysqli($this -> server, $this -> user, $this -> password);
            $this -> link -> select_db($this -> database);
        }

        public function ejecutar($sql) {
            $this -> stmt = $this -> link -> query($sql);
            return $this->stmt;
        }
        
        public function listar($stmt) {
            // return $stmt;
            $this -> array = array();
            while ($row = $stmt -> fetch_array(MYSQLI_ASSOC)) {
                array_push($this -> array, $row);
            }
            return $this -> array;
        }
    //     public function procedure_select2($sql){
    //         // return $sql;
    //         // $this -> stmt = $this ->link->query( $sql);
    //         // return $this ->link->query( $sql);
    //         // return $this -> stmt;
    //         $res = mysqli_query($this ->link, $sql);
    //         if (empty($res)){
    //             return 'error2';

    //         }else{
    //             return $res;
    //         }
    //     }

    //     public function procedure_select($sql){
    //         // return $sql;
    //         // $this -> stmt = $this -> link -> query($sql);

    //         // $this -> array = array();
    //         // while ($row =  $this -> stmt -> fetch_array(MYSQLI_ASSOC)) {
    //         //     array_push($this -> array, $row);
    //         // }
    //         // return $this -> array;
    //         // $this -> link = connect::con();
    //         $res = mysqli_query($this ->link, $sql);
    //         // connect::close($this -> link);
    //         if (!$res){
    //             return 'error';

    //         }else{
    //             // $this -> array = array();
    //             // while ($row = $res -> fetch_array(MYSQLI_ASSOC)) {
    //             //     array_push($this -> array, $row);
    //             // }
    //             // return $this -> array;
    //             return $res;
    //         }
            
    //     //     if ($this -> link -> query($sql) === TRUE) {
    //     //         // Consulta ejecutada con éxito
    //     //         // Realizar las operaciones necesarias con los resultados
    //     //         // Por ejemplo, obtener el valor de la variable de sesión "@hist_carts"
    //     //         $this -> stmt = $this -> link -> query($sql);
    //     //         // "SELECT @hist_carts"
    //     //         // $fila = $resultado->fetch_assoc();
    //     //         // $hist_carts = $fila['@hist_carts'];
            
    //     //     //     // Imprimir el valor obtenido
    //     //         return  $this -> stmt;

               
    //     //     // } else {
    //     //     //     // Si hay un error en la consulta
    //     //     //     echo "Error en la consulta: " . $this -> link->error;
    //     //     }
            
    //     //     // Cerrar la conexión
    //     //     // $this -> link->close();
    //     //     // return $hist_carts;
    //    }

    }
