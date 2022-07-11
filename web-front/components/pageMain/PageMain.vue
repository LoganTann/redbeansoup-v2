<template>
    <section>
        <router-link to="/lore">Lore</router-link>
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
