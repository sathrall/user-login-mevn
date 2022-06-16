<template>
    <div class="condensed section">
        <div class="login small centered panel">
            <form @submit.prevent="registerUser" class="login form">
                <div class="header">
                    <h3>Sign Up</h3>
                </div>
                <div class="body">
                    <div class="input field" v-bind:class="{'danger': error && error.username}">
                        <div class="error" v-if="error && error.username">
                            {{ error.username }}
                        </div>
                        <input type="text" placeholder="Username" name="username" v-model="user.username">
                    </div>
                    <div class="input field" v-bind:class="{'danger': error && error.email}">
                        <div class="error" v-if="error && error.email">
                            {{ error.email }}
                        </div>
                        <input type="text" placeholder="Email" name="email" v-model="user.email">
                    </div>
                    <div class="input field" v-bind:class="{'danger': error && error.password}">
                        <div class="error" v-if="error && error.password">
                            {{ error.password }}
                        </div>
                        <input type="password" placeholder="Password" name="password" v-model="user.password">
                    </div>
                    <div class="input field" v-bind:class="{'danger': error && error.confirm_password}">
                        <div class="error" v-if="error && error.confirm_password">
                            {{ error.confirm_password }}
                        </div>
                        <input type="password" placeholder="Confirm Password" name="confirm_password" v-model="user.confirm_password">
                    </div>
                    <div class="submit field">
                        <button class="primary block button">Sign Up</button>
                    </div>
                </div>
                <div class="footer">
                    <p>Already have an account? <a href="/login">Login</a></p>
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
                email: '',
                password: '',
                confirm_password: ''
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
        ...mapActions(['register']),

        registerUser() {
            this.register(this.user)
                .then(res => {
                    if (res.data.success) {
                        this.$router.push('/login')
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