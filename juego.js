  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAE9RGd24ufFlAAYhA4FyWXuoLv5pWzKGA",
    authDomain: "juego-48907.firebaseapp.com",
    projectId: "juego-48907",
    storageBucket: "juego-48907.appspot.com",
    messagingSenderId: "972250901118",
    appId: "1:972250901118:web:3addc7ce6f51b973f7c62f",
    measurementId: "G-QL3ZRLZYVS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  const signInWithGoogle = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithRedirect(googleProvider)
    .then(()=>{
      window.location.assign("./profile");
    })
    .catch(e => alert(e.message));
  }

  const signInWithGoogleButton = document.getElementById("signInWithGoogle");
  const auth = firebase.auth();

  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    
    promise.then(alert("Usuario registrado")).
    then(console.log("registrado")).
    catch(e => alert(e.message));
    
  }

  function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    
    promise.then(location.href = "a.html").
    then(console.log("ingresado")).
    catch(e => alert(e.message));

  }