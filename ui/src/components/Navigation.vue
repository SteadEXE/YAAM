<template>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-light">
        <a class="navbar-brand" href="#">
            <i class="fas fa-skull-crossbones"></i> YAAM!
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse ml-2" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" :to="{ name: 'home'}">
                       <i class="fas fa-server mr-1"></i> Servers
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'configuration'}">
                       <i class="fa fa-cog mr-1"></i> Configuration
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'updater'}">
                        <i class="fas fa-download mr-1"></i> Updater
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>