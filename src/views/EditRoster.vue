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
            <h3 v-if="activePeople.length > 0" class="text-xl font-semibold">
                Active
            </h3>
            <div
                v-if="activePeople.length > 0"
                class="grid grid-flow-row border-2 border-black rounded-sm mb-4"
            >
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
                <div
                    v-for="(row, index) in activePeople"
                    :key="row.id"
                    class="row"
                >
                    <div v-if="editingA == index" class="cell">
                        <input
                            v-model="name"
                            type="text"
                            class="w-full h-min p-1 m-auto"
                        />
                    </div>
                    <p v-else class="cell !px-2">
                        {{ row.first_name }} {{ row.last_name }}
                    </p>
                    <div class="flex">
                        <div
                            v-if="editingA == index"
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
                                v-if="editingA == index"
                                :disabled="loading"
                                class="w-7 h-7 center rounded-md button green text-white"
                                @click="toggleEditingA(row, index)"
                            >
                                <i class="i-mdi:check w-6 h-6"></i>
                            </button>
                            <button
                                v-else
                                :disabled="loading"
                                class="w-7 h-7 center rounded-md button secondary text-white"
                                @click="toggleEditingA(row, index)"
                            >
                                <i class="i-mdi:pencil w-6 h-6"></i>
                            </button>
                        </div>
                        <div class="cell justify-center">
                            <button
                                :disabled="
                                    loading || editingA > -1 || editingI > -1
                                "
                                class="w-7 h-7 center rounded-md button red text-white"
                                @click="toggleActive(row, index)"
                            >
                                <i class="i-mdi:minus w-6 h-6"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 v-if="inactivePeople.length > 0" class="text-xl font-semibold">
                Inactive
            </h3>
            <div
                v-if="inactivePeople.length > 0"
                class="grid grid-flow-row border-2 border-black rounded-sm"
            >
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
                <div
                    v-for="(row, index) in inactivePeople"
                    :key="row.id"
                    class="row text-gray-500"
                >
                    <div v-if="editingI == index" class="cell">
                        <input
                            v-model="name"
                            type="text"
                            class="w-full h-min p-1 m-auto"
                        />
                    </div>
                    <p v-else class="cell !px-2">
                        {{ row.first_name }} {{ row.last_name }}
                    </p>
                    <div class="flex">
                        <div
                            v-if="editingI == index"
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
                                v-if="editingI == index"
                                :disabled="loading"
                                class="w-7 h-7 center rounded-md button green text-white"
                                @click="toggleEditingI(row, index)"
                            >
                                <i class="i-mdi:check w-6 h-6"></i>
                            </button>
                            <button
                                v-else
                                :disabled="loading"
                                class="w-7 h-7 center rounded-md button secondary text-white"
                                @click="toggleEditingI(row, index)"
                            >
                                <i class="i-mdi:pencil w-6 h-6"></i>
                            </button>
                        </div>
                        <div class="cell justify-center">
                            <button
                                :disabled="
                                    loading || editingI > -1 || editingA > -1
                                "
                                class="w-7 h-7 center rounded-md button green text-white"
                                @click="toggleActive(row, index)"
                            >
                                <i class="i-mdi:plus w-6 h-6"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <h3 class="mt-8 text-xl font-semibold">Create Pathfinder</h3>
            <div class="grid gap-2 w-min border p-2 rounded-md">
                <div class="grid gap-1">
                    <label for="first" class="font-semibold">First Name</label>
                    <input
                        id="first"
                        v-model="pathfinder.first_name"
                        type="text"
                        class="rounded-sm"
                    />
                </div>
                <div class="grid gap-1">
                    <label for="last" class="font-semibold">Last Name</label>
                    <input
                        id="last"
                        v-model="pathfinder.last_name"
                        type="text"
                        class="rounded-sm"
                    />
                </div>
                <div class="grid gap-1">
                    <label for="last" class="font-semibold">Class</label>
                    <select
                        v-model="pathfinder.class"
                        class="h-[32px] rounded-sm"
                    >
                        <option :value="0">Friend</option>
                        <option :value="1">Companion</option>
                        <option :value="2">Explorer</option>
                        <option :value="3">Ranger</option>
                        <option :value="4">Voyager</option>
                        <option :value="5">Guide</option>
                        <option :value="6">Staff</option>
                    </select>
                </div>
                <button
                    :disabled="loading || editingA > -1 || editingI > -1"
                    class="mt-2 button primary p-2 !gap-1 font-semibold center"
                    @click="add()"
                >
                    <p>CREATE</p>
                    <i class="i-mdi:plus w-6 h-6"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, doc, getDocs, addDoc, updateDoc } from 'firebase/firestore'
import Person from '../models'

const loading = ref(false)
const editingA = ref(-1)
const editingI = ref(-1)
const name = ref('')
const pClass = ref(0)

const pathfinder = ref({
    first_name: '',
    last_name: '',
    class: 0,
    active: true
})

const activePeople = ref([] as Person[])
const inactivePeople = ref([] as Person[])

const toggleEditingA = async (row: Person, index: number) => {
    loading.value = true
    if (editingA.value == index) {
        let change = false
        if (name.value != `${row.first_name} ${row.last_name}`) {
            change = true
            let a = name.value.split(' ')
            row.first_name = a.shift()
            row.last_name = a.pop()
        }
        if (row.class != pClass.value) change = true
        if (change) {
            await updateDoc(doc(db, 'people', row.id), row)
        }
        editingA.value = -1
        sort()
    } else {
        name.value = row.first_name + ' ' + row.last_name
        pClass.value = row.class
        editingA.value = index
    }
    loading.value = false
}

const toggleEditingI = async (row: Person, index: number) => {
    loading.value = true
    if (editingI.value == index) {
        let change = false
        if (name.value != `${row.first_name} ${row.last_name}`) {
            change = true
            let a = name.value.split(' ')
            row.first_name = a.shift()
            row.last_name = a.pop()
        }
        if (row.class != pClass.value) change = true
        if (change) {
            await updateDoc(doc(db, 'people', row.id), row)
        }
        editingI.value = -1
        sort()
    } else {
        name.value = row.first_name + ' ' + row.last_name
        pClass.value = row.class
        editingI.value = index
    }
    loading.value = false
}

const toggleActive = async (row: Person, index: number) => {
    loading.value = true
    let active = row.active ? true : false
    await updateDoc(doc(db, 'people', row.id), {
        active: !row.active
    })
    if (active) {
        let p = activePeople.value.splice(index, 1)[0]
        p.active = !active
        inactivePeople.value.push(p)
    } else {
        let p = inactivePeople.value.splice(index, 1)[0]
        p.active = !active
        activePeople.value.push(p)
    }
    sort()
    loading.value = false
}

const add = async () => {
    try {
        loading.value = true
        const docRef = await addDoc(collection(db, 'people'), pathfinder.value)
        activePeople.value.push({
            id: docRef.id,
            first_name: pathfinder.value.first_name,
            last_name: pathfinder.value.last_name,
            class: pathfinder.value.class,
            active: pathfinder.value.active
        })
        pathfinder.value = {
            first_name: '',
            last_name: '',
            class: 0,
            active: true
        }
        sort()
    } catch (e) {
        console.error('Error adding document: ', e)
    } finally {
        loading.value = false
    }
}

const sort = () => {
    activePeople.value.sort(byClass)
    inactivePeople.value.sort(byClass)
}

const byClass = (a, b) => {
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

onMounted(async () => {
    loading.value = true
    activePeople.value = []
    inactivePeople.value = []
    let results = await getDocs(collection(db, 'people'))
    results.forEach((doc) => {
        let d = doc.data()
        d.id = doc.id
        if (d.active) {
            activePeople.value.push(d)
        } else {
            inactivePeople.value.push(d)
        }
    })
    sort()
    loading.value = false
})
</script>
