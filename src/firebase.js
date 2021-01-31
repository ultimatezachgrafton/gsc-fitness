import firebase from 'firebase/app'
import 'firebase/auth'
require("firebase/firestore");

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

let db = firebase.firestore(app);
const user = app.auth().currentUser;
const colRef = db.collection("users");

export async function getCurrentUserEmail() {
    if (user !== null) {
        return user.email;
    }
}

export async function getUserData(emailRef) {
    // find database matching emailRef
    if (user !== null) {
        return user.displayName;
    }
}

export async function searchUserDatabase() {
    let userList = [];

    await colRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            db.collection("users").onSnapshot((snapshot) => {
                snapshot.forEach((doc) => userList.push({
                    ...doc.data(), id: doc.id, email: doc.email,
                    phone: doc.phone, isAdmin: doc.isAdmin
                }));
                console.log(userList);
            });
        });
    });
    console.log(userList);
    return userList;
}

// Initially adds user's doc to that collection
export async function updateUserDataFromSignUp(nameRef, phoneRef, emailRef) {
    const docRef = db.collection("users").doc(emailRef);
    docRef.set({
        name: nameRef,
        phone: phoneRef,
        email: emailRef
    }).then(function () {
        console.log("saved");
    }).catch(function (error) {
        console.log("error");
    });
}

// Updates an existing user's data
export async function updateUserDataFromProfile(phoneRef) {
    const emailRef = await getCurrentUserEmail();

    if (emailRef !== null) {
        let docRef = db.collection("users").doc(emailRef);
        docRef.update({
            phone: phoneRef
        }).then(function () {
            console.log("saved");
        }).catch(function (error) {
            console.log("error");
        });
    }
}

export async function checkAdminStatus(emailRef) {
    if (emailRef !== null) {
        let docRef = db.collection("users").doc(emailRef);
        return docRef.isAdmin;
    }
}

export const auth = app.auth();
export default app;