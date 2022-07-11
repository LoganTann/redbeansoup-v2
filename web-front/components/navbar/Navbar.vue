<template>
    <nav class="navbar is-light">
        <div class="navbar-brand">
            <div class="navbar-item">
                <img src="/assets/redbeansoup.png" alt="redbeansoup" />
                <div>
                    <span class="title mx-2">Redbeansoup-bot</span>
                    <span>v2.0</span>
                </div>
            </div>
        </div>
        <navbar-end
            @getUserInfo="propagateGetUserInfoEvent"
            :userInfo="userInfo"
        ></navbar-end>
    </nav>
</template>

<script>
import NavbarEnd from "./NavbarEnd.vue";

export default {
    components: { NavbarEnd },
    name: "navbar",
    props: {
        userInfo: {
            type: Object,
            required: false,
        },
    },
    methods: {
        propagateGetUserInfoEvent(userInfo) {
            this.$emit("getUserInfo", userInfo);
        },
    },
};
</script>

<style></style>
