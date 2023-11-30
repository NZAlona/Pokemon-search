const refs = {
  wrapper: document.querySelector('.js-wrapper'),
  form: document.querySelector('.js-form'),
  // input: document.querySelector('.js-field'),
  // btn: document.querySelector('.js-btn'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(ev) {
  ev.preventDefault();

  // const inputValue = refs.input.value;

  // Input value from form using name="query"
  const formInput = ev.currentTarget;
  const inputValue = formInput.elements.query.value;

  fetchPokemonById(inputValue)
    .then(pokemon => {
      console.log(pokemon);

      const val = markup(pokemon);

      refs.wrapper.insertAdjacentHTML('beforeend', val);
    })
    .catch(err => console.log(err));

  ev.currentTarget.reset();
}

function fetchPokemonById(id) {
  refs.wrapper.textContent = '';

  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(resp => {
    return resp.json();
  });
}

const markup = pok =>
  `<li><img src= ${
    pok.sprites.front_default
  } width="140" height="140"></img><p class="text">Name: ${pok.name}</p><p class="text">Height: ${
    pok.height
  }</p><p class="text">Weight: ${pok.weight}</p><p class="text">Abilities: ${pok.abilities.map(
    ability => {
      return ability.ability.name;
    }
  )}</p></li>`;
