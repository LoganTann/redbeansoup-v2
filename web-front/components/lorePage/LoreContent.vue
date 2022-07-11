<template>
    <section class="column" v-if="currentDataValid">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">
                        Title <em class="is-size-7">{{ limitText.title }}</em>
                    </label>
                    <div class="control has-icons-left">
                        <input
                            class="input"
                            type="text"
                            placeholder="title"
                            v-model="currentData.title"
                        />
                        <span class="icon is-left">
                            <i class="fas fa-t"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">
                        Description
                        <em class="is-size-7">{{ limitText.description }}</em>
                    </label>
                    <textarea
                        class="textarea"
                        v-model="currentData.description"
                    ></textarea>
                </div>
                <!--todo-->
                <img :src="tmp.image" /><br />
                <button class="button" title="insert image">No image.</button>
            </div>
            <div class="column">
                <!--todo-->
                <img :src="tmp.thumb" /><br />
                <button class="button" title="insert thumbnail">
                    No thumbnail.
                </button>
            </div>
        </div>
    </section>
    <section class="column" v-else>
        <p v-if="currentLoreKey">Loading {{ currentLoreKey }}...</p>
        <p v-else>Select a lore in the side menu.</p>
    </section>
</template>

<script>
export default {
    name: "lore-content",
    data() {
        return {
            currentData: null,
            tmp: {
                image: "https://picsum.photos/300/200",
                thumb: "https://picsum.photos/100/100",
            },
        };
    },
    props: {
        currentLoreKey: {
            type: String,
            required: false,
        },
    },
    watch: {
        $props: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val.currentLoreKey) {
                    this.fetchLore(val.currentLoreKey);
                }
            },
        },
    },
    methods: {
        async fetchLore(name) {
            const request = await fetch("/api/lore/".concat(name));
            const response = await request.json();
            this.currentData = response;
        },
    },
    computed: {
        currentDataValid() {
            return this.currentData && this.currentData.title;
        },
        limitText() {
            return {
                title: "(x/256)".replace("x", this.currentData.title.length),
                description: "(x/4000)".replace(
                    "x",
                    this.currentData.description.length
                ),
            };
        },
    },
};
</script>

<style></style>
