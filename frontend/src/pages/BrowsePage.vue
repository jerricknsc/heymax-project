<script setup>
import axiosInstance from '@/axios';
import { onMounted, ref } from 'vue';

let listings = ref([]);
let likedBooks = ref({})
let searchQuery = ref(''); // Store the search query
let selectedFilter = ref('all'); // Default filter to "See All"

onMounted(async () => {
    fetchListings();
    fetchLikedBooks();
});

// Fetch the listings from the API
async function fetchLikedBooks() {
    const res = await axiosInstance({
        method: 'get',
        url: '/users/find-liked-books',
        params: {
            username: sessionStorage.getItem('username')
        }
    });

    likedBooks.value = res.data;
}

// Fetch the listings from the API
async function fetchListings() {
    const res = await axiosInstance({
        method: 'get',
        url: '/listings/get-all',
    });

    listings.value = res.data;
}

// Filter the listings based on the search query and the selected filter
function filteredListings() {
    const filteredBySearch = listings.value.filter(listing =>
        listing.bookTitle.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        listing.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        listing.bookGenre.toLowerCase().includes(searchQuery.value.toLowerCase()) 
    );

    if (selectedFilter.value === 'forYou') {
        return filteredBySearch.filter(listing => {
            // Match both genre and title with liked books
            const likedGenres = likedBooks.value.bookGenre || [];
            const likedTitles = likedBooks.value.bookTitle || [];
            return likedGenres.includes(listing.bookGenre) && likedTitles.includes(listing.bookTitle);
        });
    }

    return filteredBySearch;
}

// Set the selected filter ("For You" or "See All")
function setFilter(filter) {
    selectedFilter.value = filter;
}
</script>

<template>
    <div class="max-w-7xl mx-auto p-4">
        
        <!-- Search Bar -->
        <div class="mb-6">
            <input v-model="searchQuery" type="text" placeholder="Search by title, genre or author..."
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <!-- Filter Buttons (For You, See All) -->
        <div class="flex space-x-2 mb-4">
            <button @click="setFilter('all')" :class="{
                'bg-blue-500 text-white': selectedFilter === 'all',
                'bg-white text-blue-500': selectedFilter !== 'all'
            }" class="px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
                See All
            </button>
            <button @click="setFilter('forYou')" :class="{
                'bg-blue-500 text-white': selectedFilter === 'forYou',
                'bg-white text-blue-500': selectedFilter !== 'forYou'
            }" class="px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
                For You
            </button>
        </div>

        <!-- Display Listings -->
        <div v-if="filteredListings().length !== 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="(listing, index) in filteredListings()" :key="listing.id"
                class="bg-white rounded-lg shadow-lg overflow-hidden">
                
                <!-- Book Image -->
                <img :src="listing.url" class="w-full h-64 object-cover" />

                <!-- Book Details -->
                <div class="p-4 space-y-1">
                    <h2 class="text-xl font-semibold text-gray-800">{{ listing.bookTitle }}</h2>
                    <h2 class="text-md font-semibold text-gray-800"> By {{ listing.author }}</h2>
                    <p class="text-sm text-gray-600"> <strong> Genre: </strong> {{ listing.bookGenre }}</p>
                    <p class="text-sm text-gray-600 italic">{{ listing.username }}</p>
                    <p class="mt-2 text-lg font-semibold text-gray-900">${{ listing.price }}</p>

                    <!-- Chat Now Button -->
                    <button class="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        Chat Now
                    </button>
                </div>
            </div>
        </div>

        <!-- No Listings Found -->
        <div v-else class="text-center text-gray-500">
            <p>No listings found. Try searching with different keywords.</p>
        </div>
    </div>
</template>

<style scoped>
/* Custom styles to enhance button transition and active state */
button {
    transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
    transform: scale(1.05);
}
</style>
