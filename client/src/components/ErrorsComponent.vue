<template>
    <div class="alert danger">
        <div v-for="error in errors" :key="error">{{ error }}</div>
    </div>
</template>

<script>
export default {
    name: 'ErrorsComponent',
    props: ['errors'],
    created() {
        console.log(this.errors.password)
    }
}
</script>

<style lang="scss" scoped>
.alert {
    color: #ffffff;
    padding: 5px;
    margin-bottom: 13px;

    &.danger {
        background-color: #dc3545;
    }
}
</style>