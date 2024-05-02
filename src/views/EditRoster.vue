<template>
    <div class="w-full flex">
        <div class="w-full grid gap-4 px-6 py-10 container mx-auto">
            <RouterLink
                to="/attendance"
                class="button w-min shadow-md flex gap-1 p-1 px-2 border border-[1px] mb-2"
            >
                <i class="i-mdi:arrow-left w-8 h-8"></i>
                <p>Back</p>
            </RouterLink>
            <h2 class="text-2xl font-semibold">ROSTER</h2>
            <div class="grid grid-flow-row border-2 border-black rounded-sm">
                <div class="row font-semibold">
                    <p class="cell p-1 !px-2">Name</p>
                    <div class="flex">
                        <div class="cell justify-center">
                            <p class="w-33">Class</p>
                        </div>
                        <div class="cell !p-1 justify-center text-white">
                            <i class="i-mdi:trash-outline w-8 h-8"></i>
                        </div>
                        <div class="cell !p-1 justify-center text-white">
                            <i class="i-mdi:trash-outline w-8 h-8"></i>
                        </div>
                    </div>
                </div>
                <div v-for="(row, index) in test" :key="row.id" class="row">
                    <input v-if="editing == index" v-model="name" />
                    <p v-else class="cell !px-2">
                        {{ row.firstName }} {{ row.lastName }}
                    </p>
                    <div class="flex">
                        <div
                            v-if="editing == index"
                            class="cell justify-center !py-[0.125rem]"
                        >
                            <select v-model="row.class" class="h-[32px] w-33">
                                <option :value="0">Friend</option>
                                <option :value="1">Companion</option>
                                <option :value="2">Explorer</option>
                                <option :value="3">Ranger</option>
                                <option :value="4">Voyager</option>
                                <option :value="5">Guide</option>
                                <option :value="6">Staff</option>
                            </select>
                        </div>
                        <div v-else class="cell w-[9.125rem] !py-[0.125rem]">
                            <p v-if="row.class == 0">Friend</p>
                            <p v-if="row.class == 1">Companion</p>
                            <p v-if="row.class == 2">Explorer</p>
                            <p v-if="row.class == 3">Ranger</p>
                            <p v-if="row.class == 4">Voyager</p>
                            <p v-if="row.class == 5">Guide</p>
                            <p v-if="row.class == 6">Staff</p>
                        </div>
                        <div class="cell justify-center">
                            <button
                                v-if="editing == index"
                                class="w-7 h-7 center rounded-md button green text-white"
                                @click="toggleEditing(index)"
                            >
                                <i class="i-mdi:check w-6 h-6"></i>
                            </button>
                            <button
                                v-else
                                class="w-7 h-7 center rounded-md button secondary text-white"
                                @click="toggleEditing(index)"
                            >
                                <i class="i-mdi:pencil w-6 h-6"></i>
                            </button>
                        </div>
                        <div class="cell justify-center">
                            <button
                                class="w-7 h-7 center rounded-md bg-red-500 text-white"
                            >
                                <i class="i-mdi:trash-outline w-6 h-6"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                class="button primary py-2 font-semibold"
                @click="testAdd()"
            >
                SUBMIT RECORD
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const editing = ref(-1)
const name = ref('')
const test = ref([
    {
        id: '17435',
        firstName: 'John',
        lastName: 'Doe',
        class: 3,
        active: true
    },
    {
        id: '17455',
        firstName: 'Jane',
        lastName: 'Doe',
        class: 6,
        active: true
    }
])

const toggleEditing = async (index: number) => {
    if (editing.value == index) {
        // update record
        editing.value = -1
    } else {
        editing.value = index
    }
}

const testAdd = async () => {
    try {
        const docRef = await addDoc(collection(db, 'people'), {
            bible: true,
            bonus: 3,
            dress: true,
            person_id: 'dKW6HA6y8sZUD7zhBw4K',
            presence: 'LATE'
        })
        console.log('Document written with ID: ', docRef.id)
    } catch (e) {
        console.error('Error adding document: ', e)
    }
}
</script>
