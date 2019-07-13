  var URL = "http://192.168.1.167"

  var voteMap = {};

  var upvoteSrc = "images/Legit.png";
  var downvoteSrc = "images/bull.png";
  var activeUpvoteSrc = "";
  var activeDownvoteSrc = "";

  function toggle_comments(box_id) {
    var x = document.getElementById("comments-" + box_id);
    if (x.style.display === "none") {
      x.style.display = "inline-block";
    } else {
      x.style.display = "none";
    }
  }

  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText);
        var i;
        for (i = 0; i < data.numPosts; i++) {
          var pinfo = data.posts[i];
          loadPost(pinfo.id, pinfo.title, pinfo.url, pinfo.upvotes, pinfo.downvotes, pinfo.numComments, pinfo.numSources, pinfo.age, pinfo.voteStatus);
          voteMap[pinfo.id] = pinfo.voteStatus;
        }
      };
    }
    xhttp.open("GET", URL + "/topPosts", true);
    xhttp.send();

  }

  function updateVoteDiff(id){
     document.getElementById("totalLabel-"+id).innerHTML = (Number(document.getElementById("upvoteLabel-" + id).innerHTML)-Number(document.getElementById("downvoteLabel-" + id).innerHTML)).toString();

  }

  function upvote(id){
    var newCount;
    if (voteMap[id] == 0){
      voteMap[id] = 1;
      document.getElementById("upvoteButton-"+id).src = activeUpvoteSrc;
      newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) + 1).toString();
      document.getElementById("upvoteLabel-" + id).innerHTML = newCount;

    }
    else if (voteMap[id]==1) {
      voteMap[id] = 0;


      document.getElementById("upvoteButton-"+id).src = upvoteSrc;
      newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) - 1).toString();
      document.getElementById("upvoteLabel-" + id).innerHTML = newCount;

    }

    else if(voteMap[id]==2){
      voteMap[id] = 1;

      document.getElementById("downvoteButton-"+id).src = downvoteSrc;
      newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) - 1).toString();
      document.getElementById("downvoteLabel-" + id).innerHTML = newCount;


      document.getElementById("upvoteButton-"+id).src = activeUpvoteSrc;
      newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) + 1).toString();
      document.getElementById("upvoteLabel-" + id).innerHTML = newCount;


    }
    updateVoteDiff(id);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL + "/vote", true);
    xhttp.send(id+","+voteMap[id]);

  }

  function downvote(id){
    var newCount;
    if (voteMap[id] == 0){
      voteMap[id] = 2;

      document.getElementById("downvoteButton-"+id).src = activeDownvoteSrc;
      newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) + 1).toString();
      document.getElementById("downvoteLabel-" + id).innerHTML = newCount;

    }
    else if (voteMap[id]==2) {
      voteMap[id] = 0;

      document.getElementById("downvoteButton-"+id).src = downvoteSrc;
      newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) - 1).toString();
      document.getElementById("downvoteLabel-" + id).innerHTML = newCount;

    }

    else if(voteMap[id]==1){
      voteMap[id] = 2;

      document.getElementById("upvoteButton-"+id).src = upvoteSrc;
      newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) - 1).toString();
      document.getElementById("upvoteLabel-" + id).innerHTML = newCount;

      document.getElementById("downvoteButton-"+id).src = activeDownvoteSrc;
      newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) + 1).toString();
      document.getElementById("downvoteLabel-" + id).innerHTML = newCount;


    }
    updateVoteDiff(id);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL + "/vote", true);
    xhttp.send(id+","+voteMap[id]);
  }


  //  var newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) + 1).toString();
  //  document.getElementById("upvoteLabel-" + id).innerHTML = newCount;




  function senddownvote(id,votestatus) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL + "/vote", true);
    xhttp.send(id+",");


    var newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) + 1).toString();
    document.getElementById("downvoteLabel-" + id).innerHTML = newCount;
  }





  function loadPost(id, heading, url, upvotes, downvotes, numComments, numSources, age, votestatus) {
    document.getElementById("posts").innerHTML += `<div id='linkbox-` + id + `' class="linkbox">
            <div id='linkbox_votes-` + id + `' class="linkbox_votes">
                <span id="upvoteLabel-` + id + `">` + upvotes + `</span>
                <a href="#"><img src="`+upvoteSrc+`" onclick="upvote(` + id + `)" title="Legit" id="upvoteButton-` + id + `"></a>
                <span id="totalLabel-` + id + `">` + (Number(upvotes)-Number(downvotes)).toString() + `</span>
                <a href="#"><img src="`+downvoteSrc+`" onclick="downvote(` + id + `)" title="Smells like bullcrap" id="downvoteButton-` + id + `"></a>
                  <span id="downvoteLabel-` + id + `">` + downvotes + `</span>
            </div>
            <div class="linkbox_main">
                <div class="linkbox_titlebox">
                    <a href="` + url + `">
                        <span class="linkbox_title">` + heading + `</span><br>
                        <span class="linkbox_link">` + url + `</span>
                    </a>
                </div>
                <div class="linkbox_buttons">
                    <a class="linkbox_discuss_button" id="linkbox_discuss_button-` + id + `" onclick="toggle_comments(` + id + `)" href="#">Discuss</a>
                    <!-- <a class="linkbox_sources_button">Sources</a> -->
                </div>
            </div>
        </div>

        <div class="commentsbox" id="comments-` + id + `">
                   <div class="commentsbox_header">Comments</div>
                   <div class="comments_container">
                       <div class="comment">
                           <span class="username">Sample Username</span><br>
                           <span class="comment_text">Sample comment asdf;oawejf;oiasjd;foajsd;ofjiaw;oe</span>
                       </div>

                       <div class="comment">
                           <span class="username">Sample Username</span><br>
                           <span class="comment_text">Sample comment asdf;oawejf;oiasjd;foajsd;ofjiaw;oe</span>
                       </div>

                       <div class="comment">
                           <span class="username">Sample Username</span><br>
                           <span class="comment_text">Sample comment asdf;oawejf;oiasjd;foajsd;ofjiaw;oe</span>
                       </div>
                   </div>
               </div>
           </div>
  `;
    toggle_comments(id);

    if (votestatus == 1) {
      document.getElementById("upvoteButton-"+id).src = activeUpvoteSrc;
    }
    else if (votestatus == 2){

      document.getElementById("downvoteButton-"+id).src = activeDownvoteSrc;

    }
  }
  loadDoc();
