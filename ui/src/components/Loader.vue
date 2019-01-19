<template>
    <div class="text-center" v-if="show">
        <i class="fa fa-sync fa-spin my-4" id="loader"></i>
    </div>
</template>

<script>
    export default {
        props: {
            show: Boolean
        }
    }
</script>

<style>
    #loader {
        font-size: 20px;
    }
</style>