const search_url="http://api.jikan.moe/v3/search/anime?q=";var lazyLoadInstance=new LazyLoad({});function showResults(e,t){document.getElementById(e);let s=0;for(i in t){let a=t[i],n=a.type.toLowerCase();if(0!=n.localeCompare("special")&&0!=n.localeCompare("music")&&0!=n.localeCompare("ova")){try{if(0==a.rated.localeCompare("Rx"))continue}catch(e){}addToScreen(e,a),s++}}$.LoadingOverlay("hide"),document.getElementById("query").innerText=0==s?"No results found for '"+$("#search_input").val()+"' (Enter more than 3 letters)":"Search results found for '"+$("#search_input").val()+"'"}function addToScreen(e,t){let s=document.getElementById(e),a=document.createElement("div");a.classList.add("col"),a.classList.add("d-flex"),a.classList.add("justify-content-center"),a.classList.add("align-items-stretch"),a.classList.add("mb-4");let n=document.createAttribute("href");n.value="details.html?anime_id="+t.mal_id;let i=document.createElement("a");i.classList.add("card"),i.classList.add("shadow"),i.setAttributeNode(n),a.appendChild(i);let o=document.createAttribute("src");o.value=t.image_url;let r=document.createElement("img");r.classList.add("card-img-top"),r.classList.add("lazy"),r.setAttributeNode(o),i.appendChild(r);let l=document.createElement("div");l.classList.add("card-body"),l.classList.add("hover-this"),i.appendChild(l);let c=document.createElement("p");c.classList.add("card-title"),c.classList.add("font-size-12"),c.innerText=t.title,l.appendChild(c),s.appendChild(a)}function getSearchResults(e){if($.LoadingOverlay("show"),$("#intro_container").removeClass("display-block"),$("#intro_container").addClass("display-none"),$("#search_results_container").removeClass("display-none"),$("#search_results_container").addClass("display-block"),0==cacheCheck(e))$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(e),function(t,s){sessionStorage.setItem(e,JSON.stringify(t)),showResults("result_screen",t.results)});else{showResults("result_screen",JSON.parse(sessionStorage.getItem(e)).results)}}function getTopAiring(e){if($.LoadingOverlay("show"),sessionStorage.page="2",$("#intro_screen").empty(),$("#topairing_season_button").attr("disabled",!0),$("#current_season_button").removeAttr("disabled"),$("#upcoming_anime_button").removeAttr("disabled"),0==storageCheck(e))$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(e),function(t,s){setWithExpiry(e,JSON.stringify(t),168),showResults("intro_screen",t.top)});else{showResults("intro_screen",JSON.parse(getWithExpiry(e)).top)}}function getUpcomingAnime(e){if($.LoadingOverlay("show"),sessionStorage.page="3",$("#intro_screen").empty(),$("#upcoming_anime_button").attr("disabled",!0),$("#topairing_season_button").removeAttr("disabled"),$("#current_season_button").removeAttr("disabled"),0==storageCheck(e))$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(e),function(t,s){setWithExpiry(e,JSON.stringify(t),168),showResults("intro_screen",t.top)});else{showResults("intro_screen",JSON.parse(getWithExpiry(e)).top)}}function getCurrentSeason(e){if($.LoadingOverlay("show"),sessionStorage.page="1",$("#intro_screen").empty(),$("#current_season_button").attr("disabled",!0),$("#topairing_season_button").removeAttr("disabled"),$("#upcoming_anime_button").removeAttr("disabled"),0==storageCheck(e))$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(e),function(t,s){setWithExpiry(e,JSON.stringify(t),168),showResults("intro_screen",t.anime)});else{showResults("intro_screen",JSON.parse(getWithExpiry(e)).anime)}}function pageLoaded(){let e=new URLSearchParams(window.location.search);if(e.has("reset")&&e.get("reset")){$("#search_results_container").removeClass("display-block"),$("#search_results_container").addClass("display-none"),$("#intro_container").removeClass("display-none"),$("#intro_container").addClass("display-block"),sessionStorage.removeItem("search_query"),getTopAiring("https://api.jikan.moe/v3/top/anime/1/airing");let e={id:"100"};window.history.replaceState(e,"Homepage","index.html")}else if(null===sessionStorage.getItem("search_query"))sessionStorage.search_query="intro",getTopAiring("https://api.jikan.moe/v3/top/anime/1/airing");else if(0==sessionStorage.getItem("search_query").localeCompare("intro"))switch($("#search_results_container").removeClass("display-block"),$("#search_results_container").addClass("display-none"),$("#intro_container").removeClass("display-none"),$("#intro_container").addClass("display-block"),Number(sessionStorage.getItem("page"))){case 1:getCurrentSeason("https://api.jikan.moe/v3/season");break;case 3:getUpcomingAnime("https://api.jikan.moe/v3/top/anime/1/upcoming");break;default:getTopAiring("https://api.jikan.moe/v3/top/anime/1/airing")}else{$("#intro_container").removeClass("display-block"),$("#intro_container").addClass("display-none"),$("#search_results_container").removeClass("display-none"),$("#search_results_container").addClass("display-block");let e=sessionStorage.getItem("search_query");document.getElementById("query").innerText=e,document.getElementById("search_input").value=e,getSearchResults(search_url+e)}}$(document).ready(function(){$("#footer").addClass("display-none"),$("#container").imagesLoaded().always(function(e){}).done(function(e){}).fail(function(){}).progress(function(e,t){}),$("#search_button").click(function(){$("#result_screen").empty();let e=$("#search_input").val();if(0==e.localeCompare(""));else{let t=search_url+$("#search_input").val();$("#intro_container").addClass("display-none"),$("#search_results_container").removeClass("display-none"),$("#search_results_container").addClass("display-block"),document.getElementById("search_input").innerText=e,getSearchResults(t),sessionStorage.search_query=$("#search_input").val()}}),$("#current_season_button").click(function(){getCurrentSeason("https://api.jikan.moe/v3/season"),lazyLoadInstance.update()}),$("#topairing_season_button").click(function(){getTopAiring("https://api.jikan.moe/v3/top/anime/1/airing"),lazyLoadInstance.update()}),$("#upcoming_anime_button").click(function(){getUpcomingAnime("https://api.jikan.moe/v3/top/anime/1/upcoming"),lazyLoadInstance.update()})}),window.addEventListener("load",pageLoaded);