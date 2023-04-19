        //selector from your HTML form
        $('#contactForm').submit(function(e) {
            //prevent the form from submiting so we can post to the google form
            e.preventDefault();
            //AJAX request
            $.ajax({
            url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeExTaeLpcavsGY2IK_G5Fvcdv2Br1y8A_jP8tBOYiC08_Y_g/formResponse',     //The public Google Form url, but replace /view with /formResponse
            data: $('#contactForm').serialize(), //Nifty jquery function that gets all the input data 
            type: 'POST', //tells ajax to post the data to the url
            dataType: "json", //the standard data type for most ajax requests
            statusCode: { //the status code from the POST request
                0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
                //success2
                $('#success2').html("<div class='alert alert-success'>");
                $('#success2 > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                $('#success2 > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                $('#success2 > .alert-success')
                        .append('</div>');
                $('#contactForm').trigger("reset");
                }, 
                200: function(data) {//200 is a success2 code. it went through!
                //success2
                $('#success2').html("<div class='alert alert-success'>");
                $('#success2 > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                $('#success2 > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                $('#success2 > .alert-success')
                        .append('</div>');
                $('#contactForm').trigger("reset");
                },
                403: function(data) {//403 is when something went wrong and the submission didn't go through
                //error
                $('#success2').html("<div class='alert alert-danger'>");
                $('#success2 > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                $('#success2 > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                $('#success2 > .alert-danger').append('</div>');
                $('#contactForm').trigger("reset");
                }
            }  
            });
        });


$('#name').focus(function () {
    $('#success2').html('');
});
