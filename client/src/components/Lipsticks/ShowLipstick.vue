<template>
    <div class="lipstick-show-container">
        <header>
            <h1>Show Lipstick</h1>
        </header>
        
        <div class="lipstick-details">
            <img class="lipstick-image" 
                 :src="BASE_URL + lipstick.pictures.split(', ')[0]" 
                 alt="Lipstick Image"
                 @click="viewImage(BASE_URL + lipstick.pictures.split(', ')[0])">
            <div class="details-content">
                <p><strong>ID:</strong> {{ lipstick.id }}</p>
                <p><strong>Name:</strong> {{ lipstick.name }}</p>
                <p><strong>Color:</strong> {{ lipstick.color }}</p>
                <p><strong>Type:</strong> {{ lipstick.type }}</p>
                <p><strong>Brand:</strong> {{ lipstick.brand }}</p>
                <p><strong>Price:</strong> {{ lipstick.price }} ฿</p>
            </div>
        </div>
        
        <button class="back-btn" v-on:click="navigateTo('/lipsticks')">Back</button>
    </div>
</template>

<script>
    import LipsticksService from '@/services/LipsticksService'
    export default {
        data() {
            return {
                lipstick: null,
                BASE_URL: "http://localhost:8081/assets/uploads/"
            }
        },
        async created() {
            try {
                let lipstickId = this.$route.params.lipstickId
                this.lipstick = (await LipsticksService.show(lipstickId)).data
            } catch (error) {
                console.log(error)
            }
        },
        methods: {
            navigateTo(route) {
                this.$router.push(route)
            },
            viewImage(imageUrl) {
                // Open the image in a new tab
                window.open(imageUrl, '_blank');
            },
        }
    }
</script>

<style scoped>
/* General Layout */
.lipstick-show-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    border-radius: 25px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
}

/* Header Style */
header {
    text-align: center;
    margin-bottom: 20px;
}

header h1 {
    font-size: 36px;
    color: #ff6f91;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Lipstick Details */
.lipstick-details {
    display: flex;
    align-items: center;
    margin-top: 20px;
}

.lipstick-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 15px;
    border: 2px solid #ff6f91;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    transition: transform 0.3s ease;
}

.lipstick-image:hover {
    transform: scale(1.05);
}

.details-content {
    flex-grow: 1;
    font-size: 16px;
}

.details-content p {
    margin: 8px 0;
    color: #555;
    font-weight: bold;
}

/* Shortened Back Button Style */
.back-btn {
    display: block; /* Ensures the button takes the full width */
    width: auto; /* Make the back button auto width */
    margin: 20px auto; /* Center the button with margin */
    background-color: #ff6584;
    color: white;
    border: none;
    padding: 10px 15px; /* Adjusted padding for a smaller button */
    border-radius: 30px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, transform 0.3s;
}

.back-btn:hover {
    background-color: #ff4757;
    transform: scale(1.08);
}

/* Edit Button Style (optional, can be added) */
.edit-btn {
    background-color: #ab45e2;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, transform 0.3s;
}

.edit-btn:hover {
    background-color: #23211e;
    transform: scale(1.1);
}
</style>
