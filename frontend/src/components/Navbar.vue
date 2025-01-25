<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <nav class="bg-gray-200 p-4 sticky bottom-0" style="background-color: #fffff1;">
        <!-- Navbar content -->
        <div class="flex items-center justify-between">

            <!-- Navigation Links for all screen sizes -->
            <div class="flex space-x-6">
                <RouterLink to="/post" class="text-center hover:text-gray-500 cursor-pointer">
                    <i class="pi pi-home"></i>
                    <div>Home</div>
                </RouterLink>
                <RouterLink to="/browse" class="text-center hover:text-gray-500 cursor-pointer">
                    <i class="pi pi-shopping-cart"></i>
                    <div>Browse</div>
                </RouterLink>
                <RouterLink to="/sell" class="text-center hover:text-gray-500 cursor-pointer">
                    <i class="pi pi-plus"></i>
                    <div >Sell</div>
                </RouterLink>
                <RouterLink to="/chats" class="text-center hover:text-gray-500 cursor-pointer">
                    <i class="pi pi-comments"></i>
                    <div>Chats</div>
                </RouterLink>
                <RouterLink to="/profile" class="text-center hover:text-gray-500 cursor-pointer">
                    <i class="pi pi-user"></i>
                    <div>Profile</div>
                </RouterLink>
            </div>
        </div>
    </nav>
</template>