<template>
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
            <p class="cell !px-2">{{ row.first_name }} {{ row.last_name }}</p>
            <div class="flex">
                <div class="cell !p-1 justify-center">
                    <div
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
                    </div>
                </div>
                <div class="cell justify-center">
                    <input
                        v-model="row.dress"
                        disabled
                        type="checkbox"
                        class="w-7 h-7"
                    />
                </div>
                <div class="cell justify-center">
                    <input
                        v-model="row.bible"
                        disabled
                        type="checkbox"
                        class="w-7 h-7"
                    />
                </div>
                <div class="cell !px-[0.375rem] justify-center w-[54px] px-2">
                    <p>{{ row.bonus }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PersonRecord } from '../models'
defineProps<{
    people: PersonRecord[]
}>()
</script>
