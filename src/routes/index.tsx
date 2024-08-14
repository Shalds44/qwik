import { component$, $, useResource$, Resource} from "@builder.io/qwik";
import { server$ } from '@builder.io/qwik-city';
import { useSignal } from "@builder.io/qwik";
import type { DocumentHead} from '@builder.io/qwik-city';
import { sql } from "@vercel/postgres";

export const searchUsers = server$(async () =>{
  const { rows } = await sql`SELECT * from users where id=${Math.floor(Math.random() * 10)+1}`
  return rows; 
})

export default component$(() => {
  const changeUser = useSignal(0);

  const useChangeUser = useResource$(async ({ track }) => {

    track(() => changeUser.value);
      return await searchUsers()
  })

  const handleClick = $(async () => {
    changeUser.value++
    console.log(changeUser.value)
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
              <li key={user.id}>{user.name} - {user.country}</li>
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
