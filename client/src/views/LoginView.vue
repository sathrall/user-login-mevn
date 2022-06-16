<template>
    <div class="condensed section">
        <div class="login small centered panel">
            <form @submit.prevent="loginUser" class="login form">
                <div class="header">
                    <h3>Login</h3>
                </div>
                <div class="body">
                    <div class="input field" v-bind:class="{'danger': error && error.username}">
                        <div class="error" v-if="error && error.username">
                            {{ error.username }}
                        </div>
                        <input type="text" placeholder="Username" name="username" v-model="user.username">
                    </div>
                    <div class="input field" v-bind:class="{'danger': error && error.password}">
                        <div class="error" v-if="error && error.password">
                            {{ error.password }}
                        </div>
                        <input type="password" placeholder="Password" name="password" v-model="user.password">
                    </div>
                    <div class="submit field">
                        <input type="submit" class="primary block button" value="Login"/>
                    </div>
                </div>
                <div class="footer">
                    <p>Don't have an account? <a href="/register">Sign up</a></p>
                    <p>Forgot your password? <a href="/forgot-password">Reset it</a></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    created() {
        this.$store.state.Auth.error = null
    },
    computed: {
        ...mapGetters(['error'])
    },
    methods: {
        ...mapActions(['login']),

        loginUser() {
            this.login(this.user)
                .then(res => {
                    if (res.data.success) {
                        this.$router.push('/profile')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>