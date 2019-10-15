import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        users: [],
        dependencies: []
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setUsers(state, payload) {
            state.users = payload
        },
        setDependencies(state, payload) {
            state.dependencies = payload
        }
    },
    actions: {
        signUserUp({ commit }, payload) {

            var usersRef = firebase.firestore().collection("usuarios").doc(payload.email);
            usersRef.get().then(doc => {
                if (doc.exists) {
                    alert("The email address is already in use by another account.")
                } else {
                    var today = new Date();
                    var date = (today.getFullYear() + 2) + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                    let user = {
                        name: payload.name,
                        lastname: payload.lastname,
                        email: payload.email,
                        dependency: payload.dependency,
                        password: CryptoJS.MD5(payload.password).toString(CryptoJS.enc.Hex),
                        validuntil: date,
                        active: "true",
                    }

                    let dependency = {};
                    let depRef = firebase.firestore().collection("dependencies").doc(payload.dependency);
                    depRef.get().then(function (doc) {
                        if (doc.exists) {
                            dependency = doc.data();
                            if (dependency.max_users > dependency.users.length) {
                                dependency.users.push(payload.email);
                                depRef.set(dependency)
                                usersRef.set(user)
                                commit('setUser', user)

                                alert("User successfuly created")
                            } else {
                                alert("Dependency full!!")
                            }

                        }
                    });
                }
            })
        },
        signUserIn({ commit }, payload) {
            var usersRef = firebase.firestore().collection("usuarios").doc(payload.email);
            usersRef.get().then(doc => {
                if (doc.exists) {
                    let newUser = doc.data()
                    let password = CryptoJS.MD5(payload.password).toString(CryptoJS.enc.Hex)
                    if (password === newUser.password) {
                        commit('setUser', newUser)
                        router.push('/Users')
                    } else {
                        alert("Wrong credentials")
                    }
                } else {
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
            commit('setUsers', users)
        },
        getAllInfo() {
            this.dispatch('getUsers')
        },
        saveUser({ commit }, payload) {
            let userRef = firebase.firestore().collection("usuarios").doc(payload.email);
            userRef.get().then(function (doc) {
                if (doc.exists) {
                    let user = doc.data();
                    if (user.dependency != payload.dependency) {

                        let depRef = firebase.firestore().collection("dependencies").doc(payload.dependency);
                        depRef.get().then(function (doc2) {
                            if (doc2.exists) {
                                let dependency = doc2.data();
                                if (dependency.max_users > dependency.users.length) {
                                    dependency.users.push(payload.email);
                                    let dependendyRef = firebase.firestore().collection("dependencies").doc(user.dependency);
                                    dependendyRef.get().then(function (doc3) {
                                        if (doc3.exists) {
                                            let dependency2 = doc3.data();
                                            var array = dependency2.users;
                                            let deleted = false;
                                            for (let i = 0; i < array.length && !deleted; i++) {
                                                if (array[i] == payload.email) {
                                                    array.splice(i, 1);
                                                    deleted = true;
                                                }
                                            }
                                            
                                            dependendyRef.set(dependency2)
                                            depRef.set(dependency) 
                                            userRef.set(payload)                                         
                                            alert("Saved successful!!")
                                        }
                                    })
                                } else {
                                    alert("Dependency full!!")
                                }

                            }
                        });
                    } else {
                        userRef.set(payload);
                        alert("Saved successful!!")
                    }

                } else {
                    let depRef = firebase.firestore().collection("dependencies").doc(payload.dependency);
                    depRef.get().then(function (doc) {
                        if (doc.exists) {
                            let dependency = doc.data();
                            if (dependency.max_users > dependency.users.length) {
                                dependency.users.push(payload.email);
                                depRef.set(dependency)
                                userRef.set(payload);

                                alert("User successfuly created")
                            } else {
                                alert("Dependency full!!")
                            }

                        }
                    });
                }
            });
            this.dispatch('getUsers')
        },
        deleteUser({ commit }, payload) {

            let dependency = {};
            let depRef = firebase.firestore().collection("dependencies").doc(payload.dependency);
            depRef.get().then(function (doc) {
                if (doc.exists) {
                    dependency = doc.data();
                    var array = dependency.users;
                    let deleted = false;
                    for (let i = 0; i < array.length && !deleted; i++) {
                        if (array[i] == payload.email) {
                            array.splice(i, 1);
                            deleted = true;
                        }
                    }
                    depRef.set(dependency)
                }
            });

            firebase.firestore().collection("usuarios").doc(payload.email).delete()
            this.dispatch('getUsers')
            alert("Successful deletion!!")
        },
        loadDb({ commit }, payload) {
            payload.forEach(x => {
                firebase.firestore().collection("usuarios").doc(x.email).set(x)
            })
        },
        // Dependencies Actions
        getDependencies({ commit }) {
            let dependencies = []
            firebase.firestore().collection("dependencies").get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        dependencies.push(doc.data())
                    })
                });
            commit('setDependencies', dependencies)
        },
        deleteDependency({ commit }, payload) {
            if (payload.users.length === 0) {
                firebase.firestore().collection("dependencies").doc(payload.name).delete()
                this.dispatch('getDependencies')
                alert("Successful deletion!!")
            } else {
                alert("This dependency contains users")
            }

        },
        saveDependency({ commit }, payload) {
            firebase.firestore().collection("dependencies").doc(payload.name).set(payload)
            this.dispatch('getDependencies')
            alert("Saved successful!!")
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        users(state) {
            return state.users
        },
        dependencies(state) {
            return state.dependencies
        }
    },
    plugins: [createPersistedState()]
})