import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  groupRef = null;
  userRef = null;
  // initialize Firebase Backend
  constructor() {
    firebase.initializeApp({
        apiKey: "AIzaSyAVLvCnu0aAod-wF_LnPT23o7P0ZPwrB7M",
        authDomain: "testproject-13814.firebaseapp.com",
        databaseURL: "https://testproject-13814.firebaseio.com",
        projectId: "testproject-13814",
        storageBucket: "testproject-13814.appspot.com",
        messagingSenderId: "54075429555"
    });
    /*firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        });
      }
    });*/
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

  signInWithEmail(email, password, callback) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
        callback();
      } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
          alert(error.message);
        });
      }
    });
  }

  signUpWithEmail(state, props,  callback) {
     firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
        callback(this.uid, state, props);
      } else {
        firebase.auth().createUserWithEmailAndPassword(state.email, state.password).catch(function(error) {
        alert(error.message);
        });
      }
    });
      
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      alert("SignOut Successful");
    }).catch(function(error) {
      alert(error.message);
});
  }

  // retrieve the messages from the Backend
  loadMessages(groupId, callback) {
    this.messagesRef = firebase.database().ref('messages/' + groupId);
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }

  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }

  loadGroups(callback) {
      this.groupRef = firebase.database().ref('groups');
      this.groupRef.off();
      const onReceive = (data) => {
          const groupName = data.val();
          callback({
              _id:data.key,
              title:groupName.title
          });
      };
      this.groupRef.limitToLast(20).on('child_added', onReceive);
  }

  loadGroups1(callback) {
    this.userRef = firebase.database().ref('users/' + this.uid + '/groups')
    this.userRef.on('value', function(snapshot) {
       for (eachGroup in Object.keys(snapshot.val())){
         this.groupRef.child(eachGroup).on('value', function(snapshot) {
           console.log(snapshot.val())
         })
       }
      /*snapshot.val().map((data) => (
          console.log(data)
      ))*/
    })
  }

  addGroup(groupTitle){
      group = {
          title:groupTitle,
          members : [this.uid]
      }
      this.groupRef.push(group);
      this.userRef = firebase.database().ref('users');
      this.userRef.child(this.uid).child('groups').push(group)
  }

  closeGroup() {
    if (this.groupRef) {
      this.groupRef.off();
    }
  }

  addUser(uid, user) {
    this.userRef = firebase.database().ref('users');
    this.userRef.child(uid).set(user);
  }
}

export default new Backend();