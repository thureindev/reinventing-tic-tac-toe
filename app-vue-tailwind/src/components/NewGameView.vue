<template>
    <div class="new-game-hud">
        <BtnConfig>Time 10 min</BtnConfig>
        <BtnFocus>New Game</BtnFocus>

        <BtnSecondary>
            <template #primary-text>Play a Friend</template>
            <template #alt-text>Invite your Friend</template>
        </BtnSecondary>
        <BtnSecondary>
            <template #primary-text>Play Offline</template>
            <template #alt-text>Offline Multiplayer</template>
        </BtnSecondary>
    </div>
</template>

<script>
import BtnConfig from './CustomButtons/BtnConfig.vue';
import BtnFocus from './CustomButtons/BtnFocus.vue';
import BtnSecondary from './CustomButtons/BtnSecondary.vue';

export default {
    name: 'NewGameView',
    components: {
        BtnConfig,
        BtnFocus,
        BtnSecondary,
    },
}
</script>

<style scoped>
.new-game-hud {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: 0 auto;
    padding: 20px;
    min-width: 220px;
    max-width: 360px;
}

.new-game-hud>* {
    margin: 12px;
    flex-grow: 1;
    width: 100%;
}
</style>