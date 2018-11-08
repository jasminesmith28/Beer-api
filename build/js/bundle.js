(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getData = function getData(image, heading, description, abv, ibu, ph, tagline) {
    _classCallCheck(this, getData);

    this.image = image;
    this.heading = heading;
    this.description = description;
    this.abv = abv;
    this.ibu = ibu;
    this.ph = ph;
    this.tagline = tagline;
};

exports.default = getData;
;

},{}],2:[function(require,module,exports){
"use strict";

var _getData = require("./getData.js");

var _getData2 = _interopRequireDefault(_getData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ingredients = function ingredients(malt, hops, yeast) {
    _classCallCheck(this, ingredients);

    this.malt = malt;
    this.hops = hops;
    this.yeast = yeast;
};

;

$.ajax({
    url: "https://api.punkapi.com/v2/beers?page=1&per_page=6",
    method: 'GET'
}).done(function (data) {
    var beers = [];
    data.forEach(function (element) {
        beers.push(new _getData2.default(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
        $('main').append('<div class="beer-item"><img src="' + element.image_url + '" ><h1>' + element.name + '</h1><p>' + element.description + '</p><section><ul><li>ABV</li><li><span>' + element.abv + '</span></li></ul><ul><li>IBU</li><li><span>' + element.ibu + '</span></li></ul><ul class="ph-color"><li>PH</li><li><span>' + element.ph + '</span></li></ul></section></div>');
    });
    $('.randomBeer').css('display', 'none');
    $('.pick-a-beer').css('display', 'none');
    $('.modal').css('display', 'none');
    $('.cover').css('display', 'none');
});

$('body').on('click', '.page-number', function () {
    $('.page-number').removeClass("active");
    $(this).addClass("active");
    $('main').empty();
    getBeer();
});

$('body').on('click', '.next', function () {
    if ($('.active').next().hasClass('page-number')) {
        $('.active').removeClass('active').next().addClass('active');
    }
    $('main').empty();
    getBeer();
});

$('body').on('click', '.previous', function () {
    if ($('.active').prev().hasClass('page-number')) {
        $('.active').removeClass('active').prev().addClass('active');
    }
    $('main').empty();
    getBeer();
});

function getBeer() {
    var url = "https://api.punkapi.com/v2/beers";
    url += '?' + $.param({
        'page': $('.active').text(),
        'per_page': 6
    });

    $.ajax({
        url: url,
        method: 'GET'
    }).done(function (data) {
        var beers = [];
        data.forEach(function (element) {
            beers.push(new _getData2.default(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
            $('main').append('<div class="beer-item"><img src="' + element.image_url + '" ><h1>' + element.name + '</h1><p>' + element.description + '</p><section><ul><li>ABV</li><li><span>' + element.abv + '</span></li></ul><ul><li>IBU</li><li><span>' + element.ibu + '</span></li></ul><ul class="ph-color"><li>PH</li><li><span>' + element.ph + '</span></li></ul></section></div>');
        });
        console.log(beers);
    });
}

$('body').on('click', '#newBeer', function () {
    $.ajax({
        url: "https://api.punkapi.com/v2/beers/random",
        method: 'GET'
    }).done(function (data) {
        $('.randomBeer').empty();
        var randomBeer = [];
        var flavour = [];
        data.forEach(function (element) {
            randomBeer.push(new _getData2.default(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
            $('.randomBeer').append('<div class="one-beer"><div><img src="' + element.image_url + '" ></div><div class="description"><h1>' + element.name + '</h1><h2>' + element.tagline + '</h2><p>' + element.description + '</p><section><ul><li>ABV</li><li><span>' + element.abv + '</span></li></ul><ul><li>IBU</li><li><span>' + element.ibu + '</span></li></ul><ul class="ph-color"><li>PH</li><li><span>' + element.ph + '</span></li></ul></section><button id="i">INGREDIENTS</button></div></div><button id="newBeer" >GIVE ME ANOTHER BEER</button>');
            flavour.push(new ingredients(element.ingredients.malt[0].name, element.ingredients.hops[0].name, element.ingredients.yeast));
            $('.modal').append('<div><h1>INGREDIENTS</h1><i id="close" class="fa fa-close"></i></div><ul><li><span>Malt:</span></li><li>' + element.ingredients.malt[0].name + '</li></ul><ul><li><span>Hops:</span></li><li>' + element.ingredients.hops[0].name + '</li></ul><ul><li><span>Yeast:</span></li><li>' + element.ingredients.yeast + '</li></ul>');
        });

        console.log(randomBeer);
        console.log(flavour);
    });
});

$.ajax({
    url: "https://api.punkapi.com/v2/beers/random",
    method: 'GET'
}).done(function (data) {
    var randomBeer = [];
    var flavour = [];
    data.forEach(function (element) {
        randomBeer.push(new _getData2.default(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
        $('.randomBeer').append('<div class="one-beer"><div><img src="' + element.image_url + '" ></div><div class="description"><h1>' + element.name + '</h1><h2>' + element.tagline + '</h2><p>' + element.description + '</p><section><ul><li>ABV</li><li><span>' + element.abv + '</span></li></ul><ul><li>IBU</li><li><span>' + element.ibu + '</span></li></ul><ul class="ph-color"><li>PH</li><li><span>' + element.ph + '</span></li></ul></section><button id="i" >INGREDIENTS</button></div></div><button id="newBeer" >GIVE ME ANOTHER BEER</button>');
        flavour.push(new ingredients(element.ingredients.malt[0].name, element.ingredients.hops[0].name, element.ingredients.yeast));
        $('.modal').append('<div><h1>INGREDIENTS</h1><i id="close" class="fa fa-close"></i></div><ul><li><span>Malt:</span></li><li>' + element.ingredients.malt[0].name + '</li></ul><ul><li><span>Hops:</span></li><li>' + element.ingredients.hops[0].name + '</li></ul><ul><li><span>Yeast:</span></li><li>' + element.ingredients.yeast + '</li></ul>');
    });

    console.log(randomBeer);
    console.log(flavour);
});

$('#beerButton').on('click', function () {
    $('main').css('visibility', 'visible').css('display', 'grid');
    $('.randomBeer').css('display', 'none');
    $('.pick-a-beer').css('display', 'none');
    $('footer').css('display', 'grid');
    $('.modal').css('display', 'none');
});

$('#quickFind').on('click', function () {
    $('.randomBeer').css('visibility', 'visible').css('display', 'grid');
    $('main').css('display', 'none');
    $('.pick-a-beer').css('display', 'none');
    $('.modal').css('display', 'none');
    $('footer').css('display', 'none');
});

$('#pickABeer').on('click', function () {
    $('.pick-a-beer').css('visibility', 'visible').css('display', 'grid');
    $('main').css('display', 'none');
    $('.randomBeer').css('display', 'none');
    $('.modal').css('display', 'none');
    $('footer').css('display', 'none');
});

$('body').on('click', '#i', function () {
    $('.modal').css('display', 'grid');
    $('.cover').css('display', 'grid');
});

$('body').on('click', '#close', function () {
    $('.modal').css('display', 'none');
    $('.cover').css('display', 'none');
});

},{"./getData.js":1}]},{},[2]);
