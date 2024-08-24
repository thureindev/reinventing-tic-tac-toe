<template>
    <div class="head-banner">
        <header class="shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-domino-board ">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ desc }}</h1>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'HeadBanner',
    props: {
        desc: String
    }
}
</script>

<style scoped>
div.head-banner div {

}
</style>