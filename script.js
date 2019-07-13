  var URL = "http://192.168.1.167"

    var voteMap = {};

    var upvoteSrc = "upvote.png";
    var downvoteSrc = "downvote.png";
    var activeUpvoteSrc = "upvote_clicked.png";
    var activeDownvoteSrc = "downvote_clicked.png";

    function toggle_comments(box_id) {
      var x = document.getElementById("comments-" + box_id);
      if (x.style.display === "none") {
        x.style.display = "inline-block";
      } else {
        x.style.display = "none";
      }
    }

  function toggle_post_popup() {
    var x = document.getElementById("dimmer");
      var y = document.getElementById("post_popup")
      console.log("dimmer display is:" + String(x.style.display))
    if (x.style.display === "none" || x.style.display == "") {
      console.log("Making Visible")
      x.style.display = "block";
      y.style.display = "block";
    } else {
      console.log("Making Invisible, dimmer not display=none")
      x.style.display = "none";
      y.style.display = "none";
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

    function updateVoteDiff(id) {
      document.getElementById("totalLabel-" + id).innerHTML = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) - Number(document.getElementById("downvoteLabel-" + id).innerHTML)).toString();

    }

  function upvote(id) {
    var newCount;
    if (voteMap[id] == 0) {
      voteMap[id] = 1;
      document.getElementById("upvoteButton-" + id).src = activeUpvoteSrc;
      newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) + 1).toString();
      document.getElementById("upvoteLabel-" + id).innerHTML = newCount;

    } else if (voteMap[id] == 1) {
      voteMap[id] = 0;


      document.getElementById("upvoteButton-" + id).src = upvoteSrc;
      newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) - 1).toString();
      document.getElementById("upvoteLabel-" + id).innerHTML = newCount;

    } else if (voteMap[id] == 2) {
      voteMap[id] = 1;

      document.getElementById("downvoteButton-" + id).src = downvoteSrc;
      newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) - 1).toString();
      document.getElementById("downvoteLabel-" + id).innerHTML = newCount;


      document.getElementById("upvoteButton-" + id).src = activeUpvoteSrc;
      newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) + 1).toString();
      document.getElementById("upvoteLabel-" + id).innerHTML = newCount;


    }
    updateVoteDiff(id);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL + "/vote", true);
    xhttp.send(id + "," + voteMap[id]);

  }

  function downvote(id) {
    var newCount;
    if (voteMap[id] == 0) {
      voteMap[id] = 2;

      document.getElementById("downvoteButton-" + id).src = activeDownvoteSrc;
      newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) + 1).toString();
      document.getElementById("downvoteLabel-" + id).innerHTML = newCount;

    } else if (voteMap[id] == 2) {
      voteMap[id] = 0;

      document.getElementById("downvoteButton-" + id).src = downvoteSrc;
      newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) - 1).toString();
      document.getElementById("downvoteLabel-" + id).innerHTML = newCount;

    } else if (voteMap[id] == 1) {
      voteMap[id] = 2;

      document.getElementById("upvoteButton-" + id).src = upvoteSrc;
      newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) - 1).toString();
      document.getElementById("upvoteLabel-" + id).innerHTML = newCount;

      document.getElementById("downvoteButton-" + id).src = activeDownvoteSrc;
      newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) + 1).toString();
      document.getElementById("downvoteLabel-" + id).innerHTML = newCount;


    }
    updateVoteDiff(id);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL + "/vote", true);
    xhttp.send(id + "," + voteMap[id]);
  }


  //  var newCount = (Number(document.getElementById("upvoteLabel-" + id).innerHTML) + 1).toString();
  //  document.getElementById("upvoteLabel-" + id).innerHTML = newCount;




  function senddownvote(id, votestatus) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL + "/vote", true);
    xhttp.send(id + ",");


    var newCount = (Number(document.getElementById("downvoteLabel-" + id).innerHTML) + 1).toString();
    document.getElementById("downvoteLabel-" + id).innerHTML = newCount;
  }





  function loadPost(id, heading, url, upvotes, downvotes, numComments, numSources, age, votestatus) {
    document.getElementById("posts").innerHTML += `<div id='linkbox-` + id + `' class="linkbox">
            <div id='linkbox_votes-` + id + `' class="linkbox_votes">
                <span id="upvoteLabel-` + id + `">` + upvotes + `</span>
                <a href="#"><img src="` + upvoteSrc + `" onclick="upvote(` + id + `)" title="Legit" id="upvoteButton-` + id + `"></a>
                <span id="totalLabel-` + id + `">` + (Number(upvotes) - Number(downvotes)).toString() + `</span>
                <a href="#"><img src="` + downvoteSrc + `" onclick="downvote(` + id + `)" title="Smells like bullcrap" id="downvoteButton-` + id + `"></a>
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
                    <a class="linkbox_discuss_button" id="linkbox_discuss_button-` + id + `" onclick="openComments(` + id + ` )" href="#">Discuss</a>
                    <!-- <a class="linkbox_sources_button">Sources</a> -->
                </div>
                <div class="linkbox_time">` + age + `</div>
            </div>
        </div>

        <div class="commentsbox" id="comments-` + id + `">
          <div class="comments_container" id="comments_container-` + id + `">
            <div class="commentsbox_header">Comments</div>
            <div class="comment_entry_container">
                 <textarea placeholder="Join the discussion!" id="comment_entry_` + id + `" class="comment_entry"></textarea>
                 <button class="comment_post" onclick="addComment(` + id + `)" id="comment_post_0">Post</button>
             </div>
            </div>
           </div>


  `;


    toggle_comments(id);

    if (votestatus == 1) {
      document.getElementById("upvoteButton-" + id).src = activeUpvoteSrc;
    } else if (votestatus == 2) {

      document.getElementById("downvoteButton-" + id).src = activeDownvoteSrc;

    }
  }

  function openComments(id) {
    toggle_comments(id);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText);
        document.getElementById("comments_container-" + id).innerHTML =
            `<div class="comments_container" id="comments_container-` + id + `">
              <div class="commentsbox_header">Comments</div>
              <div class="comment_entry_container">
                   <textarea placeholder="Join the discussion!" id="comment_entry_` + id + `" class="comment_entry"></textarea>
                   <button class="comment_post" onclick="addComment(` + id + `)" id="comment_post_0">Post</button>
               </div>
              </div>`
        var i;
        for (i = 0; i < data.numComments; i++) {
          var cinfo = data.comments[i];
          loadComment(cinfo.commentId, data.postId, cinfo.age, cinfo.text);
        }
      };
    }
    xhttp.open("POST", URL + "/showComments", true);
    xhttp.send(id);

  }

  function loadComment(commentId, postId, age, text) {


    document.getElementById("comments_container-" + postId).innerHTML += `

      <div class="comment" id="comment-` + commentId + `">
          <div class="comment_date" id="comment_date-` + commentId + `"> ` + age + `
           </div>
          <span class="comment_text" id='comment_text-` + commentId + `'>` + text + `</span>
      </div>

  `

  }

  function addComment(id) {
    openComments(id);
    toggle_comments(id);
    var text = document.getElementById('comment_entry_'+id).value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL + "/makeComment", true);
    xhttp.send(id+"~~~"+text);
    document.getElementById('comment_entry_'+id).value = "";

  }

  function addPost(){
    var headline = document.getElementById("headline-input").value;
    var url = document.getElementById("url-input").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", URL + "/createPost", true);
    xhttp.send(url+"~~~"+headline);

    document.getElementById("headline-input").value = "";
    document.getElementById("url-input").value = "";
    toggle_post_popup();
    loadDoc();




  }




  loadDoc();
