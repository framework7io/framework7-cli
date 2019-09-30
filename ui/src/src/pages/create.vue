<template>
  <f7-page name="create">
    <f7-navbar :sliding="false" large>
      <f7-nav-title>
        <i class="f7-navbar-logo"></i>
        <span>Create App</span>
      </f7-nav-title>
      <label slot="right" class="tooltip-init link label-file-input" data-tooltip="Import project settings<br>from .json file" style="color: var(--f7-navbar-link-color,var(--f7-bars-link-color,var(--f7-theme-color)))">
        <i class="f7-icons" style="font-size:24px">tray_arrow_down_fill</i>
        <input type="file" @change="onImportInputChange" accept=".json">
      </label>
      <a class="link margin-left tooltip-init" slot="right" data-tooltip="Export project settings<br>to .json file" @click="exportSettings">
        <i class="f7-icons" style="font-size:24px">tray_arrow_up_fill</i>
      </a>
      <f7-nav-title-large>
        <i class="f7-navbar-logo"></i>
        <span>Create App</span>
      </f7-nav-title-large>
    </f7-navbar>

    <div class="center-content">
      <f7-block medium-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">info_circle</i>
          <span>General</span>
        </f7-block-title>

        <f7-block-title medium>Destination</f7-block-title>
        <f7-block-header>New Framework7 app will be created in the following directory.</f7-block-header>
        <f7-list no-hairlines-between class="inputs-list">
          <f7-list-input
            class="col-100 tablet-50"
            type="text"
            outline
            clear-button
            required
            validate
            validate-on-blur
            :value="cwd"
            @input="cwd = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-block-footer><i class="f7-icons text-color-orange">exclamationmark_triangle_fill</i> Make sure this folder is empty, the project will be created in the root of this folder.</f7-block-footer>

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
      <f7-block v-if="type.indexOf('cordova') >= 0" medium-inset strong class="content-block">
        <f7-block-title large>
          <i class="block-icon block-icon-cordova"></i>
          <span>Cordova</span>
          <div class="right">
            <span class="toggle-label disabled">Advanced</span>
            <f7-toggle color="green" :checked="cordovaAdvanced" @change="cordovaAdvanced = $event.target.checked" />
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
              <!-- <i class="icon f7-icons">device_desktop</i> -->
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="50" viewBox="0 0 46 50">
                <g fill="var(--checkbox-col-text-color)" transform="translate(.232 .132)">
                  <path d="M16.26709,10.8502718 C9.80877563,9.67399702 4.70244235,10.9051268 2.66730029,14.4300962 C1.14863171,17.0605074 1.5827308,20.5479943 3.72007728,24.2759036 C3.90199702,24.5932037 4.30669467,24.7029512 4.62399477,24.5210315 C4.94129487,24.3391118 5.05104235,23.9344141 4.86912262,23.617114 C2.94377645,20.2589706 2.56913221,17.249135 3.81435381,15.0923479 C5.504955,12.1641407 10.0597158,11.0659943 16.029758,12.1533384 C16.3895899,12.2188758 16.7344199,11.9803029 16.7999573,11.620471 C16.8654947,11.2606391 16.6269219,10.9158092 16.26709,10.8502718 Z M7.07861563,28.8071517 C9.68999775,31.6768672 13.0826192,34.3685159 16.9517131,36.6023384 C26.3201118,42.0111858 36.2934338,43.4569053 41.2087007,40.105396 C41.5108891,39.8993467 41.5888252,39.4873387 41.3827762,39.1851503 C41.1767268,38.8829619 40.7647185,38.8050255 40.4625301,39.0110748 C36.0634245,42.0106361 26.5894906,40.6373073 17.6139648,35.4552848 C13.8605087,33.2882262 10.5753367,30.6818258 8.05823533,27.9157179 C7.81207268,27.6452034 7.39322308,27.6254623 7.12270858,27.871625 C6.85219407,28.1177876 6.83245298,28.5366372 7.07861563,28.8071517 Z"/>
                  <path d="M39.6407377,28.0015087 C43.8694858,23.0059033 45.3460182,17.9814478 43.3150669,14.4637368 C41.8206546,11.8753386 38.6614245,10.508773 34.4628576,10.4541703 C34.0971371,10.4494141 33.7968063,10.7420335 33.79205,11.107754 C33.7872937,11.4734746 34.0799132,11.7738054 34.4456338,11.7785616 C38.2217152,11.8276699 40.943457,13.0049943 42.1680132,15.1259884 C43.8549613,18.0478679 42.5382228,22.528564 38.6297993,27.145756 C38.3934897,27.4249189 38.4282291,27.8427919 38.7073921,28.0791015 C38.986555,28.3154111 39.4044281,28.2806716 39.6407377,28.0015087 Z M28.7729049,11.0707934 C24.9494197,11.8899918 20.8796646,13.4916898 16.9711355,15.7482801 C7.30003301,21.3318937 0.991353487,29.5651322 1.86752366,35.5349762 C1.92063458,35.896851 2.25704699,36.1471536 2.61892181,36.0940427 C2.98079663,36.0409318 3.23109922,35.7045192 3.17798829,35.3426444 C2.40004159,30.0420527 8.38005162,22.2377494 17.6333872,16.8953336 C21.424971,14.7062617 25.3655808,13.1553903 29.0503881,12.3659042 C29.4080231,12.2892794 29.6358268,11.9372422 29.559202,11.5796073 C29.4825771,11.2219723 29.1305399,10.9941685 28.7729049,11.0707934 Z"/>
                  <path d="M13.1053499 39.6738308C15.3163366 45.847701 18.9335091 49.6489149 23.0008948 49.6489149 25.9673153 49.6489149 28.7118359 47.626797 30.851997 44.0667086 31.0404405 43.7532391 30.9390868 43.3463579 30.6256172 43.1579146 30.3121476 42.9694712 29.9052666 43.0708248 29.7168231 43.3842944 27.7934636 46.5837404 25.4309366 48.3244116 23.0008948 48.3244116 19.6222193 48.3244116 16.3960206 44.9340642 14.3523037 39.2272715 14.2289898 38.8829348 13.849884 38.7037603 13.5055472 38.8270742 13.1612104 38.9503881 12.982036 39.329494 13.1053499 39.6738308zM33.301094 38.466153C34.4456795 34.8084911 35.0604132 30.5890416 35.0604132 26.1921295 35.0604132 15.2205809 31.2204221 5.76269344 25.7508624 3.33404268 25.4165831 3.18561253 25.0252698 3.33627301 24.8768396 3.67055228 24.7284095 4.00483159 24.87907 4.3961449 25.2133492 4.54457507 30.0915353 6.71063791 33.7359099 15.6867225 33.7359099 26.1921295 33.7359099 30.4578502 33.1405877 34.5440609 32.0370364 38.0705937 31.9278057 38.4196536 32.1222257 38.7911715 32.4712856 38.900402 32.8203455 39.0096328 33.1918636 38.8152129 33.301094 38.466153zM45.7738444 37.8173417C45.7738444 36.0667924 44.3547434 34.6476914 42.604194 34.6476914 40.8536444 34.6476914 39.4345434 36.0667924 39.4345434 37.8173417 39.4345434 39.5678914 40.8536444 40.9869921 42.604194 40.9869921 44.3547434 40.9869921 45.7738444 39.5678914 45.7738444 37.8173417zM44.4493411 37.8173417C44.4493411 38.8363884 43.6232404 39.6624887 42.604194 39.6624887 41.5851474 39.6624887 40.7590467 38.8363884 40.7590467 37.8173417 40.7590467 36.7982954 41.5851474 35.9721947 42.604194 35.9721947 43.6232404 35.9721947 44.4493411 36.7982954 44.4493411 37.8173417zM3.35200735 40.9869921C5.10255692 40.9869921 6.52165772 39.5678914 6.52165772 37.8173417 6.52165772 36.0667924 5.10255692 34.6476914 3.35200735 34.6476914 1.60145778 34.6476914.182356966 36.0667924.182356966 37.8173417.182356966 39.5678914 1.60145778 40.9869921 3.35200735 40.9869921zM3.35200735 39.6624887C2.33296076 39.6624887 1.50686028 38.8363884 1.50686028 37.8173417 1.50686028 36.7982954 2.33296076 35.9721947 3.35200735 35.9721947 4.37105394 35.9721947 5.1971544 36.7982954 5.1971544 37.8173417 5.1971544 38.8363884 4.37105394 39.6624887 3.35200735 39.6624887z"/>
                  <path d="M23.0008948 6.56724609C24.7514444 6.56724609 26.1705452 5.14814526 26.1705452 3.39759573 26.1705452 1.64704615 24.7514444.227945338 23.0008948.227945338 21.2503452.227945338 19.8312444 1.64704615 19.8312444 3.39759573 19.8312444 5.14814526 21.2503452 6.56724609 23.0008948 6.56724609zM23.0008948 5.24274278C21.9818482 5.24274278 21.1557477 4.41664228 21.1557477 3.39759573 21.1557477 2.37854913 21.9818482 1.55244865 23.0008948 1.55244865 24.0199414 1.55244865 24.8460419 2.37854913 24.8460419 3.39759573 24.8460419 4.41664228 24.0199414 5.24274278 23.0008948 5.24274278zM23.4850352 28.4336682C22.2470065 28.7011662 21.0272995 27.9143767 20.7592781 26.676348 20.4923036 25.4383192 21.2785696 24.2186123 22.5165984 23.9505908 23.7546271 23.6830929 24.9743341 24.4698824 25.2423555 25.7079111 25.5098535 26.9459398 24.723064 28.1656468 23.4850352 28.4336682z"/>
                </g>
              </svg>

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
      <f7-block medium-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">gear</i>
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
      <f7-block medium-inset strong class="content-block">
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
      <f7-block medium-inset strong class="content-block">
        <f7-block-title large>
          <i class="block-icon block-icon-webpack"></i>
          <span>Bundler</span>
          <div class="right" v-if="bundler">
            <span class="toggle-label disabled">Advanced</span>
            <f7-toggle :checked="bundlerAdvanced" @change="bundlerAdvanced = $event.target.checked" color="green" />
          </div>
        </f7-block-title>

        <f7-block-title>Should we setup project with bundler?</f7-block-title>
        <f7-list medium-inset no-hairlines-between>
          <f7-list-item
            :class="{disabled: framework !== 'core' || customBuild}"
            radio
            title="No bundler"
            @change="bundler = false"
            :checked="bundler === false && framework === 'core'"
            :disabled="framework !== 'core' || customBuild"
          ></f7-list-item>
          <f7-list-item
            radio
            title="Webpack (recommended)"
            @change="bundler = 'webpack'"
            :checked="bundler === 'webpack' || framework !== 'core' || customBuild"
            :disabled="framework !== 'core'"
          ></f7-list-item>
        </f7-list>

        <template v-if="bundler ==='webpack'">
          <f7-block-title>Do you want to setup CSS Pre-Processor?</f7-block-title>
          <f7-list no-hairlines-between>
            <f7-list-item
              :class="{disabled: customBuild}"
              radio
              title="No, i am good with CSS"
              @change="cssPreProcessor = false"
              :checked="cssPreProcessor === false && !customBuild"
              :disabled="customBuild"
            ></f7-list-item>
            <f7-list-item
              radio
              title="Less"
              @change="cssPreProcessor = 'less'"
              :checked="cssPreProcessor === 'less' || customBuild"
            ></f7-list-item>
            <f7-list-item
              :class="{disabled: customBuild}"
              radio
              title="Stylus"
              @change="cssPreProcessor = 'stylus'"
              :checked="cssPreProcessor === 'stylus' && !customBuild"
              :disabled="customBuild"
            ></f7-list-item>
            <f7-list-item
              :class="{disabled: customBuild}"
              radio
              title="SCSS (SASS)"
              @change="cssPreProcessor = 'scss'"
              :checked="cssPreProcessor === 'scss' && !customBuild"
              :disabled="customBuild"
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

      <!-- THEMING -->
      <f7-block medium-inset strong class="content-block">
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
            text="Enables navigation bars to be fill with color"
            checkbox
            :checked="theming.fillBars === true"
            @change="theming.fillBars = $event.target.checked"
          />
        </f7-list>
      </f7-block>

      <!-- Framework7 CUSTOM BUILD -->
      <f7-block medium-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">square_grid_2x2_fill</i>
          <span>Framework7 Custom Build</span>
          <div class="right">
            <span class="toggle-label disabled">Enable</span>
            <f7-toggle :checked="customBuild" @change="customBuild = $event.target.checked" color="green" />
          </div>
        </f7-block-title>
        <template v-if="!customBuild">
          <p class="text-align-center"><i class="f7-icons text-color-orange">exclamationmark_triangle_fill</i><br>Enabling custom build will automatically enable Webpack bundler with Less pre-processor</p>
        </template>
        <template v-if="customBuild">
          <f7-block-title medium>Core components (required)</f7-block-title>
          <div class="row">
            <div class="col-50">
              <f7-list class="no-margin-top" no-hairlines-between>
                <f7-list-item
                  v-for="(coreComponent, index) in coreComponentsList"
                  :key="index"
                  v-if="index < 7"
                  checked
                  checkbox
                  disabled
                  :title="coreComponent"
                />

              </f7-list>
            </div>
            <div class="col-50">
              <f7-list class="no-margin-top" no-hairlines-between>
                <f7-list-item
                  v-for="(coreComponent, index) in coreComponentsList"
                  :key="index"
                  v-if="index >= 7"
                  checked
                  checkbox
                  disabled
                  :title="coreComponent"
                />
              </f7-list>
            </div>
          </div>

          <f7-block-title medium>Customizable list of components / <a class="link" @click="toggleComponents">Toggle all</a></f7-block-title>

          <div class="row">
            <div class="col-33">
              <f7-list class="no-margin-top" no-hairlines-between>
                <f7-list-item
                  v-for="(component, index) in componentsListComputed"
                  :key="index"
                  v-if="index < 18"
                  :checked="customBuildConfig.components.indexOf(component.component) >= 0"
                  @change="toggleArrayValue(customBuildConfig.components, component.component)"
                  checkbox
                  :title="component.name"
                />
              </f7-list>
            </div>
            <div class="col-33">
              <f7-list class="no-margin-top" no-hairlines-between>
                <f7-list-item
                  v-for="(component, index) in componentsListComputed"
                  :key="index"
                  v-if="index >= 18 && index < 36"
                  :checked="customBuildConfig.components.indexOf(component.component) >= 0"
                  @change="toggleArrayValue(customBuildConfig.components, component.component)"
                  checkbox
                  :title="component.name"
                />
              </f7-list>
            </div>
            <div class="col-33">
              <f7-list class="no-margin-top" no-hairlines-between>
                <f7-list-item
                  v-for="(component, index) in componentsListComputed"
                  :key="index"
                  v-if="index >= 36"
                  :checked="customBuildConfig.components.indexOf(component.component) >= 0"
                  @change="toggleArrayValue(customBuildConfig.components, component.component)"
                  checkbox
                  :title="component.name"
                />
              </f7-list>
            </div>
          </div>
          <f7-block-title medium>CSS</f7-block-title>
          <f7-list no-hairlines-between>
            <f7-list-item
              :checked="customBuildConfig.themes.indexOf('ios') >= 0"
              @change="toggleArrayValue(customBuildConfig.themes, 'ios')"
              checkbox
              title="Include iOS theme"
            />
            <f7-list-item
              :checked="customBuildConfig.themes.indexOf('md') >= 0"
              @change="toggleArrayValue(customBuildConfig.themes, 'md')"
              checkbox
              title="Include MD theme"
            />
            <f7-list-item
              :checked="customBuildConfig.themes.indexOf('aurora') >= 0"
              @change="toggleArrayValue(customBuildConfig.themes, 'aurora')"
              checkbox
              title="Include Aurora theme"
            />
            <f7-list-item
              :checked="customBuildConfig.darkTheme"
              @change="customBuildConfig.darkTheme = $event.target.checked"
              checkbox
              title="Include Dark theme"
            />
            <f7-list-item
              :checked="customBuildConfig.lightTheme"
              @change="customBuildConfig.lightTheme = $event.target.checked"
              checkbox
              title="Include Light theme"
            />
            <f7-list-item
              :checked="customBuildConfig.rtl"
              @change="customBuildConfig.rtl = !customBuildConfig.rtl"
              checkbox
              title="RTL Layout"
            />
          </f7-list>
        </template>
      </f7-block>

      <f7-popup class="popup-log" :closeByBackdropClick="false" :opened="log && log.length > 0">
        <pre ref="logEl" v-html="logText(log)"></pre>
      </f7-popup>

      <f7-block medium-inset class="no-padding button-block">
        <f7-button v-if="!done && !error" :class="{loading: loading}" class="button-center-content" style="width: 300px;" large fill round @click="createApp" icon-f7="gear_alt_fill" :text="loading ? 'Creating app...' : 'Create App'"></f7-button>
        <f7-button v-if="done" class="button-center-content" style="width: 300px;" large fill round icon-f7="checkmark_alt" text="Done" color="green"></f7-button>
        <f7-button v-if="error" class="button-center-content" style="width: 300px;" large fill round icon-f7="xmark" text="Error" color="red"></f7-button>
      </f7-block>
    </div>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7NavTitle, f7NavTitleLarge, f7BlockTitle, f7BlockHeader, f7BlockFooter, f7Block, f7List, f7ListInput, f7ListItem, f7Button, f7Toggle, f7Checkbox, f7Radio, f7Popup } from 'framework7-vue';
  import logText from '../utils/log-text';
  import getLog from '../utils/get-log';
  import componentsList from '../utils/components-list';

  export default {
    components: {
      f7Page, f7Navbar, f7NavTitle, f7NavTitleLarge, f7BlockTitle, f7BlockHeader, f7BlockFooter, f7Block, f7List, f7ListInput, f7ListItem, f7Button, f7Toggle, f7Checkbox, f7Radio, f7Popup
    },
    data() {
      return {
        loading: false,
        log: [],
        done: false,
        error: false,
        bundlerAdvanced: false,
        cordovaAdvanced: false,
        coreComponentsList: [
          'Statusbar',
          'View',
          'Navbar',
          'Toolbar',
          'Subnavbar',
          'Touch Ripple',
          'Modal',
          'Page',
          'Link',
          'Block',
          'List',
          'Badge',
          'Button',
          'Icon',
        ].sort(),
        componentsList: [...componentsList],

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
        },

        customBuild: false,
        customBuildConfig: {
          rtl: false,
          darkTheme: true,
          lightTheme: true,
          themes: [
            'ios',
            'md',
            'aurora',
          ],
          components: [...componentsList],
        },
      };
    },
    computed: {
      componentsListComputed() {
        const self = this;
        const list = self.componentsList.sort().map((c) => {
          const name = c
            .split('-')
            .map((word) => {
              return word[0].toUpperCase() + word.substring(1);
            })
            .join(' ')
          return {
            component: c,
            name,
          };
        });
        return list;
      },
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
      customBuild() {
        const self = this;
        self.bundler = 'webpack';
        self.cssPreProcessor = 'less';
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
      exportSettings() {
        const self = this;
        const options = self.getOptions();
        delete options.cwd;

        const data = [JSON.stringify(options, '', 2)];

        let file;
        const fileName = `${options.name || 'f7-project'}.json`;
        const properties = { type: 'application/json' };
        try {
          file = new File(data, fileName, properties);
        } catch (e) {
          file = new Blob(data, properties);
        }
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.download = fileName;
        link.target = '_blank';
        link.href = url;
        link.click();
      },
      importSettings(data) {
        const self = this;

        const {
          bundler,
          cordova,
          cssPreProcessor,
          customBuild,
          customBuildConfig,
          framework,
          name,
          pkg,
          template,
          theming,
          type,
          webpack,
        } = data;


        if (type && type.indexOf('cordova') >= 0) {
          self.cordovaAdvanced = true;
        }
        if (bundler === 'webpack' && webpack) {
          self.bundlerAdvanced = true;
        }
        Object.assign(self, {
          bundler,
          cordova,
          cssPreProcessor,
          customBuild,
          customBuildConfig,
          framework,
          name,
          pkg,
          template,
          theming,
          type,
          webpack,
        });
      },
      onImportInputChange(e) {
        const self = this;
        const reader = new FileReader();
        reader.onload = () => {
          const content = JSON.parse(reader.result);
          self.importSettings(content.framework7 || content);
        }
        reader.readAsText(e.target.files[0]);
      },
      toggleComponents() {
        const self = this;
        if (self.customBuildConfig.components.length === self.componentsList.length) {
          self.customBuildConfig.components = [];
        } else {
          self.customBuildConfig.components = [...self.componentsList];
        }
      },
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
          cwd,
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
          customBuild,
          customBuildConfig,
        } = self;
        const options = {
          cwd,
          type,
          name,
          framework,
          template,
          bundler,
          cssPreProcessor,
          theming,
          customBuild,
        };
        if (options.customBuild) {
          options.bundler = 'webpack';
          options.cssPreProcessor = 'less';
          options.customBuildConfig = customBuildConfig;
        }
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
