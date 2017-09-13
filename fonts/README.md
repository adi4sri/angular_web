Sinkin Sans @font-face
======================

This `SinkinSans.css` file contains a series of `@font-face` declarations that allows the usage of `"Sinkin Sans"` fonts in a more flexible way in your own stylesheet.


Problem
-------

When you download the `sinkin-sans-fontfacekit.zip` file from the [Font Squirrel page](http://www.fontsquirrel.com/fonts/sinkin-sans), it includes all the fonts located in subdirectories by font type with their own `stylesheet.css` file containing one `@font-face` declaration for the font type.

Example of `font-family` in `@font-face` declaration of the Sinkin Sans Thin font:

    font-family: 'sinkin_sans100_thin_italic';

This implies that you have to name the `font-family` in your own CSS stylesheet to obtain the `font-style` and `font-weight` you want.


Solution
--------

I wanted a more flexible way of styling.

0. I grouped all the fonts into one main directory.
0. I created a new set of `@font-face` declarations in one CSS file called `SinkinSans.css`.

Instead of using individual `font-family` names, all the declarations have the same `font-family` name of `"Sinkin Sans"` and I can control the `font-weight` in my own CSS stylesheet.


Example
-------

CSS:

    @import url("/assets/fonts/SinkinSans/SinkinSans.css");
    body {
        font-family: "Sinkin Sans", Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-style: normal;
    }
    h1 {
        font-size: 3em;
        font-weight: 800;
    }
    h2 {
        font-size: 2.5em;
        font-weight: 600;
    }
    h3 {
        font-size: 2em;
        font-weight: 500;
    }
    h4 {
        font-size: 1.5em;
        font-weight: 300;
    }
    p {
        font-size: 1em;
        font-weight: 400;
    }
    em {
        font-size: inherit;
        font-style: italic;
        font-weight: inherit;
    }
    strong {
        font-size: inherit;
        font-weight: 700;
    }
    /* Optional styles */
    .thin        { font-weight: 100; }
    .extra-light { font-weight: 200; }
    .light       { font-weight: 300; }
    .regular     { font-weight: 400; }
    .medium      { font-weight: 500; }
    .semi-bold   { font-weight: 600; }
    .bold        { font-weight: 700; }
    .black       { font-weight: 800; }
    .extra-black { font-weight: 900; }
    .italic      { font-style: italic; }

HTML:

    <p><strong><em>Text</em></strong></p>
    <p class="medium">Text</p>
    <p class="light italic">Text</p>
