function toggle_comments(box_id) {
  var x = document.getElementById(box_id);
  if (x.style.display === "none") {
    x.style.display = "inline-block";
  } else {
    x.style.display = "none";
  }
} 