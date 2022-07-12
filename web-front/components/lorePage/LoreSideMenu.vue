<template>
    <div class="column is-one-quarter menu">
        <ul class="menu-list">
            <li v-for="entry in allLoreItems" :key="entry.name">
                <router-link
                    :to="'/lore/'.concat(entry.name)"
                    :class="{ 'is-active': currentLoreKey == entry.name }"
                    title="entry.title"
                >
                    {{ entry.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "lore-side-menu",
    props: {
        currentLoreKey: {
            type: String,
            required: false,
        },
        allLoreItems: {
            type: Array,
            required: false,
        },
    },
    methods: {
        changeCurrentLoreKey(key) {
            this.$emit("change-lore-key", key);
        },
    },
};
</script>

<style></style>
