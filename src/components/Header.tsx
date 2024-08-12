import { component$ } from "@builder.io/qwik";
import { Link } from '@builder.io/qwik-city';

export default component$(()=>{
    return(
        <nav class="p-4 sticky border-b">
            <div class="flex w-5/12">
                <Link class="px-4" href="/">Home</Link>
                <Link class="px-4" href="/joke">Joke</Link>
                <Link class="px-4" href="/about">About</Link>
                <Link class="px-4" href="/contact">Contact</Link>
            </div>
        </nav>
    )
})