<template>
    <div class="navbar-end">
        <div v-if="userInfo" class="navbar-item">
            <div>Logged in as {{ userInfo.username }}</div>
            <figure class="ml-2 image">
                <img class="is-rounded" :src="userInfo.avatar" />
            </figure>
        </div>
        <div v-else class="navbar-item">
            <a
                class="button is-link"
                :class="{ 'is-loading': discordRedirectUrl === '#' }"
                :href="discordRedirectUrl"
            >
                Log-in with Discord
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "navbar-end",
    props: {
        userInfo: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            discordRedirectUrl: "#",
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            const request = await fetch("/api/login/userInfo");
            const response = await request.json();
            if (response.redirect) {
                this.discordRedirectUrl = response.redirect;
                return;
            }
            this.$emit("getUserInfo", response);
        },
    },
};
</script>

<style></style>
