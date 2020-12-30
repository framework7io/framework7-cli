<template>
  <f7-page name="home">
    <f7-navbar :sliding="false" large large-transparent>
      <f7-nav-title>
        <i class="f7-navbar-logo"></i>
        <span>Framework7 CLI</span>
      </f7-nav-title>
      <f7-nav-title-large>
        <i class="f7-navbar-logo"></i>
        <span>Framework7 CLI</span>
      </f7-nav-title-large>
    </f7-navbar>

    <div class="center-content">
      <div class="block padding home-cards row">
        <div class="col-100 medium-33 card">
          <a href="/create/" class="card-content card-content-padding link">
            <i class="f7-icons">plus_circle_fill</i>
            <span>Create App</span>
          </a>
        </div>
        <div class="col-100 medium-33 card">
          <a href="/assets/" class="card-content card-content-padding link">
            <i class="f7-icons">photo_fill_on_rectangle_fill</i>
            <span>Generate Assets</span>
          </a>
        </div>
        <div class="col-100 medium-33"></div>
      </div>
    </div>
  </f7-page>
</template>
