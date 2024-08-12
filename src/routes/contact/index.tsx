import { component$, useSignal } from "@builder.io/qwik";

interface ItemProps {
    details: {
        name: string;
        descriptif: string;
        prix: number;
    }
}

export default component$(()=>{
    const count = useSignal(0)
    let prix = 45

    return <div>
        C'est la page contact
        <p>Voici le compteur : {count.value}</p>
        <button class="bg-orange-300 rounded-lg px-4 py-2 hover:bg-orange-600" onClick$={()=>count.value++}>Increment</button>
        <Item details={{name:"marteau", descriptif: "un outil", prix: prix} }/>
        <button class="bg-green-300 rounded-lg px-4 py-2 hover:bg-green-500" onClick$={()=>{prix++}}>Changer le prix</button>
    </div>
})

export const Item = component$<ItemProps>((props) =>{
    return (
        <ul>
            <li> nom : {props.details.name}</li>
            <li> descriptif : {props.details.descriptif}</li>
            <li> prix : {props.details.prix} €</li>
        </ul>
    )
})