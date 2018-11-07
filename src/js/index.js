
class getData{
    constructor (image, heading, description, abv, ibu, ph, tagline){
        this.image = image;
        this.heading = heading;
        this.description = description;
        this.abv = abv;
        this.ibu = ibu;
        this.ph = ph;
        this.tagline = tagline;
        }
    };
    
class ingredients{
     constructor (malt, hops, yeast){
        this.malt = malt;
        this.hops = hops;
        this.yeast = yeast;
        }
    };

$.ajax({
        url: "https://api.punkapi.com/v2/beers?page=1&per_page=6",
        method: 'GET',
        }).done(function(data) {
            let beers = []
        data.forEach(element => {
            beers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
            $('main').append('<div class="beer-item"><img src="'+element.image_url+'" ><h1>'+element.name+'</h1><p>'+element.description+'</p><section><ul><li>ABV</li><li><span>'+element.abv+'</span></li></ul><ul><li>IBU</li><li><span>'+element.ibu+'</span></li></ul><ul class="ph-color"><li>PH</li><li><span>'+element.ph+'</span></li></ul></section></div>');
        });
        $('.randomBeer').css('display', 'none')
        $('.pick-a-beer').css('display', 'none')
        })

// $.ajax({
//     url: "https://api.punkapi.com/v2/beers/random" ,
//     method: 'GET',
//     }).done(function(data) {
//         $('.randomBeer').empty();
//         let randomBeer = []
//         let flavour = []
//      data.forEach(element => {
//         randomBeer.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
//         $('.randomBeer').append('<div class="one-beer"><div><img src="'+element.image_url+'" ></div><div class="description"><h1>'+element.name+'</h1><h2>'+element.tagline+'</h2><p>'+element.description+'</p><section><ul><li>ABV</li><li><span>'+element.abv+'</span></li></ul><ul><li>IBU</li><li><span>'+element.ibu+'</span></li></ul><ul class="ph-color"><li>PH</li><li><span>'+element.ph+'</span></li></ul></section><button>INGREDIENTS</button></div></div><button>GIVE ME ANOTHER BEER</button>');
//         flavour.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
//     });
//     $('.randomBeer').css('display', 'none')
//             })
        
        
    $('body').on('click', '.page-number', function(){
        $('.page-number').removeClass("active");
        $(this).addClass("active");
        $('main').empty();
        getBeer();
        })
     
    $('body').on('click', '.next', function(){
        if($('.active').next().hasClass('page-number')){
            $('.active').removeClass('active').next().addClass('active');}
            $('main').empty();
            getBeer();
        })
     
     
    $('body').on('click', '.previous', function(){
        if($('.active').prev().hasClass('page-number')){
            $('.active').removeClass('active').prev().addClass('active');}
            $('main').empty();
            getBeer();
        })
                
function getBeer() {        
    var url = "https://api.punkapi.com/v2/beers"
    url += '?' + $.param({
    'page': $('.active').text(),
    'per_page': 6
    });

    
$.ajax({
    url: url,
    method: 'GET',
    }).done(function(data) {
        let beers = []
    data.forEach(element => {
        beers.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
        $('main').append('<div class="beer-item"><img src="'+element.image_url+'" ><h1>'+element.name+'</h1><p>'+element.description+'</p><section><ul><li>ABV</li><li><span>'+element.abv+'</span></li></ul><ul><li>IBU</li><li><span>'+element.ibu+'</span></li></ul><ul class="ph-color"><li>PH</li><li><span>'+element.ph+'</span></li></ul></section></div>');
    });
   console.log(beers);
    })
}

$.ajax({
    url: "https://api.punkapi.com/v2/beers/random" ,
    method: 'GET',
    }).done(function(data) {
        let randomBeer = []
        let flavour = []
    data.forEach(element => {
        randomBeer.push(new getData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
        $('.randomBeer').append('<div class="one-beer"><div><img src="'+element.image_url+'" ></div><div class="description"><h1>'+element.name+'</h1><h2>'+element.tagline+'</h2><p>'+element.description+'</p><section><ul><li>ABV</li><li><span>'+element.abv+'</span></li></ul><ul><li>IBU</li><li><span>'+element.ibu+'</span></li></ul><ul class="ph-color"><li>PH</li><li><span>'+element.ph+'</span></li></ul></section><button>INGREDIENTS</button></div></div><button>GIVE ME ANOTHER BEER</button>');
        flavour.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
    });

   console.log(randomBeer);
   console.log(flavour);
    })

$('#beerButton').on('click', function() {
    $('main').css('visibility', 'visible').css('display', 'grid');
    $('.randomBeer').css('display', 'none');
    $('.pick-a-beer').css('display', 'none');
   });

$('#quickFind').on('click', function() {
    $('.randomBeer').css('visibility', 'visible').css('display', 'grid');
    $('main').css('display', 'none');
    $('.pick-a-beer').css('display', 'none');
   });

$('#pickABeer').on('click', function() {
    $('.pick-a-beer').css('visibility', 'visible').css('display', 'grid');
    $('main').css('display', 'none');
    $('.randomBeer').css('display', 'none');
   });

