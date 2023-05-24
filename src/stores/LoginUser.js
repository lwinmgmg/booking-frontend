import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginUserStore = defineStore('login_user', () => {
  const user = ref(null)
  const getUser = computed(() => user.value)
  const isLogin = computed(() => user.value != null)
  function setUser(inputUser) {
    user.value = inputUser
  }
  function unSetUser(){
    user.value = null
  }

  return { getUser, isLogin, setUser, unSetUser }
})
