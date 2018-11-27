import{njs,tmdb,img,v3tv,v3key,backdrop}from"../js/serverDetails.js";var qs=new URL(document.location).searchParams,_id=qs.get("_id");function convert_date(e){var a=Number(e.substring(0,4)),o=Number(e.substring(5,7)),t=Number(e.substring(8,11)),s=new Date(a,o-1,t).toString().split(" ");return s[0]+" "+s[2]+" "+s[1]+" , "+s[3]}function get_date(e){for(var a=0;a<e.length;a++)if("IN"===e[a].iso_3166_1||"US"==e[a].iso_3166_1)return e[a].release_dates[0].release_date}console.log(_id);const formatter=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2});$(document).ready(()=>{($("#clear-text").click(()=>{$(".new-comment").val("")}),$("#submit-comment").click(()=>{var e=$(".new-comment").val();$(".new-comment").val(""),$(".new").hide(),$(".comments").append("<div class='col-12 col-lg-10 card comment-container'><div class='container-fluid' style='padding: 0'><div class='col-12'><span><img src='./images/user.png' alt='user' class='avatar'></span><h5>You </h5></div><div class='col-12 comment'><p>"+e+"</p></div></div></div>")}),null!=_id)&&(console.log(njs+"toptv/"+_id),$.getJSON(njs+"toptv/"+_id).done(e=>{console.log(e),$(".jumbotron").css({"background-image":"url("+backdrop+e.backdrop_path+")"}),$(".poster").attr("src",img+e.poster_path),$(".movieName").append(e.name),$(".mov-year").append(" ("+e.first_air_date.split("-")[0]+")"),$(".release").append(convert_date(e.first_air_date)),$(".star-rating h4").append(e.vote_average),$(".overview").append(e.overview);$(".ol").append({en:"English",hn:"Hindi"}[e.original_language]),$.getJSON(v3tv+e.id+"?api_key="+v3key).done(e=>{if(console.log("Details",e),""!=e.last_episode_to_air&&$(".last-air").append("<h5>Last Episode Aired</h5><p>S"+("0"+e.last_episode_to_air.season_number).slice(-2)+"E"+("0"+e.last_episode_to_air.episode_number).slice(-2)+" <br>"+e.last_episode_to_air.name+" <br>"+convert_date(e.last_episode_to_air.air_date)+"</p>"),""!=e.next_episode_to_air&&$(".next-air").append("<h5>Next Episode</h5><p>S"+("0"+e.next_episode_to_air.season_number).slice(-2)+"E"+("0"+e.next_episode_to_air.episode_number).slice(-2)+" <br>"+e.next_episode_to_air.name+" <br>"+convert_date(e.next_episode_to_air.air_date)+"</p><br>"),e.networks.length>0&&($(".network").append("<h5>Network</h5>"+e.networks[0].name),$(".network").css("margin-bottom","40px")),e.genres.length>0){$(".genre").append("<h5>Genres</h5>");for(var a=0;a<e.genres.length;a++)a>0&&$(".genre").append(", "),$(".genre").append(e.genres[a].name+" ");$(".genre").css("margin-bottom","40px")}});$.getJSON(v3tv+e.id+"/recommendations?api_key="+v3key).done(e=>{$.each(e.results,(e,a)=>{e<8&&$(".rec").append("<div class ='rec-movie'><img class='rec-img' src='"+img+a.backdrop_path+"'><div class='rec-text' style='overflow:hidden'><b>"+a.name.slice(0,22)+"</b></div></div>")})}),$.getJSON(njs+"toptv/"+e._id+"/comments").done(e=>{$.each(e,(e,a)=>{$(".comments").append("<div class='col-12 col-lg-10 card comment-container'><div class='container-fluid' style='padding: 0'><div class='col-12'><span><img src='./images/user.png' alt='user' class='avatar'></span><h5>"+a.author+"</h5></div><div class='col-12 comment'><p>"+a.comment+"</p></div></div></div>")})});$.ajax({url:v3tv+e.id+"/credits?api_key="+v3key,type:"GET"}).done(e=>{$.each(e.cast,(e,a)=>{e<6&&$(".cast").append("<div class='col-6 col-sm-4 col-xl-2' style='padding:20px 60px 20px 0px;'><div class='card' style='box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-radius: 0%;height:350px;width:150px;'><div class='card-img-top' style='min-width: 100%;max-height: 100%'><img class='img-fluid' src='"+img+a.profile_path+"'></div><div class='card-content' style='padding:4px'><div class='card-title'><h4>"+a.name+"</h4></div><p style='color:dimgrey;bottom:0;position:absolute'>"+a.character.split("/")[0]+"</p></div></div></div>")});var a=0,o=0,t=0;$.each(e.crew,(e,s)=>{"Executive Producer"===s.job&&(0==a&&$(".director").append("<h5>Exceutive Producer</h5>"),0!==a&&a<2&&$(".director").append(", "),a<2&&$(".director").append(s.name," "),a=Number(a)+1),"Producer"===s.job&&(0==o&&$(".producer").append("<h5>Producer</h5>"),0!==o&&o<2&&$(".producer").append(", "),o<2&&$(".producer").append(s.name," "),o=Number(o)+1),"Original Music Composer"===s.job&&(0==t&&$(".music").append("<h5>Original Music</h5>"),0!==t&&$(".music").append(", "),$(".music").append(s.name," "),t=Number(t)+1)})})}))}),null==localStorage.getItem("token")?($(".authenticated").hide(),$("#loginButton").on("click",()=>{var e=$('[name="uname"]').val(),a=$('[name="password"]').val();console.log(JSON.stringify({username:e,password:a})),""!=e&&""!=a?$.ajax({type:"POST",dataType:"json",contentType:"application/json;charset=utf-8",url:njs+"users/login",data:JSON.stringify({username:e,password:a}),success:e=>{console.log(e),1==e.success&&($("#loginModal").modal("toggle"),$(".auth").hide(),$(".authenticated").show(),localStorage.setItem("token",e.token),location.reload())},error:e=>{alert("Invalid Credentials"),console.log(e)}}):alert("Enter valid data")}),$("#signup").on("click",()=>{var e=$('[name="name"]').val(),a=$('[name="email"]').val(),o=$('[name="runame"]').val(),t=$('[name="rpassword"]').val();$('[name="password2"]').val();console.log(JSON.stringify({name:e,email:a,username:o,password:t})),""!=o&&""!=t?$.ajax({type:"POST",dataType:"json",contentType:"application/json;charset=utf-8",url:njs+"users/signup",data:JSON.stringify({name:e,email:a,username:o,password:t}),success:e=>{console.log(e),1==e.success&&($("#registerModal").modal("toggle"),$("#loginModal").modal("toggle"))},error:e=>{alert("Invalid Credentials"),console.log(e)}}):alert("Enter valid data")})):($.ajax({type:"GET",url:njs+"users",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"))},dataType:"json",success:e=>{$(".logo .name").append(e.name),console.log(e)},error:e=>{console.log(e)}}),$(".authenticated").show(),$(".auth").hide(),$("#logout").click(()=>{confirm("Do want to logout?")&&(console.log(localStorage.getItem("token")),localStorage.clear(),$(".auth").show(),$(".authenticated").hide(),location.reload())})),$(".dropdown-menu a.dropdown-toggle").on("click",function(e){return $(this).next().hasClass("show")||$(this).parents(".dropdown-menu").first().find(".show").removeClass("show"),$(this).next(".dropdown-menu").toggleClass("show"),$(this).parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown",function(e){$(".dropdown-submenu .show").removeClass("show")}),!1});