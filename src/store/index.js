import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        users: []
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setUsers(state, payload) {
            state.users = payload
        }
    },
    actions: {
        signUserUp({ commit }, payload) {

            var usersRef = firebase.firestore().collection("usuarios").doc(payload.email);
            usersRef.get().then(doc => {
                if (doc.exists) {
                    //let newUser = doc.data()
                    //console.log(newUser)
                    //console.log("The email address is already in use by another account.")
                    alert("The email address is already in use by another account.")
                } else {
                    var today = new Date();
                    var date = (today.getFullYear()+2) + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    let user = {
                        name: payload.name,
                        lastname: payload.lastname,
                        email: payload.email,
                        dependency: payload.dependency,
                        password: payload.password,
                        validuntil: date,
                        active: "true",
                    }
                    usersRef.set(user)
                    commit('setUser', user)
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
                        commit('setUser', newUser)
                        this.router.push('/Users') 
                        //this.dispatch('getAllInfo')
                    } else {
                        //console.log("Wrong credentials")
                        alert("Wrong credentials")
                    }
                } else {
                    //console.log("The email address is not registered in the system.")
                    alert("The email address is not registered in the system.")
                }
            })
        },
        logout({ commit }) {
            commit('setUser', null)
        },
        getUsers({ commit }) {
            let users = []
            firebase.firestore().collection("usuarios").get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        users.push(doc.data())
                    })
                });
            console.log(users)
            commit('setUsers', users)
        },
        getAllInfo() {
            this.dispatch('getUsers')
        },
        saveUser({ commit }, payload) {
            firebase.firestore().collection("usuarios").doc(payload.email).set(payload)
            this.dispatch('getUsers')
        },
        deleteUser({ commit }, payload){
            firebase.firestore().collection("usuarios").doc(payload.email).delete()
            this.dispatch('getUsers')
        },
        loadDb({ commit }, payload){
            payload.forEach(x =>{
                firebase.firestore().collection("usuarios").doc(x.email).set(x)
            })
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        users(state) {
            return state.users
        }
    },
    plugins: [createPersistedState()]
})