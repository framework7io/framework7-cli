<Page name="settings">
  <Navbar title="Settings" />

  <BlockTitle>Form Example</BlockTitle>
  <List strongIos outlineIos dividersIos>
    <ListInput
      label="Name"
      type="text"
      placeholder="Your name"
    ></ListInput>

    <ListInput
      label="E-mail"
      type="email"
      placeholder="E-mail"
    ></ListInput>

    <ListInput
      label="URL"
      type="url"
      placeholder="URL"
    ></ListInput>

    <ListInput
      label="Password"
      type="password"
      placeholder="Password"
    ></ListInput>

    <ListInput
      label="Phone"
      type="tel"
      placeholder="Phone"
    ></ListInput>

    <ListInput
      label="Gender"
      type="select"
      >
      <option>Male</option>
      <option>Female</option>
    </ListInput>

    <ListInput
      label="Birth date"
      type="date"
      placeholder="Birth day"
      value="2014-04-30"
    ></ListInput>

    <ListItem
      title="Toggle"
    >
      <span slot="after">
        <Toggle />
      </span>
    </ListItem>

    <ListInput
      label="Range"
      input={false}
    >
      <span slot="input">
        <Range value={50} min={0} max={100} step={1} />
      </span>
    </ListInput>

    <ListInput
      type="textarea"
      label="Textarea"
      placeholder="Bio"
    ></ListInput>
    <ListInput
      type="textarea"
      label="Resizable"
      placeholder="Bio"
      resizable
    ></ListInput>
  </List>

  <BlockTitle>Buttons</BlockTitle>
  <Block strongIos outlineIos class="grid grid-cols-2 grid-gap">
    <Button>Button</Button>
    <Button fill>Fill</Button>

    <Button raised>Raised</Button>
    <Button raised fill>Raised Fill</Button>

    <Button round>Round</Button>
    <Button round fill>Round Fill</Button>

    <Button outline>Outline</Button>
    <Button round outline>Outline Round</Button>

    <Button small outline>Small</Button>
    <Button small round outline>Small Round</Button>

    <Button small fill>Small</Button>
    <Button small round fill>Small Round</Button>

    <Button large raised>Large</Button>
    <Button large fill raised>Large Fill</Button>

    <Button large fill raised color="red">Large Red</Button>
    <Button large fill raised color="green">Large Green</Button>
  </Block>

  <BlockTitle>Checkbox group</BlockTitle>
  <List strongIos outlineIos dividersIos>
    <ListItem
      checkbox
      name="my-checkbox"
      value="Books"
      title="Books"
    ></ListItem>
    <ListItem
      checkbox
      name="my-checkbox"
      value="Movies"
      title="Movies"
    ></ListItem>
    <ListItem
      checkbox
      name="my-checkbox"
      value="Food"
      title="Food"
    ></ListItem>
  </List>

  <BlockTitle>Radio buttons group</BlockTitle>
  <List strongIos outlineIos dividersIos>
    <ListItem
      radio
      name="radio"
      value="Books"
      title="Books"
    ></ListItem>
    <ListItem
      radio
      name="radio"
      value="Movies"
      title="Movies"
    ></ListItem>
    <ListItem
      radio
      name="radio"
      value="Food"
      title="Food"
    ></ListItem>
  </List>
</Page>
<script>
  import {
    Page,
    Navbar,
    List,
    ListInput,
    ListItem,
    Toggle,
    BlockTitle,
    Button,
    Range,
    Block
  } from 'framework7-svelte';
</script>
