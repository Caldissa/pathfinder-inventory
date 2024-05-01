<template>
    <div class="w-full flex justify-center">
        <div class="w-min py-10 grid gap-4 mx-auto">
            <h2 class="text-4xl font-semibold text-center w-full mb-4">
                ATTENDANCE
            </h2>
            <div
                class="bg-white text-3xl font-semibold p-6 shadow-lg border-[1px] rounded-lg flex text-center justify-center flex-col gap-6"
            >
                <h3>CREATE LOG</h3>
                <RouterLink
                    to="/attendance/create-log"
                    class="button secondary p-2"
                >
                    <i class="i-mdi:arrow-right w-8 h-8"></i>
                </RouterLink>
            </div>
            <div
                class="bg-white text-3xl font-semibold p-6 shadow-lg border-[1px] rounded-lg flex text-center justify-center flex-col gap-4"
            >
                <h3>VIEW STATS</h3>
                <RouterLink to="/attendance/view" class="button secondary p-2">
                    <i class="i-mdi:arrow-right w-8 h-8"></i>
                </RouterLink>
            </div>
            <div
                class="bg-white text-3xl font-semibold p-6 shadow-lg border-[1px] rounded-lg flex text-center justify-center flex-col gap-4"
            >
                <h3 class="w-48">EDIT ROSTER</h3>
                <RouterLink to="/attendance/edit" class="button secondary p-2">
                    <i class="i-mdi:arrow-right w-8 h-8"></i>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
