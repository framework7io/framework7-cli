<Page>
  <Navbar title={`${user.firstName} ${user.lastName}`} backLink="Back" />
  <Block strong inset>
    {user.about}
  </Block>
  <List strong inset dividersIos>
    {#each user.links as link}
      <ListItem
        link={link.url}
        title={link.title}
        external
        target="_blank"
      />
    {/each}
  </List>
</Page>
<script>
  import { Page, Navbar, Block, List, ListItem } from 'framework7-svelte';

  export let user;
</script>
