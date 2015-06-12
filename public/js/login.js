
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
    console.log('Personal Dashboard Accessed');
    return true;
  }
}


function validationOrg() {
  var orgUrl = document.getElementById("orgUrl").value;
  var apikey = document.getElementById("apikeyOrg").value;
  if (orgUrl === '' || apikey === '') {
    console.log("Please fill all fields...!!!!!!");
    return false;
  }
  else {
    console.log('Organisation Dashboard Accessed');
    return true;
  }
}

function validationRepo() {
  var repoUrl = document.getElementById("repoUrl").value;
  var apikey = document.getElementById("apikeyrepo").value;
  if (repoUrl === '' || apikey === '') {
    console.log("Please fill all fields...!!!!!!");
    return false;
  }
  else {
    console.log('Repo Dashboard Accessed');
    return true;
  }
}

//-----------------------------------------------------------

//Socket IO

  var socket = io();
