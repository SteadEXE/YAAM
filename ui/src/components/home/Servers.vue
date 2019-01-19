<template>
    <div class="row">
        <div class="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-12">
            <div class="card">
                <div class="card-header bg-primary text-light">
                    <i class="fa fa-server mr-2"></i> Servers
                </div>
                <div class="card-body">
                    <loader :show="busy"></loader>
                    <table class="table table-bordered" v-if="!busy">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">IP</th>
                                <th scope="col">Port / QueryPort</th>
                                <th scope="col">Players</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="server in servers">
                                <td>{{ server.name }}</td>
                                <td>{{ server.ip }}</td>
                                <td>{{ server.port }} / {{ server.queryPort }}</td>
                                <td>{{ server.players }} / {{ server.maxPlayers }}</td>
                                <td>
                                    <span class="badge badge-success" v-if="server.status === 'online'">Online</span>
                                    <span class="badge badge-danger" v-if="server.status === 'offline'">Offline</span>
                                    <span class="badge badge-warning" v-if="server.status === 'starting'">Starting</span>
                                </td>
                                <td class="text-center">
                                    <router-link :to="{ name: 'server_edit', params: {  uuid: server.id } }">
                                        <i class="fas fa-cog mr-3"></i>
                                    </router-link>
                                    <i class="fas fa-eye"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                servers: [ ],
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
                let response = await axios.get('/api/servers')
                let data = response.data

                if (data.status !== 'ok') {
                    return
                }

                this.servers = data.payload
                this.busy = false

                this.timer = setTimeout(this.update.bind(this), 1e3)
            }
        }
    }
</script>