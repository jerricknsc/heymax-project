<script setup>
import axiosInstance from '@/axios';
import { onMounted, ref } from 'vue';

const user = ref(null);
const listings = ref([]);

onMounted(() => {
    fetchUser();
    fetchUserListings();
});

async function fetchUser() {
    try {
        const res = await axiosInstance({
            method: 'get',
            url: '/users/get-one',
            params: {
                username: sessionStorage.getItem("username")
            }
        });

        // Store user data in the ref
        user.value = res.data;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

async function fetchUserListings() {
    try {
        const res = await axiosInstance({
            method: 'get',
            url: '/listings/get-by-username',
            params: {
                username: sessionStorage.getItem("username")
            }
        });

        // Store listings data in the ref
        listings.value = res.data;
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}
</script>

<template>
    <div class="container mx-auto p-8">
        <div class="text-center mb-12">
            <i class="pi pi-user text-4xl"></i>
            <h1 v-if="user" class="text-3xl font-semibold mt-4">{{ user.username }}</h1>
            <div v-if="user" class="text-2xl text-green-500 mt-6"> 
                Amount of CO2 saved: 
                <br>
                <div class="text-3xl"> {{ user.points }} kg </div>
            </div>
        </div>

        <div v-if="listings.length > 0" class="mt-8">
            <h2 class="text-2xl font-semibold mb-4">Your Listings</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="listing in listings" :key="listing.id"
                    class="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img :src="listing.url" alt="Book Image" class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h3 class="text-xl font-bold">{{ listing.bookTitle }}</h3>
                        <p class="text-sm text-gray-500 mt-1">Genre: {{ listing.bookGenre }}</p>
                        <p class="text-sm text-gray-500">Author: {{ listing.author }}</p>
                        <p class="text-lg font-semibold mt-2">$ {{ listing.price }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="mt-8">
            <p class="text-lg text-center text-gray-500">No listings found.</p>
        </div>
    </div>
</template>
