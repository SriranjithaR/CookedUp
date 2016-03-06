<!DOCTYPE html>
<!--http://www.webgeekly.com/tutorials/javascript-tutorials/how-to-add-a-google-map-with-marker-to-your-website/ -->
<html>
    <head>
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
        <script type="text/javascript">
            function initialize(){
                /* My house */
                var position = new google.maps.LatLng(13.037226,80.196116);
            
                var myOptions = {
                  zoom : 7,
                  center : position,
                  mapTypeId : google.maps.MapTypeId.ROADMAP
                };
            
          
            
            var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
                
            var marker = new google.maps.Marker({
                position : position,
                map : map,
                title : "Go Here"
                
            });
                
            var contentString = "Welcome!";
            var infoWindow = new google.maps.InfoWindow({
                content : contentString 
            });
                
            /* Vimala  */
            var position2 = new google.maps.LatLng(13.034520, 80.215183);
                
            var marker2 = new google.maps.Marker({
                position : position2,
                map : map,
                title : "Found here"
                
            });
            var contentString2 = "Vimala";
            var infoWindow2 = new google.maps.InfoWindow({
                content : contentString2 
            });
                google.maps.event.addListener(marker2,'click',function(){
                    infoWindow2.open(map,marker2);
            });
            
             
            /*Brown Tree*/
             var position3 = new google.maps.LatLng(13.041132, 80.216629);
                
            var marker3 = new google.maps.Marker({
                position : position3,
                map : map,
                title : "Found here"
                
            });
            var contentString3 = "";
            var infoWindow3 = new google.maps.InfoWindow({
                content : contentString3
            });
                google.maps.event.addListener(marker3,'click',function(){
                    infoWindow3.open(map,marker3);
            });
                /*Rouche*/
             var position4 = new google.maps.LatLng(13.040932, 80.199229);
					
            var marker4 = new google.maps.Marker({
                position : position4,
                map : map,
                title : "Found here"
                
            });
            var contentString4 = "Rouche";
            var infoWindow4 = new google.maps.InfoWindow({
                content : contentString4
            });
                google.maps.event.addListener(marker4,'click',function(){
                    infoWindow4.open(map,marker4);
            });
        }
        
        </script>
    </head>

    <body onload="initialize()">
        <center>
        <div id="map-canvas" style="width:1500px; height:700px">
        
        </div>
    </center>
    </body>
</html>