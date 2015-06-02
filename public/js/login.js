
// **Materialize initializers and bits**
//-------------------------------------------------------
$(document).ready(function(){
            $('ul.tabs').tabs();
          });


//-------------------------------------------------------

//login validation


function validation() {
  var giturl = document.getElementById("giturl").value;
  console.log(giturl);
  var apikey = document.getElementById("apikey").value;
  console.log(apikey);
  if (giturl === '' || apikey === '') {
    console.log("Please fill all fields...!!!!!!");
    return false;
  }
  else {
    return true;
  }
}
