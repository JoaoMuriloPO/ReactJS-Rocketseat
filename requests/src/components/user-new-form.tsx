import React from "react";
import useUser from "../hooks/use-User";
import type { User } from "../models/user";

export default function userNewForm(){

    const formRef = React.useRef<HTMLFormElement>(null)
    const { createUser, userRequestStatus } = useUser();


    async function handleSubmit(e: React.FormEvent){
        if(!formRef.current){
            return
        }
        
        e.preventDefault();

        const data = new FormData(formRef.current)

        const payload ={
            id: data.get("id"),
            name: data.get("name")
        }

        await createUser(payload as User);

        
    }

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <input placeholder="UserName" name="id" required />
        </div>
        <div>
          <input placeholder="Name" name="name" required />
        </div>
        <div>
          <button type="submit">
            {userRequestStatus === 'saving' ? 'criando...' : ' Criar Usuario'}
          </button>
        </div>
      </form>
    );
}