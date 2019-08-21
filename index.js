const http = require('http');
const request = require('request');
const client = require('cheerio-httpcli');
const puppeteer = require("puppeteer");

const server = http.createServer((request, response) => {

	var url = request.url;

	if(request.url == '/Get_Meta_Tag'){

      // var body = '';
      // request.on('data', function(data){
      //     body = body + data;
      // });
      // request.on('end', function(){
      //     var post = qs.parse(body);
      //     console.log(post);

      //     var URL = post.URL;

      //     Get_Meta_Tag(encodeURI(URL), function(err, data){ 
      //         response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
      //         response.end(JSON.stringify(data));
      //     });
      // });
      
      var URL = "https://smartstore.naver.com/rekoi?NaPm=ct%3Djzks11mq%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3D%7Chk%3Dd03b156022e9f7f193e23ca683c16a775c10e2b9";

      Get_Meta_Tag(encodeURI(URL), function(err, data){ 
          response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
          response.end(JSON.stringify(data));
      });

    
    }

    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.end("Hello Azure!!!!");
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);

async function Get_Meta_Tag(URL, callback){

  var param = {};
  client.fetch(URL, param, function(err, $, res, body){ 

    var protocol = res.request.uri.protocol;
    var host_name = res.request.uri.hostname;

    var site_url = "";
    var site_name = "";
    var site_icon = "";
    var site_description = "";

    var thumbnail = "";
    var title = "";

    var price = "";
    var sale_price = "";

    // if($( 'meta[property="og:site_name"]' ).attr( 'content' ) != undefined){
    //   site_name = $( 'meta[property="og:site_name"]' ).attr( 'content' );
    // }

    // if($( 'link[rel="shortcut icon"]' ).attr( 'href' ) != undefined){
    //   site_icon = host_name + $( 'link[rel="shortcut icon"]' ).attr( 'href' );
    // }else if($( 'link[rel="apple-touch-icon-precomposed"]' ).attr( 'href' ) != undefined){
    //   site_icon = host_name + $( 'link[rel="apple-touch-icon-precomposed"]' ).attr( 'href' );
    // }

    if(host_name.includes("smartstore.naver.com")){

      // if(host_name.includes("product")){

      //   thumbnail = $(".img_va img").attr('src');
      //   title = $(".prd_name strong").text();

      //   if($(".original span:nth-child(2)").length == 0){
      //     price = $(".info_cost span").text();
      //     sale_price = "";
      //   }else{
      //     price = $(".original span:nth-child(2)").text();
      //     sale_price = $(".original").next().text();
      //   }

      //   var url_arr = URL.split("/");
      //   for(var i = 0; i < url_arr.length; i++){
      //     if(url_arr[i].includes("smartstore.naver.com")){
      //       site_url = "smartstore.naver.com" + "/" + url_arr[i+1];

      //       Get_SmartStore_Meta_Tag(encodeURI(protocol + "//" + site_url), site_url, function(err, data, date2, data3){ 
      //         site_name = data;
      //         site_icon = date2;
      //         site_description = data3;

      //         var Response_Object = new Object();
      //         Response_Object.Response = "Success";
      //           Response_Object.host_name = site_url;
      //           Response_Object.site_name = site_name.trim();
      //           Response_Object.site_icon = site_icon;
      //           Response_Object.site_description = site_description.trim();
      //           Response_Object.thumbnail = thumbnail;
      //           Response_Object.title = title.trim();
      //           Response_Object.price = price.trim();
      //           Response_Object.sale_price = sale_price.trim();
                  
      //           return callback(null, Response_Object);
      //       });

      //     }
      //   }

      // }else{

      //   var url_arr = URL.split("/");
      //   for(var i = 0; i < url_arr.length; i++){
      //     if(url_arr[i].includes("smartstore.naver.com")){
      //       site_url = "smartstore.naver.com" + "/" + url_arr[i+1];

      //       Get_SmartStore_Meta_Tag(encodeURI(protocol + "//" + site_url), site_url, function(err, data, date2, data3){ 
      //         site_name = data;
      //         site_icon = date2;
      //         site_description = data3;

      //         var Response_Object = new Object();
      //         Response_Object.Response = "Success";
      //           Response_Object.host_name = site_url;
      //           Response_Object.site_name = site_name.trim();
      //           Response_Object.site_icon = site_icon;
      //           Response_Object.site_description = site_description.trim();
      //           Response_Object.thumbnail = site_icon;
      //           Response_Object.title = site_name.trim();
      //           Response_Object.price = "";
      //           Response_Object.sale_price = "";
                  
      //           return callback(null, Response_Object);
      //       });

      //     }
      //   }

      // }

      thumbnail = $(".img_va img").attr('src');
      title = $(".prd_name strong").text();

      if($(".original span:nth-child(2)").length == 0){
        price = $(".info_cost span").text();
        sale_price = "";
      }else{
        price = $(".original span:nth-child(2)").text();
        sale_price = $(".original").next().text();
      }

      var url_arr = URL.split("/");
      for(var i = 0; i < url_arr.length; i++){
        if(url_arr[i].includes("smartstore.naver.com")){
          site_url = "smartstore.naver.com" + "/" + url_arr[i+1];

          Get_SmartStore_Meta_Tag(encodeURI(protocol + "//" + site_url), site_url, function(err, data, date2, data3){ 
            site_name = data;
            site_icon = date2;
            site_description = data3;

            var Response_Object = new Object();
            Response_Object.Response = "Success";
              Response_Object.host_name = site_url;
              Response_Object.site_name = site_name.trim();
              Response_Object.site_icon = site_icon;
              Response_Object.site_description = site_description.trim();
              Response_Object.thumbnail = thumbnail;
              Response_Object.title = title.trim();
              Response_Object.price = price.trim();
              Response_Object.sale_price = sale_price.trim();
                
              return callback(null, Response_Object);
          });

        }
      }

    }else if(host_name.includes("brandi.co.kr")){

      (async() => {    
        // const browser = await puppeteer.launch();

        // const browser =await puppeteer.launch({
        //   headless: true,
        // });

        // const browser = await puppeteer.launch({
        //   ignoreDefaultArgs: ['--disable-extensions'],
        // });

        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();    

        // load - consider navigation to be finished when the load event is fired.
        // domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.
        // networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
        // networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.

        await page.goto( URL, { waitUntil : "networkidle0" } ); 
        await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });

        const arr_val = await page.evaluate(() => {
          const $ = window.$; //otherwise the transpiler will rename it and won't work

          var array = new Array();

          var thumbnail_val = $('#imageGallery li').attr('data-thumb');
          var title = $('.detail_title').text();
          var price_text = "";
          var discount = "";
          var price = "";
          var sale_price = "";

          if($('.detail_price span').length == 1){ // 할인가가 있으면
            price_text = $('.detail_price').text();
            discount = $('.detail_price b').text();
            price = $('.detail_price span').text();
            sale_price = price_text.replace(discount, "").replace(price, "").trim();
          }else{ // 할인가 없이 정상가격만 있으면
            price = $('.detail_price').text();
            sale_price = "";
          }

          var site_name = $('.store_title').text();
          var site_icon = $('.store_title img').attr('src');
          var site_description = $('.list_store_tag a').text();

          var brandi_url = $('.list_store_title a').attr('href');

          array.push(thumbnail_val);
          array.push(title);
          array.push(sale_price);
          array.push(price);

          array.push(site_name);
          array.push(site_icon);
          array.push(site_description);
          array.push(brandi_url);

          return array;
        });

        thumbnail = arr_val[0];
        title = arr_val[1];
        sale_price = arr_val[2];
        price = arr_val[3];
        site_name = arr_val[4];
        site_icon = arr_val[5];
        site_description = arr_val[6];
        var brandi_url = arr_val[7];

        // var bodyHTML = await page.evaluate(() => document.body.innerHTML);  
        // console.log(bodyHTML);  
        await browser.close();  

        var url_arr = URL.split("/");
        for(var i = 0; i < url_arr.length; i++){
          if(url_arr[i].includes("brandi.co.kr")){
            // site_url = "brandi.co.kr" + "/" + url_arr[i+1];

              var Response_Object = new Object();
              Response_Object.Response = "Success";
              Response_Object.host_name = host_name+brandi_url;
              Response_Object.site_name = site_name.trim();
              Response_Object.site_icon = site_icon;
              Response_Object.site_description = site_description.trim();
              Response_Object.thumbnail = thumbnail;
              Response_Object.title = title.trim();
              Response_Object.price = price.trim();
              Response_Object.sale_price = sale_price.trim();
                  
              return callback(null, Response_Object);

          }
        }

      })();

      

    }else if(host_name.includes("a-bly.com")){

      thumbnail = $(".upper-image img").attr('src');
      title = $("#top_goodsnm").text();
      sale_price = "";
      price = "";

      if($("#consumer_ys span").length == 1){
        sale_price = "";
        price = $("#consumer_ys:nth-child(1)").text();
      }else{
        var discount_text = $(".text--discount").text();
        sale_price = $("#consumer_ys:nth-child(1)").text().replace(discount_text, "");
        price = $("#consumer_ys:nth-child(2)").text();
      }

      var ably_param = $(".main-container.goods").children().eq(1).find('a').eq(0).attr('href');
      site_url = "a-bly.com" + ably_param;
      
      Get_Ably_Meta_Tag(encodeURI(protocol + "//" + site_url), site_url, function(err, data, date2, data3){ 
        site_name = data;
        site_icon = date2;
        site_description = data3;

        var Response_Object = new Object();
        Response_Object.Response = "Success";
        Response_Object.host_name = site_url;
        Response_Object.site_name = site_name.trim();
        Response_Object.site_icon = site_icon;
        Response_Object.site_description = site_description.trim();
        Response_Object.thumbnail = thumbnail;
        Response_Object.title = title.trim();
        Response_Object.price = price.trim();
        Response_Object.sale_price = sale_price.trim();
               
        return callback(null, Response_Object);
      });


    }else{

      // 홈페이지 URL
      if($( 'meta[property="og:url"]' ).attr( 'content' ) != undefined){

        if($( 'meta[property="og:url"]' ).length == 2){ // 비정상 http://www.ddaygirl.com/product/detail.html?product_no=4368&cate_no=1&display_group=3 이런데 드가보면 메타태그가 두개임 씨발.
          site_url = $( 'meta[property="og:url"]' ).eq(0).attr( 'content' );
        }else{
          site_url = $( 'meta[property="og:url"]' ).attr( 'content' ); // 얘가 정상
        }

      }else if($( 'meta[name="url"]' ).attr( 'content' ) != undefined){
        site_url = $( 'meta[name="url"]' ).attr( 'content' );
      }

      // 제품 썸네일 이미지
      if($( 'meta[property="og:image"]' ).attr( 'content' ) != undefined){

        if($( 'meta[property="og:image"]' ).length == 2){ // 비정상 http://www.ddaygirl.com/product/detail.html?product_no=4368&cate_no=1&display_group=3 이런데 드가보면 메타태그가 두개임 씨발.
          thumbnail = $( 'meta[property="og:image"]' ).eq(1).attr( 'content' );
        }else{
          thumbnail = $( 'meta[property="og:image"]' ).attr( 'content' ); // 얘가 정상
        }
        
      }else if($( 'meta[name="image"]' ).attr( 'content' ) != undefined){
        thumbnail = $( 'meta[name="image"]' ).attr( 'content' );
      }

      // 제품명
      if($( 'meta[property="og:title"]' ).attr( 'content' ) != undefined){

        if($( 'meta[property="og:title"]' ).length == 2){ // 비정상 http://www.ddaygirl.com/product/detail.html?product_no=4368&cate_no=1&display_group=3 이런데 드가보면 메타태그가 두개임 씨발.
          title = $( 'meta[property="og:title"]' ).eq(1).attr( 'content' );
        }else{
          title = $( 'meta[property="og:title"]' ).attr( 'content' ); // 얘가 정상
        }

      }else if($( 'meta[name="title"]' ).attr( 'content' ) != undefined){
        title = $( 'meta[name="title"]' ).attr( 'content' );
      }else if($( 'title' ).text() != undefined){
        title = $( 'title' ).text();
      }

      if($( 'meta[property="product:price:amount"]' ).attr( 'content' ) != undefined){
        price = $( 'meta[property="product:price:amount"]' ).attr( 'content' );
      }

      if($( 'meta[property="product:sale_price:amount"]' ).attr( 'content' ) != undefined){
        sale_price = $( 'meta[property="product:sale_price:amount"]' ).attr( 'content' );
      }

      Get_Mall_Meta_Tag(encodeURI(protocol + "//" + host_name), host_name, function(err, data, date2, data3){ 
        site_name = data;
        site_icon = date2;
        site_description = data3;

        var Response_Object = new Object();
        Response_Object.Response = "Success";
          Response_Object.host_name = host_name;
          Response_Object.site_name = site_name.trim();
          Response_Object.site_icon = site_icon;
          Response_Object.site_description = site_description.trim();
          Response_Object.thumbnail = thumbnail;
          Response_Object.title = title.trim();
          Response_Object.price = price.trim();
          Response_Object.sale_price = sale_price.trim();
            
          return callback(null, Response_Object);
      }); 

    }
  
  });

}

function Get_Mall_Meta_Tag(URL, host_name, callback){

  var param = {};
  client.fetch(URL, param, function(err, $, res, body){ 

    var site_name = "";
    var site_icon = "";
    var site_description = "";

    if($( 'meta[property="og:site_name"]' ).attr( 'content' ) != undefined){
      site_name = $( 'meta[property="og:site_name"]' ).attr( 'content' );
    }else if($( 'meta[name="site_name"]' ).attr( 'content' ) != undefined){
      site_name = $( 'meta[name="site_name"]' ).attr( 'content' );
    }else if($( 'meta[property="og:title"]' ).attr( 'content' ) != undefined){
      site_name = $( 'meta[property="og:title"]' ).attr( 'content' );
    }else if($( 'title' ).text() != undefined){
      site_name = $( 'title' ).text();
    }

    if($( 'link[rel="shortcut icon"]' ).attr( 'href' ) != undefined){
      site_icon = host_name + $( 'link[rel="shortcut icon"]' ).attr( 'href' );
    }else if($( 'link[rel="apple-touch-icon-precomposed"]' ).attr( 'href' ) != undefined){
      site_icon = host_name + $( 'link[rel="apple-touch-icon-precomposed"]' ).attr( 'href' );
    }

    if($( 'meta[property="og:description"]' ).attr( 'content' ) != undefined){
      site_description = $( 'meta[property="og:description"]' ).attr( 'content' );
    }else if($( 'meta[name="description"]' ).attr( 'content' ) != undefined){
      site_description = $( 'meta[name="description"]' ).attr( 'content' );
    }
          
    return callback(null, site_name, site_icon, site_description);
  
  });

}

function Get_SmartStore_Meta_Tag(URL, host_name, callback){

  var param = {};
  client.fetch(URL, param, function(err, $, res, body){ 

    var site_name = $( 'title' ).text();
    var site_icon = "";
    var site_description = $( 'meta[name="description"]' ).attr( 'content' );

    if($( 'meta[property="og:image"]' ).length == 0){
      site_icon = "https://img-shop.pstatic.net/front/naver_favicon.ico?1";
    }else{
      site_icon = $( 'meta[property="og:image"]' ).attr( 'content' );
    }
          
    return callback(null, site_name, site_icon, site_description);
  
  });

}

function Get_Ably_Meta_Tag(URL, host_name, callback){

  var param = {};
  client.fetch(URL, param, function(err, $, res, body){ 

    var site_name = $( 'meta[property="og:title"]' ).attr( 'content' );
    var site_icon = $( 'meta[property="og:image"]' ).attr( 'content' );
    var site_description = $( 'meta[property="og:description"]' ).attr( 'content' );
          
    return callback(null, site_name, site_icon, site_description);
  
  });

}