## kb-footer
kb-footer is a web component which shows KB design footer. Moreover, column items come from kb.dk footer API. 
In kb design manual, every application has to use exactly the same footer at in kb.dk, except for the first column which can be application specific.

### Properties

| Property | Attribute |        Description        |    Type     | Default |
|:--------:|:---------:|:-------------------------:|:-----------:|:-------:|
| language | language  | The language of the page. | "da" / "en" |  "da"   |  


### Examples
1. Exactly as in kb.dk
  ``` 
  <kb-footer></kb-footer> 
  ```
2. Footer with Application specific column 
  - Note 1: ``` ul ``` element needs to have ``` id="appFooterColumn" ```
  - Note 2: ``` <style>kb-footer > ul {display: none;}</style> ``` prevents from an un-styled ul flash in the start. 
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





