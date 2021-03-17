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
    if (user !== null) {
        console.log(user + user.email)
        return user.email;
    }
}

// Find matching emailRef
export async function getUserData(emailRef) {
    let data;
    if (emailRef !== null) {
        await db.collection("users").doc(emailRef).get().then((doc) => {
            if (doc.exists) {
                data = doc.data();
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    return data;
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
    return users;
}

export async function searchWorkoutDatabase(emailRef) {
    const workouts = [];
    if (emailRef !== null) {
        // fetch data
        await colRef.doc(emailRef).collection("workouts").orderBy("created", "desc").limit(3)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                    workouts.push(doc.data());
                });
            }).catch((error) => {
                console.log("Error getting document:", error);
            });;
    }
    return workouts;
}

// Adds workout to client's collection
export async function addClientWorkoutData(clientEmailRef, textRef) {
    db.collection("users").doc(clientEmailRef).collection("workouts").add({
        email: clientEmailRef,
        text: textRef,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        createdString: firebase.firestore.FieldValue.serverTimestamp().toString()
    }).then(function () {
        console.log("saved");
    }).catch(function (error) {
        console.log("error");
    });
}

export async function searchNutritionDatabase(emailRef) {
    const nutrition = [];
    console.log(emailRef)
    if (emailRef !== null) {
        // fetch data
        await colRef.doc(emailRef).collection("nutrition").orderBy("created", "desc").limit(3)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                    nutrition.push(doc.data());
                });
            }).catch((error) => {
                console.log("Error getting document:", error);
            });;
    }
    return nutrition;
}

// Adds nutrition plan to client's collection
export async function addNutritionPlanData(clientEmailRef, textRef) {
    colRef.doc(clientEmailRef).collection("nutrition").add({
        email: clientEmailRef,
        text: textRef,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        createdString: firebase.firestore.FieldValue.serverTimestamp().toString()
    }).then(function () {
        console.log("saved");
    }).catch(function (error) {
        console.log("error");
    });
}

export async function searchMessageDatabase(emailRef) {
    const messages = [];
    // fetch data
    await colRef.doc(emailRef).collection("messages").orderBy("created", "desc")
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                messages.push(doc.data());
            });
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    return messages;
}

// Sends message to recipient
export function sendMessageFromInbox(emailRef, recipientRef, textRef) {
    colRef.doc(recipientRef).collection("messages").add({
        senderEmail: emailRef,
        text: textRef,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        createdString: firebase.firestore.FieldValue.serverTimestamp().toString(),
        isUnread: true
    }).then(function () {
        console.log("saved");
    }).catch(function (error) {
        console.log("error");
    });
}

// Updates isUnread field
export function updateIsUnread(recipientRef) {
    colRef.doc(recipientRef).collection("messages").add({
        isUnread: false
    }).then(function () {
        console.log("saved");
    }).catch(function (error) {
        console.log("error");
    });
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

// Checks if logged-in user has admin privileges
export async function checkAdminStatus(emailRef) {
    let status = false;

    if (emailRef !== null) {
        await colRef.doc(emailRef).get().then((doc) => {
            if (doc.exists) {
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

export const auth = app.auth();
export default app;