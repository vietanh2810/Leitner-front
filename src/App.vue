<template>
  <div id="app" class="w-screen h-full" style="margin: 0 !important; padding: 0 !important;">
    <!-- <router-view /> -->
    <Header @quizz-clicked="handleQuizzClicked" @card-clicked="handleCardClicked" />
    <div class="h-full w-full mt-24">
      <div v-if="isOpenQuizzModal" class="card w-1/2 h-3/5 rounded-xl bg-black mx-auto my-auto">
        <div class="card w-full h-1/6 px-6 pb-6 rounded-full">
          currentDay
        </div>
        <div class="w-full h-4/6 rounded-xl px-6 py-6">
          <div class="card w-full h-full border-white border-2 rounded-xl">
            <div class="w-full flex h-1/3 px-4 pt-4 justify-between">
              <div class="flex items-center text-black justify-center bg-white font-normal rounded-full p-2"
                style="background-color: #f1f1f1; width: max-content; height: 40px; align-items: center;">
                ID: {{ currentQuestion.id }}
              </div>
              <div class="flex items-center text-black justify-center bg-white font-normal rounded-full p-2"
                style="background-color: #f1f1f1; width: fit-content; height: 40px; align-items: center;">
                Tag: {{ currentQuestion.tag }}
              </div>
            </div>
            <div class="w-full h-2/3 px-4 text-white text-2xl justify-between">
              Question: {{ currentQuestion.question }}
              <div v-if="showCurrentAnswer">
                Answer: {{ currentQuestion.answer }}
              </div>
            </div>
          </div>
        </div>
        <div class="card w-full h-1/6 px-6 pb-6 rounded-full">
          <input type="text" v-model="inputAnswer" value="Answer here" 
            :class="{'w-4/6': showCurrentAnswer, 'w-5/6': !showCurrentAnswer || isSubmittedAnswer}"
            class="h-12 text-white px-4 rounded-l-full"
            style="border-color: hsl(0,0%,18.82%); background-color: hsl(0,0%,7%); border: 1px solid hsl(0,0%,18.82%);" />
          <input v-if="!showCurrentAnswer" type="button" value="Show answer"
            class="w-1/6 h-12 text-white rounded-r-full" @click="showCurrentAnswer = true"
            style="background-color: hsla(0,0%,100%,0.08); border: 1px solid hsl(0,0%,18.82%);" />
          <input v-if="!isSubmittedAnswer && showCurrentAnswer" type="button" value="I'm right" class="w-1/6 h-12 text-white "
            @click="submitAnswer(true)" style="background-color: hsla(0,0%,100%,0.08); border: 1px solid hsl(0,0%,18.82%);" />
          <input v-if="!isSubmittedAnswer && showCurrentAnswer" type="button" value="I'm wrong" class="w-1/6 h-12 text-white rounded-r-full"
            @click="submitAnswer(false)" style="background-color: hsla(0,0%,100%,0.08); border: 1px solid hsl(0,0%,18.82%);" />
          <input v-if="isSubmittedAnswer" type="button" value="Next question" class="w-1/6 h-12 text-white rounded-r-full"
            @click="goToNextQuestion"
            style="background-color: hsla(0,0%,100%,0.08); border: 1px solid hsl(0,0%,18.82%);" />
        </div>
      </div>
      <div v-if="isOpenCardModal" class="card w-1/2 h-1/2 rounded-xl bg-black mx-auto my-auto">
        <div class="w-full h-4/5 rounded-xl px-6 py-6">
          <div class="card w-full h-full border-white border-2 px-4 rounded-xl">
            <input type="text" placeholder="Tag" v-model="cardForm.tag"
              class="w-full h-12 mt-4 text-white px-4 rounded-full"
              style="border-color: hsl(0,0%,18.82%); background-color: hsl(0,0%,7%); border: 1px solid hsl(0,0%,18.82%);" />
            <input type="text" placeholder="Question" v-model="cardForm.question"
              class="w-full h-24 mt-4 text-white px-4 rounded-xl"
              style="border-color: hsl(0,0%,18.82%); background-color: hsl(0,0%,7%); border: 1px solid hsl(0,0%,18.82%);" />
            <input type="text" placeholder="Answer" v-model="cardForm.answer"
              class="w-full h-20 mt-4 text-white px-4 rounded-xl"
              style="border-color: hsl(0,0%,18.82%); background-color: hsl(0,0%,7%); border: 1px solid hsl(0,0%,18.82%);" />
          </div>
        </div>
        <div class="w-full h-1/5 rounded-xl px-6 pb-6">
          <input type="button" value="Submit" class="w-full h-12 text-white px-4 rounded-full" @click="submitCard"
            style="border-color: hsl(0,0%,18.82%); background-color: hsl(0,0%,7%); border: 1px solid hsl(0,0%,18.82%);" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import axios from "axios";

const indexOfCurrentQuestion = ref(0);
const currentQuestion = ref({
  "question": "",
  "answer": "",
  "tag": "",
  "category": "",
  "id": ""

});
const showCurrentAnswer = ref(false);
const inputAnswer = ref('');
const isSubmittedAnswer = ref(false);
const isOpenQuizzModal = ref(true);
const isOpenCardModal = ref(false);
const questionList = ref([]);
const cardForm = ref({
  tag: '',
  question: '',
  answer: ''
});

onMounted(() => {
  fetchQuestions();
})

const fetchQuestions = async () => {
  try {
    await axios.get("http://localhost:3002/cards/quizz").
      then((response) => {
        if (response.status === 200) {
          questionList.value = response.data;
          currentQuestion.value = questionList.value[indexOfCurrentQuestion.value];
          console.log('currentQuestion', currentQuestion.value);
        }
      });
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

const handleQuizzClicked = () => {
  isOpenQuizzModal.value = true;
  isOpenCardModal.value = false;
};

const handleCardClicked = () => {
  isOpenQuizzModal.value = false;
  isOpenCardModal.value = true;
};

const submitAnswer = (isValid) => {
  isSubmittedAnswer.value = true;
  patchAnswer(currentQuestion.value.id, isValid);
};

const patchAnswer = async (id, isValid) => {
  try {
    const response = await axios.patch(`http://localhost:3002/cards/${id}/answer`, {
      isValid: isValid
    });
    console.log(response);
  } catch (error) {
    console.error("Error updating answer:", error);
  }
};

const submitCard = () => {
  postCard(cardForm.value);
};

const postCard = async (card) => {
  try {
    await axios.post("http://localhost:3002/cards", card)
      .then((response) => {
        if (response.status === 201) {
          fetchQuestions();
        }
      });
  } catch (error) {
    console.error("Error creating card:", error);
  }
};

const goToNextQuestion = () => {
  const nextIndex = indexOfCurrentQuestion.value + 1;
  if (nextIndex < questionList.value.length) {
    currentQuestion.value = questionList.value[nextIndex];
    showCurrentAnswer.value = false;
    isSubmittedAnswer.value = false;
    inputAnswer.value = '';
    indexOfCurrentQuestion.value = nextIndex;
  } else {
    alert('No more question');
  }
};

</script>
