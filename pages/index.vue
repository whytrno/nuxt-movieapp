<template>
  <div class="">
    <!-- Hero -->
    <Hero />

    <!-- Search -->
    <div class="flex mx-5 xl:mx-64 lg:mx-32 md:mx-14 my-5 sm:mt-8">
      <!-- keyup: saat tombol di keyboard di angkat -->
      <input v-model.lazy="searchInput" type="text" placeholder="Search" class="h-10 py-2 px-3 " @keyup.enter="$fetch">
      <button v-show="searchInput !== ''" class="bg-orange-500 py-2 px-3 h-10 rounded-r-lg font-bold text-white" @click="clearSearch">Clear Search</button>
    </div>

    <!-- Loading -->
    <!-- Jika sedang load data, maka menampilkan tampilan kosong -->
    <Loading v-if="$fetchState.pending" class="" />

    <!-- Movies -->
    <div v-else>
      <!-- Searched Movies -->
      <div v-if="searchInput !== ''" class="grid xl:grid-cols-4 mx-5 my-5 md:grid-cols-2 xl:mx-64 lg:mx-32 md:mx-14 xl:my-14 md:my-10 gap-x-8 gap-y-10">
        <div v-for="(movie, index) in searchedMovies" :key="index" class="space-y-3">
          <div class="relative">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="">
            <div>
              <p class="absolute top-0 left-0 p-2 rounded-br-lg bg-orange-500 text-white">{{ movie.vote_average }}</p>
              <!-- <p class="absolute bottom-0 bg-orange-500 text-white p-3s">{{ movie.overview }}</p> -->
            </div>
          </div>
          <div>
            <p class="font-bold text-white">{{ movie.title.slice(0, 25) }} <span v-if="movie.title.length > 25">...</span> </p>
            <p class="text-white mb-5">
              Released:
              {{ 
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })
              }}
            </p>
            <!-- movieid: didapat dari pages/_movieid -->
            <NuxtLink :to="{name: 'movies-movieid', params: {movieid: movie.id}}" class="border whitespace-nowrap w-min py-2 px-3 rounded-lg border-orange-500 text-white">Get More Info</NuxtLink>
          </div>
        </div>
      </div>
      <!-- Now Streaming -->
      <div v-else class="grid xl:grid-cols-4 mx-5 my-5 md:grid-cols-2 xl:mx-64 lg:mx-32 md:mx-14 xl:my-14 md:my-10 gap-x-8 gap-y-10">
        <div v-for="(movie, index) in movies" :key="index" class="space-y-3">
          <div class="relative">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="">
            <div>
              <p class="absolute top-0 left-0 p-2 rounded-br-lg bg-orange-500 text-white">{{ movie.vote_average }}</p>
              <!-- <p class="absolute bottom-0 bg-orange-500 text-white p-3s">{{ movie.overview }}</p> -->
            </div>
          </div>
          <div>
            <p class="font-bold text-white">{{ movie.title.slice(0, 25) }} <span v-if="movie.title.length > 25">...</span> </p>
            <p class="text-white mb-5">
              Released:
              {{ 
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })
              }}
            </p>
            <!-- movieid: didapat dari pages/_movieid -->
            <NuxtLink :to="{name: 'movies-movieid', params: {movieid: movie.id}}" class="border whitespace-nowrap w-min py-2 px-3 rounded-lg border-orange-500 text-white">Get More Info</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// BUG: Ketika mencari sesuatu 2x tanpa clear search, maka tetap mencari pencarian pertama
export default {
  data(){
    return {
      movies: [],
      searchedMovies: [],
      searchInput: '',
    }
  },
  async fetch(){
    if(this.searchInput !== ''){
      await this.searchMovies();
    } 

    await this.getMovies();
  },
  // Untuk seo - metadata
  head(){
    return{
      title: 'Movie App - Latest Streaming Movie Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, streaming',
        }
      ]
    }
  },
  // Untuk delay ketika load data agar tidak menampilkan data blinking
  fetchDelay: 1000,
  methods: {
    async getMovies(){
      const data = axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=80ad1f67c8174a3b7887e35bd3700c0b&languange=en-US&page=1'
      )
      const result = await data
      result.data.results.forEach(movie => {
        this.movies.push(movie)
      })
    },
    async searchMovies(){
      const data = axios.get(
        // Gunakan back slash jika akan memasukan variabel
        `https://api.themoviedb.org/3/search/movie?api_key=80ad1f67c8174a3b7887e35bd3700c0b&languange=en-US&page=1&query=${this.searchInput}`
      )
      const result = await data
      result.data.results.forEach(movie => {
        this.searchedMovies.push(movie)
      })
    },
    clearSearch(){
      this.searchInput = ''
      this.searchedMovies = []
    }
  }
}
</script>
