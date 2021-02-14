import firebase from 'firebase/app';
import 'firebase/auth';
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

const db = firebase.firestore(app);
const user = app.auth().currentUser;
const colRef = db.collection("users");

export async function getCurrentUserEmail() {
    console.log("get current")
    if (user !== null) {
        console.log(user + user.email)
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
    const users = [];
    await colRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            users.push(doc.data());
        });
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    console.log(users);
    return users;
}

export async function checkAdminStatus(emailRef) {
    let status = false;

    if (emailRef !== null) {
        await colRef.doc(emailRef).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().isAdmin);
                status = doc.data().isAdmin;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    return status;
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
        colRef.doc(emailRef).update({
            phone: phoneRef
        }).then(function () {
            console.log("saved");
        }).catch(function (error) {
            console.log("error");
        });
    }
}

export const auth = app.auth();
export default app;