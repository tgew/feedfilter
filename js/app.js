// sample_data.js defines var called igData that is a sample object returned by Instagram
//var igData = {
//    caption: "My big baby",
//    username: "tgew",
//    image: "https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/s640x640/e35/sh0.08/1689111_688551287946112_336787105_n.jpg"
//};

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
    $('#header-title').on('click', function(e) {
        e.preventDefault();
        displayFeed(igDataReal);
    });
}); //Document ready closure
