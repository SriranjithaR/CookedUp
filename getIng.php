
<html>
    <head>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/stylesheet.css"/>
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
        <div class="jumbotron" style="margin-left:500px;background-color:transparent !important" id="showIng">
             <div id="whitelist">
             </div>
            <br>
            <div id="blacklist">
             </div>
        </div>
          <div class="row" id="letscook">
          <div class="form-group">
            <div for="insID" class="col-xs-1 col-xs-offset-3 control-label block" style="text-align:center;font-size:22px;">Enter an ingredient</div>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" name="white" id="ing" placeholder="Enter an ingredient" style="font-size:20px;" height="55px" />
            </div>
          </div>
              
          </div>
            
          <br/>
            
          <div class="row">
          <div class="form-group col-xs-2 col-xs-offset-5">
            <button class="btn btn-success btn-block btn-lg" onclick="addWhiteList()">Use this</button>
            <button class="btn btn-danger btn-block btn-lg" onclick="addBlackList()">Don't use this</button>
            <br>
            <br>
        <form action="searchingre.php" method="get">
            <input type="hidden" name="white_list" id="white_list">
            <input type="hidden" name="black_list" id="black_list">
            <button id="gobutton" class="btn btn-default btn-block btn-lg" style="background-color:transparent"type="submit" ><b>LET'S COOK</b></button>
         </form>
              
              
          </div>
          </div>
        <br>
        <br>
        <br>
        
      
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
                    
                    $("#whitelist").append("<button class='btn btn-success'>"+wl+"</button><span>  </span>");
             
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
                $("#blacklist").append("<button class='btn btn-danger'>"+bl+"</button><span>  </span>");
                document.getElementById("ing").value="";
                blarray = blarray + "," + bl;
                 document.getElementById("black_list").value=blarray;
                }
            }
   
        </script>
                
        <style>
            body{
                background-color:#8B7765;
            } 
           
        </style>    
    </body>
</html>