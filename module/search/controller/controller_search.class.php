<?php
    class controller_search {

        function search_brand() {
            
            echo json_encode(common::load_model('search_model', 'get_search_brand'));
        }
        function search_category_null() {
           
            echo json_encode(common::load_model('search_model', 'get_search_category_null'));
        }
        function search_category() {
            
            echo json_encode(common::load_model('search_model', 'get_search_category',$_POST['brand']));
        }
        function autocomplete() {
          
            echo json_encode(common::load_model('search_model', 'get_autocomplete',$_POST['sdata']));
        }

        
    }
?>