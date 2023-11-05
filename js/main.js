$(document).ready(function() {

    // When user on click deal cards button
    $(document).on('click', '#deal-cards', function() {
        // disable button to prevent user from multiple request
        $('#deal-cards').prop('disabled', true);

        // reset the environment
        $('.error-message').html("");
        $('#player_environment').html("");

        let error_message = "Input value does not exist or value is invalid";

        try {
            let number_of_people = $('#number_of_people').val();

            // Check if exist value in front-end
            if(!number_of_people) {
                throw new Error(error_message);
            }

            // Check if number of people is less than zero in front-end
            if(number_of_people <= 0) {
                throw new Error(error_message);
            }

            $.ajax({
                type: 'POST',
                url: '../v1/game.php', //post url
                dataType: 'JSON',
                data: { //payload form data
                    number_of_people: number_of_people
                },
                success: function(result){ //if request successful
                    // enable button
                    $('#deal-cards').prop('disabled', false);
                    // assign return result of shuffled cards set
                    const cards = result.data;
                    // total number of players
                    const total_players = parseInt(number_of_people);
                    // how many set of players array
                    let deal_cards = new Array(total_players);
                    // start from first player
                    let start_from_people = 0;

                    for (let i = 0; i < cards.length; i++) {
                        // check if the array set of player declared or not
                        // if exist then get the old assigned card
                        let array = deal_cards[start_from_people] ?? [];
                        // push the card to the person
                        array.push(cards[i])
                        // assign latest set of array to the player
                        deal_cards[start_from_people] = array;

                        // give card to the next player
                        start_from_people +=1;
                        if(start_from_people >= total_players) {
                            start_from_people = 0;
                        }
                    }
                    // distribute each set of cards to the players
                    deal_cards.forEach(function(cards, i) {
                        let div_set_of_cards = "<div class='mb-2'>Player "+(i+1)+": <span class='text-primary'>"+cards.toString()+"</span></div";
                        // append to the div
                        $('#player_environment').append(div_set_of_cards);
                    })

                },
                error: function(xhr, status, error) { //if request failed
                    $('#deal-cards').prop('disabled', false);
                    $('.error-message').html(xhr.responseJSON.message);
                }
            });
        } catch (e) {
            // Error message
            $('#deal-cards').prop('disabled', false);
            $('.error-message').html(e);
        }
    })
})