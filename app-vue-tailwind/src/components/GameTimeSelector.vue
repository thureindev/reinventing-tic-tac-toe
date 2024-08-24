<template>
    <button class="game-time-selector">
        <i>icon</i>
        <h3>{{ time }}</h3>
        <i>icon</i>
    </button>
</template>

<script>
export default {
    name: 'GameTimeSelector',
    props: {
        time: String
    }
}
</script>

<style scoped></style>