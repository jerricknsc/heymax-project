<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// FOR FIREBASE
import storage from '../../firebaseConfig';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import axiosInstance from '@/axios';

// FORM INPUT VARIABLES
const title = ref('');
const author = ref('');
const genre = ref('');
const price = ref('');

// FILE INPUT REFERENCE
const fileInput = ref(null);
const image = ref(null); // File to upload
const imageData = ref(null); // Preview image
const isLoading = ref(false);

// Trigger file upload input
function triggerFileUpload() {
    fileInput.value.click();
}

// Handle image upload and preview
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        image.value = file; // Store the selected file
        const reader = new FileReader();
        reader.onload = (e) => {
            imageData.value = e.target.result; // Store image preview data
        };
        reader.readAsDataURL(file);
    }
}

// Upload image to Firebase when "Scan Image" button is clicked
async function handleScanImage() {
    isLoading.value = true;

    try {
        if (image.value) {
            const timestamp = new Date().toISOString();
            const imageRef = storageRef(storage, `images/${timestamp}_${image.value.name}`);
            await uploadBytes(imageRef, image.value); // Upload image
            const imageURL = await getDownloadURL(imageRef); // Get Firebase URL

            console.log(imageURL);

            // Extract book info from the image
            await extractImageInfo(imageURL);
        } else {
            alert('No image selected!');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    } finally {
        isLoading.value = false;
    }
}

async function extractImageInfo(imageURL) {
    const res = await axiosInstance({
        method: 'post',
        url: '/openai/get-image-info',
        data: {
            imageURL: imageURL
        }
    });

    // Assuming response contains book information
    const bookInfo = res.data
    console.log(bookInfo)

    // Auto-fill title and author from the response
    title.value = bookInfo.title || '';
    author.value = bookInfo.author || '';
    genre.value = bookInfo.genre || ''; 
    price.value = bookInfo.price || ''; 
}

async function handleListBook(title, genre) {
    
}

</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
        <!-- Title -->
        <h1 class="text-2xl font-bold text-gray-800 mb-6"> List A Book! </h1>

        <!-- File Upload & Image Preview -->
        <div class="relative w-64 h-64 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 cursor-pointer"
            :style="{ backgroundImage: imageData ? `url(${imageData})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }"
            @click="triggerFileUpload">
            <div v-if="!imageData" class="flex flex-col items-center text-gray-500">
                <i class="fas fa-image text-4xl mb-2"></i>
                <p>Click to upload an image</p>
            </div>
            <input type="file" accept="image/*" ref="fileInput" @change="handleImageUpload" class="hidden" />
        </div>

        <!-- Actions -->
        <div class="flex space-x-4">
            <button
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @click="handleScanImage" :disabled="isLoading">
                {{ isLoading ? 'Reading image...' : 'Scan Image' }}
            </button>
        </div>

        <!-- Title Input -->
        <div class="w-full max-w-md mb-4">
            <label> Title </label>
            <input type="text" placeholder="Book Title"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="title" />
        </div>

        <!-- Author Input -->
        <div class="w-full max-w-md mb-4">
            <label> Author </label>
            <input type="text" placeholder="Author Name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="author" />
        </div>

        <!-- Genre Input -->
        <div class="w-full max-w-md mb-4">
            <label> Genre </label>
            <input type="text" placeholder="Genre"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="genre" />
        </div>

        <!-- Price Input -->
        <div class="w-full max-w-md mb-4">
            <label> Price </label>
            <input type="number" placeholder="Price"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="price" />
        </div>

        <div class="flex space-x-4">
            <button
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                @click="handleListBook" :disabled="isLoading">
                List it!
            </button>
        </div>
    </div>
</template>
