import React from "react"
import { api, fetcher } from "../helpers/api";
import type { User } from "../models/user";

export default function useUser(){
    const [user, setUser] = React.useState<User | null>(null);
    const [requeststatus, setRequestStatus] = React.useState<'idle' | 'loading' | 'saving'>(
      'idle'
    );

     const getUser = React.useCallback(async (userName: string) => {
       try {
         setRequestStatus('loading');

         const data = await fetcher(`/users/${userName}`);

         setUser(data);
       } catch (e) {
         console.error(e);
         alert('erro ao buscar usuario');
       } finally {
         setRequestStatus('idle');
       }
     },[]);

      async function createUser(payload: User){
        try{
            setRequestStatus("saving")
            await api("/users", {method: "POST", body: JSON.stringify(payload)})

             alert('Usuário criado com sucesso!');
        }catch(e){
            console.error(e);
            alert("erro ao criar usuario")
        }finally{
            setRequestStatus("idle")
        }
    } 

    return {
      user,
      userRequestStatus: requeststatus,
      getUser,
      createUser,
    };
}