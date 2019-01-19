<template>
    <div class="row">
        <div class="col-sm-6 offset-3">
            <div class="card">
                <div class="card-header bg-primary text-light">
                    <i class="fa fa-cog mr-2"></i> Configuration
                </div>
                <div class="card-body">
                    <loader :show="busy"></loader>
                    <div v-if="!busy">
                        <div class="alert alert-danger" role="alert" v-if="error">
                            {{ error }}
                        </div>
                        <form @submit="submit">
                            <div class="form-group">
                                <label for="atlas-directory">
                                    <i class="fas fa-hdd mr-2"></i> Path to atlas executable
                                </label>
                                <input type="text" class="form-control" id="atlas-directory" v-model="atlas">
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="username">
                                            <i class="fas fa-user-tag mr-2"></i> Manager username
                                        </label>
                                        <input type="text" class="form-control" id="username" v-model="username">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="password">
                                            <i class="fas fa-unlock-alt mr-2"></i> Manager password
                                        </label>
                                        <input type="password" class="form-control" id="password" v-model="password">
                                    </div>
                                </div>
                            </div>

                            <button class="btn btn-primary btn-block">Save</button>
                        </form>
                    </div>
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
                atlas: '',
                username: '',
                password: '',
                busy: true,
                error: ''
            }
        },
        beforeMount () {
            this.update()
        },
        methods: {
            async submit (event) {
                event.preventDefault()
                this.busy = true
                this.error = ''

                let response = await axios.post('/api/configuration', {
                    atlas: this.atlas,
                    username: this.username,
                    password: this.password
                })

                let data = response.data

                if (data.status !== 'ok') {
                    this.busy = false
                    this.error = data.message

                    return
                }

                this.atlas = data.payload.atlas
                this.username = data.payload.username
                this.password = data.payload.password

                this.busy = false
            },
            async update () {
                this.busy = true

                let response = await axios.get('/api/configuration')
                let data = response.data

                if (data.status !== 'ok') {
                    this.busy = false
                    return alert ('Unable to get current configuration, please try-again')
                }

                this.atlas = data.payload.atlas
                this.username = data.payload.username
                this.password = data.payload.password

                this.busy = false
            }
        }
    }
</script>