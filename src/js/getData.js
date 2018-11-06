
class getData{
constructor (image, heading, description, abv, ibu, ph){
  var url = "https://api.punkapi.com/v2/beers?page="+$('.active').val+"&per_page=6";
    this.image = image;
    this.heading = heading;
    this.description = description;
    this.abv = abv;
    this.ibu = ibu;
    this.ph = ph;

$.ajax({
    method: 'GET',
    url: url,
    }).done(function(data) {
        image = data.image_url;
        heading = data.name; 
        description = data.description;
        abv = data.abv;
        ibu = data.ibu;
        ph = data.ph;
        })
    }

    getDataStats() {
        return ` ${this.image}`
      }  
}

console.log(getData.getDataStats());

$('body').on('click', '.page-number', function(){
    $('.page-number').removeClass("active");
    $(this).addClass("active");
    })
 
$('body').on('click', '.next', function(){
    if($('.active').next().hasClass('page-number')){
        $('.active').removeClass('active').next().addClass('active');}
    })
 
 
$('body').on('click', '.previous', function(){
    if($('.active').prev().hasClass('page-number')){
        $('.active').removeClass('active').prev().addClass('active');}
    })



