function toggle_comments(box_id) {
  var x = document.getElementById("comments-"+box_id);
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
        console.log("WORKING");

        var data = JSON.parse(this.responseText);
        var i;
        for (i = 0; i < data.numPosts; i++) {
          var pinfo = data.posts[i];
          loadPost(pinfo.id, pinfo.title, pinfo.url, pinfo.upvotes, pinfo.downvotes, pinfo.numComments, pinfo.numSources, pinfo.age);
        }
      };
    }
    xhttp.open("GET", "http://192.168.1.167/topPosts", true);
    xhttp.send();

  }

  function loadPost(id, heading, url, upvotes, downvotes, numComments, numSources, age) {
    document.getElementById("posts").innerHTML += `<div id='linkbox-`+id+`' class="linkbox">
            <div id='linkbox_votes-`+id+`' class="linkbox_votes">
                <span id="upvoteLabel-`+id+`">`+upvotes+`</span>
                <img src="upvote.png" onclick="upvote(`+id+`)" id="upvoteButton-`+id+`">
                <span id="totalLabel-`+id+`">`+(Number(upvotes)-Number(downvotes)).toString()+`</span>
                <img src="downvote.png" onclick="downvote(`+id+`)" id="downvoteButton-`+id+`">
                <span id="downvotesLabel-`+id+`">`+downvotes+`</span>
            </div>
            <div class="linkbox_main">
                <div class="linkbox_titlebox">
                    <a href="`+url+`">
                        <span class="linkbox_title">`+heading+`</span><br>
                        <span class="linkbox_link">`+url+`</span>
                    </a>
                </div>
                <div class="linkbox_buttons">
                    <a class="linkbox_discuss_button" id="linkbox_discuss_button-`+id+`" onclick="toggle_comments(`+id+`)" href="#">Discuss</a>
                    <!-- <a class="linkbox_sources_button">Sources</a> -->
                </div>
                <div class="linkbox_time">`+'SAMMY BOI AGE HERE'+`</div>
            </div>
        </div>

        <div class="commentsbox" id="comments-`+id+`">
                   <div class="commentsbox_header">Comments</div>
                   <div class="comment_entry_container">
                        <textarea placeholder="Join the discussion!" id="comment_entry_0" class="comment_entry"></textarea>
                        <button class="comment_post" onclick="SAMMY BOI COMMENT BUTTON HERE" id="comment_post_0">Post</button>
                    </div>
                   <div class="comments_container">
                       <div class="comment">
                           <span class="username">Sample Username</span><br>
                           <div class="comment_date">
                                SAMMY BOI COMMENT AGE HERE
                            </div>
                           <span class="comment_text">Sample comment asdf;oawejf;oiasjd;foajsd;ofjiaw;oe</span>
                       </div>
                   </div>
               </div>
           </div>
  `;
  toggle_comments(id);
}
loadDoc();
