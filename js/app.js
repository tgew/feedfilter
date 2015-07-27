// sample_data.js defines var called igDataReal that is a sample object returned by Instagram
var filtered = false;

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
    //Clear the current feed
    $('.results').remove();
    
    //Iterate through all the pictures
    $.each(data.data, function(i, item) {
        var picture = displayItem(this);
        //If filtering is selected, show only pictures of favorites.
        if (filtered) {
            if (this.favorite) {
                $('.results').append(picture);
            }
        } else {
            //Otherwise, show all the pictures in the feed.
            $('.results').append(picture);
        }
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
    
    var $authButton = $('#authentication > button');
    var $auth = $('.modal');
    var $filter = $('#filter');
    var $filterCard = $('#filter-card');
    var $following = $('#following');
    var $showFeedButton = $('#showFeed');
    var $list = $('ul');
    
    //When the page loads, create the user's follows list on the filter card.
    filterCard(igFollows);
    
    $($authButton).on('click', function(e) {
        e.preventDefault();
        $($auth).css("display", "none");
        $($filterCard).css("display", "block");
        filterCard(igFollows);      
    });
    
    $($following).on('click', function(e) {
        e.preventDefault();
        var displayed = $($filterCard).css("display");
        if (displayed == "none") {
            $($filterCard).css("display", "block");
        } else {
            $($filterCard).css("display", "none");
        }
    });    
    
    $($filter).on('click', function(e) {
        e.preventDefault();
        filtered = !filtered;
        $($filterCard).css("display", "none");
        displayFeed(igDataReal);
    });     
    
    $($showFeedButton).on('click', function(e) {
        e.preventDefault();
        $($filterCard).css("display", "none");
        displayFeed(igDataReal);
    });   
    
    // CLICKING ON A CHECKBOX

    $($list).on('click', 'li', function() {
        var i = $(this).index();
        
        //Toggle the checked class of the li
        $(this).toggleClass('checked'); 
        
        //If the check box is checked...
        if ($(this).find('i').hasClass('fa fa-check-square-o')) {
            //uncheck it
            $(this).find('i').attr("class", "fa fa-square-o");
            igFollows.data[i].favorite = false;
        //Otherwise, check it.
        } else {
            $(this).find('i').attr("class", "fa fa-check-square-o");
            igFollows.data[i].favorite = true;
        }
    });
    
}); //Document ready closure


// When user clicks person icon
// Show the filter card
// Populated it with the following data
// Toggle favorite on/off when follower clicked
// Add favorite info to the follows object
//