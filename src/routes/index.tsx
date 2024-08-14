import { component$, $, useResource$, Resource} from "@builder.io/qwik";
import { server$ } from '@builder.io/qwik-city';
import { useSignal } from "@builder.io/qwik";
import type { DocumentHead} from '@builder.io/qwik-city';
import pkg from 'pg';
const {Pool} = pkg;
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `localhost`




export const searchUsers = server$(async () =>{
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  const user = await prisma.user.findUnique({
    where: {
      id: '1',
    },
  })
  console.log(user)
    return user; 
  })

export default component$(() => {

  const changeUser = useSignal(0);

  const useChangeUser = useResource$(async ({ track }) => {

    track(() => changeUser.value);
      return await searchUsers()
  })

  const handleClick = $(async () => {
    changeUser.value++
  });

  return (
    <div>
      <Resource
        value={useChangeUser}
        onPending={() => <p>Chargement...</p>}
        onRejected={() => <p>Erreur lors du chargement des utilisateurs.</p>}
        onResolved={(users) => (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.firstname} - {user.lastname}</li>
            ))}
          </ul>
        )}
      />
      <button 
        onClick$={handleClick}>
        Change User
      </button>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
