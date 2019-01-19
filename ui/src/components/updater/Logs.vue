<template>
    <div class="card">
        <div class="card-header bg-primary text-light">
            <i class="fas fa-file-medical-alt mr-2"></i> Logs
        </div>
        <div class="card-body">
            <textarea class="w-100" rows="10" v-model="logs" id="updater-logs" readonly></textarea>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                busy: true,
                logs: '',
                timer: null
            }
        },
        beforeMount () {
            this.update()
        },
        beforeDestroy () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        methods: {
            async update () {
                this.busy = true

                let response = await axios.get('/api/updater/logs')
                let data = response.data

                if (this.logs !== data) {
                    this.logs = data

                    document.querySelector('#updater-logs').scrollTop = document.querySelector('#updater-logs').scrollHeight
                }

                this.busy = false
                this.timer = setTimeout(this.update.bind(this), 1000)
            }
        }
    }
</script>

<style>
    #updater-logs {
        background: #000000;
        color: #ffffff;
        padding: 5px;
        border: none;
        font-family: monospace;
    }
</style>