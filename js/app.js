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

var filterCard = function(userList) {
    $('li').remove();
    $.each(userList.data, function(i, user) {
        $('ul').append("<li><i class=\"fa fa-square-o\"></i> " + this.username + "</li>");
    });
    followsLoaded = true;
};


$(document).ready(function() {
    
    var $auth = $('#authentication');
    var $filter = $('#filter');
    var $filterCard = $('#filter-card');
    var $following = $('#following');
    var $filterCardButton = $('#closeFilterCard');
    
    //When the page loads, create the user's follows list on the filter card.
    filterCard(igFollows);
    
    $($auth).on('click', function(e) {
        e.preventDefault();
        $($auth).css("display", "none");
        $($filter).css("display", "block");
        filterCard(igFollows);      
    });
    
    $($following).on('click', function(e) {
        e.preventDefault();
        $($filterCard).css("display", "block");
    });    
    
    $($filter).on('click', function(e) {
        e.preventDefault();
        $($filterCard).css("display", "none");
        displayFeed(igDataReal);
    });     
    
    $($filterCardButton).on('click', function(e) {
        e.preventDefault();
        $($filterCard).css("display", "none");
    });   
    
    // CLICKING ON A CHECKBOX

    $('ul').on('click', 'li', function() {
        $(this).toggleClass('checked'); 
        if ($(this).find('i').hasClass('fa fa-check-square-o')) {
            $(this).find('i').attr("class", "fa fa-square-o");
        } else {
            $(this).find('i').attr("class", "fa fa-check-square-o");
        }
    });
    
}); //Document ready closure


// When user clicks person icon
// Show the filter card
// Populated it with the following data
// Toggle favorite on/off when follower clicked
// Add favorite info to the follows object
//