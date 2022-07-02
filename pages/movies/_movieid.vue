<template>
    <LoadingFull v-if="$fetchState.pending" />
    <div v-else class="py-10 px-12 sm:py-14 lg:xl:px-64 md:px-32 text-white space-y-5">
        <NuxtLink :to="{name: 'index'}" class="bg-orange-500 py-2 px-3 text-white font-semibold">Back</NuxtLink>
        <div class="grid grid-cols-3 gap-5">
            <div class="col-span-3 md:col-span-3 lg:xl:col-span-1">
                <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="">
            </div>
            <div class="col-span-3 md:col-span-3 lg:xl:col-span-2 text-lg">
                <h1 class="text-4xl">Title: {{ movie.title }}</h1>
                <p class="italic">
                    <span class="underline not-italic">Tagline:</span> {{ movie.tagline }}
                </p>
                <p>
                    <span class="underline">Released:</span> 
                    {{ 
                        new Date(movie.release_date).toLocaleString('en-us', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                        })
                    }}
                </p>
                <p>
                    <span class="underline">Duration:</span> 
                    {{ movie.runtime }} minutes
                </p>
                <p>
                    <span class="underline">Revenue:</span> 
                    {{ 
                        movie.revenue.toLocaleString('en-us', {
                            style: 'currency',
                            currency: 'USD',
                        }) 
                    }}
                </p>
                <p>
                    <span class="underline">Overview:</span> 
                    {{ movie.overview }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    name: 'SingleMovie',
    data(){
        return{
            movie: '',
        }
    },
    async fetch(){
        await this.getSingleMovie()
    },
    head(){
        return{
            title: this.movie.title
        }
    },
    fetchDelay: 1000,
    methods: {
        async getSingleMovie(){
            const data = axios.get(
                // movieid: didapatkan dari movies/_movieid
                `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=80ad1f67c8174a3b7887e35bd3700c0b&language=en-US`
            )
            const result = await data
            this.movie = result.data
        }
    }
}
</script>