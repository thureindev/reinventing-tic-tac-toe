<template>
    <button class="game-time-selector">
        <h3>{{ desc }}</h3>
    </button>
</template>

<script>
export default {
    name: 'GameButton',
    props: {
        desc: String
    }
}
</script>

<style scoped></style>