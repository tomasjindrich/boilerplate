# Statica Boilerplate

## TODO
    * vytáhnout z bootstrap-override samostatný bootstrap-extension
    * bootstrap-custom, úplný rebuild bootstrap.css

## IDEA
    * views/source (resolver)
    * views/custom 
    * views/library

## SASS

Přímý import z adresáře Framework (nastavení v Codekit)

    @import bs/bez-slozite-cesty.scss

## Views

### Templates

core -> master → base -> page

### Blocks

Fragmenty kodu, partials

### Components 

Pug Mixins, komponenty s parametry

## SCSS Framework

### bootstrap/

Source Sass

### bootstrap-override/

Vygeneruje nové a aktualizované classes (buttons, utilitites, reboot...)

### bootstrap-docs/

CSS pro prezentaci prvků, zkopírováno z Bootstrap Docs page