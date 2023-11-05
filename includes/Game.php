<?php
    class Game {
        function __construct() {

        }

        public function dealCards($number_of_people) {
            // call availableCards function
            $new_set_of_cards = $this->availableCards();
            // To make more random order, seed the random number generator with the current time
            srand(time());
            //  shuffle all the cards in array
            shuffle($new_set_of_cards);
            return $new_set_of_cards;
        }

        // Get availableCards function
        private function availableCards() {
            // initial declare the cards
            $init_cards = array();
            // Card 2 to 9 are, as it is, 1=A,10=X,11=J,12=Q,13=K
            $number_of_cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K'];
            // Spade = S, Heart = H, Diamond = D, Club = C
            $types_of_cards = ['S', 'H', 'C', 'D'];

            foreach($number_of_cards as $number) {
                foreach($types_of_cards as $type) {
                    // push all available cards into array
                    array_push($init_cards, $type.'-'.$number);
                }
            }
            // return all available cards
            return $init_cards;
        }
    }
?>