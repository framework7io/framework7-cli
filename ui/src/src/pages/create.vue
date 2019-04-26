<template>
  <f7-page name="create">
    <f7-navbar :sliding="false" large>
      <f7-nav-title>
        <i class="f7-navbar-logo"></i>
        <span>Create App</span>
      </f7-nav-title>
      <f7-nav-title-large>
        <i class="f7-navbar-logo"></i>
        <span>Create App</span>
      </f7-nav-title-large>
    </f7-navbar>

    <div class="center-content">
      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">info_round</i>
          <span>General</span>
        </f7-block-title>

        <f7-block-title medium>Destination</f7-block-title>
        <f7-block-header>New Framework7 app will be created in the following directory:</f7-block-header>
        <f7-block class="no-padding">
          <pre class="round">{{cwd}}</pre>
        </f7-block>

        <f7-block-title medium>App Type</f7-block-title>
        <f7-block-header>What types of the app are you targeting? (multiple allowed)</f7-block-header>
        <div class="row checkbox-row">
          <div class="col-33 checkbox-col" :class="{checked: type.indexOf('web') >= 0}">
            <div class="col-icon" @click="toggleArrayValue(type, 'web')">
              <span class="text-icon">www</span>
            </div>
            <div class="col-label">Simple web app</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: type.indexOf('pwa') >= 0}">
            <div class="col-icon" @click="toggleArrayValue(type, 'pwa')">
              <svg xmlns="http://www.w3.org/2000/svg" width="134" height="50" viewBox="0 0 134 50">
                <g fill="var(--checkbox-col-text-color)">
                  <polygon points="98.196 41.045 102.059 31.343 113.214 31.343 107.92 16.627 114.541 0 133.505 50 119.52 50 116.279 41.045"/>
                  <polygon points="86.212 50 106.443 0 93.031 0 79.191 32.311 69.35 0 59.041 0 48.474 32.311 41.022 17.588 34.278 38.29 41.125 50 54.325 50 63.874 21.024 72.978 50"/>
                  <path d="M12.7453596,32.8358409 L21.015736,32.8358409 C23.5209828,32.8358409 25.7518102,32.557516 27.7082184,32.0008663 L29.8470487,25.4418975 L35.8247423,7.11055644 C35.3692677,6.39195312 34.8492721,5.71251666 34.2647556,5.0723355 C31.1955651,1.69073966 26.7050671,0 20.7931248,0 L0,0 L0,50 L12.7453596,50 L12.7453596,32.8358409 Z M23.6924692,11.5030001 C24.8913023,12.7039946 25.4906505,14.3111488 25.4906505,16.3245987 C25.4906505,18.3534923 24.9634784,19.9626194 23.9092024,21.1519802 C22.7534289,22.47353 20.6252609,23.1342709 17.5248351,23.1342709 L12.7453596,23.1342709 L12.7453596,9.70140629 L17.5599663,9.70140629 C20.4495368,9.70140629 22.4937045,10.3019376 23.6924692,11.5030001 Z"/>
                </g>
              </svg>
            </div>
            <div class="col-label">PWA (Progressive Web App)</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: type.indexOf('cordova') >= 0}">
            <div class="col-icon" @click="toggleArrayValue(type, 'cordova')">
              <svg xmlns="http://www.w3.org/2000/svg" width="53" height="50" viewBox="0 0 53 50">
                <path fill="var(--checkbox-col-text-color)" d="M47.5862069,50 L39.1133005,50 L39.7044335,42.8571429 L35.5418719,42.8571429 L34.9507389,50 L17.3891626,50 L16.7980296,42.8571429 L12.635468,42.8571429 L13.226601,50 L4.75369458,50 L0,19.0394089 L11.8965517,0 L40.4433498,0 L52.3399015,19.0394089 L47.5862069,50 Z M38.0541872,9.5320197 L30.4187192,9.5320197 L30.9359606,13.1034483 L21.4039409,13.1034483 L21.9211823,9.5320197 L14.2857143,9.5320197 L9.50738916,19.0394089 L11.8965517,38.0788177 L40.4433498,38.0788177 L42.8325123,19.0394089 L38.0541872,9.5320197 Z M33.8916256,31.773399 C33.226601,31.773399 32.7093596,29.8029557 32.7093596,27.3399015 C32.7093596,24.8768473 33.2512315,22.9064039 33.8916256,22.9064039 C34.5566502,22.9064039 35.0738916,24.8768473 35.0738916,27.3399015 C35.0738916,29.8029557 34.5566502,31.773399 33.8916256,31.773399 Z M18.8916256,32.1428571 C18.226601,32.1428571 17.7093596,30.1724138 17.7093596,27.7093596 C17.7093596,25.2463054 18.2512315,23.2758621 18.8916256,23.2758621 C19.5566502,23.2758621 20.0738916,25.2463054 20.0738916,27.7093596 C20.0738916,30.1724138 19.5320197,32.1428571 18.8916256,32.1428571 Z"/>
              </svg>
            </div>
            <div class="col-label">Cordova app (targets native iOS and Android apps, or native desktop app with Electron)</div>
          </div>
        </div>

        <div class="row">
          <div class="col-100 tablet-50">
            <f7-block-title medium>App (project) name</f7-block-title>
            <f7-list no-hairlines-between class="inputs-list no-margin-right">
              <f7-list-input
                class="col-100 tablet-50"
                type="text"
                outline
                clear-button
                required
                validate
                validate-on-blur
                :value="name"
                @input="name = $event.target.value"
              ></f7-list-input>
            </f7-list>
          </div>
          <div class="col-100 tablet-50" v-if="type.indexOf('cordova') >= 0">
            <f7-block-title medium>App package (Bundle ID)</f7-block-title>
            <f7-list no-hairlines-between class="inputs-list no-margin-right">
              <f7-list-input
                class="col-100 tablet-50"
                type="text"
                outline
                clear-button
                required
                validate
                validate-on-blur
                :value="pkg"
                @input="pkg = $event.target.value"
              ></f7-list-input>
            </f7-list>
          </div>
        </div>
      </f7-block>


      <!-- CORDOVA -->
      <f7-block v-if="type.indexOf('cordova') >= 0" tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="block-icon block-icon-cordova"></i>
          <span>Cordova</span>
          <div class="right">
            <span class="toggle-label disabled">Advanced</span>
            <f7-toggle color="green" :checked="cordovaAdvanced" @change="cordovaAdvanced = !cordovaAdvanced" />
          </div>
        </f7-block-title>

        <f7-block-title>Target Cordova platform (multiple allowed)</f7-block-title>
        <div class="row checkbox-row">
          <div class="col-33 checkbox-col" :class="{checked: cordova.platforms.indexOf('ios') >= 0}">
            <div class="col-icon" @click="toggleArrayValue(cordova.platforms, 'ios')">
              <i class="icon f7-icons">logo_apple</i>
            </div>
            <div class="col-label">iOS</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: cordova.platforms.indexOf('android') >= 0}">
            <div class="col-icon" @click="toggleArrayValue(cordova.platforms, 'android')">
              <i class="icon f7-icons">logo_android</i>
            </div>
            <div class="col-label">Android</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: cordova.platforms.indexOf('electron') >= 0}">
            <div class="col-icon" @click="toggleArrayValue(cordova.platforms, 'electron')">
              <i class="icon f7-icons">device_desktop</i>
            </div>
            <div class="col-label">Electron</div>
          </div>
        </div>
        <template v-if="cordovaAdvanced">
          <f7-block-title>Pre-installed Cordova plugins</f7-block-title>
          <f7-list media-list no-hairlines-between>
            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-statusbar') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-statusbar')"
              title="cordova-plugin-statusbar"
              text="Allows to customize native iOS and Android status bar"
            />
            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-keyboard') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-keyboard')"
              title="cordova-plugin-keyboard"
              text="Allows to correctly handle native keyboard and shrink/expand webview on keyboard open/close"
            />
            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-splashscreen') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-splashscreen')"
              title="cordova-plugin-splashscreen"
              text="Display and hide splash screen during application launch"
            />
            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-wkwebview-engine') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-wkwebview-engine')"
              title="cordova-plugin-wkwebview-engine"
              text="Modern iOS webview"
            />

            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-device') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-device')"
              title="cordova-plugin-device"
              text="Plugin provides information about device software and hardware"
            />
            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-inappbrowser') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-inappbrowser')"
              title="cordova-plugin-inappbrowser"
              text="Plugin provides a web browser to display an external web content"
            />
            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-file') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-file')"
              title="cordova-plugin-file"
              text="Plugin implements a File API allowing read/write access to files residing on the device."
            />
            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-media') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-media')"
              title="cordova-plugin-media"
              text="Plugin provides the ability to record and play back audio files on a device"
            />
            <f7-list-item
              checkbox
              :checked="cordova.plugins.indexOf('cordova-plugin-safariviewcontroller') >= 0"
              @change="toggleArrayValue(cordova.plugins, 'cordova-plugin-safariviewcontroller')"
              title="cordova-plugin-safariviewcontroller"
              text="Better and more modern implementation of in-app browser (for iOS only)"
            />
          </f7-list>

        </template>
      </f7-block>


      <!-- FRAMEWORK -->
      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">settings_fill</i>
          <span>Framework</span>
        </f7-block-title>

        <f7-block-title>What type of framework do you prefer?</f7-block-title>
        <div class="row checkbox-row">
          <div class="col-33 checkbox-col" :class="{checked: framework === 'core'}">
            <div class="col-icon" @click="framework = 'core'">
              <img src="../assets/logo.svg">
            </div>
            <div class="col-label">Framework7 Core</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: framework === 'vue'}">
            <div class="col-icon" @click="framework = 'vue'; bundler = 'webpack'">
              <img src="../assets/logo.svg">
              <img src="../assets/vuejs-logo.svg">
            </div>
            <div class="col-label">Framework7 with Vue.js</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: framework === 'react'}">
            <div class="col-icon" @click="framework = 'react'; bundler = 'webpack'">
              <img src="../assets/logo.svg">
              <img src="../assets/react-logo.svg">
            </div>
            <div class="col-label">Framework7 with React</div>
          </div>
        </div>
      </f7-block>


      <!-- TEMPLATE -->
      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">rocket_fill</i>
          <span>Starter template</span>
        </f7-block-title>

        <f7-block-title>Choose starter template</f7-block-title>
        <div class="row checkbox-row">
          <div class="col-33 checkbox-col checkbox-template-col" :class="{checked: template === 'single-view'}">
            <div class="col-icon" @click="template = 'single-view'">
              <img src="../assets/t-single-view.svg">
            </div>
            <div class="col-label">Single View</div>
          </div>
          <div class="col-33 checkbox-col checkbox-template-col" :class="{checked: template === 'tabs'}">
            <div class="col-icon" @click="template = 'tabs'">
              <img src="../assets/t-tabs.svg">
            </div>
            <div class="col-label">Tabbed Views (Tabs)</div>
          </div>
          <div class="col-33 checkbox-col checkbox-template-col" :class="{checked: template === 'split-view'}">
            <div class="col-icon" @click="template = 'split-view'">
              <img src="../assets/t-split-view.svg">
            </div>
            <div class="col-label">Split View (Split Panel)</div>
          </div>
        </div>
      </f7-block>

      <!-- BUNDLER -->
      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="block-icon block-icon-webpack"></i>
          <span>Bundler</span>
          <div class="right" v-if="bundler">
            <span class="toggle-label disabled">Advanced</span>
            <f7-toggle :checked="bundlerAdvanced" @change="bundlerAdvanced = !bundlerAdvanced" color="green" />
          </div>
        </f7-block-title>

        <f7-block-title>Should we setup project with bundler?</f7-block-title>
        <f7-list tablet-inset no-hairlines-between>
          <f7-list-item
            :class="{disabled: framework !== 'core'}"
            radio
            title="No bundler"
            @change="bundler = false"
            :checked="bundler === false && framework === 'core'"
            :disabled="framework !== 'core'"
          ></f7-list-item>
          <f7-list-item
            radio
            title="Webpack (recommended)"
            @change="bundler = 'webpack'"
            :checked="bundler === 'webpack' || framework !== 'core'"
            :disabled="framework !== 'core'"
          ></f7-list-item>
        </f7-list>

        <template v-if="bundler ==='webpack'">
          <f7-block-title>Do you want to setup CSS Pre-Processor?</f7-block-title>
          <f7-list no-hairlines-between>
            <f7-list-item
              radio
              title="No, i am good with CSS"
              @change="cssPreProcessor = false"
              :checked="cssPreProcessor === false"
            ></f7-list-item>
            <f7-list-item
              radio
              title="Less"
              @change="cssPreProcessor = 'less'"
              :checked="cssPreProcessor === 'less'"
            ></f7-list-item>
            <f7-list-item
              radio
              title="Stylus"
              @change="cssPreProcessor = 'stylus'"
              :checked="cssPreProcessor === 'stylus'"
            ></f7-list-item>
            <f7-list-item
              radio
              title="SCSS (SASS)"
              @change="cssPreProcessor = 'scss'"
              :checked="cssPreProcessor === 'scss'"
            ></f7-list-item>
          </f7-list>
        </template>
        <template v-if="bundler ==='webpack' && bundlerAdvanced">
          <f7-block-title>Webpack settings</f7-block-title>
          <f7-list no-hairlines-between media-list>
            <f7-list-item
              checkbox
              title="Development source map"
              text="In dev mode it generates cheap (eval) source map. Disable for even faster dev builds"           @change="webpack.developmentSourceMap = $event.target.checked"
              :checked="webpack.developmentSourceMap === true"
            ></f7-list-item>
            <f7-list-item
              checkbox
              title="Production source map"
              text="Disable for faster production builds, but without source maps"              @change="webpack.productionSourceMap = $event.target.checked"
              :checked="webpack.productionSourceMap === true"
            ></f7-list-item>
            <f7-list-item
              checkbox
              title="Inline small assets"
              text="When enabled, it will load small assets (less than 10Kb) and insert inline as base64 URIs"
              @change="webpack.inlineAssets = $event.target.checked"
              :checked="webpack.inlineAssets === true"
            ></f7-list-item>
            <f7-list-item
              checkbox
              title="Hash assets and bundle"
              text="When enabled, it will add MD5 hash of the file content to generated bundle and to assets, to something like app.b34c1df56.js. Such file naming can force browser to clear its cache"              @change="webpack.hashAssets = $event.target.checked"
              :checked="webpack.hashAssets === true"
            ></f7-list-item>
            <f7-list-item
              checkbox
              title="Preserve assets path"
              text="By default, webpack will move all assets to folders based on asset type (images to /images/ folder, videos and audio to /media/ folder, etc. If this option enabled, it will preserve assets path and keep files and folder structure"
              @change="webpack.preserveAssetsPaths = $event.target.checked"
              :checked="webpack.preserveAssetsPaths === true"
            ></f7-list-item>
          </f7-list>
        </template>
      </f7-block>

      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">color_filter</i>
          <span>Theming</span>
        </f7-block-title>

        <f7-list media-list no-hairlines-between>
          <f7-list-item
            title="Include Framework7 Icons and Material Icons icon fonts"
            text="Disable if you want to use own custom icons"
            checkbox
            :checked="theming.iconFonts === true"
            @change="theming.iconFonts = $event.target.checked"
          />
          <f7-list-item
            title="Custom color theme"
            text="Enable to specify custom color theme"
            checkbox
            :checked="theming.customColor === true"
            @change="theming.customColor = $event.target.checked"
          />
          <f7-list-input
            v-if="theming.customColor"
            type="colorpicker"
            label="Enter custom theme color"
            placeholder="e.g. #ff0000"
            required
            validate
            :value="{ hex: theming.color }"
            :colorPickerParams="{
              backdrop: false,
              targetEl: '.color-picker-target',
              targetElSetBackgroundColor: true,
              routableModals: false,
              modules: ['sb-spectrum', 'hue-slider', 'hex'],
              hexLabel: true,
              hexValueEditable: true,
              cssClass: 'theme-dark',
            }"
            @colorpicker:change="(v) => theming.color = v.hex"
          >
            <i
              slot="media"
              class="icon color-picker-target"
              :style="{
                'border-radius': '4px',
                width: '18px',
                height: '18px',
              }"

            ></i>
          </f7-list-input>
          <f7-list-item
            title="Dark theme"
            text="Enables dark theme by default"
            checkbox
            :checked="theming.darkTheme === true"
            @change="theming.darkTheme = $event.target.checked"
          />
          <f7-list-item
            title="Fill style navigation bars"
            text="Enables dark theme by default"
            checkbox
            :checked="theming.fillBars === true"
            @change="theming.fillBars = $event.target.checked"
          />

        </f7-list>
      </f7-block>

      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">data_fill</i>
          <span>Custom Build</span>
        </f7-block-title>

        <f7-block-title>Core components (required)</f7-block-title>
        <div class="row">
          <div class="col-50">
            <f7-list class="no-margin-top">
              <f7-list-item checked checkbox disabled title="App" />
              <f7-list-item checked checkbox disabled title="Statusbar" />
              <f7-list-item checked checkbox disabled title="View" />
              <f7-list-item checked checkbox disabled title="Navbar" />
              <f7-list-item checked checkbox disabled title="Toolbar" />
              <f7-list-item checked checkbox disabled title="Subnavbar" />
              <f7-list-item checked checkbox disabled title="Touch Ripple" />
              <f7-list-item checked checkbox disabled title="Modal" />
            </f7-list>
          </div>
          <div class="col-50">
            <f7-list class="no-margin-top">
              <f7-list-item checked checkbox disabled title="Page" />
              <f7-list-item checked checkbox disabled title="Link" />
              <f7-list-item checked checkbox disabled title="Block" />
              <f7-list-item checked checkbox disabled title="List" />
              <f7-list-item checked checkbox disabled title="Badge" />
              <f7-list-item checked checkbox disabled title="Button" />
              <f7-list-item checked checkbox disabled title="Icon" />
            </f7-list>
          </div>
        </div>

        <f7-block-title>Core components (required)</f7-block-title>
        <div class="row">
          <div class="col-33">
            <f7-list class="no-margin-top">
              <f7-list-item checkbox :checked="!!('accordion')" title="Accordion" />
              <f7-list-item checkbox :checked="!!('actions')" title="Actions" />
              <f7-list-item checkbox :checked="!!('appbar')" title="Appbar" />
              <f7-list-item checkbox :checked="!!('autocomplete')" title="Autocomplete" />
              <f7-list-item checkbox :checked="!!('calendar')" title="Calendar" />
              <f7-list-item checkbox :checked="!!('card')" title="Card" />
              <f7-list-item checkbox :checked="!!('checkbox')" title="Checkbox" />
              <f7-list-item checkbox :checked="!!('chip')" title="Chip" />
              <f7-list-item checkbox :checked="!!('color-picker')" title="Color Picker" />
              <f7-list-item checkbox :checked="!!('contacts-list')" title="Contacts List" />
              <f7-list-item checkbox :checked="!!('data-table')" title="Data Table" />
              <f7-list-item checkbox :checked="!!('dialog')" title="Dialog" />
              <f7-list-item checkbox :checked="!!('elevation')" title="Elevation" />
              <f7-list-item checkbox :checked="!!('fab')" title="FAB" />
              <f7-list-item checkbox :checked="!!('form')" title="Form" />
              <f7-list-item checkbox :checked="!!('gauge')" title="Gauge" />
              <f7-list-item checkbox :checked="!!('grid')" title="Grid" />
            </f7-list>
          </div>
          <div class="col-33">
            <f7-list class="no-margin-top">
              <f7-list-item checkbox :checked="!!('infinite-scroll')" title="Infinite Scroll" />
              <f7-list-item checkbox :checked="!!('input')" title="Input" />
              <f7-list-item checkbox :checked="!!('lazy')" title="Lazy" />
              <f7-list-item checkbox :checked="!!('list-index')" title="List Index" />
              <f7-list-item checkbox :checked="!!('login-screen')" title="Login Screen" />
              <f7-list-item checkbox :checked="!!('menu')" title="Menu" />
              <f7-list-item checkbox :checked="!!('messagebar')" title="Messagebar" />
              <f7-list-item checkbox :checked="!!('messages')" title="Messages" />
              <f7-list-item checkbox :checked="!!('notification')" title="Notification" />
              <f7-list-item checkbox :checked="!!('panel')" title="Panel" />
              <f7-list-item checkbox :checked="!!('photo-browser')" title="Photo Browser" />
              <f7-list-item checkbox :checked="!!('picker')" title="Picker" />
              <f7-list-item checkbox :checked="!!('popover')" title="Popover" />
              <f7-list-item checkbox :checked="!!('popup')" title="Popup" />
              <f7-list-item checkbox :checked="!!('preloader')" title="Preloader" />
              <f7-list-item checkbox :checked="!!('progressbar')" title="Progressbar" />
              <f7-list-item checkbox :checked="!!('pull-to-refresh')" title="Pull To Refresh" />
            </f7-list>
          </div>
          <div class="col-33">
            <f7-list class="no-margin-top">
              <f7-list-item checkbox :checked="!!('radio')" title="Radio" />
              <f7-list-item checkbox :checked="!!('range')" title="Range" />
              <f7-list-item checkbox :checked="!!('searchbar')" title="Searchbar" />
              <f7-list-item checkbox :checked="!!('sheet')" title="Sheet" />
              <f7-list-item checkbox :checked="!!('skeleton')" title="Skeleton" />
              <f7-list-item checkbox :checked="!!('smart-select')" title="Smart Select" />
              <f7-list-item checkbox :checked="!!('sortable')" title="Sortable" />
              <f7-list-item checkbox :checked="!!('stepper')" title="Stepper" />
              <f7-list-item checkbox :checked="!!('swipeout')" title="Swipeout" />
              <f7-list-item checkbox :checked="!!('swiper')" title="Swiper" />
              <f7-list-item checkbox :checked="!!('tabs')" title="Tabs" />
              <f7-list-item checkbox :checked="!!('timeline')" title="Timeline" />
              <f7-list-item checkbox :checked="!!('toast')" title="Toast" />
              <f7-list-item checkbox :checked="!!('toggle')" title="Toggle" />
              <f7-list-item checkbox :checked="!!('tooltip')" title="Tooltip" />
              <f7-list-item checkbox :checked="!!('typography')" title="Typography" />
              <f7-list-item checkbox :checked="!!('virtual-list')" title="Virtual List" />
            </f7-list>
          </div>
        </div>
      </f7-block>



      <f7-popup class="popup-log" :closeByBackdropClick="false" :opened="log && log.length > 0">
        <pre ref="logEl" v-html="logText(log)"></pre>
      </f7-popup>

      <f7-block tablet-inset class="no-padding button-block">
        <f7-button v-if="!done && !error" :class="{loading: loading}" class="button-center-content" style="width: 300px;" large fill round @click="createApp" icon-f7="gear_fill" :text="loading ? 'Creating app...' : 'Create App'"></f7-button>
        <f7-button v-if="done" class="button-center-content" style="width: 300px;" large fill round icon-f7="check" text="Done" color="green"></f7-button>
        <f7-button v-if="error" class="button-center-content" style="width: 300px;" large fill round icon-f7="close" text="Error" color="red"></f7-button>
      </f7-block>
    </div>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7NavTitle, f7NavTitleLarge, f7BlockTitle, f7BlockHeader, f7Block, f7List, f7ListInput, f7ListItem, f7Button, f7Toggle, f7Checkbox, f7Radio, f7Popup } from 'framework7-vue';
  import logText from '../utils/log-text';
  import getLog from '../utils/get-log';

  export default {
    components: {
      f7Page, f7Navbar, f7NavTitle, f7NavTitleLarge, f7BlockTitle, f7BlockHeader, f7Block, f7List, f7ListInput, f7ListItem, f7Button, f7Toggle, f7Checkbox, f7Radio, f7Popup
    },
    data() {
      return {
        loading: false,
        log: [],
        done: false,
        error: false,
        bundlerAdvanced: false,
        cordovaAdvanced: false,

        cwd: '',
        name: 'My App',
        type: [],
        pkg: 'io.framework7.myapp',
        cordova: {
          folder: 'cordova',
          platforms: ['ios', 'android'],
          plugins: [
            'cordova-plugin-statusbar',
            'cordova-plugin-keyboard',
            'cordova-plugin-splashscreen',
            'cordova-plugin-wkwebview-engine',
          ],
        },
        webpack: {
          developmentSourceMap: true,
          productionSourceMap: true,
          hashAssets: false,
          preserveAssetsPaths: false,
          inlineAssets: true,
        },
        framework: 'core',
        template: 'single-view',
        bundler: 'webpack',
        cssPreProcessor: false,

        theming: {
          customColor: false,
          color: '#007aff',
          darkTheme: false,
          iconFonts: true,
          fillBars: false,
        }
      };
    },
    watch: {
      'theming.fillBars': function (fillBars) {
        const self = this;
        if (!self.barsStyleEl) {
          self.barsStyleEl = document.createElement('style');
          self.barsStyleEl.innerHTML = `
            /* Invert navigation bars to fill style */
            :root,
            :root.theme-dark,
            :root .theme-dark {
              --f7-bars-bg-color: var(--f7-theme-color);
              --f7-bars-text-color: #fff;
              --f7-bars-link-color: #fff;
              --f7-navbar-subtitle-text-color: rgba(255,255,255,0.85);
              --f7-bars-border-color: transparent;
              --f7-tabbar-link-active-color: #fff;
              --f7-tabbar-link-inactive-color: rgba(255,255,255,0.54);
              --f7-searchbar-bg-color: var(--f7-bars-bg-color);
              --f7-searchbar-input-bg-color: #fff;
              --f7-searchbar-input-text-color: #000;
              --f7-sheet-border-color: transparent;
              --f7-tabbar-link-active-border-color: #fff;
            }
            .appbar,
            .navbar,
            .toolbar,
            .subnavbar,
            .calendar-header,
            .calendar-footer {
              --f7-touch-ripple-color: var(--f7-touch-ripple-white);
              --f7-link-highlight-color: var(--f7-link-highlight-white);
              --f7-button-text-color: #fff;
              --f7-button-pressed-bg-color: rgba(255,255,255,0.1);
            }
          `;
        }
        if (fillBars) {
          self.$$('head').append(self.barsStyleEl);
        } else {
          self.$$(self.barsStyleEl).remove();
        }

      },
      'theming.darkTheme': function (darkTheme) {
        const self = this;
        const html = self.$$('html');
        if (darkTheme) html.addClass('theme-dark');
        else html.removeClass('theme-dark');
      },
      'theming.customColor': function (customColor) {
        const self = this;
        const color = self.theming.color;
        const cssVars = self.$f7.utils.colorThemeCSSProperties(color);
        const html = self.$$('html')[0];
        if (customColor) {
          Object.keys(cssVars).forEach((key) => {
            html.style.setProperty(key, cssVars[key]);
          });
        } else {
          Object.keys(cssVars).forEach((key) => {
            html.style.removeProperty(key);
          });
        }
      },
      'theming.color': function () {
        const self = this;
        const color = self.theming.color;
        const cssVars = self.$f7.utils.colorThemeCSSProperties(color);
        const html = self.$$('html')[0];
        Object.keys(cssVars).forEach((key) => {
          html.style.setProperty(key, cssVars[key]);
        });
      },
      log() {
        const self = this;
        self.$nextTick(() => {
          const { logEl } = self.$refs;
          logEl.scrollTop = logEl.scrollHeight - logEl.offsetHeight;
        });
      }
    },
    mounted() {
      const self = this;

      self.$request.json('/api/cwd/', ( { cwd } ) => {
        self.cwd = cwd;
      });
    },
    methods: {
      logText,
      toggleArrayValue(arr, value) {
        if (arr.indexOf(value) < 0) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
      },

      getOptions() {
        const self = this;
        const {
          name,
          type,
          pkg,
          framework,
          template,
          bundler,
          cssPreProcessor,
          cordova,
          webpack,
          theming,
        } = self;
        const options = {
          type,
          name,
          framework,
          template,
          bundler,
          cssPreProcessor,
          theming,
        };
        if (options.bundler !== 'webpack') {
          options.cssPreProcessor = false;
        }
        if (options.bundler === 'webpack') {
          options.webpack = webpack;
        }
        if (type.indexOf('cordova') >= 0) {
          options.pkg = pkg;
          options.cordova = cordova;
        }
        return options;
      },
      showError(message) {
        const self = this;
        self.$f7.dialog.alert(message);
      },
      getLog() {
        const self = this;
        getLog(self, '/api/create/');
      },
      createApp() {
        const self = this;
        if (self.loading) return;
        const options = self.getOptions();
        if (!options.type.length) {
          self.showError('You must specify app type (Web app, PWA or Cordova app)');
          return;
        }
        if (options.type.indexOf('cordova') >= 0) {
          if (!options.pkg.trim()) {
            self.showError('You must specify app package (bundle ID)');
            return;
          }
          if (!options.cordova.platforms.length) {
            self.showError('You must specify target cordova platform');
            return;
          }
        }
        if (!options.name) {
          self.showError('You must specify app name');
          return;
        }
        self.loading = true;
        self.$f7.request.postJSON('/api/create/', { options }, () => {
          self.getLog();
        });
      },
    }
  }
</script>