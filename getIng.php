
<html>
    <head>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/stylesheet.css"/>
        <link href='https://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Poiret+One' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Bangers' rel='stylesheet' type='text/css'>
        <meta name="viewport" content="width=device-width, initial scale=1">
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js"></script>
        <title>Cooked Up!</title>
    </head>   
      <body class="container-fluid">
      
        <div id="topDiv">          
        </div>
        <div id="secondDiv">
        </div
        <br>
        <br>
        <div class="jumbotron" style="background-color:transparent" >
          <h1 class="text-center" style="font-family:https://www.google.com/fonts#QuickUsePlace:quickUse/Family:Open+Sans:400,300">LET'S COOK</h1>
          <h3 class="text-center">WHAT HAVE YOU GOT?</h3>
        </div>
        <div id="scroll">
            <img id="inside" src="img/smiley.png" style="height:300px;width:300px;left:150px" onmouseover="flip()" onmouseout="back()"/>
        </div>
        <br><br>
        <div ><a href="#ing"><img  src="img/menu_down_arrow.png" height="150px" width="150px" class="img-responsive center-block" /></a></div>
        <br>
        <div class="jumbotron text-center" style="margin:auto;background-color:transparent !important" id="showIng">
             <div id="whitelist" >
             </div>
            <br>
            <div id="blacklist" >
             </div>
        </div>
          <div class="row" id="letscook">
          <div class="form-group">
            <div class="row col-lg-4 col-lg-offset-4">
              <p for="insID" class="control-label center" style="text-align:center;font-size:22px;margin:auto">Enter an ingredient</p>
            </div>
            <div class="row col-lg-offset-4 col-lg-4" id="ingredientList">
              <input type="text" class="form-control input-lg center" name="white" id="ing" placeholder="Enter an ingredient" style="font-size:20px;margin:auto" height="55px" />
             <div class="select" id="ingredientSelect" style="display:none"></div>
            </div>
          </div>
              
          </div>
            
          <br/>
            
          <div class="row">
          <div class="form-group col-xs-2 col-xs-offset-5">
            <button class="btn btn-success btn-block btn-lg responsive-width" onclick="addWhiteList()">Use this</button>
            <button class="btn btn-danger btn-block btn-lg responsive-width" onclick="addBlackList()">But not this</button>
            <br>
            <br>
        <form action="searchingre2.php" method="get">
            <input type="hidden" name="white_list" id="white_list">
            <input type="hidden" name="black_list" id="black_list">
            <button id="gobutton" class="btn btn-default btn-block btn-lg responsive-width" style="background-color:transparent"type="submit" ><b>LET'S COOK</b></button>
         </form>
              
              
          </div>
          </div>
        <br>
        <br>
        
        <style type="text/css">
        .responsive-width {
            font-size: 1.5vw;
            margin: auto;
        }
        body{
   
         // font-family: 'Poiret One', cursive;
          font-family: 'Bangers', cursive;
        }
        </style>
        <script>
            
             var wlarray = "";
             var blarray = "";
             $(document).ready(function(){ $('html, body').animate({ scrollTop: $("#letscook").offset().top + $("#letscook").height()/2 - $(window).height()/2 }, 2000); });
            
             
        
            function flip()
            {
                document.getElementById("inside").src="img/wink.png";
            }
            function back()
            {
                document.getElementById("inside").src="img/smiley.png";
            }
            
            function addWhiteList()
            {
                
                var wl = $("#ing").val();
                if(wl!="")
                {
                    
                    $("#whitelist").append("<button class='btn btn-success addedIngredient' onclick='removeIngredient(this)'>"+wl+"  "+ "<span class='glyphicon glyphicon-remove'></span></button><span> </span>");
             
                document.getElementById("ing").value="";
                wlarray = wlarray + "," + wl;
                
                document.getElementById("white_list").value=wlarray;
                }
            }
            
            function addBlackList()
            {
                var bl = $("#ing").val();
                if(bl!="")
                {
                $("#blacklist").append("<button class='btn btn-danger' onclick='removeIngredient(this)'>"+bl+"  "+"<span class='glyphicon glyphicon-remove'></span></button><span>  </span>");
                document.getElementById("ing").value="";
                blarray = blarray + "," + bl;
                 document.getElementById("black_list").value=blarray;
                }
            }
   

            function removeIngredient(item)
            {
              $(item).remove();
            }


            $("#ing").keyup(function(){
                
                if($("#ing").val()=="")
                  $("#ingredientSelect").fadeOut(200);
                
                else{

                  $("#ingredientSelect").fadeIn(200);
                  getRecipes(); 
                }
              
            });

            function getRecipes(){
              var title=$("#ing").val();

              $.ajax({
                type: "POST",
                url: "php/search.php",
                async : "true",
                data: { 'title' : title },
                dataType : 'json',
                success: function(result) {
                    $("#ingredientSelect").empty();
                     $.each(result, function(index, element) {
                     
                      $("#ingredientSelect").append("<button onclick='confirmIngredient(this)' class='btn ingreComplete btn-block' id='"+element.ingre+"' value='"+element.ingre+"'>"+element.ingre+"</button>");
                    });
                    $("#res").fadeIn(500);
                    $(".course").fadeIn(500);
                  }
               });
            }
            
            function confirmIngredient(item){
              $("#ing").val($(item).val()) ;
              $("#ingredientSelect").empty();
            }
        </script>
                
        <style>
            body{
                background-color:#8B7765;
            } 
           
        </style>    
    </body>
</html>