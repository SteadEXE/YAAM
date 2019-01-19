<template>
    <div>
        <div class="row mb-4">
            <div class="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-12">
                <configuration></configuration>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-12">
                <logs></logs>
            </div>
        </div>
    </div>
</template>

<script>
    import Configuration from '@/components/updater/Configuration'
    import Logs from '@/components/updater/Logs'

    export default {
        components: { Configuration, Logs }
    }
</script>