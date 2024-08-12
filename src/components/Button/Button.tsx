import { component$ } from '@builder.io/qwik';

export interface ButtonProps {

}

export const Button = component$<ButtonProps>((props) => {
  return (
    <button class="bg-orange-300">
      Button component works!
    </button>
  );
});
