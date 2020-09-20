# **Xigen Theme**

Default Xigen theme structure for Magento 2 projects.

You will find here instructions to work on the frontend of this project. We are using node, gulp and babel to compile and minify all JS and CSS. So, please, read it before the start.

Technologies: [SASS](https://sass-lang.com/) | [ES6](https://www.w3schools.com/js/js_es6.asp) | [jQuery](https://jquery.com/) | [Gulp](https://gulpjs.com/) | [Node.js](https://nodejs.org/en/)

Documentation: [Magento 2 Frontend Guide](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/bk-frontend-dev-guide.html)

## **INDEX**

1. [What you need to know](#what-you-need-to-know)
   1. [Styles](#styles)
   2. [Scripts](#scripts)
   3. [Change words](#change-words)
2. [Start working](#start-working)
3. [Working flow](#working-flow)
   1. [Everyday](#everyday)
   3. [Deployment](#deployment)
   4. [Files structure](#files-structure)
   5. [Add new page CSS](#add-new-page-css)
   6. [Add new page/feature JS](#add-new-pagefeature-js)
   7. [Add third party JS/CSS](#add-third-party-jscss)
   8. [Add new translation file](#add-new-translation-file)
4. [Best Practices](#best-practices)
5. [Curiosities](#curiosities)

## **WHAT YOU NEED TO KNOW**

**The CSS and JS of this project are not being compiled and deployed by Magento. We must do it with node locally.**

We **separated the CSS and JS files for each page** to avoid unused code and increase the page speed. So you will see files like xigen-main.min.css, xigen-product.min.css, xigen-main.min.js, xigen-product.min.js, etc. The gulp structure compiles and separates all files for each page, and save in the right folder with the correct name.

### **STYLES**

This theme is completely custom, so we are not using the default Magento styles (style-m, style-l, etc.), and we are using [BEM syntax](http://getbem.com/) for the class names. You must develop [mobile-first](https://getflywheel.com/layout/start-practicing-mobile-first-development/), and we also create some smart mixins and variables to save time on development.

You can create styles for a new page following [this steps](#add-new-page-css).

### **SCRIPTS**

All the custom JS should be added before the `<body>` ends, and you must avoid adding any scripts in the middle of the code the help on the eCommerce loading speed. Please use the [data-mage-init](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/javascript/js_init.html#init_phtml) property at the HTML elements to call the JS functions.

You can create javascript file for a new page or feature following [this steps](#add-new-page-js).

### **CHANGE WORDS**

To change any word you should use the [CSV translation file](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/translations/theme_dictionary.html) that you also can find in this document. And you must keep all words translatable using this [`<?= __('add any translatable word here'); ?>`](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/translations/translate_theory.html).

Translate file path: `app/design/frontend/Xigen/Theme/i18n/en_GB.csv`

You can create translation files for other language following [this steps](#add-new-translation-file).

## **START WORKING**

**1. Clone the Xigen-Theme repository:** Go to the `app/design/frontend` folder and run this command 
```
$ git clone git@git.xigen.co.uk:magento-2/xigen-theme.git Xigen/Theme
```

**2. Install the node:** Go to the `app/design/frontend/Xigen/Theme/web` folder and run this command
```
$ yarn install
```
You also can use `npm install` if you prefer.

**3. Config the SFTP:** You can do it manually or you can config the SFTP on the VSCode.

1. Go to extensions and search for SFTP in your VS Code.
2. Install the SFTP extension developed by [liximomo](https://github.com/liximomo/vscode-sftp).
3. Enable the extension.
4. Go to View > Command Palette (or press Cmd + Shit + P), type sftp and choose `SFTP: Config` and then add this content:

**When you are using PASSWORD**
```json
{
    "name": "{{branch_name}}",
    "protocol": "sftp",
    "host": "{{host_address}}",
    "port": "{{port}}",
    "username": "{{host_user_name}}",
    "password": "{{host_password}}",
    "remotePath": "{{host_path_to_root_magento}}",
    "uploadOnSave": false
}
```
OR

**When you are using PUBLIC KEY**
```json
{
    "name": "{{branch_name}}",
    "protocol": "sftp",
    "host": "{{host_address}}",
    "port": "{{port}}",
    "username": "{{host_user_name}}",
    "agent": null,
    "privateKeyPath": "{{your_public_key}}",
    "passphrase": "{{your_passphrase}}",
    "passive": false,
    "interactiveAuth": false,
    "remotePath": "{{host_path_to_root_magento}}",
    "uploadOnSave": false
}
```
*P.S.:*
- *Change all {{...}} variable by the server information.*
- *Your public key should be similar to `/Users/YourUser/.ssh/id_rsa`*
- *If you don't set up a passphrase to your public key just set `"passphrase": null,`*
- *You don't need to use "" at the port because is a number and not a string*

The `SFTP: Config` will create a `.vscode/sftp.json` file in your root directory.

**AUTO-UPLOAD CSS & JS FILES WHEN COMPILED**
```json
[
    {
        {{Your defeult config}}
    },
    {
        "name": "{{branch_name}}",
        "protocol": "sftp",
        "host": "{{host_address}}",
        "port": "{{port}}",
        "username": "{{host_user_name}}",
        "agent": null,
        "privateKeyPath": "{{your_public_key}}",
        "passphrase": "{{your_passphrase}}",
        "passive": false,
        "interactiveAuth": false,
        "remotePath": "{{host_path_to_root_magento}}",
        "context": "app/design/frontend/Xigen/Theme/web/css",
        "watcher": {
            "files": "**/*",
            "autoUpload": true,
            "autoDelete": false
        }
    }
]
```
To do it for JS files just duplicate and change the context to get from `app/design/frontend/Xigen/Theme/web/js` folder.

## **WORKING FLOW**

The best way to use this setup is:
```prompt
$ yarn start
```
*P.S.: You also can use `npm start`*

To watch any change on the `styles` and `scripts` folders while you are developing, and auto-run the gulp compilation when anything changes.

```prompt
$ yarn build
```
*P.S.: You also can use `npm build`*

To finish your job or to update the published files. This command will make a deep cleaning
* Empty `js/custom`
* Empty `css/page`
* Delete `css/xigen-main.min.css`
* Delete `css/xigen-main.min.css.map`

And then will re-compile the latest files version of your `styles` and `scripts` folders.

### **EVERYDAY**
1. Access the `web` folder under you theme folder.
    ```prompt
    $ cd app/design/frontend/Xigen/Theme/web
    ```

2. Start watch you change and auto-compile.
    ```prompt
    $ yarn start
    ```
*P.S.: You also can use `npm start`*

3. Upload the compiled file to the FTP

**Important:** You can use the auto-upload, as explained in item 3 of [Start working](#start-working), to save time. But be careful!

### **DEPLOYMENT**

Please follow the instructions of [Xigen Git Workflow](#no-link-yet) 

### **FILES STRUCTURE**

Before start, if you never worked with Magento 2. We highly recommend having a look at the official frontend documentation of [Magento theme structure](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/themes/theme-structure.html)

The Xigen Theme Structure

![Xigen Theme Root](git-images/01_xigen-theme-folder.png)

* **etc**: default by Magento. You can find the `view.xml` file that allows you to set the product images and thumbnails configuration (size and others). *This is required for a theme, but optional if it exists in the parent theme.*

    ![Xigen Theme Root](git-images/02_etc-folder.png)

* **i18n**: magento translation file. It's option for Magento but required for Xigen-Theme. See more at [change words](#change-words) section.

    ![Xigen Theme Root](git-images/03_i18n-folder.png)

* **Magento_Theme**: this is a module folder (`<Vendor>_<Module>` folders are module-specific styles, layouts, and templates). At Xigen-Theme we use to add the compiled `CSS` files to the `<head>` and the `JS` files before body ends. Always use uppercase for the first letter of vendor and module name.

    ![Xigen Theme Root](git-images/04_magento_theme-folder.png)

    * **layouts**: `XML` files which extend the default module or parent theme layouts. By default on Xigen-Theme we are adding the `xigen-main.min.css` file and `xigen.scripts.container` block.
    * **templates**: `PHTML` files containing theme templates which override the default module templates or parent theme templates for this module. Custom templates are also stored in this directory. By default on Xigen-Theme we are adding the theme custom `JS` files to the `xigen-scripts.phtml` template.

* **web**: Where the magic happens, we have the source and compiled files to publish. We also have the Xigen-Theme gulp-setup. And by default of Magento, you can find the static files that can be loaded directly from the frontend.

    ![Xigen Theme Root](git-images/05_web-folder.png)

    * **css**: default by Magento and the style's root directory where we add the `xigen-main.min.css`.
        
        ![Xigen Theme Root](git-images/06_css-folder.png)

        * **pages**: The gulp-setup add the page-specific `.min.css` files here.
        * **source**: default by Magento but **we are not using in Xigen-Theme**. This directory contains theme less configuration files that invoke mixins for global elements from the Magento UI library, and theme.less file which overrides the default variables values.
        * **vendor**: Special place for all third party CSS. Please always use the minified version.
        
    * **fonts**: To put all fonts file. You can find the font-awesome files, that are being used at `src/styles/base/_typography.scss`.
    * **images**: default by Magento. Images that are used in this theme.
    * **js**: default by Magento.

        ![Xigen Theme Root](git-images/07_js-folder.png)

        * **custom**: The gulp-setup add the page-specific `.min.js` files here.
        * **vendor**: Special place for all third party CSS. Please always use the minified version.

    * **node_modules**: only for build tools. Must be ignored at `.gitignor`
    * **src**: The original files, not compiled, to develop.
        
        * **scripts**: Add to root all page-specific or feature-specific javascript files. Please check the [Add new page/feature JS](#add-new-pagefeature-js) section.

            ![Xigen Theme Root](git-images/08_src-scripts-folder.png)

            * **functions**: You can add any complex js function here and `@import` to the page/feature-specific file. This will the keep files organised and maintainable.

        * **styles**: Add to root all page-specific or feature-specific javascript files. **Do not add any style to te main files**, just `@import`, and be carefully with the import order. Please check the [Add new page CSS](#add-new-page-css) section.

            ![Xigen Theme Root](git-images/09_src-styles-folder.png)

            * **base**: `_breakpoints.scss`, `_color.scss`, `_typography.scss` and `_variables.scss`. See the [Xigen-Theme CSS Helpers](#xigen-theme-css-helpers) section.
            * **components**: `product/_gallery.scss`, `searchbar.scss`, etc. Feel free to add general components to the root and page-specific components to the related folder (You can create one if it doesn't exist).
            * **helpers**: Mixins and animations to help you. See the [Xigen-Theme CSS Helpers](#xigen-theme-css-helpers) section.
            * **layouts**: When the element is more than a component and is not a page and will appear in a lot of places on the website, add it here. Examples: `_header.scss` and `_footer.scss`.
            * **modules**: A module-specific folder, use it to overrides the default styles. Avoid multiple files per module.
            * **theme**: `_globals.scss`. The Xigen-Theme is using the `xt-` prefix for these global styles.

    * **gulpfile.babel.js**: You can find the Gulp config. It's a task runner that uses nodejs as a platform. Gulp will run the tasks that will treat the JavaScript and CSS (SASS) files to works for multi-browser and also will compile all files to save space and make the website speed faster.
    * **package.json**: this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies. It can also contain other metadata such as a project description, the version of the project in a particular distribution, license information, even configuration data - all of which can be vital to both npm and to the end users of the package.  
    * **yarn.lock**: there is an identifier for every dependency and sub dependency that is used in the project.

* **.gitignore**: Prevent to push to the repository the node_modules and the compiled css files.
* **composer.json**: default by Magento. Describes the theme dependencies and some meta-information.
* **requirejs-config.js**: default by Magento. We are using it to set the `paths` to the Xigen-Theme custom `JS` It's a JavaScript file and module loader. It improves perceived page load times because it allows JavaScript to load in the background. In particular, it enables asynchronous JavaScript loading. See [RequireJS in Magento](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/javascript/requirejs.html) to learn more.
* **theme.xml**: default by Magento. The file is mandatory as it declares a theme as a system component. It contains the basic meta-information, like the theme title and the parent theme name, if the theme is inherited from an existing theme. The file is used by the Magento system to recognize the theme.

### **ADD NEW PAGE CSS**

1. Go to `app/design/frontend/Xigen/Theme/web/src/styles` folder.

2. Create the main **SCSS** file to import all you styles like `main_product.scss` or `main_category.scss`.

3. Go to `app/design/frontend/Xigen/Theme/web/gulpfile.babel.js` and add your new main SCSS file name at the **cssFiles** in the `const paths` array about line 14.

4. Add the **CSS** file to the templates. Go to the page-specific **XML** file, and add inside the `<head>` like this:

    ```xml
    <css src="css/pages/xigen-product.min.css" />
    ```

    The name of your file will have the prefix `xigen-` and the extension `.min.css`. The gulp transpiler will rename it getting the name after `main_`. For example: The `main_product.scss` will be renamed for `xigen-product.min.css`.


5. Use yarn/npm `start` or `build` for the gulp generates the minified version into `app/design/frontend/Xigen/Theme/web/css/pages`.

### **ADD NEW PAGE/FEATURE JS**

1. Go to `app/design/frontend/Xigen/Theme/web/src/scripts` folder.

2. Create the feature/page specific **JS** file on the root folder.

    *P.S.: You can also create a separated file for functions inside the functions folder, but you must need to import and execute on the file you create in the root folder, otherwise the gulp will ignore it.*

3. Go to `app/design/frontend/Xigen/Theme/web/gulpfile.babel.js` and add your new JS file name at the **jsFiles** in the `const paths` array about line 14.

4. Add the **JS** file to the templates, before body ends. Go to the page-specific **XML** file, and add inside the `<body>` a container named `before.body.end`.

    ```XML
    <referenceContainer name="before.body.end">
        <block class="Magento\Framework\View\Element\Js\Components" name="xigen.scripts.container" template="<Vendor>_<Module>::xigen-scripts.phtml" />
    </referenceContainer>
    ```

    **IMPORTANT:** replace the `<Vendor>_<Module>` by the correct name of the module you are using. You can see an example at `app/design/frontend/Xigen/Theme/Magento_Theme/layout/default.xml`

    The name of your file will have the prefix `xigen-` and the extension `.min.js`. The gulp transpiler will rename it getting the name of the file and adding the xigen prefix. For example: The `tabs.js` will be renamed for `xigen-tabs.min.js`.

5. Create the `xigen-script.phtml` file at the `templates` folder of the module, and add the `<script>` tag as default HTML. You can see an example at `app/design/frontend/Xigen/Theme/Magento_Theme/templates/xigen-scripts.phtml`.

    ```HTML
    <script src="<?=$block->getViewFileUrl('js/xigen-tabs.min.js')?>"></script>
    ```

6. Use yarn/npm `start` or `build` for the gulp generates the minified version into `app/design/frontend/Xigen/Theme/web/js/custom`.

### **ADD THIRD PARTY JS/CSS**

Preferably, use the minified version of the third part.

1. Add the third party file inside the vendor folder.

    Third Party CSS: `app/design/frontend/Xigen/Theme/web/css/vendor`

    Third Party JS: `app/design/frontend/Xigen/Theme/web/js/vendor`

2. Follow the process of adding [JS](#add-new-pagefeature-js) or [CSS](#add-new-page-css) from step 4.

### **ADD NEW TRANSLATION FILE**

1. Create a new `.csv` file within `app/design/frontend/Xigen/Theme/i18n/`. Example: `pt_BR.csv`.

2. Run the following command
    ```
    $ php bin/magento i18n:collect-phrases --output="app/design/frontend/Xigen/Theme/i18n/en_GB.csv" -m.
    ```
**IMPORTANT**: Change the `en_GB.csv` for the desired file name.

3. Do you changes, save and run 
    ```
    $ php bin/magento c:f
    ```

## **BEST PRACTICES**

- Separated `JS` and `CSS` for each page. To avoid unused code.
- No `JS` in the middle of the code. Use [requireJS](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/javascript/requirejs.html) and [data-mage-init attribute](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/javascript/js_init.html) for all.
- Use [vanilla ES6](https://www.w3schools.com/js/js_es6.asp) for custom functions separated from the Magento default block like a third party js and only add an event listener and fire functions inside the [`define({…})`](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/javascript/custom_js.html).
- Do not use the style-m.css, style-l.css or any default Magento style. We removed it on at `app/design/frontend/Xigen/Theme/Magento_Theme/layout/default_head_blocks.xml`
- Use [BEM syntax](http://getbem.com/) always when it's possible. So all elements should have a class. This saves time in the future.
    - You must style all elements together to be easier to find.
    - Do not nest breaking the class name like `&__primary` or`--blue`.
- Follow the [SEO guide for Frontend Developers](#no-link-yet)
- Each module should be developed as an extension and have there own CSS. That will overwritten, just if needed, at `app/design/frontend/Xigen/Theme/web/src/styles/modules`  
- Inherit the Magento/Blank
- Avoid customise and override .phtml templates. It’s better to [create a container or add a new template](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/templates/template-override.html) on the XML instead of override the default template.
- [Use view.xml](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/themes/theme-images.html#view_xml_structure) to change the product images and thumbnails sizes and type. Don’t do it on the CSS.
- All text added on the templates should use `<?= __('Click to download'); ?>` to [be translatable](#change-words) using the [i18n](#files-structure).
- If you need to [change the wording](#change-words), change on the CSV dictionary file (translate) at [i18n folder](#files-structure).
- Always develop for [mobile](https://getflywheel.com/layout/start-practicing-mobile-first-development/) and adapt for bigger screens, so only use min-width on media queries.
- Avoid [knockout.js](https://devdocs.magento.com/guides/v2.4/ui_comp_guide/concepts/knockout-bindings.html) always when it's possible.
- After finish your current task removes all `console.log`
- Use variable and function name that describe their functions and also insert comments to explain the functions, this will save time in the future. *P.S: You doesn’t need to leave a comment in each line, just about a block of code it’s enough.*
- Work in a different minified CSS file that other developers to avoid overriden the CSS and lose changes when working on the development environment together.

## **CURIOSITIES**

**Why SASS on Magento?**

We will generate a separated CSS file and JS for each page to remove all unused codes and make the website more friendly with page speed testers, and save some milliseconds on loading, and reduce styles and js conflicts/errors.
As this is not possible by default on Magento, We needed to build it from scratch any way. So why not SASS?
A interesting viewpoint about SASS against LESS: https://css-tricks.com/sass-vs-less/

**Why add the scripts before the end of the body?**

- The Page Speed Checker always says to not adding the scripts in the middle of the code.
- If you have code in your JavaScript that alters HTML as soon as the JavaScript file loads, there won’t actually be any HTML elements available for it to affect yet, so it will seem as though the JavaScript code isn’t working, and you may get errors.
- If you have a lot of JavaScript, it can visibly slow the loading of your page because it loads all of the JavaScript before it loads any of the HTML.

**What gulp are doing?**

The watch task in [Gulp](https://gulpjs.com/) will watch all your changes in all files inside the `app/design/frontend/Xigen/UKPrinting/web/src/styles` folder and will automatically [import, compile](https://www.npmjs.com/package/gulp-sass), [autoprefixer](hhttps://www.npmjs.com/package/gulp-autoprefixer), [uglify](https://www.npmjs.com/package/gulp-uglifycss), [rename](https://www.npmjs.com/package/gulp-rename) and create a [sourcemap](https://www.npmjs.com/package/gulp-sourcemaps) of the SASS files, compatible to the last 2 versions of all browsers and IE 10 or bigger, and will generate minified files with `xigen-` prefix and will save on the `app/design/frontend/Xigen/UKPrinting/web/css` folder and `app/design/frontend/Xigen/UKPrinting/web/css/pages`.

## **NO LINK YET**

Sorry, if you are here, you faced a `#no-link-yet` link on this documentation, please, ask help to your supervisor.