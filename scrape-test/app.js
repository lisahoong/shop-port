var express = require('express');
var app = express();
var path = require('path');
var exphbs = require('express-handlebars');
var scraperjs = require('scraperjs');
var request = require('request');
var cheerio = require('cheerio');

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


if (! process.env.REDIS_URL) {
  console.error('Missing environment variable: REDIS_URL');
  process.exit(1);
}

var redis = require('redis');
var redisClient = redis.createClient(process.env.REDIS_URL);


var router = new scraperjs.Router();
var urls = ["rings","pendants","earrings","bracelets"]

if(!urls || !urls.length) {
	console.log("nooooo");
	return;
}


   redisClient.on("error", function(err){
     console.log("Error"+err);
   })

   redisClient.flushall(function(err, replies){
     console.log("asadsad"+replies);
   });
   var infos = [];


router.on('https?://mejuri.com/shop/t/type/:id')
.createStatic()
    .scrape(function($) {
      return $('[data-hook=products_list_item]').map(function() {
        // return {name:$(this).first().text().trim(), colors: $(this).children().next().text().trim(), price: $(this).children().next().next().text().trim()}
				return({
					name:$(this).children('.product-info').children(".product-name").text().trim(),
					colors:$(this).children('.product-info').children(".product-details").text().trim(),
					price:$(this).children('.product-info').children(".product-price").text().trim().split("\n")[0],
					link:"http://www.mejuri.com"+ $(this).children('.product-image').attr('href'),
					img:"http:" + $(this).children('.product-image').children('.main-image').attr('src')
			})
      }).get();

    })
    .then(function(links,utils) {
      var category = utils.params.id;

      for(var i=0; i <links.length;i++){
        redisClient.hmset(category+""+i, links[i], function(err, found){
          if(err){
            console.log("hmset err is "+ err);
          }
          else{
            console.log("hmset succeeded"+ found);}
        })

      }



    });

    for (var i=0; i<urls.length;i++){
      router.route("https://mejuri.com/shop/t/type/"+urls[i], function(err, yes){
        if(err){
          console.log("error is "+ err);
        }else{
        console.log("done")};
      })
    }




app.listen(3000);
