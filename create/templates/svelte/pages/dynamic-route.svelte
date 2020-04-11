<Page>
  <Navbar title="Dynamic Route" backLink="Back" />
  <Block strong>
    <ul>
      <li><b>Url:</b> {f7route.url}</li>
      <li><b>Path:</b> {f7route.path}</li>
      <li><b>Hash:</b> {f7route.hash}</li>
      <li><b>Params:</b>
        <ul>
          {#each Object.keys(f7route.params) as key}
            <li><b>{key}:</b> {f7route.params[key]}</li>
          {/each}
        </ul>
      </li>
      <li><b>Query:</b>
        <ul>
          {#each Object.keys(f7route.query) as key}
            <li><b>{key}:</b> {f7route.query[key]}</li>
          {/each}
        </ul>
      </li>
      <li><b>Route:</b> {f7route.route.path}</li>
    </ul>
  </Block>
  <Block strong>
    <Link onClick={() => f7router.back()}>Go back via Router API</Link>
  </Block>
</Page>
<script>
  import { Page, Navbar, Block, Link } from 'framework7-svelte';

  export let f7route;
  export let f7router;
</script>
