import{njs,tmdb,img,v3,v3key,backdrop,topEnglish,cast_img,v3tv}from"../js/serverDetails.js";$(document).ready(()=>{console.log("ready");$.ajax({url:njs+"favorites/movies",type:"GET",dataType:"JSON",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"))}}).done(e=>{$.each(e,(e,o)=>{$.ajax({url:v3+o+"?api_key="+v3key,method:"GET",dataType:"JSON"}).done(e=>{$(".movies").append("<div class='row element'><div class='col-5 col-sm-4 mov-img-container'><a href='movieInfo.html?id="+e.id+"'><img src='"+cast_img+e.poster_path+"' class='img-responsive mov-img'></a></div><div class='col-7 col-sm-8' style='padding: 0px'><div class='container-fluid'><div class='row'><div class='col-12'><h2 class='mov-title'><a href='movieinfo.html?id="+e.id+"'>"+e.title+" </a></h2><h4 class='mov-year'>"+e.release_date.split("-")[0]+"</h4></div>   <div class='col-12'><div class='mov-desc'><p>"+e.overview+"</p></div></div></div></div></div></div><hr class='div-line'>")}).fail(()=>{console.log("Error")})})}),$.ajax({url:njs+"favorites/tv",type:"GET",dataType:"JSON",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"))}}).done(e=>{$.each(e,(e,o)=>{$.ajax({url:v3tv+o+"?api_key="+v3key,method:"GET",dataType:"JSON"}).done(e=>{$(".movies").append("<div class='row element'><div class='col-5 col-sm-4 mov-img-container'><a href='tvInfo.html?id="+e.id+"'><img src='"+cast_img+e.poster_path+"' class='img-responsive mov-img'></a></div><div class='col-7 col-sm-8' style='padding: 0px'><div class='container-fluid'><div class='row'><div class='col-12'><h2 class='mov-title'><a href='tvInfo.html?id="+e.id+"'>"+e.name+" </a></h2><h4 class='mov-year'>"+e.first_air_date.split("-")[0]+"</h4></div><div class='col-12'><div class='mov-desc'><p>"+e.overview+"</p></div></div></div></div></div></div><hr class='div-line'>")}).fail(()=>{console.log("Error")})})})}),null==localStorage.getItem("token")?($(".authenticated").hide(),$("#loginButton").on("click",()=>{var e=$('[name="uname"]').val(),o=$('[name="password"]').val();console.log(JSON.stringify({username:e,password:o})),""!=e&&""!=o?$.ajax({type:"POST",dataType:"json",contentType:"application/json;charset=utf-8",url:njs+"users/login",data:JSON.stringify({username:e,password:o}),success:e=>{console.log(e),1==e.success&&($("#loginModal").modal("toggle"),$(".auth").hide(),$(".authenticated").show(),localStorage.setItem("token",e.token),location.reload())},error:e=>{alert("Invalid Credentials"),console.log(e)}}):alert("Enter valid data")}),$("#signup").on("click",()=>{var e=$('[name="name"]').val(),o=$('[name="email"]').val(),a=$('[name="runame"]').val(),s=$('[name="rpassword"]').val();$('[name="password2"]').val();console.log(JSON.stringify({name:e,email:o,username:a,password:s})),""!=a&&""!=s?$.ajax({type:"POST",dataType:"json",contentType:"application/json;charset=utf-8",url:njs+"users/signup",data:JSON.stringify({name:e,email:o,username:a,password:s}),success:e=>{console.log(e),1==e.success&&($("#registerModal").modal("toggle"),$("#loginModal").modal("toggle"))},error:e=>{alert("Invalid Credentials"),console.log(e)}}):alert("Enter valid data")})):($.ajax({type:"GET",url:njs+"users",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"))},dataType:"json",success:e=>{$(".logo .name").append(e.name),console.log(e)},error:e=>{console.log(e)}}),$(".authenticated").show(),$(".auth").hide(),$("#logout").click(()=>{confirm("Do want to logout?")&&(console.log(localStorage.getItem("token")),localStorage.clear(),$(".auth").show(),$(".authenticated").hide(),location.reload())})),$(".dropdown-menu a.dropdown-toggle").on("click",function(e){return $(this).next().hasClass("show")||$(this).parents(".dropdown-menu").first().find(".show").removeClass("show"),$(this).next(".dropdown-menu").toggleClass("show"),$(this).parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown",function(e){$(".dropdown-submenu .show").removeClass("show")}),!1});