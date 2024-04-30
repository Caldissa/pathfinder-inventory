<template>
    <div class="w-full flex justify-center">
        <div class="w-min py-10 grid gap-4 mx-auto">
            <div
                class="bg-white text-3xl font-semibold p-6 shadow-lg border-[1px] rounded-lg flex text-center justify-center flex-col gap-4"
            >
                <h3>ATTENDANCE</h3>
                <RouterLink to="/attendance" class="button secondary p-2">
                    <i class="i-mdi:arrow-right w-8 h-8"></i>
                </RouterLink>
            </div>
            <div
                class="bg-white text-3xl font-semibold p-6 shadow-lg border-[1px] rounded-lg flex text-center justify-center flex-col gap-4"
            >
                <h3 class="opacity-50">INVENTORY</h3>
                <div class="button disabled p-2">
                    <i class="i-mdi:arrow-right w-8 h-8"></i>
                </div>
                <!-- <RouterLink to="/inventory" class="button secondary p-2">
                    <i class="i-mdi:arrow-right w-8 h-8"></i>
                </RouterLink> -->
            </div>
        </div>
    </div>
</template>
