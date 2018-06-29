const functions = require('firebase-functions');
const admin = require('firebase-admin') ;
// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
admin.initializeApp();


exports.newSubscriberNotification = functions.firestore
    .document('earthquake/{number}')
    .onCreate((data) => {
        console.log(data) ;
        // location : string = data.get('loc') ;
        console.log(data.get('loc'));
        const payload = {
            notification: {
                title: '가주아아아아아앗',
                body: `짜라잔잔잔 {number}`,
                icon: 'https://goo.gl/Fz9nrQ'
            }
        }
        // const db = admin.firestore();
        // const devicesRef = db.collection('devices').where('userId', '==', "testUser");

        // const devices = db.collection('devices').onSnapshot() ;

        // get the user's tokens and send notifications
        // const devices = db.collection('devices').where('userId', '==', "testUser").get();
        // const deviceList = db.collection('devices', ref => ref.where("userId", "==", "testUser")).valuechange().subscribe(data => {
        //     console.log("-99-") ;
        //     console.log(data) ;
        //     console.log("-100-") ;
        // }) ;

        // console.log("-1-") ;
        // console.log(devices) ;
        // console.log("-2-") ;
        // // devices = await devices.get() ;

        // const tokens = [];

        // send a notification to each device token

        // devices.forEach(result => {
        //     const token = result.data().token;
        //     tokens.push( token );
        // }) ;

        // return admin.messaging(payload);
        // return admin.messaging().send(payload) ;
        // return admin.messaging().sendToTopic("all", payload) ;
        return admin.messaging().sendToDevice("all", payload);
}) ;
