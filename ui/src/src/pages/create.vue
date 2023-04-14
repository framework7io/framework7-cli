<template>
  <f7-page name="create">
    <f7-navbar :sliding="false" large transparent>
      <template #title>
        <i class="f7-navbar-logo"></i>
        <span>Create App</span>
      </template>
      <template #right>
        <label
          class="tooltip-init link label-file-input"
          data-tooltip="Import project settings from .json file"
          style="
            color: var(--f7-navbar-link-color, var(--f7-bars-link-color, var(--f7-theme-color)));
          "
        >
          <i class="f7-icons" style="font-size: 24px">tray_arrow_down_fill</i>
          <input type="file" @change="onImportInputChange" accept=".json" />
        </label>
        <a
          class="link margin-left tooltip-init"
          data-tooltip="Export project settings<br>to .json file"
          @click="exportSettings"
        >
          <i class="f7-icons" style="font-size: 24px">tray_arrow_up_fill</i>
        </a>
      </template>

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
        <f7-block-header
          >New Framework7 app will be created in the following directory.</f7-block-header
        >
        <f7-list no-hairlines-between class="inputs-list">
          <f7-list-input
            type="text"
            clear-button
            required
            validate
            validate-on-blur
            :value="cwd"
            @input="cwd = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-block-footer class="display-flex align-items-center"
          ><i style="font-size: 1.5em; margin-right: 8px" class="f7-icons text-color-orange"
            >exclamationmark_triangle_fill</i
          >
          Make sure this folder is empty, the project will be created in the root of this
          folder.</f7-block-footer
        >

        <div class="display-flex">
          <div style="width: 25%">
            <f7-block-title medium>App Icon</f7-block-title>
            <div class="create-app-icon">
              <label>
                <img :src="iconPreview || '/static/icons/apple-touch-icon.png'" />
                <input ref="iconInput" @change="onIconChange" type="file" accept="image/*" />
              </label>
              <div>Click to choose app icon</div>
              <div v-if="iconFile">
                <f7-link @click="resetIcon">Reset to default icon</f7-link>
              </div>
              <small><em>1024x1024 square PNG</em></small>
            </div>
          </div>
          <div>
            <div
              :class="{
                'grid grid-cols-2 grid-gap':
                  type.indexOf('cordova') >= 0 || type.indexOf('capacitor') >= 0,
              }"
            >
              <div>
                <f7-block-title medium>App (project) name</f7-block-title>
                <f7-list no-hairlines-between class="inputs-list">
                  <f7-list-input
                    type="text"
                    clear-button
                    required
                    validate
                    validate-on-blur
                    :value="name"
                    @input="name = $event.target.value"
                  ></f7-list-input>
                </f7-list>
              </div>
              <div v-if="type.indexOf('cordova') >= 0 || type.indexOf('capacitor') >= 0">
                <f7-block-title medium>App package (Bundle ID)</f7-block-title>
                <f7-list no-hairlines-between class="inputs-list">
                  <f7-list-input
                    type="text"
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
            <f7-block-title medium>App Type</f7-block-title>
            <f7-block-header
              >What types of the app are you targeting? (multiple allowed)</f7-block-header
            >
            <div class="grid grid-cols-2 medium-grid-cols-4 grid-gap checkbox-row">
              <div class="checkbox-col" :class="{ checked: type.indexOf('web') >= 0 }">
                <div class="col-icon" @click="toggleArrayValue(type, 'web')">
                  <span class="text-icon">www</span>
                </div>
                <div class="col-label">Simple web app</div>
              </div>
              <div class="checkbox-col" :class="{ checked: type.indexOf('pwa') >= 0 }">
                <div class="col-icon" @click="toggleArrayValue(type, 'pwa')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="134"
                    height="50"
                    viewBox="0 0 134 50"
                  >
                    <g fill="var(--checkbox-col-text-color)">
                      <polygon
                        points="98.196 41.045 102.059 31.343 113.214 31.343 107.92 16.627 114.541 0 133.505 50 119.52 50 116.279 41.045"
                      />
                      <polygon
                        points="86.212 50 106.443 0 93.031 0 79.191 32.311 69.35 0 59.041 0 48.474 32.311 41.022 17.588 34.278 38.29 41.125 50 54.325 50 63.874 21.024 72.978 50"
                      />
                      <path
                        d="M12.7453596,32.8358409 L21.015736,32.8358409 C23.5209828,32.8358409 25.7518102,32.557516 27.7082184,32.0008663 L29.8470487,25.4418975 L35.8247423,7.11055644 C35.3692677,6.39195312 34.8492721,5.71251666 34.2647556,5.0723355 C31.1955651,1.69073966 26.7050671,0 20.7931248,0 L0,0 L0,50 L12.7453596,50 L12.7453596,32.8358409 Z M23.6924692,11.5030001 C24.8913023,12.7039946 25.4906505,14.3111488 25.4906505,16.3245987 C25.4906505,18.3534923 24.9634784,19.9626194 23.9092024,21.1519802 C22.7534289,22.47353 20.6252609,23.1342709 17.5248351,23.1342709 L12.7453596,23.1342709 L12.7453596,9.70140629 L17.5599663,9.70140629 C20.4495368,9.70140629 22.4937045,10.3019376 23.6924692,11.5030001 Z"
                      />
                    </g>
                  </svg>
                </div>
                <div class="col-label">PWA (Progressive Web App)</div>
              </div>
              <div class="checkbox-col" :class="{ checked: type.indexOf('cordova') >= 0 }">
                <div
                  class="col-icon"
                  @click="
                    () => {
                      toggleArrayValue(type, 'cordova');
                      toggleArrayValue(type, 'capacitor', true);
                    }
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="50"
                    viewBox="0 0 53 50"
                  >
                    <path
                      fill="var(--checkbox-col-text-color)"
                      d="M47.5862069,50 L39.1133005,50 L39.7044335,42.8571429 L35.5418719,42.8571429 L34.9507389,50 L17.3891626,50 L16.7980296,42.8571429 L12.635468,42.8571429 L13.226601,50 L4.75369458,50 L0,19.0394089 L11.8965517,0 L40.4433498,0 L52.3399015,19.0394089 L47.5862069,50 Z M38.0541872,9.5320197 L30.4187192,9.5320197 L30.9359606,13.1034483 L21.4039409,13.1034483 L21.9211823,9.5320197 L14.2857143,9.5320197 L9.50738916,19.0394089 L11.8965517,38.0788177 L40.4433498,38.0788177 L42.8325123,19.0394089 L38.0541872,9.5320197 Z M33.8916256,31.773399 C33.226601,31.773399 32.7093596,29.8029557 32.7093596,27.3399015 C32.7093596,24.8768473 33.2512315,22.9064039 33.8916256,22.9064039 C34.5566502,22.9064039 35.0738916,24.8768473 35.0738916,27.3399015 C35.0738916,29.8029557 34.5566502,31.773399 33.8916256,31.773399 Z M18.8916256,32.1428571 C18.226601,32.1428571 17.7093596,30.1724138 17.7093596,27.7093596 C17.7093596,25.2463054 18.2512315,23.2758621 18.8916256,23.2758621 C19.5566502,23.2758621 20.0738916,25.2463054 20.0738916,27.7093596 C20.0738916,30.1724138 19.5320197,32.1428571 18.8916256,32.1428571 Z"
                    />
                  </svg>
                </div>
                <div class="col-label">
                  Cordova app
                  <small>(targets native iOS and Android apps)</small>
                </div>
              </div>
              <div class="checkbox-col" :class="{ checked: type.indexOf('capacitor') >= 0 }">
                <div
                  class="col-icon"
                  @click="
                    () => {
                      toggleArrayValue(type, 'capacitor');
                      toggleArrayValue(type, 'cordova', true);
                    }
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="126"
                    height="24"
                    viewBox="0 0 126 24"
                  >
                    <g fill-rule="evenodd">
                      <path
                        fill="var(--checkbox-col-text-color)"
                        fill-rule="nonzero"
                        d="M30 11.8186C30 16.0223 33.0403 19.4133 37.4287 19.4133 41.8457 19.4133 44.0829 16.4147 44.4844 13.8083L41.0885 13.8083C40.687 15.3777 39.2356 16.4707 37.4 16.4707 34.962 16.4707 33.2066 14.537 33.2066 11.8186 33.2066 9.07214 34.962 7.13842 37.4 7.13842 39.2356 7.13842 40.687 8.23139 41.0885 9.80078L44.4844 9.80078C44.0829 7.19447 41.8457 4.1958 37.4287 4.1958 33.0403 4.1958 30 7.58682 30 11.8186zM57.1749 7.67557L57.1749 19.127 54.2309 19.127 54.2309 17.7297C53.4928 18.7757 52.1612 19.3924 50.5007 19.3924 47.0834 19.3924 45.0859 16.7227 45.0859 13.4052 45.0859 10.0798 47.0834 7.41797 50.5007 7.41797 52.1612 7.41797 53.4848 8.02684 54.2309 9.08065L54.2309 7.68337 57.1749 7.68337 57.1749 7.67557zM51.1745 10.1501C49.4017 10.1501 48.2786 11.5474 48.2786 13.4052 48.2786 15.263 49.4017 16.6603 51.1745 16.6603 52.9474 16.6603 54.0704425 15.263 54.0704425 13.4052 54.0784 11.5474 52.9554 10.1501 51.1745 10.1501zM61.7701 23L58.5774 23 58.5774 7.68337 61.5214 7.68337 61.5214 9.08065C62.2594 8.03464 63.591 7.41797 65.2516 7.41797 68.6689 7.41797 70.6663 10.0876 70.6663 13.4052 70.6663 16.7305 68.6689 19.3924 65.2516 19.3924 63.591 19.3924 62.3798 18.6899 61.7701 17.9093L61.7701 23zM64.5777 16.6603C66.3506 16.6603 67.4736 15.263 67.4736 13.4052 67.4736 11.5474 66.3506 10.1501 64.5777 10.1501 62.8049 10.1501 61.6817575 11.5474 61.6817575 13.4052 61.6738 15.263 62.7969 16.6603 64.5777 16.6603zM83.5107 7.67557L83.5107 19.127 80.5667 19.127 80.5667 17.7297C79.8287 18.7757 78.4971 19.3924 76.8366 19.3924 73.4193 19.3924 71.4219 16.7227 71.4219 13.4052 71.4219 10.0798 73.4193 7.41797 76.8366 7.41797 78.4971 7.41797 79.8207 8.02684 80.5667 9.08065L80.5667 7.68337 83.5107 7.68337 83.5107 7.67557zM77.5104 10.1501C75.7376 10.1501 74.6146 11.5474 74.6146 13.4052 74.6146 15.263 75.7376 16.6603 77.5104 16.6603 79.2833 16.6603 80.4063425 15.263 80.4063425 13.4052 80.4143 11.5474 79.2913 10.1501 77.5104 10.1501zM90.3201 7.41797C93.978 7.41797 95.7107 9.93151 95.9353 11.8752L92.6544 11.8752C92.4057 10.8916 91.4672 10.1735 90.296 10.1735 88.5874 10.1735 87.6007 11.4849 87.6007 13.4052 87.6007 15.3255 88.5874 16.6369 90.296 16.6369 91.4672 16.6369 92.4057 15.9187 92.6544 14.9352L95.9353 14.9352C95.7107 16.8789 93.978 19.3924 90.3201 19.3924 86.9028 19.3924 84.416 16.8164 84.416 13.4052 84.416 9.99395 86.9028 7.41797 90.3201 7.41797zM96.1829 4.88125C96.1829 3.78841 96.9931 3 98.1161 3 99.2392 3 100.049 3.78841 100.049 4.88125 100.049 5.97409 99.2392 6.73908 98.1161 6.73908 96.9931 6.73908 96.1829 5.97409 96.1829 4.88125zM96.5198 7.6758L99.7125 7.6758 99.7125 19.1272 96.5198 19.1272 96.5198 7.6758z"
                      />
                      <polyline
                        fill="var(--checkbox-col-text-color)"
                        fill-rule="nonzero"
                        points="101.14 7.676 101.14 4.835 104.332 4.835 104.332 7.676 106.787 7.676 106.787 10.206 104.332 10.206 104.332 19.136 101.14 19.136 101.14 10.127"
                      />
                      <path
                        fill="var(--checkbox-col-text-color)"
                        fill-rule="nonzero"
                        d="M106.256 13.4052C106.256 10.1501 108.663 7.41797 112.433 7.41797 116.203 7.41797 118.61 10.1501 118.61 13.4052 118.61 16.6603 116.203 19.3924 112.433 19.3924 108.663 19.3924 106.256 16.6603 106.256 13.4052zM112.433 16.6603C114.118 16.6603 115.417 15.4582 115.417 13.4052 115.417 11.3522 114.118 10.1501 112.433 10.1501 110.748 10.1501 109.449 11.3522 109.449 13.4052 109.449 15.4582 110.748 16.6603 112.433 16.6603zM126 10.5015C126 10.5015 125.667 10.439 125.381 10.439 123.542 10.439 122.582 11.3367 122.582 13.4365L122.582 19.1427 119.426 19.1427 119.426 7.67569 122.336 7.67569 122.336 9.15883C122.756 8.47971 123.645 7.56641 125.619 7.56641 125.73 7.56641 126 7.58982 126 7.58982L126 10.5015z"
                      />
                      <polygon
                        fill="var(--checkbox-col-text-color)"
                        fill-rule="nonzero"
                        points="3.737 5.073 18.891 20.247 15.183 23.959 9.455 18.234 3.696 24 0 20.286 5.747 14.521 .029 8.786"
                      />
                      <polygon
                        fill="var(--checkbox-col-text-color)"
                        points="20.29 0 24 3.701 18.241 9.467 23.959 15.202 20.251 18.915 5.097 3.742 8.805 .029 14.533 5.755"
                      />
                    </g>
                  </svg>
                </div>
                <div class="col-label">
                  Capacitor app
                  <small>(targets native iOS and Android apps)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </f7-block>

      <!-- CAPACITOR -->
      <f7-block v-if="type.indexOf('capacitor') >= 0" medium-inset strong class="content-block">
        <f7-block-title large>
          <i class="block-icon block-icon-capacitor"></i>
          <span>Capacitor</span>
        </f7-block-title>

        <f7-block-title>Target Capacitor platform (multiple allowed)</f7-block-title>
        <div class="grid grid-cols-2 grid-gap checkbox-row">
          <div class="checkbox-col" :class="{ checked: capacitor.platforms.indexOf('ios') >= 0 }">
            <div class="col-icon" @click="toggleArrayValue(capacitor.platforms, 'ios')">
              <i class="icon f7-icons">logo_apple</i>
            </div>
            <div class="col-label">iOS</div>
          </div>
          <div
            class="checkbox-col"
            :class="{ checked: capacitor.platforms.indexOf('android') >= 0 }"
          >
            <div class="col-icon" @click="toggleArrayValue(capacitor.platforms, 'android')">
              <i class="icon f7-icons">logo_android</i>
            </div>
            <div class="col-label">Android</div>
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
            <f7-toggle
              :checked="cordovaAdvanced"
              @change="cordovaAdvanced = $event.target.checked"
            />
          </div>
        </f7-block-title>

        <f7-block-title>Target Cordova platform (multiple allowed)</f7-block-title>
        <div class="grid grid-cols-2 grid-gap checkbox-row">
          <div class="checkbox-col" :class="{ checked: cordova.platforms.indexOf('ios') >= 0 }">
            <div class="col-icon" @click="toggleArrayValue(cordova.platforms, 'ios')">
              <i class="icon f7-icons">logo_apple</i>
            </div>
            <div class="col-label">iOS</div>
          </div>
          <div class="checkbox-col" :class="{ checked: cordova.platforms.indexOf('android') >= 0 }">
            <div class="col-icon" @click="toggleArrayValue(cordova.platforms, 'android')">
              <i class="icon f7-icons">logo_android</i>
            </div>
            <div class="col-label">Android</div>
          </div>
        </div>
        <template v-if="cordovaAdvanced">
          <f7-block-title>Pre-installed Cordova plugins</f7-block-title>
          <f7-block-header
            >Will be installed only if <b>iOS</b> or <b>Android</b> platforms
            selected.</f7-block-header
          >
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
        <div class="grid grid-cols-4 grid-gap checkbox-row">
          <div class="checkbox-col" :class="{ checked: framework === 'core' }">
            <div class="col-icon" @click="framework = 'core'">
              <img src="../assets/logo.svg" />
            </div>
            <div class="col-label">Framework7 Core</div>
          </div>
          <div class="checkbox-col" :class="{ checked: framework === 'vue' }">
            <div
              class="col-icon"
              @click="
                framework = 'vue';
                bundler = 'vite';
              "
            >
              <img src="../assets/logo.svg" />
              <img src="../assets/vuejs-logo.svg" />
            </div>
            <div class="col-label">Framework7 with Vue.js</div>
          </div>
          <div class="checkbox-col" :class="{ checked: framework === 'react' }">
            <div
              class="col-icon"
              @click="
                framework = 'react';
                bundler = 'vite';
              "
            >
              <img src="../assets/logo.svg" />
              <img src="../assets/react-logo.svg" />
            </div>
            <div class="col-label">Framework7 with React</div>
          </div>
          <div class="checkbox-col" :class="{ checked: framework === 'svelte' }">
            <div
              class="col-icon"
              @click="
                framework = 'svelte';
                bundler = 'vite';
              "
            >
              <img src="../assets/logo.svg" />
              <img src="../assets/svelte-logo.svg" />
            </div>
            <div class="col-label">Framework7 with Svelte</div>
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
        <div class="grid grid-cols-4 grid-gap checkbox-row">
          <div
            class="checkbox-col checkbox-template-col"
            :class="{ checked: template === 'blank' }"
          >
            <div class="col-icon" @click="template = 'blank'">
              <img src="../assets/t-blank.svg" />
            </div>
            <div class="col-label">Blank</div>
          </div>
          <div
            class="checkbox-col checkbox-template-col"
            :class="{ checked: template === 'single-view' }"
          >
            <div class="col-icon" @click="template = 'single-view'">
              <img src="../assets/t-single-view.svg" />
            </div>
            <div class="col-label">Single View</div>
          </div>
          <div class="checkbox-col checkbox-template-col" :class="{ checked: template === 'tabs' }">
            <div class="col-icon" @click="template = 'tabs'">
              <img src="../assets/t-tabs.svg" />
            </div>
            <div class="col-label">Tabbed Views (Tabs)</div>
          </div>
          <div
            class="checkbox-col checkbox-template-col"
            :class="{ checked: template === 'split-view' }"
          >
            <div class="col-icon" @click="template = 'split-view'">
              <img src="../assets/t-split-view.svg" />
            </div>
            <div class="col-label">Split View (Split Panel)</div>
          </div>
        </div>
      </f7-block>

      <!-- BUNDLER -->
      <f7-block medium-inset strong class="content-block">
        <f7-block-title large>
          <i class="block-icon block-icon-vite"></i>
          <span>Bundler</span>
        </f7-block-title>

        <f7-block-title>Should we setup project with bundler?</f7-block-title>
        <f7-list medium-inset>
          <f7-list-item
            :class="{ disabled: framework !== 'core' || customBuild }"
            radio
            title="No bundler"
            @change="bundler = false"
            :checked="bundler === false && framework === 'core'"
            :disabled="framework !== 'core' || customBuild"
          ></f7-list-item>
          <f7-list-item
            radio
            title="Vite (recommended)"
            @change="bundler = 'vite'"
            :checked="bundler === 'vite' || framework !== 'core' || customBuild"
            :disabled="framework !== 'core'"
          ></f7-list-item>
        </f7-list>

        <template v-if="bundler === 'vite' && type.indexOf('cordova') >= 0">
          <f7-block
            inset
            strong
            class="text-color-red no-margin border-color-red"
            style="border-width: 2px; border-style: solid; margin-top: -32px !important"
          >
            <p v-if="type.indexOf('cordova') >= 0">
              For Cordova app Vite build will be rebundled with Rollup (to workaround unsupported
              browser ES modules in Cordova web view), this means you should avoid dynamic imports
              (code splitting) with <code>import().then()</code> in your source code.
            </p>
          </f7-block>
        </template>

        <template v-if="bundler === 'vite'">
          <f7-block-title>Do you want to setup CSS Pre-Processor?</f7-block-title>
          <f7-list>
            <f7-list-item
              :class="{ disabled: customBuild }"
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
              :class="{ disabled: customBuild }"
              radio
              title="SCSS (SASS)"
              @change="cssPreProcessor = 'scss'"
              :checked="cssPreProcessor === 'scss' && !customBuild"
              :disabled="customBuild"
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
              cssClass: 'dark',
            }"
            @colorpicker:change="(v) => (theming.color = v.hex)"
          >
            <template #media>
              <i
                class="icon color-picker-target"
                :style="{
                  'border-radius': '4px',
                  width: '18px',
                  height: '18px',
                }"
              ></i>
            </template>
          </f7-list-input>
          <f7-list-item
            title="Dark theme"
            text="Enables dark theme by default"
            checkbox
            :checked="theming.darkMode === true"
            @change="theming.darkMode = $event.target.checked"
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
            <f7-toggle :checked="customBuild" @change="customBuild = $event.target.checked" />
          </div>
        </f7-block-title>
        <template v-if="!customBuild">
          <p class="text-align-center">
            <i class="f7-icons text-color-orange">exclamationmark_triangle_fill</i><br />Enabling
            custom build will automatically enable Vite bundler with Less pre-processor
          </p>
        </template>
        <template v-if="customBuild">
          <f7-block-title medium>Core components (required)</f7-block-title>
          <div class="grid grid-cols-2 grid-gap">
            <div>
              <f7-list class="no-margin-top" no-hairlines-between>
                <template v-for="(coreComponent, index) in coreComponentsList">
                  <f7-list-item
                    v-if="index < 7"
                    :key="index"
                    checked
                    checkbox
                    disabled
                    :title="coreComponent"
                  />
                </template>
              </f7-list>
            </div>
            <div>
              <f7-list class="no-margin-top" no-hairlines-between>
                <template v-for="(coreComponent, index) in coreComponentsList">
                  <f7-list-item
                    v-if="index >= 7"
                    :key="index"
                    checked
                    checkbox
                    disabled
                    :title="coreComponent"
                  />
                </template>
              </f7-list>
            </div>
          </div>

          <f7-block-title medium
            >Customizable list of components /
            <a class="link" @click="toggleComponents">Toggle all</a></f7-block-title
          >

          <div class="grid grid-cols-3 grid-gap">
            <div>
              <f7-list class="no-margin-top" no-hairlines-between>
                <template v-for="(component, index) in componentsListComputed">
                  <f7-list-item
                    :key="index"
                    v-if="index < 19"
                    :checked="customBuildConfig.components.indexOf(component.component) >= 0"
                    @change="toggleArrayValue(customBuildConfig.components, component.component)"
                    checkbox
                    :title="component.name"
                  />
                </template>
              </f7-list>
            </div>
            <div>
              <f7-list class="no-margin-top" no-hairlines-between>
                <template v-for="(component, index) in componentsListComputed">
                  <f7-list-item
                    :key="index"
                    v-if="index >= 19 && index < 38"
                    :checked="customBuildConfig.components.indexOf(component.component) >= 0"
                    @change="toggleArrayValue(customBuildConfig.components, component.component)"
                    checkbox
                    :title="component.name"
                  />
                </template>
              </f7-list>
            </div>
            <div>
              <f7-list class="no-margin-top" no-hairlines-between>
                <template v-for="(component, index) in componentsListComputed">
                  <f7-list-item
                    :key="index"
                    v-if="index >= 38"
                    :checked="customBuildConfig.components.indexOf(component.component) >= 0"
                    @change="toggleArrayValue(customBuildConfig.components, component.component)"
                    checkbox
                    :title="component.name"
                  />
                </template>
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
        <f7-button
          v-if="!done && !error"
          :class="{ loading: loading }"
          class="button-center-content"
          style="width: 300px"
          large
          fill
          round
          @click="createApp"
          icon-f7="gear_alt_fill"
          :text="loading ? 'Creating app...' : 'Create App'"
        ></f7-button>
        <f7-button
          v-if="done"
          class="button-center-content"
          style="width: 300px"
          large
          fill
          round
          icon-f7="checkmark_alt"
          text="Done"
          color="green"
        ></f7-button>
        <f7-button
          v-if="error"
          class="button-center-content"
          style="width: 300px"
          large
          fill
          round
          icon-f7="xmark"
          text="Error"
          color="red"
        ></f7-button>
      </f7-block>
    </div>
  </f7-page>
</template>
<script>
import { f7 } from 'framework7-vue';
import logText from '../utils/log-text';
import getLog from '../utils/get-log';
import componentsList from '../utils/components-list';

export default {
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

      iconFile: null,
      iconPreview: null,
      cwd: '',
      name: 'My App',
      type: [],
      pkg: 'io.framework7.myapp',
      cordova: {
        folder: 'cordova',
        platforms: ['ios', 'android'],
        plugins: ['cordova-plugin-statusbar', 'cordova-plugin-keyboard'],
      },
      capacitor: {
        platforms: ['ios', 'android'],
      },
      framework: 'core',
      template: 'single-view',
      bundler: 'vite',
      cssPreProcessor: false,

      theming: {
        customColor: false,
        color: '#007aff',
        darkMode: false,
        iconFonts: true,
      },

      customBuild: false,
      customBuildConfig: {
        rtl: false,
        darkTheme: true,
        lightTheme: true,
        themes: ['ios', 'md'],
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
          .join(' ');
        return {
          component: c,
          name,
        };
      });
      return list;
    },
  },
  watch: {
    'theming.customColor': function (customColor) {
      const self = this;
      const color = self.theming.color;
      f7.setColorTheme(customColor ? color : '#EE350F');
    },
    'theming.color': function () {
      const self = this;
      const color = self.theming.color;
      f7.setColorTheme(color);
    },
    customBuild() {
      const self = this;
      self.bundler = 'vite';
      self.cssPreProcessor = 'less';
    },
    log() {
      const self = this;
      self.$nextTick(() => {
        const { logEl } = self.$refs;
        logEl.scrollTop = logEl.scrollHeight - logEl.offsetHeight;
      });
    },
    done() {
      const self = this;
      if (self.done && self.iconFile) {
        self.done = false;
        self.loading = true;
        self.iconFile = null;
        self.generatingAssets = true;
        fetch('/api/assets/generate/', {
          method: 'POST',
          body: JSON.stringify({ keepLog: true }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(() => {
          self.getLog();
        });
      }
    },
  },
  mounted() {
    const self = this;
    fetch('/api/cwd/')
      .then((res) => res.json())
      .then((res) => {
        self.cwd = res.cwd;
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
      const fileName = `${options.name || 'framework7'}.json`;
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
        capacitor,
        cssPreProcessor,
        customBuild,
        customBuildConfig,
        framework,
        name,
        pkg,
        template,
        theming,
        type,
      } = data;

      if (type && type.indexOf('cordova') >= 0) {
        self.cordovaAdvanced = true;
      }
      Object.assign(self, {
        bundler,
        cordova,
        capacitor,
        cssPreProcessor,
        customBuild,
        customBuildConfig,
        framework,
        name,
        pkg,
        template,
        theming,
        type,
      });
    },
    onImportInputChange(e) {
      const self = this;
      const reader = new FileReader();
      reader.onload = () => {
        const content = JSON.parse(reader.result);
        self.importSettings(content.framework7 || content);
      };
      reader.readAsText(e.target.files[0]);
    },
    resetIcon() {
      this.iconFile = null;
      this.iconPreview = null;
      this.$refs.iconInput.value = null;
    },
    onIconChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.iconPreview = reader.result;
      };
      this.iconFile = file;
      reader.readAsDataURL(file);
    },
    toggleComponents() {
      const self = this;
      if (self.customBuildConfig.components.length === self.componentsList.length) {
        self.customBuildConfig.components = [];
      } else {
        self.customBuildConfig.components = [...self.componentsList];
      }
    },
    toggleArrayValue(arr, value, remove) {
      if (remove) {
        if (arr.indexOf(value) >= 0) {
          arr.splice(arr.indexOf(value), 1);
        }
        return;
      }
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
        capacitor,
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
        options.bundler = 'vite';
        options.cssPreProcessor = 'less';
        options.customBuildConfig = customBuildConfig;
      }
      if (options.bundler !== 'vite') {
        options.cssPreProcessor = false;
      }

      if (type.indexOf('cordova') >= 0 && cordova.platforms.length) {
        options.pkg = pkg;
        options.cordova = cordova;
        if (cordova.platforms.indexOf('ios') < 0 && cordova.platforms.indexOf('android') < 0) {
          options.cordova.plugins = [];
        }
      }
      if (type.indexOf('capacitor') >= 0 && capacitor.platforms.length) {
        options.pkg = pkg;
        options.capacitor = capacitor;
      }
      return options;
    },
    showError(message) {
      const self = this;
      f7.dialog.alert(message);
    },
    getLog() {
      const self = this;
      getLog(self, self.generatingAssets ? '/api/assets/generate/' : '/api/create/');
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
      if (options.type.indexOf('capacitor') >= 0) {
        if (!options.pkg.trim()) {
          self.showError('You must specify app package (bundle ID)');
          return;
        }
        if (!options.capacitor.platforms.length) {
          self.showError('You must specify target Capacitor platform');
          return;
        }
      }
      if (!options.name) {
        self.showError('You must specify app name');
        return;
      }
      self.loading = true;
      const data = new FormData();
      data.set('iconFile', this.iconFile);
      data.set('options', JSON.stringify(options));
      fetch('/api/create/', {
        body: data,
        method: 'POST',
      }).then(() => {
        self.getLog();
      });
    },
  },
};
</script>
