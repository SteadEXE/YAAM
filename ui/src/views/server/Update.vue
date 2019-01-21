<template>
    <div class="row">
        <div class="col-sm-6 offset-3">
            <div class="card mb-2">
                <div class="card-header bg-primary text-light">
                    <i class="fa fa-cog mr-2"></i> Edit server definition
                </div>
                <div class="card-body">
                    <loader :show="busy"></loader>
                    <form v-if="!busy" @submit="submit">
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="ip">
                                        <i class="fas fa-wifi mr-1"></i> IP¹
                                    </label>
                                    <input type="text" class="form-control" id="ip" placeholder="127.0.0.1" v-model="ip">
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="query-port">
                                        <i class="fas fa-satellite-dish mr-1"></i> Query port¹
                                    </label>
                                    <input type="number" class="form-control" id="query-port" placeholder="57555" v-model="queryPort">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="rcon-port">
                                        <i class="fas fa-user-secret mr-1"></i> RCON Port¹
                                    </label>
                                    <input type="number" class="form-control" id="rcon-port" placeholder="27015" v-model="rconPort">
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="rcon-password">
                                        <i class="fas fa-user-secret mr-1"></i> RCON Password¹
                                    </label>
                                    <input type="password" class="form-control" id="rcon-password" placeholder="*******" v-model="rconPassword">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="start-parameters">
                                <i class="fas fa-terminal mr-1"></i> Start parameters²
                            </label>
                            <input type="text" class="form-control" id="start-parameters" placeholder="Ex: Ocean?ServerX=0?ServerY=0?QueryPort=57555?Port=5555?AltSaveDirectoryName=A1 -log -server" v-model="parameters">
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="extra-parameters">
                                        <i class="fas fa-terminal mr-1"></i> Extra parameters²
                                    </label>
                                    <input type="text" class="form-control" id="extra-parameters" placeholder="Ex: -NoBattlEye -log -server" v-model="extraParameters">
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="managed">
                                        <i class="fas fa-magic mr-2"></i> Process management²
                                    </label>
                                    <select class="form-control" id="managed" v-model="managed">
                                        <option value="true">Enabled</option>
                                        <option value="false">Disabled</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-block btn-primary">Save</button>
                    </form>
                </div>
            </div>

            <div class="justify-content-center text-center">
                ¹ Parameters for monitoring purposes.<br>
                ² Servers need to be on this host machine.
            </div>

            <div class="text-center mt-4">
                <button class="btn btn-danger" @click="remove">Delete server</button>
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
                ip: '',
                queryPort: '',
                rconPort: '',
                rconPassword: '',
                parameters: '',
                extraParameters: '',
                managed: true
            }
        },
        beforeMount () {
            this.update()
        },
        methods: {
            async submit (event) {
                event.preventDefault()
                this.busy = true

                let response = await axios.post('/api/servers/' + this.$route.params.uuid + '/update', {
                    ip: this.ip,
                    queryPort: this.queryPort,
                    rconPort: this.rconPort,
                    rconPassword: this.rconPassword,
                    parameters: this.parameters,
                    extraParameters: this.extraParameters,
                    managed: this.managed
                })

                let data = response.data

                if (data.status !== 'ok') {
                    this.busy = false
                    return alert(data.message)
                }

                this.ip = data.payload.ip
                this.queryPort = data.payload.queryPort
                this.rconPort = data.payload.rconPort
                this.rconPassword = data.payload.rconPassword
                this.parameters = data.payload.parameters
                this.extraParameters = data.payload.extraParameters
                this.managed = data.payload.managed

                this.busy = false
            },
            async update () {
                let response = await axios.get('/api/servers/' + this.$route.params.uuid + '/update')
                let data = response.data

                if (data.status !== 'ok') {
                    this.busy = false
                    return alert(data.message)
                }

                this.ip = data.payload.ip
                this.queryPort = data.payload.queryPort
                this.rconPort = data.payload.rconPort
                this.rconPassword = data.payload.rconPassword
                this.parameters = data.payload.parameters
                this.extraParameters = data.payload.extraParameters
                this.managed = data.payload.managed

                this.busy = false
            },
            async remove () {
                let response = await axios.post('/api/servers/' + this.$route.params.uuid + '/delete')

                let data = response.data

                if (data.status !== 'ok') {
                    this.busy = false
                    return alert(data.message)
                }

                this.$router.push({name: 'home'})
            }
        }
    }
</script>