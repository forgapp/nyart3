import { h, Component } from 'preact';
import { Selectbox } from '../selectbox';

const EditLanguages = ({ languages, handleChange }) => {
  const languageElements = languages
    .map((language, index) => {
      const delLanguage = (event) => {
        event.preventDefault();

        deleteLanguage(index);
      }

      const chgLanguage = (event) => {
        event.preventDefault();

        changeLangage(index, event.target.value);
      }

       const chgLevel = (event) => {
        event.preventDefault();

        changeLevel(index, event.target.value);
      }

      return (<div class="field has-addons">
        <p class="control">
          <Selectbox id={ `Languages-${index}`} type='Language' value={ language.Language } handleChange={ chgLanguage } />
        </p>
        <p class="control">
          <Selectbox id={ `Level-${index}`} type='LanguageLevel' value={ language.Level } handleChange={ chgLevel } />
        </p>
        <p class="control">
          <button onClick={ delLanguage } class="button is-danger">
            <i class="fa fa-trash"></i>
          </button>
        </p>
      </div>)
    });

  const changeLevel = (index, value) => {
    const newLanguage = Object.assign({}, languages[index], {
      Level: value
    });

    const newLanguages = [
      ...languages.slice(0, index),
      newLanguage,
      ...languages.slice(index + 1, languages.length)
    ];

    handleChange({ target: {
      id: 'Languages',
      value: newLanguages
    }})
  }

  const changeLangage = (index, value) => {
    const newLanguage = Object.assign({}, languages[index], {
      Language: value
    });

    const newLanguages = [
      ...languages.slice(0, index),
      newLanguage,
      ...languages.slice(index + 1, languages.length)
    ];

    handleChange({ target: {
      id: 'Languages',
      value: newLanguages
    }})
  }

  const deleteLanguage = (index) => {
    const newLanguages = [
      ...languages.slice(0, index),
      ...languages.slice(index + 1, languages.length)
    ];

    handleChange({ target: {
      id: 'Languages',
      value: newLanguages
    }})
  }

  const addOtherLanguage = (event) => {
    event.preventDefault();

    const newLanguages =  [ ...languages, {
        Language: '',
        Level: ''
      }]

    handleChange({ target: {
      id: 'Languages',
      value: newLanguages
    }})
  }

  return (<div>
    { languageElements }
    <div class="field ">
      <div class="control">
        <button onClick={ addOtherLanguage } class="button is-link">Add other language</button>
      </div>
    </div>
  </div>);
};

export default EditLanguages;
