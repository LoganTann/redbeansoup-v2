<template>
    <div>
        <navbar @getUserInfo="setUserInfo" :userInfo="userInfo" />
        <not-connected-page v-if="!userInfo" />
        <router-view v-else></router-view>
    </div>
</template>

<script>
// Needed for router
import Navbar from "./components/navbar/Navbar.vue";
import NotConnectedPage from "./components/notConnectedPage/NotConnectedPage.vue";
import PageMain from "./components/pageMain/PageMain.vue";
import LorePage from "./components/lorePage/LorePage.vue";

export default {
    name: "app",
    // still needed for router, even when not used.
    components: { Navbar, PageMain, NotConnectedPage, LorePage },
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
/* This rule should be kept. Otherwise, the build step crashes.
   Thanks vno >:(
*/
#app {
    background: initial;
}
</style>
