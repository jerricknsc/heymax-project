<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // Use Vue Router for navigation

// Define a reactive variable for the username input
const username = ref('');

// Function to handle login logic
const handleLogin = () => {

    if (username.value.trim() !== '') {
        // Store the username in session storage
        sessionStorage.setItem('username', username.value);

        // Navigate the user to the home page
        router.push('/post'); // Adjust the route if your home page route is different
    }
    else {
        alert('Please enter a username.');
    }
};
</script>

<template>
    <div class="container mx-auto h-screen flex flex-col">
        <!-- Title at the Top -->
        <h1 class="text-4xl font-bold text-center text-gray-800"> HeyMax Book App </h1>

        <!-- Login Form Centered -->
        <div class="flex-grow flex items-center justify-center">
            <div class="w-full bg-white p-6 shadow-lg rounded-lg space-y-3">
                <h3 class="text-xl font-semibold text-center text-gray-700">Login</h3>
                <label for="username" class="block text-sm font-medium text-gray-600">Username</label>
                <input 
                    type="text" id="username" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                    v-model="username" placeholder="Enter your username" required 
                />
                <button @click="handleLogin" class="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer">
                    Login
                </button>

            </div>
        </div>
    </div>
</template>