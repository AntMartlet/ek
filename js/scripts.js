function validate(){
   var user = document.forms["form"]["user"].value;
   var password = document.forms["form"]["password"].value;
   var formIsValid = true;
   document.getElementById("passwordValidation").style.color = '#f55';
   if (!user){
      document.getElementById("userValidation").innerHTML="Field is empty";
      formIsValid = false;
   } else document.getElementById("userValidation").innerHTML="";
   if (!password){
      document.getElementById("passwordValidation").innerHTML="Field is empty";
      formIsValid = false;
   } else document.getElementById("passwordValidation").innerHTML="";
   if (!formIsValid) {
   	return;
   }
    loadJSON(function(response) {
		console.log(response);
		var json = JSON.parse(response);
		var currentUser; 
		for(var i = 0, len = json.length; i < len; i++){
			console.log(json[i].user, user)
			if(json[i].user === user){
				currentUser = json[i];
				break;
			}
		}
		if(!currentUser)
			document.getElementById("userValidation").innerHTML="User isn't found";
		else{
				document.getElementById("userValidation").innerHTML="";
			if(currentUser.password === password){
				document.getElementById("passwordValidation").innerHTML="Success authorization!";
				document.getElementById("passwordValidation").style.color = '#076b0b';
			} else {
				document.getElementById("passwordValidation").innerHTML="Wrong password";
			}
		}
	});
}
function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', './js/users.json', true);
	xobj.onreadystatechange = function () {
	if (xobj.readyState == 4 && xobj.status == "200") {
		callback(xobj.responseText);
		}
	}	
	xobj.send(null);

}