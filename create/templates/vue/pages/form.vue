<template>
  <f7-page name="form">
    <f7-navbar title="Form" back-link="Back"></f7-navbar>

    <f7-block-title>Form Example</f7-block-title>
    <f7-list strong-ios dividers-ios outline-ios>
      <f7-list-input label="Name" type="text" placeholder="Your name"></f7-list-input>

      <f7-list-input label="E-mail" type="email" placeholder="E-mail"></f7-list-input>

      <f7-list-input label="URL" type="url" placeholder="URL"></f7-list-input>

      <f7-list-input label="Password" type="password" placeholder="Password"></f7-list-input>

      <f7-list-input label="Phone" type="tel" placeholder="Phone"></f7-list-input>

      <f7-list-input label="Gender" type="select">
        <option>Male</option>
        <option>Female</option>
      </f7-list-input>

      <f7-list-input
        label="Birth date"
        type="date"
        placeholder="Birth day"
        defaultValue="2014-04-30"
      ></f7-list-input>

      <f7-list-item title="Toggle">
        <template #after>
          <f7-toggle />
        </template>
      </f7-list-item>

      <f7-list-input label="Range" :input="false">
        <template #input>
          <f7-range :value="50" :min="0" :max="100" :step="1" />
        </template>
      </f7-list-input>

      <f7-list-input type="textarea" label="Textarea" placeholder="Bio"></f7-list-input>
      <f7-list-input type="textarea" label="Resizable" placeholder="Bio" resizable></f7-list-input>
    </f7-list>

    <f7-block-title>Buttons</f7-block-title>
    <f7-block strong-ios outline-ios class="grid grid-cols-2 grid-gap">
      <f7-button>Button</f7-button>
      <f7-button fill>Fill</f7-button>

      <f7-button raised>Raised</f7-button>
      <f7-button raised fill>Raised Fill</f7-button>

      <f7-button round>Round</f7-button>
      <f7-button round fill>Round Fill</f7-button>

      <f7-button outline>Outline</f7-button>
      <f7-button round outline>Outline Round</f7-button>

      <f7-button small outline>Small</f7-button>
      <f7-button small round outline>Small Round</f7-button>

      <f7-button small fill>Small</f7-button>
      <f7-button small round fill>Small Round</f7-button>

      <f7-button large raised>Large</f7-button>
      <f7-button large fill raised>Large Fill</f7-button>

      <f7-button large fill raised color="red">Large Red</f7-button>
      <f7-button large fill raised color="green">Large Green</f7-button>
    </f7-block>

    <f7-block-title>Checkbox group</f7-block-title>
    <f7-list strong-ios outline-ios dividers-ios>
      <f7-list-item checkbox name="my-checkbox" value="Books" title="Books"></f7-list-item>
      <f7-list-item checkbox name="my-checkbox" value="Movies" title="Movies"></f7-list-item>
      <f7-list-item checkbox name="my-checkbox" value="Food" title="Food"></f7-list-item>
    </f7-list>

    <f7-block-title>Radio buttons group</f7-block-title>
    <f7-list strong-ios outline-ios dividers-ios>
      <f7-list-item radio name="radio" value="Books" title="Books"></f7-list-item>
      <f7-list-item radio name="radio" value="Movies" title="Movies"></f7-list-item>
      <f7-list-item radio name="radio" value="Food" title="Food"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
