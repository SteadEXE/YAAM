<template>
    <div>
        <navigation></navigation>
        <router-view></router-view>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import '@fortawesome/fontawesome-free/css/all.css'

    import Navigation from '@/components/Navigation'

    export default {
        components: { Navigation }
    }
</script>

<style>
    body {
        margin: 70px;
    }
</style>