import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
                id: 'afajfjadfaadfa323',
                title: 'Meetup in New York',
                date: new Date(),
                location: 'New York',
                description: 'New York, New York!'
            },
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
                id: 'aadsfhbkhlk1241',
                title: 'Meetup in Paris',
                date: new Date(),
                location: 'Paris',
                description: 'It\'s Paris!'
            }
        ],
        user: null
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        createMeetup({ commit }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'kfdlsfjslakl12'
            }
            // Reach out to firebase and store it
            commit('createMeetup', meetup)
        },
        signUserUp({ commit }, payload) {

            var usersRef = firebase.firestore().collection("usuarios").doc(payload.email);
            usersRef.get().then(doc => {
                if (doc.exists) {
                    //let newUser = doc.data()
                    //console.log(newUser)
                    //console.log("The email address is already in use by another account.")
                    alert("The email address is already in use by another account.")
                } else {
                    usersRef.set(payload)
                    //console.log("User successfuly created")
                    alert("User successfuly created")
                }
            })



        },
        signUserIn({ commit }, payload) {
            var usersRef = firebase.firestore().collection("usuarios").doc(payload.email);
            usersRef.get().then(doc => {
                if (doc.exists) {
                    let newUser = doc.data()
                    //console.log(newUser)
                    if (payload.password === newUser.password) {
                        //console.log("Login succesfull!!!")
                        alert("Login succesfull!!!")
                    } else {
                        //console.log("Wrong credentials")
                        alert("Wrong credentials")
                    }
                } else {
                    //console.log("The email address is not registered in the system.")
                    alert("The email address is not registered in the system.")
                }
            })
        }
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user(state) {
            return state.user
        }
    }
})