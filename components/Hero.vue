<template>
    <div class="relative h-[28rem]">
        <div class="w-full h-full absolute">
            <nuxt-img class="w-full h-full bg-top object-cover" src="/movieHero.jpg" format="webp" alt="HeroImage" />
        </div>
        <div class="relative w-full backdrop-brightness-50 xl:px-28 md:px-10 h-full justify-center flex flex-col space-y-3 text-center sm:text-left">
            <span class="text-orange-500 text-lg font-bold">NOW STREAMING</span>
            <h1 class="text-white xl:text-7xl text-4xl"><span class="font-extrabold">Now</span> Streaming</h1>
            <a href="#movie-grid" class="bg-orange-500 w-min px-3 py-1 rounded-lg self-center sm:self-start whitespace-nowrap text-white font-medium">View Movies</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hero',
}
</script>

<style lang="">
    
</style>