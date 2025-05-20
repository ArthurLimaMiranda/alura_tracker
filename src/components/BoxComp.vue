<template>
    <div class="box has-text-weight-bold">
        <slot/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxComp'
})
</script>

<style scoped>
.box{
    background: #FAF0CA;
    color: var(--texto-primario);
}
</style>