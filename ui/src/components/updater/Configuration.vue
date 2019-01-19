<template>
    <div class="card">
        <div class="card-header bg-primary text-light">
            <i class="fa fa-cog mr-2"></i> Updater
        </div>
        <div class="card-body">
            <loader :show="busy"></loader>
            <div v-if="!busy">
                <form @submit="submit">
                    <div class="form-group">
                        <label for="steam">
                            <i class="fas fa-hdd mr-2"></i> Path to steamcmd executable
                        </label>
                        <input type="text" class="form-control" id="steam" v-model="steam">
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="interval">
                                    <i class="fas fa-clock mr-2"></i> Update interval
                                </label>
                                <input type="number" class="form-control" id="interval" v-model="interval" min="1">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="enabled">
                                    <i class="fas fa-magic mr-2"></i> Automatic update
                                </label>
                                <select class="form-control" id="enabled" v-model="enabled">
                                    <option value="true">Enabled</option>
                                    <option value="false">Disabled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary btn-block">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Loader from '@/components/Loader'

    export default {
        components: { Loader },
        data () {
            return {
                busy: true,
                interval: 5,
                enabled: true,
                steam: ''
            }
        },
        beforeMount () {
            this.reload()
        },
        methods: {
            async submit (event) {
                event.preventDefault()
                this.busy = true

                let response = await axios.post('/api/updater', {
                    interval: this.interval,
                    enabled: this.enabled,
                    steam: this.steam
                })

                let data = response.data

                if (data.status !== 'ok') {
                    this.busy = false
                    return alert(data.message)
                }

                this.interval = data.payload.interval
                this.enabled = data.payload.enabled
                this.steam = data.payload.steam

                this.busy = false
            },
            async reload () {
                this.busy = true

                let response = await axios.get('/api/updater')
                let data = response.data

                this.interval = data.interval
                this.enabled = data.enabled
                this.steam = data.steam

                this.busy = false
            }
        }
    }
</script>