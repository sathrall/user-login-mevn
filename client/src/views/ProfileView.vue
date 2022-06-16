<template>
    <div class="profile page">
        <div class="centered hero section">
            <h1>Hey look ma!</h1>
            <h3>I made it!</h3>
        </div>
        <div class="condensed section" v-if="user">
            <p>username: {{ user.username }}</p>
            <p>email: {{ user.email }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters(['user']),
    methods: {
        ...mapActions(['getProfile'])
    },
    created() {
        this.getProfile()
    }

}
</script>

<style>

</style>