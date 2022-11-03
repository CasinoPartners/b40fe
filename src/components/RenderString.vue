<script>

import { compile } from 'vue/dist/vue.esm-bundler.js'
// Include custom components that are embedded in HTML here
// import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'RenderString',
  props: ['content'],
  components: {
    SearchBar,
  },
  setup (props) {
    return compile(props.content)
  },
}

</script>
