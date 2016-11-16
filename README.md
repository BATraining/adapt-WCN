adapt-wcn
=========================

To Displays the information about the component that separated by three sections Warning,Caution,Note and has its own audio based on the text it includes.

Installation
------------
First, be sure to install the [Adapt Command Line Interface](https://github.com/cajones/adapt-cli), then from the command line run:-

    adapt install adapt-wcn

For example JSON format, see [example.json](https://github.com/BATraining/adapt-wcn)

Settings overview
-------------------
The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/BATraining/adapt-WCN/blob/master/example.json).

### Attributes

**_wcn** (object): The WCN attributes group contains values for **_isEnabled**, **_warning**, **_caution**, **_note**, **audioSrc** and **audioTypes**.

-`_isEnabled`(boolean) contains the setting for the extension,set to true/false to display/hide the extension.

-`_warning`(string) This value determines _warning text for the component.

-`_caution`(string) This value determines _caution text for the component.

-`_note`(string) This value determines _note text for the component.

-`audioSrc`(string) File name (including path) of the audio file. Path should be relative to the *src* folder (e.g., *course/en/audio/hot-graphic1*).

-`audioTypes`(string) audioTypes value determines the 'type' and 'codec' of the audio file.

Limitations
------------------

To be completed

Browser spec
-------------------

This extension has been tested to the standard Adapt browser specification.
