<template>
    <section>
        <div v-if="userInfo">Connected.</div>
        <div v-else>Not connected</div>
    </section>
</template>

<script>
export default {
    name: "page-main",
    props: {
        userInfo: {
            type: Object,
            required: false,
        },
    },
};
</script>

<style></style>
