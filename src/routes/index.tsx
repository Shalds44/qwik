import { component$, $, useResource$, Resource} from "@builder.io/qwik";
import { server$ } from '@builder.io/qwik-city';
import { useSignal } from "@builder.io/qwik";
import type { DocumentHead} from '@builder.io/qwik-city';
import { sql } from "@vercel/postgres";

export const searchCustomers = server$(async () =>{
  const idArray = [
    '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    '76d65c26-f784-44a2-ac19-586678f7c2f2',
    'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    '50ca3e18-62cd-11ee-8c99-0242ac120002'
  ]
  const { rows } = await sql`SELECT * from customers where id=${idArray[Math.floor(Math.random() * 4)]}`
  return rows; 
})

export default component$(() => {
  const changeCustomer = useSignal(0);

  const useChangeCustomer = useResource$(async ({ track }) => {

    track(() => changeCustomer.value);
      return await searchCustomers()
  })

  const handleClick = $(async () => {
    changeCustomer.value++
    console.log(changeCustomer.value)
  });

  return (
    <div>
      <Resource
        value={useChangeCustomer}
        onPending={() => <p>Chargement...</p>}
        onRejected={() => <p>Erreur lors du chargement des utilisateurs.</p>}
        onResolved={(users) => (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name} - {user.email}</li>
            ))}
          </ul>
        )}
      />
      <button 
        onClick$={handleClick}>
        Change Customer
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
