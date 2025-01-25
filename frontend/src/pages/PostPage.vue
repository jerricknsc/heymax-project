<template>
    <div v-if="posts.length !== 0" class="container mx-auto p-0 flex flex-col items-center h-screen">
        <!-- Title -->
        <h1 class="text-4xl font-bold mb-6"> Your Feed </h1>

        <div class="h-full w-full relative">
            <div class="absolute px-2 bg-white rounded" style="z-index: 10; top: 10px; right: 10px">
                <button @click="likePost" class="text-2xl cursor-pointer"> <i class="pi pi-heart"></i> </button>
            </div>

            <div class="absolute w-full flex justify-between px-2" style="top: 50%; z-index: 10;">
                <button @click="prevPost" class="text-2xl bg-gray-500 rounded-full cursor-pointer"> <i
                        class="pi pi-angle-left"></i> </button>
                <button @click="nextPost" class="text-2xl bg-gray-500 rounded-full cursor-pointer"> <i
                        class="pi pi-angle-right"></i> </button>
            </div>

            <video class="h-full w-full object-cover" :src="videoLinks[currentPostIndex]" controls
                type="video/mp4"></video>

            <div class="absolute bottom-18 left-8 text-white">
                <p class="font-bold text-xl"> {{ posts[currentPostIndex].username }} </p>
                <p class="text-sm mt-2"> {{ posts[currentPostIndex].review }} </p>
            </div>

        </div>
    </div>

</template>

<script setup>
import axiosInstance from '@/axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

let videoLinks = [
    "https://videos.pexels.com/video-files/2795405/2795405-uhd_1440_2560_25fps.mp4",
    "https://videos.pexels.com/video-files/3205789/3205789-hd_1080_1920_25fps.mp4",
    "https://videos.pexels.com/video-files/4058073/4058073-uhd_1440_2732_25fps.mp4",
    "https://videos.pexels.com/video-files/2795394/2795394-uhd_1440_2560_25fps.mp4",
    "https://videos.pexels.com/video-files/4065222/4065222-uhd_1440_2732_25fps.mp4",
    "https://videos.pexels.com/video-files/2795405/2795405-uhd_1440_2560_25fps.mp4",
    "https://videos.pexels.com/video-files/3205789/3205789-hd_1080_1920_25fps.mp4",
    "https://videos.pexels.com/video-files/4058073/4058073-uhd_1440_2732_25fps.mp4",
    "https://videos.pexels.com/video-files/2795394/2795394-uhd_1440_2560_25fps.mp4",
    "https://videos.pexels.com/video-files/4065222/4065222-uhd_1440_2732_25fps.mp4",
    "https://videos.pexels.com/video-files/2795405/2795405-uhd_1440_2560_25fps.mp4",
    "https://videos.pexels.com/video-files/3205789/3205789-hd_1080_1920_25fps.mp4",
    "https://videos.pexels.com/video-files/4058073/4058073-uhd_1440_2732_25fps.mp4",
    "https://videos.pexels.com/video-files/2795394/2795394-uhd_1440_2560_25fps.mp4",
    "https://videos.pexels.com/video-files/4065222/4065222-uhd_1440_2732_25fps.mp4",
    "https://videos.pexels.com/video-files/2795405/2795405-uhd_1440_2560_25fps.mp4",
    "https://videos.pexels.com/video-files/3205789/3205789-hd_1080_1920_25fps.mp4",
    "https://videos.pexels.com/video-files/4058073/4058073-uhd_1440_2732_25fps.mp4",
    "https://videos.pexels.com/video-files/2795394/2795394-uhd_1440_2560_25fps.mp4",
    "https://videos.pexels.com/video-files/4065222/4065222-uhd_1440_2732_25fps.mp4",
]

let posts = ref([])

onMounted(async () => {
    fetchPosts()
})

async function fetchPosts() {
    const res = await axiosInstance({
        method: 'get',
        url: '/posts/get-all'
    })

    posts.value = res.data
}

const toast = useToast()

async function likePost() {
    const username = sessionStorage.getItem("username")
    const postID = currentPostIndex.value + 1

    const res = await axiosInstance({
        method: 'post',
        url: '/likes/add', 
        data: {
            postID: postID,
            username: username,
        },
    })

    toast.success('Post added to favourites!', {
        position: "top-center",
        timeout: 3000,
        pauseOnHover: false,
    })
}

// Current post index
const currentPostIndex = ref(0);

// Function to go to the next post
const nextPost = () => {
    if (currentPostIndex.value < posts.value.length - 1) {
        currentPostIndex.value++;
    }
};

// Function to go to the previous post
const prevPost = () => {
    if (currentPostIndex.value > 0) {
        currentPostIndex.value--;
    }
};

</script>
