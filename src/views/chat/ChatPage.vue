<template>
  <div id="app">
    <Heads class="head">
    </Heads>
    <ChatList>
    </ChatList>
  </div>
</template>

<script>
import Heads from './components/Heads'
import ChatList from './components/ChatList'

export default {
  name: 'ChatPage',
  components: {
    Heads,
    ChatList
  }
}
</script>

<style>


</style>
