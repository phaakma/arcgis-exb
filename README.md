# arcgis-exb
Custom ArcGIS Experience Builder widgets and themes.

Author: Paul Haakma  

## Example web app  
[Link to example static web app](https://phaakma.github.io/arcgis-exb/)  
*Note that the web app is secured so non-authenticated users will not be able to view it.*  

## Installation  

Refer to this documentation:  
[ArcGIS Experience Builder Guide > Widget Development > Get Started](https://developers.arcgis.com/experience-builder/guide/getting-started-widget/)

1. Install ArcGIS Experience Builder Developer Edition locally.  
2. Clone this repo into the 'client' folder. There should now be a subfolder called 'arcgis-exb'.
3. Edit the tsconfig.json file and add the name of this folder into the 'include' array. Example below.  

```
{
  "include": [
    "dist/widgets",
    "your-extensions",
    "types",
    "jimu-core/lib/types",
    /** ADD the name of your web extension repo folder: **/
    "arcgis-exb"
  ],
}
```
## Deploying to ArcGIS Enterprise  

[Add Custom Widgets To ArcGIS Enterprise](https://doc.arcgis.com/en/experience-builder/11.3/configure-widgets/add-custom-widgets.htm)  

Follow the full steps in the link above to host the widget and add to ArcGIS Enterprise.  

The npm command to compile the widget needs to be run from the ArcGIS Enterprise Developer client folder.  
```npm run build:prod```  

The compiled widget is then found in the client/dist-prod/widgets directory.   

Testing GitHub workflow


