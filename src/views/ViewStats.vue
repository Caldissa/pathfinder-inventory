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
            <div v-for="c in cRecords" :key="c[0].date" class="grid gap-4 mb-6">
                <h2 class="text-2xl font-semibold">
                    {{ dayjs(c[0].date).format("ddd, MMMM DD, 'YY") }}
                </h2>
                <DisplayRecord :people="c" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import type { Person, Record, Instance, PersonRecord } from '../models'
import dayjs from 'dayjs'
import DisplayRecord from '../components/DisplayRecord.vue'

const loading = ref(false)
const date = ref(dayjs())
const people = ref([] as Person[])
const records = ref([] as Instance[])
const cRecords = ref([] as PersonRecord[][])

const sort = () => {
    people.value.sort(byClass)
}

const byClass = (a: Person, b: Person) => {
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

const getPeople = async () => {
    people.value = []
    let results = await getDocs(collection(db, 'people'))
    results.forEach((doc) => {
        let d = doc.data()
        d.id = doc.id
        people.value.push(d as Person)
    })
}

const set = async () => {
    await getPeople()
    let q1 = query(
        collection(db, 'records'),
        where('year', '==', date.value.year()),
        where('month', '<', 7)
    )
    let results = await getDocs(q1)
    results.forEach((doc) => {
        records.value.push(doc.data() as Instance)
    })
    let q2 = query(
        collection(db, 'records'),
        where('year', '==', date.value.year() - 1),
        where('month', '>', 7)
    )
    results = await getDocs(q2)
    results.forEach((doc) => {
        records.value.push(doc.data() as Instance)
    })

    records.value.forEach(async (row) => {
        console.log('row', row)
        let r = [] as Record[]
        let q = query(
            collection(db, 'attendance'),
            where('date', '==', row.date)
        )
        let results = await getDocs(q)
        results.forEach((doc) => {
            let d = doc.data()
            d.id = doc.id
            r.push(d as Record)
        })
        let r2 = [] as PersonRecord[]
        r.forEach((row) => {
            let p = people.value.find((person: Person) => {
                return person.id == row.person_id
            })
            if (p) {
                r2.push({
                    person_id: row.person_id,
                    first_name: p.first_name,
                    last_name: p.last_name,
                    class: p.class,
                    date: row.date,
                    presence: row.presence,
                    dress: row.dress,
                    bible: row.bible,
                    bonus: row.bonus
                } as PersonRecord)
            }
        })
        cRecords.value.push(r2)
    })

    console.log('r: ', cRecords.value)
    sort()
}

onMounted(async () => {
    loading.value = true
    set()
    loading.value = false
})
</script>
