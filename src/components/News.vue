<template>
    <div>
        <div class="editor">
            <Editor></Editor>
        </div>
    </div>
</template>
<script>
import editor from './editor/quill'

export default {
    name: 'News',
    components: {
        'Editor': editor
    },
    data () {
        return {

        }
    }
}
</script>
<style>
.editor {
    width: 90vw;
    height: 80vh;
    margin: 0 auto; 
}
</style>