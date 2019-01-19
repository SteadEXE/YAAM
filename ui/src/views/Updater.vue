<template>
    <div>
        <div class="row mb-4">
            <div class="col-sm-6 offset-3">
                <configuration></configuration>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 offset-3">
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