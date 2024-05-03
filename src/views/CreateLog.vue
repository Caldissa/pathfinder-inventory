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
            <h2 class="text-2xl font-semibold">
                {{ date.format("ddd, MMMM DD, 'YY") }}
            </h2>
            <div class="grid grid-flow-row border-2 border-black rounded-sm">
                <div class="row">
                    <p class="cell p-1 !px-2">Name</p>
                    <div class="flex">
                        <div class="cell !p-1 justify-center">
                            <i class="i-mdi:access-time w-8 h-8"></i>
                        </div>
                        <div class="cell !p-1 justify-center">
                            <i class="i-mdi:tshirt-v-outline w-8 h-8"></i>
                        </div>
                        <div class="cell !p-1 justify-center">
                            <i class="i-tabler:bible w-8 h-8"></i>
                        </div>
                        <div class="cell !p-1 !px-[0.375rem] justify-center">
                            <i class="i-mdi:plus w-10 h-8"></i>
                        </div>
                    </div>
                </div>
                <div v-for="row in people" :key="row.person_id" class="row">
                    <p class="cell !px-2">
                        {{ row.first_name }} {{ row.last_name }}
                    </p>
                    <div class="flex">
                        <div class="cell !p-1 justify-center">
                            <button
                                class="rounded-full w-8 h-8 shadow-md text-white flex justify-center items-center"
                                :class="[
                                    {
                                        'bg-gray': row.presence == 'ABSENT'
                                    },
                                    {
                                        'bg-green': row.presence == 'PRESENT'
                                    },
                                    {
                                        'bg-yellow': row.presence == 'LATE'
                                    }
                                ]"
                                @click="
                                    row.presence = togglePresence(row.presence)
                                "
                            >
                                <i
                                    v-if="row.presence == 'PRESENT'"
                                    class="i-mdi:check w-7 h-7"
                                ></i>
                                <i
                                    v-else-if="row.presence == 'LATE'"
                                    class="i-mdi:access-time w-6 h-6"
                                ></i>
                                <i v-else class="i-mdi:close w-7 h-7"></i>
                            </button>
                        </div>
                        <div class="cell justify-center">
                            <input
                                v-model="row.dress"
                                type="checkbox"
                                class="w-7 h-7"
                            />
                        </div>
                        <div class="cell justify-center">
                            <input
                                v-model="row.bible"
                                type="checkbox"
                                class="w-7 h-7"
                            />
                        </div>
                        <div class="cell !px-[0.375rem] justify-center">
                            <input
                                v-model="row.bonus"
                                type="number"
                                value="0"
                                class="w-10 h-7 px-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button
                class="button secondary py-2 font-semibold"
                @click="addRecords()"
            >
                SUBMIT RECORD
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import type { PersonRecord } from '../models'
import dayjs from 'dayjs'

const loading = ref(false)
const date = ref(dayjs())
const people = ref([] as PersonRecord[])

const addRecords = async () => {
    try {
        let f = date.value.format()
        people.value.forEach(async (row: PersonRecord) => {
            await addDoc(collection(db, 'attendance'), {
                bible: row.bible,
                bonus: row.bonus,
                date: f,
                dress: row.dress,
                person_id: row.person_id,
                presence: row.presence
            })
        })
        await addDoc(collection(db, 'records'), {
            date: f,
            month: date.value.month(),
            year: date.value.year()
        })
        people.value = []
        set()
        sort()
    } catch (e) {
        console.error('Error adding document: ', e)
    }
}

const togglePresence = (p: string) => {
    if (p == 'ABSENT') {
        return 'PRESENT'
    } else if (p == 'PRESENT') {
        return 'LATE'
    } else {
        return 'ABSENT'
    }
}

const sort = () => {
    people.value.sort(byClass)
}

const byClass = (a: PersonRecord, b: PersonRecord) => {
    if (a.class < b.class) {
        return -1
    } else if (a.class > b.class) {
        return 1
    }
    // a must be equal to b
    if (a.first_name < b.first_name) {
        return -1
    } else if (a.first_name > b.first_name) {
        return 1
    }
    return 0
}

const set = async () => {
    let results = await getDocs(collection(db, 'people'))
    results.forEach((doc) => {
        let d = doc.data()
        d.id = doc.id
        if (d.active) {
            people.value.push({
                person_id: d.id,
                first_name: d.first_name,
                last_name: d.last_name,
                class: d.class,
                date: date.value.format(),
                presence: 'ABSENT',
                dress: false,
                bible: false,
                bonus: 0
            })
        }
    })
}

onMounted(async () => {
    loading.value = true
    people.value = []
    set()
    sort()
    loading.value = false
})
</script>
