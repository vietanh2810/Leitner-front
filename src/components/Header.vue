<template>
    <div class="card flex h-16 w-screen bg-black text-white">
        <div class="card w-full flex justify-center gap-16">
            <Button label="QUIZZ" icon="pi pi-check-square" @click="$emit('quizz-clicked')" />
            <Button label="CARD" icon="pi pi-question-circle" @click="$emit('card-clicked')" />
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
</script>
