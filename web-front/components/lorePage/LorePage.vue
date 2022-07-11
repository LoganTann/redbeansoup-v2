<template>
    <main class="section">
        <div class="columns">
            <lore-side-menu
                @change-lore-key="setCurrentLoreKey"
                :current-lore-key="name"
                :all-lore-items="allLoreItems"
            />
            <lore-content :current-lore-key="name" />
        </div>
    </main>
</template>

<script>
import LoreContent from "./LoreContent.vue";
import LoreSideMenu from "./LoreSideMenu.vue";
export default {
    components: { LoreSideMenu, LoreContent },
    name: "lore-page",
    props: {
        name: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            allLoreItems: [],
            currentLoreKey: "",
        };
    },
    async created() {
        const request = await fetch("/api/lore");
        const response = await request.json();
        this.allLoreItems = response;
        this.currentLoreKey = response[0].name;
    },
    methods: {
        setCurrentLoreKey(key) {
            this.currentLoreKey = key;
        },
    },
};
</script>

<style></style>
