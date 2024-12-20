## kb-footer
kb-footer is a web component which shows KB design footer. Moreover, column items come from kb.dk footer API. 
In kb design manual, every application has to use exactly the same footer at in kb.dk, except for the first column which can be application specific.

### Properties

| Property | Attribute |                       Description                        |     Type      |  Default  |
|:--------:|:---------:|:--------------------------------------------------------:|:-------------:|:---------:|
| language | language  |                The language of the page.                 |  "da" / "en"  |   "da"    | 
| jsonUuId |    jsonUuId     | Universally Unique IDentifier (uuid) of drupal site node |    string     |    ""     |

### Additional considerations
KB design allows the first column to be overwritten by the application but the other three must be the same as in kb.dk.
- You can provide a ``` ul ``` element within the kb-footer which will be used as the first column.
- ``` ul ``` element must have the following line inside ``` <style>kb-footer > ul {display: none;}</style> ```.
- ``` ul ``` element must have its id sat to```appFooterColumnDA``` for Danish or ```appFooterColumnEN``` for English.
- If an ``` ul ``` element has its id sat to ```appFooterColumn```, it will be used as the replacement for the missing language.

### Local configuratin needed
You need two configuration files in the root folder of this web component. One called ``` .env.dev ``` and one called ``` .env.prod ```. In those files you need to specify the variables ``` BASEURL ``` and ``` JSONAPIURL ``` taylored to your local and production environment. The variables are needed to fetch non default footer data. Both filenames/locations are already added to .gitignore

### Links to cookie settings

If you want a link for Cookie Settings (<a href='javascript:void()' id='csconsentlink'>), please add ':cookie:' in front of the footer element title e.g. ':cookie: Cookie Settings'.

```

### Examples
1. Exactly as in kb.dk
  ``` 
  <kb-footer></kb-footer> 
  ```
2. Footer with Application specific column 
  ```
    <kb-footer>
      <ul id="appFooterColumn">
          <style>kb-footer > ul {display: none;}</style>
          <li><a href="#">Om KBs Digitale samlinger</a></li>
          <li><a href="#">Mediestream</a></li>
          <li><a href="#">Danmark Set Fra Lunften</a></li>
      </ul>
    </kb-footer> 
   ```
3. English footer
   ```
   <kb-footer language="en"></kb-footer> 
   ```  
4. Footer with application specific footer for each language (English and Danish)
   ```
   <kb-footer>
      <ul id="appFooterColumnDA" >
         <style>kb-footer > ul {display: none;}</style>
         <li><a href="#">Om KBs Digitale samlinger</a></li>
         <li><a href="#">Mediestream</a></li>
         <li><a href="#">Danmark Set Fra Lunften</a></li>
      </ul>
      <ul id="appFooterColumnEN">
         <style>kb-footer > ul {display: none;}</style>
         <li><a href="#">About Digital collections</a></li>
         <li><a href="#">Danmark from above</a></li>
      </ul>
   </kb-footer>
   ```
5. Change the language dynamically from within your application
   1. HTML 
      ```
      <label for="language">Language:</label>
      <select id="language">
         <option value="da" selected>Dansk</option>
         <option value="en">English</option>
      </select>
      <kb-footer>
      <ul id="appFooterColumnDA" >
         <style>kb-footer > ul {display: none;}</style>
         <li><a href="#">Om KBs Digitale samlinger</a></li>
         <li><a href="#">Mediestream</a></li>
         <li><a href="#">Danmark Set Fra Lunften</a></li>
      </ul>
      <ul id="appFooterColumnEN">
         <style>kb-footer > ul {display: none;}</style>
         <li><a href="#">About Digital collections</a></li>
         <li><a href="#">Danmark from above</a></li>
      </ul>
      </kb-footer>
      ```
   2. Javascript   
      ```
      <script>
          document.getElementById('language').addEventListener('change', function() {
             let footer = document.querySelector("kb-footer");
             footer.language = this.value;
          });
       </script>
      ```



