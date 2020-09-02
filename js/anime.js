const base_url="https://api.jikan.moe/v3/";var langList=new Map;function newsSearchProgress(e){e>=100?$(".progress").addClass("display-block"):$("#search_progress").css("width",e+"%")}function isValidNews(e){return!!(e=e.toLowerCase()).includes("dub")}function narrowResult(e,t,n){let a=!1,i=new Map;if(0==cacheCheck("ann_id_"+t)){t=t.toLowerCase();let s=.2,r="";for(let[n,o]of e.entries()){let l=o.title.toLowerCase();if(1==e.size){r=n;break}let c=StringCompare(l,t);c>=s&&(c==s&&(a=!0),s=c,r=n,i.set(n,c))}if(a)for(let[t,a]of i.entries()){let i=a;Number(e.get(t).date.substring(5,7))==Number(n.substring(5,7))&&(i+=.1),i>=s&&(s=i,r=t)}return sessionStorage.setItem("ann_id_"+t,r),r}return sessionStorage.getItem("ann_id_"+t)}function details_component(e){$("#myanimelist").attr("href",e.url),null!=e.title_english?(document.getElementById("heading1").innerText=e.title_english,document.getElementById("heading2").innerText=e.title):(document.getElementById("heading1").innerText=e.title,document.getElementById("heading2").innerText="");try{document.getElementById("type").innerText=e.type}catch(e){}try{document.getElementById("status").innerText=e.status}catch(e){}try{document.getElementById("score").innerText=e.score}catch(e){}try{document.getElementById("thumbnail").src=e.image_url}catch(e){}try{document.getElementById("synopsis").innerText=e.synopsis}catch(e){}try{document.getElementById("studio").innerText=e.studios[0].name}catch(e){}try{document.getElementById("airdate").innerText=e.aired.string}catch(e){}let t=!1,n=e.related;try{let e=n.Prequel[0];document.getElementById("prequeName").innerText=e.name,$("#prequelLink").attr("href","details.html?anime_id="+e.mal_id),$("#prequel-div").removeClass("display-none"),$("#prequel-div").addClass("display-block"),t=!0}catch(e){}try{let e=n.Sequel[0];document.getElementById("sequelName").innerText=e.name,$("#sequelLink").attr("href","details.html?anime_id="+e.mal_id),$("#sequel-div").removeClass("display-none"),$("#sequel-div").addClass("display-block"),t=!0}catch(e){}t&&($("#related-list").removeClass("display-none"),$("#related-list").addClass("display-block"))}function also_check_component(e){try{e.length>0&&($("#also_check_jumbotron").removeClass("display-none"),$("#also_check_jumbotron").addClass("display-block"));let t=document.getElementById("also_check_screen");for(i in e){let n=e[i],a=document.createElement("div");a.classList.add("col"),a.classList.add("d-flex"),a.classList.add("justify-content-center"),a.classList.add("align-items-stretch"),a.classList.add("mb-3");let s=document.createAttribute("href");s.value="details.html?anime_id="+n.mal_id;let r=document.createElement("a");r.setAttributeNode(s),r.classList.add("card"),r.classList.add("shadow"),r.classList.add("recommendations-card"),a.appendChild(r);let o=document.createAttribute("src");o.value=n.image_url;let l=document.createElement("img");l.classList.add("card-img-top"),l.classList.add("card-img-top-settings"),l.classList.add("lazy"),l.setAttributeNode(o),r.appendChild(l);let c=document.createElement("div");c.classList.add("card-body"),c.classList.add("hover-this"),r.appendChild(c);let d=document.createElement("h6");if(d.classList.add("card-title"),d.classList.add("font-size-12"),d.innerText=n.title,c.appendChild(d),t.appendChild(a),i>=5)break}}catch(e){}}function news_component_add(e,t,n){let a=document.getElementById("news"),i=document.createAttribute("href");i.value=n;let s=document.createElement("a");s.classList.add("list-group-item"),s.classList.add("list-group-item-action"),s.classList.add("hover-this"),s.setAttributeNode(i);let r=document.createElement("div");r.classList.add("d-flex"),r.classList.add("w-100"),r.classList.add("justify-content-between"),s.appendChild(r);let o=document.createElement("h5");o.classList.add("mb-1"),o.innerText="",r.appendChild(o);let l=document.createElement("small");l.innerText=e,r.appendChild(l);let c=document.createElement("p");c.classList.add("mb-1"),c.insertAdjacentHTML("beforeend",t),s.appendChild(c),a.appendChild(s)}function available_dubs_component_add(e){if(!langList.has(e)){langList.set(e,1);let t=document.getElementById("languages"),n=document.createElement("span"),a=document.createTextNode(e);n.appendChild(a),n.classList.add("badge"),n.classList.add("badge-secondary"),n.classList.add("p-1"),n.classList.add("ml-1"),t.appendChild(n)}}function extract_languages(e){for(i in e){e[i];if(0==e[i].role.localeCompare("Main")){let t=e[i].voice_actors;for(j in t){available_dubs_component_add(t[j].language)}}}}function removeTypeMismatch(e){return 0==(e=e.toLowerCase()).localeCompare("ova")?"oav":0==e.localeCompare("ona")?"tv":e}function loadDetails(e){try{let t="https://api.jikan.moe/v3/anime/"+e;if(0==cacheCheck(t))$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(t),function(n,a){sessionStorage.setItem(t,JSON.stringify(n)),details_component(n),loadCharacterStaff(e),null!=n.title_english?(setTimeout(searchTitles(n.title_english,n.aired.from,removeTypeMismatch(n.type)),2e3),fetchAniList(n.title_english,n.aired.from.substring(0,4))):(setTimeout(searchTitles(n.title,n.aired.from,removeTypeMismatch(n.type)),2e3),fetchAniList(n.title,n.aired.from.substring(0,4)))});else{let n=JSON.parse(sessionStorage.getItem(t));details_component(n),loadCharacterStaff(e),null!=n.title_english?(setTimeout(searchTitles(n.title_english,n.aired.from,removeTypeMismatch(n.type)),2e3),fetchAniList(n.title_english,n.aired.from.substring(0,4))):(setTimeout(searchTitles(n.title,n.aired.from,removeTypeMismatch(n.type)),2e3),fetchAniList(n.title,n.aired.from.substring(0,4)))}}catch(e){}$.LoadingOverlay("hide")}function loadCharacterStaff(e){try{langList=new Map;let t="https://api.jikan.moe/v3/anime/"+e+"/characters_staff";if(0==cacheCheck(t))$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(t),function(e,n){sessionStorage.setItem(t,JSON.stringify(e)),extract_languages(e.characters)});else{extract_languages(JSON.parse(sessionStorage.getItem(t)).characters)}}catch(e){}}function loadRecommendations(e){try{let t="https://api.jikan.moe/v3/anime/"+e+"/recommendations";if(0==cacheCheck(t))$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(t),function(e,n){sessionStorage.setItem(t,JSON.stringify(e)),also_check_component(e.recommendations)});else{also_check_component(JSON.parse(sessionStorage.getItem(t)).recommendations)}}catch(e){}}function searchNews(e){try{newsSearchProgress(90);let t=!1;if(0!=e.localeCompare("")){$("#animenewsnetwork").attr("href","https://www.animenewsnetwork.com/encyclopedia/anime.php?id="+e);let n="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime="+e;$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(n),function(e,n){newsSearchProgress(100),$xml=$(e),$xml.find("news").each(function(){let e=$(this).attr("datetime").substring(0,10),n=$(this).text(),a=$(this).attr("href");isValidNews(n)&&(news_component_add(e,n,a),t=!0)}),t?document.getElementById("news_heading").innerHTML="Dub News : <small class='text-secondary font-italic'>~ AnimeNewsNetwork</small>":document.getElementById("news_heading").innerText="No Dub News Found",$xml.find("cast").each(function(){let e=langCodeToName($(this).attr("lang"));null!=e&&available_dubs_component_add(e)})})}else newsSearchProgress(100),document.getElementById("news_heading").innerText="No News Found"}catch(e){}}function searchTitles(e,t,n){newsSearchProgress(25);let a=new Map,i=!1,s="https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&nlist=all&search="+e;try{if(0==cacheCheck("search_term_"+e))$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(s),function(s,r){newsSearchProgress(50),$xml=$(s),$xml.find("item").each(function(){let e=$(this).find("vintage").text(),s=$(this).find("type").text();if(s=s.toLowerCase(),null!=t&&0==t.substring(0,5).localeCompare(e.substring(0,5))&&s.includes(n)){i=!0;let t=$(this).find("id").text(),n=$(this).find("name").text();a.set(t,JSON.parse('{ "title":"'+n+'", "date":"'+e+'"}'))}}),i?(sessionStorage.setItem("search_term_"+e,JSON.stringify(Array.from(a.entries()))),setTimeout(searchNews(narrowResult(a,e,t)),2e3)):setTimeout(searchTitlesFallback1(e,t,n),2e3)});else{searchNews(narrowResult(new Map(JSON.parse(sessionStorage.getItem("search_term_"+e))),e,t))}}catch(e){newsSearchProgress(100),document.getElementById("news_heading").innerText="No News Found"}}function searchTitlesFallback1(e,t,n){let a=!1,i=new Map,s="https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&nlist=all&name="+query_fix(e);try{$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(s),function(s,r){$xml=$(s),$xml.find("item").each(function(){let e=$(this).find("vintage").text(),s=$(this).find("type").text();if(s=s.toLowerCase(),null!=t&&0==t.substring(0,5).localeCompare(e.substring(0,5))&&s.includes(n)){a=!0;let t=$(this).find("id").text(),n=$(this).find("name").text();i.set(t,JSON.parse('{ "title":"'+n+'", "date":"'+e+'"}'))}}),a?(sessionStorage.setItem("search_term_"+e,JSON.stringify(Array.from(i.entries()))),setTimeout(searchNews(narrowResult(i,e,t)),2e3)):setTimeout(searchTitlesFallback2(e,t,n),2e3)})}catch(e){newsSearchProgress(100),document.getElementById("news_heading").innerText="No News Found"}}function searchTitlesFallback2(e,t,n){let a=!1,i=new Map,s="https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&nlist=all&search="+query_fix(e).substring(0,3);try{$.get("https://api.allorigins.win/raw?url="+encodeURIComponent(s),function(s,r){$xml=$(s),$xml.find("item").each(function(){let e=$(this).find("vintage").text(),s=$(this).find("type").text();if(s=s.toLowerCase(),null!=t&&0==t.substring(0,5).localeCompare(e.substring(0,5))&&s.includes(n)){a=!0;let t=$(this).find("id").text(),n=$(this).find("name").text();i.set(t,JSON.parse('{ "title":"'+n+'", "date":"'+e+'"}'))}}),a?(sessionStorage.setItem("search_term_"+e,JSON.stringify(Array.from(i.entries()))),setTimeout(searchNews(narrowResult(i,e,t)),2e3)):(newsSearchProgress(100),document.getElementById("news_heading").innerText="No News Found")})}catch(e){newsSearchProgress(100),document.getElementById("news_heading").innerText="No News Found"}}function fetchAniList(e,t){let n={search:e},a={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:"\n    query ($id: Int, $page: Int, $perPage: Int, $search: String) {\n        Page(page: $page, perPage: $perPage) {\n          media(id: $id, search: $search) {\n            siteUrl\n            type\n            startDate {\n                year\n            }\n            title {\n              romaji\n              english\n            }\n            characters(page: 1) {\n              edges {\n                node{\n                  name {\n                    full\n                  }\n        \n                }\n                role\n                voiceActors{\n                  language\n                }\n              }\n            }\n          }\n        }\n      }\n    ",variables:n})};fetch("https://graphql.anilist.co",a).then(e=>e.json()).then(function(n){n=n.data.Page.media;let a=0,s=0;for(i in n){let r=n[i].title.romaji;if(0=="anime".localeCompare(n[i].type.toLowerCase())&&0==t.localeCompare(n[i].startDate.year)){let t=StringCompare(r,e);t>s&&(s=t,a=i)}}for(i in n){if(null==n[i].title.english)continue;let r=n[i].title.english;if(0=="anime".localeCompare(n[i].type.toLowerCase())&&0==t.localeCompare(n[i].startDate.year)){let t=StringCompare(r,e);t>s&&(s=t,a=i)}}let r=n[a].characters.edges;for(j in $("#anilist").attr("href",n[a].siteUrl),r){let e=r[j].role;if(0=="main".localeCompare(e.toLowerCase())){let e=r[j].voiceActors;for(k in e){let t=e[k].language;available_dubs_component_add(t[0]+t.slice(1).toLowerCase())}}}})}function query_fix(e){let t="";for(let n=0;n<e.length;n++){let a=e.charCodeAt(n);if(!(a>=65&&a<=90||a>=97&&a<=122))break;t+=e.charAt(n)}return t}function pageLoaded(){$.LoadingOverlay("show");var e=new URLSearchParams(window.location.search).get("anime_id");loadDetails(Number(e)),setTimeout(loadRecommendations(Number(e)),1e3)}document.addEventListener("DOMContentLoaded",function(){var e;if("IntersectionObserver"in window){e=document.querySelectorAll(".lazy");var t=new IntersectionObserver(function(e,n){e.forEach(function(e){if(e.isIntersecting){var n=e.target;n.src=n.dataset.src,n.classList.remove("lazy"),t.unobserve(n)}})});e.forEach(function(e){t.observe(e)})}else{var n;function a(){n&&clearTimeout(n),n=setTimeout(function(){var t=window.pageYOffset;e.forEach(function(e){e.offsetTop<window.innerHeight+t&&(e.src=e.dataset.src,e.classList.remove("lazy"))}),0==e.length&&(document.removeEventListener("scroll",a),window.removeEventListener("resize",a),window.removeEventListener("orientationChange",a))},20)}e=document.querySelectorAll(".lazy"),document.addEventListener("scroll",a),window.addEventListener("resize",a),window.addEventListener("orientationChange",a)}}),$(document).ready(function(){$("#search_button").click(function(){let e=$("#search_input").val();0==e.localeCompare("")||(sessionStorage.search_query=e,window.open("index.html","_self"))})}),window.addEventListener("load",pageLoaded);