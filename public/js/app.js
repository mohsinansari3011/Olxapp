 // var config = {
 //    apiKey: "AIzaSyC5uBZkFu0TDttwzoTLuJy7kMTpOYRl3nw",
 //    authDomain: "hackaton3011.firebaseapp.com",
 //    databaseURL: "https://hackaton3011.firebaseio.com",
 //    projectId: "hackaton3011",
 //    storageBucket: "",
 //    messagingSenderId: "14405667398"
 //  };
 //  firebase.initializeApp(config);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA5nPhUdSd0rNjhYG61eiR-m_KTBcqiK90",
    authDomain: "olxapp3011.firebaseapp.com",
    databaseURL: "https://olxapp3011.firebaseio.com",
    projectId: "olxapp3011",
    storageBucket: "olxapp3011.appspot.com",
    messagingSenderId: "362448095419"
  };
  firebase.initializeApp(config);

var db = firebase.firestore();
var auth = firebase.auth();
var messaging = firebase.messaging();

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);



//messaging.usePublicVapidKey("AIzaSyDDZxC7lwp6hX-0dty6wVnq9AUA2H1BRO4");
// var db = firebase.firestore();
// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);



console.log(firebase.auth())



//let cUser;
firebase.auth().onAuthStateChanged(function (user) {
    console.log(user,"auth");
  //if (user) {
    //cUser = user;
    const messaging = firebase.messaging();
    //var defaultMessaging = admin.messaging();
    messaging.requestPermission().then(function () {
      console.log('Notification permission granted.');
      return messaging.getToken();
    }).then(function (token) {
      // Displaying user token
      console.log('token >>>> ', token);
      // firestore.collection("tbluserst").doc(user.uid)
      //   .update({
      //     token : token
      //   })
    }).catch(function (err) { // Happen if user deney permission
      console.log('Unable to get permission to notify.', err);
    });
  // } else {
  //   // User is signed out.
  //   // ...
  // }
});

//  const messaging = firebase.messaging();
//   //messaging.usePublicVapidKey("BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu");
//   messaging.requestPermission().then(function() {
//      //getToken(messaging);
//      return messaging.getToken();
//   }).then(function(currentToken){
//   console.log(currentToken,"token");
//   //displayNotification();
//   //localStorageService.set('fcmtoken',currentToken);
  
  

//   })
// .catch(function(err) {
//   console.log('Permission denied', err);
// });


function GetUserId(){

    if(localStorage.getItem("CurrentuseR") === null){
        return '';
    }else{
        return localStorage.getItem("CurrentuseR");
    }

}

function checkLoad(){

    if(localStorage.getItem("CurrentuseR") === null){
    window.location = "login.html"
};

}

    /// signup with firebase!!
    function OLXsignUp() {
        
        
        var name = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("pwd").value;
        var status = "free";
        var currentdate = new Date();
  var time = currentdate.getDay() + "/"+currentdate.getMonth()+ "/" + currentdate.getFullYear() + " "+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

        var role = 'user';

        if (name.length > 0 && email.length > 0 && password.length > 0) {

            //alert('all ok');

            auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                //alert("Registration Successful");
                //console.log("res=>", res.user.uid);
                var CurrentuseR =  res.user.uid;

                db.collection("tblusers").doc(res.user.uid).set({ name, email, password , role , status , time })
                    .then(() => {
                        localStorage.setItem("CurrentuseR",CurrentuseR);
                        localStorage.setItem("CurrentuseRName",name);
                        window.location = "viewadvert.html"
                        //console.log('insert in Database');
                    }).catch((e) => {
                        console.error("Unable to insert in Database");
                    })
            }).catch((error) => {
                var errCode = error.code;
                var errMessage = error.message;
                console.log(errMessage);
            })


        }
        else{
            alert('please insert properly');
        }
            
        }




function LoginLoad(){
    window.localStorage.removeItem("CurrentuseR");
    window.localStorage.removeItem("CurrentuseRName");
    window.localStorage.removeItem("Chatid");
    window.localStorage.removeItem("adUserId");
    window.localStorage.removeItem("openadvert");
    window.localStorage.removeItem("favouriteArr");

}
function OLXLogiN(){  

        var email = document.getElementById("email").value;
        var password = document.getElementById("pwd").value;
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                //console.log(res);
                
                //console.log(res.user.uid);
                //console.log(res.user.name);
                 localStorage.setItem("CurrentuseR",res.user.uid);
                // localStorage.setItem("CurrentuseRName",name);
                 window.location = "viewadvert.html"
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            })

}


function push(){

    var original = "sadasdasd";
        db.collection("messages").add({ original })
            .then((res) => {

            })
            .catch((error) => {
                var errMessage = error.message;
                console.log(errMessage);
            })


}


function AddCategory() {
    
        var categories = document.getElementById("category").value;
        var userid = GetUserId(); 
        db.collection("tblcategories").add({ userid , categories })
            .then((res) => {
                //console.log(res);
                //window.location = "index.html";
                //alert("Category inserted Successfully");
                var r = confirm("Category inserted Successfully!! Do you want to add More!");
                if (r == true) {
                    categories = '';
                } else {
                    window.location = "viewadvert.html";
                }

            })
            .catch((error) => {
                var errMessage = error.message;
                console.log(errMessage);
            })
    }

function fetchCategories() {

    var cat = document.getElementById("categories");

    db.collection("tblcategories").get()
        .then((query) => {
            query.forEach((doc) => {
                //console.log(doc.data());
                var cretaeOption = document.createElement("option");
                cretaeOption.innerHTML = doc.data().categories;
                cat.appendChild(cretaeOption);

            })

        })

}



function PostAdd() {

        var name = document.getElementById("name").value;
        var price = document.getElementById("price").value;
        var categories = document.getElementById("categories");
        var category = categories.options[categories.selectedIndex].value;
        var description=document.getElementById("description").value;

        var model=document.getElementById("model").value;

        var years = document.getElementById("year");
        var year = years.options[years.selectedIndex].value;

        var img64 = document.getElementById("fileap");
        //console.log(name,category,description,model,year,encodeImagetoBase64(img));
        var userid = GetUserId(); 


//var fl = document.getElementById("fileap");
// You can then get the data URL when the image got loaded:

     var file = img64.files[0];
      var reader = new FileReader();
     
      reader.onloadend = function() {
        var img = reader.result;
      db.collection("tblPostadd").add({userid, name,price,category,description,model,year,img})
        .then((res)=>{
            //console.log(res);
            //window.location="home.html";
            
            var r = confirm("Post Published Successfully!! Do you want to add More!");
                if (r == true) {
                    window.location = "postadd.html";
                } else {
                    window.location = "viewadvert.html";
                }

        })
        .catch((error)=>{
            var errMessage = error.message;
            console.log(errMessage);
       
        })
        
      }
      
      reader.readAsDataURL(file);

            
        //console.log(encodeImagetoBase64(img));
        // var imgb64 = encodeImagetoBase64(img);
        






}


function singleload(){

  if(localStorage.getItem("openadvert") === null){
       window.location = "viewadvert.html"
    }
    else{

      getPostSingleAdvert(localStorage.getItem("openadvert"));

    }

    
  }


function openadvert(id) {

    localStorage.setItem("openadvert",id);

    if(localStorage.getItem("openadvert") === null){
        localStorage.setItem("openadvert",id);
    }else{
        window.location = "singleadd.html"
    }
    
}


var favouriteArr ='';
function favourite()
{
   
    var CurrentuseR = localStorage.getItem("CurrentuseR");
    db.collection("tblfavourite").where("CurrentuseR", "==", CurrentuseR).get()
    .then((query)=>{
        query.forEach(((doc)=>{
           
           var favimage = document.getElementById('favimage'+doc.data().advertId);
            favimage.src = "images/redheart.png";
            favouriteArr += doc.data().advertId + ',';
        }))
    })


}



setTimeout(function(){ 

    if (favouriteArr.length >0) {
        localStorage.setItem('favouriteArr',favouriteArr);
    }
    else{
        favourite();
        localStorage.setItem('favouriteArr',favouriteArr);
    }

     }, 5000);

function Myfavourite()
{
   
    var CurrentuseR = localStorage.getItem("CurrentuseR");
    var favourite = localStorage.getItem("favouriteArr");;
    var imagerow = document.getElementById('favimagerow')
             imagerow.innerHTML = '';

    db.collection("tblPostadd").get()
    .then((query)=>{
        query.forEach(((doc)=>{
           


          
            var favouriteArr = favourite.split(",");
            for (var i = 0; i < favouriteArr.length; i++) {
                
                if (favouriteArr[i].length > 0 && favouriteArr[i] == doc.id) {

                    imagerow.innerHTML += `<div class="col-md-4" >
            <div class="imagediv">
            <h3>${doc.data().name} - Rs ${doc.data().price}</h3>
      <div class="thumbnail">
          <img onclick="openadvert('${doc.id}')" style="width: 200px; height: 200px;" src="${doc.data().img}" alt="${doc.data().name}">
          <div class="caption">
            <p>${doc.data().category}</p>
             <p>${doc.data().description}</p>
             <img id="favimage${doc.id}" style="width: 25px; height: 25px;" src="images/redheart.png" alt="favourite">
          </div>
      </div>
      </div>
    </div>`;

            }
            

            }
            


        }))
    })


}


function makefavourite(advertId){

var CurrentuseR = localStorage.getItem("CurrentuseR");
//var currentdate = Date.now();
var currentdate =  new Date();
  var time = currentdate.getDay() + "/"+currentdate.getMonth()+ "/" + currentdate.getFullYear() + " "+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

db.collection('tblfavourite').add({
        CurrentuseR: CurrentuseR,
        advertId:advertId,
        status: 'busy',
        createdAt: time
    }).then(res => {
        
        var favimage = document.getElementById('favimage'+advertId);
        favimage.src = "images/redheart.png";
    })

}

function getPostAdvert(){
    //var table=document.getElementById("display");

    var imagerow = document.getElementById('imagerow')
             imagerow.innerHTML = '';

    db.collection("tblPostadd").get()
    .then((query)=>{
        query.forEach(((doc)=>{
            imagerow.innerHTML += `<div class="col-md-4" >
            <div class="imagediv">
            <h3>${doc.data().name} - Rs ${doc.data().price}</h3>
      <div class="thumbnail">
          <img onclick="openadvert('${doc.id}')" style="width: 200px; height: 200px;" src="${doc.data().img}" alt="${doc.data().name}">
          <div class="caption">
            <p>${doc.data().category}</p>
             <p>${doc.data().description}</p>
             <img id="favimage${doc.id}" onclick="makefavourite('${doc.id}')" style="width: 25px; height: 25px;" src="images/blackheart.png" alt="favourite">
            <button type="button" onclick="openadvert('${doc.id}')" id="btncontact" class="registerbtn">Contact Seller</button>
          </div>
      </div>
      </div>
    </div>`;


                        


        }))
    })


    //load favourite
    favourite();
}

function getPostAdvertIndex(){
    //var table=document.getElementById("display");
    db.collection("tblPostadd").get()
    .then((query)=>{

        //console.log(query,'query');
        query.forEach(((doc)=>{
            //console.log(doc.data());
            //console.log(doc.id);
            var imagerow = document.getElementById('imagerow')
            imagerow.innerHTML += `<div class="col-md-4">
            <div class="imagediv">
            <h3>${doc.data().name} - Rs ${doc.data().price}</h3>
      <div class="thumbnail">
          <img style="width: 200px; height: 200px;" src="${doc.data().img}" alt="${doc.data().name}">
          <div class="caption">
            <p>${doc.data().category}</p>
             <p>${doc.data().description}</p>
             <button type="button" onclick="openadvert('${doc.id}')" id="btncontact" class="registerbtn">Contact Seller</button>
          </div>
      </div>
      </div>
    </div>`;


        }))
    })
}

function getPostSingleAdvert(postid){
    //var table=document.getElementById("display");
    db.collection("tblPostadd").get()
    .then((query)=>{
        query.forEach(((doc)=>{
            //console.log(doc.data());

            if (doc.id == postid) {

            localStorage.setItem("adUserId",doc.data().userid);

            var imagerow = document.getElementById('imagerow')
            imagerow.innerHTML += `<div>
            <h3>${doc.data().name} - Rs ${doc.data().price}</h3>
      <div class="thumbnail">
          <img src="${doc.data().img}" alt="${doc.data().name}">
          <div class="caption">
            <p>${doc.data().category}</p>
             <p>${doc.data().description}</p>
          </div>
      </div>
    </div>`;
}

        }))
    })


    

    setTimeout(function(){ 

        if (localStorage.getItem("Chatid") === null) {

                initChaat();
            }
            else{
                getMessages();
            }


         }, 3000);


}




function getChatRoom(){

    var CurrentuseR = localStorage.getItem('CurrentuseR');
    db.collection("tblrooms").where("adUserId", "==", CurrentuseR).get()
    .then((query)=>{
        query.forEach(((doc)=>{
            console.log(doc.data());

            var imagerow = document.getElementById('imagerow')
            imagerow.innerHTML += `<div>

      <div onclick="chatopen('${doc.data().advertId}','${doc.id}')" class="thumbnail">
          <img src="images/chatroom.png" alt="ChatRoom">
          <div class="caption">
            <p>${doc.id}</p>
          </div>
      </div>
    </div>`;


        }))
    })

}

function chatopen(advertId,Chatid){

    localStorage.setItem("openadvert",advertId);
    localStorage.setItem("Chatid",Chatid);
    localStorage.setItem("user","admin");
    window.location.assign('singleadd.html');

}




function FetchSearchPost(){
    
    
    //var search=document.getElementById("name").value;
    var categories = document.getElementById("categories");
    var category = categories.options[categories.selectedIndex].value;

    
    if (category != "select") {
        
                var imagerow = document.getElementById('imagerow')
                    imagerow.innerHTML = '';

                db.collection("tblPostadd").where("category", "==", category).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    //console.log(doc.data());

                    
                        imagerow.innerHTML += `<div class="col-md-4">
                        <div class="imagediv">
                        <h3>${doc.data().name} - ${doc.data().category}</h3>
                  <div class="thumbnail">
                      <img onclick="openadvert('${doc.id}')" style="width: 200px; height: 200px;" src="${doc.data().img}" alt="${doc.data().name}">
                      <div class="caption">
                        <p>${doc.data().description}</p>
                        <img id="favimage${doc.id}" onclick="makefavourite('${doc.id}')" style="width: 25px; height: 25px;" src="images/blackheart.png" alt="favourite">
                        <button type="button" onclick="openadvert('${doc.id}')" id="btncontact" class="registerbtn">Contact Seller</button>
                      </div>
                  </div>
                  </div>
                </div>`;


                });
            });

         //load favourite
        favourite();

}   
    else{

        getPostAdvert();
    }


}



function GetUsers()
{
    var users = document.getElementById('users');
    var CurrentuseR = localStorage.getItem("CurrentuseR");
    db.collection("tblrooms").where("adUserId", "==", CurrentuseR).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.innerHTML += `<h4>CurrentRooms <a onclick="initChaatAdmin('${doc.id}')">${doc.id}</a></h4>`;
                })
            })


}



function initChaatAdmin(Chatid){

var Chatid = localStorage.setItem("Chatid",Chatid);
getMessages();
}



function initChaat() {
    //Creating room info
    var CurrentuseR = localStorage.getItem("CurrentuseR");
    var adUserId = localStorage.getItem("adUserId");
    var advertId = localStorage.getItem("openadvert");


if (CurrentuseR != adUserId) {

    localStorage.setItem("user","user");

            var currentdate = new Date();
  var time = currentdate.getDay() + "/"+currentdate.getMonth()+ "/" + currentdate.getFullYear() + " "+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();


    db.collection('tblrooms').add({
        CurrentuseR: CurrentuseR,
        adUserId: adUserId,
        advertId:advertId,
        status: 'busy',
        createdAt: time
    }).then(res => {
        console.log('Chat Init Successfully', res.id);
        localStorage.setItem("Chatid", res.id);
    })


    }else{     localStorage.setItem("user","admin"); }
}



function ChatUser(){

  var message = document.getElementById('txtmessageuser').value;
  var senderid = localStorage.getItem("CurrentuseR");
  var currentRoom = localStorage.getItem("Chatid");

  var sender = localStorage.getItem("user");


  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+currentdate.getMonth()+ "/" + currentdate.getFullYear() + " "+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

  db.collection('tblmessages').add({currentRoom,message, senderid,sender,datetime})
                .then(() => {
                    console.log('buyer Message sent ');
                })
                .catch((e) => {
                    console.log('error Adding in db');
                })



message ='';
}

function ChatAdmin(){

  var message = document.getElementById('txtmessageuser').value;
  var senderid = localStorage.getItem("CurrentuseR");
  var currentRoom = localStorage.getItem("Chatid");

  var sender = 'seller';
  var currentdate = new Date();
  var datetime = currentdate.getDay() + "/"+currentdate.getMonth()+ "/" + currentdate.getFullYear() + " "+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();


  db.collection('tblmessages').add({currentRoom,message, senderid,sender,datetime})
                .then(() => {
                    console.log('Seller Message sent ');
                })
                .catch((e) => {
                    console.log('error Adding in db');
                })

message ='';
}


function getMessages(){

//var username = localStorage.getItem("CurrentuseRName");
var chatdiv = document.getElementById('chatdiv');
chatdiv.innerHTML = '';
  // db.collection('tblmessages')
  //   .onSnapshot((docs) => {
  //       docs.forEach((doc) => {


var Chatid = localStorage.getItem("Chatid");
db.collection("tblmessages").where("currentRoom", "==", Chatid).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {


                        chatdiv.innerHTML += `<li class="left clearfix"><span class="chat-img pull-left">
                            <img src="logo.png" style="height: 50px; width: 50px;" alt="Buyer" class="img-circle" />
                        </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">${doc.data().sender}</strong> <small class="text-muted"></small>
                                </div>
                                <p>${doc.data().message}</p></div></li>`; 
        })
    })

}




function displayNotification() {

  var dmessage = document.getElementById("message").value;

  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: dmessage,
        icon: 'logo.jpg',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      reg.showNotification("Olx Notification", options);
    });
  }
}



messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});



if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('../service-worker.js')
             .then(function() { 
                console.log('Service Worker Registered'); 
            });
}