<template>
    <div>
        <navbar @getUserInfo="setUserInfo" :userInfo="userInfo" />
        <router-view :userInfo="userInfo"></router-view>
    </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";

// Needed for router
import PageMain from "./components/pageMain/PageMain.vue";

export default {
    name: "app",
    components: { Navbar, PageMain },
    data() {
        return {
            userInfo: null,
        };
    },
    methods: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
    },
};
</script>

<style>
/* This rule should be kept. Otherwise, the build step crashes. */
#app {
    background: initial;
}
</style>
