import {create} from 'zustand'
export const useStore = create((set)=>({
    username:'',
    setUserName:clr=>set({username:clr})
    // changeName:()=>set((state)=>({username:state.username})),
    // removeAllName:()=>set({username:''})
  }))
// export default useStore