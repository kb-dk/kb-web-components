## kb-footer
kb-footer is a web component which shows KB design footer. Moreover column items come from from kb.dk footer API. 
In kb design manual, every application has to use exactly the same footer at in kb.dk, except for the first column which can be application specific.

### Properties
No properties

### Examples
- Exactly as in kb.dk:
  ``` <kb-footer></kb-footer> ```
- Footer with Application specific column:
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





