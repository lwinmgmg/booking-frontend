import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const getCartItems = computed(() => cart.value)
  const getSelectedItems = computed(() => cart.value.filter((v)=>v.is_selected))
  function addItem(item) {
    let isFound = false
    cart.value.forEach((itm)=>{
        if (itm.product.id == item.product.id){
            isFound = true
            itm.quantity += item.quantity
        }
    })
    if (!isFound){
        cart.value.push({...item, is_selected: false})
    }
  }
  function clearSelected(){
    cart.value = cart.value.filter((v)=>!v.is_selected)
  }
  function clearCard(){
    user.value = []
  }
  return { getCartItems, getSelectedItems, addItem, clearCard, clearSelected }
})
