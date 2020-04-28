$(document).ready(function(){
   $("#search-bar").keypress(function(e){
     var key = e.which;
     if(key == 13)  // the enter key code
      {
         searchQuery();   
      }
   });
  
  function searchQuery(){
    var queryText=$("#search").val();
    var getArticle="";
    var apiUrl="https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json";
    $.getJSON(apiUrl,function(data){
      if(data){
      getArticle=json.stringify(data);
      }else{
        getArticle="error in retriving data";
      }
    });
   $("#search-bar").html(getArticle);
  }
                    
 });