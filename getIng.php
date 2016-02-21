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
        <div class="jumbotron" >
          <h1 class="text-center">LET'S COOK</h1>
          <h3 class="text-center">WHAT HAVE YOU GOT?</h3>
        </div>
        <div id="scroll">
            <img id="inside" src="img/smiley.png" style="height:300px;width:300px;left:150px" onmouseover="flip()" onmouseout="back()"/>
        </div>
        <div id="lastDiv"  ></div>
        </body>
    <script>
        function flip()
        {
            document.getElementById("inside").src="img/wink.png";
        }
        function back()
        {
            document.getElementById("inside").src="img/smiley.png";
        }
    </script>
        
        
        <br/>
        <br/>
        <form class="form" action="displayDetails.php" method="POST" >
          <div class="row">
          <div class="form-group">
            <label for="insID" class="col-xs-1 col-xs-offset-3 control-label" style="text-align:right;font-size:16px;">Enter ingredient</label>
            <div class="col-xs-4">
              <input type="text" class="form-control" name="insID" id="insID" placeholder="Ingredient"/>
            </div>
          </div>
          </div>
          <br/>
    
          <div class="row">
          <div class="form-group col-xs-2 col-xs-offset-5">
            <button type="submit" class="btn btn-success btn-block">Use this</button>
            <button type="submit" class="btn btn-danger btn-block">Don't use this</button>
          </div>
          </div>
        </form>
            <!--<script>
             $(document).ready(function(){ $('html, body').animate({ scrollTop: $("#letscook").offset().top + $("#letscook").height()/2 - $(window).height()/2 }, 2000); });

        </script>-->
                

    </body>
</html>