// sample_data.js defines var called igDataReal that is a sample object returned by Instagram


var displayItem = function(item) {
    var result = $('.templates .image-container').clone();

    var imageUser = result.find('.image-user');
    imageUser.text(item.user.username);
    
    var imageAge = result.find('.image-age');
    imageAge.text("Boy I'm Old");
    
    var imageCaption = result.find('.image-caption');
    imageCaption.text(item.caption.text);
    
    var image = result.find('.image');
    image.html("<img src=\"" + item.images.standard_resolution.url + "\" alt=\"Instagram Picture\">");
    
    return result;
};

var displayFeed = function(data) {
    $.each(data.data, function(i, item) {
        var picture = displayItem(this);
        $('.results').append(picture);
    });
};


$(document).ready(function() {
    var $auth = $('.authentication');
    var $filter = $('#filter');
    $('button').on('click', function(e) {
        e.preventDefault();
        $($auth).css("display", "none");
        displayFeed(igDataReal);
    });
    $($filter).on('click', function(e) {
        e.preventDefault();
        alert("Got it");
    });    
}); //Document ready closure
