var statusMessage = document.getElementById("msg");
    
$(document).ready(function () {

    var $form = $('form');

    if ($form.length > 0) {
        $('form input[type="submit"]').bind('click', function (event) {
            if (event) event.preventDefault();

            if (validateEmail($('#mce-EMAIL').val())) {
                register($form);
            } else {
                statusMessage.style.color = 'pink';
                statusMessage.innerHTML = "Please enter a valid email address.";
            }
        });
    }
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function register($form) {
    var data = {};
    $form.serializeArray().map(function(x){data[x.name] = x.value;}); 
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        error: function (err) {
            console.error("Could not connect to the registration server. Please try again later.");
        },
        success: function (data) {
            if (!data.ok) {
                statusMessage.innerHTML = "There was an error. You may have already signed up!";
                statusMessage.style.color = 'pink';
            } else {
                document.getElementById('mce-EMAIL').style.display = 'none';
                document.getElementById('mc-embedded-subscribe').style.display = 'none';
                statusMessage.innerHTML = "Success! You will be notified when applications open."
                statusMessage.style.color = '#5bc0de';
            }
        }
    });
}